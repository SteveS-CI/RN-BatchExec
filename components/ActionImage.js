import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import LoadingOverlay from './LoadingOverlay';
import api from '../api/api';
import NexaColours from '../constants/NexaColours';
import Layout from '../constants/Layout';

const imageWidth = Math.min(Layout.screen.width, Layout.screen.height) * 0.8;

const styles = StyleSheet.create(
  {
    container: {
      borderWidth: 2,
      borderRadius: 8,
      margin: 8,
      borderColor: NexaColours.Blue,
      alignSelf: 'center',
    },
    image: {
      margin: 5,
    },
  },
);

export default class ActionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false, loading: false, height: imageWidth, width: imageWidth,
    };
  }

  static propTypes = {
    fileName: PropTypes.string,
  }

  onError = (error) => {
    console.log('error');
  }

  onLoadStart = () => {
    const source = `${api.defaults.baseURL}/File/Image?name=${this.props.fileName}`;
    Image.getSize(source, (w, h) => {
      if (w > h) {
        this.setState({ height: (imageWidth / w) * h, width: imageWidth });
      } else {
        this.setState({ height: imageWidth, width: (imageWidth / h) * w });
      }
    });
  }

  onLoadEnd = () => {
    this.setState({ loading: false });
  }

  render() {
    const hasImage = !!this.props.fileName;
    if (hasImage) {
      const dimStyle = { width: this.state.width, height: this.state.height };
      const imgStyle = StyleSheet.flatten([styles.image, dimStyle]);
      const source = { uri: `${api.defaults.baseURL}/File/Image?name=${this.props.fileName}` };
      return (
        <View style={styles.container}>
          {this.state.error && <Text>Error loading image</Text>}
          <Image
            style={imgStyle}
            source={source}
            onError={() => this.setState({ error: true })}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
          />
          <LoadingOverlay loading={this.state.loading} />
        </View>
      );
    }
    return null;
  }
}
