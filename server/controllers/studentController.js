import Student from "../models/Student.js";

// Get all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve students",
            error: error.message
        });
    }
};

// Create a new student
export const createStudent = async (req, res) => {
    try {
        const {
            studentName,
            rollNumber,
            course,
            year,
            email
        } = req.body;

        const student = await Student.create({
            studentName,
            rollNumber,
            course,
            year,
            email
        });

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to register student",
            error: error.message
        });
    }
};