import dbConnect from "@/utils/dbConn";
import { findOneDocument, deleteOneDocument } from "@/utils/dbUtils";
import File from "@/models/file";
import fs from "fs";
import { decryptFileData, decryptFile } from "@/utils/encryption";
import mime from "mime";
import { ReadableStream } from "web-streams-polyfill";
import { Buffer } from "buffer";



export async function POST(request: Request): Promise<Response> {
  try {
    const res = await request.json();
    await dbConnect();
    const id = res.id;
    let secret_key = res.secret || null;

    if (!id) {
      return new Response(JSON.stringify({ message: "No file ID provided" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const file = await findOneDocument(File, { file_id: id });

    if (file) {
      secret_key = secret_key || file.secret;

      const file_path = file.raw_file_path;
      const file_name = file.file_name;
      const fileStats = fs.statSync(file_path);

      const fileStream = fs.createReadStream(file_path);

  const stream = new ReadableStream({
  start(controller) {
    fileStream.on("data", (chunk) => {
      const uint8Array = new Uint8Array(chunk instanceof Buffer ? chunk : new TextEncoder().encode(chunk));
      controller.enqueue(uint8Array);
    });

    fileStream.on("end", () => {
      controller.close();
    });

    fileStream.on("error", (error) => {
      controller.error(error);
    });
  },
});



const response = new Response(stream);
response.headers.set("Content-Disposition", `attachment; filename="${file_name}"`);
response.headers.set("Content-Type", mime.getType(file_name) || "application/octet-stream");
response.headers.set("Content-Length", fileStats.size.toString());
response.headers.set("Deletion", file.auto_delete);

return response;
    } else {
      return new Response(JSON.stringify({ message: "No file found with this ID" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "An error occurred while retrieving the file, please check if the link is correct and try again" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
