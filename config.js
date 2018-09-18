
const config = {
  access_token: '',
  user_detail: {},
  INTRO_MSG: " <break time='200ms'/>  welcome to Mind Spa. Mind reflects a person's ability to think and reason. It’s the most powerful element of human beings that enables them to be aware of the world and its experiences. <break time='200ms'/>   Mind Spa can help you use your mind more effectively and become more mindful. Here are some interesting facts about the power of  mind .",
  INTRO_REPROMPT: '<prosody rate="92%">I am still waiting. Are you ready for the test? </prosody>',
  ask_for_test: "we recommend you choose <break time='300ms'/> one or more of our experiential learning programmes. Please speak the program you want to opt for <break time='300ms'/> Anger Management <break time='300ms'/> Stress Management <break time='300ms'/> Boost Self- Confidence. ",
  STOP_MSG: 'Thank you for using Mind Spa. Keep checking Mind Spa for new experiential learning programmes. we hope to make a difference in your life.',
  SUBSCRIBE_MSG: "",
  ANGER_INTRO: "<prosody rate='90%'>Anger is a normal, healthy emotion. It becomes unhealthy when it flares up all the time or spirals out of control.  </prosody>",
  CONFIDENCE_INTRO: "<prosody rate='90%'>Self confidence is elemental to your success. You become what you believe and practise. your ability to succeed in any situation depends primarily on your self confidence.</prosody>",
  STRESS_INTRO: "<prosody rate='90%'>Stress management is a wide spectrum of techniques and psychotherapy aimed at controlling a person's level of stress </prosody>",
  unsubscribed_quizzes: [],
  unsubscribed_msg: '',

  SKILL_NAME: 'Therapist',
  EVENT: {},
  CURRENT_STEP: '',
  CURRENT_INDEX: 0,
  SCORE_CARD: { "quiz": [] },
  FEEDBACK: '',

  behaviour_index: 0,
  behaviour_tip: [],
  behaviour_quiz_id: 1,

  Stress_tip: '',
  Confidence_tip: '',
  // RANDOM_NO: '',
  // HANDLE_TEST_NO_launch: "No problem, I have some audios and techniques to calm you down .To listen to anger management  techniques just say, “Calm me down” or to play audios just say “Play audio”. Or Stop to end this session'",
  // HANDLE_TEST_NO_AUDIO: "No problem, I have  techniques to calm you down and a test to see how much are you in control .To listen to anger management  techniques just say, “Calm me down” or to start test just say “Start test”. Or Stop to end this session'",
  // HANDLE_TEST_NO_TIP: "No problem, I have some audios to calm you down and a test to see how much control you have  .To start test just say  “Start test” or to play audios just say “Play audio”. Or Stop to end this session'",

  // INSTRUCTION: '<prosody rate="92%"> You will be having 10 question and each question has 5 options. You have to tell the one best option which suits on your personality. In the end the score card will generate which tell the marks you have scored out of 50. More the marks you have scored, more serious are your anger issues. Shall i start the test ?</prosody>',

  // INSTRUCTION_PROMPT: '<prosody rate="92%"> Shall i start the test?</prosody>',

  // QUIZ: [
  //   {
  //     id: 1,
  //     ques: 'I get angry with little or no provocation.',
  //     options: [
  //       {
  //         option: 'never',
  //         marks: '1',
  //       },
  //       {
  //         option: 'rarely',
  //         marks: '2',
  //       },
  //       {
  //         option: 'sometimes',
  //         marks: '3',
  //       },
  //       {
  //         option: 'frequently',
  //         marks: '4',
  //       },
  //       {
  //         option: 'always',
  //         marks: '5',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     ques: 'It’s hard for me to let go of thoughts that make me angry.',
  //   },
  //   {
  //     id: 3,
  //     ques: 'I get impatient when people don’t understand me',
  //   },
  //   {
  //     id: 4,
  //     ques: 'I can’t tolerate incompetence. It makes me angry.',
  //   },
  //   {
  //     id: 5,
  //     ques: 'I remember people and situations that make me angry for a long time.',
  //   },
  //   {
  //     id: 6,
  //     ques: 'I get easily frustrated when machines/equipment do not work properly. ',
  //   },
  //   {
  //     id: 7,
  //     ques: 'I find myself frequently annoyed with certain friends or family. ',
  //   },
  //   {
  //     id: 8,
  //     ques: 'I get so angry I feel like I am going to explode with rage. ',
  //   },
  //   {
  //     id: 9,
  //     ques: 'I lose my temper at least once a week.',
  //   },
  //   {
  //     id: 10,
  //     ques: 'I yell on people or i curse them',
  //   },
  // ],

  // QUIZ_OPTION: "<prosody rate='92%'>  <break time='400ms'/> Never <break time='300ms'/> rarely <break time='300ms'/>sometimes <break time='300ms'/> frequently <break time='300ms'/> always </prosody>",

  // // use this words before enterning technique array RelaxBreatheTake it easy

  // techniques: [
  //   {
  //     id: 1,
  //     title: 'breathing technique',
  //     description: 'Inhale and exhale deeply 3 or 4 times in a row Count slowly to four as you inhale.Count slowly to eight as you exhale.Focus on feeling the air move in and out of your lungs. Do you want to know an another tip to control your anger?  ',
  //   },
  //   {
  //     id: 2,
  //     title: 'Meditate daily',
  //     description: 'Regular practice of yoga, pranayama, and attention to food help settle the restlessness, but how can one sustain a calm and balanced state of mind? Meditating regularly is your answer. Just 20 minutes of daily meditation is sufficient for an entire day. You will notice that even if you do get angry, you calm down faster. Even a guided meditation can be the solution. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 3,
  //     title: 'Close eyes',
  //     description: 'Breathe in slowly, then breathe out slowly.Consider closing your eyes as you do this. It can help to block out things that are increasing your anger. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 4,
  //     title: 'Clear your mind',
  //     description: 'Anger thrives on negative and resentful thoughts. Seek to banish those angry thoughts by replacing them with good thoughts that focus on calm and peace.Try to picture something that brings you peace and perhaps even happiness. Consider a tranquil scene, a favorite object or activity, or someone you cherish and can rely on. Allow the good thoughts to well up in your mind and take over from the negative ones .Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 5,
  //     title: 'Talk to yourself',
  //     description: 'Analyze the problem without raging out.Talk out loud anything you think. This will be better if you do in front of a mirror. If possible, divert the talking to more logical topics.Talk to someone else. If you are hesitant to do this, call your best friend and talk.Remind yourself that things will look better tomorrow, after a rest and a good think-through. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 6,
  //     title: 'Forgive',
  //     description: 'Forgiveness is the most effective way to relax your mind from anger and achieve peace of mind. Everyone makes mistakes and it may not hurt to forgive the ones who have hurt you unintentionally. It is also important to forgive those who have intentionally hurt you. When you forgive them, it does not mean that you are condoning their actions. It just means that you are no longer binding yourself to the pain that they have brought you. It means that you will no longer become a prisoner of your anger and you are already ready to move on. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 7,
  //     title: 'Laugh',
  //     description: 'Listening to music is one of the most effective ways to deal with your anger. Good music has the ability to calm the mind and the spirit. Listening to slow music can help neutralize your emotions when you are extremely angry. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 8,
  //     title: 'mindfulness activity',
  //     description: 'Sit in a quiet place where you will not be disturbed.Close your eyes and start to take deep breaths.Focus on your breath. Inhale from your nose and exhale from your mouth.Silently say “inhale” as you inhale and silently say “exhale” as you exhale.Repeat this process for five to ten minutes .Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 9,
  //     title: 'Walk away',
  //     description: 'When you are angry at someone, it is a must that you acknowledge  the emotion. However, it is also best to take time to breathe and then walk away. When you walk away, it is easier for you  to reassess your anger. Remember that you would most likely regret the things that you say when you are angry. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 10,
  //     title: ' Repeat a calming phrase or word',
  //     description: 'One of the most effective ways to relax your mind from anger is to keep repeating a calming phrase or word. You can try to repeat these words silently when you are angry: Relax Breathe Take it easy. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 11,
  //     title: 'GET A GRIP',
  //     description: 'Squeezing a stress ball—or any other squishable object—can help dissolve tension by giving you something other than your emotions to focus on for a few moments. Try compressing a ball ten times before you respond to the next situation that upsets you. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 12,
  //     title: 'BELT—OR WRITE—IT OUT',
  //     description: 'A great way to give a “voice” to pent up emotions: Turn on your favorite song and sing along at the top of your lungs (without straining your vocal chords, of course). As you do, imagine that each word sung carries a little bit of your anger away with it. Or, for a quieter release, try writing down your angry feelings in a journal. Both act as healthy forms of venting, allowing you to release pent up energy and emotion so you don’t carry it with you. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 13,
  //     title: 'MOVE YOUR BODY',
  //     description: 'Whether it’s going for a run, dancing, raking leaves or jumping rope, getting active may be the single best way to calm rage. In particular, activities like whacking a tennis ball or punching a bag allow you to physically release aggression in a constructive way. Breaking a sweat increases levels of the feel-good chemical serotonin in the brain, which can help squash negative feelings, so experiment and see which physical activities work for you. Do you want to know an another tip to control your anger? ',
  //   },
  //   {
  //     id: 14,
  //     title: 'Practice Mindfulness',
  //     description: 'Practice observing your thoughts, rather than reacting automatically to them. Think of your thoughts as clouds floating by. Which draw you in and which make you want to run away? Is there a way you can untangle yourself and just observe your thoughts, rather than reacting? Do you want to know an another tip to control your anger?  ',
  //   },
  //   {
  //     id: 15,
  //     title: 'Have a deep conversation with somebody you know.',
  //     description: 'Fully focus on the other person and listen to what they have to say. By not simply waiting to say our piece, we can help pull ourselves out of our own heads and connect more deeply to the moment by showing appreciation to the people we talk with. Do you want to know an another tip to control your anger?  ',
  //   },
  // ],
};
// function randomNumber() {
//   var x = Math.floor(Math.random() * 15 + 0);
//   return x;
// }
module.exports = config;
