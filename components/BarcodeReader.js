import React, {PureComponent} from 'react'
import {Modal, StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import PropTypes from 'prop-types'
import RoundedButton from '../components/RoundedButton'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create({
  barcode: StyleSheet.absoluteFill
})

export default class BarcodeReader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasPerm: null }
  }

  static defaultProps = {
    visible: false
  }

  static propTypes = {
    visible: PropTypes.bool,
    onScanned: PropTypes.func.isRequired
  }

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasPerm: (status === 'granted') })
  }

  barcodeScanned = (value) => {
    this.props.onScanned(value.type, value.data)
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
          <Modal onRequestClose={() => this.barcodeScanned(0, 'cancelled')}>
            <BarCodeScanner style={StyleSheet.absoluteFill} onBarCodeScanned={this.barcodeScanned}/>
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
