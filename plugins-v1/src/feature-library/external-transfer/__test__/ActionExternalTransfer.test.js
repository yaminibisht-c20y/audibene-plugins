const externalTransfer = require("../flex-hooks/actions/ExternalTransfer")

describe('action external transfer tests', () => {
    it("checks",()=>{
        fetch.mockResponse(JSON.stringify({}));
        externalTransfer.kickExternalTransferParticipant({task:{attributes:{conference:{sid:""}}},targetSid:""});
        externalTransfer.kickExternalTransferParticipant({task:{conference:{conferenceSid:""},attributes:{}},targetSid:""});
    })
});