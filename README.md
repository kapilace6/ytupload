# YouTube Upload Automation Script

## Overview

This is a **Server-Side Application**, intended to automate upload of generated videos to *YouTube*. 

>The app watches a *Directory*, looking for any videos that have been created. The app then proceeds to upload it to the authenticated user's youtube channel.
>
>Post the upload, the application verifies the integrity of the upload, and then deletes the video from the directory. 

<br>

## Aim

Personal Project to learn and adopt [***Test-Driven Development***](https://en.wikipedia.org/wiki/Test-driven_development) as a programming methodology.
![TDD](https://miro.medium.com/max/700/1*tZSwCigaTaJdovyWlp5uBQ.jpeg)
<br><br>

## Documentation
* [Architecture](./docs/architecture.md)
* [Tests](./docs/tests.md)

### References
* [`googleapis` NPM Package](https://www.npmjs.com/package/googleapis)
* [`chokidar` NPM Package](https://www.npmjs.com/package/chokidar)
* [Testing Frameworks Comparison](https://dev.to/heroku/comparing-the-top-3-javascript-testing-frameworks-2cco)
* [OAuth2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
* [YouTube Data API Documentation](https://developers.google.com/youtube/v3/docs/videos/insert)
* [Google API Node.js Client Samples](https://github.com/googleapis/google-api-nodejs-client)
* [YouTube Data API v3 - Making Requests](https://www.youtube.com/watch?v=QZ4BXGgmATU&t=560s)
* [*Coding Shiksha* Sample](https://codingshiksha.com/javascript/node-js-express-youtube-data-api-v3-upload-video-to-youtube-in-javascript-full-project-for-beginners/)
