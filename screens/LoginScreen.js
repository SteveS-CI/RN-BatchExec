import React, {PureComponent} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TextEntry from '../components/TextEntry'
import RoundedButton from '../components/RoundedButton'
import axios from 'axios'

const server = axios.create(
  {
    baseURL: 'https://dmsauth.shiny-geek.com:1443'
  }
)

export default class LoginScreen extends PureComponent {

  constructor(props) {
    super(props)
    this.state={response: null, error: null, authenticating: false}
  }

  authenticate = () => {
    this.setState({authenticating: true})
    const data = "grant_type=password" + "&" +
      "response_type=id_token" +  "&" +
      "scope=api1" +  "&" +
      "username=" + this.user + "&" + 
      "password=" + this.pass + "&" +
      "client_secret=C1Precisi0n" + "&" +
      "client_id=com.ciprecision.batchexec.demo"

    server.request(
      {
        url: '/connect/token',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-GB',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
    ).then((result) => {
      console.log(JSON.stringify(result))
      this.setState({response: JSON.stringify(result.data), error: null, authenticating: false})
    }
    ).catch((error) => {
      const value = JSON.stringify(error.response.data.error_description)
      console.log(value)
      this.setState({error: value, response: null, authenticating: false})
    }
    )
  }

  render() {

    return (
      <View style={{flexDirection: 'column'}}>
        <TextEntry
          label='User ID'
          onChange={(value) => this.user = value}
          secure={false}
          returnKeyType='next'
          onSubmit={() => {this.passEntry.focus()}}
          enabled={!this.state.authenticating}
      />
        <TextEntry
          ref={(pass) => {this.passEntry = pass}}
          label='Password'
          onChange={(value) => this.pass = value}
          secure={true}
          returnKeyType='done'
          blurOnSubmit={true}
          onSubmit={this.authenticate}
          enabled={!this.state.authenticating}
      />
        <RoundedButton title="Authenticate" onPress={this.authenticate} enabled={!this.state.authenticating}/>
        {this.state.response ? (
          <Text>{this.state.response}</Text>
        ) : null}
        {this.state.error ? (
          <Text>{this.state.error}</Text>
        ) : null}
        </View>
    );
  }

}
