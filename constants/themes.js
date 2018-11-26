import {StyleSheet} from 'react-native'

export const light = {
  container: {
    color: 'white'
  }
}

export const dark = {
  container: {
    color: 'black'
  }
}

const themes = [
  light, dark
]

const current = StyleSheet.create(themes[1])

const theme = StyleSheet.flatten(container)

