import { dbConnect, deleteOneDocument, Message } from 'solun-general-package';

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    await dbConnect();
    let id = res.id;

    if (!id) {
      return NextResponse.json({ message: "No message ID provided" }, { status: 400 });
    }

    const deletedCount = await deleteOneDocument(Message, { message_id: id });

    if (deletedCount > 0) {
      return NextResponse.json(
        {
          message: "Message deleted successfully",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "No message found with this ID",
        },
        {
          status: 404,
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "An error occurred while deleting the message, please try again" + err,
      },
      {
        status: 500,
      }
    );
  }
};