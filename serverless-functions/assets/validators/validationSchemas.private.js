const Joi = require('joi');

const processUpdateTaskSchema = Joi.object({
  taskSid: Joi.string()
    .length(34)
    .pattern(/WT(.*)/)
    .required(),
  updateData: Joi.object({
    priority: Joi.number(),
    assignmentStatus: Joi.string().valid('canceled', 'wrapping', 'completed'),
    reason: Joi.string(),
    attributes: Joi.object({}).options({ allowUnknown: true }),
  }).min(1),
});

const addConferenceParticipantSchema = Joi.object({
  conferenceSid: Joi.string()
    .length(34)
    .pattern(/CF(.*)/)
    .required(),
  to: Joi.string(),
  from: Joi.string(),
  customerParticipantSid: Joi.string()
    .length(34)
    .pattern(/CA(.*)/)
    .required(),
  forwardType: Joi.string(),
  task: Joi.string()
    .length(34)
    .pattern(/WT(.*)/),
}).options({ allowUnknown: true });

const processCreateConferenceParticipantSchema = Joi.object({
  conferenceSid: Joi.string()
    .length(34)
    .pattern(/CF(.*)/)
    .required(),
  participantData: Joi.object(),
}).options({ allowUnknown: true });

const processUpdateConferenceParticipantSchema = Joi.object({
  conferenceSid: Joi.string()
    .length(34)
    .pattern(/CF(.*)/)
    .required(),
  participantSid: Joi.string()
    .length(34)
    .pattern(/CA(.*)/)
    .required(),
  updateData: Joi.object({
    hold: Joi.boolean(),
    endConferenceOnExit: Joi.boolean(),
  }).options({ allowUnknown: true }),
}).options({ allowUnknown: true });

const removeConferenceParticipantSchema = Joi.object({
  conferenceSid: Joi.string()
    .length(34)
    .pattern(/CF(.*)/)
    .required(),
  participantSid: Joi.string()
    .length(34)
    .pattern(/CA(.*)/)
    .required(),
}).options({ allowUnknown: true });

const callPropertiesSchema = Joi.object({
  callSid: Joi.string()
    .length(34)
    .pattern(/CA(.*)/)
    .required(),
}).options({ allowUnknown: true });

module.exports = {
  processUpdateTaskSchema,

  addConferenceParticipantSchema,
  processCreateConferenceParticipantSchema,
  processUpdateConferenceParticipantSchema,
  callPropertiesSchema,
  removeConferenceParticipantSchema,
};
