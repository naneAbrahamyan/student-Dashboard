import asyncHandler from "express-async-handler";
import students from "../service/students.service.js";

export const createStudent = asyncHandler(async (req, res) => {
  const { body } = req;
  const result = await students.createStudent(body);
  res.status(201).json({ result });
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  console.log("id", id);
  const result = await students.updateStudent(id, body);
  res.status(201).json({ result });
});

export const allStudents = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const result = await students.getStudents(name);
  res.json(result);
});
