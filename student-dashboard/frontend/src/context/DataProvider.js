import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const callFN = async () => {
      const studentList = await axios.get(
        ` http://localhost:8050/students?name=${name}`
      );
      setStudents(studentList.data);
    };
    callFN(query);
  }, [query]);

  return (
    <DataContext.Provider
      value={{
        students,
        setStudents,
        query,
        setQuery,
        name,
        setName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
