import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true
        },

        rollNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        course: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;