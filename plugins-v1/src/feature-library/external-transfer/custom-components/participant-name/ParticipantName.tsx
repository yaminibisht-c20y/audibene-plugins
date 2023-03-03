import * as React from 'react';
import styled from 'react-emotion';
import { withTheme } from '@twilio/flex-ui';

import CallsService from '../../../../utils/serverless/Calls/CallsService';

const Name = styled('div')`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NameListItem = styled('div')`
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class ParticipantName extends React.Component<any, any> {
  state = {
    name: '',
  };

  async componentDidMount() {
    const { participant, task } = this.props;

    if (participant.participantType === 'customer') {
      this.setState({ name: task.attributes.outbound_to || task.attributes.name });
      return;
    }

    if (participant.participantType === 'unknown') {
      const response = await CallsService.getCallProperties(participant.callSid);

      if (response && response.data && response.data.call) {
        const { call } = response.data;
        const name = call.to || 'unknown';
        this.setState({ name });
      }
    } else {
      this.setState({ name: participant.worker ? participant.worker.fullName : 'unknown' });
    }
  }

  render() {
    return this.props.listMode ? (
      <NameListItem className="ParticipantCanvas-Name">{this.state.name}</NameListItem>
    ) : (
      <Name className="ParticipantCanvas-Name">{this.state.name}</Name>
    );
  }
}

export default withTheme(ParticipantName);
