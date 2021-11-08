import express from 'express';
import open from 'open';
import { PORT, FILE_PATHS } from './config';

const app = express();

// 静态资源
Object.entries(FILE_PATHS).forEach(([path, resolvePath]) => {
  app.use(path, express.static(resolvePath));
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
