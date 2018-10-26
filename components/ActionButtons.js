import React, {PureComponent} from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import {optimalForeColor} from '../Utils/utils'
import NexaColours from '../constants/NexaColours'

const styles = 
  {
    container: {
      margin: 8,
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 12,
      elevation: 8,
      minWidth: 80,
      borderWidth: 3,
    },
    text: {
      fontFamily: 'euro-std',
      fontSize: 16,
      textAlign: 'center',
      fontStyle: 'italic'
    }
  }

const ButtonStyle = PropTypes.shape(
  {
    name: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }
)

export const ButtonStyles = {
  Cancel: {name: "cancel", display: "Cancel", color: NexaColours.Grey},
  OK: {name: "ok", display: "OK", color: NexaColours.AlertGreen},
  No: {name: "no", display: "No", color: NexaColours.AlertRed},
  Yes: {name: "yes", display: "Yes", color: NexaColours.AlertGreen},
  Back: {name: "back", display: "Back", color: NexaColours.CyanAccent},
  Comments: {name: "comments", display: "Comments...", color: NexaColours.Cyan},
  Confirm: {name: "confirm", display: "Confirm", color: NexaColours.AlertYellow},
  Sign: {name: "sign", display: "Sign", color: NexaColours.AlertOrange},
  Approve: {name: "approve", display: "Approve", color: NexaColours.AlertRed},
  Components: {name: "components", display: "Components", color: NexaColours.Cyan}
}

export class ActionButton extends PureComponent {

  static defaultProps = {
    buttonStyle: ButtonStyles.OK,
    disabled: false
  }

  static propTypes = {
    buttonStyle: ButtonStyle,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.any
  }

  render() {
    const backgroundColor = this.props.disabled ? NexaColours.GreyAccent : this.props.buttonStyle.color
    const borderColor = this.props.disabled ? NexaColours.GreyDark : 'white'
    const viewStyle = StyleSheet.flatten([styles.container, {backgroundColor, borderColor}, this.props.style])
    const textStyle = StyleSheet.flatten([styles.text, {color: optimalForeColor(backgroundColor)}])
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        <Text style={textStyle}>{this.props.buttonStyle.display}</Text>
      </TouchableOpacity>
    )
  }
}

export default class ActionButtons extends PureComponent {

  static propTypes = {
    buttons: PropTypes.arrayOf(ButtonStyle).isRequired,
    onPress: PropTypes.func.isRequired
  }

  onPress = (name) => {
    this.props.onPress(name)
  }

  render() {
    const OtherButtons = this.props.buttons.map((butt) => {
      return (
        <ActionButton 
          key={butt.name} 
          buttonStyle={butt} 
          onPress={() => this.onPress(butt.name)}
          style={{marginLeft: 0}}
        />
      )
    })
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Cancel button always present and displayed on far left */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <ActionButton buttonStyle={ButtonStyles.Cancel} onPress={() => this.onPress(ButtonStyles.Cancel.name)}/>
        </View>
        {/* Other buttons displayed to the right */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {OtherButtons}
        </View>
      </View>
    )
  }
}
