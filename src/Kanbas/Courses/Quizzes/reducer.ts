// quizzesSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizzes: [] as {
      _id: string; title: string; dueDate: string; QuizType: string; Points: number; numOfQuestions: number;
      questions: { id: string; question: string; options: string[]; correctAnswer: string }[];
      published: boolean; course: string;
    }[],
    quiz: {
      title: "New Quiz",
      dueDate: new Date().toISOString().split('T')[0],
      QuizType: 'Graded Quiz',
      points: 0,
      numOfQuestions: 0,
      questions: [],
      published: false,
      course: '', // assuming course can be added here for context
    }, 
  };

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
