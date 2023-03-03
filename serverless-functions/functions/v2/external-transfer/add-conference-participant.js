const { buildResponse, buildErrorResponse } = require(Runtime.getAssets()[
  '/util/responseUtil.js'
].path);

const { ValidationError } = require(Runtime.getAssets()['/common/responses.js']
  .path);
const ValidationSchemas = require(Runtime.getAssets()[
  '/validators/validationSchemas.js'
].path);
const { authorizePluginRequest } = require(Runtime.getAssets()[
  '/util/authorizationUtil.js'
].path);
const { TwilioCallService } = require(Runtime.getAssets()[
  '/service/twilioCallService.js'
].path);

const { Logger } = require(Runtime.getAssets()['/util/logUtil.js'].path);

const logger = new Logger(
  '/functions/v2/external-transfer/add-conference-participant.js',
);

exports.handler = async function (context, event, callback) {
  try {
    console.log("event >>>>>>>>>>>", event)
    // await authorizePluginRequest(event);

    const { error: validationError } =
      ValidationSchemas.addConferenceParticipantSchema.validate(event);
    if (validationError) {
      logger.error(
        'external-transfer/add-conference-participant | handler',
        'Request Validation Errors',
        validationError,
      );
      throw new ValidationError(validationError.message);
    }

    const {
      conferenceSid,
      to,
      from,
      customerParticipantSid,
      forwardType,
      task,
    } = event;

    logger.info(`Adding ${to} to named conference ${conferenceSid}`);

    const twilioCallService = new TwilioCallService(context.getTwilioClient());
    // Do not try to merge to separate calls into one
    await twilioCallService.updateConferenceParticipant(
      conferenceSid,
      customerParticipantSid,
      {
        endConferenceOnExit: false,
      },
    );

    await twilioCallService.updateConferenceParticipant(
      conferenceSid,
      customerParticipantSid,
      {
        hold: true,
      },
    );

    console.log("DOMAIN_NAME >>>>>>>>>>>", context)
    let participantObject =
      forwardType === 'cold'
        ? {
            to,
            from,
            earlyMedia: true,
            statusCallback:
              `https://${context.DOMAIN_NAME}/v2/external-transfer/status-callback-participant?taskSid=` +
              task,
            statusCallbackEvent: ['ringing'],
            endConferenceOnExit: false,
          }
        : {
            to,
            from,
            earlyMedia: true,
            endConferenceOnExit: false,
          };

    const twilioResponse = await twilioCallService.createConferenceParticipant(
      conferenceSid,
      participantObject,
    );

    return callback(null, buildResponse(twilioResponse));
  } catch (error) {
    console.log("errorrrrrrr>>>>>>>>>>>>>>>>>.", error);
    logger.error(
      'external-transfer/add-conference-participant',
      'error caught while adding conference participant',
      error,
    );
    return callback(null, buildErrorResponse(error));
  }
};
