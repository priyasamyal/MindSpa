const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const request = require("request");
const mainHandler = {

	/** first intent to call */
	'LaunchRequest': function () {
		getUserData(myResult => {
			console.log('LaunchRequestIntent called...', "result", myResult.quizzes['Anger']);
			this.attributes['CURRENT_STEP'] = 'launch';
			config.CURRENT_INDEX = 0;
			this.emit(':ask', "Hello " + config.user_detail.full_name + config.INTRO_MSG + quiz.mind_fact[0] + " Now you have an idea how powerful mind is and what it can accomplish. To experience its power" + config.ask_for_test);
		})

	},

	'quizTypes': function () {
		console.log('quizTypes called...');
		var type = config.EVENT.request.intent.slots.options.value;
		if (type.toUpperCase() == 'ANGER MANAGEMENT') {
			//	this.attributes['CURRENT_STEP'] = 'anger_test';
			this.attributes['CURRENT_STEP'] = 'ask_for_anger';
			console.log('Anger management opted...');
			this.emit(":ask", config.ANGER_INTRO + " <break time='200ms'/> You can subscribe to our tips on Anger Management. If you want Mind Spa to send you the daily tips on Anger Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/>or to skip this option say  <break time='200ms'/> skip ")
			this.emit("startQuiz");
		}
		else if (config.EVENT.request.intent.slots.options.value == 'stress management') {

		} else {
			console.log("else bolck call");
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},

	'skipIntent': function () {
		console.log('skipIntent called...');
		if (this.attributes['CURRENT_STEP'] == 'launch') {
			this.emit(':ask', 'Seems like you are quite aware of what mind can achieve and accomplish. To optimise its capabilities  <break time="300ms"/>To experience its power ' + config.ask_for_test, "I'm still waiting for your reply.");
		}
	},



	'startQuiz': function () {
		console.log('startQuiz called');
		if (this.attributes['CURRENT_STEP'] == 'anger_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "It's always good to know how much deep inside the  water. <break time='200ms'/>you are so <break time='300ms'/>to measure your temperament. <break time='200ms'/>let's have a small quiz  <break time='400ms'/>"
				}
				console.log(result, "result");
				this.emit(':ask', intro_msg + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},

	'quizResponse': function () {
		console.log('quizResponse called', this.attributes['CURRENT_STEP']);

		if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' && config.EVENT.request.intent.slots.response.value == 'yes') {
			this.attributes['CURRENT_STEP'] = 'anger_test';
			this.emit('startQuiz');
		}

		// if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.value == 'yes') {
		// 	this.emit('AMAZON.YesIntent');
		// }
		// else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.value == 'no') {
		// 	this.emit('AMAZON.CancelIntent');
		// }
		// else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
		// 	this.emit(':ask', "Sorry, I did not hear you. To take the quiz, say <break time='300ms'/>  Yes. To skip it, say <break time='300ms'/> Skip.", "I am still waiting for your response");
		// }
		else if (this.attributes['CURRENT_STEP'] == 'anger_test_over' && config.EVENT.request.intent.slots.response.value == 'yes') {
			this.emit('AMAZON.YesIntent');
		}


		else if (this.attributes['CURRENT_STEP'] == 'anger_test' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			config.CURRENT_INDEX = config.CURRENT_INDEX + 1;
			if (config.CURRENT_INDEX > 4) {
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(config.SCORE_CARD, "SCORE_CARD");
					saveQuizScore(result => {
						console.log(result, "Quiz result");
						if (result.average > 1) {
							this.emit(':ask', "<prosody rate='96%'> Well, Your temperament seems to be good, based on your responses. <break time='300ms'/> Though you can always try our other programmes like Stress Management by saying  <break time='200ms'/> Stress management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>");
						}
						else {
							this.emit(':ask', "<prosody rate='96%'> Thank you for taking the quiz. Based on your responses, you suppose to have a high temperament. but you need not to worry about it. Mind spa will help you control it by telling you some tips and stories and monitoring your progress at regular intervals. </prosody>", "Please speak to select your option?");
						}
						// console.log("end of quiz", result);
						// config.SUBSCRIBE_MSG = "<prosody rate='92%'> We wish you all the best in your endeavour to overcome your anger. You can also try our other programmes like Stress Management by saying <break time='300ms'/>  Stress management <break time='300ms'/>  or for Boosting self confidence just say <break time='300ms'/>  Boost Self Confidence <break time='300ms'/>  or to stop the session say <break time='300ms'/>  STOP </prosody>"
						// config.CURRENT_INDEX = 0;
						// this.attributes['CURRENT_STEP'] = 'anger_test_over'
						// console.log(this.attributes['CURRENT_STEP']);

						config.SCORE_CARD = 0;
						// this.emit(':ask', config.FEEDBACK, "Please speak to select your option?");

					})
				})



			} else {
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(result, "score till now.");
				})
				findOptions(result => {
					this.emit(':ask', result, "I'm still waiting for your reply. Repeating the current question" + result);
				})
			}
		}
		else {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})

		}

	},



};

function findScore(response, callback) {
	var score = '1'
	console.log("Find Score", response, config.CURRENT_INDEX);
	if (config.EVENT.session.attributes.CURRENT_STEP == "anger_test") {
		if (response.toUpperCase() == 'NEVER') {
			score = "2";
		} else if (response.toUpperCase() == 'SELDOM') {
			score = "3";
		}
		quiz.anger_quiz[config.CURRENT_INDEX - 1].options.map(res => {
			if (res.question_option.toUpperCase() == response.toUpperCase()) {
				config.SCORE_CARD["quiz"].push({
					"quiz_id": quiz.anger_quiz[config.CURRENT_INDEX - 1].quiz_id,
					"quiz_question_id": quiz.anger_quiz[config.CURRENT_INDEX - 1].quiz_question_id,
					"option_id": res.option_id,
					"score": score
				})
			}

		})

		console.log(config.SCORE_CARD, "SCORE_CARD");

		callback('success');


		var tipsString =
			"You can also subscribe  to our tips on anger management. If you want Mind Spa to send you the daily tips on Anger and to keep track of your behaviour, then say <break time='300ms'/> Yes <break time='300ms'/> or to skip this option say <break time='300ms'/> skip."


		config.FEEDBACK =
			'Your anger expression is likely getting you into serious trouble with others. It would probably be worthwhile to seek professional help. ' + tipsString;


		console.log('score total:', config.SCORE_CARD);
	}


}


function findOptions(callback) {
	if (config.EVENT.session.attributes.CURRENT_STEP == 'mind_test') {
		console.log(config.CURRENT_INDEX, "find option")
		var option = "";
		quiz.mind_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res + "<break time='300ms'/>";
		})
		var message = quiz.mind_quiz[config.CURRENT_INDEX].value + "<break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}

	else if (config.EVENT.session.attributes.CURRENT_STEP == 'anger_test') {
		//	console.log(quiz.anger_quiz, "anger quiz");
		//	console.log(config.CURRENT_INDEX, "find option anger_test")
		var option = "";
		quiz.anger_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.anger_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}
}


var https = require('https');
function getUserData(callback) {
	console.log("getUserData");
	var get_options = {
		host: "prologic-technologies.com",
		path: "/demo/mindspa/getCommonDetails.php?access_token=" + config.access_token,
		method: 'GET',
	};
	var get_req = https.request(get_options, res => {
		res.setEncoding('utf8');
		var rawData = '';
		res.on('data', chunk => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				config.user_detail = parsedData.user_detail;
				console.log(config.user_detail, "result");
				quiz.anger_quiz = parsedData.quizzes['Anger'];
				quiz.stress_quiz = parsedData.quizzes['Stress'];
				quiz.confidence_quiz = parsedData.quizzes['Confidence'];
				quiz.mind_fact = parsedData.mind_facts;
				console.log(parsedData, "parsedData");
				callback(parsedData);
			} catch (e) {
				console.error(e.message);
			}

		});
	});

	get_req.end();

}

function saveQuizScore(callback) {
	console.log(config.SCORE_CARD);
	var post_data = config.SCORE_CARD;
	console.log("saveQuizScore");
	var post_options = {
		host: "prologic-technologies.com",
		path: "/demo/mindspa/saveQuizScore.php?access_token=" + config.access_token,
		method: 'post',
		headers: {
			'content-type': 'application/json',
			"Content-Length": Buffer.byteLength(JSON.stringify(post_data)),
		},
	};
	var post_req = https.request(post_options, res => {
		res.setEncoding('utf8');
		var rawData = '';
		res.on('data', chunk => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				callback(parsedData);
			} catch (e) {
				console.error(e.message);
			}

		});
	});
	post_req.write(JSON.stringify(post_data));
	post_req.end();

}

function getQuizSubscription(callback) {

	var post_data = {
		"quiz_id": "1"
	}
	console.log("getQuizSubscription");
	var post_options = {
		host: "prologic-technologies.com",
		path: "/demo/mindspa/getQuizSubscription.php?access_token=" + config.access_token,
		method: 'post',
		headers: {
			'content-type': 'application/json',
			"Content-Length": Buffer.byteLength(JSON.stringify(post_data)),
		},
	};
	var post_req = https.request(post_options, res => {
		res.setEncoding('utf8');
		var rawData = '';
		res.on('data', chunk => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				callback(parsedData);
			} catch (e) {
				console.error(e.message);
			}

		});
	});
	post_req.write(JSON.stringify(post_data));
	post_req.end();

}

module.exports = mainHandler;
