const { buildResponse, buildErrorResponse } = require(Runtime.getAssets()[
  '/util/responseUtil.js'
].path);
const { ValidationError } = require(Runtime.getAssets()['/common/responses.js']
  .path);
const { authorizePluginRequest } = require(Runtime.getAssets()[
  '/util/authorizationUtil.js'
].path);
const ValidationSchemas = require(Runtime.getAssets()[
  '/validators/validationSchemas.js'
].path);
const { TwilioTaskrouterService } = require(Runtime.getAssets()[
  '/service/twilioTaskrouterService.js'
].path);

const { Logger } = require(Runtime.getAssets()['/util/logUtil.js'].path);
const logger = new Logger('/functions/v2/status-callback-participant.js');

exports.handler = async function (context, event, callback) {
  try {
    await authorizePluginRequest(event);

    const updateData = {
      attributes: {
        cold_forwarded: true,
      },
    };

    const { error: validationError } =
      ValidationSchemas.processUpdateTaskSchema.validate({
        taskSid: event.taskSid,
        updateData,
      });
    if (validationError) {
      logger.error('handler', 'Request Validation Errors', validationError);
      throw new ValidationError(validationError.message);
    }

    const twilioTaskRouterService = new TwilioTaskrouterService(
      context.getTwilioClient(),
    );

    const twilioResponse = await twilioTaskRouterService.updateTask(
      event.taskSid,
      updateData,
    );
    return callback(null, buildResponse(twilioResponse));
  } catch (e) {
    logger.error('handler', 'Issue in processing ', e);
    return callback(null, buildErrorResponse(e));
  }
};
