import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = "https://kanbas-node-server-app-y7tx.onrender.com/api/courses";
const MODULES_API = "https://kanbas-node-server-app-y7tx.onrender.com/api/modules";

export const updateModule = async (module:any) => {
  const response = await axios.
    put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};



export const deleteModule = async (moduleId: any) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId:any, module:any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};



export const findModulesForCourse = async (courseId:any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
