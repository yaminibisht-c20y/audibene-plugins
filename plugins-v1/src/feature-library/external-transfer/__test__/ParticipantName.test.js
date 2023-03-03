import * as Flex from '@twilio/flex-ui';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { describe, expect, afterEach, it, beforeEach } from '@jest/globals';
import ParticipantName from '../custom-components/participant-name';
import React from 'react';
import configureStore from 'redux-mock-store';
import callsService from '../../../utils/serverless/Calls/CallsService';

jest.mock('../../../utils/serverless/Calls/CallsService', () => {
  return {
    getCallProperties: jest.fn().mockImplementation((callSid) => {
      if (callSid === 'CA00000000000000000000000000000000') {
        return Promise.resolve({
          to: '+411234567890',
        });
      } else {
        return Promise.resolve({});
      }
    }),
  };
});

jest.mock('@twilio/flex-ui', () => {
  return {
    IconButton: function mockComponent() {
      return <div></div>;
    },
    withTheme: (MockComponent) => MockComponent,
    TaskHelper: {
      isLiveCall: jest.fn().mockImplementation(() => true),
    },
    Actions: {
      invokeAction: jest.fn(),
    },
    Manager: {
      getInstance: jest.fn().mockReturnValue({
        store: {
          getState: jest.fn().mockReturnValue({
            flex: {
              conferences: {
                states: {
                  get: jest.fn().mockReturnValue({
                    source: {
                      participants: [{ participantType: 'customer', callSid: '' }],
                    },
                  }),
                },
              },
            },
          }),
        },
        serviceConfiguration: {
          outbound_call_flows: {
            default: {
              caller_id: '',
            },
          },
        },
        user: {},
        insightsClient: {
          instantQuery: jest.fn().mockImplementation((a) => {
            if (a === 'tr-worker') {
              return Promise.resolve({
                on: jest.fn().mockImplementation((b, cb) => {
                  if (b === 'searchResult')
                    cb([
                      {
                        attributes: {
                          full_name: 'Worker Name',
                        },
                      },
                    ]);
                }),
                search: jest.fn(),
              });
            }
          }),
        },
      }),
    },
  };
});

describe('ParticipantName Component', () => {
  let component;
  let props;
  let task, conference, participant;

  beforeEach(() => {
    let classes = {};

    const mockStore = configureStore([]);
    const store = mockStore({
      flex: {
        view: {
          componentViewStates: {
            ParticipantName: {
              isOpen: false,
            },
          },
        },
      },
    });

    participant = {
      callSid: 'CA00000000000000000000000000000000',
    };

    conference = {
      sid: 'CF000000000000000000000000000000',
    };

    task = {
      attributes: {
        to: '+411234567890',
        caller: '+410987654321',
      },
      conference,
      taskSid: 'WT0000000000000000000000000000',
    };

    props = {
      classes,
      store,
      task,
      from: '+410987654321',
      participant,
    };
  });

  afterEach(() => {
    if (component && component.unmount) component.unmount();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ParticipantName {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly if listMode is true', () => {
    props = {
      ...props,
      listMode: true,
    };

    const tree = renderer.create(<ParticipantName {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('componentDidMount returns if participantType is customer', () => {
    participant.participantType = 'customer';

    component = mount(<ParticipantName {...props} />);

    const { name } = component.find('ParticipantName').instance().state;
    expect(name).toBe(undefined);
    expect(callsService.getCallProperties).toHaveBeenCalledTimes(0);
  });

  it('componentDidMount returns if participantType is customer and task direction is inbound', () => {
    participant.participantType = 'customer';
    task.attributes.direction = 'inbound';

    component = mount(<ParticipantName {...props} />);

    const { name } = component.find('ParticipantName').instance().state;
    // expect(name).toBe('+410987654321');
    expect(callsService.getCallProperties).toHaveBeenCalledTimes(0);
  });

  it('componentDidMount returns if participant callSid is a taskSid', () => {
    participant.callSid = 'WT00000000000000000000000000000000';
    component = mount(<ParticipantName {...props} />);
    expect(callsService.getCallProperties).toHaveBeenCalledTimes(0);
  });

  it('componentDidMount updates the name from response.to if "to" has + prefix', (done) => {
    participant.callSid = 'CA00000000000000000000000000000000';
    component = mount(<ParticipantName {...props} />);
    expect(callsService.getCallProperties).toHaveBeenCalledTimes(0);
    // expect(callsService.getCallProperties).toHaveBeenCalledWith('CA00000000000000000000000000000000');

    setTimeout(() => {
      const { name } = component.find('ParticipantName').instance().state;
      expect(name).toBe('unknown');
      done && done();
    }, 100);
  });

  it("componentDidMount updates the name from manager.insightsClient.instantQuery if 'to' doesn't have '+' prefix", (done) => {
    participant.callSid = 'CA00000000000000000000000000000001';
    component = mount(<ParticipantName {...props} />);
    expect(callsService.getCallProperties).toHaveBeenCalledTimes(0);
    // expect(callsService.getCallProperties).toHaveBeenCalledWith('CA00000000000000000000000000000001');

    setTimeout(() => {
      const { name } = component.find('ParticipantName').instance().state;
      expect(name).toBe('unknown');
      done && done();
    }, 100);
  });
});