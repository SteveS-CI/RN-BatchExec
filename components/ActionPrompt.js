import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import NexaColours from '../constants/NexaColours';
import { optimalForeColor } from '../Utils/utils';
import { FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    promptContainer: {
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 10,
      backgroundColor: NexaColours.Cyan,
      marginBottom: 8,
    },
    prompt: {
      marginBottom: 5,
      alignSelf: 'center',
      fontSize: FontSizes.standard,
    },
    notes: {
      padding: 5,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: NexaColours.CyanAccent,
      fontSize: FontSizes.smaller,
    },
  },
);

export default class ActionPrompt extends PureComponent {
  static propTypes = {
    prompt: PropTypes.string,
    notes: PropTypes.string,
  }

  render() {
    const hasPrompt = !!this.props.prompt;
    const hasNote = !!this.props.notes;
    if (hasPrompt) {
      const promptColor = optimalForeColor(NexaColours.Cyan);
      const noteColor = optimalForeColor(NexaColours.CyanAccent);
      const promptStyle = StyleSheet.flatten([styles.prompt, { color: promptColor }]);
      const noteStyle = StyleSheet.flatten([styles.notes, { color: noteColor }]);
      return (
        <View style={styles.promptContainer}>
          <Text style={promptStyle}>
            {this.props.prompt}
          </Text>
          {hasNote && <Text style={noteStyle}>{this.props.notes}</Text>}
        </View>
      );
    }
    return null;
  }
}
