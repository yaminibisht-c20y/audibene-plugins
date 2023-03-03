/* eslint-disable no-console */
import { Actions, Notifications, StateHelper } from '@twilio/flex-ui';

import { kickExternalTransferParticipant } from './ExternalTransfer';
import ConferenceService from '../../../../utils/serverless/Conference/ConferenceService';
import { CustomNotifications } from '../notifications';

export default (manager: any) => {
  Actions.addListener('beforeHoldParticipant', async (payload, abortFunction) => {
    const { participantType, targetSid: participantSid, task } = payload;

    if (participantType !== 'unknown') {
      return;
    }

    const { conferenceSid } = task.conference;
    abortFunction();
    await ConferenceService.holdParticipant(conferenceSid, participantSid);
  });

  Actions.addListener('beforeUnholdParticipant', async (payload, abortFunction) => {
    const { participantType, targetSid: participantSid, task } = payload;

    if (participantType !== 'unknown') {
      return;
    }

    const { conferenceSid } = task.conference;
    abortFunction();
    await ConferenceService.unholdParticipant(conferenceSid, participantSid);
  });

  Actions.addListener('beforeKickParticipant', (payload, abortFunction) => {
    const { participantType } = payload;

    if (participantType !== 'transfer' && participantType !== 'worker') {
      abortFunction();

      // Since the kicking out customer is handled in post call survey
      if (
        !(
          payload.task.attributes.direction === 'inbound' &&
          payload.task.attributes.survey_postcall === 'true' &&
          participantType === 'customer'
        )
      ) {
        kickExternalTransferParticipant(payload);
      }
    }
  });

  const setEndConferenceOnExit = async (conferenceSid: any, participants: any, endConferenceOnExit = true) => {
    const promises: any = [];
    participants.forEach((p: any) => {
      console.log(`setting endConferenceOnExit = ${endConferenceOnExit} for callSid: ${p.callSid} status: ${p.status}`);
      promises.push(ConferenceService.setEndConferenceOnExit(conferenceSid, p.callSid, endConferenceOnExit));
    });

    try {
      await Promise.all(promises);
      console.log(`endConferenceOnExit set to ${endConferenceOnExit} for all participants`);
    } catch (error) {
      console.error(`Error setting endConferenceOnExit to ${endConferenceOnExit} for all participants\r\n`, error);
    }
  };

  const getLatestConference = (taskSid: any) => {
    const updatedTask = StateHelper.getTaskByTaskrouterTaskSid(taskSid);
    return updatedTask.conference;
  };

  const snooze = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  Actions.addListener('beforeHangupCall', async (payload, abortFunction) => {
    const { conference, taskSid } = payload.task;
    const participantsOnHold = (participant: any) => {
      return participant.onHold && participant.status === 'joined';
    };

    // check if worker hanging up is last worker on the call
    if (conference.liveWorkerCount === 1) {
      /*
       * if so, ensure no other participants are on hold as
       *no external parties will be able to remove them from being on hold.
       */
      conference.participants.forEach(async (participant: any) => {
        const { participantType, workerSid, callSid } = participant;
        if (participant.onHold && participant.status === 'joined') {
          await Actions.invokeAction('UnholdParticipant', {
            participantType,
            task: payload.task,
            targetSid: participantType === 'worker' ? workerSid : callSid,
          });
        }
      });

      /*
       * make sure this operation blocks hanging up the call until
       * all participants are taken off hold or max wait time is reached
       */
      let attempts = 0;
      let updatedConference = getLatestConference(taskSid);
      let { participants } = updatedConference;
      while (participants.some(participantsOnHold) && attempts < 10) {
        await snooze(500);
        attempts += 1;
        updatedConference = getLatestConference(taskSid);
        // eslint-disable-next-line prefer-destructuring
        participants = updatedConference.participants;
      }

      // if some participants are still on hold, abort hanging up the call
      if (updatedConference.participants.some(participantsOnHold)) {
        Notifications.showNotification(CustomNotifications.FailedHangupNotification);
        abortFunction();
      }
    }
  });

  Actions.addListener('afterHangupCall', async (payload) => {
    const { conference, taskSid } = payload.task;
    const { conferenceSid, liveParticipantCount, liveWorkerCount } = conference;

    const unknownParticipants = (participant: any) => {
      return participant.participantType === 'unknown';
    };

    if (liveWorkerCount === 1 && liveParticipantCount <= 3) {
      let attempts = 0;
      let updatedConference = getLatestConference(taskSid);
      let { participants } = updatedConference;
      while (!participants.some(unknownParticipants) && attempts < 10) {
        await snooze(500);
        attempts += 1;
        updatedConference = getLatestConference(taskSid);
        // eslint-disable-next-line prefer-destructuring
        participants = updatedConference.participants;
      }

      const liveParticipants = participants.filter((p) => p.participantType !== 'worker');

      setTimeout(async () => {
        await setEndConferenceOnExit(conferenceSid, liveParticipants);
      }, 500);
    }
  });
};
