import React from 'react';
import { Row, Col, Card, Radio, Divider } from 'antd'
import _ from 'underscore';

import ExamItem from '../models/ExamItem';
import { ExaminationState } from '../reducer/ExamReducer';


interface ComponentProps {
  item: ExamItem;
  index: number;
  state: ExaminationState;
}

export default class ExamItemComponent extends React.Component<ComponentProps> {
  public constructor(props: ComponentProps) {
    super(props);
  }

  private onChange = (e: any) : void => {
    const { item } = this.props;
    item.answer = e.target.value;
  }

  private formatClassName = (choice : ExamItem) : string | undefined => {
    const { state , item} = this.props;
    if (state !== "done") return undefined;

    if(item.id === choice.id) {
      return 'correct-answer';
    } else if (item.isAnswered() && item.answer === choice.id) {
      return 'incorrect-answer';
    }

    return undefined;
  }

  public render() : React.ReactFragment {
    const { item, index, state } = this.props;
    const choices : ExamItem[] = item.choices;
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            <h3>{index + 1}. {item.excerpt}</h3>
          </Col>
        </Row>
        <Row>
          <Radio.Group disabled={state === "done"} onChange={this.onChange} style={{width: "100%"}}>
            {
              choices.map((choice: ExamItem, index: number) =>
                <Col span={24} key={`choice-${index}`}>
                  <Radio 
                    className={this.formatClassName(choice)} 
                    value={choice.id}>
                    {choice.title}
                  </Radio>
                </Col>
              )
            }
          </Radio.Group>
        </Row>
        <Divider />
      </React.Fragment>
    )
  }
}