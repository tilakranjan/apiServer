"use strict";
/**
* @author Tilak
* @description calling db server
*/
const request = require("request");
const config = require("../src/config.js")
const uri = config.dbServer
module.exports = {
  save: (data, callback) => {
    httpPostCall(uri + "save", data, (error, response) => {
      callback(error, response);
    });
  },
  update: (data, callback) => {
    httpPostCall(uri + "update", data, (error, response) => {
      callback(error, response);
    });
  },
  checkAndSave: (data, callback) => {
    httpPostCall(uri + "checKAndSave", data, (error, response) => {
      callback(error, response);
    });
  },
  mCount: (data, callback) => {
    httpPostCall(uri + "mCount", data, (error, response) => {
      callback(error, response);
    });
  },
  mSave: (data, callback) => {
    httpPostCall(uri + "mSave", data, (error, response) => {
      callback(error, response);
    });
  },
  fetch: (data, callback) => {
    httpPostCall(uri + "fetch", data, (error, response) => {
      callback(error, response);
    });
  },
  records: (data, callback) => {
    httpPostCall(uri + "records", data, (error, response) => {
      callback(error, response);
    });
  },
  one: (data, callback) => {
    httpPostCall(uri + "one", data, (error, response) => {
      callback(error, response)
    });
  },
  docs: (data, callback) => {
    httpPostCall(uri + 'docs', data, (error, response) => {
      callback(error, response);
    });
  },
  nextId: (data, callback) => {
    httpPostCall(uri + 'nextId', data, (error, response) => {
      callback(error, response);
    });
  },
  updateOne: (data, callback) => {
    httpPostCall(uri + 'updateOne', data, (error, response) => {
      callback(error, response);
    });
  },
  updateAll: (data, callback) => {
    httpPostCall(uri + 'updateAll', data, (error, response) => {
      callback(error, response);
    });
  },
  distinct: (data, callback) => {
    httpPostCall(uri + 'distinct', data, (error, response) => {
      callback(error, response);
    });
  }
}

let httpPostCall = (url, data, callback) => {
  request({
    url: url,
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
    time: true
  }, (error, response, body) => {
    if (!error && body) {
      //parse body and check for any parse error
      let parsedData = parseData(body)
      if (parsedData)
      return callback(null, parsedData)
      return callback({ status: "parse Error" }, null);
    }
    return callback(error, null)
  })
}

let parseData = (data) => {
  try {
    let parsedData = JSON.parse(data);
    return parsedData;
  } catch (e) {
    return null
  }
}
