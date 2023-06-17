import { dbConnect, findOneDocument, Message } from 'solun-general-package';

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

        await dbConnect();
        let id = res.id;

        if (!id) {
            return NextResponse.json({ message: "No message ID provided" }, { status: 400 });
        }
    
        const message = await findOneDocument(Message, { message_id: id });

        if (message) {
            return NextResponse.json({
                valid: true,
                password: message.password !== null,
            }, {
                status: 200,
            });
        } else {
            return NextResponse.json({
                valid: false,
                message: "No message found with this ID",
            }, {
                status: 404,
            });
        }
    } catch (err) {
        return NextResponse.json({
            valid: false,
            message: "An error occurred while checking the message, please try again" + err,
        }, {
            status: 500,
        });
    }
};