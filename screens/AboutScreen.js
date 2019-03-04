import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Constants } from 'expo';
import ScreenHeader from '../components/ScreenHeader';
import PropList from '../components/PropList';

export default class AboutScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'About',
  })

  static propTypes = {
    navigation: PropTypes.shape({
      navigation: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    const headers = [
      { display: 'Name', source: 'name' },
      { display: 'Description', source: 'description' },
      { display: 'Version', source: 'version' },
      { display: 'SDK Version', source: 'sdkVersion' },
    ];
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ScreenHeader onCancel={() => navigation.navigate('BatchList')} />
        <PropList headers={headers} data={Constants.manifest} />
      </View>
    );
  }
}
