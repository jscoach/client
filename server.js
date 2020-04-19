const path = require('path');
const express = require('express');
const compression = require('compression');
const next = require('next');
const LRUCache = require('lru-cache');
const {parse} = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7D
});

const cachedRender = (req, res, pagePath, queryParams) => {
  try {
    const key = `${req.url}`;

    if (!dev && ssrCache.has(key)) {
      res.append('X-Cache', 'HIT');
      res.send(ssrCache.get(key));
      return;
    }

    app
      .renderToHTML(req, res, pagePath, queryParams)
      .then(html => {
        ssrCache.set(key, html);

        res.append('X-Cache', 'MISS');
        res.send(html);
      })
      .catch(err => {
        app.renderError(err, req, res, pagePath, queryParams);
      });
  } catch (e) {
    console.log('error: ', e)
  }
};

app.prepare()
  .then(() => {
    const server = express();
    server.disable('x-powered-by');
    server.use(compression());


    server.get('/robots.txt', (req, res) => (
      res.status(200).sendFile('robots.txt', {
        root: path.join(__dirname, '/static'),
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        }
      })
    ));

    server.get('/service-worker.js', (req, res) => (
      res.status(200).sendFile('service-worker.js', {
        root: path.join(__dirname, '/.next'),
      })
    ));

    server.get('/sitemap.xml', (req, res) => (
      res.status(200).sendFile('sitemap.xml', {
        root: path.join(__dirname, '/static'),
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
        }
      })
    ));

    server.get('/package/:package_user/:package_name*?', (req, res) => {
      const {package_name, package_user} = req.params;
      cachedRender(req, res, '/package', {
        package_name: package_name || package_user,
        ...package_name && {package_user: package_user}
      })
    });

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });


    server.use(
      '/static',
      express.static('./static', {
        maxage: '48h',
        index: false,
        redirect: false,
      })
    );

    server.listen(3000, (err) => {
      if (err) throw err;

      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1)
  });
