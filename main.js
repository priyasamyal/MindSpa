'use strict';

const Alexa = require('alexa-sdk');
const config = require('./config.js');
module.exports.handler = (event, context, callback) => {
    try {
        config.EVENT = event;
        config.access_token = event.session.user.accessToken;
        console.log("Current Index is:", config.CURRENT_INDEX);
        console.log("Event is :", event);
        config.EVENT = event;
        var alexa = Alexa.handler(event, context);
        alexa.dynamoDBTableName = "MindSpa";
        alexa.appId = 'amzn1.ask.skill.0bbc6753-ed36-44a7-9db4-5201b47cbb8d';
        alexa.registerHandlers(
            require('./handlers/defaultHandler'),
            require('./handlers/mainHandler')
        );
        alexa.execute();
    } catch (err) {
        console.log(event, "event");
        if (event.source == "aws.events") {

        }
    }
};

