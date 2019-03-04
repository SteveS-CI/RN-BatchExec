import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { ContainerProps } from './SmallDisplayProps';

export default class IdentifyContainerProps extends PureComponent {
  styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
  })

  static propTypes = {
    node: PropTypes.object,
  }

  render() {
    const { node } = this.props;
    const hasData = (node && node.actionType === 'IdentifyContainer');
    if (hasData) {
      const equip = ContainerProps(node.equipment);
      return (
        <View style={this.styles.container}>
          {equip}
        </View>
      );
    }
    return null;
  }
}
