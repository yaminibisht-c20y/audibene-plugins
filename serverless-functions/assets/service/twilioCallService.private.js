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
const logger = new Logger('/assets/service/twilioCallService.private.js');
class TwilioCallService {
  constructor(twilioClient) {
    this.twilioClient = twilioClient;
  }

  async fetchCall(callSid) {
    try {
      const call = await this.twilioClient.calls(callSid).fetch();

      return new SuccessResponse(null, { call });
    } catch (error) {
      logger.error('updateCall', 'error caught while fetching call ', error);
      throw new InternalError();
    }
  }

  async createConferenceParticipant(conferenceSid, participantData) {
    const { error: validationError } =
      ValidationSchemas.processCreateConferenceParticipantSchema.validate({
        conferenceSid,
        participantData,
      });

    if (validationError) {
      logger.error(
        'createConferenceParticipant',
        'Params Validation Errors',
        validationError,
      );
      throw new ValidationError(validationError.message);
    }

    try {
      const conferenceParticipant = await this.twilioClient
        .conferences(conferenceSid)
        .participants.create(participantData);

      return new SuccessResponse(null, {
        conferenceParticipant,
      });
    } catch (error) {
      logger.error(
        'createConferenceParticipant',
        'error caught while creating conference participant',
        error,
      );
      throw new InternalError(
        ResponseMessages.CONFERENCE_PARTICIPANT_CREATE_UPDATE_ERROR,
      );
    }
  }

  async updateConferenceParticipant(conferenceSid, participantSid, updateData) {
    const { error: validationError } =
      ValidationSchemas.processUpdateConferenceParticipantSchema.validate({
        conferenceSid,
        participantSid,
        updateData,
      });

    if (validationError) {
      logger.error(
        'updateConferenceParticipant',
        'Params Validation Errors',
        validationError,
      );
      throw new ValidationError(validationError.message);
    }

    try {
      const conferenceParticipant = await this.twilioClient
        .conferences(conferenceSid)
        .participants(participantSid)
        .update(updateData);

      return new SuccessResponse(null, {
        conferenceParticipant,
      });
    } catch (error) {
      if (error && error.status == 404) {
        logger.info(
          'updateConferenceParticipant',
          'Participant is not present in the conference',
          error,
        );

        return new SuccessResponse(null, {});
      } else {
        logger.error(
          'updateConferenceParticipant',
          'error caught while updating conference participant',
          error,
        );

        throw new InternalError(
          ResponseMessages.CONFERENCE_PARTICIPANT_UPDATE_ERROR,
        );
      }
    }
  }

  async removeConferenceParticipant(conferenceSid, participantSid) {
    const { error: validationError } =
      ValidationSchemas.removeConferenceParticipantSchema.validate({
        conferenceSid,
        participantSid,
      });

    if (validationError) {
      logger.error(
        'removeConferenceParticipant',
        'Params Validation Errors',
        validationError,
      );
      throw new ValidationError(validationError.message);
    }

    try {
      const conferenceParticipant = await this.twilioClient
        .conferences(conferenceSid)
        .participants(participantSid)
        .remove();

      return new SuccessResponse(null, {
        conferenceParticipant,
      });
    } catch (error) {
      logger.error(
        'removeConferenceParticipant',
        'error caught while removing conference participant',
        error,
      );
      throw new InternalError(
        ResponseMessages.CONFERENCE_PARTICIPANT_CREATE_UPDATE_ERROR,
      );
    }
  }
}

module.exports = {
  TwilioCallService,
};
