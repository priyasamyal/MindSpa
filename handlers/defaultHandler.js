const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const defaultHandler = {


  'AMAZON.RepeatIntent': function () {

    console.log(this.attributes['CURRENT_STEP'], "AMAZON.RepeatIntent");
    if (this.attributes['CURRENT_STEP'] == 'launch') {
      this.emit('LaunchRequest');
    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_anger') {
      this.emit(":ask", config.ANGER_INTRO + " <break time='200ms'/> You can subscribe to our tips on Anger Management. If you want Mind Spa to send you daily tips on Anger Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/>or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response");
    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence') {
      this.emit(":ask", config.CONFIDENCE_INTRO + " <break time='200ms'/> You can subscribe to our tips on Self Confidence. If you want Mind Spa to send you  daily tips on boosting self confidence and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response");

    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
      this.emit(":ask", config.STRESS_INTRO + " <break time='200ms'/> You can subscribe to our tips on Stress Management. If you want Mind Spa to send you  daily tips on Stress Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ", "I am still waiting for your response");
    }
    else if (this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'confidence_test' || this.attributes['CURRENT_STEP'] == 'stress_test') {
      findOptions(result => {
        console.log(result, "result");
        this.emit(':ask', "Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result, "I am still waiting for your response");
      })
      // this.emit('quizResponse');
    }
    else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour') {
      this.emit('LaunchRequest');
    }
    else {
      this.emit('LaunchRequest');
      // var speechOutput = "<prosody rate='93%'>Sorry i could not repeat it. </prosody>"
      // this.response.speak(speechOutput).listen(speechOutput);
      // this.emit(':responseReady');
    }


  },



  'AMAZON.HelpIntent': function () {
    var speechOutput = "<prosody rate='93%'>Mind Spa can help you track your behaviour via series of questions and deliver positive habit forming content in the form of practice tips, Hypothetical Use Cases, Short Story, audio stories and more.  You can say things like  <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence. Which would you like? </prosody>"

    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');

  },

  'AMAZON.CancelIntent': function () {

    console.log('CancelIntent called...');
    this.emit("AMAZON.StopIntent");
  },

  'AMAZON.StopIntent': function () {
    this.attributes['CURRENT_STEP'] = 'launch';
    console.log('StopIntent called...');
    this.emit(':tell', config.STOP_MSG);
  },

  'AMAZON.FallbackIntent': function () {
    console.log('FallbackIntent called...');
    if (this.attributes['CURRENT_STEP'] == 'mind_test') {
      findOptions(result => {
        if (config.CURRENT_INDEX == 4) {
          this.emit(':ask', "Seems like, You still need to know more about your mind. Mind Spa can help you with Anger Management, Self Confidence, and Stress Management. Please speak to select your option?", "Please speak to select your option?", "I am still waiting for your response");
          config.CURRENT_INDEX = 0;
          this.attributes['CURRENT_STEP'] == 'mind_test_over'
        }
        else {
          this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);

        }
      })
    }
    else if (this.attributes['CURRENT_STEP'] == 'tip_behaviour') {

      this.emit(":ask", "I'm sorry, I didn't get your response. Repeating the question  <break time='200ms'/>" + config.tip_ques, "I am still waiting for your response")

    }
    else if (this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'stress_test' || this.attributes['CURRENT_STEP'] == 'confidence_test') {
      findOptions(result => {
        console.log(result, "result");
        this.emit(':ask', "I'm sorry, I didn't get your response. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result);
      })
    }
    else if (this.attributes['CURRENT_STEP'] == 'launch' || this.attributes['CURRENT_STEP'] == 'ask_for_stress' || this.attributes['CURRENT_STEP'] == 'ask_for_confidence' || this.attributes['CURRENT_STEP'] == 'ask_for_anger') {
      this.emit(":ask", "I'm sorry, I didn't get your response.  Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence.  <break time='200ms'/>", "I am still waiting for your response")
    }
    else {
      this.emit(':ask', "<prosody rate='92%'> Sorry, Mind Spa can't help you with that. Currently we offer experiential Learning Programs for Anger Management, Stress Management, Boost self confidence.  Which would you like? </prosody>", "I'm still waiting for your response.");

    }

  },
  'Unhandled': function () {
    console.log('Unhandled Intent called...');
    if (this.attributes['CURRENT_STEP'] == 'mind_test') {
      findOptions(result => {
        if (config.CURRENT_INDEX == 4) {
          this.emit(':ask', "Seems like, You still need to know more about your mind.Mind Spa can help you with Anger Management, Self Confidence, and Stress Management. Please speak to select your option?", "Please speak to select your option?");
          config.CURRENT_INDEX = 0;
          this.attributes['CURRENT_STEP'] == 'mind_test_over'

        } else {

          this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);

        }
      })
    }
    else {
      this.emit(':ask', "Sorry, I didn't hear you. Can you speak again?", "I'm still waiting for your response.");

    }

  },

  'AMAZON.YesIntent': function () {
    console.log('YesIntent called...', this.attributes['CURRENT_STEP']);
    // if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' || this.attributes['CURRENT_STEP'] == 'ask_for_confidence' || this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
    //   this.emit('quizResponse');
    // }
    if (this.attributes['CURRENT_STEP'] == 'anger_test_over') {
      this.attributes['CURRENT_STEP'] = "user_anger_subscribed";

      this.emit(':ask', "Thanks for subscribing to our daily tips. " + config.SUBSCRIBE_MSG, "I am still waiting for your response");
    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_anger') {
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
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence') {
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
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
      console.log("stress block");
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
    else if (this.attributes['CURRENT_STEP'] == 'anger_test' || this.attributes['CURRENT_STEP'] == 'stress_test' || this.attributes['CURRENT_STEP'] == 'confidence_test') {
      findOptions(result => {
        console.log(result, "result");
        this.emit(':ask', "This is not a valid option. Repeating the question. " + result, "I'm still waiting for your reply. Repeating the current question" + result, "I am still waiting for your response");
      })
    }
    else {
      this.attributes['CURRENT_STEP'] = 'launch';
      this.emit(":tell", "Sorry i did not get you. Please speak again", "I am still waiting for your response");
    }


    //else if (this.attributes['CURRENT_STEP'] == 'last_question') {
    //     this.response
    //       .speak(
    //         'Your last question is. ' +
    //         config.QUIZ[config.CURRENT_INDEX].ques +
    //         config.QUIZ_OPTION
    //       )
    //       .listen('I am still waiting for your response');
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'show_result') {
    //     this.attributes['CURRENT_STEP'] = 'angertips';
    //     this.response
    //       .speak(
    //         ' You have scored ' +
    //         config.SCORE_CARD +
    //         " out of 50.  <break time='300ms'/> " +
    //         config.FEEDBACK
    //       )
    //       .listen('I am still waiting for your response');

    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'angertips') {
    //     // console.log (randomNumber ());
    //     this.response.speak(config.techniques[randomNumber()].description).listen('I am still waiting for your response');
    //     this.attributes['CURRENT_STEP'] = 'nexttip';
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'nexttip') {
    //     console.log('aaaaaa');
    //     if (config.RANDOM_NO < 14) {
    //       this.response.speak(config.techniques[randomNumber() + 1].description).listen('I am still waiting for your response');
    //       this.emit(':responseReady');
    //     } else if (config.RANDOM_NO == 14) {
    //       this.response.speak(config.techniques[randomNumber() - 1].description).listen('I am still waiting for your response');
    //       this.emit(':responseReady');
    //     }
    //   } else {
    //     this.response.speak('config.STOP_MESSAGE');
    //     this.emit(':responseReady');
    //   }
  },
};

var https = require('https');
function findOptions(callback) {
  if (this.attributes['CURRENT_STEP'] == 'mind_test') {
    console.log(config.CURRENT_INDEX, "find option")
    var option = "";
    quiz.mind_quiz[config.CURRENT_INDEX].options.map(res => {
      option += res + "<break time='300ms'/>";
    })
    var message = quiz.mind_quiz[config.CURRENT_INDEX].value + "<break time='300ms'/>" + option
    console.log(message, "message");
    callback(message);
  }
  else if (this.attributes['CURRENT_STEP'] == 'anger_test') {
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

module.exports = defaultHandler;