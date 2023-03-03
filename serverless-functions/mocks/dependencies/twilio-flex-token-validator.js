const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);

const functionValidator = jest.fn((token, accountSid, authToken) => {
  return new Promise((resolve, reject) => {
    if (token === 'valid') {
      resolve();
    } else {
      reject(new Error(ResponseMessages.SIMULATED_ERROR));
    }
  });
});

module.exports = {
  functionValidator,
};
