import { AsyncStorage } from 'react-native'

export default {
  saveSetting: async (key, value) => {
    await AsyncStorage.setItem(key, value)
  },
  getSetting: async (key) => {
    const value = await AsyncStorage.getItem(key)
    return value
  },
  keys: {
    locationCode: 'locationCode'
  }
}
