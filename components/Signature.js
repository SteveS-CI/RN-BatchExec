import React, {Component} from 'react'
import {StyleSheet, View, Modal, Text} from 'react-native'
import PropTypes from 'prop-types'
import TextEntry from './TextEntry'
import {ActionButton} from './ActionButtons';
import ButtonStyles from '../constants/ButtonStyles'
import ButtonBar from '../components/ButtonBar'
import Comments from './Comments'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create(
  {
    title: {
      fontSize: 18
    },
    inner: {
      position: 'absolute',
      padding: 12, marginTop: 120,
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: NexaColours.Blue,
      elevation: 8
    },
    outer: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }
)

export default class Signature extends Component {
  constructor(props) {
    super(props)
    this.state = {commenting: false, user: null}
    this.comment = null
    this.pass = null
  }

  static defaultProps = {
    visible: false,
    isApproval: false
  }

  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    isApproval: PropTypes.bool,
    onSign: PropTypes.func.isRequired
  }

  onPress = (name) => {
    switch (name) {
      case 'sign':
        this.props.onSign(true, this.state.user, this.comment)
        break
      case 'approve':
        this.props.onSign(true, this.state.user, this.comment)
        break
      case 'comments':
        this.setState({commenting: true})
        break
      default:
        //Cancel
        this.props.onSign(false, null, null)
        this.setState({user: null})
    }
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment
    } else {
      this.comment = null
    }
    this.setState({commenting: false})
  }

  onSubmit = () => {
    console.log('submit')
    this.pass.focus()
  }

  render() {
    if (this.props.visible) {
      const title = this.props.title
      const buttSign = this.props.isApproval ? ButtonStyles.Approve : ButtonStyles.Sign
      const enabled = this.state.user && this.state.pass
      return (
        <Modal onRequestClose={() => this.props.onSign(false)} transparent={true}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              <Text style={styles.title}>{title}</Text>
              <TextEntry
                label='User ID'
                value={this.state.user}
                onChange={(user) => this.setState({user})}
                autoFocus={true}
                returnKeyType='next'
                blurOnSubmit={false}
                onSubmit={this.onSubmit}
              />
              <TextEntry
                ref={(pass) => {this.pass = pass}}
                label='Password'
                secure={true}
                value={this.state.pass}
                onChange={(pass) => this.setState({pass})}
              />
              <ButtonBar justify='space-between'>
                <ActionButton buttonStyle={ButtonStyles.Cancel} onPress={() => this.onPress(ButtonStyles.Cancel.name)}/>
                <ActionButton buttonStyle={buttSign} disabled={!enabled} onPress={() => this.onPress(buttSign.name)}/>
                <ActionButton buttonStyle={ButtonStyles.Comments} onPress={() => this.onPress(ButtonStyles.Comments.name)}/>
              </ButtonBar>
              <Comments visible={this.state.commenting} onComment={this.onComment} />
            </View>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

}