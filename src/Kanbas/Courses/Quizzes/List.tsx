import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./reducer";
import * as client from "./services";
import { KanbasState } from "../../store";
import { FaCheckCircle, FaPlusCircle, FaEllipsisV, FaPlus, FaRocket, FaSlash, FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgUnavailable } from "react-icons/cg";

function QuizList() {
const { courseId } = useParams();
useEffect(() => {
    client.findQuizzesForCourse(courseId)
        .then((quizzes) =>
            dispatch(setQuizzes(quizzes))
    );
}, [courseId]);

const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
const dispatch = useDispatch();
const [selectedQuiz, setSelectedQuiz] = useState(quiz);
const navigate = useNavigate();

  const handleDeleteQuiz = (quizId:String) => {
    client.deleteQuiz(quizId).then(() => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const handleAddQuiz = () => {
    const newQuiz = {
      ...quiz,
      course: courseId,
    };
    client.createQuiz(courseId, newQuiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };

  const handleUpdateQuiz = async () => {
    await client.updateQuiz(selectedQuiz);
    dispatch(updateQuiz(selectedQuiz));
  };

  return (
    <div>
      <div className='row flex-grow-1'>
      <div className="col-5 flex-grow-1">
                <input id="Quiz" className="form-control w-50" placeholder="Search for Quizzes"/>
            </div>
            <div className="col flex-grow-2">
              <span className="float-end">
                <button type="button" className="btn btn-danger rounded mx-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)}><FaPlus/> Quiz</button>
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
      {/* <ul className="list-group">
        {quizList.filter((quiz) => quiz.course === courseId).map((quiz) => (
          <li key={quiz._id} className="list-group-item">
            <div onClick={() => setSelectedQuiz(quiz)}>
              <FaEllipsisV className="me-2" />
              <strong>{quiz.title}</strong> - Due: {quiz.dueDate}
              <span className="float-end">
                <button className="btn btn-success rounded mx-1 py-0"
                  onClick={() => dispatch(setQuiz(quiz))}>
                  Edit
                </button>
                <button className="btn btn-danger rounded mx-1 py-0"
                  onClick={() => handleDeleteQuiz(quiz._id)}>
                  Delete
                </button>
                <FaCheckCircle className={quiz.published ? "text-success" : ""} />
                <FaPlusCircle className="ms-2" />
              </span>
            </div>
          </li>
        ))}
</ul> */}

      <div className="row py-2"><hr/></div>

      <ul className="list-group wd-assignment mt-2" >
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
            let date = new Date().toISOString().split('T')[0];
            if (date < quiz.availableDate) {
              status = `Not available until ${quiz.availableDate}`;
            }
            if (quiz.availableDate <= date && date <= quiz.dueDate) {
                status = "Available"
            }
            if (date > quiz.dueDate) {
                status = "Closed"
            }
            console.log(status);
            let pub = <CgUnavailable className="text-danger"/>
            if (quiz.published === true) {
              pub = <FaCheckCircle className="text-success" />
            }

            return (
              <li className="list-group-item rounded-0 d-flex align-items-center">
                <FaRocket className="mx-2 green" />
                <div className="assign pt-2">
                  <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} className="a-none-black">
                    {quiz.title}
                  </Link>
                  <p className="small">
                    <b>{quiz.status}</b> {status} | <b>Due:</b> {quiz.dueDate} at 11:59pm | {quiz.points} pts | {quiz.numOfQuestions} Questions
                  </p>
                </div>
                <span className="ms-auto">
                  <button className="btn btn-success py-0 px-1 me-1" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)}>Edit</button>
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
    </div>
  );
}

export default QuizList;
