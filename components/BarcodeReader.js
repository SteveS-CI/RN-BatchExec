import React, { PureComponent } from 'react';
import { Modal, StyleSheet, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import PropTypes from 'prop-types';
import RoundedButton from './RoundedButton';
import NexaColours from '../constants/NexaColours';

export default class BarcodeReader extends PureComponent {

  static defaultProps = {
    visible: false,
    showKbButton: false,
  }

  static propTypes = {
    visible: PropTypes.bool,
    onScanned: PropTypes.func.isRequired,
    showKbButton: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = { hasPerm: null };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPerm: (status === 'granted') });
    const { hasPerm } = this.state;
    if (!hasPerm) {
      const { onScanned } = this.props;
      onScanned(-1, 'No Access');
    }
  }

  barcodeScanned = (value) => {
    const { onScanned } = this.props;
    onScanned(value.type, value.data);
  }

  cancelled = () => {
    const { onScanned } = this.props;
    onScanned(0, 'cancelled');
  }

  useKeyboard = () => {
    const { onScanned } = this.props;
    onScanned(-1, 'useAlternative');
  }

  render() {
    const { visible, showKbButton } = this.props;
    if (visible) {
      const { hasPerm } = this.state;
      if (hasPerm === null) {
        return <Text>Obtaining Camera Permission</Text>;
      }
      if (hasPerm) {
        return (
          <Modal onRequestClose={this.cancelled}>
            <BarCodeScanner
              style={StyleSheet.absoluteFill}
              onBarCodeScanned={this.barcodeScanned}
            />
            <RoundedButton title="Cancel" backColor={NexaColours.GreyUltraLight} onPress={this.cancelled} />
            {showKbButton && <RoundedButton title="Use List" onPress={this.useKeyboard} />}
          </Modal>
        );
      }
      return <Text>No Access to Camera!</Text>;
    }
    return null;
  }
}
