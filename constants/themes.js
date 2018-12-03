import { StyleSheet } from 'react-native'
import NexaColours from './NexaColours'

export const light = {
  scrollList: {
    listContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    columnContainer: {
      flexDirection: 'row',
      backgroundColor: NexaColours.Grey,
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    listColumn: {
      color: 'white',
      padding: 8,
//      fontSize: 16,
      borderColor: NexaColours.GreyDark,
      borderRightWidth: StyleSheet.hairlineWidth
    },
    rowContainer: {
      flexDirection: 'row',
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: StyleSheet.hairlineWidth
    },
    listRows: {
      color: NexaColours.GreyDark,
      padding: 8,
      paddingVertical: 12,
//      fontSize: 14,
      borderColor: NexaColours.GreyDark,
      borderRightWidth: 1
    },
    rowBackColorOdd: {
      backgroundColor: NexaColours.GreyLight
    },
    rowBackColorEven: {
      backgroundColor: NexaColours.GreyUltraLight
    },
    rowBackColorSelected: {
      backgroundColor: NexaColours.CyanAccent
    }
  }
}

export const dark = {
  scrollList: {
    listContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    columnContainer: {
      flexDirection: 'row',
      backgroundColor: NexaColours.Grey,
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    listColumn: {
      color: 'white',
      padding: 8,
//      fontSize: 16,
      borderColor: NexaColours.GreyDark,
      borderRightWidth: StyleSheet.hairlineWidth
    },
    rowContainer: {
      flexDirection: 'row',
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: StyleSheet.hairlineWidth
    },
    listRows: {
      color: 'white',
      padding: 8,
      paddingVertical: 12,
//      fontSize: 14,
      borderColor: NexaColours.GreyDark,
      borderRightWidth: 1
    },
    rowBackColorOdd: {
      backgroundColor: NexaColours.GreyDark
    },
    rowBackColorEven: {
      backgroundColor: NexaColours.GreyDarkest
    },
    rowBackColorSelected: {
      backgroundColor: NexaColours.CyanAccent
    }
  }
}
