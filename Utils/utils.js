import { Alert } from 'react-native'
import { methods } from '../api/api'

export function NavChoice(batchData, navigation, locationCode) {
  // Examines the batch data and navigates to the appropriate screen
  const nodeCount = batchData.nodes ? batchData.nodes.length : 0
  console.log(batchData)
  console.log('NavChoice: nodeCount =', nodeCount)
  switch (nodeCount) {
    case 0:
      const msg = (batchData.status === 'InProcess')
        ? { title: 'Stage Complete', prompt: 'Stage is complete\nSelect another batch or move to another location.' }
        : { title: 'Batch Complete', prompt: 'Batch is complete\nSelect another batch.' }
      Alert.alert(msg.title, msg.prompt)
      navigation.replace('BatchList', { refresh: true })
      break
    case 1:
      const node = batchData.nodes[0]
      if (batchData.nodeDepth === 3) { // Action
        if (node.interactive === false) { // Execute this action
          console.log('NavChoice: Execute')
          CompleteAction(batchData, navigation, locationCode)
        } else { // Normal display
          console.log('NavChoice: Display')
          navigation.replace('ActionDetail', { batchData, locationCode })
        }
      } else { // Single: Process/ Stage / Operation 
        console.log('NavChoice: Confirm')
        navigation.replace('NodeDetail', { batchData, locationCode })
      }
      break
    default: // Multiple nodes
      console.log('NavChoice: Multiple')
      navigation.replace('NodeSelect', { batchData, locationCode })
  }

  function CompleteAction(batchData, navigation, location) {
    const postData = {
      batchID: batchData.batchID,
      procID: batchData.nodes[0].procID,
      input: '',
      location
    }
    methods.completeAction(postData).then(data => {
      NavChoice(data, navigation, location)
    }).catch(error => {
      const msg = JSON.stringify(error)
      console.log(msg)
    })
  }
}

export function optimalForeColor(backColor) {
  const R = parseInt(backColor.substr(1, 2), 16)
  const G = parseInt(backColor.substr(3, 2), 16)
  const B = parseInt(backColor.substr(5, 2), 16)
  const BR = Math.sqrt((R * R * 0.299) + (G * G * 0.587) + (B * B * 0.114))
  return (BR > 155) ? '#222222' : 'white'
}
