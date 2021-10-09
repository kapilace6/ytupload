var chokidar = require('chokidar');
var watchDir = function(path) {
    console.log('caaaa')
    return chokidar.watch(path);
}

module.exports = watchDir
const watcher = chokidar.watch('.', {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 20000,
        pollInterval: 10000
    },
    cwd: '.'
});

watcher.on('add', (event, path) => {
    console.log(event, path)
});

console.log(watcher.getWatched());