import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ScrollList from '../components/ScrollList'
import Styles from '../constants/Styles'
import ActionEntry from '../components/ActionEntry'
import SmallPropWindow from '../components/SmallPropWindow'

const ListHeaders = [
  {
    caption: "Column One",
    source: "valueA",
    flex: 2,
    align: 'left'
  },
  {
    caption: "Column Two",
    source: "valueB",
    flex: 4,
    align: 'center'
  },
  {
    caption: "Column Three",
    source: "valueC",
    flex: 3,
    align: 'right'
  }
]

const ListData = [
  {
    valueA: "One",
    valueB: "Two",
    valueC: "Three"
  },
  {
    valueA: "First",
    valueB: "Second",
    valueC: "Third"
  },
  {
    valueA: "Primary",
    valueB: "Secondary",
    valueC: "Tertiary"
  }
]

export default class TestScreen2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRow: 0,
      scrollLoading: false
    }
  }

  static navigationOptions = {
    title: 'Test Screen 2'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  onScrollRefresh = () => {
    this.setState({scrollLoading: true})
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    const oddRow = StyleSheet.flatten([Styles.scrollList.listRows, Styles.scrollList.rowBackColorOdd])    
    const evenRow = StyleSheet.flatten([Styles.scrollList.listRows, Styles.scrollList.rowBackColorEven])    
    return (
      <View style={{flexDirection: 'column', flex: 1, justifyContent: 'flex-start'}}>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
          <ScrollList
            headers={ListHeaders}
            data={ListData}
            onPress={(index, data) => this.setState({selectedRow: index})}
            selectedIndex={this.state.selectedRow}
            loading={this.state.scrollLoading}
            onRefresh={this.onScrollRefresh}
          />
        <View>
          <ActionEntry entry={{label: 'ID', entryType: 'Integer', entryTypeEnum: 1}} useCamera={true} />
        </View>
        <Text style={oddRow}>Hello World!</Text>
        <View style={{flexDirection: 'row'}}>
          <SmallPropWindow
            title='Equipment'
            headers={
              [
                {
                  caption: 'Category',
                  source: 'category'
                },
                {
                  caption: 'Model',
                  source: 'model'
                },
                {
                  caption: 'Serial No.',
                  source: 'serial'
                }
              ]
            }
            data={
              {
                category: 'Granulation',
                model: 'Model One',
                serial: 'XYZ1234'
              }
            }
            baseBackColor='Orange'
          />
          <SmallPropWindow
            title="Component"
            headers={[{caption: 'Code', source: 'materialCode'},{caption: 'Name', source: 'materialName'},{caption: 'Quantity', source: 'quantity'}]}
            data={{materialCode: 'MC-45124', materialName: 'Lactose (Milled)', quantity: '123.45 kg'}}
          />
        </View>
        <Text style={oddRow}>Hello World!</Text>
        <Text style={evenRow}>Hello World!</Text>
      </View>
    )
  }
}
