/* eslint-disable no-console */
import * as React from 'react';

import ConferenceService from '../../../../utils/serverless/Conference/ConferenceService';

class ConferenceMonitor extends React.Component<any, any> {
  state = {
    liveParticipantCount: 0,
  };

  componentDidUpdate() {
    const { task } = this.props;
    const conference = task && (task.conference || {});
    const { conferenceSid, liveParticipantCount, liveWorkerCount, participants = [] } = conference;
    const liveParticipants = participants.filter((p: any) => p.status === 'joined');

    if (liveParticipantCount > 2 && this.state.liveParticipantCount <= 2) {
      if (this.shouldUpdateParticipants(participants, liveWorkerCount)) {
        this.handleMoreThanTwoParticipants(conferenceSid, liveParticipants);
      }
      // eslint-disable-next-line sonarjs/no-collapsible-if
    } else if (liveParticipantCount <= 2 && this.state.liveParticipantCount > 2) {
      if (this.shouldUpdateParticipants(participants, liveWorkerCount)) {
        this.handleOnlyTwoParticipants(conferenceSid, liveParticipants);
      }
    }

    if (liveParticipantCount !== this.state.liveParticipantCount) {
      this.setState({ liveParticipantCount });
    }
  }

  hasUnknownParticipant = (participants = []) => {
    return participants.some((p: any) => p.participantType === 'unknown');
  };

  shouldUpdateParticipants = (participants: any, liveWorkerCount: any) => {
    console.debug(
      'dialpad-addon, ConferenceMonitor, shouldUpdateParticipants:',
      liveWorkerCount <= 1 && this.hasUnknownParticipant(participants),
    );
    return liveWorkerCount <= 1 && this.hasUnknownParticipant(participants);
  };

  handleMoreThanTwoParticipants = (conferenceSid: any, participants: any) => {
    console.log('More than two conference participants. Setting endConferenceOnExit to false for all participants.');
    this.setEndConferenceOnExit(conferenceSid, participants, false);
  };

  handleOnlyTwoParticipants = (conferenceSid: any, participants: any) => {
    console.log('Conference participants dropped to two. Setting endConferenceOnExit to true for all participants.');
    this.setEndConferenceOnExit(conferenceSid, participants, true);
  };

  setEndConferenceOnExit = async (conferenceSid: any, participants: any, endConferenceOnExit: any) => {
    const promises: any = [];
    participants.forEach((p: any) => {
      console.log(`setting endConferenceOnExit = ${endConferenceOnExit} for callSid: ${p.callSid} status: ${p.status}`);
      if (p.connecting) {
        return;
      } // skip setting end conference on connecting parties as it will fail
      promises.push(ConferenceService.setEndConferenceOnExit(conferenceSid, p.callSid, endConferenceOnExit));
    });

    try {
      await Promise.all(promises);
      console.log(`endConferenceOnExit set to ${endConferenceOnExit} for all participants`);
    } catch (error) {
      console.error(`Error setting endConferenceOnExit to ${endConferenceOnExit} for all participants\r\n`, error);
    }
  };

  render() {
    // This is a Renderless Component, only used for monitoring and taking action on conferences
    return null;
  }
}

export default ConferenceMonitor;
