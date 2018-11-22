import React from 'react';
import {View, Dimensions } from 'react-native';
import ActionButtons from '../components/ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'
import ScrollList from '../components/ScrollList'

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

export default class TestScreen extends React.Component {
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
    if (name === 'cancel') this.props.navigation.navigate('BatchList')
  }

  onScrollRefresh = () => {
    this.setState({scrollLoading: true})
  }

  render() {
    const buttons = [ButtonStyles.Back, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
          <ScrollList
            headers={ListHeaders}
            data={ListData}
            onPress={(index, data) => this.setState({selectedRow: index})}
            selectedIndex={this.state.selectedRow}
            loading={this.state.scrollLoading}
            onRefresh={this.onScrollRefresh}
          />
      </View>
    )
  }
}
