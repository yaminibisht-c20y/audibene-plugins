const ResponseMessages = require(Runtime.getAssets()['/common/literals.js']
  .path);

const {
  taskTestData,
  workerTestData,
  workerChannelTestData,
  workFlowSidsTestData,
  activitySidsTestData,
  syncMapsMockData,
  syncDocumentMockData,
  proxyServiceTestData,
  messagesData,
} = require('./data.js');

const workers = jest.fn((workerSid) => {
  const workerChannels = jest.fn((channel) => {
    return {
      update: jest.fn((updateData) => {
        return new Promise((resolve, reject) => {
          let channelList = workerChannelTestData[workerSid].filter(
            (c) =>
              c.taskChannelUniqueName === channel && c.workerSid == workerSid,
          );
          if (channelList.length > 0) {
            channelList[0].available = updateData.available;
            resolve(channelList[0]);
          } else {
            reject(new Error(ResponseMessages.ERROR));
          }
        });
      }),
    };
  });
  const response = {
    list: jest.fn((listOptions) => {
      return new Promise((resolve) => resolve([]));
    }),
    fetch: jest.fn(() => {
      let workerList = workerTestData.filter(
        (worker) => worker.sid === workerSid,
      );
      return new Promise((resolve, reject) => {
        if (workerList.length > 0) {
          return resolve(workerList[0]);
        } else {
          return reject(new Error(ResponseMessages.ERROR));
        }
      });
    }),
    update: jest.fn((workerData) => {
      let workerList = workerTestData.filter(
        (worker) => worker.sid === workerSid,
      );
      return new Promise((resolve, reject) => {
        if (workerList.length > 0) {
          let worker = workerList[0];
          if (Object.keys(workerData) - Object.keys(worker) > 0) {
            return reject(new Error(ResponseMessages.ERROR));
          }

          workerData.attributes = {
            ...worker.attributes,
            ...workerData.attributes,
          };
          return resolve({ ...worker, ...workerData });
        } else {
          return reject(new Error(ResponseMessages.ERROR));
        }
      });
    }),
    workerChannels,
  };

  workerChannels.list = jest.fn((listOptions) => {
    return new Promise((resolve, reject) => {
      if (workerChannelTestData[workerSid]) {
        resolve(workerChannelTestData[workerSid]);
      } else {
        reject(new Error(ResponseMessages.ERROR));
      }
    });
  });
  return response;
});

workers.list = jest.fn((listOptions) => {
  return new Promise((resolve, reject) => {
    if (
      listOptions.activityName &&
      activitySidsTestData.indexOf(listOptions.activityName) == -1
    ) {
      reject(new Error(ResponseMessages.ERROR));
    }
    resolve(workerTestData);
  });
});

const tasks = jest.fn((taskSid) => {
  return {
    fetch: jest.fn(() => {
      let taskList = taskTestData.filter((task) => task.sid === taskSid);
      return new Promise((resolve, reject) => {
        if (taskList.length > 0) {
          return resolve(taskList[0]);
        } else {
          return reject(new Error(ResponseMessages.ERROR));
        }
      });
    }),
    update: jest.fn((taskData) => {
      let taskList = taskTestData.filter((task) => task.sid === taskSid);
      return new Promise((resolve, reject) => {
        if (taskList.length > 0) {
          let task = taskList[0];

          if (
            Object.keys(taskData).filter((x) => !Object.keys(task).includes(x))
              .length > 0
          ) {
            return reject(new Error(ResponseMessages.ERROR));
          }
          if (taskData.attributes) {
            taskData.attributes = {
              ...task.attributes,
              ...taskData.attributes,
            };
          }
          return resolve({ ...task, ...taskData });
        } else {
          return reject(new Error(ResponseMessages.ERROR));
        }
      });
    }),
  };
});

tasks.create = jest.fn((createData) => {
  return new Promise((resolve, reject) => {
    if (
      createData.workflowSid &&
      workFlowSidsTestData.indexOf(createData.workflowSid) === -1
    ) {
      reject(new Error(ResponseMessages.ERROR));
    }
    if (
      Object.keys(createData).filter(
        (x) => !Object.keys(taskTestData[0]).includes(x),
      ).length > 0
    ) {
      return reject(new Error(ResponseMessages.ERROR));
    }

    resolve(taskTestData[0]);
  });
});

tasks.list = jest.fn((options) => {
  return new Promise((resolve, reject) => {
    if (options.evaluateTaskAttributes) {
      if (options.evaluateTaskAttributes.includes('000000001')) {
        return reject();
      } else if (options.evaluateTaskAttributes.includes('0000000')) {
        return reject({ code: 45010 });
      }
    }
    return resolve([]);
  });
});

const workspace = {
  workers,
  tasks,
};

const taskrouter = {
  workspaces: jest.fn(() => {
    return workspace;
  }),
};

const syncMapItems = jest.fn((syncMapItemKey) => {
  return {
    fetch: jest.fn(() => {
      return new Promise((resolve, reject) => {
        if (syncMapItemKey != syncMapsMockData.fetchItemResponse.key) {
          reject(new Error(ResponseMessages.TWILIO_SYNC_MAP_ITEM_NOT_FOUND));
        }
        resolve(syncMapsMockData.fetchItemResponse);
      });
    }),
    update: jest.fn((params) => {
      return new Promise((resolve, reject) => {
        if (!syncMapsMockData || !params.data) {
          reject(
            new Error(ResponseMessages.TWILIO_SYNC_MAP_ITEM_DATA_NOT_FOUND),
          );
        }
        resolve(syncMapsMockData.updateItemResponse);
      });
    }),
  };
});

const syncMaps = jest.fn((syncMapUniqueKey) => {
  return {
    fetch: jest.fn(() => {
      return new Promise((resolve, reject) => {
        if (syncMapUniqueKey != syncMapsMockData.fetchResponse.uniqueName) {
          reject(new Error(ResponseMessages.TWILIO_SYNC_MAP_NOT_FOUND));
        }
        resolve(syncMapsMockData.fetchResponse);
      });
    }),
    syncMapItems,
  };
});

syncMaps.create = jest.fn((syncMapUniqueKey) => {
  return new Promise((resolve, reject) => {
    if (
      !syncMapsMockData ||
      syncMapUniqueKey.uniqueName == syncMapsMockData.fetchResponse.uniqueName
    ) {
      reject(new Error(ResponseMessages.UNIQUE_NAME_EXISTS));
    }
    resolve(syncMapsMockData.createResponse);
  });
});

syncMapItems.create = jest.fn((params) => {
  return new Promise((resolve, reject) => {
    if (
      !syncMapsMockData ||
      params.key === syncMapsMockData.fetchItemResponse.key
    ) {
      reject(new Error(ResponseMessages.TWILIO_SYNC_MAP_ITEM_KEY_EXISTS));
    }
    resolve(syncMapsMockData.createItemResponse);
  });
});

const syncDocuments = jest.fn((uniqueIdentifier, createData) => {
  return {
    fetch: jest.fn(() => {
      return new Promise((resolve, reject) => {
        if (uniqueIdentifier === 'ET00000000000000000000000000000000') {
          reject(new Error(ResponseMessages.TWILIO_SYNC_DOC_NOT_FOUND));
        } else {
          resolve(syncDocumentMockData[0]);
        }
      });
    }),
    remove: jest.fn(() => {
      return new Promise((resolve, reject) => {
        if (uniqueIdentifier === 'ET00000000000000000000000000000000') {
          reject(new Error(ResponseMessages.TWILIO_SYNC_DOC_DELETE_ERROR));
        } else {
          resolve();
        }
      });
    }),
    update: jest.fn((updateData) => {
      return new Promise((resolve, reject) => {
        if (uniqueIdentifier === 'ET00000000000000000000000000000000') {
          reject(new Error(ResponseMessages.TWILIO_SYNC_DOC_UPDATE_ERROR));
        } else {
          resolve(syncDocumentMockData[0]);
        }
      });
    }),
  };
});

syncDocuments.create = jest.fn((params) => {
  return new Promise((resolve, reject) => {
    if (params.uniqueName == 'failure') {
      reject(new Error(ResponseMessages.TWILIO_SYNC_DOC_CREATE_ERROR));
    } else {
      resolve(syncDocumentMockData[0]);
    }
  });
});

const sync = {
  services: jest.fn((serviceSid) => {
    return {
      syncMaps,
      documents: syncDocuments,
    };
  }),
};

const proxyServiceMethods = jest.fn((proxyServiceSid) => {
  const sessionMethods = jest.fn((proxySessionSid) => {
    return {
      fetch: jest.fn(() => {
        const service = proxyServiceTestData.find(
          (service) => service.sid == proxyServiceSid,
        );

        return new Promise((resolve, reject) => {
          if (service) {
            const session = service.sessions.find(
              (session) => session.sid !== proxySessionSid,
            );
            if (session) return resolve(session);
            else reject({ code: 20404 });
          } else
            return reject({
              code: 20404,
            });
        });
      }),
      remove: jest.fn(() => {
        const service = proxyServiceTestData.find(
          (service) => service.sid == proxyServiceSid,
        );

        return new Promise((resolve, reject) => {
          if (service) {
            service.sessions = service.sessions.filter(
              (session) => session.sid !== proxySessionSid,
            );
            return resolve();
          } else
            return reject({
              code: 20404,
            });
        });
      }),
      participants: {
        create: jest.fn((sessionParticipantAttributes) => {
          const service = proxyServiceTestData.find(
            (service) => service.sid == proxyServiceSid,
          );

          return new Promise((resolve, reject) => {
            if (!service)
              return reject({
                code: 20404,
              });

            const session = service.sessions.find(
              (session) => session.sid === proxySessionSid,
            );

            if (!session)
              reject({
                code: 20404,
              });
            else {
              if (!session.participants) session.participants = [];
              const participant = {
                sid: 'KPfa376f02a0430879ddcccc6278a5e8f9',
                ...sessionParticipantAttributes,
              };
              session.participants.push(participant);
              return resolve(participant);
            }
          });
        }),
      },
    };
  });

  sessionMethods.list = jest.fn(() => {
    const service = proxyServiceTestData.find(
      (service) => service.sid == proxyServiceSid,
    );

    return new Promise((resolve, reject) => {
      if (service) {
        const session = {
          sid: 'KC5639c94dc44237385c591f4db6ae8397',
        };
        service.sessions.push(session);
        return resolve(session);
      } else
        return reject({
          code: 20404,
        });
    });
  });

  sessionMethods.create = jest.fn(() => {
    const service = proxyServiceTestData.find(
      (service) => service.sid == proxyServiceSid,
    );

    return new Promise((resolve, reject) => {
      if (service) return resolve(service.sessions);
      else
        return reject({
          code: 20404,
        });
    });
  });

  return {
    fetch: jest.fn(() => {
      const service = proxyServiceTestData.find(
        (service) => service.sid == proxyServiceSid,
      );

      return new Promise((resolve, reject) => {
        if (service) return resolve(service);
        else
          return reject({
            code: 20404,
          });
      });
    }),
    sessions: sessionMethods,
  };
});

const proxy = {
  v1: {
    services: proxyServiceMethods,
  },
};

const chatServiceMethods = jest.fn((chatServiceSid) => {
  const channelMethods = jest.fn((chatchannelSid) => {
    const messages = jest.fn(() => {
      return {
        fetch: jest.fn(() => {
          return new Promise((resolve) => {
            resolve({
              attributes: JSON.stringify({}),
            });
          });
        }),
        update: jest.fn(() => {
          return new Promise((resolve) => {
            resolve({
              attributes: JSON.stringify({}),
            });
          });
        }),
      };
    });

    messages.create = jest.fn(() => {
      return new Promise((resolve, reject) => {
        if (chatchannelSid === 'CH00000000000000000000000000000000') {
          reject(new Error(ResponseMessages.TWILIO_MESSAGE_CREATE_ERROR));
        } else {
          resolve();
        }
      });
    });

    return {
      fetch: jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            attributes: JSON.stringify({}),
          });
        });
      }),
      list: jest.fn(() => {
        return new Promise((resolve) => {
          resolve();
        });
      }),
      update: jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            attributes: {},
          });
        });
      }),
      messages,
    };
  });

  channelMethods.create = jest.fn(() => {
    return new Promise((resolve) => {
      resolve({});
    });
  });

  return {
    channels: channelMethods,
  };
});

const chat = {
  v2: {
    services: chatServiceMethods,
  },
};

const studio = {
  flows: jest.fn().mockReturnValue({
    executions: {
      create: jest.fn().mockReturnValue(
        Promise.resolve({
          sid: 'FNdbe5b60592ed3a42cbbe86420b59aebd',
        }),
      ),
    },
  }),
};

const messages = jest.fn((messageSid) => {
  return {
    media: {
      list: jest.fn(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      }),
    },
  };
});

messages.list = jest.fn((filters) => {
  return new Promise((resolve, reject) => {
    if (filters.from !== '111111111') return resolve(messagesData);
    else return reject();
  });
});

messages.create = jest.fn((message) => {
  return new Promise((resolve, reject) => {
    if (message.from !== '111111111') return resolve(message);
    else return reject();
  });
});

const conferences = jest.fn(() => {
  const participants = jest.fn().mockImplementation(() => {
    return {
      update: jest.fn((confData) => {
        return new Promise((resolve) => resolve(confData));
      }),
      remove: jest.fn(() => {
        return new Promise((resolve) => resolve({}));
      }),
    };
  });

  participants.create = jest.fn((confData) => {
    return new Promise((resolve) => resolve(confData));
  });

  return {
    participants,
    update: jest.fn(() => {
      return Promise.resolve({});
    }),
  };
});

conferences.list = jest.fn(() => {
  return Promise.resolve([]);
});

const lookups = {
  v1: {
    phoneNumbers: jest.fn(() => {
      return {
        fetch: jest.fn(() => {
          return Promise.resolve({ carrier: 'success' });
        }),
      };
    }),
  },
};

const calls = jest.fn(() => {
  return {
    fetch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          caller_name: null,
          date_created: 'Tue, 31 Aug 2010 20:36:28 +0000',
          date_updated: 'Tue, 31 Aug 2010 20:36:44 +0000',
          direction: 'outbound',
          duration: '15',
          end_time: 'Tue, 31 Aug 2010 20:36:44 +0000',
          from: '+15552223214',
          from_formatted: '(555) 222-3214',
          phone_number_sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          sid: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          start_time: 'Tue, 31 Aug 2010 20:36:29 +0000',
          status: 'completed',
          subresource_uris: {},
          to: 'client:john_doe',
          uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json',
          queue_time: '1000',
        });
      });
    }),
    update: jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          caller_name: null,
          date_created: 'Tue, 31 Aug 2010 20:36:28 +0000',
          date_updated: 'Tue, 31 Aug 2010 20:36:44 +0000',
          direction: 'outbound',
          duration: '15',
          end_time: 'Tue, 31 Aug 2010 20:36:44 +0000',
          from: '+15552223214',
          from_formatted: '(555) 222-3214',
          phone_number_sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          sid: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          start_time: 'Tue, 31 Aug 2010 20:36:29 +0000',
          status: 'completed',
          subresource_uris: {},
          to: 'client:john_doe',
          uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json',
          queue_time: '1000',
        });
      });
    }),
  };
});

module.exports = {
  taskrouter,
  sync,
  proxy,
  studio,
  chat,
  messages,
  conferences,
  lookups,
  calls,
};
