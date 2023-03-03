import React from 'react';
import { shallow } from 'enzyme';
import ConferenceButton from "../custom-components/conference-button";

jest.mock("@twilio/flex-ui",()=>({
    TaskHelper: {
        isLiveCall: jest.fn(()=>{return Promise.resolve(true)})
    },
    withTheme: (M) =>{ return M},
    Actions: {
        invokeAction: jest.fn()
    }
}))

describe("test ConferenceButton component", () => {
    let props = {
        task:{

        },
        theme:{
            CallCanvas:{
                Button: false
            }
        }
    }
    it("component should render successfully", () => {
        const wrapper = shallow(<ConferenceButton {...props}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it("test function",()=>{
        const wrapper = shallow(<ConferenceButton {...props}/>);
        const instancew = wrapper.instance();
        instancew.handleClick();
    })
})