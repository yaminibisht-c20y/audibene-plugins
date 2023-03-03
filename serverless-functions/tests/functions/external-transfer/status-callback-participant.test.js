const { executeHandler, twilioClient } = require('../../setup/TwilioRuntime');
jest.mock(Runtime.getAssets()['/service/twilioTaskrouterService.js'].path, () =>
  require('../../../mocks/service/twilioTaskrouterService.private'),
);

const functionHandler =
  require('../../../functions/v2/external-transfer/status-callback-participant').handler;

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

describe('test cases for status-callback-participant', () => {
  it('status-callback-participant_returnError_badRequest', async () => {
    const resp = await executeHandler(functionHandler, handlerContext, {});
    expect(resp.statusCode).toBe(400);
  });

  it('status-callback-participant_returnSuccess', async () => {
    const event = {
      taskSid: 'WT00000000000000000000000000000001',
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data).toBeDefined();
  });
});
