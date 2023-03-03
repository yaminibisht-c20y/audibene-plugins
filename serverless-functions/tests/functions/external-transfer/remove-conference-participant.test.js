const { executeHandler, twilioClient } = require('../../setup/TwilioRuntime');
jest.mock(Runtime.getAssets()['/service/twilioCallService.js'].path, () =>
  require('../../../mocks/service/twilioCallService.private'),
);

const functionHandler =
  require('../../../functions/v2/external-transfer/remove-conference-participant').handler;

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

describe('test cases for remove-conference-participant', () => {
  it('remove-conference-participant_returnError_badRequest', async () => {
    const resp = await executeHandler(functionHandler, handlerContext, {});
    expect(resp.statusCode).toBe(400);
  });

  it('remove-conference-participant_returnSuccess', async () => {
    const event = {
      participant: 'CA00000000000000000000000000000000',
      conference: 'CF00000000000000000000000000000000',
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.conferenceParticipant).toBeDefined();
  });
});
