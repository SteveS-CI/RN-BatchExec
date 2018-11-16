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
  nextProc: (postData) => {
    const request = {
      ...endpoints.nextProc,
      data: { ...postData }
    };
    return getData(request);
  },
  completeAction: (postData) => {
    const request = {
      ...endpoints.completeAction,
      data: { ...postData }
    };
    return getData(request);
  },
  confirmAction: (postData) => {
    const request = {
      ...endpoints.confirmAction,
      data: { ...postData }
    };
    return getData(request);
  },
  signAction: (postData) => {
    const request = {
      ...endpoints.signAction,
      data: { ...postData }
    };
    return getData(request);
  },
  approveAction: (postData) => {
    const request = {
      ...endpoints.approveAction,
      data: { ...postData }
    };
    return getData(request);
  },
  revertAction: (postData) => {
    const request = {
      ...endpoints.revertAction,
      data: { ...postData }
    };
    return getData(request);
  },
  resetHardware: () => {
    const request ={
      ...endpoints.resetHardware
    }
    return getData(request);
  },
  clearCache: () => {
    const request ={
      ...endpoints.clearCache
    }
    return getData(request);
  }
}
