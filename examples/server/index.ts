import express from 'express';
import open from 'open';
import { PORT, FILE_PATHS, SERVER_URLS } from './config';

const app = express();

// 静态资源
Object.entries(FILE_PATHS).forEach(([path, resolvePath]) => {
  app.use(path, express.static(resolvePath));
});

// mock api
app.get(SERVER_URLS.normalGet, (req, res) => {
  res.send('get 正常请求响应体');
});

app.get(SERVER_URLS.exceptionGet, (req, res) => {
  res.status(500).send('get 异常响应体!!!');
});

app.post(SERVER_URLS.normalPost, (req, res) => {
  res.send('post 正常请求响应体');
});

app.post(SERVER_URLS.exceptionPost, (req, res) => {
  res.status(500).send('post 异常响应体!!!');
});

app.post(SERVER_URLS.errorsUpload, (req, res) => {
  res.send('错误上报成功');
});

const url = `http://localhost:${PORT}/js/index.html`;
app.listen(PORT, () => {
  console.log(`examples is available at: http://localhost: ${PORT}`);
  if (process.env.NODE_ENV === 'demo') {
    open(
      url, {
        app: {
          name: open.apps.chrome,
        },
      },
    );
  }
});
