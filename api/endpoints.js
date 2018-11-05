/**
 * Batch Execution API Endpoints
 *
 * @see BatchListPropType
 * 
 * @namespace endpoints
 * @memberof module:interfaces
 */

const getHeaders = {
  'Content-Type': 'application/json',
  'Accept-Charset' : 'utf-8',
  'Accept-Language': 'en-GB'
}

const postHeaders = {
  'Content-Type': 'application/json',
  'Accept-Charset' : 'utf-8',
  'Accept-Language': 'en-GB'
}

const textHeaders = {
  'Content-Type': 'text/plain',
  'Accept-Charset' : 'utf-8'
}

const imageHeaders = {
  'Content-Type': 'application/octet-stream',
  'Accept-Charset' : 'utf-8'
}

export default {
  /** 
   * Gets basic iformation about the API
   * Request Type: GET
   * @param none
   */
  info: {
    method: 'get',
    url: '/Info/GetInfo',
    headers: getHeaders
  },

  /** 
   * Gets the list of batches, see BatchListPropType
   * Request Type: GET
   * @param locationCode location of machine
   */
  batchlist: {
    method: 'get',
    url: '/Batch/BatchList',
    headers: getHeaders
  },

  /** 
   * Gets the list of locations, see LocationsPropType
   * Request Type: GET
   * @param none
   */
  locations: {
    method: 'get',
    url: '/Batch/Locations',
    headers: getHeaders
  },

  /** 
   * Gets a single batch - LOADS THE BATCH INTO CACHE ON THE SERVER
   * Request Type: GET
   * @param batchID 
   * @param locationCode site location e.g. Granulation Suite
   */
  getBatch: {
    method: 'get',
    url: '/Batch/GetBatch',
    headers: getHeaders
  },

  /** 
   * Gets the content of a text file
   * Request Type: GET
   * @param name the name of the required text file
   */
  getTextFile: {
    method: 'get',
    url: '/File/Text',
    headers: textHeaders
  },

  /** 
   * Gets the content of an image file
   * Request Type: GET
   * @param name the name of the required image file
   */
  getImageFile: {
    method: 'get',
    url: '/File/Image',
    headers: imageHeaders
  },

  /** 
   * Gets the next action or process for the stated batch
   * Request Type: GET
   * @param batchID the id of the current batch
   * @param procID the id of the current proc (0 for first)
   * @param locationCode site location e.g. Granulation Suite
   */
  nextProc: {
    method: 'post',
    url: '/Batch/NextProc',
    headers: postHeaders
  },

  //{batchID, procID, input, location}
  completeAction: {
    method: 'post',
    url: '/Batch/Complete',
    headers: postHeaders
  },

  //{batchID, procID, input, location}
  confirmAction: {
    method: 'post',
    url: '/Batch/Confirm',
    headers: postHeaders
  },
  
  //{batchID, procID, input, location}
  signAction: {
    method: 'post',
    url: '/Batch/Sign',
    headers: postHeaders
  },
  
  //{batchID, procID, input, location}
  approveAction: {
    method: 'post',
    url: '/Batch/Approve',
    headers: postHeaders
  },
 
  //{batchID, procID, input, location}
  revertAction: {
    method: 'post',
    url: '/Batch/Revert',
    headers: postHeaders
  },

  //
  resetHardware: {
    method: 'post',
    url: '/Demo/HardwareReset',
    headers: postHeaders
  },

  clearCache: {
    method: 'post',
    url: 'Demo/ClearCache',
    headers: postHeaders
  },

  //{StageID}
  compList: {
    method: 'get',
    url: '/Batch/CompList',
    headers: getHeaders
  }

}

