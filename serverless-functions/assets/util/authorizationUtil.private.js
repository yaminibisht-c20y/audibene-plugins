const { AuthorizationError } = require(Runtime.getAssets()[
  '/common/responses.js'
].path);

const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);
const TokenValidator = require('twilio-flex-token-validator').functionValidator;

async function authorizePluginRequest(event) {
  try {
    await TokenValidator(
      event.Token,
      process.env.ACCOUNT_SID,
      process.env.AUTH_TOKEN,
    );
    delete event.Token;
    return true;
  } catch (e) {
    throw new AuthorizationError(ResponseMessages.INVALID_TOKEN);
  }
}

async function authorizeBasicAuthRequest(requestHeaders) {
  const authHeader = requestHeaders.authorization;

  if (!authHeader) {
    throw new AuthorizationError(ResponseMessages.MISSING_AUTHORIZATION_HEADER);
  }

  let token = null;

  if (authHeader.startsWith('Basic ')) {
    token = authHeader.substring(6, authHeader.length);
  }

  if (!token) {
    throw new AuthorizationError(ResponseMessages.INVALID_AUTHORIZATION_HEADER);
  }

  const credentials = Buffer.from(token, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (
    !username ||
    !password ||
    username !== process.env.TWILIO_BASIC_AUTH_USERNAME ||
    password !== process.env.TWILIO_BASIC_AUTH_PASSWORD
  ) {
    throw new AuthorizationError(ResponseMessages.INVALID_TOKEN);
  }

  return undefined;
}

async function validateOrigin(headers) {
  if (
    headers.origin &&
    (headers.origin.includes('.c20y.com') ||
      headers.origin.includes('/c20y.com') ||
      headers.origin.includes('/localhost:'))
  ) {
    return true;
  }
  throw new AuthorizationError(ResponseMessages.INVALID_ORIGIN);
}
module.exports = {
  validateOrigin,
  authorizePluginRequest,
  authorizeBasicAuthRequest,
};
