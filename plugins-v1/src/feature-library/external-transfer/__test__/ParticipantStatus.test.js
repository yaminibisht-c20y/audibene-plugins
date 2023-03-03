import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ParticipantStatus from "../custom-components/participant-status";
import configureStore from 'redux-mock-store';

jest.mock("@twilio/flex-ui",()=>({
    withTheme: (M) =>{ return M},
    templates: {
        CallParticipantStatusLive: true,
        CallParticipantStatusOnHold: true,
        CallParticipantStatusLeft: true,
        CallParticipantStatusConnecting: true,
        CallParticipantStatusKickConfirmation: true
    }
}))

const mockStore = configureStore([]);

const state = {
    flex: {
      config: {
        serviceBaseUrl: ""
      },
      supervisor: {
      },
      worker: {
        attributes: {},
      },
      view:{
        componentViewStates:{
            customParticipants:{
            }
        }
      }
    },
};

describe("test ParticipantStatus component", () => {
    let props = {
        task:{
            conference:{
                participants:[{status: "joined"}]
            },
            attributes:{
                outbound_to:""
            }
        },
        theme:{
            CallCanvas:{
                Button: false
            }
        },
        isOpen: true,
        participant:{
            callSid: "",
            participantType: "customer",
            onHold: true,
            status: "recently_left",
            connecting: true
        },
        showKickConfirmation: true
    }
    it("component should render successfully", () => {
        const store = mockStore(state);
        const wrapper = shallow(<Provider store={store}><ParticipantStatus {...props}/></Provider>).dive().dive();
        wrapper.instance().render();
    })
})