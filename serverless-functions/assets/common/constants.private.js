const taskStatus = {
  PENDING: 'pending',
  RESERVED: 'reserved',
  ASSIGNED: 'assigned',
  WRAPPING: 'wrapping',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
};

const taskqueue = {
  EVERYONE_QUEUE: 'Everyone',
  TIMEOUT_QUEUE: 'TimeoutQueue',
  MISSING_TARGET_QUEUE: 'missing_target_queue',
  PRESALES_FS_DEFAULT_QUEUE: 'PreSales_FS_default',
};

const taskChannel = {
  EMAIL: 'email',
  WEBCHAT: 'chat',
  WHATSAPP: 'whatsapp',
};

const taskDirection = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
};

const transferTargetType = {
  WORKER: 'worker',
  QUEUE: 'queue',
};

module.exports = {
  taskStatus,
  taskqueue,
  taskChannel,
  taskDirection,
  transferTargetType,
};
