/* eslint-disable no-console */
import * as React from 'react';
import { connect } from 'react-redux';

import { Actions, withTheme, Manager, withTaskContext } from '@twilio/flex-ui';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import ConferenceService from '../../../../utils/serverless/Conference/ConferenceService';

class ConferenceDialog extends React.Component<any, any> {
  state = {
    conferenceTo: '',
    typeForward: 'warm',
    errorTextField: true,
  };

  handleClose = () => {
    this.closeDialog();
  };

  closeDialog = () => {
    Actions.invokeAction('SetComponentState', {
      name: 'ConferenceDialog',
      state: { isOpen: false },
    });
  };

  handleKeyPress = (e: any) => {
    const { key } = e;

    if (key === 'Enter') {
      this.addConferenceParticipant();
      this.closeDialog();
    }
  };

  handleChange = (e: any) => {
    const { value } = e.target;
    const valid = this.numberVerification(value);
    this.setState({ conferenceTo: value, errorTextField: valid });
  };

  numberVerification = (number: any) => {
    if (number === '') return true;
    if (!number.startsWith('+')) return true;
    if (number.length < 10) return true;
    const regEx = /^\+[1-9]\d{10,14}$/;
    return !regEx.test(number);
  };

  handleSelectChange = (e: any) => {
    const {
      target: { value },
    } = e;
    this.setState({ typeForward: value });
  };

  handleDialButton = () => {
    this.addConferenceParticipant();
    this.closeDialog();
  };

  addConferenceParticipant = async () => {
    const to = this.state.conferenceTo;

    const { task } = this.props;
    const conference = task && (task.conference || {});
    const { conferenceSid } = conference;

    debugger
    let mainConferenceSid = task.attributes.conference ? task.attributes.conference.sid :  conferenceSid;
    mainConferenceSid = mainConferenceSid == undefined ? task.attributes.conference_sid : mainConferenceSid;
    console.log("task >>>>>>>>>>>>", task);
    console.log("conference >>>>>>>>>>>>", conference);
    console.log("mainConferenceSid >>>>>>>>>>>>", mainConferenceSid, task.attributes.conference_sid);
    console.log("task.taskSid >>>>>>>>>>>>", task.taskSid);
    // const workerParticipantSid = Manager.getInstance()
    //   .store.getState()
    //   .flex.conferences.states.get(task.taskSid).source.participants.filter((p: any) => p.participantType === 'worker')[0].callSid;
    const workerParticipantSid = task.attributes.worker_call_sid;
    console.log("workerParticipantSid >>>>>>>>>>>>", workerParticipantSid);
    if (this.state.typeForward === 'cold') {
      await ConferenceService.setEndConferenceOnExit(mainConferenceSid, workerParticipantSid, false);
    }
    let from: any;
    if (this.props.phoneNumber) {
      from = this.props.phoneNumber;
    } else {
      from = process.env.REACT_APP_SERVICE_DEFAULT_CALLER_ID;
    }

    const _this = this;
    // let timer: any;

    // Adding entered number to the conference
    console.log('addConferenceParticipant', `Adding ${to} to conference`);
    try {
      const customerParticipantSid = task.attributes.conference.participants.customer;
      console.log("customerParticipantSid >>>>>>>>", customerParticipantSid);
      // Manager.getInstance()
      //   .store.getState()
      //   .flex.conferences.states.get(task.taskSid)
      //   .source.participants.filter((p: any) => p.participantType === 'customer')[0].callSid;

      const response = await ConferenceService.addParticipant(
        mainConferenceSid,
        from,
        to,
        customerParticipantSid,
        _this.state.typeForward,
        task.taskSid,
      );

      console.log("response >>>>>>>>", response);
      const participantCallSid = response.data.conferenceParticipant.callSid;
      console.log("participantCallSid >>>>>>>>", participantCallSid);

      // let flag = true;
      const intervalId = setInterval(async () => {
        const customerParticipant: any = [];
        console.log("participantCallSid >>>>>>>>", participantCallSid);
        if (customerParticipant.length === 0) {
          console.log('addConferenceParticipant', 'Adding 3rd participant in the conference');
          await ConferenceService.addConnectingParticipant(mainConferenceSid, participantCallSid, 'unknown');
        } else if (_this.state.typeForward === 'cold' && customerParticipant[0].status === 'joined' && !customerParticipant[0].connecting) {
          if (_this.state.typeForward === 'cold') {
            await ConferenceService._toggleParticipantHold(mainConferenceSid, customerParticipantSid, false);
            console.log(
              'addConferenceParticipant',
              'task.conference.liveParticipantCount',
              task.conference.liveParticipantCount,
            );

            if (task.conference.liveParticipantCount > 2) {
              /*
               * timer = setInterval(() => {
               *   if (task.attributes.cold_forwarded) {
               *    clearInterval(timer);
               *   }
               * }, 100);
               */

              const workerParticipant = Manager.getInstance()
                .store.getState()
                .flex.conferences.states.get(task.taskSid)
                .source.participants.filter((p: any) => p.participantType === 'worker')[0];

              console.log(
                'addConferenceParticipant',
                'workerParticipant.status',
                workerParticipant && workerParticipant.status,
              );

              if (workerParticipant && workerParticipant.status === 'joined') {
                console.log(
                  'addConferenceParticipant',
                  'removing worker as 3rd participant has joined',
                  customerParticipant,
                );
                await ConferenceService.removeParticipant(mainConferenceSid, workerParticipantSid);
              }
            }
          }
        } else if (customerParticipant[0].status === 'left') {
          clearInterval(intervalId);
        }
      }, 1000);
    } catch (error) {
      console.error('Error adding conference participant:', error);
    }
    this.setState({ conferenceTo: '' });
  };

  render() {
    return (
      <Dialog open={this.props.isOpen || false} onClose={this.handleClose}>
        <DialogContent>
          <DialogContentText>{'Enter phone number to add to the conference'}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="conferenceNumber"
            label={'Phone Number'}
            fullWidth
            value={this.state.conferenceTo}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            helperText={this.state.errorTextField ? 'Please enter a valid number' : ''}
            error={this.state.errorTextField}
          />
          <div style={{ fontSize: '8px', color: '#222222', marginTop: '10px', marginBottom: '5px' }}>
            Type of Forwarding:
          </div>
          <Select
            style={{ display: 'flex', justifyContent: 'center' }}
            value={this.state.typeForward}
            onChange={this.handleSelectChange}
          >
            <MenuItem key="warm-forward" value="warm">
              Warm
            </MenuItem>
            <MenuItem key="cold-forward" value="cold">
              Cold
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button disabled={this.state.errorTextField} onClick={this.handleDialButton} color="primary">
            {'Dial'}
          </Button>
          <Button onClick={this.closeDialog} color="secondary">
            {'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { componentViewStates } = state.flex.view;
  const conferenceDialogState = componentViewStates && componentViewStates.ConferenceDialog;
  const isOpen = conferenceDialogState && conferenceDialogState.isOpen;
  return {
    isOpen,
    phoneNumber: state?.flex?.worker?.attributes?.caller_id || process.env.REACT_APP_TWILIO_NUMBER,
  };
};

export default connect(mapStateToProps)(withTheme(withTaskContext(ConferenceDialog)));
