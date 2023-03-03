const { SuccessResponse } = require(Runtime.getAssets()['/common/responses.js']
  .path);

class TwilioCallService {
  constructor(twilioClient) {
    this.twilioClient = twilioClient;
  }

  async createConferenceParticipant() {
    return new SuccessResponse(null, {
      conferenceParticipant: {},
    });
  }

  async updateConferenceParticipant() {
    return new SuccessResponse(null, {
      conferenceParticipant: {},
    });
  }

  async removeConferenceParticipant() {
    return new SuccessResponse(null, {
      conferenceParticipant: {},
    });
  }

  async fetchCall() {
    return new SuccessResponse(null, {
      call: {
        to: 'client:john_doe',
      },
    });
  }
}

module.exports = {
  TwilioCallService,
};
