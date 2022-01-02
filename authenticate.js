"use strict";

// Returns a google client object which is authenticated
// Authentication takes place in the following JS file
// Is client_tokens.json present?

/**
 * This is used by several samples to easily provide an oauth2 workflow.
 */
const port = 3000;
const fs = require('fs');
const opn = require("open");
const path = require('path');
const http = require("http");
const url_1 = require("url");
const arrify = require("arrify");
const destroyer = require("server-destroy");
const google_auth_library_1 = require("google-auth-library");
const invalidRedirectUri = `The provided keyfile does not define a valid
redirect URI. There must be at least one redirect URI defined, and this sample
assumes it redirects to 'http://localhost:${port}/oauth2callback'.  Please edit
your keyfile, and add a 'redirect_uris' section.  For example:

"redirect_uris": [
  "http://localhost:${port}/oauth2callback"
]
`;

const options = {
    keyfilePath: path.join(__dirname, './client_secrets.json'),
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ]
};

// Parse the client secrets and scopes for authorization
function parseOptions() {
    if (!options ||
        !options.keyfilePath ||
        typeof options.keyfilePath !== 'string') {
        throw new Error('keyfilePath must be set to the fully qualified path to a GCP credential keyfile.');
    }
    options.scopes = arrify(options.scopes || []);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const keyFile = require(options.keyfilePath);
    const keys = keyFile.installed || keyFile.web;
    if (!keys.redirect_uris || keys.redirect_uris.length === 0) {
        throw new Error(invalidRedirectUri);
    }
    const redirectUri = keys.redirect_uris[keys.redirect_uris.length - 1];
    const parts = new url_1.URL(redirectUri);
    if (redirectUri.length === 0 ||
        parts.port !== port.toString() ||
        parts.hostname !== 'localhost' ||
        parts.pathname !== '/oauth2callback') {
        throw new Error(invalidRedirectUri);
    }

    // create an oAuth client to authorize the API call
    const client = new google_auth_library_1.OAuth2Client({
        clientId: keys.client_id,
        clientSecret: keys.client_secret,
        redirectUri,
    });

    return client;
}

// Open an http server to accept the oauth callback. In this
// simple example, the only request to our webserver is to
// /oauth2callback?code=<code>
async function authenticate() {
    const client = parseOptions();    

    // grab the url that will be used for authorization
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: options.scopes.join(' '),
    });
    return new Promise((resolve, reject) => {
        // If client token exists
        if(fs.existsSync('./client_tokens.json')) {
            const tokens = require('./client_tokens.json');
            client.credentials = tokens;

            console.log("Existing Client Token found");
            resolve(client);
        }
        else {
            // else if token does not exist, authenticate and save token
            const server = http
            .createServer(async (req, res) => {
                try {
                    if (req.url.indexOf('/oauth2callback') > -1) {
                        const qs = new url_1.URL(req.url, `http://localhost:${port}`).searchParams;
                        res.end('Authentication successful! Please return to the console.');
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        server.destroy();

                        const { tokens } = await client.getToken(qs.get('code'));
                        tokens.code = qs.get('code');
                        client.credentials = tokens;

                        // Save client token
                        fs.writeFile("./client_tokens.json", JSON.stringify(tokens), (err) => {
                            if(err)
                                console.error(err);
                            else
                                console.log("Client Token saved successfully");
                        })

                        resolve(client);
                    }
                }
                catch (e) {
                    reject(e);
                }
            })
            .listen(port, () => {
                // open the browser to the authorize url to start the workflow
                opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
            });
            destroyer(server);
        }
    });
}

// Call function with await to get client object
module.exports = authenticate;