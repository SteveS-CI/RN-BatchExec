import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import NexaColours from '../constants/NexaColours';
import TextBar from './TextBar';
import { ListHeaderProps } from '../constants/DataProps';
import { scale, FontSizes } from '../constants/Layout';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  columnContainer: {
    flexDirection: 'row',
    backgroundColor: NexaColours.Grey,
    borderColor: NexaColours.GreyDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listColumn: {
    color: 'white',
    padding: scale(8),
    fontWeight: 'bold',
    borderColor: NexaColours.GreyDark,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  rowContainer: {
    flexDirection: 'row',
    borderColor: NexaColours.GreyDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth,
  },
  listRows: {
    color: NexaColours.GreyDark,
    padding: scale(8),
    borderColor: NexaColours.GreyDark,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  rowBackColorEven: { backgroundColor: NexaColours.GreyLight },
  rowBackColorOdd: { backgroundColor: NexaColours.GreyUltraLight },
  rowBackColorSelected: { backgroundColor: NexaColours.YellowAccent },
});

const HeaderFontSize = FontSizes.listHeader;
const RowFontSize = FontSizes.listRow;

export class ListHeader extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(ListHeaderProps).isRequired,
    fontSize: PropTypes.number,
  }

  render() {
    const fontSizeStyle = { fontSize: this.props.fontSize };
    const { headers } = this.props;
    const cols = headers.map((col, idx) => {
      const flex = col.flex ? col.flex : 1;
      const align = col.align ? col.align : 'left';
      const colStyle = StyleSheet.flatten([styles.listColumn, { flex, textAlign: align, flexWrap: 'wrap' }, fontSizeStyle]);
      return (
        <Text
          key={idx}
          style={colStyle}
        >
          {col.caption}
        </Text>
      );
    });
    return (
      <View style={styles.columnContainer}>
        {cols}
      </View>
    );
  }
}

export class ListRow extends Component {
  static defaultProps = {
    brighten: false,
    selected: false,
    index: 0,
  }

  static propTypes = {
    headers: PropTypes.arrayOf(ListHeaderProps).isRequired,
    data: PropTypes.object.isRequired,
    brighten: PropTypes.bool,
    onPress: PropTypes.func,
    selected: PropTypes.bool,
    index: PropTypes.number,
    fontSize: PropTypes.number,
  }

  render() {
    const fontSizeStyle = { fontSize: this.props.fontSize };
    const { headers } = this.props;
    const { data } = this.props;
    const cols = headers.map((col, idx) => {
      const flex = col.flex ? col.flex : 1;
      const align = col.align ? col.align : 'left';
      const colStyle = StyleSheet.flatten([styles.listRows, { flex, textAlign: align }, fontSizeStyle]);
      return (
        <Text key={idx} style={colStyle}>
          {data[col.source]}
        </Text>
      );
    });
    const evenColor = styles.rowBackColorEven;
    const oddColor = styles.rowBackColorOdd;
    const selColor = styles.rowBackColorSelected;
    const rowBackColor = this.props.selected ? selColor : this.props.brighten ? oddColor : evenColor;
    const rowStyle = StyleSheet.flatten([styles.rowContainer, rowBackColor]);
    if (this.props.onPress) {
      return (
        <TouchableOpacity style={rowStyle} onPressIn={() => this.props.onPress(this.props.index, data)}>
          {cols}
        </TouchableOpacity>
      );
    }
    return (
      <View style={rowStyle}>
        {cols}
      </View>
    );
  }
}

export default class ScrollList extends Component {
  static defaultProps = {
    selected: -1,
    noData: 'No Data',
    loading: false,
    topMargin: false,
    transform: row => row,
  }

  static propTypes = {
    headers: PropTypes.arrayOf(ListHeaderProps).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    selectedIndex: PropTypes.number,
    onPress: PropTypes.func,
    noData: PropTypes.string,
    loading: PropTypes.bool,
    onRefresh: PropTypes.func,
    topMargin: PropTypes.bool,
    transform: PropTypes.func,
  }

  render() {
    const { headers } = this.props;
    const { data } = this.props;
    let rows;
    if (data) {
      if (data.length > 0) {
        rows = data.map((row, idx) => {
          const brighten = ((idx & 1) > 0);
          const selected = (this.props.selectedIndex === idx);
          const newRow = this.props.transform(row);
          return (
            <ListRow
              key={idx}
              index={idx}
              headers={headers}
              data={newRow}
              brighten={brighten}
              onPress={this.props.onPress}
              selected={selected}
              fontSize={RowFontSize}
            />
          );
        });
      } else if (!this.props.loading) {
        rows = <TextBar backColor={NexaColours.AlertOrange} style={{ marginTop: 8 }}>{this.props.noData}</TextBar>;
      } else {
        rows = null;
      }
    } else {
      rows = null;
    }
    const margin = this.props.topMargin ? 8 : 0;
    const style = StyleSheet.flatten([styles.listContainer, { marginTop: margin }]);
    const refresh = this.props.onRefresh
      ? <RefreshControl refreshing={this.props.loading} onRefresh={this.props.onRefresh} />
      : null;
    return (
      <View style={style}>
        <ListHeader headers={this.props.headers} fontSize={HeaderFontSize} />
        <ScrollView
          refreshControl={refresh}
        >
          {rows}
        </ScrollView>
      </View>
    );
  }
}
