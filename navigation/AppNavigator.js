import React from 'react';
import i18n from 'i18n-js';
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
}
  from 'react-navigation';

import NexaColours from '../constants/NexaColours';

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
import TestScreen from '../screens/TestScreen';
import TestScreen2 from '../screens/TestScreen2';
import TestScreen3 from '../screens/TestScreen3';
import TestScreen4 from '../screens/TestScreen4';
import TestScreen5 from '../screens/TestScreen5';
import TestScreen6 from '../screens/TestScreen6';
import AboutScreen from '../screens/AboutScreen';
import DevScreen from '../screens/DevScreen';
import DropdownMenu from '../components/DropdownMenu';
import LocationHeader from '../components/LocationHeader';
import { FontSizes, scale, verticalScale } from '../constants/Layout';

const mainStyle = {
  headerTintColor: NexaColours.GreyUltraLight,
  headerStyle: {
    backgroundColor: NexaColours.Blue,
    height: verticalScale(52),
  },
  headerTitleStyle: {
    fontFamily: 'euro-demi',
    fontWeight: 'normal',
    fontSize: FontSizes.standard,
    textAlign: 'left',
    marginLeft: scale(10),
    paddingLeft: 0,
  },
};

const BatchNav = createMaterialTopTabNavigator(
  {
    BatchProps: BatchPropsScreen,
    BatchComps: BatchCompsScreen,
    BatchEquip: BatchEquipScreen,
  },
  {
    tabBarPosition: 'top',
    tabBarOptions:
    {
      upperCaseLabel: false,
      activeTintColor: '#FFFFFF',
      inactiveTintColor: NexaColours.GreyLight,
      labelStyle: { fontSize: FontSizes.standard },
      style: { backgroundColor: NexaColours.BlueAccent },
    },
  },
);

const LoginNav = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    navigationOptions: {
      ...mainStyle,
      title: 'Login',
    },
  },
);

// pointers to menus.dropdown.x
const dropDownItems = {
  labels: [
    'batchList',
    'changeLocation',
    'settings',
    'login',
    'exit',
    'about',
    'developer',
  ],
  actions: ['BatchList', 'LocationList', 'Settings', 'Login', 'EXIT', 'About', 'Dev'],
};

const MainNavigator = createStackNavigator(
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
    Test6: TestScreen6,
  },
  {
    headerMode: 'float',
    defaultNavigationOptions: ({ navigation }) => ({
      title: i18n.t('screens.batchDetail.title'),
      ...mainStyle,
      headerLeft: <DropdownMenu data={dropDownItems} navigation={navigation} />,
      headerRight: <LocationHeader navigation={navigation} />,
    }),
  },
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
