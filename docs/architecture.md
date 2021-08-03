# Architecture

The app follows the **Event Pipeline Pattern**
<!-- ![EPP](../message.svg) -->

1. Source of generated files would be one of the following:
    * From Nvidia ShadowPlay
    * Copied files from a directory outside of the watch space
1. `chokidar` is used to **watch** the directory space. Returns path of generated file, along with tags for the video
    > Tags are sourced from the parent directory of generated file
1. `googleapis` is used to **upload** the video to the authenticated user's channel
1. On Video Upload Completion / Finished Processing (TBD), generated file is then **deleted** from source

<br>

## Framework
"node": "^14.17.4"
"npm": "^6.14.14"

### Dependencies
"chokidar": "^3.5.2",
"express": "^4.17.1",
"googleapis": "^81.0.0"

### Dev Dependencies
"chai": "^4.3.4",
"mocha": "^9.0.3",
"mock-fs": "^5.0.0",
"nyc": "^15.1.0",
"sinon": "^11.1.2"