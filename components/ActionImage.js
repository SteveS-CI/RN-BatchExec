import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, Image} from 'react-native'
import LoadingOverlay from './LoadingOverlay'

import api, {getImageFile} from '../api/api'
import {optimalForeColor} from '../Utils/utils'
import NexaColours from '../constants/NexaColours';

const imageDim = 300

const styles = StyleSheet.create(
  {
    container: {
      borderWidth: 2, borderRadius: 8,
      margin: 8,
      borderColor: NexaColours.Blue,
      alignSelf: 'flex-start'
    },
    image: {
      margin: 5,
    }
  }
)

export default class ActionImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {error: false, loading: false, height: imageDim, width: imageDim}
  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const source = api.defaults.baseURL + '/File/Image?name=' + this.props.fileName
    Image.getSize(source, (w, h) => {
      if (w > h) {
        this.setState({height: (imageDim/w) * h, width: imageDim})
      } else {
        this.setState({height: imageDim, width: (imageDim/h) * w})
      }
    })
  }

  onError = (error) => {
    console.log('error')
  }

  render() {
    const dimStyle = {width: this.state.width, height: this.state.height}
    const imgStyle = StyleSheet.flatten([styles.image, dimStyle])
    const source = {uri: api.defaults.baseURL + '/File/Image?name=' + this.props.fileName}
    return (
      <View style={styles.container}>
        {this.state.error && <Text>Error loading image</Text>}
        <Image style={imgStyle} source={source}
          onError={() => this.setState({error: true})}
          onLoadStart={() => this.setState({loading: true})}
          onLoadEnd={() => this.setState({loading: false})}
        />
        <LoadingOverlay loading={this.state.loading} />
      </View>
    )
  }
}