import ConferenceService from '../../../../utils/serverless/Conference/ConferenceService';

export const kickExternalTransferParticipant = async (payload: any) => {
  const { task, targetSid } = payload;

  const conference = task.attributes.conference ? task.attributes.conference.sid : task.conference.conferenceSid;

  const participantSid = targetSid;

  await ConferenceService.removeParticipant(conference, participantSid);
};
