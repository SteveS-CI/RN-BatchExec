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
import Processes from '../screens/Processes'
import NodeSelectScreen from '../screens/NodeSelectScreen';
import ActionDetailScreen from '../screens/ActionDetailScreen';
import NodeDetailScreen from '../screens/NodeDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BatchPropsScreen from '../screens/BatchPropsScreen';
import BatchCompsScreen from '../screens/BatchCompsScreen';
import BatchEquipScreen from '../screens/BatchEquipScreen';
import LoginScreen from '../screens/LoginScreen';
import LocationSelectScreen from '../screens/LocationSelectScreen';
import TestScreen from '../screens/TestScreen'

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
          const batch = navigation.getParam('batch')
          const location = navigation.getParam('location')
          return {...screenHeaderStyling,
            title: 'Batch Details',
            headerRight: <RoundedButton title='Continue' onPress={() => navigation.navigate('Processes', {batchID: batch.batchID, procID: 0, location})}/>,
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
    Login: LoginNav,
    Test: TestScreen
  }
)

const dropDownItems = {
  labels: ['Change Location','Settings','Login','Test Screen','Exit', 'Clear Location'],
  actions: ['Location','Settings','Login','Test','EXIT', 'CLEAR']
}

export default AppNavigator = createStackNavigator(
  {
    Main: DropdownNav
  },
  {
    headerMode: "float",
    navigationOptions: ({navigation, props}) => ({
      title: 'Batch Execution',
      headerTintColor: NexaColours.Blue,
      headerStyle: {backgroundColor: NexaColours.GreyLight},
      headerTitleStyle: {fontFamily: 'euro-demi', fontWeight: 'normal'},
      headerLeft: <DropdownMenu data={dropDownItems} navigation={navigation} />,
      headerRight: <LocationHeader/>
    })
  }
)