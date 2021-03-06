import React, { Component } from 'react';
import {
  StyleSheet, View, Modal, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import TextEntry from './TextEntry';
import { ActionButton } from './ActionButtons';
import ButtonStyles from '../constants/ButtonStyles';
import ButtonBar from './ButtonBar';
import Comments from './Comments';
import NexaColours from '../constants/NexaColours';
import { scale, FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    title: {
      fontSize: FontSizes.standard,
    },
    inner: {
      position: 'absolute',
      padding: scale(12),
      marginTop: scale(60),
      backgroundColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: scale(12),
      borderColor: NexaColours.Blue,
      elevation: 8,
    },
    outer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
);

export default class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = { commenting: false, user: null };
    this.comment = null;
    this.pass = null;
  }

  static defaultProps = {
    visible: false,
    isApproval: false,
  }

  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    isApproval: PropTypes.bool,
    onSign: PropTypes.func.isRequired,
  }

  onPress = (name) => {
    switch (name) {
      case 'sign':
        this.props.onSign(true, this.state.user, this.comment);
        break;
      case 'approve':
        this.props.onSign(true, this.state.user, this.comment);
        break;
      case 'comments':
        this.setState({ commenting: true });
        break;
      default:
        // Cancel
        this.props.onSign(false, null, null);
        this.setState({ user: null });
    }
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment;
    } else {
      this.comment = null;
    }
    this.setState({ commenting: false });
  }

  onSubmit = () => {
    this.pass.focus();
  }

  render() {
    if (this.props.visible) {
      const { title } = this.props;
      const buttSign = this.props.isApproval ? ButtonStyles.Approve : ButtonStyles.Sign;
      const enabled = this.state.user && this.state.pass;
      return (
        <Modal onRequestClose={() => this.props.onSign(false)} transparent>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.title}>{title}</Text>
              <TextEntry
                label="User ID"
                value={this.state.user}
                onChange={user => this.setState({ user })}
                autoFocus
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmit={this.onSubmit}
              />
              <TextEntry
                ref={(pass) => { this.pass = pass; }}
                label="Password"
                secure
                value={this.state.pass}
                onChange={pass => this.setState({ pass })}
              />
              <ButtonBar justify="space-between">
                <ActionButton buttonStyle={ButtonStyles.Cancel} onPress={() => this.onPress(ButtonStyles.Cancel.name)} />
                <ActionButton buttonStyle={buttSign} disabled={!enabled} onPress={() => this.onPress(buttSign.name)} />
                <ActionButton buttonStyle={ButtonStyles.Comments} onPress={() => this.onPress(ButtonStyles.Comments.name)} />
              </ButtonBar>
              <Comments visible={this.state.commenting} onComment={this.onComment} />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }
}
