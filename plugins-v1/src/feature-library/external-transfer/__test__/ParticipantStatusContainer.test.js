import React from 'react';
import { shallow } from 'enzyme';
import ParticipantStatusContainer from "../custom-components/participant-status-container";

jest.mock("@twilio/flex-ui",()=>({
    withTheme: (M) =>{ return M},
}))

describe("test ParticipantStatusContainer component", () => {
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
            onHold: true
        }
    }
    it("component should render successfully", () => {
        const wrapper = shallow(<ParticipantStatusContainer {...props}/>);
        expect(wrapper).toMatchSnapshot();
    })
})