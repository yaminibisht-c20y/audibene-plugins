const { executeHandler, twilioClient } = require('../../setup/TwilioRuntime');
jest.mock(Runtime.getAssets()['/service/twilioCallService.js'].path, () =>
  require('../../../mocks/service/twilioCallService.private'),
);

const functionHandler =
  require('../../../functions/v2/external-transfer/add-conference-participant').handler;

jest.mock(Runtime.getAssets()['/util/authorizationUtil.js'].path, () => {
  return {
    authorizePluginRequest: jest.fn(),
  };
});

const handlerContext = {
  ...process.env,
  TWILIO_EMAIL_FLOW_SID: 'FW00000000000000000000000000000000',
  getTwilioClient() {
    return twilioClient;
  },
};

describe('test cases for add-conference-participant', () => {
  it('add-conference-participant_returnError_badRequest', async () => {
    const resp = await executeHandler(functionHandler, handlerContext, {});
    expect(resp.statusCode).toBe(400);
  });

  it('add-conference-participant_cold_forwardtype_returnSuccess', async () => {
    const event = {
      conferenceSid: 'CF00000000000000000000000000000000',
      to: '+411111111112',
      from: '+411111111111',
      customerParticipantSid: 'CA00000000000000000000000000000000',
      forwardType: 'cold',
      task: 'WT00000000000000000000000000000000',
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.conferenceParticipant).toBeDefined();
  });

  it('add-conference-participant_warm_forwardtype_returnSuccess', async () => {
    const event = {
      conferenceSid: 'CF00000000000000000000000000000000',
      to: '+411111111112',
      from: '+411111111111',
      customerParticipantSid: 'CA00000000000000000000000000000000',
      forwardType: 'warm',
      task: 'WT00000000000000000000000000000000',
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.conferenceParticipant).toBeDefined();
  });
});
