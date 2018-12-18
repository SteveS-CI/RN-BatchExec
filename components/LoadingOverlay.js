import React, {PureComponent} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create({
  loading: {
    top: 300,
    position: 'absolute',
    backgroundColor: '#00000000',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})

export default class LoadingOverlay extends PureComponent {

  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    return (
      this.props.loading
      ? <View style={styles.loading}>
          <ActivityIndicator animating={true} color={NexaColours.AlertCyan} size={90}/>
        </View>
      : null
    )
  }
}
