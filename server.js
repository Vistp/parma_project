import { createServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  // Создание Vite сервера
  const vite = await createViteServer({
    server: { middlewareMode: true }
  });

  // HTTPS конфигурация
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/gas.freemyip.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/gas.freemyip.com/fullchain.pem'),
  };

  // Создание HTTP сервера
  const httpServer = createServer(vite.middlewares);
  httpServer.listen(80, () => {
    console.log('HTTP сервер запущен на порту 80');
  });

  // Создание HTTPS сервера
  const httpsServer = createHttpsServer(httpsOptions, vite.middlewares);
  httpsServer.listen(443, () => {
    console.log('HTTPS сервер запущен на порту 443');
  });
}

startServer();