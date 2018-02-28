var http = require('http');
var fs = require('fs');
var path = require('path');

var port = 8080;
var public_dir = path.join(__dirname, "public");

var mime_types = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    ico: 'image/x-icon',
    mp4: 'video/mp4'
}

var server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        var file = req.url.substring(1) || "index.html";
        var full_file = path.join(public_dir, file);
        fs.readFile(full_file, (err, data) => {
            if (err) {
                console.log("Error: cannot read " + file);
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Error: 404 Content not found');
                res.end();
            }
            else {
                var extension = path.extname(full_file).substring(1);
                var mime = mime_types[extension] || 'text/plain';
                res.writeHead(200, {'Content-Type': mime});
                res.write(data);
                res.end();
            }
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error: Only GET requests supported at this time');
        res.end();
    }
});

console.log('Now listening on port ' + port);
server.listen(port, '0.0.0.0');