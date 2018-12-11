import React from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios';
import qs from 'qs';

const endpoint = axios.create(
  {
    baseURL: 'https://dmsauth.nexa.com:1443'
  }
)

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In'
  }

  login = () => {
    const dataString = 'grant_type=password' + '&' + 
      'response_type=id_token' + '&' +
      'scope=api1' + '&' +
      'client_id=com.ciprecision.batchexec.demo' + '&' +
      'client_secret=C1Precisi0n' + '&' +
      'username=SteveS' + '&' +
      'password=Pa55w0rd57'
    
    console.log(dataString)

    const request = {
      url: '/connect/token/',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Charset': 'utf-8',
        'Accept-Language': 'en-GB'
      },
      data: dataString
    }
    endpoint.request(request).then(result => {
      console.log(JSON.stringify(result))
    }).catch(error => {
      console.log('Error', JSON.stringify(error))
    })
  }

  render() {
    return (
      <View>
        <Text>This is the login screen</Text>
        <Button title='Login (simulated)' onPress={this.login} />
      </View>
    )
  }
}
