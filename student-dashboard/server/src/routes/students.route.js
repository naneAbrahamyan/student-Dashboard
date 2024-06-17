import express from "express";
import {
  allStudents,
  createStudent,
  updateStudent,
} from "../controller/students.controller.js";

const router = express.Router();

router.get("/", allStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);

export default router;
