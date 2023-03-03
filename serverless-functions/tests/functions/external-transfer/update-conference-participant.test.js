const { executeHandler, twilioClient } = require('../../setup/TwilioRuntime');
jest.mock(Runtime.getAssets()['/service/twilioCallService.js'].path, () =>
  require('../../../mocks/service/twilioCallService.private'),
);

const functionHandler =
  require('../../../functions/v2/external-transfer/update-conference-participant').handler;

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

describe('test cases for update-conference-participant', () => {
  it('update-conference-participant_returnError_badRequest', async () => {
    const resp = await executeHandler(functionHandler, handlerContext, {});
    expect(resp.statusCode).toBe(400);
  });

  it('update-conference-participant_returnSuccess', async () => {
    const event = {
      participant: 'CA00000000000000000000000000000000',
      conference: 'CF00000000000000000000000000000000',
      endConferenceOnExit: true,
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.conferenceParticipant).toBeDefined();
  });

  it('update-conference-participant_endConferenceOnExitfalse_returnSuccess', async () => {
    const event = {
      participant: 'CA00000000000000000000000000000000',
      conference: 'CF00000000000000000000000000000000',
      endConferenceOnExit: false,
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.conferenceParticipant).toBeDefined();
  });
});
