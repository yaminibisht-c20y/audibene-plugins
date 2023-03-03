import * as React from 'react';
import {
  Actions,
  IconButton,
  TaskHelper,
  withTheme
} from '@twilio/flex-ui';

class ConferenceButton extends React.PureComponent<any, any> {
    handleClick = () => {
        Actions.invokeAction('SetComponentState', {
        name: 'ConferenceDialog',
        state: { isOpen: true }
        });
    }

    render() {
        const isLiveCall = TaskHelper.isLiveCall(this.props.task);

        return (
        <React.Fragment>
            <IconButton
            icon="Add"
            disabled={!isLiveCall}
            onClick={this.handleClick}
            themeOverride={this.props.theme.CallCanvas.Button}
            title={"Add Conference Participant"}
            />
        </React.Fragment>
        );
    }
}

export default withTheme(ConferenceButton);