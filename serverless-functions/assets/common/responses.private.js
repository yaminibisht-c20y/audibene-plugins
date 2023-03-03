class AuthorizationError extends Error {}

class ValidationError extends Error {}

class NotFoundError extends Error {}

class InternalError extends Error {}

class UnprocessableEntityError extends Error {}

class SuccessResponse {
  constructor(message, data, statusCode) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}

module.exports = {
  AuthorizationError,
  ValidationError,
  InternalError,
  SuccessResponse,
  NotFoundError,
  UnprocessableEntityError,
};
