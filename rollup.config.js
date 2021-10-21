import typescript from 'rollup-plugin-typescript2';
import { eslint } from "rollup-plugin-eslint";
import cleaner from 'rollup-plugin-cleaner';
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import fs from 'fs';
import path from 'path';

// console.log('process.env =>>', process.env.TARGET, process.env.LOCALDIR, process.env.TYPES);

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified')
}

// generate *.d.ts file
const isDeclaration = process.env.TYPES !== 'false';
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const packageDirDist = !process.env.LOCALDIR ? `${packageDir}/dist` : process.env.LOCALDIR;
const name = path.basename(packageDir);

// major name
const paths = {};
const MODULE_NAME = '@monitor';
const packageDirs = fs.readdirSync(packagesDir);
packageDirs.forEach((dir) => {
  // filter hidden files
  if (dir.startsWith('.')) {
    return;
  }

  paths[`${MODULE_NAME}/${dir}`] = [`${packagesDir}/${dir}/src`];
});

const commonConfig = {
  input: `${packageDir}/src/index.ts`,
  output: {
    exports: 'auto',
  },
  plugins: [
    eslint({
      fix: true,
      exclude: 'node_modules/**'
    }),
    resolve({
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: isDeclaration,
          declarationMap: false,
          // declarationMap: isDeclaration,
          declarationDir: `${packageDirDist}/packages/`, // 类型声明文件的输出目录
          module: 'ES2015',
          paths,
        }
      },
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
    }),
  ],
};

const esmPackage = {
  ...commonConfig,
  output: {
    file: `${packageDirDist}/${name}.esm.js`,
    format: 'es',
    sourcemap: true,
    ...commonConfig.output
  },
  plugins: [
    ...commonConfig.plugins,
    // 只在首次清空目录
    cleaner({
      targets: [packageDirDist]
    }),
  ],
};

const cjsPackage = {
  ...commonConfig,
  output: {
    file: `${packageDirDist}/${name}.js`,
    format: 'cjs',
    sourcemap: true,
    minifyInternalExports: true,
    ...commonConfig.output
  },
  plugins: [...commonConfig.plugins]
};

const iifePackage = {
  ...commonConfig,
  output: {
    file: `${packageDirDist}/${name}.min.js`,
    format: 'iife',
    name: 'MONITOR',
    ...commonConfig.output
  },
  plugins: [...commonConfig.plugins, terser()]
};

// 最终配置
const resultConfig = {
  esmPackage,
  cjsPackage,
  iifePackage,
};


export default [...Object.values(resultConfig)];

