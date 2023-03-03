const {
  ValidationError,
  SuccessResponse,
  InternalError,
} = require('../../assets/common/responses.private');

const ValidationSchemas = require(Runtime.getAssets()[
  '/validators/validationSchemas.js'
].path);

const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);

class TwilioTaskrouterService {
  async updateTask(taskSid, updateData) {
    const { error: validationError } =
      ValidationSchemas.processUpdateTaskSchema.validate({
        taskSid,
        updateData,
      });

    if (validationError) {
      throw new ValidationError(validationError.message);
    }

    if (
      taskSid === 'WT00000000000000000000000000000001' ||
      taskSid == 'WT00000000000000000000000000000002' ||
      taskSid == 'WT00000000000000000000000000000006'
    ) {
      return new SuccessResponse(null, {
        ...updateData,
        attributes: updateData.attributes
          ? JSON.stringify(updateData.attributes)
          : '{}',
      });
    } else {
      throw new InternalError(ResponseMessages.TWILIO_TASK_UPDATE_ERROR);
    }
  }
}

module.exports = {
  TwilioTaskrouterService,
};
