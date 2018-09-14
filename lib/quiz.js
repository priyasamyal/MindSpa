const quiz =
{
    'mind_fact': [],
    'anger_quiz': [],
    'confidence_quiz': [],
    'stress_quiz': [],
    'angerTips': [{
        id: 1,
        title: 'breathing technique',
        description: 'Inhale and exhale deeply 3 or 4 times in a row Count slowly to four as you inhale.Count slowly to eight as you exhale.Focus on feeling the air move in and out of your lungs',
    },
    {
        id: 3,
        title: 'Close eyes',
        description: 'Breathe in slowly, then breathe out slowly.Consider closing your eyes as you do this. It can help to block out things that are increasing your anger.',
    },
    {
        id: 4,
        title: 'Clear your mind',
        description: 'Try to picture something that brings you peace and perhaps even happiness. Allow the good thoughts to well up in your mind and take over from the negative ones..',
    },
    {
        id: 5,
        title: 'Talk to yourself',
        description: 'Talking yourself out of the anger this is completely possible as it is  your anger and your feelings.Analyze the problem without raging out. Talk out loud anything you think. This will be better if you do in front of a mirror. If possible, divert the talking to more logical topics.Talk to someone else. If you are hesitant to do this, call your best friend and talk.Remind yourself that things will look better tomorrow after a rest and a good think through ',
    },
    {
        id: 6,
        title: 'Forgive',
        description: 'Forgiveness is the most effective way to relax your mind from anger and achieve peace of mind. Everyone makes mistakes and it may not hurt to forgive the ones who have hurt you unintentionally. It is also important to forgive those who have intentionally hurt you. When you forgive them, it does not mean that you are condoning their actions. It just means that you are no longer binding yourself to the pain that they have brought you. It means that you will no longer become a prisoner of your anger and you are already ready to move on.',
    },
    {
        id: 7,
        title: 'Laugh',
        description: 'Listening to music is one of the most effective ways to deal with your anger. Good music has the ability to calm the mind and the spirit. Listening to slow music can help neutralize your emotions when you are extremely angry.',
    },
    {
        id: 8,
        title: 'mindfulness activity',
        description: 'Sit in a quiet place where you will not be disturbed.Close your eyes and start to take deep breaths.Focus on your breath. Inhale from your nose and exhale from your mouth.Silently say “inhale” as you inhale and silently say “exhale” as you exhale.Repeat this process for five to ten minutes.',
    },
    {
        id: 9,
        title: 'Walk away',
        description: 'When you are angry at someone, it is a must that you acknowledge  the emotion. However, it is also best to take time to breathe and then walk away. When you walk away, it is easier for you  to reassess your anger. Remember that you would most likely regret the things that you say when you are angry.',
    },
    {
        id: 10,
        title: ' Repeat a calming phrase or word',
        description: 'One of the most effective ways to relax your mind from anger is to keep repeating a calming phrase or word. You can try to repeat these words silently when you are angry: Relax,Breathe,Take it easy',
    },
    {
        id: 11,
        title: 'GET A GRIP',
        description: 'Squeezing a stress ball—or any other squishable object—can help dissolve tension by giving you something other than your emotions to focus on for a few moments. Try compressing a ball ten times before you respond to the next situation that upsets you.',
    },
    {
        id: 12,
        title: 'BELT—OR WRITE—IT OUT',
        description: 'A great way to give a “voice” to pent up emotions: Turn on your favorite song and sing along at the top of your lungs (without straining your vocal chords, of course). As you do, imagine that each word sung carries a little bit of your anger away with it. Or, for a quieter release, try writing down your angry feelings in a journal. Both act as healthy forms of venting, allowing you to release pent up energy and emotion so you don’t carry it with you.',
    },
    {
        id: 13,
        title: 'MOVE YOUR BODY',
        description: 'Whether it’s going for a run, dancing, raking leaves or jumping rope, getting active may be the single best way to calm rage. In particular, activities like whacking a tennis ball or punching a bag allow you to physically release aggression in a constructive way. Breaking a sweat increases levels of the feel-good chemical serotonin in the brain, which can help squash negative feelings, so experiment and see which physical activities work for you.',
    },
    {
        id: 14,
        title: 'Practice Mindfulness',
        description: 'Practice observing your thoughts, rather than reacting automatically to them. Think of your thoughts as clouds floating by. Which draw you in and which make you want to run away? Is there a way you can untangle yourself and just observe your thoughts, rather than reacting? ',
    },
    {
        id: 15,
        title: 'Have a deep conversation with somebody you know.',
        description: 'Fully focus on the other person and listen to what they have to say. By not simply waiting to say our piece, we can help pull ourselves out of our own heads and connect more deeply to the moment by showing appreciation to the people we talk with.',
    }
    ],

    'stressTips': [{
        id: 1,
        title: 'Meditate',
        tip: ' few minutes of practice per day can help ease anxiety. “Research suggests that daily meditation may alter the brain’s neural pathways, making you more resilient to stress,” says psychologist Robbie Maller Hartman, PhD, a Chicago health and wellness coach.',
    },
    {
        id: 2,
        title: 'Write It Down',
        tip: 'One way to handle stress is to write things down.While recording what you are stressed about is one approach, another is jotting downwhatyou are grateful for. Gratitude may help relieve stress and anxiety by focusing your thoughts on what is positive in your life.',
    },
    {
        id: 3,
        title: 'Chew Gum',
        tip: 'For a super easy and quick stress reliever, try chewing a stick of gum.One study showed that people who chewed gum had a greater sense of wellbeing and lower stress. One possible explanation is that chewing gum causes brain waves similar to those of relaxed people. Another is that chewing gum promotes blood flow to your brain.Additionally, one recent study found that stress relief was greatest when people chewed more strongly.',
    },
    {
        id: 4,
        title: 'Laugh',
        tip: 'Another way to take control of your stress is to stay on top of your priorities and stop procrastinating. Procrastination can lead you to act reactively, leaving you scrambling to catch up. This can cause stress, which negatively affects your health and sleep quality. Get in the habit of making a to-do list organized by priority. Give yourself realistic deadlines and work your way down the list.Work on the things that need to get done today and give yourself chunks of uninterrupted time, as switching between tasks or multitasking can be stressful itself..',
    },
    {
        id: 5,
        title: ' Listen to Soothing Music ',
        tip: 'Listening to music can have a very relaxing effect on the body.Slow-paced instrumental music can induce the relaxation response by helping lower blood pressure and heart rate as well as stress hormones.Some types of classical, Celtic, Native American and Indian music can be particularly soothing, but simply listening to the music you enjoy is effective too . Nature sounds can also be very calming. This is why they are often incorporated into relaxation and meditation music.',
    },
    {
        id: 6,
        title: 'Kill Negative Thoughts',
        tip: 'If you had a friend who had been going through a hard time and constantly put themselves down, would you talk to them the way that you talk to yourself?If the answer that that question is no, you need to start getting rid of your own negative thoughts. When you are constantly having negative thoughts about yourself or the situation you may be in, it can really affect you from achieving your goals and building your confidence.You need to kill these thoughts, they will come into your head as this is normal, but you must not dwell or listen to them, instead, acknowledge them and then let them go.',
    },
    {
        id: 7,
        title: 'Change Your Body Language',
        tip: 'It is true that changing your posture, smiling or even making eye contact can instantly make you feel and look more confident. Others will also see that you look more confident too.If you can imagine a confident person, you would normally envision someone who is happy, gives good eye contact and is standing up straight with their head held high. If you are talking to someone while not giving them eye contact, staring at the floor and maybe fiddling with your bag or hair, you will give off the impression that you are not confident, making it known to others but also to yourself.Acting as though you have great confidence can actually help you to build it',
    },
    {
        id: 8,
        title: 'Create A Positive Support Network',
        tip: 'If you surround yourself with people who make you feel bad or knock you down, you are not going to be able to build your confidence.Being around negative people will only bring you down, and make you lose more confidence. You need to surround yourself with people who lift you up instead of bringing you down.Having a supportive network is a great way to boost confidence as they will make you feel more positive and start to feel better about yourself. This will help you to gain confidence and start to improve your self-esteem.',
    },
    {
        id: 9,
        title: 'Practice Self Care ',
        tip: 'You need to look after yourself in order to feel good and have great self-worth. Being able to look after yourself and practice self-care could be having some ‘me time’, which could include a bubble bath, pamper session or reading your favorite book (check out our guide on more self-care ideas).Looking after yourself will help you feel so much better, and when you are feeling positive and in a good headspace, you can start to work on your confidence. Doing things you like to do and treating yourself with respect is great self-care, and self-care determines the self-worth you have. All of these things come hand in hand and are needing to help build confidence and self-esteem.',
    },
    {
        id: 10,
        title: 'Nobody’s perfect',
        tip: 'Always strive to be the best version of yourself, but it’s also important to accept that perfection is an unrealistic goal',
    }],
    confidenceTips: [
        {
            id: 1,
            title: 'Make a deal with yourself.',
            tip: 'Good for overcoming procrastination and getting things done. You can make the deal small or large. You simple tell yourself something like: When I’m done with this chapter/these reports I can take a walk in the park and enjoy an ice-cream.',
        },
        {
            id: 2,
            title: 'Act like it..',
            tip: 'If you don’t feel motivated or enthusiastic then act like it. The strange thing is that within a few minutes you actually start to feel motivated, positive or enthusiastic for real.',
        },
        {
            id: 3,
            title: ' Move the goalposts.    ',
            tip: 'Set a large and specific goal. This will motivate you much more than small goals. A big goal has a big effect and can create a lot of motivation.',
        },
        {
            id: 4,
            title: '  Don’t fear failure ',
            tip: 'Instead redefine it as feedback and as a natural part of a successful life. As Michael Jordan said .I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times, I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed. Also, try to find the valuable lesson(s) in each of your failures. Ask yourself: What can I learn from this?',
        },
        {
            id: 5,
            title: 'Getting in the Mindset',
            tip: 'If you find yourself thinking negative thoughts, stop yourself — you have the power to say Stop. Enough. and not finish the thought. Divert your attention elsewhere. Especially if you are thinking about your motivation! This task in front of you? It is doable and you have the abilities to do it. Any other thinking will keep you from even trying.',
        },
        {
            id: 6,
            title: 'Get confident. ',
            tip: 'To get started, count your successes. What do you have going for you? What have you done in the past that was awesome? What resources do you have at your disposal? Think of all the things you have achieved in the past. For what reason would you not be able to achieve what you want now?! You have done similar things before.',
        },
        {
            id: 7,
            title: 'Get hungry.',
            tip: 'Sometimes it involves a little twisting to convince yourself that you want it. Struggling getting to work? Well, is that a path to anything else? If you have been really hankering for a vacation to Hawaii, think about it like that. You really, really want to get to Hawaii -- and working will get you there. It is a lot easier to do something you do not want to do when you have a purpose in mind -- a purpose that you are hungry for.',
        },
        {
            id: 8,
            title: 'Keep it small',
            tip: 'Instead of "I want to lose 50 pounds" think of something like "I want to lose 2 pounds this week," or "I want to work out 4 or 5 days a week." These will warrant similar results but are easier on the mind.',
        },
        {
            id: 9,
            title: 'Take breaks.',
            tip: 'It is up to you to gauge when those breaks need to be. It also depends on what the ultimate end goal is. Not only should there be mini breaks in your day, but there need to be life breaks, too',
        },
        {
            id: 10,
            title: ' Use rewards.',
            tip: 'You cannot reward yourself for every 5 minutes of the activity you are trying to do. That will just blow up your concentration and be time-consuming. However, even small goals, when met, should be rewarded. Did you work out every day this week? Great -- take a day to just do some yoga at home and watch a movie.',
        },
    ]



}

module.exports = quiz;
