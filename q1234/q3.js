const http = require('http');
const fs = require('fs');

function getValueSum(filepath, res) {
  fs.readFile(filepath, "utf8", function (err, data) {
    let sum = 0;
    for (const line of data.split('\n').slice(1)) {
      if (line.split(',').length === 3) {
        const val = Number(line.split(',')[2]);
        sum += val;
      }
    }
    res.write(String(sum));
    return res.end();
  })
}
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  getValueSum('testfile.csv', res);
}).listen(8080);