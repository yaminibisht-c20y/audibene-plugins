const workFlowSidsTestData = ['WW1b68e1b5571a2b3ffab0be5f9ff8c986'];
const activitySidsTestData = [
  'Available',
  'Offline',
  'Online',
  'Away From Keyboard',
];
const taskTestData = [
  {
    workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
    assignmentStatus: 'pending',
    dateUpdated: '2022-06-30T06:08:43Z',
    taskQueueEnteredDate: '2022-06-23T11:13:54Z',
    age: 1114855,
    sid: 'WT871aa75c7eb78674eee40c35a084d1f4',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    priority: 0,
    url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Tasks/WT871aa75c7eb78674eee40c35a084d1f4',
    reason: null,
    taskQueueSid: 'WQe94ac12d071d3a0c054528171fc38fd3',
    workflowFriendlyName: 'PreSales_FS_WA',
    timeout: 1209540,
    attributes:
      '{"channelSid":"CHdd4c88d311af4d0db43962631292e9bf","twilio_number":"whatsapp:+11111111111","channel":"whatsapp","channelType":"whatsapp","language":"","program":"FS","type":"inbound","conversations":{"conversation_id":"WTacaece7cc20453077058c3fd5be37c68"},"concern":"","from_number":"whatsapp:+44000000000","name":"whatsapp:+44000000000","UUID":"","execution_sid":"FNb08c2c042ed81309b38e88a21c853d28","direction":"inbound","status":"PreSales","worker_sid":"WK7c944454df20f545ad9fcc61631c5c07"}',
    dateCreated: '2022-06-23T11:13:54Z',
    taskChannelSid: 'TCa65139d201d90b06941530ed2b36dcc9',
    addons: '{}',
    taskChannelUniqueName: 'whatsapp',
    workflowSid: 'WWd5d4f4152d74dcc22a707b19dedd382c',
    taskQueueFriendlyName: 'PreSales_FS_main',
  },
  {
    workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
    assignmentStatus: 'pending',
    dateUpdated: '2022-06-30T06:08:53Z',
    taskQueueEnteredDate: '2022-06-28T06:49:26Z',
    age: 698723,
    sid: 'WTf41626fc8a0b5f088be5dce40d8a7409',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    priority: 0,
    url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Tasks/WTf41626fc8a0b5f088be5dce40d8a7409',
    reason: null,
    taskQueueSid: 'WQe94ac12d071d3a0c054528171fc38fd3',
    workflowFriendlyName: 'PreSales_FS_WA',
    timeout: 1209540,
    attributes:
      '{"channelSid":"CH57e758cb88f944eda6fad43ec1601c97","twilio_number":"whatsapp:+44000000000","channel":"whatsapp","channelType":"whatsapp","language":"","program":"FS","type":"inbound","conversations":{"conversation_id":"WT85c405fdaa1239510ed8a93748ba44db"},"concern":"","from_number":"whatsapp:+44000000000","name":"whatsapp:+44000000000","UUID":"","execution_sid":"FNe3c2974be1488472d91de3e955150fa4","direction":"inbound","status":"PreSales","worker_sid":"WK7c944454df20f545ad9fcc61631c5c07"}',
    dateCreated: '2022-06-28T06:49:26Z',
    taskChannelSid: 'TCa65139d201d90b06941530ed2b36dcc9',
    addons: '{}',
    taskChannelUniqueName: 'whatsapp',
    workflowSid: 'WWd5d4f4152d74dcc22a707b19dedd382c',
    taskQueueFriendlyName: 'PreSales_FS_main',
  },
  {
    workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
    assignmentStatus: 'pending',
    dateUpdated: '2022-07-01T13:14:50Z',
    taskQueueEnteredDate: '2022-07-01T13:14:50Z',
    age: 416399,
    sid: 'WT3a97d5edb91407707bc8cfed2ebe81a9',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    priority: 0,
    url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Tasks/WT3a97d5edb91407707bc8cfed2ebe81a9',
    reason: null,
    taskQueueSid: 'WQ2d148387aa091fa5c36e8826ecedbd3e',
    workflowFriendlyName: 'Transfer',
    timeout: 1209540,
    attributes:
      '{"channelSid":"CHc53ff38bf08c4b3b96d44d2e052c19e8","channel":"chat","channelType":"chat","language":"DE","program":"FS","type":"inbound","uuid":"0f785bc5-a7c3-4dbd-bf3f-b7f4228aa12d","conversations":{"conversation_id":"WTecc2332a6add3ee7c2bced7ee59738e1"},"concern":"default","developerAccess":"false","transferTargetType":"queue","name":"","course":"","ignoreAgent":"client:ujwaldeep_2Esingh","UUID":"55678878fdsfsd987977","execution_sid":"FNfcc8dadc48ed1168eb02e44daa0c3f22","customer_email_address":"test@c20y.com","email":"test@c20y.com","targetSid":"WQ2d148387aa091fa5c36e8826ecedbd3e","direction":"inbound","status":"PreSales","previousQueueName":"Chat Inbound"}',
    dateCreated: '2022-07-01T13:14:50Z',
    taskChannelSid: 'TC57c34777c44d31d036e22f3507e10c0d',
    addons: '{}',
    taskChannelUniqueName: 'chat',
    workflowSid: 'WW4afda1d65f8d39c60a83ed07458d1652',
    taskQueueFriendlyName: 'Chat Inbound',
  },
];

const workerTestData = [
  {
    available: false,
    workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
    dateUpdated: '2022-05-31T14:48:06Z',
    activitySid: 'WA18cba48856f2f0093d1e3e1b8d65869d',
    sid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
    friendlyName: 'christoph.sander',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef',
    dateStatusChanged: '2022-06-29T13:05:35Z',
    dateCreated: '2022-04-19T06:49:55Z',
    attributes:
      '{"routing":{"skills":["WhatsApp Inbound","Chat Inbound","Salesforce Case Inbound","Developer","Voice Inbound"],"levels":{}},"full_name":"Christoph Sander","image_url":"https:\\/\\/www.gravatar.com\\/avatar\\/5a0460263cb2e447697d6009a4c84f7c?d=mp","roles":["admin","wfo.full_access"],"contact_uri":"client:christoph_2Esander","disabled_skills":{"skills":[],"levels":{}},"email":"christoph.sander@c20y.com"}',
    activityName: 'Offline',
  },
  {
    available: false,
    workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
    dateUpdated: '2022-07-01T13:54:21Z',
    activitySid: 'WA18cba48856f2f0093d1e3e1b8d65869d',
    sid: 'WKf4541ac1086a35f4d11c522ed6817637',
    friendlyName: 'ujwaldeep.singh',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WKf4541ac1086a35f4d11c522ed6817637',
    dateStatusChanged: '2022-07-01T15:03:22Z',
    dateCreated: '2022-04-20T13:21:30Z',
    attributes:
      '{"languages":{"skills":["DE","EN"],"levels":{},"disabled_skills":{"skills":[],"levels":{}}},"programFamilies":{"skills":["DS"],"levels":{},"disabled_skills":{"skills":[],"levels":{}}},"image_url":"https:\\/\\/www.gravatar.com\\/avatar\\/29ded2d581905f36be14fa7456262bd0?d=mp","roles":["admin","wfo.full_access"],"concerns":{"skills":["main"],"levels":{},"disabled_skills":{"skills":[],"levels":{}}},"routing":{"skills":["Developer","WhatsApp Inbound","Chat Inbound"],"levels":{}},"full_name":"Ujwaldeep Singh","channels":{"skills":["chat","email","whatsapp","voice-inbound","voice-outbound"],"levels":{},"disabled_skills":{"skills":[],"levels":{}}},"contact_uri":"client:ujwaldeep_2Esingh","program_families":{"skills":["DistanceStudies"],"disabled_skills":{"skills":[],"levels":{}},"levels":{}},"stages":{"skills":["PreSales","AfterSales","Onboarding"],"levels":{},"disabled_skills":{"skills":[],"levels":{}}},"disabled_skills":{"skills":[],"levels":{}},"email":"ujwaldeep.singh@c20y.com"}',
    activityName: 'Offline',
  },
];

const workerChannelTestData = {
  WK09ff26a2657ac1ae40842e0df5c3d5ef: [
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WCa87ef0c6c5748e2a033bd4162421c966',
      sid: 'WCa87ef0c6c5748e2a033bd4162421c966',
      configuredCapacity: 10,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TC082d0f7b465de66fa66e9a6b453c0ac7',
      taskChannelUniqueName: 'default',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC0dae550d10307fef994dfa3e84fce545',
      sid: 'WC0dae550d10307fef994dfa3e84fce545',
      configuredCapacity: 1,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCaa80e488cc5003887cc4030e24635462',
      taskChannelUniqueName: 'voice',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WCec4b4d97b6598456e34759c1494ea3bf',
      sid: 'WCec4b4d97b6598456e34759c1494ea3bf',
      configuredCapacity: 10,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TC57c34777c44d31d036e22f3507e10c0d',
      taskChannelUniqueName: 'chat',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC7d24fefdd070163dd8fa55722af80253',
      sid: 'WC7d24fefdd070163dd8fa55722af80253',
      configuredCapacity: 10,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCdc09c145d0d49d8afc1bace2f37c4f9e',
      taskChannelUniqueName: 'sms',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC50545b5f06d5db2bd026f86a66b0e7bf',
      sid: 'WC50545b5f06d5db2bd026f86a66b0e7bf',
      configuredCapacity: 1,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCe6254ed401887d83d0cc72ff1621cff6',
      taskChannelUniqueName: 'video',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-19T06:49:55Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC30246db3019da72d9979bf0c4357046b',
      sid: 'WC30246db3019da72d9979bf0c4357046b',
      configuredCapacity: 1,
      dateCreated: '2022-04-19T06:49:55Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TC7bfeb1d2d5a0322d27ce818f0e2d82f8',
      taskChannelUniqueName: 'email',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-20T13:51:20Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC56cc8ce84e5a61f94b76cabcd426a571',
      sid: 'WC56cc8ce84e5a61f94b76cabcd426a571',
      configuredCapacity: 1,
      dateCreated: '2022-04-20T13:51:20Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TC06bc035a4c886e06027ca0cbf1fde6b6',
      taskChannelUniqueName: 'salesforce-case',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-04-20T13:51:26Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WCadfdce7815a711367a5b6d3a92e1fadc',
      sid: 'WCadfdce7815a711367a5b6d3a92e1fadc',
      configuredCapacity: 1,
      dateCreated: '2022-04-20T13:51:26Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCa65139d201d90b06941530ed2b36dcc9',
      taskChannelUniqueName: 'whatsapp',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-06-15T08:37:42Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC2459ed52fd5a63b1f59363849c3af745',
      sid: 'WC2459ed52fd5a63b1f59363849c3af745',
      configuredCapacity: 1,
      dateCreated: '2022-06-15T08:37:42Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCdffd1d2fcbb68fa0035a0a2019d608ca',
      taskChannelUniqueName: 'voice-inbound',
    },
    {
      available: true,
      workerSid: 'WK09ff26a2657ac1ae40842e0df5c3d5ef',
      dateUpdated: '2022-06-15T10:07:01Z',
      workspaceSid: 'WS3a823a85c4591fefc68808fc71575b0a',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      assignedTasks: 0,
      url: 'https://taskrouter.twilio.com/v1/Workspaces/WS3a823a85c4591fefc68808fc71575b0a/Workers/WK09ff26a2657ac1ae40842e0df5c3d5ef/Channels/WC771d32d3e9e30ef71e00f5010fe71f45',
      sid: 'WC771d32d3e9e30ef71e00f5010fe71f45',
      configuredCapacity: 1,
      dateCreated: '2022-06-15T10:07:01Z',
      availableCapacityPercentage: 100,
      taskChannelSid: 'TCb7dd96890e965fbc891e63e71816eafe',
      taskChannelUniqueName: 'voice-outbound',
    },
  ],
};

const syncMapsMockData = {
  fetchResponse: {
    sid: 'MP4abf12e6b99748a6b138448db73917e2',
    uniqueName: 'sid:whatsapp:+91844831XXXX',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
    url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP4abf12e6b99748a6b138448db73917e2',
    links: {
      items:
        'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP4abf12e6b99748a6b138448db73917e2/Items',
      permissions:
        'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP4abf12e6b99748a6b138448db73917e2/Permissions',
    },
    revision: '94',
    dateExpires: null,
    dateCreated: '2022-05-05T07:15:46.000Z',
    dateUpdated: '2022-07-01T09:04:37.000Z',
    createdBy: 'system',
  },
  createResponse: {
    sid: 'MP113087e832e864fba29404732acb772c',
    uniqueName: 'sid:whatsapp:+9184483XXXXX',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
    url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP113087e832e864fba29404732acb772c',
    links: {
      items:
        'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP113087e832e864fba29404732acb772c/Items',
      permissions:
        'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP113087e832e864fba29404732acb772c/Permissions',
    },
    revision: '0',
    dateExpires: null,
    dateCreated: '2022-07-07T13:51:09.000Z',
    dateUpdated: '2022-07-07T13:51:09.000Z',
    createdBy: 'system',
  },
  fetchItemResponse: {
    key: 'task_sid',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
    mapSid: 'MP4abf12e6b99748a6b138448db73917e2',
    url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP4abf12e6b99748a6b138448db73917e2/Items/task_sid',
    revision: '91',
    data: { task_sid: 'WTf41626fc8a0b5f088be5dce40d8a7409' },
    dateExpires: null,
    dateCreated: '2022-05-05T07:15:46.000Z',
    dateUpdated: '2022-06-28T06:49:26.000Z',
    createdBy: 'system',
  },
  createItemResponse: {
    key: 'sid',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
    mapSid: 'MP3043a16df8282d5982c4d82e2f49240e',
    url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP3043a16df8282d5982c4d82e2f49240e/Items/sid',
    revision: '3',
    data: { task_sid: 'WTf41626fc8a0b5f088be5dce40d8a7409' },
    dateExpires: null,
    dateCreated: '2022-07-11T06:51:07.000Z',
    dateUpdated: '2022-07-11T06:51:07.000Z',
    createdBy: 'system',
  },
  updateItemResponse: {
    key: 'sid',
    accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
    serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
    mapSid: 'MP3043a16df8282d5982c4d82e2f49240e',
    url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP3043a16df8282d5982c4d82e2f49240e/Items/sid',
    revision: '4',
    data: { task_sid: 'WTf41626fc8a0b5f088be5dce40d8a7409' },
    dateExpires: null,
    dateCreated: '2022-07-11T06:51:07.000Z',
    dateUpdated: '2022-07-11T11:25:23.000Z',
    createdBy: 'system',
  },
};

const syncDocumentMockData = [
  {
    accountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    createdBy: 'created_by',
    data: {},
    dateExpires: '2015-07-30T21:00:00Z',
    dateCreated: '2015-07-30T20:00:00Z',
    dateUpdated: '2015-07-30T20:00:00Z',
    revision: 'revision',
    serviceSid: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    sid: 'ET00000000000000000000000000000000',
    uniqueName: 'unique_name',
    url: 'https://sync.twilio.com/v1/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Documents/ET00000000000000000000000000000000',
  },
];
const proxyServiceTestData = [
  {
    sid: 'KSfa376f02a0430879ddcccc6278a5e8f9',
    uniqueName: 'Flex Proxy Service',
    sessions: [
      {
        sid: 'KC5101303fa33facc5c55c5771c5d67d34',
        uniqueName: 'Flex Proxy Service Session 1',
      },
      {
        sid: 'KC5101303fa33facc5c55c5771c5d67d49',
        uniqueName: 'Flex Proxy Service Session 2',
      },
    ],
  },
];

const middlwareCaseData = [
  {
    message: null,
    data: [
      {
        uuid: 'b99f289e-bb5b-42e7-941d-ecdbddda800d',
        language: 'EN',
        primaryOpportunity: {
          stage: 'PreLead',
          programFamily: 'EU',
        },
        phoneNumbers: ['+918888888888'],
        emailAddresses: ['email@c20y.com'],
      },
    ],
  },
  {
    message: null,
    data: [
      {
        uuid: 'b99f289e-bb5b-42e7-941d-ecdbddda800d',
        language: 'EN',
        primaryOpportunity: {
          programFamily: 'EU',
        },
        phoneNumbers: ['+918888888888'],
        emailAddresses: ['nostage@test.com'],
      },
    ],
  },
];

const syncMapFunctionsData = {
  fetchSyncMapItemResponse: [
    {
      key: 'spam-blacklist',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      mapSid: 'MPb2ca75114f094716abb2964830b456e9',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MPb2ca75114f094716abb2964830b456e9/Items/spam-blacklist',
      revision: 'f',
      data: {
        data: [
          {
            agentSid: 'WK7c944454df20f545ad9fcc61631c5c07',
            phoneNumber: '+918888888888',
            createdAt: '2022-07-14T12:03:15.218Z',
            agentName: 'agent.name',
          },
        ],
      },
      dateExpires: null,
      dateCreated: '2022-05-05T08:18:12.000Z',
      dateUpdated: '2022-07-14T12:03:16.000Z',
      createdBy: 'system',
    },
    {
      key: 'whatsapp_sids',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      mapSid: 'MP2dabcecc2859637ae8944f0736d0386b',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP2dabcecc2859637ae8944f0736d0386b/Items/whatsapp_sids',
      revision: '0',
      data: {
        data: {
          channel_sid: 'CH57e758cb88f944eda6fad43ec1601c97',
          task_sid: 'WTdf59aaa14f9632d70646988454f557d0'
        }
      },
      dateExpires: null,
      dateCreated: '2022-07-19T12:01:23.000Z',
      dateUpdated: '2022-07-19T12:01:23.000Z',
      createdBy: 'system'
    }
  ],
  createSyncMapResponse: [
    {
      sid: 'MP6695281e1dc698dbd874681bd3e4a1e2',
      uniqueName: 'spam-manager',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2',
      links: {
        items:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2/Items',
        permissions:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2/Permissions',
      },
      revision: '0',
      dateExpires: null,
      dateCreated: '2022-07-14T13:01:40.000Z',
      dateUpdated: '2022-07-14T13:01:40.000Z',
      createdBy: 'system',
    },
    {
      sid: 'MP6695281e1dc698dbd874681bd3e4a1e3',
      uniqueName: 'sid:whatsapp:+91844831XXXX',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e3',
      links: {
        items:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e3/Items',
        permissions:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e3/Permissions',
      },
      revision: '0',
      dateExpires: null,
      dateCreated: '2022-07-14T13:01:40.000Z',
      dateUpdated: '2022-07-14T13:01:40.000Z',
      createdBy: 'system',
    },
  ],
  fetchSyncMapResponse: [
    {
      sid: 'MP6695281e1dc698dbd874681bd3e4a1e2',
      uniqueName: 'spam-manager',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2',
      links: {
        items:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2/Items',
        permissions:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e2/Permissions',
      },
      revision: '0',
      dateExpires: null,
      dateCreated: '2022-07-14T13:01:40.000Z',
      dateUpdated: '2022-07-14T13:01:40.000Z',
      createdBy: 'system',
    },
    {
      sid: 'MP6695281e1dc698dbd874681bd3e4a1e4',
      uniqueName: 'sid:whatsapp:+9184483XXXXX',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e4',
      links: {
        items:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e4/Items',
        permissions:
          'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP6695281e1dc698dbd874681bd3e4a1e4/Permissions',
      },
      revision: '0',
      dateExpires: null,
      dateCreated: '2022-07-14T13:01:40.000Z',
      dateUpdated: '2022-07-14T13:01:40.000Z',
      createdBy: 'system',
    },
  ],
  createItemResponse: [
    {
      key: 'spam-blacklist',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      mapSid: 'MPb2ca75114f094716abb2964830b456e9',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MPb2ca75114f094716abb2964830b456e9/Items/spam-blacklist',
      revision: 'f',
      data: { data: [[Object]] },
      dateExpires: null,
      dateCreated: '2022-05-05T08:18:12.000Z',
      dateUpdated: '2022-07-14T12:03:16.000Z',
      createdBy: 'system',
    },
  ],
  updateSyncMapItemResponse: [
    {
      key: 'spam-blacklist',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      mapSid: 'MPb2ca75114f094716abb2964830b456e9',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MPb2ca75114f094716abb2964830b456e9/Items/spam-blacklist',
      revision: 'f',
      data: { data: [] },
      dateExpires: null,
      dateCreated: '2022-05-05T08:18:12.000Z',
      dateUpdated: '2022-07-14T12:03:16.000Z',
      createdBy: 'system',
    },
    {
      key: 'whatsapp_sids',
      accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
      serviceSid: 'IS163d3e525c3fed08aabbd4f5e6bd3856',
      mapSid: 'MP2dabcecc2859637ae8944f0736d0386b',
      url: 'https://sync.twilio.com/v1/Services/IS163d3e525c3fed08aabbd4f5e6bd3856/Maps/MP2dabcecc2859637ae8944f0736d0386b/Items/whatsapp_sids',
      revision: '1',
      data: {
        data: {
          channel_sid: 'CH57e758cb88f944eda6fad43ec1601c97',
          task_sid: 'WTdf59aaa14f9632d70646988454f557d0'
        }
      },
      dateExpires: null,
      dateCreated: '2022-07-19T12:01:23.000Z',
      dateUpdated: '2022-07-19T12:03:33.000Z',
      createdBy: 'system'
    },
  ],
};
const messagesData = [
  {
    account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    api_version: '2010-04-01',
    body: 'testing',
    date_created: 'Fri, 24 May 2019 17:44:46 +0000',
    date_sent: 'Fri, 24 May 2019 17:44:50 +0000',
    date_updated: 'Fri, 24 May 2019 17:44:50 +0000',
    direction: 'outbound-api',
    error_code: null,
    error_message: null,
    from: '+12019235161',
    messaging_service_sid: null,
    num_media: '0',
    num_segments: '1',
    price: '-0.00750',
    price_unit: 'USD',
    sid: 'SMded05904ccb347238880ca9264e8fe1c',
    status: 'sent',
    subresource_uris: {
      media:
        '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json',
      feedback:
        '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json',
    },
    to: '+18182008801',
    uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c.json',
  },
  {
    account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    api_version: '2010-04-01',
    body: 'look mom I have media!',
    date_created: 'Fri, 24 May 2019 17:44:46 +0000',
    date_sent: 'Fri, 24 May 2019 17:44:49 +0000',
    date_updated: 'Fri, 24 May 2019 17:44:49 +0000',
    direction: 'inbound',
    error_code: 30004,
    error_message: 'Message blocked',
    from: '+12019235161',
    messaging_service_sid: null,
    num_media: '3',
    num_segments: '1',
    price: '-0.00750',
    price_unit: 'USD',
    sid: 'MMc26223853f8c46b4ab7dfaa6abba0a26',
    status: 'received',
    subresource_uris: {
      media:
        '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json',
      feedback:
        '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json',
    },
    to: '+18182008801',
    uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json',
  },
];

const chatChannelData = {
  fetchChannelResponse: [
    {
      channel: {
        sid: 'CH57e758cb88f944eda6fad43ec1601c97',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-12T06:48:57.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
    {
      channel: {
        sid: 'CH57e758cb88f944eda6fad43ec1601c98',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","formData":{"email":"email@c20y.com","name":"Agent","source":"test webchat studio flow","customer_email_address":"email@c20y.com"},"forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-12T06:48:57.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
  ],
  updateChannelResponse: [
    {
      channel: {
        sid: 'CH57e758cb88f944eda6fad43ec1601c97',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","formData":{"email":"email@c20y.com","name":"Agent","source":"test webchat studio flow","customer_email_address":"email@c20y.com"},"forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-19T04:28:49.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
    {
      channel: {
        sid: 'CH000000000000000060D00000GpmS1QAJ',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","formData":{"email":"email@c20y.com","name":"Agent","source":"test webchat studio flow","customer_email_address":"email@c20y.com"},"forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-12T06:48:57.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
    {
      channel: {
        sid: 'CH000000000000000060D00000GpmS1QAK',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","formData":{"email":"email@c20y.com","name":"Agent","source":"test webchat studio flow","customer_email_address":"email@c20y.com"},"forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-12T06:48:57.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
    {
      channel: {
        sid: 'CH000000000000000060D00000CCCCCCCC',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        serviceSid: 'IS8dc7adb8ea004de59d33d22ef6715ab3',
        friendlyName: 'whatsapp:+91844831XXXX',
        uniqueName: null,
        attributes:
          '{"serviceNumber":"whatsapp_dj9xnkf1qlr4no27i3wjnaeu65wkeak9","from":"whatsapp:+91844831XXXX","formData":{"email":"email@c20y.com","name":"Agent","source":"test webchat studio flow","customer_email_address":"email@c20y.com"},"forwarding":true,"proxySession":"KCe7de1e14f14cca0cc803af712df36c40","twilioNumber":"whatsapp:+14155238886","channel_type":"whatsapp","status":"INACTIVE","long_lived":true}',
        type: 'private',
        dateCreated: '2022-04-25T09:00:51.000Z',
        dateUpdated: '2022-07-12T06:48:57.000Z',
        createdBy: 'system',
        membersCount: 3,
        messagesCount: 282,
        url: 'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97',
        links: {
          webhooks:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Webhooks',
          messages:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages',
          invites:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Invites',
          members:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Members',
          last_message:
            'https://chat.twilio.com/v2/Services/IS8dc7adb8ea004de59d33d22ef6715ab3/Channels/CH57e758cb88f944eda6fad43ec1601c97/Messages/IM0b46fc43b4d444509f3d8f0da8fbcf4b',
        },
      },
    },
  ],
};

const studioFlowData = {
  createExecutionResponse: [
    {
      execution: {
        sid: 'FNf093846bc06239bea4a653fdb9622134',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        flowSid: 'FWXXXX',
        contactChannelAddress: 'CH57e758cb88f944eda6fad43ec1601c98',
        context: {},
        status: 'active',
        dateCreated: '2022-07-19T04:34:55.000Z',
        dateUpdated: null,
        url: 'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134',
        links: {
          steps:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Steps',
          execution_context:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Context',
        },
      },
    },
    {
      execution: {
        sid: 'FNf093846bc06239bea4a653fdb9622134',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        flowSid: 'FWXXXX',
        contactChannelAddress: 'CH57e758cb88f944eda6fad43ec1601c97',
        context: {},
        status: 'active',
        dateCreated: '2022-07-19T04:34:55.000Z',
        dateUpdated: null,
        url: 'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134',
        links: {
          steps:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Steps',
          execution_context:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Context',
        },
      },
    },
    {
      execution: {
        sid: 'FNf093846bc06239bea4a653fdb9622134',
        accountSid: 'AC40d459da266632ddd0092e8ef08e8a3c',
        flowSid: 'FW00000000000000000000000000000000',
        contactChannelAddress: 'CH57e758cb88f944eda6fad43ec1601c97',
        context: {},
        status: 'active',
        dateCreated: '2022-07-19T04:34:55.000Z',
        dateUpdated: null,
        url: 'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134',
        links: {
          steps:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Steps',
          execution_context:
            'https://studio.twilio.com/v2/Flows/FWXXXX/Executions/FNf093846bc06239bea4a653fdb9622134/Context',
        },
      },
    },
  ],
};

module.exports = {
  activitySidsTestData,
  workFlowSidsTestData,
  taskTestData,
  workerTestData,
  workerChannelTestData,
  syncMapsMockData,
  proxyServiceTestData,
  middlwareCaseData,
  syncDocumentMockData,
  syncMapFunctionsData,
  messagesData,
  chatChannelData,
  studioFlowData,
};
