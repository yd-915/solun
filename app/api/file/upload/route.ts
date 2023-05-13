import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConn";
import generateID from "@/utils/generateId";
import generateAES from "@/utils/generateAES";
import generateIV from "@/utils/generateIV";
import { encrypt, encryptFile } from "@/utils/encryption";
import File from "@/models/file";
import crypto from "crypto";
import { extname } from "path";


export async function POST(request: NextRequest) {
    const formData = await request.formData();

    await dbConnect();

    let bruteforceSafe = formData.get("bruteforceSafe") === "true";
    let password = formData.get("password") as string;
    let endToEndEncryption = formData.get("endToEndEncryption") === "true";    
    let autoDeletion = formData.get("autoDeletion");

    const file = formData.get("file") as Blob | null;
    if (!file) {
        return NextResponse.json(
        { message: "Please upload a file" },
        { status: 400 }
        );
    }

    const fid = await generateID(bruteforceSafe);
    const secret_key = await generateAES();
        
    const passwordSet = password !== "";
    const encrypted_password = passwordSet ? await encrypt(password, secret_key as string) : null;

    const dbSecretKey = endToEndEncryption ? null : secret_key;

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/files/`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
        } else {
        return NextResponse.json(
            { message: "An error occurred while uploading the file" },
            { status: 500 }
        );
        }
    }

    try {
        const uniqueSuffix = `${crypto.randomBytes(64).toString('hex')}`;

        const extension = extname(file.name).slice(1);

        const systemFilename = `${uniqueSuffix}.${extension}`;
        const dbFilename = file.name;

        const filePath = `${uploadDir}/${systemFilename}`;
        await writeFile(filePath, buffer);
        
        const iv = await generateIV();
        await encryptFile(filePath, secret_key as string, iv as Buffer);

        const insertFile = new File({
            file_id: fid,
            file_path: 'https://solun.pm' + relativeUploadDir + systemFilename,
            raw_file_path: filePath,
            file_name: dbFilename,
            file_type: file.type,
            file_size: file.size,
            auto_delete: autoDeletion,
            secret: dbSecretKey,
            password: encrypted_password,
            iv: iv.toString('hex'),
        });

        await insertFile.save();

        let link = "https://solun.pm/file/" + fid + "/";
        if (endToEndEncryption as boolean) {
            link += secret_key + "/";
        }

        return NextResponse.json(
        {
            message: "File uploaded successfully",
            file_id: fid,
            link: link,
        },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
        { message: "An error occurred while uploading the file" },
        { status: 500 }
        );
    }
}