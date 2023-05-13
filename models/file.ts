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
        raw_file_path: {
            type: String,
            required: true,
        },
        file_name: {
            type: String,
            required: true,
        },
        file_type: {
            type: String,
            required: true,
        },
        file_size: {
            type: Number,
            required: true,
        },
        auto_delete: {
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
        iv: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;