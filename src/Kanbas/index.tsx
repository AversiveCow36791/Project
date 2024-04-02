import { Route, Routes, Navigate } from "react-router";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Assignments from "./Courses/Assignments";

const API_Base = process.env.REACT_APP_API_BASE;

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", image: "volodymyr-hryshchenko-inI8GnmS190-unsplash.jpg"
  });
  const COURSES_API = `${API_Base}/api/courses`
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);



  const addNewCourse = async() => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
  };
  const deleteCourse = async (courseId: any) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

   return (
    <Provider store={store}>
     <div className="d-flex" style={{minHeight:100}}>
       <div>
        <KanbasNavigation/>
       </div>
       <div style={{ flexGrow: 1 }}>
         <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element = {<h1>Account</h1>}></Route>
          <Route path="Dashboard" element = { <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>
}></Route>
          <Route path="Courses/:courseId/*" element={<Courses/>} />
          <Route path="Calendar" element = {<h1>Calendar</h1>}></Route>
         </Routes>
       </div>
     </div>
     </Provider>
 );}
 export default Kanbas;