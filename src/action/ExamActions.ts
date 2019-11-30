import { Dispatch } from "redux";
import _ from 'underscore';

import ExamItem, { ExamQuestionObj } from "../models/ExamItem";
import { Action, ExaminationState } from "../reducer/ExamReducer";

const NUMBER_OF_ITEMS: number = 10;
const NUMBER_OF_CHOICES: number = 4;

export default class ExamActions {
  private dispatch : Dispatch;
  public static readonly SET_EXAM_ITEMS = 'SET_EXAM_ITEMS';
  public static readonly SET_EXAM_STATE = 'SET_EXAM_STATE';
  
  public constructor(dispatch : Dispatch) {
    this.dispatch = dispatch;
  }

  public setExamItems(response: ExamQuestionObj[]) {
    const examItems : any  = _.shuffle(_.map(_.sample(response, NUMBER_OF_ITEMS * NUMBER_OF_CHOICES), (item : ExamQuestionObj) => new ExamItem(item)));
    let questionaire : ExamItem[] = [];
    let tempContainer : ExamItem[]  = [];
    for(let i = 0; i < examItems.length; i++) {
      const item : ExamItem = examItems[i] as ExamItem;
      if(tempContainer.length < 3) {
        tempContainer.push(item);
      } else {
        questionaire.push(item)
        const currentIndex = questionaire.length - 1;
        const examItem: ExamItem = questionaire[currentIndex];
        examItem.choices = tempContainer;
        tempContainer = [];
      }
    }
    const dispatchPayload: Action = {
      type: ExamActions.SET_EXAM_ITEMS,
      payload: {
        data: questionaire
      }
    };
    this.dispatch(dispatchPayload);
  }

  public setExamState(state: ExaminationState, items: ExamItem[]) {
    const dispatchPayload: Action = {
      type: ExamActions.SET_EXAM_STATE,
      payload: {
        data: { state, items }
      }
    };
    this.dispatch(dispatchPayload);
  }
}