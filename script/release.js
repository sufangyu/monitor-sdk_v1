const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const consola = require('consola')
const { getArgv, getBuildTargets, binRun } = require('./utils');


runRelease();


/**
 * 运行发布脚本
 *
 */
function runRelease() {
  const argv = getArgv();
  // 构建对象. eg: npm run dev core browser => targets = ['core', 'browser']
  const targets = argv._;
  // 构建的包. 不指定构建的目标, 则全量构建
  const packages = targets.length === 0 ? getBuildTargets() : targets;
  runBuildPackages(packages);
}


/**
 * 构建包
 *
 * @param {*} [packages=[]] 目标包队列
 */
function runBuildPackages(packages = []) {
  consola.log(`beReleasedPackages: ${packages}`);

  packages.forEach((target) => {
    publishPackage(target);
  });
}


/**
 * 发布包到 npm 上
 *
 * @param {*} target
 * @returns
 */
function publishPackage(target) {
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);
  const version = pkg.version;

  // console.log('pkgDir: ', pkgDir, version);
  if (pkg.private) {
    return;
  }

  // 从 dist 目录下执行构建
  fs.access(`${pkgDir}/dist`, fs.constants.F_OK, async (err) => {
    if (err) {
      consola.error(chalk.red(`${target} don't have dist folder`));
      return;
    }

    consola.log(`Publishing ${target}...`);

    try {
      /**
       * yarn publish --new-version version --access public
       */
      const args = [
        'publish',
        '--new-version',
        version,
        '--access',
        'public',
      ];

      console.log('yarn args', args);

      await binRun('yarn', args, { cwd: pkgDir, stdio: 'pipe' });
      consola.success(chalk.green(`Successfully published ${target}@${version}`));
    } catch (error) {
      consola.error(`Failed publish ${target}@${version}`, error);
    }

  });


}
