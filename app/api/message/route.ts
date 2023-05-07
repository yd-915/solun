import dbConnect from "@/utils/dbConn";
import generateID from "@/utils/generateId";
import { encrypt } from "@/utils/encryption";
import Message from "@/models/message";

export default async function create(req, res) {
    try {
        const body = req.body;
        await dbConnect();

        let message_text = body.message;
        let bruteforceSafe = body.bruteforceSafe;

        if (!message_text) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }

        const mid = await generateID(bruteforceSafe);
        const encrypted_message = await encrypt(message_text);


        const message = new Message({
            message_id: mid,
            message: encrypted_message,
        });

        await message.save();

        return res.status(200).json({
            message: "Message created successfully",
            message_id: mid,
        });
    } catch (err) {
        return res.status(500).json({
            message: "An error occurred while creating the message, please try again",
        });
    }
};