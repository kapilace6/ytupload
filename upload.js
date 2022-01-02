// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const authenticate = require('./authenticate');

// initialize the Youtube API library
const youtube = google.youtube('v3');

// very basic example of uploading a video to youtube
async function runSample(fileName) {
  // Obtain user credentials to use for the request
	const client = await authenticate();
  google.options({auth: client});

  const fileSize = fs.statSync(fileName).size;
  const res = await youtube.videos.insert(
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  ).catch(error => { console.log(error) });

  console.log('\n\n');
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  const fileName = process.argv[2];
  runSample(fileName).catch(console.error);
}

module.exports = runSample;

// Dataflow
/*
* 1. Create an event listener for chokidar with the video uploader
* 2. Video Uploader checks for client secrets.
* 3. If not available, redirect, authenticate and save client secrets
* 4. Pick client secrets and upload video for each emitted event
* 5. Delete file if flag not specified [--no-delete]
*/

// Enhancements
/*
* 1. Flag arg list
* 2. Specify bandwidth limit [--bandwidth=X(in kBps)]
* 3. Upload videos in series or parallel [--mode=<parallel,series>]
*/
