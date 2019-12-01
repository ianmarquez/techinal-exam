import React from 'react';
import { Row, Col } from 'antd';

import '../styles/timer.scss';

interface ComponentProps {
  itemLength: number;
  onTimerEnd: () => void;
  onUnmount: (timeLeft: number) => void;
}

interface State {
  timeRemaining: number; //in seconds
}
const TIME_PER_ITEM = 30;

export default class pTimer extends React.Component<ComponentProps, State> {
  private timer: any;
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      timeRemaining: props.itemLength * TIME_PER_ITEM, //limit in seconds
    }
  }

  componentDidMount() : void  {
    this.startTimer();
  }

  componentWillUnmount() : void {
    const { onUnmount, itemLength} = this.props;
    clearInterval(this.timer);
    onUnmount(itemLength * TIME_PER_ITEM - this.state.timeRemaining);
  }

  private startTimer = () => {
    this.setState({
      timeRemaining: this.state.timeRemaining
    }, () => {
      this.timer = setInterval(() => {
        if (this.state.timeRemaining === 0) {
          this.props.onTimerEnd();
          clearInterval(this.timer);
        } else {
          this.setState({
            timeRemaining: this.state.timeRemaining - 1
          })
        }
      }, 1000)
    })
  }

  public render() : React.ReactFragment {
    return (
      <React.Fragment>
        <Row id="timer-container">
          <Col span={24}>
            Time Remaining: <h3>{this.state.timeRemaining}</h3>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}