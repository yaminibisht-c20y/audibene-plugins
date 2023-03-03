import * as Flex from '@twilio/flex-ui';

import registerExternalTransferNotifications from '../../feature-library/external-transfer/flex-hooks/notifications';

// eslint-disable-next-line import/no-unused-modules
export default (flex: typeof Flex, manager: Flex.Manager) => {
  registerExternalTransferNotifications(flex, manager);
};
