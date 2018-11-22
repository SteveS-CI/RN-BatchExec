import React from 'react';
import { Text, Image, Button, TouchableHighlight } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator
}
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
import TestScreen2 from '../screens/TestScreen2'
import AboutScreen from '../screens/AboutScreen'
import DevScreen from '../screens/DevScreen'

import DropdownMenu from '../components/DropdownMenu';
import RoundedButton from '../components/RoundedButton'

import LocationHeader from '../components/LocationHeader'
import { ActionButton } from '../components/ActionButtons';

const screenHeaderStyling = {
  headerTintColor: NexaColours.GreyLight,
  headerStyle: { 
    backgroundColor: NexaColours.Blue,
  },
  headerTitleStyle: { 
    fontFamily: 'euro-demi', 
    fontWeight: 'normal',
    fontSize: 22,
    textAlign: 'center'
  },
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
      labelStyle: {fontSize: 16 },
      style: { backgroundColor: NexaColours.BlueAccent }
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
    navigationOptions: ({ navigation }) => {
      {
        const route = navigation.state.routeName
        if (route === 'BatchDetail') {
          const batch = navigation.getParam('batch')
          const location = navigation.getParam('location')
          return {
            ...screenHeaderStyling,
            title: 'Batch Details'
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
    Location: LocationSelectScreen,
    Settings: SettingsScreen,
    Login: LoginNav,
    Test: TestScreen,
    Test2: TestScreen2,
    About: AboutScreen,
    Dev: DevScreen
  }
)

const dropDownItems = {
  labels: ['Change Location','Settings','Login','Exit', 'About','Developer Tools'],
  actions: ['Location','Settings','Login','EXIT', 'About', 'Dev']
}

export default AppNavigator = createStackNavigator(
  {
    Main: DropdownNav
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation, props }) => ({
      title: 'Batch Execution',
      headerTintColor: NexaColours.Blue,
      headerStyle: { backgroundColor: NexaColours.GreyLight },
      headerTitleStyle: { fontFamily: 'euro-demi', fontWeight: 'normal', fontSize: 22 },
      headerLeft: <DropdownMenu data={dropDownItems} navigation={navigation} />,
      headerRight: <LocationHeader navigation={navigation}/>
    })
  }
)