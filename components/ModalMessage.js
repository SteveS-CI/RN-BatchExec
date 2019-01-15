import React, {Component} from 'react'
import {StyleSheet, View, Modal, Text} from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import RoundedButton from './RoundedButton';
import { scale, verticalScale, FontSizes } from '../constants/Layout'

const styles = StyleSheet.create(
  {
    title: {
      fontSize: FontSizes.standard,
      fontWeight: 'bold'
    },
    message: {
      fontSize: FontSizes.smaller
    },
    inner: {
      position: 'absolute',
      padding: scale(12), marginTop: verticalScale(80),
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: scale(12),
      borderColor: NexaColours.Blue,
      elevation: 8
    },
    outer: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }
)

export default class ModalMessage extends Component {

  static propTypes = {
    messageText: PropTypes.shape( {
      title: PropTypes.string,
      message: PropTypes.string
    }),
    onExit: PropTypes.func.isRequired
  }

  render() {
    const messageText = this.props.messageText
    if (messageText) {
      const { title, message } = messageText
      return (
        <Modal onRequestClose={this.props.onExit} transparent={true} animationType='fade'>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <RoundedButton title='OK' onPress={this.props.onExit} />
            </View>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

}