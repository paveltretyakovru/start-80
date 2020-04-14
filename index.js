const fs = require('fs');
const http = require('http');
const getIp = require('./shared/get-ip');

const host = (() => {
  let host = '127.0.0.1';

  const ips = getIp();
  if (Array.isArray(ips) && ips.length > 0) {
    host = ips[ips.length - 1];
  }

  return host;
})();

// Declare constants
const port = 80;
const indexFile = './shared/index.html';

const requestHandler = (request, response) => {
  try {
    console.log(request.url);
    const indexContent = fs.readFileSync(indexFile, { encoding: 'UTF-8' });

    response.end(indexContent);
  } catch (error) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(error.message);
  }
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server is listening on http://${host}:${port}`);
});