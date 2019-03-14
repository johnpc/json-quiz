import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class Result extends React.Component {
	render() {
		const {questionStore} = this.props;
		let winningAnswer = questionStore.winningAnswer;

		return (
			<div id={'answerContainer'}>
				<hr />
				<h1 id={'winningAnswerTitle'} key={Math.random()}>{winningAnswer.title}</h1>
				<p id={'winningAnswerDescription'} key={Math.random()} dangerouslySetInnerHTML={{__html: winningAnswer.description}}></p>
				<hr />
			</div>
		);
	}
}

Result.propTypes = {
	questionStore: PropTypes.object.isRequired,
};
