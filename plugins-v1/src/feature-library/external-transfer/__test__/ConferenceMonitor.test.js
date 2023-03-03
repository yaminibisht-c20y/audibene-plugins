import React from 'react';
import { shallow } from 'enzyme';
import ConferenceMonitor from "../custom-components/conference-monitor";

jest.mock("@twilio/flex-ui",()=>({
    TaskHelper: {
        isLiveCall: jest.fn(()=>{return Promise.resolve(true)})
    },
    withTheme: (M) =>{ return M},
    Manager: {
        getInstance: jest.fn(()=>{return Promise.resolve({})})
    },
    withTaskContext: (M)=>{return M}
}))

describe("test ConferenceMonitor component", () => {
    let props = {
        task:{
            conference:{
                participants:[{status: "joined"}]
            }
        },
        theme:{
            CallCanvas:{
                Button: false
            }
        },
        isOpen: true
    }
    it("component should render successfully", () => {
        const wrapper = shallow(<ConferenceMonitor {...props}/>);
        expect(wrapper).toMatchSnapshot();
    })

    let props2 = {
        task:{
        },
        theme:{
            CallCanvas:{
                Button: false
            }
        },
        isOpen: true
    }

    it("test functions", () => {
        const wrapper = shallow(<ConferenceMonitor {...props} />);
        wrapper.setState({liveParticipantCount: 2})
        wrapper.update();
        let instancew = wrapper.instance();
        instancew.componentDidUpdate();
        instancew.hasUnknownParticipant();
        instancew.shouldUpdateParticipants([{participantType:"unknown"}],1);
        instancew.handleMoreThanTwoParticipants('CF00000000000000000000000000000000', []);
        instancew.handleOnlyTwoParticipants('CF00000000000000000000000000000000', []);
        instancew.setEndConferenceOnExit('',[{connecting: true},{connecting:false}],false);
        const wrapper2 = shallow(<ConferenceMonitor {...props2} />);
        const instancew2 = wrapper2.instance();
        instancew2.componentDidUpdate();
    });
})