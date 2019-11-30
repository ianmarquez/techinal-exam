import ExamItem from "../models/ExamItem";
import _ from 'underscore';
import ExamActions from "../action/ExamActions";
import { combineReducers } from "redux";

export interface Action {
  type: string;
  payload?: any;
}

export type ExaminationState = 'done' | 'in-progress'

export interface ExamState {
  items: ExamItem[];
  state: ExaminationState;
}

const defaultState : ExamState = {
  items: [],
  state: 'in-progress'
}

const examReducer = (state: ExamState = defaultState, action: Action) => {
  const { type, payload } = action;
  let currentState = _.clone(state);
  switch(type) {
    case ExamActions.SET_EXAM_ITEMS: 
      currentState = {
        ...currentState,
        items: payload.data
      }
      break;
    case ExamActions.SET_EXAM_STATE:
      currentState = {
        ...currentState,
        ...payload.data
      }
    default:
  }

  return currentState;
}

export default combineReducers({
  exam: examReducer
})