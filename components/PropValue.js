import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import NexaColours from '../constants/NexaColours';

export default class PropValue extends PureComponent {
  render() {
    return (
      <Text style={{ color: 'black', paddingLeft: 10, fontFamily: 'euro-std' }}>
        {this.props.children}
      </Text>
    );
  }
}
