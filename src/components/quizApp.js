import React from 'react';
import {observer} from 'mobx-react';
import QuestionList from './questionList';
import PropTypes from 'prop-types';
import DevTool from 'mobx-react-devtools';
import Result from './result';

@observer
export default class QuizApp extends React.Component {
	render() {
		const {questionStore} = this.props;

		// Initial display Loading... while we fetch the quiz json
		if (!questionStore.quiz.questions)
		{
			questionStore.fetchQuiz();
			return <div>Loading...</div>;
		}

		let headerStyle = {
			'backgroundImage':`url('${questionStore.quiz.header_image}')`,
			'backgroundRepeat':'no-repeat',
			'backgroundSize':'cover'
		};

		return (
			<div className={'container'}>
				<DevTool />
				<header className={'jumbotron header'} style={headerStyle}>
					<h1>
						{questionStore.quiz.title}
					</h1>
				</header>
				<QuestionList questionStore={questionStore}/>
				{questionStore.isQuizDone ? <Result questionStore={questionStore}/> : ''}
			</div>
		);
	}
}

QuizApp.propTypes = {
	questionStore: PropTypes.object.isRequired,
};
