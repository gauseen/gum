const path = require('path');
const fs = require('fs');
const ini = require('ini');
const merge = require('lodash/merge');
const gitConfigPath = require('git-config-path');
const parse = require('parse-git-config');

const GUMRC = path.join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'], '.gumrc');

function getGumrcInfo() {
  return fs.existsSync(GUMRC) ? ini.decode(fs.readFileSync(GUMRC, 'utf-8')) : {};
}

function setGumrcInfo(finalGumrcInfo, callback) {
  fs.writeFile(GUMRC, ini.encode(finalGumrcInfo), callback);
}

function getAllConfigInfo() {
  const globalInfo = getGlobalGitUserConfig();
  const currentGumrcInfo = getGumrcInfo();
  const allInfo = merge({ global: globalInfo }, currentGumrcInfo);
  return allInfo;
}

function getUsingGitUserConfig() {
  const project = getProjectGitUserConfig() || {};
  const global = getGlobalGitUserConfig() || {};

  const name = project.name || global.name;
  const email = project.email || global.email;
  return {
    email,
    name,
  };
}

function getProjectGitUserConfig() {
  return parse.sync().user;
}

function getGlobalGitUserConfig() {
  const global = gitConfigPath('global');
  return parse.sync({ path: global }).user;
}

function getPrintTableData(data) {
  const tableData = Object.keys(data).map((groupName, index) => {
    const { name, email } = data[groupName] || {};
    return {
      ['group-name']: groupName,
      name,
      email,
    };
  });

  return tableData;
}

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
function printer(val, color) {
  const colorMap = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  };

  console.log(' ');
  console.log(`${colorMap[color]}%s\x1b[0m`, val);
}

module.exports = {
  GUMRC,
  printer,
  getPrintTableData,
  getAllConfigInfo,
  getGumrcInfo,
  setGumrcInfo,
  getUsingGitUserConfig,
  getGlobalGitUserConfig,
};
