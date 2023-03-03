import React from 'react';
import * as Flex from '@twilio/flex-ui';

import { UIAttributes } from '../../types/manager/ServiceConfiguration';
import ParticipantActionsButtons from './custom-components/participant-actions-buttons';
import ParticipantName from './custom-components/participant-name';
import ParticipantStatus from './custom-components/participant-status';
import ParticipantStatusContainer from './custom-components/participant-status-container';
import ConferenceButton from './custom-components/conference-button';
import ConferenceDialog from './custom-components/conference-dialog';
import ConferenceMonitor from './custom-components/conference-monitor';
import { StringTemplates } from './flex-hooks/strings/ExternalTransfer';
import registerCustomActions from './flex-hooks/actions/CustomActions';

// eslint-disable-next-line consistent-return
export default function externalTransfer(flex: typeof Flex, manager: Flex.Manager) {
  const enabled = process.env.REACT_APP_SERVICE_FEATURE_ENABLED;
  if (!enabled) return 'not enabled';
  registerCustomActions(manager);

  // add translationStrings into manager.strings, preserving anything thats already there - this allows language to be updated outside of updating this plugin
  manager.strings = { ...StringTemplates, ...manager.strings };

  flex.CallCanvasActions.Content.add(<ConferenceButton key="conference" />, { sortOrder: 2 });

  flex.CallCanvas.Content.add(<ConferenceDialog key="conference-modal" />, { sortOrder: 100 });

  /*
   * This component doesn't render anything to the UI, it just monitors
   * conference changes and takes action as necessary
   */
  flex.CallCanvas.Content.add(<ConferenceMonitor key="conference-monitor" />, { sortOrder: 999 });

  const isUnknownParticipant = (props: any) => props.participant.participantType === 'unknown';
  const isNotTransferParticipant = (props: any) => props.participant.participantType !== 'transfer';

  // This section is for the full width ParticipantCanvas
  flex.ParticipantCanvas.Content.remove('actions', { if: isNotTransferParticipant });
  flex.ParticipantCanvas.Content.add(<ParticipantActionsButtons key="custom-actions" />, {
    sortOrder: 10,
    if: isNotTransferParticipant,
  });
  flex.ParticipantCanvas.Content.remove('name', { if: isUnknownParticipant });
  flex.ParticipantCanvas.Content.add(<ParticipantName key="custom-name" />, { sortOrder: 1, if: isUnknownParticipant });
  flex.ParticipantCanvas.Content.remove('status');
  flex.ParticipantCanvas.Content.add(<ParticipantStatus key="custom-status" />, { sortOrder: 2 });

  /*
   * This section is for the narrow width ParticipantCanvas, which changes to List Mode,
   * introduced in Flex 1.11.0. ListItem did not exist on ParticipantCanvas before 1.11.0.
   */
  if (flex.ParticipantCanvas.ListItem) {
    flex.ParticipantCanvas.ListItem.Content.remove('statusContainer');
    flex.ParticipantCanvas.ListItem.Content.add(<ParticipantStatusContainer key="custom-statusContainer" />, {
      sortOrder: 1,
    });
    flex.ParticipantCanvas.ListItem.Content.remove('actions', { if: isNotTransferParticipant });
    flex.ParticipantCanvas.ListItem.Content.add(<ParticipantActionsButtons key="custom-actions" />, {
      sortOrder: 10,
      if: isNotTransferParticipant,
    });
  }
}
