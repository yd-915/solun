import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConn";
import generateID from "@/utils/generateId";
import generateAES from "@/utils/generateAES";
import { encrypt } from "@/utils/encryption";
import File from "@/models/file";


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
        { error: "File blob is required." },
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
        console.error(
            "Error while trying to create directory when uploading a file\n",
        );
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
        }
    }

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const systemFilename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
        const dbFilename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
        )}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${systemFilename}`, buffer);

        const insertFile = new File({
            file_id: fid,
            file_path: 'https://solun.pm' + relativeUploadDir + systemFilename,
            file_name: dbFilename,
            auto_delete: autoDeletion,
            secret: dbSecretKey,
            password: encrypted_password
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
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
        );
    }
    }