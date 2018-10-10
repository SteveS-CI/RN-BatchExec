import React from 'react';
import { Text, Image, Button, TouchableHighlight } from 'react-native';
import { 
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator}
from 'react-navigation';

import NexaColours from '../constants/NexaColours'

import BatchSelectScreen from '../screens/BatchSelectScreen';
import NodeSelectScreen from '../screens/NodeSelectScreen';
import ActionDetailScreen from '../screens/ActionDetailScreen';
import NodeDetailScreen from '../screens/NodeDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BatchPropsScreen from '../screens/BatchPropsScreen';
import BatchCompsScreen from '../screens/BatchCompsScreen';
import BatchEquipScreen from '../screens/BatchEquipScreen';
import LoginScreen from '../screens/LoginScreen';
import LocationSelectScreen from '../screens/LocationSelectScreen';
import DropdownMenu from '../components/DropdownMenu';
import RoundedButton from '../components/RoundedButton'

import LocationHeader from '../components/LocationHeader'

const screenHeaderStyling = {
  headerTintColor: NexaColours.GreyLight,
  headerStyle: { 
    backgroundColor: NexaColours.Blue
  },
  headerTitleStyle: {fontFamily: 'euro-demi', fontWeight: 'normal'}
}

const BatchNav = createMaterialTopTabNavigator(
  {
    BatchProps: BatchPropsScreen,
    BatchComps: BatchCompsScreen,
    BatchEquip: BatchEquipScreen
  },
  {
    tabBarPosition: 'top',
    tabBarOptions:
    {
      upperCaseLabel: false,
      activeTintColor: '#FFFFFF',
      inactiveTintColor: NexaColours.GreyLight,
      labelStyle: {fontFamily: 'euro-std', fontSize: 16},
      style: {backgroundColor: NexaColours.BlueAccent}
    }
  }
)

const LoginNav = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    navigationOptions: {
      ...screenHeaderStyling
    }
  }
)

const SettingsNav = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    navigationOptions: {
      ...screenHeaderStyling
    }
  }
)

const LocationNav = createStackNavigator(
  {
    Location: LocationSelectScreen
  },
  {
    navigationOptions: {
      ...screenHeaderStyling
    }
  }
)

const MainNav = createStackNavigator(
  {
    BatchList: BatchSelectScreen,
    BatchDetail: BatchNav,
    NodeSelect: NodeSelectScreen,
    NodeDetail: NodeDetailScreen,
    ActionDetail: ActionDetailScreen
  },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => {
      {
        const route = navigation.state.routeName
        if (route==='BatchDetail') {
          return {...screenHeaderStyling,
            title: 'Batch Details',
            headerRight: <RoundedButton title='Continue' onPress={() => navigation.navigate('NodeSelect')}/>,
          }
        } else {
          return screenHeaderStyling
        }
      }
    }
  }
)

const DropdownNav = createSwitchNavigator(
  {
    Main: MainNav,
    Location: LocationNav,
    Settings: SettingsNav,
    Login: LoginNav
  }
)

const dropDownItems = {
  labels: ['Change Location','Settings','Login','Exit'],
  actions: ['Location','Settings','Login','EXIT']
}

export default AppNavigator = createStackNavigator(
  {
    Main: DropdownNav
  },
  {
    headerMode: "float",
    navigationOptions: ({navigation}) => ({
      title: 'Batch Execution',
      headerTintColor: NexaColours.Blue,
      headerStyle: {backgroundColor: NexaColours.GreyLight},
      headerTitleStyle: {fontFamily: 'euro-demi', fontWeight: 'normal'},
      headerLeft: <DropdownMenu data={dropDownItems} navigation={navigation}/>,
      headerRight: <LocationHeader/>
    })
  }
)