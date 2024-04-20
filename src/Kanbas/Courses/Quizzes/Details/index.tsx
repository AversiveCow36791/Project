import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as testvariable from "react-icons/fa";

function QuizDetails() {
    const { quizId } = useParams();
    const { courseId } = useParams();
    const randomId = new Date().getTime().toString();

    return (
        <>
        <div className="row flex-grow-1">
                <div className="col flex-grow-1">
                </div>
                <div className="col flex-grow-2 mb-1" >
                    <span className="float-end">
                    <button className="btn btn-success"><testvariable.FaCheckCircle/> Published</button>
                    <button className="btn btn-outline-dark ms-1" style={{backgroundColor:"lightgray"}}>Preview</button>
                    <button className="btn btn-outline-dark ms-1" style={{backgroundColor:"lightgray"}}><testvariable.FaPencilAlt/> Edit</button>
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
                <h2>Title</h2>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Quiz Type</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Points</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Assignment Group</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Shuffle Answers</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Time Limit</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Multiple Attempts</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>View Responses</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Show Correct Answers</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>One Question at a Time</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <span className='float-end fw-bold'>Require Respondus LockDown Browser</span>
                    </div>
                    <div className="col">
                        <span>PH</span>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Required to View Quize Results</span>
                    </div>
                    <div className='col'>
                        <span>PH</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Webcam Required</span>
                    </div>
                    <div className='col'>
                        <span>PH</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <span className='float-end fw-bold'>Lock Questions After Answering</span>
                    </div>
                    <div className='col'>
                        <span>PH</span>
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
            <div className='col-2'>PH</div>
            <div className='col-2'>PH</div>
            <div className='col-2'>PH</div>
            <div className='col-2   '>PH</div>
            </div>
            </>
    );
}

export default QuizDetails;