require('dotenv').config();

const { Runtime, Twilio } = require('../setup/TwilioRuntime');
global.Runtime = Runtime;
global.Twilio = Twilio;

process.env.TWILIO_ENABLE_DEBUG_LOGS = 'false';
process.env.SMS_SURVEY_FLOW_SID = 'FWXXXX';