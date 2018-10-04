import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import NexaColours from '../constants/NexaColours';

export default class FieldHeader extends PureComponent {
  render() {
    return (
      <Text style={{color: NexaColours.Blue, paddingVertical: 5, paddingLeft: 5, fontFamily: 'euro-demi', fontSize: 16}}>
        {this.props.children}
      </Text>
    )
  }
}
