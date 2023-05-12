import dbConnect from "@/utils/dbConn";
import { NextResponse } from "next/server";
import { findOneDocument } from "@/utils/dbUtils";
import File from "@/models/file";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    await dbConnect();
    const id = res.id;
    let secret_key = res.secret || null;

    if (!id) {
      return NextResponse.json({ message: "No file ID provided" }, { status: 400 });
    }

    const file = await findOneDocument(File, { file_id: id });

    if (file) {
      secret_key = secret_key || file.secret;

      const file_path = file.raw_file_path;
      const file_name = file.file_name;

      const fileData = await fs.promises.readFile(file_path);
      const fileDataEncoded = fileData.toString('hex');

      return NextResponse.json({ fileData: fileDataEncoded, secretKey: secret_key, file_name: file_name }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No file found with this ID" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ message: "An error occurred while retrieving the file, please check if the link is correct and try again" }, { status: 500 });
  }
}
