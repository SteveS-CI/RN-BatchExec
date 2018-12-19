import React from 'react'
import i18n from 'i18n-js'
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
import NodeSelectScreen from '../screens/NodeSelectScreen';
import ActionDetailScreen from '../screens/ActionDetailScreen';
import NodeDetailScreen from '../screens/NodeDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BatchPropsScreen from '../screens/BatchPropsScreen';
import BatchCompsScreen from '../screens/BatchCompsScreen';
import BatchEquipScreen from '../screens/BatchEquipScreen';
import LoginScreen from '../screens/LoginScreen';
import LocationListScreen from '../screens/LocationListScreen';
import LocationScanScreen from '../screens/LocationScanScreen';
import TestScreen from '../screens/TestScreen'
import TestScreen2 from '../screens/TestScreen2'
import TestScreen3 from '../screens/TestScreen3'
import TestScreen4 from '../screens/TestScreen4'
import TestScreen5 from '../screens/TestScreen5'
import TestScreen6 from '../screens/TestScreen6'
import AboutScreen from '../screens/AboutScreen'
import DevScreen from '../screens/DevScreen'
import DropdownMenu from '../components/DropdownMenu';
import LocationHeader from '../components/LocationHeader'
import { WindowSize, FontSizes } from '../constants/Layout';

const screenHeaderStyling = {
  headerTintColor: NexaColours.GreyLight,
  headerStyle: { 
    backgroundColor: NexaColours.Blue,
  },
  headerTitleStyle: { 
    fontFamily: 'euro-demi', 
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'center',
  }
}

const mainStyle = {
  headerTintColor: NexaColours.Blue,
  headerStyle: {
    backgroundColor: NexaColours.GreyLight,
    height: WindowSize() / 20
  },
  headerTitleStyle: { 
    fontFamily: 'euro-demi', 
    fontWeight: 'normal',
    fontSize: WindowSize() / 60,
    textAlign: 'left',
    marginLeft: WindowSize() / 40,
    paddingLeft: 0
  }
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
      labelStyle: {fontSize: FontSizes.standard },
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

// const MainNav = createStackNavigator(
//   {
//   },
//   {
//     headerMode: 'float',
//     navigationOptions: ({ navigation }) => {
//       {
//         const route = navigation.state.routeName
//         if (route === 'BatchDetail') {
//           return {
//             ...screenHeaderStyling,
//             title: i18n.t('screens.batchDetail.title')
//           }
//         } else {
//           return {...screenHeaderStyling, headerLeft: null}
//         }
//       }
//     }
//   }
// )

// pointers to menus.dropdown.x
const dropDownItems = {
  labels: [
    'changeLocation',
    'settings',
    'login',
    'exit',
    'about',
    'developer'
  ],
  actions: ['LocationList','Settings','Login','EXIT', 'About', 'Dev']
}

export default AppNavigator = createStackNavigator(
  {
    BatchList: BatchSelectScreen,
    BatchDetail: BatchNav,
    NodeSelect: NodeSelectScreen,
    NodeDetail: NodeDetailScreen,
    ActionDetail: ActionDetailScreen,
    LocationList: LocationListScreen,
    LocationScan: LocationScanScreen,
    Settings: SettingsScreen,
    Login: LoginNav,
    About: AboutScreen,
    Dev: DevScreen,
    Test: TestScreen,
    Test2: TestScreen2,
    Test3: TestScreen3,
    Test4: TestScreen4,
    Test5: TestScreen5,
    Test6: TestScreen6
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation, props }) => {
      return {
        title: i18n.t('screens.batchDetail.title'),
        ...mainStyle,
        headerLeft: <DropdownMenu data={dropDownItems} navigation={navigation} />,
        headerRight: <LocationHeader navigation={navigation}/>
      }
    }
  }
)