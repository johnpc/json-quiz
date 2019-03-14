import {observable} from 'mobx';

export default class QuestionModel {
	background_image;
	text;
	answers;
	@observable selectedAnswer;

	constructor(background_image, text, answers, selectedAnswer) {
		this.background_image = background_image;
		this.text = text;
		this.answers = answers;
		this.selectedAnswer = selectedAnswer;
	}

	selectAnswer(answer) {
		this.selectedAnswer = answer;
	}

	static fromJS(object) {
		return new QuestionModel(object.background_image, object.text, object.answers, object.selectedAnswer);
	}
}
