import React, {useState} from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as ac from "../../Users/client";
import { useEffect } from "react";

function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) {

    const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
    const navigate = useNavigate();
    const fetchProfile = async () => {
    const account = await ac.profile();
    setProfile(account);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

    return (
        <div className="p-4">
        <h1>Dashboard</h1> <hr />
        <h5> Add New Course Or Update Course</h5>
        <div className="row">
          <div className="col-3">
            Name: <input value={course.name} className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        </div>
          <div className="col-3">
        Course Number: <input value={course.number} className="form-control" 
        onChange={(e) => setCourse({ ...course, number: e.target.value }) }/>
        </div>
        </div>
        <div className="row">
        <div className="col-3">
        <span className="d-inline">
        Start Date:<input value={course.startDate} className="form-control" type="date" 
        onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
        </span>
        </div>
        <div className="col-3">
        End Date:<input value={course.endDate} className="form-control" type="date"
         onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
        </div>
        </div>
        <button className="btn btn-success m-1"onClick={addNewCourse} >
        Add
        </button>
        <button className="btn btn-danger m-1"onClick={updateCourse} >
        Update
        </button>

        
        <h2 className="ps-2">Published Courses ({courses.length})</h2> <hr />
        {profile.role !== 'USER' && ( <div className="row flex-wrap pt-0" style= {{marginBottom: 30}}>
          <div className="row row-cols-1 row-cols-md-5 g-4 mt-0">
            {courses.map((course) => (
            <div key={course._id} className="col" style= {{width: 300 }} >
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                     style= {{maxHeight: 150}}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                     style= {{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                     {course.number} {course.name}</Link>
                     
                  <p className="card-text">{course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary"> Go </Link>
                  <button className="btn btn-success ms-1"onClick={(event) => {
                event.preventDefault();
                setCourse(course);
              }}>
              Edit
            </button>

                  <button className="btn btn-danger ms-1" onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}>
                      <FaTrash/>
                  </button>
                </div> 
              </div>
            </div>
            ))}
        </div>
    </div>)}
    </div>
    );
}


export default Dashboard;

