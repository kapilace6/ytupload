var sinon = require('sinon');
var chai = require('chai');
var mockfs = require('mock-fs');
var fs = require('fs');
const watchDir = require('../dir');
var expect = chai.expect;

describe('watch directory for videos generated', () => {

    var testDir = './testfs';
    var wD;

    //TODO: Mock Filesystem
    // beforeEach(() => {mockfs({[testDir]: { 'mnss.tt': 'I Am Here' } })})
    // afterEach(mockfs.restore)

    beforeEach(async () => {
        if(!fs.existsSync(testDir))
            fs.mkdirSync(testDir);

        wD = new watchDir(testDir);

        await new Promise(function (resolve) {
            wD.watcher.on('ready', () => resolve());
        });
    });
    afterEach(() => {
        if(fs.existsSync(testDir))
            fs.rmdirSync(testDir, { recursive: true });

        wD.watcher.close();
    })

    it.only('should emit when .mp4 is created', (done) => {
        // Should only run after when watcher is ready
        var dirSpy = sinon.spy();
        wD.watcher.on('add', dirSpy);

        fs.writeFileSync(`${testDir}/testx.mp4`, 'Did this run?');
        
        expect(dirSpy.calledOnce).to.be.true;

        expect(wD.watcher.pendingQueue).to.have.length(1);
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