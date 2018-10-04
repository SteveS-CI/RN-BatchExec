import React from 'react';
import { View, Button, ScrollView } from 'react-native'
import PropList from '../components/PropList';
import NexaColours from '../constants/NexaColours';
import BatchComponent from '../components/BatchComponent'

const tableRowOdd = { backgroundColor: NexaColours.GreyUltraLight }
const tableRowEven=  { backgroundColor: NexaColours.GreyLight }

export default class BatchCompsScreen extends React.Component {
  static navigationOptions = {
    title: 'Components',
  };

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const compData = bat.components
    let compList = null
    if (compData) {
      compList = compData.map((comp, index) => {
        const rowStyle = (index & 1) ? tableRowOdd : tableRowEven
        return (<BatchComponent
          key={index}
          item={comp}
          rowStyle={rowStyle}
        />)
      })
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {compList}
        </ScrollView>
      </View>      
    )
  }

}
