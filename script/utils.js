const fs = require('fs');
const path = require('path');
const execa = require('execa');
const consola = require('consola');
const chalk = require('chalk');

/**
 * 获取命令行参数
 *
 * @returns
 */
function getArgv() {
  const argv = require('minimist')(process.argv.slice(2));
  return argv;
}

const stepLog = (msg) => consola.info(chalk.cyan(msg));
const errLog = (msg) => consola.error(chalk.red(msg));


/**
 * 获取构建目标
 *
 * @returns
 */
function getBuildTargets() {
  const packages = fs.readdirSync('packages');
  const buildTargets = packages.filter((name) => {
    const isDirectory = fs.statSync(`packages/${name}`).isDirectory();
    if (!isDirectory) {
      return false;
    }

    const pkg = require(`../packages/${name}/package.json`);
    if (pkg.private && !pkg.buildOptions) {
      return false;
    }
    return true;
  });

  return buildTargets;
}


/**
 * 执行 shell 脚本
 *
 * @param {string} [bin='']
 * @param {*} args
 * @param {*} [options={}]
 */
const binRun = (bin = '', args, options = {}) => execa(bin, args, { stdio: 'inherit', ...options });


module.exports = {
  getArgv,
  stepLog,
  errLog,
  getBuildTargets,
  binRun,
};
