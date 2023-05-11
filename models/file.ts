import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
        file_id: {
            type: String,
            required: true,
            unique: true,
        },
        file_path: {
            type: String,
            required: true,
        },
        secret: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;