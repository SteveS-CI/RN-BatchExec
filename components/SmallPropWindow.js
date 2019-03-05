import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as DataProps from '../constants/DataProps';
import NexaColours from '../constants/NexaColours';
import { optimalForeColor } from '../Utils/utils';
import Layout, { FontSizes, scale } from '../constants/Layout';

const CharMultiplier = scale(10);

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      marginTop: -12,
      zIndex: 0,
    },
    overlay: {
      position: 'relative',
      top: 18,
      left: 16,
      alignSelf: 'flex-start',
      zIndex: 1,
    },
    titleText: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      fontWeight: 'bold',
      borderRadius: 8,
      borderColor: NexaColours.GreyDark,
      borderWidth: StyleSheet.hairlineWidth * 2,
      fontSize: FontSizes.standard,
    },
    inner: {
      flexDirection: 'column',
      margin: 8,
      padding: 8,
      paddingTop: 12,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 12,
      borderTopLeftRadius: 0,
      borderColor: NexaColours.GreyDarkest,
      alignSelf: 'flex-start',
    },
  },
);

export default class SmallPropWindow extends PureComponent {
  static defaultProps = {
    title: 'Title',
    baseBackColor: 'Green',
  }

  static propTypes = {
    title: PropTypes.string,
    headers: PropTypes.arrayOf(DataProps.HeaderProps),
    data: PropTypes.any,
    baseBackColor: PropTypes.string,
  }

  captionWidth(headers) {
    // maximum caption length
    let w = 0;
    for (let x = 0; x < headers.length; x++) {
      w = Math.max(w, headers[x].caption.length);
    }
    return w * CharMultiplier;
  }

  valueWidth(headers, data) {
    // maximum value width
    let w = 0;
    for (let x = 0; x < headers.length; x++) {
      const src = data[headers[x].source];
      if (src) { w = Math.max(w, data[headers[x].source].length); }
    }
    return w * CharMultiplier;
  }

  makeRows = (foreColor) => {
    const { headers } = this.props;
    const { data } = this.props;
    const capWidth = this.captionWidth(headers);
    const valWidth = this.valueWidth(headers, data);
    const textLeftStyle = {
      width: capWidth, textAlign: 'right', paddingRight: 5, fontWeight: 'bold', color: foreColor, fontSize: FontSizes.smaller,
    };
    const textRightStyle = {
      width: valWidth, textAlign: 'left', color: foreColor, fontSize: FontSizes.smaller,
    };
    const rowData = headers.map((header, index) => (
      <View key={index} style={{ flexDirection: 'row' }}>
        <Text style={textLeftStyle}>
          {header.caption}


















:
        </Text>
        <Text style={textRightStyle}>{data[header.source]}</Text>
      </View>
    ));
    return rowData;
  }

  render() {
    const hasData = !!this.props.data;
    if (hasData) {
      const titleBackColor = NexaColours[this.props.baseBackColor];
      const titleForeColor = optimalForeColor(titleBackColor);
      const propsBackColor = NexaColours[`${this.props.baseBackColor}Accent`];
      const propsForeColor = optimalForeColor(propsBackColor);
      const rowData = this.makeRows(propsForeColor);
      const titleStyle = StyleSheet.flatten([styles.titleText, { backgroundColor: titleBackColor, color: titleForeColor }]);
      const innerStyle = StyleSheet.flatten([styles.inner, { backgroundColor: propsBackColor }]);
      return (
        <View style={styles.container}>
          <View style={styles.overlay}>
            <Text style={titleStyle}>{this.props.title}</Text>
          </View>
          <View style={innerStyle}>
            {rowData}
          </View>
        </View>
      );
    }
    return null;
  }
}
