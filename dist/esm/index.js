var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports, module) {
    "use strict";
    module.exports = function required(port2, protocol) {
      protocol = protocol.split(":")[0];
      port2 = +port2;
      if (!port2)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port2 !== 80;
        case "https":
        case "wss":
          return port2 !== 443;
        case "ftp":
          return port2 !== 21;
        case "gopher":
          return port2 !== 70;
        case "file":
          return false;
      }
      return port2 !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode2(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode2(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode2(part[1]), value = decode2(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode2(key);
          value = encode2(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports, module) {
    "use strict";
    var required = require_requires_port();
    var qs3 = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port2 = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url2) {
        return isSpecial(url2.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve2(relative, base) {
      if (relative === "")
        return base;
      var path5 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path5.length, last = path5[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path5[i] === ".") {
          path5.splice(i, 1);
        } else if (path5[i] === "..") {
          path5.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0)
            unshift = true;
          path5.splice(i, 1);
          up--;
        }
      }
      if (unshift)
        path5.unshift("");
      if (last === "." || last === "..")
        path5.push("");
      return path5.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url2 = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs3.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url2.slashes = extracted.slashes || relative && location.slashes;
      url2.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url2.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url2);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url2[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url2[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url2[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url2[key] = index[1];
          address = address.slice(0, index.index);
        }
        url2[key] = url2[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url2[key] = url2[key].toLowerCase();
      }
      if (parser)
        url2.query = parser(url2.query);
      if (relative && location.slashes && url2.pathname.charAt(0) !== "/" && (url2.pathname !== "" || location.pathname !== "")) {
        url2.pathname = resolve2(url2.pathname, location.pathname);
      }
      if (url2.pathname.charAt(0) !== "/" && isSpecial(url2.protocol)) {
        url2.pathname = "/" + url2.pathname;
      }
      if (!required(url2.port, url2.protocol)) {
        url2.host = url2.hostname;
        url2.port = "";
      }
      url2.username = url2.password = "";
      if (url2.auth) {
        index = url2.auth.indexOf(":");
        if (~index) {
          url2.username = url2.auth.slice(0, index);
          url2.username = encodeURIComponent(decodeURIComponent(url2.username));
          url2.password = url2.auth.slice(index + 1);
          url2.password = encodeURIComponent(decodeURIComponent(url2.password));
        } else {
          url2.username = encodeURIComponent(decodeURIComponent(url2.auth));
        }
        url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
      }
      url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
      url2.href = url2.toString();
    }
    function set(part, value, fn) {
      var url2 = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs3.parse)(value);
          }
          url2[part] = value;
          break;
        case "port":
          url2[part] = value;
          if (!required(value, url2.protocol)) {
            url2.host = url2.hostname;
            url2[part] = "";
          } else if (value) {
            url2.host = url2.hostname + ":" + value;
          }
          break;
        case "hostname":
          url2[part] = value;
          if (url2.port)
            value += ":" + url2.port;
          url2.host = value;
          break;
        case "host":
          url2[part] = value;
          if (port2.test(value)) {
            value = value.split(":");
            url2.port = value.pop();
            url2.hostname = value.join(":");
          } else {
            url2.hostname = value;
            url2.port = "";
          }
          break;
        case "protocol":
          url2.protocol = value.toLowerCase();
          url2.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url2[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url2[part] = value;
          }
          break;
        case "username":
        case "password":
          url2[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url2.username = value.slice(0, index);
            url2.username = encodeURIComponent(decodeURIComponent(url2.username));
            url2.password = value.slice(index + 1);
            url2.password = encodeURIComponent(decodeURIComponent(url2.password));
          } else {
            url2.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4])
          url2[ins[1]] = url2[ins[1]].toLowerCase();
      }
      url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
      url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
      url2.href = url2.toString();
      return url2;
    }
    function toString2(stringify3) {
      if (!stringify3 || "function" !== typeof stringify3)
        stringify3 = qs3.stringify;
      var query, url2 = this, host = url2.host, protocol = url2.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url2.protocol && url2.slashes || isSpecial(url2.protocol) ? "//" : "");
      if (url2.username) {
        result += url2.username;
        if (url2.password)
          result += ":" + url2.password;
        result += "@";
      } else if (url2.password) {
        result += ":" + url2.password;
        result += "@";
      } else if (url2.protocol !== "file:" && isSpecial(url2.protocol) && !host && url2.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port2.test(url2.hostname) && !url2.port) {
        host += ":";
      }
      result += host + url2.pathname;
      query = "object" === typeof url2.query ? stringify3(url2.query) : url2.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url2.hash)
        result += url2.hash;
      return result;
    }
    Url.prototype = { set, toString: toString2 };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs3;
    module.exports = Url;
  }
});

// src/ops/AdminOps.ts
import fs2 from "fs";
import path2 from "path";
import { URL as URL2 } from "url";
import util10 from "util";
import { v4 as uuidv43 } from "uuid";

// src/api/AuthenticateApi.ts
import util from "util";

// src/shared/Constants.ts
var DEFAULT_REALM_KEY = "__default__realm__";
var CLASSIC_DEPLOYMENT_TYPE_KEY = "classic";
var CLOUD_DEPLOYMENT_TYPE_KEY = "cloud";
var FORGEOPS_DEPLOYMENT_TYPE_KEY = "forgeops";
var DEPLOYMENT_TYPES = [
  CLASSIC_DEPLOYMENT_TYPE_KEY,
  CLOUD_DEPLOYMENT_TYPE_KEY,
  FORGEOPS_DEPLOYMENT_TYPE_KEY
];
var DEPLOYMENT_TYPE_REALM_MAP = {
  [CLASSIC_DEPLOYMENT_TYPE_KEY]: "/",
  [CLOUD_DEPLOYMENT_TYPE_KEY]: "alpha",
  [FORGEOPS_DEPLOYMENT_TYPE_KEY]: "/"
};
var FRODO_METADATA_ID = "frodo";
var FRODO_CONNECTION_PROFILES_PATH_KEY = "FRODO_CONNECTION_PROFILES_PATH";
var FRODO_MASTER_KEY_PATH_KEY = "FRODO_MASTER_KEY_PATH";
var FRODO_MASTER_KEY_KEY = "FRODO_MASTER_KEY";
var FRODO_TOKEN_CACHE_PATH_KEY = "FRODO_TOKEN_CACHE_PATH";
var Constants_default = {
  DEFAULT_REALM_KEY,
  CLASSIC_DEPLOYMENT_TYPE_KEY,
  CLOUD_DEPLOYMENT_TYPE_KEY,
  FORGEOPS_DEPLOYMENT_TYPE_KEY,
  DEPLOYMENT_TYPES,
  DEPLOYMENT_TYPE_REALM_MAP,
  FRODO_METADATA_ID,
  FRODO_CONNECTION_PROFILES_PATH_KEY,
  FRODO_MASTER_KEY_PATH_KEY,
  FRODO_MASTER_KEY_KEY,
  FRODO_TOKEN_CACHE_PATH_KEY
};

// src/utils/ForgeRockUtils.ts
var ForgeRockUtils_default = (state2) => {
  return {
    applyNameCollisionPolicy(name2) {
      return applyNameCollisionPolicy(name2);
    },
    getRealmPath(realm) {
      return getRealmPath(realm);
    },
    getCurrentRealmPath() {
      return getCurrentRealmPath(state2);
    },
    getCurrentRealmName() {
      return getCurrentRealmName(state2);
    },
    getCurrentRealmManagedUser() {
      return getCurrentRealmManagedUser({ state: state2 });
    },
    getRealmName(realm) {
      return getRealmName(realm);
    },
    getHostBaseUrl(url2) {
      return getHostBaseUrl(url2);
    }
  };
};
function applyNameCollisionPolicy(name2) {
  const capturingRegex = /(.* - imported) \(([0-9]+)\)/;
  const found = name2.match(capturingRegex);
  if (found && found.length > 0 && found.length === 3) {
    return `${found[1]} (${parseInt(found[2], 10) + 1})`;
  }
  return `${name2} - imported (1)`;
}
function getRealmPath(realm) {
  if (!realm)
    realm = "/";
  if (realm.startsWith("/")) {
    realm = realm.substring(1);
  }
  const elements = ["root"].concat(
    realm.split("/").filter((element) => element !== "")
  );
  const realmPath = `/realms/${elements.join("/realms/")}`;
  return realmPath;
}
function getCurrentRealmPath(state2) {
  return getRealmPath(state2.getRealm());
}
function getCurrentRealmName(state2) {
  const realm = state2.getRealm();
  const components = realm.split("/");
  let realmName = "/";
  if (components.length > 0 && realmName !== realm) {
    realmName = components[components.length - 1];
  }
  return realmName;
}
function getCurrentRealmManagedUser({
  state: state2
}) {
  let realmManagedUser = "user";
  if (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY) {
    realmManagedUser = `${getCurrentRealmName(state2)}_user`;
  }
  return realmManagedUser;
}
function getRealmName(realm) {
  const components = realm.split("/");
  let realmName = "/";
  if (components.length > 0 && realmName !== realm) {
    realmName = components[components.length - 1];
  }
  return realmName;
}
function getHostBaseUrl(url2) {
  const parsedUrl = new URL(url2);
  return `${parsedUrl.protocol}//${parsedUrl.host}`;
}

// src/api/BaseApi.ts
import Agent from "agentkeepalive";
import axios from "axios";
import axiosRetry from "axios-retry";
import { randomUUID } from "crypto";
import HttpsProxyAgent from "https-proxy-agent";

// src/ext/axios-curlirize/lib/CurlHelper.ts
var CurlHelper = class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request;
  constructor(config) {
    this.request = config;
  }
  getHeaders() {
    let headers = this.request.headers, curlHeaders = "";
    if (headers.hasOwnProperty("common")) {
      headers = this.request.headers[this.request.method];
    }
    for (const property in this.request.headers) {
      if (!["common", "delete", "get", "head", "patch", "post", "put"].includes(
        property
      )) {
        headers[property] = this.request.headers[property];
      }
    }
    for (const property in headers) {
      const header = `${property}:${headers[property]}`;
      curlHeaders = `${curlHeaders} -H "${header}"`;
    }
    return curlHeaders.trim();
  }
  getMethod() {
    return `-X ${this.request.method.toUpperCase()}`;
  }
  getBody() {
    if (typeof this.request.data !== "undefined" && this.request.data !== "" && this.request.data !== null && this.request.method.toUpperCase() !== "GET") {
      const data = typeof this.request.data === "object" || Object.prototype.toString.call(this.request.data) === "[object Array]" ? JSON.stringify(this.request.data) : this.request.data;
      return `--data '${data}'`.trim();
    } else {
      return "";
    }
  }
  getUrl() {
    if (this.request.baseURL) {
      return this.request.baseURL + "/" + this.request.url;
    }
    return this.request.url;
  }
  getQueryString() {
    let params = "", i = 0;
    for (const param in this.request.params) {
      params += i !== 0 ? `&${param}=${this.request.params[param]}` : `?${param}=${this.request.params[param]}`;
      i++;
    }
    return params;
  }
  getBuiltURL() {
    let url2 = this.getUrl();
    if (this.getQueryString() !== "") {
      url2 = url2.charAt(url2.length - 1) === "/" ? url2.substr(0, url2.length - 1) : url2;
      url2 += this.getQueryString();
    }
    return url2.trim();
  }
  generateCommand() {
    return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} "${this.getBuiltURL()}"`.trim().replace(/\s{2,}/g, " ");
  }
};

// src/ext/axios-curlirize/curlirize.ts
function defaultLogCallback(curlResult, err = void 0) {
  const { command } = curlResult;
  if (err) {
    console.error(err);
  } else {
    console.info(command);
  }
}
var curlirize_default = (instance, callback = defaultLogCallback) => {
  instance.interceptors.request.use(
    (req) => {
      try {
        const curl = new CurlHelper(req);
        req.curlObject = curl;
        req.curlCommand = curl.generateCommand();
        req.clearCurl = () => {
          delete req.curlObject;
          delete req.curlCommand;
          delete req.clearCurl;
        };
      } catch (err) {
        callback(null, err);
      } finally {
        if (req.curlirize !== false) {
          callback({
            command: req.curlCommand,
            object: req.curlObject
          });
        }
        return req;
      }
    },
    (error) => {
      callback(null, error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      callback({
        response
      });
      return response;
    },
    (error) => {
      callback(null, error);
      return Promise.reject(error);
    }
  );
};

// src/utils/JsonUtils.ts
var JsonUtils_default = () => {
  return {
    isEqualJson(obj1, obj2, ignoreKeys = []) {
      return isEqualJson(obj1, obj2, ignoreKeys);
    },
    deleteDeepByKey(object, substring) {
      return deleteDeepByKey(object, substring);
    },
    cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    mergeDeep(obj1, obj2) {
      return mergeDeep(obj1, obj2);
    },
    getPaths(o, prefix = "", delim = ".") {
      return getPaths(o, prefix, delim);
    },
    findInArray(objs, predicate) {
      return findInArray(objs, predicate);
    },
    get(obj, path5, defaultValue = void 0) {
      return get(obj, path5, defaultValue);
    },
    put(obj, value, path5) {
      return put(obj, value, path5);
    },
    stringify(obj) {
      return stringify(obj);
    }
  };
};
function isEqualJson(obj1, obj2, ignoreKeys = []) {
  const obj1Keys = Object.keys(obj1).filter((key) => !ignoreKeys.includes(key));
  const obj2Keys = Object.keys(obj2).filter((key) => !ignoreKeys.includes(key));
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  for (const objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      if (typeof obj1[objKey] === "object" && typeof obj2[objKey] === "object") {
        if (!isEqualJson(obj1[objKey], obj2[objKey], ignoreKeys)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}
function deleteDeepByKey(object, substring) {
  const obj = object;
  const keys3 = Object.keys(obj);
  for (const key of keys3) {
    if (key.indexOf(substring) > -1) {
      delete obj[key];
    } else if (Object(obj[key]) === obj[key]) {
      obj[key] = deleteDeepByKey(obj[key], substring);
    }
  }
  return obj;
}
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function mergeDeep(obj1, obj2) {
  if (obj1) {
    for (const key of Object.keys(obj2)) {
      if (!obj1.hasOwnProperty(key) || typeof obj2[key] !== "object")
        obj1[key] = obj2[key];
      else
        mergeDeep(obj1[key], obj2[key]);
    }
  }
  return obj1;
}
function getPaths(o, prefix = "", delim = ".") {
  const paths = [];
  for (const k of Object.keys(o)) {
    if (Object(o[k]) !== o[k]) {
      const p = prefix + k + delim + o[k];
      paths.push(p);
    } else if (typeof o[k] === "function") {
      const func = o[k].toString();
      const p = prefix + func.substring(0, func.indexOf("{")).trim();
      paths.push(p);
    } else {
      getPaths(o[k], prefix + k + delim, delim).forEach((p) => paths.push(p));
    }
  }
  return paths;
}
function findInArray(objs, predicate) {
  const results = objs.filter((obj) => {
    for (const [key, value] of Object.entries(predicate)) {
      if (obj[key] !== value)
        return false;
    }
    return true;
  });
  if (results.length > 0)
    return results[0];
  return void 0;
}
function get(obj, path5, defaultValue = void 0) {
  let result = obj;
  for (const element of path5) {
    result = result[element];
    if (!result)
      return defaultValue;
  }
  return result;
}
function put(obj, value, path5) {
  let ref = obj;
  for (const [i, element] of path5.entries()) {
    if (!ref[element] || !(ref[element] instanceof Object))
      ref[element] = {};
    i < path5.length - 1 ? ref = ref[element] : ref[element] = value;
  }
  ref = value;
  return obj;
}
var replacer = (_key2, value) => value instanceof Object && !(value instanceof Array) ? Object.keys(value).sort().reduce((sorted, key) => {
  sorted[key] = value[key];
  return sorted;
}, {}) : value;
function stringify(obj) {
  return JSON.stringify(obj, replacer, 2);
}

// package.json
var name = "@rockcarver/frodo-lib";
var version = "2.0.0-77";

// src/shared/Version.ts
var getUserAgent = () => `${name}/${version}`;
var getPackageVersion = () => `v${version} [${process.version}]`;
var getVersionFromPackage = () => version;

// src/shared/State.ts
var State_default = (initialState) => {
  const state2 = { ...globalState, ...initialState };
  return {
    getState() {
      return cloneDeep(state2);
    },
    setHost(host) {
      state2.host = host;
    },
    getHost() {
      return state2.host || process.env.FRODO_HOST;
    },
    setUsername(username) {
      state2.username = username;
    },
    getUsername() {
      return state2.username || process.env.FRODO_USERNAME;
    },
    setPassword(password) {
      state2.password = password;
    },
    getPassword() {
      return state2.password || process.env.FRODO_PASSWORD;
    },
    setRealm(realm) {
      state2.realm = realm;
    },
    getRealm() {
      return state2.realm || process.env.FRODO_REALM;
    },
    setDeploymentType(type) {
      state2.deploymentType = type;
    },
    getDeploymentType() {
      return state2.deploymentType;
    },
    setAllowInsecureConnection(allowInsecureConnection) {
      state2.allowInsecureConnection = allowInsecureConnection;
    },
    getAllowInsecureConnection() {
      return state2.allowInsecureConnection;
    },
    setCookieName(name2) {
      state2.cookieName = name2;
    },
    getCookieName() {
      return state2.cookieName;
    },
    setUserSessionTokenMeta(token) {
      state2.userSessionToken = token;
    },
    getCookieValue() {
      return state2.userSessionToken?.tokenId;
    },
    getUserSessionTokenMeta() {
      return state2.userSessionToken;
    },
    setFeatures(features) {
      state2.features = features;
    },
    getFeatures() {
      return state2.features;
    },
    setAuthenticationHeaderOverrides(overrides) {
      state2.authenticationHeaderOverrides = overrides;
    },
    getAuthenticationHeaderOverrides() {
      return state2.authenticationHeaderOverrides;
    },
    setAuthenticationService(service) {
      state2.authenticationService = service;
    },
    getAuthenticationService() {
      return state2.authenticationService || process.env.FRODO_AUTHENTICATION_SERVICE;
    },
    setServiceAccountId(uuid) {
      state2.serviceAccountId = uuid;
    },
    getServiceAccountId() {
      return state2.serviceAccountId || process.env.FRODO_SA_ID;
    },
    setServiceAccountJwk(jwk) {
      state2.serviceAccountJwk = { ...jwk };
    },
    getServiceAccountJwk() {
      return state2.serviceAccountJwk || (process.env.FRODO_SA_JWK ? JSON.parse(process.env.FRODO_SA_JWK) : void 0);
    },
    setServiceAccountScope(scope) {
      state2.serviceAccountScope = scope;
    },
    getServiceAccountScope() {
      return state2.serviceAccountScope;
    },
    setUseBearerTokenForAmApis(useBearerTokenForAmApis) {
      state2.useBearerTokenForAmApis = useBearerTokenForAmApis;
    },
    getUseBearerTokenForAmApis() {
      return state2.useBearerTokenForAmApis;
    },
    setBearerTokenMeta(token) {
      state2.bearerToken = token;
    },
    getBearerToken() {
      return state2.bearerToken?.access_token;
    },
    getBearerTokenMeta() {
      return state2.bearerToken;
    },
    setLogApiKey(key) {
      state2.logApiKey = key;
    },
    getLogApiKey() {
      return state2.logApiKey || process.env.FRODO_LOG_KEY;
    },
    setLogApiSecret(secret) {
      state2.logApiSecret = secret;
    },
    getLogApiSecret() {
      return state2.logApiSecret || process.env.FRODO_LOG_SECRET;
    },
    setAmVersion(version2) {
      state2.amVersion = version2;
    },
    getAmVersion() {
      return state2.amVersion;
    },
    setFrodoVersion(version2) {
      state2.frodoVersion = version2;
    },
    getFrodoVersion() {
      return state2.frodoVersion || getPackageVersion();
    },
    setConnectionProfilesPath(path5) {
      state2.connectionProfilesPath = path5;
    },
    getConnectionProfilesPath() {
      return state2.connectionProfilesPath;
    },
    setUseTokenCache(useTokenCache) {
      state2.useTokenCache = useTokenCache;
    },
    getUseTokenCache() {
      return process.env.FRODO_NO_CACHE ? false : state2.useTokenCache;
    },
    setTokenCachePath(path5) {
      state2.tokenCachePath = path5;
    },
    getTokenCachePath() {
      return state2.tokenCachePath;
    },
    setMasterKeyPath(path5) {
      state2.masterKeyPath = path5;
    },
    getMasterKeyPath() {
      return state2.masterKeyPath;
    },
    setOutputFile(file) {
      state2.outputFile = file;
    },
    getOutputFile() {
      return state2.outputFile;
    },
    setDirectory(directory) {
      state2.directory = directory;
    },
    getDirectory() {
      return state2.directory;
    },
    setAutoRefreshTimer(timer) {
      state2.autoRefreshTimer = timer;
    },
    getAutoRefreshTimer() {
      return state2.autoRefreshTimer;
    },
    setCurlirizeHandler(handler) {
      state2.curlirizeHandler = handler;
    },
    getCurlirizeHandler() {
      return state2.curlirizeHandler;
    },
    setCurlirize(curlirize2) {
      state2.curlirize = curlirize2;
    },
    getCurlirize() {
      return state2.curlirize;
    },
    setCreateProgressHandler(handler) {
      state2.createProgressHandler = handler;
    },
    getCreateProgressHandler() {
      return state2.createProgressHandler;
    },
    setUpdateProgressHandler(handler) {
      state2.updateProgressHandler = handler;
    },
    getUpdateProgressHandler() {
      return state2.updateProgressHandler;
    },
    setStopProgressHandler(handler) {
      state2.stopProgressHandler = handler;
    },
    getStopProgressHandler() {
      return state2.stopProgressHandler;
    },
    // global state
    setPrintHandler(handler) {
      globalState.printHandler = handler;
    },
    getPrintHandler() {
      return globalState.printHandler;
    },
    setErrorHandler(handler) {
      globalState.errorHandler = handler;
    },
    getErrorHandler() {
      return globalState.errorHandler;
    },
    setVerboseHandler(handler) {
      globalState.verboseHandler = handler;
    },
    getVerboseHandler() {
      return globalState.verboseHandler;
    },
    setVerbose(verbose) {
      globalState.verbose = verbose;
    },
    getVerbose() {
      return globalState.verbose;
    },
    setDebugHandler(handler) {
      globalState.debugHandler = handler;
    },
    getDebugHandler() {
      return globalState.debugHandler;
    },
    setDebug(debug) {
      globalState.debug = debug;
    },
    getDebug() {
      return globalState.debug || process.env.FRODO_DEBUG !== void 0;
    },
    reset() {
      for (const key of Object.keys(state2)) {
        state2[key] = globalState[key];
      }
    },
    // Deprecated
    setTenant(tenant) {
      this.setHost(tenant);
    },
    getTenant() {
      return this.getHost();
    }
  };
};
var globalState = {
  authenticationHeaderOverrides: {},
  printHandler: (message) => {
    if (!message)
      return;
    if (typeof message === "object") {
      console.dir(message, { depth: 3 });
    } else {
      console.log(message);
    }
  },
  errorHandler: (error, message) => {
    if (message)
      process.stderr.write("" + message["brightRed"]);
    switch (error.name) {
      case "FrodoError":
        process.stderr.write(
          "" + error.getCombinedMessage()["brightRed"]
        );
        break;
      case "AxiosError": {
        const code = error["code"];
        const status = error["response"] ? error["response"].status : null;
        const message2 = error["response"] ? error["response"].data ? error["response"].data.message : null : null;
        const detail = error["response"] ? error["response"].data ? error["response"].data.detail : null : null;
        let errorMessage = "Network error";
        errorMessage += code ? `
  Code: ${code}` : "";
        errorMessage += status ? `
  Status: ${status}` : "";
        errorMessage += message2 ? `
  Message: ${message2}` : "";
        errorMessage += detail ? `
  Detail: ${detail}` : "";
        process.stderr.write(errorMessage["brightRed"]);
        break;
      }
      default:
        process.stderr.write(error.message["brightRed"]);
        break;
    }
  },
  verboseHandler: (message) => {
    if (!message)
      return;
    if (getVerbose()) {
      if (typeof message === "object") {
        console.dir(message, { depth: 3 });
      } else {
        console.log(message);
      }
    }
  },
  debugHandler: (message) => {
    if (!message)
      return;
    if (getDebug()) {
      if (typeof message === "object") {
        console.dir(message, { depth: 6 });
      } else {
        console.log(message);
      }
    }
  },
  curlirizeHandler: (message) => {
    if (!message)
      return;
    if (getDebug()) {
      console.log(message);
    }
  }
};
var getVerbose = () => globalState.verbose;
var getDebug = () => globalState.debug || process.env.FRODO_DEBUG !== void 0;

// src/utils/Console.ts
import { v4 as uuidv4 } from "uuid";
function printMessage({
  message,
  type = "text",
  newline = true,
  state: state2
}) {
  const handler = state2.getPrintHandler();
  if (handler) {
    handler(message, type, newline);
  }
}
function printError({
  error,
  message,
  state: state2
}) {
  const handler = state2.getErrorHandler();
  if (handler) {
    handler(error, message);
  }
}
function verboseMessage({
  message,
  state: state2
}) {
  const handler = state2.getVerboseHandler();
  if (handler) {
    handler(message);
  }
}
function debugMessage({
  message,
  state: state2
}) {
  const handler = state2.getDebugHandler();
  if (handler) {
    handler(message);
  }
}
function maskPasswordHeader(curlCommand) {
  const header = "X-OpenAM-Password:";
  const mask = "<suppressed>";
  const regex = new RegExp('"' + header + '.+?"', "g");
  return curlCommand.replace(regex, '"' + header + mask + '"');
}
function curlirizeMessage({
  message,
  state: state2
}) {
  const handler = state2.getCurlirizeHandler();
  if (handler) {
    handler(maskPasswordHeader(message));
  }
}
function createProgressIndicator({
  total,
  message = void 0,
  type = "determinate",
  state: state2
}) {
  const handler = state2.getCreateProgressHandler();
  if (handler) {
    return handler(type, total, message);
  }
  return uuidv4();
}
function updateProgressIndicator({
  id: id2,
  message = void 0,
  state: state2
}) {
  const handler = state2.getUpdateProgressHandler();
  if (handler) {
    handler(id2, message);
  }
}
function stopProgressIndicator({
  id: id2,
  message = null,
  status = "none",
  state: state2
}) {
  const handler = state2.getStopProgressHandler();
  if (handler) {
    handler(id2, message, status);
  }
}

// src/utils/SetupPollyForFrodoLib.ts
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import { Polly } from "@pollyjs/core";
import FSPersister from "@pollyjs/persister-fs";

// node_modules/@pollyjs/utils/dist/es/pollyjs-utils.js
var import_url_parse = __toESM(require_url_parse());
import qs from "qs";
var modes = {
  RECORD: "record",
  REPLAY: "replay",
  PASSTHROUGH: "passthrough",
  STOPPED: "stopped"
};
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
function getCjsExportFromNamespace(n) {
  return n && n["default"] || n;
}
var _global = createCommonjsModule(function(module) {
  var global2 = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  if (typeof __g == "number")
    __g = global2;
});
var _core = createCommonjsModule(function(module) {
  var core = module.exports = { version: "2.6.9" };
  if (typeof __e == "number")
    __e = core;
});
var _core_1 = _core.version;
var _aFunction = function(it) {
  if (typeof it != "function")
    throw TypeError(it + " is not a function!");
  return it;
};
var _ctx = function(fn, that, length) {
  _aFunction(fn);
  if (that === void 0)
    return fn;
  switch (length) {
    case 1:
      return function(a) {
        return fn.call(that, a);
      };
    case 2:
      return function(a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function(a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function() {
    return fn.apply(that, arguments);
  };
};
var _isObject = function(it) {
  return typeof it === "object" ? it !== null : typeof it === "function";
};
var _anObject = function(it) {
  if (!_isObject(it))
    throw TypeError(it + " is not an object!");
  return it;
};
var _fails = function(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};
var _descriptors = !_fails(function() {
  return Object.defineProperty({}, "a", { get: function() {
    return 7;
  } }).a != 7;
});
var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it) {
  return is ? document$1.createElement(it) : {};
};
var _ie8DomDefine = !_descriptors && !_fails(function() {
  return Object.defineProperty(_domCreate("div"), "a", { get: function() {
    return 7;
  } }).a != 7;
});
var _toPrimitive = function(it, S) {
  if (!_isObject(it))
    return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it)))
    return val;
  if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it)))
    return val;
  if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it)))
    return val;
  throw TypeError("Can't convert object to primitive value");
};
var dP = Object.defineProperty;
var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine)
    try {
      return dP(O, P, Attributes);
    } catch (e) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw TypeError("Accessors not supported!");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var _objectDp = {
  f
};
var _propertyDesc = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var _hide = _descriptors ? function(object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key) {
  return hasOwnProperty.call(it, key);
};
var PROTOTYPE = "prototype";
var $export = function(type, name2, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name2] || (_core[name2] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name2] : (_global[name2] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL)
    source = name2;
  for (key in source) {
    own = !IS_FORCED && target && target[key] !== void 0;
    if (own && _has(exports, key))
      continue;
    out = own ? target[key] : source[key];
    exports[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? _ctx(out, _global) : IS_WRAP && target[key] == out ? function(C) {
      var F = function(a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0:
              return new C();
            case 1:
              return new C(a);
            case 2:
              return new C(a, b);
          }
          return new C(a, b, c);
        }
        return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    }(out) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      if (type & $export.R && expProto && !expProto[key])
        _hide(expProto, key, out);
    }
  }
};
$export.F = 1;
$export.G = 2;
$export.S = 4;
$export.P = 8;
$export.B = 16;
$export.W = 32;
$export.U = 64;
$export.R = 128;
var _export = $export;
var _defined = function(it) {
  if (it == void 0)
    throw TypeError("Can't call method on  " + it);
  return it;
};
var _stringWs = "	\n\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
var space = "[" + _stringWs + "]";
var non = "\u200B\x85";
var ltrim = RegExp("^" + space + space + "*");
var rtrim = RegExp(space + space + "*$");
var exporter = function(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function() {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS)
    exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, "String", exp);
};
var trim = exporter.trim = function(string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1)
    string = string.replace(ltrim, "");
  if (TYPE & 2)
    string = string.replace(rtrim, "");
  return string;
};
var _stringTrim = exporter;
var $parseInt = _global.parseInt;
var $trim = _stringTrim.trim;
var hex = /^[-+]?0[xX]/;
var _parseInt = $parseInt(_stringWs + "08") !== 8 || $parseInt(_stringWs + "0x16") !== 22 ? function parseInt2(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;
_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });
var _parseInt$1 = _core.parseInt;
var es6_object_toString = /* @__PURE__ */ Object.freeze({});
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
var _stringAt = function(TO_STRING) {
  return function(that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l)
      return TO_STRING ? "" : void 0;
    a = s.charCodeAt(i);
    return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
  };
};
var _library = true;
var _redefine = _hide;
var _iterators = {};
var toString = {}.toString;
var _cof = function(it) {
  return toString.call(it).slice(8, -1);
};
var _iobject = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
  return _cof(it) == "String" ? it.split("") : Object(it);
};
var _toIobject = function(it) {
  return _iobject(_defined(it));
};
var min = Math.min;
var _toLength = function(it) {
  return it > 0 ? min(_toInteger(it), 9007199254740991) : 0;
};
var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};
var _arrayIncludes = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        if (value != value)
          return true;
      }
    else
      for (; length > index; index++)
        if (IS_INCLUDES || index in O) {
          if (O[index] === el)
            return IS_INCLUDES || index || 0;
        }
    return !IS_INCLUDES && -1;
  };
};
var _shared = createCommonjsModule(function(module) {
  var SHARED = "__core-js_shared__";
  var store = _global[SHARED] || (_global[SHARED] = {});
  (module.exports = function(key, value) {
    return store[key] || (store[key] = value !== void 0 ? value : {});
  })("versions", []).push({
    version: _core.version,
    mode: "pure",
    copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
  });
});
var id = 0;
var px = Math.random();
var _uid = function(key) {
  return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + px).toString(36));
};
var shared = _shared("keys");
var _sharedKey = function(key) {
  return shared[key] || (shared[key] = _uid(key));
};
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey("IE_PROTO");
var _objectKeysInternal = function(object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    if (key != IE_PROTO)
      _has(O, key) && result.push(key);
  while (names.length > i)
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  return result;
};
var _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};
var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys3 = _objectKeys(Properties);
  var length = keys3.length;
  var i = 0;
  var P;
  while (length > i)
    _objectDp.f(O, P = keys3[i++], Properties[P]);
  return O;
};
var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;
var IE_PROTO$1 = _sharedKey("IE_PROTO");
var Empty = function() {
};
var PROTOTYPE$1 = "prototype";
var createDict = function() {
  var iframe = _domCreate("iframe");
  var i = _enumBugKeys.length;
  var lt = "<";
  var gt = ">";
  var iframeDocument;
  iframe.style.display = "none";
  _html.appendChild(iframe);
  iframe.src = "javascript:";
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--)
    delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};
var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    result[IE_PROTO$1] = O;
  } else
    result = createDict();
  return Properties === void 0 ? result : _objectDps(result, Properties);
};
var _wks = createCommonjsModule(function(module) {
  var store = _shared("wks");
  var Symbol2 = _global.Symbol;
  var USE_SYMBOL = typeof Symbol2 == "function";
  var $exports = module.exports = function(name2) {
    return store[name2] || (store[name2] = USE_SYMBOL && Symbol2[name2] || (USE_SYMBOL ? Symbol2 : _uid)("Symbol." + name2));
  };
  $exports.store = store;
});
var def = _objectDp.f;
var TAG = _wks("toStringTag");
var _setToStringTag = function(it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG))
    def(it, TAG, { configurable: true, value: tag });
};
var IteratorPrototype = {};
_hide(IteratorPrototype, _wks("iterator"), function() {
  return this;
});
var _iterCreate = function(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + " Iterator");
};
var _toObject = function(it) {
  return Object(_defined(it));
};
var IE_PROTO$2 = _sharedKey("IE_PROTO");
var ObjectProto = Object.prototype;
var _objectGpo = Object.getPrototypeOf || function(O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2))
    return O[IE_PROTO$2];
  if (typeof O.constructor == "function" && O instanceof O.constructor) {
    return O.constructor.prototype;
  }
  return O instanceof Object ? ObjectProto : null;
};
var ITERATOR = _wks("iterator");
var BUGGY = !([].keys && "next" in [].keys());
var FF_ITERATOR = "@@iterator";
var KEYS = "keys";
var VALUES = "values";
var returnThis = function() {
  return this;
};
var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function(kind) {
    if (!BUGGY && kind in proto)
      return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys3() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }
    return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG2 = NAME + " Iterator";
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
  var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype2;
  if ($anyNative) {
    IteratorPrototype2 = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype2 !== Object.prototype && IteratorPrototype2.next) {
      _setToStringTag(IteratorPrototype2, TAG2, true);
    }
  }
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  if (FORCED && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  _iterators[NAME] = $default;
  _iterators[TAG2] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED)
      for (key in methods) {
        if (!(key in proto))
          _redefine(proto, key, methods[key]);
      }
    else
      _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
var $at = _stringAt(true);
_iterDefine(String, "String", function(iterated) {
  this._t = String(iterated);
  this._i = 0;
}, function() {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length)
    return { value: void 0, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});
var _iterStep = function(done, value) {
  return { value, done: !!done };
};
var es6_array_iterator = _iterDefine(Array, "Array", function(iterated, kind) {
  this._t = _toIobject(iterated);
  this._i = 0;
  this._k = kind;
}, function() {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = void 0;
    return _iterStep(1);
  }
  if (kind == "keys")
    return _iterStep(0, index);
  if (kind == "values")
    return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, "values");
_iterators.Arguments = _iterators.Array;
var TO_STRING_TAG = _wks("toStringTag");
var DOMIterables = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(",");
for (i = 0; i < DOMIterables.length; i++) {
  NAME = DOMIterables[i];
  Collection = _global[NAME];
  proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG])
    _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}
var NAME;
var Collection;
var proto;
var i;
var TAG$1 = _wks("toStringTag");
var ARG = _cof(/* @__PURE__ */ function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (e) {
  }
};
var _classof = function(it) {
  var O, T, B;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (T = tryGet(O = Object(it), TAG$1)) == "string" ? T : ARG ? _cof(O) : (B = _cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
};
var _anInstance = function(it, Constructor, name2, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== void 0 && forbiddenField in it) {
    throw TypeError(name2 + ": incorrect invocation!");
  }
  return it;
};
var _iterCall = function(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  } catch (e) {
    var ret = iterator["return"];
    if (ret !== void 0)
      _anObject(ret.call(iterator));
    throw e;
  }
};
var ITERATOR$1 = _wks("iterator");
var ArrayProto = Array.prototype;
var _isArrayIter = function(it) {
  return it !== void 0 && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};
var ITERATOR$2 = _wks("iterator");
var core_getIteratorMethod = _core.getIteratorMethod = function(it) {
  if (it != void 0)
    return it[ITERATOR$2] || it["@@iterator"] || _iterators[_classof(it)];
};
var _forOf = createCommonjsModule(function(module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function(iterable, entries, fn, that, ITERATOR2) {
    var iterFn = ITERATOR2 ? function() {
      return iterable;
    } : core_getIteratorMethod(iterable);
    var f2 = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step2, iterator, result;
    if (typeof iterFn != "function")
      throw TypeError(iterable + " is not iterable!");
    if (_isArrayIter(iterFn))
      for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f2(_anObject(step2 = iterable[index])[0], step2[1]) : f2(iterable[index]);
        if (result === BREAK || result === RETURN)
          return result;
      }
    else
      for (iterator = iterFn.call(iterable); !(step2 = iterator.next()).done; ) {
        result = _iterCall(iterator, f2, step2.value, entries);
        if (result === BREAK || result === RETURN)
          return result;
      }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});
var SPECIES = _wks("species");
var _speciesConstructor = function(O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === void 0 || (S = _anObject(C)[SPECIES]) == void 0 ? D : _aFunction(S);
};
var _invoke = function(fn, args, that) {
  var un = that === void 0;
  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);
    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);
    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }
  return fn.apply(that, args);
};
var process2 = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var defer;
var channel;
var port;
var run = function() {
  var id2 = +this;
  if (queue.hasOwnProperty(id2)) {
    var fn = queue[id2];
    delete queue[id2];
    fn();
  }
};
var listener = function(event) {
  run.call(event.data);
};
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i)
      args.push(arguments[i++]);
    queue[++counter] = function() {
      _invoke(typeof fn == "function" ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id2) {
    delete queue[id2];
  };
  if (_cof(process2) == "process") {
    defer = function(id2) {
      process2.nextTick(_ctx(run, id2, 1));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function(id2) {
      Dispatch.now(_ctx(run, id2, 1));
    };
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  } else if (_global.addEventListener && typeof postMessage == "function" && !_global.importScripts) {
    defer = function(id2) {
      _global.postMessage(id2 + "", "*");
    };
    _global.addEventListener("message", listener, false);
  } else if (ONREADYSTATECHANGE in _domCreate("script")) {
    defer = function(id2) {
      _html.appendChild(_domCreate("script"))[ONREADYSTATECHANGE] = function() {
        _html.removeChild(this);
        run.call(id2);
      };
    };
  } else {
    defer = function(id2) {
      setTimeout(_ctx(run, id2, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};
var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise2 = _global.Promise;
var isNode = _cof(process$1) == "process";
var _microtask = function() {
  var head, last, notify2;
  var flush2 = function() {
    var parent, fn;
    if (isNode && (parent = process$1.domain))
      parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head)
          notify2();
        else
          last = void 0;
        throw e;
      }
    }
    last = void 0;
    if (parent)
      parent.enter();
  };
  if (isNode) {
    notify2 = function() {
      process$1.nextTick(flush2);
    };
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode("");
    new Observer(flush2).observe(node, { characterData: true });
    notify2 = function() {
      node.data = toggle = !toggle;
    };
  } else if (Promise2 && Promise2.resolve) {
    var promise2 = Promise2.resolve(void 0);
    notify2 = function() {
      promise2.then(flush2);
    };
  } else {
    notify2 = function() {
      macrotask.call(_global, flush2);
    };
  }
  return function(fn) {
    var task2 = { fn, next: void 0 };
    if (last)
      last.next = task2;
    if (!head) {
      head = task2;
      notify2();
    }
    last = task2;
  };
};
function PromiseCapability(C) {
  var resolve2, reject2;
  this.promise = new C(function($$resolve, $$reject) {
    if (resolve2 !== void 0 || reject2 !== void 0)
      throw TypeError("Bad Promise constructor");
    resolve2 = $$resolve;
    reject2 = $$reject;
  });
  this.resolve = _aFunction(resolve2);
  this.reject = _aFunction(reject2);
}
var f$1 = function(C) {
  return new PromiseCapability(C);
};
var _newPromiseCapability = {
  f: f$1
};
var _perform = function(exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};
var navigator = _global.navigator;
var _userAgent = navigator && navigator.userAgent || "";
var _promiseResolve = function(C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C)
    return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve2 = promiseCapability.resolve;
  resolve2(x);
  return promiseCapability.promise;
};
var _redefineAll = function(target, src, safe) {
  for (var key in src) {
    if (safe && target[key])
      target[key] = src[key];
    else
      _hide(target, key, src[key]);
  }
  return target;
};
var SPECIES$1 = _wks("species");
var _setSpecies = function(KEY) {
  var C = typeof _core[KEY] == "function" ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1])
    _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function() {
        return this;
      }
    });
};
var ITERATOR$3 = _wks("iterator");
var SAFE_CLOSING = false;
try {
  riter = [7][ITERATOR$3]();
  riter["return"] = function() {
    SAFE_CLOSING = true;
  };
  Array.from(riter, function() {
    throw 2;
  });
} catch (e) {
}
var riter;
var _iterDetect = function(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING)
    return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function() {
      return { done: safe = true };
    };
    arr[ITERATOR$3] = function() {
      return iter;
    };
    exec(arr);
  } catch (e) {
  }
  return safe;
};
var task = _task.set;
var microtask = _microtask();
var PROMISE = "Promise";
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8 || "";
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == "process";
var empty = function() {
};
var Internal;
var newGenericPromiseCapability;
var OwnPromiseCapability;
var Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;
var USE_NATIVE = !!function() {
  try {
    var promise2 = $Promise.resolve(1);
    var FakePromise = (promise2.constructor = {})[_wks("species")] = function(exec) {
      exec(empty, empty);
    };
    return (isNode$1 || typeof PromiseRejectionEvent == "function") && promise2.then(empty) instanceof FakePromise && v8.indexOf("6.6") !== 0 && _userAgent.indexOf("Chrome/66") === -1;
  } catch (e) {
  }
}();
var isThenable = function(it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == "function" ? then : false;
};
var notify = function(promise2, isReject) {
  if (promise2._n)
    return;
  promise2._n = true;
  var chain = promise2._c;
  microtask(function() {
    var value = promise2._v;
    var ok = promise2._s == 1;
    var i = 0;
    var run2 = function(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve2 = reaction.resolve;
      var reject2 = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise2._h == 2)
              onHandleUnhandled(promise2);
            promise2._h = 1;
          }
          if (handler === true)
            result = value;
          else {
            if (domain)
              domain.enter();
            result = handler(value);
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject2(TypeError$1("Promise-chain cycle"));
          } else if (then = isThenable(result)) {
            then.call(result, resolve2, reject2);
          } else
            resolve2(result);
        } else
          reject2(value);
      } catch (e) {
        if (domain && !exited)
          domain.exit();
        reject2(e);
      }
    };
    while (chain.length > i)
      run2(chain[i++]);
    promise2._c = [];
    promise2._n = false;
    if (isReject && !promise2._h)
      onUnhandled(promise2);
  });
};
var onUnhandled = function(promise2) {
  task.call(_global, function() {
    var value = promise2._v;
    var unhandled = isUnhandled(promise2);
    var result, handler, console2;
    if (unhandled) {
      result = _perform(function() {
        if (isNode$1) {
          process$2.emit("unhandledRejection", value, promise2);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise2, reason: value });
        } else if ((console2 = _global.console) && console2.error) {
          console2.error("Unhandled promise rejection", value);
        }
      });
      promise2._h = isNode$1 || isUnhandled(promise2) ? 2 : 1;
    }
    promise2._a = void 0;
    if (unhandled && result.e)
      throw result.v;
  });
};
var isUnhandled = function(promise2) {
  return promise2._h !== 1 && (promise2._a || promise2._c).length === 0;
};
var onHandleUnhandled = function(promise2) {
  task.call(_global, function() {
    var handler;
    if (isNode$1) {
      process$2.emit("rejectionHandled", promise2);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise2, reason: promise2._v });
    }
  });
};
var $reject = function(value) {
  var promise2 = this;
  if (promise2._d)
    return;
  promise2._d = true;
  promise2 = promise2._w || promise2;
  promise2._v = value;
  promise2._s = 2;
  if (!promise2._a)
    promise2._a = promise2._c.slice();
  notify(promise2, true);
};
var $resolve = function(value) {
  var promise2 = this;
  var then;
  if (promise2._d)
    return;
  promise2._d = true;
  promise2 = promise2._w || promise2;
  try {
    if (promise2 === value)
      throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function() {
        var wrapper = { _w: promise2, _d: false };
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise2._v = value;
      promise2._s = 1;
      notify(promise2, false);
    }
  } catch (e) {
    $reject.call({ _w: promise2, _d: false }, e);
  }
};
if (!USE_NATIVE) {
  $Promise = function Promise3(executor) {
    _anInstance(this, $Promise, PROMISE, "_h");
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  Internal = function Promise3(executor) {
    this._c = [];
    this._a = void 0;
    this._s = 0;
    this._d = false;
    this._v = void 0;
    this._h = 0;
    this._n = false;
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
      reaction.fail = typeof onRejected == "function" && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : void 0;
      this._c.push(reaction);
      if (this._a)
        this._a.push(reaction);
      if (this._s)
        notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    "catch": function(onRejected) {
      return this.then(void 0, onRejected);
    }
  });
  OwnPromiseCapability = function() {
    var promise2 = new Internal();
    this.promise = promise2;
    this.resolve = _ctx($resolve, promise2, 1);
    this.reject = _ctx($reject, promise2, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}
_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * _library, PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function(iter) {
  $Promise.all(iter)["catch"](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = _perform(function() {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function(promise2) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(void 0);
        remaining++;
        C.resolve(promise2).then(function(value) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve2(values);
        }, reject2);
      });
      --remaining || resolve2(values);
    });
    if (result.e)
      reject2(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject2 = capability.reject;
    var result = _perform(function() {
      _forOf(iterable, false, function(promise2) {
        C.resolve(promise2).then(capability.resolve, reject2);
      });
    });
    if (result.e)
      reject2(result.v);
    return capability.promise;
  }
});
_export(_export.P + _export.R, "Promise", { "finally": function(onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == "function";
  return this.then(
    isFunction ? function(x) {
      return _promiseResolve(C, onFinally()).then(function() {
        return x;
      });
    } : onFinally,
    isFunction ? function(e) {
      return _promiseResolve(C, onFinally()).then(function() {
        throw e;
      });
    } : onFinally
  );
} });
_export(_export.S, "Promise", { "try": function(callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });
getCjsExportFromNamespace(es6_object_toString);
var promise = _core.Promise;
var _objectSap = function(KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function() {
    fn(1);
  }), "Object", exp);
};
_objectSap("keys", function() {
  return function keys3(it) {
    return _objectKeys(_toObject(it));
  };
});
var keys2 = _core.Object.keys;
var _meta = createCommonjsModule(function(module) {
  var META2 = _uid("meta");
  var setDesc = _objectDp.f;
  var id2 = 0;
  var isExtensible = Object.isExtensible || function() {
    return true;
  };
  var FREEZE = !_fails(function() {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function(it) {
    setDesc(it, META2, { value: {
      i: "O" + ++id2,
      // object ID
      w: {}
      // weak collections IDs
    } });
  };
  var fastKey = function(it, create3) {
    if (!_isObject(it))
      return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
    if (!_has(it, META2)) {
      if (!isExtensible(it))
        return "F";
      if (!create3)
        return "E";
      setMeta(it);
    }
    return it[META2].i;
  };
  var getWeak = function(it, create3) {
    if (!_has(it, META2)) {
      if (!isExtensible(it))
        return true;
      if (!create3)
        return false;
      setMeta(it);
    }
    return it[META2].w;
  };
  var onFreeze = function(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META2))
      setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META2,
    NEED: false,
    fastKey,
    getWeak,
    onFreeze
  };
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;
var f$2 = _wks;
var _wksExt = {
  f: f$2
};
var defineProperty2 = _objectDp.f;
var _wksDefine = function(name2) {
  var $Symbol2 = _core.Symbol || (_core.Symbol = {});
  if (name2.charAt(0) != "_" && !(name2 in $Symbol2))
    defineProperty2($Symbol2, name2, { value: _wksExt.f(name2) });
};
var f$3 = Object.getOwnPropertySymbols;
var _objectGops = {
  f: f$3
};
var f$4 = {}.propertyIsEnumerable;
var _objectPie = {
  f: f$4
};
var _enumKeys = function(it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum2 = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i)
      if (isEnum2.call(it, key = symbols[i++]))
        result.push(key);
  }
  return result;
};
var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == "Array";
};
var hiddenKeys = _enumBugKeys.concat("length", "prototype");
var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};
var _objectGopn = {
  f: f$5
};
var gOPN = _objectGopn.f;
var toString$1 = {}.toString;
var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};
var f$6 = function getOwnPropertyNames2(it) {
  return windowNames && toString$1.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(_toIobject(it));
};
var _objectGopnExt = {
  f: f$6
};
var gOPD = Object.getOwnPropertyDescriptor;
var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine)
    try {
      return gOPD(O, P);
    } catch (e) {
    }
  if (_has(O, P))
    return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};
var _objectGopd = {
  f: f$7
};
var META = _meta.KEY;
var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = "prototype";
var HIDDEN = _wks("_hidden");
var TO_PRIMITIVE = _wks("toPrimitive");
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared("symbol-registry");
var AllSymbols = _shared("symbols");
var OPSymbols = _shared("op-symbols");
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE$1 = typeof $Symbol == "function" && !!_objectGops.f;
var QObject = _global.QObject;
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;
var setSymbolDesc = _descriptors && _fails(function() {
  return _objectCreate(dP$1({}, "a", {
    get: function() {
      return dP$1(this, "a", { value: 7 }).a;
    }
  })).a != 7;
}) ? function(it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc)
    delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1)
    dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;
var wrap = function(tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};
var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == "symbol" ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  return it instanceof $Symbol;
};
var $defineProperty = function defineProperty3(it, key, D) {
  if (it === ObjectProto$1)
    $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN))
        dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key])
        it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    }
    return setSymbolDesc(it, key, D);
  }
  return dP$1(it, key, D);
};
var $defineProperties = function defineProperties2(it, P) {
  _anObject(it);
  var keys3 = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys3.length;
  var key;
  while (l > i)
    $defineProperty(it, key = keys3[i++], P[key]);
  return it;
};
var $create = function create2(it, P) {
  return P === void 0 ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))
    return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor2(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))
    return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))
    D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames3(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)
      result.push(key);
  }
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true))
      result.push(AllSymbols[key]);
  }
  return result;
};
if (!USE_NATIVE$1) {
  $Symbol = function Symbol2() {
    if (this instanceof $Symbol)
      throw TypeError("Symbol is not a constructor!");
    var tag = _uid(arguments.length > 0 ? arguments[0] : void 0);
    var $set = function(value) {
      if (this === ObjectProto$1)
        $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag))
        this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter)
      setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], "toString", function toString2() {
    return this._k;
  });
  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;
  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, "propertyIsEnumerable", $propertyIsEnumerable, true);
  }
  _wksExt.f = function(name2) {
    return wrap(_wks(name2));
  };
}
_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });
for (es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
"hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j; )
  _wks(es6Symbols[j++]);
var es6Symbols;
var j;
for (wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k; )
  _wksDefine(wellKnownSymbols[k++]);
var wellKnownSymbols;
var k;
_export(_export.S + _export.F * !USE_NATIVE$1, "Symbol", {
  // 19.4.2.1 Symbol.for(key)
  "for": function(key) {
    return _has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym))
      throw TypeError(sym + " is not a symbol!");
    for (var key in SymbolRegistry)
      if (SymbolRegistry[key] === sym)
        return key;
  },
  useSetter: function() {
    setter = true;
  },
  useSimple: function() {
    setter = false;
  }
});
_export(_export.S + _export.F * !USE_NATIVE$1, "Object", {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});
var FAILS_ON_PRIMITIVES = _fails(function() {
  _objectGops.f(1);
});
_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, "Object", {
  getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
    return _objectGops.f(_toObject(it));
  }
});
$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function() {
  var S = $Symbol();
  return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
})), "JSON", {
  stringify: function stringify2(it) {
    var args = [it];
    var i = 1;
    var replacer2, $replacer;
    while (arguments.length > i)
      args.push(arguments[i++]);
    $replacer = replacer2 = args[1];
    if (!_isObject(replacer2) && it === void 0 || isSymbol(it))
      return;
    if (!_isArray(replacer2))
      replacer2 = function(key, value) {
        if (typeof $replacer == "function")
          value = $replacer.call(this, key, value);
        if (!isSymbol(value))
          return value;
      };
    args[1] = replacer2;
    return _stringify.apply($JSON, args);
  }
});
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
_setToStringTag($Symbol, "Symbol");
_setToStringTag(Math, "Math", true);
_setToStringTag(_global.JSON, "JSON", true);
var getOwnPropertySymbols3 = _core.Object.getOwnPropertySymbols;
var $getOwnPropertyDescriptor$1 = _objectGopd.f;
_objectSap("getOwnPropertyDescriptor", function() {
  return function getOwnPropertyDescriptor3(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});
var $Object = _core.Object;
var Reflect2 = _global.Reflect;
var _ownKeys = Reflect2 && Reflect2.ownKeys || function ownKeys(it) {
  var keys3 = _objectGopn.f(_anObject(it));
  var getSymbols = _objectGops.f;
  return getSymbols ? keys3.concat(getSymbols(it)) : keys3;
};
var _createProperty = function(object, index, value) {
  if (index in object)
    _objectDp.f(object, index, _propertyDesc(0, value));
  else
    object[index] = value;
};
_export(_export.S, "Object", {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = _toIobject(object);
    var getDesc = _objectGopd.f;
    var keys3 = _ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys3.length > i) {
      desc = getDesc(O, key = keys3[i++]);
      if (desc !== void 0)
        _createProperty(result, key, desc);
    }
    return result;
  }
});
var getOwnPropertyDescriptors2 = _core.Object.getOwnPropertyDescriptors;
_export(_export.S + _export.F * !_descriptors, "Object", { defineProperties: _objectDps });
var $Object$1 = _core.Object;
_export(_export.S + _export.F * !_descriptors, "Object", { defineProperty: _objectDp.f });
var $Object$2 = _core.Object;
var defineProperty$1 = function defineProperty4(it, key, desc) {
  return $Object$2.defineProperty(it, key, desc);
};
var defineProperty$2 = defineProperty$1;
var defineProperty$3 = createCommonjsModule(function(module) {
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      defineProperty$2(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  module.exports = _defineProperty2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _defineProperty = unwrapExports(defineProperty$3);
_wksDefine("asyncIterator");
_wksDefine("observable");
var symbol = _core.Symbol;
var symbol$1 = symbol;
var ARRAY_FORMAT = symbol$1();
var supportsBlob = (() => {
  try {
    return !!new Blob();
  } catch (e) {
    return false;
  }
})();
_export(_export.S, "Array", { isArray: _isArray });
var isArray2 = _core.Array.isArray;

// src/utils/SetupPollyForFrodoLib.ts
import path from "path";

// src/utils/Base64Utils.ts
var Base64Utils_default = () => {
  return {
    isBase64Encoded(input) {
      return isBase64Encoded(input);
    },
    encodeBase64(input, padding = true) {
      return encode(input, padding);
    },
    decodeBase64(input) {
      return decode(input);
    },
    decodeBase64Url(input) {
      return decodeBase64Url(input);
    },
    encodeBase64Url(input) {
      return encodeBase64Url(input);
    }
  };
};
var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
function isBase64Encoded(input) {
  return base64regex.test(input);
}
function encode(input, padding = true) {
  if (padding) {
    return Buffer.from(input).toString("base64");
  }
  return Buffer.from(input).toString("base64").replace(/=/g, "");
}
function decode(input) {
  if (input.length % 4 !== 0)
    input += "=".repeat(4 - input.length % 4);
  return Buffer.from(input, "base64").toString();
}
var enc;
if (Buffer.isEncoding("base64url")) {
  enc = (input, encoding = "utf8") => Buffer.from(input, encoding).toString("base64url");
} else {
  const fromBase64 = (base64) => base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  enc = (input, encoding = "utf8") => fromBase64(Buffer.from(input, encoding).toString("base64"));
}
var decodeBase64Url = (input) => `${Buffer.from(input, "base64")}`;
var encodeBase64Url = enc;

// src/utils/SetupPollyForFrodoLib.ts
var FRODO_MOCK_HOSTS = process.env.FRODO_MOCK_HOSTS ? process.env.FRODO_MOCK_HOSTS.split(",") : [
  "https://openam-frodo-dev.forgeblocks.com",
  "https://openam-volker-dev.forgeblocks.com",
  "https://openam-volker-demo.forgeblocks.com",
  "https://nightly.gcp.forgeops.com"
];
var recordIfMissing = false;
var mode = modes.REPLAY;
var recordingsDir = process.env.FRODO_MOCK_DIR ? process.env.FRODO_MOCK_DIR : "test/e2e/mocks";
if (process.env.FRODO_MOCK) {
  Polly.register(NodeHttpAdapter);
  Polly.register(FSPersister);
  if (process.env.FRODO_MOCK === "record") {
    mode = modes.RECORD;
    recordIfMissing = true;
  }
}
function defaultMatchRequestsBy() {
  return {
    method: true,
    headers: false,
    // do not match headers, because "Authorization" header is sent only at recording time
    body: true,
    order: false,
    url: {
      protocol: false,
      username: false,
      password: false,
      hostname: false,
      // we will record from different envs but run tests always against `frodo-dev`
      port: false,
      pathname: true,
      query: true,
      hash: true
    }
  };
}
function authenticationMatchRequestsBy() {
  const matchRequestsBy = defaultMatchRequestsBy();
  matchRequestsBy["body"] = false;
  matchRequestsBy.order = true;
  return matchRequestsBy;
}
async function delay(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
async function countdown(ms) {
  await delay(ms);
  return --ttl;
}
var timeout = 15;
var ttl = timeout;
async function scheduleShutdown({
  polly,
  state: state2
}) {
  ++ttl;
  while (await countdown(1e3)) {
    if (ttl < 4)
      console.log(
        `Polly instance '${getFrodoCommand({ state: state2 })}' stopping in ${ttl}s...`
      );
  }
  await polly.stop();
  console.log(`Polly instance '${getFrodoCommand({ state: state2 })}' stopped.`);
}
function getFrodoArgsId({ start, state: state2 }) {
  const result = [];
  const args = [];
  const params = [];
  let expectValue = false;
  process.argv.filter((_v, i) => i >= start).map((v) => {
    if (v.startsWith("--")) {
      params.push(v.replace("--", ""));
      expectValue = true;
    } else if (v.startsWith("-")) {
      params.push(v.replace("-", ""));
      expectValue = true;
    } else if (expectValue) {
      expectValue = false;
    } else {
      args.push(v);
    }
    return v;
  });
  result.push(`${args.length}`);
  const paramsId = params.join("_");
  if (paramsId)
    result.push(paramsId);
  const argsId = result.join("_");
  if (mode !== modes.RECORD)
    debugMessage({
      message: `SetupPollyForFrodoLib.getFrodoArgsId: argsId=${argsId}`,
      state: state2
    });
  return argsId;
}
function getFrodoArgValue({ name: name2 }) {
  let result = "";
  let expectValue = false;
  process.argv.map((v) => {
    if (v === name2) {
      expectValue = true;
    } else if (expectValue) {
      result = "_" + v;
      expectValue = false;
    }
  });
  return result;
}
function getFrodoCommand({ state: state2 }) {
  let cmd = "unknown";
  try {
    if (mode !== modes.RECORD)
      debugMessage({
        message: `SetupPollyForFrodoLib.getFrodoCommand: process.argv=${process.argv}`,
        state: state2
      });
    if (!process.argv[1].endsWith("frodo") && !process.argv[1].endsWith("frodo.exe") && !process.argv[1].endsWith("app.js")) {
      cmd = path.parse(process.argv[1]).name.replace("-", "/") + "/" + getFrodoArgsId({ start: 2, state: state2 });
    } else {
      cmd = process.argv[2] + "/" + getFrodoArgsId({ start: 3, state: state2 });
    }
  } catch (error) {
    printMessage({
      message: `SetupPollyForFrodoLib.getFrodoCommand: ${error}`,
      type: "error",
      state: state2
    });
    printMessage({ message: process.argv, type: "error", state: state2 });
    cmd = "error";
  }
  if (mode !== modes.RECORD)
    debugMessage({
      message: `SetupPollyForFrodoLib.getFrodoCommand: cmd=${cmd}`,
      state: state2
    });
  return cmd;
}
function filterRecording(recording) {
  if (recording.request?.headers) {
    const headers = recording.request.headers;
    headers.map((header) => {
      if (header.name.toUpperCase() === "AUTHORIZATION") {
        if (isBase64Encoded(header.value)) {
          header.value = encode("username:password");
        } else {
          header.value = header.value.replace(
            /Bearer .+/,
            "Bearer <bearer token>"
          );
        }
      }
      if (header.name.toUpperCase() === "X-API-KEY") {
        header.value = "<api key>";
      }
      if (header.name.toUpperCase() === "X-API-SECRET") {
        header.value = "<api secret>";
      }
    });
    recording.request.headers = headers;
  }
  if (recording.request?.postData?.text) {
    let body = recording.request.postData.text;
    body = body.replace(/assertion=.+?&/, "assertion=<assertion jwt token>&");
    recording.request.postData.text = body;
  }
  if (recording.response?.content?.text) {
    let body = recording.response.content.text;
    if (recording.response.content.mimeType === "application/json;charset=UTF-8") {
      try {
        const json = JSON.parse(body);
        if (json["access_token"])
          json["access_token"] = "<access token>";
        if (json["id_token"])
          json["id_token"] = "<id token>";
        if (json.accessKey)
          json.accessKey = "<access key>";
        if (json.result) {
          for (const obj of json.result) {
            if (obj.script) {
              try {
                let script = decode(obj.script);
                script = script.replace(
                  /(var .*?(?:Sid|sid|Secret|secret|PhoneNumberFrom) = (?:"|'))(.*?)((?:"|'))/g,
                  "$1<secret>$3"
                );
                obj.script = encode(script);
              } catch (error) {
              }
            }
          }
        }
        body = JSON.stringify(json);
      } catch (error) {
      }
    }
    if (recording.response.content.mimeType === "text/xml;charset=utf-8") {
      try {
        body = body.replace(
          /<ds:X509Certificate>.+?<\/ds:X509Certificate>/gs,
          `<ds:X509Certificate>${encode("<certificate>")}</ds:X509Certificate>`
        );
      } catch (error) {
      }
    }
    recording.response.content.text = body;
  }
}
function setupPollyForFrodoLib({
  matchRequestsBy = defaultMatchRequestsBy(),
  state: state2
}) {
  const polly = new Polly("default");
  polly.configure({
    adapters: ["node-http"],
    mode,
    recordIfMissing,
    flushRequestsOnStop: true,
    logLevel: process.env.FRODO_POLLY_LOG_LEVEL || "warn",
    recordFailedRequests: true,
    persister: "fs",
    persisterOptions: {
      fs: {
        recordingsDir
      }
    },
    matchRequestsBy
  });
  for (const host of FRODO_MOCK_HOSTS) {
    if (mode === modes.RECORD)
      console.log(`***** Host: ${host}`);
    polly.server.host(host, () => {
      polly.server.any("/am/oauth2/*").recordingName(`${getFrodoCommand({ state: state2 })}/oauth2`).on("request", (req) => {
        req.configure({ matchRequestsBy: authenticationMatchRequestsBy() });
      });
      polly.server.any("/am/json/*").recordingName(`${getFrodoCommand({ state: state2 })}/am`);
      polly.server.any("/am/saml2/*").recordingName(`${getFrodoCommand({ state: state2 })}/saml2`);
      polly.server.any("/openidm/managed/svcacct").recordingName(`${getFrodoCommand({ state: state2 })}/openidm/managed/svcacct`).on("request", (req) => {
        req.configure({ matchRequestsBy: authenticationMatchRequestsBy() });
      });
      polly.server.any("/openidm/*").recordingName(`${getFrodoCommand({ state: state2 })}/openidm`);
      polly.server.any("/environment/*").recordingName(
        `${getFrodoCommand({
          state: state2
        })}${getFrodoArgValue({ name: "--encoding" })}/environment`
      );
      polly.server.any("/keys").recordingName(`${getFrodoCommand({ state: state2 })}/keys`).on("request", (req) => {
        req.configure({ matchRequestsBy: authenticationMatchRequestsBy() });
      });
      polly.server.any("/monitoring/*").recordingName(`${getFrodoCommand({ state: state2 })}/monitoring`);
      polly.server.any("/feature").recordingName(`${getFrodoCommand({ state: state2 })}/feature`);
      polly.server.any("/dashboard/*").recordingName(`${getFrodoCommand({ state: state2 })}/dashboard`);
    });
  }
  polly.server.host("https://api.github.com", () => {
    polly.server.any("/*").recordingName(`github`);
  });
  polly.server.host("https://registry.npmjs.org", () => {
    polly.server.any("/*").recordingName(`npmjs`);
  });
  polly.server.any().on("request", () => {
    if (ttl < timeout) {
      ttl = timeout;
    }
  }).on("beforePersist", (_req, recording) => {
    filterRecording(recording);
  });
  if (mode === modes.RECORD) {
    scheduleShutdown({ polly, state: state2 });
  } else {
    debugMessage({ message: `Polly config:`, state: state2 });
    debugMessage({ message: polly.config, state: state2 });
  }
  return polly;
}

// src/api/BaseApi.ts
if (process.env.FRODO_MOCK) {
  setupPollyForFrodoLib({ state: State_default({}) });
}
axiosRetry(axios, {
  retries: 3,
  shouldResetTimeout: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  retryCondition: (_error) => true
  // retry no matter what
});
var timeout2 = 3e4;
var maxSockets = 100;
var maxFreeSockets = 10;
var freeSocketTimeout = 3e4;
var userAgent = getUserAgent();
var transactionId = `frodo-${randomUUID()}`;
var httpAgent;
var httpsAgent;
function getHttpAgent() {
  if (httpAgent)
    return httpAgent;
  httpAgent = new Agent({
    maxSockets,
    maxFreeSockets,
    timeout: timeout2,
    freeSocketTimeout
  });
  return httpAgent;
}
function getHttpsAgent(allowInsecureConnection) {
  if (httpsAgent)
    return httpsAgent;
  const options = {
    rejectUnauthorized: !allowInsecureConnection
  };
  const httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (httpsProxy) {
    console.error(`Using proxy ${httpsProxy}`["yellow"]);
    const parsed = new URL(httpsProxy);
    options["host"] = parsed.hostname;
    options["port"] = parsed.port;
    options["protocol"] = parsed.protocol;
    options.rejectUnauthorized = !allowInsecureConnection;
    httpsAgent = HttpsProxyAgent(options);
    return httpsAgent;
  }
  httpsAgent = new Agent.HttpsAgent({
    ...options,
    maxSockets,
    maxFreeSockets,
    timeout: timeout2,
    freeSocketTimeout
  });
  return httpsAgent;
}
function getProxy() {
  if (process.env.HTTPS_PROXY || process.env.https_proxy)
    return false;
  return null;
}
function curlirize(request, state2) {
  curlirize_default(request, (result, err) => {
    if (err) {
      if (axios.isAxiosError(err)) {
        printMessage({
          message: `${err.response?.status}${err.response?.data["reason"] ? " " + err.response?.data["reason"] : ""}${err.response?.data["message"] ? " - " + err.response?.data["message"] : ""}`,
          type: "error",
          state: state2
        });
      } else {
        printMessage({ message: err, type: "error", state: state2 });
      }
    } else if (result.command) {
      curlirizeMessage({ message: result.command, state: state2 });
    } else if (result.response) {
      printMessage({
        message: `${result.response.status} ${result.response.statusText}`,
        type: "info",
        state: state2
      });
    }
  });
}
function generateAmApi({
  resource,
  requestOverride = {},
  state: state2
}) {
  const headers = {
    "User-Agent": userAgent,
    "X-ForgeRock-TransactionId": transactionId,
    "Content-Type": "application/json",
    // only add API version if we have it
    ...resource.apiVersion && { "Accept-API-Version": resource.apiVersion },
    // only send session cookie if we know its name and value and we are not instructed to use the bearer token for AM APIs
    ...!state2.getUseBearerTokenForAmApis() && state2.getCookieName() && state2.getCookieValue() && {
      Cookie: `${state2.getCookieName()}=${state2.getCookieValue()}`
    },
    // only add authorization header if we have a bearer token and are instructed to use it for AM APIs
    ...state2.getUseBearerTokenForAmApis() && state2.getBearerToken() && {
      Authorization: `Bearer ${state2.getBearerToken()}`
    }
  };
  const requestDetails = mergeDeep(
    {
      // baseURL: `${storage.session.getTenant()}/json`,
      timeout: timeout2,
      headers: {
        ...headers,
        ...state2.getAuthenticationHeaderOverrides()
      },
      httpAgent: getHttpAgent(),
      httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
      proxy: getProxy()
    },
    requestOverride
  );
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateOauth2Api({
  resource,
  requestOverride = {},
  authenticate = true,
  state: state2
}) {
  let headers = {
    "User-Agent": userAgent,
    "X-ForgeRock-TransactionId": transactionId,
    // only add API version if we have it
    ...resource.apiVersion && { "Accept-API-Version": resource.apiVersion },
    // only send session cookie if we know its name and value and we are not instructed to use the bearer token for AM APIs
    ...authenticate && !state2.getUseBearerTokenForAmApis() && state2.getCookieName() && state2.getCookieValue() && {
      Cookie: `${state2.getCookieName()}=${state2.getCookieValue()}`
    },
    // only add authorization header if we have a bearer token and are instructed to use it for AM APIs
    ...authenticate && state2.getUseBearerTokenForAmApis() && state2.getBearerToken() && {
      Authorization: `Bearer ${state2.getBearerToken()}`
    }
  };
  if (requestOverride["headers"]) {
    headers = {
      ...headers,
      ...requestOverride["headers"]
    };
  }
  const requestDetails = {
    // baseURL: `${storage.session.getTenant()}/json${resource.path}`,
    timeout: timeout2,
    ...requestOverride,
    headers: {
      ...headers,
      ...state2.getAuthenticationHeaderOverrides()
    },
    httpAgent: getHttpAgent(),
    httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
    proxy: getProxy()
  };
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateIdmApi({
  requestOverride = {},
  state: state2
}) {
  const requestDetails = mergeDeep(
    {
      // baseURL: getTenantURL(storage.session.getTenant()),
      timeout: timeout2,
      headers: {
        "User-Agent": userAgent,
        "X-ForgeRock-TransactionId": transactionId,
        "Content-Type": "application/json",
        // only add authorization header if we have a bearer token
        ...state2.getBearerToken() && {
          Authorization: `Bearer ${state2.getBearerToken()}`
        }
      },
      httpAgent: getHttpAgent(),
      httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
      proxy: getProxy()
    },
    requestOverride
  );
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateLogKeysApi({
  requestOverride = {},
  state: state2
}) {
  const headers = {
    "User-Agent": userAgent,
    "Content-Type": "application/json",
    // only add authorization header if we have a bearer token
    ...state2.getBearerToken() && {
      Authorization: `Bearer ${state2.getBearerToken()}`
    }
  };
  const requestDetails = mergeDeep(
    {
      timeout: timeout2,
      headers,
      httpAgent: getHttpAgent(),
      httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
      proxy: getProxy()
    },
    requestOverride
  );
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateLogApi({
  requestOverride = {},
  state: state2
}) {
  const headers = {
    "User-Agent": userAgent,
    "X-API-Key": state2.getLogApiKey(),
    "X-API-Secret": state2.getLogApiSecret()
  };
  const requestDetails = mergeDeep(
    {
      // baseURL: getTenantURL(storage.session.getTenant()),
      timeout: timeout2,
      headers,
      httpAgent: getHttpAgent(),
      httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
      proxy: getProxy()
    },
    requestOverride
  );
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateEnvApi({
  resource,
  requestOverride = {},
  state: state2
}) {
  const headers = {
    "User-Agent": userAgent,
    "Content-Type": "application/json",
    // only add API version if we have it
    ...resource.apiVersion && { "Accept-API-Version": resource.apiVersion },
    // only add authorization header if we have a bearer token
    ...state2.getBearerToken() && {
      Authorization: `Bearer ${state2.getBearerToken()}`
    }
  };
  const requestDetails = {
    // baseURL: getTenantURL(storage.session.getTenant()),
    timeout: timeout2,
    headers,
    ...requestOverride,
    httpAgent: getHttpAgent(),
    httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
    proxy: getProxy()
  };
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}
function generateReleaseApi({
  baseUrl,
  requestOverride = {},
  state: state2
}) {
  const requestDetails = {
    baseURL: baseUrl,
    timeout: timeout2,
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/json"
    },
    ...requestOverride,
    httpAgent: getHttpAgent(),
    httpsAgent: getHttpsAgent(state2.getAllowInsecureConnection()),
    proxy: getProxy()
  };
  const request = axios.create(requestDetails);
  if (state2.getCurlirize()) {
    curlirize(request, state2);
  }
  return request;
}

// src/api/AuthenticateApi.ts
var authenticateUrlTemplate = "%s/json%s/authenticate";
var authenticateWithServiceUrlTemplate = `${authenticateUrlTemplate}?authIndexType=service&authIndexValue=%s`;
var apiVersion = "resource=2.0, protocol=1.0";
var getApiConfig = () => ({
  apiVersion
});
async function step({
  body = {},
  config = {},
  realm = "/",
  service = void 0,
  state: state2
}) {
  const urlString = service || state2.getAuthenticationService() ? util.format(
    authenticateWithServiceUrlTemplate,
    state2.getHost(),
    getRealmPath(realm),
    service || state2.getAuthenticationService()
  ) : util.format(
    authenticateUrlTemplate,
    state2.getHost(),
    getRealmPath(realm)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig(),
    state: state2
  }).post(urlString, body, config);
  return data;
}

// src/api/cloud/SecretsApi.ts
import util2 from "util";
var secretsListURLTemplate = "%s/environment/secrets";
var secretListVersionsURLTemplate = "%s/environment/secrets/%s/versions";
var secretCreateNewVersionURLTemplate = `${secretListVersionsURLTemplate}?_action=create`;
var secretGetVersionURLTemplate = `${secretListVersionsURLTemplate}/%s`;
var secretVersionStatusURLTemplate = `${secretGetVersionURLTemplate}?_action=changestatus`;
var secretURLTemplate = "%s/environment/secrets/%s";
var secretSetDescriptionURLTemplate = `${secretURLTemplate}?_action=setDescription`;
var apiVersion2 = "protocol=1.0,resource=1.0";
var getApiConfig2 = () => ({
  path: `/environment/secrets`,
  apiVersion: apiVersion2
});
async function getSecrets({
  state: state2
}) {
  const urlString = util2.format(
    secretsListURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getSecret({
  secretId,
  state: state2
}) {
  const urlString = util2.format(
    secretURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function putSecret({
  secretId,
  value,
  description,
  encoding = "generic",
  useInPlaceholders = true,
  state: state2
}) {
  const secretData = {
    valueBase64: value,
    description,
    encoding,
    useInPlaceholders
  };
  const urlString = util2.format(
    secretURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).put(urlString, secretData, {
    withCredentials: true
  });
  return data;
}
async function setSecretDescription({
  secretId,
  description,
  state: state2
}) {
  const urlString = util2.format(
    secretSetDescriptionURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).post(urlString, { description }, { withCredentials: true });
  return data;
}
async function deleteSecret({
  secretId,
  state: state2
}) {
  const urlString = util2.format(
    secretURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}
async function getSecretVersions({
  secretId,
  state: state2
}) {
  const urlString = util2.format(
    secretListVersionsURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function createNewVersionOfSecret({
  secretId,
  value,
  state: state2
}) {
  const urlString = util2.format(
    secretCreateNewVersionURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).post(urlString, { valueBase64: value }, { withCredentials: true });
  return data;
}
async function getVersionOfSecret({
  secretId,
  version: version2,
  state: state2
}) {
  const urlString = util2.format(
    secretGetVersionURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId,
    version2
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function setStatusOfVersionOfSecret({
  secretId,
  version: version2,
  status,
  state: state2
}) {
  const urlString = util2.format(
    secretVersionStatusURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId,
    version2
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).post(urlString, { status }, { withCredentials: true });
  return data;
}
async function deleteVersionOfSecret({
  secretId,
  version: version2,
  state: state2
}) {
  const urlString = util2.format(
    secretGetVersionURLTemplate,
    getHostBaseUrl(state2.getHost()),
    secretId,
    version2
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig2(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/IdmConfigApi.ts
import util3 from "util";
var idmAllConfigURLTemplate = "%s/openidm/config";
var idmConfigURLTemplate = "%s/openidm/config/%s";
var idmConfigEntityQueryTemplate = "%s/openidm/config?_queryFilter=%s";
async function getConfigStubs({
  state: state2
}) {
  const urlString = util3.format(
    idmAllConfigURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function getConfigEntities({
  state: state2
}) {
  const urlString = util3.format(
    idmConfigEntityQueryTemplate,
    getHostBaseUrl(state2.getHost()),
    "true"
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function getConfigEntitiesByType({
  type,
  state: state2
}) {
  const urlString = util3.format(
    idmConfigEntityQueryTemplate,
    getHostBaseUrl(state2.getHost()),
    encodeURIComponent(`_id sw '${type}'`)
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function getConfigEntity({
  entityId,
  state: state2
}) {
  const urlString = util3.format(
    idmConfigURLTemplate,
    getHostBaseUrl(state2.getHost()),
    entityId
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function putConfigEntity({
  entityId,
  entityData,
  state: state2
}) {
  const urlString = util3.format(
    idmConfigURLTemplate,
    getHostBaseUrl(state2.getHost()),
    entityId
  );
  const { data } = await generateIdmApi({ state: state2 }).put(urlString, entityData);
  return data;
}
async function deleteConfigEntity({
  entityId,
  state: state2
}) {
  const urlString = util3.format(
    idmConfigURLTemplate,
    getHostBaseUrl(state2.getHost()),
    entityId
  );
  const { data } = await generateIdmApi({ state: state2 }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/OAuth2OIDCApi.ts
import qs2 from "qs";
import util4 from "util";
var authorizeUrlTemplate = "%s/oauth2%s/authorize";
var accessTokenUrlTemplate = "%s/oauth2%s/access_token";
var tokenInfoUrlTemplate = "%s/oauth2%s/tokeninfo";
var apiVersion3 = "protocol=2.1,resource=1.0";
var getApiConfig3 = () => ({
  apiVersion: apiVersion3
});
async function authorize({
  amBaseUrl,
  data,
  config,
  state: state2
}) {
  const authorizeURL = util4.format(authorizeUrlTemplate, amBaseUrl, "");
  return generateOauth2Api({
    resource: getApiConfig3(),
    requestOverride: {},
    state: state2
  }).post(authorizeURL, data, config);
}
async function accessToken({
  amBaseUrl,
  postData,
  config,
  realm = false,
  state: state2
}) {
  const accessTokenURL = util4.format(
    accessTokenUrlTemplate,
    amBaseUrl,
    realm ? getCurrentRealmPath(state2) : ""
  );
  const { data } = await generateOauth2Api({
    resource: getApiConfig3(),
    requestOverride: {},
    authenticate: false,
    state: state2
  }).post(accessTokenURL, postData, config);
  return data;
}
async function getTokenInfo({
  amBaseUrl,
  config,
  state: state2
}) {
  const accessTokenURL = util4.format(tokenInfoUrlTemplate, amBaseUrl, "");
  const { data } = await generateOauth2Api({
    resource: getApiConfig3(),
    requestOverride: {},
    state: state2
  }).get(accessTokenURL, config);
  return data;
}
async function clientCredentialsGrant({
  amBaseUrl,
  clientId,
  clientSecret,
  scope,
  state: state2
}) {
  const urlString = util4.format(
    accessTokenUrlTemplate,
    amBaseUrl,
    getCurrentRealmPath(state2)
  );
  const requestOverride = {
    headers: {
      Authorization: `Basic ${encode(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const requestBody = {
    grant_type: "client_credentials",
    scope
  };
  const { data } = await generateOauth2Api({
    resource: getApiConfig3(),
    requestOverride,
    state: state2
  }).post(urlString, qs2.stringify(requestBody), { withCredentials: true });
  return data;
}

// src/api/OAuth2ClientApi.ts
import util5 from "util";
var oauth2ClientURLTemplate = "%s/json%s/realm-config/agents/OAuth2Client/%s";
var oauth2ClientListURLTemplate = "%s/json%s/realm-config/agents/OAuth2Client?_queryFilter=true";
var apiVersion4 = "protocol=2.1,resource=1.0";
var getApiConfig4 = () => {
  return {
    apiVersion: apiVersion4
  };
};
async function getOAuth2Clients({
  state: state2
}) {
  const urlString = util5.format(
    oauth2ClientListURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig4(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getOAuth2Client({
  id: id2,
  state: state2
}) {
  const urlString = util5.format(
    oauth2ClientURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({ resource: getApiConfig4(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function putOAuth2Client({
  id: id2,
  clientData,
  state: state2
}) {
  const client = deleteDeepByKey(clientData, "-encrypted");
  delete client._provider;
  delete client._rev;
  const urlString = util5.format(
    oauth2ClientURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({ resource: getApiConfig4(), state: state2 }).put(
    urlString,
    client,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteOAuth2Client({
  id: id2,
  state: state2
}) {
  const urlString = util5.format(
    oauth2ClientURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({
    resource: getApiConfig4(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/utils/ExportImportUtils.ts
import fs from "fs";
import { lstat, readdir, readFile } from "fs/promises";
import { join } from "path";
import replaceall from "replaceall";
import slugify from "slugify";
var ExportImportUtils_default = (state2) => {
  return {
    getMetadata() {
      return getMetadata({ state: state2 });
    },
    titleCase(input) {
      return titleCase(input);
    },
    getRealmString() {
      return getRealmString({ state: state2 });
    },
    convertBase64TextToArray(b64text) {
      return convertBase64TextToArray(b64text);
    },
    convertBase64UrlTextToArray(b64UTF8Text) {
      return convertBase64UrlTextToArray(b64UTF8Text);
    },
    convertTextArrayToBase64(textArray) {
      return convertTextArrayToBase64(textArray);
    },
    convertTextArrayToBase64Url(textArray) {
      return convertTextArrayToBase64Url(textArray);
    },
    validateImport(metadata) {
      return validateImport(metadata);
    },
    getTypedFilename(name2, type, suffix = "json") {
      return getTypedFilename(name2, type, suffix);
    },
    getWorkingDirectory(mkdirs = false) {
      return getWorkingDirectory({ mkdirs, state: state2 });
    },
    getFilePath(fileName, mkdirs = false) {
      return getFilePath({ fileName, mkdirs, state: state2 });
    },
    saveToFile(type, data, identifier, filename, includeMeta = true) {
      return saveToFile({
        type,
        data,
        identifier,
        filename,
        includeMeta,
        state: state2
      });
    },
    saveJsonToFile(data, filename, includeMeta = true) {
      return saveJsonToFile({ data, filename, includeMeta, state: state2 });
    },
    saveTextToFile(data, filename) {
      return saveTextToFile({ data, filename, state: state2 });
    },
    appendTextToFile(data, filename) {
      return appendTextToFile(data, filename);
    },
    findFilesByName(fileName, fast = true, path5 = "./") {
      return findFilesByName(fileName, fast, path5);
    },
    async readFiles(directory) {
      return readFiles(directory);
    },
    substituteEnvParams(input, reader) {
      return substituteEnvParams(input, reader);
    },
    unSubstituteEnvParams(input, reader) {
      return unSubstituteEnvParams(input, reader);
    },
    parseUrl(href) {
      return parseUrl(href);
    },
    isValidUrl(urlString) {
      return isValidUrl(urlString);
    }
  };
};
function getMetadata({ state: state2 }) {
  const metadata = {
    origin: state2.getHost(),
    originAmVersion: state2.getAmVersion(),
    exportedBy: state2.getUsername(),
    exportDate: (/* @__PURE__ */ new Date()).toISOString(),
    exportTool: Constants_default.FRODO_METADATA_ID,
    exportToolVersion: state2.getFrodoVersion()
  };
  return metadata;
}
function titleCase(input) {
  const str = input.toString();
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
  }
  return splitStr.join(" ");
}
function getRealmString({ state: state2 }) {
  const realm = state2.getRealm();
  return realm.split("/").reduce((result, item) => `${result}${titleCase(item)}`, "");
}
function convertBase64TextToArray(b64text) {
  let arrayOut = [];
  let plainText = decode(b64text);
  plainText = plainText.replace(/\t/g, "    ");
  arrayOut = plainText.split("\n");
  return arrayOut;
}
function convertBase64UrlTextToArray(b64UTF8Text) {
  let arrayOut = [];
  let plainText = decodeBase64Url(b64UTF8Text);
  plainText = plainText.replace(/\t/g, "    ");
  arrayOut = plainText.split("\n");
  return arrayOut;
}
function convertTextArrayToBase64(textArray) {
  const joinedText = textArray.join("\n");
  const b64encodedScript = encode(joinedText);
  return b64encodedScript;
}
function convertTextArrayToBase64Url(textArray) {
  const joinedText = textArray.join("\n");
  const b64encodedScript = encodeBase64Url(joinedText);
  return b64encodedScript;
}
function validateImport(metadata) {
  return metadata || true;
}
function getTypedFilename(name2, type, suffix = "json") {
  const slug = slugify(name2.replace(/^http(s?):\/\//, ""), {
    remove: /[^\w\s$*_+~.()'"!\-@]+/g
  });
  return `${slug}.${type}.${suffix}`;
}
function getWorkingDirectory({
  mkdirs = false,
  state: state2
}) {
  let wd = ".";
  if (state2.getDirectory()) {
    wd = state2.getDirectory().replace(/\/$/, "");
    if (mkdirs && !fs.existsSync(wd)) {
      debugMessage({
        message: `ExportImportUtils.getWorkingDirectory: creating directory '${wd}'`,
        state: state2
      });
      fs.mkdirSync(wd, { recursive: true });
    }
  }
  return wd;
}
function getFilePath({
  fileName,
  mkdirs = false,
  state: state2
}) {
  return state2.getDirectory() ? `${getWorkingDirectory({ mkdirs, state: state2 })}/${fileName}` : fileName;
}
function saveToFile({
  type,
  data,
  identifier,
  filename,
  includeMeta,
  state: state2
}) {
  const exportData = {};
  exportData[type] = {};
  if (Array.isArray(data)) {
    data.forEach((element) => {
      exportData[type][element[identifier]] = element;
    });
  } else {
    exportData[type][data[identifier]] = data;
  }
  saveJsonToFile({
    data: exportData,
    includeMeta,
    filename,
    state: state2
  });
}
function saveJsonToFile({
  data,
  filename,
  includeMeta = true,
  state: state2
}) {
  const exportData = data;
  if (includeMeta && !exportData["meta"])
    exportData["meta"] = getMetadata({ state: state2 });
  if (!includeMeta && exportData["meta"])
    delete exportData["meta"];
  deleteDeepByKey(exportData, "_rev");
  return saveTextToFile({
    data: stringify(exportData),
    filename,
    state: state2
  });
}
function saveTextToFile({
  data,
  filename,
  state: state2
}) {
  try {
    fs.writeFileSync(filename, data);
    return true;
  } catch (err) {
    printMessage({
      message: `ERROR - can't save ${filename}`,
      type: "error",
      state: state2
    });
    return false;
  }
}
function appendTextToFile(data, filename) {
  fs.appendFileSync(filename, data);
}
function findFilesByName(fileName, fast = true, path5 = "./") {
  const entries = fs.readdirSync(path5, {
    encoding: "utf8",
    withFileTypes: true
  });
  const files = entries.filter((entry) => !entry.isDirectory()).filter((file) => file.name === fileName).map((file) => path5 + file.name);
  if (fast && files.length > 0)
    return files;
  const folders = entries.filter((entry) => entry.isDirectory());
  for (const folder of folders)
    files.push(...findFilesByName(fileName, fast, `${path5}${folder.name}/`));
  return files;
}
async function readFiles(directory) {
  const items = await readdir(directory);
  const filePathsNested = await Promise.all(
    items.map(async (entity) => {
      const path5 = join(directory, entity);
      const isDirectory = (await lstat(path5)).isDirectory();
      if (isDirectory) {
        return readFiles(path5);
      }
      return {
        path: path5,
        content: await readFile(path5, "utf8")
      };
    })
  );
  return filePathsNested.flat();
}
function substituteEnvParams(input, reader) {
  reader.each((key, value) => {
    input = replaceall(value, `\${${key}}`, input);
  });
  return input;
}
function unSubstituteEnvParams(input, reader) {
  reader.each((key, value) => {
    input = replaceall(`\${${key}}`, value, input);
  });
  return input;
}
function parseUrl(href) {
  const m = href.match(
    /^(([^:/?#]+):?(?:\/\/((?:([^/?#:]*):([^/?#:]*)@)?([^/?#:]*)(?::([^/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
  ), r = {
    hash: m[10] || "",
    host: m[3] || "",
    hostname: m[6] || "",
    href: m[0] || "",
    origin: m[1] || "",
    pathname: m[8] || (m[1] ? "/" : ""),
    port: m[7] || "",
    protocol: m[2] || "",
    search: m[9] || "",
    username: m[4] || "",
    password: m[5] || "",
    searchParam: {}
    // { realm: '/bravo',
    //   authIndexType: 'service',
    //   authIndexValue: 'InitiateOwnerClaim' }
  };
  if (r.protocol.length == 2) {
    r.protocol = "file:///" + r.protocol.toUpperCase();
    r.origin = r.protocol + "//" + r.host;
  }
  if (r.search.length > 2) {
    const query = r.search.indexOf("?") === 0 ? r.search.substr(1) : r.search;
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      r.searchParam[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
  }
  r.href = r.origin + r.pathname + r.search + r.hash;
  return r;
}
function isValidUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (error) {
    return false;
  }
}
async function exportOrImportWithErrorHandling(func, parameters, errors) {
  try {
    return await func(parameters);
  } catch (error) {
    if (errors && Array.isArray(errors)) {
      errors.push(error);
    }
    return null;
  }
}

// src/ops/FrodoError.ts
var FrodoError = class extends Error {
  originalErrors = [];
  isHttpError = false;
  httpCode;
  httpStatus;
  httpMessage;
  httpDetail;
  httpErrorText;
  httpErrorReason;
  httpDescription;
  constructor(message, originalErrors = null) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    if (originalErrors && Array.isArray(originalErrors)) {
      this.originalErrors = originalErrors;
    } else if (originalErrors) {
      this.originalErrors = [originalErrors];
    }
    if (originalErrors) {
      const error = this.originalErrors[0];
      this.isHttpError = error.name === "AxiosError";
      this.httpCode = error["code"];
      this.httpStatus = error["response"] ? error["response"].status : null;
      this.httpMessage = error["response"] ? error["response"].data ? error["response"].data.message : null : null;
      this.httpDetail = error["response"] ? error["response"].data ? error["response"].data.detail : null : null;
      this.httpErrorText = error["response"] ? error["response"].data ? error["response"].data.error : null : null;
      this.httpErrorReason = error["response"] ? error["response"].data ? error["response"].data.reason : null : null;
      this.httpDescription = error["response"] ? error["response"].data ? error["response"].data.error_description : null : null;
    }
  }
  getOriginalErrors() {
    return this.originalErrors;
  }
  getCombinedMessage() {
    let combinedMessage = this.message || "";
    this.originalErrors.forEach((error) => {
      switch (error.name) {
        case "FrodoError":
          combinedMessage += "\n  " + error.getCombinedMessage();
          break;
        case "AxiosError":
          {
            combinedMessage += "\n  HTTP client error";
            combinedMessage += this.httpCode ? `
    Code: ${this.httpCode}` : "";
            combinedMessage += this.httpStatus ? `
    Status: ${this.httpStatus}` : "";
            combinedMessage += this.httpErrorText ? `
    Error: ${this.httpErrorText}` : "";
            combinedMessage += this.httpErrorReason ? `
    Reason: ${this.httpErrorReason}` : "";
            combinedMessage += this.httpMessage ? `
    Message: ${this.httpMessage}` : "";
            combinedMessage += this.httpDetail ? `
    Detail: ${this.httpDetail}` : "";
            combinedMessage += this.httpDescription ? `
    Description: ${this.httpDescription}` : "";
          }
          break;
        default:
          combinedMessage += "\n  " + error.message;
          break;
      }
    });
    return combinedMessage;
  }
  toString() {
    this.getCombinedMessage();
  }
};

// src/api/OAuth2ProviderApi.ts
import util6 from "util";
var oAuth2ProviderServiceURLTemplate = "%s/json%s/realm-config/services/oauth-oidc";
var createOAuth2ProviderServiceURLTemplate = "%s/json%s/realm-config/services/oauth-oidc?_action=create";
var apiVersion5 = "protocol=2.1,resource=1.0";
var getApiConfig5 = () => {
  return {
    apiVersion: apiVersion5
  };
};
async function getOAuth2Provider({
  state: state2
}) {
  const urlString = util6.format(
    oAuth2ProviderServiceURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig5(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
var providerTemplate = {
  advancedOAuth2Config: {
    supportedScopes: [],
    persistentClaims: [],
    passwordGrantAuthService: "[Empty]"
  },
  advancedOIDCConfig: { authorisedOpenIdConnectSSOClients: [] },
  pluginsConfig: { oidcClaimsClass: "", accessTokenModifierClass: "" }
};
async function createOAuth2Provider({
  providerData = providerTemplate,
  state: state2
}) {
  const urlString = util6.format(
    createOAuth2ProviderServiceURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig5(),
    state: state2
  }).post(urlString, providerData, {
    withCredentials: true
  });
  return data;
}
async function putOAuth2Provider({
  providerData,
  state: state2
}) {
  const provider = cloneDeep(providerData);
  delete provider._rev;
  const urlString = util6.format(
    oAuth2ProviderServiceURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig5(), state: state2 }).put(
    urlString,
    provider,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteOAuth2Provider({
  state: state2
}) {
  const urlString = util6.format(
    oAuth2ProviderServiceURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig5(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/OAuth2ProviderOps.ts
var OAuth2ProviderOps_default = (state2) => {
  return {
    async readOAuth2Provider() {
      return readOAuth2Provider({ state: state2 });
    },
    async createOAuth2Provider(providerData) {
      return createOAuth2Provider2({ providerData, state: state2 });
    },
    async updateOAuth2Provider(providerData) {
      return updateOAuth2Provider({ providerData, state: state2 });
    },
    async deleteOAuth2Provider() {
      return deleteOAuth2Provider2({ state: state2 });
    },
    // Deprecated
    async getOAuth2Provider() {
      return readOAuth2Provider({ state: state2 });
    }
  };
};
async function readOAuth2Provider({
  state: state2
}) {
  try {
    return getOAuth2Provider({ state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading oauth2 provider`, error);
  }
}
async function createOAuth2Provider2({
  providerData,
  state: state2
}) {
  try {
    return createOAuth2Provider({ providerData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error creating oauth2 provider`, error);
  }
}
async function updateOAuth2Provider({
  providerData,
  state: state2
}) {
  try {
    return putOAuth2Provider({ providerData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error updating oauth2 provider`, error);
  }
}
async function deleteOAuth2Provider2({
  state: state2
}) {
  try {
    return deleteOAuth2Provider({ state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting oauth2 provider`, error);
  }
}

// src/ops/ScriptOps.ts
import { v4 as uuidv42 } from "uuid";

// src/api/ScriptApi.ts
import util7 from "util";
var scriptURLTemplate = "%s/json%s/scripts/%s";
var scriptListURLTemplate = "%s/json%s/scripts?_queryFilter=true";
var scriptQueryURLTemplate = "%s/json%s/scripts?_queryFilter=name+eq+%%22%s%%22";
var apiVersion6 = "protocol=2.0,resource=1.0";
var getApiConfig6 = () => {
  return {
    apiVersion: apiVersion6
  };
};
async function getScripts({
  state: state2
}) {
  const urlString = util7.format(
    scriptListURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig6(), state: state2 }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getScriptByName({
  scriptName,
  state: state2
}) {
  const urlString = util7.format(
    scriptQueryURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    encodeURIComponent(scriptName)
  );
  const { data } = await generateAmApi({ resource: getApiConfig6(), state: state2 }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getScript({
  scriptId,
  state: state2
}) {
  const urlString = util7.format(
    scriptURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    scriptId
  );
  const { data } = await generateAmApi({ resource: getApiConfig6(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function putScript({
  scriptId,
  scriptData,
  state: state2
}) {
  const urlString = util7.format(
    scriptURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    scriptId
  );
  const { data } = await generateAmApi({ resource: getApiConfig6(), state: state2 }).put(
    urlString,
    scriptData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteScript({
  scriptId,
  state: state2
}) {
  const urlString = util7.format(
    scriptURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    scriptId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig6(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}
async function deleteScriptByName({
  scriptName,
  state: state2
}) {
  const { result } = await getScriptByName({ scriptName, state: state2 });
  if (!result[0]) {
    throw new Error(`Script with name ${scriptName} does not exist.`);
  }
  const scriptId = result[0]._id;
  return deleteScript({
    scriptId,
    state: state2
  });
}
async function deleteScripts({
  state: state2
}) {
  const { result } = await getScripts({ state: state2 });
  const scripts = result.filter((s) => !s.default);
  const deletedScripts = [];
  const errors = [];
  for (const script of scripts) {
    try {
      deletedScripts.push(
        await deleteScript({
          scriptId: script._id,
          state: state2
        })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length) {
    const errorMessages = errors.map((error) => error.message).join("\n");
    throw new Error(`Delete error:
${errorMessages}`);
  }
  return deletedScripts;
}

// src/utils/ScriptValidationUtils.ts
import { parseScript } from "esprima";
var ScriptValidationUtils_default = (state2) => {
  return {
    validateScriptHooks(jsonData) {
      validateScriptHooks({ jsonData });
    },
    validateScript(scriptData) {
      validateScript({ scriptData });
    },
    validateJs(javascriptSource) {
      validateJs({ javascriptSource });
    },
    areScriptHooksValid(jsonData) {
      return areScriptHooksValid({ jsonData, state: state2 });
    },
    isScriptValid(scriptData) {
      return isScriptValid({ scriptData, state: state2 });
    },
    isValidJs(javascriptSource) {
      return isValidJs({ javascriptSource, state: state2 });
    }
  };
};
function findAllScriptHooks(jsonData, scriptHooksArray = []) {
  if (typeof jsonData !== "object" || jsonData === null) {
    return scriptHooksArray;
  }
  for (const key in jsonData) {
    const item = jsonData[key];
    if (typeof item !== "object" || item === null) {
      continue;
    }
    if ("type" in item && item.type === "text/javascript") {
      scriptHooksArray.push(item);
    } else {
      findAllScriptHooks(item, scriptHooksArray);
    }
  }
  return scriptHooksArray;
}
function validateScriptHooks({ jsonData }) {
  const scriptHooks = findAllScriptHooks(jsonData);
  for (const scriptHook of scriptHooks) {
    if (!("source" in scriptHook)) {
      continue;
    }
    validateJs({ javascriptSource: scriptHook.source });
  }
}
function validateScript({
  scriptData
}) {
  if (scriptData.language === "JAVASCRIPT") {
    const script = Array.isArray(scriptData.script) ? scriptData.script.join("\n") : decode(scriptData.script);
    validateJs({ javascriptSource: script });
  }
}
function validateJs({ javascriptSource }) {
  parseScript(javascriptSource);
  return true;
}
function areScriptHooksValid({
  jsonData,
  state: state2
}) {
  const scriptHooks = findAllScriptHooks(jsonData);
  for (const scriptHook of scriptHooks) {
    if (!("source" in scriptHook)) {
      continue;
    }
    if (!isValidJs({ javascriptSource: scriptHook.source, state: state2 })) {
      return false;
    }
  }
  return true;
}
function isScriptValid({
  scriptData,
  state: state2
}) {
  if (scriptData.language === "JAVASCRIPT") {
    const script = Array.isArray(scriptData.script) ? scriptData.script.join("\n") : decode(scriptData.script);
    return isValidJs({ javascriptSource: script, state: state2 });
  }
  return true;
}
function isValidJs({
  javascriptSource,
  state: state2
}) {
  try {
    parseScript(javascriptSource);
    return true;
  } catch (e) {
    printMessage({
      message: `Invalid JavaScript: ${e.message}`,
      type: "error",
      state: state2
    });
    return false;
  }
}

// src/ops/ScriptOps.ts
var ScriptOps_default = (state2) => {
  return {
    createScriptExportTemplate() {
      return createScriptExportTemplate({ state: state2 });
    },
    async readScripts() {
      return readScripts({ state: state2 });
    },
    async readScript(scriptId) {
      return readScript({ scriptId, state: state2 });
    },
    async readScriptByName(scriptName) {
      return readScriptByName({ scriptName, state: state2 });
    },
    async createScript(scriptId, scriptName, scriptData) {
      return createScript({ scriptId, scriptName, scriptData, state: state2 });
    },
    async updateScript(scriptId, scriptData) {
      return updateScript({ scriptId, scriptData, state: state2 });
    },
    async deleteScript(scriptId) {
      return deleteScript2({ scriptId, state: state2 });
    },
    async deleteScriptByName(scriptName) {
      return deleteScriptByName2({ scriptName, state: state2 });
    },
    async deleteScripts() {
      return deleteScripts2({ state: state2 });
    },
    async exportScript(scriptId) {
      return exportScript({ scriptId, state: state2 });
    },
    async exportScriptByName(scriptName) {
      return exportScriptByName({ scriptName, state: state2 });
    },
    async exportScripts(includeDefault = false) {
      return exportScripts({ includeDefault, state: state2 });
    },
    async importScripts(scriptName, importData, options = {
      reUuid: false,
      includeDefault: false
    }, validate = false) {
      return importScripts({
        scriptName,
        importData,
        options,
        validate,
        state: state2
      });
    },
    // Deprecated
    async getScripts() {
      return readScripts({ state: state2 });
    },
    async getScript(scriptId) {
      return readScript({ scriptId, state: state2 });
    },
    async getScriptByName(scriptName) {
      return readScriptByName({ scriptName, state: state2 });
    },
    async putScript(scriptId, scriptData) {
      return updateScript({ scriptId, scriptData, state: state2 });
    }
  };
};
function createScriptExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {}
  };
}
async function readScripts({
  state: state2
}) {
  try {
    const { result } = await getScripts({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading scripts`, error);
  }
}
async function readScript({
  scriptId,
  state: state2
}) {
  try {
    return getScript({ scriptId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading script ${scriptId}`, error);
  }
}
async function readScriptByName({
  scriptName,
  state: state2
}) {
  try {
    const { result } = await getScriptByName({ scriptName, state: state2 });
    switch (result.length) {
      case 1:
        return result[0];
      case 0:
        throw new FrodoError(`Script '${scriptName}' not found`);
      default:
        throw new FrodoError(`${result.length} scripts '${scriptName}' found`);
    }
  } catch (error) {
    throw new FrodoError(`Error reading script ${scriptName}`, error);
  }
}
async function createScript({
  scriptId,
  scriptName,
  scriptData,
  state: state2
}) {
  debugMessage({ message: `ScriptOps.createOAuth2Client: start`, state: state2 });
  scriptData._id = scriptId;
  scriptData.name = scriptName;
  try {
    await getScript({ scriptId, state: state2 });
  } catch (error) {
    try {
      const result = await updateScript({
        scriptId,
        scriptData,
        state: state2
      });
      debugMessage({ message: `ScriptOps.createOAuth2Client: end`, state: state2 });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating script`, error2);
    }
  }
  throw new FrodoError(`Script ${scriptData._id} already exists!`);
}
async function updateScript({
  scriptId,
  scriptData,
  state: state2
}) {
  let result = null;
  try {
    if (Array.isArray(scriptData.script)) {
      scriptData.script = convertTextArrayToBase64(scriptData.script);
    }
    result = await putScript({ scriptId, scriptData, state: state2 });
  } catch (error) {
    if (error.response?.status === 409) {
      verboseMessage({
        message: `createOrUpdateScript WARNING: script with name ${scriptData.name} already exists, using renaming policy... <name> => <name - imported (n)>`,
        state: state2
      });
      const newName = applyNameCollisionPolicy(scriptData.name);
      scriptData.name = newName;
      result = await updateScript({ scriptId, scriptData, state: state2 });
      verboseMessage({
        message: `Saved script as ${newName}`,
        state: state2
      });
    } else
      throw new FrodoError(`Error updating script`, error);
  }
  return result;
}
async function deleteScript2({
  scriptId,
  state: state2
}) {
  try {
    return deleteScript({ scriptId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting script ${scriptId}`, error);
  }
}
async function deleteScriptByName2({
  scriptName,
  state: state2
}) {
  try {
    return deleteScriptByName({ scriptName, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting script ${scriptName}`, error);
  }
}
async function deleteScripts2({
  state: state2
}) {
  try {
    return deleteScripts({ state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting scripts`, error);
  }
}
async function exportScript({
  scriptId,
  state: state2
}) {
  try {
    debugMessage({ message: `ScriptOps.exportScriptById: start`, state: state2 });
    const scriptData = await getScript({ scriptId, state: state2 });
    scriptData.script = convertBase64TextToArray(scriptData.script);
    const exportData = createScriptExportTemplate({ state: state2 });
    exportData.script[scriptData._id] = scriptData;
    debugMessage({ message: `ScriptOps.exportScriptById: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting script ${scriptId}`, error);
  }
}
async function exportScriptByName({
  scriptName,
  state: state2
}) {
  try {
    debugMessage({ message: `ScriptOps.exportScriptByName: start`, state: state2 });
    const scriptData = await readScriptByName({ scriptName, state: state2 });
    scriptData.script = convertBase64TextToArray(scriptData.script);
    const exportData = createScriptExportTemplate({ state: state2 });
    exportData.script[scriptData._id] = scriptData;
    debugMessage({ message: `ScriptOps.exportScriptByName: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting script ${scriptName}`, error);
  }
}
async function exportScripts({
  includeDefault = false,
  state: state2
}) {
  const errors = [];
  let indicatorId;
  try {
    let scriptList = await readScripts({ state: state2 });
    if (!includeDefault)
      scriptList = scriptList.filter((script) => !script.default);
    const exportData = createScriptExportTemplate({ state: state2 });
    indicatorId = createProgressIndicator({
      total: scriptList.length,
      message: `Exporting ${scriptList.length} scripts...`,
      state: state2
    });
    for (const script of scriptList) {
      try {
        updateProgressIndicator({
          id: indicatorId,
          message: `Reading script ${script.name}`,
          state: state2
        });
        const scriptData = await readScriptByName({
          scriptName: script.name,
          state: state2
        });
        scriptData.script = convertBase64TextToArray(
          scriptData.script
        );
        exportData.script[scriptData._id] = scriptData;
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(``, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${scriptList.length} scripts.`,
      state: state2
    });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting scripts`,
      status: "fail",
      state: state2
    });
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting scripts`, error);
  }
}
async function importScripts({
  scriptName,
  importData,
  options = {
    reUuid: false,
    includeDefault: false
  },
  validate = false,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({ message: `ScriptOps.importScripts: start`, state: state2 });
    const response = [];
    for (const existingId of Object.keys(importData.script)) {
      try {
        const scriptData = importData.script[existingId];
        if (!options.includeDefault && scriptData.default)
          continue;
        let newId = existingId;
        if (options.reUuid) {
          newId = uuidv42();
          debugMessage({
            message: `ScriptOps.importScripts: Re-uuid-ing script ${scriptData.name} ${existingId} => ${newId}...`,
            state: state2
          });
          scriptData._id = newId;
        }
        if (scriptName) {
          debugMessage({
            message: `ScriptOps.importScripts: Renaming script ${scriptData.name} => ${scriptName}...`,
            state: state2
          });
          scriptData.name = scriptName;
        }
        if (validate) {
          if (!isScriptValid({ scriptData, state: state2 })) {
            errors.push(
              new FrodoError(
                `Error importing script '${scriptData.name}': Script is not valid`
              )
            );
          }
        }
        const result = await updateScript({
          scriptId: newId,
          scriptData,
          state: state2
        });
        response.push(result);
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing scripts`, errors);
    }
    debugMessage({ message: `ScriptOps.importScripts: end`, state: state2 });
    return response;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing scripts`, error);
  }
}

// src/ops/OAuth2ClientOps.ts
var OAuth2ClientOps_default = (state2) => {
  return {
    createOAuth2ClientExportTemplate() {
      return createOAuth2ClientExportTemplate({ state: state2 });
    },
    async readOAuth2Clients() {
      return readOAuth2Clients({ state: state2 });
    },
    async readOAuth2Client(clientId) {
      return readOAuth2Client({ clientId, state: state2 });
    },
    async createOAuth2Client(clientId, clientData) {
      return createOAuth2Client({ clientId, clientData, state: state2 });
    },
    async updateOAuth2Client(clientId, clientData) {
      return updateOAuth2Client({ clientId, clientData, state: state2 });
    },
    async deleteOAuth2Clients() {
      return deleteOAuth2Clients({ state: state2 });
    },
    async deleteOAuth2Client(clientId) {
      return deleteOAuth2Client2({ clientId, state: state2 });
    },
    async exportOAuth2Clients(options = { useStringArrays: true, deps: true }) {
      return exportOAuth2Clients({ options, state: state2 });
    },
    async exportOAuth2Client(clientId, options = { useStringArrays: true, deps: true }) {
      return exportOAuth2Client({ clientId, options, state: state2 });
    },
    async importOAuth2Client(clientId, importData, options = { deps: true }) {
      return importOAuth2Client({
        clientId,
        importData,
        options,
        state: state2
      });
    },
    async importFirstOAuth2Client(importData, options = { deps: true }) {
      return importFirstOAuth2Client({ importData, options, state: state2 });
    },
    async importOAuth2Clients(importData, options = { deps: true }) {
      return importOAuth2Clients({ importData, options, state: state2 });
    },
    // Deprecated
    async getOAuth2Clients() {
      return readOAuth2Clients({ state: state2 });
    },
    async getOAuth2Client(clientId) {
      return readOAuth2Client({ clientId, state: state2 });
    },
    async putOAuth2Client(clientId, clientData) {
      return updateOAuth2Client({ clientId, clientData, state: state2 });
    }
  };
};
function createOAuth2ClientExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    application: {}
  };
}
async function readOAuth2Clients({
  state: state2
}) {
  try {
    const clients = (await getOAuth2Clients({ state: state2 })).result;
    return clients;
  } catch (error) {
    throw new FrodoError(`Error reading oauth2 clients`, error);
  }
}
async function readOAuth2Client({
  clientId,
  state: state2
}) {
  try {
    return getOAuth2Client({ id: clientId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading oauth2 client ${clientId}`, error);
  }
}
async function createOAuth2Client({
  clientId,
  clientData,
  state: state2
}) {
  debugMessage({ message: `OAuth2ClientOps.createOAuth2Client: start`, state: state2 });
  try {
    await readOAuth2Client({ clientId, state: state2 });
  } catch (error) {
    try {
      const result = await updateOAuth2Client({
        clientId,
        clientData,
        state: state2
      });
      debugMessage({
        message: `OAuth2ClientOps.createOAuth2Client: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating oauth2 client ${clientId}`, error2);
    }
  }
  throw new FrodoError(`OAuth2 client ${clientId} already exists!`);
}
async function updateOAuth2Client({
  clientId,
  clientData,
  state: state2
}) {
  debugMessage({ message: `OAuth2ClientOps.putOAuth2Client: start`, state: state2 });
  try {
    const response = await putOAuth2Client({
      id: clientId,
      clientData,
      state: state2
    });
    debugMessage({ message: `OAuth2ClientOps.putOAuth2Client: end`, state: state2 });
    return response;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message === "Invalid attribute specified.") {
      try {
        const { validAttributes } = error.response.data.detail;
        validAttributes.push("_id");
        for (const key of Object.keys(clientData)) {
          if (typeof clientData[key] === "object") {
            for (const attribute of Object.keys(clientData[key])) {
              if (!validAttributes.includes(attribute)) {
                if (state2.getVerbose() || state2.getDebug())
                  printMessage({
                    message: `
- Removing invalid attribute: ${key}.${attribute}`,
                    type: "warn",
                    state: state2
                  });
                delete clientData[key][attribute];
              }
            }
          }
        }
        const response = await putOAuth2Client({
          id: clientId,
          clientData,
          state: state2
        });
        debugMessage({
          message: `OAuth2ClientOps.putOAuth2Client: end`,
          state: state2
        });
        return response;
      } catch (error2) {
        throw new FrodoError(`Error updating oauth2 client ${clientId}`, error2);
      }
    } else {
      throw new FrodoError(`Error updating oauth2 client ${clientId}`, error);
    }
  }
}
async function deleteOAuth2Clients({
  state: state2
}) {
  debugMessage({
    message: `OAuth2ClientOps.deleteOAuth2Clients: start`,
    state: state2
  });
  const result = [];
  const errors = [];
  try {
    const clients = await readOAuth2Clients({ state: state2 });
    for (const client of clients) {
      try {
        debugMessage({
          message: `OAuth2ClientOps.deleteOAuth2Clients: '${client._id}'`,
          state: state2
        });
        result.push(
          await deleteOAuth2Client2({
            clientId: client._id,
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length) {
    throw new FrodoError(`Error deleting oauth2 clients`, errors);
  }
  debugMessage({
    message: `OAuth2ClientOps.deleteOAuth2Clients: end`,
    state: state2
  });
  return result;
}
async function deleteOAuth2Client2({
  clientId,
  state: state2
}) {
  try {
    return deleteOAuth2Client({ id: clientId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting oauth2 client ${clientId}`, error);
  }
}
async function exportOAuth2ClientDependencies(clientData, options, exportData, state2) {
  debugMessage({
    message: `OAuth2ClientOps.exportOAuth2ClientDependencies: start [client=${clientData["_id"]}]`,
    state: state2
  });
  if (clientData["overrideOAuth2ClientConfig"]) {
    for (const key of Object.keys(clientData["overrideOAuth2ClientConfig"])) {
      if (key.endsWith("Script")) {
        const scriptId = clientData["overrideOAuth2ClientConfig"][key];
        if (scriptId !== "[Empty]" && !exportData.script[scriptId]) {
          try {
            debugMessage({
              message: `- ${scriptId} referenced by ${clientData["_id"]}`,
              state: state2
            });
            const scriptData = await readScript({ scriptId, state: state2 });
            if (options.useStringArrays)
              scriptData.script = convertBase64TextToArray(
                scriptData.script
              );
            exportData.script[scriptId] = scriptData;
          } catch (error) {
            if (!(error.response?.status === 403 && error.response?.data?.message === "This operation is not available in ForgeRock Identity Cloud.")) {
              throw new FrodoError(
                `Error retrieving script ${scriptId} referenced by ${key} key in client ${clientData["_id"]}`,
                error
              );
            }
          }
        }
      }
    }
  }
  debugMessage({
    message: `OAuth2ClientOps.exportOAuth2ClientDependencies: end`,
    state: state2
  });
}
async function exportOAuth2Clients({
  options = { useStringArrays: true, deps: true },
  state: state2
}) {
  debugMessage({
    message: `OAuth2ClientOps.exportOAuth2Clients: start`,
    state: state2
  });
  const exportData = createOAuth2ClientExportTemplate({ state: state2 });
  const errors = [];
  let indicatorId;
  try {
    const provider = await readOAuth2Provider({ state: state2 });
    const clients = await readOAuth2Clients({ state: state2 });
    indicatorId = createProgressIndicator({
      total: clients.length,
      message: "Exporting OAuth2 clients...",
      state: state2
    });
    for (const client of clients) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting OAuth2 client ${client._id}`,
        state: state2
      });
      try {
        client._provider = provider;
        exportData.application[client._id] = client;
        if (options.deps) {
          await exportOAuth2ClientDependencies(
            client,
            options,
            exportData,
            state2
          );
        }
      } catch (error) {
        errors.push(error);
      }
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${clients.length} OAuth2 clients.`,
      state: state2
    });
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting oauth2 clients`, errors);
  }
  debugMessage({ message: `OAuth2ClientOps.exportOAuth2Clients: end`, state: state2 });
  return exportData;
}
async function exportOAuth2Client({
  clientId,
  options = { useStringArrays: true, deps: true },
  state: state2
}) {
  debugMessage({ message: `OAuth2ClientOps.exportOAuth2Client: start`, state: state2 });
  const exportData = createOAuth2ClientExportTemplate({ state: state2 });
  const errors = [];
  try {
    const clientData = await readOAuth2Client({ clientId, state: state2 });
    clientData._provider = await readOAuth2Provider({ state: state2 });
    exportData.application[clientData._id] = clientData;
    if (options.deps) {
      await exportOAuth2ClientDependencies(
        clientData,
        options,
        exportData,
        state2
      );
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting oauth2 client ${clientId}`, errors);
  }
  debugMessage({ message: `OAuth2ClientOps.exportOAuth2Client: end`, state: state2 });
  return exportData;
}
async function importOAuth2ClientDependencies(clientData, importData, state2) {
  if (clientData["overrideOAuth2ClientConfig"]) {
    for (const key of Object.keys(clientData["overrideOAuth2ClientConfig"])) {
      if (key.endsWith("Script")) {
        const scriptId = clientData["overrideOAuth2ClientConfig"][key];
        if (scriptId !== "[Empty]" && importData.script[scriptId]) {
          try {
            const scriptData = importData.script[scriptId];
            await updateScript({ scriptId, scriptData, state: state2 });
          } catch (error) {
            throw new FrodoError(
              `Error importing script dependency ${scriptId}`,
              error
            );
          }
        }
      }
    }
  }
}
async function importOAuth2Client({
  clientId,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.application)) {
    if (id2 === clientId) {
      try {
        const clientData = importData.application[id2];
        delete clientData._provider;
        delete clientData._rev;
        if (options.deps) {
          await importOAuth2ClientDependencies(clientData, importData, state2);
        }
        response = await updateOAuth2Client({
          clientId: id2,
          clientData,
          state: state2
        });
        imported.push(id2);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing oauth2 client ${clientId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`Oauth2 client ${clientId} not found in import data!`);
  }
  return response;
}
async function importFirstOAuth2Client({
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.application)) {
    try {
      const clientData = importData.application[id2];
      delete clientData._provider;
      delete clientData._rev;
      if (options.deps) {
        await importOAuth2ClientDependencies(clientData, importData, state2);
      }
      response = await updateOAuth2Client({ clientId: id2, clientData, state: state2 });
      imported.push(id2);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first oauth2 client`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No oauth2 clients found in import data!`);
  }
  return response;
}
async function importOAuth2Clients({
  importData,
  options = { deps: true },
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const id2 of Object.keys(importData.application)) {
    try {
      const clientData = importData.application[id2];
      delete clientData._provider;
      delete clientData._rev;
      if (options.deps) {
        await importOAuth2ClientDependencies(clientData, importData, state2);
      }
      response.push(
        await updateOAuth2Client({ clientId: id2, clientData, state: state2 })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing oauth2 clients`, errors);
  }
  return response;
}

// src/ops/JoseOps.ts
import jose from "node-jose";
var JoseOps_default = (_state) => {
  return {
    async createJwkRsa() {
      return createJwkRsa();
    },
    async getJwkRsaPublic(jwkJson) {
      return getJwkRsaPublic(jwkJson);
    },
    createJwks(...keys3) {
      return createJwks(...keys3);
    },
    async createSignedJwtToken(payload, jwkJson) {
      return createSignedJwtToken(payload, jwkJson);
    },
    async verifySignedJwtToken(jwt, jwkJson) {
      return verifySignedJwtToken(jwt, jwkJson);
    }
  };
};
async function createJwkRsa() {
  const jwk = await jose.JWK.createKey("RSA", 4096, { alg: "RS256" });
  return jwk.toJSON(true);
}
async function getJwkRsaPublic(jwkJson) {
  const jwk = await jose.JWK.asKey(jwkJson);
  return jwk.toJSON(false);
}
function createJwks(...keys3) {
  return {
    keys: keys3
  };
}
async function createSignedJwtToken(payload, jwkJson) {
  const key = await jose.JWK.asKey(jwkJson);
  if (typeof payload === "object") {
    payload = JSON.stringify(payload);
  }
  const jwt = await jose.JWS.createSign(
    { alg: "RS256", compact: true, fields: {} },
    // https://github.com/cisco/node-jose/issues/253
    { key, reference: false }
  ).update(payload).final();
  return jwt;
}
async function verifySignedJwtToken(jwt, jwkJson) {
  const jwk = await jose.JWK.asKey(jwkJson);
  const verifyResult = await jose.JWS.createVerify(jwk).verify(jwt);
  return verifyResult;
}

// src/ops/OAuth2OidcOps.ts
var OAuth2OidcOps_default = (state2) => {
  return {
    async authorize(amBaseUrl, data, config) {
      return authorize2({
        amBaseUrl,
        data,
        config,
        state: state2
      });
    },
    async accessToken(amBaseUrl, data, config) {
      return accessToken2({ amBaseUrl, config, data, state: state2 });
    },
    async accessTokenRfc7523AuthZGrant(clientId, jwt, scope, config) {
      return accessTokenRfc7523AuthZGrant({
        clientId,
        jwt,
        scope,
        config,
        state: state2
      });
    },
    async getTokenInfo(amBaseUrl, config) {
      return getTokenInfo2({
        amBaseUrl,
        config,
        state: state2
      });
    },
    async clientCredentialsGrant(amBaseUrl, clientId, clientSecret, scope) {
      return clientCredentialsGrant2({
        amBaseUrl,
        clientId,
        clientSecret,
        scope,
        state: state2
      });
    }
  };
};
async function authorize2({
  amBaseUrl,
  data,
  config,
  state: state2
}) {
  try {
    return authorize({ amBaseUrl, data, config, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error authorizing oauth2 client`, error);
  }
}
async function accessToken2({
  amBaseUrl,
  data,
  config,
  realm = false,
  state: state2
}) {
  try {
    const response = await accessToken({
      amBaseUrl,
      config,
      postData: data,
      realm,
      state: state2
    });
    response["expires"] = Date.now() + response.expires_in * 1e3;
    return response;
  } catch (error) {
    throw new FrodoError(`Error getting oauth2 access token`, error);
  }
}
async function accessTokenRfc7523AuthZGrant({
  clientId,
  jwt,
  scope,
  config = {},
  state: state2
}) {
  try {
    config = mergeDeep(config, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    });
    const data = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
      scope: scope.join(" "),
      client_id: clientId
    }).toString();
    return accessToken2({
      amBaseUrl: state2.getHost(),
      config,
      data,
      realm: true,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error getting oauth2 access token (RFC7523 AuthZ Grant)`,
      error
    );
  }
}
async function getTokenInfo2({
  amBaseUrl,
  config,
  state: state2
}) {
  try {
    return getTokenInfo({ amBaseUrl, config, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error getting oauth2 token info`, error);
  }
}
async function clientCredentialsGrant2({
  amBaseUrl,
  clientId,
  clientSecret,
  scope,
  state: state2
}) {
  try {
    const response = await clientCredentialsGrant({
      amBaseUrl,
      clientId,
      clientSecret,
      scope,
      state: state2
    });
    response["expires"] = (/* @__PURE__ */ new Date()).getTime() + response.expires_in;
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error getting access token using client credentials grant`,
      error
    );
  }
}

// src/api/OAuth2TrustedJwtIssuerApi.ts
import util8 from "util";
var oauth2TrustedJwtIssuerURLTemplate = "%s/json%s/realm-config/agents/TrustedJwtIssuer/%s";
var oauth2TrustedJwtIssuerListURLTemplate = "%s/json%s/realm-config/agents/OAuth2Client?_queryFilter=true";
var apiVersion7 = "protocol=2.0,resource=1.0";
var getApiConfig7 = () => {
  return {
    apiVersion: apiVersion7
  };
};
async function getOAuth2TrustedJwtIssuers({
  state: state2
}) {
  const urlString = util8.format(
    oauth2TrustedJwtIssuerListURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig7(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getOAuth2TrustedJwtIssuer({
  id: id2,
  state: state2
}) {
  const urlString = util8.format(
    oauth2TrustedJwtIssuerURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({ resource: getApiConfig7(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function putOAuth2TrustedJwtIssuer({
  id: id2,
  issuerData,
  state: state2
}) {
  const client = deleteDeepByKey(issuerData, "-encrypted");
  delete client._provider;
  delete client._rev;
  const urlString = util8.format(
    oauth2TrustedJwtIssuerURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({ resource: getApiConfig7(), state: state2 }).put(
    urlString,
    client,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteOAuth2TrustedJwtIssuer({
  id: id2,
  state: state2
}) {
  const urlString = util8.format(
    oauth2TrustedJwtIssuerURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({
    resource: getApiConfig7(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/OAuth2TrustedJwtIssuerOps.ts
var OAuth2TrustedJwtIssuerOps_default = (state2) => {
  return {
    createOAuth2TrustedJwtIssuerExportTemplate() {
      return createOAuth2TrustedJwtIssuerExportTemplate({ state: state2 });
    },
    async readOAuth2TrustedJwtIssuers() {
      return readOAuth2TrustedJwtIssuers({ state: state2 });
    },
    async readOAuth2TrustedJwtIssuer(issuerId) {
      return readOAuth2TrustedJwtIssuer({ issuerId, state: state2 });
    },
    async createOAuth2TrustedJwtIssuer(issuerId, issuerData) {
      return createOAuth2TrustedJwtIssuer({ issuerId, issuerData, state: state2 });
    },
    async updateOAuth2TrustedJwtIssuer(issuerId, issuerData) {
      return updateOAuth2TrustedJwtIssuer({ issuerId, issuerData, state: state2 });
    },
    async deleteOAuth2TrustedJwtIssuers() {
      return deleteOAuth2TrustedJwtIssuers({ state: state2 });
    },
    async deleteOAuth2TrustedJwtIssuer(issuerId) {
      return deleteOAuth2TrustedJwtIssuer2({ issuerId, state: state2 });
    },
    async exportOAuth2TrustedJwtIssuers(options = {
      useStringArrays: true,
      deps: true
    }) {
      return exportOAuth2TrustedJwtIssuers({ options, state: state2 });
    },
    async exportOAuth2TrustedJwtIssuer(issuerId) {
      return exportOAuth2TrustedJwtIssuer({ issuerId, state: state2 });
    },
    async importOAuth2TrustedJwtIssuer(issuerId, importData) {
      return importOAuth2TrustedJwtIssuer({
        issuerId,
        importData,
        state: state2
      });
    },
    async importFirstOAuth2TrustedJwtIssuer(importData) {
      return importFirstOAuth2TrustedJwtIssuer({ importData, state: state2 });
    },
    async importOAuth2TrustedJwtIssuers(importData) {
      return importOAuth2TrustedJwtIssuers({ importData, state: state2 });
    },
    // Deprecated
    async getOAuth2TrustedJwtIssuers() {
      return readOAuth2TrustedJwtIssuers({ state: state2 });
    },
    async getOAuth2TrustedJwtIssuer(issuerId) {
      return readOAuth2TrustedJwtIssuer({ issuerId, state: state2 });
    },
    async putOAuth2TrustedJwtIssuer(issuerId, issuerData) {
      return updateOAuth2TrustedJwtIssuer({ issuerId, issuerData, state: state2 });
    }
  };
};
function createOAuth2TrustedJwtIssuerExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    trustedJwtIssuer: {}
  };
}
async function readOAuth2TrustedJwtIssuers({
  state: state2
}) {
  try {
    const issuers = (await getOAuth2TrustedJwtIssuers({ state: state2 })).result;
    return issuers;
  } catch (error) {
    throw new FrodoError(`Error reading trusted issuers`, error);
  }
}
async function readOAuth2TrustedJwtIssuer({
  issuerId,
  state: state2
}) {
  try {
    return getOAuth2TrustedJwtIssuer({ id: issuerId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading trusted issuer ${issuerId}`, error);
  }
}
async function createOAuth2TrustedJwtIssuer({
  issuerId,
  issuerData,
  state: state2
}) {
  debugMessage({
    message: `OAuth2TrustedJwtIssuerOps.createOAuth2TrustedJwtIssuer: start`,
    state: state2
  });
  try {
    await readOAuth2TrustedJwtIssuer({ issuerId, state: state2 });
  } catch (error) {
    try {
      const result = await updateOAuth2TrustedJwtIssuer({
        issuerId,
        issuerData,
        state: state2
      });
      debugMessage({
        message: `OAuth2TrustedJwtIssuerOps.createOAuth2TrustedJwtIssuer: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating trusted issuer ${issuerId}`, error2);
    }
  }
  throw new FrodoError(`Trusted issuer ${issuerId} already exists!`);
}
async function updateOAuth2TrustedJwtIssuer({
  issuerId,
  issuerData,
  state: state2
}) {
  debugMessage({
    message: `OAuth2TrustedJwtIssuerOps.putOAuth2TrustedJwtIssuer: start`,
    state: state2
  });
  try {
    const response = await putOAuth2TrustedJwtIssuer({
      id: issuerId,
      issuerData,
      state: state2
    });
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.putOAuth2TrustedJwtIssuer: end`,
      state: state2
    });
    return response;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message === "Invalid attribute specified.") {
      try {
        const { validAttributes } = error.response.data.detail;
        validAttributes.push("_id");
        for (const key of Object.keys(issuerData)) {
          if (typeof issuerData[key] === "object") {
            for (const attribute of Object.keys(issuerData[key])) {
              if (!validAttributes.includes(attribute)) {
                if (state2.getVerbose() || state2.getDebug())
                  printMessage({
                    message: `
- Removing invalid attribute: ${key}.${attribute}`,
                    type: "warn",
                    state: state2
                  });
                delete issuerData[key][attribute];
              }
            }
          }
        }
        const response = await putOAuth2TrustedJwtIssuer({
          id: issuerId,
          issuerData,
          state: state2
        });
        debugMessage({
          message: `OAuth2TrustedJwtIssuerOps.putOAuth2TrustedJwtIssuer: end`,
          state: state2
        });
        return response;
      } catch (error2) {
        throw new FrodoError(
          `Error updating trusted issuer ${issuerId}`,
          error2
        );
      }
    } else {
      throw new FrodoError(`Error updating trusted issuer ${issuerId}`, error);
    }
  }
}
async function deleteOAuth2TrustedJwtIssuers({
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.deleteOAuth2TrustedJwtIssuers: start`,
      state: state2
    });
    const result = [];
    const issuers = await readOAuth2TrustedJwtIssuers({ state: state2 });
    for (const issuer of issuers) {
      try {
        debugMessage({
          message: `OAuth2TrustedJwtIssuerOps.deleteOAuth2TrustedJwtIssuers: '${issuer._id}'`,
          state: state2
        });
        result.push(
          await deleteOAuth2TrustedJwtIssuer2({
            issuerId: issuer._id,
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting trusted issuers`, errors);
    }
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.deleteOAuth2TrustedJwtIssuers: end`,
      state: state2
    });
    return result;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting trusted issuers`, error);
  }
}
async function deleteOAuth2TrustedJwtIssuer2({
  issuerId,
  state: state2
}) {
  try {
    return deleteOAuth2TrustedJwtIssuer({ id: issuerId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting trusted issuer ${issuerId}`, error);
  }
}
async function exportOAuth2TrustedJwtIssuers({
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.exportOAuth2TrustedJwtIssuers: start`,
      state: state2
    });
    const exportData = createOAuth2TrustedJwtIssuerExportTemplate({ state: state2 });
    const issuers = await readOAuth2TrustedJwtIssuers({ state: state2 });
    for (const issuer of issuers) {
      try {
        exportData.trustedJwtIssuer[issuer._id] = issuer;
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting trusted issuers`, errors);
    }
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.exportOAuth2TrustedJwtIssuers: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting trusted issuers`, error);
  }
}
async function exportOAuth2TrustedJwtIssuer({
  issuerId,
  state: state2
}) {
  try {
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.exportOAuth2TrustedJwtIssuer: start`,
      state: state2
    });
    const exportData = createOAuth2TrustedJwtIssuerExportTemplate({ state: state2 });
    const issuerData = await readOAuth2TrustedJwtIssuer({ issuerId, state: state2 });
    exportData.trustedJwtIssuer[issuerData._id] = issuerData;
    debugMessage({
      message: `OAuth2TrustedJwtIssuerOps.exportOAuth2TrustedJwtIssuer: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting trusted issuer ${issuerId}`, error);
  }
}
async function importOAuth2TrustedJwtIssuer({
  issuerId,
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.trustedJwtIssuer)) {
    if (id2 === issuerId) {
      try {
        const issuerData = importData.trustedJwtIssuer[id2];
        delete issuerData._provider;
        delete issuerData._rev;
        response = await updateOAuth2TrustedJwtIssuer({
          issuerId: id2,
          issuerData,
          state: state2
        });
        imported.push(id2);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing trusted issuer ${issuerId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(
      `Trusted issuer ${issuerId} not found in import data!`
    );
  }
  return response;
}
async function importFirstOAuth2TrustedJwtIssuer({
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.trustedJwtIssuer)) {
    try {
      const issuerData = importData.trustedJwtIssuer[id2];
      delete issuerData._provider;
      delete issuerData._rev;
      response = await updateOAuth2TrustedJwtIssuer({
        issuerId: id2,
        issuerData,
        state: state2
      });
      imported.push(id2);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first trusted issuer`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No trusted issuers found in import data!`);
  }
  return response;
}
async function importOAuth2TrustedJwtIssuers({
  importData,
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const id2 of Object.keys(importData.trustedJwtIssuer)) {
    try {
      const issuerData = importData.trustedJwtIssuer[id2];
      delete issuerData._provider;
      delete issuerData._rev;
      response.push(
        await updateOAuth2TrustedJwtIssuer({ issuerId: id2, issuerData, state: state2 })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing trusted issuers`, errors);
  }
  return response;
}

// src/api/ManagedObjectApi.ts
import util9 from "util";
var createManagedObjectURLTemplate = "%s/openidm/managed/%s?_action=create";
var managedObjectByIdURLTemplate = "%s/openidm/managed/%s/%s";
var queryAllManagedObjectURLTemplate = `%s/openidm/managed/%s?_queryFilter=true&_pageSize=%s`;
var queryManagedObjectURLTemplate = `%s/openidm/managed/%s?_queryFilter=%s&_pageSize=%s`;
var DEFAULT_PAGE_SIZE = 1e3;
async function getManagedObject({
  type,
  id: id2,
  fields = ["*"],
  state: state2
}) {
  const fieldsParam = `_fields=${fields.join(",")}`;
  const urlString = util9.format(
    `${managedObjectByIdURLTemplate}?${fieldsParam}`,
    getHostBaseUrl(state2.getHost()),
    type,
    id2
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).get(
    urlString
  );
  return data;
}
async function createManagedObject({
  moType: moType2,
  moData,
  state: state2
}) {
  const urlString = util9.format(
    createManagedObjectURLTemplate,
    getHostBaseUrl(state2.getHost()),
    moType2
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString,
    moData
  );
  return data;
}
async function putManagedObject({
  type,
  id: id2,
  moData,
  failIfExists = false,
  state: state2
}) {
  const urlString = util9.format(
    managedObjectByIdURLTemplate,
    getHostBaseUrl(state2.getHost()),
    type,
    id2
  );
  const requestOverride = failIfExists ? { headers: { "If-None-Match": "*" } } : {};
  const { data } = await generateIdmApi({ requestOverride, state: state2 }).put(
    urlString,
    moData
  );
  return data;
}
async function patchManagedObject({
  type,
  id: id2,
  operations,
  rev = null,
  state: state2
}) {
  const urlString = util9.format(
    managedObjectByIdURLTemplate,
    getHostBaseUrl(state2.getHost()),
    type,
    id2
  );
  const requestOverride = rev ? { headers: { "If-Match": rev } } : {};
  const { data } = await generateIdmApi({ requestOverride, state: state2 }).patch(
    urlString,
    operations
  );
  return data;
}
async function queryManagedObjects({
  type,
  filter,
  fields = ["*"],
  pageSize = DEFAULT_PAGE_SIZE,
  pageCookie,
  state: state2
}) {
  const fieldsParam = `_fields=${fields.join(",")}`;
  const urlString = util9.format(
    pageCookie ? `${queryManagedObjectURLTemplate}&${fieldsParam}&_pagedResultsCookie=${encodeURIComponent(
      pageCookie
    )}` : `${queryManagedObjectURLTemplate}&${fieldsParam}`,
    getHostBaseUrl(state2.getHost()),
    type,
    encodeURIComponent(filter),
    pageSize
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).get(
    urlString
  );
  return data;
}
async function queryAllManagedObjectsByType({
  type,
  fields = [],
  pageSize = DEFAULT_PAGE_SIZE,
  pageCookie = void 0,
  state: state2
}) {
  const fieldsParam = fields.length > 0 ? `&_fields=${fields.join(",")}` : "&_fields=_id";
  const urlTemplate = pageCookie ? `${queryAllManagedObjectURLTemplate}${fieldsParam}&_pagedResultsCookie=${encodeURIComponent(
    pageCookie
  )}` : `${queryAllManagedObjectURLTemplate}${fieldsParam}`;
  const urlString = util9.format(
    urlTemplate,
    getHostBaseUrl(state2.getHost()),
    type,
    pageSize
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function deleteManagedObject({
  type,
  id: id2,
  state: state2
}) {
  const urlString = util9.format(
    managedObjectByIdURLTemplate,
    getHostBaseUrl(state2.getHost()),
    type,
    id2
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).delete(
    urlString
  );
  return data;
}

// src/ops/OrganizationOps.ts
var OrganizationOps_default = (state2) => {
  return {
    getRealmManagedOrganization() {
      return getRealmManagedOrganization({ state: state2 });
    },
    async readOrganizations() {
      return readOrganizations({ state: state2 });
    },
    // Deprecated
    async getOrganizations() {
      return readOrganizations({ state: state2 });
    }
  };
};
function getRealmManagedOrganization({ state: state2 }) {
  let realmManagedOrg = "organization";
  if (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY) {
    realmManagedOrg = `${state2.getRealm()}_organization`;
  }
  return realmManagedOrg;
}
async function readOrganizations({
  state: state2
}) {
  let orgs = [];
  const errors = [];
  let result = {
    result: [],
    resultCount: 0,
    pagedResultsCookie: null,
    totalPagedResultsPolicy: "NONE",
    totalPagedResults: -1,
    remainingPagedResults: -1
  };
  do {
    try {
      result = await queryAllManagedObjectsByType({
        type: getRealmManagedOrganization({ state: state2 }),
        fields: ["name", "parent/*/name", "children/*/name", "*"],
        pageCookie: result.pagedResultsCookie,
        state: state2
      });
      orgs = orgs.concat(result.result);
    } catch (error) {
      errors.push(error);
    }
  } while (result.pagedResultsCookie);
  if (errors.length > 0) {
    throw new FrodoError(`Error reading organizations`, errors);
  }
  return orgs;
}

// src/ops/templates/cloud/GenericExtensionAttributesTemplate.json
var GenericExtensionAttributesTemplate_default = {
  frIndexedDate1: {
    description: "Generic Indexed Date 1",
    isPersonal: false,
    title: "Generic Indexed Date 1",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedDate2: {
    description: "Generic Indexed Date 2",
    isPersonal: false,
    title: "Generic Indexed Date 2",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedDate3: {
    description: "Generic Indexed Date 3",
    isPersonal: false,
    title: "Generic Indexed Date 3",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedDate4: {
    description: "Generic Indexed Date 4",
    isPersonal: false,
    title: "Generic Indexed Date 4",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedDate5: {
    description: "Generic Indexed Date 5",
    isPersonal: false,
    title: "Generic Indexed Date 5",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedInteger1: {
    description: "Generic Indexed Integer 1",
    isPersonal: false,
    title: "Generic Indexed Integer 1",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedInteger2: {
    description: "Generic Indexed Integer 2",
    isPersonal: false,
    title: "Generic Indexed Integer 2",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedInteger3: {
    description: "Generic Indexed Integer 3",
    isPersonal: false,
    title: "Generic Indexed Integer 3",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedInteger4: {
    description: "Generic Indexed Integer 4",
    isPersonal: false,
    title: "Generic Indexed Integer 4",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedInteger5: {
    description: "Generic Indexed Integer 5",
    isPersonal: false,
    title: "Generic Indexed Integer 5",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedMultivalued1: {
    description: "Generic Indexed Multivalue 1",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Indexed Multivalue 1",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedMultivalued2: {
    description: "Generic Indexed Multivalue 2",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Indexed Multivalue 2",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedMultivalued3: {
    description: "Generic Indexed Multivalue 3",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Indexed Multivalue 3",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedMultivalued4: {
    description: "Generic Indexed Multivalue 4",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Indexed Multivalue 4",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedMultivalued5: {
    description: "Generic Indexed Multivalue 5",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Indexed Multivalue 5",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedString1: {
    description: "Generic Indexed String 1",
    isPersonal: false,
    title: "Generic Indexed String 1",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedString2: {
    description: "Generic Indexed String 2",
    isPersonal: false,
    title: "Generic Indexed String 2",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedString3: {
    description: "Generic Indexed String 3",
    isPersonal: false,
    title: "Generic Indexed String 3",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedString4: {
    description: "Generic Indexed String 4",
    isPersonal: false,
    title: "Generic Indexed String 4",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frIndexedString5: {
    description: "Generic Indexed String 5",
    isPersonal: false,
    title: "Generic Indexed String 5",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedDate1: {
    description: "Generic Unindexed Date 1",
    isPersonal: false,
    title: "Generic Unindexed Date 1",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedDate2: {
    description: "Generic Unindexed Date 2",
    isPersonal: false,
    title: "Generic Unindexed Date 2",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedDate3: {
    description: "Generic Unindexed Date 3",
    isPersonal: false,
    title: "Generic Unindexed Date 3",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedDate4: {
    description: "Generic Unindexed Date 4",
    isPersonal: false,
    title: "Generic Unindexed Date 4",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedDate5: {
    description: "Generic Unindexed Date 5",
    isPersonal: false,
    title: "Generic Unindexed Date 5",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedInteger1: {
    description: "Generic Unindexed Integer 1",
    isPersonal: false,
    title: "Generic Unindexed Integer 1",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedInteger2: {
    description: "Generic Unindexed Integer 2",
    isPersonal: false,
    title: "Generic Unindexed Integer 2",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedInteger3: {
    description: "Generic Unindexed Integer 3",
    isPersonal: false,
    title: "Generic Unindexed Integer 3",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedInteger4: {
    description: "Generic Unindexed Integer 4",
    isPersonal: false,
    title: "Generic Unindexed Integer 4",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedInteger5: {
    description: "Generic Unindexed Integer 5",
    isPersonal: false,
    title: "Generic Unindexed Integer 5",
    type: "number",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedMultivalued1: {
    description: "Generic Unindexed Multivalue 1",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Unindexed Multivalue 1",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedMultivalued2: {
    description: "Generic Unindexed Multivalue 2",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Unindexed Multivalue 2",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedMultivalued3: {
    description: "Generic Unindexed Multivalue 3",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Unindexed Multivalue 3",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedMultivalued4: {
    description: "Generic Unindexed Multivalue 4",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Unindexed Multivalue 4",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedMultivalued5: {
    description: "Generic Unindexed Multivalue 5",
    isPersonal: false,
    items: {
      type: "string"
    },
    title: "Generic Unindexed Multivalue 5",
    type: "array",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedString1: {
    description: "Generic Unindexed String 1",
    isPersonal: false,
    title: "Generic Unindexed String 1",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedString2: {
    description: "Generic Unindexed String 2",
    isPersonal: false,
    title: "Generic Unindexed String 2",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedString3: {
    description: "Generic Unindexed String 3",
    isPersonal: false,
    title: "Generic Unindexed String 3",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedString4: {
    description: "Generic Unindexed String 4",
    isPersonal: false,
    title: "Generic Unindexed String 4",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  },
  frUnindexedString5: {
    description: "Generic Unindexed String 5",
    isPersonal: false,
    title: "Generic Unindexed String 5",
    type: "string",
    usageDescription: "",
    userEditable: true,
    viewable: true
  }
};

// src/ops/templates/OAuth2ClientTemplate.json
var OAuth2ClientTemplate_default = {
  coreOAuth2ClientConfig: {
    userpassword: null,
    loopbackInterfaceRedirection: {
      inherited: false,
      value: false
    },
    defaultScopes: {
      inherited: false,
      value: []
    },
    refreshTokenLifetime: {
      inherited: false,
      value: 604800
    },
    scopes: {
      inherited: false,
      value: []
    },
    status: {
      inherited: false,
      value: "Active"
    },
    accessTokenLifetime: {
      inherited: false,
      value: 3600
    },
    redirectionUris: {
      inherited: false,
      value: []
    },
    clientName: {
      inherited: false,
      value: []
    },
    clientType: {
      inherited: false,
      value: "Confidential"
    },
    authorizationCodeLifetime: {
      inherited: false,
      value: 120
    }
  },
  advancedOAuth2ClientConfig: {
    descriptions: {
      inherited: false,
      value: []
    },
    requestUris: {
      inherited: false,
      value: []
    },
    logoUri: {
      inherited: false,
      value: []
    },
    subjectType: {
      inherited: false,
      value: "Public"
    },
    clientUri: {
      inherited: false,
      value: []
    },
    tokenExchangeAuthLevel: {
      inherited: false,
      value: 0
    },
    name: {
      inherited: false,
      value: []
    },
    contacts: {
      inherited: false,
      value: []
    },
    responseTypes: {
      inherited: false,
      value: ["token"]
    },
    updateAccessToken: {
      inherited: false
    },
    mixUpMitigation: {
      inherited: false,
      value: false
    },
    customProperties: {
      inherited: false,
      value: []
    },
    javascriptOrigins: {
      inherited: false,
      value: []
    },
    policyUri: {
      inherited: false,
      value: []
    },
    softwareVersion: {
      inherited: false
    },
    tosURI: {
      inherited: false,
      value: []
    },
    sectorIdentifierUri: {
      inherited: false
    },
    tokenEndpointAuthMethod: {
      inherited: false,
      value: "client_secret_basic"
    },
    isConsentImplied: {
      inherited: false,
      value: true
    },
    softwareIdentity: {
      inherited: false
    },
    grantTypes: {
      inherited: false,
      value: ["client_credentials"]
    }
  },
  signEncOAuth2ClientConfig: {
    tokenEndpointAuthSigningAlgorithm: {
      inherited: false,
      value: "RS256"
    },
    idTokenEncryptionEnabled: {
      inherited: false,
      value: false
    },
    tokenIntrospectionEncryptedResponseEncryptionAlgorithm: {
      inherited: false,
      value: "A128CBC-HS256"
    },
    requestParameterSignedAlg: {
      inherited: false
    },
    clientJwtPublicKey: {
      inherited: false
    },
    idTokenPublicEncryptionKey: {
      inherited: false
    },
    mTLSSubjectDN: {
      inherited: false
    },
    userinfoResponseFormat: {
      inherited: false,
      value: "JSON"
    },
    mTLSCertificateBoundAccessTokens: {
      inherited: false,
      value: false
    },
    publicKeyLocation: {
      inherited: false,
      value: "jwks_uri"
    },
    tokenIntrospectionResponseFormat: {
      inherited: false,
      value: "JSON"
    },
    jwkStoreCacheMissCacheTime: {
      inherited: false,
      value: 6e4
    },
    requestParameterEncryptedEncryptionAlgorithm: {
      inherited: false,
      value: "A128CBC-HS256"
    },
    userinfoSignedResponseAlg: {
      inherited: false
    },
    idTokenEncryptionAlgorithm: {
      inherited: false,
      value: "RSA-OAEP-256"
    },
    requestParameterEncryptedAlg: {
      inherited: false
    },
    mTLSTrustedCert: {
      inherited: false
    },
    jwkSet: {
      inherited: false
    },
    idTokenEncryptionMethod: {
      inherited: false,
      value: "A128CBC-HS256"
    },
    jwksCacheTimeout: {
      inherited: false,
      value: 36e5
    },
    userinfoEncryptedResponseAlg: {
      inherited: false
    },
    idTokenSignedResponseAlg: {
      inherited: false,
      value: "RS256"
    },
    jwksUri: {
      inherited: false
    },
    tokenIntrospectionSignedResponseAlg: {
      inherited: false,
      value: "RS256"
    },
    userinfoEncryptedResponseEncryptionAlgorithm: {
      inherited: false,
      value: "A128CBC-HS256"
    },
    tokenIntrospectionEncryptedResponseAlg: {
      inherited: false,
      value: "RSA-OAEP-256"
    }
  },
  coreOpenIDClientConfig: {
    claims: {
      inherited: false,
      value: []
    },
    clientSessionUri: {
      inherited: false
    },
    backchannel_logout_uri: {
      inherited: false
    },
    defaultAcrValues: {
      inherited: false,
      value: []
    },
    jwtTokenLifetime: {
      inherited: false,
      value: 3600
    },
    defaultMaxAgeEnabled: {
      inherited: false,
      value: false
    },
    defaultMaxAge: {
      inherited: false,
      value: 600
    },
    postLogoutRedirectUri: {
      inherited: false,
      value: []
    },
    backchannel_logout_session_required: {
      inherited: false,
      value: false
    }
  },
  coreUmaClientConfig: {
    claimsRedirectionUris: {
      inherited: false,
      value: []
    }
  },
  _type: {
    _id: "OAuth2Client",
    name: "OAuth2 Clients",
    collection: true
  }
};

// src/ops/templates/OAuth2TrustedJwtIssuerTemplate.json
var OAuth2TrustedJwtIssuerTemplate_default = {
  allowedSubjects: {
    inherited: false,
    value: []
  },
  jwksCacheTimeout: {
    inherited: false,
    value: 36e5
  },
  jwkSet: {
    inherited: false,
    value: ""
  },
  consentedScopesClaim: {
    inherited: false,
    value: "scope"
  },
  issuer: {
    inherited: false,
    value: ""
  },
  jwkStoreCacheMissCacheTime: {
    inherited: false,
    value: 6e4
  },
  resourceOwnerIdentityClaim: {
    inherited: false,
    value: "sub"
  },
  jwksUri: {
    inherited: false
  },
  _type: {
    _id: "TrustedJwtIssuer",
    name: "OAuth2 Trusted JWT Issuer",
    collection: true
  }
};

// src/ops/AdminOps.ts
var OAUTH2_CLIENT = OAuth2ClientTemplate_default;
var OAUTH2_ISSUER = OAuth2TrustedJwtIssuerTemplate_default;
var AdminOps_default = (state2) => {
  return {
    async generateRfc7523AuthZGrantArtefacts(clientId, iss, jwk, sub, scope = ["fr:am:*", "fr:idm:*", "openid"], options = { save: false }) {
      return generateRfc7523AuthZGrantArtefacts({
        clientId,
        iss,
        jwk,
        sub,
        scope,
        options,
        state: state2
      });
    },
    executeRfc7523AuthZGrantFlow(clientId, iss, jwk, sub, scope = ["fr:am:*", "fr:idm:*", "openid"]) {
      return executeRfc7523AuthZGrantFlow({
        clientId,
        iss,
        jwk,
        sub,
        scope,
        state: state2
      });
    },
    async generateRfc7523ClientAuthNArtefacts(clientId, aud, jwk, options) {
      return generateRfc7523ClientAuthNArtefacts({
        clientId,
        aud,
        jwk,
        options,
        state: state2
      });
    },
    async trainAA(apiKey, apiSecret, customUsernames, customUserAgents, customIPs, loginsPerUser, service) {
      return trainAA({
        apiKey,
        apiSecret,
        customUsernames,
        customUserAgents,
        customIPs,
        loginsPerUser,
        service,
        state: state2
      });
    },
    // deprecated
    async listOAuth2CustomClients() {
      return listOAuth2CustomClients({ state: state2 });
    },
    async listOAuth2AdminClients() {
      return listOAuth2AdminClients({ state: state2 });
    },
    async listNonOAuth2AdminStaticUserMappings(showProtected) {
      return listNonOAuth2AdminStaticUserMappings({
        showProtected,
        state: state2
      });
    },
    async addAutoIdStaticUserMapping() {
      return addAutoIdStaticUserMapping({ state: state2 });
    },
    async grantOAuth2ClientAdminPrivileges(clientId) {
      return grantOAuth2ClientAdminPrivileges({ clientId, state: state2 });
    },
    async revokeOAuth2ClientAdminPrivileges(clientId) {
      return revokeOAuth2ClientAdminPrivileges({ clientId, state: state2 });
    },
    async createOAuth2ClientWithAdminPrivileges(clientId, clientSecret) {
      return createOAuth2ClientWithAdminPrivileges({
        clientId,
        clientSecret,
        state: state2
      });
    },
    async createLongLivedToken(clientId, clientSecret, scope, secret, lifetime) {
      return createLongLivedToken({
        clientId,
        clientSecret,
        scope,
        secret,
        lifetime,
        state: state2
      });
    },
    async removeStaticUserMapping(subject) {
      return removeStaticUserMapping({ subject, state: state2 });
    },
    async hideGenericExtensionAttributes(includeCustomized, dryRun) {
      return hideGenericExtensionAttributes({
        includeCustomized,
        dryRun,
        state: state2
      });
    },
    async showGenericExtensionAttributes(includeCustomized, dryRun) {
      return showGenericExtensionAttributes({
        includeCustomized,
        dryRun,
        state: state2
      });
    },
    async repairOrgModel(excludeCustomized, extendPermissions, dryRun) {
      return repairOrgModel({
        excludeCustomized,
        extendPermissions,
        dryRun,
        state: state2
      });
    }
  };
};
var protectedClients = ["ui", "idm-provisioning"];
var protectedSubjects = ["amadmin", "autoid-resource-server"];
var privilegedScopes = [
  "am-introspect-all-tokens",
  "fr:idm:*",
  "fr:idc:esv:*"
];
var privilegedRoles = [
  "internal/role/openidm-authorized",
  "internal/role/openidm-admin"
];
var adminScopes = ["fr:idm:*", "fr:idc:esv:*"];
var adminDefaultScopes = ["fr:idm:*"];
var adminRoles = [
  "internal/role/openidm-authorized",
  "internal/role/openidm-admin"
];
var autoIdRoles = [
  "internal/role/platform-provisioning",
  "internal/role/openidm-authorized",
  "internal/role/openidm-admin"
];
async function listOAuth2CustomClients({
  state: state2
}) {
  try {
    const clients = await readOAuth2Clients({ state: state2 });
    const clientIds = clients.map((client) => client._id).filter((client) => !protectedClients.includes(client));
    const authentication = await getConfigEntity({
      entityId: "authentication",
      state: state2
    });
    const subjects = authentication.rsFilter.staticUserMapping.map((mapping) => mapping.subject).filter((subject) => !protectedSubjects.includes(subject));
    const adminClients = subjects.filter(
      (subject) => clientIds.includes(subject)
    );
    return adminClients;
  } catch (error) {
    throw new FrodoError(`Error listing custom OAuth2 clients`, error);
  }
}
async function listOAuth2AdminClients({
  state: state2
}) {
  try {
    const clients = await readOAuth2Clients({ state: state2 });
    const clientIds = clients.filter((client) => {
      let isPrivileged = false;
      if (client.coreOAuth2ClientConfig.scopes) {
        client.coreOAuth2ClientConfig.scopes.forEach(
          (scope) => {
            if (privilegedScopes.includes(scope)) {
              isPrivileged = true;
            }
          }
        );
      }
      return isPrivileged;
    }).map((client) => client._id).filter((clientId) => !protectedClients.includes(clientId));
    const authentication = await getConfigEntity({
      entityId: "authentication",
      state: state2
    });
    const subjects = authentication.rsFilter.staticUserMapping.filter((mapping) => {
      let isPrivileged = false;
      if (mapping.roles) {
        mapping.roles.forEach((role) => {
          if (privilegedRoles.includes(role)) {
            isPrivileged = true;
          }
        });
      }
      return isPrivileged;
    }).map((mapping) => mapping.subject).filter((subject) => !protectedSubjects.includes(subject));
    const adminClients = subjects.filter(
      (subject) => clientIds.includes(subject)
    );
    return adminClients;
  } catch (error) {
    throw new FrodoError(`Error listing admin OAuth2 clients`, error);
  }
}
async function listNonOAuth2AdminStaticUserMappings({
  showProtected,
  state: state2
}) {
  try {
    const clients = await readOAuth2Clients({ state: state2 });
    const clientIds = clients.map((client) => client._id).filter((client) => !protectedClients.includes(client));
    const authentication = await getConfigEntity({
      entityId: "authentication",
      state: state2
    });
    let subjects = authentication.rsFilter.staticUserMapping.filter((mapping) => {
      let isPrivileged = false;
      if (mapping.roles) {
        mapping.roles.forEach((role) => {
          if (privilegedRoles.includes(role)) {
            isPrivileged = true;
          }
        });
      }
      return isPrivileged;
    }).map((mapping) => mapping.subject);
    if (!showProtected) {
      subjects = subjects.filter(
        (subject) => !protectedSubjects.includes(subject)
      );
    }
    const adminSubjects = subjects.filter(
      (subject) => !clientIds.includes(subject)
    );
    return adminSubjects;
  } catch (error) {
    throw new FrodoError(
      `Error listing non-oauth2 admin static user mappings`,
      error
    );
  }
}
async function getDynamicClientRegistrationScope({ state: state2 }) {
  try {
    const provider = await readOAuth2Provider({ state: state2 });
    return provider.clientDynamicRegistrationConfig.dynamicClientRegistrationScope;
  } catch (error) {
    throw new FrodoError(
      `Error getting dynamic client registration scope`,
      error
    );
  }
}
async function addAdminScopes({
  clientId,
  client,
  state: state2
}) {
  try {
    const modClient = client;
    const allAdminScopes = adminScopes.concat([
      await getDynamicClientRegistrationScope({ state: state2 })
    ]);
    let addScopes = [];
    if (modClient.coreOAuth2ClientConfig.scopes && modClient.coreOAuth2ClientConfig.scopes.value) {
      addScopes = allAdminScopes.filter((scope) => {
        let add = false;
        if (!modClient.coreOAuth2ClientConfig.scopes.value.includes(scope)) {
          add = true;
        }
        return add;
      });
      modClient.coreOAuth2ClientConfig.scopes.value = modClient.coreOAuth2ClientConfig.scopes.value.concat(addScopes);
    } else {
      modClient.coreOAuth2ClientConfig.scopes.value = allAdminScopes;
    }
    let addDefaultScope = false;
    if (modClient.coreOAuth2ClientConfig.defaultScopes && modClient.coreOAuth2ClientConfig.defaultScopes.value) {
      if (modClient.coreOAuth2ClientConfig.defaultScopes.value.length === 0) {
        addDefaultScope = true;
        modClient.coreOAuth2ClientConfig.defaultScopes.value = adminDefaultScopes;
      } else {
        printMessage({
          message: `Client "${clientId}" already has default scopes configured, not adding admin default scope.`,
          state: state2
        });
      }
    }
    if (addScopes.length > 0 || addDefaultScope) {
      printMessage({
        message: `Adding admin scopes to client "${clientId}"...`,
        state: state2
      });
    } else {
      printMessage({
        message: `Client "${clientId}" already has admin scopes.`,
        state: state2
      });
    }
    return modClient;
  } catch (error) {
    throw new FrodoError(
      `Error adding admin scopes to oauth2 client ${clientId}`,
      error
    );
  }
}
function addClientCredentialsGrantType({
  clientId,
  client,
  state: state2
}) {
  try {
    const modClient = client;
    let modified = false;
    if (modClient.advancedOAuth2ClientConfig.grantTypes && modClient.advancedOAuth2ClientConfig.grantTypes.value) {
      if (!modClient.advancedOAuth2ClientConfig.grantTypes.value.includes("client_credentials")) {
        modified = true;
        modClient.advancedOAuth2ClientConfig.grantTypes.value.push("client_credentials");
      }
    } else {
      modClient.advancedOAuth2ClientConfig.grantTypes.value = ["client_credentials"];
    }
    modClient.advancedOAuth2ClientConfig.grantTypes.inherited = false;
    if (modified) {
      printMessage({
        message: `Adding client credentials grant type to client "${clientId}"...`,
        state: state2
      });
    } else {
      printMessage({
        message: `Client "${clientId}" already has client credentials grant type.`,
        state: state2
      });
    }
    return modClient;
  } catch (error) {
    throw new FrodoError(
      `Error client credentials grant type to oauth2 client ${clientId}`,
      error
    );
  }
}
async function addAdminStaticUserMapping({
  name: name2,
  state: state2
}) {
  try {
    const authentication = await getConfigEntity({
      entityId: "authentication",
      state: state2
    });
    let needsAdminMapping = true;
    let addRoles = [];
    const mappings = authentication["rsFilter"]["staticUserMapping"].map(
      (mapping) => {
        if (mapping.subject !== name2) {
          return mapping;
        }
        needsAdminMapping = false;
        addRoles = adminRoles.filter((role) => {
          let add = false;
          if (!mapping.roles.includes(role)) {
            add = true;
          }
          return add;
        });
        const newMapping = mapping;
        newMapping.roles = newMapping.roles.concat(addRoles);
        return newMapping;
      }
    );
    if (needsAdminMapping) {
      printMessage({
        message: `Creating static user mapping for client "${name2}"...`,
        state: state2
      });
      mappings.push({
        subject: name2,
        localUser: "internal/user/openidm-admin",
        userRoles: "authzRoles/*",
        roles: adminRoles
      });
    }
    authentication["rsFilter"]["staticUserMapping"] = mappings;
    if (addRoles.length > 0 || needsAdminMapping) {
      printMessage({
        message: `Adding admin roles to static user mapping for client "${name2}"...`,
        state: state2
      });
      await putConfigEntity({
        entityId: "authentication",
        entityData: authentication,
        state: state2
      });
    } else {
      printMessage({
        message: `Static user mapping for client "${name2}" already has admin roles.`,
        state: state2
      });
    }
  } catch (error) {
    throw new FrodoError(
      `Error adding admin static user mapping to ${name2}`,
      error
    );
  }
}
async function addAutoIdStaticUserMapping({ state: state2 }) {
  const name2 = "autoid-resource-server";
  try {
    const authentication = await getConfigEntity({
      entityId: "authentication",
      state: state2
    });
    let needsAdminMapping = true;
    let addRoles = [];
    const mappings = authentication.rsFilter.staticUserMapping.map(
      (mapping) => {
        if (mapping.subject !== name2) {
          return mapping;
        }
        needsAdminMapping = false;
        addRoles = autoIdRoles.filter((role) => {
          let add = false;
          if (!mapping.roles.includes(role)) {
            add = true;
          }
          return add;
        });
        const newMapping = mapping;
        newMapping.roles = newMapping.roles.concat(addRoles);
        return newMapping;
      }
    );
    if (needsAdminMapping) {
      printMessage({
        message: `Creating static user mapping for AutoId client "${name2}"...`,
        state: state2
      });
      mappings.push({
        subject: name2,
        localUser: "internal/user/idm-provisioning",
        userRoles: "authzRoles/*",
        roles: autoIdRoles
      });
    }
    authentication.rsFilter.staticUserMapping = mappings;
    if (addRoles.length > 0 || needsAdminMapping) {
      printMessage({
        message: `Adding required roles to static user mapping for AutoId client "${name2}"...`,
        state: state2
      });
      try {
        await putConfigEntity({
          entityId: "authentication",
          entityData: authentication,
          state: state2
        });
      } catch (putConfigEntityError) {
        printMessage({ message: putConfigEntityError, type: "error", state: state2 });
        printMessage({
          message: `Error: ${putConfigEntityError}`,
          type: "error",
          state: state2
        });
      }
    } else {
      printMessage({
        message: `Static user mapping for AutoId client "${name2}" already has all required roles.`,
        state: state2
      });
    }
  } catch (error) {
    throw new FrodoError(
      `Error adding static user mapping for AutoId oauth2 client ${name2}`,
      error
    );
  }
}
async function grantOAuth2ClientAdminPrivileges({
  clientId,
  state: state2
}) {
  let client = await readOAuth2Client({ clientId, state: state2 });
  if (client.coreOAuth2ClientConfig.clientName.length === 0) {
    client.coreOAuth2ClientConfig.clientName = {
      inherited: false,
      value: [clientId]
    };
  }
  if (client.advancedOAuth2ClientConfig.descriptions.value.length === 0 || client.advancedOAuth2ClientConfig.descriptions.value[0].startsWith(
    "Modified by Frodo"
  ) || client.advancedOAuth2ClientConfig.descriptions.value[0].startsWith(
    "Created by Frodo"
  )) {
    client.advancedOAuth2ClientConfig.descriptions.value = [
      `Modified by Frodo on ${(/* @__PURE__ */ new Date()).toLocaleString()}`
    ];
  }
  client = await addAdminScopes({ clientId, client, state: state2 });
  client = addClientCredentialsGrantType({ clientId, client, state: state2 });
  await updateOAuth2Client({ clientId, clientData: client, state: state2 });
  await addAdminStaticUserMapping({ name: clientId, state: state2 });
}
async function removeAdminScopes({
  name: name2,
  client,
  state: state2
}) {
  const modClient = client;
  const allAdminScopes = adminScopes.concat([
    await getDynamicClientRegistrationScope({ state: state2 })
  ]);
  let finalScopes = [];
  if (modClient.coreOAuth2ClientConfig.scopes && modClient.coreOAuth2ClientConfig.scopes.value) {
    finalScopes = modClient.coreOAuth2ClientConfig.scopes.value.filter((scope) => !allAdminScopes.includes(scope));
  }
  if (modClient.coreOAuth2ClientConfig.scopes.value.length > finalScopes.length) {
    printMessage({
      message: `Removing admin scopes from client "${name2}"...`,
      state: state2
    });
    modClient.coreOAuth2ClientConfig.scopes.value = finalScopes;
  } else {
    printMessage({ message: `Client "${name2}" has no admin scopes.`, state: state2 });
  }
  let finalDefaultScopes = [];
  if (modClient.coreOAuth2ClientConfig.defaultScopes && modClient.coreOAuth2ClientConfig.defaultScopes.value) {
    finalDefaultScopes = modClient.coreOAuth2ClientConfig.defaultScopes.value.filter(
      (scope) => !adminDefaultScopes.includes(scope)
    );
  }
  if (modClient.coreOAuth2ClientConfig.defaultScopes.value.length > finalDefaultScopes.length) {
    printMessage({
      message: `Removing admin default scopes from client "${name2}"...`,
      state: state2
    });
    modClient.coreOAuth2ClientConfig.defaultScopes.value = finalDefaultScopes;
  } else {
    printMessage({
      message: `Client "${name2}" has no admin default scopes.`,
      state: state2
    });
  }
  return modClient;
}
function removeClientCredentialsGrantType({
  clientId,
  client,
  state: state2
}) {
  const modClient = client;
  let modified = false;
  let finalGrantTypes = [];
  if (modClient.advancedOAuth2ClientConfig.grantTypes && modClient.advancedOAuth2ClientConfig.grantTypes.value) {
    finalGrantTypes = modClient.advancedOAuth2ClientConfig.grantTypes.value.filter((grantType) => grantType !== "client_credentials");
    modified = modClient.advancedOAuth2ClientConfig.grantTypes.value.length > finalGrantTypes.length;
  }
  if (modified) {
    printMessage({
      message: `Removing client credentials grant type from client "${clientId}"...`,
      state: state2
    });
    modClient.advancedOAuth2ClientConfig.grantTypes.value = finalGrantTypes;
  } else {
    printMessage({
      message: `Client "${clientId}" does not allow client credentials grant type.`,
      state: state2
    });
  }
  return modClient;
}
async function removeAdminStaticUserMapping({
  name: name2,
  state: state2
}) {
  const authentication = await getConfigEntity({
    entityId: "authentication",
    state: state2
  });
  let finalRoles = [];
  let removeMapping = false;
  let modified = false;
  const mappings = authentication.rsFilter.staticUserMapping.map((mapping) => {
    if (mapping.subject !== name2) {
      return mapping;
    }
    finalRoles = mapping.roles.filter((role) => !adminRoles.includes(role));
    const newMapping = mapping;
    removeMapping = finalRoles.length === 0;
    modified = mapping.roles.length > finalRoles.length;
    newMapping.roles = finalRoles;
    return newMapping;
  }).filter((mapping) => mapping.subject !== name2 || !removeMapping);
  authentication.rsFilter.staticUserMapping = mappings;
  if (modified || removeMapping) {
    if (removeMapping) {
      printMessage({
        message: `Removing static user mapping for client "${name2}"...`,
        state: state2
      });
    } else {
      printMessage({
        message: `Removing admin roles from static user mapping for client "${name2}"...`,
        state: state2
      });
    }
    try {
      await putConfigEntity({
        entityId: "authentication",
        entityData: authentication,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  } else {
    printMessage({
      message: `Static user mapping for client "${name2}" has no admin roles.`,
      state: state2
    });
  }
}
async function revokeOAuth2ClientAdminPrivileges({
  clientId,
  state: state2
}) {
  let client = await readOAuth2Client({ clientId, state: state2 });
  if (client.coreOAuth2ClientConfig.clientName.length === 0) {
    client.coreOAuth2ClientConfig.clientName = {
      inherited: false,
      value: [clientId]
    };
  }
  if (client.advancedOAuth2ClientConfig.descriptions.value.length === 0 || client.advancedOAuth2ClientConfig.descriptions.value[0].startsWith(
    "Modified by Frodo"
  ) || client.advancedOAuth2ClientConfig.descriptions.value[0].startsWith(
    "Created by Frodo"
  )) {
    client.advancedOAuth2ClientConfig.descriptions.value = [
      `Modified by Frodo on ${(/* @__PURE__ */ new Date()).toLocaleString()}`
    ];
  }
  client = await removeAdminScopes({ name: clientId, client, state: state2 });
  client = removeClientCredentialsGrantType({ clientId, client, state: state2 });
  await updateOAuth2Client({ clientId, clientData: client, state: state2 });
  await removeAdminStaticUserMapping({ name: clientId, state: state2 });
}
async function createOAuth2ClientWithAdminPrivileges({
  clientId,
  clientSecret,
  state: state2
}) {
  let client = cloneDeep(OAUTH2_CLIENT);
  client.coreOAuth2ClientConfig.userpassword = clientSecret;
  client.coreOAuth2ClientConfig.clientName.value = [clientId];
  client.advancedOAuth2ClientConfig.descriptions.value = [
    `Created by Frodo on ${(/* @__PURE__ */ new Date()).toLocaleString()}`
  ];
  try {
    client = await addAdminScopes({ clientId, client, state: state2 });
    await updateOAuth2Client({ clientId, clientData: client, state: state2 });
    await addAdminStaticUserMapping({ name: clientId, state: state2 });
  } catch (error) {
    printMessage({
      message: `Error creating oauth2 client: ${error.message}`,
      state: state2,
      type: "error"
    });
  }
}
async function createLongLivedToken({
  clientId,
  clientSecret,
  scope,
  secret,
  lifetime,
  state: state2
}) {
  const client = await readOAuth2Client({ clientId, state: state2 });
  client.userpassword = clientSecret;
  const rememberedLifetime = client.coreOAuth2ClientConfig.accessTokenLifetime || 3600;
  client.coreOAuth2ClientConfig.accessTokenLifetime = {
    inherited: false,
    value: lifetime
  };
  await updateOAuth2Client({ clientId, clientData: client, state: state2 });
  const response = await clientCredentialsGrant({
    amBaseUrl: state2.getHost(),
    clientId,
    clientSecret,
    scope,
    state: state2
  });
  const expires = (/* @__PURE__ */ new Date()).getTime() + 1e3 * response.expires_in;
  response["expires_on"] = new Date(expires).toLocaleString();
  client.coreOAuth2ClientConfig.accessTokenLifetime = {
    inherited: false,
    value: rememberedLifetime
  };
  await updateOAuth2Client({ clientId, clientData: client, state: state2 });
  if (secret) {
    const description = "Long-lived admin token";
    try {
      await putSecret({
        secretId: secret,
        value: response.access_token,
        description,
        state: state2
      });
      response["secret"] = secret;
    } catch (error) {
      if (get(error, ["response", "data", "code"]) === 400 && get(error, ["response", "data", "message"]) === "Failed to create secret, the secret already exists") {
        const newSecret = `${secret}-${expires}`;
        printMessage({
          message: `esv '${secret}' already exists, using ${newSecret}`,
          type: "warn",
          state: state2
        });
        await putSecret({
          secretId: newSecret,
          value: response.access_token,
          description,
          state: state2
        });
        response["secret"] = newSecret;
      }
    }
    delete response.access_token;
  }
  return response;
}
async function removeStaticUserMapping({
  subject,
  state: state2
}) {
  const authentication = await getConfigEntity({
    entityId: "authentication",
    state: state2
  });
  let removeMapping = false;
  const mappings = authentication.rsFilter.staticUserMapping.filter(
    (mapping) => {
      if (mapping.subject === subject) {
        removeMapping = true;
      }
      return mapping.subject !== subject;
    }
  );
  authentication.rsFilter.staticUserMapping = mappings;
  if (removeMapping) {
    printMessage({
      message: `Removing static user mapping for subject "${subject}"...`,
      state: state2
    });
    try {
      await putConfigEntity({
        entityId: "authentication",
        entityData: authentication,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  } else {
    printMessage({
      message: `No static user mapping for subject "${subject}" found.`,
      state: state2
    });
  }
}
async function hideGenericExtensionAttributes({
  includeCustomized,
  dryRun,
  state: state2
}) {
  const managed = await getConfigEntity({ entityId: "managed", state: state2 });
  const propertyNames = Object.keys(GenericExtensionAttributesTemplate_default);
  const updatedObjects = managed.objects.map((object) => {
    if (object.name !== getCurrentRealmManagedUser({ state: state2 })) {
      return object;
    }
    propertyNames.forEach((name2) => {
      if (isEqualJson(
        GenericExtensionAttributesTemplate_default[name2],
        object.schema.properties[name2],
        ["viewable", "usageDescription"]
      ) || includeCustomized) {
        if (object.schema.properties[name2].viewable) {
          printMessage({ message: `${name2}: hide`, state: state2 });
          object.schema.properties[name2].viewable = false;
        } else {
          printMessage({ message: `${name2}: ignore (already hidden)`, state: state2 });
        }
      } else {
        printMessage({ message: `${name2}: skip (customized)`, state: state2 });
      }
    });
    return object;
  });
  managed.objects = updatedObjects;
  if (dryRun) {
    printMessage({ message: "Dry-run only. Changes are not saved.", state: state2 });
  } else {
    try {
      await putConfigEntity({
        entityId: "managed",
        entityData: managed,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  }
}
async function showGenericExtensionAttributes({
  includeCustomized,
  dryRun,
  state: state2
}) {
  const managed = await getConfigEntity({ entityId: "managed", state: state2 });
  const propertyNames = Object.keys(GenericExtensionAttributesTemplate_default);
  const updatedObjects = managed.objects.map((object) => {
    if (object.name !== getCurrentRealmManagedUser({ state: state2 })) {
      return object;
    }
    propertyNames.forEach((name2) => {
      if (isEqualJson(
        GenericExtensionAttributesTemplate_default[name2],
        object.schema.properties[name2],
        ["viewable", "usageDescription"]
      ) || includeCustomized) {
        if (!object.schema.properties[name2].viewable) {
          printMessage({ message: `${name2}: show`, state: state2 });
          object.schema.properties[name2].viewable = true;
        } else {
          printMessage({ message: `${name2}: ignore (already showing)`, state: state2 });
        }
      } else {
        printMessage({ message: `${name2}: skip (customized)`, state: state2 });
      }
    });
    return object;
  });
  managed.objects = updatedObjects;
  if (dryRun) {
    printMessage({ message: "Dry-run only. Changes are not saved.", state: state2 });
  } else {
    try {
      await putConfigEntity({
        entityId: "managed",
        entityData: managed,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  }
}
async function repairOrgModelUser({
  dryRun,
  state: state2
}) {
  const managed = await getConfigEntity({ entityId: "managed", state: state2 });
  const RDVPs = ["memberOfOrgIDs"];
  let repairData = false;
  const updatedObjects = managed.objects.map((object) => {
    if (object.name !== getCurrentRealmManagedUser({ state: state2 })) {
      return object;
    }
    printMessage({ message: `${object.name}: checking...`, state: state2 });
    RDVPs.forEach((name2) => {
      if (!object.schema.properties[name2].queryConfig.flattenProperties) {
        printMessage({
          message: `- ${name2}: repairing - needs flattening`,
          type: "warn",
          state: state2
        });
        object.schema.properties[name2].queryConfig.flattenProperties = true;
        repairData = true;
      } else {
        printMessage({ message: `- ${name2}: OK`, state: state2 });
      }
    });
    return object;
  });
  managed.objects = updatedObjects;
  if (!dryRun) {
    try {
      await putConfigEntity({
        entityId: "managed",
        entityData: managed,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  }
  return repairData;
}
async function repairOrgModelOrg({
  dryRun,
  state: state2
}) {
  const managed = await getConfigEntity({ entityId: "managed", state: state2 });
  const RDVPs = [
    "adminIDs",
    "ownerIDs",
    "parentAdminIDs",
    "parentOwnerIDs",
    "parentIDs"
  ];
  let repairData = false;
  const updatedObjects = managed.objects.map((object) => {
    if (object.name !== getRealmManagedOrganization({ state: state2 })) {
      return object;
    }
    printMessage({ message: `${object.name}: checking...`, state: state2 });
    RDVPs.forEach((name2) => {
      if (!object.schema.properties[name2].queryConfig.flattenProperties) {
        printMessage({
          message: `- ${name2}: repairing - needs flattening`,
          type: "warn",
          state: state2
        });
        object.schema.properties[name2].queryConfig.flattenProperties = true;
        repairData = true;
      } else {
        printMessage({ message: `- ${name2}: OK`, state: state2 });
      }
    });
    return object;
  });
  managed.objects = updatedObjects;
  if (!dryRun) {
    try {
      await putConfigEntity({
        entityId: "managed",
        entityData: managed,
        state: state2
      });
    } catch (putConfigEntityError) {
      printMessage({ message: putConfigEntityError, type: "error", state: state2 });
      printMessage({
        message: `Error: ${putConfigEntityError}`,
        type: "error",
        state: state2
      });
    }
  }
  return repairData;
}
async function repairOrgModelData(dryRun = false) {
  if (!dryRun) {
  }
}
async function extendOrgModelPermissins(dryRun = false) {
  if (!dryRun) {
  }
}
async function repairOrgModel({
  excludeCustomized,
  extendPermissions,
  dryRun,
  state: state2
}) {
  let repairData = false;
  repairData = repairData || await repairOrgModelUser({ dryRun, state: state2 });
  repairData = repairData || await repairOrgModelOrg({ dryRun, state: state2 });
  if (excludeCustomized) {
  }
  if (repairData) {
    await repairOrgModelData(dryRun);
  }
  if (extendPermissions) {
    await extendOrgModelPermissins(dryRun);
  }
  if (dryRun) {
    printMessage({
      message: "Dry-run only. Changes are not saved.",
      type: "warn",
      state: state2
    });
  }
}
var templateUsernames = JSON.parse(
  fs2.readFileSync(
    path2.resolve(__dirname, "./templates/autoaccess/Usernames.json"),
    "utf8"
  )
);
var templateUserAgents = JSON.parse(
  fs2.readFileSync(
    path2.resolve(__dirname, "./templates/autoaccess/UserAgents.json"),
    "utf8"
  )
);
var templateIpAddresses = JSON.parse(
  fs2.readFileSync(
    path2.resolve(__dirname, "./templates/autoaccess/IPAddresses.json"),
    "utf8"
  )
);
function getUniqueValues(values) {
  return [...new Set(values)].filter((it) => it);
}
function pickRandomValue(values) {
  const finalValues = values.filter((it) => it);
  return finalValues[Math.floor(Math.random() * finalValues.length)];
}
function pickRandomNumber(max2) {
  return Math.ceil(Math.random() * max2);
}
function pickRandomValues(values, picks) {
  const finalValues = values.filter((it) => it);
  const result = [];
  for (let i = 0; i < picks; i++) {
    result.push(finalValues[Math.floor(Math.random() * finalValues.length)]);
  }
  return result;
}
async function trainAA({
  apiKey,
  apiSecret,
  customUsernames = [],
  customUserAgents = [],
  customIPs = [],
  loginsPerUser = 100,
  service = "Frodo-Train-AA",
  state: state2
}) {
  printMessage({
    message: `loginsPerUser: ${loginsPerUser}`,
    state: state2
  });
  const usernames = getUniqueValues(customUsernames.concat(templateUsernames));
  for (let i = 0; i < 200; i++) {
    const username = usernames[i];
    const numDevices = pickRandomNumber(5);
    const ipAddresses = pickRandomValues(
      customIPs.concat(templateIpAddresses),
      numDevices
    );
    const ipAgentMap = {};
    for (let j = 0; j < numDevices; j++) {
      ipAgentMap[ipAddresses[j]] = pickRandomValue(
        customUserAgents.concat(templateUserAgents)
      );
    }
    const requests = [];
    for (let j = 0; j < loginsPerUser; j++) {
      const ipAddress = pickRandomValue(ipAddresses);
      const userAgent2 = ipAgentMap[ipAddress];
      const config = {
        headers: {
          "User-Agent": userAgent2,
          "X-Forwarded-For": ipAddress,
          "X-OpenAM-Username": username,
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret
        }
      };
      requests.push(
        step({
          body: {},
          config,
          realm: state2.getRealm(),
          service,
          state: state2
        }).then((response) => {
          printMessage({
            message: `${username},${ipAddress},${userAgent2},${response.tokenId ? "OK" : "NOK"}`,
            state: state2
          });
        }).catch((error) => {
          printMessage({
            message: `${username},${ipAddress},${userAgent2},${error.message}`,
            state: state2
          });
        })
      );
      await Promise.allSettled(requests);
    }
  }
}
function getAccessTokenUrl(state2) {
  const accessTokenUrlTemplate2 = "%s/oauth2%s/access_token";
  const accessTokenURL = util10.format(
    accessTokenUrlTemplate2,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const url2 = new URL2(accessTokenURL);
  const urlWithPort = `${url2.protocol}//${url2.host}:${url2.port ? url2.port : url2.protocol === "https:" ? "443" : "80"}${url2.pathname}`;
  return urlWithPort;
}
async function generateRfc7523AuthZGrantArtefacts({
  clientId,
  iss,
  jwk = null,
  sub = null,
  scope = ["fr:am:*", "fr:idm:*", "openid"],
  options = { save: false },
  state: state2
}) {
  if (!jwk) {
    jwk = await createJwkRsa();
  }
  const jwks = createJwks(await getJwkRsaPublic(jwk));
  const clientData = cloneDeep(OAUTH2_CLIENT);
  clientData.coreOAuth2ClientConfig.clientName = {
    inherited: false,
    value: [clientId]
  };
  clientData.coreOAuth2ClientConfig.scopes = {
    inherited: false,
    value: scope
  };
  clientData.coreOAuth2ClientConfig.clientType = {
    inherited: false,
    value: "Public"
  };
  clientData.advancedOAuth2ClientConfig.grantTypes = {
    inherited: false,
    value: ["urn:ietf:params:oauth:grant-type:jwt-bearer"]
  };
  clientData.advancedOAuth2ClientConfig.isConsentImplied = {
    inherited: false,
    value: true
  };
  clientData.advancedOAuth2ClientConfig.tokenEndpointAuthMethod = {
    inherited: false,
    value: "none"
  };
  clientData.signEncOAuth2ClientConfig.publicKeyLocation = {
    inherited: false,
    value: "jwks"
  };
  clientData.signEncOAuth2ClientConfig.jwkSet = {
    inherited: false,
    value: JSON.stringify(jwks)
  };
  if (options.save) {
    await updateOAuth2Client({ clientId, clientData, state: state2 });
  }
  const issuerData = cloneDeep(OAUTH2_ISSUER);
  issuerData._id = clientId + "-issuer";
  issuerData.issuer = {
    inherited: false,
    value: iss
  };
  issuerData.allowedSubjects = {
    inherited: false,
    value: sub ? [sub] : []
  };
  issuerData.jwkSet = {
    inherited: false,
    value: stringify(jwks)
  };
  if (options.save) {
    await updateOAuth2TrustedJwtIssuer({
      issuerId: issuerData._id,
      issuerData,
      state: state2
    });
  }
  return {
    jwk,
    jwks,
    client: clientData,
    issuer: issuerData
  };
}
async function executeRfc7523AuthZGrantFlow({
  clientId,
  iss,
  jwk,
  sub,
  scope = ["fr:am:*", "fr:idm:*", "openid"],
  state: state2
}) {
  const payload = {
    iss,
    sub,
    aud: getAccessTokenUrl(state2),
    // Cross platform way of setting JWT expiry time 3 minutes in the future, expressed as number of seconds since EPOCH
    exp: Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3 + 180),
    // A unique ID for the JWT which is required when requesting the openid scope
    jti: uuidv43()
  };
  const jwt = await createSignedJwtToken(payload, jwk);
  return accessTokenRfc7523AuthZGrant({ clientId, jwt, scope, state: state2 });
}
async function generateRfc7523ClientAuthNArtefacts({
  clientId,
  aud = null,
  jwk = null,
  options = {
    save: false
  },
  state: state2
}) {
  if (!jwk) {
    jwk = await createJwkRsa();
  }
  const jwks = createJwks(await getJwkRsaPublic(jwk));
  const sub = clientId;
  const iss = clientId;
  if (!aud) {
    aud = getAccessTokenUrl(state2);
  }
  const payload = {
    iss,
    sub,
    aud,
    exp: 60 * 5
  };
  const jwt = createSignedJwtToken(payload, jwk);
  const clientData = cloneDeep(OAUTH2_CLIENT);
  clientData.coreOAuth2ClientConfig.clientType = {
    inherited: false,
    value: "Confidential"
  };
  clientData.advancedOAuth2ClientConfig.grantTypes = {
    inherited: false,
    value: ["client_credentials"]
  };
  clientData.advancedOAuth2ClientConfig.isConsentImplied = {
    inherited: false,
    value: false
  };
  clientData.advancedOAuth2ClientConfig.tokenEndpointAuthMethod = {
    inherited: false,
    value: "private_key_jwt"
  };
  clientData.signEncOAuth2ClientConfig.publicKeyLocation = {
    inherited: false,
    value: "jwks"
  };
  clientData.signEncOAuth2ClientConfig.jwkSet = {
    inherited: false,
    value: JSON.stringify(jwks)
  };
  if (options.save) {
    await updateOAuth2Client({ clientId, clientData, state: state2 });
  }
  return {
    jwk,
    jwks,
    jwt,
    client: clientData
  };
}

// src/api/AgentApi.ts
import util11 from "util";
var queryAgentURLTemplate = "%s/json%s/realm-config/agents?_queryFilter=_id+eq+'%s'";
var queryAgentByTypeURLTemplate = "%s/json%s/realm-config/agents/%s?_queryFilter=_id+eq+'%s'";
var agentURLTemplate = "%s/json%s/realm-config/agents/%s/%s";
var agentListURLTemplate = "%s/json%s/realm-config/agents/%s?_queryFilter=true";
var apiVersion8 = "protocol=2.1,resource=1.0";
var getApiConfig8 = () => {
  return {
    apiVersion: apiVersion8
  };
};
async function getAgentsByType({
  agentType,
  state: state2
}) {
  debugMessage({ message: `AgentApi.getAgentsByType: start`, state: state2 });
  const urlString = util11.format(
    agentListURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentType
  );
  const { data } = await generateAmApi({ resource: getApiConfig8(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  debugMessage({ message: `AgentApi.getAgentsByType: end`, state: state2 });
  return data;
}
async function findAgentById({
  agentId,
  state: state2
}) {
  debugMessage({ message: `AgentApi.findAgentById: start`, state: state2 });
  const urlString = util11.format(
    queryAgentURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentId
  );
  const { data } = await generateAmApi({ resource: getApiConfig8(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  debugMessage({ message: `AgentApi.findAgentById: end`, state: state2 });
  return data.result;
}
async function findAgentByTypeAndId({
  agentType,
  agentId,
  state: state2
}) {
  debugMessage({ message: `AgentApi.findAgentById: start`, state: state2 });
  const urlString = util11.format(
    queryAgentByTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentType,
    agentId
  );
  const { data } = await generateAmApi({ resource: getApiConfig8(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  debugMessage({ message: `AgentApi.findAgentById: end`, state: state2 });
  return data.result;
}
async function getAgentByTypeAndId({
  agentType,
  agentId,
  state: state2
}) {
  debugMessage({ message: `AgentApi.getAgentByTypeAndId: start`, state: state2 });
  const urlString = util11.format(
    agentURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentType,
    agentId
  );
  const { data } = await generateAmApi({ resource: getApiConfig8(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  debugMessage({ message: `AgentApi.getAgentByTypeAndId: end`, state: state2 });
  return data;
}
async function putAgentByTypeAndId({
  agentType,
  agentId,
  agentData,
  state: state2
}) {
  debugMessage({ message: `AgentApi.putAgentByTypeAndId: start`, state: state2 });
  const agent = deleteDeepByKey(agentData, "-encrypted");
  delete agent._provider;
  delete agent._rev;
  const urlString = util11.format(
    agentURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentType,
    agentId
  );
  const { data } = await generateAmApi({ resource: getApiConfig8(), state: state2 }).put(
    urlString,
    agent,
    {
      withCredentials: true
    }
  );
  debugMessage({ message: `AgentApi.putAgentByTypeAndId: end`, state: state2 });
  return data;
}
async function deleteAgentByTypeAndId({
  agentType,
  agentId,
  state: state2
}) {
  debugMessage({ message: `AgentApi.deleteAgentByTypeAndId: start`, state: state2 });
  const urlString = util11.format(
    agentURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    agentType,
    agentId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig8(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  debugMessage({ message: `AgentApi.deleteAgentByTypeAndId: end`, state: state2 });
  return data;
}

// src/ops/AgentOps.ts
var AgentOps_default = (state2) => {
  return {
    createAgentExportTemplate() {
      return createAgentExportTemplate({ state: state2 });
    },
    async readAgents() {
      return readAgents({ state: state2 });
    },
    async readAgent(agentId) {
      return readAgent({ agentId, state: state2 });
    },
    async readAgentByTypeAndId(agentType, agentId) {
      return readAgentByTypeAndId({ agentType, agentId, state: state2 });
    },
    async readIdentityGatewayAgents() {
      return readIdentityGatewayAgents({ state: state2 });
    },
    async readIdentityGatewayAgent(gatewayId) {
      return readIdentityGatewayAgent({ gatewayId, state: state2 });
    },
    async createIdentityGatewayAgent(gatewayId, gatewayData) {
      return createIdentityGatewayAgent({
        gatewayId,
        gatewayData,
        state: state2
      });
    },
    async updateIdentityGatewayAgent(gatewayId, gatewayData) {
      return updateIdentityGatewayAgent({
        gatewayId,
        gatewayData,
        state: state2
      });
    },
    async readJavaAgents() {
      return readJavaAgents({ state: state2 });
    },
    async readJavaAgent(agentId) {
      return readJavaAgent({ agentId, state: state2 });
    },
    async createJavaAgent(agentId, agentData) {
      return createJavaAgent({ agentId, agentData, state: state2 });
    },
    async updateJavaAgent(agentId, agentData) {
      return updateJavaAgent({ agentId, agentData, state: state2 });
    },
    async readWebAgents() {
      return readWebAgents({ state: state2 });
    },
    async readWebAgent(agentId) {
      return readWebAgent({ agentId, state: state2 });
    },
    async createWebAgent(agentId, agentData) {
      return createWebAgent({ agentId, agentData, state: state2 });
    },
    async updateWebAgent(agentId, agentData) {
      return updateWebAgent({ agentId, agentData, state: state2 });
    },
    async exportAgents() {
      return exportAgents({ state: state2 });
    },
    async exportIdentityGatewayAgents() {
      return exportIdentityGatewayAgents({ state: state2 });
    },
    async exportJavaAgents() {
      return exportJavaAgents({ state: state2 });
    },
    async exportWebAgents() {
      return exportWebAgents({ state: state2 });
    },
    async exportAgent(agentId) {
      return exportAgent({ agentId, state: state2 });
    },
    async exportIdentityGatewayAgent(agentId) {
      return exportIdentityGatewayAgent({ agentId, state: state2 });
    },
    async exportJavaAgent(agentId) {
      return exportJavaAgent({ agentId, state: state2 });
    },
    async exportWebAgent(agentId) {
      return exportWebAgent({ agentId, state: state2 });
    },
    async importAgents(importData) {
      return importAgents({ importData, state: state2 });
    },
    async importIdentityGatewayAgents(importData) {
      return importIdentityGatewayAgents({ importData, state: state2 });
    },
    async importJavaAgents(importData) {
      return importJavaAgents({ importData, state: state2 });
    },
    async importWebAgents(importData) {
      return importWebAgents({ importData, state: state2 });
    },
    async importAgent(agentId, importData) {
      return importAgent({ agentId, importData, state: state2 });
    },
    async importIdentityGatewayAgent(agentId, importData) {
      return importIdentityGatewayAgent({
        agentId,
        importData,
        state: state2
      });
    },
    async importJavaAgent(agentId, importData) {
      return importJavaAgent({ agentId, importData, state: state2 });
    },
    async importWebAgent(agentId, importData) {
      return importWebAgent({ agentId, importData, state: state2 });
    },
    async deleteAgents() {
      return deleteAgents({ state: state2 });
    },
    async deleteAgent(agentId) {
      return deleteAgent({ agentId, state: state2 });
    },
    async deleteIdentityGatewayAgents() {
      return deleteIdentityGatewayAgents({ state: state2 });
    },
    async deleteIdentityGatewayAgent(agentId) {
      return deleteIdentityGatewayAgent({ agentId, state: state2 });
    },
    async deleteJavaAgents() {
      return deleteJavaAgents({ state: state2 });
    },
    async deleteJavaAgent(agentId) {
      return deleteJavaAgent({ agentId, state: state2 });
    },
    async deleteWebAgents() {
      return deleteWebAgents({ state: state2 });
    },
    async deleteWebAgent(agentId) {
      return deleteWebAgent({ agentId, state: state2 });
    },
    // Deprecated
    async getAgents() {
      return readAgents({ state: state2 });
    },
    async getAgent(agentId) {
      return readAgent({ agentId, state: state2 });
    },
    async getAgentByTypeAndId(agentType, agentId) {
      return readAgentByTypeAndId({ agentType, agentId, state: state2 });
    },
    async getIdentityGatewayAgents() {
      return readIdentityGatewayAgents({ state: state2 });
    },
    async getIdentityGatewayAgent(gatewayId) {
      return readIdentityGatewayAgent({ gatewayId, state: state2 });
    },
    async putIdentityGatewayAgent(gatewayId, gatewayData) {
      return updateIdentityGatewayAgent({
        gatewayId,
        gatewayData,
        state: state2
      });
    },
    async getJavaAgents() {
      return readJavaAgents({ state: state2 });
    },
    async getJavaAgent(agentId) {
      return readJavaAgent({ agentId, state: state2 });
    },
    async putJavaAgent(agentId, agentData) {
      return updateJavaAgent({ agentId, agentData, state: state2 });
    },
    async getWebAgents() {
      return readWebAgents({ state: state2 });
    },
    async getWebAgent(agentId) {
      return readWebAgent({ agentId, state: state2 });
    },
    async putWebAgent(agentId, agentData) {
      return updateWebAgent({ agentId, agentData, state: state2 });
    }
  };
};
function createAgentExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    agents: {}
  };
}
async function readAgents({
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.readAgents: start`, state: state2 });
    let agents = [];
    const resolved = await Promise.all([
      getAgentsByType({ agentType: "IdentityGatewayAgent", state: state2 }),
      getAgentsByType({ agentType: "J2EEAgent", state: state2 }),
      getAgentsByType({ agentType: "WebAgent", state: state2 })
    ]);
    agents = agents.concat(resolved[0].result);
    agents = agents.concat(resolved[1].result);
    agents = agents.concat(resolved[2].result);
    agents.sort((a, b) => a._id.localeCompare(b._id));
    debugMessage({ message: `AgentOps.readAgents: end`, state: state2 });
    return agents;
  } catch (error) {
    throw new FrodoError(`Error reading agents`, error);
  }
}
async function readAgent({
  agentId,
  state: state2
}) {
  let agents = [];
  try {
    debugMessage({ message: `AgentOps.readAgent: start`, state: state2 });
    agents = await findAgentById({ agentId, state: state2 });
    if (agents.length === 1) {
      const result = await getAgentByTypeAndId({
        agentType: agents[0]._type,
        agentId: agents[0]._id,
        state: state2
      });
      debugMessage({ message: `AgentOps.readAgent: end`, state: state2 });
      return result;
    }
  } catch (error) {
    throw new FrodoError(`Error reading agent ${agentId}`, error);
  }
  if (agents.length === 0) {
    throw new FrodoError(`Agent '${agentId}' not found`);
  } else {
    throw new FrodoError(`${agents.length} agents '${agentId}' found`);
  }
}
async function readAgentByTypeAndId({
  agentType,
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.readAgentByTypeAndId: start`, state: state2 });
    const result = await getAgentByTypeAndId({ agentType, agentId, state: state2 });
    debugMessage({ message: `AgentOps.readAgentByTypeAndId: start`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(
      `Error reading agent ${agentId} of type ${agentType}`,
      error
    );
  }
}
async function readIdentityGatewayAgents({
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.readIdentityGatewayAgents: start`,
      state: state2
    });
    const { result } = await getAgentsByType({
      agentType: "IdentityGatewayAgent",
      state: state2
    });
    debugMessage({ message: `AgentOps.readIdentityGatewayAgents: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading identity gateway agents`, error);
  }
}
async function readIdentityGatewayAgent({
  gatewayId,
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.readIdentityGatewayAgent: start`,
      state: state2
    });
    const result = await readAgentByTypeAndId({
      agentType: "IdentityGatewayAgent",
      agentId: gatewayId,
      state: state2
    });
    debugMessage({ message: `AgentOps.readIdentityGatewayAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(
      `Error reading identity gateway agent ${gatewayId}`,
      error
    );
  }
}
async function createIdentityGatewayAgent({
  gatewayId,
  gatewayData,
  state: state2
}) {
  debugMessage({
    message: `AgentOps.createIdentityGatewayAgent: start`,
    state: state2
  });
  try {
    await readIdentityGatewayAgent({ gatewayId, state: state2 });
    throw new FrodoError(`Agent ${gatewayId} already exists!`);
  } catch (error) {
    try {
      const result = await putAgentByTypeAndId({
        agentType: "IdentityGatewayAgent",
        agentId: gatewayId,
        agentData: gatewayData,
        state: state2
      });
      debugMessage({
        message: `AgentOps.createIdentityGatewayAgent: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(
        `Error creating identity gateway agent ${gatewayId}`,
        error2
      );
    }
  }
}
async function updateIdentityGatewayAgent({
  gatewayId,
  gatewayData,
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.updateIdentityGatewayAgent: start`,
      state: state2
    });
    const result = await putAgentByTypeAndId({
      agentType: "IdentityGatewayAgent",
      agentId: gatewayId,
      agentData: gatewayData,
      state: state2
    });
    debugMessage({
      message: `AgentOps.updateIdentityGatewayAgent: end`,
      state: state2
    });
    return result;
  } catch (error) {
    throw new FrodoError(
      `Error updating identity gateway agent ${gatewayId}`,
      error
    );
  }
}
async function readJavaAgents({
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.readJavaAgents: start`, state: state2 });
    const { result } = await getAgentsByType({
      agentType: "J2EEAgent",
      state: state2
    });
    debugMessage({ message: `AgentOps.readJavaAgents: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading java agents`, error);
  }
}
async function readJavaAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.readJavaAgent: start`, state: state2 });
    const result = await readAgentByTypeAndId({
      agentType: "J2EEAgent",
      agentId,
      state: state2
    });
    debugMessage({ message: `AgentOps.readJavaAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading java agent ${agentId}`, error);
  }
}
async function createJavaAgent({
  agentId,
  agentData,
  state: state2
}) {
  debugMessage({ message: `AgentOps.createJavaAgent: start`, state: state2 });
  try {
    await readJavaAgent({ agentId, state: state2 });
    throw new FrodoError(`Agent ${agentId} already exists!`);
  } catch (error) {
    try {
      const result = await putAgentByTypeAndId({
        agentType: "J2EEAgent",
        agentId,
        agentData,
        state: state2
      });
      debugMessage({
        message: `AgentOps.createJavaAgent: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating java agent ${agentId}`, error2);
    }
  }
}
async function updateJavaAgent({
  agentId,
  agentData,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.updateJavaAgent: start`, state: state2 });
    const result = await putAgentByTypeAndId({
      agentType: "J2EEAgent",
      agentId,
      agentData,
      state: state2
    });
    debugMessage({ message: `AgentOps.updateJavaAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error updating java agent ${agentId}`, error);
  }
}
async function readWebAgents({ state: state2 }) {
  try {
    debugMessage({ message: `AgentOps.readWebAgents: start`, state: state2 });
    const { result } = await getAgentsByType({
      agentType: "WebAgent",
      state: state2
    });
    debugMessage({ message: `AgentOps.readWebAgents: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading web agents`, error);
  }
}
async function readWebAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.readWebAgent: start`, state: state2 });
    const result = await readAgentByTypeAndId({
      agentType: "WebAgent",
      agentId,
      state: state2
    });
    debugMessage({ message: `AgentOps.readWebAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading web agent ${agentId}`, error);
  }
}
async function createWebAgent({
  agentId,
  agentData,
  state: state2
}) {
  debugMessage({ message: `AgentOps.createWebAgent: start`, state: state2 });
  try {
    await readWebAgent({ agentId, state: state2 });
    throw new FrodoError(`Agent ${agentId} already exists!`);
  } catch (error) {
    try {
      const result = await putAgentByTypeAndId({
        agentType: "WebAgent",
        agentId,
        agentData,
        state: state2
      });
      debugMessage({
        message: `AgentOps.createWebAgent: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating web agent ${agentId}`, error2);
    }
  }
}
async function updateWebAgent({
  agentId,
  agentData,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.updateWebAgent: start`, state: state2 });
    const result = await putAgentByTypeAndId({
      agentType: "WebAgent",
      agentId,
      agentData,
      state: state2
    });
    debugMessage({ message: `AgentOps.updateWebAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error updating web agent ${agentId}`, error);
  }
}
async function exportAgents({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({ message: `AgentOps.exportAgents: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agents = await readAgents({ state: state2 });
    indicatorId = createProgressIndicator({
      total: agents.length,
      message: "Exporting agents...",
      state: state2
    });
    for (const agent of agents) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting agent ${agent._id}`,
        state: state2
      });
      exportData.agents[agent._id] = agent;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${agents.length} agents.`,
      state: state2
    });
    debugMessage({ message: `AgentOps.exportAgents: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting agents`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting agents`, error);
  }
}
async function exportIdentityGatewayAgents({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({
      message: `AgentOps.exportIdentityGatewayAgents: start`,
      state: state2
    });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agents = await readIdentityGatewayAgents({ state: state2 });
    indicatorId = createProgressIndicator({
      total: agents.length,
      message: "Exporting IG agents...",
      state: state2
    });
    for (const agent of agents) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting IG agent ${agent._id}`,
        state: state2
      });
      exportData.agents[agent._id] = agent;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${agents.length} IG agents.`,
      state: state2
    });
    debugMessage({
      message: `AgentOps.exportIdentityGatewayAgents: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting identity gateway agents`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting identity gateway agents`, error);
  }
}
async function exportJavaAgents({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({ message: `AgentOps.exportJavaAgents: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agents = await readJavaAgents({ state: state2 });
    indicatorId = createProgressIndicator({
      total: agents.length,
      message: "Exporting Java agents...",
      state: state2
    });
    for (const agent of agents) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting Java agent ${agent._id}`,
        state: state2
      });
      exportData.agents[agent._id] = agent;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${agents.length} Java agents.`,
      state: state2
    });
    debugMessage({ message: `AgentOps.exportJavaAgents: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting java agents`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting java agents`, error);
  }
}
async function exportWebAgents({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({ message: `AgentOps.exportWebAgents: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agents = await readWebAgents({ state: state2 });
    indicatorId = createProgressIndicator({
      total: agents.length,
      message: "Exporting web agents...",
      state: state2
    });
    for (const agent of agents) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting web agent ${agent._id}`,
        state: state2
      });
      exportData.agents[agent._id] = agent;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${agents.length} web agents.`,
      state: state2
    });
    debugMessage({ message: `AgentOps.exportWebAgents: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting web agents`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting web agents`, error);
  }
}
async function exportAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.exportAgent: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agentObject = await readAgent({ agentId, state: state2 });
    exportData.agents[agentId] = agentObject;
    debugMessage({ message: `AgentOps.exportAgent: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting agent ${agentId}`, error);
  }
}
async function exportIdentityGatewayAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.exportIdentityGatewayAgent: start`,
      state: state2
    });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agentObject = await readIdentityGatewayAgent({
      gatewayId: agentId,
      state: state2
    });
    exportData.agents[agentId] = agentObject;
    debugMessage({
      message: `AgentOps.exportIdentityGatewayAgent: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(
      `Error exporting identity gateway agent ${agentId}`,
      error
    );
  }
}
async function exportJavaAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.exportJavaAgent: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agentObject = await readJavaAgent({ agentId, state: state2 });
    exportData.agents[agentId] = agentObject;
    debugMessage({ message: `AgentOps.exportJavaAgent: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting java agent ${agentId}`, error);
  }
}
async function exportWebAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.exportWebAgent: start`, state: state2 });
    const exportData = createAgentExportTemplate({ state: state2 });
    const agentObject = await readWebAgent({ agentId, state: state2 });
    exportData.agents[agentId] = agentObject;
    debugMessage({ message: `AgentOps.exportWebAgent: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting web agent ${agentId}`, error);
  }
}
async function importAgents({
  importData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.importAgents: start`, state: state2 });
    for (const agentId of Object.keys(importData.agents)) {
      let agentType;
      try {
        agentType = importData.agents[agentId]._type._id;
        debugMessage({
          message: `AgentOps.importAgents: ${agentId} [${agentType}]`,
          state: state2
        });
        await putAgentByTypeAndId({
          agentType,
          agentId,
          agentData: importData.agents[agentId],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing agent ${agentId} of type ${agentType}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing agents`, errors);
    }
    debugMessage({ message: `AgentOps.importAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing agents`, error);
  }
}
async function importIdentityGatewayAgents({
  importData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `AgentOps.importIdentityGatewayAgents: start`,
      state: state2
    });
    for (const agentId of Object.keys(importData.agents)) {
      let agentType;
      try {
        agentType = importData.agents[agentId]._type._id;
        if (agentType !== "IdentityGatewayAgent")
          throw new FrodoError(
            `Wrong agent type! Expected 'IdentityGatewayAgent' but got '${agentType}'.`
          );
        await putAgentByTypeAndId({
          agentType,
          agentId,
          agentData: importData.agents[agentId],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing agent ${agentId} of type ${agentType}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing identity gateway agents`, errors);
    }
    debugMessage({
      message: `AgentOps.importIdentityGatewayAgents: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing identity gateway agents`, error);
  }
}
async function importJavaAgents({
  importData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.importJavaAgents: start`, state: state2 });
    for (const agentId of Object.keys(importData.agents)) {
      let agentType;
      try {
        agentType = importData.agents[agentId]._type._id;
        if (agentType !== "J2EEAgent")
          throw new FrodoError(
            `Wrong agent type! Expected 'J2EEAgent' but got '${agentType}'.`
          );
        await putAgentByTypeAndId({
          agentType,
          agentId,
          agentData: importData.agents[agentId],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing agent ${agentId} of type ${agentType}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing java agents`, errors);
    }
    debugMessage({ message: `AgentOps.importJavaAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing java agents`, error);
  }
}
async function importWebAgents({
  importData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.importWebAgents: start`, state: state2 });
    for (const agentId of Object.keys(importData.agents)) {
      let agentType;
      try {
        agentType = importData.agents[agentId]._type._id;
        if (agentType !== "WebAgent")
          throw new FrodoError(
            `Wrong agent type! Expected 'WebAgent' but got '${agentType}'.`
          );
        await putAgentByTypeAndId({
          agentType,
          agentId,
          agentData: importData.agents[agentId],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing agent ${agentId} of type ${agentType}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing web agents`, errors);
    }
    debugMessage({ message: `AgentOps.importWebAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing web agents`, error);
  }
}
async function importAgent({
  agentId,
  importData,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.importAgent: start`, state: state2 });
    const agentType = importData.agents[agentId]?._type._id;
    const result = await putAgentByTypeAndId({
      agentType,
      agentId,
      agentData: importData.agents[agentId],
      state: state2
    });
    debugMessage({ message: `AgentOps.importAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error importing agent ${agentId}`, error);
  }
}
async function importIdentityGatewayAgent({
  agentId,
  importData,
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.importIdentityGatewayAgent: start`,
      state: state2
    });
    const agentType = importData.agents[agentId]?._type._id;
    if (agentType !== "IdentityGatewayAgent")
      throw new FrodoError(
        `Wrong agent type! Expected 'IdentityGatewayAgent' but got '${agentType}'.`
      );
    const result = await putAgentByTypeAndId({
      agentType,
      agentId,
      agentData: importData.agents[agentId],
      state: state2
    });
    debugMessage({
      message: `AgentOps.importIdentityGatewayAgent: end`,
      state: state2
    });
    return result;
  } catch (error) {
    throw new FrodoError(
      `Error importing identity gateway agent ${agentId}`,
      error
    );
  }
}
async function importJavaAgent({
  agentId,
  importData,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.importJavaAgent: start`, state: state2 });
    const agentType = importData.agents[agentId]?._type._id;
    if (agentType !== "J2EEAgent")
      throw new FrodoError(
        `Wrong agent type! Expected 'J2EEAgent' but got '${agentType}'.`
      );
    const result = await putAgentByTypeAndId({
      agentType,
      agentId,
      agentData: importData.agents[agentId],
      state: state2
    });
    debugMessage({ message: `AgentOps.importJavaAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error importing java agent ${agentId}`, error);
  }
}
async function importWebAgent({
  agentId,
  importData,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.importWebAgent: start`, state: state2 });
    const agentType = importData.agents[agentId]?._type._id;
    if (agentType !== "WebAgent")
      throw new FrodoError(
        `Wrong agent type! Expected 'WebAgent' but got '${agentType}'.`
      );
    const result = await putAgentByTypeAndId({
      agentType,
      agentId,
      agentData: importData.agents[agentId],
      state: state2
    });
    debugMessage({ message: `AgentOps.importWebAgent: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error importing web agent ${agentId}`, error);
  }
}
async function deleteAgents({ state: state2 }) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.deleteAgents: start`, state: state2 });
    const agents = await readAgents({ state: state2 });
    for (const agent of agents) {
      try {
        debugMessage({
          message: `AgentOps.deleteAgents: '${agent["_id"]}'`,
          state: state2
        });
        await deleteAgentByTypeAndId({
          agentType: agent["_type"]["_id"],
          agentId: agent["_id"],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error deleting agent ${agent["_id"]} of type ${agent["_type"]["_id"]}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting agents`, errors);
    }
    debugMessage({ message: `AgentOps.deleteAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting agents`, error);
  }
}
async function deleteIdentityGatewayAgents({ state: state2 }) {
  const errors = [];
  try {
    debugMessage({
      message: `AgentOps.deleteIdentityGatewayAgents: start`,
      state: state2
    });
    const agents = await readIdentityGatewayAgents({ state: state2 });
    for (const agent of agents) {
      try {
        debugMessage({
          message: `AgentOps.deleteIdentityGatewayAgent: '${agent["_id"]}'`,
          state: state2
        });
        await deleteAgentByTypeAndId({
          agentType: agent["_type"]["_id"],
          agentId: agent["_id"],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error deleting agent ${agent["_id"]} of type ${agent["_type"]["_id"]}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting identity gateway agents`, errors);
    }
    debugMessage({
      message: `AgentOps.deleteIdentityGatewayAgents: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting identity gateway agents`, error);
  }
}
async function deleteJavaAgents({ state: state2 }) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.deleteJavaAgents: start`, state: state2 });
    const agents = await readJavaAgents({ state: state2 });
    for (const agent of agents) {
      try {
        debugMessage({
          message: `AgentOps.deleteJavaAgent: '${agent["_id"]}'`,
          state: state2
        });
        await deleteAgentByTypeAndId({
          agentType: agent["_type"]["_id"],
          agentId: agent["_id"],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error deleting agent ${agent["_id"]} of type ${agent["_type"]["_id"]}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting java agents`, errors);
    }
    debugMessage({ message: `AgentOps.deleteJavaAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting java agents`, error);
  }
}
async function deleteWebAgents({ state: state2 }) {
  const errors = [];
  try {
    debugMessage({ message: `AgentOps.deleteWebAgents: start`, state: state2 });
    const agents = await readWebAgents({ state: state2 });
    for (const agent of agents) {
      try {
        debugMessage({
          message: `AgentOps.deleteWebAgent: '${agent["_id"]}'`,
          state: state2
        });
        await deleteAgentByTypeAndId({
          agentType: agent["_type"]["_id"],
          agentId: agent["_id"],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error deleting agent ${agent["_id"]} of type ${agent["_type"]["_id"]}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting web agents`, errors);
    }
    debugMessage({ message: `AgentOps.deleteWebAgents: end`, state: state2 });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting web agents`, error);
  }
}
async function deleteAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.deleteAgent: start`, state: state2 });
    const agents = await findAgentById({ agentId, state: state2 });
    if (agents.length == 0) {
      throw new FrodoError(`Agent '${agentId}' not found!`);
    }
    for (const agent of agents) {
      debugMessage({
        message: `AgentOps.deleteAgent: '${agent["_id"]}'`,
        state: state2
      });
      await deleteAgentByTypeAndId({
        agentType: agent["_type"],
        agentId: agent["_id"],
        state: state2
      });
    }
    debugMessage({ message: `AgentOps.deleteAgent: end`, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting agent ${agentId}`, error);
  }
}
async function deleteIdentityGatewayAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({
      message: `AgentOps.deleteIdentityGatewayAgent: start`,
      state: state2
    });
    const agents = await findAgentByTypeAndId({
      agentType: "IdentityGatewayAgent",
      agentId,
      state: state2
    });
    if (agents.length == 0) {
      throw new FrodoError(`Identity gateway agent '${agentId}' not found!`);
    }
    for (const agent of agents) {
      debugMessage({
        message: `AgentOps.deleteIdentityGatewayAgent: '${agent["_id"]}'`,
        state: state2
      });
      await deleteAgentByTypeAndId({
        agentType: agent["_type"]["_id"],
        agentId: agent["_id"],
        state: state2
      });
    }
    debugMessage({
      message: `AgentOps.deleteIdentityGatewayAgent: end`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error deleting identity gateway agent ${agentId}`,
      error
    );
  }
}
async function deleteJavaAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.deleteJavaAgent: start`, state: state2 });
    const agents = await findAgentByTypeAndId({
      agentType: "J2EEAgent",
      agentId,
      state: state2
    });
    if (agents.length == 0) {
      throw new FrodoError(`Java agent '${agentId}' not found!`);
    }
    for (const agent of agents) {
      debugMessage({
        message: `AgentOps.deleteJavaAgent: '${agent["_id"]}'`,
        state: state2
      });
      await deleteAgentByTypeAndId({
        agentType: agent["_type"]["_id"],
        agentId: agent["_id"],
        state: state2
      });
    }
    debugMessage({ message: `AgentOps.deleteJavaAgent: end`, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting java agent ${agentId}`, error);
  }
}
async function deleteWebAgent({
  agentId,
  state: state2
}) {
  try {
    debugMessage({ message: `AgentOps.deleteWebAgent: start`, state: state2 });
    const agents = await findAgentByTypeAndId({
      agentType: "WebAgent",
      agentId,
      state: state2
    });
    if (agents.length == 0) {
      throw new FrodoError(`Web agent '${agentId}' not found!`);
    }
    for (const agent of agents) {
      debugMessage({
        message: `AgentOps.deleteWebAgent: '${agent["_id"]}'`,
        state: state2
      });
      await deleteAgentByTypeAndId({
        agentType: agent["_type"]["_id"],
        agentId: agent["_id"],
        state: state2
      });
    }
    debugMessage({ message: `AgentOps.deleteWebAgent: end`, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting web agent ${agentId}`, error);
  }
}

// src/api/CirclesOfTrustApi.ts
import util12 from "util";
var circleOfTrustByIdURLTemplate = "%s/json%s/realm-config/federation/circlesoftrust/%s";
var createCircleOfTrustURLTemplate = "%s/json%s/realm-config/federation/circlesoftrust/?_action=create";
var queryAllCirclesOfTrustURLTemplate = "%s/json%s/realm-config/federation/circlesoftrust?_queryFilter=true";
var apiVersion9 = "protocol=2.1,resource=1.0";
var getApiConfig9 = () => {
  return {
    apiVersion: apiVersion9
  };
};
async function getCirclesOfTrust({
  state: state2
}) {
  const urlString = util12.format(
    queryAllCirclesOfTrustURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig9(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getCircleOfTrust({
  cotId,
  state: state2
}) {
  const urlString = util12.format(
    circleOfTrustByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    cotId
  );
  const { data } = await generateAmApi({ resource: getApiConfig9(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function createCircleOfTrust({
  cotData,
  state: state2
}) {
  const postData = cloneDeep(cotData);
  const urlString = util12.format(
    createCircleOfTrustURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig9(),
    state: state2
  }).post(urlString, postData, {
    withCredentials: true
  });
  return data;
}
async function updateCircleOfTrust({
  cotId,
  cotData,
  state: state2
}) {
  delete cotData._rev;
  const urlString = util12.format(
    circleOfTrustByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    cotId
  );
  const { data } = await generateAmApi({ resource: getApiConfig9(), state: state2 }).put(
    urlString,
    cotData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteCircleOfTrust({
  cotId,
  state: state2
}) {
  const urlString = util12.format(
    circleOfTrustByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    cotId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig9(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/Saml2Api.ts
import util13 from "util";
var providerByLocationAndIdURLTemplate = "%s/json%s/realm-config/saml2/%s/%s";
var createHostedProviderURLTemplate = "%s/json%s/realm-config/saml2/hosted/?_action=create";
var createRemoteProviderURLTemplate = "%s/json%s/realm-config/saml2/remote/?_action=importEntity";
var queryAllProvidersURLTemplate = "%s/json%s/realm-config/saml2?_queryFilter=true";
var queryProvidersByEntityIdURLTemplate = "%s/json%s/realm-config/saml2?_queryFilter=%s&_fields=%s";
var metadataByEntityIdURLTemplate = "%s/saml2/jsp/exportmetadata.jsp?entityid=%s&realm=%s";
var apiVersion10 = "protocol=2.1,resource=1.0";
var getApiConfig10 = () => {
  return {
    apiVersion: apiVersion10
  };
};
async function getProviderStubs({
  state: state2
}) {
  const urlString = util13.format(
    queryAllProvidersURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig10(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function queryProviderStubs({
  filter = "true",
  fields = ["*"],
  state: state2
}) {
  const urlString = util13.format(
    queryProvidersByEntityIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    encodeURIComponent(filter),
    fields.join(",")
  );
  const { data } = await generateAmApi({ resource: getApiConfig10(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getProvider({
  location,
  entityId64,
  state: state2
}) {
  const urlString = util13.format(
    providerByLocationAndIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    location,
    entityId64
  );
  const { data } = await generateAmApi({ resource: getApiConfig10(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteProvider({
  location,
  entityId64,
  state: state2
}) {
  const urlString = util13.format(
    providerByLocationAndIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    location,
    entityId64
  );
  const { data } = await generateAmApi({
    resource: getApiConfig10(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}
function getProviderMetadataUrl({
  entityId,
  state: state2
}) {
  return util13.format(
    metadataByEntityIdURLTemplate,
    state2.getHost(),
    encodeURIComponent(entityId),
    state2.getRealm()
  );
}
async function getProviderMetadata({
  entityId,
  state: state2
}) {
  const { data } = await generateAmApi({ resource: getApiConfig10(), state: state2 }).get(
    getProviderMetadataUrl({ entityId, state: state2 }),
    {
      withCredentials: true
    }
  );
  return data;
}
async function createProvider({
  location,
  providerData,
  metaData,
  state: state2
}) {
  let postData = cloneDeep(providerData);
  let urlString = util13.format(
    createHostedProviderURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  if (location === "remote") {
    if (!metaData)
      throw new Error(`Missing metadata for remote entity provider.`);
    urlString = util13.format(
      createRemoteProviderURLTemplate,
      state2.getHost(),
      getCurrentRealmPath(state2)
    );
    postData = {
      standardMetadata: metaData
    };
  }
  const { data } = await generateAmApi({
    resource: getApiConfig10(),
    state: state2
  }).post(urlString, postData, {
    withCredentials: true
  });
  return data;
}
async function updateProvider({
  location,
  entityId = void 0,
  providerData,
  state: state2
}) {
  const urlString = util13.format(
    providerByLocationAndIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    location,
    entityId || providerData._id
  );
  const { data } = await generateAmApi({ resource: getApiConfig10(), state: state2 }).put(
    urlString,
    providerData,
    {
      withCredentials: true
    }
  );
  return data;
}

// src/ops/Saml2Ops.ts
var Saml2Ops_default = (state2) => {
  return {
    async readSaml2ProviderStubs() {
      return readSaml2ProviderStubs({ state: state2 });
    },
    async readSaml2ProviderStub(entityId) {
      return readSaml2ProviderStub({ entityId, state: state2 });
    },
    async readSaml2Provider(entityId) {
      return readSaml2Provider({ entityId, state: state2 });
    },
    async createSaml2Provider(location, providerData, metaData) {
      return createSaml2Provider({ location, providerData, metaData, state: state2 });
    },
    async updateSaml2Provider(location, providerData, entityId) {
      return updateSaml2Provider({ location, providerData, entityId, state: state2 });
    },
    async deleteSaml2Provider(entityId) {
      return deleteSaml2Provider({ entityId, state: state2 });
    },
    async deleteSaml2Providers() {
      return deleteSaml2Providers({ state: state2 });
    },
    getSaml2ProviderMetadataUrl(entityId) {
      return getSaml2ProviderMetadataUrl({ entityId, state: state2 });
    },
    async getSaml2ProviderMetadata(entityId) {
      return getSaml2ProviderMetadata({ entityId, state: state2 });
    },
    async exportSaml2Provider(entityId, options = { deps: true }) {
      return exportSaml2Provider({ entityId, options, state: state2 });
    },
    async exportSaml2Providers(options = { deps: true }) {
      return exportSaml2Providers({ options, state: state2 });
    },
    async importSaml2Provider(entityId, importData, options = { deps: true }) {
      return importSaml2Provider({ entityId, importData, options, state: state2 });
    },
    async importSaml2Providers(importData, options = { deps: true }) {
      return importSaml2Providers({ importData, options, state: state2 });
    },
    // Deprecated
    async getSaml2ProviderStubs() {
      return readSaml2ProviderStubs({ state: state2 });
    },
    getProviderMetadataUrl(entityId) {
      return getSaml2ProviderMetadataUrl({ entityId, state: state2 });
    },
    async getProviderMetadata(entityId) {
      return getSaml2ProviderMetadata({ entityId, state: state2 });
    },
    async getSaml2ProviderStub(entityId) {
      return readSaml2ProviderStub({ entityId, state: state2 });
    },
    async getSaml2Provider(entityId) {
      return readSaml2Provider({ entityId, state: state2 });
    }
  };
};
function createSaml2ExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    saml: {
      hosted: {},
      remote: {},
      metadata: {}
    }
  };
}
async function readSaml2ProviderStubs({
  state: state2
}) {
  try {
    const { result } = await getProviderStubs({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading saml2 provider stubs`, error);
  }
}
async function readSaml2EntityIds({
  state: state2
}) {
  try {
    const { result } = await getProviderStubs({ state: state2 });
    const entityIds = result.map((stub) => stub.entityId);
    return entityIds;
  } catch (error) {
    throw new FrodoError(`Error reading saml2 entity ids`, error);
  }
}
function getSaml2ProviderMetadataUrl({
  entityId,
  state: state2
}) {
  try {
    return getProviderMetadataUrl({ entityId, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error getting metadata URL for saml2 provider ${entityId}`,
      error
    );
  }
}
async function getSaml2ProviderMetadata({
  entityId,
  state: state2
}) {
  try {
    return getProviderMetadata({ entityId, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error getting metadata for saml2 provider ${entityId}`,
      error
    );
  }
}
async function exportDependencies({
  providerData,
  fileData,
  state: state2
}) {
  const errors = [];
  const attrMapperScriptId = get(providerData, [
    "identityProvider",
    "assertionProcessing",
    "attributeMapper",
    "attributeMapperScript"
  ]);
  if (attrMapperScriptId && attrMapperScriptId !== "[Empty]") {
    try {
      const scriptData = await getScript({
        scriptId: attrMapperScriptId,
        state: state2
      });
      scriptData.script = convertBase64TextToArray(scriptData.script);
      fileData.script[attrMapperScriptId] = scriptData;
    } catch (error) {
      errors.push(
        new FrodoError(`Error getting attribute mapper script`, error)
      );
    }
  }
  const idpAdapterScriptId = get(providerData, [
    "identityProvider",
    "advanced",
    "idpAdapter",
    "idpAdapterScript"
  ]);
  if (idpAdapterScriptId && idpAdapterScriptId !== "[Empty]") {
    try {
      const scriptData = await getScript({
        scriptId: idpAdapterScriptId,
        state: state2
      });
      scriptData.script = convertBase64TextToArray(scriptData.script);
      fileData.script[idpAdapterScriptId] = scriptData;
    } catch (error) {
      errors.push(new FrodoError(`Error getting idp adapter script`, error));
    }
  }
  const spAdapterScriptId = get(providerData, [
    "serviceProvider",
    "assertionProcessing",
    "adapter",
    "spAdapterScript"
  ]);
  if (spAdapterScriptId && spAdapterScriptId !== "[Empty]") {
    try {
      const scriptData = await getScript({
        scriptId: spAdapterScriptId,
        state: state2
      });
      scriptData.script = convertBase64TextToArray(scriptData.script);
      fileData.script[spAdapterScriptId] = scriptData;
    } catch (error) {
      errors.push(new FrodoError(`Error getting sp adapter script`, error));
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting saml2 dependencies`, errors);
  }
}
async function exportMetadata({
  providerData,
  fileData,
  state: state2
}) {
  const metaDataResponse = await getSaml2ProviderMetadata({
    entityId: providerData.entityId,
    state: state2
  });
  if (!metaDataResponse) {
    throw new FrodoError(
      `Unable to obtain metadata from ${getSaml2ProviderMetadataUrl({
        entityId: providerData.entityId,
        state: state2
      })}`
    );
  }
  fileData.saml.metadata[providerData._id] = convertBase64UrlTextToArray(
    encodeBase64Url(metaDataResponse)
  );
}
async function readSaml2ProviderStub({
  entityId,
  state: state2
}) {
  try {
    debugMessage({
      message: `Saml2Ops.getSaml2ProviderStub: start [entityId=${entityId}]`,
      state: state2
    });
    const found = await queryProviderStubs({
      filter: `entityId eq '${entityId}'`,
      state: state2
    });
    switch (found.resultCount) {
      case 0:
        throw new FrodoError(`No provider with entity id '${entityId}' found`);
      case 1: {
        debugMessage({
          message: `Saml2Ops.getSaml2ProviderStub: end [entityId=${entityId}]`,
          state: state2
        });
        return found.result[0];
      }
      default:
        throw new FrodoError(
          `Multiple providers with entity id '${entityId}' found`
        );
    }
  } catch (error) {
    throw new FrodoError(
      `Error reading saml2 provider stub ${entityId}`,
      error
    );
  }
}
async function readSaml2Provider({
  entityId,
  state: state2
}) {
  try {
    debugMessage({
      message: `Saml2Ops.getSaml2Provider: start [entityId=${entityId}]`,
      state: state2
    });
    const stub = await readSaml2ProviderStub({ entityId, state: state2 });
    const { location } = stub;
    const entityId64 = stub._id;
    const providerData = await getProvider({
      location,
      entityId64,
      state: state2
    });
    debugMessage({
      message: `Saml2Ops.getSaml2Provider: end [entityId=${entityId}]`,
      state: state2
    });
    return providerData;
  } catch (error) {
    throw new FrodoError(`Error reading saml2 provider ${entityId}`, error);
  }
}
async function createSaml2Provider({
  location,
  providerData,
  metaData,
  state: state2
}) {
  try {
    return createProvider({ location, providerData, metaData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error creating saml2 provider`, error);
  }
}
async function updateSaml2Provider({
  location,
  entityId = void 0,
  providerData,
  state: state2
}) {
  try {
    return updateProvider({ location, entityId, providerData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error updating saml2 provider`, error);
  }
}
async function deleteSaml2Provider({
  entityId,
  state: state2
}) {
  try {
    debugMessage({
      message: `Saml2Ops.deleteSaml2Provider: start [entityId=${entityId}]`,
      state: state2
    });
    const stub = await readSaml2ProviderStub({ entityId, state: state2 });
    const { location } = stub;
    const id2 = stub._id;
    const providerData = await deleteProvider({
      location,
      entityId64: id2,
      state: state2
    });
    debugMessage({
      message: `Saml2Ops.deleteSaml2Provider: end [entityId=${entityId}]`,
      state: state2
    });
    return providerData;
  } catch (error) {
    throw new FrodoError(`Error deleting saml2 provider ${entityId}`, error);
  }
}
async function deleteSaml2Providers({
  state: state2
}) {
  try {
    debugMessage({ message: `Saml2Ops.deleteSaml2Providers: start`, state: state2 });
    const providers = [];
    const stubs = await readSaml2ProviderStubs({ state: state2 });
    for (const stub of stubs) {
      const provider = await deleteProvider({
        location: stub.location,
        entityId64: stub._id,
        state: state2
      });
      providers.push(provider);
    }
    debugMessage({
      message: `Saml2Ops.deleteSaml2Providers: end [deleted ${providers.length} providers]`,
      state: state2
    });
    return providers;
  } catch (error) {
    throw new FrodoError(`Error deleting saml2 providers`, error);
  }
}
async function exportSaml2Provider({
  entityId,
  options = { deps: true },
  state: state2
}) {
  try {
    debugMessage({
      message: `Saml2Ops.exportSaml2Provider: start [entityId=${entityId}]`,
      state: state2
    });
    const exportData = createSaml2ExportTemplate({ state: state2 });
    const stub = await readSaml2ProviderStub({ entityId, state: state2 });
    const { location } = stub;
    const id2 = stub._id;
    const providerData = await getProvider({
      location,
      entityId64: id2,
      state: state2
    });
    exportData.saml[stub.location][providerData._id] = providerData;
    await exportMetadata({ providerData, fileData: exportData, state: state2 });
    if (options.deps) {
      await exportDependencies({ providerData, fileData: exportData, state: state2 });
    }
    debugMessage({
      message: `Saml2Ops.exportSaml2Provider: end [entityId=${entityId}]`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting saml2 provider ${entityId}`, error);
  }
}
async function exportSaml2Providers({
  options = { deps: true },
  state: state2
}) {
  let indicatorId;
  const errors = [];
  try {
    const fileData = createSaml2ExportTemplate({ state: state2 });
    const stubs = await readSaml2ProviderStubs({ state: state2 });
    indicatorId = createProgressIndicator({
      total: stubs.length,
      message: "Exporting SAML2 providers...",
      state: state2
    });
    for (const stub of stubs) {
      try {
        updateProgressIndicator({
          id: indicatorId,
          message: `Exporting SAML2 provider ${stub._id}`,
          state: state2
        });
        const providerData = await getProvider({
          location: stub.location,
          entityId64: stub._id,
          state: state2
        });
        await exportMetadata({ providerData, fileData, state: state2 });
        if (options.deps) {
          try {
            await exportDependencies({ providerData, fileData, state: state2 });
          } catch (error) {
            errors.push(error);
          }
        }
        fileData.saml[stub.location][providerData._id] = providerData;
      } catch (error) {
        errors.push(
          new FrodoError(`Error exporting saml2 provider ${stub._id}`, error)
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting saml2 providers`, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${stubs.length} SAML2 providers.`,
      state: state2
    });
    return fileData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting saml2 providers`,
      status: "fail",
      state: state2
    });
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting saml2 providers`, error);
  }
}
async function importDependencies({
  providerData,
  fileData,
  state: state2
}) {
  debugMessage({ message: `Saml2Ops.importDependencies: start`, state: state2 });
  const errors = [];
  const attrMapperScriptId = get(providerData, [
    "identityProvider",
    "assertionProcessing",
    "attributeMapper",
    "attributeMapperScript"
  ]);
  if (attrMapperScriptId && attrMapperScriptId !== "[Empty]") {
    try {
      debugMessage({
        message: `Saml2Ops.importDependencies: attributeMapperScript=${attrMapperScriptId}`,
        state: state2
      });
      const scriptData = get(fileData, ["script", attrMapperScriptId]);
      scriptData.script = convertTextArrayToBase64(
        scriptData.script
      );
      await updateScript({ scriptId: attrMapperScriptId, scriptData, state: state2 });
    } catch (error) {
      errors.push(
        new FrodoError(`Error getting attribute mapper script`, error)
      );
    }
  }
  const idpAdapterScriptId = get(providerData, [
    "identityProvider",
    "advanced",
    "idpAdapter",
    "idpAdapterScript"
  ]);
  if (idpAdapterScriptId && idpAdapterScriptId !== "[Empty]") {
    try {
      debugMessage({
        message: `Saml2Ops.importDependencies: idpAdapterScript=${idpAdapterScriptId}`,
        state: state2
      });
      const scriptData = get(fileData, ["script", idpAdapterScriptId]);
      scriptData.script = convertTextArrayToBase64(
        scriptData.script
      );
      await updateScript({ scriptId: idpAdapterScriptId, scriptData, state: state2 });
    } catch (error) {
      errors.push(
        new FrodoError(`Error getting attribute mapper script`, error)
      );
    }
  }
  const spAdapterScriptId = get(providerData, [
    "serviceProvider",
    "assertionProcessing",
    "adapter",
    "spAdapterScript"
  ]);
  if (spAdapterScriptId && spAdapterScriptId !== "[Empty]") {
    try {
      debugMessage({
        message: `Saml2Ops.importDependencies: spAdapterScriptId=${spAdapterScriptId}`,
        state: state2
      });
      const scriptData = get(fileData, ["script", spAdapterScriptId]);
      scriptData.script = convertTextArrayToBase64(
        scriptData.script
      );
      await updateScript({ scriptId: spAdapterScriptId, scriptData, state: state2 });
    } catch (error) {
      errors.push(
        new FrodoError(`Error getting attribute mapper script`, error)
      );
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing saml2 dependencies`, errors);
  }
  debugMessage({ message: `Saml2Ops.importDependencies: end`, state: state2 });
}
function getLocation(entityId64, data) {
  if (data.saml.hosted[entityId64]) {
    return "hosted";
  }
  if (data.saml.remote[entityId64]) {
    return "remote";
  }
  return void 0;
}
async function importSaml2Provider({
  entityId,
  importData,
  options = { deps: true },
  state: state2
}) {
  debugMessage({ message: `Saml2Ops.importSaml2Provider: start`, state: state2 });
  let response = null;
  try {
    const entityId64 = encode(entityId, false);
    const location = getLocation(entityId64, importData);
    debugMessage({
      message: `Saml2Ops.importSaml2Provider: entityId=${entityId}, entityId64=${entityId64}, location=${location}`,
      state: state2
    });
    if (location) {
      const providerData = importData.saml[location][entityId64];
      if (options.deps) {
        await importDependencies({ providerData, fileData: importData, state: state2 });
      }
      let metaData = null;
      if (location === "remote") {
        metaData = convertTextArrayToBase64Url(
          importData.saml.metadata[entityId64]
        );
      }
      try {
        response = await createProvider({
          location,
          providerData,
          metaData,
          state: state2
        });
      } catch (createProviderErr) {
        try {
          response = await updateProvider({ location, providerData, state: state2 });
        } catch (error) {
          throw new FrodoError(`Error creating saml2 provider`, error);
        }
      }
    } else {
      throw new FrodoError(
        `Saml2 provider ${entityId} not found in import data!`
      );
    }
  } catch (error) {
    throw new FrodoError(`Error importing saml2 provider ${entityId}`, error);
  }
  debugMessage({ message: `Saml2Ops.importSaml2Provider: end`, state: state2 });
  return response;
}
async function importSaml2Providers({
  importData,
  options = { deps: true },
  state: state2
}) {
  debugMessage({ message: `Saml2Ops.importSaml2Providers: start`, state: state2 });
  const response = [];
  const errors = [];
  try {
    const hostedIds = Object.keys(importData.saml.hosted);
    const remoteIds = Object.keys(importData.saml.remote);
    const providerIds = hostedIds.concat(remoteIds);
    for (const entityId64 of providerIds) {
      debugMessage({
        message: `Saml2Ops.importSaml2Providers: entityId=${decodeBase64Url(
          entityId64
        )}`,
        state: state2
      });
      const location = hostedIds.includes(entityId64) ? "hosted" : "remote";
      const providerData = importData.saml[location][entityId64];
      if (options.deps) {
        try {
          await importDependencies({
            providerData,
            fileData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      let metaData = null;
      if (location === "remote") {
        metaData = convertTextArrayToBase64Url(
          importData.saml.metadata[entityId64]
        );
      }
      try {
        response.push(
          await createProvider({ location, providerData, metaData, state: state2 })
        );
      } catch (createProviderErr) {
        try {
          response.push(
            await updateProvider({ location, providerData, state: state2 })
          );
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing saml2 providers`, errors);
    }
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing saml2 providers`, error);
  }
  debugMessage({ message: `Saml2Ops.importSaml2Providers: end`, state: state2 });
  return response;
}

// src/ops/CirclesOfTrustOps.ts
var CirclesOfTrustOps_default = (state2) => {
  return {
    createCirclesOfTrustExportTemplate() {
      return createCirclesOfTrustExportTemplate({ state: state2 });
    },
    async readCirclesOfTrust(entityProviders = []) {
      return readCirclesOfTrust({ entityProviders, state: state2 });
    },
    async readCircleOfTrust(cotId) {
      return readCircleOfTrust({ cotId, state: state2 });
    },
    async createCircleOfTrust(cotId, cotData) {
      return createCircleOfTrust2({ cotId, cotData, state: state2 });
    },
    async updateCircleOfTrust(cotId, cotData) {
      return updateCircleOfTrust2({ cotId, cotData, state: state2 });
    },
    async deleteCircleOfTrust(cotId) {
      return deleteCircleOfTrust2({ cotId, state: state2 });
    },
    async deleteCirclesOfTrust(entityProviders = []) {
      return deleteCirclesOfTrust({ entityProviders, state: state2 });
    },
    async exportCircleOfTrust(cotId) {
      return exportCircleOfTrust({ cotId, state: state2 });
    },
    async exportCirclesOfTrust(entityProviders = []) {
      return exportCirclesOfTrust({ entityProviders, state: state2 });
    },
    async importCircleOfTrust(cotId, importData) {
      return importCircleOfTrust({ cotId, importData, state: state2 });
    },
    async importFirstCircleOfTrust(importData) {
      return importFirstCircleOfTrust({ importData, state: state2 });
    },
    async importCirclesOfTrust(importData, entityProviders = []) {
      return importCirclesOfTrust({ importData, entityProviders, state: state2 });
    },
    // Deprecated
    async getCirclesOfTrust() {
      return readCirclesOfTrust({ state: state2 });
    },
    async getCircleOfTrust(cotId) {
      return readCircleOfTrust({ cotId, state: state2 });
    }
  };
};
function createCirclesOfTrustExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    saml: {
      hosted: {},
      remote: {},
      metadata: {},
      cot: {}
    }
  };
}
async function readCirclesOfTrust({
  entityProviders = [],
  state: state2
}) {
  try {
    debugMessage({
      message: `CirclesOfTrustOps.readCirclesOfTrust: start`,
      state: state2
    });
    let { result } = await getCirclesOfTrust({ state: state2 });
    if (entityProviders.length) {
      debugMessage({
        message: `CirclesOfTrustOps.readCirclesOfTrust: filtering results to entity providers: ${entityProviders}`,
        state: state2
      });
      entityProviders = entityProviders.map((id2) => `${id2}|saml2`);
      result = result.filter((circleOfTrust) => {
        let hasEntityId = false;
        for (const trustedProvider of circleOfTrust.trustedProviders) {
          if (!hasEntityId && entityProviders.includes(trustedProvider)) {
            hasEntityId = true;
          }
        }
        return hasEntityId;
      });
    }
    debugMessage({
      message: `CirclesOfTrustOps.readCirclesOfTrust: end`,
      state: state2
    });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading circles of trust`, error);
  }
}
async function readCircleOfTrust({
  cotId,
  state: state2
}) {
  try {
    const response = await getCircleOfTrust({ cotId, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error reading circle of trust ${cotId}`, error);
  }
}
async function createCircleOfTrust2({
  cotId = void 0,
  cotData = {},
  state: state2
}) {
  if (cotId)
    cotData._id = cotId;
  try {
    const response = await createCircleOfTrust({ cotData, state: state2 });
    return response;
  } catch (createError) {
    if (createError.response?.data?.code === 500 && createError.response?.data?.message === "Unable to update entity provider's circle of trust") {
      try {
        const response = await updateCircleOfTrust({ cotId, cotData, state: state2 });
        return response;
      } catch (updateError) {
        throw new FrodoError(
          `Error creating circle of trust ${cotId}`,
          updateError
        );
      }
    } else {
      throw new FrodoError(
        `Error creating circle of trust ${cotId}`,
        createError
      );
    }
  }
}
async function updateCircleOfTrust2({
  cotId,
  cotData,
  state: state2
}) {
  try {
    const response = await updateCircleOfTrust({ cotId, cotData, state: state2 });
    return response || cotData;
  } catch (error) {
    if (error.response?.data?.code === 500 && (error.response?.data?.message === "Unable to update entity provider's circle of trust" || error.response?.data?.message === "An error occurred while updating the COT memberships")) {
      try {
        const response = await updateCircleOfTrust({ cotId, cotData, state: state2 });
        return response || cotData;
      } catch (error2) {
        throw new FrodoError(`Error updating circle of trust ${cotId}`, error2);
      }
    } else {
      throw new FrodoError(`Error updating circle of trust ${cotId}`, error);
    }
  }
}
async function deleteCircleOfTrust2({
  cotId,
  state: state2
}) {
  try {
    const response = await deleteCircleOfTrust({ cotId, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error deleting circle of trust ${cotId}`, error);
  }
}
async function deleteCirclesOfTrust({
  entityProviders = [],
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `CirclesOfTrustOps.deleteCirclesOfTrust: start`,
      state: state2
    });
    const deleted = [];
    const cots = await readCirclesOfTrust({ entityProviders, state: state2 });
    for (const cot of cots) {
      try {
        deleted.push(await deleteCircleOfTrust2({ cotId: cot._id, state: state2 }));
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting circles of trust`, errors);
    }
    debugMessage({
      message: `CirclesOfTrustOps.deleteCirclesOfTrust: end`,
      state: state2
    });
    return deleted;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting circles of trust`, errors);
  }
}
async function exportCircleOfTrust({
  cotId,
  state: state2
}) {
  try {
    debugMessage({
      message: `CirclesOfTrustOps.exportCircleOfTrust: start`,
      state: state2
    });
    const exportData = createCirclesOfTrustExportTemplate({ state: state2 });
    const cotData = await readCircleOfTrust({
      cotId,
      state: state2
    });
    exportData.saml.cot[cotData._id] = cotData;
    debugMessage({
      message: `CirclesOfTrustOps.exportCircleOfTrust: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting circle of trust ${cotId}`, error);
  }
}
async function exportCirclesOfTrust({
  entityProviders = [],
  options = { indicateProgress: true },
  state: state2
}) {
  try {
    debugMessage({
      message: `CirclesOfTrustOps.exportCirclesOfTrust: start`,
      state: state2
    });
    const exportData = createCirclesOfTrustExportTemplate({ state: state2 });
    let indicatorId;
    const cots = await readCirclesOfTrust({ entityProviders, state: state2 });
    if (options.indicateProgress)
      indicatorId = createProgressIndicator({
        total: cots.length,
        message: "Exporting circles of trust...",
        state: state2
      });
    for (const cot of cots) {
      if (options.indicateProgress)
        updateProgressIndicator({
          id: indicatorId,
          message: `Exporting circle of trust ${cot._id}`,
          state: state2
        });
      exportData.saml.cot[cot._id] = cot;
    }
    if (options.indicateProgress)
      stopProgressIndicator({
        id: indicatorId,
        message: cots.length > 1 ? `Exported ${cots.length} circles of trust.` : null,
        state: state2
      });
    debugMessage({
      message: `CirclesOfTrustOps.exportCirclesOfTrust: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting circles of trust`);
  }
}
async function importCircleOfTrust({
  cotId,
  importData,
  state: state2
}) {
  const imported = [];
  try {
    let response = null;
    for (const id2 of Object.keys(importData.saml.cot)) {
      if (id2 === cotId) {
        const validEntityIds = await readSaml2EntityIds({ state: state2 });
        const validProviders = validEntityIds.map((id3) => `${id3}|saml2`);
        const cotData = importData.saml.cot[id2];
        delete cotData._rev;
        cotData.trustedProviders = validProviders.filter(
          (value) => cotData.trustedProviders.includes(value)
        );
        try {
          response = await createCircleOfTrust2({ cotId, cotData, state: state2 });
          return response;
        } catch (createError) {
          if (createError.httpStatus === 409) {
            debugMessage({
              message: `Circle of trust: ${cotId} already exists, updating...`,
              state: state2
            });
            const existingCot = await readCircleOfTrust({ cotId, state: state2 });
            debugMessage({
              message: `CirclesOfTrustOps.importCirclesOfTrust: Existing trusted providers for ${cotId}:
${existingCot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
              state: state2
            });
            const providers = [
              .../* @__PURE__ */ new Set([
                ...existingCot.trustedProviders,
                ...cotData.trustedProviders
              ])
            ];
            debugMessage({
              message: `CirclesOfTrustOps.importCirclesOfTrust: Merged trusted providers for ${cotId}:
${providers.map((it) => it.split("|")[0]).join("\n")}.`,
              state: state2
            });
            if (providers.length > existingCot.trustedProviders.length) {
              existingCot.trustedProviders = providers;
              response = await updateCircleOfTrust2({
                cotId,
                cotData: existingCot,
                state: state2
              });
              imported.push(id2);
              return response;
            } else {
              debugMessage({
                message: `CirclesOfTrustOps.importCirclesOfTrust: No new trusted providers for ${cotId}.`,
                state: state2
              });
              imported.push(id2);
              return existingCot;
            }
          } else {
            throw createError;
          }
        }
      }
    }
    if (imported.length == 0) {
      throw new FrodoError(`Import error:
${cotId} not found in import data!`);
    }
  } catch (error) {
    if (imported.length == 0) {
      throw error;
    }
    throw new FrodoError(`Error importing circle of trust ${cotId}`);
  }
}
async function importFirstCircleOfTrust({
  importData,
  state: state2
}) {
  try {
    for (const cotId of Object.keys(importData.saml.cot)) {
      const validEntityIds = await readSaml2EntityIds({ state: state2 });
      const validProviders = validEntityIds.map((id2) => `${id2}|saml2`);
      const cotData = importData.saml.cot[cotId];
      delete cotData._rev;
      cotData.trustedProviders = validProviders.filter(
        (value) => cotData.trustedProviders.includes(value)
      );
      try {
        const response = await createCircleOfTrust2({ cotId, cotData, state: state2 });
        return response;
      } catch (createError) {
        if (createError.httpStatus === 409) {
          debugMessage({
            message: `Circle of trust: ${cotId} already exists, updating...`,
            state: state2
          });
          const existingCot = await readCircleOfTrust({ cotId, state: state2 });
          debugMessage({
            message: `CirclesOfTrustOps.importCirclesOfTrust: Existing trusted providers for ${cotId}:
${existingCot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
            state: state2
          });
          const providers = [
            .../* @__PURE__ */ new Set([
              ...existingCot.trustedProviders,
              ...cotData.trustedProviders
            ])
          ];
          debugMessage({
            message: `CirclesOfTrustOps.importCirclesOfTrust: Merged trusted providers for ${cotId}:
${providers.map((it) => it.split("|")[0]).join("\n")}.`,
            state: state2
          });
          if (providers.length > existingCot.trustedProviders.length) {
            existingCot.trustedProviders = providers;
            const response = await updateCircleOfTrust2({
              cotId,
              cotData: existingCot,
              state: state2
            });
            return response;
          } else {
            debugMessage({
              message: `CirclesOfTrustOps.importCirclesOfTrust: No new trusted providers for ${cotId}.`,
              state: state2
            });
            return existingCot;
          }
        } else {
          throw createError;
        }
      }
      break;
    }
  } catch (error) {
    throw new FrodoError(`Error importing first circle of trust`, error);
  }
  throw new FrodoError(`No circles of trust found in import data!`);
}
async function importCirclesOfTrust({
  entityProviders = [],
  importData,
  state: state2
}) {
  const responses = [];
  const errors = [];
  try {
    entityProviders = entityProviders.map((id2) => `${id2}|saml2`);
    const validEntityIds = await readSaml2EntityIds({ state: state2 });
    const validProviders = validEntityIds.map((id2) => `${id2}|saml2`);
    for (const cotId of Object.keys(importData.saml.cot)) {
      try {
        const cotData = importData.saml.cot[cotId];
        delete cotData._rev;
        if (entityProviders.length) {
          entityProviders = validProviders.filter(
            (value) => entityProviders.includes(value)
          );
          let hasEntityId = false;
          for (const trustedProvider of cotData.trustedProviders) {
            if (!hasEntityId && entityProviders.includes(trustedProvider)) {
              hasEntityId = true;
            }
          }
          if (hasEntityId) {
            try {
              const response = await createCircleOfTrust2({
                cotId,
                cotData,
                state: state2
              });
              responses.push(response);
            } catch (createError) {
              if (createError.httpStatus === 409) {
                debugMessage({
                  message: `Circle of trust: ${cotId} already exists, updating...`,
                  state: state2
                });
                const existingCot = await readCircleOfTrust({ cotId, state: state2 });
                debugMessage({
                  message: `CirclesOfTrustOps.importCirclesOfTrust: Existing trusted providers for ${cotId}:
${existingCot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
                  state: state2
                });
                const providers = [
                  .../* @__PURE__ */ new Set([
                    ...existingCot.trustedProviders,
                    ...entityProviders
                  ])
                ];
                debugMessage({
                  message: `CirclesOfTrustOps.importCirclesOfTrust: Updated trusted providers for ${cotId}:
${providers.map((it) => it.split("|")[0]).join("\n")}.`,
                  state: state2
                });
                if (providers.length > existingCot.trustedProviders.length) {
                  existingCot.trustedProviders = providers;
                  const response = await updateCircleOfTrust2({
                    cotId,
                    cotData: existingCot,
                    state: state2
                  });
                  responses.push(response);
                } else {
                  debugMessage({
                    message: `CirclesOfTrustOps.importCirclesOfTrust: No new trusted providers for ${cotId}.`,
                    state: state2
                  });
                }
              } else {
                throw createError;
              }
            }
          }
        } else {
          cotData.trustedProviders = validProviders.filter(
            (value) => cotData.trustedProviders.includes(value)
          );
          try {
            const response = await createCircleOfTrust2({
              cotId,
              cotData,
              state: state2
            });
            responses.push(response);
          } catch (createError) {
            if (createError.httpStatus === 409) {
              debugMessage({
                message: `Circle of trust: ${cotId} already exists, updating...`,
                state: state2
              });
              const existingCot = await readCircleOfTrust({ cotId, state: state2 });
              debugMessage({
                message: `CirclesOfTrustOps.importCirclesOfTrust: Existing trusted providers for ${cotId}:
${existingCot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
                state: state2
              });
              const providers = [
                .../* @__PURE__ */ new Set([
                  ...existingCot.trustedProviders,
                  ...cotData.trustedProviders
                ])
              ];
              debugMessage({
                message: `CirclesOfTrustOps.importCirclesOfTrust: Merged trusted providers for ${cotId}:
${providers.map((it) => it.split("|")[0]).join("\n")}.`,
                state: state2
              });
              if (providers.length > existingCot.trustedProviders.length) {
                existingCot.trustedProviders = providers;
                const response = await updateCircleOfTrust2({
                  cotId,
                  cotData: existingCot,
                  state: state2
                });
                responses.push(response);
              } else {
                debugMessage({
                  message: `CirclesOfTrustOps.importCirclesOfTrust: No new trusted providers for ${cotId}.`,
                  state: state2
                });
              }
            } else {
              throw createError;
            }
          }
        }
      } catch (error) {
        debugMessage({
          message: `Error ${error.response?.status} creating/updating circle of trust: ${error.response?.data?.message}`,
          state: state2
        });
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error importing circles of trust`);
    }
    return responses;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing circles of trust`, error);
  }
}

// src/api/IdmSystemApi.ts
import util14 from "util";
var systemActionsUrlTemplate = "%s/openidm/system?_action=%s";
var systemTestUrlTemplate = "%s/openidm/system/%s?_action=test";
var systemObjectActionsUrlTemplate = "%s/openidm/system/%s/%s?_action=%s";
var systemRunScriptUrlTemplate = "%s/openidm/system/%s?_action=script&scriptId=%s&scriptExecuteMode=resource";
var systemQueryAllUrlTemplate = "%s/openidm/system/%s/%s?_queryId=query-all-ids";
var systemQueryByFilterUrlTemplate = "%s/openidm/system/%s/%s?_queryFilter=%s";
var systemObjectUrlTemplate = "%s/openidm/system/%s/%s/%s";
var DEFAULT_PAGE_SIZE2 = 1e3;
async function testConnectorServers({
  state: state2
}) {
  const urlString = util14.format(
    systemActionsUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    "testConnectorServers"
  );
  const { data } = await generateIdmApi({ state: state2, requestOverride: {} }).post(
    urlString
  );
  return data;
}
async function readAvailableSystems({
  state: state2
}) {
  const urlString = util14.format(
    systemActionsUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    "test"
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString
  );
  return data;
}
async function readSystemStatus({
  systemName,
  state: state2
}) {
  const urlString = util14.format(
    systemTestUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString
  );
  return data;
}
async function authenticateSystemObject({
  systemName,
  systemObjectType,
  username,
  password,
  state: state2
}) {
  const urlString = util14.format(
    systemObjectActionsUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    "authenticate"
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString,
    { username, password }
  );
  return data;
}
async function runSystemScript({
  systemName,
  scriptName,
  state: state2
}) {
  const urlString = util14.format(
    systemRunScriptUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    scriptName
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString
  );
  return data;
}
async function queryAllSystemObjectIds({
  systemName,
  systemObjectType,
  pageSize = DEFAULT_PAGE_SIZE2,
  pageCookie = void 0,
  state: state2
}) {
  const pagingParams = pageSize ? `&_pageSize=${pageSize}&_totalPagedResultsPolicy=EXACT` : "";
  const urlTemplate = pageCookie ? `${systemQueryAllUrlTemplate}${pagingParams}&_pagedResultsCookie=${pageCookie}` : `${systemQueryAllUrlTemplate}${pagingParams}`;
  const urlString = util14.format(
    urlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType
  );
  const { data } = await generateIdmApi({ state: state2 }).get(urlString);
  return data;
}
async function querySystemObjects({
  systemName,
  systemObjectType,
  filter,
  fields = ["*"],
  pageSize = DEFAULT_PAGE_SIZE2,
  pageCookie = void 0,
  state: state2
}) {
  const fieldsParam = fields.length > 0 ? `&_fields=${fields.join(",")}` : "";
  const pagingParams = pageSize ? `&_pageSize=${pageSize}&_totalPagedResultsPolicy=EXACT` : "";
  const urlTemplate = pageCookie ? `${systemQueryByFilterUrlTemplate}${pagingParams}${fieldsParam}&_pagedResultsCookie=${pageCookie}` : `${systemQueryByFilterUrlTemplate}${pagingParams}${fieldsParam}`;
  const urlString = util14.format(
    urlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    decodeURIComponent(filter) === filter ? encodeURIComponent(filter) : filter
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).get(
    urlString
  );
  return data;
}
async function getSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  fields = ["*"],
  state: state2
}) {
  const fieldsParam = `_fields=${fields.join(",")}`;
  const urlString = util14.format(
    `${systemObjectUrlTemplate}?${fieldsParam}`,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    systemObjectId
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).get(
    urlString
  );
  return data;
}
async function createSystemObject({
  systemName,
  systemObjectType,
  systemObjectData,
  state: state2
}) {
  const urlString = util14.format(
    systemObjectActionsUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    "create"
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).post(
    urlString,
    systemObjectData
  );
  return data;
}
async function putSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  systemObjectData,
  failIfExists = false,
  state: state2
}) {
  const urlString = util14.format(
    systemObjectUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    systemObjectId
  );
  const requestOverride = failIfExists ? { headers: { "If-None-Match": "*" } } : { headers: { "If-Match": "*" } };
  const { data } = await generateIdmApi({ requestOverride, state: state2 }).put(
    urlString,
    systemObjectData
  );
  return data;
}
async function patchSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  operations,
  state: state2
}) {
  const urlString = util14.format(
    systemObjectUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    systemObjectId
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).patch(
    urlString,
    operations
  );
  return data;
}
async function deleteSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  state: state2
}) {
  const urlString = util14.format(
    systemObjectUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    systemName,
    systemObjectType,
    systemObjectId
  );
  const { data } = await generateIdmApi({ requestOverride: {}, state: state2 }).delete(
    urlString
  );
  return data;
}

// src/ops/IdmSystemOps.ts
var IdmSystemOps_default = (state2) => {
  return {
    async testConnectorServers() {
      return testConnectorServers2({ state: state2 });
    },
    async readAvailableSystems() {
      return readAvailableSystems2({ state: state2 });
    },
    async readSystemStatus(systemName) {
      return readSystemStatus2({ systemName, state: state2 });
    },
    async authenticateSystemObject(systemName, systemObjectType, username, password) {
      return authenticateSystemObject2({
        systemName,
        systemObjectType,
        username,
        password,
        state: state2
      });
    },
    async runSystemScript(systemName, scriptName) {
      return runSystemScript2({ systemName, scriptName, state: state2 });
    },
    async queryAllSystemObjectIds(systemName, systemObjectType, pageSize = DEFAULT_PAGE_SIZE2, pageCookie) {
      return queryAllSystemObjectIds2({
        systemName,
        systemObjectType,
        pageSize,
        pageCookie,
        state: state2
      });
    },
    async querySystemObjects(systemName, systemObjectType, filter = "true", fields = ["*"], pageSize = DEFAULT_PAGE_SIZE2, pageCookie = void 0) {
      return querySystemObjects2({
        systemName,
        systemObjectType,
        filter,
        fields,
        pageSize,
        pageCookie,
        state: state2
      });
    },
    async readSystemObject(systemName, systemObjectType, systemObjectId, fields = ["*"]) {
      return readSystemObject({
        systemName,
        systemObjectType,
        systemObjectId,
        fields,
        state: state2
      });
    },
    async createSystemObject(systemName, systemObjectType, systemObjectData) {
      return createSystemObject2({
        systemName,
        systemObjectType,
        systemObjectData,
        state: state2
      });
    },
    async updateSystemObject(systemName, systemObjectType, systemObjectId, systemObjectData, failIfExists = false) {
      return updateSystemObject({
        systemName,
        systemObjectType,
        systemObjectId,
        systemObjectData,
        failIfExists,
        state: state2
      });
    },
    async updateSystemObjectProperties(systemName, systemObjectType, systemObjectId, operations) {
      return updateSystemObjectProperties({
        systemName,
        systemObjectType,
        systemObjectId,
        operations,
        state: state2
      });
    },
    async deleteSystemObject(systemName, systemObjectType, systemObjectId) {
      return deleteSystemObject2({
        systemName,
        systemObjectType,
        systemObjectId,
        state: state2
      });
    },
    async readSystemSchema(systemName) {
      return readSystemSchema({ systemName, state: state2 });
    }
  };
};
async function testConnectorServers2({
  state: state2
}) {
  try {
    const response = await testConnectorServers({ state: state2 });
    return response.openicf;
  } catch (error) {
    throw new FrodoError(`Error testing connector servers`, error);
  }
}
async function readAvailableSystems2({
  state: state2
}) {
  try {
    return readAvailableSystems({ state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading available systems`, error);
  }
}
async function readSystemStatus2({
  systemName,
  state: state2
}) {
  try {
    return readSystemStatus({ systemName, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading system status`, error);
  }
}
async function authenticateSystemObject2({
  systemName,
  systemObjectType,
  username,
  password,
  state: state2
}) {
  try {
    return authenticateSystemObject({
      systemName,
      systemObjectType,
      username,
      password,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error authenticating ${systemObjectType} ${username} in system ${systemName}`,
      error
    );
  }
}
async function runSystemScript2({
  systemName,
  scriptName,
  state: state2
}) {
  try {
    return runSystemScript({ systemName, scriptName, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error running script ${scriptName} in system ${systemName}`,
      error
    );
  }
}
async function queryAllSystemObjectIds2({
  systemName,
  systemObjectType,
  pageSize = DEFAULT_PAGE_SIZE2,
  pageCookie = void 0,
  state: state2
}) {
  try {
    return queryAllSystemObjectIds({
      systemName,
      systemObjectType,
      pageSize,
      pageCookie,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error querying all ${systemObjectType} IDs in system ${systemName}`,
      error
    );
  }
}
async function querySystemObjects2({
  systemName,
  systemObjectType,
  filter,
  fields = ["*"],
  pageSize = DEFAULT_PAGE_SIZE2,
  pageCookie = void 0,
  state: state2
}) {
  try {
    return querySystemObjects({
      systemName,
      systemObjectType,
      filter,
      fields,
      pageSize,
      pageCookie,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error querying ${systemObjectType} objects in system ${systemName} matching filter "${filter}"`,
      error
    );
  }
}
async function readSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  fields = ["*"],
  state: state2
}) {
  try {
    return getSystemObject({
      systemName,
      systemObjectType,
      systemObjectId,
      fields,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error reading ${systemObjectType} ${systemObjectId} in system ${systemName}`,
      error
    );
  }
}
async function createSystemObject2({
  systemName,
  systemObjectType,
  systemObjectData,
  state: state2
}) {
  try {
    return createSystemObject({
      systemName,
      systemObjectType,
      systemObjectData,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error creating ${systemObjectType} object in system ${systemName}`,
      error
    );
  }
}
async function updateSystemObject({
  systemName,
  systemObjectType,
  systemObjectId,
  systemObjectData,
  failIfExists = false,
  state: state2
}) {
  try {
    return putSystemObject({
      systemName,
      systemObjectType,
      systemObjectId,
      systemObjectData,
      failIfExists,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error updating ${systemObjectType} ${systemObjectId} in system ${systemName}`,
      error
    );
  }
}
async function updateSystemObjectProperties({
  systemName,
  systemObjectType,
  systemObjectId,
  operations,
  state: state2
}) {
  try {
    return patchSystemObject({
      systemName,
      systemObjectType,
      systemObjectId,
      operations,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error updating ${systemObjectType} ${systemObjectId} properties in system ${systemName}`,
      error
    );
  }
}
async function deleteSystemObject2({
  systemName,
  systemObjectType,
  systemObjectId,
  state: state2
}) {
  try {
    return deleteSystemObject({
      systemName,
      systemObjectType,
      systemObjectId,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error deleting ${systemObjectType} ${systemObjectId} from system ${systemName}`,
      error
    );
  }
}
async function readSystemSchema({
  systemName,
  state: state2
}) {
  try {
    const { objectTypes } = await readConnector({
      connectorId: systemName,
      state: state2
    });
    return objectTypes;
  } catch (error) {
    throw new FrodoError(`Error reading schema of system ${systemName}`, error);
  }
}

// src/ops/IdmConfigOps.ts
var IdmConfigOps_default = (state2) => {
  return {
    async readConfigEntityTypes() {
      return readConfigEntityTypes({ state: state2 });
    },
    async readConfigEntityStubs() {
      return readConfigEntityStubs({ state: state2 });
    },
    async readConfigEntities() {
      return readConfigEntities({ state: state2 });
    },
    async readConfigEntitiesByType(type) {
      return readConfigEntitiesByType({ type, state: state2 });
    },
    async readConfigEntity(entityId) {
      return readConfigEntity({ entityId, state: state2 });
    },
    async exportConfigEntities() {
      return exportConfigEntities({ state: state2 });
    },
    async createConfigEntity(entityId, entityData) {
      return createConfigEntity({ entityId, entityData, state: state2 });
    },
    async updateConfigEntity(entityId, entityData) {
      return updateConfigEntity({ entityId, entityData, state: state2 });
    },
    async importConfigEntities(importData, options = { validate: false }) {
      return importConfigEntities({ importData, options, state: state2 });
    },
    async deleteConfigEntities() {
      return deleteConfigEntities({ state: state2 });
    },
    async deleteConfigEntitiesByType(type) {
      return deleteConfigEntitiesByType({ type, state: state2 });
    },
    async deleteConfigEntity(entityId) {
      return deleteConfigEntity2({ entityId, state: state2 });
    },
    // Deprecated
    async getConfigEntityTypes() {
      return readConfigEntityTypes({ state: state2 });
    },
    async getAllConfigEntities() {
      return readConfigEntityStubs({ state: state2 });
    },
    async getConfigEntitiesByType(type) {
      return readConfigEntitiesByType({ type, state: state2 });
    },
    async getConfigEntity(entityId) {
      return getConfigEntity({ entityId, state: state2 });
    },
    async putConfigEntity(entityId, entityData) {
      return putConfigEntity({ entityId, entityData, state: state2 });
    },
    async testConnectorServers() {
      return testConnectorServers2({ state: state2 });
    }
  };
};
function createConfigEntityExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    config: {}
  };
}
async function readConfigEntityStubs({
  state: state2
}) {
  try {
    const { configurations } = await getConfigStubs({ state: state2 });
    return configurations;
  } catch (error) {
    throw new FrodoError(`Error reading config entity stubs`, error);
  }
}
async function readConfigEntityTypes({
  state: state2
}) {
  try {
    const types = [];
    const stubs = await readConfigEntityStubs({ state: state2 });
    for (const stub of stubs) {
      if (stub._id.split("/").length > 0) {
        const type = stub._id.split("/")[0];
        if (!types.includes(type))
          types.push(type);
      }
    }
    return types;
  } catch (error) {
    throw new FrodoError(`Error reading config entity types`, error);
  }
}
async function readConfigEntities({
  state: state2
}) {
  try {
    const { result } = await getConfigEntities({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading config entities`, error);
  }
}
async function readConfigEntitiesByType({
  type,
  state: state2
}) {
  try {
    const { result } = await getConfigEntitiesByType({ type, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading config entities by type`, error);
  }
}
async function readConfigEntity({
  entityId,
  state: state2
}) {
  try {
    const result = await getConfigEntity({ entityId, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading config entity ${entityId}`, error);
  }
}
var AIC_PROTECTED_ENTITIES = [
  "emailTemplate/frEmailUpdated",
  "emailTemplate/frForgotUsername",
  "emailTemplate/frOnboarding",
  "emailTemplate/frPasswordUpdated",
  "emailTemplate/frProfileUpdated",
  "emailTemplate/frResetPassword",
  "emailTemplate/frUsernameUpdated"
];
var IDM_UNAVAILABLE_ENTITIES = [
  "script",
  "notificationFactory",
  "apiVersion",
  "metrics",
  "repo.init",
  "endpoint/validateQueryFilter",
  "endpoint/oauthproxy",
  "external.rest",
  "scheduler",
  "org.apache.felix.fileinstall/openidm",
  "cluster",
  "endpoint/mappingDetails",
  "fieldPolicy/teammember"
];
async function exportConfigEntities({
  state: state2
}) {
  let indicatorId;
  try {
    const configurations = await readConfigEntities({ state: state2 });
    indicatorId = createProgressIndicator({
      total: configurations.length,
      message: "Exporting config entities...",
      state: state2
    });
    const entityPromises = [];
    for (const configEntity of configurations) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting config entity ${configEntity._id}`,
        state: state2
      });
      entityPromises.push(
        readConfigEntity({ entityId: configEntity._id, state: state2 }).catch(
          (readConfigEntityError) => {
            const error = readConfigEntityError;
            if (
              // operation is not available in ForgeRock Identity Cloud
              !(error.httpStatus === 403 && error.httpMessage === "This operation is not available in ForgeRock Identity Cloud.") && // list of config entities, which do not exist by default or ever.
              !(IDM_UNAVAILABLE_ENTITIES.includes(configEntity._id) && error.httpStatus === 404 && error.httpErrorReason === "Not Found") && // https://bugster.forgerock.org/jira/browse/OPENIDM-18270
              !(error.httpStatus === 404 && error.httpMessage === "No configuration exists for id org.apache.felix.fileinstall/openidm")
            ) {
              printMessage({
                message: readConfigEntityError.response?.data,
                type: "error",
                state: state2
              });
              printMessage({
                message: `Error getting config entity ${configEntity._id}: ${readConfigEntityError}`,
                type: "error",
                state: state2
              });
            }
          }
        )
      );
    }
    const results = await Promise.all(entityPromises);
    const exportData = createConfigEntityExportTemplate({ state: state2 });
    for (const result of results) {
      if (result != null) {
        exportData.config[result._id] = result;
      }
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${configurations.length} config entities.`,
      status: "success",
      state: state2
    });
    return exportData;
  } catch (error) {
    printError(error);
  }
}
async function createConfigEntity({
  entityId,
  entityData,
  state: state2
}) {
  debugMessage({ message: `IdmConfigOps.createConfigEntity: start`, state: state2 });
  try {
    await readConfigEntity({ entityId, state: state2 });
  } catch (error) {
    try {
      const result = await updateConfigEntity({
        entityId,
        entityData,
        state: state2
      });
      debugMessage({ message: `IdmConfigOps.createConfigEntity: end`, state: state2 });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating config entity ${entityId}`, error2);
    }
  }
  throw new FrodoError(`Config entity ${entityId} already exists!`);
}
async function updateConfigEntity({
  entityId,
  entityData,
  state: state2
}) {
  try {
    const result = await putConfigEntity({ entityId, entityData, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error updating config entity ${entityId}`, error);
  }
}
async function importConfigEntities({
  importData,
  options = { validate: false },
  state: state2
}) {
  debugMessage({ message: `IdmConfigOps.importConfigEntities: start`, state: state2 });
  const response = [];
  const errors = [];
  for (const entityId of Object.keys(importData.config)) {
    try {
      debugMessage({
        message: `IdmConfigOps.importConfigEntities: ${entityId}`,
        state: state2
      });
      const entityData = importData.config[entityId];
      if (options.validate && !areScriptHooksValid({ jsonData: entityData, state: state2 })) {
        throw new FrodoError(
          `Invalid script hook in the config object '${entityId}'`
        );
      }
      try {
        const result = await updateConfigEntity({
          entityId,
          entityData,
          state: state2
        });
        response.push(result);
      } catch (error) {
        if (
          // protected entities (e.g. root realm email templates)
          !(state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY && AIC_PROTECTED_ENTITIES.includes(entityId) && error.httpStatus === 403 && error.httpCode === "ERR_BAD_REQUEST")
        ) {
          throw error;
        }
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing config entities`, errors);
  }
  debugMessage({ message: `IdmConfigOps.importConfigEntities: end`, state: state2 });
  return response;
}
async function deleteConfigEntities({
  state: state2
}) {
  debugMessage({
    message: `IdmConfigOps.deleteConfigEntities: start`,
    state: state2
  });
  const result = [];
  const errors = [];
  try {
    const configEntityStubs = await readConfigEntityStubs({ state: state2 });
    for (const configEntityStub of configEntityStubs) {
      try {
        debugMessage({
          message: `IdmConfigOps.deleteConfigEntities: '${configEntityStub["_id"]}'`,
          state: state2
        });
        result.push(
          await deleteConfigEntity({
            entityId: configEntityStub["_id"],
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error deleting config entities`, errors);
  }
  debugMessage({
    message: `IdmConfigOps.deleteConfigEntities: end`,
    state: state2
  });
  return result;
}
async function deleteConfigEntitiesByType({
  type,
  state: state2
}) {
  debugMessage({
    message: `IdmConfigOps.deleteConfigEntitiesByType: start`,
    state: state2
  });
  const result = [];
  const errors = [];
  try {
    const configEntities = await readConfigEntitiesByType({ type, state: state2 });
    for (const configEntity of configEntities) {
      try {
        debugMessage({
          message: `IdmConfigOps.deleteConfigEntitiesByType: '${configEntity["_id"]}'`,
          state: state2
        });
        result.push(
          await deleteConfigEntity({
            entityId: configEntity["_id"],
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting config entities by type`, errors);
    }
    debugMessage({
      message: `IdmConfigOps.deleteConfigEntitiesByType: end`,
      state: state2
    });
    return result;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting config entities by type`, error);
  }
}
async function deleteConfigEntity2({
  entityId,
  state: state2
}) {
  try {
    return deleteConfigEntity({ entityId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting config entity ${entityId}`, error);
  }
}

// src/ops/MappingOps.ts
var MappingOps_default = (state2) => {
  return {
    createMappingExportTemplate() {
      return createMappingExportTemplate({ state: state2 });
    },
    async readSyncMappings() {
      return readSyncMappings({ state: state2 });
    },
    async readMappings(connectorId = void 0, moType2 = void 0) {
      return readMappings({ connectorId, moType: moType2, state: state2 });
    },
    async readMapping(mappingId) {
      return readMapping({ mappingId, state: state2 });
    },
    async createMapping(mappingId, mappingData) {
      return createMapping({
        mappingId,
        mappingData,
        state: state2
      });
    },
    async updateMapping(mappingId, mappingData) {
      return updateMapping({
        mappingId,
        mappingData,
        state: state2
      });
    },
    async updateSyncMappings(mappings) {
      return updateLegacyMappings({
        mappings,
        state: state2
      });
    },
    async deleteMappings(connectorId = void 0, moType2 = void 0) {
      return deleteMappings({ connectorId, moType: moType2, state: state2 });
    },
    async deleteMapping(mappingId) {
      return deleteMapping({ mappingId, state: state2 });
    },
    async exportMapping(mappingId) {
      return exportMapping({ mappingId, state: state2 });
    },
    async exportMappings() {
      return exportMappings({ state: state2 });
    },
    async importMapping(mappingId, importData, options) {
      return importMapping({ mappingId, importData, options, state: state2 });
    },
    async importFirstMapping(importData, options) {
      return importFirstMapping({ importData, options, state: state2 });
    },
    async importMappings(importData, options) {
      return importMappings({ importData, options, state: state2 });
    }
  };
};
function createMappingExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    mapping: {}
  };
}
async function readSyncMappings({
  state: state2
}) {
  try {
    debugMessage({
      message: `MappingOps.readLegacyMappings: start`,
      state: state2
    });
    const sync = await readConfigEntity({
      entityId: "sync",
      state: state2
    });
    const mappings = sync.mappings.map((it) => {
      it._id = `sync/${it.name}`;
      return it;
    });
    debugMessage({
      message: `MappingOps.readLegacyMappings: end`,
      state: state2
    });
    return mappings;
  } catch (error) {
    throw new FrodoError(`Error reading sync mappings`, error);
  }
}
async function readMappings({
  connectorId,
  moType: moType2,
  state: state2
}) {
  try {
    debugMessage({
      message: `MappingOps.readMappings: start [connectorId=${connectorId ? connectorId : "all"}, moType=${moType2 ? moType2 : "all"}]`,
      state: state2
    });
    let mappings = await readConfigEntitiesByType({
      type: "mapping",
      state: state2
    });
    const legacyMappings = await readSyncMappings({ state: state2 });
    mappings = mappings.concat(legacyMappings);
    if (connectorId)
      mappings = mappings.filter(
        (mapping) => mapping.source.startsWith(`system/${connectorId}/`) || mapping.target.startsWith(`system/${connectorId}/`)
      );
    if (moType2)
      mappings = mappings.filter(
        (mapping) => mapping.source === `managed/${moType2}` || mapping.target === `managed/${moType2}`
      );
    debugMessage({
      message: `MappingOps.readMappings: end`,
      state: state2
    });
    return mappings;
  } catch (error) {
    throw new FrodoError(`Error reading mappings`, error);
  }
}
async function readMapping({
  mappingId,
  state: state2
}) {
  if (mappingId.startsWith("sync/")) {
    const mappings = await readSyncMappings({ state: state2 });
    for (const mapping of mappings) {
      if (mapping._id === mappingId)
        return mapping;
    }
    throw new FrodoError(`Mapping '${mappingId}' not found!`);
  } else if (mappingId.startsWith("mapping/")) {
    const mapping = await readConfigEntity({
      entityId: mappingId,
      state: state2
    });
    return mapping;
  } else {
    throw new FrodoError(
      `Invalid mapping id ${mappingId}. Must start with 'sync/' or 'mapping/'`
    );
  }
}
async function createMapping({
  mappingId,
  mappingData,
  state: state2
}) {
  debugMessage({
    message: `MappingOps.createMapping: start`,
    state: state2
  });
  try {
    await readMapping({
      mappingId,
      state: state2
    });
  } catch (error) {
    try {
      const result = await updateMapping({
        mappingId,
        mappingData,
        state: state2
      });
      debugMessage({
        message: `MappingOps.createMapping: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating mapping ${mappingId}`, error2);
    }
  }
  throw new FrodoError(`Mapping ${mappingId} already exists!`);
}
async function updateMapping({
  mappingId,
  mappingData,
  state: state2
}) {
  if (mappingId.startsWith("sync/")) {
    try {
      let mappings = await readMappings({ state: state2 });
      mappings = mappings.map((mapping) => {
        if (mappingId == mapping._id) {
          return mappingData;
        }
        return mapping;
      });
      const sync = await putConfigEntity({
        entityId: "sync",
        entityData: { mappings },
        state: state2
      });
      for (const mapping of sync.mappings.map((it) => {
        it._id = `sync/${it.name}`;
        return it;
      })) {
        if (mapping._id === mappingId)
          return mapping;
      }
    } catch (error) {
      throw new FrodoError(`Error updating sync mapping ${mappingId}`, error);
    }
    throw new FrodoError(
      `Mapping ${mappingId} not found after successful update!`
    );
  } else if (mappingId.startsWith("mapping/")) {
    try {
      const mapping = await putConfigEntity({
        entityId: mappingId,
        entityData: mappingData,
        state: state2
      });
      return mapping;
    } catch (error) {
      throw new FrodoError(`Error updating mapping ${mappingId}`, error);
    }
  } else {
    throw new FrodoError(
      `Invalid mapping id ${mappingId}. Must start with 'sync/' or 'mapping/'`
    );
  }
}
async function updateLegacyMappings({
  mappings,
  state: state2
}) {
  try {
    const sync = await putConfigEntity({
      entityId: "sync",
      entityData: { mappings },
      state: state2
    });
    return sync.mappings;
  } catch (error) {
    throw new FrodoError(`Error updating legacy mappings`, error);
  }
}
async function deleteMappings({
  connectorId,
  moType: moType2,
  state: state2
}) {
  try {
    debugMessage({ message: `MappingOps.deleteMappings: start`, state: state2 });
    const mappings = await readMappings({ state: state2 });
    const deletedMappings = [];
    if (!connectorId && !moType2) {
      await updateLegacyMappings({
        mappings: [],
        state: state2
      });
      for (const mapping of mappings.filter(
        (it) => it._id.startsWith("sync/")
      )) {
        deletedMappings.push(mapping);
      }
      for (const mapping of mappings.filter(
        (it) => it._id.startsWith("mapping/")
      )) {
        deletedMappings.push(
          await deleteMapping({ mappingId: mapping._id, state: state2 })
        );
      }
      return deletedMappings;
    } else {
      let mappingsToDelete = [];
      if (connectorId) {
        debugMessage({
          message: `MappingOps.deleteMappings: select mappings for connector ${connectorId}`,
          state: state2
        });
        mappingsToDelete = mappings.filter(
          (mapping) => mapping.source.startsWith(`system/${connectorId}/`) || mapping.target.startsWith(`system/${connectorId}/`)
        );
      }
      if (moType2) {
        debugMessage({
          message: `MappingOps.deleteMappings: select mappings for managed object type ${moType2}`,
          state: state2
        });
        mappingsToDelete = mappingsToDelete.filter(
          (mapping) => mapping.source === `managed/${moType2}` || mapping.target === `managed/${moType2}`
        );
      }
      const legacyMappingIdsToDelete = mappingsToDelete.filter((it) => it._id.startsWith("sync/")).map((it) => it._id);
      debugMessage({
        message: `MappingOps.deleteMappings: selected ${mappingsToDelete.length} mappings: ${legacyMappingIdsToDelete.join(", ")}`,
        state: state2
      });
      const updatedLegacyMappings = mappings.filter(
        (mapping) => !legacyMappingIdsToDelete.includes(mapping._id)
      );
      debugMessage({
        message: `MappingOps.deleteMappings: ${updatedLegacyMappings.length} remaining mappings: ${updatedLegacyMappings.map((mapping) => mapping._id).join(", ")}`,
        state: state2
      });
      const finalMappings = await updateLegacyMappings({
        mappings: updatedLegacyMappings,
        state: state2
      });
      for (const mapping of mappings.filter(
        (it) => it._id.startsWith("sync/")
      )) {
        deletedMappings.push(mapping);
      }
      debugMessage({
        message: `MappingOps.deleteMappings: ${finalMappings.length} mappings after update: ${finalMappings.map((mapping) => mapping._id).join(", ")}`,
        state: state2
      });
      const undeletedMappings = finalMappings.filter(
        (mapping) => legacyMappingIdsToDelete.includes(mapping._id)
      );
      for (const mapping of mappings.filter(
        (it) => it._id.startsWith("mapping/")
      )) {
        deletedMappings.push(
          await deleteMapping({ mappingId: mapping._id, state: state2 })
        );
      }
      if (undeletedMappings.length > 0) {
        const message = `${undeletedMappings.length} mappings were not deleted from sync.json: ${undeletedMappings.map((mapping) => mapping._id).join(", ")}`;
        debugMessage({
          message,
          state: state2
        });
        throw new FrodoError(message);
      }
      debugMessage({
        message: `MappingOps.deleteMappings: deleted ${mappingsToDelete.length} mappings: ${legacyMappingIdsToDelete.join(", ")}`,
        state: state2
      });
      debugMessage({ message: `MappingOps.deleteMappings: end`, state: state2 });
      return deletedMappings;
    }
  } catch (error) {
    throw new FrodoError(`Error deleting mappings`, error);
  }
}
async function deleteMapping({
  mappingId,
  state: state2
}) {
  try {
    debugMessage({ message: `MappingOps.deleteMapping: start`, state: state2 });
    if (mappingId.startsWith("sync/")) {
      const mappings = await readMappings({ state: state2 });
      const mappingsToDelete = mappings.filter(
        (mapping) => mapping._id === mappingId
      );
      if (mappingsToDelete.length !== 1) {
        const message = `Mapping ${mappingId} not found in sync.json or multiple mappings found!`;
        debugMessage({
          message: `MappingOps.deleteMapping: ${message}`,
          state: state2
        });
        throw new FrodoError(message);
      }
      const updatedMappings = mappings.filter(
        (mapping) => mapping._id !== mappingId
      );
      debugMessage({
        message: `MappingOps.deleteMapping: ${updatedMappings.length} remaining mappings in sync.json: ${updatedMappings.map((mapping) => mapping._id).join(", ")}`,
        state: state2
      });
      const finalMappings = await updateLegacyMappings({
        mappings: updatedMappings,
        state: state2
      });
      debugMessage({
        message: `MappingOps.deleteMapping: ${finalMappings.length} mappings in sync.json after update: ${finalMappings.map((mapping) => mapping._id).join(", ")}`,
        state: state2
      });
      const undeletedMappings = finalMappings.filter(
        (mapping) => mappingId == mapping._id
      );
      if (undeletedMappings.length > 0) {
        const message = `Mapping ${undeletedMappings[0]} was not deleted from sync.json after successful update.`;
        debugMessage({
          message,
          state: state2
        });
        throw new FrodoError(message);
      }
      debugMessage({
        message: `MappingOps.deleteMapping: deleted legacy mapping ${mappingId} from sync.json.`,
        state: state2
      });
      debugMessage({ message: `MappingOps.deleteMapping: end`, state: state2 });
      return mappingsToDelete[0];
    } else if (mappingId.startsWith("mapping/")) {
      const mapping = await deleteConfigEntity2({
        entityId: mappingId,
        state: state2
      });
      debugMessage({ message: `MappingOps.deleteMapping: end`, state: state2 });
      return mapping;
    } else {
      throw new FrodoError(
        `Invalid mapping id ${mappingId}. Must start with 'sync/' or 'mapping/'`
      );
    }
  } catch (error) {
    throw new FrodoError(`Error deleting mapping ${mappingId}`, error);
  }
}
async function exportMapping({
  mappingId,
  state: state2
}) {
  try {
    debugMessage({ message: `MappingOps.exportMapping: start`, state: state2 });
    const mappingData = await readMapping({ mappingId, state: state2 });
    const exportData = createMappingExportTemplate({ state: state2 });
    exportData.mapping[mappingData._id] = mappingData;
    debugMessage({ message: `MappingOps.exportMapping: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting mappings`, error);
  }
}
async function exportMappings({
  state: state2
}) {
  let indicatorId;
  try {
    const exportData = createMappingExportTemplate({ state: state2 });
    const allMappingsData = await readMappings({ state: state2 });
    indicatorId = createProgressIndicator({
      total: allMappingsData.length,
      message: "Exporting mappings",
      state: state2
    });
    for (const mappingData of allMappingsData) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting mapping ${mappingData._id}`,
        state: state2
      });
      exportData.mapping[mappingData._id] = mappingData;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `${allMappingsData.length} mappings exported.`,
      state: state2
    });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting mappings`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting mappings`, error);
  }
}
async function importMapping({
  mappingId,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const key of Object.keys(importData.mapping)) {
    if (key === mappingId) {
      try {
        if (options.deps) {
        }
        response = await updateMapping({
          mappingId,
          mappingData: importData.mapping[mappingId],
          state: state2
        });
        imported.push(key);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing mapping ${mappingId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`Mapping ${mappingId} not found in import data`);
  }
  return response;
}
async function importFirstMapping({
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const key of Object.keys(importData.mapping)) {
    try {
      if (options.deps) {
      }
      response = await updateMapping({
        mappingId: key,
        mappingData: importData.mapping[key],
        state: state2
      });
      imported.push(key);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first mapping`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No mappings found in import data!`);
  }
  return response;
}
async function importMappings({
  importData,
  options = { deps: true },
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const key of Object.keys(importData.mapping)) {
    try {
      if (options.deps) {
      }
      response.push(
        await updateMapping({
          mappingId: key,
          mappingData: importData.mapping[key],
          state: state2
        })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing mappings`, errors);
  }
  return response;
}

// src/ops/ConnectorOps.ts
var ConnectorOps_default = (state2) => {
  return {
    CONNECTOR_TYPE,
    createConnectorExportTemplate() {
      return createConnectorExportTemplate({ state: state2 });
    },
    async readConnectors() {
      return readConnectors({ state: state2 });
    },
    async readConnector(connectorId) {
      return readConnector({ connectorId, state: state2 });
    },
    async createConnector(connectorId, connectorData) {
      return createConnector({
        connectorId,
        connectorData,
        state: state2
      });
    },
    async updateConnector(connectorId, connectorData) {
      return updateConnector({
        connectorId,
        connectorData,
        state: state2
      });
    },
    async deleteConnectors() {
      return deleteConnectors({ state: state2 });
    },
    async deleteConnector(connectorId) {
      return deleteConnector({ connectorId, state: state2 });
    },
    async exportConnector(connectorId, options = { deps: true, useStringArrays: true }) {
      return exportConnector({ connectorId, options, state: state2 });
    },
    async exportConnectors() {
      return exportConnectors({ state: state2 });
    },
    async importConnector(connectorId, importData, options) {
      return importConnector({ connectorId, importData, options, state: state2 });
    },
    async importFirstConnector(importData, options) {
      return importFirstConnector({ importData, options, state: state2 });
    },
    async importConnectors(importData, options) {
      return importConnectors({ importData, options, state: state2 });
    }
  };
};
var CONNECTOR_TYPE = "provisioner.openicf";
function createConnectorExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    connector: {},
    mapping: {}
  };
}
async function readConnectors({
  state: state2
}) {
  try {
    const connectors = await readConfigEntitiesByType({
      type: CONNECTOR_TYPE,
      state: state2
    });
    return connectors;
  } catch (error) {
    throw new FrodoError(`Error reading connectors`, error);
  }
}
async function readConnector({
  connectorId,
  state: state2
}) {
  try {
    debugMessage({
      message: `ConnectorOps.readConnector: start [connector=${connectorId}]`,
      state: state2
    });
    const entityId = `${CONNECTOR_TYPE}/${connectorId}`;
    debugMessage({
      message: `ConnectorOps.readConnector: use entity id: ${entityId}`,
      state: state2
    });
    const connectorData = await getConfigEntity({
      entityId,
      state: state2
    });
    debugMessage({
      message: `ConnectorOps.readConnector: end [connector=${connectorId}]`,
      state: state2
    });
    return connectorData;
  } catch (error) {
    throw new FrodoError(`Error reading connector ${connectorId}`, error);
  }
}
async function createConnector({
  connectorId,
  connectorData,
  state: state2
}) {
  debugMessage({
    message: `ConnectorOps.createConnector: start`,
    state: state2
  });
  try {
    await readConnector({
      connectorId,
      state: state2
    });
  } catch (error) {
    try {
      const result = await putConfigEntity({
        entityId: `${CONNECTOR_TYPE}/${connectorId}`,
        entityData: connectorData,
        state: state2
      });
      debugMessage({
        message: `ConnectorOps.createConnector: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating connector ${connectorId}`, error2);
    }
  }
  throw new Error(`Connector ${connectorId} already exists!`);
}
async function updateConnector({
  connectorId,
  connectorData,
  state: state2
}) {
  try {
    return putConfigEntity({
      entityId: `${CONNECTOR_TYPE}/${connectorId}`,
      entityData: connectorData,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error updating connector ${connectorId}`, error);
  }
}
async function deleteConnectors({
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `ConnectorOps.deleteConnectors: start`,
      state: state2
    });
    const result = [];
    const connectors = await readConnectors({ state: state2 });
    for (const connector of connectors) {
      try {
        debugMessage({
          message: `ConnectorOps.deleteConnectors: '${connector["_id"]}'`,
          state: state2
        });
        result.push(
          await deleteConfigEntity({
            entityId: connector["_id"],
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting connectors`, errors);
    }
    debugMessage({
      message: `ConnectorOps.deleteConnectors: end`,
      state: state2
    });
    return result;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting connectors`, error);
  }
}
async function deleteConnector({
  connectorId,
  state: state2
}) {
  try {
    return deleteConfigEntity({
      entityId: `${CONNECTOR_TYPE}/${connectorId}`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error deleting connector ${connectorId}`, error);
  }
}
async function exportConnector({
  connectorId,
  options = { deps: true, useStringArrays: true },
  state: state2
}) {
  try {
    debugMessage({
      message: `ConnectorOps.exportConnector: start [connector=${connectorId}]`,
      state: state2
    });
    const connectorData = await readConnector({ connectorId, state: state2 });
    const exportData = createConnectorExportTemplate({ state: state2 });
    exportData.connector[connectorId] = connectorData;
    if (options.deps) {
      const mappings = await readMappings({ connectorId, state: state2 });
      for (const mapping of mappings) {
        exportData.mapping[mapping.name] = mapping;
      }
    }
    debugMessage({ message: `ConnectorOps.exportConnector: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting connector ${connectorId}`, error);
  }
}
async function exportConnectors({
  state: state2
}) {
  try {
    const exportData = createConnectorExportTemplate({ state: state2 });
    const allConnectorsData = await readConnectors({ state: state2 });
    const indicatorId = createProgressIndicator({
      total: allConnectorsData.length,
      message: "Exporting connectors",
      state: state2
    });
    for (const connectorData of allConnectorsData) {
      const connectorId = connectorData._id.split("/")[1];
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting connector ${connectorId}`,
        state: state2
      });
      exportData.connector[connectorId] = connectorData;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `${allConnectorsData.length} connectors exported.`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting connectors`, error);
  }
}
async function importConnector({
  connectorId,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const key of Object.keys(importData.connector)) {
    if (key === connectorId) {
      try {
        if (options.deps) {
        }
        response = await updateConnector({
          connectorId,
          connectorData: importData.connector[connectorId],
          state: state2
        });
        imported.push(key);
      } catch (error) {
        errors.push(error);
      }
      break;
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing connector ${connectorId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`Connector ${connectorId} not found in import data!`);
  }
  return response;
}
async function importFirstConnector({
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const key of Object.keys(importData.connector)) {
    try {
      if (options.deps) {
      }
      response = await updateConnector({
        connectorId: key,
        connectorData: importData.connector[key],
        state: state2
      });
      imported.push(key);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first connector`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No connectors not found in import data!`);
  }
  return response;
}
async function importConnectors({
  importData,
  options = { deps: true },
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const key of Object.keys(importData.connector)) {
    try {
      if (options.deps) {
      }
      response.push(
        await updateConnector({
          connectorId: key,
          connectorData: importData.connector[key],
          state: state2
        })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing connectors`, errors);
  }
  return response;
}

// src/ops/ManagedObjectOps.ts
var ManagedObjectOps_default = (state2) => {
  return {
    async createManagedObject(type, moData, id2 = void 0) {
      return createManagedObject2({ type, id: id2, moData, state: state2 });
    },
    async readManagedObject(type, id2, fields) {
      return readManagedObject({ type, id: id2, fields, state: state2 });
    },
    async readManagedObjects(type, fields) {
      return readManagedObjects({ type, fields, state: state2 });
    },
    async updateManagedObject(type, id2, moData) {
      return updateManagedObject({ type, id: id2, moData, state: state2 });
    },
    async updateManagedObjectProperties(type, id2, operations, rev) {
      return updateManagedObjectProperties({
        type,
        id: id2,
        operations,
        rev,
        state: state2
      });
    },
    async updateManagedObjectsProperties(type, filter, operations, rev, pageSize = DEFAULT_PAGE_SIZE) {
      return updateManagedObjectsProperties({
        type,
        filter,
        operations,
        rev,
        pageSize,
        state: state2
      });
    },
    async deleteManagedObject(type, id2) {
      return deleteManagedObject2({ type, id: id2, state: state2 });
    },
    async deleteManagedObjects(type, filter) {
      return deleteManagedObjects({ type, filter, state: state2 });
    },
    async queryManagedObjects(type, filter = void 0, fields = [], pageSize = DEFAULT_PAGE_SIZE) {
      return queryManagedObjects2({ type, filter, fields, pageSize, state: state2 });
    },
    async resolveUserName(type, id2) {
      return resolveUserName({ type, id: id2, state: state2 });
    },
    async resolveFullName(type, id2) {
      return resolveFullName({ type, id: id2, state: state2 });
    },
    async resolvePerpetratorUuid(id2) {
      return resolvePerpetratorUuid({ id: id2, state: state2 });
    }
  };
};
async function createManagedObject2({
  type,
  id: id2,
  moData,
  state: state2
}) {
  try {
    if (id2)
      return putManagedObject({ type, id: id2, moData, failIfExists: true, state: state2 });
    return createManagedObject({ moType: type, moData, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error creating managed ${type} object${id2 ? " (" + id2 + ")" : ""}`,
      error
    );
  }
}
async function readManagedObject({
  type,
  id: id2,
  fields,
  state: state2
}) {
  try {
    return getManagedObject({ type, id: id2, fields, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading managed ${type} object`, error);
  }
}
async function readManagedObjects({
  type,
  fields,
  state: state2
}) {
  try {
    let managedObjects = [];
    let result = {
      result: [],
      resultCount: 0,
      pagedResultsCookie: null,
      totalPagedResultsPolicy: "NONE",
      totalPagedResults: -1,
      remainingPagedResults: -1
    };
    do {
      result = await queryAllManagedObjectsByType({
        type,
        fields,
        pageCookie: result.pagedResultsCookie,
        state: state2
      });
      managedObjects = managedObjects.concat(result.result);
    } while (result.pagedResultsCookie);
    return managedObjects;
  } catch (error) {
    throw new FrodoError(`Error reading managed ${type} objects`, error);
  }
}
async function updateManagedObject({
  type,
  id: id2,
  moData,
  state: state2
}) {
  try {
    return putManagedObject({ type, id: id2, moData, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error updating managed ${type} object (${id2})`,
      error
    );
  }
}
async function updateManagedObjectProperties({
  type,
  id: id2,
  operations,
  rev = null,
  state: state2
}) {
  try {
    return patchManagedObject({ type, id: id2, operations, rev, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error updating managed ${type} object properties (${id2})`,
      error
    );
  }
}
async function updateManagedObjectsProperties({
  type,
  filter,
  operations,
  rev = null,
  pageSize = DEFAULT_PAGE_SIZE,
  state: state2
}) {
  const result = [];
  const errors = [];
  let page = {
    result: [],
    resultCount: 0,
    pagedResultsCookie: null,
    totalPagedResultsPolicy: "NONE",
    totalPagedResults: -1,
    remainingPagedResults: -1
  };
  do {
    try {
      page = await queryManagedObjects({
        type,
        filter,
        fields: [],
        pageSize,
        pageCookie: page.pagedResultsCookie,
        state: state2
      });
      for (const obj of page.result) {
        try {
          result.push(
            await patchManagedObject({
              type,
              id: obj._id,
              operations,
              rev,
              state: state2
            })
          );
        } catch (error) {
          errors.push(error);
        }
      }
    } catch (error) {
      errors.push(error);
    }
  } while (page.pagedResultsCookie);
  if (errors.length > 0) {
    throw new FrodoError(
      `Error patching "${type}" objects matching filter "${filter}"`,
      errors
    );
  }
  return result;
}
async function deleteManagedObject2({
  type,
  id: id2,
  state: state2
}) {
  try {
    return deleteManagedObject({ type, id: id2, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error deleting managed ${type} object (${id2})`,
      error
    );
  }
}
async function deleteManagedObjects({
  type,
  filter,
  state: state2
}) {
  let count = 0;
  const errors = [];
  let result = {
    result: [],
    resultCount: 0,
    pagedResultsCookie: null,
    totalPagedResultsPolicy: "NONE",
    totalPagedResults: -1,
    remainingPagedResults: -1
  };
  do {
    try {
      result = await queryManagedObjects({
        type,
        filter,
        fields: ["_id"],
        pageCookie: result.pagedResultsCookie,
        state: state2
      });
      for (const obj of result.result) {
        await deleteManagedObject2({ type, id: obj._id, state: state2 });
        count++;
      }
    } catch (error) {
      errors.push(error);
    }
  } while (result.pagedResultsCookie);
  if (errors.length > 0) {
    throw new FrodoError(
      `Error deleting "${type}" objects matching filter "${filter}". Successfully deleted ${count} objects.`,
      errors
    );
  }
  return count;
}
async function queryManagedObjects2({
  type,
  filter = "true",
  fields = ["*"],
  pageSize = DEFAULT_PAGE_SIZE,
  state: state2
}) {
  const result = [];
  const errors = [];
  let page = {
    result: [],
    resultCount: 0,
    pagedResultsCookie: null,
    totalPagedResultsPolicy: "NONE",
    totalPagedResults: -1,
    remainingPagedResults: -1
  };
  do {
    try {
      page = await queryManagedObjects({
        type,
        filter,
        fields,
        pageSize,
        pageCookie: page.pagedResultsCookie,
        state: state2
      });
      result.push(...page.result);
    } catch (error) {
      errors.push(error);
    }
  } while (page.pagedResultsCookie);
  if (errors.length > 0) {
    throw new FrodoError(
      `Error querying "${type}" objects matching filter "${filter}"`,
      errors
    );
  }
  return result;
}
async function resolveUserName({
  type,
  id: id2,
  state: state2
}) {
  try {
    return (await getManagedObject({
      type,
      id: id2,
      fields: ["userName"],
      state: state2
    })).userName;
  } catch (error) {
  }
  return id2;
}
async function resolveFullName({
  type,
  id: id2,
  state: state2
}) {
  try {
    const managedObject = await getManagedObject({
      type,
      id: id2,
      fields: ["givenName", "sn"],
      state: state2
    });
    return `${managedObject.givenName} ${managedObject.sn}`;
  } catch (error) {
  }
  return id2;
}
async function resolvePerpetratorUuid({
  id: id2,
  state: state2
}) {
  try {
    if (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY) {
      const lookupPromises = [];
      lookupPromises.push(
        getManagedObject({
          type: "teammember",
          id: id2,
          fields: ["givenName", "sn", "userName"],
          state: state2
        })
      );
      lookupPromises.push(
        getManagedObject({
          type: "svcacct",
          id: id2,
          fields: ["name", "description"],
          state: state2
        })
      );
      lookupPromises.push(
        getManagedObject({
          type: "alpha_user",
          id: id2,
          fields: ["givenName", "sn", "userName"],
          state: state2
        })
      );
      lookupPromises.push(
        getManagedObject({
          type: "bravo_user",
          id: id2,
          fields: ["givenName", "sn", "userName"],
          state: state2
        })
      );
      const lookupResults = await Promise.allSettled(lookupPromises);
      if (lookupResults[0].status === "fulfilled") {
        const admin = lookupResults[0].value;
        return `Admin user: ${admin.givenName} ${admin.sn} (${admin.userName})`;
      }
      if (lookupResults[1].status === "fulfilled") {
        const sa = lookupResults[1].value;
        return `Service account: ${sa.name} (${sa.description})`;
      }
      if (lookupResults[2].status === "fulfilled") {
        const user = lookupResults[2].value;
        return `Alpha user: ${user.givenName} ${user.sn} (${user.userName})`;
      }
      if (lookupResults[3].status === "fulfilled") {
        const user = lookupResults[3].value;
        return `Bravo user:${user.givenName} ${user.sn} (${user.userName})`;
      }
    } else {
      const user = await getManagedObject({
        type: "user",
        id: id2,
        fields: ["givenName", "sn", "userName"],
        state: state2
      });
      return `${user.givenName} ${user.sn} (${user.userName})`;
    }
  } catch (error) {
  }
  return id2;
}

// src/ops/ApplicationOps.ts
var defaultFields = [
  "authoritative",
  "connectorId",
  "description",
  "icon",
  "mappingNames",
  "name",
  "ssoEntities",
  "templateName",
  "templateVersion",
  "uiConfig",
  "url"
];
var ApplicationOps_default = (state2) => {
  return {
    createApplicationExportTemplate() {
      return createApplicationExportTemplate({ state: state2 });
    },
    getRealmManagedApplication() {
      return getRealmManagedApplication({ state: state2 });
    },
    async createApplication(applicationId, applicationData) {
      return createApplication({
        applicationId,
        applicationData,
        state: state2
      });
    },
    async readApplication(applicationId, fields = defaultFields) {
      return readApplication({ applicationId, fields, state: state2 });
    },
    async readApplicationByName(applicationName, fields = defaultFields) {
      return readApplicationByName({ applicationName, fields, state: state2 });
    },
    async readApplications() {
      return readApplications({ state: state2 });
    },
    async updateApplication(applicationId, moData) {
      return updateApplication({
        applicationId,
        applicationData: moData,
        state: state2
      });
    },
    async deleteApplication(applicationId, deep = true) {
      return deleteApplication({ applicationId, options: { deep }, state: state2 });
    },
    async deleteApplicationByName(applicationName, deep = true) {
      return deleteApplicationByName({
        applicationName,
        options: { deep },
        state: state2
      });
    },
    async deleteApplications(deep = true) {
      return deleteApplications({ options: { deep }, state: state2 });
    },
    async queryApplications(filter, fields = defaultFields) {
      return queryApplications({ filter, fields, state: state2 });
    },
    async exportApplication(applicationId, options) {
      return exportApplication({ applicationId, options, state: state2 });
    },
    async exportApplicationByName(applicationName, options) {
      return exportApplicationByName({ applicationName, options, state: state2 });
    },
    async exportApplications(options = { deps: true, useStringArrays: true }) {
      return exportApplications({ options, state: state2 });
    },
    async importApplication(applicationId, importData, options) {
      return importApplication({ applicationId, importData, options, state: state2 });
    },
    async importApplicationByName(applicationName, importData, options) {
      return importApplicationByName({
        applicationName,
        importData,
        options,
        state: state2
      });
    },
    async importFirstApplication(importData, options) {
      return importApplications({ importData, options, state: state2 });
    },
    async importApplications(importData, options) {
      return importApplications({ importData, options, state: state2 });
    }
  };
};
function createApplicationExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    managedApplication: {},
    application: {}
  };
}
function getRealmManagedApplication({ state: state2 }) {
  let realmManagedOrg = "application";
  if (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY) {
    realmManagedOrg = `${state2.getRealm()}_application`;
  }
  return realmManagedOrg;
}
async function createApplication({
  applicationId,
  applicationData,
  state: state2
}) {
  try {
    const application = await createManagedObject2({
      type: getRealmManagedApplication({ state: state2 }),
      id: applicationId,
      moData: applicationData,
      state: state2
    });
    return application;
  } catch (error) {
    throw new FrodoError(`Error creating application ${applicationId}`, error);
  }
}
async function readApplication({
  applicationId,
  fields = defaultFields,
  state: state2
}) {
  try {
    const application = await readManagedObject({
      type: getRealmManagedApplication({ state: state2 }),
      id: applicationId,
      fields,
      state: state2
    });
    return application;
  } catch (error) {
    throw new FrodoError(`Error reading application ${applicationId}`, error);
  }
}
async function readApplicationByName({
  applicationName,
  fields = defaultFields,
  state: state2
}) {
  try {
    const applications = await queryApplications({
      filter: `name eq '${applicationName}'`,
      fields,
      state: state2
    });
    switch (applications.length) {
      case 1:
        return applications[0];
      case 0:
        throw new Error(`Application '${applicationName}' not found`);
      default:
        throw new Error(
          `${applications.length} applications '${applicationName}' found`
        );
    }
  } catch (error) {
    throw new FrodoError(`Error reading application ${applicationName}`, error);
  }
}
async function readApplications({
  fields = defaultFields,
  state: state2
}) {
  try {
    const applications = await readManagedObjects({
      type: getRealmManagedApplication({ state: state2 }),
      fields,
      state: state2
    });
    return applications;
  } catch (error) {
    throw new FrodoError(`Error reading applications`, error);
  }
}
async function updateApplication({
  applicationId,
  applicationData,
  state: state2
}) {
  try {
    const application = await updateManagedObject({
      type: getRealmManagedApplication({ state: state2 }),
      id: applicationId,
      moData: applicationData,
      state: state2
    });
    return application;
  } catch (error) {
    throw new FrodoError(`Error updating application ${applicationId}`, error);
  }
}
function isOidcApplication(applicationData) {
  return get(applicationData, ["ssoEntities", "oidcId"]) ? true : false;
}
function getOAuth2ClientId(applicationData) {
  return get(applicationData, ["ssoEntities", "oidcId"]);
}
function isSaml2Application(applicationData) {
  return get(applicationData, ["ssoEntities", "idpPrivateId"]) ? true : false;
}
function getSaml2IdpEntityId(applicationData) {
  return decode(get(applicationData, ["ssoEntities", "idpPrivateId"]));
}
function getSaml2SpEntityId(applicationData) {
  return decode(get(applicationData, ["ssoEntities", "spPrivateId"]));
}
function isProvisioningApplication(applicationData) {
  return get(applicationData, ["connectorId"]) ? true : false;
}
function getConnectorId(applicationData) {
  return get(applicationData, ["connectorId"]);
}
async function exportDependencies2({
  applicationData,
  options,
  exportData,
  state: state2
}) {
  try {
    debugMessage({
      message: `ApplicationOps.exportDependencies: start [application=${applicationData["name"]}]`,
      state: state2
    });
    if (isOidcApplication(applicationData)) {
      const clientId = getOAuth2ClientId(applicationData);
      const clientData = await exportOAuth2Client({
        clientId,
        options: {
          deps: options.deps,
          useStringArrays: options.useStringArrays
        },
        state: state2
      });
      exportData = mergeDeep(exportData, clientData);
    }
    if (isSaml2Application(applicationData)) {
      const saml2IdpId = getSaml2IdpEntityId(applicationData);
      if (saml2IdpId) {
        const saml2IdpData = await exportSaml2Provider({
          entityId: saml2IdpId,
          state: state2
        });
        exportData = mergeDeep(exportData, saml2IdpData);
      }
      const saml2SpId = getSaml2SpEntityId(applicationData);
      if (saml2SpId) {
        const saml2SpData = await exportSaml2Provider({
          entityId: saml2SpId,
          state: state2
        });
        exportData = mergeDeep(exportData, saml2SpData);
      }
      const cotData = await exportCirclesOfTrust({
        entityProviders: [saml2IdpId, saml2SpId],
        options: { indicateProgress: false },
        state: state2
      });
      exportData = mergeDeep(exportData, cotData);
    }
    if (isProvisioningApplication(applicationData)) {
      const connectorId = getConnectorId(applicationData);
      if (connectorId) {
        debugMessage({
          message: `ApplicationOps.exportDependencies: application=${applicationData["name"]}, connector=${connectorId}`,
          state: state2
        });
        const connectorData = await exportConnector({
          connectorId,
          options: { deps: true, useStringArrays: true },
          state: state2
        });
        exportData = mergeDeep(exportData, connectorData);
      }
    }
    debugMessage({
      message: `ApplicationOps.exportDependencies: end`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error exporting dependencies`, error);
  }
}
async function importDependencies2({
  applicationData,
  importData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `ApplicationOps.importDependencies: start [application=${applicationData["name"]}]`,
      state: state2
    });
    if (isOidcApplication(applicationData)) {
      const clientId = getOAuth2ClientId(applicationData);
      try {
        await importOAuth2Client({
          clientId,
          importData,
          options: { deps: true },
          state: state2
        });
      } catch (error) {
        errors.push(error);
      }
    }
    if (isSaml2Application(applicationData)) {
      const saml2IdpId = getSaml2IdpEntityId(applicationData);
      if (saml2IdpId) {
        try {
          await importSaml2Provider({
            entityId: saml2IdpId,
            importData,
            options: { deps: true },
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      const saml2SpId = getSaml2SpEntityId(applicationData);
      if (saml2SpId) {
        try {
          await importSaml2Provider({
            entityId: saml2SpId,
            importData,
            options: { deps: true },
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        await importCirclesOfTrust({
          entityProviders: [saml2IdpId, saml2SpId],
          importData,
          state: state2
        });
      } catch (error) {
        errors.push(error);
      }
    }
    if (isProvisioningApplication(applicationData)) {
      const connectorId = getConnectorId(applicationData);
      if (connectorId) {
        try {
          await importConnector({
            connectorId,
            importData,
            options: { deps: true },
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length) {
      throw new FrodoError(`Error importing dependencies`, errors);
    }
    debugMessage({
      message: `ApplicationOps.importDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing dependencies`, error);
  }
}
async function deleteDependencies({
  applicationData,
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `ApplicationOps.deleteDependencies: start [application=${applicationData["name"]}]`,
      state: state2
    });
    if (isOidcApplication(applicationData)) {
      const clientId = getOAuth2ClientId(applicationData);
      if (clientId) {
        try {
          await deleteOAuth2Client2({
            clientId,
            state: state2
          });
          debugMessage({
            message: `ApplicationOps.deleteDependencies: Deleted oauth2 client '${clientId}'.`,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (isSaml2Application(applicationData)) {
      const saml2IdpId = getSaml2IdpEntityId(applicationData);
      try {
        if (saml2IdpId) {
          await deleteSaml2Provider({
            entityId: saml2IdpId,
            state: state2
          });
          debugMessage({
            message: `ApplicationOps.deleteDependencies: Deleted saml2 idp '${saml2IdpId}'.`,
            state: state2
          });
        }
      } catch (error) {
        errors.push(error);
      }
      const saml2SpId = getSaml2SpEntityId(applicationData);
      try {
        if (saml2SpId) {
          await deleteSaml2Provider({
            entityId: saml2SpId,
            state: state2
          });
          debugMessage({
            message: `ApplicationOps.deleteDependencies: Deleted saml2 sp '${saml2SpId}'.`,
            state: state2
          });
        }
      } catch (error) {
        errors.push(error);
      }
      try {
        const cots = await readCirclesOfTrust({
          entityProviders: [saml2IdpId, saml2SpId],
          state: state2
        });
        for (const cot of cots) {
          debugMessage({
            message: `ApplicationOps.deleteDependencies: Existing trusted providers for ${cot._id}:
${cot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
            state: state2
          });
          const providers = cot.trustedProviders.filter(
            (provider) => provider !== `${saml2IdpId}|saml2` && provider !== `${saml2SpId}|saml2`
          );
          cot.trustedProviders = providers;
          debugMessage({
            message: `ApplicationOps.deleteDependencies: Updated trusted providers for ${cot._id}:
${cot.trustedProviders.map((it) => it.split("|")[0]).join("\n")}.`,
            state: state2
          });
          await updateCircleOfTrust2({ cotId: cot._id, cotData: cot, state: state2 });
        }
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting dependencies`, errors);
    }
    debugMessage({
      message: `ApplicationOps.deleteDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting dependencies`, error);
  }
}
async function deleteApplication({
  applicationId,
  options = { deep: true },
  state: state2
}) {
  try {
    debugMessage({ message: `ApplicationOps.deleteApplication: start`, state: state2 });
    const { deep } = options;
    const applicationData = await deleteManagedObject2({
      type: getRealmManagedApplication({ state: state2 }),
      id: applicationId,
      state: state2
    });
    if (deep) {
      await deleteDependencies({ applicationData, state: state2 });
    }
    debugMessage({ message: `ApplicationOps.deleteApplication: end`, state: state2 });
    return applicationData;
  } catch (error) {
    throw new FrodoError(`Error deleting application ${applicationId}`, error);
  }
}
async function deleteApplicationByName({
  applicationName,
  options = { deep: true },
  state: state2
}) {
  let applications = [];
  try {
    applications = await queryApplications({
      filter: `name eq '${applicationName}'`,
      fields: ["_id"],
      state: state2
    });
    if (applications.length == 1) {
      return deleteApplication({
        applicationId: applications[0]._id,
        options,
        state: state2
      });
    }
  } catch (error) {
    throw new FrodoError(
      `Error deleting application ${applicationName}`,
      error
    );
  }
  if (applications.length == 0) {
    throw new FrodoError(`Application '${applicationName}' not found`);
  }
  if (applications.length > 1) {
    throw new FrodoError(
      `${applications.length} applications '${applicationName}' found`
    );
  }
}
async function deleteApplications({
  options = { deep: true },
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `ApplicationOps.deleteApplications: start`,
      state: state2
    });
    const applications = await readApplications({
      state: state2
    });
    const deleted = [];
    for (const application of applications) {
      debugMessage({
        message: `ApplicationOps.deleteApplications: '${application["_id"]}'`,
        state: state2
      });
      try {
        deleted.push(
          await deleteApplication({
            applicationId: application["_id"],
            options,
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length) {
      throw new FrodoError(`Error deleting applications`, errors);
    }
    debugMessage({ message: `ApplicationOps.deleteApplications: end`, state: state2 });
    return deleted;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting applications`, error);
  }
}
async function queryApplications({
  filter,
  fields = defaultFields,
  state: state2
}) {
  try {
    const application = await queryManagedObjects2({
      type: getRealmManagedApplication({ state: state2 }),
      filter,
      fields,
      state: state2
    });
    return application;
  } catch (error) {
    throw new FrodoError(
      `Error querying applications with filter ${filter}`,
      error
    );
  }
}
async function exportApplication({
  applicationId,
  options = {
    deps: true,
    useStringArrays: true
  },
  state: state2
}) {
  try {
    debugMessage({ message: `ApplicationOps.exportApplication: start`, state: state2 });
    const applicationData = await readApplication({ applicationId, state: state2 });
    const exportData = createApplicationExportTemplate({ state: state2 });
    exportData.managedApplication[applicationData._id] = applicationData;
    if (options.deps) {
      await exportDependencies2({
        applicationData,
        options,
        exportData,
        state: state2
      });
    }
    debugMessage({ message: `ApplicationOps.exportApplication: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting application ${applicationId}`, error);
  }
}
async function exportApplicationByName({
  applicationName,
  options = {
    deps: true,
    useStringArrays: true
  },
  state: state2
}) {
  try {
    debugMessage({
      message: `ApplicationOps.exportApplicationByName: start`,
      state: state2
    });
    const applicationData = await readApplicationByName({
      applicationName,
      state: state2
    });
    const exportData = createApplicationExportTemplate({ state: state2 });
    exportData.managedApplication[applicationData._id] = applicationData;
    if (options.deps) {
      await exportDependencies2({
        applicationData,
        options,
        exportData,
        state: state2
      });
    }
    debugMessage({
      message: `ApplicationOps.exportApplicationByName: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(
      `Error exporting application ${applicationName}`,
      error
    );
  }
}
async function exportApplications({
  options,
  state: state2
}) {
  const errors = [];
  let indicatorId;
  try {
    debugMessage({ message: `ApplicationOps.exportApplication: start`, state: state2 });
    const exportData = createApplicationExportTemplate({ state: state2 });
    const applications = await readApplications({ state: state2 });
    indicatorId = createProgressIndicator({
      total: applications.length,
      message: "Exporting applications...",
      state: state2
    });
    for (const applicationData of applications) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting application ${applicationData.name}`,
        state: state2
      });
      exportData.managedApplication[applicationData._id] = applicationData;
      if (options.deps) {
        try {
          await exportDependencies2({
            applicationData,
            options,
            exportData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      stopProgressIndicator({
        id: indicatorId,
        message: `Error exporting applications`,
        status: "fail",
        state: state2
      });
      throw new FrodoError(`Error exporting applications`, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${applications.length} applications`,
      state: state2
    });
    debugMessage({ message: `ApplicationOps.exportApplication: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting applications`,
      status: "fail",
      state: state2
    });
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting applications`, error);
  }
}
async function importApplication({
  applicationId,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  try {
    for (const id2 of Object.keys(importData.managedApplication)) {
      if (id2 === applicationId) {
        try {
          const applicationData = importData.managedApplication[id2];
          delete applicationData._provider;
          delete applicationData._rev;
          if (options.deps) {
            await importDependencies2({ applicationData, importData, state: state2 });
          }
          response = await updateApplication({
            applicationId,
            applicationData,
            state: state2
          });
          imported.push(id2);
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing application ${applicationId}`,
        errors
      );
    }
    if (0 === imported.length) {
      throw new FrodoError(
        `Import error:
${applicationId} not found in import data!`
      );
    }
    return response;
  } catch (error) {
    if (errors.length > 0 || imported.length == 0) {
      throw error;
    }
    throw new FrodoError(`Error importing application ${applicationId}`, error);
  }
}
async function importApplicationByName({
  applicationName,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  try {
    for (const applicationId of Object.keys(importData.managedApplication)) {
      if (importData.managedApplication[applicationId].name === applicationName) {
        try {
          const applicationData = importData.managedApplication[applicationId];
          delete applicationData._provider;
          delete applicationData._rev;
          if (options.deps) {
            await importDependencies2({ applicationData, importData, state: state2 });
          }
          response = await updateApplication({
            applicationId,
            applicationData,
            state: state2
          });
          imported.push(applicationId);
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing application ${applicationName}`,
        errors
      );
    }
    if (0 === imported.length) {
      throw new FrodoError(
        `Import error:
${applicationName} not found in import data!`
      );
    }
    return response;
  } catch (error) {
    if (errors.length > 0 || imported.length == 0) {
      throw error;
    }
    throw new FrodoError(
      `Error importing application ${applicationName}`,
      error
    );
  }
}
async function importApplications({
  importData,
  options = { deps: true },
  state: state2
}) {
  const response = [];
  const errors = [];
  try {
    for (const applicationId of Object.keys(importData.managedApplication)) {
      const applicationData = importData.managedApplication[applicationId];
      delete applicationData._provider;
      delete applicationData._rev;
      if (options.deps) {
        try {
          await importDependencies2({ applicationData, importData, state: state2 });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        response.push(
          await updateApplication({
            applicationId,
            applicationData,
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length) {
      throw new FrodoError(`Error importing applications`, errors);
    }
    return response;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error importing applications`, error);
  }
}

// src/ops/AuthenticateOps.ts
import { createHash, randomBytes } from "crypto";
import url from "url";
import { v4 } from "uuid";

// src/api/ServerInfoApi.ts
import util15 from "util";
var serverInfoUrlTemplate = "%s/json/serverinfo/%s";
var serverInfoApiVersion = "resource=1.1";
var serverVersionoApiVersion = "resource=1.0";
var getServerInfoApiConfig = () => ({
  apiVersion: serverInfoApiVersion
});
var getServerVersionApiConfig = () => ({
  apiVersion: serverVersionoApiVersion
});
async function getServerInfo({ state: state2 }) {
  const urlString = util15.format(serverInfoUrlTemplate, state2.getHost(), "*");
  const { data } = await generateAmApi({
    resource: getServerInfoApiConfig(),
    requestOverride: {},
    state: state2
  }).get(urlString, {});
  return data;
}
async function getServerVersionInfo({ state: state2 }) {
  const urlString = util15.format(
    serverInfoUrlTemplate,
    state2.getHost(),
    "version"
  );
  const { data } = await generateAmApi({
    resource: getServerVersionApiConfig(),
    requestOverride: {},
    state: state2
  }).get(urlString, {});
  return data;
}

// src/api/cloud/FeatureApi.ts
import util16 from "util";
var envInfoURLTemplate = "%s/feature?_queryFilter=true";
var getApiConfig11 = () => ({
  path: `/feature`
});
async function getFeatures({ state: state2 }) {
  const urlString = util16.format(
    envInfoURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateAmApi({ resource: getApiConfig11(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}

// src/ops/cloud/FeatureOps.ts
var FeatureOps_default = (state2) => {
  return {
    /**
     * Get all features
     * @returns {Promise<FeatureInterface[]>} a promise that resolves to an array of feature objects
     */
    async getFeatures() {
      return getFeatures2({ state: state2 });
    },
    /**
     * Check if feature is available
     * @param {string} featureId feature id (e.g. 'service-accounts')
     * @returns {Promise<boolean>} a promise that resolves to true if the feature is available and to false otherwise
     */
    async hasFeature(featureId) {
      return hasFeature({ featureId, state: state2 });
    }
  };
};
async function getFeatures2({
  state: state2
}) {
  if (typeof state2.getFeatures() !== "undefined")
    return state2.getFeatures();
  try {
    const { result } = await getFeatures({ state: state2 });
    state2.setFeatures(JSON.parse(JSON.stringify(result)));
  } catch (error) {
    debugMessage({ message: error.response?.data, state: state2 });
    state2.setFeatures([]);
  }
  return state2.getFeatures();
}
async function hasFeature({
  featureId,
  state: state2
}) {
  if (typeof state2.getFeatures() === "undefined")
    await getFeatures2({ state: state2 });
  const featureIds = state2.getFeatures().map((feature) => feature._id);
  return featureIds.includes(featureId);
}

// src/ops/cloud/ServiceAccountOps.ts
var ServiceAccountOps_default = (state2) => {
  return {
    /**
     * Check if service accounts are available
     * @returns {Promise<boolean>} true if service accounts are available, false otherwise
     */
    async isServiceAccountsFeatureAvailable() {
      return isServiceAccountsFeatureAvailable({ state: state2 });
    },
    /**
     * Create service account
     * @param {string} name Human-readable name of service account
     * @param {string} description Description of service account
     * @param {'Active' | 'Inactive'} accountStatus Service account status
     * @param {string[]} scopes Scopes.
     * @param {JwksInterface} jwks Java Web Key Set
     * @returns {Promise<IdObjectSkeletonInterface>} A promise resolving to a service account object
     */
    async createServiceAccount(name2, description, accountStatus, scopes2, jwks) {
      return createServiceAccount({
        name: name2,
        description,
        accountStatus,
        scopes: scopes2,
        jwks,
        state: state2
      });
    },
    /**
     * Get service account
     * @param {string} serviceAccountId service account id
     * @returns {Promise<ServiceAccountType>} a promise resolving to a service account object
     */
    async getServiceAccount(serviceAccountId) {
      return getServiceAccount({ serviceAccountId, state: state2 });
    }
  };
};
var moType = "svcacct";
var scopes = {
  OpenIdScope: "openid",
  ProfileScope: "profile",
  AmFullScope: "fr:am:*",
  IdmFullScope: "fr:idm:*",
  AutoAccessFullScope: "fr:autoaccess:*",
  IGAFullScope: "fr:iga:*",
  AnalyticsFullScope: "fr:idc:analytics:*",
  // AMIntrospectRealmTokenScope lets you introspect scopes _from the same realm_, there is a separate scope to introspect tokens from _all_ realms
  AMIntrospectRealmTokenScope: "am-introspect-all-tokens",
  // Special AM scopes (used by resource servers)
  AMIntrospectAllTokens: "am-introspect-all-tokens",
  AMIntrospectAllTokensAnyRealm: "am-introspect-all-tokens-any-realm",
  // Certificate scopes
  CertificateFullScope: "fr:idc:certificate:*",
  CertificateReadScope: "fr:idc:certificate:read",
  // ESV API scopes
  ESVFullScope: "fr:idc:esv:*",
  ESVReadScope: "fr:idc:esv:read",
  ESVUpdateScope: "fr:idc:esv:update",
  ESVRestartScope: "fr:idc:esv:restart",
  // Content security policy scopes
  ContentSecurityPolicyFullScope: "fr:idc:content-security-policy:*",
  // Federation scopes
  FederationFullScope: "fr:idc:federation:*",
  FederationReadScope: "fr:idc:federation:read",
  // Release scopes
  ReleaseFullScope: "fr:idc:release:*",
  // SSOCookie scopes
  SSOCookieFullScope: "fr:idc:sso-cookie:*",
  // CustomDomainFullScope Custom domain scopes
  CustomDomainFullScope: "fr:idc:custom-domain:*",
  // Promotion scopes
  PromotionScope: "fr:idc:promotion:*"
};
var SERVICE_ACCOUNT_ALLOWED_SCOPES = [
  scopes.AmFullScope,
  scopes.AnalyticsFullScope,
  scopes.AutoAccessFullScope,
  scopes.CertificateFullScope,
  scopes.CertificateReadScope,
  scopes.ContentSecurityPolicyFullScope,
  scopes.CustomDomainFullScope,
  scopes.ESVFullScope,
  scopes.ESVReadScope,
  scopes.ESVRestartScope,
  scopes.ESVUpdateScope,
  scopes.IdmFullScope,
  scopes.IGAFullScope,
  scopes.PromotionScope,
  scopes.ReleaseFullScope,
  scopes.SSOCookieFullScope
];
var SERVICE_ACCOUNT_DEFAULT_SCOPES = [
  scopes.AmFullScope,
  scopes.AnalyticsFullScope,
  scopes.AutoAccessFullScope,
  scopes.CertificateFullScope,
  scopes.CertificateReadScope,
  scopes.ContentSecurityPolicyFullScope,
  scopes.CustomDomainFullScope,
  scopes.ESVFullScope,
  scopes.IdmFullScope,
  scopes.IGAFullScope,
  scopes.PromotionScope,
  scopes.ReleaseFullScope,
  scopes.SSOCookieFullScope
];
async function isServiceAccountsFeatureAvailable({
  state: state2
}) {
  debugMessage({
    message: `ServiceAccountOps.isServiceAccountsFeatureAvailable: start`,
    state: state2
  });
  const featureAvailable = await hasFeature({
    featureId: "service-accounts",
    state: state2
  });
  debugMessage({
    message: `ServiceAccountOps.isServiceAccountsFeatureAvailable: end, available=${featureAvailable}`,
    state: state2
  });
  return featureAvailable;
}
async function createServiceAccount({
  name: name2,
  description,
  accountStatus,
  scopes: scopes2,
  jwks,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceAccountOps.createServiceAccount: start`,
      state: state2
    });
    const payload = {
      name: name2,
      description,
      accountStatus,
      scopes: scopes2,
      jwks: JSON.stringify(jwks)
    };
    debugMessage({
      message: `ServiceAccountOps: createServiceAccount: payload:`,
      state: state2
    });
    debugMessage({ message: payload, state: state2 });
    const result = await createManagedObject({
      moType,
      moData: payload,
      state: state2
    });
    debugMessage({
      message: `ServiceAccountOps.createServiceAccount: end`,
      state: state2
    });
    return result;
  } catch (error) {
    throw new FrodoError(`Error creating service account ${name2}`, error);
  }
}
async function getServiceAccount({
  serviceAccountId,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceAccountOps.getServiceAccount: start`,
      state: state2
    });
    const serviceAccount = await getManagedObject({
      type: moType,
      id: serviceAccountId,
      fields: ["*"],
      state: state2
    });
    debugMessage({ message: serviceAccount, state: state2 });
    debugMessage({
      message: `ServiceAccountOps.getServiceAccount: end`,
      state: state2
    });
    return serviceAccount;
  } catch (error) {
    throw new FrodoError(
      `Error getting service account ${serviceAccountId}`,
      error
    );
  }
}

// src/ops/ConnectionProfileOps.ts
import fs4 from "fs";
import os from "os";
import path3 from "path";

// src/utils/DataProtection.ts
import crypto from "crypto";
import fs3, { promises as fsp } from "fs";
import { homedir } from "os";
import { promisify } from "util";
var scrypt = promisify(crypto.scrypt);
var _masterKey = /* @__PURE__ */ new WeakMap();
var _nonce = /* @__PURE__ */ new WeakMap();
var _salt = /* @__PURE__ */ new WeakMap();
var _key = /* @__PURE__ */ new WeakMap();
var _encrypt = /* @__PURE__ */ new WeakMap();
var DataProtection = class {
  constructor({
    pathToMasterKey = void 0,
    sessionKey = void 0,
    state: state2
  }) {
    const masterKeyPath = () => pathToMasterKey || process.env[Constants_default.FRODO_MASTER_KEY_PATH_KEY] || `${homedir()}/.frodo/masterkey.key`;
    _masterKey.set(this, async () => {
      if (!sessionKey) {
        try {
          if (process.env[Constants_default.FRODO_MASTER_KEY_KEY])
            return process.env[Constants_default.FRODO_MASTER_KEY_KEY];
          if (!fs3.existsSync(masterKeyPath())) {
            const masterKey = crypto.randomBytes(32).toString("base64");
            await fsp.writeFile(masterKeyPath(), masterKey);
          }
          return await fsp.readFile(masterKeyPath(), "utf8");
        } catch (err) {
          printMessage({ message: err.message, type: "error", state: state2 });
          return "";
        }
      } else {
        return sessionKey;
      }
    });
    _nonce.set(this, () => crypto.randomBytes(16));
    _salt.set(this, () => crypto.randomBytes(64));
    _key.set(
      this,
      // eslint-disable-next-line no-return-await
      async (masterKey, salt) => await scrypt(masterKey, salt, 32)
    );
    _encrypt.set(this, (key, nonce, data, salt) => {
      const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);
      const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), "utf8"),
        cipher.final()
      ]);
      const tag = cipher.getAuthTag();
      const buffer = Buffer.concat([salt, nonce, tag, encrypted]);
      return buffer.toString("base64");
    });
  }
  async encrypt(data) {
    const nonce = _nonce.get(this)();
    const salt = _salt.get(this)();
    const masterKey = await _masterKey.get(this)();
    const key = await _key.get(this)(masterKey, salt);
    return _encrypt.get(this)(key, nonce, data, salt);
  }
  async decrypt(data) {
    const buffer = Buffer.from(data.toString(), "base64");
    const salt = buffer.subarray(0, 64);
    const nonce = buffer.subarray(64, 80);
    const tag = buffer.subarray(80, 96);
    const encrypted = buffer.subarray(96);
    const masterKey = await _masterKey.get(this)();
    const key = await _key.get(this)(masterKey, salt);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, nonce);
    decipher.setAuthTag(tag);
    return JSON.parse(
      decipher.update(encrypted.toString("binary"), "binary", "utf8") + decipher.final("utf8")
    );
  }
};
var DataProtection_default = DataProtection;

// src/ops/ConnectionProfileOps.ts
var ConnectionProfileOps_default = (state2) => {
  return {
    getConnectionProfilesPath() {
      return getConnectionProfilesPath({ state: state2 });
    },
    findConnectionProfiles(connectionProfiles, host) {
      return findConnectionProfiles({
        connectionProfiles,
        host,
        state: state2
      });
    },
    async initConnectionProfiles() {
      initConnectionProfiles({ state: state2 });
    },
    async getConnectionProfileByHost(host) {
      return getConnectionProfileByHost({ host, state: state2 });
    },
    async getConnectionProfile() {
      return getConnectionProfile({ state: state2 });
    },
    async saveConnectionProfile(host) {
      return saveConnectionProfile({ host, state: state2 });
    },
    deleteConnectionProfile(host) {
      deleteConnectionProfile({ host, state: state2 });
    },
    async addNewServiceAccount() {
      return addNewServiceAccount({ state: state2 });
    }
  };
};
var fileOptions = {
  indentation: 4
};
var legacyProfileFilename = ".frodorc";
var newProfileFilename = "Connections.json";
function getConnectionProfilesPath({ state: state2 }) {
  debugMessage({
    message: `ConnectionProfileOps.getConnectionProfilesPath: start`,
    state: state2
  });
  const profilesPath = state2.getConnectionProfilesPath() || process.env[Constants_default.FRODO_CONNECTION_PROFILES_PATH_KEY] || `${os.homedir()}/.frodo/${newProfileFilename}`;
  debugMessage({
    message: `ConnectionProfileOps.getConnectionProfilesPath: end [profilesPath=${profilesPath}]`,
    state: state2
  });
  return profilesPath;
}
function findConnectionProfiles({
  connectionProfiles,
  host,
  state: state2
}) {
  const profiles = [];
  for (const tenant in connectionProfiles) {
    if (tenant.includes(host)) {
      debugMessage({
        message: `ConnectionProfileOps.findConnectionProfiles: '${host}' identifies '${tenant}', including in result set`,
        state: state2
      });
      const foundProfile = { ...connectionProfiles[tenant] };
      foundProfile.tenant = tenant;
      profiles.push(foundProfile);
    }
  }
  return profiles;
}
function migrateFromLegacyProfile() {
  try {
    const legacyPath = `${os.homedir()}/.frodo/${legacyProfileFilename}`;
    const newPath = `${os.homedir()}/.frodo/${newProfileFilename}`;
    if (!fs4.existsSync(legacyPath) && !fs4.existsSync(newPath)) {
      fs4.writeFileSync(
        newPath,
        JSON.stringify({}, null, fileOptions.indentation)
      );
    } else if (fs4.existsSync(legacyPath) && !fs4.existsSync(newPath)) {
      fs4.copyFileSync(legacyPath, newPath);
      fs4.renameSync(legacyPath, `${legacyPath}.deprecated`);
    }
  } catch (error) {
    throw new FrodoError(
      `Error migrating from legacy connection profile`,
      error
    );
  }
}
async function initConnectionProfiles({ state: state2 }) {
  debugMessage({
    message: `ConnectionProfileOps.initConnectionProfiles: start`,
    state: state2
  });
  const dataProtection = new DataProtection_default({
    pathToMasterKey: state2.getMasterKeyPath(),
    state: state2
  });
  try {
    const filename = getConnectionProfilesPath({ state: state2 });
    const folderName = path3.dirname(filename);
    if (!fs4.existsSync(filename)) {
      if (!fs4.existsSync(folderName)) {
        debugMessage({
          message: `ConnectionProfileOps.initConnectionProfiles: folder does not exist: ${folderName}, creating...`,
          state: state2
        });
        fs4.mkdirSync(folderName, { recursive: true });
      }
      if (!fs4.existsSync(filename)) {
        debugMessage({
          message: `ConnectionProfileOps.initConnectionProfiles: file does not exist: ${filename}, creating...`,
          state: state2
        });
        fs4.writeFileSync(
          filename,
          JSON.stringify({}, null, fileOptions.indentation)
        );
      }
    } else {
      migrateFromLegacyProfile();
      const data = fs4.readFileSync(filename, "utf8");
      const connectionsData = JSON.parse(data);
      let convert = false;
      for (const conn of Object.keys(connectionsData)) {
        if (connectionsData[conn]["password"]) {
          convert = true;
          connectionsData[conn].encodedPassword = await dataProtection.encrypt(
            connectionsData[conn]["password"]
          );
          delete connectionsData[conn]["password"];
        }
        if (connectionsData[conn]["logApiSecret"]) {
          convert = true;
          connectionsData[conn].encodedLogApiSecret = await dataProtection.encrypt(connectionsData[conn]["logApiSecret"]);
          delete connectionsData[conn]["logApiSecret"];
        }
        if (connectionsData[conn]["svcacctJwk"]) {
          convert = true;
          connectionsData[conn].encodedSvcacctJwk = await dataProtection.encrypt(connectionsData[conn]["svcacctJwk"]);
          delete connectionsData[conn]["svcacctJwk"];
        }
      }
      if (convert) {
        fs4.writeFileSync(
          filename,
          JSON.stringify(connectionsData, null, fileOptions.indentation)
        );
      }
    }
    debugMessage({
      message: `ConnectionProfileOps.initConnectionProfiles: end`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error initializing connection profiles`, error);
  }
}
async function getConnectionProfileByHost({
  host,
  state: state2
}) {
  const dataProtection = new DataProtection_default({
    pathToMasterKey: state2.getMasterKeyPath(),
    state: state2
  });
  const filename = getConnectionProfilesPath({ state: state2 });
  if (!fs4.statSync(filename, { throwIfNoEntry: false })) {
    throw new FrodoError(`Connection profiles file ${filename} not found`);
  }
  const connectionsData = JSON.parse(fs4.readFileSync(filename, "utf8"));
  const profiles = findConnectionProfiles({
    connectionProfiles: connectionsData,
    host,
    state: state2
  });
  if (profiles.length == 0) {
    throw new FrodoError(`No connection profile found matching '${host}'`);
  }
  if (profiles.length > 1) {
    throw new FrodoError(
      `Multiple matching connection profiles found matching '${host}':
  - ${profiles.map((profile) => profile.tenant).join(
        "\n  - "
      )}
Specify a sub-string uniquely identifying a single connection profile host URL.`
    );
  }
  return {
    tenant: profiles[0].tenant,
    deploymentType: profiles[0].deploymentType,
    username: profiles[0].username ? profiles[0].username : null,
    password: profiles[0].encodedPassword ? await dataProtection.decrypt(profiles[0].encodedPassword) : null,
    logApiKey: profiles[0].logApiKey ? profiles[0].logApiKey : null,
    logApiSecret: profiles[0].encodedLogApiSecret ? await dataProtection.decrypt(profiles[0].encodedLogApiSecret) : null,
    authenticationService: profiles[0].authenticationService ? profiles[0].authenticationService : null,
    authenticationHeaderOverrides: profiles[0].authenticationHeaderOverrides ? profiles[0].authenticationHeaderOverrides : {},
    svcacctName: profiles[0].svcacctName ? profiles[0].svcacctName : null,
    svcacctId: profiles[0].svcacctId ? profiles[0].svcacctId : null,
    svcacctJwk: profiles[0].encodedSvcacctJwk ? await dataProtection.decrypt(profiles[0].encodedSvcacctJwk) : null,
    svcacctScope: profiles[0].svcacctScope ? profiles[0].svcacctScope : null
  };
}
async function getConnectionProfile({
  state: state2
}) {
  return getConnectionProfileByHost({ host: state2.getHost(), state: state2 });
}
async function saveConnectionProfile({
  host,
  state: state2
}) {
  try {
    debugMessage({
      message: `ConnectionProfileOps.saveConnectionProfile: start`,
      state: state2
    });
    const dataProtection = new DataProtection_default({
      pathToMasterKey: state2.getMasterKeyPath(),
      state: state2
    });
    const filename = getConnectionProfilesPath({ state: state2 });
    debugMessage({
      message: `Saving connection profile in ${filename}`,
      state: state2
    });
    let profiles = {};
    let profile = { tenant: "" };
    if (fs4.statSync(filename, { throwIfNoEntry: false })) {
      const data = fs4.readFileSync(filename, "utf8");
      profiles = JSON.parse(data);
      const found = findConnectionProfiles({
        connectionProfiles: profiles,
        host,
        state: state2
      });
      if (found.length === 1) {
        profile = found[0];
        state2.setHost(profile.tenant);
        verboseMessage({
          message: `Existing profile: ${profile.tenant}`,
          state: state2
        });
        debugMessage({ message: profile, state: state2 });
      }
      if (found.length === 0) {
        if (isValidUrl(host)) {
          state2.setHost(host);
          debugMessage({ message: `New profile: ${host}`, state: state2 });
        } else {
          throw new FrodoError(
            `No existing profile found matching '${host}'. Provide a valid URL as the host argument to create a new profile.`
          );
        }
      }
    } else {
      debugMessage({
        message: `New profiles file ${filename} with new profile ${host}`,
        state: state2
      });
    }
    if (state2.getDeploymentType())
      profile.deploymentType = state2.getDeploymentType();
    if (state2.getUsername())
      profile.username = state2.getUsername();
    if (state2.getPassword())
      profile.encodedPassword = await dataProtection.encrypt(
        state2.getPassword()
      );
    if (state2.getLogApiKey())
      profile.logApiKey = state2.getLogApiKey();
    if (state2.getLogApiSecret())
      profile.encodedLogApiSecret = await dataProtection.encrypt(
        state2.getLogApiSecret()
      );
    if (state2.getServiceAccountId()) {
      profile.svcacctId = state2.getServiceAccountId();
      if (state2.getBearerToken()) {
        profile.svcacctName = (await getServiceAccount({
          serviceAccountId: state2.getServiceAccountId(),
          state: state2
        })).name;
      }
    }
    if (state2.getServiceAccountJwk()) {
      profile.encodedSvcacctJwk = await dataProtection.encrypt(
        state2.getServiceAccountJwk()
      );
    }
    if (state2.getUseBearerTokenForAmApis() && state2.getBearerTokenMeta() && state2.getBearerTokenMeta().scope !== profile.svcacctScope) {
      profile.svcacctScope = state2.getBearerTokenMeta().scope;
    }
    if (state2.getBearerToken() && profile.svcacctId && !profile.svcacctName) {
      profile.svcacctName = (await getServiceAccount({ serviceAccountId: profile.svcacctId, state: state2 })).name;
      debugMessage({
        message: `ConnectionProfileOps.saveConnectionProfile: added missing service account name`,
        state: state2
      });
    }
    if (state2.getAuthenticationService()) {
      profile.authenticationService = state2.getAuthenticationService();
      printMessage({
        message: "Advanced setting: Authentication Service: " + state2.getAuthenticationService(),
        type: "info",
        state: state2
      });
    }
    if (state2.getAuthenticationHeaderOverrides() && Object.entries(state2.getAuthenticationHeaderOverrides()).length) {
      profile.authenticationHeaderOverrides = state2.getAuthenticationHeaderOverrides();
      printMessage({
        message: "Advanced setting: Authentication Header Overrides: ",
        type: "info",
        state: state2
      });
      printMessage({
        message: state2.getAuthenticationHeaderOverrides(),
        type: "info",
        state: state2
      });
    }
    delete profile.tenant;
    profiles[state2.getHost()] = profile;
    const orderedProfiles = Object.keys(profiles).sort().reduce((obj, key) => {
      obj[key] = profiles[key];
      return obj;
    }, {});
    saveJsonToFile({
      data: orderedProfiles,
      filename,
      includeMeta: false,
      state: state2
    });
    verboseMessage({
      message: `Saved connection profile ${state2.getHost()} in ${filename}`,
      state: state2
    });
    debugMessage({
      message: `ConnectionProfileOps.saveConnectionProfile: end [true]`,
      state: state2
    });
    return true;
  } catch (error) {
    throw new FrodoError(`Error saving connection profile`, error);
  }
}
function deleteConnectionProfile({
  host,
  state: state2
}) {
  const filename = getConnectionProfilesPath({ state: state2 });
  let connectionsData = {};
  if (!fs4.statSync(filename, { throwIfNoEntry: false })) {
    throw new FrodoError(`Connection profiles file ${filename} not found`);
  }
  const data = fs4.readFileSync(filename, "utf8");
  connectionsData = JSON.parse(data);
  const profiles = findConnectionProfiles({
    connectionProfiles: connectionsData,
    host,
    state: state2
  });
  if (profiles.length == 0) {
    throw new FrodoError(`No connection profile found matching '${host}'`);
  }
  if (profiles.length > 1) {
    throw new FrodoError(
      `Multiple matching connection profiles found matching '${host}':
  - ${profiles.map((profile) => profile.tenant).join(
        "\n  - "
      )}
Specify a sub-string uniquely identifying a single connection profile host URL.`
    );
  }
  delete connectionsData[profiles[0].tenant];
  fs4.writeFileSync(filename, JSON.stringify(connectionsData, null, 2));
}
async function addNewServiceAccount({
  state: state2
}) {
  try {
    debugMessage({
      message: `ConnectionProfileOps.addNewServiceAccount: start`,
      state: state2
    });
    const name2 = `Frodo-SA-${(/* @__PURE__ */ new Date()).getTime()}`;
    debugMessage({
      message: `ConnectionProfileOps.addNewServiceAccount: name=${name2}...`,
      state: state2
    });
    const description = `${state2.getUsername()}'s Frodo Service Account`;
    const scope = SERVICE_ACCOUNT_DEFAULT_SCOPES;
    const jwkPrivate = await createJwkRsa();
    const jwkPublic = await getJwkRsaPublic(jwkPrivate);
    const jwks = createJwks(jwkPublic);
    const sa = await createServiceAccount({
      name: name2,
      description,
      accountStatus: "active",
      scopes: scope,
      jwks,
      state: state2
    });
    debugMessage({
      message: `ConnectionProfileOps.addNewServiceAccount: id=${sa._id}`,
      state: state2
    });
    state2.setServiceAccountId(sa._id);
    state2.setServiceAccountJwk(jwkPrivate);
    debugMessage({
      message: `ConnectionProfileOps.addNewServiceAccount: end`,
      state: state2
    });
    return sa;
  } catch (error) {
    throw new FrodoError(`Error creating new service account`, error);
  }
}

// src/api/SessionApi.ts
import util17 from "util";
var getSessionInfoURLTemplate = "%s/json%s/sessions/?_action=getSessionInfo";
var apiVersion11 = "resource=4.0";
function getApiConfig12() {
  return {
    apiVersion: apiVersion11
  };
}
async function getSessionInfo({
  tokenId,
  state: state2
}) {
  const urlString = util17.format(
    getSessionInfoURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig12(),
    state: state2
  }).post(
    urlString,
    {
      tokenId
    },
    {
      withCredentials: true
    }
  );
  return data;
}

// src/ops/SessionOps.ts
var SessionOps_default = (state2) => {
  return {
    async getSessionInfo(tokenId) {
      return getSessionInfo2({ tokenId, state: state2 });
    }
  };
};
async function getSessionInfo2({
  tokenId,
  state: state2
}) {
  try {
    return getSessionInfo({ tokenId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error getting session info`, error);
  }
}

// src/ops/TokenCacheOps.ts
import fs5 from "fs";
import os2 from "os";
import path4 from "path";
import { v5 as uuidv5 } from "uuid";
var TokenCacheOps_default = (state2) => {
  return {
    getTokenCachePath() {
      return getTokenCachePath({ state: state2 });
    },
    initTokenCache() {
      initTokenCache({ state: state2 });
    },
    async hasToken(tokenType) {
      return hasToken({
        tokenType,
        state: state2
      });
    },
    async hasUserSessionToken() {
      return hasUserSessionToken({
        state: state2
      });
    },
    async hasUserBearerToken() {
      return hasUserBearerToken({
        state: state2
      });
    },
    async hasSaBearerToken() {
      return hasSaBearerToken({
        state: state2
      });
    },
    async readToken(tokenType) {
      return readToken({ tokenType, state: state2 });
    },
    async readUserSessionToken() {
      return readUserSessionToken({ state: state2 });
    },
    async readUserBearerToken() {
      return readUserBearerToken({ state: state2 });
    },
    async readSaBearerToken() {
      return readSaBearerToken({ state: state2 });
    },
    async saveUserSessionToken(token) {
      return saveUserSessionToken({ token, state: state2 });
    },
    async saveUserBearerToken(token) {
      return saveUserBearerToken({ token, state: state2 });
    },
    async saveSaBearerToken(token) {
      return saveSaBearerToken({ token, state: state2 });
    },
    purge() {
      return purge({ state: state2 });
    },
    flush() {
      return flush({ state: state2 });
    }
  };
};
var UUIDV5_NAMESPACE = "e9a38338-21c0-4dcd-ba74-7ddeac58edbe";
var checksumKey = getChecksum("checksum");
var tokenKey = getChecksum("token");
var fileOptions2 = {
  indentation: 4
};
var tokenCacheFilename = "TokenCache.json";
function getTokenCachePath({ state: state2 }) {
  debugMessage({
    message: `TokenCacheOps.getTokenCachePath: start`,
    state: state2
  });
  const tokenCachePath = state2.getTokenCachePath() || process.env[Constants_default.FRODO_TOKEN_CACHE_PATH_KEY] || `${os2.homedir()}/.frodo/${tokenCacheFilename}`;
  debugMessage({
    message: `TokenCacheOps.getTokenCachePath: end [tokenCachePath=${tokenCachePath}]`,
    state: state2
  });
  return tokenCachePath;
}
function purgeExpiredTokens(tokenCache, state2) {
  const now = Date.now();
  debugMessage({
    message: `TokenCacheOps.purgeExpiredTokens: start [now=${now}]`,
    state: state2
  });
  for (const hostKey of Object.keys(tokenCache)) {
    for (const realmKey of Object.keys(tokenCache[hostKey])) {
      for (const typeKey of Object.keys(tokenCache[hostKey][realmKey])) {
        for (const subjectKey of Object.keys(
          tokenCache[hostKey][realmKey][typeKey]
        )) {
          for (const expKey of Object.keys(
            tokenCache[hostKey][realmKey][typeKey][subjectKey]
          )) {
            const exp = parseInt(expKey, 10);
            if (now > exp + 1e3 * 60) {
              debugMessage({
                message: `TokenCacheOps.purgeExpiredTokens: purging expired token ${hostKey}.${realmKey}.${typeKey}.${subjectKey}.${expKey}`,
                state: state2
              });
              delete tokenCache[hostKey][realmKey][typeKey][subjectKey][expKey];
            }
          }
          if (0 === Object.keys(tokenCache[hostKey][realmKey][typeKey][subjectKey]).length) {
            delete tokenCache[hostKey][realmKey][typeKey][subjectKey];
          }
        }
        if (0 === Object.keys(tokenCache[hostKey][realmKey][typeKey]).length) {
          delete tokenCache[hostKey][realmKey][typeKey];
        }
      }
      if (0 === Object.keys(tokenCache[hostKey][realmKey]).length) {
        delete tokenCache[hostKey][realmKey];
      }
    }
    if (0 === Object.keys(tokenCache[hostKey]).length) {
      delete tokenCache[hostKey];
    }
  }
  debugMessage({
    message: `TokenCacheOps.purgeExpiredTokens: end`,
    state: state2
  });
  return tokenCache;
}
function initTokenCache({ state: state2 }) {
  try {
    debugMessage({
      message: `TokenCacheOps.initTokenCache: start`,
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    const folderName = path4.dirname(filename);
    if (!fs5.existsSync(filename)) {
      if (!fs5.existsSync(folderName)) {
        debugMessage({
          message: `TokenCacheOps.initTokenCache: folder does not exist: ${folderName}, creating...`,
          state: state2
        });
        fs5.mkdirSync(folderName, { recursive: true });
      }
      if (!fs5.existsSync(filename)) {
        debugMessage({
          message: `TokenCacheOps.initTokenCache: file does not exist: ${filename}, creating...`,
          state: state2
        });
        fs5.writeFileSync(
          filename,
          JSON.stringify({}, null, fileOptions2.indentation)
        );
      }
    } else {
      const data = fs5.readFileSync(filename, "utf8");
      const tokenCache = JSON.parse(data);
      purgeExpiredTokens(tokenCache, state2);
      fs5.writeFileSync(filename, stringify(tokenCache));
    }
    debugMessage({
      message: `TokenCacheOps.initTokenCache: end`,
      state: state2
    });
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.initTokenCache: error initializing cache: ${error}`,
      state: state2
    });
  }
}
async function hasToken({
  tokenType,
  state: state2
}) {
  debugMessage({
    message: `TokenCacheOps.hasToken: start [tokenType=${tokenType}]`,
    state: state2
  });
  try {
    await readToken({ tokenType, state: state2 });
    debugMessage({
      message: `TokenCacheOps.hasToken: end [has ${tokenType} token: true]`,
      state: state2
    });
    return true;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.hasToken: end [has ${tokenType} token: false]`,
      state: state2
    });
    return false;
  }
}
async function hasUserSessionToken({
  state: state2
}) {
  return hasToken({ tokenType: "userSession", state: state2 });
}
async function hasUserBearerToken({
  state: state2
}) {
  return hasToken({ tokenType: "userBearer", state: state2 });
}
async function hasSaBearerToken({
  state: state2
}) {
  return hasToken({ tokenType: "saBearer", state: state2 });
}
function getChecksum(input) {
  return uuidv5(input, UUIDV5_NAMESPACE);
}
function getHostKey(state2) {
  return uuidv5(state2.getHost(), uuidv5.URL);
}
function getRealmKey(state2) {
  return uuidv5("/", UUIDV5_NAMESPACE);
}
function getTypeKey(tokenType) {
  return uuidv5(tokenType, UUIDV5_NAMESPACE);
}
function getSubjectKey(tokenType, state2) {
  if (tokenType === "userSession") {
    return uuidv5(state2.getUsername(), UUIDV5_NAMESPACE);
  } else if (tokenType === "userBearer") {
    return uuidv5(state2.getUsername(), UUIDV5_NAMESPACE);
  } else if (tokenType === "saBearer") {
    return uuidv5(state2.getServiceAccountId(), UUIDV5_NAMESPACE);
  }
}
async function readToken({
  tokenType,
  state: state2
}) {
  try {
    debugMessage({
      message: `TokenCacheOps.readToken: start`,
      state: state2
    });
    const dataProtection = new DataProtection_default({
      sessionKey: generateSessionKey(tokenType, state2),
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    const data = fs5.readFileSync(filename, "utf8");
    const tokenCache = JSON.parse(data);
    const hostKey = getHostKey(state2);
    const realmKey = getRealmKey(state2);
    const typeKey = getTypeKey(tokenType);
    const subjectKey = getSubjectKey(tokenType, state2);
    if (get(tokenCache, [hostKey, realmKey, typeKey, subjectKey])) {
      const exp = Math.max(
        ...Object.keys(tokenCache[hostKey][realmKey][typeKey][subjectKey]).map(
          (expKey2) => parseInt(expKey2, 10)
        )
      );
      const expKey = String(exp);
      if (Math.floor((exp - Date.now()) / 1e3) > 30) {
        debugMessage({
          message: `TokenCacheOps.readToken: found ${tokenType} token in cache [expires in ${Math.floor(
            (exp - Date.now()) / 1e3
          )}s]`,
          state: state2
        });
        const token = await dataProtection.decrypt(
          tokenCache[hostKey][realmKey][typeKey][subjectKey][expKey][tokenKey]
        );
        return JSON.parse(token);
      }
    }
  } catch (error2) {
    error2.message = `Error searching for ${tokenType} tokens in cache: ${error2}`;
    debugMessage({
      message: `TokenCacheOps.readToken: ${error2.message}: ${error2.stack}`,
      state: state2
    });
    throw error2;
  }
  const error = new Error(`No ${tokenType} tokens found in cache`);
  debugMessage({
    message: `TokenCacheOps.readToken: ${error.message}`,
    state: state2
  });
  throw error;
}
async function readUserSessionToken({
  state: state2
}) {
  return await readToken({
    tokenType: "userSession",
    state: state2
  });
}
async function readUserBearerToken({
  state: state2
}) {
  return await readToken({
    tokenType: "userBearer",
    state: state2
  });
}
async function readSaBearerToken({
  state: state2
}) {
  return await readToken({
    tokenType: "saBearer",
    state: state2
  });
}
function generateSessionKey(tokenType, state2) {
  switch (tokenType) {
    case "userSession":
      return uuidv5(state2.getPassword(), UUIDV5_NAMESPACE);
    case "userBearer":
      return uuidv5(state2.getPassword(), UUIDV5_NAMESPACE);
    case "saBearer":
      return uuidv5(stringify(state2.getServiceAccountJwk()), UUIDV5_NAMESPACE);
    default:
      return null;
  }
}
async function saveUserSessionToken({
  token,
  state: state2
}) {
  try {
    debugMessage({
      message: `TokenCacheOps.saveUserSessionToken: start`,
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    const data = fs5.readFileSync(filename, "utf8");
    const tokenCache = JSON.parse(data);
    purgeExpiredTokens(tokenCache, state2);
    const hostKey = getHostKey(state2);
    const realmKey = getRealmKey(state2);
    const typeKey = getTypeKey("userSession");
    const subjectKey = getSubjectKey("userSession", state2);
    const dataProtection = new DataProtection_default({
      sessionKey: generateSessionKey("userSession", state2),
      state: state2
    });
    const checksum = getChecksum(stringify(token));
    const checksums = Object.keys(
      get(tokenCache, [hostKey, realmKey, typeKey, subjectKey], {})
    ).map(
      (expKey) => get(tokenCache, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        expKey,
        checksumKey
      ])
    );
    if (checksums.includes(checksum)) {
      debugMessage({
        message: `TokenCacheOps.saveUserSessionToken: token alreaday in cache`,
        state: state2
      });
    } else {
      put(tokenCache, checksum, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        checksumKey
      ]);
      put(tokenCache, await dataProtection.encrypt(stringify(token)), [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        tokenKey
      ]);
      fs5.writeFileSync(filename, stringify(tokenCache));
      debugMessage({
        message: `TokenCacheOps.saveUserSessionToken: saved token in cache`,
        state: state2
      });
    }
    debugMessage({
      message: `TokenCacheOps.saveUserSessionToken: end`,
      state: state2
    });
    return true;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.saveUserSessionToken: error saving token in cache: ${error}`,
      state: state2
    });
    debugMessage({
      message: error.stack,
      state: state2
    });
    return false;
  }
}
async function saveUserBearerToken({
  token,
  state: state2
}) {
  try {
    debugMessage({
      message: `TokenCacheOps.saveUserBearerToken: start`,
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    const data = fs5.readFileSync(filename, "utf8");
    const tokenCache = JSON.parse(data);
    purgeExpiredTokens(tokenCache, state2);
    const hostKey = getHostKey(state2);
    const realmKey = getRealmKey(state2);
    const typeKey = getTypeKey("userBearer");
    const subjectKey = getSubjectKey("userBearer", state2);
    const dataProtection = new DataProtection_default({
      sessionKey: generateSessionKey("userBearer", state2),
      state: state2
    });
    const checksum = getChecksum(stringify(token));
    const checksums = Object.keys(
      get(tokenCache, [hostKey, realmKey, typeKey, subjectKey], {})
    ).map(
      (expKey) => get(tokenCache, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        expKey,
        checksumKey
      ])
    );
    if (checksums.includes(checksum)) {
      debugMessage({
        message: `TokenCacheOps.saveUserBearerToken: token alreaday in cache`,
        state: state2
      });
    } else {
      put(tokenCache, checksum, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        checksumKey
      ]);
      put(tokenCache, await dataProtection.encrypt(stringify(token)), [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        tokenKey
      ]);
      fs5.writeFileSync(filename, stringify(tokenCache));
      debugMessage({
        message: `TokenCacheOps.saveUserBearerToken: saved token in cache`,
        state: state2
      });
    }
    debugMessage({
      message: `TokenCacheOps.saveUserBearerToken: end`,
      state: state2
    });
    return true;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.saveUserBearerToken: error saving token in cache: ${error}`,
      state: state2
    });
    debugMessage({
      message: error.stack,
      state: state2
    });
    return false;
  }
}
async function saveSaBearerToken({
  token,
  state: state2
}) {
  try {
    debugMessage({
      message: `TokenCacheOps.saveSaBearerToken: start`,
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    const data = fs5.readFileSync(filename, "utf8");
    const tokenCache = JSON.parse(data);
    purgeExpiredTokens(tokenCache, state2);
    const hostKey = getHostKey(state2);
    const realmKey = getRealmKey(state2);
    const typeKey = getTypeKey("saBearer");
    const subjectKey = getSubjectKey("saBearer", state2);
    const dataProtection = new DataProtection_default({
      sessionKey: generateSessionKey("saBearer", state2),
      state: state2
    });
    const checksum = getChecksum(stringify(token));
    const checksums = Object.keys(
      get(tokenCache, [hostKey, realmKey, typeKey, subjectKey], {})
    ).map(
      (expKey) => get(tokenCache, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        expKey,
        checksumKey
      ])
    );
    debugMessage({
      message: `TokenCacheOps.saveSaBearerToken: checksum=${checksum} checksums=${checksums}`,
      state: state2
    });
    if (checksums.includes(checksum)) {
      debugMessage({
        message: `TokenCacheOps.saveSaBearerToken: token already in cache`,
        state: state2
      });
    } else {
      put(tokenCache, checksum, [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        checksumKey
      ]);
      put(tokenCache, await dataProtection.encrypt(stringify(token)), [
        hostKey,
        realmKey,
        typeKey,
        subjectKey,
        `${token.expires}`,
        tokenKey
      ]);
      fs5.writeFileSync(filename, stringify(tokenCache));
      debugMessage({
        message: `TokenCacheOps.saveSaBearerToken: saved token in cache`,
        state: state2
      });
    }
    debugMessage({
      message: `TokenCacheOps.saveSaBearerToken: end`,
      state: state2
    });
    return true;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.saveSaBearerToken: error saving token in cache: ${error}`,
      state: state2
    });
    debugMessage({
      message: error.stack,
      state: state2
    });
    return false;
  }
}
function purge({ state: state2 }) {
  try {
    const filename = getTokenCachePath({ state: state2 });
    debugMessage({
      message: `TokenCacheOps.purge: purging expired tokens from existing token cache: ${filename}`,
      state: state2
    });
    const data = fs5.readFileSync(filename, "utf8");
    const tokenCache = JSON.parse(data);
    const purgedCache = purgeExpiredTokens(tokenCache, state2);
    fs5.writeFileSync(filename, stringify(purgedCache));
    debugMessage({
      message: `TokenCacheOps.purge: end`,
      state: state2
    });
    return purgedCache;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.purge: error purge cache: ${error}`,
      state: state2
    });
    return {};
  }
}
function flush({ state: state2 }) {
  try {
    debugMessage({
      message: `TokenCacheOps.flush: start`,
      state: state2
    });
    const filename = getTokenCachePath({ state: state2 });
    fs5.writeFileSync(filename, stringify({}));
    debugMessage({
      message: `TokenCacheOps.flush: end`,
      state: state2
    });
    return true;
  } catch (error) {
    debugMessage({
      message: `TokenCacheOps.flush: error flushing cache: ${error}`,
      state: state2
    });
    return false;
  }
}

// src/ops/AuthenticateOps.ts
var AuthenticateOps_default = (state2) => {
  return {
    async getTokens(forceLoginAsUser = false, autoRefresh = true, callbackHandler = null) {
      return getTokens({
        forceLoginAsUser,
        autoRefresh,
        callbackHandler,
        state: state2
      });
    },
    // Deprecated
    async getAccessTokenForServiceAccount(saId = void 0, saJwk = void 0) {
      const { access_token } = await getFreshSaBearerToken({
        saId,
        saJwk,
        state: state2
      });
      return access_token;
    }
  };
};
var adminClientPassword = "doesnotmatter";
var redirectUrlTemplate = "/platform/appAuthHelperRedirect.html";
var cloudIdmAdminScopes = "openid fr:idm:* fr:idc:esv:*";
var forgeopsIdmAdminScopes = "openid fr:idm:*";
var serviceAccountDefaultScopes = SERVICE_ACCOUNT_DEFAULT_SCOPES.join(" ");
var fidcClientId = "idmAdminClient";
var forgeopsClientId = "idm-admin-ui";
var adminClientId = fidcClientId;
async function determineCookieName(state2) {
  const data = await getServerInfo({ state: state2 });
  debugMessage({
    message: `AuthenticateOps.determineCookieName: cookieName=${data.cookieName}`,
    state: state2
  });
  return data.cookieName;
}
function checkAndHandle2FA({
  payload,
  otpCallbackHandler,
  state: state2
}) {
  debugMessage({ message: `AuthenticateOps.checkAndHandle2FA: start`, state: state2 });
  if ("callbacks" in payload) {
    for (let callback of payload.callbacks) {
      if (callback.type === "SelectIdPCallback") {
        debugMessage({
          message: `AuthenticateOps.checkAndHandle2FA: Admin federation enabled. Allowed providers:`,
          state: state2
        });
        let localAuth = false;
        for (const value of callback.output[0].value) {
          debugMessage({ message: `${value.provider}`, state: state2 });
          if (value.provider === "localAuthentication") {
            localAuth = true;
          }
        }
        if (localAuth) {
          debugMessage({ message: `local auth allowed`, state: state2 });
          callback.input[0].value = "localAuthentication";
        } else {
          debugMessage({ message: `local auth NOT allowed`, state: state2 });
        }
      }
      if (callback.type === "HiddenValueCallback") {
        if (callback.input[0].value.includes("skip")) {
          callback.input[0].value = "Skip";
        }
        if (callback.input[0].value.includes("webAuthnOutcome")) {
          debugMessage({
            message: `AuthenticateOps.checkAndHandle2FA: end [need2fa=true, unsupported factor: webauthn]`,
            state: state2
          });
          return {
            nextStep: false,
            need2fa: true,
            factor: "WebAuthN",
            supported: false,
            payload
          };
        }
      }
      if (callback.type === "NameCallback") {
        if (callback.output[0].value.includes("code")) {
          debugMessage({
            message: `AuthenticateOps.checkAndHandle2FA: need2fa=true, skippable=false`,
            state: state2
          });
          if (!otpCallbackHandler)
            throw new FrodoError(
              `2fa required but no otpCallback function provided.`
            );
          callback = otpCallbackHandler(callback);
          debugMessage({
            message: `AuthenticateOps.checkAndHandle2FA: end [need2fa=true, skippable=false, factor=Code]`,
            state: state2
          });
          return {
            nextStep: true,
            need2fa: true,
            factor: "Code",
            supported: true,
            payload
          };
        } else {
          callback.input[0].value = state2.getUsername();
        }
      }
      if (callback.type === "PasswordCallback") {
        callback.input[0].value = state2.getPassword();
      }
    }
    debugMessage({
      message: `AuthenticateOps.checkAndHandle2FA: end [need2fa=false]`,
      state: state2
    });
    return {
      nextStep: true,
      need2fa: false,
      factor: "None",
      supported: true,
      payload
    };
  }
  debugMessage({
    message: `AuthenticateOps.checkAndHandle2FA: end [need2fa=false]`,
    state: state2
  });
  return {
    nextStep: false,
    need2fa: false,
    factor: "None",
    supported: true,
    payload
  };
}
function determineDefaultRealm(state2) {
  if (!state2.getRealm() || state2.getRealm() === Constants_default.DEFAULT_REALM_KEY) {
    state2.setRealm(
      Constants_default.DEPLOYMENT_TYPE_REALM_MAP[state2.getDeploymentType()]
    );
  }
}
async function determineDeploymentType(state2) {
  const cookieValue = state2.getCookieValue();
  let deploymentType = state2.getDeploymentType();
  switch (deploymentType) {
    case Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY:
      return deploymentType;
    case Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY:
      adminClientId = forgeopsClientId;
      return deploymentType;
    case Constants_default.CLASSIC_DEPLOYMENT_TYPE_KEY:
      return deploymentType;
    default: {
      if (state2.getUseBearerTokenForAmApis())
        return Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY;
      const verifier = encodeBase64Url(randomBytes(32));
      const challenge = encodeBase64Url(
        createHash("sha256").update(verifier).digest()
      );
      const challengeMethod = "S256";
      const redirectURL = url.resolve(state2.getHost(), redirectUrlTemplate);
      const config = {
        maxRedirects: 0,
        headers: {
          [state2.getCookieName()]: state2.getCookieValue()
        }
      };
      let bodyFormData = `redirect_uri=${redirectURL}&scope=${cloudIdmAdminScopes}&response_type=code&client_id=${fidcClientId}&csrf=${cookieValue}&decision=allow&code_challenge=${challenge}&code_challenge_method=${challengeMethod}`;
      deploymentType = Constants_default.CLASSIC_DEPLOYMENT_TYPE_KEY;
      try {
        await authorize2({
          amBaseUrl: state2.getHost(),
          data: bodyFormData,
          config,
          state: state2
        });
      } catch (e) {
        if (e.response?.status === 302 && e.response.headers?.location?.indexOf("code=") > -1) {
          verboseMessage({
            message: `ForgeRock Identity Cloud`["brightCyan"] + ` detected.`,
            state: state2
          });
          deploymentType = Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY;
        } else {
          try {
            bodyFormData = `redirect_uri=${redirectURL}&scope=${forgeopsIdmAdminScopes}&response_type=code&client_id=${forgeopsClientId}&csrf=${state2.getCookieValue()}&decision=allow&code_challenge=${challenge}&code_challenge_method=${challengeMethod}`;
            await authorize2({
              amBaseUrl: state2.getHost(),
              data: bodyFormData,
              config,
              state: state2
            });
          } catch (ex) {
            if (ex.response?.status === 302 && ex.response.headers?.location?.indexOf("code=") > -1) {
              adminClientId = forgeopsClientId;
              verboseMessage({
                message: `ForgeOps deployment`["brightCyan"] + ` detected.`,
                state: state2
              });
              deploymentType = Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY;
            } else {
              verboseMessage({
                message: `Classic deployment`["brightCyan"] + ` detected.`,
                state: state2
              });
            }
          }
        }
      }
      return deploymentType;
    }
  }
}
function getSemanticVersion(versionInfo) {
  if ("version" in versionInfo) {
    const versionString = versionInfo.version;
    const rx = /([\d]\.[\d]\.[\d](\.[\d])*)/g;
    const version2 = versionString.match(rx);
    return version2[0];
  }
  throw new Error("Cannot extract semantic version from version info object.");
}
async function getFreshUserSessionToken({
  otpCallbackHandler,
  state: state2
}) {
  debugMessage({
    message: `AuthenticateOps.getFreshUserSessionToken: start`,
    state: state2
  });
  const config = {
    headers: {
      "X-OpenAM-Username": state2.getUsername(),
      "X-OpenAM-Password": state2.getPassword()
    }
  };
  let response = await step({ body: {}, config, state: state2 });
  let skip2FA = null;
  let steps = 0;
  const maxSteps = 3;
  do {
    skip2FA = checkAndHandle2FA({
      payload: response,
      otpCallbackHandler,
      state: state2
    });
    if (!skip2FA.supported) {
      throw new Error(`Unsupported 2FA factor: ${skip2FA.factor}`);
    }
    if (skip2FA.nextStep) {
      steps++;
      response = await step({ body: skip2FA.payload, state: state2 });
    }
    if ("tokenId" in response) {
      response["from_cache"] = false;
      const sessionInfo = await getSessionInfo2({
        tokenId: response["tokenId"],
        state: state2
      });
      response["expires"] = Date.parse(sessionInfo.maxIdleExpirationTime);
      debugMessage({
        message: `AuthenticateOps.getFreshUserSessionToken: end [tokenId=${response["tokenId"]}]`,
        state: state2
      });
      debugMessage({
        message: response,
        state: state2
      });
      return response;
    }
  } while (skip2FA.nextStep && steps < maxSteps);
  debugMessage({
    message: `AuthenticateOps.getFreshUserSessionToken: end [no session]`,
    state: state2
  });
  return null;
}
async function getUserSessionToken(otpCallback, state2) {
  debugMessage({
    message: `AuthenticateOps.getUserSessionToken: start`,
    state: state2
  });
  let token = null;
  if (state2.getUseTokenCache() && await hasUserSessionToken({ state: state2 })) {
    try {
      token = await readUserSessionToken({ state: state2 });
      token.from_cache = true;
      debugMessage({
        message: `AuthenticateOps.getUserSessionToken: cached`,
        state: state2
      });
    } catch (error) {
      debugMessage({
        message: `AuthenticateOps.getUserSessionToken: failed cache read`,
        state: state2
      });
    }
  }
  if (!token) {
    token = await getFreshUserSessionToken({
      otpCallbackHandler: otpCallback,
      state: state2
    });
    token.from_cache = false;
    debugMessage({
      message: `AuthenticateOps.getUserSessionToken: fresh`,
      state: state2
    });
  }
  if (state2.getUseTokenCache()) {
    await saveUserSessionToken({ token, state: state2 });
  }
  debugMessage({
    message: `AuthenticateOps.getUserSessionToken: end`,
    state: state2
  });
  return token;
}
async function getAuthCode(redirectURL, codeChallenge, codeChallengeMethod, state2) {
  try {
    const bodyFormData = `redirect_uri=${redirectURL}&scope=${state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY ? cloudIdmAdminScopes : forgeopsIdmAdminScopes}&response_type=code&client_id=${adminClientId}&csrf=${state2.getCookieValue()}&decision=allow&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      maxRedirects: 0
    };
    let response = void 0;
    try {
      response = await authorize2({
        amBaseUrl: state2.getHost(),
        data: bodyFormData,
        config,
        state: state2
      });
    } catch (error) {
      response = error.response;
      if (response.status < 200 || response.status > 399) {
        throw error;
      }
    }
    const redirectLocationURL = response.headers?.location;
    const queryObject = url.parse(redirectLocationURL, true).query;
    if ("code" in queryObject) {
      return queryObject.code;
    }
    throw new FrodoError(`Authz code not found`);
  } catch (error) {
    throw new FrodoError(`Error getting authz code`, error);
  }
}
async function getFreshUserBearerToken({
  state: state2
}) {
  debugMessage({
    message: `AuthenticateOps.getAccessTokenForUser: start`,
    state: state2
  });
  try {
    const verifier = encodeBase64Url(randomBytes(32));
    const challenge = encodeBase64Url(
      createHash("sha256").update(verifier).digest()
    );
    const challengeMethod = "S256";
    const redirectURL = url.resolve(state2.getHost(), redirectUrlTemplate);
    const authCode = await getAuthCode(
      redirectURL,
      challenge,
      challengeMethod,
      state2
    );
    let response = null;
    if (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY) {
      const config = {
        auth: {
          username: adminClientId,
          password: adminClientPassword
        }
      };
      const bodyFormData = `redirect_uri=${redirectURL}&grant_type=authorization_code&code=${authCode}&code_verifier=${verifier}`;
      response = await accessToken2({
        amBaseUrl: state2.getHost(),
        data: bodyFormData,
        config,
        state: state2
      });
    } else {
      const bodyFormData = `client_id=${adminClientId}&redirect_uri=${redirectURL}&grant_type=authorization_code&code=${authCode}&code_verifier=${verifier}`;
      response = await accessToken2({
        amBaseUrl: state2.getHost(),
        data: bodyFormData,
        config: {},
        state: state2
      });
    }
    if ("access_token" in response) {
      debugMessage({
        message: `AuthenticateOps.getAccessTokenForUser: end with token`,
        state: state2
      });
      return response;
    }
    throw new FrodoError(`No access token in response`);
  } catch (error) {
    throw new FrodoError(`Error getting access token for user`, error);
  }
}
async function getUserBearerToken(state2) {
  debugMessage({
    message: `AuthenticateOps.getUserBearerToken: start`,
    state: state2
  });
  let token = null;
  if (state2.getUseTokenCache() && await hasUserBearerToken({ state: state2 })) {
    try {
      token = await readUserBearerToken({ state: state2 });
      token.from_cache = true;
      debugMessage({
        message: `AuthenticateOps.getUserBearerToken: end [cached]`,
        state: state2
      });
    } catch (error) {
      debugMessage({
        message: `AuthenticateOps.getUserBearerToken: end [failed cache read]`,
        state: state2
      });
    }
  }
  if (!token) {
    token = await getFreshUserBearerToken({ state: state2 });
    token.from_cache = false;
    debugMessage({
      message: `AuthenticateOps.getUserBearerToken: end [fresh]`,
      state: state2
    });
  }
  if (state2.getUseTokenCache()) {
    await saveUserBearerToken({ token, state: state2 });
  }
  return token;
}
function createPayload(serviceAccountId, host) {
  const u = parseUrl(host);
  const aud = `${u.origin}:${u.port ? u.port : u.protocol === "https" ? "443" : "80"}${u.pathname}/oauth2/access_token`;
  const exp = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3 + 180);
  const jti = v4();
  const iss = serviceAccountId;
  const sub = serviceAccountId;
  const payload = { iss, sub, aud, exp, jti };
  return payload;
}
async function getFreshSaBearerToken({
  saId = void 0,
  saJwk = void 0,
  state: state2
}) {
  debugMessage({
    message: `AuthenticateOps.getFreshSaBearerToken: start`,
    state: state2
  });
  saId = saId ? saId : state2.getServiceAccountId();
  saJwk = saJwk ? saJwk : state2.getServiceAccountJwk();
  const payload = createPayload(saId, state2.getHost());
  const jwt = await createSignedJwtToken(payload, saJwk);
  const scope = state2.getServiceAccountScope() || serviceAccountDefaultScopes;
  const bodyFormData = `assertion=${jwt}&client_id=service-account&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=${scope}`;
  let response;
  try {
    response = await accessToken2({
      amBaseUrl: state2.getHost(),
      data: bodyFormData,
      config: {},
      state: state2
    });
  } catch (error) {
    const err = error;
    if (err.isHttpError && err.httpErrorText === "invalid_scope" && err.httpDescription?.startsWith("Unsupported scope for service account: ")) {
      const invalidScopes = err.httpDescription.substring(39).split(",");
      const finalScopes = scope.split(" ").filter((el) => {
        return !invalidScopes.includes(el);
      });
      const bodyFormData2 = `assertion=${jwt}&client_id=service-account&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=${finalScopes.join(
        " "
      )}`;
      response = await accessToken2({
        amBaseUrl: state2.getHost(),
        data: bodyFormData2,
        config: {},
        state: state2
      });
    }
  }
  if ("access_token" in response) {
    debugMessage({
      message: `AuthenticateOps.getFreshSaBearerToken: end`,
      state: state2
    });
    return response;
  }
  debugMessage({
    message: `AuthenticateOps.getFreshSaBearerToken: end [No access token in response]`,
    state: state2
  });
  return null;
}
async function getSaBearerToken({
  state: state2
}) {
  try {
    debugMessage({
      message: `AuthenticateOps.getSaBearerToken: start`,
      state: state2
    });
    let token = null;
    if (state2.getUseTokenCache() && await hasSaBearerToken({ state: state2 })) {
      try {
        token = await readSaBearerToken({ state: state2 });
        token.from_cache = true;
        debugMessage({
          message: `AuthenticateOps.getSaBearerToken: end [cached]`,
          state: state2
        });
      } catch (error) {
        debugMessage({
          message: `AuthenticateOps.getSaBearerToken: end [failed cache read]`,
          state: state2
        });
      }
    }
    if (!token) {
      token = await getFreshSaBearerToken({ state: state2 });
      token.from_cache = false;
      debugMessage({
        message: `AuthenticateOps.getSaBearerToken: end [fresh]`,
        state: state2
      });
    }
    if (state2.getUseTokenCache()) {
      await saveSaBearerToken({ token, state: state2 });
    }
    return token;
  } catch (error) {
    throw new FrodoError(
      `Error getting access token for service account`,
      error
    );
  }
}
async function determineDeploymentTypeAndDefaultRealmAndVersion(state2) {
  debugMessage({
    message: `AuthenticateOps.determineDeploymentTypeAndDefaultRealmAndVersion: start`,
    state: state2
  });
  state2.setDeploymentType(await determineDeploymentType(state2));
  determineDefaultRealm(state2);
  debugMessage({
    message: `AuthenticateOps.determineDeploymentTypeAndDefaultRealmAndVersion: realm=${state2.getRealm()}, type=${state2.getDeploymentType()}`,
    state: state2
  });
  const versionInfo = await getServerVersionInfo({ state: state2 });
  debugMessage({ message: `Full version: ${versionInfo.fullVersion}`, state: state2 });
  const version2 = await getSemanticVersion(versionInfo);
  state2.setAmVersion(version2);
  debugMessage({
    message: `AuthenticateOps.determineDeploymentTypeAndDefaultRealmAndVersion: end`,
    state: state2
  });
}
async function getLoggedInSubject(state2) {
  let subjectString = `user ${state2.getUsername()}`;
  if (state2.getUseBearerTokenForAmApis()) {
    try {
      const name2 = (await getServiceAccount({
        serviceAccountId: state2.getServiceAccountId(),
        state: state2
      })).name;
      subjectString = `service account ${name2} [${state2.getServiceAccountId()}]`;
    } catch (error) {
      subjectString = `service account ${state2.getServiceAccountId()}`;
    }
  }
  return subjectString;
}
function scheduleAutoRefresh(forceLoginAsUser, autoRefresh, state2) {
  let timer = state2.getAutoRefreshTimer();
  if (timer) {
    debugMessage({
      message: `AuthenticateOps.scheduleAutoRefresh: cancel existing timer`,
      state: state2
    });
    clearTimeout(timer);
  }
  if (autoRefresh) {
    const expires = state2.getDeploymentType() === Constants_default.CLASSIC_DEPLOYMENT_TYPE_KEY ? state2.getUserSessionTokenMeta()?.expires : state2.getUseBearerTokenForAmApis() ? state2.getBearerTokenMeta()?.expires : Math.min(
      state2.getBearerTokenMeta()?.expires,
      state2.getUserSessionTokenMeta()?.expires
    );
    let timeout3 = expires - Date.now() - 1e3 * 25;
    if (timeout3 < 1e3 * 30) {
      debugMessage({
        message: `Timeout below threshold of 30 seconds (${Math.ceil(
          timeout3 / 1e3
        )}), resetting timeout to 10ms.`,
        state: state2
      });
      if (timeout3 < 10)
        timeout3 = 10;
    }
    debugMessage({
      message: `AuthenticateOps.scheduleAutoRefresh: set new timer [${Math.floor(
        timeout3 / 1e3
      )}s (${new Date(timeout3).getMinutes()}m ${new Date(
        timeout3
      ).getSeconds()}s)]`,
      state: state2
    });
    timer = setTimeout(getTokens, timeout3, {
      forceLoginAsUser,
      autoRefresh,
      state: state2
      // Volker's Visual Studio Code doesn't want to have it any other way.
    });
    state2.setAutoRefreshTimer(timer);
    timer.unref();
  }
}
async function getTokens({
  forceLoginAsUser = false,
  autoRefresh = true,
  callbackHandler = null,
  state: state2
}) {
  debugMessage({ message: `AuthenticateOps.getTokens: start`, state: state2 });
  if (!state2.getHost()) {
    throw new FrodoError(`No host specified`);
  }
  let usingConnectionProfile = false;
  try {
    if (state2.getUsername() == null && state2.getPassword() == null && !state2.getServiceAccountId() && !state2.getServiceAccountJwk()) {
      const conn = await getConnectionProfile({ state: state2 });
      usingConnectionProfile = true;
      state2.setHost(conn.tenant);
      state2.setDeploymentType(conn.deploymentType);
      state2.setUsername(conn.username);
      state2.setPassword(conn.password);
      state2.setAuthenticationService(conn.authenticationService);
      state2.setAuthenticationHeaderOverrides(
        conn.authenticationHeaderOverrides
      );
      state2.setServiceAccountId(conn.svcacctId);
      state2.setServiceAccountJwk(conn.svcacctJwk);
      state2.setServiceAccountScope(conn.svcacctScope);
    }
    if (!isValidUrl(state2.getHost())) {
      const conn = await getConnectionProfile({ state: state2 });
      state2.setHost(conn.tenant);
      state2.setDeploymentType(conn.deploymentType);
    }
    state2.setCookieName(await determineCookieName(state2));
    if (!forceLoginAsUser && state2.getServiceAccountId() && state2.getServiceAccountJwk()) {
      debugMessage({
        message: `AuthenticateOps.getTokens: Authenticating with service account ${state2.getServiceAccountId()}`,
        state: state2
      });
      try {
        const token = await getSaBearerToken({ state: state2 });
        state2.setBearerTokenMeta(token);
        if (usingConnectionProfile && !token.from_cache) {
          saveConnectionProfile({ host: state2.getHost(), state: state2 });
        }
        state2.setUseBearerTokenForAmApis(true);
        await determineDeploymentTypeAndDefaultRealmAndVersion(state2);
      } catch (saErr) {
        throw new FrodoError(`Service account login error`, saErr);
      }
    } else if (state2.getUsername() && state2.getPassword()) {
      debugMessage({
        message: `AuthenticateOps.getTokens: Authenticating with user account ${state2.getUsername()}`,
        state: state2
      });
      const token = await getUserSessionToken(callbackHandler, state2);
      if (token)
        state2.setUserSessionTokenMeta(token);
      await determineDeploymentTypeAndDefaultRealmAndVersion(state2);
      if (state2.getCookieValue() && // !state.getBearerToken() &&
      (state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY || state2.getDeploymentType() === Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY)) {
        const accessToken3 = await getUserBearerToken(state2);
        if (accessToken3)
          state2.setBearerTokenMeta(accessToken3);
      }
    } else {
      throw new FrodoError(`Incomplete or no credentials`);
    }
    if (state2.getCookieValue() || state2.getUseBearerTokenForAmApis() && state2.getBearerToken()) {
      if (state2.getBearerTokenMeta()?.from_cache) {
        verboseMessage({ message: `Using cached bearer token.`, state: state2 });
      }
      if (!state2.getUseBearerTokenForAmApis() && state2.getUserSessionTokenMeta()?.from_cache) {
        verboseMessage({ message: `Using cached session token.`, state: state2 });
      }
      scheduleAutoRefresh(forceLoginAsUser, autoRefresh, state2);
      const tokens = {
        bearerToken: state2.getBearerTokenMeta(),
        userSessionToken: state2.getUserSessionTokenMeta(),
        subject: await getLoggedInSubject(state2),
        host: state2.getHost(),
        realm: state2.getRealm() ? state2.getRealm() : "root"
      };
      debugMessage({
        message: `AuthenticateOps.getTokens: end with tokens`,
        state: state2
      });
      return tokens;
    }
  } catch (error) {
    throw new FrodoError(`Error getting tokens`, error);
  }
}

// src/api/AuthenticationSettingsApi.ts
import util18 from "util";
var authenticationSettingsURLTemplate = "%s/json%s/realm-config/authentication";
var apiVersion12 = "resource=1.0";
var getApiConfig13 = () => {
  return {
    apiVersion: apiVersion12
  };
};
async function getAuthenticationSettings({
  state: state2
}) {
  debugMessage({
    message: `AuthenticationSettingsApi.getAuthenticationSettings: start`,
    state: state2
  });
  const urlString = util18.format(
    authenticationSettingsURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig13(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  debugMessage({
    message: `AuthenticationSettingsApi.getAuthenticationSettings: end`,
    state: state2
  });
  return data;
}
async function putAuthenticationSettings({
  settings,
  state: state2
}) {
  debugMessage({
    message: `AuthenticationSettingsApi.putAuthenticationSettings: start`,
    state: state2
  });
  const urlString = util18.format(
    authenticationSettingsURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig13(), state: state2 }).put(
    urlString,
    settings,
    {
      withCredentials: true
    }
  );
  debugMessage({
    message: `AuthenticationSettingsApi.putAuthenticationSettings: end`,
    state: state2
  });
  return data;
}

// src/ops/AuthenticationSettingsOps.ts
var AuthenticationSettingsOps_default = (state2) => {
  return {
    async readAuthenticationSettings() {
      return readAuthenticationSettings({ state: state2 });
    },
    async updateAuthenticationSettings(settings) {
      return updateAuthenticationSettings({
        settings,
        state: state2
      });
    },
    async exportAuthenticationSettings() {
      return exportAuthenticationSettings({ state: state2 });
    },
    async importAuthenticationSettings(importData) {
      return importAuthenticationSettings({ importData, state: state2 });
    }
  };
};
function createAuthenticationSettingsExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    authentication: {}
  };
}
async function readAuthenticationSettings({
  state: state2
}) {
  try {
    const settings = await getAuthenticationSettings({ state: state2 });
    return settings;
  } catch (error) {
    throw new FrodoError(`Error reading authentication settings`, error);
  }
}
async function updateAuthenticationSettings({
  settings,
  state: state2
}) {
  try {
    debugMessage({
      message: `AuthenticationSettingsOps.updateAuthenticationSettings: start`,
      state: state2
    });
    const response = await putAuthenticationSettings({
      settings,
      state: state2
    });
    debugMessage({
      message: `AuthenticationSettingsOps.updateAuthenticationSettings: end`,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(`Error updating authentication settings`, error);
  }
}
async function exportAuthenticationSettings({
  state: state2
}) {
  try {
    debugMessage({
      message: `AuthenticationSettingsOps.exportAuthenticationSettings: start`,
      state: state2
    });
    const settingsData = await readAuthenticationSettings({ state: state2 });
    const exportData = createAuthenticationSettingsExportTemplate({ state: state2 });
    exportData.authentication = settingsData;
    debugMessage({
      message: `AuthenticationSettingsOps.exportAuthenticationSettings: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting authentication settings`, error);
  }
}
async function importAuthenticationSettings({
  importData,
  state: state2
}) {
  let response = null;
  try {
    response = await updateAuthenticationSettings({
      settings: importData.authentication,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(`Error reading authentication settings`, error);
  }
}

// src/api/cloud/AdminFederationProvidersApi.ts
import util19 from "util";
var providerByTypeAndIdURLTemplate = "%s/json%s/realm-config/services/SocialIdentityProviders/%s/%s";
var getAllProvidersURLTemplate = "%s/json%s/realm-config/services/SocialIdentityProviders?_action=nextdescendents";
var apiVersion13 = "protocol=2.1,resource=1.0";
var getApiConfig14 = () => {
  const configPath = getRealmPath("/");
  return {
    path: `${configPath}/realm-config/services/SocialIdentityProviders`,
    apiVersion: apiVersion13
  };
};
async function getAdminFederationProviders({
  state: state2
}) {
  const urlString = util19.format(
    getAllProvidersURLTemplate,
    state2.getHost(),
    getRealmPath("/")
  );
  const { data } = await generateAmApi({
    resource: getApiConfig14(),
    state: state2
  }).post(
    urlString,
    {},
    {
      withCredentials: true
    }
  );
  return data;
}
async function putProviderByTypeAndId({
  providerType,
  providerId,
  providerData,
  state: state2
}) {
  const cleanData = deleteDeepByKey(providerData, "-encrypted");
  const urlString = util19.format(
    providerByTypeAndIdURLTemplate,
    state2.getHost(),
    getRealmPath("/"),
    providerType,
    providerId
  );
  const { data } = await generateAmApi({ resource: getApiConfig14(), state: state2 }).put(
    urlString,
    cleanData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteProviderByTypeAndId({
  providerType,
  providerId,
  state: state2
}) {
  const urlString = util19.format(
    providerByTypeAndIdURLTemplate,
    state2.getHost(),
    getRealmPath("/"),
    providerType,
    providerId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig14(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/cloud/AdminFederationOps.ts
var AdminFederationOps_default = (state2) => {
  return {
    createAdminFederationExportTemplate() {
      return createAdminFederationExportTemplate({ state: state2 });
    },
    async readAdminFederationProviders() {
      return readAdminFederationProviders({ state: state2 });
    },
    async readAdminFederationProvider(providerId) {
      return readAdminFederationProvider({ providerId, state: state2 });
    },
    async createAdminFederationProvider(providerType, providerData, providerId) {
      return createAdminFederationProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    },
    async updateAdminFederationProvider(providerType, providerId, providerData) {
      return updateAdminFederationProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    },
    async deleteAdminFederationProvider(providerId) {
      return deleteAdminFederationProvider({ providerId, state: state2 });
    },
    async exportAdminFederationProvider(providerId) {
      return exportAdminFederationProvider({ providerId, state: state2 });
    },
    async exportAdminFederationProviders() {
      return exportAdminFederationProviders({ state: state2 });
    },
    async importAdminFederationProvider(providerId, importData) {
      return importAdminFederationProvider({
        providerId,
        importData,
        state: state2
      });
    },
    async importFirstAdminFederationProvider(importData) {
      return importFirstAdminFederationProvider({
        importData,
        state: state2
      });
    },
    async importAdminFederationProviders(importData) {
      return importAdminFederationProviders({ importData, state: state2 });
    },
    // Deprecated
    async getAdminFederationProviders() {
      return readAdminFederationProviders({ state: state2 });
    },
    async getAdminFederationProvider(providerId) {
      return readAdminFederationProvider({ providerId, state: state2 });
    },
    async putProviderByTypeAndId(providerType, providerId, providerData) {
      return updateAdminFederationProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    }
  };
};
var ADMIN_FED_CONFIG_ID_PREFIX = "fidc/federation-";
function createAdminFederationExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    config: {},
    idp: {}
  };
}
async function readAdminFederationProviders({
  state: state2
}) {
  try {
    const { result } = await getAdminFederationProviders({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading admin federation providers.`, error);
  }
}
async function readAdminFederationProvider({
  providerId,
  state: state2
}) {
  const response = await readAdminFederationProviders({ state: state2 });
  const foundProviders = response.filter(
    (provider) => provider._id === providerId
  );
  switch (foundProviders.length) {
    case 1:
      return foundProviders[0];
    case 0:
      throw new FrodoError(
        `Admin federation provider '${providerId}' not found`
      );
    default:
      throw new FrodoError(
        `${foundProviders.length} admin federation providers '${providerId}' found`
      );
  }
}
async function createAdminFederationProvider({
  providerType,
  providerId,
  providerData,
  state: state2
}) {
  debugMessage({
    message: `AdminFederationOps.createAdminFederationProvider: start`,
    state: state2
  });
  try {
    await readAdminFederationProvider({ providerId, state: state2 });
  } catch (error) {
    const result = await updateAdminFederationProvider({
      providerType,
      providerId,
      providerData,
      state: state2
    });
    debugMessage({
      message: `AdminFederationOps.createAdminFederationProvider: end`,
      state: state2
    });
    return result;
  }
  throw new FrodoError(
    `Admin federation provider ${providerId} already exists!`
  );
}
async function updateAdminFederationProvider({
  providerType,
  providerId,
  providerData,
  state: state2
}) {
  debugMessage({
    message: `AdminFederationOps.putProviderByTypeAndId: start`,
    state: state2
  });
  try {
    const response = await putProviderByTypeAndId({
      providerType,
      providerId,
      providerData,
      state: state2
    });
    debugMessage({
      message: `AdminFederationOps.putProviderByTypeAndId: end`,
      state: state2
    });
    return response;
  } catch (importError) {
    if (importError.response?.status === 400 && importError.response?.data?.message === "Invalid attribute specified.") {
      const { validAttributes } = importError.response.data.detail;
      validAttributes.push("_id", "_type");
      for (const attribute of Object.keys(providerData)) {
        if (!validAttributes.includes(attribute)) {
          debugMessage({
            message: `Removing invalid attribute: ${attribute}`,
            state: state2
          });
          delete providerData[attribute];
        }
      }
      const response = await putProviderByTypeAndId({
        providerType,
        providerId,
        providerData,
        state: state2
      });
      debugMessage({
        message: `AdminFederationOps.putProviderByTypeAndId: end (after retry)`,
        state: state2
      });
      return response;
    } else {
      throw new FrodoError(
        `Error updating admin federation provider`,
        importError
      );
    }
  }
}
async function deleteAdminFederationProvider({
  providerId,
  state: state2
}) {
  const response = await readAdminFederationProviders({ state: state2 });
  const foundProviders = response.filter(
    (provider) => provider._id === providerId
  );
  switch (foundProviders.length) {
    case 1:
      return await deleteProviderByTypeAndId({
        providerType: foundProviders[0]._type._id,
        providerId: foundProviders[0]._id,
        state: state2
      });
    case 0:
      throw new FrodoError(`Provider '${providerId}' not found`);
    default:
      throw new FrodoError(
        `${foundProviders.length} providers '${providerId}' found`
      );
  }
}
async function exportAdminFederationProvider({
  providerId,
  state: state2
}) {
  debugMessage({
    message: `AdminFederationOps.exportAdminFederationProvider: start`,
    state: state2
  });
  const exportData = createAdminFederationExportTemplate({ state: state2 });
  const errors = [];
  try {
    const idpData = await readAdminFederationProvider({ providerId, state: state2 });
    exportData.idp[idpData._id] = idpData;
    const idpConfig = await getConfigEntity({
      entityId: `${ADMIN_FED_CONFIG_ID_PREFIX}${providerId}`,
      state: state2
    });
    exportData.config[idpConfig._id] = idpConfig;
  } catch (error) {
    errors.push(error);
  }
  if (errors.length) {
    throw new FrodoError(
      `Error exporting admin federation provider ${providerId}`,
      errors
    );
  }
  debugMessage({
    message: `AdminFederationOps.exportAdminFederationProvider: end`,
    state: state2
  });
  return exportData;
}
async function exportAdminFederationProviders({
  state: state2
}) {
  debugMessage({
    message: `AdminFederationOps.exportAdminFederationProviders: start`,
    state: state2
  });
  const exportData = createAdminFederationExportTemplate({ state: state2 });
  const errors = [];
  try {
    const allIdpsData = await readAdminFederationProviders({ state: state2 });
    for (const idpData of allIdpsData) {
      try {
        exportData.idp[idpData._id] = idpData;
        const idpConfig = await getConfigEntity({
          entityId: `${ADMIN_FED_CONFIG_ID_PREFIX}${idpData._id}`,
          state: state2
        });
        exportData.config[idpConfig._id] = idpConfig;
      } catch (error) {
        errors.push(error);
      }
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length) {
    throw new FrodoError(`Error exporting admin federation providers`, errors);
  }
  debugMessage({
    message: `AdminFederationOps.exportAdminFederationProviders: end`,
    state: state2
  });
  return exportData;
}
async function importAdminFederationProvider({
  providerId,
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const idpId of Object.keys(importData.idp)) {
    if (idpId === providerId) {
      try {
        response = await updateAdminFederationProvider({
          providerType: importData.idp[idpId]._type._id,
          providerId: idpId,
          providerData: importData.idp[idpId],
          state: state2
        });
        const configId = `${ADMIN_FED_CONFIG_ID_PREFIX}${idpId}`;
        if (importData.config[configId]) {
          await putConfigEntity({
            entityId: configId,
            entityData: importData.config[configId],
            state: state2
          });
        }
        imported.push(idpId);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length) {
    throw new FrodoError(
      `Error importing admin federation provider ${providerId}`,
      errors
    );
  }
  if (0 === imported.length) {
    throw new FrodoError(
      `Admin federation provider ${providerId} not found in import data!`
    );
  }
  return response;
}
async function importFirstAdminFederationProvider({
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const idpId of Object.keys(importData.idp)) {
    try {
      response = await updateAdminFederationProvider({
        providerType: importData.idp[idpId]._type._id,
        providerId: idpId,
        providerData: importData.idp[idpId],
        state: state2
      });
      const configId = `${ADMIN_FED_CONFIG_ID_PREFIX}${idpId}`;
      if (importData.config[configId]) {
        await putConfigEntity({
          entityId: configId,
          entityData: importData.config[configId],
          state: state2
        });
      }
      imported.push(idpId);
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length) {
    throw new FrodoError(
      `Error importing first admin federation provider`,
      errors
    );
  }
  if (0 === imported.length) {
    throw new FrodoError(`No admin federation providers found in import data`);
  }
  return response;
}
async function importAdminFederationProviders({
  importData,
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const idpId of Object.keys(importData.idp)) {
    try {
      response.push(
        await updateAdminFederationProvider({
          providerType: importData.idp[idpId]._type._id,
          providerId: idpId,
          providerData: importData.idp[idpId],
          state: state2
        })
      );
      const configId = `${ADMIN_FED_CONFIG_ID_PREFIX}${idpId}`;
      if (importData.config[configId]) {
        await putConfigEntity({
          entityId: configId,
          entityData: importData.config[configId],
          state: state2
        });
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length) {
    throw new FrodoError(`Error importing admin federation providers`, errors);
  }
  return response;
}

// src/api/cloud/LogApi.ts
import util20 from "util";
var logsTailURLTemplate = "%s/monitoring/logs/tail?source=%s";
var logsFetchURLTemplate = "%s/monitoring/logs?source=%s&beginTime=%s&endTime=%s";
var logsSourcesURLTemplate = "%s/monitoring/logs/sources";
var logsCreateAPIKeyAndSecretURLTemplate = "%s/keys?_action=create";
var logsGetAPIKeysURLTemplate = "%s/keys";
var logsAPIKeyURLTemplate = "%s/keys/%s";
async function getLogApiKey({
  keyId,
  state: state2
}) {
  const urlString = util20.format(
    logsAPIKeyURLTemplate,
    getHostBaseUrl(state2.getHost()),
    keyId
  );
  const { data } = await generateLogKeysApi({ state: state2 }).get(urlString);
  return data;
}
async function getLogApiKeys({
  state: state2
}) {
  const urlString = util20.format(
    logsGetAPIKeysURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateLogKeysApi({ state: state2 }).get(urlString);
  return data;
}
async function getSources({
  state: state2
}) {
  const urlString = util20.format(
    logsSourcesURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateLogApi({ state: state2 }).get(urlString);
  return data;
}
async function isLogApiKeyValid({
  keyId,
  secret,
  state: state2
}) {
  try {
    const requestOverride = {
      headers: {
        "X-API-Key": keyId,
        "X-API-Secret": secret
      }
    };
    const urlString = util20.format(
      logsSourcesURLTemplate,
      getHostBaseUrl(state2.getHost())
    );
    await generateLogApi({ requestOverride, state: state2 }).get(urlString);
    return true;
  } catch (error) {
    return false;
  }
}
async function createLogApiKey({
  keyName,
  state: state2
}) {
  const urlString = util20.format(
    logsCreateAPIKeyAndSecretURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateLogKeysApi({ state: state2 }).post(urlString, {
    name: keyName
  });
  return data;
}
async function deleteLogApiKey({
  keyId,
  state: state2
}) {
  const urlString = util20.format(
    logsAPIKeyURLTemplate,
    getHostBaseUrl(state2.getHost()),
    keyId
  );
  const { data } = await generateLogKeysApi({ state: state2 }).delete(urlString, {
    withCredentials: true
  });
  return data;
}
async function tail({
  source,
  cookie,
  state: state2
}) {
  let urlString = util20.format(
    logsTailURLTemplate,
    getHostBaseUrl(state2.getHost()),
    encodeURIComponent(source)
  );
  if (cookie) {
    urlString += `&_pagedResultsCookie=${encodeURIComponent(cookie)}`;
  }
  const { data } = await generateLogApi({ state: state2 }).get(urlString);
  return data;
}
async function fetch({
  source,
  startTs,
  endTs,
  cookie,
  state: state2
}) {
  let urlString = util20.format(
    logsFetchURLTemplate,
    getHostBaseUrl(state2.getHost()),
    encodeURIComponent(source),
    startTs,
    endTs
  );
  if (cookie) {
    urlString += `&_pagedResultsCookie=${encodeURIComponent(cookie)}`;
  }
  const { data } = await generateLogApi({
    state: state2,
    requestOverride: { timeout: 6e4 }
  }).get(urlString);
  return data;
}

// src/ops/cloud/LogOps.ts
var LogOps_default = (state2) => {
  return {
    getDefaultNoiseFilter() {
      return getDefaultNoiseFilter();
    },
    resolveLevel(level) {
      return resolveLevel(level);
    },
    resolvePayloadLevel(log) {
      return resolvePayloadLevel(log);
    },
    async getLogSources() {
      return getLogSources({ state: state2 });
    },
    async getLogApiKey(keyId) {
      return getLogApiKey2({ keyId, state: state2 });
    },
    async isLogApiKeyValid(keyId, secret) {
      return isLogApiKeyValid2({ keyId, secret, state: state2 });
    },
    async getLogApiKeys() {
      return getLogApiKeys2({ state: state2 });
    },
    async createLogApiKey(keyName) {
      return createLogApiKey2({ keyName, state: state2 });
    },
    async deleteLogApiKey(keyId) {
      return deleteLogApiKey2({ keyId, state: state2 });
    },
    async deleteLogApiKeys() {
      return deleteLogApiKeys({ state: state2 });
    },
    tail(source, cookie) {
      return tail2({ source, cookie, state: state2 });
    },
    async fetch(source, startTs, endTs, cookie) {
      return fetch2({ source, startTs, endTs, cookie, state: state2 });
    }
  };
};
var miscNoise = [
  "com.iplanet.dpro.session.operations.ServerSessionOperationStrategy",
  "com.iplanet.dpro.session.SessionIDFactory",
  "com.iplanet.dpro.session.share.SessionEncodeURL",
  "com.iplanet.services.naming.WebtopNaming",
  "com.iplanet.sso.providers.dpro.SSOProviderImpl",
  "com.sun.identity.authentication.AuthContext",
  "com.sun.identity.authentication.client.AuthClientUtils",
  "com.sun.identity.authentication.config.AMAuthConfigType",
  "com.sun.identity.authentication.config.AMAuthenticationManager",
  "com.sun.identity.authentication.config.AMAuthLevelManager",
  "com.sun.identity.authentication.config.AMConfiguration",
  "com.sun.identity.authentication.jaas.LoginContext",
  "com.sun.identity.authentication.modules.application.Application",
  "com.sun.identity.authentication.server.AuthContextLocal",
  "com.sun.identity.authentication.service.AMLoginContext",
  "com.sun.identity.authentication.service.AuthContextLookup",
  "com.sun.identity.authentication.service.AuthD",
  "com.sun.identity.authentication.service.AuthUtils",
  "com.sun.identity.authentication.service.DSAMECallbackHandler",
  "com.sun.identity.authentication.service.LoginState",
  "com.sun.identity.authentication.spi.AMLoginModule",
  "com.sun.identity.delegation.DelegationEvaluatorImpl",
  "com.sun.identity.idm.plugins.internal.AgentsRepo",
  "com.sun.identity.idm.server.IdCachedServicesImpl",
  "com.sun.identity.idm.server.IdRepoPluginsCache",
  "com.sun.identity.idm.server.IdServicesImpl",
  "com.sun.identity.log.spi.ISDebug",
  "com.sun.identity.shared.encode.CookieUtils",
  "com.sun.identity.sm.ldap.SMSLdapObject",
  "com.sun.identity.sm.CachedSMSEntry",
  "com.sun.identity.sm.CachedSubEntries",
  "com.sun.identity.sm.DNMapper",
  "com.sun.identity.sm.ServiceConfigImpl",
  "com.sun.identity.sm.ServiceConfigManagerImpl",
  "com.sun.identity.sm.SMSEntry",
  "com.sun.identity.sm.SMSUtils",
  "com.sun.identity.sm.SmsWrapperObject",
  "oauth2",
  "org.apache.http.client.protocol.RequestAuthCache",
  "org.apache.http.impl.conn.PoolingHttpClientConnectionManager",
  "org.apache.http.impl.nio.client.InternalHttpAsyncClient",
  "org.apache.http.impl.nio.client.InternalIODispatch",
  "org.apache.http.impl.nio.client.MainClientExec",
  "org.apache.http.impl.nio.conn.ManagedNHttpClientConnectionImpl",
  "org.apache.http.impl.nio.conn.PoolingNHttpClientConnectionManager",
  "org.forgerock.audit.AuditServiceImpl",
  "org.forgerock.oauth2.core.RealmOAuth2ProviderSettings",
  "org.forgerock.openam.authentication.service.JAASModuleDetector",
  "org.forgerock.openam.authentication.service.LoginContextFactory",
  "org.forgerock.openam.blacklist.BloomFilterBlacklist",
  "org.forgerock.openam.blacklist.CTSBlacklist",
  "org.forgerock.openam.core.realms.impl.CachingRealmLookup",
  "org.forgerock.openam.core.rest.authn.RestAuthCallbackHandlerManager",
  "org.forgerock.openam.core.rest.authn.trees.AuthTrees",
  "org.forgerock.openam.cors.CorsFilter",
  "org.forgerock.openam.cts.CTSPersistentStoreImpl",
  "org.forgerock.openam.cts.impl.CoreTokenAdapter",
  "org.forgerock.openam.cts.impl.queue.AsyncResultHandler",
  "org.forgerock.openam.cts.reaper.ReaperDeleteOnQueryResultHandler",
  "org.forgerock.openam.headers.DisableSameSiteCookiesFilter",
  "org.forgerock.openam.idrepo.ldap.DJLDAPv3Repo",
  "org.forgerock.openam.rest.CsrfFilter",
  "org.forgerock.openam.rest.restAuthenticationFilter",
  "org.forgerock.openam.rest.fluent.CrestLoggingFilter",
  "org.forgerock.openam.session.cts.CtsOperations",
  "org.forgerock.openam.session.stateless.StatelessSessionManager",
  "org.forgerock.openam.sm.datalayer.impl.ldap.ExternalLdapConfig",
  "org.forgerock.openam.sm.datalayer.impl.ldap.LdapQueryBuilder",
  "org.forgerock.openam.sm.datalayer.impl.SeriesTaskExecutor",
  "org.forgerock.openam.sm.datalayer.impl.SeriesTaskExecutorThread",
  "org.forgerock.openam.sm.datalayer.providers.LdapConnectionFactoryProvider",
  "org.forgerock.openam.sm.file.ConfigFileSystemHandler",
  "org.forgerock.openam.social.idp.SocialIdentityProviders",
  "org.forgerock.openam.utils.ClientUtils",
  "org.forgerock.opendj.ldap.CachedConnectionPool",
  "org.forgerock.opendj.ldap.LoadBalancer",
  "org.forgerock.secrets.keystore.KeyStoreSecretStore",
  "org.forgerock.secrets.propertyresolver.PropertyResolverSecretStore",
  "org.forgerock.secrets.SecretsProvider"
];
var journeysNoise = [
  "org.forgerock.openam.auth.trees.engine.AuthTreeExecutor"
];
var samlNoise = [
  "com.sun.identity.cot.COTCache",
  "com.sun.identity.plugin.configuration.impl.ConfigurationInstanceImpl",
  "com.sun.identity.saml2.meta.SAML2MetaCache",
  "com.sun.identity.saml2.profile.CacheCleanUpRunnable",
  "org.apache.xml.security.keys.KeyInfo",
  "org.apache.xml.security.signature.XMLSignature",
  "org.apache.xml.security.utils.SignerOutputStream",
  "org.apache.xml.security.utils.resolver.ResourceResolver",
  "org.apache.xml.security.utils.resolver.implementations.ResolverFragment",
  "org.apache.xml.security.algorithms.JCEMapper",
  "org.apache.xml.security.algorithms.implementations.SignatureBaseRSA",
  "org.apache.xml.security.algorithms.SignatureAlgorithm",
  "org.apache.xml.security.utils.ElementProxy",
  "org.apache.xml.security.transforms.Transforms",
  "org.apache.xml.security.utils.DigesterOutputStream",
  "org.apache.xml.security.signature.Reference",
  "org.apache.xml.security.signature.Manifest"
];
var noise = miscNoise.concat(samlNoise).concat(journeysNoise);
var numLogLevelMap = {
  0: ["SEVERE", "ERROR", "FATAL"],
  1: ["WARNING", "WARN", "CONFIG"],
  2: ["INFO", "INFORMATION"],
  3: ["DEBUG", "FINE", "FINER", "FINEST"],
  4: ["ALL"]
};
var logLevelMap = {
  SEVERE: ["SEVERE", "ERROR", "FATAL"],
  ERROR: ["SEVERE", "ERROR", "FATAL"],
  FATAL: ["SEVERE", "ERROR", "FATAL"],
  WARN: ["SEVERE", "ERROR", "FATAL", "WARNING", "WARN", "CONFIG"],
  WARNING: ["SEVERE", "ERROR", "FATAL", "WARNING", "WARN", "CONFIG"],
  CONFIG: ["SEVERE", "ERROR", "FATAL", "WARNING", "WARN", "CONFIG"],
  INFO: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION"
  ],
  INFORMATION: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION"
  ],
  DEBUG: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION",
    "DEBUG",
    "FINE",
    "FINER",
    "FINEST"
  ],
  FINE: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION",
    "DEBUG",
    "FINE",
    "FINER",
    "FINEST"
  ],
  FINER: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION",
    "DEBUG",
    "FINE",
    "FINER",
    "FINEST"
  ],
  FINEST: [
    "SEVERE",
    "ERROR",
    "FATAL",
    "WARNING",
    "WARN",
    "CONFIG",
    "INFO",
    "INFORMATION",
    "DEBUG",
    "FINE",
    "FINER",
    "FINEST"
  ],
  ALL: ["ALL"]
};
function getDefaultNoiseFilter() {
  return noise;
}
function resolveLevel(level) {
  if (Number.isNaN(parseInt(level, 10))) {
    return logLevelMap[level];
  }
  return logLevelMap[numLogLevelMap[level][0]];
}
function resolvePayloadLevel(log) {
  try {
    return log.type !== "text/plain" ? log.payload.level : log.payload.match(/^([^:]*):/)[1];
  } catch (e) {
    return null;
  }
}
async function getLogSources({ state: state2 }) {
  try {
    const { result } = await getSources({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error getting log sources`, error);
  }
}
async function getLogApiKey2({
  keyId,
  state: state2
}) {
  try {
    return getLogApiKey({ keyId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error getting log api key ${keyId}`, error);
  }
}
async function isLogApiKeyValid2({
  keyId,
  secret,
  state: state2
}) {
  try {
    return isLogApiKeyValid({ keyId, secret, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error validating log api key ${keyId}`, error);
  }
}
async function getLogApiKeys2({
  state: state2
}) {
  try {
    const { result } = await getLogApiKeys({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error getting log api keys`, error);
  }
}
async function createLogApiKey2({
  keyName,
  state: state2
}) {
  try {
    return createLogApiKey({ keyName, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error creating log api key ${keyName}`, error);
  }
}
async function deleteLogApiKey2({
  keyId,
  state: state2
}) {
  try {
    const key = await getLogApiKey2({ keyId, state: state2 });
    await deleteLogApiKey({ keyId, state: state2 });
    return key;
  } catch (error) {
    throw new FrodoError(`Error deleting log api key ${keyId}`, error);
  }
}
async function deleteLogApiKeys({
  state: state2
}) {
  const responses = [];
  const errors = [];
  try {
    const keys3 = await getLogApiKeys2({ state: state2 });
    for (const key of keys3) {
      try {
        await deleteLogApiKey2({
          keyId: key.api_key_id,
          state: state2
        });
        responses.push(key);
      } catch (error) {
        errors.push(error);
      }
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length) {
    throw new FrodoError(`Error deleting log api keys`, errors);
  }
  return responses;
}
async function tail2({
  source,
  cookie,
  state: state2
}) {
  try {
    return tail({ source, cookie, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error tailing logs`, error);
  }
}
async function fetch2({
  source,
  startTs,
  endTs,
  cookie,
  state: state2
}) {
  try {
    return fetch({ source, startTs, endTs, cookie, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error fetching logs`, error);
  }
}

// src/ops/cloud/SecretsOps.ts
var SecretsOps_default = (state2) => {
  return {
    async readSecrets() {
      return readSecrets({ state: state2 });
    },
    async readSecret(secretId) {
      return readSecret({ secretId, state: state2 });
    },
    async exportSecret(secretId) {
      return exportSecret({ secretId, state: state2 });
    },
    async exportSecrets() {
      return exportSecrets({ state: state2 });
    },
    async createSecret(secretId, value, description, encoding = "generic", useInPlaceholders = true) {
      return createSecret({
        secretId,
        value,
        description,
        encoding,
        useInPlaceholders,
        state: state2
      });
    },
    async updateSecretDescription(secretId, description) {
      return setSecretDescription({ secretId, description, state: state2 });
    },
    async deleteSecret(secretId) {
      return deleteSecret({ secretId, state: state2 });
    },
    async readVersionsOfSecret(secretId) {
      return getSecretVersions({ secretId, state: state2 });
    },
    async createVersionOfSecret(secretId, value) {
      return createVersionOfSecret({ secretId, value, state: state2 });
    },
    async readVersionOfSecret(secretId, version2) {
      return getVersionOfSecret({ secretId, version: version2, state: state2 });
    },
    async enableVersionOfSecret(secretId, version2) {
      return enableVersionOfSecret({
        secretId,
        version: version2,
        state: state2
      });
    },
    async disableVersionOfSecret(secretId, version2) {
      return disableVersionOfSecret({
        secretId,
        version: version2,
        state: state2
      });
    },
    async deleteVersionOfSecret(secretId, version2) {
      return deleteVersionOfSecret({ secretId, version: version2, state: state2 });
    },
    // Deprecated
    async getSecrets() {
      return readSecrets({ state: state2 });
    },
    async getSecret(secretId) {
      return getSecret({ secretId, state: state2 });
    },
    async putSecret(secretId, value, description, encoding = "generic", useInPlaceholders = true) {
      return putSecret({
        secretId,
        value: getEncodedValue(value, encoding, state2),
        description,
        encoding,
        useInPlaceholders,
        state: state2
      });
    },
    async setSecretDescription(secretId, description) {
      return setSecretDescription({ secretId, description, state: state2 });
    },
    async getSecretVersions(secretId) {
      return getSecretVersions({ secretId, state: state2 });
    },
    async createNewVersionOfSecret(secretId, value) {
      return createNewVersionOfSecret({ secretId, value, state: state2 });
    },
    async getVersionOfSecret(secretId, version2) {
      return getVersionOfSecret({ secretId, version: version2, state: state2 });
    },
    async setStatusOfVersionOfSecret(secretId, version2, status) {
      return setStatusOfVersionOfSecret({
        secretId,
        version: version2,
        status,
        state: state2
      });
    }
  };
};
function getEncodedValue(value, encoding, state2) {
  let finalValue = "";
  debugMessage({ message: `SecretsOps.getEncodedValue: start`, state: state2 });
  if (encoding === "pem") {
    if (isBase64Encoded(value)) {
      finalValue = value;
    } else {
      finalValue = encode(value);
    }
  } else if (encoding === "base64hmac") {
    if (isBase64Encoded(decode(value))) {
      finalValue = value;
    } else {
      finalValue = encode(value);
    }
  } else {
    finalValue = encode(value);
  }
  debugMessage({
    message: `SecretsOps.getEncodedValue: finalValue: ${finalValue}`,
    state: state2
  });
  return finalValue;
}
function createSecretsExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    secrets: {}
  };
}
async function exportSecret({
  secretId,
  state: state2
}) {
  try {
    debugMessage({ message: `SecretsOps.exportSecret: start`, state: state2 });
    const exportData = createSecretsExportTemplate({ state: state2 });
    const secret = await getSecret({ secretId, state: state2 });
    exportData.secrets[secret._id] = secret;
    debugMessage({ message: `VariablesOps.exportSecret: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting secret ${secretId}`, error);
  }
}
async function exportSecrets({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({ message: `SecretsOps.exportSecrets: start`, state: state2 });
    const exportData = createSecretsExportTemplate({ state: state2 });
    const secrets = await readSecrets({ state: state2 });
    indicatorId = createProgressIndicator({
      total: secrets.length,
      message: "Exporting secrets...",
      state: state2
    });
    for (const secret of secrets) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting secret ${secret._id}`,
        state: state2
      });
      exportData.secrets[secret._id] = secret;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${secrets.length} secrets.`,
      state: state2
    });
    debugMessage({ message: `SecretsOps.exportSecrets: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting secrets`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting secrets`, error);
  }
}
async function enableVersionOfSecret({
  secretId,
  version: version2,
  state: state2
}) {
  try {
    return setStatusOfVersionOfSecret({
      secretId,
      version: version2,
      status: "ENABLED",
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error enabling version ${version2} of secret ${secretId}`,
      error
    );
  }
}
async function disableVersionOfSecret({
  secretId,
  version: version2,
  state: state2
}) {
  try {
    return setStatusOfVersionOfSecret({
      secretId,
      version: version2,
      status: "DISABLED",
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error disabling version ${version2} of secret ${secretId}`,
      error
    );
  }
}
async function readSecret({
  secretId,
  state: state2
}) {
  try {
    return await getSecret({ secretId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading secret ${secretId}`, error);
  }
}
async function readSecrets({
  state: state2
}) {
  try {
    const { result } = await getSecrets({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading secrets`, error);
  }
}
async function createSecret({
  secretId,
  value,
  description,
  encoding = "generic",
  useInPlaceholders = true,
  state: state2
}) {
  try {
    return putSecret({
      secretId,
      value: getEncodedValue(value, encoding, state2),
      description,
      encoding,
      useInPlaceholders,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error creating secret ${secretId}`, error);
  }
}
async function createVersionOfSecret({
  secretId,
  value,
  state: state2
}) {
  try {
    let secret = null;
    secret = await readSecret({ secretId, state: state2 });
    return createNewVersionOfSecret({
      secretId,
      value: getEncodedValue(value, secret.encoding, state2),
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error creating new version of secret ${secretId}`,
      error
    );
  }
}

// src/api/cloud/StartupApi.ts
import util21 from "util";
var startupURLTemplate = "%s/environment/startup";
var startupInitiateRestartURLTemplate = `${startupURLTemplate}?_action=restart`;
var apiVersion14 = "protocol=1.0,resource=1.0";
var getApiConfig15 = () => ({
  path: `/environment/startup`,
  apiVersion: apiVersion14
});
async function getStatus({
  state: state2
}) {
  const urlString = util21.format(
    startupURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig15(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data.restartStatus;
}
async function initiateRestart({
  state: state2
}) {
  const restartStatus = await getStatus({ state: state2 });
  if (restartStatus === "ready" /* ready */) {
    const urlString = util21.format(
      startupInitiateRestartURLTemplate,
      getHostBaseUrl(state2.getHost())
    );
    const { data } = await generateEnvApi({
      resource: getApiConfig15(),
      state: state2
    }).post(urlString, null, {
      withCredentials: true
    });
    return data.restartStatus;
  }
  throw new Error(`Not ready! Current status: ${restartStatus}`);
}

// src/api/cloud/VariablesApi.ts
import util22 from "util";
var variablesListURLTemplate = "%s/environment/variables";
var variableURLTemplate = "%s/environment/variables/%s";
var variableSetDescriptionURLTemplate = `${variableURLTemplate}?_action=setDescription`;
var apiVersion15 = "protocol=1.0,resource=1.0";
var getApiConfig16 = () => {
  return {
    apiVersion: apiVersion15
  };
};
async function getVariables({
  state: state2
}) {
  const urlString = util22.format(
    variablesListURLTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig16(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getVariable({
  variableId,
  state: state2
}) {
  const urlString = util22.format(
    variableURLTemplate,
    getHostBaseUrl(state2.getHost()),
    variableId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig16(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function putVariable({
  variableId,
  value,
  description = "",
  expressionType = "string",
  state: state2
}) {
  const variableData = {
    valueBase64: encode(value),
    description,
    expressionType
  };
  const urlString = util22.format(
    variableURLTemplate,
    getHostBaseUrl(state2.getHost()),
    variableId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig16(),
    state: state2
  }).put(urlString, variableData, {
    withCredentials: true
  });
  return data;
}
async function setVariableDescription({
  variableId,
  description,
  state: state2
}) {
  const urlString = util22.format(
    variableSetDescriptionURLTemplate,
    getHostBaseUrl(state2.getHost()),
    variableId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig16(),
    state: state2
  }).post(urlString, { description }, { withCredentials: true });
  return data;
}
async function deleteVariable({
  variableId,
  state: state2
}) {
  const urlString = util22.format(
    variableURLTemplate,
    getHostBaseUrl(state2.getHost()),
    variableId
  );
  const { data } = await generateEnvApi({
    resource: getApiConfig16(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/cloud/VariablesOps.ts
var VariablesOps_default = (state2) => {
  return {
    readVariable(variableId) {
      return readVariable({ variableId, state: state2 });
    },
    readVariables() {
      return readVariables({ state: state2 });
    },
    async exportVariable(variableId, noDecode) {
      return exportVariable({ variableId, noDecode, state: state2 });
    },
    exportVariables(noDecode) {
      return exportVariables({ noDecode, state: state2 });
    },
    createVariable(variableId, value, description, expressionType = "string") {
      return createVariable({
        variableId,
        value,
        description,
        expressionType,
        state: state2
      });
    },
    updateVariable(variableId, value, description, expressionType = "string") {
      return updateVariable({
        variableId,
        value,
        description,
        expressionType,
        state: state2
      });
    },
    updateVariableDescription(variableId, description) {
      return updateVariableDescription({
        variableId,
        description,
        state: state2
      });
    },
    deleteVariable(variableId) {
      return deleteVariable2({ variableId, state: state2 });
    },
    // Deprecated
    getVariable(variableId) {
      return readVariable({ variableId, state: state2 });
    },
    getVariables() {
      return readVariables({ state: state2 });
    },
    putVariable(variableId, value, description, expressionType = "string") {
      return updateVariable({
        variableId,
        value,
        description,
        expressionType,
        state: state2
      });
    },
    setVariableDescription(variableId, description) {
      return updateVariableDescription({
        variableId,
        description,
        state: state2
      });
    }
  };
};
function createVariablesExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    variables: {}
  };
}
async function readVariable({
  variableId,
  state: state2
}) {
  try {
    return getVariable({ variableId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading variable ${variableId}`, error);
  }
}
async function readVariables({
  state: state2
}) {
  try {
    return (await getVariables({ state: state2 })).result;
  } catch (error) {
    throw new FrodoError(`Error reading variables`, error);
  }
}
async function exportVariable({
  variableId,
  noDecode,
  state: state2
}) {
  try {
    debugMessage({ message: `VariablesOps.exportVariable: start`, state: state2 });
    const exportData = createVariablesExportTemplate({ state: state2 });
    const variable = await getVariable({ variableId, state: state2 });
    if (!noDecode) {
      variable.value = decode(variable.valueBase64);
    }
    exportData.variables[variable._id] = variable;
    debugMessage({ message: `VariablesOps.exportVariable: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting variable ${variableId}`, error);
  }
}
async function exportVariables({
  noDecode,
  state: state2
}) {
  try {
    debugMessage({ message: `VariablesOps.exportVariables: start`, state: state2 });
    const exportData = createVariablesExportTemplate({ state: state2 });
    const variables = await readVariables({ state: state2 });
    const indicatorId = createProgressIndicator({
      total: variables.length,
      message: "Exporting variables...",
      state: state2
    });
    for (const variable of variables) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting variable ${variable._id}`,
        state: state2
      });
      if (!noDecode) {
        variable.value = decode(variable.valueBase64);
      }
      exportData.variables[variable._id] = variable;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${variables.length} variables.`,
      state: state2
    });
    debugMessage({ message: `VariablesOps.exportVariables: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting variables`, error);
  }
}
async function createVariable({
  variableId,
  value,
  description,
  expressionType,
  state: state2
}) {
  debugMessage({
    message: `VariablesOps.createVariable: start`,
    state: state2
  });
  try {
    await getVariable({ variableId, state: state2 });
  } catch (error) {
    try {
      const result = await putVariable({
        variableId,
        value,
        description,
        expressionType,
        state: state2
      });
      debugMessage({
        message: `VariablesOps.createVariable: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating variable ${variableId}`, error2);
    }
  }
  throw new FrodoError(`Variable ${variableId} already exists`);
}
async function updateVariable({
  variableId,
  value,
  description,
  expressionType,
  state: state2
}) {
  try {
    return putVariable({
      variableId,
      value,
      description,
      expressionType,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error updating variable ${variableId}`, error);
  }
}
async function updateVariableDescription({
  variableId,
  description,
  state: state2
}) {
  try {
    return setVariableDescription({
      variableId,
      description,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(
      `Error updating description of variable ${variableId}`,
      error
    );
  }
}
async function deleteVariable2({
  variableId,
  state: state2
}) {
  try {
    return deleteVariable({ variableId, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting variable ${variableId}`, error);
  }
}

// src/ops/cloud/StartupOps.ts
var StartupOps_default = (state2) => {
  return {
    /**
     * Check for updates that need applying
     * @returns {Promise<Updates>} true if there are updates that need to be applied, false otherwise
     */
    async checkForUpdates() {
      return checkForUpdates({ state: state2 });
    },
    /**
     * Apply updates
     * @param {boolean} wait wait for the operation to complete or not
     * @param {number} timeout timeout in milliseconds
     * @returns {Promise<boolean>} true if successful, false otherwise
     */
    async applyUpdates(wait, timeout3 = 10 * 60 * 1e3) {
      return applyUpdates({
        wait,
        timeout: timeout3,
        state: state2
      });
    }
  };
};
async function checkForUpdates({
  state: state2
}) {
  const updates = { secrets: [], variables: [] };
  const indicatorId = createProgressIndicator({
    total: void 0,
    message: `Checking for updates to apply...`,
    type: "indeterminate",
    state: state2
  });
  try {
    updates.secrets = (await readSecrets({ state: state2 })).filter(
      (secret) => !secret.loaded
    );
    updates.variables = (await readVariables({ state: state2 })).filter(
      (variable) => !variable.loaded
    );
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error: ${error.response.data.code} - ${error.response.data.message}`,
      status: "fail",
      state: state2
    });
  }
  const updateCount = updates.secrets?.length + updates.variables?.length || 0;
  if (updateCount > 0) {
    stopProgressIndicator({
      id: indicatorId,
      message: `${updateCount} update(s) need to be applied`,
      status: "success",
      state: state2
    });
  } else {
    stopProgressIndicator({
      id: indicatorId,
      message: `No updates need to be applied`,
      status: "success",
      state: state2
    });
  }
  return updates;
}
async function applyUpdates({
  wait,
  timeout: timeout3 = 10 * 60 * 1e3,
  state: state2
}) {
  const indicatorId = createProgressIndicator({
    total: void 0,
    message: `Applying updates...`,
    type: "indeterminate",
    state: state2
  });
  try {
    let status = await initiateRestart({ state: state2 });
    if (wait) {
      const start = (/* @__PURE__ */ new Date()).getTime();
      let runtime = 0;
      let errors = 0;
      const maxErrors = 3;
      while (status !== "ready" /* ready */ && start + timeout3 > (/* @__PURE__ */ new Date()).getTime()) {
        await new Promise((resolve2) => setTimeout(resolve2, 5e3));
        try {
          status = await getStatus({ state: state2 });
          if (errors)
            errors = 0;
          runtime = (/* @__PURE__ */ new Date()).getTime() - start;
          updateProgressIndicator({
            id: indicatorId,
            message: `${status} (${Math.round(runtime / 1e3)}s)`,
            state: state2
          });
        } catch (error) {
          errors++;
          if (errors > maxErrors) {
            throw error;
          }
          runtime = (/* @__PURE__ */ new Date()).getTime() - start;
          updateProgressIndicator({
            id: indicatorId,
            message: `${error.message} - retry ${errors}/${maxErrors} (${Math.round(runtime / 1e3)}s)`,
            state: state2
          });
        }
      }
      if (runtime < timeout3) {
        stopProgressIndicator({
          id: indicatorId,
          message: `Updates applied in ${Math.round(
            runtime / 1e3
          )}s with final status: ${status}`,
          status: "success",
          state: state2
        });
        return true;
      } else {
        stopProgressIndicator({
          id: indicatorId,
          message: `Updates timed out after ${Math.round(
            runtime / 1e3
          )}s with final status: ${status}`,
          status: "warn",
          state: state2
        });
        return false;
      }
    } else {
      stopProgressIndicator({
        id: indicatorId,
        message: `Updates are being applied. Changes may take up to 10 minutes to propagate, during which time you will not be able to make further updates.`,
        status: "success",
        state: state2
      });
      return true;
    }
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error: ${error.response?.data?.code || error} - ${error.response?.data?.message}`,
      status: "fail",
      state: state2
    });
    return false;
  }
}

// src/ops/EmailTemplateOps.ts
var EmailTemplateOps_default = (state2) => {
  return {
    EMAIL_TEMPLATE_TYPE,
    createEmailTemplateExportTemplate() {
      return createEmailTemplateExportTemplate({ state: state2 });
    },
    async readEmailTemplates() {
      return readEmailTemplates({ state: state2 });
    },
    async readEmailTemplate(templateId) {
      return readEmailTemplate({ templateId, state: state2 });
    },
    async exportEmailTemplates() {
      return exportEmailTemplates({ state: state2 });
    },
    async createEmailTemplate(templateId, templateData) {
      return createEmailTemplate({ templateId, templateData, state: state2 });
    },
    async updateEmailTemplate(templateId, templateData) {
      return updateEmailTemplate({ templateId, templateData, state: state2 });
    },
    importEmailTemplates(importData) {
      return importEmailTemplates({ importData, state: state2 });
    },
    async deleteEmailTemplates() {
      return deleteEmailTemplates({ state: state2 });
    },
    async deleteEmailTemplate(templateId) {
      return deleteEmailTemplate({ templateId, state: state2 });
    },
    // Deprecated
    async getEmailTemplates() {
      return readEmailTemplates({ state: state2 });
    },
    async getEmailTemplate(templateId) {
      return readEmailTemplate({ templateId, state: state2 });
    },
    async putEmailTemplate(templateId, templateData) {
      return updateEmailTemplate({ templateId, templateData, state: state2 });
    }
  };
};
var EMAIL_TEMPLATE_TYPE = "emailTemplate";
function createEmailTemplateExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    emailTemplate: {}
  };
}
async function readEmailTemplates({
  state: state2
}) {
  try {
    const templates = await readConfigEntitiesByType({
      type: EMAIL_TEMPLATE_TYPE,
      state: state2
    });
    return templates;
  } catch (error) {
    throw new FrodoError(`Error reading email templates`, error);
  }
}
async function readEmailTemplate({
  templateId,
  state: state2
}) {
  try {
    return getConfigEntity({
      entityId: `${EMAIL_TEMPLATE_TYPE}/${templateId}`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error reading email template ${templateId}`, error);
  }
}
async function exportEmailTemplates({
  state: state2
}) {
  try {
    debugMessage({
      message: `EmailTemplateOps.exportEmailTemplates: start`,
      state: state2
    });
    const exportData = createEmailTemplateExportTemplate({ state: state2 });
    const emailTemplates = await readEmailTemplates({ state: state2 });
    const indicatorId = createProgressIndicator({
      total: emailTemplates.length,
      message: "Exporting email templates...",
      state: state2
    });
    for (const emailTemplate of emailTemplates) {
      const templateId = emailTemplate._id.replace(
        `${EMAIL_TEMPLATE_TYPE}/`,
        ""
      );
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting email template ${templateId}`,
        state: state2
      });
      exportData.emailTemplate[templateId] = emailTemplate;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${emailTemplates.length} email templates.`,
      state: state2
    });
    debugMessage({
      message: `EmailTemplateOps.exportEmailTemplates: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting email templates`, error);
  }
}
async function createEmailTemplate({
  templateId,
  templateData,
  state: state2
}) {
  debugMessage({
    message: `EmailTemplateOps.createEmailTemplate: start`,
    state: state2
  });
  try {
    await readEmailTemplate({
      templateId,
      state: state2
    });
  } catch (error) {
    try {
      const result = await putConfigEntity({
        entityId: `${EMAIL_TEMPLATE_TYPE}/${templateId}`,
        entityData: templateData,
        state: state2
      });
      debugMessage({
        message: `EmailTemplateOps.createEmailTemplate: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(
        `Error creating email template ${templateId}`,
        error2
      );
    }
  }
  throw new Error(`Email template ${templateId} already exists!`);
}
async function updateEmailTemplate({
  templateId,
  templateData,
  state: state2
}) {
  try {
    return putConfigEntity({
      entityId: `${EMAIL_TEMPLATE_TYPE}/${templateId}`,
      entityData: templateData,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error updting email template ${templateId}`, error);
  }
}
async function importEmailTemplates({
  importData,
  state: state2
}) {
  debugMessage({
    message: `EmailTemplateOps.importEmailTemplates: start`,
    state: state2
  });
  const response = [];
  const errors = [];
  for (const templateId of Object.keys(importData.emailTemplate)) {
    try {
      debugMessage({
        message: `EmailTemplateOps.importEmailTemplates: ${templateId}`,
        state: state2
      });
      response.push(
        await updateEmailTemplate({
          templateId,
          templateData: importData.emailTemplate[templateId],
          state: state2
        })
      );
    } catch (e) {
      errors.push(e);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing email templates`, errors);
  }
  debugMessage({
    message: `EmailTemplateOps.importEmailTemplates: end`,
    state: state2
  });
  return response;
}
async function deleteEmailTemplates({
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({
      message: `EmailTemplateOps.deleteEmailTemplates: start`,
      state: state2
    });
    const result = [];
    const templates = await readEmailTemplates({ state: state2 });
    for (const template of templates) {
      try {
        debugMessage({
          message: `EmailTemplateOps.deleteEmailTemplates: '${template["_id"]}'`,
          state: state2
        });
        result.push(
          await deleteConfigEntity({
            entityId: template["_id"],
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting email templates`, errors);
    }
    debugMessage({
      message: `EmailTemplateOps.deleteEmailTemplates: end`,
      state: state2
    });
    return result;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting email templates`, error);
  }
}
async function deleteEmailTemplate({
  templateId,
  state: state2
}) {
  try {
    return deleteConfigEntity({
      entityId: `${EMAIL_TEMPLATE_TYPE}/${templateId}`,
      state: state2
    });
  } catch (error) {
    throw new FrodoError(`Error deleting email template ${templateId}`, error);
  }
}

// src/api/SocialIdentityProvidersApi.ts
import util23 from "util";
var providerByTypeAndIdURLTemplate2 = "%s/json%s/realm-config/services/SocialIdentityProviders/%s/%s";
var getAllProvidersURLTemplate2 = "%s/json%s/realm-config/services/SocialIdentityProviders?_action=nextdescendents";
var apiVersion16 = "protocol=2.1,resource=1.0";
var getApiConfig17 = () => {
  return {
    apiVersion: apiVersion16
  };
};
async function getSocialIdentityProviders({
  state: state2
}) {
  const urlString = util23.format(
    getAllProvidersURLTemplate2,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig17(),
    state: state2
  }).post(
    urlString,
    {},
    {
      withCredentials: true
    }
  );
  return data;
}
async function putProviderByTypeAndId2({
  type,
  id: id2,
  providerData,
  state: state2
}) {
  const cleanData = deleteDeepByKey(providerData, "-encrypted");
  const urlString = util23.format(
    providerByTypeAndIdURLTemplate2,
    state2.getHost(),
    getCurrentRealmPath(state2),
    type,
    id2
  );
  const { data } = await generateAmApi({ resource: getApiConfig17(), state: state2 }).put(
    urlString,
    cleanData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteProviderByTypeAndId2({
  type,
  providerId,
  state: state2
}) {
  const urlString = util23.format(
    providerByTypeAndIdURLTemplate2,
    state2.getHost(),
    getCurrentRealmPath(state2),
    type,
    providerId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig17(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/IdpOps.ts
var IdpOps_default = (state2) => {
  return {
    async readSocialIdentityProviders() {
      return readSocialIdentityProviders({ state: state2 });
    },
    async readSocialIdentityProvider(providerId) {
      return readSocialIdentityProvider({ providerId, state: state2 });
    },
    async createSocialIdentityProvider(providerType, providerId, providerData) {
      return createSocialIdentityProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    },
    async updateSocialIdentityProvider(providerType, providerId, providerData) {
      return updateSocialIdentityProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    },
    async deleteSocialIdentityProviders() {
      return deleteSocialIdentityProviders({ state: state2 });
    },
    async deleteSocialIdentityProvider(providerId) {
      return deleteSocialIdentityProvider({ providerId, state: state2 });
    },
    async exportSocialIdentityProvider(providerId) {
      return exportSocialIdentityProvider({ providerId, state: state2 });
    },
    async exportSocialIdentityProviders(options = {
      deps: true,
      useStringArrays: true
    }) {
      return exportSocialIdentityProviders({ options, state: state2 });
    },
    async importSocialIdentityProvider(providerId, importData, options = { deps: true }) {
      return importSocialIdentityProvider({
        providerId,
        importData,
        options,
        state: state2
      });
    },
    async importFirstSocialIdentityProvider(importData, options = { deps: true }) {
      return importFirstSocialIdentityProvider({ importData, options, state: state2 });
    },
    async importSocialIdentityProviders(importData, options = { deps: true }) {
      return importSocialIdentityProviders({ importData, options, state: state2 });
    },
    // Deprecated
    async getSocialIdentityProviders() {
      return readSocialIdentityProviders({ state: state2 });
    },
    async getSocialProvider(providerId) {
      return readSocialIdentityProvider({ providerId, state: state2 });
    },
    async putProviderByTypeAndId(providerType, providerId, providerData) {
      return updateSocialIdentityProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
    },
    async deleteSocialProvider(providerId) {
      return deleteSocialIdentityProvider({ providerId, state: state2 });
    },
    async exportSocialProvider(providerId) {
      return exportSocialIdentityProvider({ providerId, state: state2 });
    },
    async exportSocialProviders() {
      return exportSocialIdentityProviders({ state: state2 });
    },
    async importSocialProvider(providerId, importData) {
      return importSocialProvider({ providerId, importData, state: state2 });
    },
    async importFirstSocialProvider(importData) {
      return importFirstSocialProvider({ importData, state: state2 });
    },
    async importSocialProviders(importData) {
      return importSocialProviders({ importData, state: state2 });
    }
  };
};
function createIdpExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    idp: {}
  };
}
async function readSocialIdentityProviders({
  state: state2
}) {
  try {
    const { result } = await getSocialIdentityProviders({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading providers`, error);
  }
}
async function readSocialIdentityProvider({
  providerId,
  state: state2
}) {
  try {
    const response = await readSocialIdentityProviders({ state: state2 });
    const foundProviders = response.filter(
      (provider) => provider._id === providerId
    );
    switch (foundProviders.length) {
      case 1:
        return foundProviders[0];
      case 0:
        throw new FrodoError(`Not found`);
      default:
        throw new FrodoError(`Multiple providers found`);
    }
  } catch (error) {
    throw new FrodoError(`Error reading provider ${providerId}`, error);
  }
}
async function createSocialIdentityProvider({
  providerType,
  providerId,
  providerData,
  state: state2
}) {
  debugMessage({
    message: `IdpOps.createSocialIdentityProvider: start`,
    state: state2
  });
  try {
    await readSocialIdentityProvider({ providerId, state: state2 });
  } catch (error) {
    try {
      const result = await updateSocialIdentityProvider({
        providerType,
        providerId,
        providerData,
        state: state2
      });
      debugMessage({
        message: `IdpOps.createSocialIdentityProvider: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating provider ${providerId}`, error2);
    }
  }
  throw new FrodoError(`Provider ${providerId} already exists`);
}
async function updateSocialIdentityProvider({
  providerType,
  providerId,
  providerData,
  state: state2
}) {
  debugMessage({
    message: `IdpOps.updateSocialIdentityProvider: start`,
    state: state2
  });
  try {
    const response = await putProviderByTypeAndId2({
      type: providerType,
      id: providerId,
      providerData,
      state: state2
    });
    debugMessage({
      message: `IdpOps.updateSocialIdentityProvider: end`,
      state: state2
    });
    return response;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message === "Invalid attribute specified.") {
      const { validAttributes } = error.response.data.detail;
      validAttributes.push("_id", "_type");
      for (const attribute of Object.keys(providerData)) {
        if (!validAttributes.includes(attribute)) {
          if (state2.getVerbose())
            printMessage({
              message: `
Removing invalid attribute: ${attribute}`,
              type: "warn",
              newline: false,
              state: state2
            });
          delete providerData[attribute];
        }
      }
      if (state2.getVerbose())
        printMessage({ message: "\n", type: "warn", newline: false, state: state2 });
      const response = await putProviderByTypeAndId2({
        type: providerType,
        id: providerId,
        providerData,
        state: state2
      });
      debugMessage({
        message: `IdpOps.updateSocialIdentityProvider: end (after retry)`,
        state: state2
      });
      return response;
    } else {
      throw new FrodoError(`Error updating provider ${providerId}`, error);
    }
  }
}
async function deleteSocialIdentityProviders({
  state: state2
}) {
  debugMessage({
    message: `IdpOps.deleteSocialProviders: start`,
    state: state2
  });
  const result = [];
  const errors = [];
  try {
    const providers = await readSocialIdentityProviders({ state: state2 });
    for (const provider of providers) {
      try {
        debugMessage({
          message: `IdpOps.deleteSocialProviders: '${provider._id}'`,
          state: state2
        });
        result.push(
          await deleteSocialIdentityProvider({
            providerId: provider._id,
            state: state2
          })
        );
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error deleting providers`, errors);
    }
    debugMessage({
      message: `IdpOps.deleteSocialProviders: end`,
      state: state2
    });
    return result;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error deleting providers`, error);
  }
}
async function deleteSocialIdentityProvider({
  providerId,
  state: state2
}) {
  try {
    const response = await readSocialIdentityProviders({ state: state2 });
    const foundProviders = response.filter(
      (provider) => provider._id === providerId
    );
    switch (foundProviders.length) {
      case 1:
        return await deleteProviderByTypeAndId2({
          type: foundProviders[0]._type._id,
          providerId: foundProviders[0]._id,
          state: state2
        });
      case 0:
        throw new Error(`Not found`);
      default:
        throw new Error(`Multiple providers found`);
    }
  } catch (error) {
    throw new FrodoError(`Error deleting provider ${providerId}`, error);
  }
}
async function exportSocialIdentityProvider({
  providerId,
  state: state2
}) {
  try {
    debugMessage({ message: `IdpOps.exportSocialProvider: start`, state: state2 });
    const idpData = await readSocialIdentityProvider({ providerId, state: state2 });
    const exportData = createIdpExportTemplate({ state: state2 });
    exportData.idp[idpData._id] = idpData;
    if (idpData.transform) {
      try {
        const scriptData = await getScript({
          scriptId: idpData.transform,
          state: state2
        });
        scriptData.script = convertBase64TextToArray(scriptData.script);
        exportData.script[idpData.transform] = scriptData;
      } catch (error) {
        throw new FrodoError(`Error reading script ${idpData.transform}`);
      }
    }
    debugMessage({ message: `IdpOps.exportSocialProvider: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting provider ${providerId}`, error);
  }
}
async function exportSocialIdentityProviders({
  options = { deps: true, useStringArrays: true },
  state: state2
}) {
  const errors = [];
  let indicatorId;
  try {
    const exportData = createIdpExportTemplate({ state: state2 });
    const allIdpsData = await readSocialIdentityProviders({ state: state2 });
    indicatorId = createProgressIndicator({
      total: allIdpsData.length,
      message: "Exporting providers",
      state: state2
    });
    for (const idpData of allIdpsData) {
      try {
        updateProgressIndicator({
          id: indicatorId,
          message: `Exporting provider ${idpData._id}`,
          state: state2
        });
        exportData.idp[idpData._id] = idpData;
        if (options.deps && idpData.transform) {
          const scriptData = await getScript({
            scriptId: idpData.transform,
            state: state2
          });
          if (options.useStringArrays) {
            scriptData.script = convertBase64TextToArray(scriptData.script);
          }
          exportData.script[idpData.transform] = scriptData;
        }
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting dependencies`, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `${allIdpsData.length} providers exported.`,
      state: state2
    });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting providers`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting providers`, error);
  }
}
async function importSocialIdentityProvider({
  providerId,
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const idpId of Object.keys(importData.idp)) {
    if (idpId === providerId) {
      try {
        if (options.deps && importData.idp[idpId].transform) {
          try {
            const scriptId = importData.idp[idpId].transform;
            const scriptData = importData.script[scriptId];
            if (scriptId && scriptData) {
              scriptData.script = convertTextArrayToBase64(
                scriptData.script
              );
              await updateScript({ scriptId, scriptData, state: state2 });
            }
          } catch (error) {
            errors.push(error);
          }
        }
        response = await updateSocialIdentityProvider({
          providerType: importData.idp[idpId]._type._id,
          providerId: idpId,
          providerData: importData.idp[idpId],
          state: state2
        });
        imported.push(idpId);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing provider ${providerId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`Provider ${providerId} not found in import data`);
  }
  return response;
}
async function importFirstSocialIdentityProvider({
  importData,
  options = { deps: true },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const idpId of Object.keys(importData.idp)) {
    try {
      if (options.deps && importData.idp[idpId].transform) {
        try {
          const scriptId = importData.idp[idpId].transform;
          const scriptData = importData.script[scriptId];
          if (scriptId && scriptData) {
            scriptData.script = convertTextArrayToBase64(
              scriptData.script
            );
            await updateScript({ scriptId, scriptData, state: state2 });
          }
        } catch (error) {
          errors.push(error);
        }
      }
      response = await updateSocialIdentityProvider({
        providerType: importData.idp[idpId]._type._id,
        providerId: idpId,
        providerData: importData.idp[idpId],
        state: state2
      });
      imported.push(idpId);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first provider`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No providers found in import data`);
  }
  return response;
}
async function importSocialIdentityProviders({
  importData,
  options = { deps: true },
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const idpId of Object.keys(importData.idp)) {
    try {
      if (options.deps && importData.idp[idpId].transform) {
        try {
          const scriptId = importData.idp[idpId].transform;
          const scriptData = { ...importData.script[scriptId] };
          if (scriptId && scriptData) {
            scriptData.script = convertTextArrayToBase64(
              scriptData.script
            );
            await updateScript({ scriptId, scriptData, state: state2 });
          }
        } catch (error) {
          errors.push(error);
        }
      }
      response.push(
        await updateSocialIdentityProvider({
          providerType: importData.idp[idpId]._type._id,
          providerId: idpId,
          providerData: importData.idp[idpId],
          state: state2
        })
      );
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing providers`);
  }
  return response;
}
async function importSocialProvider({
  providerId,
  importData,
  state: state2
}) {
  for (const idpId of Object.keys(importData.idp)) {
    if (idpId === providerId) {
      const scriptId = importData.idp[idpId].transform;
      const scriptData = importData.script[scriptId];
      if (scriptId && scriptData) {
        scriptData.script = convertTextArrayToBase64(
          scriptData.script
        );
        await updateScript({ scriptId, scriptData, state: state2 });
      }
      await updateSocialIdentityProvider({
        providerType: importData.idp[idpId]._type._id,
        providerId: idpId,
        providerData: importData.idp[idpId],
        state: state2
      });
      return true;
    }
  }
  return false;
}
async function importFirstSocialProvider({
  importData,
  state: state2
}) {
  for (const idpId of Object.keys(importData.idp)) {
    const scriptId = importData.idp[idpId].transform;
    const scriptData = importData.script[scriptId];
    if (scriptId && scriptData) {
      scriptData.script = convertTextArrayToBase64(
        scriptData.script
      );
      await updateScript({ scriptId, scriptData, state: state2 });
    }
    await updateSocialIdentityProvider({
      providerType: importData.idp[idpId]._type._id,
      providerId: idpId,
      providerData: importData.idp[idpId],
      state: state2
    });
    return true;
  }
  return false;
}
async function importSocialProviders({
  importData,
  state: state2
}) {
  let outcome = true;
  for (const idpId of Object.keys(importData.idp)) {
    try {
      const scriptId = importData.idp[idpId].transform;
      const scriptData = { ...importData.script[scriptId] };
      if (scriptId && scriptData) {
        scriptData.script = convertTextArrayToBase64(
          scriptData.script
        );
        await updateScript({ scriptId, scriptData, state: state2 });
      }
      await updateSocialIdentityProvider({
        providerType: importData.idp[idpId]._type._id,
        providerId: idpId,
        providerData: importData.idp[idpId],
        state: state2
      });
    } catch (error) {
      outcome = false;
    }
  }
  return outcome;
}

// src/ops/JourneyOps.ts
import axios2 from "axios";
import fs6 from "fs";
import { v4 as uuidv45 } from "uuid";

// src/api/NodeApi.ts
import util24 from "util";
var queryAllNodeTypesURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/nodes?_action=getAllTypes";
var queryAllNodesByTypeURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/nodes/%s?_queryFilter=true";
var queryAllNodesURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/nodes?_action=nextdescendents";
var nodeURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/nodes/%s/%s";
var createNodeURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/nodes/%s?_action=create";
var apiVersion17 = "protocol=2.1,resource=1.0";
var getNodeApiConfig = () => {
  return {
    apiVersion: apiVersion17
  };
};
async function getNodeTypes({
  state: state2
}) {
  const urlString = util24.format(
    queryAllNodeTypesURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).post(
    urlString,
    {},
    {
      withCredentials: true,
      headers: { "Accept-Encoding": "gzip, deflate, br" }
    }
  );
  return data;
}
async function getNodes({
  state: state2
}) {
  const urlString = util24.format(
    queryAllNodesURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).post(
    urlString,
    {},
    {
      withCredentials: true,
      headers: { "Accept-Encoding": "gzip, deflate, br" }
    }
  );
  return data;
}
async function getNodesByType({
  nodeType,
  state: state2
}) {
  const urlString = util24.format(
    queryAllNodesByTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    nodeType
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getNode({
  nodeId,
  nodeType,
  state: state2
}) {
  const urlString = util24.format(
    nodeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    nodeType,
    nodeId
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function createNode({
  nodeType,
  nodeData,
  state: state2
}) {
  const urlString = util24.format(
    createNodeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    nodeType
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).post(urlString, nodeData, {
    withCredentials: true,
    headers: { "Accept-Encoding": "gzip, deflate, br" }
  });
  return data;
}
async function putNode({
  nodeId,
  nodeType,
  nodeData,
  state: state2
}) {
  const cleanData = deleteDeepByKey(nodeData, "-encrypted");
  const urlString = util24.format(
    nodeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    nodeType,
    nodeId
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).put(urlString, cleanData, {
    withCredentials: true
  });
  return data;
}
async function deleteNode({
  nodeId,
  nodeType,
  state: state2
}) {
  const urlString = util24.format(
    nodeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    nodeType,
    nodeId
  );
  const { data } = await generateAmApi({
    resource: getNodeApiConfig(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/TreeApi.ts
import util25 from "util";
var treeByIdURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/trees/%s";
var queryAllTreesURLTemplate = "%s/json%s/realm-config/authentication/authenticationtrees/trees?_queryFilter=true";
var apiVersion18 = "protocol=2.1,resource=1.0";
var getTreeApiConfig = () => {
  return {
    apiVersion: apiVersion18
  };
};
async function getTrees({ state: state2 }) {
  const urlString = util25.format(
    queryAllTreesURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getTreeApiConfig(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getTree({ id: id2, state: state2 }) {
  const urlString = util25.format(
    treeByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    id2
  );
  const { data } = await generateAmApi({
    resource: getTreeApiConfig(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function putTree({
  treeId,
  treeData,
  state: state2
}) {
  const urlString = util25.format(
    treeByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    treeId
  );
  const { data } = await generateAmApi({
    resource: getTreeApiConfig(),
    state: state2
  }).put(urlString, treeData, {
    withCredentials: true
  });
  return data;
}
async function deleteTree({
  treeId,
  state: state2
}) {
  const urlString = util25.format(
    treeByIdURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    treeId
  );
  const { data } = await generateAmApi({
    resource: getTreeApiConfig(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/NodeOps.ts
var NodeOps_default = (state2) => {
  return {
    readNodeTypes() {
      return readNodeTypes({ state: state2 });
    },
    async readNodes() {
      return readNodes({ state: state2 });
    },
    async readNodesByType(nodeType) {
      return readNodesByType({ nodeType, state: state2 });
    },
    async readNode(nodeId, nodeType) {
      return readNode({ nodeId, nodeType, state: state2 });
    },
    async createNode(nodeType, nodeData) {
      return createNode2({ nodeType, nodeData, state: state2 });
    },
    async updateNode(nodeId, nodeType, nodeData) {
      return updateNode({ nodeId, nodeType, nodeData, state: state2 });
    },
    async deleteNode(nodeId, nodeType) {
      return deleteNode2({ nodeId, nodeType, state: state2 });
    },
    async findOrphanedNodes() {
      return findOrphanedNodes({ state: state2 });
    },
    async removeOrphanedNodes(orphanedNodes) {
      return removeOrphanedNodes({ orphanedNodes, state: state2 });
    },
    isPremiumNode(nodeType) {
      return isPremiumNode(nodeType);
    },
    isCloudOnlyNode(nodeType) {
      return isCloudOnlyNode(nodeType);
    },
    isCloudExcludedNode(nodeType) {
      return isCloudExcludedNode({ nodeType, state: state2 });
    },
    isDeprecatedNode(nodeType) {
      return isDeprecatedNode({ nodeType, state: state2 });
    },
    isCustomNode(nodeType) {
      return isCustomNode({ nodeType, state: state2 });
    },
    getNodeClassification(nodeType) {
      return getNodeClassification({ nodeType, state: state2 });
    }
  };
};
var containerNodes = ["PageNode", "CustomPageNode"];
async function readNodeTypes({
  state: state2
}) {
  try {
    const { result } = await getNodeTypes({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading node types`, error);
  }
}
async function readNodes({
  state: state2
}) {
  try {
    const { result } = await getNodes({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading nodes`, error);
  }
}
async function readNodesByType({
  nodeType,
  state: state2
}) {
  try {
    const { result } = await getNodesByType({ nodeType, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading ${nodeType} nodes`, error);
  }
}
async function readNode({
  nodeId,
  nodeType,
  state: state2
}) {
  try {
    return getNode({ nodeId, nodeType, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error reading ${nodeType} node ${nodeId}`, error);
  }
}
async function createNode2({
  nodeId,
  nodeType,
  nodeData,
  state: state2
}) {
  try {
    if (nodeId) {
      try {
        await readNode({ nodeId, nodeType, state: state2 });
      } catch (error) {
        const result = await updateNode({ nodeId, nodeType, nodeData, state: state2 });
        return result;
      }
      throw new FrodoError(`Node ${nodeId} already exists!`);
    }
    return createNode({ nodeType, nodeData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error creating ${nodeType} node ${nodeId}`, error);
  }
}
async function updateNode({
  nodeId,
  nodeType,
  nodeData,
  state: state2
}) {
  try {
    return putNode({ nodeId, nodeType, nodeData, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error updating ${nodeType} node ${nodeId}`, error);
  }
}
async function deleteNode2({
  nodeId,
  nodeType,
  state: state2
}) {
  try {
    return deleteNode({ nodeId, nodeType, state: state2 });
  } catch (error) {
    throw new FrodoError(`Error deleting ${nodeType} node ${nodeId}`, error);
  }
}
async function findOrphanedNodes({
  state: state2
}) {
  const allNodes = [];
  const orphanedNodes = [];
  let types = [];
  const allJourneys = (await getTrees({ state: state2 })).result;
  let errorMessage = "";
  const errorTypes = [];
  const indicatorId = createProgressIndicator({
    total: void 0,
    message: `Counting total nodes...`,
    type: "indeterminate",
    state: state2
  });
  try {
    types = (await getNodeTypes({ state: state2 })).result;
  } catch (error) {
    throw new FrodoError(`Error retrieving all available node types`, error);
  }
  for (const type of types) {
    try {
      const nodes = (await getNodesByType({ nodeType: type._id, state: state2 })).result;
      for (const node of nodes) {
        allNodes.push(node);
        updateProgressIndicator({
          id: indicatorId,
          message: `${allNodes.length} total nodes${errorMessage}`,
          state: state2
        });
      }
    } catch (error) {
      errorTypes.push(type._id);
      errorMessage = ` (Skipped type(s): ${errorTypes})`["yellow"];
      updateProgressIndicator({
        id: indicatorId,
        message: `${allNodes.length} total nodes${errorMessage}`,
        state: state2
      });
    }
  }
  if (errorTypes.length > 0) {
    stopProgressIndicator({
      id: indicatorId,
      message: `${allNodes.length} total nodes${errorMessage}`,
      state: state2,
      status: "warn"
    });
  } else {
    stopProgressIndicator({
      id: indicatorId,
      message: `${allNodes.length} total nodes`,
      status: "success",
      state: state2
    });
  }
  const indicatorId2 = createProgressIndicator({
    total: void 0,
    message: "Counting active nodes...",
    type: "indeterminate",
    state: state2
  });
  const activeNodes = [];
  for (const journey of allJourneys) {
    for (const nodeId in journey.nodes) {
      if ({}.hasOwnProperty.call(journey.nodes, nodeId)) {
        activeNodes.push(nodeId);
        updateProgressIndicator({
          id: indicatorId2,
          message: `${activeNodes.length} active nodes`,
          state: state2
        });
        const node = journey.nodes[nodeId];
        if (containerNodes.includes(node.nodeType)) {
          const containerNode = await getNode({
            nodeId,
            nodeType: node.nodeType,
            state: state2
          });
          for (const innerNode of containerNode.nodes) {
            activeNodes.push(innerNode._id);
            updateProgressIndicator({
              id: indicatorId2,
              message: `${activeNodes.length} active nodes`,
              state: state2
            });
          }
        }
      }
    }
  }
  stopProgressIndicator({
    id: indicatorId2,
    message: `${activeNodes.length} active nodes`,
    status: "success",
    state: state2
  });
  const indicatorId3 = createProgressIndicator({
    total: void 0,
    message: "Calculating orphaned nodes...",
    type: "indeterminate",
    state: state2
  });
  const diff = allNodes.filter((x) => !activeNodes.includes(x._id));
  for (const orphanedNode of diff) {
    orphanedNodes.push(orphanedNode);
  }
  stopProgressIndicator({
    id: indicatorId3,
    message: `${orphanedNodes.length} orphaned nodes`,
    status: "success",
    state: state2
  });
  return orphanedNodes;
}
async function removeOrphanedNodes({
  orphanedNodes,
  state: state2
}) {
  const errorNodes = [];
  const indicatorId = createProgressIndicator({
    total: orphanedNodes.length,
    message: "Removing orphaned nodes...",
    state: state2
  });
  for (const node of orphanedNodes) {
    updateProgressIndicator({
      id: indicatorId,
      message: `Removing ${node["_id"]}...`,
      state: state2
    });
    try {
      await deleteNode2({
        nodeId: node["_id"],
        nodeType: node["_type"]["_id"],
        state: state2
      });
    } catch (deleteError) {
      errorNodes.push(node);
      printError(deleteError);
    }
  }
  stopProgressIndicator({
    id: indicatorId,
    message: `Removed ${orphanedNodes.length} orphaned nodes.`,
    state: state2
  });
  return errorNodes;
}
var OOTB_NODE_TYPES_7 = [
  "AcceptTermsAndConditionsNode",
  "AccountActiveDecisionNode",
  "AccountLockoutNode",
  "AgentDataStoreDecisionNode",
  "AnonymousSessionUpgradeNode",
  "AnonymousUserNode",
  "AttributeCollectorNode",
  "AttributePresentDecisionNode",
  "AttributeValueDecisionNode",
  "AuthLevelDecisionNode",
  "ChoiceCollectorNode",
  "ConsentNode",
  "CookiePresenceDecisionNode",
  "CreateObjectNode",
  "CreatePasswordNode",
  "DataStoreDecisionNode",
  "DeviceGeoFencingNode",
  "DeviceLocationMatchNode",
  "DeviceMatchNode",
  "DeviceProfileCollectorNode",
  "DeviceSaveNode",
  "DeviceTamperingVerificationNode",
  "DisplayUserNameNode",
  "EmailSuspendNode",
  "EmailTemplateNode",
  "IdentifyExistingUserNode",
  "IncrementLoginCountNode",
  "InnerTreeEvaluatorNode",
  "IotAuthenticationNode",
  "IotRegistrationNode",
  "KbaCreateNode",
  "KbaDecisionNode",
  "KbaVerifyNode",
  "LdapDecisionNode",
  "LoginCountDecisionNode",
  "MessageNode",
  "MetadataNode",
  "MeterNode",
  "ModifyAuthLevelNode",
  "OneTimePasswordCollectorDecisionNode",
  "OneTimePasswordGeneratorNode",
  "OneTimePasswordSmsSenderNode",
  "OneTimePasswordSmtpSenderNode",
  "PageNode",
  "PasswordCollectorNode",
  "PatchObjectNode",
  "PersistentCookieDecisionNode",
  "PollingWaitNode",
  "product-CertificateCollectorNode",
  "product-CertificateUserExtractorNode",
  "product-CertificateValidationNode",
  "product-KerberosNode",
  "product-ReCaptchaNode",
  "product-Saml2Node",
  "product-WriteFederationInformationNode",
  "ProfileCompletenessDecisionNode",
  "ProvisionDynamicAccountNode",
  "ProvisionIdmAccountNode",
  "PushAuthenticationSenderNode",
  "PushResultVerifierNode",
  "QueryFilterDecisionNode",
  "RecoveryCodeCollectorDecisionNode",
  "RecoveryCodeDisplayNode",
  "RegisterLogoutWebhookNode",
  "RemoveSessionPropertiesNode",
  "RequiredAttributesDecisionNode",
  "RetryLimitDecisionNode",
  "ScriptedDecisionNode",
  "SelectIdPNode",
  "SessionDataNode",
  "SetFailureUrlNode",
  "SetPersistentCookieNode",
  "SetSessionPropertiesNode",
  "SetSuccessUrlNode",
  "SocialFacebookNode",
  "SocialGoogleNode",
  "SocialNode",
  "SocialOAuthIgnoreProfileNode",
  "SocialOpenIdConnectNode",
  "SocialProviderHandlerNode",
  "TermsAndConditionsDecisionNode",
  "TimerStartNode",
  "TimerStopNode",
  "TimeSinceDecisionNode",
  "UsernameCollectorNode",
  "ValidatedPasswordNode",
  "ValidatedUsernameNode",
  "WebAuthnAuthenticationNode",
  "WebAuthnDeviceStorageNode",
  "WebAuthnRegistrationNode",
  "ZeroPageLoginNode"
];
var DEPRECATED_NODE_TYPES_7 = [];
var OOTB_NODE_TYPES_7_1 = [
  "GetAuthenticatorAppNode",
  "MultiFactorRegistrationOptionsNode",
  "OptOutMultiFactorAuthenticationNode",
  "PushRegistrationNode"
].concat(OOTB_NODE_TYPES_7);
var DEPRECATED_NODE_TYPES_7_1 = [].concat(DEPRECATED_NODE_TYPES_7);
var OOTB_NODE_TYPES_7_2 = [
  "ConfigProviderNode",
  "DebugNode",
  "OathRegistrationNode",
  "OathTokenVerifierNode",
  "PassthroughAuthenticationNode",
  "product-CaptchaNode",
  "PushWaitNode",
  "SetCustomCookieNode"
].concat(OOTB_NODE_TYPES_7_1);
var DEPRECATED_NODE_TYPES_7_2 = ["product-ReCaptchaNode"].concat(
  DEPRECATED_NODE_TYPES_7_1
);
var OOTB_NODE_TYPES_7_3 = [
  "CombinedMultiFactorRegistrationNode",
  "OathDeviceStorageNode",
  "OidcNode"
].concat(OOTB_NODE_TYPES_7_2);
var DEPRECATED_NODE_TYPES_7_3 = [].concat(DEPRECATED_NODE_TYPES_7_2);
var OOTB_NODE_TYPES_7_4 = ["QueryParameterNode"].concat(OOTB_NODE_TYPES_7_3);
var DEPRECATED_NODE_TYPES_7_4 = [].concat(DEPRECATED_NODE_TYPES_7_3);
var OOTB_NODE_TYPES_7_5 = [
  "DeviceBindingNode",
  "DeviceBindingStorageNode",
  "DeviceSigningVerifierNode"
].concat(OOTB_NODE_TYPES_7_4);
var DEPRECATED_NODE_TYPES_7_5 = ["SocialProviderHandlerNode"].concat(
  DEPRECATED_NODE_TYPES_7_4
);
var OOTB_NODE_TYPES_8 = [].concat(OOTB_NODE_TYPES_7_5);
var DEPRECATED_NODE_TYPES_8 = [].concat(DEPRECATED_NODE_TYPES_7_5);
var OOTB_NODE_TYPES_6_5 = [
  "AbstractSocialAuthLoginNode",
  "AccountLockoutNode",
  "AgentDataStoreDecisionNode",
  "AnonymousUserNode",
  "AuthLevelDecisionNode",
  "ChoiceCollectorNode",
  "CookiePresenceDecisionNode",
  "CreatePasswordNode",
  "DataStoreDecisionNode",
  "InnerTreeEvaluatorNode",
  "LdapDecisionNode",
  "MessageNode",
  "MetadataNode",
  "MeterNode",
  "ModifyAuthLevelNode",
  "OneTimePasswordCollectorDecisionNode",
  "OneTimePasswordGeneratorNode",
  "OneTimePasswordSmsSenderNode",
  "OneTimePasswordSmtpSenderNode",
  "PageNode",
  "PasswordCollectorNode",
  "PersistentCookieDecisionNode",
  "PollingWaitNode",
  "ProvisionDynamicAccountNode",
  "ProvisionIdmAccountNode",
  "PushAuthenticationSenderNode",
  "PushResultVerifierNode",
  "RecoveryCodeCollectorDecisionNode",
  "RecoveryCodeDisplayNode",
  "RegisterLogoutWebhookNode",
  "RemoveSessionPropertiesNode",
  "RetryLimitDecisionNode",
  "ScriptedDecisionNode",
  "SessionDataNode",
  "SetFailureUrlNode",
  "SetPersistentCookieNode",
  "SetSessionPropertiesNode",
  "SetSuccessUrlNode",
  "SocialFacebookNode",
  "SocialGoogleNode",
  "SocialNode",
  "SocialOAuthIgnoreProfileNode",
  "SocialOpenIdConnectNode",
  "TimerStartNode",
  "TimerStopNode",
  "UsernameCollectorNode",
  "WebAuthnAuthenticationNode",
  "WebAuthnRegistrationNode",
  "ZeroPageLoginNode"
];
var OOTB_NODE_TYPES_6 = [
  "AbstractSocialAuthLoginNode",
  "AccountLockoutNode",
  "AgentDataStoreDecisionNode",
  "AnonymousUserNode",
  "AuthLevelDecisionNode",
  "ChoiceCollectorNode",
  "CookiePresenceDecisionNode",
  "CreatePasswordNode",
  "DataStoreDecisionNode",
  "InnerTreeEvaluatorNode",
  "LdapDecisionNode",
  "MessageNode",
  "MetadataNode",
  "MeterNode",
  "ModifyAuthLevelNode",
  "OneTimePasswordCollectorDecisionNode",
  "OneTimePasswordGeneratorNode",
  "OneTimePasswordSmsSenderNode",
  "OneTimePasswordSmtpSenderNode",
  "PageNode",
  "PasswordCollectorNode",
  "PersistentCookieDecisionNode",
  "PollingWaitNode",
  "ProvisionDynamicAccountNode",
  "ProvisionIdmAccountNode",
  "PushAuthenticationSenderNode",
  "PushResultVerifierNode",
  "RecoveryCodeCollectorDecisionNode",
  "RecoveryCodeDisplayNode",
  "RegisterLogoutWebhookNode",
  "RemoveSessionPropertiesNode",
  "RetryLimitDecisionNode",
  "ScriptedDecisionNode",
  "SessionDataNode",
  "SetFailureUrlNode",
  "SetPersistentCookieNode",
  "SetSessionPropertiesNode",
  "SetSuccessUrlNode",
  "SocialFacebookNode",
  "SocialGoogleNode",
  "SocialNode",
  "SocialOAuthIgnoreProfileNode",
  "SocialOpenIdConnectNode",
  "TimerStartNode",
  "TimerStopNode",
  "UsernameCollectorNode",
  "WebAuthnAuthenticationNode",
  "WebAuthnRegistrationNode",
  "ZeroPageLoginNode"
];
var CLOUD_EXCLUDED_NODE_TYPES = [
  "CreatePasswordNode",
  "ProvisionDynamicAccountNode",
  "ProvisionIdmAccountNode",
  "SocialFacebookNode",
  "SocialGoogleNode",
  "SocialNode",
  "SocialOAuthIgnoreProfileNode",
  "SocialOpenIdConnectNode"
];
var CLOUD_ONLY_NODE_TYPES = [
  "IdentityStoreDecisionNode",
  "AutonomousAccessSignalNode",
  "AutonomousAccessDecisionNode",
  "AutonomousAccessResultNode"
];
var PREMIUM_NODE_TYPES = [
  "AutonomousAccessSignalNode",
  "AutonomousAccessDecisionNode",
  "AutonomousAccessResultNode"
];
function isPremiumNode(nodeType) {
  return PREMIUM_NODE_TYPES.includes(nodeType);
}
function isCloudOnlyNode(nodeType) {
  return CLOUD_ONLY_NODE_TYPES.includes(nodeType);
}
function isCloudExcludedNode({
  nodeType,
  state: state2
}) {
  return state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY && CLOUD_EXCLUDED_NODE_TYPES.includes(nodeType);
}
function isDeprecatedNode({
  nodeType,
  state: state2
}) {
  let deprecatedNodeTypes = [];
  switch (state2.getAmVersion()) {
    case "8.0.0":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_8.slice(0);
      break;
    case "7.1.0":
    case "7.1.1":
    case "7.1.2":
    case "7.1.3":
    case "7.1.4":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7_1.slice(0);
      break;
    case "7.2.0":
    case "7.2.1":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7_2.slice(0);
      break;
    case "7.3.0":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7_3.slice(0);
      break;
    case "7.4.0":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7_4.slice(0);
      break;
    case "7.5.0":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7_5.slice(0);
      break;
    case "7.0.0":
    case "7.0.1":
    case "7.0.2":
      deprecatedNodeTypes = DEPRECATED_NODE_TYPES_7.slice(0);
      break;
    default:
      return false;
  }
  return deprecatedNodeTypes.includes(nodeType);
}
function isCustomNode({
  nodeType,
  state: state2
}) {
  let ootbNodeTypes = [];
  switch (state2.getAmVersion()) {
    case "8.0.0":
      ootbNodeTypes = OOTB_NODE_TYPES_8.slice(0);
      break;
    case "7.1.0":
    case "7.1.1":
    case "7.1.2":
    case "7.1.3":
    case "7.1.4":
      ootbNodeTypes = OOTB_NODE_TYPES_7_1.slice(0);
      break;
    case "7.2.0":
    case "7.2.1":
      ootbNodeTypes = OOTB_NODE_TYPES_7_2.slice(0);
      break;
    case "7.3.0":
      ootbNodeTypes = OOTB_NODE_TYPES_7_3.slice(0);
      break;
    case "7.4.0":
      ootbNodeTypes = OOTB_NODE_TYPES_7_4.slice(0);
      break;
    case "7.5.0":
      ootbNodeTypes = OOTB_NODE_TYPES_7_5.slice(0);
      break;
    case "7.0.0":
    case "7.0.1":
    case "7.0.2":
      ootbNodeTypes = OOTB_NODE_TYPES_7.slice(0);
      break;
    case "6.5.3":
    case "6.5.2.3":
    case "6.5.2.2":
    case "6.5.2.1":
    case "6.5.2":
    case "6.5.1":
    case "6.5.0.2":
    case "6.5.0.1":
      ootbNodeTypes = OOTB_NODE_TYPES_6_5.slice(0);
      break;
    case "6.0.0.7":
    case "6.0.0.6":
    case "6.0.0.5":
    case "6.0.0.4":
    case "6.0.0.3":
    case "6.0.0.2":
    case "6.0.0.1":
    case "6.0.0":
      ootbNodeTypes = OOTB_NODE_TYPES_6.slice(0);
      break;
    default:
      return true;
  }
  return !ootbNodeTypes.includes(nodeType) && !isPremiumNode(nodeType) && !isCloudOnlyNode(nodeType);
}
function getNodeClassification({
  nodeType,
  state: state2
}) {
  const classifications = [];
  const premium = isPremiumNode(nodeType);
  const custom = isCustomNode({ nodeType, state: state2 });
  const cloud = isCloudOnlyNode(nodeType);
  const excluded = isCloudExcludedNode({ nodeType, state: state2 });
  const deprecated = isDeprecatedNode({ nodeType, state: state2 });
  if (custom) {
    classifications.push("custom" /* CUSTOM */);
  } else if (cloud) {
    classifications.push("cloud" /* CLOUD */);
  } else if (excluded) {
    classifications.push("excluded" /* EXCLUDED */);
  } else {
    classifications.push("standard" /* STANDARD */);
  }
  if (premium)
    classifications.push("premium" /* PREMIUM */);
  if (deprecated)
    classifications.push("deprecated" /* DEPRECATED */);
  return classifications;
}

// src/ops/ThemeOps.ts
import { v4 as uuidv44 } from "uuid";
var THEMEREALM_ID = "ui/themerealm";
var ThemeOps_default = (state2) => {
  return {
    createThemeExportTemplate() {
      return createThemeExportTemplate({ state: state2 });
    },
    async readThemes() {
      return readThemes({ state: state2 });
    },
    async readTheme(themeId, realm = state2.getRealm()) {
      return readTheme({ themeId, realm, state: state2 });
    },
    async readThemeByName(themeName, realm = state2.getRealm()) {
      return readThemeByName({ themeName, realm, state: state2 });
    },
    async exportThemes() {
      return exportThemes({ state: state2 });
    },
    async createTheme(themeData, themeId, realm) {
      return createTheme({ themeId, themeData, realm, state: state2 });
    },
    async updateTheme(themeId, themeData, realm = state2.getRealm()) {
      return updateTheme({ themeId, themeData, realm, state: state2 });
    },
    async updateThemeByName(themeName, themeData, realm = state2.getRealm()) {
      return updateThemeByName({ themeName, themeData, realm, state: state2 });
    },
    async updateThemes(themeMap) {
      return updateThemes({ themeMap, state: state2 });
    },
    async importThemes(importData) {
      return importThemes({ importData, state: state2 });
    },
    async deleteTheme(themeId, realm = state2.getRealm()) {
      return deleteTheme({ themeId, realm, state: state2 });
    },
    async deleteThemeByName(themeName, realm = state2.getRealm()) {
      return deleteThemeByName({ themeName, realm, state: state2 });
    },
    async deleteThemes(realm = state2.getRealm()) {
      return deleteThemes({ realm, state: state2 });
    },
    // Deprecated
    async getThemes() {
      return readThemes({ state: state2 });
    },
    async getTheme(themeId, realm = state2.getRealm()) {
      return readTheme({ themeId, realm, state: state2 });
    },
    async getThemeByName(themeName, realm = state2.getRealm()) {
      return readThemeByName({ themeName, realm, state: state2 });
    },
    async putTheme(themeId, themeData, realm = state2.getRealm()) {
      return updateTheme({ themeId, themeData, realm, state: state2 });
    },
    async putThemeByName(themeName, themeData, realm = state2.getRealm()) {
      return updateThemeByName({ themeName, themeData, realm, state: state2 });
    },
    async putThemes(themeMap) {
      return updateThemes({ themeMap, state: state2 });
    }
  };
};
function createThemeExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    theme: {}
  };
}
function getRealmThemes({
  themes,
  realm
}) {
  if (themes.realm && themes.realm[realm]) {
    return themes.realm[realm];
  }
  return [];
}
async function readThemes({
  realm = null,
  state: state2
}) {
  try {
    realm = realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    return getRealmThemes({ themes, realm });
  } catch (error) {
    throw new FrodoError(`Error reading themes`, error);
  }
}
async function readTheme({
  themeId,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const found = getRealmThemes({ themes, realm }).filter(
      (theme) => theme._id === themeId
    );
    if (found.length === 1) {
      return found[0];
    }
    if (found.length > 1) {
      throw new FrodoError(
        `Multiple themes with id '${themeId}' found in realm '${realm}'!`
      );
    }
    throw new FrodoError(
      `Theme with id '${themeId}' not found in realm '${realm}'!`
    );
  } catch (error) {
    throw new FrodoError(`Error reading theme ${themeId}`, error);
  }
}
async function readThemeByName({
  themeName,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const found = getRealmThemes({ themes, realm }).filter(
      (theme) => theme.name === themeName
    );
    if (found.length === 1) {
      return found[0];
    }
    if (found.length > 1) {
      throw new Error(
        `Multiple themes with the name '${themeName}' found in realm '${realm}'!`
      );
    }
    throw new Error(`Theme '${themeName}' not found in realm '${realm}'!`);
  } catch (error) {
    throw new FrodoError(`Error reading theme ${themeName}`, error);
  }
}
async function exportThemes({
  state: state2
}) {
  let indicatorId;
  try {
    debugMessage({ message: `ThemeOps.exportThemes: start`, state: state2 });
    const exportData = createThemeExportTemplate({ state: state2 });
    const themes = await readThemes({ state: state2 });
    indicatorId = createProgressIndicator({
      total: themes.length,
      message: "Exporting themes...",
      state: state2
    });
    for (const theme of themes) {
      if (!theme._id)
        theme._id = uuidv44();
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting theme ${theme.name}`,
        state: state2
      });
      exportData.theme[theme._id] = theme;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${themes.length} themes.`,
      state: state2
    });
    debugMessage({ message: `ThemeOps.exportThemes: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting themes.`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error reading themes`, error);
  }
}
async function createTheme({
  themeData,
  themeId,
  realm,
  state: state2
}) {
  try {
    await readTheme({ themeId, realm, state: state2 });
  } catch (error) {
    try {
      const result = await updateTheme({
        themeId,
        themeData,
        realm,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating theme ${themeId}`, error2);
    }
  }
}
async function updateTheme({
  themeId,
  themeData,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const data = themeData;
    data._id = themeId;
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    let isNew = true;
    const realmThemes = getRealmThemes({ themes, realm }).map((theme) => {
      if (theme._id === themeId) {
        isNew = false;
        return data;
      }
      if (data.isDefault)
        theme.isDefault = false;
      return theme;
    });
    if (isNew) {
      realmThemes.push(data);
    }
    themes.realm[realm] = realmThemes;
    const found = getRealmThemes({
      themes: await putConfigEntity({
        entityId: THEMEREALM_ID,
        entityData: themes,
        state: state2
      }),
      realm
    }).filter((theme) => theme._id === themeId);
    if (found.length === 1) {
      return found[0];
    }
    if (found.length > 1) {
      throw new FrodoError(
        `Multiple themes with id '${themeId}' found in realm '${realm}'!`
      );
    }
    throw new FrodoError(
      `Theme with id '${themeId}' not saved in realm '${realm}'!`
    );
  } catch (error) {
    throw new FrodoError(`Error updating theme ${themeId}`, error);
  }
}
async function updateThemeByName({
  themeName,
  themeData,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const data = themeData;
    data.name = themeName;
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    let isNew = true;
    const realmThemes = getRealmThemes({ themes, realm }).map((theme) => {
      if (theme.name === themeName) {
        isNew = false;
        return data;
      }
      if (data.isDefault)
        theme.isDefault = false;
      return theme;
    });
    if (isNew) {
      realmThemes.push(data);
    }
    themes["realm"][realm] = realmThemes;
    const found = getRealmThemes({
      themes: await putConfigEntity({
        entityId: THEMEREALM_ID,
        entityData: themes,
        state: state2
      }),
      realm
    }).filter((theme) => theme.name === themeName);
    if (found.length === 1) {
      return found[0];
    }
    if (found.length > 1) {
      throw new FrodoError(
        `Multiple themes '${themeName}' found in realm '${realm}'!`
      );
    }
    throw new FrodoError(`Theme '${themeName}' not saved in realm '${realm}'!`);
  } catch (error) {
    throw new FrodoError(`Error updating theme ${themeName}`, error);
  }
}
async function updateThemes({
  themeMap,
  realm = null,
  state: state2
}) {
  try {
    debugMessage({ message: `ThemeApi.putThemes: start`, state: state2 });
    realm = realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const allThemeIDs = Object.keys(themeMap);
    const existingThemeIDs = [];
    let defaultThemeId = null;
    let realmThemes = getRealmThemes({ themes, realm }).map((theme) => {
      if (themeMap[theme._id]) {
        debugMessage({
          message: `Update theme: ${theme._id} - ${theme.name}`,
          state: state2
        });
        existingThemeIDs.push(theme._id);
        if (themeMap[theme._id].isDefault)
          defaultThemeId = theme._id;
        return themeMap[theme._id];
      }
      return theme;
    });
    const newThemeIDs = allThemeIDs.filter(
      (id2) => !existingThemeIDs.includes(id2)
    );
    newThemeIDs.forEach((themeId) => {
      debugMessage({
        message: `Add theme: ${themeMap[themeId]._id} - ${themeMap[themeId].name}`,
        state: state2
      });
      if (themeMap[themeId].isDefault)
        defaultThemeId = themeId;
      realmThemes.push(themeMap[themeId]);
    });
    if (defaultThemeId) {
      realmThemes = realmThemes.map((theme) => {
        theme.isDefault = theme._id === defaultThemeId;
        return theme;
      });
    }
    themes.realm[realm] = realmThemes;
    const updatedThemes = new Map(
      getRealmThemes({
        themes: await putConfigEntity({
          entityId: THEMEREALM_ID,
          entityData: themes,
          state: state2
        }),
        realm
      }).map((theme) => [theme._id, theme])
    );
    debugMessage({
      message: updatedThemes,
      state: state2
    });
    debugMessage({ message: `ThemeApi.putThemes: finished`, state: state2 });
    return updatedThemes;
  } catch (error) {
    throw new FrodoError(`Error updating themes`, error);
  }
}
async function importThemes({
  importData,
  realm = null,
  state: state2
}) {
  try {
    debugMessage({ message: `ThemeOps.importThemes: start`, state: state2 });
    const map = await updateThemes({
      themeMap: importData.theme,
      realm,
      state: state2
    });
    const response = Array.from(map.values());
    debugMessage({ message: `ThemeOps.importThemes: end`, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error importing themes`, error);
  }
}
async function deleteTheme({
  themeId,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const realmThemes = getRealmThemes({ themes, realm });
    const deletedThemes = [];
    const finalThemes = realmThemes.filter((theme) => {
      if (theme._id !== themeId) {
        return true;
      }
      deletedThemes.push(theme);
      return false;
    });
    if (realmThemes.length === finalThemes.length)
      throw new FrodoError(`'${themeId}' not found in realm '${realm}'`);
    themes.realm[realm] = finalThemes;
    const undeletedThemes = getRealmThemes({
      themes: await putConfigEntity({
        entityId: THEMEREALM_ID,
        entityData: themes,
        state: state2
      }),
      realm
    }).filter((theme) => deletedThemes.includes(theme));
    if (deletedThemes.length > 0 && undeletedThemes.length === 0) {
      return deletedThemes[0];
    }
    throw new FrodoError(
      `Theme with id '${undeletedThemes.map(
        (theme) => theme._id
      )}' not deleted from realm '${realm}'!`
    );
  } catch (error) {
    throw new FrodoError(`Error deleting theme ${themeId}`, error);
  }
}
async function deleteThemeByName({
  themeName,
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const realmThemes = getRealmThemes({ themes, realm });
    const deletedThemes = [];
    const finalThemes = realmThemes.filter((theme) => {
      if (theme.name !== themeName) {
        return true;
      }
      deletedThemes.push(theme);
      return false;
    });
    if (realmThemes.length === finalThemes.length)
      throw new FrodoError(`'${themeName}' not found in realm '${realm}'`);
    themes.realm[realm] = finalThemes;
    const undeletedThemes = getRealmThemes({
      themes: await putConfigEntity({
        entityId: THEMEREALM_ID,
        entityData: themes,
        state: state2
      }),
      realm
    }).filter((theme) => deletedThemes.includes(theme));
    if (deletedThemes.length > 0 && undeletedThemes.length === 0) {
      return deletedThemes[0];
    }
    throw new FrodoError(
      `Theme(s) with id(s) '${undeletedThemes.map(
        (theme) => theme._id
      )}' not deleted from realm '${realm}'!`
    );
  } catch (error) {
    throw new FrodoError(`Error deleting theme ${themeName}`, error);
  }
}
async function deleteThemes({
  realm,
  state: state2
}) {
  try {
    realm ? realm : getCurrentRealmName(state2);
    const themes = await getConfigEntity({ entityId: THEMEREALM_ID, state: state2 });
    const realmThemes = themes.realm[realm];
    if (!realmThemes || realmThemes.length == 0)
      throw new FrodoError(`No theme configuration found for realm '${realm}'`);
    const deletedThemes = [];
    for (const theme of realmThemes) {
      deletedThemes.push(theme);
    }
    themes.realm[realm] = [];
    await putConfigEntity({
      entityId: THEMEREALM_ID,
      entityData: themes,
      state: state2
    });
    return deletedThemes;
  } catch (error) {
    throw new FrodoError(`Error deleting themes`, error);
  }
}

// src/ops/JourneyOps.ts
var JourneyOps_default = (state2) => {
  return {
    createSingleTreeExportTemplate() {
      return createSingleTreeExportTemplate({ state: state2 });
    },
    createMultiTreeExportTemplate() {
      return createMultiTreeExportTemplate({ state: state2 });
    },
    async exportJourney(treeId, options = {
      useStringArrays: true,
      deps: true,
      coords: true
    }) {
      return exportJourney({ journeyId: treeId, options, state: state2 });
    },
    async exportJourneys(options = {
      useStringArrays: true,
      deps: true,
      coords: true
    }) {
      return exportJourneys({ options, state: state2 });
    },
    async readJourneys() {
      return readJourneys({ state: state2 });
    },
    async readJourney(journeyId) {
      return readJourney({ journeyId, state: state2 });
    },
    async createJourney(journeyId, journeyData) {
      return createJourney({ journeyId, journeyData, state: state2 });
    },
    async updateJourney(journeyId, journeyData) {
      return updateJourney({ journeyId, journeyData, state: state2 });
    },
    async importJourney(treeObject, options) {
      return importJourney({ importData: treeObject, options, state: state2 });
    },
    async resolveDependencies(installedJorneys, journeyMap, unresolvedJourneys, resolvedJourneys, index = -1) {
      return resolveDependencies(
        installedJorneys,
        journeyMap,
        unresolvedJourneys,
        resolvedJourneys,
        index
      );
    },
    async importJourneys(treesMap, options) {
      return importJourneys({ importData: treesMap, options, state: state2 });
    },
    getNodeRef(nodeObj, singleTreeExport) {
      return getNodeRef(nodeObj, singleTreeExport);
    },
    onlineTreeExportResolver,
    fileByIdTreeExportResolver,
    createFileParamTreeExportResolver(file) {
      return createFileParamTreeExportResolver(file, state2);
    },
    async getTreeDescendents(treeExport, resolveTreeExport, resolvedTreeIds = []) {
      return getTreeDescendents({
        treeExport,
        resolveTreeExport,
        resolvedTreeIds,
        state: state2
      });
    },
    isCustomJourney(journey) {
      return isCustomJourney({ journey, state: state2 });
    },
    isPremiumJourney(journey) {
      return isPremiumJourney(journey);
    },
    isCloudOnlyJourney(journey) {
      return isCloudOnlyJourney(journey);
    },
    getJourneyClassification(journey) {
      return getJourneyClassification({ journey, state: state2 });
    },
    async deleteJourney(journeyId, options) {
      return deleteJourney({ journeyId, options, state: state2 });
    },
    async deleteJourneys(options) {
      return deleteJourneys({ options, state: state2 });
    },
    async enableJourney(journeyId) {
      return enableJourney({ journeyId, state: state2 });
    },
    async disableJourney(journeyId) {
      return disableJourney({ journeyId, state: state2 });
    },
    // Deprecated
    async getJourneys() {
      return readJourneys({ state: state2 });
    },
    async getJourney(journeyId) {
      return readJourney({ journeyId, state: state2 });
    },
    async importAllJourneys(treesMap, options) {
      return importJourneys({ importData: treesMap, options, state: state2 });
    },
    async findOrphanedNodes() {
      return findOrphanedNodes({ state: state2 });
    },
    async removeOrphanedNodes(orphanedNodes) {
      return removeOrphanedNodes({ orphanedNodes, state: state2 });
    }
  };
};
var containerNodes2 = ["PageNode", "CustomPageNode"];
var scriptedNodesConditions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClientScriptNode: (_nodeConfig) => {
    return true;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ConfigProviderNode: (_nodeConfig) => {
    return true;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DeviceMatchNode: (nodeConfig) => {
    return nodeConfig.useScript;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ScriptedDecisionNode: (_nodeConfig) => {
    return true;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SocialProviderHandlerNode: (_nodeConfig) => {
    return true;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CustomScriptNode: (_nodeConfig) => {
    return true;
  }
};
function hasScriptDependency(nodeConfig) {
  if (Object.keys(scriptedNodesConditions).includes(nodeConfig._type._id)) {
    const handler = scriptedNodesConditions[nodeConfig._type._id];
    return handler(nodeConfig);
  }
  return false;
}
var emailTemplateNodes = ["EmailSuspendNode", "EmailTemplateNode"];
var emptyScriptPlaceholder = "[Empty]";
function createSingleTreeExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    innerNodes: {},
    nodes: {},
    scripts: {},
    emailTemplates: {},
    socialIdentityProviders: {},
    themes: [],
    saml2Entities: {},
    circlesOfTrust: {},
    tree: {}
  };
}
function createMultiTreeExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    trees: {}
  };
}
async function updateCoordinates({
  tree,
  nodesAttributeName,
  serverTree,
  state: state2
}) {
  const nodeEntries = Object.entries(
    tree[nodesAttributeName]
  ).filter(
    ([, nodeInfo]) => nodeInfo.x === void 0 || nodeInfo.y === void 0
  );
  if (nodeEntries.length === 0) {
    return serverTree;
  }
  if (serverTree === null) {
    try {
      serverTree = await getTree({ id: tree._id, state: state2 });
    } catch (e) {
      if (!axios2.isAxiosError(e) || e.response.status !== 404) {
        throw e;
      }
    }
  }
  nodeEntries.forEach(([nodeId, nodeInfo]) => {
    const coords = serverTree == void 0 || serverTree[nodesAttributeName] == void 0 || serverTree[nodesAttributeName][nodeId] == void 0 ? {
      x: 0,
      y: 0
    } : serverTree[nodesAttributeName][nodeId];
    nodeInfo.x = nodeInfo.x === void 0 ? coords.x == void 0 ? 0 : coords.x : nodeInfo.x;
    nodeInfo.y = nodeInfo.y === void 0 ? coords.y == void 0 ? 0 : coords.y : nodeInfo.y;
  });
  return serverTree;
}
async function getSaml2NodeDependencies(nodeObject, allProviders, allCirclesOfTrust, state2) {
  const samlProperties = ["metaAlias", "idpEntityId"];
  const saml2EntityPromises = [];
  const saml2Entities = [];
  let circlesOfTrust = [];
  let saml2NodeDependencies = {
    saml2Entities,
    circlesOfTrust
  };
  const errors = [];
  for (const samlProperty of samlProperties) {
    const entityId = samlProperty === "metaAlias" ? nodeObject[samlProperty].split("/").pop() : nodeObject[samlProperty];
    const entity = findInArray(allProviders, { entityId });
    if (entity) {
      try {
        const providerResponse = await getProvider({
          location: entity.location,
          entityId64: entity._id,
          state: state2
        });
        providerResponse.entityLocation = entity.location;
        if (entity.location === "remote") {
          const metaDataResponse = await getProviderMetadata({
            entityId: providerResponse.entityId,
            state: state2
          });
          providerResponse.base64EntityXML = encodeBase64Url(metaDataResponse);
        }
        saml2EntityPromises.push(providerResponse);
      } catch (error) {
        error.message = `Error reading saml2 dependencies: ${error.response?.data?.message || error.message}`;
        errors.push(error);
      }
    }
  }
  try {
    const saml2EntitiesPromisesResults = await Promise.all(saml2EntityPromises);
    for (const saml2Entity of saml2EntitiesPromisesResults) {
      if (saml2Entity) {
        saml2Entities.push(saml2Entity);
      }
    }
    const samlEntityIds = saml2Entities.map(
      (saml2EntityConfig) => `${saml2EntityConfig.entityId}|saml2`
    );
    circlesOfTrust = allCirclesOfTrust.filter((circleOfTrust) => {
      let hasEntityId = false;
      for (const trustedProvider of circleOfTrust.trustedProviders) {
        if (!hasEntityId && samlEntityIds.includes(trustedProvider)) {
          hasEntityId = true;
        }
      }
      return hasEntityId;
    });
    saml2NodeDependencies = {
      saml2Entities,
      circlesOfTrust
    };
  } catch (error) {
    error.message = `Error reading saml2 dependencies: ${error.response?.data?.message || error.message}`;
    errors.push(error);
  }
  if (errors.length) {
    const errorMessages = errors.map((error) => error.message).join("\n");
    throw new Error(`Saml2 dependencies error:
${errorMessages}`);
  }
  return saml2NodeDependencies;
}
async function exportJourney({
  journeyId,
  options = {
    useStringArrays: true,
    deps: true,
    coords: true
  },
  state: state2
}) {
  debugMessage({
    message: `JourneyOps.exportJourney: start [journey=${journeyId}]`,
    state: state2
  });
  const exportData = createSingleTreeExportTemplate({ state: state2 });
  const errors = [];
  try {
    const treeObject = await getTree({ id: journeyId, state: state2 });
    const { useStringArrays, deps, coords } = options;
    const verbose = state2.getVerbose();
    if (verbose)
      printMessage({
        message: `- ${treeObject._id}`,
        type: "info",
        newline: false,
        state: state2
      });
    if (verbose)
      printMessage({ message: "\n  - Flow", newline: false, state: state2 });
    exportData.tree = treeObject;
    if (verbose && treeObject.identityResource)
      printMessage({
        message: `
    - identityResource: ${treeObject.identityResource}`,
        type: "info",
        newline: false,
        state: state2
      });
    if (verbose)
      printMessage({
        message: `
    - Done`,
        newline: false,
        type: "info",
        state: state2
      });
    const nodePromises = [];
    const scriptPromises = [];
    const emailTemplatePromises = [];
    const innerNodePromises = [];
    const saml2ConfigPromises = [];
    let socialProviderPromise = null;
    let themePromise = null;
    if (deps && state2.getDeploymentType() !== Constants_default.CLASSIC_DEPLOYMENT_TYPE_KEY) {
      themePromise = readThemes({ state: state2 });
    }
    let allSaml2Providers = null;
    let allCirclesOfTrust = null;
    let filteredSocialProviders = null;
    const themes = [];
    for (const [nodeId, nodeInfo] of Object.entries(treeObject.nodes)) {
      nodePromises.push(
        getNode({ nodeId, nodeType: nodeInfo["nodeType"], state: state2 })
      );
      if (!coords) {
        delete nodeInfo["x"];
        delete nodeInfo["y"];
      }
    }
    if (!coords) {
      for (const [, nodeInfo] of Object.entries(treeObject.staticNodes)) {
        delete nodeInfo["x"];
        delete nodeInfo["y"];
      }
    }
    if (verbose && nodePromises.length > 0)
      printMessage({ message: "\n  - Nodes:", newline: false, state: state2 });
    const nodeObjects = await Promise.all(nodePromises);
    for (const nodeObject of nodeObjects) {
      const nodeId = nodeObject._id;
      const nodeType = nodeObject._type._id;
      if (verbose)
        printMessage({
          message: `
    - ${nodeId} (${nodeType})`,
          type: "info",
          newline: false,
          state: state2
        });
      exportData.nodes[nodeObject._id] = nodeObject;
      if (deps && hasScriptDependency(nodeObject) && nodeObject.script !== emptyScriptPlaceholder) {
        scriptPromises.push(getScript({ scriptId: nodeObject.script, state: state2 }));
      }
      if (deps && state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY || state2.getDeploymentType() === Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY) {
        if (emailTemplateNodes.includes(nodeType)) {
          try {
            const emailTemplate = await readEmailTemplate({
              templateId: nodeObject.emailTemplateName,
              state: state2
            });
            emailTemplatePromises.push(emailTemplate);
          } catch (error) {
            error.message = `Error reading email template ${nodeObject.emailTemplateName}: ${error.response?.data?.message || error.message}`;
            errors.push(error);
          }
        }
      }
      if (deps && nodeType === "product-Saml2Node") {
        if (!allSaml2Providers) {
          try {
            allSaml2Providers = await readSaml2ProviderStubs({ state: state2 });
          } catch (error) {
            errors.push(new FrodoError(`Error reading saml2 providers`, error));
          }
        }
        if (!allCirclesOfTrust) {
          try {
            allCirclesOfTrust = await readCirclesOfTrust({ state: state2 });
          } catch (error) {
            errors.push(
              new FrodoError(`Error reading circles of trust`, error)
            );
          }
        }
        saml2ConfigPromises.push(
          getSaml2NodeDependencies(
            nodeObject,
            allSaml2Providers,
            allCirclesOfTrust,
            state2
          )
        );
      }
      if (deps && !socialProviderPromise && nodeType === "SocialProviderHandlerNode") {
        socialProviderPromise = getSocialIdentityProviders({ state: state2 });
      }
      if (deps && !filteredSocialProviders && nodeType === "SelectIdPNode") {
        filteredSocialProviders = filteredSocialProviders || [];
        for (const filteredProvider of nodeObject.filteredProviders) {
          if (!filteredSocialProviders.includes(filteredProvider)) {
            filteredSocialProviders.push(filteredProvider);
          }
        }
      }
      if (containerNodes2.includes(nodeType)) {
        for (const innerNode of nodeObject.nodes) {
          innerNodePromises.push(
            getNode({
              nodeId: innerNode._id,
              nodeType: innerNode.nodeType,
              state: state2
            })
          );
        }
        if (deps && state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY || state2.getDeploymentType() === Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY) {
          let themeId = false;
          if (nodeObject.stage) {
            try {
              themeId = JSON.parse(nodeObject.stage).themeId;
            } catch (e) {
              themeId = false;
            }
            if (!themeId && nodeObject.stage.indexOf("themeId=") === 0) {
              themeId = nodeObject.stage.split("=")[1];
            }
          }
          if (themeId) {
            if (!themes.includes(themeId))
              themes.push(themeId);
          }
        }
      }
    }
    if (verbose && innerNodePromises.length > 0)
      printMessage({ message: "\n  - Inner nodes:", newline: false, state: state2 });
    try {
      const settledPromises = await Promise.allSettled(innerNodePromises);
      for (const settledPromise of settledPromises) {
        if (settledPromise.status === "fulfilled" && settledPromise.value) {
          const innerNodeObject = settledPromise.value;
          const innerNodeId = innerNodeObject._id;
          const innerNodeType = innerNodeObject._type._id;
          if (verbose)
            printMessage({
              message: `
    - ${innerNodeId} (${innerNodeType})`,
              type: "info",
              newline: false,
              state: state2
            });
          exportData.innerNodes[innerNodeId] = innerNodeObject;
          if (deps && hasScriptDependency(innerNodeObject)) {
            scriptPromises.push(
              getScript({ scriptId: innerNodeObject.script, state: state2 })
            );
          }
          if (deps && state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY || state2.getDeploymentType() === Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY) {
            if (emailTemplateNodes.includes(innerNodeType)) {
              try {
                const emailTemplate = await readEmailTemplate({
                  templateId: innerNodeObject.emailTemplateName,
                  state: state2
                });
                emailTemplatePromises.push(emailTemplate);
              } catch (error) {
                errors.push(
                  new FrodoError(`Error reading email template`, error)
                );
              }
            }
          }
          if (deps && innerNodeType === "product-Saml2Node") {
            if (!allSaml2Providers) {
              try {
                allSaml2Providers = await readSaml2ProviderStubs({ state: state2 });
              } catch (error) {
                errors.push(
                  new FrodoError(`Error reading saml2 providers`, error)
                );
              }
            }
            if (!allCirclesOfTrust) {
              try {
                allCirclesOfTrust = await readCirclesOfTrust({ state: state2 });
              } catch (error) {
                errors.push(
                  new FrodoError(`Error reading circles of trust`, error)
                );
              }
            }
            saml2ConfigPromises.push(
              getSaml2NodeDependencies(
                innerNodeObject,
                allSaml2Providers,
                allCirclesOfTrust,
                state2
              )
            );
          }
          if (deps && !socialProviderPromise && innerNodeType === "SocialProviderHandlerNode") {
            socialProviderPromise = getSocialIdentityProviders({ state: state2 });
          }
          if (deps && !filteredSocialProviders && innerNodeType === "SelectIdPNode" && innerNodeObject.filteredProviders) {
            filteredSocialProviders = filteredSocialProviders || [];
            for (const filteredProvider of innerNodeObject.filteredProviders) {
              if (!filteredSocialProviders.includes(filteredProvider)) {
                filteredSocialProviders.push(filteredProvider);
              }
            }
          }
        } else if (settledPromise.status === "rejected") {
          errors.push(new FrodoError(settledPromise.reason));
        }
      }
    } catch (error) {
      errors.push(new FrodoError(`Error reading inner nodes`, error));
    }
    if (verbose && emailTemplatePromises.length > 0)
      printMessage({
        message: "\n  - Email templates:",
        newline: false,
        state: state2
      });
    try {
      const settledEmailTemplatePromises = await Promise.allSettled(
        emailTemplatePromises
      );
      for (const settledPromise of settledEmailTemplatePromises) {
        if (settledPromise.status === "fulfilled" && settledPromise.value) {
          if (verbose)
            printMessage({
              message: `
    - ${settledPromise.value._id.split("/")[1]}${settledPromise.value.displayName ? ` (${settledPromise.value.displayName})` : ""}`,
              type: "info",
              newline: false,
              state: state2
            });
          exportData.emailTemplates[settledPromise.value._id.split("/")[1]] = settledPromise.value;
        }
      }
    } catch (error) {
      errors.push(new FrodoError(`Error reading email templates`, error));
    }
    try {
      const saml2NodeDependencies = await Promise.all(saml2ConfigPromises);
      for (const saml2NodeDependency of saml2NodeDependencies) {
        if (saml2NodeDependency) {
          if (verbose)
            printMessage({
              message: "\n  - SAML2 entity providers:",
              newline: false,
              state: state2
            });
          for (const saml2Entity of saml2NodeDependency.saml2Entities) {
            if (verbose)
              printMessage({
                message: `
    - ${saml2Entity.entityLocation} ${saml2Entity.entityId}`,
                type: "info",
                newline: false,
                state: state2
              });
            exportData.saml2Entities[saml2Entity._id] = saml2Entity;
          }
          if (verbose)
            printMessage({
              message: "\n  - SAML2 circles of trust:",
              newline: false,
              state: state2
            });
          for (const circleOfTrust of saml2NodeDependency.circlesOfTrust) {
            if (verbose)
              printMessage({
                message: `
    - ${circleOfTrust._id}`,
                type: "info",
                newline: false,
                state: state2
              });
            exportData.circlesOfTrust[circleOfTrust._id] = circleOfTrust;
          }
        }
      }
    } catch (error) {
      errors.push(new FrodoError(`Error reading saml2 dependencies`, error));
    }
    try {
      const socialProviders = await Promise.resolve(socialProviderPromise);
      if (socialProviders) {
        if (verbose)
          printMessage({
            message: "\n  - OAuth2/OIDC (social) identity providers:",
            newline: false,
            state: state2
          });
        for (const socialProvider of socialProviders.result) {
          if (socialProvider && (!filteredSocialProviders || filteredSocialProviders.length === 0 || filteredSocialProviders.includes(socialProvider._id))) {
            if (verbose)
              printMessage({
                message: `
    - ${socialProvider._id}`,
                type: "info",
                newline: false,
                state: state2
              });
            scriptPromises.push(
              getScript({ scriptId: socialProvider.transform, state: state2 })
            );
            exportData.socialIdentityProviders[socialProvider._id] = socialProvider;
          }
        }
      }
    } catch (error) {
      errors.push(
        new FrodoError(`Error reading social identity providers`, error)
      );
    }
    if (verbose && scriptPromises.length > 0)
      printMessage({ message: "\n  - Scripts:", newline: false, state: state2 });
    try {
      const scriptObjects = await Promise.all(scriptPromises);
      for (const scriptObject of scriptObjects) {
        if (scriptObject) {
          if (verbose)
            printMessage({
              message: `
    - ${scriptObject._id} (${scriptObject.name})`,
              type: "info",
              newline: false,
              state: state2
            });
          scriptObject.script = useStringArrays ? convertBase64TextToArray(scriptObject.script) : JSON.stringify(decode(scriptObject.script));
          exportData.scripts[scriptObject._id] = scriptObject;
        }
      }
    } catch (error) {
      errors.push(new FrodoError(`Error reading scripts`, error));
    }
    if (themePromise) {
      if (verbose)
        printMessage({ message: "\n  - Themes:", newline: false, state: state2 });
      try {
        const themePromiseResults = await Promise.resolve(themePromise);
        for (const themeObject of themePromiseResults) {
          if (themeObject && // has the theme been specified by id or name in a page node?
          (themes.includes(themeObject._id) || themes.includes(themeObject.name) || // has this journey been linked to a theme?
          themeObject.linkedTrees?.includes(treeObject._id))) {
            if (verbose)
              printMessage({
                message: `
    - ${themeObject._id} (${themeObject.name})`,
                type: "info",
                newline: false,
                state: state2
              });
            exportData.themes.push(themeObject);
          }
        }
      } catch (error) {
        errors.push(new FrodoError(`Error reading themes`, error));
      }
    }
    if (verbose)
      printMessage({
        message: `
`,
        type: "info",
        newline: false,
        state: state2
      });
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting journey ${journeyId}`, errors);
  }
  debugMessage({
    message: `JourneyOps.exportJourney: end [journey=${journeyId}]`,
    state: state2
  });
  return exportData;
}
async function exportJourneys({
  options = {
    useStringArrays: true,
    deps: true,
    coords: true
  },
  state: state2
}) {
  const errors = [];
  let indicatorId;
  try {
    const trees = await readJourneys({ state: state2 });
    const multiTreeExport = createMultiTreeExportTemplate({ state: state2 });
    indicatorId = createProgressIndicator({
      total: trees.length,
      message: "Exporting journeys...",
      state: state2
    });
    for (const tree of trees) {
      try {
        updateProgressIndicator({
          id: indicatorId,
          message: `Exporting journey ${tree._id}`,
          state: state2
        });
        const exportData = await exportJourney({
          journeyId: tree._id,
          options,
          state: state2
        });
        delete exportData.meta;
        multiTreeExport.trees[tree._id] = exportData;
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting journeys`, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${trees.length} journeys.`,
      state: state2
    });
    return multiTreeExport;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting journeys.`,
      status: "fail",
      state: state2
    });
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting journeys`, error);
  }
}
async function readJourneys({
  state: state2
}) {
  try {
    const { result } = await getTrees({ state: state2 });
    result.sort((a, b) => a._id.localeCompare(b._id));
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading journeys`, error);
  }
}
async function readJourney({
  journeyId,
  state: state2
}) {
  try {
    const response = await getTree({ id: journeyId, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error reading journey ${journeyId}`, error);
  }
}
async function createJourney({
  journeyId,
  journeyData,
  state: state2
}) {
  debugMessage({ message: `JourneyOps.createJourney: start`, state: state2 });
  try {
    await readJourney({ journeyId, state: state2 });
  } catch (error) {
    try {
      const result = await putTree({
        treeId: journeyId,
        treeData: journeyData,
        state: state2
      });
      debugMessage({ message: `JourneyOps.createJourney: end`, state: state2 });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating journey ${journeyId}`, error2);
    }
  }
  throw new FrodoError(`Journey ${journeyId} already exists!`);
}
async function updateJourney({
  journeyId,
  journeyData,
  state: state2
}) {
  try {
    const response = await putTree({
      treeId: journeyId,
      treeData: journeyData,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(`Error updating journey ${journeyId}`, error);
  }
}
async function importJourney({
  importData,
  options,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  try {
    const { reUuid, deps } = options;
    const verbose = state2.getVerbose();
    if (verbose)
      printMessage({
        message: `- ${importData.tree._id}
`,
        type: "info",
        newline: false,
        state: state2
      });
    let newUuid = "";
    const uuidMap = {};
    const treeId = importData.tree._id;
    if (deps && importData.scripts && Object.entries(importData.scripts).length > 0) {
      if (verbose)
        printMessage({ message: "  - Scripts:", newline: false, state: state2 });
      for (const [scriptId, scriptObject] of Object.entries(
        importData.scripts
      )) {
        if (verbose)
          printMessage({
            message: `
    - ${scriptId} (${scriptObject["name"]})`,
            type: "info",
            newline: false,
            state: state2
          });
        if (Array.isArray(scriptObject["script"])) {
          scriptObject["script"] = convertTextArrayToBase64(
            scriptObject["script"]
          );
        } else if (!isBase64Encoded(scriptObject["script"])) {
          scriptObject["script"] = encode(JSON.parse(scriptObject["script"]));
        }
        try {
          await updateScript({ scriptId, scriptData: scriptObject, state: state2 });
        } catch (error) {
          errors.push(
            new FrodoError(
              `Error importing script ${scriptObject["name"]} (${scriptId}) in journey ${treeId}`,
              error
            )
          );
        }
        if (verbose)
          printMessage({ message: "", state: state2 });
      }
    }
    if (deps && importData.emailTemplates && Object.entries(importData.emailTemplates).length > 0) {
      if (verbose)
        printMessage({
          message: "\n  - Email templates:",
          newline: false,
          state: state2
        });
      for (const [templateId, templateData] of Object.entries(
        importData.emailTemplates
      )) {
        if (verbose)
          printMessage({
            message: `
    - ${templateId}`,
            type: "info",
            newline: false,
            state: state2
          });
        try {
          await updateEmailTemplate({ templateId, templateData, state: state2 });
        } catch (error) {
          errors.push(new FrodoError(`Error importing email templates`, error));
        }
        if (verbose)
          printMessage({ message: "", state: state2 });
      }
    }
    if (deps && importData.themes && importData.themes.length > 0) {
      if (verbose)
        printMessage({ message: "\n  - Themes:", newline: false, state: state2 });
      const themes = {};
      for (const theme of importData.themes) {
        if (verbose)
          printMessage({
            message: `
    - ${theme["_id"]} (${theme["name"]})`,
            type: "info",
            newline: false,
            state: state2
          });
        themes[theme["_id"]] = theme;
      }
      try {
        await updateThemes({ themeMap: themes, state: state2 });
      } catch (error) {
        errors.push(new FrodoError(`Error importing themes`, error));
      }
    }
    if (deps && importData.socialIdentityProviders && Object.entries(importData.socialIdentityProviders).length > 0) {
      if (verbose)
        printMessage({
          message: "\n  - OAuth2/OIDC (social) identity providers:",
          newline: false,
          state: state2
        });
      for (const [providerId, providerData] of Object.entries(
        importData.socialIdentityProviders
      )) {
        if (verbose)
          printMessage({
            message: `
    - ${providerId}`,
            type: "info",
            newline: false,
            state: state2
          });
        try {
          await putProviderByTypeAndId2({
            type: providerData["_type"]["_id"],
            id: providerId,
            providerData,
            state: state2
          });
        } catch (error) {
          if (error.response?.status === 500 && error.response?.data?.message === "Unable to update SMS config: Data validation failed for the attribute, Redirect after form post URL") {
            providerData["redirectAfterFormPostURI"] = "";
            try {
              await putProviderByTypeAndId2({
                type: providerData["_type"]["_id"],
                id: providerId,
                providerData,
                state: state2
              });
            } catch (importError2) {
              throw new FrodoError(
                `Error importing provider ${providerId} in journey ${treeId}`,
                importError2
              );
            }
          } else {
            errors.push(
              new FrodoError(
                `Error importing provider ${providerId} in journey ${treeId}`,
                error
              )
            );
          }
        }
      }
    }
    if (deps && importData.saml2Entities && Object.entries(importData.saml2Entities).length > 0) {
      if (verbose)
        printMessage({
          message: "\n  - SAML2 entity providers:",
          newline: false,
          state: state2
        });
      for (const [, providerData] of Object.entries(importData.saml2Entities)) {
        delete providerData["_rev"];
        const entityId = providerData["entityId"];
        const entityLocation = providerData["entityLocation"];
        if (verbose)
          printMessage({
            message: `
    - ${entityLocation} ${entityId}`,
            type: "info",
            newline: false,
            state: state2
          });
        let metaData = null;
        if (entityLocation === "remote") {
          if (Array.isArray(providerData["base64EntityXML"])) {
            metaData = convertTextArrayToBase64Url(
              providerData["base64EntityXML"]
            );
          } else {
            metaData = providerData["base64EntityXML"];
          }
        }
        delete providerData["entityLocation"];
        delete providerData["base64EntityXML"];
        if ((await queryProviderStubs({
          filter: `entityId eq '${entityId}'`,
          fields: ["location"],
          state: state2
        })).resultCount === 0) {
          try {
            await createProvider({
              location: entityLocation,
              providerData,
              metaData,
              state: state2
            });
          } catch (error) {
            errors.push(
              new FrodoError(`Error creating provider ${entityId}`, error)
            );
          }
        } else {
          try {
            await updateProvider({
              location: entityLocation,
              providerData,
              state: state2
            });
          } catch (error) {
            errors.push(
              new FrodoError(`Error updating provider ${entityId}`, error)
            );
          }
        }
      }
    }
    if (deps && importData.circlesOfTrust && Object.entries(importData.circlesOfTrust).length > 0) {
      if (verbose)
        printMessage({
          message: "\n  - SAML2 circles of trust:",
          newline: false,
          state: state2
        });
      for (const [cotId, cotData] of Object.entries(
        importData.circlesOfTrust
      )) {
        delete cotData["_rev"];
        if (verbose)
          printMessage({
            message: `
    - ${cotId}`,
            type: "info",
            newline: false,
            state: state2
          });
        try {
          await createCircleOfTrust({ cotData, state: state2 });
        } catch (error) {
          if (error.response?.status === 409 || error.response?.status === 500) {
            try {
              await updateCircleOfTrust({ cotId, cotData, state: state2 });
            } catch (updateCotErr) {
              errors.push(
                new FrodoError(
                  `Error updating circle of trust ${cotId}`,
                  updateCotErr
                )
              );
            }
          } else {
            errors.push(
              new FrodoError(`Error creating circle of trust ${cotId}`, error)
            );
          }
        }
      }
    }
    let innerNodes = {};
    if (importData.innerNodes && Object.entries(importData.innerNodes).length > 0) {
      innerNodes = importData.innerNodes;
    } else if (importData.innernodes && Object.entries(importData.innernodes).length > 0) {
      innerNodes = importData.innernodes;
    }
    if (Object.entries(innerNodes).length > 0) {
      if (verbose)
        printMessage({
          message: "\n  - Inner nodes:",
          type: "text",
          newline: false,
          state: state2
        });
      for (const [innerNodeId, innerNodeData] of Object.entries(innerNodes)) {
        delete innerNodeData["_rev"];
        const nodeType = innerNodeData["_type"]["_id"];
        if (!reUuid) {
          newUuid = innerNodeId;
        } else {
          newUuid = uuidv45();
          uuidMap[innerNodeId] = newUuid;
        }
        innerNodeData["_id"] = newUuid;
        if (verbose)
          printMessage({
            message: `
    - ${newUuid}${reUuid ? "*" : ""} (${nodeType})`,
            type: "info",
            newline: false,
            state: state2
          });
        if (innerNodeData["identityResource"] && innerNodeData["identityResource"].endsWith("user") && innerNodeData["identityResource"] === importData.tree.identityResource) {
          innerNodeData["identityResource"] = `managed/${getCurrentRealmManagedUser({
            state: state2
          })}`;
          if (verbose)
            printMessage({
              message: `
      - identityResource: ${innerNodeData["identityResource"]}`,
              type: "info",
              newline: false,
              state: state2
            });
        }
        try {
          await putNode({
            nodeId: newUuid,
            nodeType,
            nodeData: innerNodeData,
            state: state2
          });
        } catch (nodeImportError) {
          if (nodeImportError.response?.status === 400 && nodeImportError.response?.data?.message === "Data validation failed for the attribute, Script") {
            errors.push(
              new FrodoError(
                `Missing script ${innerNodeData["script"]} referenced by inner node ${innerNodeId}${innerNodeId === newUuid ? "" : ` [${newUuid}]`} (${innerNodeData["_type"]["_id"]}) in journey ${treeId}`,
                nodeImportError
              )
            );
          } else if (nodeImportError.response?.status === 400 && nodeImportError.response?.data?.message === "Invalid attribute specified.") {
            const { validAttributes } = nodeImportError.response.data.detail;
            validAttributes.push("_id");
            for (const attribute of Object.keys(innerNodeData)) {
              if (!validAttributes.includes(attribute)) {
                if (verbose)
                  printMessage({
                    message: `
      - Removing invalid attribute: ${attribute}`,
                    type: "warn",
                    newline: false,
                    state: state2
                  });
                delete innerNodeData[attribute];
              }
            }
            try {
              await putNode({
                nodeId: newUuid,
                nodeType,
                nodeData: innerNodeData,
                state: state2
              });
            } catch (nodeImportError2) {
              errors.push(
                new FrodoError(
                  `Error importing node ${innerNodeId}${innerNodeId === newUuid ? "" : ` [${newUuid}]`} in journey ${treeId}`,
                  nodeImportError2
                )
              );
            }
          } else {
            errors.push(
              new FrodoError(
                `Error importing inner node ${innerNodeId}${innerNodeId === newUuid ? "" : ` [${newUuid}]`} in journey ${treeId}`,
                nodeImportError
              )
            );
          }
        }
        if (verbose)
          printMessage({ message: "", state: state2 });
      }
    }
    if (importData.nodes && Object.entries(importData.nodes).length > 0) {
      if (verbose)
        printMessage({ message: "\n  - Nodes:", newline: false, state: state2 });
      for (let [nodeId, nodeData] of Object.entries(importData.nodes)) {
        delete nodeData["_rev"];
        const nodeType = nodeData["_type"]["_id"];
        if (!reUuid) {
          newUuid = nodeId;
        } else {
          newUuid = uuidv45();
          uuidMap[nodeId] = newUuid;
        }
        nodeData["_id"] = newUuid;
        if (nodeType === "PageNode" && reUuid) {
          for (const [, inPageNodeData] of Object.entries(nodeData["nodes"])) {
            const currentId = inPageNodeData["_id"];
            nodeData = JSON.parse(
              JSON.stringify(nodeData).replaceAll(currentId, uuidMap[currentId])
            );
          }
        }
        if (verbose)
          printMessage({
            message: `
    - ${newUuid}${reUuid ? "*" : ""} (${nodeType})`,
            type: "info",
            newline: false,
            state: state2
          });
        if (nodeData.identityResource && nodeData.identityResource.endsWith("user") && nodeData.identityResource === importData.tree.identityResource) {
          nodeData["identityResource"] = `managed/${getCurrentRealmManagedUser({
            state: state2
          })}`;
          if (verbose)
            printMessage({
              message: `
      - identityResource: ${nodeData["identityResource"]}`,
              type: "info",
              newline: false,
              state: state2
            });
        }
        try {
          await putNode({ nodeId: newUuid, nodeType, nodeData, state: state2 });
        } catch (nodeImportError) {
          if (nodeImportError.response?.status === 400 && nodeImportError.response?.data?.message === "Data validation failed for the attribute, Script") {
            errors.push(
              new FrodoError(
                `Missing script ${nodeData["script"]} referenced by node ${nodeId}${nodeId === newUuid ? "" : ` [${newUuid}]`} (${nodeData["_type"]["_id"]}) in journey ${treeId}`,
                nodeImportError
              )
            );
          } else if (nodeImportError.response?.status === 400 && nodeImportError.response?.data?.message === "Invalid attribute specified.") {
            const { validAttributes } = nodeImportError.response.data.detail;
            validAttributes.push("_id");
            for (const attribute of Object.keys(nodeData)) {
              if (!validAttributes.includes(attribute)) {
                if (verbose)
                  printMessage({
                    message: `
      - Removing invalid attribute: ${attribute}`,
                    type: "warn",
                    newline: false,
                    state: state2
                  });
                delete nodeData[attribute];
              }
            }
            try {
              await putNode({ nodeId: newUuid, nodeType, nodeData, state: state2 });
            } catch (nodeImportError2) {
              errors.push(
                new FrodoError(
                  `Error importing node ${nodeId}${nodeId === newUuid ? "" : ` [${newUuid}]`} in journey ${treeId}`,
                  nodeImportError2
                )
              );
            }
          } else {
            errors.push(
              new FrodoError(
                `Error importing node ${nodeId}${nodeId === newUuid ? "" : ` [${newUuid}]`} in journey ${treeId}`,
                nodeImportError
              )
            );
          }
        }
        if (verbose)
          printMessage({ message: "", state: state2 });
      }
    }
    if (verbose)
      printMessage({ message: "\n  - Flow", newline: false, state: state2 });
    if (reUuid) {
      let journeyText = JSON.stringify(importData.tree, null, 2);
      for (const [oldId, newId] of Object.entries(uuidMap)) {
        journeyText = journeyText.replaceAll(oldId, newId);
      }
      importData.tree = JSON.parse(journeyText);
    }
    if (importData.tree.identityResource && importData.tree["identityResource"].endsWith("user") || state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY || state2.getDeploymentType() === Constants_default.FORGEOPS_DEPLOYMENT_TYPE_KEY) {
      importData.tree.identityResource = `managed/${getCurrentRealmManagedUser({
        state: state2
      })}`;
      if (verbose)
        printMessage({
          message: `
    - identityResource: ${importData.tree.identityResource}`,
          type: "info",
          newline: false,
          state: state2
        });
    }
    const serverTreeObject = await updateCoordinates({
      tree: importData.tree,
      nodesAttributeName: "nodes",
      serverTree: null,
      state: state2
    });
    await updateCoordinates({
      tree: importData.tree,
      nodesAttributeName: "staticNodes",
      serverTree: serverTreeObject,
      state: state2
    });
    delete importData.tree._rev;
    try {
      response = await putTree({
        treeId,
        treeData: importData.tree,
        state: state2
      });
      imported.push(treeId);
      if (verbose)
        printMessage({
          message: `
    - Done`,
          type: "info",
          newline: true,
          state: state2
        });
    } catch (importError) {
      if (importError.response?.status === 400 && importError.response?.data?.message === "Invalid attribute specified.") {
        const { validAttributes } = importError.response.data.detail;
        validAttributes.push("_id");
        for (const attribute of Object.keys(importData.tree)) {
          if (!validAttributes.includes(attribute)) {
            if (verbose)
              printMessage({
                message: `
    - Removing invalid attribute: ${attribute}`,
                type: "warn",
                newline: false,
                state: state2
              });
            delete importData.tree[attribute];
          }
        }
        try {
          response = await putTree({
            treeId,
            treeData: importData.tree,
            state: state2
          });
          imported.push(treeId);
          if (verbose)
            printMessage({
              message: `
    - Done`,
              type: "info",
              newline: true,
              state: state2
            });
        } catch (importError2) {
          errors.push(
            new FrodoError(
              `Error importing journey flow ${treeId}`,
              importError2
            )
          );
        }
      } else {
        errors.push(
          new FrodoError(`Error importing journey flow ${treeId}`, importError)
        );
      }
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing journey`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No journey found in import data`);
  }
  return response;
}
async function resolveDependencies(installedJorneys, journeyMap, unresolvedJourneys, resolvedJourneys, index = -1) {
  let before = -1;
  let after = index;
  if (index !== -1) {
    before = index;
  }
  for (const tree in journeyMap) {
    if ({}.hasOwnProperty.call(journeyMap, tree)) {
      const dependencies = [];
      for (const node in journeyMap[tree].nodes) {
        if (journeyMap[tree].nodes[node]._type._id === "InnerTreeEvaluatorNode") {
          dependencies.push(journeyMap[tree].nodes[node].tree);
        }
      }
      let allResolved = true;
      for (const dependency of dependencies) {
        if (!resolvedJourneys.includes(dependency) && !installedJorneys.includes(dependency)) {
          allResolved = false;
        }
      }
      if (allResolved) {
        if (resolvedJourneys.indexOf(tree) === -1)
          resolvedJourneys.push(tree);
        delete unresolvedJourneys[tree];
      } else {
        unresolvedJourneys[tree] = dependencies;
      }
    }
  }
  after = Object.keys(unresolvedJourneys).length;
  if (index !== -1 && after === before) {
  } else if (after > 0) {
    resolveDependencies(
      installedJorneys,
      journeyMap,
      unresolvedJourneys,
      resolvedJourneys,
      after
    );
  }
}
async function importJourneys({
  importData,
  options,
  state: state2
}) {
  const response = [];
  const errors = [];
  const installedJourneys = (await readJourneys({ state: state2 })).map((x) => x._id);
  const unresolvedJourneys = {};
  const resolvedJourneys = [];
  let indicatorId = createProgressIndicator({
    total: void 0,
    message: "Resolving dependencies",
    type: "indeterminate",
    state: state2
  });
  await resolveDependencies(
    installedJourneys,
    importData.trees,
    unresolvedJourneys,
    resolvedJourneys
  );
  if (Object.keys(unresolvedJourneys).length === 0) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Resolved all dependencies.`,
      status: "success",
      state: state2
    });
  } else {
    stopProgressIndicator({
      id: indicatorId,
      message: `${Object.keys(unresolvedJourneys).length} journeys with unresolved dependencies`,
      status: "fail",
      state: state2
    });
    const message = [
      `${Object.keys(unresolvedJourneys).length} journeys with unresolved dependencies:`
    ];
    for (const journey of Object.keys(unresolvedJourneys)) {
      message.push(`  - ${journey} requires ${unresolvedJourneys[journey]}`);
    }
    throw new FrodoError(message.join("\n"));
  }
  indicatorId = createProgressIndicator({
    total: resolvedJourneys.length,
    message: "Importing",
    state: state2
  });
  for (const tree of resolvedJourneys) {
    try {
      response.push(
        await importJourney({
          importData: importData.trees[tree],
          options,
          state: state2
        })
      );
      updateProgressIndicator({ id: indicatorId, message: `${tree}`, state: state2 });
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    stopProgressIndicator({
      id: indicatorId,
      message: "Error importing journeys",
      state: state2
    });
    throw new FrodoError(`Error importing journeys`, errors);
  }
  stopProgressIndicator({
    id: indicatorId,
    message: "Finished importing journeys",
    state: state2
  });
  return response;
}
function getNodeRef(nodeObj, singleTreeExport) {
  if (singleTreeExport.tree.nodes[nodeObj._id]) {
    return singleTreeExport.tree.nodes[nodeObj._id];
  } else {
    for (const node of Object.values(singleTreeExport.nodes)) {
      if (containerNodes2.includes(node._type._id)) {
        for (const nodeRef of node.nodes) {
          if (nodeRef._id === nodeObj._id) {
            return nodeRef;
          }
        }
      }
    }
  }
  return void 0;
}
var onlineTreeExportResolver = async function(treeId, state2) {
  debugMessage({ message: `onlineTreeExportResolver(${treeId})`, state: state2 });
  return await exportJourney({
    journeyId: treeId,
    options: {
      deps: false,
      useStringArrays: false,
      coords: true
    },
    state: state2
  });
};
var fileByIdTreeExportResolver = async function(treeId, state2) {
  debugMessage({ message: `fileByIdTreeExportResolver(${treeId})`, state: state2 });
  let treeExport = createSingleTreeExportTemplate({ state: state2 });
  const files = findFilesByName(getTypedFilename(`${treeId}`, "journey"));
  try {
    const file = files.pop();
    const jsonData = JSON.parse(fs6.readFileSync(file, "utf8"));
    debugMessage({
      message: `fileByIdTreeExportResolver: resolved '${treeId}' to ${file}`,
      state: state2
    });
    if (jsonData.tree?._id === treeId) {
      treeExport = jsonData;
    } else if (jsonData.trees && jsonData.trees[treeId]) {
      treeExport = jsonData.trees[treeId];
    }
  } catch (error) {
    throw new FrodoError(`Unable to resolve '${treeId}' to a file`, error);
  }
  return treeExport;
};
function createFileParamTreeExportResolver(file, state2) {
  const fileParamTreeExportResolver = async function(treeId) {
    debugMessage({
      message: `fileParamTreeExportResolver(${treeId})`,
      state: state2
    });
    let treeExport = createSingleTreeExportTemplate({ state: state2 });
    try {
      const jsonData = JSON.parse(fs6.readFileSync(file, "utf8"));
      if (jsonData.tree?._id === treeId) {
        treeExport = jsonData;
      } else if (jsonData.trees && jsonData.trees[treeId]) {
        treeExport = jsonData.trees[treeId];
      } else {
        treeExport = await fileByIdTreeExportResolver(treeId, state2);
      }
    } catch (error) {
      debugMessage({ message: error.message, state: state2 });
    }
    return treeExport;
  };
  debugMessage({ message: `fileParamTreeExportResolver: file=${file}`, state: state2 });
  return fileParamTreeExportResolver;
}
async function getTreeDescendents({
  treeExport,
  resolveTreeExport = onlineTreeExportResolver,
  resolvedTreeIds = [],
  state: state2
}) {
  const treeId = treeExport.tree._id + "";
  debugMessage({
    message: `getTreeDependencies(${treeId}, [${resolvedTreeIds.join(", ")}])`,
    state: state2
  });
  if (!resolvedTreeIds.includes(treeId)) {
    resolvedTreeIds.push(treeId);
  }
  const treeDependencyMap = {
    [treeId]: []
  };
  const dependencies = [];
  for (const [nodeId, node] of Object.entries(treeExport.tree.nodes)) {
    let innerTreeId;
    try {
      if (node.nodeType === "InnerTreeEvaluatorNode") {
        innerTreeId = treeExport.nodes[nodeId].tree;
        if (!resolvedTreeIds.includes(innerTreeId)) {
          const innerTreeExport = await resolveTreeExport(innerTreeId, state2);
          debugMessage({
            message: `resolved inner tree: ${innerTreeExport.tree._id}`,
            state: state2
          });
          dependencies.push(
            await getTreeDescendents({
              treeExport: innerTreeExport,
              resolveTreeExport,
              resolvedTreeIds,
              state: state2
            })
          );
        }
      }
    } catch (error) {
      if (innerTreeId) {
        const unresolvableMap = {
          [innerTreeId]: []
        };
        dependencies.push(unresolvableMap);
      }
    }
  }
  treeDependencyMap[treeId] = dependencies;
  return treeDependencyMap;
}
function isCustomJourney({
  journey,
  state: state2
}) {
  debugMessage({ message: `JourneyOps.isCustomJourney: start`, state: state2 });
  const nodeList = Object.values(journey.nodes).concat(
    Object.values(journey.innerNodes)
  );
  for (const node of nodeList) {
    if (isCustomNode({ nodeType: node["_type"]["_id"], state: state2 })) {
      debugMessage({
        message: `JourneyOps.isCustomJourney: Custom node: ${node["_type"]["_id"]}`,
        state: state2
      });
      return true;
    }
  }
  debugMessage({ message: `JourneyOps.isCustomJourney: end [false]`, state: state2 });
  return false;
}
function isPremiumJourney(journey) {
  const nodeList = Object.values(journey.nodes).concat(
    Object.values(journey.innerNodes)
  );
  for (const node of nodeList) {
    if (isPremiumNode(node["_type"]["_id"])) {
      return true;
    }
  }
  return false;
}
function isCloudOnlyJourney(journey) {
  const nodeList = Object.values(journey.nodes).concat(
    Object.values(journey.innerNodes)
  );
  for (const node of nodeList) {
    if (isCloudOnlyNode(node["_type"]["_id"])) {
      return true;
    }
  }
  return false;
}
function getJourneyClassification({
  journey,
  state: state2
}) {
  const classifications = [];
  const premium = isPremiumJourney(journey);
  const custom = isCustomJourney({ journey, state: state2 });
  const cloud = isCloudOnlyJourney(journey);
  if (custom) {
    classifications.push("custom" /* CUSTOM */);
  } else if (cloud) {
    classifications.push("cloud" /* CLOUD */);
  } else {
    classifications.push("standard" /* STANDARD */);
  }
  if (premium)
    classifications.push("premium" /* PREMIUM */);
  return classifications;
}
async function deleteJourney({
  journeyId,
  options,
  state: state2
}) {
  const { deep, verbose } = options;
  const progress = !("progress" in options) ? true : options.progress;
  const status = { status: "unknown", nodes: {} };
  let indicatorId;
  if (progress)
    indicatorId = createProgressIndicator({
      total: void 0,
      message: `Deleting ${journeyId}...`,
      type: "indeterminate",
      state: state2
    });
  if (progress && verbose)
    stopProgressIndicator({ id: indicatorId, state: state2 });
  return deleteTree({ treeId: journeyId, state: state2 }).then(async (deleteTreeResponse) => {
    status["status"] = "success";
    const nodePromises = [];
    if (verbose)
      printMessage({
        message: `Deleted ${journeyId} (tree)`,
        type: "info",
        state: state2
      });
    if (deep) {
      for (const [nodeId, nodeObject] of Object.entries(
        deleteTreeResponse.nodes
      )) {
        if (containerNodes2.includes(nodeObject["nodeType"])) {
          try {
            const containerNode = await getNode({
              nodeId,
              nodeType: nodeObject["nodeType"],
              state: state2
            });
            if (verbose)
              printMessage({
                message: `Read ${nodeId} (${nodeObject["nodeType"]}) from ${journeyId}`,
                type: "info",
                state: state2
              });
            for (const innerNodeObject of containerNode.nodes) {
              nodePromises.push(
                deleteNode({
                  nodeId: innerNodeObject._id,
                  nodeType: innerNodeObject.nodeType,
                  state: state2
                }).then((response2) => {
                  status.nodes[innerNodeObject._id] = { status: "success" };
                  if (verbose)
                    printMessage({
                      message: `Deleted ${innerNodeObject._id} (${innerNodeObject.nodeType}) from ${journeyId}`,
                      type: "info",
                      state: state2
                    });
                  return response2;
                }).catch((error) => {
                  status.nodes[innerNodeObject._id] = {
                    status: "error",
                    error
                  };
                  if (verbose)
                    printMessage({
                      message: `Error deleting inner node ${innerNodeObject._id} (${innerNodeObject.nodeType}) from ${journeyId}: ${error}`,
                      type: "error",
                      state: state2
                    });
                })
              );
            }
            nodePromises.push(
              deleteNode({
                nodeId: containerNode._id,
                nodeType: containerNode["_type"]["_id"],
                state: state2
              }).then((response2) => {
                status.nodes[containerNode._id] = { status: "success" };
                if (verbose)
                  printMessage({
                    message: `Deleted ${containerNode._id} (${containerNode["_type"]["_id"]}) from ${journeyId}`,
                    type: "info",
                    state: state2
                  });
                return response2;
              }).catch((error) => {
                if (error?.response?.data?.code === 500 && error.response.data.message === "Unable to read SMS config: Node did not exist") {
                  status.nodes[containerNode._id] = { status: "success" };
                  if (verbose)
                    printMessage({
                      message: `Deleted ${containerNode._id} (${containerNode["_type"]["_id"]}) from ${journeyId}`,
                      type: "info",
                      state: state2
                    });
                } else {
                  status.nodes[containerNode._id] = {
                    status: "error",
                    error
                  };
                  if (verbose)
                    printMessage({
                      message: `Error deleting container node ${containerNode._id} (${containerNode["_type"]["_id"]}) from ${journeyId}: ${error.response.data.message}`,
                      type: "error",
                      state: state2
                    });
                }
              })
            );
          } catch (error) {
            if (verbose)
              printMessage({
                message: `Error getting container node ${nodeId} (${nodeObject["nodeType"]}) from ${journeyId}: ${error}`,
                type: "error",
                state: state2
              });
          }
        } else {
          nodePromises.push(
            deleteNode({ nodeId, nodeType: nodeObject["nodeType"], state: state2 }).then((response) => {
              status.nodes[nodeId] = { status: "success" };
              if (verbose)
                printMessage({
                  message: `Deleted ${nodeId} (${nodeObject["nodeType"]}) from ${journeyId}`,
                  type: "info",
                  state: state2
                });
              return response;
            }).catch((error) => {
              status.nodes[nodeId] = { status: "error", error };
              if (verbose)
                printMessage({
                  message: `Error deleting node ${nodeId} (${nodeObject["nodeType"]}) from ${journeyId}: ${error}`,
                  type: "error",
                  state: state2
                });
            })
          );
        }
      }
    }
    await Promise.allSettled(nodePromises);
    if (progress) {
      let nodeCount = 0;
      let errorCount = 0;
      for (const node of Object.keys(status.nodes)) {
        nodeCount += 1;
        if (status.nodes[node].status === "error")
          errorCount += 1;
      }
      if (errorCount === 0) {
        stopProgressIndicator({
          id: indicatorId,
          message: `Deleted ${journeyId} and ${nodeCount - errorCount}/${nodeCount} nodes.`,
          status: "success",
          state: state2
        });
      } else {
        stopProgressIndicator({
          id: indicatorId,
          message: `Deleted ${journeyId} and ${nodeCount - errorCount}/${nodeCount} nodes.`,
          status: "fail",
          state: state2
        });
      }
    }
    return status;
  }).catch((error) => {
    status["status"] = "error";
    status["error"] = error;
    stopProgressIndicator({
      id: indicatorId,
      message: `Error deleting ${journeyId}.`,
      status: "fail",
      state: state2
    });
    if (verbose)
      printMessage({
        message: `Error deleting tree ${journeyId}: ${error}`,
        type: "error",
        state: state2
      });
    return status;
  });
}
async function deleteJourneys({
  options,
  state: state2
}) {
  let indicatorId;
  try {
    const { verbose } = options;
    const status = {};
    const trees = (await getTrees({ state: state2 })).result;
    indicatorId = createProgressIndicator({
      total: trees.length,
      message: "Deleting journeys...",
      state: state2
    });
    for (const tree of trees) {
      if (verbose)
        printMessage({ message: "", state: state2 });
      options["progress"] = false;
      status[tree._id] = await deleteJourney({
        journeyId: tree._id,
        options,
        state: state2
      });
      updateProgressIndicator({
        id: indicatorId,
        message: `${tree._id}`,
        state: state2
      });
      if (verbose)
        await new Promise((r) => {
          setTimeout(r, 100);
        });
    }
    let journeyCount = 0;
    let journeyErrorCount = 0;
    let nodeCount = 0;
    let nodeErrorCount = 0;
    for (const journey of Object.keys(status)) {
      journeyCount += 1;
      if (status[journey].status === "error")
        journeyErrorCount += 1;
      for (const node of Object.keys(status[journey].nodes)) {
        nodeCount += 1;
        if (status[journey].nodes[node].status === "error")
          nodeErrorCount += 1;
      }
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Deleted ${journeyCount - journeyErrorCount}/${journeyCount} journeys and ${nodeCount - nodeErrorCount}/${nodeCount} nodes.`,
      state: state2
    });
    return status;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error deleting journeys`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error deleting journeys`, error);
  }
}
async function enableJourney({
  journeyId,
  state: state2
}) {
  try {
    const treeObject = await getTree({ id: journeyId, state: state2 });
    treeObject["enabled"] = true;
    delete treeObject._rev;
    const newTreeObject = await putTree({
      treeId: journeyId,
      treeData: treeObject,
      state: state2
    });
    return newTreeObject;
  } catch (error) {
    throw new FrodoError(`Error enabling journey ${journeyId}`, error);
  }
}
async function disableJourney({
  journeyId,
  state: state2
}) {
  try {
    const treeObject = await getTree({ id: journeyId, state: state2 });
    treeObject["enabled"] = false;
    delete treeObject._rev;
    const newTreeObject = await putTree({
      treeId: journeyId,
      treeData: treeObject,
      state: state2
    });
    return newTreeObject;
  } catch (error) {
    throw new FrodoError(`Error disabling journey ${journeyId}`, error);
  }
}

// src/api/PoliciesApi.ts
import util26 from "util";
var queryAllPoliciesURLTemplate = "%s/json%s/policies?_queryFilter=true";
var queryPoliciesByPolicySetURLTemplate = "%s/json%s/policies?_queryFilter=applicationName+eq+%22%s%22";
var policyURLTemplate = "%s/json%s/policies/%s";
var apiVersion19 = "resource=2.1";
var getApiConfig18 = () => {
  return {
    apiVersion: apiVersion19
  };
};
async function getPolicies({ state: state2 }) {
  const urlString = util26.format(
    queryAllPoliciesURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig18(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getPoliciesByPolicySet({
  policySetId,
  state: state2
}) {
  const urlString = util26.format(
    queryPoliciesByPolicySetURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policySetId
  );
  const { data } = await generateAmApi({ resource: getApiConfig18(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getPolicy({
  policyId,
  state: state2
}) {
  const urlString = util26.format(
    policyURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policyId
  );
  const { data } = await generateAmApi({ resource: getApiConfig18(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function putPolicy({
  policyId,
  policyData,
  state: state2
}) {
  const urlString = util26.format(
    policyURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policyId
  );
  const { data } = await generateAmApi({ resource: getApiConfig18(), state: state2 }).put(
    urlString,
    policyData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deletePolicy({
  policyId,
  state: state2
}) {
  const urlString = util26.format(
    policyURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policyId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig18(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/ResourceTypesApi.ts
import util27 from "util";
var queryAllResourceTypesURLTemplate = "%s/json%s/resourcetypes?_sortKeys=name&_queryFilter=name+eq+%22%5E(%3F!Delegation%20Service%24).*%22";
var queryResourceTypeByNameURLTemplate = "%s/json%s/resourcetypes?_sortKeys=name&_queryFilter=name+eq+%22%s%22+AND+name+eq+%22%5E(%3F!Delegation%20Service%24).*%22";
var resourceTypeURLTemplate = "%s/json%s/resourcetypes/%s";
var createResourceTypeURLTemplate = "%s/json%s/resourcetypes?_action=create";
var apiVersion20 = "protocol=1.0,resource=1.0";
var getApiConfig19 = () => {
  return {
    apiVersion: apiVersion20
  };
};
async function getResourceTypes({ state: state2 }) {
  const urlString = util27.format(
    queryAllResourceTypesURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig19(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getResourceType({
  resourceTypeUuid,
  state: state2
}) {
  const urlString = util27.format(
    resourceTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    resourceTypeUuid
  );
  const { data } = await generateAmApi({ resource: getApiConfig19(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getResourceTypeByName({
  resourceTypeName,
  state: state2
}) {
  const urlString = util27.format(
    queryResourceTypeByNameURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    resourceTypeName
  );
  const { data } = await generateAmApi({ resource: getApiConfig19(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function createResourceType({
  resourceTypeData,
  state: state2
}) {
  const urlString = util27.format(
    createResourceTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig19(),
    state: state2
  }).post(urlString, resourceTypeData, {
    withCredentials: true
  });
  return data;
}
async function putResourceType({
  resourceTypeUuid,
  resourceTypeData,
  failIfExists = false,
  state: state2
}) {
  const urlString = util27.format(
    resourceTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    resourceTypeUuid
  );
  const requestOverride = failIfExists ? { headers: { "If-None-Match": "*" } } : {};
  const { data } = await generateAmApi({
    resource: getApiConfig19(),
    requestOverride,
    state: state2
  }).put(urlString, resourceTypeData, {
    withCredentials: true
  });
  return data;
}
async function deleteResourceType({
  resourceTypeUuid,
  state: state2
}) {
  const urlString = util27.format(
    resourceTypeURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    resourceTypeUuid
  );
  const { data } = await generateAmApi({
    resource: getApiConfig19(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/api/PolicySetApi.ts
import util28 from "util";
var queryAllPolicySetURLTemplate = "%s/json%s/applications?_sortKeys=name&_queryFilter=name+eq+%22%5E(%3F!sunAMDelegationService%24).*%22";
var policySetURLTemplate = "%s/json%s/applications/%s";
var createApplicationURLTemplate = "%s/json%s/applications/?_action=create";
var apiVersion21 = "protocol=1.0,resource=2.1";
var getApiConfig20 = () => {
  return {
    apiVersion: apiVersion21
  };
};
async function getPolicySets({ state: state2 }) {
  const urlString = util28.format(
    queryAllPolicySetURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({ resource: getApiConfig20(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getPolicySet({
  policySetName,
  state: state2
}) {
  const urlString = util28.format(
    policySetURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policySetName
  );
  const { data } = await generateAmApi({ resource: getApiConfig20(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function createPolicySet({
  policySetData,
  state: state2
}) {
  const postData = cloneDeep(policySetData);
  const urlString = util28.format(
    createApplicationURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2)
  );
  const { data } = await generateAmApi({
    resource: getApiConfig20(),
    state: state2
  }).post(urlString, postData, {
    withCredentials: true
  });
  return data;
}
async function updatePolicySet({
  policySetName = void 0,
  policySetData,
  state: state2
}) {
  const appData = cloneDeep(policySetData);
  if (policySetName)
    appData.name = policySetName;
  const urlString = util28.format(
    policySetURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    appData.name
  );
  const { data } = await generateAmApi({ resource: getApiConfig20(), state: state2 }).put(
    urlString,
    appData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deletePolicySet({
  policySetName,
  state: state2
}) {
  const urlString = util28.format(
    policySetURLTemplate,
    state2.getHost(),
    getCurrentRealmPath(state2),
    policySetName
  );
  const { data } = await generateAmApi({
    resource: getApiConfig20(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/PolicySetOps.ts
var PolicySetOps_default = (state2) => {
  return {
    createPolicySetExportTemplate() {
      return createPolicySetExportTemplate({ state: state2 });
    },
    async readPolicySets() {
      return readPolicySets({ state: state2 });
    },
    async readPolicySet(policySetName) {
      return readPolicySet({ policySetName, state: state2 });
    },
    async createPolicySet(policySetData, policySetName = void 0) {
      return createPolicySet2({ policySetData, policySetName, state: state2 });
    },
    async updatePolicySet(policySetData, policySetName = void 0) {
      return updatePolicySet2({ policySetData, policySetName, state: state2 });
    },
    async deletePolicySet(policySetName) {
      return deletePolicySet2({ policySetName, state: state2 });
    },
    async exportPolicySet(policySetName, options = {
      deps: true,
      prereqs: false,
      useStringArrays: true
    }) {
      return exportPolicySet({ policySetName, options, state: state2 });
    },
    async exportPolicySets(options = {
      deps: true,
      prereqs: false,
      useStringArrays: true
    }) {
      return exportPolicySets({ options, state: state2 });
    },
    async importPolicySet(policySetName, importData, options = { deps: true, prereqs: false }) {
      return importPolicySet({
        policySetName,
        importData,
        options,
        state: state2
      });
    },
    async importFirstPolicySet(importData, options = { deps: true, prereqs: false }) {
      return importFirstPolicySet({ importData, options, state: state2 });
    },
    async importPolicySets(importData, options = { deps: true, prereqs: false }) {
      return importPolicySets({ importData, options, state: state2 });
    },
    // Deprecated
    async getPolicySets() {
      return readPolicySets({ state: state2 });
    },
    async getPolicySet(policySetName) {
      return getPolicySet({ policySetName, state: state2 });
    }
  };
};
function createPolicySetExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    policy: {},
    resourcetype: {},
    policyset: {}
  };
}
async function readPolicySets({
  state: state2
}) {
  try {
    const { result } = await getPolicySets({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading policy sets`, error);
  }
}
async function readPolicySet({
  policySetName,
  state: state2
}) {
  try {
    const response = await getPolicySet({ policySetName, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error reading policy set ${policySetName}`, error);
  }
}
async function createPolicySet2({
  policySetName = void 0,
  policySetData,
  state: state2
}) {
  try {
    if (!policySetName) {
      const response2 = await createPolicySet({ policySetData, state: state2 });
      return response2;
    }
    const response = await updatePolicySet({
      policySetName,
      policySetData,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(`Error creating policy set ${policySetName}`, error);
  }
}
async function updatePolicySet2({
  policySetName = void 0,
  policySetData,
  state: state2
}) {
  try {
    const response = await updatePolicySet({
      policySetName,
      policySetData,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(`Error updating policy set ${policySetName}`, error);
  }
}
async function deletePolicySet2({
  policySetName,
  state: state2
}) {
  try {
    const response = await deletePolicySet({ policySetName, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error deleting policy set ${policySetName}`, error);
  }
}
async function exportPolicySetPrerequisites({
  policySetData,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicySetOps.exportPolicySetPrerequisites: start [policySet=${policySetData["name"]}]`,
    state: state2
  });
  const errors = [];
  for (const resourceTypeUuid of policySetData.resourceTypeUuids) {
    try {
      const resourceType = await getResourceType({ resourceTypeUuid, state: state2 });
      exportData.resourcetype[resourceTypeUuid] = resourceType;
    } catch (error) {
      errors.push(
        new FrodoError(
          `Error retrieving resource type ${resourceTypeUuid} for policy set ${policySetData.name}`,
          error
        )
      );
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting policy set prerequisites`, errors);
  }
  debugMessage({
    message: `PolicySetOps.exportPolicySetPrerequisites: end`,
    state: state2
  });
}
async function exportPolicySetDependencies({
  policySetData,
  options,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicySetOps.exportPolicySetDependencies: start [policySet=${policySetData["name"]}]`,
    state: state2
  });
  const errors = [];
  try {
    const policies = await readPoliciesByPolicySet({
      policySetId: policySetData.name,
      state: state2
    });
    for (const policy of policies) {
      exportData.policy[policy.name] = policy;
      try {
        const scripts = await getScripts2({ policyData: policy, state: state2 });
        for (const scriptData of scripts) {
          if (options.useStringArrays) {
            scriptData.script = convertBase64TextToArray(
              scriptData.script
            );
          }
          exportData.script[scriptData._id] = scriptData;
        }
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error exporting policy set ${policySetData.name} dependencies`
      );
    }
    debugMessage({
      message: `PolicySetOps.exportPolicySetDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error exporting policy set ${policySetData.name} dependencies`,
      error
    );
  }
}
async function exportPolicySet({
  policySetName,
  options = {
    deps: true,
    prereqs: false,
    useStringArrays: true
  },
  state: state2
}) {
  debugMessage({ message: `PolicySetOps.exportPolicySet: start`, state: state2 });
  const exportData = createPolicySetExportTemplate({ state: state2 });
  const errors = [];
  try {
    const policySetData = await getPolicySet({ policySetName, state: state2 });
    exportData.policyset[policySetData.name] = policySetData;
    if (options.prereqs) {
      try {
        await exportPolicySetPrerequisites({
          policySetData,
          exportData,
          state: state2
        });
      } catch (error) {
        errors.push(error);
      }
    }
    if (options.deps) {
      try {
        await exportPolicySetDependencies({
          policySetData,
          options,
          exportData,
          state: state2
        });
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error exporting policy set ${policySetName}`,
        errors
      );
    }
    debugMessage({ message: `PolicySetOps.exportPolicySet: end`, state: state2 });
    return exportData;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting policy set ${policySetName}`, error);
  }
}
async function exportPolicySets({
  options = {
    deps: true,
    prereqs: false,
    useStringArrays: true
  },
  state: state2
}) {
  debugMessage({ message: `PolicySetOps.exportPolicySet: start`, state: state2 });
  const exportData = createPolicySetExportTemplate({ state: state2 });
  const errors = [];
  let indicatorId;
  try {
    const policySets = await readPolicySets({ state: state2 });
    indicatorId = createProgressIndicator({
      total: policySets.length,
      message: "Exporting policy sets...",
      state: state2
    });
    for (const policySetData of policySets) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting policy set ${policySetData._id}`,
        state: state2
      });
      exportData.policyset[policySetData.name] = policySetData;
      if (options.prereqs) {
        try {
          await exportPolicySetPrerequisites({
            policySetData,
            exportData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      if (options.deps) {
        try {
          await exportPolicySetDependencies({
            policySetData,
            options,
            exportData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${policySets.length} policy sets.`,
      state: state2
    });
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting policy sets`, errors);
    }
    debugMessage({ message: `PolicySetOps.exportPolicySet: end`, state: state2 });
    return exportData;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting policy sets`, error);
  }
}
async function importPolicySetPrerequisites({
  policySetData,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicySetOps.importPolicySetHardDependencies: start [policySet=${policySetData["name"]}]`,
    state: state2
  });
  const errors = [];
  try {
    for (const resourceTypeUuid of policySetData.resourceTypeUuids) {
      if (exportData.resourcetype[resourceTypeUuid]) {
        try {
          debugMessage({
            message: `Importing resource type ${resourceTypeUuid}`,
            state: state2
          });
          await putResourceType({
            resourceTypeUuid,
            resourceTypeData: exportData.resourcetype[resourceTypeUuid],
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      } else {
        errors.push(
          new FrodoError(
            `No resource type definition with id ${resourceTypeUuid} found in import data.`
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing hard dependencies for policy set ${policySetData.name}`,
        errors
      );
    }
    debugMessage({
      message: `PolicySetOps.importPolicySetHardDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error importing hard dependencies for policy set ${policySetData.name}`,
      error
    );
  }
}
async function importPolicySetDependencies({
  policySetData,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicySetOps.importPolicySetSoftDependencies: start [policySet=${policySetData["name"]}]`,
    state: state2
  });
  const errors = [];
  try {
    const policies = Object.values(exportData.policy).filter(
      (policy) => policy.applicationName === policySetData.name
    );
    for (const policyData of policies) {
      try {
        debugMessage({
          message: `Importing policy ${policyData._id}`,
          state: state2
        });
        await updatePolicy({ policyId: policyData._id, policyData, state: state2 });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing policy ${policyData._id} in policy set ${policySetData.name}`,
            error
          )
        );
      }
      const scriptUuids = findScriptUuids(policyData.condition);
      for (const scriptUuid of scriptUuids) {
        try {
          const scriptData = exportData.script[scriptUuid];
          debugMessage({ message: `Importing script ${scriptUuid}`, state: state2 });
          await updateScript({ scriptId: scriptUuid, scriptData, state: state2 });
        } catch (error) {
          errors.push(
            new FrodoError(
              `Error importing script ${scriptUuid} for policy ${policyData._id} in policy set ${policySetData.name}`,
              error
            )
          );
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing soft dependencies for policy set ${policySetData.name}`,
        errors
      );
    }
    debugMessage({
      message: `PolicySetOps.importPolicySetSoftDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error importing soft dependencies for policy set ${policySetData.name}`,
      error
    );
  }
}
async function importPolicySet({
  policySetName,
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.policyset)) {
    if (id2 === policySetName) {
      try {
        const policySetData = importData.policyset[id2];
        delete policySetData._rev;
        if (options.prereqs) {
          try {
            await importPolicySetPrerequisites({
              policySetData,
              exportData: importData,
              state: state2
            });
          } catch (error) {
            errors.push(error);
          }
        }
        try {
          response = await createPolicySet({ policySetData, state: state2 });
          imported.push(id2);
        } catch (error) {
          if (error.response?.status === 409) {
            response = await updatePolicySet({ policySetData, state: state2 });
            imported.push(id2);
          } else
            throw error;
        }
        if (options.deps) {
          try {
            await importPolicySetDependencies({
              policySetData,
              exportData: importData,
              state: state2
            });
          } catch (error) {
            errors.push(error);
          }
        }
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing policy set ${policySetName}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(
      `Policy set ${policySetName} not found in import data`
    );
  }
  return response;
}
async function importFirstPolicySet({
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.policyset)) {
    try {
      const policySetData = importData.policyset[id2];
      delete policySetData._provider;
      delete policySetData._rev;
      if (options.prereqs) {
        try {
          await importPolicySetPrerequisites({
            policySetData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        response = await createPolicySet({ policySetData, state: state2 });
        imported.push(id2);
      } catch (error) {
        if (error.response?.status === 409) {
          response = await updatePolicySet({ policySetData, state: state2 });
          imported.push(id2);
        } else
          throw error;
      }
      if (options.deps) {
        try {
          await importPolicySetDependencies({
            policySetData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first policy set`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No policy sets found in import data`);
  }
  return response;
}
async function importPolicySets({
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  let response = null;
  const errors = [];
  for (const id2 of Object.keys(importData.policyset)) {
    try {
      const policySetData = importData.policyset[id2];
      delete policySetData._rev;
      if (options.prereqs) {
        try {
          await importPolicySetPrerequisites({
            policySetData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        response = await createPolicySet({ policySetData, state: state2 });
      } catch (error) {
        if (error.response?.status === 409) {
          response = await updatePolicySet({ policySetData, state: state2 });
        } else
          throw error;
      }
      if (options.deps) {
        try {
          await importPolicySetDependencies({
            policySetData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing policy sets`, errors);
  }
  return response;
}

// src/ops/ResourceTypeOps.ts
var ResourceTypeOps_default = (state2) => {
  return {
    async readResourceType(resourceTypeUuid) {
      return readResourceType({ resourceTypeUuid, state: state2 });
    },
    async readResourceTypes() {
      return readResourceTypes({ state: state2 });
    },
    async readResourceTypeByName(resourceTypeName) {
      return readResourceTypeByName({ resourceTypeName, state: state2 });
    },
    async createResourceType(resourceTypeData, resourceTypeUuid = void 0) {
      return createResourceType2({ resourceTypeData, resourceTypeUuid, state: state2 });
    },
    async updateResourceType(resourceTypeUuid, resourceTypeData) {
      return updateResourceType({
        resourceTypeUuid,
        resourceTypeData,
        state: state2
      });
    },
    async deleteResourceType(resourceTypeUuid) {
      return deleteResourceType2({ resourceTypeUuid, state: state2 });
    },
    async deleteResourceTypeByName(resourceTypeName) {
      return deleteResourceTypeByName({ resourceTypeName, state: state2 });
    },
    async exportResourceType(resourceTypeUuid) {
      return exportResourceType({ resourceTypeUuid, state: state2 });
    },
    async exportResourceTypeByName(resourceTypeName) {
      return exportResourceTypeByName({ resourceTypeName, state: state2 });
    },
    async exportResourceTypes() {
      return exportResourceTypes({ state: state2 });
    },
    async importResourceType(resourceTypeUuid, importData) {
      return importResourceType({
        resourceTypeUuid,
        importData,
        state: state2
      });
    },
    async importResourceTypeByName(resourceTypeName, importData) {
      return importResourceTypeByName({
        resourceTypeName,
        importData,
        state: state2
      });
    },
    async importFirstResourceType(importData) {
      return importFirstResourceType({ importData, state: state2 });
    },
    async importResourceTypes(importData) {
      return importResourceTypes({ importData, state: state2 });
    },
    // Deprecated
    async getResourceType(resourceTypeUuid) {
      return readResourceType({ resourceTypeUuid, state: state2 });
    },
    async getResourceTypes() {
      return readResourceTypes({ state: state2 });
    },
    async getResourceTypeByName(resourceTypeName) {
      return readResourceTypeByName({ resourceTypeName, state: state2 });
    }
  };
};
function createResourceTypeExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    policy: {},
    policyset: {},
    resourcetype: {}
  };
}
async function readResourceType({
  resourceTypeUuid,
  state: state2
}) {
  try {
    const response = await getResourceType({ resourceTypeUuid, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error reading resource type ${resourceTypeUuid}`,
      error
    );
  }
}
async function readResourceTypes({
  state: state2
}) {
  try {
    const { result } = await getResourceTypes({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading resource types`, error);
  }
}
async function readResourceTypeByName({
  resourceTypeName,
  state: state2
}) {
  try {
    const { result } = await getResourceTypeByName({
      resourceTypeName,
      state: state2
    });
    switch (result.length) {
      case 1:
        return result[0];
      case 0:
        throw new FrodoError(
          `Resource Type with name ${resourceTypeName} does not exist in realm ${state2.getRealm()}`
        );
      default:
        throw new FrodoError(
          `${result.length} resource types '${resourceTypeName}' found`
        );
    }
  } catch (error) {
    throw new FrodoError(
      `Error reading resource type ${resourceTypeName}`,
      error
    );
  }
}
async function updateResourceType({
  resourceTypeUuid,
  resourceTypeData,
  state: state2
}) {
  try {
    const response = await putResourceType({
      resourceTypeUuid,
      resourceTypeData,
      state: state2
    });
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error updating resource type ${resourceTypeUuid}`,
      error
    );
  }
}
async function deleteResourceType2({
  resourceTypeUuid,
  state: state2
}) {
  try {
    const response = await deleteResourceType({ resourceTypeUuid, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error deleting resource type ${resourceTypeUuid}`,
      error
    );
  }
}
async function deleteResourceTypeByName({
  resourceTypeName,
  state: state2
}) {
  try {
    const resourceTypeUuid = (await readResourceTypeByName({ resourceTypeName, state: state2 })).uuid;
    const response = await deleteResourceType({ resourceTypeUuid, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error deleting resource type ${resourceTypeName}`,
      error
    );
  }
}
async function exportResourceType({
  resourceTypeUuid,
  state: state2
}) {
  debugMessage({ message: `ResourceTypeOps.exportResourceType: start`, state: state2 });
  const exportData = createResourceTypeExportTemplate({ state: state2 });
  try {
    const resourceTypeData = await getResourceType({
      resourceTypeUuid,
      state: state2
    });
    exportData.resourcetype[resourceTypeData.uuid] = resourceTypeData;
    debugMessage({ message: `ResourceTypeOps.exportResourceType: end`, state: state2 });
    return exportData;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new FrodoError(
        `Resource type ${resourceTypeUuid} does not exist`,
        error
      );
    } else {
      throw new FrodoError(
        `Error exporting resource type ${resourceTypeUuid}`,
        error
      );
    }
  }
}
async function exportResourceTypeByName({
  resourceTypeName,
  state: state2
}) {
  debugMessage({
    message: `ResourceTypeOps.exportResourceTypeByName: start`,
    state: state2
  });
  const exportData = createResourceTypeExportTemplate({ state: state2 });
  try {
    const resourceTypeData = await readResourceTypeByName({
      resourceTypeName,
      state: state2
    });
    exportData.resourcetype[resourceTypeData.uuid] = resourceTypeData;
    debugMessage({
      message: `ResourceTypeOps.exportResourceTypeByName: end`,
      state: state2
    });
    return exportData;
  } catch (error) {
    throw new FrodoError(
      `Error exporting resource type ${resourceTypeName}`,
      error
    );
  }
}
async function exportResourceTypes({
  state: state2
}) {
  debugMessage({ message: `ResourceTypeOps.exportResourceType: start`, state: state2 });
  const exportData = createResourceTypeExportTemplate({ state: state2 });
  let indicatorId;
  try {
    const resourceTypes = await readResourceTypes({ state: state2 });
    indicatorId = createProgressIndicator({
      total: resourceTypes.length,
      message: "Exporting resource types...",
      state: state2
    });
    for (const resourceTypeData of resourceTypes) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting resource type ${resourceTypeData._id}`,
        state: state2
      });
      exportData.resourcetype[resourceTypeData.uuid] = resourceTypeData;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${resourceTypes.length} resource types.`,
      state: state2
    });
    debugMessage({ message: `ResourceTypeOps.exportResourceType: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting resource types`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(`Error exporting resource types`, error);
  }
}
async function importResourceType({
  resourceTypeUuid,
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.resourcetype)) {
    if (id2 === resourceTypeUuid) {
      try {
        const resourceTypeData = importData.resourcetype[id2];
        delete resourceTypeData._rev;
        try {
          response = await createResourceType({ resourceTypeData, state: state2 });
        } catch (createError) {
          if (createError.response?.status === 409)
            response = await putResourceType({
              resourceTypeUuid: id2,
              resourceTypeData,
              state: state2
            });
          else
            throw createError;
        }
        imported.push(id2);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(
      `Error importing resource type ${resourceTypeUuid}`,
      errors
    );
  }
  if (0 === imported.length) {
    throw new FrodoError(
      `Resource type ${resourceTypeUuid} not found in import data`
    );
  }
  return response;
}
async function importResourceTypeByName({
  resourceTypeName,
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.resourcetype)) {
    if (importData.resourcetype[id2].name === resourceTypeName) {
      try {
        const resourceTypeData = importData.resourcetype[id2];
        delete resourceTypeData._rev;
        try {
          response = await createResourceType({ resourceTypeData, state: state2 });
        } catch (createError) {
          if (createError.response?.status === 409)
            response = await putResourceType({
              resourceTypeUuid: id2,
              resourceTypeData,
              state: state2
            });
          else
            throw createError;
        }
        imported.push(id2);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(
      `Error importing resource type ${resourceTypeName}`,
      errors
    );
  }
  if (0 === imported.length) {
    throw new FrodoError(
      `Resource type ${resourceTypeName} not found in import data`
    );
  }
  return response;
}
async function importFirstResourceType({
  importData,
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.resourcetype)) {
    try {
      const resourceTypeData = importData.resourcetype[id2];
      delete resourceTypeData._provider;
      delete resourceTypeData._rev;
      try {
        response = await createResourceType({ resourceTypeData, state: state2 });
      } catch (createError) {
        if (createError.response?.status === 409)
          response = await putResourceType({
            resourceTypeUuid: id2,
            resourceTypeData,
            state: state2
          });
        else
          throw createError;
      }
      imported.push(id2);
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first resource type`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No resource types found in import data!`);
  }
  return response;
}
async function importResourceTypes({
  importData,
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const id2 of Object.keys(importData.resourcetype)) {
    try {
      const resourceTypeData = importData.resourcetype[id2];
      delete resourceTypeData._rev;
      try {
        response.push(await createResourceType({ resourceTypeData, state: state2 }));
      } catch (createError) {
        if (createError.response?.status === 409)
          response.push(
            await putResourceType({
              resourceTypeUuid: id2,
              resourceTypeData,
              state: state2
            })
          );
        else
          throw createError;
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing resource types`, errors);
  }
  return response;
}
async function createResourceType2({
  resourceTypeData,
  resourceTypeUuid,
  state: state2
}) {
  try {
    if (resourceTypeUuid)
      return putResourceType({
        resourceTypeUuid,
        resourceTypeData,
        failIfExists: true,
        state: state2
      });
    const response = await createResourceType({ resourceTypeData, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(
      `Error creating resource type${resourceTypeUuid ? " " + resourceTypeUuid : ""}`,
      error
    );
  }
}

// src/ops/PolicyOps.ts
var PolicyOps_default = (state2) => {
  return {
    createPolicyExportTemplate() {
      return createPolicyExportTemplate({ state: state2 });
    },
    async readPolicies() {
      return readPolicies({ state: state2 });
    },
    async readPoliciesByPolicySet(policySetId) {
      return readPoliciesByPolicySet({ policySetId, state: state2 });
    },
    async readPolicy(policyId) {
      return readPolicy({ policyId, state: state2 });
    },
    async createPolicy(policyId, policyData) {
      return createPolicy({ policyId, policyData, state: state2 });
    },
    async updatePolicy(policyId, policyData) {
      return updatePolicy({ policyId, policyData, state: state2 });
    },
    async deletePolicy(policyId) {
      return deletePolicy2({ policyId, state: state2 });
    },
    async exportPolicy(policyId, options = {
      deps: true,
      prereqs: false,
      useStringArrays: true
    }) {
      return exportPolicy({ policyId, options, state: state2 });
    },
    async exportPolicies(options = {
      deps: true,
      prereqs: false,
      useStringArrays: true
    }) {
      return exportPolicies({ options, state: state2 });
    },
    async exportPoliciesByPolicySet(policySetName, options = {
      deps: true,
      prereqs: false,
      useStringArrays: true
    }) {
      return exportPoliciesByPolicySet({
        policySetName,
        options,
        state: state2
      });
    },
    async importPolicy(policyId, importData, options = { deps: true, prereqs: false }) {
      return importPolicy({ policyId, importData, options, state: state2 });
    },
    async importFirstPolicy(importData, options = { deps: true, prereqs: false }) {
      return importFirstPolicy({ importData, options, state: state2 });
    },
    async importPolicies(importData, options = { deps: true, prereqs: false }) {
      return importPolicies({ importData, options, state: state2 });
    },
    // Deprecated
    async getPolicies() {
      return readPolicies({ state: state2 });
    },
    async getPoliciesByPolicySet(policySetId) {
      return readPoliciesByPolicySet({ policySetId, state: state2 });
    },
    async getPolicy(policyId) {
      return readPolicy({ policyId, state: state2 });
    },
    async putPolicy(policyId, policyData) {
      return updatePolicy({ policyId, policyData, state: state2 });
    }
  };
};
function createPolicyExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    script: {},
    policy: {},
    resourcetype: {},
    policyset: {}
  };
}
async function readPolicies({
  state: state2
}) {
  try {
    const { result } = await getPolicies({ state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error reading policies`, error);
  }
}
async function readPolicy({
  policyId,
  state: state2
}) {
  try {
    const response = await getPolicy({ policyId, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error reading policy ${policyId}`, error);
  }
}
async function deletePolicy2({
  policyId,
  state: state2
}) {
  try {
    const response = await deletePolicy({ policyId, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error deleting policy ${policyId}`, error);
  }
}
async function readPoliciesByPolicySet({
  policySetId,
  state: state2
}) {
  try {
    const data = await getPoliciesByPolicySet({ policySetId, state: state2 });
    return data.result;
  } catch (error) {
    throw new FrodoError(`Error reading policies in set ${policySetId}`, error);
  }
}
async function createPolicy({
  policyId,
  policyData,
  state: state2
}) {
  debugMessage({ message: `PolicyOps.createPolicy: start`, state: state2 });
  try {
    await getPolicy({ policyId, state: state2 });
  } catch (error) {
    try {
      const result = await putPolicy({
        policyId,
        policyData,
        state: state2
      });
      debugMessage({
        message: `PolicyOps.createPolicy: end`,
        state: state2
      });
      return result;
    } catch (error2) {
      throw new FrodoError(`Error creating policy ${policyId}`, error2);
    }
  }
  throw new Error(`Policy ${policyId} already exists!`);
}
async function updatePolicy({
  policyId,
  policyData,
  state: state2
}) {
  try {
    const response = await putPolicy({ policyId, policyData, state: state2 });
    return response;
  } catch (error) {
    throw new FrodoError(`Error updating policy ${policyId}`, error);
  }
}
function findScriptUuids(condition) {
  let scriptUuids = [];
  if (!condition)
    return scriptUuids;
  if (condition.type === "AND" || condition.type === "OR" || condition.type === "NOT") {
    if (condition.condition) {
      scriptUuids.push(...findScriptUuids(condition.condition));
    }
    if (condition.conditions) {
      for (const cond of condition.conditions) {
        scriptUuids.push(...findScriptUuids(cond));
      }
    }
  } else if (condition.type === "Script") {
    scriptUuids.push(condition.scriptId);
  }
  scriptUuids = [...new Set(scriptUuids)];
  return scriptUuids;
}
async function getScripts2({
  policyData,
  state: state2
}) {
  debugMessage({
    message: `PolicyOps.getScripts: start [policy=${policyData["name"]}]`,
    state: state2
  });
  const errors = [];
  const scripts = [];
  try {
    const scriptUuids = findScriptUuids(policyData.condition);
    debugMessage({ message: `found scripts: ${scriptUuids}`, state: state2 });
    for (const scriptUuid of scriptUuids) {
      try {
        const script = await readScript({ scriptId: scriptUuid, state: state2 });
        scripts.push(script);
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error retrieving script ${scriptUuid} referenced in policy ${policyData["name"]}`,
            error
          )
        );
      }
    }
  } catch (error) {
    errors.push(
      new FrodoError(
        `Error finding scripts in policy ${policyData["name"]}`,
        error
      )
    );
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error getting policy scripts`, errors);
  }
  debugMessage({ message: `PolicySetOps.getScripts: end`, state: state2 });
  return scripts;
}
async function exportPolicyPrerequisites({
  policyData,
  exportData,
  state: state2
}) {
  const errors = [];
  debugMessage({
    message: `PolicyOps.exportPolicyPrerequisites: start [policy=${policyData["name"]}]`,
    state: state2
  });
  if (policyData.resourceTypeUuid) {
    try {
      const resourceType = await getResourceType({
        resourceTypeUuid: policyData.resourceTypeUuid,
        state: state2
      });
      exportData.resourcetype[policyData.resourceTypeUuid] = resourceType;
    } catch (error) {
      errors.push(error);
    }
  }
  if (policyData.applicationName) {
    try {
      const policySet = await readPolicySet({
        policySetName: policyData.applicationName,
        state: state2
      });
      exportData.policyset[policyData.applicationName] = policySet;
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error exporting policy prerequisites`, errors);
  }
  debugMessage({
    message: `PolicySetOps.exportPolicyPrerequisites: end`,
    state: state2
  });
}
async function exportPolicyDependencies({
  policyData,
  options,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicyOps.exportPolicyDependencies: start [policy=${policyData["name"]}]`,
    state: state2
  });
  try {
    const scripts = await getScripts2({ policyData, state: state2 });
    for (const scriptData of scripts) {
      if (options.useStringArrays) {
        scriptData.script = convertBase64TextToArray(
          scriptData.script
        );
      }
      exportData.script[scriptData._id] = scriptData;
    }
  } catch (error) {
    throw new FrodoError(`Error exporting policy dependencies`, error);
  }
  debugMessage({
    message: `PolicySetOps.exportPolicySetDependencies: end`,
    state: state2
  });
}
async function exportPolicy({
  policyId,
  options = {
    deps: true,
    prereqs: false,
    useStringArrays: true
  },
  state: state2
}) {
  const errors = [];
  try {
    debugMessage({ message: `PolicyOps.exportPolicy: start`, state: state2 });
    const policyData = await getPolicy({ policyId, state: state2 });
    const exportData = createPolicyExportTemplate({ state: state2 });
    exportData.policy[policyData._id] = policyData;
    if (options.prereqs) {
      try {
        await exportPolicyPrerequisites({ policyData, exportData, state: state2 });
      } catch (error) {
        errors.push(error);
      }
    }
    if (options.deps) {
      try {
        await exportPolicyDependencies({
          policyData,
          options,
          exportData,
          state: state2
        });
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting policy ${policyId}`, errors);
    }
    debugMessage({ message: `PolicyOps.exportPolicy: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(`Error exporting policy ${policyId}`, error);
  }
}
async function exportPolicies({
  options = {
    deps: true,
    prereqs: false,
    useStringArrays: true
  },
  state: state2
}) {
  debugMessage({ message: `PolicyOps.exportPolicies: start`, state: state2 });
  const exportData = createPolicyExportTemplate({ state: state2 });
  const errors = [];
  let indicatorId;
  try {
    const policies = await readPolicies({ state: state2 });
    indicatorId = createProgressIndicator({
      total: policies.length,
      message: "Exporting policies...",
      state: state2
    });
    for (const policyData of policies) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting policy ${policyData._id}`,
        state: state2
      });
      exportData.policy[policyData._id] = policyData;
      if (options.prereqs) {
        try {
          await exportPolicyPrerequisites({ policyData, exportData, state: state2 });
        } catch (error) {
          errors.push(error);
        }
      }
      if (options.deps) {
        try {
          await exportPolicyDependencies({
            policyData,
            options,
            exportData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(`Error exporting policies`, errors);
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${policies.length} policies.`,
      state: state2
    });
    debugMessage({ message: `PolicyOps.exportPolicies: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting policies.`,
      status: "fail",
      state: state2
    });
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(`Error exporting policies`, error);
  }
}
async function exportPoliciesByPolicySet({
  policySetName,
  options = {
    deps: true,
    prereqs: false,
    useStringArrays: true
  },
  state: state2
}) {
  debugMessage({ message: `PolicyOps.exportPolicies: start`, state: state2 });
  const exportData = createPolicyExportTemplate({ state: state2 });
  const errors = [];
  try {
    const policies = await readPoliciesByPolicySet({
      policySetId: policySetName,
      state: state2
    });
    for (const policyData of policies) {
      exportData.policy[policyData._id] = policyData;
      if (options.prereqs) {
        try {
          await exportPolicyPrerequisites({ policyData, exportData, state: state2 });
        } catch (error) {
          errors.push(error);
        }
      }
      if (options.deps) {
        try {
          await exportPolicyDependencies({
            policyData,
            options,
            exportData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error exporting policies in set ${policySetName}`,
        errors
      );
    }
    debugMessage({ message: `PolicyOps.exportPolicies: end`, state: state2 });
    return exportData;
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error exporting policies in set ${policySetName}`,
      error
    );
  }
}
async function importPolicyPrerequisites({
  policyData,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicyOps.importPolicyHardDependencies: start [policy=${policyData._id}]`,
    state: state2
  });
  const errors = [];
  try {
    if (exportData.resourcetype[policyData.resourceTypeUuid]) {
      try {
        debugMessage({
          message: `Importing resource type ${policyData.resourceTypeUuid}`,
          state: state2
        });
        await updateResourceType({
          resourceTypeUuid: policyData.resourceTypeUuid,
          resourceTypeData: exportData.resourcetype[policyData.resourceTypeUuid],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing prerequisite resource type ${policyData.resourceTypeUuid}`,
            error
          )
        );
      }
    }
    if (exportData.policyset[policyData.applicationName]) {
      try {
        debugMessage({
          message: `Importing policy set ${policyData.applicationName}`,
          state: state2
        });
        await updatePolicySet2({
          policySetData: exportData.policyset[policyData.applicationName],
          state: state2
        });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing prerequisite policy set ${policyData.applicationName}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing prerequisites for policy ${policyData._id}`,
        errors
      );
    }
    debugMessage({
      message: `PolicyOps.importPolicyHardDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error importing prerequisites for policy ${policyData._id}`,
      error
    );
  }
}
async function importPolicyDependencies({
  policyData,
  exportData,
  state: state2
}) {
  debugMessage({
    message: `PolicyOps.importPolicySoftDependencies: start [policy=${policyData._id}]`,
    state: state2
  });
  const errors = [];
  try {
    const scriptUuids = findScriptUuids(policyData.condition);
    for (const scriptUuid of scriptUuids) {
      try {
        const scriptData = exportData.script[scriptUuid];
        debugMessage({ message: `Importing script ${scriptUuid}`, state: state2 });
        await updateScript({ scriptId: scriptUuid, scriptData, state: state2 });
      } catch (error) {
        errors.push(
          new FrodoError(
            `Error importing script ${scriptUuid} for policy ${policyData._id}`,
            error
          )
        );
      }
    }
    if (errors.length > 0) {
      throw new FrodoError(
        `Error importing soft dependencies for policy ${policyData._id}`,
        errors
      );
    }
    debugMessage({
      message: `PolicyOps.importPolicySoftDependencies: end`,
      state: state2
    });
  } catch (error) {
    if (errors.length > 0) {
      throw error;
    }
    throw new FrodoError(
      `Error importing soft dependencies for policy ${policyData._id}`,
      error
    );
  }
}
async function importPolicy({
  policyId,
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.policy)) {
    if (id2 === policyId) {
      try {
        const policyData = importData.policy[id2];
        delete policyData._rev;
        if (options.policySetName) {
          policyData.applicationName = options.policySetName;
        }
        if (options.prereqs) {
          try {
            await importPolicyPrerequisites({
              policyData,
              exportData: importData,
              state: state2
            });
          } catch (error) {
            errors.push(error);
          }
        }
        try {
          response = await updatePolicy({
            policyId: policyData._id,
            policyData,
            state: state2
          });
          imported.push(id2);
        } catch (error) {
          errors.push(error);
        }
        if (options.deps) {
          try {
            await importPolicyDependencies({
              policyData,
              exportData: importData,
              state: state2
            });
          } catch (error) {
            errors.push(error);
          }
        }
      } catch (error) {
        errors.push(error);
      }
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing policy ${policyId}`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`Policy ${policyId} not found in import data`);
  }
  return response;
}
async function importFirstPolicy({
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  let response = null;
  const errors = [];
  const imported = [];
  for (const id2 of Object.keys(importData.policy)) {
    try {
      const policyData = importData.policy[id2];
      delete policyData._rev;
      if (options.policySetName) {
        policyData.applicationName = options.policySetName;
      }
      if (options.prereqs) {
        try {
          await importPolicyPrerequisites({
            policyData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        response = await updatePolicy({
          policyId: policyData._id,
          policyData,
          state: state2
        });
        imported.push(id2);
      } catch (error) {
        errors.push(error);
      }
      if (options.deps) {
        try {
          await importPolicyDependencies({
            policyData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    } catch (error) {
      errors.push(error);
    }
    break;
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing first policy`, errors);
  }
  if (0 === imported.length) {
    throw new FrodoError(`No policy found in import data`);
  }
  return response;
}
async function importPolicies({
  importData,
  options = { deps: true, prereqs: false },
  state: state2
}) {
  const response = [];
  const errors = [];
  for (const id2 of Object.keys(importData.policy)) {
    try {
      const policyData = importData.policy[id2];
      delete policyData._rev;
      if (options.policySetName) {
        policyData.applicationName = options.policySetName;
      }
      if (options.prereqs) {
        try {
          await importPolicyPrerequisites({
            policyData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
      try {
        response.push(
          await updatePolicy({ policyId: policyData._id, policyData, state: state2 })
        );
      } catch (error) {
        errors.push(error);
      }
      if (options.deps) {
        try {
          await importPolicyDependencies({
            policyData,
            exportData: importData,
            state: state2
          });
        } catch (error) {
          errors.push(error);
        }
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(`Error importing policies`, errors);
  }
  return response;
}

// src/api/ServiceApi.ts
import util29 from "util";
var serviceURLTemplate = "%s/json%s/%s/services/%s";
var serviceURLNextDescendentsTemplate = "%s/json%s/%s/services/%s?_action=nextdescendents";
var serviceURLNextDescendentTemplate = "%s/json%s/%s/services/%s/%s/%s";
var serviceListURLTemplate = "%s/json%s/%s/services?_queryFilter=true";
var apiVersion22 = "protocol=2.0,resource=1.0";
function getApiConfig21() {
  return {
    apiVersion: apiVersion22
  };
}
function getRealmPath2(globalConfig, state2) {
  if (globalConfig)
    return "";
  return getCurrentRealmPath(state2);
}
function getConfigPath(globalConfig) {
  if (globalConfig)
    return "global-config";
  return "realm-config";
}
async function getListOfServices({
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceListURLTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig)
  );
  const { data } = await generateAmApi({ resource: getApiConfig21(), state: state2 }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getService({
  serviceId,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig21(),
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}
async function getServiceDescendents({
  serviceId,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLNextDescendentsTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig21(),
    state: state2
  }).post(urlString, {
    withCredentials: true
  });
  return data.result;
}
async function putService({
  serviceId,
  serviceData,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId
  );
  const { data } = await generateAmApi({ resource: getApiConfig21(), state: state2 }).put(
    urlString,
    serviceData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function putServiceNextDescendent({
  serviceId,
  serviceType,
  serviceNextDescendentId,
  serviceNextDescendentData,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLNextDescendentTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId,
    serviceType,
    serviceNextDescendentId
  );
  const { data } = await generateAmApi({ resource: getApiConfig21(), state: state2 }).put(
    urlString,
    serviceNextDescendentData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteService({
  serviceId,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig21(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}
async function deleteServiceNextDescendent({
  serviceId,
  serviceType,
  serviceNextDescendentId,
  globalConfig = false,
  state: state2
}) {
  const urlString = util29.format(
    serviceURLNextDescendentTemplate,
    state2.getHost(),
    getRealmPath2(globalConfig, state2),
    getConfigPath(globalConfig),
    serviceId,
    serviceType,
    serviceNextDescendentId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig21(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/ServiceOps.ts
var ServiceOps_default = (state2) => {
  return {
    createServiceExportTemplate() {
      return createServiceExportTemplate({ state: state2 });
    },
    /**
     * Get list of services
     * @param {boolean} globalConfig true if the list of global services is requested, false otherwise. Default: false.
     */
    async getListOfServices(globalConfig = false) {
      return getListOfServices2({ globalConfig, state: state2 });
    },
    /**
     * Get all services including their descendents.
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     * @returns Promise resolving to an array of services with their descendants
     */
    async getFullServices(globalConfig = false) {
      return getFullServices({ globalConfig, state: state2 });
    },
    /**
     * Deletes the specified service
     * @param {string} serviceId The service to delete
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    async deleteFullService(serviceId, globalConfig = false) {
      return deleteFullService({ serviceId, globalConfig, state: state2 });
    },
    /**
     * Deletes all services
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    async deleteFullServices(globalConfig = false) {
      return deleteFullServices({ globalConfig, state: state2 });
    },
    /**
     * Export service. The response can be saved to file as is.
     * @param serviceId service id/name
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     * @returns {Promise<ServiceExportInterface>} Promise resolving to a ServiceExportInterface object.
     */
    async exportService(serviceId, globalConfig = false) {
      return exportService({ serviceId, globalConfig, state: state2 });
    },
    /**
     * Export all services
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    async exportServices(globalConfig = false) {
      return exportServices({ globalConfig, state: state2 });
    },
    /**
     * Imports a single service using a reference to the service and a file to read the data from. Optionally clean (remove) an existing service first
     * @param {string} serviceId The service id/name to add
     * @param {ServiceExportInterface} importData The service configuration export data to import
     * @param {ServiceImportOptions} options Import options
     * @returns {Promise<AmServiceSkeleton>} A promise resolving to a service object
     */
    async importService(serviceId, importData, options = {
      clean: false,
      global: false,
      realm: false
    }) {
      return importService({
        serviceId,
        importData,
        options,
        state: state2
      });
    },
    /**
     * Imports multiple services from the same file. Optionally clean (remove) existing services first
     * @param {ServiceExportInterface} importData The service configuration export data to import
     * @param {ServiceImportOptions} options Import options
     * @returns {Promise<AmServiceSkeleton[]>} A promise resolving to an array of service objects
     */
    async importServices(importData, options = {
      clean: false,
      global: false,
      realm: false
    }) {
      return importServices({
        importData,
        options,
        state: state2
      });
    }
  };
};
function createServiceExportTemplate({
  state: state2
}) {
  return {
    meta: getMetadata({ state: state2 }),
    service: {}
  };
}
async function getListOfServices2({
  globalConfig = false,
  state: state2
}) {
  try {
    debugMessage({ message: `ServiceOps.getListOfServices: start`, state: state2 });
    const services = (await getListOfServices({ globalConfig, state: state2 })).result;
    debugMessage({ message: `ServiceOps.getListOfServices: end`, state: state2 });
    return services;
  } catch (error) {
    throw new FrodoError(
      `Error getting list of ${globalConfig ? "global" : "realm"} services`,
      error
    );
  }
}
async function getFullServices({
  globalConfig = false,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceOps.getFullServices: start, globalConfig=${globalConfig}`,
      state: state2
    });
    const serviceList = (await getListOfServices({ globalConfig, state: state2 })).result;
    const fullServiceData = await Promise.all(
      serviceList.map(async (listItem) => {
        try {
          const [service, nextDescendents] = await Promise.all([
            getService({ serviceId: listItem._id, globalConfig, state: state2 }),
            getServiceDescendents({
              serviceId: listItem._id,
              globalConfig,
              state: state2
            })
          ]);
          return {
            ...service,
            nextDescendents
          };
        } catch (error) {
          if (!(error.response?.status === 403 && error.response?.data?.message === "This operation is not available in ForgeRock Identity Cloud.")) {
            const message = error.response?.data?.message;
            printMessage({
              message: `Unable to retrieve data for ${listItem._id} with error: ${message}`,
              type: "error",
              state: state2
            });
          }
        }
      })
    );
    debugMessage({ message: `ServiceOps.getFullServices: end`, state: state2 });
    return fullServiceData.filter((data) => !!data);
  } catch (error) {
    throw new FrodoError(
      `Error getting ${globalConfig ? "global" : "realm"} full service configs`,
      error
    );
  }
}
async function putFullService({
  serviceId,
  fullServiceData,
  clean,
  globalConfig = false,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceOps.putFullService: start, serviceId=${serviceId}, globalConfig=${globalConfig}`,
      state: state2
    });
    const nextDescendents = fullServiceData.nextDescendents;
    delete fullServiceData.nextDescendents;
    delete fullServiceData._rev;
    delete fullServiceData.enabled;
    if (clean) {
      try {
        debugMessage({ message: `ServiceOps.putFullService: clean`, state: state2 });
        await deleteFullService({ serviceId, globalConfig, state: state2 });
      } catch (error) {
        if (!(error.response?.status === 404 && error.response?.data?.message === "Not Found")) {
          throw new FrodoError(
            `Error deleting service '${serviceId}' before import`,
            error
          );
        }
      }
    }
    delete fullServiceData.location;
    const result = await putService({
      serviceId,
      serviceData: fullServiceData,
      globalConfig,
      state: state2
    });
    if (nextDescendents.length === 0) {
      debugMessage({
        message: `ServiceOps.putFullService: end (w/o descendents)`,
        state: state2
      });
      return result;
    }
    const nextDescendentResult = await Promise.all(
      nextDescendents.map(async (descendent) => {
        const type = descendent._type._id;
        const descendentId = descendent._id;
        debugMessage({
          message: `ServiceOps.putFullService: descendentId=${descendentId}`,
          state: state2
        });
        let result2 = void 0;
        try {
          result2 = await putServiceNextDescendent({
            serviceId,
            serviceType: type,
            serviceNextDescendentId: descendentId,
            serviceNextDescendentData: descendent,
            globalConfig,
            state: state2
          });
        } catch (error) {
          throw new FrodoError(
            `Error putting descendent '${descendentId}' of service '${serviceId}'`,
            error
          );
        }
        return result2;
      })
    );
    result.nextDescendents = nextDescendentResult;
    debugMessage({
      message: `ServiceOps.putFullService: end (w/ descendents)`,
      state: state2
    });
    return result;
  } catch (error) {
    throw new FrodoError(
      `Error putting ${globalConfig ? "global" : "realm"} full service config ${serviceId}`,
      error
    );
  }
}
async function putFullServices({
  serviceEntries,
  clean,
  globalConfig = false,
  realmConfig = false,
  state: state2
}) {
  debugMessage({
    message: `ServiceOps.putFullServices: start, globalConfig=${globalConfig}`,
    state: state2
  });
  const errors = [];
  const results = [];
  for (const [id2, data] of serviceEntries) {
    try {
      let result;
      if (globalConfig || !realmConfig && data.location === "global") {
        result = await putFullService({
          serviceId: id2,
          fullServiceData: data,
          clean,
          globalConfig: true,
          state: state2
        });
      }
      if (realmConfig || !globalConfig && data.location === state2.getRealm()) {
        result = await putFullService({
          serviceId: id2,
          fullServiceData: data,
          clean,
          globalConfig: false,
          state: state2
        });
      }
      if (result)
        results.push(result);
      debugMessage({ message: `Imported: ${id2}`, state: state2 });
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new FrodoError(
      `Error putting ${globalConfig ? "global" : "realm"} full service configs`,
      errors
    );
  }
  debugMessage({ message: `ServiceOps.putFullServices: end`, state: state2 });
  return results;
}
async function deleteFullService({
  serviceId,
  globalConfig = false,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceOps.deleteFullService: start, globalConfig=${globalConfig}`,
      state: state2
    });
    const serviceNextDescendentData = await getServiceDescendents({
      serviceId,
      globalConfig,
      state: state2
    });
    await Promise.all(
      serviceNextDescendentData.map(
        (nextDescendent) => deleteServiceNextDescendent({
          serviceId,
          serviceType: nextDescendent._type._id,
          serviceNextDescendentId: nextDescendent._id,
          globalConfig,
          state: state2
        })
      )
    );
    debugMessage({ message: `ServiceOps.deleteFullService: end`, state: state2 });
    return deleteService({ serviceId, globalConfig, state: state2 });
  } catch (error) {
    throw new FrodoError(
      `Error deleting ${globalConfig ? "global" : "realm"} full service config ${serviceId}`,
      error
    );
  }
}
async function deleteFullServices({
  globalConfig = false,
  state: state2
}) {
  debugMessage({
    message: `ServiceOps.deleteFullServices: start, globalConfig=${globalConfig}`,
    state: state2
  });
  try {
    const serviceList = (await getListOfServices({ globalConfig, state: state2 })).result;
    const deleted = await Promise.all(
      serviceList.map(async (serviceListItem) => {
        try {
          return deleteFullService({
            serviceId: serviceListItem._id,
            globalConfig,
            state: state2
          });
        } catch (error) {
          if (!(error.response?.status === 403 && error.response?.data?.message === "This operation is not available in ForgeRock Identity Cloud.")) {
            const message = error.response?.data?.message;
            printMessage({
              message: `Delete service '${serviceListItem._id}': ${message}`,
              state: state2,
              type: "error"
            });
          }
        }
      })
    );
    debugMessage({ message: `ServiceOps.deleteFullServices: end`, state: state2 });
    return deleted;
  } catch (error) {
    throw new FrodoError(
      `Error deleting ${globalConfig ? "global" : "realm"} full service configs`,
      error
    );
  }
}
async function exportService({
  serviceId,
  globalConfig = false,
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceOps.exportService: start, globalConfig=${globalConfig}`,
      state: state2
    });
    const exportData = createServiceExportTemplate({ state: state2 });
    const service = await getService({ serviceId, globalConfig, state: state2 });
    service.nextDescendents = await getServiceDescendents({
      serviceId,
      globalConfig,
      state: state2
    });
    service.location = globalConfig ? "global" : state2.getRealm();
    exportData.service[serviceId] = service;
    debugMessage({ message: `ServiceOps.exportService: end`, state: state2 });
    return exportData;
  } catch (error) {
    throw new FrodoError(
      `Error exporting ${globalConfig ? "global" : "realm"} service ${serviceId}`,
      error
    );
  }
}
async function exportServices({
  globalConfig = false,
  state: state2
}) {
  debugMessage({
    message: `ServiceOps.exportServices: start, globalConfig=${globalConfig}`,
    state: state2
  });
  let indicatorId;
  try {
    const exportData = createServiceExportTemplate({ state: state2 });
    const services = await getFullServices({ globalConfig, state: state2 });
    indicatorId = createProgressIndicator({
      total: services.length,
      message: `Exporting ${globalConfig ? "global" : "realm"} services...`,
      state: state2
    });
    for (const service of services) {
      updateProgressIndicator({
        id: indicatorId,
        message: `Exporting ${globalConfig ? "global" : "realm"} service ${service._id}`,
        state: state2
      });
      service.location = globalConfig ? "global" : state2.getRealm();
      exportData.service[service._type._id] = service;
    }
    stopProgressIndicator({
      id: indicatorId,
      message: `Exported ${services.length} ${globalConfig ? "global" : "realm"} services.`,
      state: state2
    });
    debugMessage({ message: `ServiceOps.exportServices: end`, state: state2 });
    return exportData;
  } catch (error) {
    stopProgressIndicator({
      id: indicatorId,
      message: `Error exporting ${globalConfig ? "global" : "realm"} services.`,
      status: "fail",
      state: state2
    });
    throw new FrodoError(
      `Error exporting ${globalConfig ? "global" : "realm"} services`,
      error
    );
  }
}
async function importService({
  serviceId,
  importData,
  options = {
    clean: false,
    global: false,
    realm: false
  },
  state: state2
}) {
  try {
    debugMessage({
      message: `ServiceOps.importService: start, global=${options.global}, realm=${options.realm}`,
      state: state2
    });
    const serviceData = importData.service[serviceId];
    let result;
    if (options.global || !options.realm && serviceData.location === "global") {
      result = await putFullService({
        serviceId,
        fullServiceData: serviceData,
        clean: options.clean,
        globalConfig: true,
        state: state2
      });
    }
    if (options.realm || !options.global && serviceData.location === state2.getRealm()) {
      result = await putFullService({
        serviceId,
        fullServiceData: serviceData,
        clean: options.clean,
        globalConfig: false,
        state: state2
      });
    }
    debugMessage({ message: `ServiceOps.importService: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error importing service ${serviceId}`, error);
  }
}
async function importServices({
  importData,
  options = {
    clean: false,
    global: false,
    realm: false
  },
  state: state2
}) {
  debugMessage({
    message: `ServiceOps.importServices: start, global=${options.global}, realm=${options.realm}`,
    state: state2
  });
  try {
    const result = await putFullServices({
      serviceEntries: Object.entries(importData.service),
      clean: options.clean,
      globalConfig: options.global,
      realmConfig: options.realm,
      state: state2
    });
    debugMessage({ message: `ServiceOps.importServices: end`, state: state2 });
    return result;
  } catch (error) {
    throw new FrodoError(`Error importing services`, error);
  }
}

// src/ops/ConfigOps.ts
var ConfigOps_default = (state2) => {
  return {
    async exportFullConfiguration(options = {
      useStringArrays: true,
      noDecode: false,
      coords: true,
      includeDefault: false
    }, collectErrors) {
      return exportFullConfiguration({ options, collectErrors, state: state2 });
    },
    async importFullConfiguration(importData, options = {
      reUuidJourneys: false,
      reUuidScripts: false,
      cleanServices: false,
      global: false,
      realm: false,
      includeDefault: false
    }, collectErrors) {
      return importFullConfiguration({
        importData,
        options,
        collectErrors,
        state: state2
      });
    }
  };
};
async function exportFullConfiguration({
  options = {
    useStringArrays: true,
    noDecode: false,
    coords: true,
    includeDefault: false
  },
  collectErrors,
  state: state2
}) {
  let errors = [];
  let throwErrors = true;
  if (collectErrors && Array.isArray(collectErrors)) {
    throwErrors = false;
    errors = collectErrors;
  }
  const { useStringArrays, noDecode, coords, includeDefault } = options;
  const stateObj = { state: state2 };
  let saml = (await exportOrImportWithErrorHandling(
    exportSaml2Providers,
    stateObj,
    errors
  ))?.saml;
  const cotExport = await exportOrImportWithErrorHandling(
    exportCirclesOfTrust,
    stateObj,
    errors
  );
  if (saml) {
    saml.cot = cotExport?.saml.cot;
  } else {
    saml = cotExport?.saml;
  }
  const fullExport = {
    meta: getMetadata(stateObj),
    agents: (await exportOrImportWithErrorHandling(exportAgents, stateObj, errors))?.agents,
    application: (await exportOrImportWithErrorHandling(
      exportOAuth2Clients,
      {
        options: { deps: false, useStringArrays },
        state: state2
      },
      errors
    ))?.application,
    authentication: (await exportOrImportWithErrorHandling(
      exportAuthenticationSettings,
      stateObj,
      errors
    ))?.authentication,
    config: (await exportOrImportWithErrorHandling(
      exportConfigEntities,
      stateObj,
      errors
    ))?.config,
    emailTemplate: (await exportOrImportWithErrorHandling(
      exportEmailTemplates,
      stateObj,
      errors
    ))?.emailTemplate,
    idp: (await exportOrImportWithErrorHandling(
      exportSocialIdentityProviders,
      stateObj,
      errors
    ))?.idp,
    managedApplication: (await exportOrImportWithErrorHandling(
      exportApplications,
      {
        options: { deps: false, useStringArrays },
        state: state2
      },
      errors
    ))?.managedApplication,
    policy: (await exportOrImportWithErrorHandling(
      exportPolicies,
      {
        options: { deps: false, prereqs: false, useStringArrays },
        state: state2
      },
      errors
    ))?.policy,
    policyset: (await exportOrImportWithErrorHandling(
      exportPolicySets,
      {
        options: { deps: false, prereqs: false, useStringArrays },
        state: state2
      },
      errors
    ))?.policyset,
    resourcetype: (await exportOrImportWithErrorHandling(
      exportResourceTypes,
      stateObj,
      errors
    ))?.resourcetype,
    saml,
    script: (await exportOrImportWithErrorHandling(
      exportScripts,
      {
        includeDefault,
        state: state2
      },
      errors
    ))?.script,
    secrets: (await exportOrImportWithErrorHandling(exportSecrets, stateObj, errors))?.secrets,
    service: {
      ...(await exportOrImportWithErrorHandling(
        exportServices,
        {
          globalConfig: true,
          state: state2
        },
        errors
      ))?.service,
      ...(await exportOrImportWithErrorHandling(
        exportServices,
        {
          globalConfig: false,
          state: state2
        },
        errors
      ))?.service
    },
    theme: (await exportOrImportWithErrorHandling(exportThemes, stateObj, errors))?.theme,
    trees: (await exportOrImportWithErrorHandling(
      exportJourneys,
      {
        options: { deps: false, useStringArrays, coords },
        state: state2
      },
      errors
    ))?.trees,
    variables: (await exportOrImportWithErrorHandling(
      exportVariables,
      {
        noDecode,
        state: state2
      },
      errors
    ))?.variables
  };
  if (throwErrors && errors.length > 0) {
    throw new FrodoError(`Error exporting full config`, errors);
  }
  return fullExport;
}
async function importFullConfiguration({
  importData,
  options = {
    reUuidJourneys: false,
    reUuidScripts: false,
    cleanServices: false,
    global: false,
    realm: false,
    includeDefault: false
  },
  collectErrors,
  state: state2
}) {
  let errors = [];
  let throwErrors = true;
  if (collectErrors && Array.isArray(collectErrors)) {
    throwErrors = false;
    errors = collectErrors;
  }
  const {
    reUuidJourneys,
    reUuidScripts,
    cleanServices,
    global: global2,
    realm,
    includeDefault
  } = options;
  const indicatorId = createProgressIndicator({
    total: 16,
    message: "Importing everything...",
    state: state2
  });
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Scripts...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importScripts,
    {
      scriptName: "",
      importData,
      options: {
        reUuid: reUuidScripts,
        includeDefault
      },
      validate: false,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Authentication Settings...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importAuthenticationSettings,
    {
      importData,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Agents...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importAgents,
    { importData, state: state2 },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing IDM Config Entities...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importConfigEntities,
    {
      importData,
      options: { validate: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Email Templates...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importEmailTemplates,
    {
      importData,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Resource Types...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importResourceTypes,
    {
      importData,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Circles of Trust...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importCirclesOfTrust,
    {
      importData,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Services...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importServices,
    {
      importData,
      options: { clean: cleanServices, global: global2, realm },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Themes...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importThemes,
    {
      importData,
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Saml2 Providers...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importSaml2Providers,
    {
      importData,
      options: { deps: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Social Identity Providers...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importSocialIdentityProviders,
    {
      importData,
      options: { deps: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing OAuth2 Clients...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importOAuth2Clients,
    {
      importData,
      options: { deps: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Applications...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importApplications,
    {
      importData,
      options: { deps: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Policy Sets...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importPolicySets,
    {
      importData,
      options: { deps: false, prereqs: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Policies...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importPolicies,
    {
      importData,
      options: { deps: false, prereqs: false },
      state: state2
    },
    errors
  );
  updateProgressIndicator({
    id: indicatorId,
    message: `Importing Journeys...`,
    state: state2
  });
  await exportOrImportWithErrorHandling(
    importJourneys,
    {
      importData,
      options: { deps: false, reUuid: reUuidJourneys },
      state: state2
    },
    errors
  );
  stopProgressIndicator({
    id: indicatorId,
    message: "Finished Importing Everything!",
    status: "success",
    state: state2
  });
  if (throwErrors && errors.length > 0) {
    throw new FrodoError(`Error importing full config`, errors);
  }
}

// src/api/cloud/EnvInfoApi.ts
import util30 from "util";
var envInfoURLTemplate2 = "%s/environment/info";
var apiVersion23 = "protocol=1.0,resource=1.0";
var getApiConfig22 = () => ({
  path: `/environment/info`,
  apiVersion: apiVersion23
});
async function getEnvInfo({
  state: state2
}) {
  const urlString = util30.format(
    envInfoURLTemplate2,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateAmApi({
    resource: getApiConfig22(),
    requestOverride: {},
    state: state2
  }).get(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/InfoOps.ts
var InfoOps_default = (state2) => {
  return {
    /**
     * Get info about the platform instance
     * @returns {Promise<PlatformInfo>} a promise that resolves to a json blob with information about the instance and tokens
     */
    getInfo() {
      return getInfo(state2);
    }
  };
};
async function getCloudInfo(state2) {
  let info = {};
  info = await getEnvInfo({ state: state2 });
  delete info.message_box_html;
  delete info.message_box_title;
  delete info.message_variant;
  delete info.warning_message_html;
  if (!info.placeholder_management_migration_date)
    delete info.placeholder_management_migration_date;
  return info;
}
async function getAmVersion(state2) {
  const versionObj = await getServerVersionInfo({ state: state2 });
  const amVersion = `${versionObj["version"]} Build ${versionObj["revision"]} (${versionObj["date"]})`;
  return amVersion;
}
async function getAuthenticatedSubject(state2) {
  let subjectString = `${state2.getUsername()} (User)`;
  if (state2.getUseBearerTokenForAmApis()) {
    const name2 = (await getServiceAccount({
      serviceAccountId: state2.getServiceAccountId(),
      state: state2
    })).name;
    subjectString = `${name2} [${state2.getServiceAccountId()}] (Service Account)`;
  }
  return subjectString;
}
async function getInfo(state2) {
  try {
    const info = {
      host: state2.getHost(),
      amVersion: await getAmVersion(state2),
      authenticatedSubject: await getAuthenticatedSubject(state2),
      deploymentType: state2.getDeploymentType(),
      cookieName: state2.getCookieName(),
      sessionToken: state2.getCookieValue(),
      // only add bearerToken if we have it
      ...state2.getBearerToken() && { bearerToken: state2.getBearerToken() },
      // only add cloud env info if deployment type is cloud
      ...state2.getDeploymentType() === Constants_default.CLOUD_DEPLOYMENT_TYPE_KEY && await getCloudInfo(state2)
    };
    return info;
  } catch (error) {
    throw new FrodoError(`Error getting info`, error);
  }
}

// src/api/RealmApi.ts
import util31 from "util";
var realmsListURLTemplate = "%s/json/global-config/realms/?_queryFilter=true";
var realmURLTemplate = "%s/json/global-config/realms/%s";
var createRealmURLTemplate = "%s/json/global-config/realms?_action=create";
var apiVersion24 = "protocol=2.0,resource=1.0";
var getApiConfig23 = () => {
  return {
    apiVersion: apiVersion24
  };
};
async function getRealms({
  state: state2
}) {
  const urlString = util31.format(realmsListURLTemplate, state2.getHost());
  const { data } = await generateAmApi({ resource: getApiConfig23(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
async function getRealm({
  realmId,
  state: state2
}) {
  const urlString = util31.format(realmURLTemplate, state2.getHost(), realmId);
  const { data } = await generateAmApi({ resource: getApiConfig23(), state: state2 }).get(
    urlString,
    {
      withCredentials: true
    }
  );
  return data;
}
var realmTemplate = {
  name: "",
  active: true,
  parentPath: "/",
  aliases: []
};
async function createRealm({
  realmData = realmTemplate,
  state: state2
}) {
  const urlString = util31.format(createRealmURLTemplate, state2.getHost());
  const { data } = await generateAmApi({
    resource: getApiConfig23(),
    state: state2
  }).post(urlString, realmData, {
    withCredentials: true
  });
  return data;
}
async function putRealm({
  realmId,
  realmData,
  state: state2
}) {
  const urlString = util31.format(realmURLTemplate, state2.getHost(), realmId);
  const { data } = await generateAmApi({ resource: getApiConfig23(), state: state2 }).put(
    urlString,
    realmData,
    {
      withCredentials: true
    }
  );
  return data;
}
async function deleteRealm({
  realmId,
  state: state2
}) {
  const urlString = util31.format(
    realmURLTemplate,
    getHostBaseUrl(state2.getHost()),
    realmId
  );
  const { data } = await generateAmApi({
    resource: getApiConfig23(),
    state: state2
  }).delete(urlString, {
    withCredentials: true
  });
  return data;
}

// src/ops/RealmOps.ts
var RealmOps_default = (state2) => {
  return {
    readRealms() {
      return getRealms2({ state: state2 });
    },
    readRealm(realmId) {
      return getRealm2({ realmId, state: state2 });
    },
    readRealmByName(realmName) {
      return getRealmByName({ realmName, state: state2 });
    },
    createRealm(realmName, realmData) {
      return createRealm2({ realmName, realmData, state: state2 });
    },
    updateRealm(realmId, realmData) {
      return updateRealm({ realmId, realmData, state: state2 });
    },
    deleteRealm(realmId) {
      return deleteRealm2({ realmId, state: state2 });
    },
    deleteRealmByName(realmName) {
      return deleteRealmByName({ realmName, state: state2 });
    },
    async addCustomDomain(realmName, domain) {
      return addCustomDomain({ realmName, domain, state: state2 });
    },
    async removeCustomDomain(realmName, domain) {
      return removeCustomDomain({ realmName, domain, state: state2 });
    },
    // Deprecated
    getRealms() {
      return getRealms2({ state: state2 });
    },
    getRealmByName(realmName) {
      return getRealmByName({ realmName, state: state2 });
    },
    putRealm(realmId, realmData) {
      return updateRealm({ realmId, realmData, state: state2 });
    }
  };
};
async function getRealms2({ state: state2 }) {
  const { result } = await getRealms({ state: state2 });
  return result;
}
async function createRealm2({
  realmName,
  realmData = void 0,
  state: state2
}) {
  realmData.name = realmName;
  return createRealm({ realmData, state: state2 });
}
async function updateRealm({
  realmId,
  realmData,
  state: state2
}) {
  return putRealm({ realmId, realmData, state: state2 });
}
async function getRealm2({
  realmId,
  state: state2
}) {
  return getRealm({ realmId, state: state2 });
}
async function getRealmByName({
  realmName,
  state: state2
}) {
  const realms = await getRealms2({ state: state2 });
  for (const realm of realms) {
    if (getRealmName(realmName) === realm.name) {
      return realm;
    }
  }
  throw new Error(`Realm ${realmName} not found!`);
}
async function deleteRealm2({
  realmId,
  state: state2
}) {
  return deleteRealm({ realmId, state: state2 });
}
async function deleteRealmByName({
  realmName,
  state: state2
}) {
  const realms = await getRealms2({ state: state2 });
  for (const realm of realms) {
    if (getRealmName(realmName) === realm.name) {
      return deleteRealm2({ realmId: realm._id, state: state2 });
    }
  }
  throw new Error(`Realm ${realmName} not found!`);
}
async function addCustomDomain({
  realmName,
  domain,
  state: state2
}) {
  try {
    let realmData = await getRealmByName({ realmName, state: state2 });
    let exists = false;
    realmData.aliases.forEach((alias) => {
      if (domain.toLowerCase() === alias.toLowerCase()) {
        exists = true;
      }
    });
    if (!exists) {
      try {
        realmData.aliases.push(domain.toLowerCase());
        realmData = await putRealm({
          realmId: realmData._id,
          realmData,
          state: state2
        });
        return realmData;
      } catch (error) {
        error.message = `Error adding custom domain ${domain} to realm ${realmName}: ${error.message}`;
        throw error;
      }
    }
  } catch (error) {
    error.message = `Error reading realm ${realmName}: ${error.message}`;
    throw error;
  }
}
async function removeCustomDomain({
  realmName,
  domain,
  state: state2
}) {
  try {
    let realmData = await getRealmByName({ realmName, state: state2 });
    const aliases = realmData.aliases.filter(
      (alias) => domain.toLowerCase() !== alias.toLowerCase()
    );
    if (aliases.length < realmData.aliases.length) {
      try {
        realmData.aliases = aliases;
        realmData = await putRealm({
          realmId: realmData._id,
          realmData,
          state: state2
        });
        return realmData;
      } catch (error) {
        error.message = `Error removing custom domain ${domain} from realm ${realmName}: ${error.message}`;
        throw error;
      }
    }
  } catch (error) {
    error.message = `Error reading realm ${realmName}: ${error.message}`;
    throw error;
  }
}

// src/api/ReconApi.ts
import util32 from "util";
var apiVersion25 = "resource=1.0";
var apiConfig = { headers: { "Accept-API-Version": apiVersion25 } };
var reconUrlTemplate = "%s/openidm/recon";
var reconByIdUrlTemplate = "%s/openidm/recon/%s";
var startReconUrlTemplate = "%s/openidm/recon?_action=recon&mapping=%s";
var startReconByIdUrlTemplate = "%s/openidm/recon?_action=reconById&mapping=%s&id=%s";
var cancelReconUrlTemplate = "%s/openidm/recon/%s?_action=cancel";
async function getRecons({
  state: state2
}) {
  const urlString = util32.format(
    reconUrlTemplate,
    getHostBaseUrl(state2.getHost())
  );
  const { data } = await generateIdmApi({
    requestOverride: apiConfig,
    state: state2
  }).get(urlString);
  return data;
}
async function getRecon({
  reconId,
  state: state2
}) {
  const urlString = util32.format(
    reconByIdUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    reconId
  );
  const { data } = await generateIdmApi({
    requestOverride: apiConfig,
    state: state2
  }).get(urlString);
  return data;
}
async function startRecon({
  mappingName,
  state: state2
}) {
  const urlString = util32.format(
    startReconUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    mappingName
  );
  const { data } = await generateIdmApi({
    requestOverride: apiConfig,
    state: state2
  }).post(urlString);
  return data;
}
async function startReconById({
  mappingName,
  objectId,
  state: state2
}) {
  const urlString = util32.format(
    startReconByIdUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    mappingName,
    objectId
  );
  const { data } = await generateIdmApi({
    requestOverride: apiConfig,
    state: state2
  }).post(urlString);
  return data;
}
async function cancelRecon({
  reconId,
  state: state2
}) {
  const urlString = util32.format(
    cancelReconUrlTemplate,
    getHostBaseUrl(state2.getHost()),
    reconId
  );
  const { data } = await generateIdmApi({
    requestOverride: apiConfig,
    state: state2
  }).post(urlString);
  return data;
}

// src/ops/ReconOps.ts
var ReconOps_default = (state2) => {
  return {
    async readRecons() {
      return readRecons({ state: state2 });
    },
    async readRecon(reconId) {
      return readRecon({ reconId, state: state2 });
    },
    async startRecon(mappingName) {
      return startRecon2({ mappingName, state: state2 });
    },
    async startReconById(mappingName, objectId) {
      return startReconById2({ mappingName, objectId, state: state2 });
    },
    async cancelRecon(reconId) {
      return cancelRecon2({ reconId, state: state2 });
    }
  };
};
async function readRecons({
  state: state2
}) {
  return getRecons({ state: state2 });
}
async function readRecon({
  reconId,
  state: state2
}) {
  return getRecon({ reconId, state: state2 });
}
async function startRecon2({
  mappingName,
  state: state2
}) {
  return startRecon({ mappingName, state: state2 });
}
async function startReconById2({
  mappingName,
  objectId,
  state: state2
}) {
  return startReconById({ mappingName, objectId, state: state2 });
}
async function cancelRecon2({
  reconId,
  state: state2
}) {
  return cancelRecon({ reconId, state: state2 });
}

// src/ops/VersionUtils.ts
var VersionUtils_default = (state2) => {
  return {
    getVersion() {
      return getVersion({ state: state2 });
    },
    async getAllVersions(endpoints) {
      return getAllVersions({ endpoints, state: state2 });
    }
  };
};
function getVersion({ state: state2 }) {
  if (state2)
    return getVersionFromPackage();
}
async function getAllVersions({
  endpoints,
  state: state2
}) {
  const reqPromises = [];
  endpoints.forEach((item) => {
    reqPromises.push(
      generateReleaseApi({ baseUrl: item.base, state: state2 }).get(item.path)
    );
  });
  const result = await Promise.allSettled(reqPromises);
  return result;
}

// src/lib/FrodoLib.ts
var FrodoLib = (config = {}) => {
  const state2 = State_default(config);
  return {
    state: state2,
    admin: AdminOps_default(state2),
    agent: AgentOps_default(state2),
    app: ApplicationOps_default(state2),
    authn: {
      journey: JourneyOps_default(state2),
      node: NodeOps_default(state2),
      settings: AuthenticationSettingsOps_default(state2)
    },
    authz: {
      policy: PolicyOps_default(state2),
      policySet: PolicySetOps_default(state2),
      resourceType: ResourceTypeOps_default(state2)
    },
    cloud: {
      adminFed: AdminFederationOps_default(state2),
      feature: FeatureOps_default(state2),
      log: LogOps_default(state2),
      secret: SecretsOps_default(state2),
      serviceAccount: ServiceAccountOps_default(state2),
      startup: StartupOps_default(state2),
      variable: VariablesOps_default(state2)
    },
    config: ConfigOps_default(state2),
    conn: ConnectionProfileOps_default(state2),
    cache: TokenCacheOps_default(state2),
    email: {
      template: EmailTemplateOps_default(state2)
    },
    idm: {
      config: IdmConfigOps_default(state2),
      connector: ConnectorOps_default(state2),
      managed: ManagedObjectOps_default(state2),
      mapping: MappingOps_default(state2),
      organization: OrganizationOps_default(state2),
      recon: ReconOps_default(state2),
      system: IdmSystemOps_default(state2)
    },
    info: InfoOps_default(state2),
    login: AuthenticateOps_default(state2),
    oauth2oidc: {
      client: OAuth2ClientOps_default(state2),
      endpoint: OAuth2OidcOps_default(state2),
      external: IdpOps_default(state2),
      provider: OAuth2ProviderOps_default(state2),
      issuer: OAuth2TrustedJwtIssuerOps_default(state2)
    },
    realm: RealmOps_default(state2),
    saml2: {
      circlesOfTrust: CirclesOfTrustOps_default(state2),
      entityProvider: Saml2Ops_default(state2)
    },
    script: ScriptOps_default(state2),
    service: ServiceOps_default(state2),
    session: SessionOps_default(state2),
    theme: ThemeOps_default(state2),
    utils: {
      ...ForgeRockUtils_default(state2),
      ...ScriptValidationUtils_default(state2),
      ...ExportImportUtils_default(state2),
      ...Base64Utils_default(),
      constants: Constants_default,
      jose: JoseOps_default(state2),
      json: JsonUtils_default(),
      version: VersionUtils_default(state2)
    },
    createInstance,
    createInstanceWithAdminAccount,
    createInstanceWithServiceAccount
  };
};
function createInstance(config) {
  const frodo2 = FrodoLib(config);
  return frodo2;
}
function createInstanceWithServiceAccount(host, serviceAccountId, serviceAccountJwkStr, realm = void 0, deploymentType = void 0, allowInsecureConnection = false, debug = false, curlirize2 = false) {
  const config = {
    host,
    serviceAccountId,
    serviceAccountJwk: JSON.parse(serviceAccountJwkStr),
    realm,
    deploymentType,
    allowInsecureConnection,
    debug,
    curlirize: curlirize2
  };
  const frodo2 = FrodoLib(config);
  return frodo2;
}
function createInstanceWithAdminAccount(host, username, password, realm = void 0, deploymentType = void 0, allowInsecureConnection = false, debug = false, curlirize2 = false) {
  const config = {
    host,
    username,
    password,
    realm,
    deploymentType,
    allowInsecureConnection,
    debug,
    curlirize: curlirize2
  };
  const frodo2 = FrodoLib(config);
  return frodo2;
}
var frodo = FrodoLib();
var state = frodo.state;
export {
  FrodoError,
  frodo,
  state
};
//# sourceMappingURL=index.js.map