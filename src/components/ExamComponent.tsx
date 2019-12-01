import React from 'react';
import axios, { AxiosResponse } from 'axios';
import _ from 'underscore';
import { connect } from 'react-redux';
import { message, Skeleton, Button, Card, Modal, Row, Col, Affix} from 'antd';
import { Dispatch } from 'redux';

import ExamActions from '../action/ExamActions';
import ExamItemComponent from './ExamItemComponent';
import { ExaminationState } from '../reducer/ExamReducer';
import ExamItem, { ExamQuestionObj } from '../models/ExamItem';
import Timer from './Timer';

export interface RouteProps {
  page?: number;
}

interface StoreProps {
  items: ExamItem[];
  state: ExaminationState;
}

interface DispatchProps {
  setExamItems: (items: ExamQuestionObj[]) => void;
  setExamState: (state: ExaminationState, items: ExamItem[]) => void;
}

type Props = RouteProps & StoreProps & DispatchProps;

interface State {
  timeSpent: number
}

class ExamComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      timeSpent: 0,
    }
  }

  public async componentDidMount() : Promise<void> {
    const { items, setExamItems } = this.props;
    if (items.length === 0) {
      try {
        const results : AxiosResponse = await axios.get('https://api.binance.vision/api/glossaries/');
        setExamItems && setExamItems(results.data as ExamQuestionObj[]);
      } catch (err) {
        console.error(err);
        message.error('An Error has occurred fetching items from glossary')
      }
    }
  }

  private renderExamWizard = () : React.ReactFragment => {
    const { items, state } = this.props;
    return items.map((item: ExamItem, index: number) => 
      <ExamItemComponent key={index} item={item} index={index} state={state}/>
    )
  }

  private validateAnswers = () : void => {
    const { setExamState, items } = this.props; 
    this.viewResults();
    setExamState('done', items);
  }

  private onButtonSubmit = () : void => {
    const { items } = this.props;
    const incomplete = _.find(items, (item: ExamItem) => !item.isAnswered());
    if (incomplete) {
      Modal.confirm({
        content: "Are you sure you want to submit the test while it's incomplete?",
        onOk: () => {
          this.validateAnswers();
        },
      });
    } else {
      this.validateAnswers();
    }
  }

  private viewResults = () : void => {
    const { items } = this.props;
    const correctItems: ExamItem[] = _.filter(items, (item: ExamItem) => item.isCorrect()); 
    Modal.destroyAll();
    Modal.info({
      content: <Row style={{ textAlign: 'center' }}>
        <Col span={24}>
          <p>User score is</p>
          <h1>{correctItems.length}/{items.length}</h1>
          <p>You spent a total of {this.state.timeSpent} seconds</p>
          <p>You spend an average of {this.state.timeSpent/items.length} seconds per question.</p>
        </Col>
        <Col span={24}>
          <p>Close this modal to review your answers to the exam.</p>
        </Col>
      </Row>,
      icon: null
    })
  }

  private onTimerUnmount = (timeRemaining: number) : void => {
    this.setState({
      timeSpent: timeRemaining
    }, () => {
      this.validateAnswers();
    })
  }

  public render() : React.ReactFragment {
    const { items, state } = this.props;
    return <React.Fragment>
      <Card>
        {items.length > 0 && state !== 'done' && <Affix>
          <Timer itemLength={items.length} onTimerEnd={() => this.validateAnswers()} onUnmount={this.onTimerUnmount}/>
        </Affix>}
        {items.length === 0 ? <Skeleton active /> : this.renderExamWizard()}
        {state !== 'done' ? <Button onClick={this.onButtonSubmit} type="primary" style={{float: "right"}}>
          Submit
        </Button> :
        <React.Fragment>
            <Button type="primary" href="/" style={{ float: "right", marginLeft: '10px'}}>
            Retake Exam
          </Button>
          <Button onClick={this.viewResults} style={{ float: "right" }}>
            Click to View Summary
          </Button>
        </React.Fragment>
        }
      </Card>
    </React.Fragment>
  }
}


const mapStateToProps = (state: any) : StoreProps => {
  return {
    ...state.exam
  };
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => {
  const examActions = new ExamActions(dispatch);
  return {
    setExamItems: (items: ExamQuestionObj[]) => examActions.setExamItems(items),
    setExamState: (state: ExaminationState, items: ExamItem[]) => examActions.setExamState(state, items),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamComponent);