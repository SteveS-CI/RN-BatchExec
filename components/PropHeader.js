import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import NexaColours from '../constants/NexaColours';

export default class PropHeader extends PureComponent {
  render() {
    return (
      <Text style={{ color: NexaColours.Blue, paddingHorizontal: 5, fontFamily: 'euro-std' }}>
        {this.props.children}
      </Text>
    );
  }
}
