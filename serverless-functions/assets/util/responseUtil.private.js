const {
  ValidationError,
  AuthorizationError,
  NotFoundError,
  UnprocessableEntityError,
} = require(Runtime.getAssets()['/common/responses.js'].path);

function initializeResponse() {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

function buildResponse(processorResponse) {
  const response = initializeResponse();
  response.setBody({
    message: processorResponse?.message,
    data: processorResponse?.data,
  });

  response.setStatusCode(200);

  return response;
}

function buildErrorResponse(error) {
  let statusCode = 500;
  if (error instanceof AuthorizationError) {
    statusCode = 401;
  } else if (error instanceof ValidationError) {
    statusCode = 400;
  } else if (error instanceof NotFoundError) {
    statusCode = 404;
  } else if (error instanceof UnprocessableEntityError) {
    statusCode = 422;
  }

  const response = initializeResponse();

  response.setBody({ statusCode, errorMessage: error?.message });

  response.setStatusCode(statusCode);

  return response;
}

module.exports = {
  buildResponse,
  buildErrorResponse,
};
