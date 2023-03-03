import * as React from 'react';
import styled from 'styled-components';
import {
  withTheme,
} from '@twilio/flex-ui';
import ParticipantName from '../participant-name';
import ParticipantStatus from '../participant-status';

const StatusContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  overflow: hidden;
`;

class ParticipantStatusContainer extends React.PureComponent <any,any> {
  render() {
    return (
      <div>
        <ParticipantName key="custom-name" {...this.props} />
        <ParticipantStatus key="custom-status" {...this.props} />
      </div>
    );
  }
}

export default withTheme(ParticipantStatusContainer);