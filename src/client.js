import QuestionStore from './stores/QuestionStore';
import QuizApp from './components/quizApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

let questionStore = new QuestionStore();

ReactDOM.render(
	<QuizApp questionStore={questionStore}/>,
	document.getElementById('quizapp')
);

if (module.hot) {
  module.hot.accept('./components/quizApp', () => {
    var NewQuizApp = require('./components/quizApp').default;
    ReactDOM.render(
      <NewQuizApp questionStore={questionStore}/>,
      document.getElementById('quizapp')
    );
  });
}