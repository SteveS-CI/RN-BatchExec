import React, {Component} from 'react'
import {StyleSheet, View, Modal, Text, TextInput, Switch, Picker} from 'react-native'
import PropTypes from 'prop-types'
import ActionButtons, {ButtonStyles} from './ActionButtons';
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create(
  {
    title: {
      fontSize: 18
    },
    inner: {
      position: 'absolute',
      padding: 12,
      marginTop: 120,
      backgroundColor: NexaColours.GreyUltraLight,
      borderWidth: 1, borderRadius: 12,
      borderColor: NexaColours.Blue,
      elevation: 8,
      minWidth: 350
    },
    outer: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    comments: {
      backgroundColor: NexaColours.GreyLight,
      textAlign: 'left', textAlignVertical: 'top'
    },
    switchContainer: {
      flexDirection: 'row', 
      alignContent: 'space-between',
      marginVertical: 8
    },
    pickerContainer: {
      borderWidth: StyleSheet.hairlineWidth, borderColor: NexaColours.Blue,
      borderRadius: 8
    }
  }
)

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {comments: null, isDeviation: false, severity: 'none'}
  }

  static defaultProps = {
    visible: false,
    isApproval: false
  }

  static propTypes = {
    visible: PropTypes.bool,
    onComment: PropTypes.func.isRequired
  }

  onPress = (name) => {
    if (name==='ok') {
      this.props.onComment(true, 'Comment [Deviation]')
    } else {
      this.props.onComment(false)
      this.setState({isDeviation: false})
    }
  }

  isDeviation = (value) => {
    this.setState({isDeviation: value})
    if (!value) this.setState({severity: 'None'})
  }

  render() {
    if (this.props.visible) {
      const buttons = [ButtonStyles.OK]
      return (
        <Modal onRequestClose={() => this.props.onComment(false)} transparent={true}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.title}>Comments</Text>
              <TextInput 
                value={this.state.comments} 
                multiline={true} numberOfLines={5} 
                style={styles.comments} 
                onChangeText={(value => this.setState({comments: value}))}
              />
              <View style={styles.switchContainer}>
                <Switch 
                  value={this.state.isDeviation} 
                  onValueChange={this.isDeviation}
                />
                <Text style={styles.title}>Is Deviation</Text>
              </View>
              {this.state.isDeviation && 
                <View style={styles.pickerContainer}>
                  <Picker
                    mode='dropdown'
                    selectedValue={this.state.severity}
                    onValueChange={(value, index) => this.setState({severity: value})}
                  >
                    <Picker.Item label='Minor' value='Minor' />
                    <Picker.Item label='Major' value='Major' />
                    <Picker.Item label='Critical' value='Critical' />
                  </Picker>
                </View>
              }
              <ActionButtons buttons={buttons} onPress={this.onPress}/>
            </View>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

}