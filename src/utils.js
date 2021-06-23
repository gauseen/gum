const path = require('path');
const fs = require('fs');
const ini = require('ini');
const merge = require('lodash/merge');
const gitConfigPath = require('git-config-path');
const parse = require('parse-git-config');

const GUMRC = path.join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'], '.gumrc');

function getAllConfigInfo() {
  const globalInfo = getGlobalGitUserConfig();
  const currentGumrcInfo = getGumrcInfo();
  const allInfo = merge(globalInfo, currentGumrcInfo);
  return allInfo;
}

function getGumrcInfo() {
  return fs.existsSync(GUMRC) ? ini.decode(fs.readFileSync(GUMRC, 'utf-8')) : {};
}

function setGumrcInfo(newGroup, callback) {
  const gumrcInfo = getGumrcInfo();
  const finalGumrcInfo = merge(gumrcInfo, newGroup);
  console.log('finalGumrcInfo: ', JSON.stringify(finalGumrcInfo));
  fs.writeFile(GUMRC, ini.encode(finalGumrcInfo), callback);
}

function getUsingGitUserConfig() {
  const currentProjectConfig = parse.sync();
  const config = currentProjectConfig.user || getGlobalGitUserConfig().global;
  return config;
}

function getGlobalGitUserConfig() {
  const global = gitConfigPath('global');
  return {
    global: parse.sync({ path: global }).user,
  };
}

module.exports = {
  GUMRC,
  getAllConfigInfo,
  getGumrcInfo,
  setGumrcInfo,
  getUsingGitUserConfig,
  getGlobalGitUserConfig,
};
