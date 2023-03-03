import * as Flex from '@twilio/flex-ui';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { describe, expect, afterEach, it, beforeEach } from '@jest/globals';
import ConferenceDialog from '../custom-components/conference-dialog';
import React from 'react';
import configureStore from 'redux-mock-store';
import conferenceService from '../../../utils/serverless/Conference/ConferenceService';

jest.mock('../../../utils/serverless/Conference/ConferenceService', () => {
  return {
    addParticipant: jest.fn().mockImplementation(() => Promise.resolve('CA0000000000000000000000000000000')),
    addConnectingParticipant: jest.fn().mockImplementation(() => true),
  };
});

jest.mock('@twilio/flex-ui', () => {
  return {
    IconButton: function mockComponent() {
      return <div></div>;
    },
    withTaskContext: (MockComponent) => MockComponent,
    withTheme: (MockComponent) => MockComponent,
    TaskHelper: {
      isLiveCall: jest.fn().mockImplementation(() => true),
    },
    Actions: {
      invokeAction: jest.fn(),
    },
    Manager: {
      getInstance() {
        return {
          store: {
            getState: function () {
              return {
                flex: {
                  worker: {
                    attributes: {},
                  },

                  conferences: {
                    states: {
                      get: jest.fn().mockImplementation(() => {
                        return {
                          source: {
                            participants: [
                              {
                                participantType: 'worker',
                              },
                              {
                                participantType: 'customer',
                              },
                            ],
                          },
                        };
                      }),
                    },
                  },
                },
              };
            },
          },
          serviceConfiguration: {
            outbound_call_flows: {
              default: {
                caller_id: '+411111111111'
              }
            },
            ui_attributes: {
              custom_data: {
                features: {
                  caller_id: { enabled: true },
                },
              },
            },
          },
        };
      },
    },
  };
});

describe('ConferenceDialog Component', () => {
  let component;
  let props;
  let task, conference, conversations;

  beforeEach(() => {
    let classes = {};

    const mockStore = configureStore([]);
    const store = mockStore({
      flex: {
        view: {
          componentViewStates: {
            ConferenceDialog: {
              isOpen: false,
            },
          },
        },
      },
    });

    conference = {
      sid: 'CF000000000000000000000000000000',
    };

    conversations = {
      conversation_id: 'WT0000000000000000000000000000',
    };

    task = {
      attributes: {
        conversations,
      },
      conference,
      taskSid: 'WT0000000000000000000000000000',
    };

    props = {
      classes,
      store,
      task,
      from: '+41111111111',
    };

    component = mount(<ConferenceDialog {...props} />);
  });

  afterEach(() => {
    if (component && component.unmount) component.unmount();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ConferenceDialog {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly if isOpen is true', () => {
    props = {
      ...props,
      isOpen: true,
    };

    const tree = renderer.create(<ConferenceDialog {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('handleClose invokes the SetComponentState action correctly', () => {
    component.find('ConferenceDialog').instance().handleClose();

    const { Actions } = require('@twilio/flex-ui');
    expect(Actions.invokeAction).toHaveBeenCalledTimes(1);
    expect(Actions.invokeAction).toHaveBeenCalledWith('SetComponentState', {
      name: 'ConferenceDialog',
      state: { isOpen: false },
    });
  });

  // it('handleKeyPress on enter adds the conference participant and closes the dialog correctly', async () => {
  //   component.find('ConferenceDialog').setState({
  //     conferenceTo: '+41111111112',
  //   });

  //   await component.find('ConferenceDialog').instance().handleKeyPress({
  //     key: 'Enter',
  //   });

  //   expect(conferenceService.addParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addParticipant).toHaveBeenCalledWith(
  //     'WT0000000000000000000000000000',
  //     '+41111111111',
  //     '+41111111112',
  //   );

  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledWith(
  //     'CF000000000000000000000000000000',
  //     'CA0000000000000000000000000000000',
  //     'unknown',
  //   );

  //   const { Actions } = require('@twilio/flex-ui');
  //   expect(Actions.invokeAction).toHaveBeenCalledTimes(1);
  //   expect(Actions.invokeAction).toHaveBeenCalledWith('SetComponentState', {
  //     name: 'ConferenceDialog',
  //     state: { isOpen: false },
  //   });
  // });

  // it('handleKeyPress on enter adds the conference participant and closes the dialog correctly if coversation id not exists', async () => {
  //   conversations.conversation_id = '';

  //   component.find('ConferenceDialog').setState({
  //     conferenceTo: '+41111111112',
  //   });

  //   await component.find('ConferenceDialog').instance().handleKeyPress({
  //     key: 'Enter',
  //   });

  //   expect(conferenceService.addParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addParticipant).toHaveBeenCalledWith(
  //     'WT0000000000000000000000000000',
  //     '+41111111111',
  //     '+41111111112',
  //   );

  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledWith(
  //     'CF000000000000000000000000000000',
  //     'CA0000000000000000000000000000000',
  //     'unknown',
  //   );

  //   const { Actions } = require('@twilio/flex-ui');
  //   expect(Actions.invokeAction).toHaveBeenCalledTimes(1);
  //   expect(Actions.invokeAction).toHaveBeenCalledWith('SetComponentState', {
  //     name: 'ConferenceDialog',
  //     state: { isOpen: false },
  //   });
  // });

  // it('handleDialButton on enter adds the conference participant and closes the dialog correctly if coversation id not exists', async () => {
  //   conversations.conversation_id = '';

  //   component.find('ConferenceDialog').setState({
  //     conferenceTo: '+41111111112',
  //   });

  //   await component.find('ConferenceDialog').instance().handleDialButton();

  //   expect(conferenceService.addParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addParticipant).toHaveBeenCalledWith(
  //     'WT0000000000000000000000000000',
  //     '+41111111111',
  //     '+41111111112',
  //   );

  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledTimes(1);
  //   expect(conferenceService.addConnectingParticipant).toHaveBeenCalledWith(
  //     'CF000000000000000000000000000000',
  //     'CA0000000000000000000000000000000',
  //     'unknown',
  //   );

  //   const { Actions } = require('@twilio/flex-ui');
  //   expect(Actions.invokeAction).toHaveBeenCalledTimes(1);
  //   expect(Actions.invokeAction).toHaveBeenCalledWith('SetComponentState', {
  //     name: 'ConferenceDialog',
  //     state: { isOpen: false },
  //   });
  // });

  it('handleChange updates the state conferenceTo state variable', async () => {
    await component
      .find('ConferenceDialog')
      .instance()
      .handleChange({
        target: {
          value: '+41111111112',
        },
      });

    const { conferenceTo } = component.find('ConferenceDialog').instance().state;

    expect(conferenceTo).toBe('+41111111112');
  });
});
