import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import { MODES } from '@pollyjs/utils';
import { LogLevelDesc } from 'loglevel';
import pollyJest from 'setup-polly-jest';

import { state } from '../index';
import { getTokens } from '../ops/AuthenticateOps';
import { decode, encode, isBase64Encoded } from './Base64Utils';

const { setupPolly } = pollyJest;

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

let recordIfMissing = false;
let mode = MODES.REPLAY;

// resolve "/home/sandeepc/work/ForgeRock/sources/frodo-lib/esm/api" to
// "/home/sandeepc/work/ForgeRock/sources/frodo-lib/src/test/recordings"
const recordingsDir = __dirname.replace(
  /^(.*\/frodo-\w{3})(.*)$/gi,
  '$1/src/test/mock-recordings'
);

switch (process.env.FRODO_POLLY_MODE) {
  // record mock responses from a real env: `npm run test:record`
  case 'record': {
    state.setHost(
      process.env.FRODO_HOST || 'https://openam-frodo-dev.forgeblocks.com/am'
    );
    state.setRealm(process.env.FRODO_REALM || 'alpha');
    if (!(await getTokens({ forceLoginAsUser: false, state })))
      throw new Error(
        `Unable to record mock responses from '${state.getHost()}'`
      );
    mode = MODES.RECORD;
    recordIfMissing = true;
    break;
  }
  // record mock responses from authentication APIs (don't authenticate): `npm run test:record_noauth`
  case 'record_noauth':
    mode = MODES.RECORD;
    recordIfMissing = true;
    break;
  // replay mock responses: `npm test`
  default:
    state.setHost(
      process.env.FRODO_HOST || 'https://openam-frodo-dev.forgeblocks.com/am'
    );
    state.setRealm(process.env.FRODO_REALM || 'alpha');
    state.setCookieName('cookieName');
    state.setUserSessionTokenMeta({
      tokenId: 'cookieValue',
      realm: '/realm',
      successUrl: 'url',
      expires: 0,
    });
    break;
}

export function defaultMatchRequestsBy() {
  return {
    method: true,
    headers: false, // do not match headers, because "Authorization" header is sent only at recording time
    body: true,
    order: false,
    url: {
      protocol: true,
      username: false,
      password: false,
      hostname: false, // we will record from different envs but run tests always against `frodo-dev`
      port: false,
      pathname: true,
      query: true,
      hash: true,
    },
  };
}

export function filterRecording(recording: {
  request: {
    headers: [{ name: string; value: string }];
    postData: { text: any };
  };
  response: { content: { mimeType: string; text: any } };
}) {
  // request headers
  if (recording.request?.headers) {
    const headers: [{ name: string; value: string }] =
      recording.request.headers;
    headers.map((header) => {
      if (header.name.toUpperCase() === 'AUTHORIZATION') {
        if (isBase64Encoded(header.value)) {
          header.value = encode('username:password');
        } else {
          header.value = header.value.replace(
            /Bearer .+/,
            'Bearer <bearer token>'
          );
        }
      }
      if (header.name.toUpperCase() === 'X-API-KEY') {
        header.value = '<api key>';
      }
      if (header.name.toUpperCase() === 'X-API-SECRET') {
        header.value = '<api secret>';
      }
    });
    recording.request.headers = headers;
  }

  // request post body
  if (recording.request?.postData?.text) {
    let body = recording.request.postData.text;
    body = body.replace(/assertion=.+?&/, 'assertion=<assertion jwt token>&');
    recording.request.postData.text = body;
  }

  // response body
  if (recording.response?.content?.text) {
    let body = recording.response.content.text;
    // JSON content
    if (
      recording.response.content.mimeType === 'application/json;charset=UTF-8'
    ) {
      try {
        const json = JSON.parse(body);
        if (json['access_token']) json['access_token'] = '<access token>';
        if (json['id_token']) json['id_token'] = '<id token>';
        if (json.accessKey) json.accessKey = '<access key>';
        if (json.result) {
          for (const obj of json.result) {
            // check for scripts
            if (obj.script) {
              try {
                let script = decode(obj.script);
                script = script.replace(
                  /(var .*?(?:Sid|sid|Secret|secret|PhoneNumberFrom) = (?:"|'))(.*?)((?:"|'))/g,
                  '$1<secret>$3'
                );
                obj.script = encode(script);
              } catch (error) {
                //
              }
            }
          }
        }
        body = JSON.stringify(json);
      } catch (error) {
        // ignore
      }
    }
    // Text and XML content
    if (recording.response.content.mimeType === 'text/xml;charset=utf-8') {
      try {
        body = body.replace(
          /<ds:X509Certificate>.+?<\/ds:X509Certificate>/gs,
          `<ds:X509Certificate>${encode('<certificate>')}</ds:X509Certificate>`
        );
      } catch (error) {
        // ignore
      }
    }
    recording.response.content.text = body;
  }
}

export function autoSetupPolly(matchRequestsBy = defaultMatchRequestsBy()) {
  return setupPolly({
    adapters: ['node-http'],
    mode,
    recordIfMissing,
    flushRequestsOnStop: true,
    logLevel: (process.env.FRODO_POLLY_LOG_LEVEL as LogLevelDesc) || 'warn',
    recordFailedRequests: true,
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir,
      },
    },
    matchRequestsBy,
  });
}
