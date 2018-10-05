import { AsyncStorage } from 'react-native'

export default {
  readSettings: async () => {
    const json = await AsyncStorage.getItem('settings')
    const value = JSON.parse(json)
    return value
  },
  saveSettings: async (settings) => {
    const json = JSON.stringify(settings)
    await AsyncStorage.setItem('settings', json)
  },
  deleteSettings: async () => {
    await AsyncStorage.removeItem('settings')
  },
  readItem: async (key) => {
    const value = await AsyncStorage.getItem(key)
    return value
  },
  saveItem: async (key, value) => {
    await AsyncStorage.setItem(key, value)
  },
  readObject: async (key) => {
    const json = await AsyncStorage.getItem(key)
    const value = JSON.parse(json)
    return value
  },
  saveObject: async (key, value) => {
    const json = JSON.stringify(value)
    await AsyncStorage.setItem(key, json)
  }
}
