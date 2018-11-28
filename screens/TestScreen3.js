import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import RoundedButton from '../components/RoundedButton';
import NexaColours from '../constants/NexaColours';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    showCam: false
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

  onCancel = () => {
    this.props.navigation.replace('Main')
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <RoundedButton title='Cancel' onPress={this.onCancel} backColor={NexaColours.GreyUltraLight}/>
        <RoundedButton title='Read Barcode' onPress={() => this.setState({showCam: true})}/>
        {this.state.showCam && <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />}
        <Text>Type: {this.type}</Text>
        <Text>Value: {this.value}</Text>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.type = type
    this.value = data
    this.setState({showCam: false})
  }
}