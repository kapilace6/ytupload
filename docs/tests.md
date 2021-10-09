## Modules
### Directory Watch
* mock-fs will be used to test the watching of the directory
* The tests will check whether only the allowed [formats](../formats.json) are being watched
* The tests will check whether the watch function returns the appropriate tags, based on the parent folder

### Video Upload
* [mocha](https://mochajs.org/) & [sinon](https://sinonjs.org/) will be used to test the upload of files
* Proper error handling of various responses will be mocked
* An integration test will be added to test the entire workflow, as described in the [working documentation](../working.md)

### References
* [Testing Frameworks Comparison](https://dev.to/heroku/comparing-the-top-3-javascript-testing-frameworks-2cco)
* [mock-fs](https://www.npmjs.com/package/mock-fs)
* [mock-fs Usage](https://www.emgoto.com/nodejs-mock-fs/)
* [Events](https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm)
* [Supported Video Formats](https://support.google.com/youtube/troubleshooter/2888402?hl=en)
* [Binary Extensions](https://github.com/sindresorhus/binary-extensions/blob/main/binary-extensions.json)
* [Globs](http://www.jedit.org/users-guide/globs.html)
* [Check Directory Exists](https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j)
* [ES6 Variable as Key](https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable)
* [invalid_grant](https://stackoverflow.com/questions/10576386/invalid-grant-trying-to-get-oauth-token-from-google)
