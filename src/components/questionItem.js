import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';

@observer
export default class QuestionItem extends React.Component {
	render() {
		const {question} = this.props;

		return (<div>
			<h1 className={'questionText'} key={Math.random()}>{question.text}</h1>
			<hr />
			{question.answers.map(answer =>
				<div className={`answerOption ${this.isSelectedAnswer(question, answer) ? 'selected' : ''}`}
					 onClick={() => this.selectAnswer(answer)}
					 key={Math.random()}>
					<figure>
						<img alt={answer.text} src={answer.image} />
						<figcaption className={'answerText'}>
							{answer.text}
						</figcaption>
					</figure>
				</div>)}
			<hr />
		</div>);
	}

	@action
	selectAnswer = (answer) => {
		this.props.question.selectAnswer(answer);
	};

	isSelectedAnswer = (question, answer) => {
		return question.selectedAnswer && question.selectedAnswer.text === answer.text;
	};
}

QuestionItem.propTypes = {
	question: PropTypes.object.isRequired,
};
