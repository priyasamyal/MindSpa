const config = require('../config.js');
const quiz = require('../lib/quiz.js');
const defaultHandler = {


  'AMAZON.RepeatIntent': function () {

    console.log(this.attributes['CURRENT_STEP'], "AMAZON.RepeatIntent");
    if (this.attributes['CURRENT_STEP'] == 'launch') {
      this.emit('LaunchRequest');
    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_anger') {
      this.emit(":ask", config.ANGER_INTRO + " <break time='200ms'/> You can subscribe to our tips on Anger Management. If you want Mind Spa to send you daily tips on Anger Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/>or to skip this option say  <break time='200ms'/> skip ");
    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_confidence') {
      this.emit(":ask", config.CONFIDENCE_INTRO + " <break time='200ms'/> You can subscribe to our tips on Self Confidence. If you want Mind Spa to send you  daily tips on boosting self confidence and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ");

    }
    else if (this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
      this.emit(":ask", config.STRESS_INTRO + " <break time='200ms'/> You can subscribe to our tips on Stress Management. If you want Mind Spa to send you  daily tips on Stress Management and to keep track of your behaviour, then say  <break time='200ms'/> Yes  <break time='200ms'/> or to skip this option say  <break time='200ms'/> skip ");
    }
    else if (this.attributes['CURRENT_STEP'] == 'anger_test' && this.attributes['CURRENT_STEP'] == 'confidence_test' && this.attributes['CURRENT_STEP'] == 'stress_test') {
      this.emit('quizResponse');
    }
    else {
      var speechOutput = "<prosody rate='93%'>Repeat Intent called </prosody>"
      this.response.speak(speechOutput).listen(speechOutput);
      this.emit(':responseReady');
    }


  },



  'AMAZON.HelpIntent': function () {
    var speechOutput = "<prosody rate='93%'>Mind Spa can help you track your behaviour via series of questions and deliver positive habit forming content in the form of practice tips and audio stories.  You can say things like  <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence. Which would you like? </prosody>"

    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');

  },

  'AMAZON.CancelIntent': function () {
    console.log('CancelIntent called...');
    this.emit("AMAZON.StopIntent");
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
    if (this.attributes['CURRENT_STEP'] == 'ask_for_anger' || this.attributes['CURRENT_STEP'] == 'ask_for_confidence' || this.attributes['CURRENT_STEP'] == 'ask_for_stress') {
      this.emit('quizResponse');
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
