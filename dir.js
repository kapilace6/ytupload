var chokidar = require('chokidar');
var watchDir = function(path) {
    console.log('caaaa')
    return chokidar.watch(path);
}

module.exports = watchDir

/**
 * Usage: node dir.js PATH_TO_FOLDER_TO_WATCH
 */
if (module === require.main) {
    const fileName = process.argv[2];

    //validate fileName for existence and permissions
    const watcher = chokidar.watch(fileName, {
        persistent: true,
        ignoreInitial: true,
        ignored: /((^|[\/\\])\..)|(node_modules)/,
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100
        },
    });

    watcher.on('add', path => {
        console.log(path)
        console.log(watcher.getWatched())
    });
}

// watcher.on('raw', (event, path, details) => {
//     console.log(event, path, details)
// });