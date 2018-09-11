const config = require('../config.js');
const quiz = require('../lib/quiz.js');

const mainHandler = {
	/** first intent to call */
	'LaunchRequest': function () {
		console.log('LaunchRequestIntent called...');
		this.attributes['CURRENT_STEP'] = 'launch';
		config.CURRENT_INDEX = 0;
		this.response.speak(config.INTRO_MSG).listen(config.INTRO_REPROMPT);
		this.emit(':responseReady');
	},

	'skipIntent': function () {
		console.log('skipIntent called...');

		if (this.attributes['CURRENT_STEP'] == 'launch') {
			this.emit(':ask', 'Seems like you are quite aware of what mind can achieve and accomplish. To optimise its capabilities  <break time="300ms"/>To experience its power ' + config.ask_for_test, "I'm still waiting for your reply.");
		}
	},
	'selectSubscription': function () {
		console.log('selectSubscription called...', config.SUBSCRIBE_MSG);
		this.attributes['CURRENT_STEP'] = "user_subscribed";
		var type = config.EVENT.request.intent.slots.type.value;
		console.log('type');
		this.emit(':ask', "Thanks for subscribing to our" + type + " tips. " + config.SUBSCRIBE_MSG);
	},
	'quizTypes': function () {
		console.log('quizTypes called...');
		var type = config.EVENT.request.intent.slots.options.value;
		if (type.toUpperCase() == 'ANGER MANAGEMENT') {
			console.log('if block');
			console.log('Anger management opted...');
			this.attributes['CURRENT_STEP'] = 'anger_quiz_intro'
			this.emit(':ask', "Let us run through a small quiz to gauge your Current Anger Level to move further. Shall I start the quiz? ");
		} else if (config.EVENT.request.intent.slots.options.value == 'stress management') {

		} else {
			console.log("else bolck call");
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},
	'startQuiz': function () {
		console.log('startQuiz called');
		if (this.attributes['CURRENT_STEP'] == 'mind_test') {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', result, "I'm still waiting for your reply. Repeating the current question" + result);
			})

		}

		else if (this.attributes['CURRENT_STEP'] == 'anger_test') {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},

	'quizResponse': function () {
		console.log('quizResponse called');

		if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.value == 'yes') {
			this.emit('AMAZON.YesIntent');
		}
		else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.value == 'no') {
			this.emit('AMAZON.CancelIntent');
		}
		else if (this.attributes['CURRENT_STEP'] == 'anger_quiz_intro' && config.EVENT.request.intent.slots.response.value == 'yes') {
			this.emit('AMAZON.YesIntent');
		}
		else if (this.attributes['CURRENT_STEP'] == 'mind_test_over' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(':ask', "Mind Spa can help you with Anger Management, Self Confidence, and Stress Management. Please speak to select your option?", "Please speak to select your option?");
		}
		else if (this.attributes['CURRENT_STEP'] == 'mind_test' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			config.CURRENT_INDEX = config.CURRENT_INDEX + 1;
			if (config.CURRENT_INDEX > 4) {

				this.emit(':ask', config.FEEDBACK, "Please speak to select your option?");
				config.CURRENT_INDEX = 0;
				this.attributes['CURRENT_STEP'] == 'mind_test_over';
				config.SCORE_CARD = 0;

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

				config.SUBSCRIBE_MSG = "<prosody rate='92%'> We wish you all the best in your endeavour to overcome your anger. You can also try our other programmes like Stress Management by saying <break time='300ms'/>  Stress management <break time='300ms'/>  or for Boosting self confidence just say <break time='300ms'/>  Boost Self Confidence <break time='300ms'/>  or to stop the session say <break time='300ms'/>  STOP </prosody"

				this.emit(':ask', config.FEEDBACK, "Please speak to select your option?");
				config.CURRENT_INDEX = 0;
				this.attributes['CURRENT_STEP'] == 'anger_test_over'
				config.SCORE_CARD = 0;

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

	}


};

function findScore(response, callback) {
	console.log("Find Score", response);
	if (config.EVENT.session.attributes.CURRENT_STEP == "mind_test") {
		console.log("mind_test Score");
		if (response == 'yes') {
			config.SCORE_CARD = config.SCORE_CARD + 1;
			callback('success');
		} else if (response == 'no') {
			config.SCORE_CARD = config.SCORE_CARD + 2;
			callback('success');
		}

		if (config.SCORE_CARD > 6) {
			console.log("scorecard is", config.SCORE_CARD);
			config.FEEDBACK = 'Wow, seems like you are quite aware of what mind can achieve and accomplish. To optimise its capabilities,  ' + config.ask_for_test;
		} else {
			console.log("scorecard is", config.SCORE_CARD);
			config.FEEDBACK = 'Well, you must be pondering how powerful mind is <break time="300ms"/> and what it can accomplish.  <break time="300ms"/>To experience its power' + config.ask_for_test;
		}
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == "anger_test") {
		if (response == 'never') {
			config.SCORE_CARD = config.SCORE_CARD + 1;
			callback('success');
		} else if (response == 'rarely') {
			config.SCORE_CARD = config.SCORE_CARD + 2;
			callback('success');
		} else if (response == 'sometimes') {
			config.SCORE_CARD = config.SCORE_CARD + 3;
			callback('success');
		} else if (response == 'frequently') {
			config.SCORE_CARD = config.SCORE_CARD + 4;
			callback('success');
		} else if (response == 'always') {
			config.SCORE_CARD = config.SCORE_CARD + 5;
			callback('success');
		}

		var tipsString =
			"You can also subscribe  to our tips on anger management. To subscribe for daily tips, you can say <break time='300ms'/> Daily   <break time='300ms'/>  Or to subscribe for Weekly tips, you can say <break time='300ms'/> Weekly <break time='300ms'/>  or to skip this say <break time='300ms'/> SKIP";

		if (config.SCORE_CARD > 18) {
			config.FEEDBACK =
				'Your anger expression is likely getting you into serious trouble with others. It would probably be worthwhile to seek professional help. ' + tipsString;
		} else {
			config.FEEDBACK =
				'Congratulate yourself. You are likely in a good comfort zone. ' + tipsString;
		}

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
		console.log(config.CURRENT_INDEX, "find option anger_test")
		var option = "";
		quiz.anger_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res + "<break time='300ms'/>";
		})
		var message = quiz.anger_quiz[config.CURRENT_INDEX].value + "<break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}
}

module.exports = mainHandler;
