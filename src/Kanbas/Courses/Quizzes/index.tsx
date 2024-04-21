import React from 'react';
import { FaCheckCircle, FaPlusCircle, FaPlus,FaEllipsisV, FaPencilAlt, FaRocket, FaRocketchat, FaStopCircle, FaCircle, FaArrowCircleLeft, FaRegCircle, FaSlash } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { quizzes } from '../../Database';
import { Link } from 'react-router-dom';
import "./index.css";
import QuizList from './List';

function Quizzes() {
const { courseId } = useParams();
const navigate = useNavigate();
const randomId = new Date().getTime().toString();
const quizList = quizzes.filter((quiz) => quiz.course === courseId);

    return (
    <>
    <QuizList />
        {/* <div className='row flex-grow-1'>
            <div className="col-5 flex-grow-1">
                <input id="Quiz" className="form-control w-50" placeholder="Search for Quizzes"/>
            </div>
            <div className="col flex-grow-2">
              <span className="float-end">
                <button type="button" className="btn btn-danger rounded mx-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${randomId}`)}><FaPlus/> Quiz</button>
                <button type="button" className="btn btn-outline-dark rounded" style={{backgroundColor:"rgb(171, 168, 165)"}} data-bs-toggle="dropdown">
                    <FaEllipsisV/>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><Link className="dropdown-item" to="#">Edit</Link></li>
                      <li><Link className="dropdown-item" to="#">Delete</Link></li>
                        <li><Link className="dropdown-item" to="#">Publish</Link></li>
                        <li><Link className="dropdown-item" to="#">Copy</Link></li>
                        <li><Link className="dropdown-item" to="#">Sort</Link></li>
                    </ul>
            </span>
            </div>
        </div>
        <div className="row py-2"><hr/></div>
        
        <ul className="list-group wd-assignment">
        <li className="list-group-item p-0 rounded-0">
          <div>
            <FaEllipsisV className="me-2" /> Quizzes
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>

          <ul className="list-group">
  {quizList.map((quiz) => {
    let status = "";
    if (quiz.status === "Not available until") {
      status = quiz.availableDate;
    }
    if (quiz.status === "Available") {
        status = "Multiple Dates"
    }

    let pub = <div className="overlap">
        <FaRegCircle className="circle" />
        <FaSlash className="slash" />
    </div>;
    if (quiz.published === true) {
      pub = <FaCheckCircle className="text-success" />
    }

    
    return (
      <li className="list-group-item rounded-0 d-flex align-items-center">
        <FaRocket className="mx-2 green" />
        <div className="assign pt-2">
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`} className="a-none-black">
            {quiz.title}
          </Link>
          <p className="small">
            <b>{quiz.status}</b> {status} | <b>Due:</b> {quiz.dueDate} at 11:59pm | {quiz.points} pts | {quiz.numOfQuestions} Questions
          </p>
        </div>
        <span className="ms-auto">
          <button className="btn btn-success py-0 px-1 me-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`)}>Edit</button>
          <button className="btn btn-danger py-0 px-1 me-1">Delete</button>
          {pub}
          <FaEllipsisV className="ms-2" />
        </span>
      </li>
    );
  })}
</ul>

        </li>
        </ul>
 */}

    </> 
  )
};

export default Quizzes;