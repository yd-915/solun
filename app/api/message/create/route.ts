import dbConnect from "@/utils/dbConn";
import generateID from "@/utils/generateId";
import generateAES from "@/utils/generateAES";
import { encrypt } from "@/utils/encryption";
import { decryptTransfer } from "@/utils/clientEncryption";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

        await dbConnect();

        let message_text = res.tmpEncryptMsg;
        let bruteforceSafe = res.bruteforceSafe;
        let password = res.tmpEncryptPwd;
        let endToEndEncryption = res.endToEndEncryption;

        message_text = await decryptTransfer(message_text);

        if (password !== '') {
            password = await decryptTransfer(password);
        }

        if (!message_text) {
            return NextResponse.json({ message: "Please enter a message" }, { status: 400 });
        }

        const mid = await generateID(bruteforceSafe);
        const secret_key = await generateAES();
        const encrypted_message = await encrypt(message_text, secret_key as string);
        
        const passwordSet = password !== "";
        const encrypted_password = passwordSet ? await encrypt(password, secret_key as string) : null;

        const dbSecretKey = endToEndEncryption ? null : secret_key;
        
        const insertMessage = new Message({
          message_id: mid,
          message: encrypted_message,
          secret: dbSecretKey,
          password: encrypted_password
        });

        await insertMessage.save();

        let link = "https://" + process.env.NEXT_PUBLIC_DOMAIN + "/msg/" + mid + "/";
        if (endToEndEncryption) {
            link += secret_key + "/";
        }

        return NextResponse.json({
            message: "Message created successfully",
            message_id: mid,
            link: link,
        }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({
            message: "An error occurred while creating the message, please try again",
        }, {
            status: 500,
        });
    }
};