import NotFound from "http-errors";
import Student from "../models/students.entity.js";

class StudentService {
  async createStudent(payload) {
    const student = new Student(payload);
    return student.save();
  }

  async updateStudent(id, payload) {
    return Student.findByIdAndUpdate(id, payload, { new: true });
  }

  async getStudents(name) {
    let students = Student.find({}, { password: false }).exec();
    console.log("name 111", name);
    if (name) {
      students = Student.find({
        firstName: { $in: name },
      });
    }

    return students;
  }
}

const students = new StudentService();
export default students;
