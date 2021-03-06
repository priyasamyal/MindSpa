const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const request = require("request");
const mainHandler = {

	/** first intent to call */
	'LaunchRequest': function () {
		if (config.access_token == '' || config.access_token == undefined) {
			// this.response.cardRenderer("Hi, Welcome to  Mind Spa. Your account has not been linked with Mind Spa. Please go to your  alexa app and enable the account link option for Mind Spa skill ");
			// this.response.speak("Hi, Welcome to  Mind Spa. Your account has not been linked with Mind Spa. Please go to your  alexa app and enable the account link option for Mind Spa skill ");
			// this.emit(':responseReady');

			this.emit(":tellWithLinkAccountCard", "<prosody rate='94%'> Hi, Welcome to  Mind Spa. Your account has not been linked with Mind Spa. A link account card is delivered to home section in your alexa app, Tap the link account option to link your account with Mind Spa in order to use its complete functionality </prosody>")
		}
		else {
			config.tip_ques = "";
			getUserData(myResult => {
				var index = Math.floor(Math.random() * Math.floor(quiz.mind_fact.length - 1));
				console.log(index);
				console.log('LaunchRequestIntent called...', "result", myResult.quizzes['Anger']);
				this.attributes['CURRENT_STEP'] = 'launch';
				config.CURRENT_INDEX = 0;
				config.unsubscribed_msg = '';
				if (myResult.tips.length > 0) {
					config.behaviour_tip = myResult.tips;
					config.unsubscribed_quizzes = myResult.unsubscribed_quizzes;
					console.log(config.unsubscribed_quizzes, "config.unsubscribed_quizzes");
					if (config.unsubscribed_quizzes.length > 0) {
						console.log("length greater that 1");
						config.unsubscribed_msg = "You can also try our other experiential learning programmes like . "
						config.unsubscribed_quizzes.map(res => {
							if (res == "Anger") {
								config.unsubscribed_msg += " Anger Management by saying <break time='300ms'/> Anger Management"
							}
							if (res == "Confidence") {
								config.unsubscribed_msg += "<break time='300ms'/>  Boost Self confidence  just by saying <break time='300ms'/> Boost Self Confidence"
							}
							if (res == "Stress") {
								config.unsubscribed_msg += "<break time='300ms'/> Stress management  by saying <break time='300ms'/> Stress management"
							}
						})
						config.unsubscribed_msg += " <break time='300ms'/>or to end the session, say  <break time='200ms'/> Stop"

						console.log(config.unsubscribed_msg, "config.unsubscribed_msg");
					}
					var sayTip = "";
					config.Confidence_tip = '';
					config.anger_tip = '';
					config.Stress_tip = '';
					config.behaviour_index = 0;
					myResult.tips.map(res => {
						console.log(config.behaviour_index, "config.behaviour_index")
						if (res.quiz_id == 1) {
							sayTip += "Your Todays Tip on Anger Management is <break time='300ms'/> " + res.tip_description + " <break time='300ms'/> I hope you'll  practise this in your daily life.";
							console.log(res.behaviour.quiz_id, "res.behaviour.quiz_id");
							config.anger_tip = sayTip;
							if (res.behaviour.quiz_id != undefined) {
								//	config.behaviour_index = config.behaviour_index + 1;
								this.attributes['CURRENT_STEP'] = 'tip_behaviour';
								config.behaviour_quiz_id = res.behaviour.quiz_id;
								sayTip += " <break time='400ms'/>   Mind Spa would like to rate your anger behaviour across the day <break time='300ms'/> " + res.behaviour.question + "<break time='300ms'/> Your options are <break time='200ms'/> " + res.behaviour.options[0] + "<break time='200ms'/> " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];

								config.tip_ques = "Mind Spa would like to rate your anger behaviour across the day <break time='300ms'/> " + res.behaviour.question + "<break time='300ms'/> Your options are <break time='200ms'/> " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];
								console.log("First block");
								config.anger_tip = sayTip;
								this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='200ms'/> " + config.Stress_tip + "<break time='300ms'/> " + config.Confidence_tip + " <break time='200ms' />" + sayTip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");

							}

						} else if (res.quiz_id == 2) {
							console.log("Self confidence", sayTip, config.Stress_tip);

							config.Confidence_tip = "Your todays Tip on Boost self confidence is <break time='200ms'/> " + res.tip_description + "<break time='200ms'/>  I hope you'll  practise this in your daily life. "

							if (res.behaviour.quiz_id != undefined) {
								//	config.behaviour_index = config.behaviour_index + 1;
								this.attributes['CURRENT_STEP'] = 'tip_behaviour';
								config.behaviour_quiz_id = res.behaviour.quiz_id;
								config.Confidence_tip += " <break time='400ms'/>   Mind Spa would like to rate your self confidence across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  Your options are <break time='300ms'/>   " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];
								console.log("Self confidence config.Confidence_tip", config.Confidence_tip);

								config.tip_ques = " Mind Spa would like to rate your self confidence across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  Your options are <break time='300ms'/>   " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];

								if (sayTip == '' && config.Stress_tip == '') {
									console.log("Second block");
									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else if (sayTip != '' && config.Stress_tip == '') {
									console.log("Second block");
									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='200ms'/> " + sayTip + " <break time='400ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else if (sayTip == '' && config.Stress_tip != '') {
									console.log("Second block");
									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Stress_tip + "<break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else {
									console.log("Second block");
									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								}


							}
						} else {

							config.Stress_tip = " Your todays Tip on Stress management is <break time='200ms'/> " + res.tip_description + "<break time='200ms'/> I hope you'll  practise this in your daily life. "

							if (res.behaviour.quiz_id != undefined) {

								this.attributes['CURRENT_STEP'] = 'tip_behaviour';
								console.log("come in stress section1");
								config.behaviour_quiz_id = res.behaviour.quiz_id;
								//config.behaviour_index = config.behaviour_index + 1;
								config.Stress_tip += " <break time='400ms'/>   Mind Spa would like to rate your stress across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  Your options are <break time='300ms'/>  " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];

								config.tip_ques = " Mind Spa would like to rate your stress across the day <break time='300ms'/> " + res.behaviour.question + "<break time='200ms'/>  Your options are <break time='300ms'/>  " + res.behaviour.options[0] + "<break time='200ms'/>  " + res.behaviour.options[1] + "<break time='200ms'/>  " + res.behaviour.options[2];
								if (sayTip == '' && config.Confidence_tip == '') {

									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else if (sayTip != '' && config.Confidence_tip == '') {

									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='200ms'/> " + sayTip + " <break time='400ms'/>  " + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else if (sayTip == '' && config.Confidence_tip != '') {

									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Confidence_tip + "<break time='300ms'/>  " + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								} else {
									this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + sayTip + " <break time='400ms'/>  " + config.Confidence_tip + "<break time='300ms'/>  " + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
								}

								// if (sayTip == '' && config.Confidence_tip == '') {

								// 	this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break //time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Stress_tip + " <break time='300ms'/> </prosody>");
								// } else if (sayTip != '' && config.Confidence_tip == '') {

								// 	this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='200ms'/> " + sayTip + " <break time='400ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
								// } else if (sayTip == '' && config.Confidence_tip != '') {

								// 	this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back  <break time='300ms'/>  " + config.Stress_tip + "<break time='300ms'/>  " + config.Confidence_tip + " <break time='300ms'/> </prosody>");
								// } else {

								// 	this.emit(':ask', "<prosody rate='92%'> Hello, " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='200ms'/> " + config.Stress_tip + "</prosody>");
								// }

							}
						}
					})
					console.log("simple call");
					this.emit(':ask', " <prosody rate='92%'> Hello,  " + config.user_detail.full_name + "<break time='200ms'/>Welcome back <break time='300ms'/> " + sayTip + " <break time='300ms'/>" + config.Confidence_tip + " <break time='300ms'/> " + config.Stress_tip + " <break time='400ms'/>  " + config.unsubscribed_msg + " </prosody>", "I am still waiting for your response")

				}

				else {
					this.emit(':ask', " <prosody rate='92%'> Hello, " + config.user_detail.full_name + config.INTRO_MSG + " <break time='400ms'/>" + quiz.mind_fact[0] + "<break time='400ms'/> " + quiz.mind_fact[1] + "<break time='400ms'/> " + quiz.mind_fact[2] + "<break time='400ms'/> Now you have an idea how powerful mind is, and what it can accomplish. To experience its power  " + config.ask_for_test + "</prosody>", config.ask_for_test, "I am still waiting for your response");
				}

			})
		}
	},

	'quizTypes': function () {
		console.log('quizTypes called...');
		//var type = config.EVENT.request.intent.slots.options.value;

		if (this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'stress_test' || this.attributes['CURRENT_STEP'] == 'confidence_test') {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "I'm sorry, I didn't get your response. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.attributes['CURRENT_STEP'] = 'ask_for_anger';
			console.log('Invalid opted...');
			this.emit(":ask", "Sorry <break time='100ms'/>  " + config.EVENT.request.intent.slots.options.value + "  is not a valid program to choose. You can say Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> or Boost Self- Confidence. Which program would you like? ", "I am still waiting for your response")
			//this.emit("startQuiz");
		}
		if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Anger management") {
			this.attributes['CURRENT_STEP'] = 'ask_for_anger';
			console.log('Anger management opted...');
			this.emit(":ask", config.ANGER_INTRO + " <break time='200ms'/> You can subscribe to our tips on Anger Management. If you want Mind Spa to send you daily tips on Anger Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/>or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response")
			//this.emit("startQuiz");
		}

		else if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Boost self confidence") {
			this.attributes['CURRENT_STEP'] = 'ask_for_confidence';
			console.log('Boost self confidence opted...', quiz.confidence_quiz);
			this.emit(":ask", config.CONFIDENCE_INTRO + " <break time='200ms'/> You can subscribe to our tips on Self Confidence. If you want Mind Spa to send you  daily tips on Boost self confidence and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response")
			//	this.emit("startQuiz");

		} else if (config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH' && config.EVENT.request.intent.slots.options.resolutions.resolutionsPerAuthority[0].values[0].value.name == "Stress Management") {

			this.attributes['CURRENT_STEP'] = 'ask_for_stress';
			console.log('Stress Management opted...');
			this.emit(":ask", config.STRESS_INTRO + " <break time='200ms'/> You can subscribe to our tips on Stress Management. If you want Mind Spa to send you  daily tips on Stress Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response");
			//this.emit("startQuiz");
		}

		else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.resolutions == undefined) {
			this.emit(":ask", "I'm sorry, I didn't get your response.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
		}
		else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(":ask", "Sorry  <break time='200ms'/> " + config.EVENT.request.intent.slots.response.value + "<break time='200ms'/> is not a valid option to choose.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
		}
		else {
			this.emit(':ask', "<prosody rate='92%'> Sorry, Mind Spa can't help you with that. Currently we offer experiential Learning Programs for Anger Management, Stress Management, Boost self confidence.  Which would you like? </prosody>", "I'm still waiting for your response.");
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
			this.attributes['CURRENT_STEP'] = 'launch';
			this.emit(':tell', '<prosody rate="92%">No problem, In case you change your mind later on. Remember  Mind spa is always there to help you with your ' + type + '.  <break time="300ms"/> Here is  a complementary tip for you <break time="400ms"/>  ' + tip + "  <break time='200ms'/>  I hope you will practise this tip. Thank you </prosody>");
		}
		else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour') {
			console.log("empty slot", config.behaviour_index)
			config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
			//	config.behaviour_index = config.behaviour_index + 1;
			if (config.behaviour_quiz_id == 1) {
				this.emit(':ask', "<prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.anger_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			if (config.behaviour_quiz_id == 2) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			else if (config.behaviour_quiz_id == 3) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");

			}
		}
		else if (this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'stress_test' || this.attributes['CURRENT_STEP'] == 'confidence_test') {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "I'm sorry, I didn't get your response. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'launch') {
			this.emit(":ask", "I'm sorry, I didn't get your response.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
		}
		else {
			this.emit(':ask', "<prosody rate='92%'> Sorry, Mind Spa can't help you with. Currently we offer experiential Learning Programs for Anger Management, Stress Management, Boost self confidence.  Which would you like? </prosody>", "I'm still waiting for your response.");

		}
	},



	'startQuiz': function () {
		console.log('startQuiz called');
		if (this.attributes['CURRENT_STEP'] == 'anger_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "Thanks for subscribing to this program. <break time='200ms'/> Anger is an unnecessary emotion. High and consistent anger may bring negative reputation or ill will and can even lead to nervous breakdown or brain hemorrhage.<break time='400ms'/>  To measure your average Anger Level <break time='400ms'/>let's have a small quiz <break time='700ms'/>"
				}
				console.log(result, "result");
				this.emit(':ask', "<prosody rate='92%'>" + intro_msg + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'confidence_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "<prosody rate='92%'> Thanks for subscribing Self Confidence. <break time='200ms'/> Confidence is a key element in building your personality. Its lack may affect your personal and professional life and can even cause long term behavioural issues. To measure your self confidence, here is a small quiz  <break time='500ms'/> </prosody> "
				}
				console.log(result, "result");
				this.emit(':ask', "<prosody rate='92%'>" + intro_msg + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'stress_test') {
			findOptions(result => {
				var intro_msg = "";
				if (config.CURRENT_INDEX == 0) {
					intro_msg = "<prosody rate='92%'> Thanks for subscribing to Stress Management. <break time='200ms'/>Consistent and severe stress can cause serious health problems like hypertension and can even lead to nervous breakdown. Let’s check your average stress level via a small quiz. <break time='500ms'/> </prosody>"
				}
				console.log(result, "result");
				this.emit(':ask', "<prosody rate='92%'>" + intro_msg + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}
	},

	'quizResponse': function () {
		console.log('quizResponse called', this.attributes['CURRENT_STEP']);
		console.log(config.tip_ques, "onfig.tip_ques", config.unsubscribed_msg);

		if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			getQuizSubscription(quiz.anger_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");
				if (result.status == 200) {
					this.attributes['CURRENT_STEP'] = 'anger_test';
					this.emit('startQuiz');
				} else {
					if (config.unsubscribed_msg == '') {
						this.attributes['CURRENT_STEP'] = 'launch';
						this.emit(":tell", "<prosody rate='92%'> You have already subscribed to this program  <break time='300ms'/> Keep checking for more experiential learning programmes by Mind Spa. Thank You.</prosody>");

					} else {
						this.emit(":ask", "<prosody rate='92%'>You have already subscribed to this program   <break time='300ms'/>" + config.unsubscribed_msg + "</prosody>", "I am still waiting for your response");
					}

				}

			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(":ask", "<prosody rate='92%'>Sorry, I didn't get you. If you want Mind Spa to send you daily tips on Anger Management and to keep track of your behaviour, then say <break time='300ms'/> Yes or to skip this option say <break time='300ms'/> Skip </prosody>", "I am still waiting for your response");
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			getQuizSubscription(quiz.confidence_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");

				if (result.status == 200) {
					this.attributes['CURRENT_STEP'] = 'confidence_test';
					this.emit('startQuiz');
				} else {
					if (config.unsubscribed_msg == '') {
						this.attributes['CURRENT_STEP'] = 'launch';
						this.emit(":tell", "<prosody rate='92%'> You have already subscribed to this program  <break time='300ms'/> Keep checking for more experiential learning programmes by Mind Spa. Thank You</prosody>");

					} else {
						this.emit(":ask", "<prosody rate='92%'>You have already subscribed to this program   <break time='300ms'/>" + config.unsubscribed_msg + "</prosody>", "I am still waiting for your response");
					}
				}
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(":ask", "<prosody rate='92%'>Sorry, I didn't get you. If you want Mind Spa to send you daily tips on Stress Management and to keep track of your behaviour, then say <break time='300ms'/> Yes or to skip this option say <break time='300ms'/> Skip </prosody>", "I am still waiting for your response");
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {
			getQuizSubscription(quiz.stress_quiz[0].quiz_id, result => {
				console.log(result, "after subscription");

				if (result.status == 200) {
					this.attributes['CURRENT_STEP'] = 'stress_test';
					this.emit('startQuiz');

				} else {
					if (config.unsubscribed_msg == '') {
						this.attributes['CURRENT_STEP'] = 'launch';
						this.emit(":tell", "<prosody rate='92%'> You have already subscribed to this program  <break time='300ms'/> Keep checking for more experiential learning programmes by Mind Spa. Thank You</prosody>");

					} else {
						this.emit(":ask", "<prosody rate='92%'>You have already subscribed to this program   <break time='300ms'/>" + config.unsubscribed_msg + "</prosody>", "I am still waiting for your response");
					}

				}
			})
		}
		else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(":ask", "<prosody rate='92%'>Sorry, I didn't get you. If you want Mind Spa to send you daily tips on Boost Self confidence and to keep track of your behaviour, then say <break time='300ms'/> Yes or to skip this option say <break time='300ms'/> Skip </prosody>", "I am still waiting for your response");
		}

		else if ((this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'stress_test' || this.attributes['CURRENT_STEP'] == 'confidence_test') && config.EVENT.request.intent.slots.response.resolutions == undefined) {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "I'm sorry, I didn't get your response. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
			})
		}

		else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.resolutions == undefined) {
			this.emit(":ask", "I'm sorry, I didn't get your response.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
		}
		else if (this.attributes['CURRENT_STEP'] == 'launch' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			this.emit(":ask", "Sorry  <break time='200ms'/> " + config.EVENT.request.intent.slots.response.value + "<break time='200ms'/> is not a valid option to choose.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
		}
		else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_NO_MATCH') {
			console.log("invalid slot", config.behaviour_index)
			config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
			//	config.behaviour_index = config.behaviour_index + 1;
			if (config.behaviour_quiz_id == 1) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.anger_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			if (config.behaviour_quiz_id == 2) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			else if (config.behaviour_quiz_id == 3) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");

			}
		}
		else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour' && config.EVENT.request.intent.slots.response.resolutions == undefined) {
			console.log("empty slot", config.behaviour_index)
			config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
			//	config.behaviour_index = config.behaviour_index + 1;
			if (config.behaviour_quiz_id == 1) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.anger_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			if (config.behaviour_quiz_id == 2) {
				this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
			}
			else if (config.behaviour_quiz_id == 3) {
				this.emit(':ask', "<prosody rate='92%'> Sorry  <break time='200ms'/> I did not get you. Repeating the tip <break time='200ms'/>" + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");

			}
		}

		else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour' && config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {


			saveQuizBehaviour(config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].values[0].value.name, result => {
				console.log(result, "saveQuizBehaviour");
				if (result.status == 500) {
					console.log("invalid slot", config.behaviour_index)
					config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
					//	config.behaviour_index = config.behaviour_index + 1;
					if (config.behaviour_quiz_id == 1) {
						this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.anger_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
					}
					if (config.behaviour_quiz_id == 2) {
						this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
					}
					else if (config.behaviour_quiz_id == 3) {
						this.emit(':ask', " <prosody rate='92%'> Sorry  <break time='200ms'/>" + config.EVENT.request.intent.slots.response.value + "  <break time='200ms'/> is not a valid option. Repeating the tip <break time='200ms'/>" + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");

					}
				} else {
					config.behaviour_index = config.behaviour_index + 1;
					console.log(config.behaviour_tip.length, config.behaviour_index, config.Confidence_tip, config.behaviour_quiz_id);
					if (config.behaviour_tip.length - 1 >= config.behaviour_index) {
						config.behaviour_quiz_id = config.behaviour_tip[config.behaviour_index].behaviour.quiz_id;
						//	config.behaviour_index = config.behaviour_index + 1;
						if (config.behaviour_quiz_id == 2) {
							this.emit(':ask', " <prosody rate='92%'>Thanks for your response  <break time='300ms'/>" + config.Confidence_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
						}
						else if (config.behaviour_quiz_id == 3) {
							this.emit(':ask', " <prosody rate='92%'> Thanks for your response  <break time='300ms'/>" + config.Stress_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
						}
						else if (config.behaviour_quiz_id == 1) {
							this.emit(':ask', " <prosody rate='92%'> Thanks for your response  <break time='300ms'/>" + config.anger_tip + " <break time='300ms'/> </prosody>", "I am still waiting for your response");
						}

					} else {
						if (config.unsubscribed_msg == "") {
							console.log("empty");
							this.emit(':tell', "<prosody rate='92%'> Thanks for your response. Keep practising Mind Spa tips.<break time='300ms'/>  We hope to make a difference in your life. </prosody>", "I am still waiting for your response");
						} else {
							this.emit(':ask', "<prosody rate='92%'> Thanks for your response. Keep practising Mind Spa tips.<break time='300ms'/>  We hope to make a difference in your life. <break time='400ms'/>  " + config.unsubscribed_msg + "</prosody>", "I am still waiting for your response");
						}

					}
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
						this.attributes['CURRENT_STEP'] = 'test_end';
						if (result.average_score == 1) {
							config.CURRENT_INDEX = 0;

							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your stress level seems to be Severe <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on stress management  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Boost Self confidence and Anger management. To subscribe,  say <break time='300ms'/>  Boost self confidence or <break time='300ms'/> Anger Management. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						else if (result.average_score == 2) {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your stress level seems to be moderate <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on stress management  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Boost Self confidence and Anger management. To subscribe,  say <break time='300ms'/>  Boost self confidence or <break time='300ms'/> Anger Management. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						else {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Well, based on your responses, Your stress level seems to be normal  <break time='300ms'/> . But still Mind spa will send you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/>. here is your first tip on stress management  <break time='500ms'/> " + tip + " <break time='500ms'/>  MindSpa currently offers other programmes like Self confidence Boost and Anger management. To subscribe,  say <break time='300ms'/>  Boost self confidence or <break time='300ms'/> Anger Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}


						config.SCORE_CARD["quiz"] = [];

					})
				})
			} else {
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(result, "score till now.");
				})
				findOptions(result => {
					this.emit(':ask', "<prosody rate='92%'>" + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result);
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
						this.attributes['CURRENT_STEP'] = 'test_end';
						if (result.average_score == 1) {
							config.CURRENT_INDEX = 0;
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your confidence level seems to be Severe <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on Boost self confidence  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Stress Management and Anger management. To subscribe,  say <break time='300ms'/>  Stress management or <break time='300ms'/> Anger Management. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						else if (result.average_score == 2) {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your confidence level seems to be moderate <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on Boost self confidence  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Stress Management and Anger Management. To subscribe,  say <break time='300ms'/>  Stress management or <break time='300ms'/> Anger Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						else {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Well, based on your responses, Your confidence level seems to be normal  <break time='300ms'/> . But still Mind spa will send you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/>. here is your first tip on anger management  <break time='500ms'/> " + tip + " <break time='500ms'/>  MindSpa currently offers other programmes like Stress Management and Anger management. To subscribe,  say <break time='300ms'/>  Stress management or <break time='300ms'/> Anger Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}

						config.SCORE_CARD["quiz"] = [];

					})
				})
			} else {
				findScore(config.EVENT.request.intent.slots.response.value, result => {
					console.log(result, "score till now.");
				})
				findOptions(result => {
					this.emit(':ask', "<prosody rate='92%'>" + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result);
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
						this.attributes['CURRENT_STEP'] = 'test_end';
						console.log(result, "Quiz result");
						if (result.average_score == 1) {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your anger level seems to be Severe <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on anger management  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Stress Management and self confidence Boost. To subscribe,  say <break time='300ms'/>  “Boost Self Confidence” or <break time='300ms'/> Stress Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");



							// this.emit(':ask', "<prosody rate='90%'> Well, Your temperament seems to be good, based on your responses. here is your first tip on anger management  <break time='300ms'/>" + tip + "  <break time='300ms'/> Though you can always try our other programmes like Stress Management by saying  <break time='200ms'/> Stress management  or for Boost self confidence say  <break time='200ms'/>Boost Self Confidence or to stop the session say  <break time='200ms'/> STOP </prosody>", "Please speak to select your option?");
						} else if (result.average_score == 2) {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Based on your responses, your anger level seems to be moderate <break time='300ms'/>  but you need not to worry. Mind spa can help you control it by sending you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/> here is your first tip on anger management  <break time='500ms'/> " + tip + " <break time='500ms'/> MindSpa currently offers other programmes like Stress Management and self confidence Boost. To subscribe,  say <break time='300ms'/>  “Boost Self Confidence” or <break time='300ms'/> Stress Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						else {
							this.emit(':ask', "<prosody rate='92%'> Thank you for taking the quiz. Well, based on your responses, Your anger level seems to be normal  <break time='300ms'/> . But still Mind spa will send you some practice tips, motivational stories, hypothetical cases and monitor your progress at regular intervals.  <break time='300ms'/>. here is your first tip on anger management  <break time='500ms'/> " + tip + " <break time='500ms'/>  MindSpa currently offers other programmes like Stress Management and self confidence Boost. To subscribe,  say <break time='300ms'/>  “Boost Self Confidence” or <break time='300ms'/> Stress Management”. To end, Say <break time='300ms'/>  Stop.</prosody>", "Please speak to select your option?");
						}
						config.SCORE_CARD["quiz"] = [];

					})
				})



			} else {
				findScore(config.EVENT.request.intent.slots.response.resolutions.resolutionsPerAuthority[0].values[0].value.name, result => {
					console.log(result, "score till now.");
				})
				findOptions(result => {
					this.emit(':ask', "<prosody rate='92%'>" + result + "</prosody>", "I'm still waiting for your reply. Repeating the current question" + result, "I am still waiting for your response");
				})
			}
		}
		else {
			findOptions(result => {
				console.log(result, "result");
				this.emit(':ask', "This is not a valid option. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result, "I am still waiting for your response");
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
		var message = quiz.anger_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>Your options are <break time='300ms'/>" + option
		console.log(message, "message");
		callback(message);
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == 'confidence_test') {
		var option = "";
		quiz.confidence_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.confidence_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>Your options are <break time='300ms'/> " + option
		console.log(message, "message");
		callback(message);
	}
	else if (config.EVENT.session.attributes.CURRENT_STEP == 'stress_test') {
		var option = "";
		quiz.stress_quiz[config.CURRENT_INDEX].options.map(res => {
			option += res.question_option + "<break time='300ms'/>";
		})
		var message = quiz.stress_quiz[config.CURRENT_INDEX].question + "<break time='300ms'/>Your options are <break time='300ms'/>" + option
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
