import fs from 'fs';
import slugify from 'slugify';
import storage from '../../storage/SessionStorage';
import { FRODO_METADATA_ID } from '../../storage/StaticStorage';
import {
  encode,
  decode,
  encodeBase64Url,
  decodeBase64Url,
} from '../../api/utils/Base64';
import { printMessage } from './Console';
import { ExportMetaData } from '../OpsTypes';

export function getCurrentTimestamp() {
  const ts = new Date();
  return ts.toISOString();
}

function getMetadata(): ExportMetaData {
  const metadata: ExportMetaData = {
    origin: storage.session.getTenant(),
    originAmVersion: storage.session.getAmVersion(),
    exportedBy: storage.session.getUsername(),
    exportDate: getCurrentTimestamp(),
    exportTool: FRODO_METADATA_ID,
    exportToolVersion: storage.session.getFrodoVersion(),
  };
  return metadata;
}

/*
 * Output str in title case
 *
 * e.g.: 'ALL UPPERCASE AND all lowercase' = 'All Uppercase And All Lowercase'
 */
export function titleCase(input) {
  const str = input.toString();
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
  }
  return splitStr.join(' ');
}

export function getRealmString() {
  const realm = storage.session.getRealm();
  return realm
    .split('/')
    .reduce((result, item) => `${result}${titleCase(item)}`, '');
}

export function convertBase64TextToArray(b64text) {
  let arrayOut = [];
  let plainText = decode(b64text);
  plainText = plainText.replace(/\t/g, '    ');
  arrayOut = plainText.split('\n');
  return arrayOut;
}

export function convertBase64UrlTextToArray(b64UTF8Text) {
  let arrayOut = [];
  let plainText = decodeBase64Url(b64UTF8Text);
  plainText = plainText.replace(/\t/g, '    ');
  arrayOut = plainText.split('\n');
  return arrayOut;
}

export function convertTextArrayToBase64(textArray) {
  const joinedText = textArray.join('\n');
  const b64encodedScript = encode(joinedText);
  return b64encodedScript;
}

export function convertTextArrayToBase64Url(textArray) {
  const joinedText = textArray.join('\n');
  const b64encodedScript = encodeBase64Url(joinedText);
  return b64encodedScript;
}

// eslint-disable-next-line no-unused-vars
export function validateImport(metadata): boolean {
  return metadata || true;
}

export function getTypedFilename(name, type, suffix = 'json') {
  const slug = slugify(name.replace(/^http(s?):\/\//, ''));
  return `${slug}.${type}.${suffix}`;
}

export function saveToFile(type, data, identifier, filename) {
  const exportData = {};
  exportData['meta'] = getMetadata();
  exportData[type] = {};
  if (Array.isArray(data)) {
    data.forEach((element) => {
      exportData[type][element[identifier]] = element;
    });
  } else {
    exportData[type][data[identifier]] = data;
  }
  fs.writeFile(filename, JSON.stringify(exportData, null, 2), (err) => {
    if (err) {
      return printMessage(`ERROR - can't save ${type} to file`, 'error');
    }
    return '';
  });
}

/**
 * Save JSON object to file
 * @param {Object} data data object
 * @param {String} filename file name
 */
export function saveJsonToFile(data, filename) {
  const exportData = data;
  exportData.meta = getMetadata();
  fs.writeFile(filename, JSON.stringify(exportData, null, 2), (err) => {
    if (err) {
      return printMessage(`ERROR - can't save ${filename}`, 'error');
    }
    return '';
  });
}

/**
 * Save text data to file
 * @param {String} data text data
 * @param {String} filename file name
 */
export function saveTextToFile(data, filename) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      printMessage(`ERROR - can't save ${filename}`, 'error');
      return false;
    }
    return true;
  });
}
