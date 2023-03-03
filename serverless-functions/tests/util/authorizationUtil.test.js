const authorizationUtil = require('../../assets/util/authorizationUtil.private');
const { AuthorizationError } = require('../../assets/common/responses.private');

jest.mock('twilio-flex-token-validator', () => ({
  functionValidator: jest.fn((token, accountSid, authToken) => {
    return new Promise((resolve, reject) => {
      if (token === 'valid') {
        resolve();
      } else {
        reject(new Error('Simulated Error'));
      }
    });
  }),
}));

describe('authorization util tests', () => {
  // it('authorizationUtil_throwError_mandatoryHeaderMissing', async () => {
  //   expect.assertions(1);
  //   try {
  //     await authorizationUtil.authorizeRequest({});
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(AuthorizationError);
  //   }
  // });

  // it('authorizationUtil_throwError_invalidAuthHeaderFormat', async () => {
  //   expect.assertions(1);
  //   try {
  //     await authorizationUtil.authorizeRequest({ authorization: 'sswd' });
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(AuthorizationError);
  //   }
  // });

  // it('authorizationUtil_throwError_invalidToken', async () => {
  //   expect.assertions(1);
  //   try {
  //     await authorizationUtil.authorizeRequest({
  //       authorization: 'Bearer sswd',
  //     });
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(AuthorizationError);
  //   }
  // });

  it('authorizationUtil_validatePluginToken_success', async () => {
    const resp = await authorizationUtil.authorizePluginRequest({
      Token: 'valid',
    });
    expect(resp).toBe(true);
  });

  it('authorizationUtil_validatePluginToken_invalidToken', async () => {
    expect.assertions(1);
    try {
      await authorizationUtil.authorizePluginRequest({
        params: { Token: 'invalid' },
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AuthorizationError);
    }
  });

  it('authorizationUtil_validateDomain_success', async () => {
    const resp = await authorizationUtil.validateOrigin({
      origin: 'https://c20y.com',
    });
    expect(resp).toBe(true);
  });

  it('authorizationUtil_validateDomain_invalidDomain', async () => {
    expect.assertions(1);
    try {
      await authorizationUtil.validateOrigin({
        origin: 'https://invalid.domain',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AuthorizationError);
    }
  });

  /*
   it('authorizationUtil_pass_validToken', async () => {
        const accessToken = await require("../setup/AuthHelpers").getAuth0Token();
        let resp = await authorizationUtil.authorizeRequest({authorization:`Bearer ${accessToken}`});
        expect(resp).toBeUndefined();
    });
    */
});

process.env.TWILIO_BASIC_AUTH_USERNAME = 'test';
process.env.TWILIO_BASIC_AUTH_PASSWORD = 'test';
describe('authorizeBasicAuthRequest', () => {
  it('authorizationUtil_throwError_mandatoryHeaderMissing', async () => {
    expect.assertions(1);
    try {
      await authorizationUtil.authorizeBasicAuthRequest({});
    } catch (e) {
      expect(e).toBeInstanceOf(AuthorizationError);
    }
  });

  it('authorizationUtil_throwError_invalidAuthHeaderFormat', async () => {
    expect.assertions(1);
    try {
      await authorizationUtil.authorizeBasicAuthRequest({
        authorization: 'Basic ',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AuthorizationError);
    }
  });

  it('authorizationUtil_success', async () => {
    const response = await authorizationUtil.authorizeBasicAuthRequest({
      authorization: `Basic ${btoa('test:test')}`,
    });
    expect(response).toBe(undefined);
  });
});
