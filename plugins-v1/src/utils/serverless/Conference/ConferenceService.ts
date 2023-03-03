import { ConferenceParticipant, Manager } from '@twilio/flex-ui';
import { ConferenceState } from '@twilio/flex-ui/src/state/Conferences';
import { EncodedParams } from 'types/serverless';
import ApiService from '../ApiService';

class ConferenceService extends ApiService {
  // Private functions
  _getUserToken = () => {
    const manager = Manager.getInstance();
    return manager.user.token;
  };

  _toggleParticipantHold = async (conference: string, participantSid: string, hold: boolean) => {
    const token = this._getUserToken();
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(token),
      conference: encodeURIComponent(conference),
      participant: encodeURIComponent(participantSid),
      hold: encodeURIComponent(hold),
    };

    return this.fetchJsonWithReject(
      `https://${this.serverlessDomain}/v2/external-transfer/hold-conference-participant`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
  };

  // Public functions
  setEndConferenceOnExit = async (conference: string, participantSid: string, endConferenceOnExit: boolean) => {
    const token = this._getUserToken();
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(token),
      conference: encodeURIComponent(conference),
      participant: encodeURIComponent(participantSid),
      endConferenceOnExit: encodeURIComponent(endConferenceOnExit),
    };

    return this.fetchJsonWithReject(
      `https://${this.serverlessDomain}/v2/external-transfer/update-conference-participant`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
  };

  addParticipant = async (
    conferenceSid: string,
    from: string,
    to: string,
    customerParticipantSid: string,
    forwardType: string,
    task: string,
  ): Promise<{ data: { conferenceParticipant: ConferenceParticipant } }> => {
    const token = this._getUserToken();
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(token),
      conferenceSid: encodeURIComponent(conferenceSid),
      from: encodeURIComponent(from),
      to: encodeURIComponent(to),
      customerParticipantSid: encodeURIComponent(customerParticipantSid),
      forwardType: encodeURIComponent(forwardType),
      task: encodeURIComponent(task),
    };

    return this.fetchJsonWithReject<{ data: { conferenceParticipant: ConferenceParticipant } }>(
      `https://${this.serverlessDomain}/v2/external-transfer/add-conference-participant`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
  };

  addConnectingParticipant = (conferenceSid: any, callSid: any, participantType: any) => {
    const flexState = this.manager.store.getState().flex;
    const { dispatch } = this.manager.store;

    const conferenceStates = flexState.conferences.states;
    const conferences = new Set();

    console.log('Populating conferences set');
    conferenceStates.forEach((conference: any) => {
      const currentConference = conference.source;
      console.log('Checking conference SID:', currentConference.conferenceSid);
      if (currentConference.conferenceSid !== conferenceSid) {
        console.log('Not the desired conference');
        conferences.add(currentConference);
      } else {
        const participants = currentConference.participants;
        const fakeSource: any = {
          connecting: true,
          participant_type: participantType,
          status: 'joined',
        };

        const fakeParticipant = new ConferenceParticipant(fakeSource, callSid);
        console.log('Adding fake participant:', fakeParticipant);
        participants.push(fakeParticipant);
        conferences.add(conference.source);
      }
    });
    console.log('Updating conferences:', conferences);
    dispatch({ type: 'CONFERENCE_MULTIPLE_UPDATE', payload: { conferences } });
  };

  holdParticipant = async (conference: string, participantSid: string) => {
    return this._toggleParticipantHold(conference, participantSid, true);
  };

  unholdParticipant = async (conference: string, participantSid: string) => {
    return this._toggleParticipantHold(conference, participantSid, false);
  };

  removeParticipant = (conference: string, participantSid: string) => {
    const token = this._getUserToken();
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(token),
      conference: encodeURIComponent(conference),
      participant: encodeURIComponent(participantSid),
    };

    return this.fetchJsonWithReject(
      `https://${this.serverlessDomain}/v2/external-transfer/remove-conference-participant`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );
  };
}

const conferenceService = new ConferenceService();

export default conferenceService;
