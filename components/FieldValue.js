import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import NexaColours from '../constants/NexaColours';

export default class FieldValue extends PureComponent {
  render() {
    return (
      <Text style={{ color: 'black', paddingRight: 10, fontFamily: 'euro-std' }}>
        {this.props.children}
      </Text>
    );
  }
}
