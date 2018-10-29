import React from 'react';
import { View, Button, ScrollView } from 'react-native'
import PropList from '../components/PropList';
import NexaColours from '../constants/NexaColours';
import BatchEquipment from '../components/BatchEquipment'

const tableRowOdd = { backgroundColor: NexaColours.GreyUltraLight }
const tableRowEven = { backgroundColor: NexaColours.GreyLight }

export default class BatchCompsScreen extends React.Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const equipData = bat.equipment
    let equipList = null
    if (equipData) {
      equipList = equipData.map((equip, index) => {
        const rowStyle = (index & 1) ? tableRowOdd : tableRowEven
        return (<BatchEquipment
          key={index}
          item={equip}
          rowStyle={rowStyle}
        />)
      })
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {equipList}
        </ScrollView>
      </View>
    )
  }

}
