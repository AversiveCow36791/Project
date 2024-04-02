import React, { useState,useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./services";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <div>
        <div className="align-right p-1 border-bottom pb-2">
                  <button type="button" className="btn btn-outline-dark rounded mx-1">Collapse All</button>
                  <button type="button" className="btn btn-outline-dark rounded mx-1">View Progress</button>
                  <div className="dropdown inline mx-1">
                    <Link className="btn btn-outline-dark dropdown-toggle rounded" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="text-success"><FaCheckCircle/></span> Publish All
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><Link className="dropdown-item" to="#">Publish All</Link></li>
                      <li><Link className="dropdown-item" to="#">Unplublish All</Link></li>
                    </ul>
                    </div>        
                  <button type="button" className="btn btn-danger rounded mx-1"><FaPlus/> Modules</button> 
                </div>

                
      <div className="border border-dark my-3 px-3 rounded" style={{backgroundColor:"lightblue"}}>
      <div className="row py-0">
      <h6>Module Edit or Add</h6>
      </div>
      <div className="row align-items-center">
          <div className="col">
            <div className="row">
            <div className="col">
            <button className="btn btn-success rounded mx-1 py-1" onClick={handleAddModule}>
              Add
            </button>
            <button className="btn btn-danger rounded mx-1 py-1" onClick={handleUpdateModule}>
              Update
            </button>
            </div>
            <div className="col">
            <label className="ms-4 py-1 me-0">Module Name</label>
            <input className="form-control rounded ms-4 py-1 me-0" style={{width:210}} value={module.name} onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))} />
            </div>
          </div>
          </div>
          <div className="col pb-1">
          <label>Description</label>
            <textarea className="form-control rounded mx-1" value={module.description} onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}></textarea>
          </div>
      </div>
      </div>

      <ul className="list-group wd-modules">
        {moduleList.filter((module) => module.course === courseId).map((module) => (
          <li
            className="list-group-item p-0 rounded-0"
            onClick={() => setSelectedModule(module)}>

            

            <div>
              <FaEllipsisV className="me-2" /><strong>{module.name}</strong>: {module.description}
              <span className="float-end">
              <button className="btn btn-success rounded mx-1 py-0"
              onClick={() => dispatch(setModule(module))}>
              Edit
            </button>

            <button className="btn btn-danger rounded mx-1 py-0"
              onClick={() => handleDeleteModule(module._id)}>
              Delete
            </button>

                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            {selectedModule?._id === module._id && module.lessons?.map((lesson: { _id: string, name: string, description: string }) => (
              <ul className="list-group">
                  <li className="list-group-item p-0 rounded-0">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>

              <ul className="list-group rounded-0 green">
                    <li className="list-group-item p-0" >
                      <FaEllipsisV className="me-2" />
                      <span className="indent">{lesson.description}</span>
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>

              </ul>
              </ul>
              ))}

          </li>
        ))}
      </ul>
    </div>
  );
}
export default ModuleList;