const responseMessages = {};

const errorMessages = {
  TWILIO_TASK_UPDATE_ERROR: 'Twilio TR Task Update error',

  CONFERENCE_PARTICIPANT_CREATE_UPDATE_ERROR:
    'error occurred while creating/updating participant',
  INTERNAL_SERVER_ERROR: 'Something went wrong',
};

module.exports = {
  ...responseMessages,
  ...errorMessages,
};
