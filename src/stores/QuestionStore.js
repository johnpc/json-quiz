import {observable, computed, action} from 'mobx';
import QuestionModel from '../models/QuestionModel'
import FetchQuizJson from '../fetchQuizJson'

export default class QuestionStore {
	@observable quiz = [];
	@observable questions = [];

	@computed get winningAnswer() {

		// Creates an object with answer_ids as keys
		// and sums of scores for each answer as values
		let scores = {};
		this.quiz.answers.forEach(answer => {
			scores[answer.id] = this.questions.reduce(function(sum, question) {
				if (sum !== parseInt(sum, 10))
					sum = 0;

				return sum + question.selectedAnswer.score[answer.id];
			});
		});

		// Fetches the answer_id (the key of our scores object) with the highest sum of scores (the value)
		let max_key = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
		return this.quiz.answers.find(answer => answer.id === max_key);
	}

	@action
	fetchQuiz() {
		// Only fetch the quiz once
		if (this.quiz.questions)
			return;

		FetchQuizJson.fetch().then(
			quiz => {
				this.questions = quiz.questions.map(item => QuestionModel.fromJS(item));
				this.quiz = quiz;
			},
			error => {
				console.log(error);
			}
		)
	}

	@computed get isQuizDone() {
		return this.questions.every(question => question.selectedAnswer);
	}
}
