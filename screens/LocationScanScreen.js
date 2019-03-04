import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { methods } from '../api/api';
import Settings from '../Store/Settings';
import LoadingOverlay from '../components/LoadingOverlay';
import BarcodeReader from '../components/BarcodeReader';
import TextEntry from '../components/TextEntry';
import IconButton from '../components/IconButton';
import ErrorBar from '../components/ErrorBar';

export default class LocationScanScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', showCam: true, locations: null, loading: false, error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    methods.getLocations().then((data) => {
      this.setState({ locations: data, loading: false, error: null });
    });
  }

  onScanned = (type, value) => {
    switch (type) {
      case -1: // Use list
        this.setState({ showCam: false });
        this.props.navigation.replace('LocationList');
        break;
      case 0: // Cancelled
        this.setState({ showCam: false });
        this.props.navigation.replace('BatchList');
        break;
      default: // Read OK, validate
        this.setState({ value, showCam: false });
        // Validate
        const location = this.state.locations.find(item => (item.code === value));
        if (location) {
          Settings.saveObject('location', location)
            .then(() => {
              // this reloads the app
              this.props.screenProps.refresh();
            });
        } else {
          this.setState({ error: 'Invalid location' });
        }
    }
  }

  showCamera = () => {
    this.setState({ showCam: true, error: null });
  }

  getElements() {
    if (this.state.error) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <TextEntry label="Location" value={this.state.value} enabled={false} />
            <IconButton iconName="camera" onPress={this.showCamera} />
          </View>
          <ErrorBar text={this.state.error} />
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <BarcodeReader
          visible={this.state.showCam}
          onScanned={this.onScanned}
          showKbButton
        />
      </View>
    );
  }

  render() {
    if (this.state.locations) {
      const elements = this.getElements();
      return (
        elements
      );
    }
    return (
      <LoadingOverlay loading={this.state.loading} />
    );
  }
}
