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
import { FaCheckCircle, FaPlusCircle, FaEllipsisV, FaPlus } from "react-icons/fa";

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
      <div className="align-right p-1 border-bottom pb-2">
        <button type="button" className="btn btn-outline-dark rounded mx-1">Collapse All</button>
        <button type="button" className="btn btn-outline-dark rounded mx-1">View Progress</button>
        <button type="button" className="btn btn-danger rounded mx-1"><FaPlus/> Quiz</button>
      </div>

      <ul className="list-group">
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
      </ul>
    </div>
  );
}

export default QuizList;
