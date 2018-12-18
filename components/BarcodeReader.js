import React, { PureComponent } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import PropTypes from 'prop-types'
import RoundedButton from './RoundedButton';
import NexaColours from '../constants/NexaColours';

export default class BarcodeReader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasPerm: null }
  }

  static defaultProps = {
    visible: false,
    showKbButton: false
  }

  static propTypes = {
    visible: PropTypes.bool,
    onScanned: PropTypes.func.isRequired,
    showKbButton: PropTypes.bool
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasPerm: (status === 'granted') })
    if (!this.state.hasPerm) {
      this.props.onScanned(-1,'No Access')
    }
  }

  barcodeScanned = (value) => {
    this.props.onScanned(value.type, value.data)
  }

  cancelled = () => {
    this.props.onScanned(0, 'cancelled')
  }

  useKeyboard = () => {
    this.props.onScanned(-1, 'useAlternative')
  }

  render() {
    const visible = this.props.visible
    if (visible) {
      const hasPerm = this.state.hasPerm
      if (hasPerm === null) {
        return <Text>Obtaining Camera Permission</Text>
      }
      if (hasPerm) {
        return (
          <Modal onRequestClose={this.cancelled}>
            <BarCodeScanner style={StyleSheet.absoluteFill} onBarCodeScanned={this.barcodeScanned} />
            <RoundedButton title='Cancel' backColor={NexaColours.GreyUltraLight} onPress={this.cancelled}/>
            {this.props.showKbButton && <RoundedButton title='Use List' onPress={this.useKeyboard}/>}
          </Modal>
        )
      } else {
        return <Text>No Access to Camera!</Text>
      }
    } else {
      return null
    }
  }
}
