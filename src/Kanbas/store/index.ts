import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/reducer";
import questionReducer from "../Courses/Quizzes/Editor/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  },

  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  },

  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  },

  questionReducer: {
    questions: any[];
    question: any;
};

}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    questionReducer,
  }
});


export default store;