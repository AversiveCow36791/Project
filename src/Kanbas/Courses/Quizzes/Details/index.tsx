import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as testvariable from "react-icons/fa";
import { KanbasState } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import * as client from '../services';
import { setQuizzes } from '../reducer';
import { CgUnavailable } from "react-icons/cg";
import * as ac from "../../../../Users/client";

function QuizDetails() {
    const { quizId } = useParams();
    const { courseId } = useParams();
    const randomId = new Date().getTime().toString();
    const dispatch = useDispatch();


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


    const initialState = {
        title: 'New Quiz',
        QuizType: '',
        points: '',
        assignmentGroup: '',
        ShuffleAnswers: '',
        timeLimit: '',
        MultipleAttempts: '',
        viewResponses: '',
        ShowCorrectAnswers: '',
        OneQuestionAtATime: '',
        requireRespondusLockDownBrowser: '',
        requiredToViewQuizeResults: '',
        webCamRequired: '',
        lockQuestionsAfterAnswering: '',
        due: '',
        for: '',
        availableFrom: '',
        until: '',
        course: courseId,
    };



    useEffect(() => {
        client.findQuizzesForCourse(courseId).then((quizzes) =>
            dispatch(setQuizzes(quizzes))
        );
    });

    const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quizState = quizzes.find((quiz) => quiz._id === quizId);
    const [quiz, setQuiz] = useState(quizState || initialState);

    const buttonClass = quiz.published ? 'btn btn-success' : 'btn btn-danger';

    let publishedContent;
    if (quiz.published === true) {
      publishedContent = (
        <>
          <testvariable.FaCheckCircle/> Published
        </>
      );
    } else {
      publishedContent = (
        <>
            <CgUnavailable/> Unpublished
        </>
      );
    }


    return (
        <>
        <div className="row flex-grow-1">
                <div className="col flex-grow-1">
                </div>
                <div className="col flex-grow-2 mb-1" >
                    <span className="float-end">
                    <button className={buttonClass}>{publishedContent}</button>
                    {profile.role === 'FACULTY' && (
                    <button className="btn btn-outline-dark ms-1" style={{backgroundColor:"lightgray"}}>Preview</button>)}
                    {profile.role === 'FACULTY' && (
                    <button className="btn btn-outline-dark ms-1" style={{backgroundColor:"lightgray"}}><testvariable.FaPencilAlt/> Edit</button>)}
                    <div className="dropdown" style={{display: "inline"}}>
                        <button type="button" className="btn btn-outline-dark rounded ms-1" style={{backgroundColor:"lightgray"}} data-bs-toggle="dropdown">
                            <testvariable.FaEllipsisV/>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="#">Edit Assignment Dates</Link></li>
                        </ul>
                    </div>
                    </span>
                </div>
            </div>


            <div className="row py-1"><hr/></div>
    

            <div className="row">
                <h2>{quiz.title}</h2>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Quiz Type</span>
                    </div>
                    <div className="col">
                        <span>{quiz.QuizType}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Points</span>
                    </div>
                    <div className="col">
                        <span>{quiz.points}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Assignment Group</span>
                    </div>
                    <div className="col">
                        <span>{quiz.assignmentGroup}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Shuffle Answers</span>
                    </div>
                    <div className="col">
                        <span>{quiz.ShuffleAnswers}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Time Limit</span>
                    </div>
                    <div className="col">
                        <span>{quiz.timeLimit}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Multiple Attempts</span>
                    </div>
                    <div className="col">
                        <span>{quiz.MultipleAttempts}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>View Responses</span>
                    </div>
                    <div className="col">
                        <span>{quiz.viewResponses}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Show Correct Answers</span>
                    </div>
                    <div className="col">
                        <span>{quiz.ShowCorrectAnswers}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>One Question at a Time</span>
                    </div>
                    <div className="col">
                        <span>{quiz.OneQuestionAtATime}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Require Respondus LockDown Browser</span>
                    </div>
                    <div className="col">
                        <span>{quiz.requireRespondusLockDownBrowser}</span>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Required to View Quize Results</span>
                    </div>
                    <div className='col'>
                        <span>{quiz.requiredToViewQuizeResults}</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Webcam Required</span>
                    </div>
                    <div className='col'>
                        <span>{quiz.webCamRequired}</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Lock Questions After Answering</span>
                    </div>
                    <div className='col'>
                        <span>{quiz.LockQuestionsAfterAnswering}</span>
                    </div>
                </div>
            </div>

            <div className='row mt-2 border-bottom'>
            <div className='col-2'><h6>Due</h6></div>
            <div className='col-2'><h6>For</h6></div>
            <div className='col-2'><h6>Available From</h6></div>
            <div className='col-2'><h6>Until</h6></div>
            </div>

            <div className='row'>
            <div className='col-2'>{quiz.dueDate}</div>
            <div className='col-2'>{quiz.assignmentGroup}</div>
            <div className='col-2'>{quiz.availableDate}</div>
            <div className='col-2'>{quiz.dueDate}</div>
            </div>
            </>
    );
}

export default QuizDetails;