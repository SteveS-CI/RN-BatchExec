import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'
import TextBar from '../components/TextBar'
import {ListHeaderProps} from '../constants/DataProps'

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  columnOuter: {
    flexDirection: 'row',
    backgroundColor: NexaColours.Grey,
    borderColor: NexaColours.GreyDark,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  columns: {
    color: 'white',
    padding: 8,
    fontSize: 16,
    borderColor: NexaColours.GreyDark,
    borderRightWidth: StyleSheet.hairlineWidth
  },
  rowOuter: {
    flexDirection: 'row',
    borderColor: NexaColours.GreyDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth
  },
  rows: {
    color: NexaColours.GreyDark,
    padding: 8,
    paddingVertical: 12,
    fontSize: 14,
    borderColor: NexaColours.GreyDark,
    borderRightWidth: 1
  }
})

export class ListHeader extends Component {

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape(ListHeaderProps)).isRequired,
  }

  render() {
    const headers = this.props.headers
    var cols = headers.map((col, idx) => {
      const flex = col.flex ? col.flex : 1
      const align = col.align ? col.align : "left"
      const colStyle = StyleSheet.flatten([styles.columns, {flex: flex, textAlign: align, flexWrap: 'wrap'}])
      return (
        <Text
          key={idx}
          style={colStyle}
        >
          {col.caption}
        </Text>
      )
    })
    return (
      <View style={styles.columnOuter}>
        {cols}
      </View>
    )
  }
}

export class ListRow extends Component {

  static defaultProps = {
    brighten: false,
    selected: false,
    index: 0
  }

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape(ListHeaderProps)).isRequired,
    data: PropTypes.object.isRequired,
    brighten: PropTypes.bool,
    onPress: PropTypes.func,
    selected: PropTypes.bool,
    index: PropTypes.number
  }

  render() {
    const headers = this.props.headers
    const data = this.props.data
    const cols = headers.map((col, idx) => {
      const flex = col.flex ? col.flex : 1
      const align = col.align ? col.align : "left"
      const colStyle = StyleSheet.flatten([styles.rows, {flex: flex, textAlign: align}])
      return (
        <Text key={idx} style={colStyle} >
          {data[col.source]}
        </Text>
      )
    })
    const rowBackColor = this.props.selected ? NexaColours.CyanAccent : this.props.brighten ? NexaColours.GreyUltraLight : NexaColours.GreyLight
    const rowStyle = StyleSheet.flatten([styles.rowOuter, {backgroundColor: rowBackColor}])
    if (this.props.onPress) {
      return (
        <TouchableOpacity style={rowStyle} onPressIn={() => this.props.onPress(this.props.index, data)}>
          {cols}
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={rowStyle}>
          {cols}
        </View>
      )
    }
  }
}

export default class ScrollList extends Component {

  static defaultProps = {
    selected: -1,
    noData: "No Data",
    loading: false,
    topMargin: false,
    transform: (row) => {return row}
  }

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape(ListHeaderProps)).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    selectedIndex: PropTypes.number,
    onPress: PropTypes.func,
    noData: PropTypes.string,
    loading: PropTypes.bool,
    onRefresh: PropTypes.func,
    topMargin: PropTypes.bool,
    transform: PropTypes.func
  }
 
  render() {
    const headers = this.props.headers
    const data = this.props.data
    var rows
    if (data) {
      if (data.length > 0) {
        rows = data.map((row, idx) => {
          const brighten = ((idx & 1) > 0)
          const selected = (this.props.selectedIndex===idx)
          const newRow = this.props.transform(row)
          return (
            <ListRow key={idx}
              index={idx}
              headers={headers}
              data={newRow}
              brighten={brighten}
              onPress={this.props.onPress}
              selected={selected}
            />
          )
        }
      )} else {
        if (!this.props.loading) {
          rows = <TextBar backColor={NexaColours.AlertOrange} style={{marginTop: 8}}>{this.props.noData}</TextBar>
        } else {
          rows = null
        }
      }
    } else {
      rows = null
    }
    const margin = this.props.topMargin ? 8 : 0
    const style = StyleSheet.flatten([styles.scrollContainer, {marginTop: margin}])
    const refresh = this.props.onRefresh
      ? <RefreshControl refreshing={this.props.loading} onRefresh={this.props.onRefresh} />
      : null
    return (
      <View style={style}>
        <ListHeader headers={this.props.headers} />
        <ScrollView
          refreshControl={refresh}>
          {rows}
        </ScrollView>
      </View>
    )
  }
  
}