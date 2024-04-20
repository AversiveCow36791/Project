import { Navigate, Routes, Route, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link,useLocation } from "react-router-dom";
import "../../Kanbas/Courses/index.css";
import CourseNavigation from "./Navigation";
import { FaGlasses } from "react-icons/fa";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import MyWebPage from "./Home/MyWebPage";
import 'bootstrap/dist/js/bootstrap.min.js';
import { KanbasState } from "../store";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

function Courses() {
    const { courseId } = useParams();
    const COURSES_API = `${API_BASE}/api/courses`
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}`
      );
      setCourse(response.data);
    };
    useEffect(() => {
      findCourseById(courseId);
    }, [courseId]);
    const { pathname } = useLocation();

    var pathValues = pathname.split('/');
    var breadcrumb = pathValues[4];

    const assignmentList = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments);
    if(pathValues.length == 6 && pathValues[4] === "Assignments"){
    //   const assignmentList = db.assignments.filter(
    //     (assignment) => assignment._id === pathValues[5]);
    //     breadcrumb = "Assignments > " + assignmentList.map((assignment) => assignment.title);
    // }    
    const assignment = assignmentList.find((assignment) => assignment._id === pathValues[5]);
    breadcrumb = "Assignments > " + (assignment?.title || "New Assignment");
    }

    if (pathValues.length == 6 && pathValues[4] === "Quizzes") {
      breadcrumb = "Quizzes > " + pathValues[5];
    }


    return (


      





      <div>
        
        <MyWebPage/>




        <div className="d-none d-md-block">
        <nav aria-label="breadcrumb" className="border-bottom d-flex justify-content-between custom-breadcrumb ms-3">
        <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item text-danger"><HiMiniBars3/> <Link className="a-none-red ms-2" to="#">{course?.number} {course?.name} </Link></li>
            <li className="breadcrumb-item active" aria-current="page">{breadcrumb}</li>
        </ol>
        <button className="btn btn-light btn-outline-dark mb-1 rounded"><Link to="#" className="a-none-black"><FaGlasses /> Student View</Link></button>
        </nav>
        </div>
        <CourseNavigation />
        
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "250px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes/>} />
            <Route path="Quizzes/:quizId" element={<QuizDetails/>} />
          </Routes>
        </div>
      </div>

      </div>
    );
  }
  export default Courses;
  

