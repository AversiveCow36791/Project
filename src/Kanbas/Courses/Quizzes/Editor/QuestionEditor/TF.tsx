import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { updateQuestion, addQuestion } from "../reducer";
import * as services from "../services";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function TF(){
    const dispatch = useDispatch();
    const { cid, quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        title: "new question",
        points: "",
        type: "True/false",
        options: ["True", "False"],
        answers: "True",
        question: "",
        quiz: ""
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
                    type: "True/false",
                    options: ["True", "False"],
                    answers: "True",
                    question: "",
                    quiz: ""
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
            type: "True/false",
            options: ["True", "False"],
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


    return (
        <div>
            {/* Title */}
            <div>
                <input
                    type={"text"}
                    onChange={handleQuestionChange}
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
            <p>Enter your question text, then select if True of False is the correct answer.</p>


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

            {/* Answers as Dropdown */}
            <div className="form-group row m-2">
                <label style={{paddingRight: '5px'}}
                       className="col-sm-3 col-form-label">Answer:</label>
                <div>
                    <select
                        className="form-control"
                        value={newQuestion.answers}
                        onChange={(e) => setNewQuestion(prevNewQuestion => ({
                            ...prevNewQuestion,
                            answers: e.target.value
                        }))}
                        name="answers"
                        style={{
                            maxWidth: "100px",
                            appearance: 'none',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            padding: '5px 30px 5px 10px',
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140' width='10' height='10'%3e%3cpath fill='%23333' d='M35 45l35 35 35-35z'/%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 5px center',
                            backgroundSize: '15px 15px'
                        }}
                    >
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>

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

export default TF;