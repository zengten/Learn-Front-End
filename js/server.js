var http = require('http');

var s = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello\n');
    setTimeout(function() {
        res.end(' World\n');
    }, 5000);
});

s.listen(8080);

console.log('Server running on http://localhost:8080/');