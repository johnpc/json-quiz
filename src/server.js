import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import QuizApp from './components/quizApp';
import QuestionStore from './stores/QuestionStore';
import React from 'react';
import { renderToString } from 'react-dom/server'

const app = express();
app.use('/public', express.static(path.join(__dirname, '../public')));

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
	return `
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
			<link rel="stylesheet" href="/public/index.css">
		</head>
		<body>
			<section id="quizapp" class="quizapp">${html}</section>
			<script src="/static/bundle.js"></script>
			<footer class="info">
				<p>Template created with <a href="http://github.com/johnpc/json-quiz">johnpc/json-quiz</a></p>
			</footer>
		</body>
	</html>
	`
};

app.use(bodyParser.json());

app.get('/', function(req, res) {
	let questionStore = new QuestionStore();
	const initView = renderToString((
		<QuizApp questionStore={questionStore}/>
	));

	const page = renderFullPage('');

	res.status(200).send(page);
});


app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
	console.error('Error on request %s %s', req.method, req.url);
	console.error(err.stack);
	res.status(500).send('Server error');
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
