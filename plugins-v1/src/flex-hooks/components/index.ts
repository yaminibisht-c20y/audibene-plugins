import * as Flex from '@twilio/flex-ui';

import ExternalTransfer from '../../feature-library/external-transfer';

export default (flex: typeof Flex, manager: Flex.Manager) => {
  ExternalTransfer(flex, manager);
};
