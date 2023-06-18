import { dbConnect, findOneDocument, File } from "solun-database-package";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

        await dbConnect();
        let id = res.id;

        if (!id) {
            return NextResponse.json({ message: "No file ID provided" }, { status: 400 });
        }
    
        const file = await findOneDocument(File, { file_id: id });

        if (file) {
            return NextResponse.json({
                valid: true,
                password: file.password !== null,
            }, {
                status: 200,
            });
        } else {
            return NextResponse.json({
                valid: false,
                message: "No file found with this ID",
            }, {
                status: 404,
            });
        }
    } catch (err) {
        return NextResponse.json({
            valid: false,
            message: "An error occurred while checking the file, please try again" + err,
        }, {
            status: 500,
        });
    }
};