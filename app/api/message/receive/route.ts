import dbConnect from "@/utils/dbConn";
import { decrypt } from "@/utils/encryption";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        return NextResponse.json({ message: "Hello World" }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "An error occurred while receiving the message, please try again" }, { status: 500 });
    }
};