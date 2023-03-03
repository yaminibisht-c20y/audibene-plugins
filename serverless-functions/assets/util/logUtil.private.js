class Logger {
  constructor(fileName) {
    this.fileName = fileName;
  }

  error(func, userMessage, error) {
    console.error(
      `Error: ${JSON.stringify({
        file: this.fileName,
        func,
        userMessage,
        errorMessage: error && error.message,
      })}`,
    );
  }

  info(func, message, data) {
    if (process.env.TWILIO_ENABLE_DEBUG_LOGS == 'true') {
      console.info(
        `Debug: ${JSON.stringify({
          file: this.fileName,
          func,
          message,
          data,
        })}`,
      );
    }
  }
}

module.exports = {
  Logger,
};
