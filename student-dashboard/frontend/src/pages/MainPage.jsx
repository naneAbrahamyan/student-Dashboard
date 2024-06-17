import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { BsSearch } from "react-icons/bs";
import "../assets/mainPage.css";
import { DataContext } from "../context/DataProvider";
import StudentCard from "../components/StudentCard/StudentCard";
import "./MainPage.css";
import Form from "../components/NewStudentForm/Form";

function MainPage() {
  const [value, setValue] = useState("");
  const { students, setQuery, setName } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = useCallback((event) => {
    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      setName(event.target.value);
      setQuery(Math.random());
      setValue(event.target.value);
    }, 500);

    setTimeoutId(newTimeoutId);
  }, []);

  return (
    <div
      className={`${theme}-theme main-page-conatiner`}
      style={{ height: "inherit" }}
    >
      {students === null ? (
        "Loading..."
      ) : (
        <>
          <div className={`${theme}-theme filters-conatiner`}>
            <div
              className={`${theme}-theme-component search-input`}
              style={{ display: "flex" }}
            >
              <BsSearch className={"search-icon"} />
              <input
                type="text"
                name={value}
                onChange={(e) => handleInputChange(e)}
                placeholder="Search"
                style={{
                  color: "inherit",
                  background: "inherit",
                  border: "inherit",
                  paddingLeft: "25px",
                }}
                className="input-field"
              />
            </div>
          </div>
          <div className="content-box">
            <div className="card-box">
              {students.length ? (
                students.map((student, index) => (
                  <StudentCard student={student} key={index} />
                ))
              ) : (
                <div className="empty-list">
                  <h3> No Results</h3>
                </div>
              )}
            </div>

            <div className="create-box">
              <h3>Create New Student Record</h3>
              <div>
                <Form />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
