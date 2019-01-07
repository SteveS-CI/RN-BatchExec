import React, { Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback, ScrollView, View, Modal, Text } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import RoundedButton from './RoundedButton';
import { FontSizes, verticalScale, ScreenSize } from '../constants/Layout'
import FontAwesome, { Icons } from 'react-native-fontawesome';

const styles = StyleSheet.create(
  {
    inner: {
      position: 'absolute',
      flexDirection: 'column',
      padding: 12,
      backgroundColor: 'white',
      borderRadius: 12,
      elevation: 8,
      alignSelf: 'center',
      minWidth: '30%',
      maxHeight: verticalScale(300)
    },
    outer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }
)

export default class ModalContent extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    onDismiss: PropTypes.func.isRequired
  }

  onCancel = () => {
    this.props.onDismiss()
  }

  render() {
    const visible = this.props.visible
    if (visible) {
      return (
        <Modal onRequestClose={() => this.onCancel()} transparent={true}>

          <TouchableWithoutFeedback onPress={() => this.onCancel()}>
            <View style={styles.outer}>
              <View style={styles.inner}>
                {this.props.children}
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      )
    } else {
      return null
    }
  }
}
