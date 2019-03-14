import React from 'react';
import {observer} from 'mobx-react';
import QuestionItem from './questionItem';
import PropTypes from 'prop-types';

@observer
export default class QuestionList extends React.Component {
	render() {
		const {questionStore} = this.props;
		return <section className="questionListContainer">
			<ul className="questionList">
				{questionStore.questions.map(question =>
					(<QuestionItem
						key={Math.random()}
						question={question}
					/>)
				)}
			</ul>
		</section>
	}
}

QuestionList.propTypes = {
	questionStore: PropTypes.object.isRequired,
};
