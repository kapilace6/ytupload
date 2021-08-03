var chokidar = require('chokidar');
var watchDir = function(path) {
    console.log('caaaa')
    return chokidar.watch(path);
}

module.exports = watchDir