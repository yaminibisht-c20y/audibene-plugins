import * as Flex from '@twilio/flex-ui';

export default (flex: typeof Flex, manager: Flex.Manager) => {
  manager.strings = {
    ...manager.strings,
  } as any;
};
