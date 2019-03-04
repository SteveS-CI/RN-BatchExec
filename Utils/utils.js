import { methods } from '../api/api';

export function NavChoice(batchData, navigation, locationCode) {
  function CompleteAction(bData, nav, location) {
    const postData = {
      batchID: bData.batchID,
      procID: bData.nodes[0].procID,
      input: '',
      location,
    };
    methods.completeAction(postData).then((data) => {
      NavChoice(data, nav, location);
    }).catch((error) => {
      const msg = JSON.stringify(error);
      console.log(msg);
    });
  }

  // Examines the batch data and navigates to the appropriate screen
  const nodeCount = batchData.nodes ? batchData.nodes.length : 0;
  switch (nodeCount) {
    case 0:
    {
      const msg = (batchData.status === 'InProcess')
        ? { title: 'Stage Complete', message: 'Stage is complete\nSelect another batch or move to another location.' }
        : { title: 'Batch Complete', message: 'Batch is complete\nSelect another batch.' };
      return msg;
    }
    case 1:
    {
      const node = batchData.nodes[0];
      if (batchData.nodeDepth === 3) { // Action
        if (node.interactive === false) { // Execute this action
          CompleteAction(batchData, navigation, locationCode);
        } else { // Normal display
          navigation.replace('ActionDetail', { batchData, locationCode });
        }
      } else { // Single: Process/ Stage / Operation
        navigation.replace('NodeDetail', { batchData, locationCode });
      }
      return null;
    }
    default: // Multiple nodes
      navigation.replace('NodeSelect', { batchData, locationCode });
      return null;
  }
}

export function optimalForeColor(backColor) {
  const R = parseInt(backColor.substr(1, 2), 16);
  const G = parseInt(backColor.substr(3, 2), 16);
  const B = parseInt(backColor.substr(5, 2), 16);
  const BR = Math.sqrt((R * R * 0.299) + (G * G * 0.587) + (B * B * 0.114));
  return (BR > 155) ? '#222222' : 'white';
}
