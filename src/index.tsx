import React from 'react';
import ReactDOM from 'react-dom';
import { useRoutes } from 'hookrouter';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import SplashScreen from './components/SplashScreen';
import ExamComponent from './components/ExamComponent';
import Introduction from './components/Introduction';
import ExamReducer from './reducer/ExamReducer';

import './styles/index.scss';
import "antd/dist/antd.css";

const routes = {
  "/": () => <SplashScreen />,
  "/introduction": () => <Introduction />,
  "/exam": () => <ExamComponent />
}

const App = () => {
  const routeResult = useRoutes(routes);
  return routeResult;
}

const store = createStore(
  ExamReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
