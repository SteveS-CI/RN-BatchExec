import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TextBar from './TextBar';
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create(
  {
    warn: {
      marginTop: 8,
      zIndex: 1,
    },
  },
);

export default class ActionWarning extends PureComponent {
  static propTypes = {
    node: PropTypes.object,
  }

  render() {
    const { node } = this.props;
    const visible = (node && (node.statusEnum === 3 || node.statusEnum === 4));
    if (visible) {
      const choices = node.statusEnum === 3
        ? { backColor: NexaColours.Orange, prompt: 'A signature is required to complete this action.' }
        : { backColor: NexaColours.Red, prompt: 'An approval is required to complete this action.' };
      return (
        <TextBar backColor={choices.backColor} style={styles.warn}>{choices.prompt}</TextBar>
      );
    }
    return null;
  }
}
