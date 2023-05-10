import dbConnect from "@/utils/dbConn";
import generateID from "@/utils/generateId";
import generateAES from "@/utils/generateAES";
import { encrypt } from "@/utils/encryption";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

        await dbConnect();

        let message_text = res.message;
        let bruteforceSafe = res.bruteforceSafe;
        let password = res.password;
        let endToEndEncryption = res.endToEndEncryption;


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

        let link = "https://solun.pm/msg/" + mid + "/";
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
            message: "An error occurred while creating the message, please try again: " + err,
        }, {
            status: 500,
        });
    }
};