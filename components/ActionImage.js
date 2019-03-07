import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, TouchableWithoutFeedback
} from 'react-native';
import LoadingOverlay from './LoadingOverlay';
import api from '../api/api';
import NexaColours from '../constants/NexaColours';
import Layout from '../constants/Layout';

// Set image width to smaller of width/height (less style margins)
const imageWidth = (Math.min(Layout.screen.width, Layout.screen.height) - 26);

const styles = StyleSheet.create(
  {
    container: {
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 8,
      margin: 8,
      borderColor: NexaColours.Blue,
      alignSelf: 'flex-start',
    },
    image: {
      margin: 5
    }
  }
);

export default class ActionImage extends Component {

  static defaultProps = {
    fileName: null
  }

  static propTypes = {
    fileName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false, loading: false, height: imageWidth, width: imageWidth, thumb: true
    };
  }

  onError = (error) => {
    console.log('error', error);
  }

  onLoadStart = () => {
    const { fileName } = this.props;
    const source = `${api.defaults.baseURL}/File/Image?name=${fileName}`;
    Image.getSize(source, (w, h) => {
      this.setState({ height: (imageWidth / w) * h, width: imageWidth });
    });
  }

  onLoadEnd = () => {
    this.setState({ loading: false });
  }

  render() {
    const {
      width, height,
      loading, error, thumb
    } = this.state;
    const { fileName } = this.props;
    const hasImage = !!fileName;
    if (hasImage) {
      const dimStyle = thumb ? { width: width / 8, height: height / 8 } : { width, height };
      const imgStyle = StyleSheet.flatten([styles.image, dimStyle]);
      const source = { uri: `${api.defaults.baseURL}/File/Image?name=${fileName}` };
      return (
        <TouchableWithoutFeedback onPress={() => { this.setState({ thumb: !thumb }); }}>
          <View style={styles.container}>
            {error && <Text>Error loading image</Text>}
            <Image
              style={imgStyle}
              source={source}
              onError={() => this.setState({ error: true })}
              onLoadStart={this.onLoadStart}
              onLoadEnd={this.onLoadEnd}
            />
            <LoadingOverlay loading={loading} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }
}
