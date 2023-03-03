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
  '/functions/v2/external-transfer/hold-conference-participant.js',
);

exports.handler = async function (context, event, callback) {
  try {
    await authorizePluginRequest(event);

    const { conference, participant, hold } = event;

    const { error: validationError } =
      ValidationSchemas.processUpdateConferenceParticipantSchema.validate({
        conferenceSid: conference,
        participantSid: participant,
        updateData: {
          hold,
        },
      });
    if (validationError) {
      logger.error(
        'external-transfer/hold-conference-participant | handler',
        'Request Validation Errors',
        validationError,
      );
      throw new ValidationError(validationError.message);
    }

    logger.info(
      `${hold ? 'Holding' : 'Unholding'} participant ${participant} ` +
        `in conference ${conference}`,
    );

    const twilioCallService = new TwilioCallService(context.getTwilioClient());
    const twilioResponse = await twilioCallService.updateConferenceParticipant(
      conference,
      participant,
      {
        hold,
      },
    );

    return callback(null, buildResponse(twilioResponse));
  } catch (error) {
    logger.error(
      'external-transfer/hold-conference-participant',
      'error caught while adding conference participant',
      error,
    );
    return callback(null, buildErrorResponse(error));
  }
};
