import * as Flex from '@twilio/flex-ui';
import { jest, describe, it, expect, beforeEach, beforeAll } from '@jest/globals';
import ApiService from './';
import { EncodedParams } from '../../../types/serverless';
import { UIAttributes } from '../../../types/manager/ServiceConfiguration';


jest.useFakeTimers();

// NOTE: Make dummy class to extend ApiService because it's abstract
jest.mock('@twilio/flex-ui', () => {
  return {
    Manager: {
      getInstance() {
        return {
          store: {
            getState() {
              return {
                flex: {
                  chat: {
                    users: {
                      '9K2pJlTlwHZOPxGdlphvLZdht8q2AEHH': '9K2pJlTlwHZOPxGdlphvLZdht8q2AEHH',
                    },
                  },
                  worker: {
                    tasks: [
                      {
                        sid: 'WT0fb2062c373f6debd00e000025281296',
                        taskSid: 'WT0fb2062c373f6debd00e000025281296',
                        attributes: {
                          channelSid: 'CHaebaaa87fee8446ba7pp1049fc44447e',
                        },
                      },
                    ],
                    attributes: {
                      contact_uri: 'client:agent007',
                    },
                  },
                  session: {
                    ssoTokenPayload: {
                      token: 'abcd',
                    },
                  },
                },
              };
            },
          },
          chatClient: {
            getLocalChannels() {
              return [
                {
                  sid: 'abcd',
                  attributes: {
                    status: 'ACTIVE',
                  },
                },
              ];
            },
            getChannelBySid() {
              return new Promise<void>((resolve) => {
                const EventEmitter = require('events');
                const channel = new EventEmitter();

                channel.on('messageAdded', () => {});
                resolve();
              });
            },
          },
          serviceConfiguration: {
            ui_attributes: {
              custom_data: {
                features: {
                  autoCompleteTask: {
                    enabled: true,
                    errorRetryCount: 3,
                  },
                },
                serverlessFunctionsDomain: 'https://abcd.com',
              },
            },
          },
          workerClient: {
            attributes: {
              selectedCallerId: '',
            },
          },
        };
      },
    },
    Notifications: {
      showNotification() {},
    },
  };
});

class Test extends ApiService {
  // NOTE: Make helper function to provide access to protected class members
  testHasManagerClassMember(): boolean {
    return this.manager !== undefined;
  }

  // NOTE: Make helper function to provide access to protected class members
  testBuildBody(encodedParams: EncodedParams): string {
    return this.buildBody(encodedParams);
  }

  protected testFetchJsonWithReject<T>(url: string, config: RequestInit, attempts = 8): Promise<T> {
    return this.fetchJsonWithReject(url, config, attempts);
  }
}

describe('utils/common/ApiService', () => {
  const TestService = new Test();

  it('should provide access to the Flex Manager instance', () => {
    expect(TestService.testHasManagerClassMember()).toBe(true);
  });

  it('should provide access to the configured serverless domain', () => {
    const { custom_data } = Flex.Manager.getInstance().serviceConfiguration.ui_attributes as UIAttributes;
    let serverlessDomain = custom_data.serverlessFunctionsDomain;
    expect(TestService.serverlessDomain).toBe(serverlessDomain);
  });

  it('should build encoded params into a string to use as the body for serverless reqeusts', () => {
    const encodedParams: EncodedParams = {
      testParam1: encodeURIComponent('testParam1ToBeEncoded'),
      testParam2: encodeURIComponent('testParam2ToBeEncoded'),
      testParamToDrop: undefined,
    };

    const body = TestService.testBuildBody(encodedParams);

    expect(body).toBe('testParam1=testParam1ToBeEncoded&testParam2=testParam2ToBeEncoded');
  });


  it('should retry', () => {

    fetch.mockResponse(() => {
      return new Promise((resolve, reject) => {
        let error = new Error('dummy error');
        error.status = 429;
        return error;
      });
    });


    const encodedParams: EncodedParams = {
      testParam1: encodeURIComponent('testParam1ToBeEncoded'),
      testParam2: encodeURIComponent('testParam2ToBeEncoded'),
      testParamToDrop: undefined,
    };

   let response =  TestService.testFetchJsonWithReject(`https://baseuri/testdomain`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: TestService.testBuildBody(encodedParams),
      });

    expect(response).resolves.toBe('dummy error');
   

  });
});
