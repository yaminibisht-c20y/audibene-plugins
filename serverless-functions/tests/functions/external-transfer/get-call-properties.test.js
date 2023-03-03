const { executeHandler, twilioClient } = require('../../setup/TwilioRuntime');
jest.mock(Runtime.getAssets()['/service/twilioCallService.js'].path, () =>
  require('../../../mocks/service/twilioCallService.private'),
);

const functionHandler =
  require('../../../functions/v2/external-transfer/get-call-properties').handler;

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

describe('test cases for get-call-properties', () => {
  it('get-call-properties_returnError_badRequest', async () => {
    const resp = await executeHandler(functionHandler, handlerContext, {});
    expect(resp.statusCode).toBe(400);
  });

  it('get-call-properties_cold_forwardtype_returnSuccess', async () => {
    const event = {
      callSid: 'CA00000000000000000000000000000000',
    };
    const resp = await executeHandler(functionHandler, handlerContext, event);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.data.call).toBeDefined();
  });
});
