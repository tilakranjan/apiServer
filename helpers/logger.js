'use strict';
/**
 * @description for helping functions
 * @author Tilak
 * @since MArch 19, 2019
 */

const moment = require ('moment')
  ,path = require ('path')
  ,fs = require ('fs')

module.exports = {

  logWriter: (data, filename, folderName, append) => {
    if (typeof data === 'object') {
      data = JSON.stringify (data);
    }
    let logPath = module.exports.createLogFolder (folderName);
    var currentDate = moment ().format ('DD-MM-YYYY');
    logPath = logPath + filename + '.log';
    if (append) {
      var newData = '\n' + data;
      fs.appendFile (logPath, newData);
    } else {
      fs.writeFileSync (logPath, data);
    }
  },

  createLogFolder: folderName => {
    var currentDate = moment ().format ('DD-MM-YYYY');
    var logPathDir = path.join (__dirname, '../../SERVER_LOGS');
    if (!fs.existsSync (logPathDir)) {
      fs.mkdirSync (logPathDir);
    }
    logPathDir = path.join (logPathDir + '/' + currentDate);
    if (!fs.existsSync (logPathDir)) {
      fs.mkdirSync (logPathDir);
    }
    logPathDir = path.join (logPathDir + '/' + folderName);
    if (!fs.existsSync (logPathDir)) {
      fs.mkdirSync (logPathDir);
    }
    return logPathDir + '/';
  }

}
