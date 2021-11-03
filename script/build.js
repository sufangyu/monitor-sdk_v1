const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { getArgv, getBuildTargets, binRun } = require('./utils');


// 是否构建类型
let isBuildTypes = true;
// 是否开发模式, 开启监听
let isDevWatch = false;

runBuild();


/**
 * 运行构建脚本
 *
 */
function runBuild() {
  const argv = getArgv();
  // console.log('build.js: ', argv);
  isBuildTypes = argv.types !== 'false'
  isDevWatch = argv.watch === 'true';
  // 构建对象. eg: npm run dev core browser => targets = ['core', 'browser']
  const targets = argv._;
  // 构建的包
  const packages = targets.length === 0 ? getBuildTargets() : targets;
  runBuildPackages(packages);
}


/**
 * 构建包
 *
 * @param {*} [packages=[]] 目标包队列
 */
function runBuildPackages(packages = [], iteratorFn) {
  // console.log('runBuildPackages:', packages);
  const buildQueue = [];
  for (const item of packages) {
    const p = Promise.resolve().then(() => rollupBuild(item));
    buildQueue.push(p);
  }

  return Promise.all(buildQueue);
}


/**
 * 执行构建
 *
 * @param {*} target
 */
async function rollupBuild(target = '') {
  // console.log('rollupBuild: ', target);
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);

  if (pkg.private) {
    return;
  }

  // 构建命令行参数
  const args = [
    '-c',
    '--environment',
    [
      `TARGET:${target}`,
      `TYPES:${isBuildTypes}`,
    ].filter(Boolean).join(','),
  ];

  isDevWatch && args.push('--watch');
  await binRun('rollup', args);

  // 合并构建声明文件
  if (isBuildTypes && pkg.types) {
    console.info(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)));

    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: false
    });

    console.log('extractorResult.succeeded: ', extractorResult.succeeded);

    if (extractorResult.succeeded) {
      consola.success(chalk.green(`${target}: API Extractor completed successfully.`));
    }

    const currentTargetTempPackages = `${pkgDir}/dist/packages`;
    await fs.remove(currentTargetTempPackages);
  }
}


