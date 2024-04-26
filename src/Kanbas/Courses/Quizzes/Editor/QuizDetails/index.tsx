import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPenSquare, FaPencilAlt, FaPencilRuler, FaPlus, FaPlusCircle, FaRegFileWord } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanbasState } from "../../../../store";
import { useEffect,useState } from "react";
import * as client from "../../services"
import { setQuizzes,
    setQuiz,
    addQuiz,
    deleteQuiz,
    updateQuiz } from "../../reducer";
import { Component } from "react";
import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';

function QuizDetailor () {
    const { courseId } = useParams();
    const { quizId } = useParams();
    const initialState = {
        title: 'New Quiz',
        QuizType: 'Graded Quiz',
        points: 0,
        assignmentGroup: 'Assignments',
        ShuffleAnswers: 'No',
        timeLimit: 20,
        MultipleAttempts: 'No',
        ShowCorrectAnswers: 'Immediately',
        OneQuestionAtATime: 'Yes',
        requireRespondusLockDownBrowser: 'No',
        requiredToViewQuizeResults: 'No',
        webCamRequired: 'No',
        lockQuestionsAfterAnswering: 'No',
        due: '',
        for: '',
        availableFrom: '',
        untilDate: '',
        course: courseId,
        published: false,
    };

    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quizState = quizList.find((quiz) => quiz._id === quizId);
    const [quiz, setQuiz] = useState(quizState || initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSave = async () => {
        if (quiz._id) {
            await client.updateQuiz(quiz);
            dispatch(updateQuiz(quiz));
        } else {
            const newQuiz = await client.createQuiz(courseId,quiz);
            dispatch(addQuiz(newQuiz));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };



    const handleSaveAndPublish = async () => {
        if (quiz._id) {
            await client.updateQuiz({...quiz, published: true});
            dispatch(updateQuiz({...quiz, published: true}));
        } else {
            const newQuiz = await client.createQuiz(courseId,{...quiz, published: true});
            dispatch(addQuiz(newQuiz));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }


    const EditorComponent = () => (
        <div style={{ border: "1px solid black" }}>
            <Editor />
        </div>
    );

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="title">Title</label>
                        <input className="form-control" value={quiz.title} onChange={(e) => setQuiz({...quiz,title:e.target.value})}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                        <label htmlFor="Instructions">Instructions</label>
                        <EditorComponent />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Quiz Type</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.QuizType} onChange={(e) => setQuiz({...quiz,QuizType:e.target.value})}>
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Points</span>
                    </div>
                    <div className="col-3">
                        <input className="form-control" value={quiz.points} onChange={(e) => setQuiz({...quiz,points:e.target.value})}/>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Assignment Group</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.assignmentGroup} onChange={(e) => setQuiz({...quiz,assignmentGroup:e.target.value})}>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Exams">Exams</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Shuffle Answers</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.ShuffleAnswers} onChange={(e) => setQuiz({...quiz,ShuffleAnswers:e.target.value})}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Time Limit</span>
                    </div>
                    <div className="col-3">
                        <input className="form-control" value={quiz.timeLimit} onChange={(e) => setQuiz({...quiz,timeLimit:e.target.value})}/>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Multiple Attempts</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.MultipleAttempts} onChange={(e) => setQuiz({...quiz,MultipleAttempts:e.target.value})}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Show Correct Answers</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.ShowCorrectAnswers} onChange={(e) => setQuiz({...quiz,ShowCorrectAnswers:e.target.value})}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">One Question At A Time</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.OneQuestionAtATime} onChange={(e) => setQuiz({...quiz,OneQuestionAtATime:e.target.value})}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Access Code</span>
                    </div>
                    <div className="col-3">
                        <input className="form-control" value={quiz.accessCode} onChange={(e) => setQuiz({...quiz,accessCode:e.target.value})}/>
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col-3">
                        <span className="float-end">Webcam Required</span>
                    </div>
                    <div className="col-3">
                        <select className="form-select" value={quiz.webCamRequired} onChange={(e) => setQuiz({...quiz,webCamRequired:e.target.value})}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-1">
                                        <div className="col-3 d-flex flex-row-reverse pe-1 px-0 mb-1">Assign</div>
                                        <div className="col-5 px-0 rounded-top border ms-1">

                                <label className="p-1"><b>Assign to</b></label>
                                <div className="col-6 py-1 px-1 border ms-1 p-1">    
                                    <button className="btn btn-outline-dark" type="button" style={{backgroundColor:"lightgray"}}>Everyone</button>
                                </div>

                                <div className="col p-1">
                                <label htmlFor="due" className="form-label"><b>Due</b></label>
                                <input type="date" id="due" className="form-control mt-0 mb-1 ps-1" value={quiz.dueDate} onChange={(e) => (setQuiz({...quiz,dueDate:e.target.value}))}/>
                                </div>

                                <div className="col p-1">
                                <div className="row">
                                    <div className="col"><label htmlFor="Availability" className="form-label"><b>Available from</b></label>
                                    <input type="date" id="Availability" className="form-control" value={quiz.availableDate} onChange={(e) => (setQuiz({...quiz,availableFromDate:e.target.value}))}/></div>
                                
                                    <div className="col"><label htmlFor="Until" className="form-label"><b>Until</b></label>
                                    <input type="date" id="Until" className="form-control" value={quiz.untilDate} onChange={(e) => (setQuiz({...quiz,availableUntilDate:e.target.value}))}/></div>
                                </div>
                                </div>
                                    </div>
                                    </div>

                    
            </form>

            <div className="row mt-2">
            <div className="col">
                    <button className="btn btn-danger" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}>Cancel</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
                <div className="col">
                    <button className="btn btn-warning" onClick={handleSaveAndPublish}>Save and Publish</button>
                </div>
            </div>
        </div>
    );
}

export default QuizDetailor;