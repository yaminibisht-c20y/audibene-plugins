const { AuthorizationError } = require('../../assets/common/responses.private');

const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);

async function authorizeRequest(requestHeaders) {
  const authHeader = requestHeaders.authorization;

  if (!authHeader) {
    throw new AuthorizationError(ResponseMessages.MISSING_AUTHORIZATION_HEADER);
  }

  let token = null;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
  }
  if (!token) {
    throw new AuthorizationError(ResponseMessages.INVALID_AUTHORIZATION_HEADER);
  }

  return undefined;
}

async function authorizePluginRequest(event) {
  if (event.Token !== 'valid') {
    throw new AuthorizationError(ResponseMessages.INVALID_AUTHORIZATION_HEADER);
  }
  return true;
}

async function authorizeBasicAuthRequest() {
  return true;
}

module.exports = {
  authorizeRequest,
  authorizePluginRequest,
  authorizeBasicAuthRequest,
};
