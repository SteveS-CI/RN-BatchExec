import React, {PureComponent} from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import {optimalForeColor} from '../Utils/utils'
import NexaColours from '../constants/NexaColours'
import i18n from 'i18n-js'
import ButtonStyles, {ButtonStyleProps} from '../constants/ButtonStyles'

const styles = 
  {
    container: {
      margin: 8,
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 12,
      elevation: 8,
      minWidth: 80,
      borderWidth: StyleSheet.hairlineWidth * 2,
    },
    text: {
      fontSize: 16,
      textAlign: 'center'
    }
  }

export class ActionButton extends PureComponent {

  static defaultProps = {
    buttonStyle: ButtonStyles.OK,
    disabled: false
  }

  static propTypes = {
    buttonStyle: ButtonStyleProps,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.any
  }

  render() {
    const backgroundColor = this.props.disabled ? NexaColours.Grey : this.props.buttonStyle.color
    const foreColor = this.props.disabled ? NexaColours.GreyDark : optimalForeColor(backgroundColor)
    const borderColor = this.props.disabled ? NexaColours.GreyDark : foreColor
    const viewStyle = StyleSheet.flatten([styles.container, {backgroundColor, borderColor, borderColor}, this.props.style])
    const textStyle = StyleSheet.flatten([styles.text, {color: foreColor}])
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        <Text style={textStyle}>{i18n.t('button.captions.' + this.props.buttonStyle.name)}</Text>
      </TouchableOpacity>
    )
  }
}

export default class ActionButtons extends PureComponent {

  static propTypes = {
    buttons: PropTypes.arrayOf(ButtonStyleProps).isRequired,
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
