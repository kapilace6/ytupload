var sinon = require('sinon')
var chai = require('chai')
var mockfs = require('mock-fs')
var fs = require('fs')
const watchDir = require('../dir')
var expect = chai.expect

describe('watch directory for videos generated', () => {

    var watchPath = '/st/mnnss';

    beforeEach(() => {mockfs({[watchPath]: {}})})
    afterEach(mockfs.restore)

    it('should emit when .mp4 is created', () => {
        var dirSpy = sinon.spy()

        // console.log('OOO')
        // var ks = fs.readdirSync(watchPath)
        // console.log(ks)

        var wd = watchDir(watchPath)

        wd.on('add', dirSpy)
        mockfs({
            [watchPath]: {
                '124125.mp4': '# Hello world!',
            }
        });

        // console.log('OO1')
        // ks = fs.readdirSync(watchPath)
        // console.log(ks)
        
        expect(dirSpy.calledOnce).to.be.true;
    })

    it('should emit when .mov is created', () => {
        var dirSpy = sinon.spy()

        // console.log('OOO')
        // var ks = fs.readdirSync(watchPath)
        // console.log(ks)

        var wd = watchDir(watchPath)

        wd.on('add', dirSpy)
        mockfs({
            [watchPath]: {
                '124125.mov': '# Hello world!',
            }
        });

        // console.log('OO1')
        // ks = fs.readdirSync(watchPath)
        // console.log(ks)
        
        expect(dirSpy.calledOnce).to.be.true;
    })

    it('should emit when .avi is created', () => {
        var dirSpy = sinon.spy()

        // console.log('OOO')
        // var ks = fs.readdirSync(watchPath)
        // console.log(ks)

        var wd = watchDir(watchPath)

        wd.on('add', dirSpy)
        mockfs({
            [watchPath]: {
                '124125.avi': '# Hello world!',
            }
        });

        // console.log('OO1')
        // ks = fs.readdirSync(watchPath)
        // console.log(ks)
        
        expect(dirSpy.calledOnce).to.be.true;
    })

    it('should not emit when other file type is created', () => {
        var dirSpy = sinon.spy()

        // console.log('OOO')
        // var ks = fs.readdirSync(watchPath)
        // console.log(ks)

        var wd = watchDir(watchPath)

        wd.on('add', dirSpy)
        mockfs({
            [watchPath]: {
                '124125.txt': '# Hello world!',
            }
        });

        // console.log('OO1')
        // ks = fs.readdirSync(watchPath)
        // console.log(ks)
        
        expect(dirSpy.calledOnce).to.be.false;
    })
})