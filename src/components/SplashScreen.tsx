import React from 'react';
import {Row, Col, Card, Button} from 'antd'


export default class SplashScreen extends React.Component {
  public render() : React.ReactFragment {
    return <Card title={<h3>Take the exam now!</h3>} id="splash-screen">
      <Row>
        <Col span={24} >
          <p>
            This is a simple exam containing crypto-currency terminologies.
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="primary" href="/introduction">Start Exam</Button>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={24}>
          <small>This is a technical exam created by Ian Marquez</small>
        </Col>
      </Row>
    </Card>
  }
}