import { resolve } from 'path';

// 端口
export const PORT = 2020;

// 静态资源
const resolveDirname = (target: string) => resolve(__dirname, target);
const jsFilePath = resolveDirname('../js');
// 资源包
const browserDistFilePath = resolve('./packages/browser/dist');

export const FILE_PATHS = {
  '/js': jsFilePath,

  '/browserDist': browserDistFilePath,
};


export const SERVER_URLS = {
  normalGet: '/normal',
  exceptionGet: '/exception',
  normalPost: '/normal/post',
  exceptionPost: '/exception/post',
  errorsUpload: '/errors/upload'
}