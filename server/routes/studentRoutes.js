import express from "express";

import {
    getStudents,
    createStudent
} from "../controllers/studentController.js";

const router = express.Router();

// GET all students
router.get("/", getStudents);

// POST a new student
router.post("/", createStudent);

export default router;