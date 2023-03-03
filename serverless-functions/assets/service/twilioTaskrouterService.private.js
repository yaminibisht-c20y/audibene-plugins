const {
  ValidationError,
  InternalError,
  SuccessResponse,
} = require(Runtime.getAssets()['/common/responses.js'].path);

const ValidationSchemas = require(Runtime.getAssets()[
  '/validators/validationSchemas.js'
].path);

const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);

const { Logger } = require(Runtime.getAssets()['/util/logUtil.js'].path);
const logger = new Logger('/assets/service/twilioTaskrouterService.private.js');

class TwilioTaskrouterService {
  constructor(twilioClient) {
    this.twilioClient = twilioClient;
  }

  async updateTask(taskSid, updateData, deleteAttributeKeys = []) {
    const { error: validationError } =
      ValidationSchemas.processUpdateTaskSchema.validate({
        taskSid,
        updateData,
      });

    if (validationError) {
      logger.error('updateTask', 'Params Validation Errors', validationError);
      throw new ValidationError(validationError.message);
    }

    try {
      if (updateData.attributes) {
        let task = await this.twilioClient.taskrouter
          .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
          .tasks(taskSid)
          .fetch();
        updateData.attributes = {
          ...JSON.parse(task.attributes),
          ...updateData.attributes,
        };
        deleteAttributeKeys.forEach((key) => delete updateData.attributes[key]);
        updateData.attributes = JSON.stringify(updateData.attributes);
      }

      const task = await this.twilioClient.taskrouter
        .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
        .tasks(taskSid)
        .update(updateData);

      return new SuccessResponse(null, {
        task,
      });
    } catch (error) {
      logger.error('updateTask', 'error caught while updating the task', error);
      throw new InternalError(ResponseMessages.TWILIO_TASK_UPDATE_ERROR);
    }
  }
}

module.exports = {
  TwilioTaskrouterService,
};
