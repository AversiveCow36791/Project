import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { updateQuestion, addQuestion } from "../reducer";
import * as services from "../services";
function Blank(){
    const dispatch = useDispatch();
    const { cid,quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        title: "new question",
        points: "",
        type: "Fill in multiple blanks",
        options: "",
        answers: [""],
        question: "",
        quiz:""
    });

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            if (questionId === "new") {
                setQuestion({
                    title: "new question",
                    points: "",
                    type: "Fill in multiple blanks",
                    options: "",
                    answers: [""],
                    question: "",
                    quiz:""
                });
            } else {
                const fetchedQuestion = await services.getQuestionById(questionId);
                setQuestion(fetchedQuestion);
                setNewQuestion(fetchedQuestion);
            }
        } catch (error) {
            console.error("Error fetching question", error);
        }
    };

    const [newQuestion, setNewQuestion] = useState({ ...question });

    const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewQuestion(prevNewQuestion => ({
            ...prevNewQuestion,
            [name]: value,
        }));
    };


    const handleSave = () => {
        const questionToSave = {
            ...newQuestion,
            type: "Fill in multiple blanks",
            options: [],
        };

        if (questionId === 'new') {
            console.log("Creating new question:", questionToSave);
            services.createQuestion(quizId,questionToSave).then((questionToSave) => {
                dispatch(addQuestion({
                    ...questionToSave,
                }));
                navigate(`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`);
            }).catch((error) => {
                console.error("Failed to create a new question:", error);
            });
        } else {
            const questionToUpdate = {
                ...questionToSave,
                _id: questionId,
            };
            services.updateQuestion(questionToUpdate).then((updatedQuestion) => {
                console.log("Updated question from server:", updatedQuestion);
                dispatch(updateQuestion({
                    ...updatedQuestion,
                    _id: questionId,
                }));
                navigate(`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`);
            });
        }
    };

    const handleAddAnswer = () => {
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: [...prevQuestion.answers, '']
        }));
    };

    const handleDeleteAnswer = (index:number) => {
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: prevQuestion.answers.filter((_, idx) => idx !== index)
        }));
    };

    const handleAnswerChange = (value:string, index:number) => {
        setNewQuestion(prevQuestion => {
            const newAnswers = [...prevQuestion.answers];
            newAnswers[index] = value;
            return {
                ...prevQuestion,
                answers: newAnswers
            };
        });
    };

    return (
        <div>
            {/* Title */}
            <div>
                <input
                    onChange={handleQuestionChange}
                    type={"text"}
                    value={newQuestion.title}
                    name="title"
                    className="form-control"
                    placeholder="Enter your question title here"
                    style={{maxWidth: "200px"}}
                />
            </div>
            {/* Points */}
            <div className="form-group row m-2 float-end">
                <label style={{textAlign: 'right', paddingRight: '5px'}}
                       className="col-sm-3 col-form-label">pts:</label>
                <div className="col-sm-9">
                    <input
                        type={"number"}
                        onChange={handleQuestionChange}
                        value={newQuestion.points}
                        name="points"
                        className="form-control"
                        placeholder="Enter points here"
                        style={{maxWidth: "50px"}}
                    />
                </div>
            </div>
            <br/>
            <p>Enter your question text, then define all possible correct answers for the blank.</p>
            <p>Students will see the question followed by a small text box to type their answer.</p>

            {/* Question */}
            <div className="form-group row m-2">
                <label style={{paddingRight: '5px'}} className="m-2">Question:</label>
                <div>
                    <ReactQuill
                        value={newQuestion.question}
                        onChange={(content, delta, source, editor) => {
                            const event = {
                                target: {
                                    name: 'question',
                                    value: editor.getHTML(),
                                }
                            } as React.ChangeEvent<HTMLTextAreaElement>;
                            handleQuestionChange(event);
                        }}
                        className="form-control"
                        style={{maxWidth: "900px"}}
                    />
                </div>
            </div>

            {/* Answers */}
            <div className="form-group row m-2">
                <label style={{paddingRight: '5px'}}
                       className="col-sm-3 col-form-label">Answers:</label>
                <div>
                    {newQuestion.answers.map((answer, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control me-2"
                                value={answer}
                                onChange={(e) => handleAnswerChange(e.target.value, index)}
                                placeholder="Enter a correct answer"
                                style={{flex: '1', maxWidth: "300px"}}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-danger"
                                        onClick={() => handleDeleteAnswer(index)}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddAnswer} className="btn btn-toolbar m-2 float-end">+
                        Add Another Answer
                    </button>
                </div>
            </div>

            <br/>
            <br/>
            <hr/>

            <button onClick={handleSave} className="btn btn-success m-2 ">Save Question</button>
            <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`}
                  className="btn btn-danger m-2 float-end">
                Cancel
            </Link>

        </div>
    );
}

export default Blank;