import React, { useContext, useState } from "react";
import "./StudentsCard.css";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeProvider";
import { DataContext } from "../../context/DataProvider";

const StudentCard = ({ student }) => {
  const [edit, setEdit] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });
  const { theme } = useContext(ThemeContext);
  const { setQuery } = useContext(DataContext);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8050/students/${student._id}`,
        updatedStudent
      );
      console.log("Updated student:", response.data);
      setEdit(false);
      setQuery(Math.random());
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleCancel = () => {
    setUpdatedStudent({ ...student });
    setEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const date = new Date(student.createdAt);

  return (
    <>
      {!edit ? (
        <div className={`${theme}-color container`}>
          <h3> Student Card</h3>
          <div className="flex">
            <p className="bold"> Name : </p>
            <p> {student.firstName} </p>
          </div>
          <div className="flex">
            <p className="bold">Last Name : </p>
            <p> {student.lastName} </p>
          </div>
          <div className="flex">
            <p className="bold"> Email : </p>
            <p> {student.email} </p>
          </div>
          <div className="flex">
            <p className="bold"> Creation Date : </p>
            <p> {date.toLocaleString()} </p>
          </div>
          <button
            className={`${theme}-theme edit-button`}
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className={`${theme}-color container`}>
          <h3> Student Card</h3>
          <div className="flex">
            <p className="bold"> Name : </p>
            <input
              type="text"
              name="firstName"
              value={updatedStudent.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <p className="bold"> Last Name : </p>
            <input
              type="text"
              name="lastName"
              value={updatedStudent.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <p className="bold"> Email : </p>
            <input
              type="email"
              name="email"
              value={updatedStudent.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <p className="bold"> Creation Date : </p>
            <p> {date.toLocaleString()} </p>
          </div>
          <div className="flex">
            <button
              className={`${theme}-theme edit-button`}
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className={`${theme}-theme edit-button`}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default StudentCard;
