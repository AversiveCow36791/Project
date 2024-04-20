import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as testvariable from "react-icons/fa";
import Nav from '../Nav';

function QuizEditor() {
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
                    <span className="me-2">Points: 0</span>
                    <button className="btn btn-success"><testvariable.FaCheckCircle/> Published</button>
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

        <Nav/>
        </>)};
    
    export default QuizEditor;