import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import LoadingOverlay from './LoadingOverlay';

import { getTextFile } from '../api/api';
import { optimalForeColor } from '../Utils/utils';
import NexaColours from '../constants/NexaColours';
import { FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    bar: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: NexaColours.BlueAccent,
      marginHorizontal: 5,
      marginTop: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      fontSize: FontSizes.standard,
    },
    content: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: NexaColours.BlueAccent,
      borderTopWidth: 0,
      marginHorizontal: 5,
      marginBottom: 5,
      paddingHorizontal: 12,
      paddingTop: 5,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      backgroundColor: NexaColours.GreyUltraLight,
      fontSize: FontSizes.smaller,
    },
  },
);

export default class FileContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { text: null, loading: false };
  }

  static defaultProps = {
    backColor: NexaColours.BlueAccent,
  }

  static propTypes = {
    fileName: PropTypes.string,
    backColor: PropTypes.string,
  }

  componentDidMount() {
    if (this.props.fileName) {
      this.setState({ loading: true });
      this.getFileData(this.props.fileName);
    }
  }

  getFileData = (fileName) => {
    getTextFile(fileName).then((response) => {
      this.setState({ loading: false, text: response.data });
    }).catch((error) => {
      this.setState({ loading: false, text: error.message });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileName !== prevProps.fileName) {
      this.getFileData(this.props.fileName);
    }
  }

  render() {
    const hasFile = !!this.props.fileName;
    if (hasFile) {
      const foreColor = optimalForeColor(this.props.backColor);
      const barStyle = StyleSheet.flatten([styles.bar, { backgroundColor: this.props.backColor, color: foreColor }]);
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text style={barStyle}>{this.props.fileName}</Text>
          <Text style={styles.content}>{this.state.text}</Text>
          <LoadingOverlay loading={this.state.loading} />
        </View>
      );
    }
    return null;
  }
}
