import React, {Component} from 'react'
import {StyleSheet, View, Modal, Text, TextInput, Switch, Picker} from 'react-native'
import PropTypes from 'prop-types'
import ActionButtons from './ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'
import TextEntry from '../components/TextEntry'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create(
  {
    title: {
      fontSize: 18
    },
    inner: {
      position: 'absolute',
      padding: 12, marginTop: 120,
      backgroundColor: 'white',
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
    comment: {
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
    this.state = {comment: null, isDeviation: false, editing: false, severity: 'None', reference: null}
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
      const deviation = {
        comment: this.state.comment,
        severity: this.state.severity,
        reference: this.state.reference
      }
      this.props.onComment(true, deviation)
    } else {
      this.props.onComment(false, null)
      this.setState({severity: 'None'})
    }
  }

  isDeviation = (value) => {
    this.setState({isDeviation: value})
    if (value) {
      this.setState({severity: 'Minor'})
    } else {
      this.setState({severity: 'None', reference: null})
    }
  }

  referenceChange = (value) => {
    this.setState({reference: value})
  }

  render() {
    if (this.props.visible) {
      const buttons = [ButtonStyles.OK]
      const bgColor = this.state.editing ? NexaColours.GreyUltraLight: NexaColours.GreyLight
      const commentStyle = StyleSheet.flatten([styles.comment, {backgroundColor: bgColor}])
      return (
        <Modal onRequestClose={() => this.props.onComment(false)} transparent={true}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.title}>Comments</Text>
              <TextInput 
                value={this.state.comment} 
                multiline={true} numberOfLines={5} 
                style={commentStyle} 
                onFocus={() => this.setState({editing: true})}
                onBlur={() => this.setState({editing: false})}
                onChangeText={(value => this.setState({comment: value}))}
              />
              <View style={styles.switchContainer}>
                <Switch 
                  value={this.state.isDeviation} 
                  onValueChange={this.isDeviation}
                />
                <Text style={styles.title}>Is Deviation</Text>
              </View>
              {this.state.isDeviation && 
                <View>
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
                  <View>
                    <TextEntry label='Deviation Ref.' value={this.state.reference} onChange={this.referenceChange}/>
                  </View>
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