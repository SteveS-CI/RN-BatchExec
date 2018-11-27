import {StyleSheet} from 'react-native'
import {light, dark} from './themes'

var styles = {}

export function setTheme(name) {
  const theme = { light, dark }[name]
  Object.keys(theme).forEach((key) => {
    console.log(key, theme[key])
    styles[key] = StyleSheet.create(theme[key])
  })
}

export default styles

/* 
export default class ThemeManager {
  
  static setTheme(name) {
    const theme = { light, dark }[name]
    //ThemeManager.styles = StyleSheet.create({light, dark}[name])

    ThemeManager.styles = {}

    Object.keys(theme).forEach((key) => {
      console.log(key, theme[key])
      ThemeManager.styles[key] = StyleSheet.create(theme[key])
    })
  }

}
 */