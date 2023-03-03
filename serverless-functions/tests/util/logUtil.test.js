import { jest, beforeEach, afterAll } from '@jest/globals';
const { Logger } = require('../../assets/util/logUtil.private');
const logger = new Logger('test');
describe('log util tests for info', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('logUtil_info', async () => {
    logger.info('test', 'test', 'test');
  });
  it('logUtil_info_1', async () => {
    process.env.TWILIO_ENABLE_DEBUG_LOGS = 'true';
    logger.info('test', 'test', 'test');
  });
  it('logUtil_error', async () => {
    logger.error('test', 'test', 'test');
  });
});
