import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPenSquare, FaPencilAlt, FaPencilRuler, FaPlus, FaPlusCircle, FaRegFileWord } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setAssignments,
} from "./assignmentsReducer";
import { KanbasState } from "../../store";
import { useEffect,useState } from "react";
import * as client from "./assignmentServices";


function Assignments() {
  const { courseId } = useParams();
  useEffect(() => {
    client.findAssignmentsForCourse(courseId)
      .then((assignments) =>
        dispatch(setAssignments(assignments))
    );
  }, [courseId]);

  const handleDeleteAssignment = (assignmentId: string) => {
    client.deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignment(assignmentId));
    });
  };

  const assignmentList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments)
    .filter(
      (assignment) => assignment.course === courseId)
      ;
  const dispatch = useDispatch();
  const randomId = new Date().getTime().toString();
  const navigate = useNavigate();


  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  const handleShowDelete = (assignmentId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this assignment?");

    if (confirm) {
      handleDeleteAssignment(assignmentId);
    }

  };
    return (
    <>
        

        <div className="row flex-grow-1">

            <div className="col-5 flex-grow-1">
                <input id="Assignment" className="form-control w-50" placeholder="Search for Assignments"/>
            </div>
            <div className="col flex-grow-2">
              <span className="float-end">
                <button type="button" className="btn btn-outline-dark rounded mx-1" style={{backgroundColor:"rgb(171, 168, 165)"}}><FaPlus/> Group</button>
                <button type="button" className="btn btn-danger rounded mx-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments/${randomId}`)}><FaPlus/> Assignment</button>
                <div className="dropdown ms-1" style={{display:"inline"}}>
                  <button type="button" className="btn btn-outline-dark rounded" style={{backgroundColor:"rgb(171, 168, 165)"}} data-bs-toggle="dropdown">
                    <FaEllipsisV/>
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">Edit Assignment Dates</Link></li>
                  </ul>
                </div>
              </span>
            </div>
        </div>

        <div className="row py-2"><hr/></div>


      <ul className="list-group wd-assignment">
        <li className="list-group-item p-0 rounded-0">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
            <span className="circle-container border border-dark rounded-pill px-1 mx-1 my-1"><span className="small"> 40% of Total </span></span>
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item rounded-0 d-flex align-items-center">
                <FaEllipsisV className="me-2" />
                <FaPencilAlt className="me-2 green" />
                   <div className="assign">
                   <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="a-none-black">{assignment.title} </Link>        <p className="small border-end border-2">{assignment.title} - Week starting on {assignment.availableFromDate} </p>
                                        <p className="small"><b>Due:</b> {assignment.dueDate} at 11:59pm | {assignment.points} pts</p>
                                    </div>
                <span className="ms-auto">
                <button className="btn btn-success py-0 px-1 me-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`)}>Edit</button>
                <button className="btn btn-danger py-0 px-1 me-1" onClick={() => handleShowDelete(assignment._id)}>Delete</button>
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
        <li className="list-group-item p-0">
                                <div>
                                <FaEllipsisV className="me-2" /> Quizzes
                                  <span className="float-end">
                                      <span className="circle-container border border-dark rounded-pill px-1 mx-1 my-1"><span className="small"> 10% of Total </span></span>
                                      <FaCheckCircle className="text-success" />
                                      <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                                  </span>
                                </div>
        </li>

        <li className="list-group-item p-0">
                                <div>
                                <FaEllipsisV className="me-2" /> Exams
                                  <span className="float-end">
                                      <span className="circle-container border border-dark rounded-pill px-1 mx-1 my-1"><span className="small"> 20% of Total </span></span>
                                      <FaCheckCircle className="text-success" />
                                      <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                                  </span>
                                </div>
        </li>

        <li className="list-group-item p-0">
                                <div>
                                <FaEllipsisV className="me-2" /> Projects
                                  <span className="float-end">
                                      <span className="circle-container border border-dark rounded-pill px-1 mx-1 my-1"><span className="small"> 30% of Total </span></span>
                                      <FaCheckCircle className="text-success" />
                                      <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                                  </span>
                                </div>
        </li>
      </ul>
    </>
);}
export default Assignments;


{/* <div class="row pe-2">
                        <ul class="list-group wd-assignment">
                            <li class="list-group-item">
                              <div>
                                <i class="fa fa-ellipsis-v"></i> Assignments
                                <span class="float-end">
                                    <span class="circle-container border border-dark rounded-pill p-1"><span class="small"> 40% of Total </span></span>
                                  <i class="fa fa-plus ms-2"></i>
                                  <i class="fa fa-ellipsis-v ms-2"></i>
                                </span>
                              </div>
                              <ul class="list-group">
                                <li class="list-group-item d-flex align-items-center">
                                    <i class="fa fa-ellipsis-v"></i> 
                                    <i class="fa fa-pencil-square-o ms-2 green"></i>
                                    <div class="assign">
                                        <a class="a-none-black" href="../../../Kanbas/Courses/Assignments/Edit/screen.html"><b>A1 SETUP</b></a><br/>
                                        <p class="small border-end border-2">Week 1 - A1 - SETUP - Week starting on Monday September 5th Module </p>
                                        <p class="small"><b>Due:</b> Sep 18 2022 at 11:59pm | 100 pts</p>
                                    </div>
                                    <div class="ms-auto">
                                        <i class="fa fa-check-circle text-success"></i>
                                        <a class="a-none-black" href=""><i class="fa fa-ellipsis-v ms-2"></i></a>
                                    </div>
                                </li>
                                </ul>



 */}
function setAssignmentToDelete(assignmentId: string) {
  throw new Error("Function not implemented.");
}

