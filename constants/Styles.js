import { StyleSheet } from 'react-native';
import { light, dark } from './themes';

const styles = {};

export function setTheme(name) {
  const theme = { light, dark }[name];
  Object.keys(theme).forEach((key) => {
    styles[key] = StyleSheet.create(theme[key]);
  });
}

export default styles;
