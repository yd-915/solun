import dbConnect from "@/utils/dbConn";
import { NextResponse } from "next/server";
import { findOneDocument, deleteOneDocument } from "@/utils/dbUtils";
import File from "@/models/file";
import fs from "fs";
import { decryptFileData } from "@/utils/encryption";

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

      const fileData = await fs.promises.readFile(file_path, 'binary');

      const decryptedData = await decryptFileData(fileData, secret_key, file.iv);
      const decryptedDataEncoded  = decryptedData.toString("base64");

      const autoDeletion = file.auto_delete;
      if (autoDeletion == 'download') {
        await deleteOneDocument(File, { file_id: id });
        fs.unlink(file_path, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
      }
      
      return NextResponse.json({ fileData: decryptedDataEncoded, file_name: file_name }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No file found with this ID" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ message: "An error occurred while retrieving the file, please check if the link is correct and try again" + err }, { status: 500 });
  }
}
