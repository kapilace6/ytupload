var sinon = require('sinon')
var chai = require('chai')
var mockfs = require('mock-fs')
var fs = require('fs')
const watchDir = require('../dir')
var expect = chai.expect

describe('watch directory for videos generated', () => {

    var testDir = './testfs';
    var watcher;

    //TODO: Mock Filesystem
    // beforeEach(() => {mockfs({[testDir]: { 'mnss.tt': 'I Am Here' } })})
    // afterEach(mockfs.restore)

    beforeEach(() => {
        fs.mkdirSync(testDir)
        watcher = watchDir(testDir)
    });
    afterEach(() => {
        if(fs.existsSync(testDir))
            fs.rmdirSync(testDir, { recursive: true })

        watcher.close()
    })

    it('should emit when .mp4 is created', () => {
        //Should only run after when watcher is ready

        var dirSpy = sinon.spy()
        watcher.on('add', dirSpy)

        fs.writeFileSync(`${testDir}/testx.mp4`, 'Did this run?')
        
        expect(dirSpy.calledOnce).to.be.true;

        //TODO: Should add to pendingQueue
    })

    it('should emit when .mov is created', () => {
        var dirSpy = sinon.spy()
        var wd = watchDir(testDir)

        wd.on('add', dirSpy)
        mockfs({
            [testDir]: {
                '124125.mov': '# Hello world!',
            }
        });
        
        expect(dirSpy.calledOnce).to.be.true;
    })

    it('should emit when .avi is created', () => {
        var dirSpy = sinon.spy()
        var wd = watchDir(testDir)

        wd.on('add', dirSpy)
        mockfs({
            [testDir]: {
                '124125.avi': '# Hello world!',
            }
        });
        
        expect(dirSpy.calledOnce).to.be.true;
    })

    it('should not emit when other file type is created', () => {
        var dirSpy = sinon.spy()

        // console.log('OOO')
        // var ks = fs.readdirSync(testDir)
        // console.log(ks)

        var wd = watchDir(testDir)

        wd.on('add', dirSpy)
        mockfs({
            [testDir]: {
                '124125.txt': '# Hello world!',
            }
        });

        // console.log('OO1')
        // ks = fs.readdirSync(testDir)
        // console.log(ks)
        
        expect(dirSpy.calledOnce).to.be.false;
    })
})