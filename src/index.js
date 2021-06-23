const path = require('path');
const fs = require('fs');
const commander = require('commander');
const {
  getAllConfigInfo,
  getGumrcInfo,
  setGumrcInfo,
  getGlobalGitUserConfig,
  getUsingGitUserConfig,
} = require('./utils');
const merge = require('lodash/merge');

const program = new commander.Command('gum');

program.command('list').description('List all the user config group').action(onList);

program
  .command('add <group_name>')
  .description('Add one group for user config')
  .option('--name <user_name>', 'user name')
  .option('--email <user_email>', 'user email')
  .action(onAdd);

program.parse(process.argv);

function onList() {
  const allConfig = getAllConfigInfo();
  console.table(allConfig);
  // console.log('gitUserConfig: ', gitUserConfig);
  // const listStr = Object.keys(currentGumrcInfo).map((groupName) => {
  //   const user = currentGumrcInfo[groupName];
  //   return `${groupName} name="${user.name}" email="${user.email}" `;
  // });
}

function onAdd(groupName, options) {
  const newGroup = {
    [groupName]: options,
  };

  setGumrcInfo(newGroup, (err) => {
    if (err) {
      return;
    }
    console.log('set success');
  });
}
