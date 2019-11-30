import _ from 'underscore';

export interface ExamQuestionObj {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

export default class ExamItem {
  private _id: number;
  private _title: string;
  private _slug: string;
  private _excerpt: string;
  private _choices?: ExamItem[];
  private _answer?: number;
  private _order? : ExamItem[]; //to keep the ordering of choices consitent

  public constructor({ id, title, slug, excerpt }: ExamQuestionObj) {
    this._id = id;
    this._title = title;
    this._slug = slug;
    this._excerpt = excerpt;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get slug() {
    return this._slug;
  }

  get excerpt() {
    return this._excerpt;
  }

  get choices() {
    return this._choices || [];
  }

  get order() {
    return this._order || [];
  }

  get answer() {
    return this._answer || 0;
  }
  
  set answer(id: number) {
    this._answer = id;
  }

  set choices(items: ExamItem[]) {
    this._choices = items;
    this._order = _.shuffle([...items, this]);
  }

  public isAnswered() : boolean {
    return !!this._answer;
  }

  public isCorrect() : boolean {
    return !!this._answer && this._answer === this._id;
  }
}