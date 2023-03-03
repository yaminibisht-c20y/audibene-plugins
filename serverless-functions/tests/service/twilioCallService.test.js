const {
  TwilioCallService,
} = require('../../assets/service/twilioCallService.private');

const {
  ValidationError,
  SuccessResponse,
} = require('../../assets/common/responses.private');

jest.mock('twilio', () => require('../../mocks/dependencies/twilio'));

const twilioClient = require('twilio');
const twilioCallService = new TwilioCallService(twilioClient);

describe('data validation tests for TwilioCallService.fetchCall', () => {
  // it('fetchCall_throwError_mandatoryParamsMissing', async () => {
  //   expect.assertions(1);
  //   try {
  //     await twilioCallService.fetchCall();
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(ValidationError);
  //   }
  // });

  it('fetchCall_returnObject_OK', async () => {
    const resp = await twilioCallService.fetchCall(
      'CA00000000000000000000000000000000',
    );

    expect(resp).toBeDefined();
    expect(resp.data.call).toBeDefined();
  });
});

describe('data validation tests for TwilioCallService.createConferenceParticipant', () => {
  it('createConferenceParticipant_throwError_mandatoryParamsMissing', async () => {
    expect.assertions(1);
    try {
      await twilioCallService.createConferenceParticipant();
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('createConferenceParticipant_returnObject_conferenceParticipant', async () => {
    const resp = await twilioCallService.createConferenceParticipant(
      'CF00000000000000000000000000000000',
      { to: '+4111111111', from: '+4111111112', endConferenceOnExit: false },
    );

    expect(resp).toBeInstanceOf(SuccessResponse);
    expect(typeof resp.data.conferenceParticipant === 'object').toBe(true);
  });
});

describe('data validation tests for TwilioCallService.updateConferenceParticipant', () => {
  it('updateConferenceParticipant_throwError_mandatoryParamsMissing', async () => {
    expect.assertions(1);
    try {
      await twilioCallService.updateConferenceParticipant();
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateConferenceParticipant_returnObject_conferenceParticipant', async () => {
    const resp = await twilioCallService.updateConferenceParticipant(
      'CF00000000000000000000000000000000',
      'CA00000000000000000000000000000000',
      { endConferenceOnExit: false, hold: false },
    );

    expect(resp).toBeInstanceOf(SuccessResponse);
    expect(typeof resp.data.conferenceParticipant === 'object').toBe(true);
  });
});

describe('data validation tests for TwilioCallService.removeConferenceParticipant', () => {
  it('removeConferenceParticipant_throwError_mandatoryParamsMissing', async () => {
    expect.assertions(1);
    try {
      await twilioCallService.removeConferenceParticipant();
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('removeConferenceParticipant_returnObject_conferenceParticipant', async () => {
    const resp = await twilioCallService.removeConferenceParticipant(
      'CF00000000000000000000000000000000',
      'CA00000000000000000000000000000000',
    );

    expect(resp).toBeInstanceOf(SuccessResponse);
    expect(typeof resp.data.conferenceParticipant === 'object').toBe(true);
  });
});
