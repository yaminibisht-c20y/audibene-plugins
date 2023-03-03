const fs = require('fs');
const path = require('path');

class Runtime {
  static readAllFolder = (dirMain, filePaths) => {
    const readDirMain = fs.readdirSync(dirMain);

    readDirMain.forEach((dirNext) => {
      if (fs.lstatSync(dirMain + '/' + dirNext).isDirectory()) {
        this.readAllFolder(dirMain + '/' + dirNext, filePaths);
      } else {
        let pth = dirMain + '/' + dirNext;
        filePaths[pth.replace('.private', '').replace('./assets', '')] = {
          path: path.join(__dirname, '../../') + pth.replace('./', ''),
        };
      }
    });
  };

  static getAssets() {
    let filePaths = {};
    this.readAllFolder('./assets', filePaths);
    return filePaths;
  }
}

class Response {
  constructor() {
    this.headers = {};
    this.statusCode = 200;
    this.body = null;
  }
  appendHeader(k, v) {
    this.headers[k] = v;
  }
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }
  setBody(body) {
    this.body = body;
  }
}

async function executeHandler(handler, context, event, requestHeaders = {}) {
  return new Promise((resolve, reject) => {
    const callback = (error, payload) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    };
    handler(
      context,
      {
        ...event,
        request: {
          cookies: {},
          headers: { ...requestHeaders },
        },
      },
      callback,
    );
  });
}

const twilioClient = null; //require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

module.exports = {
  Runtime,
  Twilio: {
    Response,
    twiml: {
      VoiceResponse: jest.fn(() => {
        return {
          dial: jest.fn(() => {
            return {
              conference: jest.fn(),
            };
          }),
          play: jest.fn(),
          gather: jest.fn().mockImplementation(() => {
            return {
              play: jest.fn(),
            };
          }),
          redirect: jest.fn(),
        };
      }),
    },
  },
  twilioClient,
  executeHandler,
};
