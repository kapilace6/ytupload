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
    const dirName = process.argv[2];
    watch(dirName);
}

function watch(dir)
{
    this.watchDir = dir;
    this.pendingQueue = [];
    this.workingFile = '';

    //check if have read, write, delete permissions on directory

    this.watcher = chokidar.watch(this.watchDir, {
        persistent: true,
        ignoreInitial: true,
        ignored: /((^|[\/\\])\..)|(node_modules)/,
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100
        },
    });

    this.watcher.on('ready', () => console.log(`Ready to rock with ${this.watchDir}`))
    this.watcher.on('add', path => {
        console.log(`${path} file is added to the Pending Queue`)
        //console.log(this.watcher.getWatched())

        this.pendingQueue.push(path)
    });
}

module.exports = watch;

// watcher.on('raw', (event, path, details) => {
//     console.log(event, path, details)
// });