import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native'
import LoadingOverlay from './LoadingOverlay'

import api, {getTextFile} from '../api/api'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create(
  {
    bar: {
      borderStyle: 'solid', borderWidth: 2, borderColor: 'white',
      marginHorizontal: 5, marginTop: 5,
      paddingHorizontal: 12, paddingVertical: 8,
      borderTopLeftRadius: 12, borderTopRightRadius: 12
    },
    content: {
      borderStyle: 'solid', borderWidth: 2, borderColor: 'white',
      borderTopWidth: 0,
      marginHorizontal: 5, marginBottom: 5,
      paddingHorizontal: 12, paddingVertical: 5,
      borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
      backgroundColor: NexaColours.GreyUltraLight
    }
  }
)

export default class FileContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {text: "", loading: false}
  }

  static defaultProps = {
    backColor: NexaColours.CyanAccent
  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    backColor: PropTypes.string
  }

  componentDidMount() {
    this.setState({loading: true})
    getTextFile(this.props.fileName).then((response) => {
      this.setState({loading: false, text: response.data})
    }).catch((error) => {
      this.setState({loading: false, text: error.message})
    })
  }

  render() {
    const barStyle = StyleSheet.flatten([styles.bar, {backgroundColor: this.props.backColor}])
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={barStyle}>{this.props.fileName}</Text>
        <Text style={styles.content}>{this.state.text}</Text>
        <LoadingOverlay loading={this.state.loading}/>
      </View>
    )
  }
}