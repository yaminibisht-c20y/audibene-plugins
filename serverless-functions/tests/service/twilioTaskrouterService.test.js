const {
  TwilioTaskrouterService,
} = require('../../assets/service/twilioTaskrouterService.private');

const {
  ValidationError,
  SuccessResponse,
  InternalError,
} = require('../../assets/common/responses.private');

jest.mock('twilio', () => require('../../mocks/dependencies/twilio'));

const twilioClient = require('twilio');
const twilioService = new TwilioTaskrouterService(twilioClient);

describe('data validation tests for TwilioService.updateTask', () => {
  it('updateTask_throwError_mandatoryParamsMissing', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask();
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateTask_throwError_mandatoryParamsMissing', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask('WT3a97d5edb91407707bc8cfed2ebe81a99');
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateTask_throwError_invalidParamsProvided', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask('WT3a97d5edb91407707bc8cfed2ebe81a99', {
        randomParam: 1,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateTask_throwError_invalidTaskAttributesParamsProvided', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask('WT3a97d5edb91407707bc8cfed2ebe81a99', {
        attributes: { invalidParams: 100 },
      });
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateTask_throwError_invalidParamsValueProvided', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask('WT3a97d5edb91407707bc8cfed2ebe81a99', {
        priority: 'abc',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it('updateTask_throwError_invalidTaskProvided', async () => {
    expect.assertions(1);
    try {
      await twilioService.updateTask('WT00000000000000000000000000000000', {
        priority: 1,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(InternalError);
    }
  });

  it('updateTask_returnObject_Task', async () => {
    const resp = await twilioService.updateTask(
      'WT3a97d5edb91407707bc8cfed2ebe81a9',
      { priority: 1, attributes: { test: 1 } },
    );

    expect(resp).toBeInstanceOf(SuccessResponse);
    expect(typeof resp.data.task === 'object').toBe(true);
    expect(resp.data.task.priority).toBe(1);
  });
});
