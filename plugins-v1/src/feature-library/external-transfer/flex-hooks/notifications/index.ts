import * as Flex from '@twilio/flex-ui';

export default (flex: typeof Flex, manager: Flex.Manager) => {
  // eslint-disable-next-line no-use-before-define
  registerCustomNotifications(flex, manager);
};

export const CustomNotifications = {
  FailedHangupNotification: 'PS_FailedHangupOnConferenceWithExternalParties',
};

function registerCustomNotifications(flex: typeof Flex, manager: Flex.Manager) {
  flex.Notifications.registerNotification({
    id: CustomNotifications.FailedHangupNotification,
    type: Flex.NotificationType.error,
    content:
      'Hangup call abandoned: Failed to take all participants off hold while hanging up the call. If this issue persists, please try unholding participants manually before leaving the call',
  });

  flex.Notifications.registerNotification({
    id: 'GeneralException1',
    content: 'An error occured.',
    type: flex.NotificationType.error,
  });

  flex.Notifications.registerNotification({
    id: 'FailedInternalCall',
    content: 'Agent is busy. Please try again.',
    type: flex.NotificationType.error,
  });
}
