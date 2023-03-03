import * as Flex from '@twilio/flex-ui';

import { EncodedParams } from '../../../types/serverless';
import ApiService from '../ApiService';

export interface HoldCallResponse {
  success: boolean;
}

class CallsService extends ApiService {
  async cleanRejectedTask(conferenceSid: string): Promise<boolean> {
    try {
      const { success } = await this.#cleanRejectedTask(conferenceSid);
      return success;
    } catch (error) {
      return false;
    }
  }

  #cleanRejectedTask = async (conferenceSid: string): Promise<HoldCallResponse> => {
    const manager = Flex.Manager.getInstance();

    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      taskSid: encodeURIComponent(conferenceSid),
    };

    const response = await this.fetchJsonWithReject<HoldCallResponse>(
      `https://${this.serverlessDomain}/v2/internal-call/cleanup-rejected-task`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
    console.log('hold call response: ', response);
    return response;
  };

  async holdCall(conferenceSid: string, participant: string, hold: boolean): Promise<boolean> {
    try {
      const { success } = await this.#holdCall(conferenceSid, participant, hold);
      return success;
    } catch (error) {
      return false;
    }
  }

  #holdCall = async (conferenceSid: string, participant: string, hold: boolean): Promise<HoldCallResponse> => {
    const manager = Flex.Manager.getInstance();

    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      conference: encodeURIComponent(conferenceSid),
      participant: encodeURIComponent(participant),
      hold: encodeURIComponent(hold),
    };

    const response = await this.fetchJsonWithReject<HoldCallResponse>(
      `https://${this.serverlessDomain}/v2/internal-call/hold-call`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
    console.log('hold call response: ', response);
    return response;
  };

  async getCallProperties(callSid: string): Promise<any> {
    try {
      const { success } = await this.#getCallProperties(callSid);
      return success;
    } catch (error) {
      return false;
    }
  }

  #getCallProperties = async (callSid: string): Promise<any> => {
    const manager = Flex.Manager.getInstance();

    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      callSid: encodeURIComponent(callSid),
    };

    return this.fetchJsonWithReject<HoldCallResponse>(
      `https://${this.serverlessDomain}/v2/external-transfer/get-call-properties`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
  };

  async redirectToPostCallSurveyVoice(callSid: string, taskSid: string, callTo: string | undefined): Promise<any> {
    try {
      const { success } = await this.#redirectToPostCallSurveyVoice(callSid, taskSid, callTo);
      return success;
    } catch (error) {
      return false;
    }
  }

  #redirectToPostCallSurveyVoice = async (
    callSid: string,
    taskSid: string,
    callTo: string | undefined,
  ): Promise<any> => {
    const manager = Flex.Manager.getInstance();

    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      callSid: encodeURIComponent(callSid),
      taskSid: encodeURIComponent(taskSid),
      workerSid: encodeURIComponent(manager.workerClient.sid),
      callTo: callTo && encodeURIComponent(callTo),
    };

    const response = await this.fetchJsonWithReject<HoldCallResponse>(
      `https://${this.serverlessDomain}/v2/redirect-to-post-call-survey`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
    return response;
  };
}

export default new CallsService();
