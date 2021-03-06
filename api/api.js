import axios from 'axios';
import i18n from 'i18n-js';
import endpoints from './endpoints';

const api = axios.create({ timeout: 10000 });

export default api;

function getData(request) {
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then((response) => {
        if (response.headers['content-type'].includes('application/json')) {
          resolve(response.data);
        } else {
          const contentType = response.headers['content-type'];
          reject(new Error(`Invalid content-type: ${contentType}, expected: application/json`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getTextFile(name) {
  const { locale } = i18n;
  const request = {
    ...endpoints.getTextFile,
    params: { name, language: locale },
  };
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then((response) => {
        if (response.headers['content-type'].includes('text/plain')) {
          resolve({ success: true, data: response.data });
        } else {
          const contentType = response.headers['content-type'];
          reject(new Error(`Invalid content-type: ${contentType}, expected: text/plain`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getImageFile(name) {
  const request = { ...endpoints.getImageFile, params: { name } };
  return new Promise((resolve, reject) => {
    api
      .request(request)
      .then((response) => {
        if (
          response.headers['content-type'].includes('application/octet-stream')
        ) {
          resolve({ success: true, data: response.data });
        } else {
          const contentType = response.headers['content-type'];
          reject(new Error(`Invalid content-type: ${contentType}, expected: application/octet-stream`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const methods = {
  getInfo: () => {
    const request = { ...endpoints.info };
    const result = getData(request);
    return result;
  },
  getLocations: () => {
    const request = { ...endpoints.locations };
    return getData(request);
  },
  getBatch: (batchID, locationCode) => {
    const request = {
      ...endpoints.getBatch,
      params: { batchID, locationCode },
    };
    return getData(request);
  },
  getBatchList: (locationCode) => {
    const request = { ...endpoints.batchlist, params: { locationCode } };
    return getData(request);
  },
  getComponents: (batchID, stageID) => {
    const request = { ...endpoints.compList, params: { batchID, stageID } };
    return getData(request);
  },
  nextProc: (postData) => {
    const request = {
      ...endpoints.nextProc,
      data: { ...postData },
    };
    return getData(request);
  },
  completeAction: (postData) => {
    const request = {
      ...endpoints.completeAction,
      data: { ...postData },
    };
    return getData(request);
  },
  confirmAction: (postData) => {
    const request = {
      ...endpoints.confirmAction,
      data: { ...postData },
    };
    return getData(request);
  },
  signAction: (postData) => {
    const request = {
      ...endpoints.signAction,
      data: { ...postData },
    };
    return getData(request);
  },
  approveAction: (postData) => {
    const request = {
      ...endpoints.approveAction,
      data: { ...postData },
    };
    return getData(request);
  },
  revertAction: (postData) => {
    const request = {
      ...endpoints.revertAction,
      data: { ...postData },
    };
    return getData(request);
  },
  testPrint: (postData) => {
    const request = {
      ...endpoints.testPrint,
      data: { ...postData },
    };
    return getData(request);
  },
  resetHardware: () => {
    const request = {
      ...endpoints.resetHardware,
    };
    return getData(request);
  },
  clearCache: () => {
    const request = {
      ...endpoints.clearCache,
    };
    return getData(request);
  },
};
