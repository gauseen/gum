const path = require('path');
const shell = require('shelljs');
const commander = require('commander');
const merge = require('lodash/merge');
const { Table } = require('console-table-printer');
const {
  printer,
  getPrintTableData,
  getAllConfigInfo,
  getGumrcInfo,
  setGumrcInfo,
  getGlobalGitUserConfig,
  getUsingGitUserConfig,
} = require('./utils');
const { option } = require('commander');

const program = new commander.Command('gum');

program.command('list').description('List all the user config group').action(onList);

program
  .command('set <group-name>')
  .description('Set one group for user config')
  .option('--name <user-name>', 'user name')
  .option('--email <user-email>', 'user email')
  .action(onSet);

program
  .command('use <group-name>')
  .description('Set one group for user config')
  .option('--global', 'git config --global')
  .action(onUse);

program.command('delete <group-name>').description('Delete one group').action(onDelete);

program.parse(process.argv);

function onList() {
  const allConfig = getAllConfigInfo();
  const using = getUsingGitUserConfig();
  const tableData = getPrintTableData(allConfig);

  // currently used user info
  printer(`Currently used name=${using.name} email=${using.email}`, 'yellow');

  // git user config group list
  const pt = new Table();
  pt.addRows(tableData, { color: 'cyan' });
  pt.printTable();
}

function onSet(groupName, options) {
  const newGroup = {
    [groupName]: options,
  };

  if (!options.name && !options.email) {
    printer(`Name and Email option must have one`, 'red');
    return process.exit(1);
  }

  const gumrcInfo = getGumrcInfo();
  const finalGumrcInfo = merge(gumrcInfo, newGroup);

  setGumrcInfo(finalGumrcInfo, (err) => {
    if (err) {
      return process.exit(1);
    }
    printer(`set ${groupName} group success`, 'green');
  });
}

function onUse(groupName, options) {
  const allConfigInfo = getAllConfigInfo();
  const user = allConfigInfo[groupName];

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  if (user) {
    const g = options.global ? `--global` : '';

    if (shell.exec(`git config ${g} user.name ${user.name}`).code !== 0) {
      shell.echo('Error: Git config user.name failed');
    }
    if (shell.exec(`git config ${g} user.email ${user.email}`).code !== 0) {
      shell.echo('Error: Git config user.email failed');
    }

    const using = getUsingGitUserConfig();

    if (options.global) {
      const globalGitUser = getGlobalGitUserConfig();
      printer(`Global using name=${globalGitUser.name} email=${globalGitUser.email}`, 'green');
    }

    printer(`Currently used name=${using.name} email=${using.email}`, 'yellow');
  } else {
    printer(`${groupName} group name invalid`, 'red');
  }
}

function onDelete(groupName) {
  const gumrcInfo = getGumrcInfo();
  gumrcInfo[groupName] && delete gumrcInfo[groupName];

  setGumrcInfo(gumrcInfo, (err) => {
    if (err) {
      return process.exit(1);
    }
    printer(`delete ${groupName} group success`, 'green');
  });
}
