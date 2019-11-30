import React from 'react';
import { Row, Button, Col, Card, Checkbox } from 'antd';

import '../styles/introduction.scss';

interface State {
  accepted: boolean;
}

export default class Introduction extends React.Component<any, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      accepted: false,
    }
  }

  private onCheckboxTick = (event: any) => {
    if(event.target && event.target.checked) {
      this.setState({
        accepted: event.target.checked,
      });
    }
  }

  public render() : React.ReactFragment {
    return <Card id="introduction-card">
      <Row>
        <Col span={24}>
          <ol>
            <li>This is a timed exam (30 seconds per item).</li>
            <li>Once time has been completed, unanswered questions will be marked as incorrect.</li>
            <li>This is just a practice exam.</li>
            <li>After the exam you can review your answers and know the correct answers.</li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox onChange={this.onCheckboxTick}>I accept the rules stated.</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="primary" disabled={!this.state.accepted} href="/exam"> Start Exam</Button>
        </Col>
      </Row>
    </Card>
  }
}