/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const StocksApi = require('./repositories/stocksApi');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Hi I am Mr. Fin and I can help you with your stocks! What would you like to know?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};

const StockPriceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StockPriceIntent';
  },
  async handle(handlerInput) {
    let companyname = handlerInput.attributesManager.getSessionAttributes().cname;
    let ticker = handlerInput.attributesManager.getSessionAttributes().tckr;

    if(!companyname || !ticker){
      ticker = handlerInput.requestEnvelope.request.intent.slots.companyname.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      companyname = handlerInput.requestEnvelope.request.intent.slots.companyname.value;
    }

    const price = await StocksApi.getStockPrice(ticker);

    const speechText = `The price of ${companyname} stock is ${price} dollars`;

    handlerInput.attributesManager.setSessionAttributes({cname:companyname,tckr:ticker});

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin:', speechText)
      .getResponse();
  },
};

const CEOIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CEOIntent';
  },
  async handle(handlerInput) {
    let companyname = handlerInput.attributesManager.getSessionAttributes().cname;
    let ticker = handlerInput.attributesManager.getSessionAttributes().tckr;

    if(!companyname || !ticker){
      ticker = handlerInput.requestEnvelope.request.intent.slots.companyname.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      companyname = handlerInput.requestEnvelope.request.intent.slots.companyname.value;
    }

    const info = JSON.parse(await StocksApi.getCompanyInfo(ticker));

    const speechText = `The ceo of ${companyname} is ${info.CEO}`;

    handlerInput.attributesManager.setSessionAttributes({cname:companyname,tckr:ticker});

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin:', speechText)
      .getResponse();
  },
};

const IndustryIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'IndustryIntent';
  },
  async handle(handlerInput) {
    let companyname = handlerInput.attributesManager.getSessionAttributes().cname;
    let ticker = handlerInput.attributesManager.getSessionAttributes().tckr;

    if(!companyname || !ticker){
      ticker = handlerInput.requestEnvelope.request.intent.slots.companyname.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      companyname = handlerInput.requestEnvelope.request.intent.slots.companyname.value;
    }

    const info = JSON.parse(await StocksApi.getCompanyInfo(ticker));

    const speechText = `${companyname} is in the ${info.industry} industry`;

    handlerInput.attributesManager.setSessionAttributes({cname:companyname,tckr:ticker});

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};


const TestMemoryIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TestMemoryIntent';
  },
  handle(handlerInput) {
    const companyname = handlerInput.attributesManager.getSessionAttributes().cname;
    const speechText = companyname ? `You are talking about ${companyname}` : 'We are not talking about a specific company.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};

const ForgetIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ForgetMemoryIntent';
  },
  handle(handlerInput) {
    const speechText = 'Okay lets talk about something else.';

    handlerInput.attributesManager.setSessionAttributes({});

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speechText = 'Sorry I don\'t know that one try asking for help to hear a full list of commands or try asking the price of a specific stock.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask about a specific companies stock price, ceo, or industry.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Have a wonderful day!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Mr. Fin', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, something went wrong. Please say again.')
      .reprompt('Sorry, something went wrong. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    StockPriceIntentHandler,
    IndustryIntentHandler,
    CEOIntentHandler,
    TestMemoryIntentHandler,
    ForgetIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
