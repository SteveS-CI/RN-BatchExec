import React from 'react'
import axios from "axios";
import endpoints from "./endpoints";

const api = axios.create();

export default api;

function getData(request) {
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then(response => {
        if (response.headers["content-type"].contains("application/json")) {
          resolve(response.data);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getTextFile(name) {
  const request = { ...endpoints.getTextFile, params: { name, language: 'en' } };
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then(response => {
        if (response.headers["content-type"].contains("text/plain")) {
          resolve({ success: true, data: response.data });
        } else {
          reject({ success: false, data: null });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getImageFile(name) {
  const request = { ...endpoints.getImageFile, params: { name } };
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then(response => {
        if (response.headers["content-type"].contains("application/octet-stream")) {
          resolve({ success: true, data: response.data });
        } else {
          reject({ success: false, data: null });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const methods = {
  getInfo: () => {
    const request = { ...endpoints.info };
    const result = getData(request)
    return result
  },
  getLocations: () => {
    const request = { ...endpoints.locations };
    return getData(request);
  },
  getBatch: (batchID, locationCode) => {
    const request = { ...endpoints.getBatch, params: { batchID, locationCode } };
    return getData(request);
  },
  getBatchList: (locationCode) => {
    const request = { ...endpoints.batchlist, params: { locationCode } };
    return getData(request);
  },
  nextProc: (batchID, procID, location) => {
    const request = {
      ...endpoints.nextProc,
      data: { batchID, procID, location }
    };
    return getData(request);
  },
  completeAction: (batchID, procID, input, location) => {
    const request = {
      ...endpoints.completeAction,
      data: { batchID, procID, input, location }
    };
    return getData(request);
  },
  confirmAction: (batchID, procID, input, location) => {
    const request = {
      ...endpoints.confirmAction,
      data: { batchID, procID, input, location }
    };
    return getData(request);
  },
  signAction: (batchID, procID, input, location) => {
    const request = {
      ...endpoints.signAction,
      data: { batchID, procID, input, location }
    };
    return getData(request);
  },
  approveAction: (batchID, procID, input, location) => {
    const request = {
      ...endpoints.approveAction,
      data: { batchID, procID, input, location }
    };
    return getData(request);
  },
  revertAction: (batchID, procID, input, location) => {
    const request = {
      ...endpoints.revertAction,
      data: { batchID, procID, input, location }
    };
    return getData(request);
  },
  resetHardware: () => {
    const request ={
      ...endpoints.resetHardware
    }
    return getData(request);
  }
}
