const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const defaultHandler = {

  // 'AMAZON.HelpIntent': function () {
  //   this.response.speak('speechOutput').listen('reprompt');
  //   this.emit(':responseReady');
  // },
  'AMAZON.CancelIntent': function () {
    console.log('CancelIntent called...');
    if (this.attributes['CURRENT_STEP'] == 'launch') {
      this.emit(':ask', 'Ohh, seems like you know what mind is. Ok then, lets see how controlled your mind is. Speak, Test My Anger to check you anger Management Skills. Or say, test My Confidence to check your Self Confidence level and say, Test My Stress, to check your stress level. Or say Stop to end this session.', "I'm still waiting. What would you like to test, Anger, Self Confidence, Stress");

    }
    //else if (
    //     this.attributes['CURRENT_STEP'] == 'instruction' ||
    //     this.attributes['CURRENT_STEP'] == 'start_quiz'
    //   ) {
    //     this.response
    //       .speak(config.HANDLE_TEST_NO_launch)
    //       .listen('I am still waiting for your response');
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'last_question') {
    //     this.response
    //       .speak(config.HANDLE_TEST_NO)
    //       .listen('I am still waiting for your response');
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'show_result') {
    //     this.attributes['CURRENT_STEP'] = 'angertips';
    //     this.response
    //       .speak(config.HANDLE_TEST_NO)
    //       .listen('I am still waiting for your response');

    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'angertips') {
    //     console.log(randomNumber());
    //     this.response
    //       .speak(config.HANDLE_TEST_NO_TIP)
    //       .listen('I am still waiting for your response');
    //     this.attributes['CURRENT_STEP'] = 'nexttip';
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'nexttip') {
    //     console.log('aaaaaa');
    //     this.response
    //       .speak(config.HANDLE_TEST_NO_TIP)
    //       .listen('I am still waiting for your response');
    //     this.emit(':responseReady');
    //   } else if (this.attributes['CURRENT_STEP'] == 'audio') {
    //     this.response
    //       .speak(config.HANDLE_TEST_NO_AUDIO)
    //       .listen('I am still waiting for your response');
    //     this.emit(':responseReady');
    //   } else {
    //     this.response.speak('config.STOP_MESSAGE');
    //     this.emit(':responseReady');
    //   }
  },


  'AMAZON.StopIntent': function () {
    console.log('StopIntent called...');
    this.emit(':tell', config.STOP_MSG);
  },

  'AMAZON.FallbackIntent': function () {
    console.log('FallbackIntent called...');
    if (this.attributes['CURRENT_STEP'] == 'mind_test') {
      findOptions(result => {
        if (config.CURRENT_INDEX == 4) {
          this.emit(':ask', "Seems like, You still need to know more about your mind. Mind Spa can help you with Anger Management, Self Confidence, and Stress Management. Please speak to select your option?", "Please speak to select your option?");
          config.CURRENT_INDEX = 0;
          this.attributes['CURRENT_STEP'] == 'mind_test_over'
        }
        else {
          this.emit(':ask', "This is not a valid option. Repeating the question again. " + result, "I'm still waiting for your reply. Repeating the current question" + result);

        }
      })
    }
    else {
      this.emit(':ask', "Sorry, I didn't hear you. Can you speak again?", "I'm still waiting for your response.");

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
    if (this.attributes['CURRENT_STEP'] == 'launch') {
      this.attributes['CURRENT_STEP'] = 'mind_test';
      this.emit('startQuiz');
    }
    else if (this.attributes['CURRENT_STEP'] == 'anger_test_over') {
      this.attributes['CURRENT_STEP'] = "user_anger_subscribed";

      this.emit(':ask', "Thanks for subscribing to our daily tips. " + config.SUBSCRIBE_MSG, "I am still waiting for your response");
    } else {
      this.emit(":tell", "Error");
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
module.exports = defaultHandler;

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
// /**
//    * Get number ordinal value
//    */
// function getOrdinal(n) {
//   var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
//   return n + (s[(v - 20) % 10] || s[v] || s[0]);
// }
// function randomNumber() {
//   var x = Math.floor(Math.random() * 15 + 0);
//   config.RANDOM_NO = x;
//   return x;
// }
