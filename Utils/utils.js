export function optimalForeColor(backColor) {
    const R = parseInt(backColor.substr(1, 2), 16)
    const G = parseInt(backColor.substr(3, 2), 16)
    const B = parseInt(backColor.substr(5, 2), 16)
    const BR = Math.sqrt((R * R * 0.299) + (G * G * 0.587) + (B * B * 0.114))
    return (BR > 155) ? '#222222' : 'white'
}

export const NavResult = {
  BATCH_COMPLETE: 0,
  STAGE_COMPLETE: 1,
  CHOICE: 2,
  ACTION: 3,
  EXECUTE: 4,
  CONFIRM: 5
}

export function CheckNav(batchData, navigation, location) {
  // Examines the batch data and returns:
  // Nodes are missing:
  // 'BATCH_COMPLETE': The batch has a status of 'PendingApproval' or 'PendingSignature'
  // 'STAGE_COMPLETE': The batch has a status of 'InProgress' but no nodes are present
  // Nodes.count > 1
  // 'CHOICE': There are two or more nodes to choose from. (Stages, Operations or Actions)
  // Nodes.count == 1 (There is a single node)
  //    Node.depth == 3 - 'ACTION': A single Action
  //    else - 'CONFIRM' (Node has status of 'PendingXXX')
  if (!batchData.nodes) {
    const val = (batchData.status === 'PendingApproval' || batchData.status === 'Complete') ? NavResult.BATCH_COMPLETE : NavResult.STAGE_COMPLETE
    return val
  } else if (batchData.nodes.length > 1) { // Multiple nodes
      return NavResult.CHOICE
  } else { // Single node
    if (batchData.nodeDepth === 3) { // Action node
      const at = batchData.nodes[0].actionType
      const val = (at === 'Evaluation' || at === 'WeighCreate' || at === 'ExecuteCommand') ? NavResult.EXECUTE : NavResult.ACTION
      if (val === NavResult.ACTION) { navigation.replace('ActionDetail', {batchData, locationCode: location} )}
      return val
    } else { // Operation/Stage/Process - for Confirmation/Signature/Approval
      return NavResult.CONFIRM
    }
  }
}