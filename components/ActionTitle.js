import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TextBar from './TextBar';
import NexaColours from '../constants/NexaColours';

const borderWidth = StyleSheet.hairlineWidth * 2;

const styles = StyleSheet.create(
  {
    title: {
      borderRadius: 0,
      marginHorizontal: 0,
      marginBottom: 0,
      borderTopColor: 'white',
      borderBottomColor: 'black',
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      fontWeight: 'bold',
      zIndex: 1,
    },
  },
);

export default class ActionTitle extends PureComponent {
  static defaultProps = {
    backColor: NexaColours.BlueAccent,
  }

  static propTypes = {
    backColor: PropTypes.string,
    text: PropTypes.string.isRequired,
  }

  render() {
    return (
      <TextBar backColor={this.props.backColor} style={styles.title}>{this.props.text}</TextBar>
    );
  }
}
