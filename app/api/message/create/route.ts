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

        if (!message_text) {
            return NextResponse.json({ message: "Please enter a message" }, { status: 400 });
        }

        const mid = await generateID(bruteforceSafe);
        const secret_key = await generateAES();
        const encrypted_message = await encrypt(message_text, secret_key);


        const insertMessage = new Message({
            message_id: mid,
            message: encrypted_message,
            secret: secret_key,
        });

        await insertMessage.save();

        return NextResponse.json({
            message: "Message created successfully",
            message_id: mid,
            link: "https://solun.pm/msg/" + mid + "/",
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