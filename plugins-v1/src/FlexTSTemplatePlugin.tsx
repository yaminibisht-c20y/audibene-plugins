import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import AddReducers from './flex-hooks/redux';
import ConfigureFlexStrings from './flex-hooks/strings';
import CustomizeFlexComponents from './flex-hooks/components';
import CustomizeFlexActions from './flex-hooks/actions';
import CustomizeNotifications from './flex-hooks/notifications';

const PLUGIN_NAME = 'FlexTSTemplatePlugin';

export default class FlexTSTemplatePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    // window.manager = manager;
    const initializers = [
      AddReducers,
      ConfigureFlexStrings,
      CustomizeFlexComponents,
      CustomizeFlexActions,
      CustomizeNotifications,
    ];

    initializers.forEach((initializer) => initializer(flex, manager));
  }
}
