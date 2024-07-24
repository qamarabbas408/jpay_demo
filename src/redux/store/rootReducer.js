import { createReducer, combineReducers } from "@reduxjs/toolkit";
import LanguageReducer from "../reducers/LanguageReducer";
import AuthenticationReducer from "../reducers/AuthenticationReducer";
import EmployeesReducer from "../reducers/EmployeesReducer";
import ProfileReducer from "../reducers/ProfileReducer";
import ReportsReducer from "../reducers/ReportsReducer";
import WhiteLabelingReducer from "../reducers/WhiteLabelingReducer";

const appState = {
  name: "JPay",
  url: "",
  version: "1.0",
};

const DefaultReducer = createReducer(appState, (_) => {
  return appState;
});

const rootReducer = combineReducers({
  AppReducer: DefaultReducer,
  AuthenticationReducer: AuthenticationReducer,
  LanguageReducer: LanguageReducer,
  EmployeesReducer: EmployeesReducer,
  ProfileReducer: ProfileReducer,
  ReportsReducer: ReportsReducer,
  WhiteLabelingReducer: WhiteLabelingReducer,
});

export default rootReducer;
