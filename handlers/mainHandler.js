const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const request = require("request");
const mainHandler = {

	/** first intent to call */
	'LaunchRequest': function () {

		getUserData(myResult => {
			var index = Math.floor(Math.random() * Math.floor(quiz.mind_fact.length - 1));
			console.log(index);
			console.log('LaunchRequestIntent called...', "result", myResult.quizzes['Anger']);
			this.attributes['CURRENT_STEP'] = 'launch';
			config.CURRENT_INDEX = 0;

			if (myResult.tips.length > 0) {
				config.behaviour_tip = myResult.tips;
				var sayTip = "";
				myResult.tips.map(res => {
					if (res.quiz_id == 1) {
						sayTip += "Your Todays Tip on Anger Management is <break time='200ms'/> " + res.tip_description + " <break time='300ms'/> I hope you'll  practise this in your daily life.";
						console.log(res.behaviour.quiz_id, "res.behaviour.quiz_id");

						if (res.behaviour.quiz_id != undefined) {
							config.behaviour_index = config.behaviour_index + 1;
							this.attributes['CURRENT_STEP'] = 'tip_behaviour';
							config.behaviour_quiz_id = res.behaviour.quiz_id;
							sayTip += " <break time='400ms'/>   Mind Spa would like to rate your anger behaviour across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];

							this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='200ms'/> " + config.Stress_tip + "<break time='300ms'/> " + config.Confidence_tip + " <break time='200ms' />" + sayTip + " <break time='300ms'/> </prosody>");

						}

					} else if (res.quiz_id == 2) {
						console.log("Self confidence", sayTip, config.Stress_tip);

						config.Confidence_tip = "Your todays Tip on Boosting self confidence is <break time='200ms'/> " + res.tip_description + "<break time='200ms'/>  I hope you'll  practise this in your daily life. "

						if (res.behaviour.quiz_id != undefined) {
							config.behaviour_index = config.behaviour_index + 1;
							this.attributes['CURRENT_STEP'] = 'tip_behaviour';
							config.behaviour_quiz_id = res.behaviour.quiz_id;
							config.Confidence_tip += " <break time='400ms'/>   Mind Spa would like to rate your self confidence across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];
							console.log("Self confidence config.Confidence_tip", config.Confidence_tip);
							if (sayTip == '' && config.Stress_tip == '') {
								this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
							} else if (sayTip != '' && config.Stress_tip == '') {
								this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='200ms'/> " + sayTip + " <break time='400ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
							} else if (sayTip == '' && config.Stress_tip != '') {
								this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Stress_tip + "<break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
							} else {
								this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='200ms'/> " + "sayTip" + "<break time='300ms'/>  " + "config.Stress_tip" + "<break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
							}


						}
					} else {
						console.log("come in stress section");
						config.Stress_tip = " Your todays Tip on Stress management is <break time='200ms'/> " + res.tip_description + "<break time='200ms'/> I hope you'll  practise this in your daily life. "

						if (res.behaviour.quiz_id != undefined) {
							this.attributes['CURRENT_STEP'] = 'tip_behaviour';
							console.log("come in stress section1");
							config.behaviour_quiz_id = res.behaviour.quiz_id;
							config.behaviour_index = config.behaviour_index + 1;
							config.Stress_tip += " <break time='400ms'/>   Mind Spa would like to rate your self confidence across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];
							console.log("come in stress section2", sayTip, config.Confidence_tip);
							// this.emit(":ask", "<prosody rate = '92%'>Hello " + config.user_detail.full_name + " <break time='200ms'/>Welcome back <break time=200ms'/> " + sayTip + "</prosody>");
							this.emit(':ask', "<prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='200ms'/> " + sayTip + "<break time='300ms'/>  " + config.Stress_tip + "</prosody>");
						}
					}
				})
				this.emit(':tell', " <prosody rate='92%'> Hello " + config.user_detail.full_name + "<break time='200ms'/>Welcome back " + sayTip + " <break time='300ms'/>" + config.Confidence_tip + " <break time='300ms'/> " + config.Stress_tip + "</prosody>")

			}

			else {
				this.emit(':ask', " <prosody rate='92%'> Hello " + config.user_detail.full_name + config.INTRO_MSG + " <break time='400ms'/>" + quiz.mind_fact[index] + "<break time='400ms'/> " + quiz.mind_fact[index + 1] + "<break time='400ms'/>   Now you have an idea how powerful mind is, and what it can accomplish. To experience its power  " + config.ask_for_test + "</prosody>", config.ask_for_test);
			}

		})

	},

	'quizTypes': function () {
		console.log('quizTypes called...');
		var type = config.EVENT.request.intent.slots.options.value;
		if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Anger management") {
			this.attributes['CURRENT_STEP'] = 'ask_for_anger';
			console.log('Anger management opted...');
			this.emit(":ask", config.ANGER_INTRO + " <break time='200ms'/> You can subscribe to our tips on Anger Management. If you want Mind Spa to send you the daily tips on Anger Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/>or to skip this option say  <break time='200ms'/> skip ")
			//this.emit("startQuiz");
		}

		else if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Boost self confidence") {
			this.attributes['CURRENT_STEP'] = 'ask_for_confidence';
			console.log('Boost self confidence opted...', quiz.confidence_quiz);
			this.emit(":ask", config.CONFIDENCE_INTRO + " <break time='200ms'/> You can subscribe to our tips on Self Confidence. If you want Mind Spa to send you the daily tips on boosting self confidence and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ")
			//	this.emit("startQuiz");

		} else if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Stress Management") {

			this.attributes['CURRENT_STEP'] = 'ask_for_stress';
			console.log('Stress Management opted...');
			this.emit(":ask", config.STRESS_INTRO + " <break time='200ms'/> You can subscribe to our tips on Stress Management. If you want Mind Spa to send you the daily tips on Stress Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ");
			//this.emit("startQuiz");
		}
	},

	'skipIntent': function () {
		console.log('skipIntent called...');
		var type = "anger";
		var index = Math.floor(Math.random() * Math.floor(quiz.angerTips.length - 1));
		var tip = quiz.angerTips[index].description;
		if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence') {
			type = "low self esteem";
			index = Math.floor(Math.random() * Math.floor(quiz.confidenceTips.length - 1));
			tip = quiz.confidenceTips[index].tip;
		}
		if (this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
			type = "stress";
			index = Math.floor(Math.random() * Math.floor(quiz.stressTips.length - 1));
			tip = quiz.confidenceTips[index].tip;
		}
		if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' || this.attributes['CURRENT_STEP'] == 'ask_for_confidence' || this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
			this.emit(':tell', '<prosody rate="92%">No problem, In case you change your mind later on. Remember  Mind spa is always there to help you with your ' + type + '. Here is  a complementary tip for you ' + tip + "  <break time='200ms'/>  I hope you will practise this tip. Thank you </prosody>");
		}
	},



	'startQuiz': function () {
		console.log('startQuiz called');
		if (this.attributes['CURRENT_STEP'] == 'anger_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "<prosody rate='92%'>It's always good to know how much deep inside the  water. <break time='200ms'/>you are so <break time='300ms'/>to measure your temperament. <break time='200ms'/>let's have a small quiz  <break time='400ms'/></prosody>"
				}
				console.log(result, "result");
				this.emit(':ask', intro_msg + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'confidence_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "<prosody rate='92%'>Confidence is a key element  in building a person perception. Lack of it will have a negative impact. to measure yours,  here is a small quiz  <break time='400ms'/> </prosody> "
				}
				console.log(result, "result");
				this.emit(':ask', intro_msg + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'stress_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "<prosody rate='92%'>Stress can exacerbate many serious health problems. Let’s checkout your current stress level by taking a small quiz and then we will move ahead. <break time='400ms'/> </prosody>"
				}
				console.log(result, "result");
				this.emit(':ask', intro_msg + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},

	'quizResponse': function () {
		console.log('quizResponse called', this.attributes['CURRENT_STEP']);


		if (this.attributes['CURRENT_STEP'] == 'ask_for_anger') {
			getQuizSubscription(quiz.anger_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");
				this.attributes['CURRENT_STEP'] = 'anger_test';
				this.emit('startQuiz');
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence') {
			getQuizSubscription(quiz.confidence_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");
				this.attributes['CURRENT_STEP'] = 'confidence_test';
				this.emit('startQuiz');
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
			getQuizSubscription(quiz.stress_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");
				this.attributes['CURRENT_STEP'] = 'stress_test';
				this.emit('startQuiz');
			})
		}

		else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {


			saveQuizBehaviour(config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].values[0].value.name, result => {
				console.log(result, "saveQuizBehaviour");
				if (config.behaviour_tip.length > config.behaviour_index) {
					config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
					config.behaviour_index = config.behaviour_index + 1;
					if (config.behaviour_quiz_id == 2) {
						this.emit(':ask', " <prosody rate='92%'>" + config.Confidence_tip + " <break time='300ms'/> </prosody>");
					}
					else if (config.behaviour_quiz_id == 3) {
						this.emit(':ask', " <prosody rate='92%'>" + config.Stress_tip + " <break time='300ms'/> </prosody>");
					}

				} else {
					this.emit(':ask', "<prosody rate='92%'> Thanks for your response. Keep practising Mind Spa tips. We hope to make a difference in your life. You can try our other experiential learning programmes like anger management by saying <break time='300ms'/>  Anger Management or for Stress Management  say <break time='300ms'/>  Stress management <break time='300ms'/> or for boosting self confidence say <break time='300ms'/>  Boost self confidence <break time='300ms'/>  or  to stop this session say <break time='300ms'/>  stop  </prosody>");
				}
			})
		}

		else if (this.attributes['CURRENT_STEP'] == 'stress_test' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			config.CURRENT_INDEX = config.CURRENT_INDEX + 1;
			if (config.CURRENT_INDEX > 4) {
				var index = Math.floor(Math.random() * Math.floor(quiz.stressTips.length - 1));
				var tip = quiz.stressTips[index].tip;
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(config.SCORE_CARD, "SCORE_CARD");
					saveQuizScore(result => {
						config.CURRENT_INDEX = 0;
						console.log(result, "Quiz result");
						if (result.average > 1) {
							this.emit(':ask', "<prosody rate='90%'> Well, Your stress level seems to be good, based on your responses. here is your first tip on stress management <break time='300ms'/> " + tip + " <break time='300ms'/> Though you can always try our other programmes like Anger Management by saying  <break time='200ms'/> anger management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>");
						}
						else {
							this.emit(':ask', "<prosody rate='90%'> Thank you for taking the quiz. Based on your responses, you suppose to have a high stress level. but you need not to worry about it. Mind spa will help you control it by telling you some tips and stories and monitoring your progress at regular intervals. here is your first tip on boosting self confidence  <break time='300ms'/>" + tip + " Though you can always try our other programmes like Anger Management by saying  <break time='200ms'/> anger management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP   </prosody>", "Please speak to select your option?");
						}
						config.SCORE_CARD["quiz"] = [];

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
		else if (this.attributes['CURRENT_STEP'] == 'confidence_test' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			config.CURRENT_INDEX = config.CURRENT_INDEX + 1;
			if (config.CURRENT_INDEX > 4) {
				var index = Math.floor(Math.random() * Math.floor(quiz.confidenceTips.length - 1));
				var tip = quiz.confidenceTips[index].tip;
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(config.SCORE_CARD, "SCORE_CARD");
					saveQuizScore(result => {
						console.log(result, "Quiz result");
						if (result.average > 1) {
							config.CURRENT_INDEX = 0;
							this.emit(':ask', "<prosody rate='90%'> Well, Your confidence level seems to be good, based on your responses. here is your first tip on boosting self confidence <break time='300ms'/> " + tip + "  <break time='300ms'/> Though you can always try our other programmes like Anger Management by saying  <break time='200ms'/> anger management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>");
						}
						else {
							this.emit(':ask', "<prosody rate='90%'> Thank you for taking the quiz. Based on your responses, you suppose to have a high temperament. but you need not to worry about it. Mind spa will help you control it by telling you some tips and stories and monitoring your progress at regular intervals. here is your first tip on boosting self confidence  <break time='300ms'/>" + tip + " Though you can always try our other programmes like Anger Management by saying  <break time='200ms'/> anger management  or for stress management say  <break time='200ms'/>Stress management or to stop the session say  <break time='200ms'/> STOP   </prosody>", "Please speak to select your option?");
						}
						config.SCORE_CARD["quiz"] = [];

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
		else if (this.attributes['CURRENT_STEP'] == 'anger_test' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			config.CURRENT_INDEX = config.CURRENT_INDEX + 1;
			if (config.CURRENT_INDEX > 4) {
				var index = Math.floor(Math.random() * Math.floor(quiz.angerTips.length - 1));
				var tip = quiz.angerTips[index].description;
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(config.SCORE_CARD, "SCORE_CARD");
					saveQuizScore(result => {
						config.CURRENT_INDEX = 0;
						console.log(result, "Quiz result");
						if (result.average > 1) {
							this.emit(':ask', "<prosody rate='90%'> Well, Your temperament seems to be good, based on your responses. here is your first tip on anger management  <break time='300ms'/>" + tip + "  <break time='300ms'/> Though you can always try our other programmes like Stress Management by saying  <break time='200ms'/> Stress management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>", "Please speak to select your option?");
						}
						else {
							this.emit(':ask', "<prosody rate='90%'> Thank you for taking the quiz. Based on your responses, you suppose to have a high temperament. but you need not to worry about it. Mind spa will help you control it by telling you some tips and stories and monitoring your progress at regular intervals. here is your first tip on anger management  <break time='300ms'/> " + tip + " <break time='300ms'/> Though you can always try our other programmes like Stress Management by saying  <break time='200ms'/> Stress management  or for Boosting self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>", "Please speak to select your option?");
						}
						config.SCORE_CARD["quiz"] = [];

					})
				})



			} else {
				findScore(config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].values[0].value.name, result => {
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
			score = "3";
		} else if (response.toUpperCase() == 'SELDOM') {
			score = "2";
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

	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == "confidence_test") {
		if (response.toUpperCase() == 'NEVER') {
			score = "3";
		} else if (response.toUpperCase() == 'SELDOM') {
			score = "2";
		}
		quiz.confidence_quiz[config.CURRENT_INDEX - 1].options.map(res => {
			if (res.question_option.toUpperCase() == response.toUpperCase()) {
				config.SCORE_CARD["quiz"].push({
					"quiz_id": quiz.confidence_quiz[config.CURRENT_INDEX - 1].quiz_id,
					"quiz_question_id": quiz.confidence_quiz[config.CURRENT_INDEX - 1].quiz_question_id,
					"option_id": res.option_id,
					"score": score
				})
			}
		})
		callback('success');
		console.log('score total:', config.SCORE_CARD);
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == "stress_test") {
		if (response.toUpperCase() == 'NEVER') {
			score = "3";
		} else if (response.toUpperCase() == 'SELDOM') {
			score = "2";
		}
		quiz.stress_quiz[config.CURRENT_INDEX - 1].options.map(res => {
			if (res.question_option.toUpperCase() == response.toUpperCase()) {
				config.SCORE_CARD["quiz"].push({
					"quiz_id": quiz.stress_quiz[config.CURRENT_INDEX - 1].quiz_id,
					"quiz_question_id": quiz.stress_quiz[config.CURRENT_INDEX - 1].quiz_question_id,
					"option_id": res.option_id,
					"score": score
				})
			}

		})
		callback('success');
		console.log('score total:', config.SCORE_CARD);
	}


}


function findOptions(callback) {
	if (config.EVENT.session.attributes.CURRENT_STEP == 'anger_test') {
		var option = "";
		quiz.anger_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.anger_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == 'confidence_test') {
		var option = "";
		quiz.confidence_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.confidence_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == 'stress_test') {
		var option = "";
		quiz.stress_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.stress_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>" + option
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

function getQuizSubscription(id, callback) {
	var post_data = {
		"quiz_id": id
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
				console.log(parsedData, "parsedData");
				callback(parsedData);
			} catch (e) {
				console.error(e.message);
			}

		});
	});
	post_req.write(JSON.stringify(post_data));
	post_req.end();

}

function saveQuizBehaviour(ans, callback) {
	var post_data = {
		quiz_id: config.behaviour_quiz_id,
		answer: ans
	}
	console.log("saveQuizBehaviour post data", post_data);
	var post_options = {
		host: "prologic-technologies.com",
		path: "/demo/mindspa/saveQuizBehaviour.php?access_token=" + config.access_token,
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
				console.log(parsedData, "parsedData");
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
