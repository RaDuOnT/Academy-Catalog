import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import resourceReducer from "./resourceReducer";
import studentsReducer from "./studentsReducer";
import userReducer from "./userReducer";
import trainerReducer from "./trainerReducer";
import authReducer from "./authenticationReducer";
import feedbackReducer from "./feedbackReducer";

const rootReducer = combineReducers({
  course: courseReducer,
  resource: resourceReducer,
  students: studentsReducer,
  user: userReducer,
  trainer: trainerReducer,
  auth: authReducer,
  feedbacks: feedbackReducer,
});

export default rootReducer;
