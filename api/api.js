import axios from 'axios'
import endpoints from './endpoints'

const api = axios.create()

export default api

function getData(request) {
  return new Promise((resolve, reject) => {
    api.request(request).then(response => {
      if (response.headers['content-type'].contains('application/json')) {
        resolve({success: true, data: response.data})
      } else {
        reject({success: false, data: null})
      }
    }).catch((error) => {
      reject(error)
    }) 
  })
}

export function getInfo() {
  const request = {...endpoints.info}
  return getData(request)
}

export function getLocations() {
  const request = {...endpoints.locations}
  return getData(request)
}

export function getBatchList(locationCode) {
  const request = {...endpoints.batchlist, params: {locationCode}}
  return getData(request)
}

export function getBatch(batchID, locationCode) {
  const request = {...endpoints.getBatch, params: {batchID, locationCode}}
  return getData(request)
}

export function nextProc(batchID, procID, location) {
  const request = {...endpoints.nextProc, data: {batchID, procID, location}}
  return getData(request)
}
