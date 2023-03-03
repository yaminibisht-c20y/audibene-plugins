import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ParticipantActionsButtons from "../custom-components/participant-actions-buttons";
import configureStore from 'redux-mock-store';

jest.mock("@twilio/flex-ui",()=>({
    TaskHelper: {
        isLiveCall: jest.fn(()=>{return Promise.resolve(true)}),
        canHold: jest.fn(()=>{return Promise.resolve(true)})
    },
    withTheme: (M) =>{ return M},
    Manager: {
        getInstance: jest.fn(()=>{return Promise.resolve({})})
    },
    withTaskContext: (M)=>{return M},
    Actions: {
        invokeAction: jest.fn()
    }
}))

const mockStore = configureStore([]);

const state = {
    flex: {
      config: {
      },
      supervisor: {
      },
      worker: {
        attributes: {},
      },
      view:{
        componentViewStates:{
            customParticipants: {
                participant:{
                    callSid: ""
                }
            }
        }
      }
    }
};

describe("test ParticipantActionsButtons component", () => {
    let props = {
        task:{
            conference:{
                participants:[{status: "joined"}]
            }
        },
        theme:{
            CallCanvas:{
                Button: false
            },
            ParticipantsCanvas:{
                ParticipantCanvas:{
                    Button: false
                }
            }
        },
        isOpen: true,
        participant:{
            callSid: ""
        }
    }
    it("component should render successfully", () => {
        const store = mockStore({});
        const wrapper = shallow(<Provider store={store}><ParticipantActionsButtons {...props}/></Provider>);
        expect(wrapper).toMatchSnapshot();
    })

    it("component should render successfully in teams view", () => {
        const store = mockStore({});
        props.view={
            activeView: "teams"
        }
        const wrapper = shallow(<Provider store={store}><ParticipantActionsButtons {...props}/></Provider>);
        expect(wrapper).toMatchSnapshot();
    })

    it("test functions", () => {
        const store = mockStore(state);
        const wrapper = shallow(<Provider store={store}><ParticipantActionsButtons {...props} /></Provider>).dive().dive();
        wrapper.setState({liveParticipantCount: 2})
        wrapper.update();
        let instancew = wrapper.instance();
        instancew.componentWillUnmount();
        instancew.showKickConfirmation();
        instancew.hideKickConfirmation();
        instancew.onHoldParticipantClick();
        instancew.onKickParticipantConfirmClick();
        instancew.renderKickConfirmation();
    });
})