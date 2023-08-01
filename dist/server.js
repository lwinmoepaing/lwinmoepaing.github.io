import 'events';
import 'stream';
import { Headers as Headers$1, Request as Request$1, FormData, File, Response as Response$1, fetch as fetch$1 } from 'undici';
import crypto from 'crypto';
import Streams from 'stream/web';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var multipart$1 = {};

var hasRequiredMultipart;

function requireMultipart () {
	if (hasRequiredMultipart) return multipart$1;
	hasRequiredMultipart = 1;
	/**
	 * Multipart Parser (Finite State Machine)
	 * usage:
	 * const multipart = require('./multipart.js');
	 * const body = multipart.DemoData(); 							   // raw body
	 * const body = Buffer.from(event['body-json'].toString(),'base64'); // AWS case
	 * const boundary = multipart.getBoundary(event.params.header['content-type']);
	 * const parts = multipart.Parse(body,boundary);
	 * each part is:
	 * { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
	 *  or { name: 'key', data: <Buffer 41 41 41 41 42 42 42 42> }
	 */
	Object.defineProperty(multipart$1, "__esModule", { value: true });
	multipart$1.DemoData = multipart$1.getBoundary = multipart$1.parse = void 0;
	var ParsingState;
	(function (ParsingState) {
	    ParsingState[ParsingState["INIT"] = 0] = "INIT";
	    ParsingState[ParsingState["READING_HEADERS"] = 1] = "READING_HEADERS";
	    ParsingState[ParsingState["READING_DATA"] = 2] = "READING_DATA";
	    ParsingState[ParsingState["READING_PART_SEPARATOR"] = 3] = "READING_PART_SEPARATOR";
	})(ParsingState || (ParsingState = {}));
	function parse(multipartBodyBuffer, boundary) {
	    var lastline = '';
	    var contentDispositionHeader = '';
	    var contentTypeHeader = '';
	    var state = ParsingState.INIT;
	    var buffer = [];
	    var allParts = [];
	    var currentPartHeaders = [];
	    for (var i = 0; i < multipartBodyBuffer.length; i++) {
	        var oneByte = multipartBodyBuffer[i];
	        var prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
	        // 0x0a => \n
	        // 0x0d => \r
	        var newLineDetected = oneByte === 0x0a && prevByte === 0x0d;
	        var newLineChar = oneByte === 0x0a || oneByte === 0x0d;
	        if (!newLineChar)
	            lastline += String.fromCharCode(oneByte);
	        if (ParsingState.INIT === state && newLineDetected) {
	            // searching for boundary
	            if ('--' + boundary === lastline) {
	                state = ParsingState.READING_HEADERS; // found boundary. start reading headers
	            }
	            lastline = '';
	        }
	        else if (ParsingState.READING_HEADERS === state && newLineDetected) {
	            // parsing headers. Headers are separated by an empty line from the content. Stop reading headers when the line is empty
	            if (lastline.length) {
	                currentPartHeaders.push(lastline);
	            }
	            else {
	                // found empty line. search for the headers we want and set the values
	                for (var _i = 0, currentPartHeaders_1 = currentPartHeaders; _i < currentPartHeaders_1.length; _i++) {
	                    var h = currentPartHeaders_1[_i];
	                    if (h.toLowerCase().startsWith('content-disposition:')) {
	                        contentDispositionHeader = h;
	                    }
	                    else if (h.toLowerCase().startsWith('content-type:')) {
	                        contentTypeHeader = h;
	                    }
	                }
	                state = ParsingState.READING_DATA;
	                buffer = [];
	            }
	            lastline = '';
	        }
	        else if (ParsingState.READING_DATA === state) {
	            // parsing data
	            if (lastline.length > boundary.length + 4) {
	                lastline = ''; // mem save
	            }
	            if ('--' + boundary === lastline) {
	                var j = buffer.length - lastline.length;
	                var part = buffer.slice(0, j - 1);
	                allParts.push(process({ contentDispositionHeader: contentDispositionHeader, contentTypeHeader: contentTypeHeader, part: part }));
	                buffer = [];
	                currentPartHeaders = [];
	                lastline = '';
	                state = ParsingState.READING_PART_SEPARATOR;
	                contentDispositionHeader = '';
	                contentTypeHeader = '';
	            }
	            else {
	                buffer.push(oneByte);
	            }
	            if (newLineDetected) {
	                lastline = '';
	            }
	        }
	        else if (ParsingState.READING_PART_SEPARATOR === state) {
	            if (newLineDetected) {
	                state = ParsingState.READING_HEADERS;
	            }
	        }
	    }
	    return allParts;
	}
	multipart$1.parse = parse;
	//  read the boundary from the content-type header sent by the http client
	//  this value may be similar to:
	//  'multipart/form-data; boundary=----WebKitFormBoundaryvm5A9tzU1ONaGP5B',
	function getBoundary(header) {
	    var items = header.split(';');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = new String(items[i]).trim();
	            if (item.indexOf('boundary') >= 0) {
	                var k = item.split('=');
	                return new String(k[1]).trim().replace(/^["']|["']$/g, '');
	            }
	        }
	    }
	    return '';
	}
	multipart$1.getBoundary = getBoundary;
	function DemoData() {
	    var body = 'trash1\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Type: text/plain\r\n';
	    body +=
	        'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"\r\n';
	    body += '\r\n';
	    body += '@11X';
	    body += '111Y\r\n';
	    body += '111Z\rCCCC\nCCCC\r\nCCCCC@\r\n\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Type: text/plain\r\n';
	    body +=
	        'Content-Disposition: form-data; name="uploads[]"; filename="B.txt"\r\n';
	    body += '\r\n';
	    body += '@22X';
	    body += '222Y\r\n';
	    body += '222Z\r222W\n2220\r\n666@\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
	    body += 'Content-Disposition: form-data; name="input1"\r\n';
	    body += '\r\n';
	    body += 'value1\r\n';
	    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp--\r\n';
	    return {
	        body: Buffer.from(body),
	        boundary: '----WebKitFormBoundaryvef1fLxmoUdYZWXp'
	    };
	}
	multipart$1.DemoData = DemoData;
	function process(part) {
	    // will transform this object:
	    // { header: 'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"',
	    // info: 'Content-Type: text/plain',
	    // part: 'AAAABBBB' }
	    // into this one:
	    // { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
	    var obj = function (str) {
	        var k = str.split('=');
	        var a = k[0].trim();
	        var b = JSON.parse(k[1].trim());
	        var o = {};
	        Object.defineProperty(o, a, {
	            value: b,
	            writable: true,
	            enumerable: true,
	            configurable: true
	        });
	        return o;
	    };
	    var header = part.contentDispositionHeader.split(';');
	    var filenameData = header[2];
	    var input = {};
	    if (filenameData) {
	        input = obj(filenameData);
	        var contentType = part.contentTypeHeader.split(':')[1].trim();
	        Object.defineProperty(input, 'type', {
	            value: contentType,
	            writable: true,
	            enumerable: true,
	            configurable: true
	        });
	    }
	    // always process the name field
	    Object.defineProperty(input, 'name', {
	        value: header[1].split('=')[1].replace(/"/g, ''),
	        writable: true,
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(input, 'data', {
	        value: Buffer.from(part.part),
	        writable: true,
	        enumerable: true,
	        configurable: true
	    });
	    return input;
	}
	
	return multipart$1;
}

var multipartExports = requireMultipart();
var multipart = /*@__PURE__*/getDefaultExportFromCjs(multipartExports);

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser encountered an error while decoding a cookie with value '" +
	        value +
	        "'. Set options.decodeValues to false to disable this feature.",
	      e
	    );
	  }

	  var cookie = {
	    name: name,
	    value: value,
	  };

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      cookie.maxAge = parseInt(value, 10);
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return {};
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!options.map) {
	    return input.filter(isNonEmptyString).map(function (str) {
	      return parseString(str, options);
	    });
	  } else {
	    var cookies = {};
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      cookies[cookie.name] = cookie;
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

requireSetCookie();

function nodeToWeb(nodeStream) {
  var destroyed = false;
  var listeners = {};

  function start(controller) {
    listeners["data"] = onData;
    listeners["end"] = onData;
    listeners["end"] = onDestroy;
    listeners["close"] = onDestroy;
    listeners["error"] = onDestroy;
    for (var name in listeners) nodeStream.on(name, listeners[name]);

    nodeStream.pause();

    function onData(chunk) {
      if (destroyed) return;
      controller.enqueue(chunk);
      nodeStream.pause();
    }

    function onDestroy(err) {
      if (destroyed) return;
      destroyed = true;

      for (var name in listeners) nodeStream.removeListener(name, listeners[name]);

      if (err) controller.error(err);
      else controller.close();
    }
  }

  function pull() {
    if (destroyed) return;
    nodeStream.resume();
  }

  function cancel() {
    destroyed = true;

    for (var name in listeners) nodeStream.removeListener(name, listeners[name]);

    nodeStream.push(null);
    nodeStream.pause();
    if (nodeStream.destroy) nodeStream.destroy();
    else if (nodeStream.close) nodeStream.close();
  }

  return new ReadableStream({ start: start, pull: pull, cancel: cancel });
}

function createHeaders(requestHeaders) {
  let headers = new Headers$1();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

class NodeRequest extends Request$1 {
  constructor(input, init) {
    if (init && init.data && init.data.on) {
      init = {
        duplex: "half",
        ...init,
        body: init.data.headers["content-type"]?.includes("x-www")
          ? init.data
          : nodeToWeb(init.data)
      };
    }

    super(input, init);
  }

  // async json() {
  //   return JSON.parse(await this.text());
  // }

  async buffer() {
    return Buffer.from(await super.arrayBuffer());
  }

  // async text() {
  //   return (await this.buffer()).toString();
  // }

  // @ts-ignore
  async formData() {
    if (this.headers.get("content-type") === "application/x-www-form-urlencoded") {
      return await super.formData();
    } else {
      const data = await this.buffer();
      const input = multipart.parse(
        data,
        this.headers.get("content-type").replace("multipart/form-data; boundary=", "")
      );
      const form = new FormData();
      input.forEach(({ name, data, filename, type }) => {
        // file fields have Content-Type set,
        // whereas non-file fields must not
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#multipart-form-data
        const isFile = type !== undefined;
        if (isFile) {
          const value = new File([data], filename, { type });
          form.append(name, value, filename);
        } else {
          const value = data.toString("utf-8");
          form.append(name, value);
        }
      });
      return form;
    }
  }

  // @ts-ignore
  clone() {
    /** @type {BaseNodeRequest & { buffer?: () => Promise<Buffer>; formData?: () => Promise<FormData> }}  */
    let el = super.clone();
    el.buffer = this.buffer.bind(el);
    el.formData = this.formData.bind(el);
    return el;
  }
}

function createRequest(req) {
  let origin = req.headers.origin && 'null' !== req.headers.origin
      ? req.headers.origin
      : `http://${req.headers.host}`;
  let url = new URL(req.url, origin);

  let init = {
    method: req.method,
    headers: createHeaders(req.headers),
    // POST, PUT, & PATCH will be read as body by NodeRequest
    data: req.method.indexOf("P") === 0 ? req : null
  };

  return new NodeRequest(url.href, init);
}

Object.assign(globalThis, Streams, {
  Request: Request$1,
  Response: Response$1,
  fetch: fetch$1,
  Headers: Headers$1
});

if (globalThis.crypto != crypto.webcrypto) {
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto;
}

var manifest = {
	"/*404": [
	{
		type: "script",
		href: "/assets/_...404_-cdac17a6.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-58a3b59f.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-882598a9.css"
	}
],
	"/about/": [
	{
		type: "script",
		href: "/assets/index-000598d4.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-58a3b59f.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-882598a9.css"
	}
],
	"/": [
	{
		type: "script",
		href: "/assets/index-2799f640.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-58a3b59f.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-882598a9.css"
	}
],
	"/sharing/catch-22-experience": [
	{
		type: "script",
		href: "/assets/catch-22-experience-1a58676a.js"
	},
	{
		type: "script",
		href: "/assets/entry-client-58a3b59f.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-882598a9.css"
	}
],
	"entry-client": [
	{
		type: "script",
		href: "/assets/entry-client-58a3b59f.js"
	},
	{
		type: "style",
		href: "/assets/entry-client-882598a9.css"
	}
],
	"index.html": [
]
};

const ERROR = Symbol("error");
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const fns = lookup(owner, ERROR);
  const error = castError(err);
  if (!fns) throw error;
  try {
    for (const f of fns) f(error);
  } catch (e) {
    handleError(e, owner && owner.owner || null);
  }
}
const UNOWNED = {
  context: null,
  owner: null,
  owned: null,
  cleanups: null
};
let Owner = null;
function createOwner() {
  const o = {
    owner: Owner,
    context: null,
    owned: null,
    cleanups: null
  };
  if (Owner) {
    if (!Owner.owned) Owner.owned = [o];else Owner.owned.push(o);
  }
  return o;
}
function createRoot(fn, detachedOwner) {
  const owner = Owner,
    root = fn.length === 0 ? UNOWNED : {
      context: null,
      owner: detachedOwner === undefined ? owner : detachedOwner,
      owned: null,
      cleanups: null
    };
  Owner = root;
  let result;
  try {
    result = fn(fn.length === 0 ? () => {} : () => cleanNode(root));
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function createComputed(fn, value) {
  Owner = createOwner();
  try {
    fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
const createRenderEffect = createComputed;
function createMemo(fn, value) {
  Owner = createOwner();
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function batch(fn) {
  return fn();
}
const untrack = batch;
function on$1(deps, fn, options = {}) {
  const isArray = Array.isArray(deps);
  const defer = options.defer;
  return () => {
    if (defer) return undefined;
    let value;
    if (isArray) {
      value = [];
      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
    } else value = deps();
    return fn(value);
  };
}
function onCleanup(fn) {
  if (Owner) {
    if (!Owner.cleanups) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
  }
  return fn;
}
function cleanNode(node) {
  if (node.owned) {
    for (let i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = null;
  }
}
function catchError(fn, handler) {
  Owner = {
    owner: Owner,
    context: {
      [ERROR]: [handler]
    },
    owned: null,
    cleanups: null
  };
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
}
function getOwner() {
  return Owner;
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}

function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode$1(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
  return `${ctx.id}${ctx.count++}`;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i] || {};
              if (typeof s === "function") s = s();
              const v = s[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const descriptors = Object.getOwnPropertyDescriptors(props),
    split = k => {
      const clone = {};
      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        if (descriptors[key]) {
          Object.defineProperty(clone, key, descriptors[key]);
          delete descriptors[key];
        }
      }
      return clone;
    };
  return keys.map(split).concat(split(Object.keys(descriptors)));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.keyed ? props.when : () => props.when) : c : props.fallback || "";
}
function ErrorBoundary$1(props) {
  let error,
    res,
    clean,
    sync = true;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  function displayFallback() {
    cleanNode(clean);
    ctx.writeResource(id, error, true);
    setHydrateContext({
      ...ctx,
      count: 0
    });
    const f = props.fallback;
    return typeof f === "function" && f.length ? f(error, () => {}) : f;
  }
  createMemo(() => {
    clean = Owner;
    return catchError(() => res = props.children, err => {
      error = err;
      !sync && ctx.replace("e" + id, displayFallback);
      sync = true;
    });
  });
  if (error) return displayFallback();
  sync = false;
  return {
    t: `<!--!$e${id}-->${resolveSSRNode$1(res)}<!--!$/e${id}-->`
  };
}
const SuspenseContext = createContext();
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function startTransition(fn) {
  fn();
}
function Suspense(props) {
  let done;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  const o = createOwner();
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(res));
      }
    }
  });
  function suspenseError(err) {
    if (!done || !done(undefined, err)) {
      runWithOwner(o.owner, () => {
        throw err;
      });
    }
  }
  function runSuspense() {
    setHydrateContext({
      ...ctx,
      count: 0
    });
    cleanNode(o);
    return runWithOwner(o, () => createComponent(SuspenseContext.Provider, {
      value,
      get children() {
        return catchError(() => props.children, suspenseError);
      }
    }));
  }
  const res = runSuspense();
  if (suspenseComplete(value)) return res;
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  return catchError(() => {
    if (ctx.async) {
      setHydrateContext({
        ...ctx,
        count: 0,
        id: ctx.id + "0-f",
        noHydrate: true
      });
      const res = {
        t: `<template id="pl-${id}"></template>${resolveSSRNode$1(props.fallback)}<!--pl-${id}-->`
      };
      setHydrateContext(ctx);
      return res;
    }
    setHydrateContext({
      ...ctx,
      count: 0,
      id: ctx.id + "0-f"
    });
    ctx.writeResource(id, "$$f");
    return props.fallback;
  }, suspenseError);
}

var I=(c=>(c[c.AggregateError=1]="AggregateError",c[c.ArrayPrototypeValues=2]="ArrayPrototypeValues",c[c.ArrowFunction=4]="ArrowFunction",c[c.BigInt=8]="BigInt",c[c.ErrorPrototypeStack=16]="ErrorPrototypeStack",c[c.Map=32]="Map",c[c.MethodShorthand=64]="MethodShorthand",c[c.ObjectAssign=128]="ObjectAssign",c[c.Promise=256]="Promise",c[c.Set=512]="Set",c[c.Symbol=1024]="Symbol",c[c.TypedArray=2048]="TypedArray",c[c.BigIntTypedArray=4096]="BigIntTypedArray",c))(I||{});var be="hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_",ve=be.length,Ae="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_",ge=Ae.length;function se(e){let r=e%ve,n=be[r];for(e=(e-r)/ve;e>0;)r=e%ge,n+=Ae[r],e=(e-r)/ge;return n}var Le={disabledFeatures:0};function h(e={}){let r=Object.assign({},Le,e||{});return {markedRefs:new Set,refs:new Map,features:8191^r.disabledFeatures}}function V(e){return {stack:[],vars:[],assignments:[],validRefs:[],refSize:0,features:e.features,markedRefs:new Set(e.markedRefs),valueMap:new Map}}function R(e,r){e.markedRefs.add(r);}function m(e,r){let n=e.validRefs[r];n==null&&(n=e.refSize++,e.validRefs[r]=n);let t=e.vars[n];return t==null&&(t=se(n),e.vars[n]=t),t}function P(e,r){let n=e.refs.get(r);return n==null?e.refs.size:n}function z(e,r){let n=e.refs.get(r);if(n==null){let t=e.refs.size;return e.refs.set(r,t),t}return R(e,n),n}function S(e,r){if(!e)throw new Error(r)}function A$2(e){let r="",n=0;for(let t=0,a=e.length;t<a;t++){let o;switch(e[t]){case'"':o='\\"';break;case"\\":o="\\\\";break;case"<":o="\\x3C";break;case`
`:o="\\n";break;case"\r":o="\\r";break;case"\u2028":o="\\u2028";break;case"\u2029":o="\\u2029";break;default:continue}r+=e.slice(n,t)+o,n=t+1;}return n===0?r=e:r+=e.slice(n),r}var Ie={[0]:"Symbol.asyncIterator",[1]:"Symbol.hasInstance",[2]:"Symbol.isConcatSpreadable",[3]:"Symbol.iterator",[4]:"Symbol.match",[5]:"Symbol.matchAll",[6]:"Symbol.replace",[7]:"Symbol.search",[8]:"Symbol.species",[9]:"Symbol.split",[10]:"Symbol.toPrimitive",[11]:"Symbol.toStringTag",[12]:"Symbol.unscopables"},O={[Symbol.asyncIterator]:0,[Symbol.hasInstance]:1,[Symbol.isConcatSpreadable]:2,[Symbol.iterator]:3,[Symbol.match]:4,[Symbol.matchAll]:5,[Symbol.replace]:6,[Symbol.search]:7,[Symbol.species]:8,[Symbol.split]:9,[Symbol.toPrimitive]:10,[Symbol.toStringTag]:11,[Symbol.unscopables]:12};var T={t:2,i:void 0,s:!0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},U={t:2,i:void 0,s:!1,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},j={t:4,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},M={t:3,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},D={t:5,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},_={t:6,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},L={t:7,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},x={t:8,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0};function F(e){return {t:0,i:void 0,s:e,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function K(e){return {t:1,i:void 0,s:A$2(e),l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function W(e,r){return S(e.features&8,'Unsupported type "BigInt"'),{t:9,i:void 0,s:""+r,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Y(e){return {t:10,i:e,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Z(e,r){return {t:11,i:e,s:r.toISOString(),l:void 0,c:void 0,m:void 0,d:void 0,f:void 0,a:void 0}}function G(e,r){return {t:12,i:e,s:void 0,l:void 0,c:r.source,m:r.flags,d:void 0,a:void 0,f:void 0}}function H(e,r,n){let t=n.constructor.name;S(e.features&2048,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:22,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}var ke=4104;function J(e,r,n){let t=n.constructor.name;S((e.features&ke)===ke,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:23,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}function $(e){return {t:24,i:void 0,s:O[e],l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function w(e){return e instanceof EvalError?"EvalError":e instanceof RangeError?"RangeError":e instanceof ReferenceError?"ReferenceError":e instanceof SyntaxError?"SyntaxError":e instanceof TypeError?"TypeError":e instanceof URIError?"URIError":"Error"}function C(e,r){let n,t=w(r);r.name!==t?n={name:r.name}:r.constructor.name!==t&&(n={name:r.constructor.name});let a=Object.getOwnPropertyNames(r);for(let o of a)o!=="name"&&o!=="message"&&(o==="stack"?e.features&16&&(n=n||{},n[o]=r[o]):(n=n||{},n[o]=r[o]));return n}function q(e){let r=Object.getOwnPropertyNames(e);if(r.length){let n={};for(let t of r)n[t]=e[t];return n}}function N(e){if(!e||typeof e!="object"||Array.isArray(e))return !1;switch(e.constructor){case Map:case Set:case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:case BigInt64Array:case BigUint64Array:return !1;}return Symbol.iterator in e}var xe=/^[$A-Z_][0-9A-Z_$]*$/i;function le(e){let r=e[0];return (r==="$"||r==="_"||r>="A"&&r<="Z"||r>="a"&&r<="z")&&xe.test(e)}function ne(e){switch(e.t){case"index":return e.s+"="+e.v;case"map":return e.s+".set("+e.k+","+e.v+")";case"set":return e.s+".add("+e.v+")";default:return ""}}function nr(e){let r=[],n=e[0],t=n,a;for(let o=1,i=e.length;o<i;o++){if(a=e[o],a.t===t.t)switch(a.t){case"index":a.v===t.v?n={t:"index",s:a.s,k:void 0,v:ne(n)}:(r.push(n),n=a);break;case"map":a.s===t.s?n={t:"map",s:ne(n),k:a.k,v:a.v}:(r.push(n),n=a);break;case"set":a.s===t.s?n={t:"set",s:ne(n),k:void 0,v:a.v}:(r.push(n),n=a);break;}else r.push(n),n=a;t=a;}return r.push(n),r}function Pe(e){if(e.length){let r="",n=nr(e);for(let t=0,a=n.length;t<a;t++)r+=ne(n[t])+",";return r}}function ze(e){return Pe(e.assignments)}function Be(e,r,n){e.assignments.push({t:"index",s:r,k:void 0,v:n});}function tr(e,r,n){R(e,r),e.assignments.push({t:"set",s:m(e,r),k:void 0,v:n});}function Se(e,r,n,t){R(e,r),e.assignments.push({t:"map",s:m(e,r),k:n,v:t});}function me(e,r,n,t){R(e,r),Be(e,m(e,r)+"["+n+"]",t);}function Te(e,r,n,t){R(e,r),Be(e,m(e,r)+"."+n,t);}function b(e,r,n){return e.markedRefs.has(r)?m(e,r)+"="+n:n}function k(e,r){return r.t===10&&e.stack.includes(r.i)}function ye(e,r){let n=r.l,t="",a,o=!1;for(let i=0;i<n;i++)i!==0&&(t+=","),a=r.a[i],a?k(e,a)?(me(e,r.i,i,m(e,a.i)),o=!0):(t+=y(e,a),o=!1):o=!0;return "["+t+(o?",]":"]")}function ar(e,r){e.stack.push(r.i);let n=ye(e,r);return e.stack.pop(),b(e,r.i,n)}function Ue(e,r,n){if(n.s===0)return "{}";let t="";e.stack.push(r);let a,o,i,d,s,u=!1;for(let l=0;l<n.s;l++)a=n.k[l],o=n.v[l],i=Number(a),d=i>=0||le(a),k(e,o)?(s=m(e,o.i),d&&Number.isNaN(i)?Te(e,r,a,s):me(e,r,d?a:'"'+A$2(a)+'"',s)):(t+=(u?",":"")+(d?a:'"'+A$2(a)+'"')+":"+y(e,o),u=!0);return e.stack.pop(),"{"+t+"}"}function or(e,r,n,t){let a=Ue(e,n,r);return a!=="{}"?"Object.assign("+t+","+a+")":t}function ir(e,r,n){e.stack.push(r);let t=[],a,o,i,d,s,u;for(let l=0;l<n.s;l++)a=e.stack,e.stack=[],o=y(e,n.v[l]),e.stack=a,i=n.k[l],d=Number(i),s=e.assignments,e.assignments=t,u=d>=0||le(i),u&&Number.isNaN(d)?Te(e,r,i,o):me(e,r,u?i:'"'+A$2(i)+'"',o),e.assignments=s;return e.stack.pop(),Pe(t)}function te(e,r,n,t){if(n)if(e.features&128)t=or(e,n,r,t);else {R(e,r);let a=ir(e,r,n);if(a)return "("+b(e,r,t)+","+a+m(e,r)+")"}return b(e,r,t)}function sr(e,r){return te(e,r.i,r.d,"Object.create(null)")}function lr(e,r){return b(e,r.i,Ue(e,r.i,r.d))}function dr(e,r){let n="new Set",t=r.l;if(t){let a="";e.stack.push(r.i);let o,i=!1;for(let d=0;d<t;d++)o=r.a[d],k(e,o)?tr(e,r.i,m(e,o.i)):(a+=(i?",":"")+y(e,o),i=!0);e.stack.pop(),a&&(n+="(["+a+"])");}return b(e,r.i,n)}function ur(e,r){let n="new Map";if(r.d.s){let t="";e.stack.push(r.i);let a,o,i,d,s,u=!1;for(let l=0;l<r.d.s;l++)a=r.d.k[l],o=r.d.v[l],k(e,a)?(i=m(e,a.i),k(e,o)?(d=m(e,o.i),Se(e,r.i,i,d)):(s=e.stack,e.stack=[],Se(e,r.i,i,y(e,o)),e.stack=s)):k(e,o)?(d=m(e,o.i),s=e.stack,e.stack=[],Se(e,r.i,y(e,a),d),e.stack=s):(t+=(u?",[":"[")+y(e,a)+","+y(e,o)+"]",u=!0);e.stack.pop(),t&&(n+="(["+t+"])");}return b(e,r.i,n)}function fr(e,r){e.stack.push(r.i);let n="new AggregateError("+ye(e,r)+',"'+A$2(r.m)+'")';return e.stack.pop(),te(e,r.i,r.d,n)}function cr(e,r){let n="new "+r.c+'("'+A$2(r.m)+'")';return te(e,r.i,r.d,n)}function Sr(e,r){let n;if(k(e,r.f)){let t=m(e,r.f.i);e.features&4?n="Promise.resolve().then(()=>"+t+")":n="Promise.resolve().then(function(){return "+t+"})";}else {e.stack.push(r.i);let t=y(e,r.f);e.stack.pop(),n="Promise.resolve("+t+")";}return b(e,r.i,n)}function mr(e,r){let n="",t=r.t===23;for(let o=0,i=r.s.length;o<i;o++)n+=(o!==0?",":"")+r.s[o]+(t?"n":"");let a="["+n+"]"+(r.l!==0?","+r.l:"");return b(e,r.i,"new "+r.c+"("+a+")")}function yr(e,r){let n=e.stack;e.stack=[];let t=ye(e,r);e.stack=n;let a=t;return e.features&2?a+=".values()":a+="[Symbol.iterator]()",e.features&4?a="{[Symbol.iterator]:()=>"+a+"}":e.features&64?a="{[Symbol.iterator](){return "+a+"}}":a="{[Symbol.iterator]:function(){return "+a+"}}",te(e,r.i,r.d,a)}function y(e,r){switch(r.t){case 0:return ""+r.s;case 1:return '"'+r.s+'"';case 2:return r.s?"!0":"!1";case 4:return "void 0";case 3:return "null";case 5:return "-0";case 6:return "1/0";case 7:return "-1/0";case 8:return "NaN";case 9:return r.s+"n";case 10:return m(e,r.i);case 15:return ar(e,r);case 16:return lr(e,r);case 17:return sr(e,r);case 11:return b(e,r.i,'new Date("'+r.s+'")');case 12:return b(e,r.i,"/"+r.c+"/"+r.m);case 13:return dr(e,r);case 14:return ur(e,r);case 23:case 22:return mr(e,r);case 20:return fr(e,r);case 19:return cr(e,r);case 21:return yr(e,r);case 18:return Sr(e,r);case 24:return Ie[r.s];default:throw new Error("Unsupported type")}}function Ne(e,r){let n=r.length,t=new Array(n),a=new Array(n),o;for(let i=0;i<n;i++)i in r&&(o=r[i],N(o)?a[i]=o:t[i]=g(e,o));for(let i=0;i<n;i++)i in a&&(t[i]=g(e,a[i]));return t}function Nr(e,r,n){return {t:15,i:r,s:void 0,l:n.length,c:void 0,m:void 0,d:void 0,a:Ne(e,n),f:void 0}}function pr(e,r,n){S(e.features&32,'Unsupported type "Map"');let t=n.size,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0;for(let[l,f]of n.entries())N(l)||N(f)?(i[s]=l,d[s]=f,s++):(a[u]=g(e,l),o[u]=g(e,f),u++);for(let l=0;l<s;l++)a[u+l]=g(e,i[l]),o[u+l]=g(e,d[l]);return {t:14,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:{k:a,v:o,s:t},a:void 0,f:void 0}}function vr(e,r,n){S(e.features&512,'Unsupported type "Set"');let t=n.size,a=new Array(t),o=new Array(t),i=0,d=0;for(let s of n.keys())N(s)?o[i++]=s:a[d++]=g(e,s);for(let s=0;s<i;s++)a[d+s]=g(e,o[s]);return {t:13,i:r,s:void 0,l:t,c:void 0,m:void 0,d:void 0,a,f:void 0}}function oe(e,r){let n=Object.keys(r),t=n.length,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0,l;for(let f of n)l=r[f],N(l)?(i[s]=f,d[s]=l,s++):(a[u]=f,o[u]=g(e,l),u++);for(let f=0;f<s;f++)a[u+f]=i[f],o[u+f]=g(e,d[f]);return {k:a,v:o,s:t}}function De(e,r,n){S(e.features&1024,'Unsupported type "Iterable"');let t=q(n),a=Array.from(n);return {t:21,i:r,s:void 0,l:a.length,c:void 0,m:void 0,d:t?oe(e,t):void 0,a:Ne(e,a),f:void 0}}function je(e,r,n,t){return Symbol.iterator in n?De(e,r,n):{t:t?17:16,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:oe(e,n),a:void 0,f:void 0}}function Me(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:20,i:r,s:void 0,l:n.errors.length,c:void 0,m:n.message,d:a,a:Ne(e,n.errors),f:void 0}}function ae(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:19,i:r,s:void 0,l:void 0,c:w(n),m:n.message,d:a,a:void 0,f:void 0}}function g(e,r){switch(typeof r){case"boolean":return r?T:U;case"undefined":return j;case"string":return K(r);case"number":switch(r){case 1/0:return _;case-1/0:return L;}return r!==r?x:Object.is(r,-0)?D:F(r);case"bigint":return W(e,r);case"object":{if(!r)return M;let n=z(e,r);if(e.markedRefs.has(n))return Y(n);if(Array.isArray(r))return Nr(e,n,r);switch(r.constructor){case Date:return Z(n,r);case RegExp:return G(n,r);case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:return H(e,n,r);case BigInt64Array:case BigUint64Array:return J(e,n,r);case Map:return pr(e,n,r);case Set:return vr(e,n,r);case Object:return je(e,n,r,!1);case void 0:return je(e,n,r,!0);case AggregateError:return e.features&1?Me(e,n,r):ae(e,n,r);case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:return ae(e,n,r);}if(r instanceof AggregateError)return e.features&1?Me(e,n,r):ae(e,n,r);if(r instanceof Error)return ae(e,n,r);if(Symbol.iterator in r)return De(e,n,r);throw new Error("Unsupported type")}case"symbol":return S(e.features&1024,'Unsupported type "symbol"'),S(r in O,"seroval only supports well-known symbols"),$(r);default:throw new Error("Unsupported type")}}function ie(e,r){let n=g(e,r),t=n.t===16||n.t===21;return [n,P(e,r),t]}function pe(e,r,n,t){if(e.vars.length){let a=ze(e),o=t;if(a){let d=m(e,r);o=t+","+a+d,t.startsWith(d+"=")||(o=d+"="+o);}let i=e.vars.length>1?e.vars.join(","):e.vars[0];return e.features&4?(i=e.vars.length>1||e.vars.length===0?"("+i+")":i,"("+i+"=>("+o+"))()"):"(function("+i+"){return "+o+"})()"}return n?"("+t+")":t}function gr(e,r){let n=h(r),[t,a,o]=ie(n,e),i=V(n),d=y(i,t);return pe(i,a,o,d)}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const ES2017FLAG = I.AggregateError
| I.BigInt
| I.BigIntTypedArray;
function stringify(data) {
  return gr(data, {
    disabledFeatures: ES2017FLAG
  });
}

const VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const REPLACE_SCRIPT = `function $df(e,n,t,o,d){if(t=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)d=o.nextSibling,o.remove(),o=d;_$HY.done?o.remove():o.replaceWith(t.content)}t.remove(),_$HY.set(e,n),_$HY.fe(e)}`;
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId
  } = options;
  let dispose;
  const blockingResources = [];
  const registry = new Map();
  const dedupe = new WeakMap();
  const checkEnd = () => {
    if (!registry.size && !completed) {
      writeTasks();
      onCompleteAll && onCompleteAll({
        write(v) {
          !completed && buffer.write(v);
        }
      });
      writable && writable.end();
      completed = true;
      setTimeout(dispose);
    }
  };
  const pushTask = task => {
    tasks += task + ";";
    if (!scheduled && firstFlushed) {
      Promise.resolve().then(writeTasks);
      scheduled = true;
    }
  };
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    scheduled = false;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let scriptFlushed = false;
  let scheduled = true;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingResources.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!--!$${id}-->`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!--!$/${id}-->`, first + placeholder.length);
      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
    },
    writeResource(id, p, error, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (error) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!p || typeof p !== "object" || !("then" in p)) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!firstFlushed) wait && blockingResources.push(p);else !serverOnly && pushTask(`_$HY.init("${id}")`);
      if (serverOnly) return;
      p.then(d => {
        !completed && pushTask(serializeSet(dedupe, id, d));
      }).catch(() => {
        !completed && pushTask(`_$HY.set("${id}", {})`);
      });
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        registry.set(key, []);
        firstFlushed && pushTask(`_$HY.init("${key}")`);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const keys = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) return;
          if ((value !== undefined || error) && !completed) {
            if (!firstFlushed) {
              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              error && pushTask(serializeSet(dedupe, key, error));
            } else {
              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + stringify(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              scriptFlushed = true;
            }
          }
        }
        if (!registry.size) Promise.resolve().then(checkEnd);
        return firstFlushed;
      };
    }
  };
  let html = createRoot(d => {
    dispose = d;
    return resolveSSRNode(escape(code()));
  });
  function doShell() {
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    for (const key in context.resources) {
      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
    }
    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    scheduled = false;
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
  }
  return {
    then(fn) {
      function complete() {
        doShell();
        fn(tmp);
      }
      if (onCompleteAll) {
        let ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      if (!registry.size) Promise.resolve().then(checkEnd);
    },
    pipe(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        buffer = writable = w;
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    },
    pipeTo(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        const encoder = new TextEncoder();
        const writer = w.getWriter();
        writable = {
          end() {
            writer.releaseLock();
            w.close();
          }
        };
        buffer = {
          write(payload) {
            writer.write(encoder.encode(payload));
          }
        };
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    }
  };
}
function HydrationScript(props) {
  const {
    nonce
  } = sharedConfig.context;
  return ssr(generateHydrationScript({
    nonce,
    ...props
  }));
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
    result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i && (result += " ");
    result += escape(key);
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    const v = value[s];
    if (v != undefined) {
      if (i) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const skipChildren = VOID_ELEMENTS.test(tag);
  const keys = Object.keys(props);
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined && !skipChildren) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${escape(((n = props.class) ? n + " " : "") + ((n = props.className) ? n + " " : ""), true) + ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  if (skipChildren) return {
    t: result + "/>"
  };
  if (typeof children === "function") children = children();
  return {
    t: result + `>${resolveSSRNode(children, true)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s());
    if (!attr && Array.isArray(s)) {
      for (let i = 0; i < s.length; i++) s[i] = escape(s[i]);
      return s;
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node, top) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) {
      if (!top && typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode(prev = node[i]);
    }
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function useAssets(fn) {
  sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])}))))})(window._$HY||(_$HY={events:[],completed:new WeakSet,r:{},fe(){},init(e,t){_$HY.r[e]=[new Promise((e=>t=e)),t]},set(e,t,o){(o=_$HY.r[e])&&o[1](t),_$HY.r[e]=[t]},unset(e){delete _$HY.r[e]},load:e=>_$HY.r[e]}));</script><!--xs-->`;
}
function NoHydration(props) {
  sharedConfig.context.noHydrate = true;
  return props.children;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) {
      registry.get(k).push(key);
      return true;
    }
  }
  return false;
}
function serializeSet(registry, key, value) {
  const exist = registry.get(value);
  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
  value !== null && typeof value === "object" && registry.set(value, key);
  return `_$HY.set("${key}", ${stringify(value)})`;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!--pl-${key}-->`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}

const isServer = true;

let clean = Symbol('clean');

let listenerQueue = [];

let atom = (initialValue, level) => {
  let listeners = [];
  let store = {
    get() {
      if (!store.lc) {
        store.listen(() => {})();
      }
      return store.value
    },
    l: level || 0,
    lc: 0,
    listen(listener, listenerLevel) {
      store.lc = listeners.push(listener, listenerLevel || store.l) / 2;

      return () => {
        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 2);
          store.lc--;
          if (!store.lc) store.off();
        }
      }
    },
    notify(changedKey) {
      let runListenerQueue = !listenerQueue.length;
      for (let i = 0; i < listeners.length; i += 2) {
        listenerQueue.push(
          listeners[i],
          store.value,
          changedKey,
          listeners[i + 1]
        );
      }

      if (runListenerQueue) {
        for (let i = 0; i < listenerQueue.length; i += 4) {
          let skip = false;
          for (let j = i + 7; j < listenerQueue.length; j += 4) {
            if (listenerQueue[j] < listenerQueue[i + 3]) {
              skip = true;
              break
            }
          }

          if (skip) {
            listenerQueue.push(
              listenerQueue[i],
              listenerQueue[i + 1],
              listenerQueue[i + 2],
              listenerQueue[i + 3]
            );
          } else {
            listenerQueue[i](listenerQueue[i + 1], listenerQueue[i + 2]);
          }
        }
        listenerQueue.length = 0;
      }
    },
    off() {}, /* It will be called on last listener unsubscribing.
                 We will redefine it in onMount and onStop. */
    set(data) {
      if (store.value !== data) {
        store.value = data;
        store.notify();
      }
    },
    subscribe(cb, listenerLevel) {
      let unbind = store.listen(cb, listenerLevel);
      cb(store.value);
      return unbind
    },
    value: initialValue
  };

  if (process.env.NODE_ENV !== 'production') {
    store[clean] = () => {
      listeners = [];
      store.lc = 0;
      store.off();
    };
  }

  return store
};

const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;

let on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore(eventProps => {
      // eslint-disable-next-line no-sequences
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  }
};

let STORE_UNMOUNT_DELAY = 1000;

let onMount = (store, initialize) => {
  let listener = payload => {
    let destroy = initialize(payload);
    if (destroy) store.events[UNMOUNT].push(destroy);
  };
  return on(store, listener, MOUNT, runListeners => {
    let originListen = store.listen;
    store.listen = (...args) => {
      if (!store.lc && !store.active) {
        store.active = true;
        runListeners();
      }
      return originListen(...args)
    };

    let originOff = store.off;
    store.events[UNMOUNT] = [];
    store.off = () => {
      originOff();
      setTimeout(() => {
        if (store.active && !store.lc) {
          store.active = false;
          for (let destroy of store.events[UNMOUNT]) destroy();
          store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };

    if (process.env.NODE_ENV !== 'production') {
      let originClean = store[clean];
      store[clean] = () => {
        for (let destroy of store.events[UNMOUNT]) destroy();
        store.events[UNMOUNT] = [];
        store.active = false;
        originClean();
      };
    }

    return () => {
      store.listen = originListen;
      store.off = originOff;
    }
  })
};

let identity = a => a;
let storageEngine = {};
let eventsEngine = { addEventListener() {}, removeEventListener() {} };

function testSupport() {
  try {
    return typeof localStorage !== 'undefined'
  } catch {
    /* c8 ignore next 3 */
    // In Privacy Mode access to localStorage will return error
    return false
  }
}
if (testSupport()) {
  storageEngine = localStorage;
}

let windowPersistentEvents = {
  addEventListener(key, listener, restore) {
    window.addEventListener('storage', listener);
    window.addEventListener('pageshow', restore);
  },
  removeEventListener(key, listener, restore) {
    window.removeEventListener('storage', listener);
    window.removeEventListener('pageshow', restore);
  }
};

if (typeof window !== 'undefined') {
  eventsEngine = windowPersistentEvents;
}

function persistentAtom(name, initial = undefined, opts = {}) {
  let encode = opts.encode || identity;
  let decode = opts.decode || identity;

  let store = atom(initial);

  let set = store.set;
  store.set = newValue => {
    if (typeof newValue === 'undefined') {
      delete storageEngine[name];
    } else {
      storageEngine[name] = encode(newValue);
    }
    set(newValue);
  };

  function listener(e) {
    if (e.key === name) {
      if (e.newValue === null) {
        set(undefined);
      } else {
        set(decode(e.newValue));
      }
    } else if (!storageEngine[name]) {
      set(undefined);
    }
  }

  function restore() {
    store.set(storageEngine[name] ? decode(storageEngine[name]) : initial);
  }

  onMount(store, () => {
    restore();
    if (opts.listen !== false) {
      eventsEngine.addEventListener(name, listener, restore);
      return () => {
        eventsEngine.removeEventListener(name, listener, restore);
      }
    }
  });

  return store
}

function isWrappable(obj) {
  return obj != null && typeof obj === "object" && (Object.getPrototypeOf(obj) === Object.prototype || Array.isArray(obj));
}
function unwrap(item) {
  return item;
}
function setProperty(state, property, value, force) {
  if (!force && state[property] === value) return;
  if (value === undefined) {
    delete state[property];
  } else state[property] = value;
}
function mergeStoreNode(state, value, force) {
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    setProperty(state, key, value[key], force);
  }
}
function updateArray(current, next) {
  if (typeof next === "function") next = next(current);
  if (Array.isArray(next)) {
    if (current === next) return;
    let i = 0,
      len = next.length;
    for (; i < len; i++) {
      const value = next[i];
      if (current[i] !== value) setProperty(current, i, value);
    }
    setProperty(current, "length", len);
  } else mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part,
    next = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part,
      isArray = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        updatePath(current, [part[i]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i = 0; i < current.length; i++) {
        if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i = from; i <= to; i += by) {
        updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    next = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(next, traversed);
    if (value === next) return;
  }
  if (part === undefined && value == undefined) return;
  if (part === undefined || isWrappable(next) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(next, value);
  } else setProperty(current, part, value);
}
function createStore(state) {
  const isArray = Array.isArray(state);
  function setStore(...args) {
    isArray && args.length === 1 ? updateArray(state, args[0]) : updatePath(state, args);
  }
  return [state, setStore];
}
function reconcile(value, options = {}) {
  return state => {
    if (!isWrappable(state) || !isWrappable(value)) return value;
    const targetKeys = Object.keys(value);
    for (let i = 0, len = targetKeys.length; i < len; i++) {
      const key = targetKeys[i];
      setProperty(state, key, value[key]);
    }
    const previousKeys = Object.keys(state);
    for (let i = 0, len = previousKeys.length; i < len; i++) {
      if (value[previousKeys[i]] === undefined) setProperty(state, previousKeys[i], undefined);
    }
    return state;
  };
}

function p(o){let t=o.get(),[r,e]=i(t),n=o.subscribe(e);return onCleanup(()=>n()),r}function i(o){let[t,r]=createStore({value:o});return [()=>t.value,e=>{let n=unwrap(t.value);return typeof e=="function"&&(e=e(n)),r("value",reconcile(e)),t.value}]}

var fi = {};

var lib = {};

var server$2 = {};

var server$1 = {};

var hasRequiredServer$1;

function requireServer$1 () {
	if (hasRequiredServer$1) return server$1;
	hasRequiredServer$1 = 1;

	const equalFn = (a, b) => a === b;
	const $PROXY = Symbol("solid-proxy");
	const $TRACK = Symbol("solid-track");
	const $DEVCOMP = Symbol("solid-dev-component");
	const DEV = undefined;
	const ERROR = Symbol("error");
	function castError(err) {
	  if (err instanceof Error) return err;
	  return new Error(typeof err === "string" ? err : "Unknown error", {
	    cause: err
	  });
	}
	function handleError(err, owner = Owner) {
	  const fns = lookup(owner, ERROR);
	  const error = castError(err);
	  if (!fns) throw error;
	  try {
	    for (const f of fns) f(error);
	  } catch (e) {
	    handleError(e, owner && owner.owner || null);
	  }
	}
	const UNOWNED = {
	  context: null,
	  owner: null,
	  owned: null,
	  cleanups: null
	};
	let Owner = null;
	function createOwner() {
	  const o = {
	    owner: Owner,
	    context: null,
	    owned: null,
	    cleanups: null
	  };
	  if (Owner) {
	    if (!Owner.owned) Owner.owned = [o];else Owner.owned.push(o);
	  }
	  return o;
	}
	function createRoot(fn, detachedOwner) {
	  const owner = Owner,
	    root = fn.length === 0 ? UNOWNED : {
	      context: null,
	      owner: detachedOwner === undefined ? owner : detachedOwner,
	      owned: null,
	      cleanups: null
	    };
	  Owner = root;
	  let result;
	  try {
	    result = fn(fn.length === 0 ? () => {} : () => cleanNode(root));
	  } catch (err) {
	    handleError(err);
	  } finally {
	    Owner = owner;
	  }
	  return result;
	}
	function createSignal(value, options) {
	  return [() => value, v => {
	    return value = typeof v === "function" ? v(value) : v;
	  }];
	}
	function createComputed(fn, value) {
	  Owner = createOwner();
	  try {
	    fn(value);
	  } catch (err) {
	    handleError(err);
	  } finally {
	    Owner = Owner.owner;
	  }
	}
	const createRenderEffect = createComputed;
	function createEffect(fn, value) {}
	function createReaction(fn) {
	  return fn => {
	    fn();
	  };
	}
	function createMemo(fn, value) {
	  Owner = createOwner();
	  let v;
	  try {
	    v = fn(value);
	  } catch (err) {
	    handleError(err);
	  } finally {
	    Owner = Owner.owner;
	  }
	  return () => v;
	}
	function createDeferred(source) {
	  return source;
	}
	function createSelector(source, fn = equalFn) {
	  return k => fn(k, source());
	}
	function batch(fn) {
	  return fn();
	}
	const untrack = batch;
	function on(deps, fn, options = {}) {
	  const isArray = Array.isArray(deps);
	  const defer = options.defer;
	  return () => {
	    if (defer) return undefined;
	    let value;
	    if (isArray) {
	      value = [];
	      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
	    } else value = deps();
	    return fn(value);
	  };
	}
	function onMount(fn) {}
	function onCleanup(fn) {
	  if (Owner) {
	    if (!Owner.cleanups) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
	  }
	  return fn;
	}
	function cleanNode(node) {
	  if (node.owned) {
	    for (let i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
	    node.owned = null;
	  }
	  if (node.cleanups) {
	    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
	    node.cleanups = null;
	  }
	}
	function catchError(fn, handler) {
	  Owner = {
	    owner: Owner,
	    context: {
	      [ERROR]: [handler]
	    },
	    owned: null,
	    cleanups: null
	  };
	  try {
	    return fn();
	  } catch (err) {
	    handleError(err);
	  } finally {
	    Owner = Owner.owner;
	  }
	}
	function onError(fn) {
	  if (Owner) {
	    if (Owner.context === null) Owner.context = {
	      [ERROR]: [fn]
	    };else if (!Owner.context[ERROR]) Owner.context[ERROR] = [fn];else Owner.context[ERROR].push(fn);
	  }
	}
	function getListener() {
	  return null;
	}
	function createContext(defaultValue) {
	  const id = Symbol("context");
	  return {
	    id,
	    Provider: createProvider(id),
	    defaultValue
	  };
	}
	function useContext(context) {
	  let ctx;
	  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
	}
	function getOwner() {
	  return Owner;
	}
	function children(fn) {
	  const memo = createMemo(() => resolveChildren(fn()));
	  memo.toArray = () => {
	    const c = memo();
	    return Array.isArray(c) ? c : c != null ? [c] : [];
	  };
	  return memo;
	}
	function runWithOwner(o, fn) {
	  const prev = Owner;
	  Owner = o;
	  try {
	    return fn();
	  } catch (err) {
	    handleError(err);
	  } finally {
	    Owner = prev;
	  }
	}
	function lookup(owner, key) {
	  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
	}
	function resolveChildren(children) {
	  if (typeof children === "function" && !children.length) return resolveChildren(children());
	  if (Array.isArray(children)) {
	    const results = [];
	    for (let i = 0; i < children.length; i++) {
	      const result = resolveChildren(children[i]);
	      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
	    }
	    return results;
	  }
	  return children;
	}
	function createProvider(id) {
	  return function provider(props) {
	    return createMemo(() => {
	      Owner.context = {
	        [id]: props.value
	      };
	      return children(() => props.children);
	    });
	  };
	}
	function requestCallback(fn, options) {
	  return {
	    id: 0,
	    fn: () => {},
	    startTime: 0,
	    expirationTime: 0
	  };
	}
	function mapArray(list, mapFn, options = {}) {
	  const items = list();
	  let s = [];
	  if (items.length) {
	    for (let i = 0, len = items.length; i < len; i++) s.push(mapFn(items[i], () => i));
	  } else if (options.fallback) s = [options.fallback()];
	  return () => s;
	}
	function observable(input) {
	  return {
	    subscribe(observer) {
	      if (!(observer instanceof Object) || observer == null) {
	        throw new TypeError("Expected the observer to be an object.");
	      }
	      const handler = typeof observer === "function" ? observer : observer.next && observer.next.bind(observer);
	      if (!handler) {
	        return {
	          unsubscribe() {}
	        };
	      }
	      const dispose = createRoot(disposer => {
	        createEffect(() => {
	          const v = input();
	          untrack(() => handler(v));
	        });
	        return disposer;
	      });
	      if (getOwner()) onCleanup(dispose);
	      return {
	        unsubscribe() {
	          dispose();
	        }
	      };
	    },
	    [Symbol.observable || "@@observable"]() {
	      return this;
	    }
	  };
	}
	function from(producer) {
	  const [s, set] = createSignal(undefined);
	  if ("subscribe" in producer) {
	    const unsub = producer.subscribe(v => set(() => v));
	    onCleanup(() => "unsubscribe" in unsub ? unsub.unsubscribe() : unsub());
	  } else {
	    const clean = producer(set);
	    onCleanup(clean);
	  }
	  return s;
	}
	function enableExternalSource(factory) {}

	function resolveSSRNode(node) {
	  const t = typeof node;
	  if (t === "string") return node;
	  if (node == null || t === "boolean") return "";
	  if (Array.isArray(node)) {
	    let mapped = "";
	    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
	    return mapped;
	  }
	  if (t === "object") return node.t;
	  if (t === "function") return resolveSSRNode(node());
	  return String(node);
	}
	const sharedConfig = {};
	function setHydrateContext(context) {
	  sharedConfig.context = context;
	}
	function nextHydrateContext() {
	  return sharedConfig.context ? {
	    ...sharedConfig.context,
	    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
	    count: 0
	  } : undefined;
	}
	function createUniqueId() {
	  const ctx = sharedConfig.context;
	  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
	  return `${ctx.id}${ctx.count++}`;
	}
	function createComponent(Comp, props) {
	  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
	    const c = sharedConfig.context;
	    setHydrateContext(nextHydrateContext());
	    const r = Comp(props || {});
	    setHydrateContext(c);
	    return r;
	  }
	  return Comp(props || {});
	}
	function mergeProps(...sources) {
	  const target = {};
	  for (let i = 0; i < sources.length; i++) {
	    let source = sources[i];
	    if (typeof source === "function") source = source();
	    if (source) {
	      const descriptors = Object.getOwnPropertyDescriptors(source);
	      for (const key in descriptors) {
	        if (key in target) continue;
	        Object.defineProperty(target, key, {
	          enumerable: true,
	          get() {
	            for (let i = sources.length - 1; i >= 0; i--) {
	              let s = sources[i] || {};
	              if (typeof s === "function") s = s();
	              const v = s[key];
	              if (v !== undefined) return v;
	            }
	          }
	        });
	      }
	    }
	  }
	  return target;
	}
	function splitProps(props, ...keys) {
	  const descriptors = Object.getOwnPropertyDescriptors(props),
	    split = k => {
	      const clone = {};
	      for (let i = 0; i < k.length; i++) {
	        const key = k[i];
	        if (descriptors[key]) {
	          Object.defineProperty(clone, key, descriptors[key]);
	          delete descriptors[key];
	        }
	      }
	      return clone;
	    };
	  return keys.map(split).concat(split(Object.keys(descriptors)));
	}
	function simpleMap(props, wrap) {
	  const list = props.each || [],
	    len = list.length,
	    fn = props.children;
	  if (len) {
	    let mapped = Array(len);
	    for (let i = 0; i < len; i++) mapped[i] = wrap(fn, list[i], i);
	    return mapped;
	  }
	  return props.fallback;
	}
	function For(props) {
	  return simpleMap(props, (fn, item, i) => fn(item, () => i));
	}
	function Index(props) {
	  return simpleMap(props, (fn, item, i) => fn(() => item, i));
	}
	function Show(props) {
	  let c;
	  return props.when ? typeof (c = props.children) === "function" ? c(props.keyed ? props.when : () => props.when) : c : props.fallback || "";
	}
	function Switch(props) {
	  let conditions = props.children;
	  Array.isArray(conditions) || (conditions = [conditions]);
	  for (let i = 0; i < conditions.length; i++) {
	    const w = conditions[i].when;
	    if (w) {
	      const c = conditions[i].children;
	      return typeof c === "function" ? c(conditions[i].keyed ? w : () => w) : c;
	    }
	  }
	  return props.fallback || "";
	}
	function Match(props) {
	  return props;
	}
	function resetErrorBoundaries() {}
	function ErrorBoundary(props) {
	  let error,
	    res,
	    clean,
	    sync = true;
	  const ctx = sharedConfig.context;
	  const id = ctx.id + ctx.count;
	  function displayFallback() {
	    cleanNode(clean);
	    ctx.writeResource(id, error, true);
	    setHydrateContext({
	      ...ctx,
	      count: 0
	    });
	    const f = props.fallback;
	    return typeof f === "function" && f.length ? f(error, () => {}) : f;
	  }
	  createMemo(() => {
	    clean = Owner;
	    return catchError(() => res = props.children, err => {
	      error = err;
	      !sync && ctx.replace("e" + id, displayFallback);
	      sync = true;
	    });
	  });
	  if (error) return displayFallback();
	  sync = false;
	  return {
	    t: `<!--!$e${id}-->${resolveSSRNode(res)}<!--!$/e${id}-->`
	  };
	}
	const SuspenseContext = createContext();
	let resourceContext = null;
	function createResource(source, fetcher, options = {}) {
	  if (arguments.length === 2) {
	    if (typeof fetcher === "object") {
	      options = fetcher;
	      fetcher = source;
	      source = true;
	    }
	  } else if (arguments.length === 1) {
	    fetcher = source;
	    source = true;
	  }
	  const contexts = new Set();
	  const id = sharedConfig.context.id + sharedConfig.context.count++;
	  let resource = {};
	  let value = options.storage ? options.storage(options.initialValue)[0]() : options.initialValue;
	  let p;
	  let error;
	  if (sharedConfig.context.async && options.ssrLoadFrom !== "initial") {
	    resource = sharedConfig.context.resources[id] || (sharedConfig.context.resources[id] = {});
	    if (resource.ref) {
	      if (!resource.data && !resource.ref[0].loading && !resource.ref[0].error) resource.ref[1].refetch();
	      return resource.ref;
	    }
	  }
	  const read = () => {
	    if (error) throw error;
	    if (resourceContext && p) resourceContext.push(p);
	    const resolved = options.ssrLoadFrom !== "initial" && sharedConfig.context.async && "data" in sharedConfig.context.resources[id];
	    if (!resolved && read.loading) {
	      const ctx = useContext(SuspenseContext);
	      if (ctx) {
	        ctx.resources.set(id, read);
	        contexts.add(ctx);
	      }
	    }
	    return resolved ? sharedConfig.context.resources[id].data : value;
	  };
	  read.loading = false;
	  read.error = undefined;
	  read.state = "initialValue" in options ? "ready" : "unresolved";
	  Object.defineProperty(read, "latest", {
	    get() {
	      return read();
	    }
	  });
	  function load() {
	    const ctx = sharedConfig.context;
	    if (!ctx.async) return read.loading = !!(typeof source === "function" ? source() : source);
	    if (ctx.resources && id in ctx.resources && "data" in ctx.resources[id]) {
	      value = ctx.resources[id].data;
	      return;
	    }
	    resourceContext = [];
	    const lookup = typeof source === "function" ? source() : source;
	    if (resourceContext.length) {
	      p = Promise.all(resourceContext).then(() => fetcher(source(), {
	        value
	      }));
	    }
	    resourceContext = null;
	    if (!p) {
	      if (lookup == null || lookup === false) return;
	      p = fetcher(lookup, {
	        value
	      });
	    }
	    if (p != undefined && typeof p === "object" && "then" in p) {
	      read.loading = true;
	      read.state = "pending";
	      if (ctx.writeResource) ctx.writeResource(id, p, undefined, options.deferStream);
	      return p.then(res => {
	        read.loading = false;
	        read.state = "ready";
	        ctx.resources[id].data = res;
	        p = null;
	        notifySuspense(contexts);
	        return res;
	      }).catch(err => {
	        read.loading = false;
	        read.state = "errored";
	        read.error = error = castError(err);
	        p = null;
	        notifySuspense(contexts);
	      });
	    }
	    ctx.resources[id].data = p;
	    if (ctx.writeResource) ctx.writeResource(id, p);
	    p = null;
	    return ctx.resources[id].data;
	  }
	  if (options.ssrLoadFrom !== "initial") load();
	  return resource.ref = [read, {
	    refetch: load,
	    mutate: v => value = v
	  }];
	}
	function lazy(fn) {
	  let p;
	  let load = id => {
	    if (!p) {
	      p = fn();
	      p.then(mod => p.resolved = mod.default);
	      if (id) sharedConfig.context.lazy[id] = p;
	    }
	    return p;
	  };
	  const contexts = new Set();
	  const wrap = props => {
	    const id = sharedConfig.context.id.slice(0, -1);
	    let ref = sharedConfig.context.lazy[id];
	    if (ref) p = ref;else load(id);
	    if (p.resolved) return p.resolved(props);
	    const ctx = useContext(SuspenseContext);
	    const track = {
	      loading: true,
	      error: undefined
	    };
	    if (ctx) {
	      ctx.resources.set(id, track);
	      contexts.add(ctx);
	    }
	    if (sharedConfig.context.async) {
	      sharedConfig.context.block(p.then(() => {
	        track.loading = false;
	        notifySuspense(contexts);
	      }));
	    }
	    return "";
	  };
	  wrap.preload = load;
	  return wrap;
	}
	function suspenseComplete(c) {
	  for (const r of c.resources.values()) {
	    if (r.loading) return false;
	  }
	  return true;
	}
	function notifySuspense(contexts) {
	  for (const c of contexts) {
	    if (!suspenseComplete(c)) {
	      continue;
	    }
	    c.completed();
	    contexts.delete(c);
	  }
	}
	function enableScheduling() {}
	function enableHydration() {}
	function startTransition(fn) {
	  fn();
	}
	function useTransition() {
	  return [() => false, fn => {
	    fn();
	  }];
	}
	function SuspenseList(props) {
	  return props.children;
	}
	function Suspense(props) {
	  let done;
	  const ctx = sharedConfig.context;
	  const id = ctx.id + ctx.count;
	  const o = createOwner();
	  const value = ctx.suspense[id] || (ctx.suspense[id] = {
	    resources: new Map(),
	    completed: () => {
	      const res = runSuspense();
	      if (suspenseComplete(value)) {
	        done(resolveSSRNode(res));
	      }
	    }
	  });
	  function suspenseError(err) {
	    if (!done || !done(undefined, err)) {
	      runWithOwner(o.owner, () => {
	        throw err;
	      });
	    }
	  }
	  function runSuspense() {
	    setHydrateContext({
	      ...ctx,
	      count: 0
	    });
	    cleanNode(o);
	    return runWithOwner(o, () => createComponent(SuspenseContext.Provider, {
	      value,
	      get children() {
	        return catchError(() => props.children, suspenseError);
	      }
	    }));
	  }
	  const res = runSuspense();
	  if (suspenseComplete(value)) return res;
	  done = ctx.async ? ctx.registerFragment(id) : undefined;
	  return catchError(() => {
	    if (ctx.async) {
	      setHydrateContext({
	        ...ctx,
	        count: 0,
	        id: ctx.id + "0-f",
	        noHydrate: true
	      });
	      const res = {
	        t: `<template id="pl-${id}"></template>${resolveSSRNode(props.fallback)}<!--pl-${id}-->`
	      };
	      setHydrateContext(ctx);
	      return res;
	    }
	    setHydrateContext({
	      ...ctx,
	      count: 0,
	      id: ctx.id + "0-f"
	    });
	    ctx.writeResource(id, "$$f");
	    return props.fallback;
	  }, suspenseError);
	}

	server$1.$DEVCOMP = $DEVCOMP;
	server$1.$PROXY = $PROXY;
	server$1.$TRACK = $TRACK;
	server$1.DEV = DEV;
	server$1.ErrorBoundary = ErrorBoundary;
	server$1.For = For;
	server$1.Index = Index;
	server$1.Match = Match;
	server$1.Show = Show;
	server$1.Suspense = Suspense;
	server$1.SuspenseList = SuspenseList;
	server$1.Switch = Switch;
	server$1.batch = batch;
	server$1.children = children;
	server$1.createComponent = createComponent;
	server$1.createComputed = createComputed;
	server$1.createContext = createContext;
	server$1.createDeferred = createDeferred;
	server$1.createEffect = createEffect;
	server$1.createMemo = createMemo;
	server$1.createReaction = createReaction;
	server$1.createRenderEffect = createRenderEffect;
	server$1.createResource = createResource;
	server$1.createRoot = createRoot;
	server$1.createSelector = createSelector;
	server$1.createSignal = createSignal;
	server$1.createUniqueId = createUniqueId;
	server$1.enableExternalSource = enableExternalSource;
	server$1.enableHydration = enableHydration;
	server$1.enableScheduling = enableScheduling;
	server$1.equalFn = equalFn;
	server$1.from = from;
	server$1.getListener = getListener;
	server$1.getOwner = getOwner;
	server$1.lazy = lazy;
	server$1.mapArray = mapArray;
	server$1.mergeProps = mergeProps;
	server$1.observable = observable;
	server$1.on = on;
	server$1.onCleanup = onCleanup;
	server$1.onError = onError;
	server$1.onMount = onMount;
	server$1.requestCallback = requestCallback;
	server$1.resetErrorBoundaries = resetErrorBoundaries;
	server$1.runWithOwner = runWithOwner;
	server$1.sharedConfig = sharedConfig;
	server$1.splitProps = splitProps;
	server$1.startTransition = startTransition;
	server$1.untrack = untrack;
	server$1.useContext = useContext;
	server$1.useTransition = useTransition;
	return server$1;
}

var production;
var hasRequiredProduction;

function requireProduction () {
	if (hasRequiredProduction) return production;
	hasRequiredProduction = 1;
var se=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var Fe=Object.getOwnPropertyNames;var Ke=Object.prototype.hasOwnProperty;var We=(e,r)=>{for(var n in r)se(e,n,{get:r[n],enumerable:!0});},Ye=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of Fe(r))!Ke.call(e,a)&&a!==n&&se(e,a,{get:()=>r[a],enumerable:!(t=xe(r,a))||t.enumerable});return e};var Ze=e=>Ye(se({},"__esModule",{value:!0}),e);var Tr={};We(Tr,{Feature:()=>I,compileJSON:()=>Pr,default:()=>Br,deserialize:()=>hr,fromJSON:()=>zr,serialize:()=>Le,serializeAsync:()=>Cr,toJSON:()=>Vr,toJSONAsync:()=>wr});production=Ze(Tr);var I=(c=>(c[c.AggregateError=1]="AggregateError",c[c.ArrayPrototypeValues=2]="ArrayPrototypeValues",c[c.ArrowFunction=4]="ArrowFunction",c[c.BigInt=8]="BigInt",c[c.ErrorPrototypeStack=16]="ErrorPrototypeStack",c[c.Map=32]="Map",c[c.MethodShorthand=64]="MethodShorthand",c[c.ObjectAssign=128]="ObjectAssign",c[c.Promise=256]="Promise",c[c.Set=512]="Set",c[c.Symbol=1024]="Symbol",c[c.TypedArray=2048]="TypedArray",c[c.BigIntTypedArray=4096]="BigIntTypedArray",c))(I||{});var Ae="hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_",ge=Ae.length,Ee="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_",be=Ee.length;function le(e){let r=e%ge,n=Ae[r];for(e=(e-r)/ge;e>0;)r=e%be,n+=Ee[r],e=(e-r)/be;return n}var He={disabledFeatures:0};function h(e={}){let r=Object.assign({},He,e||{});return {markedRefs:new Set,refs:new Map,features:8191^r.disabledFeatures}}function V(e){return {stack:[],vars:[],assignments:[],validRefs:[],refSize:0,features:e.features,markedRefs:new Set(e.markedRefs),valueMap:new Map}}function R(e,r){e.markedRefs.add(r);}function m(e,r){let n=e.validRefs[r];n==null&&(n=e.refSize++,e.validRefs[r]=n);let t=e.vars[n];return t==null&&(t=le(n),e.vars[n]=t),t}function P(e,r){let n=e.refs.get(r);return n==null?e.refs.size:n}function z(e,r){let n=e.refs.get(r);if(n==null){let t=e.refs.size;return e.refs.set(r,t),t}return R(e,n),n}function S(e,r){if(!e)throw new Error(r)}function A(e){let r="",n=0;for(let t=0,a=e.length;t<a;t++){let o;switch(e[t]){case'"':o='\\"';break;case"\\":o="\\\\";break;case"<":o="\\x3C";break;case`
`:o="\\n";break;case"\r":o="\\r";break;case"\u2028":o="\\u2028";break;case"\u2029":o="\\u2029";break;default:continue}r+=e.slice(n,t)+o,n=t+1;}return n===0?r=e:r+=e.slice(n),r}function Ie(e){return e.replace(/\\"/g,'"').replace(/\\\\/g,"\\").replace(/\\x3C/g,"<").replace(/\\n/g,`
`).replace(/\\r/g,"\r").replace(/\\u2028/g,"\u2028").replace(/\\u2029/g,"\u2029")}var Re={[0]:"Symbol.asyncIterator",[1]:"Symbol.hasInstance",[2]:"Symbol.isConcatSpreadable",[3]:"Symbol.iterator",[4]:"Symbol.match",[5]:"Symbol.matchAll",[6]:"Symbol.replace",[7]:"Symbol.search",[8]:"Symbol.species",[9]:"Symbol.split",[10]:"Symbol.toPrimitive",[11]:"Symbol.toStringTag",[12]:"Symbol.unscopables"},O={[Symbol.asyncIterator]:0,[Symbol.hasInstance]:1,[Symbol.isConcatSpreadable]:2,[Symbol.iterator]:3,[Symbol.match]:4,[Symbol.matchAll]:5,[Symbol.replace]:6,[Symbol.search]:7,[Symbol.species]:8,[Symbol.split]:9,[Symbol.toPrimitive]:10,[Symbol.toStringTag]:11,[Symbol.unscopables]:12},ke={[0]:Symbol.asyncIterator,[1]:Symbol.hasInstance,[2]:Symbol.isConcatSpreadable,[3]:Symbol.iterator,[4]:Symbol.match,[5]:Symbol.matchAll,[6]:Symbol.replace,[7]:Symbol.search,[8]:Symbol.species,[9]:Symbol.split,[10]:Symbol.toPrimitive,[11]:Symbol.toStringTag,[12]:Symbol.unscopables};var T={t:2,i:void 0,s:!0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},U={t:2,i:void 0,s:!1,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},j={t:4,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},M={t:3,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},D={t:5,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},_={t:6,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},L={t:7,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0},x={t:8,i:void 0,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0};function F(e){return {t:0,i:void 0,s:e,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function K(e){return {t:1,i:void 0,s:A(e),l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function W(e,r){return S(e.features&8,'Unsupported type "BigInt"'),{t:9,i:void 0,s:""+r,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Y(e){return {t:10,i:e,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function Z(e,r){return {t:11,i:e,s:r.toISOString(),l:void 0,c:void 0,m:void 0,d:void 0,f:void 0,a:void 0}}function G(e,r){return {t:12,i:e,s:void 0,l:void 0,c:r.source,m:r.flags,d:void 0,a:void 0,f:void 0}}function H(e,r,n){let t=n.constructor.name;S(e.features&2048,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:22,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}var Oe=4104;function J(e,r,n){let t=n.constructor.name;S((e.features&Oe)===Oe,`Unsupported value type "${t}"`);let a=n.length,o=new Array(a);for(let i=0;i<a;i++)o[i]=""+n[i];return {t:23,i:r,s:o,l:n.byteOffset,c:t,m:void 0,d:void 0,a:void 0,f:void 0}}function $(e){return {t:24,i:void 0,s:O[e],l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:void 0}}function w(e){return e instanceof EvalError?"EvalError":e instanceof RangeError?"RangeError":e instanceof ReferenceError?"ReferenceError":e instanceof SyntaxError?"SyntaxError":e instanceof TypeError?"TypeError":e instanceof URIError?"URIError":"Error"}function Ce(e){switch(e){case"Error":return Error;case"EvalError":return EvalError;case"RangeError":return RangeError;case"ReferenceError":return ReferenceError;case"SyntaxError":return SyntaxError;case"TypeError":return TypeError;case"URIError":return URIError;default:throw new Error(`Unknown Error constructor "${e}"`)}}function C(e,r){let n,t=w(r);r.name!==t?n={name:r.name}:r.constructor.name!==t&&(n={name:r.constructor.name});let a=Object.getOwnPropertyNames(r);for(let o of a)o!=="name"&&o!=="message"&&(o==="stack"?e.features&16&&(n=n||{},n[o]=r[o]):(n=n||{},n[o]=r[o]));return n}function q(e){let r=Object.getOwnPropertyNames(e);if(r.length){let n={};for(let t of r)n[t]=e[t];return n}}function N(e){if(!e||typeof e!="object"||Array.isArray(e))return !1;switch(e.constructor){case Map:case Set:case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:case BigInt64Array:case BigUint64Array:return !1;}return Symbol.iterator in e}function he(e){switch(e){case"Int8Array":return Int8Array;case"Int16Array":return Int16Array;case"Int32Array":return Int32Array;case"Uint8Array":return Uint8Array;case"Uint16Array":return Uint16Array;case"Uint32Array":return Uint32Array;case"Uint8ClampedArray":return Uint8ClampedArray;case"Float32Array":return Float32Array;case"Float64Array":return Float64Array;case"BigInt64Array":return BigInt64Array;case"BigUint64Array":return BigUint64Array;default:throw new Error(`Unknown TypedArray "${e}"`)}}var Je=/^[$A-Z_][0-9A-Z_$]*$/i;function de(e){let r=e[0];return (r==="$"||r==="_"||r>="A"&&r<="Z"||r>="a"&&r<="z")&&Je.test(e)}async function ue(e,r){let n=r.length,t=new Array(n),a=new Array(n),o;for(let i=0;i<n;i++)i in r&&(o=r[i],N(o)?a[i]=o:t[i]=await p(e,o));for(let i=0;i<n;i++)i in a&&(t[i]=await p(e,a[i]));return t}async function $e(e,r,n){return {t:15,i:r,s:void 0,l:n.length,c:void 0,m:void 0,d:void 0,a:await ue(e,n),f:void 0}}async function qe(e,r,n){S(e.features&32,'Unsupported type "Map"');let t=n.size,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0;for(let[l,f]of n.entries())N(l)||N(f)?(i[s]=l,d[s]=f,s++):(a[u]=await p(e,l),o[u]=await p(e,f),u++);for(let l=0;l<s;l++)a[u+l]=await p(e,i[l]),o[u+l]=await p(e,d[l]);return {t:14,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:{k:a,v:o,s:t},a:void 0,f:void 0}}async function Qe(e,r,n){S(e.features&512,'Unsupported type "Set"');let t=n.size,a=new Array(t),o=new Array(t),i=0,d=0;for(let s of n.keys())N(s)?o[i++]=s:a[d++]=await p(e,s);for(let s=0;s<i;s++)a[d+s]=await p(e,o[s]);return {t:13,i:r,s:void 0,l:t,c:void 0,m:void 0,d:void 0,a,f:void 0}}async function ee(e,r){let n=Object.keys(r),t=n.length,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0,l;for(let f of n)l=r[f],N(l)?(i[s]=f,d[s]=l,s++):(a[u]=f,o[u]=await p(e,l),u++);for(let f=0;f<s;f++)a[u+f]=i[f],o[u+f]=await p(e,d[f]);return {k:a,v:o,s:t}}async function Pe(e,r,n){S(e.features&1024,'Unsupported type "Iterable"');let t=q(n),a=Array.from(n);return {t:21,i:r,s:void 0,l:a.length,c:void 0,m:void 0,d:t?await ee(e,t):void 0,a:await ue(e,a),f:void 0}}async function X(e,r,n){return S(e.features&256,'Unsupported type "Promise"'),n.then(async t=>({t:18,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:void 0,a:void 0,f:await p(e,t)}))}async function Ve(e,r,n,t){return Symbol.iterator in n?Pe(e,r,n):"then"in n&&typeof n.then=="function"?X(e,r,n):{t:t?17:16,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:await ee(e,n),a:void 0,f:void 0}}async function we(e,r,n){let t=C(e,n),a=t?await ee(e,t):void 0;return {t:20,i:r,s:void 0,l:n.errors.length,c:void 0,m:n.message,d:a,a:await ue(e,n.errors),f:void 0}}async function Q(e,r,n){let t=C(e,n),a=t?await ee(e,t):void 0;return {t:19,i:r,s:void 0,l:void 0,c:w(n),m:n.message,d:a,a:void 0,f:void 0}}async function p(e,r){switch(typeof r){case"boolean":return r?T:U;case"undefined":return j;case"string":return K(r);case"number":switch(r){case 1/0:return _;case-1/0:return L;}return r!==r?x:Object.is(r,-0)?D:F(r);case"bigint":return W(e,r);case"object":{if(!r)return M;let n=z(e,r);if(e.markedRefs.has(n))return Y(n);if(Array.isArray(r))return $e(e,n,r);switch(r.constructor){case Date:return Z(n,r);case RegExp:return G(n,r);case Promise:return X(e,n,r);case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:return H(e,n,r);case BigInt64Array:case BigUint64Array:return J(e,n,r);case Map:return qe(e,n,r);case Set:return Qe(e,n,r);case Object:return Ve(e,n,r,!1);case void 0:return Ve(e,n,r,!0);case AggregateError:return e.features&1?we(e,n,r):Q(e,n,r);case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:return Q(e,n,r);}if(r instanceof AggregateError)return e.features&1?we(e,n,r):Q(e,n,r);if(r instanceof Error)return Q(e,n,r);if(r instanceof Promise)return X(e,n,r);if(Symbol.iterator in r)return Pe(e,n,r);if("then"in r&&typeof r.then=="function")return X(e,n,r);throw new Error("Unsupported type")}case"symbol":return S(e.features&1024,'Unsupported type "symbol"'),S(r in O,"seroval only supports well-known symbols"),$(r);default:throw new Error("Unsupported type")}}async function re(e,r){let n=await p(e,r),t=n.t===16||n.t===21;return [n,P(e,r),t]}function v(e,r,n){return e.valueMap.set(r,n),n}function fe(e,r,n){let t;for(let a=0,o=r.a.length;a<o;a++)t=r.a[a],t&&(n[a]=E(e,t));return n}function Xe(e,r){let n=v(e,r.i,new Array(r.l));return e.stack.push(r.i),fe(e,r,n),e.stack.pop(),n}function ce(e,r,n){if(r.s===0)return {};for(let t=0;t<r.s;t++)n[r.k[t]]=E(e,r.v[t]);return n}function er(e,r){let n=v(e,r.i,Object.create(null));return e.stack.push(r.i),ce(e,r.d,n),e.stack.pop(),n}function rr(e,r){let n=v(e,r.i,{});return e.stack.push(r.i),ce(e,r.d,n),e.stack.pop(),n}function nr(e,r){let n=v(e,r.i,new Set);e.stack.push(r.i);for(let t=0,a=r.a.length;t<a;t++)n.add(E(e,r.a[t]));return e.stack.pop(),n}function tr(e,r){let n=v(e,r.i,new Map);e.stack.push(r.i);for(let t=0;t<r.d.s;t++)n.set(E(e,r.d.k[t]),E(e,r.d.v[t]));return e.stack.pop(),n}function Se(e,r,n){if(r.d){e.stack.push(r.i);let t=ce(e,r.d,{});e.stack.pop(),Object.assign(n,t);}return n}function ar(e,r){let n=v(e,r.i,new AggregateError([],r.m));return e.stack.push(r.i),n.errors=fe(e,r,new Array(r.l)),e.stack.pop(),Se(e,r,n)}function or(e,r){let n=Ce(r.c),t=v(e,r.i,new n(r.m));return Se(e,r,t)}function ir(){let e;return {resolve(r){e(r);},promise:new Promise(r=>{e=r;})}}function sr(e,r){let n=ir(),t=v(e,r.i,n.promise);return n.resolve(E(e,r.f)),t}function lr(e,r){let n=he(r.c),t=new n,a=v(e,r.i,new n(t.buffer,r.l));for(let o=0,i=r.s.length;o<i;o++)a[o]=r.t===23?BigInt(r.s[o]):Number(r.s[o]);return a}function dr(e,r){let n=[];fe(e,r,n);let t=v(e,r.i,{[Symbol.iterator]:()=>n.values()});return Se(e,r,t)}function E(e,r){switch(r.t){case 0:case 2:return r.s;case 1:return Ie(r.s);case 4:return;case 3:return null;case 5:return -0;case 6:return 1/0;case 7:return -1/0;case 8:return NaN;case 9:return BigInt(r.s);case 10:return e.valueMap.get(r.i);case 15:return Xe(e,r);case 16:return rr(e,r);case 17:return er(e,r);case 11:return v(e,r.i,new Date(r.s));case 12:return v(e,r.i,new RegExp(r.c,r.m));case 13:return nr(e,r);case 14:return tr(e,r);case 23:case 22:return lr(e,r);case 20:return ar(e,r);case 19:return or(e,r);case 21:return dr(e,r);case 18:return sr(e,r);case 24:return ke[r.s];default:throw new Error("Unsupported type")}}function ne(e){switch(e.t){case"index":return e.s+"="+e.v;case"map":return e.s+".set("+e.k+","+e.v+")";case"set":return e.s+".add("+e.v+")";default:return ""}}function ur(e){let r=[],n=e[0],t=n,a;for(let o=1,i=e.length;o<i;o++){if(a=e[o],a.t===t.t)switch(a.t){case"index":a.v===t.v?n={t:"index",s:a.s,k:void 0,v:ne(n)}:(r.push(n),n=a);break;case"map":a.s===t.s?n={t:"map",s:ne(n),k:a.k,v:a.v}:(r.push(n),n=a);break;case"set":a.s===t.s?n={t:"set",s:ne(n),k:void 0,v:a.v}:(r.push(n),n=a);break;}else r.push(n),n=a;t=a;}return r.push(n),r}function ze(e){if(e.length){let r="",n=ur(e);for(let t=0,a=n.length;t<a;t++)r+=ne(n[t])+",";return r}}function Be(e){return ze(e.assignments)}function Te(e,r,n){e.assignments.push({t:"index",s:r,k:void 0,v:n});}function fr(e,r,n){R(e,r),e.assignments.push({t:"set",s:m(e,r),k:void 0,v:n});}function me(e,r,n,t){R(e,r),e.assignments.push({t:"map",s:m(e,r),k:n,v:t});}function ye(e,r,n,t){R(e,r),Te(e,m(e,r)+"["+n+"]",t);}function Ue(e,r,n,t){R(e,r),Te(e,m(e,r)+"."+n,t);}function b(e,r,n){return e.markedRefs.has(r)?m(e,r)+"="+n:n}function k(e,r){return r.t===10&&e.stack.includes(r.i)}function Ne(e,r){let n=r.l,t="",a,o=!1;for(let i=0;i<n;i++)i!==0&&(t+=","),a=r.a[i],a?k(e,a)?(ye(e,r.i,i,m(e,a.i)),o=!0):(t+=y(e,a),o=!1):o=!0;return "["+t+(o?",]":"]")}function cr(e,r){e.stack.push(r.i);let n=Ne(e,r);return e.stack.pop(),b(e,r.i,n)}function je(e,r,n){if(n.s===0)return "{}";let t="";e.stack.push(r);let a,o,i,d,s,u=!1;for(let l=0;l<n.s;l++)a=n.k[l],o=n.v[l],i=Number(a),d=i>=0||de(a),k(e,o)?(s=m(e,o.i),d&&Number.isNaN(i)?Ue(e,r,a,s):ye(e,r,d?a:'"'+A(a)+'"',s)):(t+=(u?",":"")+(d?a:'"'+A(a)+'"')+":"+y(e,o),u=!0);return e.stack.pop(),"{"+t+"}"}function Sr(e,r,n,t){let a=je(e,n,r);return a!=="{}"?"Object.assign("+t+","+a+")":t}function mr(e,r,n){e.stack.push(r);let t=[],a,o,i,d,s,u;for(let l=0;l<n.s;l++)a=e.stack,e.stack=[],o=y(e,n.v[l]),e.stack=a,i=n.k[l],d=Number(i),s=e.assignments,e.assignments=t,u=d>=0||de(i),u&&Number.isNaN(d)?Ue(e,r,i,o):ye(e,r,u?i:'"'+A(i)+'"',o),e.assignments=s;return e.stack.pop(),ze(t)}function te(e,r,n,t){if(n)if(e.features&128)t=Sr(e,n,r,t);else {R(e,r);let a=mr(e,r,n);if(a)return "("+b(e,r,t)+","+a+m(e,r)+")"}return b(e,r,t)}function yr(e,r){return te(e,r.i,r.d,"Object.create(null)")}function Nr(e,r){return b(e,r.i,je(e,r.i,r.d))}function pr(e,r){let n="new Set",t=r.l;if(t){let a="";e.stack.push(r.i);let o,i=!1;for(let d=0;d<t;d++)o=r.a[d],k(e,o)?fr(e,r.i,m(e,o.i)):(a+=(i?",":"")+y(e,o),i=!0);e.stack.pop(),a&&(n+="(["+a+"])");}return b(e,r.i,n)}function vr(e,r){let n="new Map";if(r.d.s){let t="";e.stack.push(r.i);let a,o,i,d,s,u=!1;for(let l=0;l<r.d.s;l++)a=r.d.k[l],o=r.d.v[l],k(e,a)?(i=m(e,a.i),k(e,o)?(d=m(e,o.i),me(e,r.i,i,d)):(s=e.stack,e.stack=[],me(e,r.i,i,y(e,o)),e.stack=s)):k(e,o)?(d=m(e,o.i),s=e.stack,e.stack=[],me(e,r.i,y(e,a),d),e.stack=s):(t+=(u?",[":"[")+y(e,a)+","+y(e,o)+"]",u=!0);e.stack.pop(),t&&(n+="(["+t+"])");}return b(e,r.i,n)}function gr(e,r){e.stack.push(r.i);let n="new AggregateError("+Ne(e,r)+',"'+A(r.m)+'")';return e.stack.pop(),te(e,r.i,r.d,n)}function br(e,r){let n="new "+r.c+'("'+A(r.m)+'")';return te(e,r.i,r.d,n)}function Ar(e,r){let n;if(k(e,r.f)){let t=m(e,r.f.i);e.features&4?n="Promise.resolve().then(()=>"+t+")":n="Promise.resolve().then(function(){return "+t+"})";}else {e.stack.push(r.i);let t=y(e,r.f);e.stack.pop(),n="Promise.resolve("+t+")";}return b(e,r.i,n)}function Er(e,r){let n="",t=r.t===23;for(let o=0,i=r.s.length;o<i;o++)n+=(o!==0?",":"")+r.s[o]+(t?"n":"");let a="["+n+"]"+(r.l!==0?","+r.l:"");return b(e,r.i,"new "+r.c+"("+a+")")}function Ir(e,r){let n=e.stack;e.stack=[];let t=Ne(e,r);e.stack=n;let a=t;return e.features&2?a+=".values()":a+="[Symbol.iterator]()",e.features&4?a="{[Symbol.iterator]:()=>"+a+"}":e.features&64?a="{[Symbol.iterator](){return "+a+"}}":a="{[Symbol.iterator]:function(){return "+a+"}}",te(e,r.i,r.d,a)}function y(e,r){switch(r.t){case 0:return ""+r.s;case 1:return '"'+r.s+'"';case 2:return r.s?"!0":"!1";case 4:return "void 0";case 3:return "null";case 5:return "-0";case 6:return "1/0";case 7:return "-1/0";case 8:return "NaN";case 9:return r.s+"n";case 10:return m(e,r.i);case 15:return cr(e,r);case 16:return Nr(e,r);case 17:return yr(e,r);case 11:return b(e,r.i,'new Date("'+r.s+'")');case 12:return b(e,r.i,"/"+r.c+"/"+r.m);case 13:return pr(e,r);case 14:return vr(e,r);case 23:case 22:return Er(e,r);case 20:return gr(e,r);case 19:return br(e,r);case 21:return Ir(e,r);case 18:return Ar(e,r);case 24:return Re[r.s];default:throw new Error("Unsupported type")}}function pe(e,r){let n=r.length,t=new Array(n),a=new Array(n),o;for(let i=0;i<n;i++)i in r&&(o=r[i],N(o)?a[i]=o:t[i]=g(e,o));for(let i=0;i<n;i++)i in a&&(t[i]=g(e,a[i]));return t}function Rr(e,r,n){return {t:15,i:r,s:void 0,l:n.length,c:void 0,m:void 0,d:void 0,a:pe(e,n),f:void 0}}function kr(e,r,n){S(e.features&32,'Unsupported type "Map"');let t=n.size,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0;for(let[l,f]of n.entries())N(l)||N(f)?(i[s]=l,d[s]=f,s++):(a[u]=g(e,l),o[u]=g(e,f),u++);for(let l=0;l<s;l++)a[u+l]=g(e,i[l]),o[u+l]=g(e,d[l]);return {t:14,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:{k:a,v:o,s:t},a:void 0,f:void 0}}function Or(e,r,n){S(e.features&512,'Unsupported type "Set"');let t=n.size,a=new Array(t),o=new Array(t),i=0,d=0;for(let s of n.keys())N(s)?o[i++]=s:a[d++]=g(e,s);for(let s=0;s<i;s++)a[d+s]=g(e,o[s]);return {t:13,i:r,s:void 0,l:t,c:void 0,m:void 0,d:void 0,a,f:void 0}}function oe(e,r){let n=Object.keys(r),t=n.length,a=new Array(t),o=new Array(t),i=new Array(t),d=new Array(t),s=0,u=0,l;for(let f of n)l=r[f],N(l)?(i[s]=f,d[s]=l,s++):(a[u]=f,o[u]=g(e,l),u++);for(let f=0;f<s;f++)a[u+f]=i[f],o[u+f]=g(e,d[f]);return {k:a,v:o,s:t}}function _e(e,r,n){S(e.features&1024,'Unsupported type "Iterable"');let t=q(n),a=Array.from(n);return {t:21,i:r,s:void 0,l:a.length,c:void 0,m:void 0,d:t?oe(e,t):void 0,a:pe(e,a),f:void 0}}function Me(e,r,n,t){return Symbol.iterator in n?_e(e,r,n):{t:t?17:16,i:r,s:void 0,l:void 0,c:void 0,m:void 0,d:oe(e,n),a:void 0,f:void 0}}function De(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:20,i:r,s:void 0,l:n.errors.length,c:void 0,m:n.message,d:a,a:pe(e,n.errors),f:void 0}}function ae(e,r,n){let t=C(e,n),a=t?oe(e,t):void 0;return {t:19,i:r,s:void 0,l:void 0,c:w(n),m:n.message,d:a,a:void 0,f:void 0}}function g(e,r){switch(typeof r){case"boolean":return r?T:U;case"undefined":return j;case"string":return K(r);case"number":switch(r){case 1/0:return _;case-1/0:return L;}return r!==r?x:Object.is(r,-0)?D:F(r);case"bigint":return W(e,r);case"object":{if(!r)return M;let n=z(e,r);if(e.markedRefs.has(n))return Y(n);if(Array.isArray(r))return Rr(e,n,r);switch(r.constructor){case Date:return Z(n,r);case RegExp:return G(n,r);case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:return H(e,n,r);case BigInt64Array:case BigUint64Array:return J(e,n,r);case Map:return kr(e,n,r);case Set:return Or(e,n,r);case Object:return Me(e,n,r,!1);case void 0:return Me(e,n,r,!0);case AggregateError:return e.features&1?De(e,n,r):ae(e,n,r);case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:return ae(e,n,r);}if(r instanceof AggregateError)return e.features&1?De(e,n,r):ae(e,n,r);if(r instanceof Error)return ae(e,n,r);if(Symbol.iterator in r)return _e(e,n,r);throw new Error("Unsupported type")}case"symbol":return S(e.features&1024,'Unsupported type "symbol"'),S(r in O,"seroval only supports well-known symbols"),$(r);default:throw new Error("Unsupported type")}}function ie(e,r){let n=g(e,r),t=n.t===16||n.t===21;return [n,P(e,r),t]}function ve(e,r,n,t){if(e.vars.length){let a=Be(e),o=t;if(a){let d=m(e,r);o=t+","+a+d,t.startsWith(d+"=")||(o=d+"="+o);}let i=e.vars.length>1?e.vars.join(","):e.vars[0];return e.features&4?(i=e.vars.length>1||e.vars.length===0?"("+i+")":i,"("+i+"=>("+o+"))()"):"(function("+i+"){return "+o+"})()"}return n?"("+t+")":t}function Le(e,r){let n=h(r),[t,a,o]=ie(n,e),i=V(n),d=y(i,t);return ve(i,a,o,d)}async function Cr(e,r){let n=h(r),[t,a,o]=await re(n,e),i=V(n),d=y(i,t);return ve(i,a,o,d)}function hr(e){return (0, eval)(e)}function Vr(e,r){let n=h(r),[t,a,o]=ie(n,e);return {t,r:a,i:o,f:n.features,m:Array.from(n.markedRefs)}}async function wr(e,r){let n=h(r),[t,a,o]=await re(n,e);return {t,r:a,i:o,f:n.features,m:Array.from(n.markedRefs)}}function Pr(e){let r=V({features:e.f,markedRefs:e.m}),n=y(r,e.t);return ve(r,e.r,e.i,n)}function zr(e){let r=V({features:e.f,markedRefs:e.m});return E(r,e.t)}var Br=Le;
	return production;
}

var hasRequiredServer;

function requireServer () {
	if (hasRequiredServer) return server$2;
	hasRequiredServer = 1;
	(function (exports) {

		var solidJs = requireServer$1();
		var seroval = requireProduction();

		const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
		const BooleanAttributes = /*#__PURE__*/new Set(booleans);
		const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
		const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
		  className: "class",
		  htmlFor: "for"
		});

		const ES2017FLAG = seroval.Feature.AggregateError
		| seroval.Feature.BigInt
		| seroval.Feature.BigIntTypedArray;
		function stringify(data) {
		  return seroval.serialize(data, {
		    disabledFeatures: ES2017FLAG
		  });
		}

		const VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
		const REPLACE_SCRIPT = `function $df(e,n,t,o,d){if(t=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)d=o.nextSibling,o.remove(),o=d;_$HY.done?o.remove():o.replaceWith(t.content)}t.remove(),_$HY.set(e,n),_$HY.fe(e)}`;
		function renderToString(code, options = {}) {
		  let scripts = "";
		  solidJs.sharedConfig.context = {
		    id: options.renderId || "",
		    count: 0,
		    suspense: {},
		    lazy: {},
		    assets: [],
		    nonce: options.nonce,
		    writeResource(id, p, error) {
		      if (solidJs.sharedConfig.context.noHydrate) return;
		      if (error) return scripts += `_$HY.set("${id}", ${stringify(p)});`;
		      scripts += `_$HY.set("${id}", ${stringify(p)});`;
		    }
		  };
		  let html = solidJs.createRoot(d => {
		    setTimeout(d);
		    return resolveSSRNode(escape(code()));
		  });
		  solidJs.sharedConfig.context.noHydrate = true;
		  html = injectAssets(solidJs.sharedConfig.context.assets, html);
		  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
		  return html;
		}
		function renderToStringAsync(code, options = {}) {
		  const {
		    timeoutMs = 30000
		  } = options;
		  let timeoutHandle;
		  const timeout = new Promise((_, reject) => {
		    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
		  });
		  return Promise.race([renderToStream(code, options), timeout]).then(html => {
		    clearTimeout(timeoutHandle);
		    return html;
		  });
		}
		function renderToStream(code, options = {}) {
		  let {
		    nonce,
		    onCompleteShell,
		    onCompleteAll,
		    renderId
		  } = options;
		  let dispose;
		  const blockingResources = [];
		  const registry = new Map();
		  const dedupe = new WeakMap();
		  const checkEnd = () => {
		    if (!registry.size && !completed) {
		      writeTasks();
		      onCompleteAll && onCompleteAll({
		        write(v) {
		          !completed && buffer.write(v);
		        }
		      });
		      writable && writable.end();
		      completed = true;
		      setTimeout(dispose);
		    }
		  };
		  const pushTask = task => {
		    tasks += task + ";";
		    if (!scheduled && firstFlushed) {
		      Promise.resolve().then(writeTasks);
		      scheduled = true;
		    }
		  };
		  const writeTasks = () => {
		    if (tasks.length && !completed && firstFlushed) {
		      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
		      tasks = "";
		    }
		    scheduled = false;
		  };
		  let context;
		  let writable;
		  let tmp = "";
		  let tasks = "";
		  let firstFlushed = false;
		  let completed = false;
		  let scriptFlushed = false;
		  let scheduled = true;
		  let buffer = {
		    write(payload) {
		      tmp += payload;
		    }
		  };
		  solidJs.sharedConfig.context = context = {
		    id: renderId || "",
		    count: 0,
		    async: true,
		    resources: {},
		    lazy: {},
		    suspense: {},
		    assets: [],
		    nonce,
		    block(p) {
		      if (!firstFlushed) blockingResources.push(p);
		    },
		    replace(id, payloadFn) {
		      if (firstFlushed) return;
		      const placeholder = `<!--!$${id}-->`;
		      const first = html.indexOf(placeholder);
		      if (first === -1) return;
		      const last = html.indexOf(`<!--!$/${id}-->`, first + placeholder.length);
		      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
		    },
		    writeResource(id, p, error, wait) {
		      const serverOnly = solidJs.sharedConfig.context.noHydrate;
		      if (error) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
		      if (!p || typeof p !== "object" || !("then" in p)) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
		      if (!firstFlushed) wait && blockingResources.push(p);else !serverOnly && pushTask(`_$HY.init("${id}")`);
		      if (serverOnly) return;
		      p.then(d => {
		        !completed && pushTask(serializeSet(dedupe, id, d));
		      }).catch(() => {
		        !completed && pushTask(`_$HY.set("${id}", {})`);
		      });
		    },
		    registerFragment(key) {
		      if (!registry.has(key)) {
		        registry.set(key, []);
		        firstFlushed && pushTask(`_$HY.init("${key}")`);
		      }
		      return (value, error) => {
		        if (registry.has(key)) {
		          const keys = registry.get(key);
		          registry.delete(key);
		          if (waitForFragments(registry, key)) return;
		          if ((value !== undefined || error) && !completed) {
		            if (!firstFlushed) {
		              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
		              error && pushTask(serializeSet(dedupe, key, error));
		            } else {
		              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
		              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + stringify(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
		              scriptFlushed = true;
		            }
		          }
		        }
		        if (!registry.size) Promise.resolve().then(checkEnd);
		        return firstFlushed;
		      };
		    }
		  };
		  let html = solidJs.createRoot(d => {
		    dispose = d;
		    return resolveSSRNode(escape(code()));
		  });
		  function doShell() {
		    solidJs.sharedConfig.context = context;
		    context.noHydrate = true;
		    html = injectAssets(context.assets, html);
		    for (const key in context.resources) {
		      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
		    }
		    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
		    if (tasks.length) html = injectScripts(html, tasks, nonce);
		    buffer.write(html);
		    tasks = "";
		    scheduled = false;
		    onCompleteShell && onCompleteShell({
		      write(v) {
		        !completed && buffer.write(v);
		      }
		    });
		  }
		  return {
		    then(fn) {
		      function complete() {
		        doShell();
		        fn(tmp);
		      }
		      if (onCompleteAll) {
		        let ogComplete = onCompleteAll;
		        onCompleteAll = options => {
		          ogComplete(options);
		          complete();
		        };
		      } else onCompleteAll = complete;
		      if (!registry.size) Promise.resolve().then(checkEnd);
		    },
		    pipe(w) {
		      Promise.allSettled(blockingResources).then(() => {
		        doShell();
		        buffer = writable = w;
		        buffer.write(tmp);
		        firstFlushed = true;
		        if (completed) writable.end();else setTimeout(checkEnd);
		      });
		    },
		    pipeTo(w) {
		      Promise.allSettled(blockingResources).then(() => {
		        doShell();
		        const encoder = new TextEncoder();
		        const writer = w.getWriter();
		        writable = {
		          end() {
		            writer.releaseLock();
		            w.close();
		          }
		        };
		        buffer = {
		          write(payload) {
		            writer.write(encoder.encode(payload));
		          }
		        };
		        buffer.write(tmp);
		        firstFlushed = true;
		        if (completed) writable.end();else setTimeout(checkEnd);
		      });
		    }
		  };
		}
		function HydrationScript(props) {
		  const {
		    nonce
		  } = solidJs.sharedConfig.context;
		  return ssr(generateHydrationScript({
		    nonce,
		    ...props
		  }));
		}
		function ssr(t, ...nodes) {
		  if (nodes.length) {
		    let result = "";
		    for (let i = 0; i < nodes.length; i++) {
		      result += t[i];
		      const node = nodes[i];
		      if (node !== undefined) result += resolveSSRNode(node);
		    }
		    t = result + t[nodes.length];
		  }
		  return {
		    t
		  };
		}
		function ssrClassList(value) {
		  if (!value) return "";
		  let classKeys = Object.keys(value),
		    result = "";
		  for (let i = 0, len = classKeys.length; i < len; i++) {
		    const key = classKeys[i],
		      classValue = !!value[key];
		    if (!key || key === "undefined" || !classValue) continue;
		    i && (result += " ");
		    result += escape(key);
		  }
		  return result;
		}
		function ssrStyle(value) {
		  if (!value) return "";
		  if (typeof value === "string") return value;
		  let result = "";
		  const k = Object.keys(value);
		  for (let i = 0; i < k.length; i++) {
		    const s = k[i];
		    const v = value[s];
		    if (v != undefined) {
		      if (i) result += ";";
		      result += `${s}:${escape(v, true)}`;
		    }
		  }
		  return result;
		}
		function ssrElement(tag, props, children, needsId) {
		  if (props == null) props = {};else if (typeof props === "function") props = props();
		  const skipChildren = VOID_ELEMENTS.test(tag);
		  const keys = Object.keys(props);
		  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
		  let classResolved;
		  for (let i = 0; i < keys.length; i++) {
		    const prop = keys[i];
		    if (ChildProperties.has(prop)) {
		      if (children === undefined && !skipChildren) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
		      continue;
		    }
		    const value = props[prop];
		    if (prop === "style") {
		      result += `style="${ssrStyle(value)}"`;
		    } else if (prop === "class" || prop === "className" || prop === "classList") {
		      if (classResolved) continue;
		      let n;
		      result += `class="${escape(((n = props.class) ? n + " " : "") + ((n = props.className) ? n + " " : ""), true) + ssrClassList(props.classList)}"`;
		      classResolved = true;
		    } else if (BooleanAttributes.has(prop)) {
		      if (value) result += prop;else continue;
		    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
		      continue;
		    } else {
		      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
		    }
		    if (i !== keys.length - 1) result += " ";
		  }
		  if (skipChildren) return {
		    t: result + "/>"
		  };
		  if (typeof children === "function") children = children();
		  return {
		    t: result + `>${resolveSSRNode(children, true)}</${tag}>`
		  };
		}
		function ssrAttribute(key, value, isBoolean) {
		  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
		}
		function ssrHydrationKey() {
		  const hk = getHydrationKey();
		  return hk ? ` data-hk="${hk}"` : "";
		}
		function escape(s, attr) {
		  const t = typeof s;
		  if (t !== "string") {
		    if (!attr && t === "function") return escape(s());
		    if (!attr && Array.isArray(s)) {
		      for (let i = 0; i < s.length; i++) s[i] = escape(s[i]);
		      return s;
		    }
		    if (attr && t === "boolean") return String(s);
		    return s;
		  }
		  const delim = attr ? '"' : "<";
		  const escDelim = attr ? "&quot;" : "&lt;";
		  let iDelim = s.indexOf(delim);
		  let iAmp = s.indexOf("&");
		  if (iDelim < 0 && iAmp < 0) return s;
		  let left = 0,
		    out = "";
		  while (iDelim >= 0 && iAmp >= 0) {
		    if (iDelim < iAmp) {
		      if (left < iDelim) out += s.substring(left, iDelim);
		      out += escDelim;
		      left = iDelim + 1;
		      iDelim = s.indexOf(delim, left);
		    } else {
		      if (left < iAmp) out += s.substring(left, iAmp);
		      out += "&amp;";
		      left = iAmp + 1;
		      iAmp = s.indexOf("&", left);
		    }
		  }
		  if (iDelim >= 0) {
		    do {
		      if (left < iDelim) out += s.substring(left, iDelim);
		      out += escDelim;
		      left = iDelim + 1;
		      iDelim = s.indexOf(delim, left);
		    } while (iDelim >= 0);
		  } else while (iAmp >= 0) {
		    if (left < iAmp) out += s.substring(left, iAmp);
		    out += "&amp;";
		    left = iAmp + 1;
		    iAmp = s.indexOf("&", left);
		  }
		  return left < s.length ? out + s.substring(left) : out;
		}
		function resolveSSRNode(node, top) {
		  const t = typeof node;
		  if (t === "string") return node;
		  if (node == null || t === "boolean") return "";
		  if (Array.isArray(node)) {
		    let prev = {};
		    let mapped = "";
		    for (let i = 0, len = node.length; i < len; i++) {
		      if (!top && typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
		      mapped += resolveSSRNode(prev = node[i]);
		    }
		    return mapped;
		  }
		  if (t === "object") return node.t;
		  if (t === "function") return resolveSSRNode(node());
		  return String(node);
		}
		function getHydrationKey() {
		  const hydrate = solidJs.sharedConfig.context;
		  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
		}
		function useAssets(fn) {
		  solidJs.sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
		}
		function getAssets() {
		  const assets = solidJs.sharedConfig.context.assets;
		  let out = "";
		  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
		  return out;
		}
		function generateHydrationScript({
		  eventNames = ["click", "input"],
		  nonce
		} = {}) {
		  return `<script${nonce ? ` nonce="${nonce}"` : ""}>(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])}))))})(window._$HY||(_$HY={events:[],completed:new WeakSet,r:{},fe(){},init(e,t){_$HY.r[e]=[new Promise((e=>t=e)),t]},set(e,t,o){(o=_$HY.r[e])&&o[1](t),_$HY.r[e]=[t]},unset(e){delete _$HY.r[e]},load:e=>_$HY.r[e]}));</script><!--xs-->`;
		}
		function Hydration(props) {
		  if (!solidJs.sharedConfig.context.noHydrate) return props.children;
		  const context = solidJs.sharedConfig.context;
		  solidJs.sharedConfig.context = {
		    ...context,
		    count: 0,
		    id: `${context.id}${context.count++}-`,
		    noHydrate: false
		  };
		  const res = props.children;
		  solidJs.sharedConfig.context = context;
		  return res;
		}
		function NoHydration(props) {
		  solidJs.sharedConfig.context.noHydrate = true;
		  return props.children;
		}
		function injectAssets(assets, html) {
		  if (!assets || !assets.length) return html;
		  let out = "";
		  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
		  return html.replace(`</head>`, out + `</head>`);
		}
		function injectScripts(html, scripts, nonce) {
		  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
		  const index = html.indexOf("<!--xs-->");
		  if (index > -1) {
		    return html.slice(0, index) + tag + html.slice(index);
		  }
		  return html + tag;
		}
		function waitForFragments(registry, key) {
		  for (const k of [...registry.keys()].reverse()) {
		    if (key.startsWith(k)) {
		      registry.get(k).push(key);
		      return true;
		    }
		  }
		  return false;
		}
		function serializeSet(registry, key, value) {
		  const exist = registry.get(value);
		  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
		  value !== null && typeof value === "object" && registry.set(value, key);
		  return `_$HY.set("${key}", ${stringify(value)})`;
		}
		function replacePlaceholder(html, key, value) {
		  const marker = `<template id="pl-${key}">`;
		  const close = `<!--pl-${key}-->`;
		  const first = html.indexOf(marker);
		  if (first === -1) return html;
		  const last = html.indexOf(close, first + marker.length);
		  return html.slice(0, first) + value + html.slice(last + close.length);
		}
		function Assets(props) {
		  useAssets(() => props.children);
		}
		function pipeToNodeWritable(code, writable, options = {}) {
		  if (options.onReady) {
		    options.onCompleteShell = ({
		      write
		    }) => {
		      options.onReady({
		        write,
		        startWriting() {
		          stream.pipe(writable);
		        }
		      });
		    };
		  }
		  const stream = renderToStream(code, options);
		  if (!options.onReady) stream.pipe(writable);
		}
		function pipeToWritable(code, writable, options = {}) {
		  if (options.onReady) {
		    options.onCompleteShell = ({
		      write
		    }) => {
		      options.onReady({
		        write,
		        startWriting() {
		          stream.pipeTo(writable);
		        }
		      });
		    };
		  }
		  const stream = renderToStream(code, options);
		  if (!options.onReady) stream.pipeTo(writable);
		}
		function ssrSpread(props, isSVG, skipChildren) {
		  let result = "";
		  if (props == null) return result;
		  if (typeof props === "function") props = props();
		  const keys = Object.keys(props);
		  let classResolved;
		  for (let i = 0; i < keys.length; i++) {
		    let prop = keys[i];
		    if (prop === "children") {
		      !skipChildren && console.warn(`SSR currently does not support spread children.`);
		      continue;
		    }
		    const value = props[prop];
		    if (prop === "style") {
		      result += `style="${ssrStyle(value)}"`;
		    } else if (prop === "class" || prop === "className" || prop === "classList") {
		      if (classResolved) continue;
		      let n;
		      result += `class="${(n = props.class) ? n + " " : ""}${(n = props.className) ? n + " " : ""}${ssrClassList(props.classList)}"`;
		      classResolved = true;
		    } else if (BooleanAttributes.has(prop)) {
		      if (value) result += prop;else continue;
		    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on" || prop.slice(0, 5) === "prop:") {
		      continue;
		    } else {
		      if (prop.slice(0, 5) === "attr:") prop = prop.slice(5);
		      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
		    }
		    if (i !== keys.length - 1) result += " ";
		  }
		  return result;
		}

		const isServer = true;
		const isDev = false;
		function render() {}
		function hydrate() {}
		function insert() {}
		function spread() {}
		function addEventListener() {}
		function delegateEvents() {}
		function Dynamic(props) {
		  const [p, others] = solidJs.splitProps(props, ["component"]);
		  const comp = p.component,
		    t = typeof comp;
		  if (comp) {
		    if (t === "function") return comp(others);else if (t === "string") {
		      return ssrElement(comp, others, undefined, true);
		    }
		  }
		}
		function Portal(props) {
		  return "";
		}

		Object.defineProperty(exports, 'ErrorBoundary', {
		  enumerable: true,
		  get: function () { return solidJs.ErrorBoundary; }
		});
		Object.defineProperty(exports, 'For', {
		  enumerable: true,
		  get: function () { return solidJs.For; }
		});
		Object.defineProperty(exports, 'Index', {
		  enumerable: true,
		  get: function () { return solidJs.Index; }
		});
		Object.defineProperty(exports, 'Match', {
		  enumerable: true,
		  get: function () { return solidJs.Match; }
		});
		Object.defineProperty(exports, 'Show', {
		  enumerable: true,
		  get: function () { return solidJs.Show; }
		});
		Object.defineProperty(exports, 'Suspense', {
		  enumerable: true,
		  get: function () { return solidJs.Suspense; }
		});
		Object.defineProperty(exports, 'SuspenseList', {
		  enumerable: true,
		  get: function () { return solidJs.SuspenseList; }
		});
		Object.defineProperty(exports, 'Switch', {
		  enumerable: true,
		  get: function () { return solidJs.Switch; }
		});
		Object.defineProperty(exports, 'createComponent', {
		  enumerable: true,
		  get: function () { return solidJs.createComponent; }
		});
		Object.defineProperty(exports, 'mergeProps', {
		  enumerable: true,
		  get: function () { return solidJs.mergeProps; }
		});
		exports.Assets = Assets;
		exports.Dynamic = Dynamic;
		exports.Hydration = Hydration;
		exports.HydrationScript = HydrationScript;
		exports.NoHydration = NoHydration;
		exports.Portal = Portal;
		exports.addEventListener = addEventListener;
		exports.delegateEvents = delegateEvents;
		exports.escape = escape;
		exports.generateHydrationScript = generateHydrationScript;
		exports.getAssets = getAssets;
		exports.getHydrationKey = getHydrationKey;
		exports.hydrate = hydrate;
		exports.insert = insert;
		exports.isDev = isDev;
		exports.isServer = isServer;
		exports.pipeToNodeWritable = pipeToNodeWritable;
		exports.pipeToWritable = pipeToWritable;
		exports.render = render;
		exports.renderToStream = renderToStream;
		exports.renderToString = renderToString;
		exports.renderToStringAsync = renderToStringAsync;
		exports.resolveSSRNode = resolveSSRNode;
		exports.spread = spread;
		exports.ssr = ssr;
		exports.ssrAttribute = ssrAttribute;
		exports.ssrClassList = ssrClassList;
		exports.ssrElement = ssrElement;
		exports.ssrHydrationKey = ssrHydrationKey;
		exports.ssrSpread = ssrSpread;
		exports.ssrStyle = ssrStyle;
		exports.stringify = stringify;
		exports.useAssets = useAssets; 
	} (server$2));
	return server$2;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	var web = requireServer();
	var solidJs = requireServer$1();

	const _tmpl$ = ["<title>", "</title>"];
	const CustomIcon = props => IconTemplate(props.src, props);
	function IconTemplate(iconSrc, props) {
	  const mergedProps = web.mergeProps(iconSrc.a, props);
	  const [_, svgProps] = solidJs.splitProps(mergedProps, ["src"]);
	  return web.ssrElement("svg", () => ({
	    "stroke": iconSrc.a.stroke,
	    "color": props.color || "currentColor",
	    "stroke-width": "0",
	    "style": {
	      ...props.style,
	      overflow: "visible"
	    },
	    ...svgProps,
	    "height": props.size || "1em",
	    "width": props.size || "1em",
	    "innerHTML": iconSrc.c,
	    "xmlns": "http://www.w3.org/2000/svg"
	  }), [web.isServer && web.escape(web.ssr(iconSrc.c)), props.title && web.ssr(_tmpl$, web.escape(props.title))], false);
	}

	lib.CustomIcon = CustomIcon;
	lib.IconTemplate = IconTemplate;
	return lib;
}

var hasRequiredFi;

function requireFi () {
	if (hasRequiredFi) return fi;
	hasRequiredFi = 1;
	var IconTemplate = requireLib().IconTemplate;
	  fi.FiActivity = function FiActivity(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'
	      }, props)
	  };
	  fi.FiAirplay = function FiAirplay(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/><path d="m12 15 5 6H7l5-6z"/>'
	      }, props)
	  };
	  fi.FiAlertCircle = function FiAlertCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'
	      }, props)
	  };
	  fi.FiAlertOctagon = function FiAlertOctagon(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM12 8v4M12 16h.01"/>'
	      }, props)
	  };
	  fi.FiAlertTriangle = function FiAlertTriangle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>'
	      }, props)
	  };
	  fi.FiAlignCenter = function FiAlignCenter(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 10H6M21 6H3M21 14H3M18 18H6"/>'
	      }, props)
	  };
	  fi.FiAlignJustify = function FiAlignJustify(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 10H3M21 6H3M21 14H3M21 18H3"/>'
	      }, props)
	  };
	  fi.FiAlignLeft = function FiAlignLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 10H3M21 6H3M21 14H3M17 18H3"/>'
	      }, props)
	  };
	  fi.FiAlignRight = function FiAlignRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 10H7M21 6H3M21 14H3M21 18H7"/>'
	      }, props)
	  };
	  fi.FiAnchor = function FiAnchor(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="5" r="3"/><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>'
	      }, props)
	  };
	  fi.FiAperture = function FiAperture(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>'
	      }, props)
	  };
	  fi.FiArchive = function FiArchive(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>'
	      }, props)
	  };
	  fi.FiArrowDownCircle = function FiArrowDownCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4M12 8v8"/>'
	      }, props)
	  };
	  fi.FiArrowDownLeft = function FiArrowDownLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 7 7 17M17 17H7V7"/>'
	      }, props)
	  };
	  fi.FiArrowDownRight = function FiArrowDownRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m7 7 10 10M17 7v10H7"/>'
	      }, props)
	  };
	  fi.FiArrowDown = function FiArrowDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 5v14M19 12l-7 7-7-7"/>'
	      }, props)
	  };
	  fi.FiArrowLeftCircle = function FiArrowLeftCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m12 8-4 4 4 4M16 12H8"/>'
	      }, props)
	  };
	  fi.FiArrowLeft = function FiArrowLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 12H5M12 19l-7-7 7-7"/>'
	      }, props)
	  };
	  fi.FiArrowRightCircle = function FiArrowRightCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4M8 12h8"/>'
	      }, props)
	  };
	  fi.FiArrowRight = function FiArrowRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 12h14M12 5l7 7-7 7"/>'
	      }, props)
	  };
	  fi.FiArrowUpCircle = function FiArrowUpCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 16V8"/>'
	      }, props)
	  };
	  fi.FiArrowUpLeft = function FiArrowUpLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 17 7 7M7 17V7h10"/>'
	      }, props)
	  };
	  fi.FiArrowUpRight = function FiArrowUpRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M7 17 17 7M7 7h10v10"/>'
	      }, props)
	  };
	  fi.FiArrowUp = function FiArrowUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 19V5M5 12l7-7 7 7"/>'
	      }, props)
	  };
	  fi.FiAtSign = function FiAtSign(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>'
	      }, props)
	  };
	  fi.FiAward = function FiAward(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>'
	      }, props)
	  };
	  fi.FiBarChart2 = function FiBarChart2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 20V10M12 20V4M6 20v-6"/>'
	      }, props)
	  };
	  fi.FiBarChart = function FiBarChart(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 20V10M18 20V4M6 20v-4"/>'
	      }, props)
	  };
	  fi.FiBatteryCharging = function FiBatteryCharging(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19M23 13v-2M11 6l-4 6h6l-4 6"/>'
	      }, props)
	  };
	  fi.FiBattery = function FiBattery(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="12" x="1" y="6" rx="2" ry="2"/><path d="M23 13v-2"/>'
	      }, props)
	  };
	  fi.FiBellOff = function FiBellOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M13.73 21a2 2 0 0 1-3.46 0M18.63 13A17.89 17.89 0 0 1 18 8M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14M18 8a6 6 0 0 0-9.33-5M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiBell = function FiBell(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>'
	      }, props)
	  };
	  fi.FiBluetooth = function FiBluetooth(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11"/>'
	      }, props)
	  };
	  fi.FiBold = function FiBold(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>'
	      }, props)
	  };
	  fi.FiBookOpen = function FiBookOpen(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
	      }, props)
	  };
	  fi.FiBook = function FiBook(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
	      }, props)
	  };
	  fi.FiBookmark = function FiBookmark(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'
	      }, props)
	  };
	  fi.FiBox = function FiBox(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>'
	      }, props)
	  };
	  fi.FiBriefcase = function FiBriefcase(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
	      }, props)
	  };
	  fi.FiCalendar = function FiCalendar(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
	      }, props)
	  };
	  fi.FiCameraOff = function FiCameraOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m1 1 22 22M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"/>'
	      }, props)
	  };
	  fi.FiCamera = function FiCamera(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'
	      }, props)
	  };
	  fi.FiCast = function FiCast(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 20h.01"/>'
	      }, props)
	  };
	  fi.FiCheckCircle = function FiCheckCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>'
	      }, props)
	  };
	  fi.FiCheckSquare = function FiCheckSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'
	      }, props)
	  };
	  fi.FiCheck = function FiCheck(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20 6 9 17l-5-5"/>'
	      }, props)
	  };
	  fi.FiChevronDown = function FiChevronDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m6 9 6 6 6-6"/>'
	      }, props)
	  };
	  fi.FiChevronLeft = function FiChevronLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m15 18-6-6 6-6"/>'
	      }, props)
	  };
	  fi.FiChevronRight = function FiChevronRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m9 18 6-6-6-6"/>'
	      }, props)
	  };
	  fi.FiChevronUp = function FiChevronUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m18 15-6-6-6 6"/>'
	      }, props)
	  };
	  fi.FiChevronsDown = function FiChevronsDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m7 13 5 5 5-5M7 6l5 5 5-5"/>'
	      }, props)
	  };
	  fi.FiChevronsLeft = function FiChevronsLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>'
	      }, props)
	  };
	  fi.FiChevronsRight = function FiChevronsRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m13 17 5-5-5-5M6 17l5-5-5-5"/>'
	      }, props)
	  };
	  fi.FiChevronsUp = function FiChevronsUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m17 11-5-5-5 5M17 18l-5-5-5 5"/>'
	      }, props)
	  };
	  fi.FiChrome = function FiChrome(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.17 8H12M3.95 6.06 8.54 14M10.88 21.94 15.46 14"/>'
	      }, props)
	  };
	  fi.FiCircle = function FiCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/>'
	      }, props)
	  };
	  fi.FiClipboard = function FiClipboard(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>'
	      }, props)
	  };
	  fi.FiClock = function FiClock(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
	      }, props)
	  };
	  fi.FiCloudDrizzle = function FiCloudDrizzle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M8 19v2M8 13v2M16 19v2M16 13v2M12 21v2M12 15v2M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>'
	      }, props)
	  };
	  fi.FiCloudLightning = function FiCloudLightning(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><path d="m13 11-4 6h6l-4 6"/>'
	      }, props)
	  };
	  fi.FiCloudOff = function FiCloudOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiCloudRain = function FiCloudRain(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>'
	      }, props)
	  };
	  fi.FiCloudSnow = function FiCloudSnow(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01"/>'
	      }, props)
	  };
	  fi.FiCloud = function FiCloud(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
	      }, props)
	  };
	  fi.FiCode = function FiCode(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'
	      }, props)
	  };
	  fi.FiCodepen = function FiCodepen(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m12 2 10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5"/><path d="m22 8.5-10 7-10-7"/><path d="m2 15.5 10-7 10 7M12 2v6.5"/>'
	      }, props)
	  };
	  fi.FiCodesandbox = function FiCodesandbox(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m7.5 4.21 4.5 2.6 4.5-2.6M7.5 19.79V14.6L3 12M21 12l-4.5 2.6v5.19M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>'
	      }, props)
	  };
	  fi.FiCoffee = function FiCoffee(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>'
	      }, props)
	  };
	  fi.FiColumns = function FiColumns(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/>'
	      }, props)
	  };
	  fi.FiCommand = function FiCommand(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>'
	      }, props)
	  };
	  fi.FiCompass = function FiCompass(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>'
	      }, props)
	  };
	  fi.FiCopy = function FiCopy(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'
	      }, props)
	  };
	  fi.FiCornerDownLeft = function FiCornerDownLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m9 10-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>'
	      }, props)
	  };
	  fi.FiCornerDownRight = function FiCornerDownRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>'
	      }, props)
	  };
	  fi.FiCornerLeftDown = function FiCornerLeftDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m14 15-5 5-5-5"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/>'
	      }, props)
	  };
	  fi.FiCornerLeftUp = function FiCornerLeftUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 9 9 4 4 9"/><path d="M20 20h-7a4 4 0 0 1-4-4V4"/>'
	      }, props)
	  };
	  fi.FiCornerRightDown = function FiCornerRightDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m10 15 5 5 5-5"/><path d="M4 4h7a4 4 0 0 1 4 4v12"/>'
	      }, props)
	  };
	  fi.FiCornerRightUp = function FiCornerRightUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m10 9 5-5 5 5"/><path d="M4 20h7a4 4 0 0 0 4-4V4"/>'
	      }, props)
	  };
	  fi.FiCornerUpLeft = function FiCornerUpLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9 14 4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>'
	      }, props)
	  };
	  fi.FiCornerUpRight = function FiCornerUpRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>'
	      }, props)
	  };
	  fi.FiCpu = function FiCpu(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="16" height="16" x="4" y="4" rx="2" ry="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>'
	      }, props)
	  };
	  fi.FiCreditCard = function FiCreditCard(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><path d="M1 10h22"/>'
	      }, props)
	  };
	  fi.FiCrop = function FiCrop(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6.13 1 6 16a2 2 0 0 0 2 2h15"/><path d="M1 6.13 16 6a2 2 0 0 1 2 2v15"/>'
	      }, props)
	  };
	  fi.FiCrosshair = function FiCrosshair(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/>'
	      }, props)
	  };
	  fi.FiDatabase = function FiDatabase(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'
	      }, props)
	  };
	  fi.FiDelete = function FiDelete(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM18 9l-6 6M12 9l6 6"/>'
	      }, props)
	  };
	  fi.FiDisc = function FiDisc(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>'
	      }, props)
	  };
	  fi.FiDivideCircle = function FiDivideCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M8 12h8M12 16h0M12 8h0"/><circle cx="12" cy="12" r="10"/>'
	      }, props)
	  };
	  fi.FiDivideSquare = function FiDivideSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M8 12h8M12 16h0M12 8h0"/>'
	      }, props)
	  };
	  fi.FiDivide = function FiDivide(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="6" r="2"/><path d="M5 12h14"/><circle cx="12" cy="18" r="2"/>'
	      }, props)
	  };
	  fi.FiDollarSign = function FiDollarSign(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
	      }, props)
	  };
	  fi.FiDownloadCloud = function FiDownloadCloud(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m8 17 4 4 4-4M12 12v9"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>'
	      }, props)
	  };
	  fi.FiDownload = function FiDownload(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'
	      }, props)
	  };
	  fi.FiDribbble = function FiDribbble(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>'
	      }, props)
	  };
	  fi.FiDroplet = function FiDroplet(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m12 2.69 5.66 5.66a8 8 0 1 1-11.31 0z"/>'
	      }, props)
	  };
	  fi.FiEdit2 = function FiEdit2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'
	      }, props)
	  };
	  fi.FiEdit3 = function FiEdit3(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'
	      }, props)
	  };
	  fi.FiEdit = function FiEdit(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'
	      }, props)
	  };
	  fi.FiExternalLink = function FiExternalLink(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>'
	      }, props)
	  };
	  fi.FiEyeOff = function FiEyeOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiEye = function FiEye(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
	      }, props)
	  };
	  fi.FiFacebook = function FiFacebook(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'
	      }, props)
	  };
	  fi.FiFastForward = function FiFastForward(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m13 19 9-7-9-7v14zM2 19l9-7-9-7v14z"/>'
	      }, props)
	  };
	  fi.FiFeather = function FiFeather(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9"/>'
	      }, props)
	  };
	  fi.FiFigma = function FiFigma(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0zM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0zM5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>'
	      }, props)
	  };
	  fi.FiFileMinus = function FiFileMinus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6"/>'
	      }, props)
	  };
	  fi.FiFilePlus = function FiFilePlus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15h6"/>'
	      }, props)
	  };
	  fi.FiFileText = function FiFileText(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'
	      }, props)
	  };
	  fi.FiFile = function FiFile(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>'
	      }, props)
	  };
	  fi.FiFilm = function FiFilm(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>'
	      }, props)
	  };
	  fi.FiFilter = function FiFilter(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>'
	      }, props)
	  };
	  fi.FiFlag = function FiFlag(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>'
	      }, props)
	  };
	  fi.FiFolderMinus = function FiFolderMinus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2zM9 14h6"/>'
	      }, props)
	  };
	  fi.FiFolderPlus = function FiFolderPlus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2zM12 11v6M9 14h6"/>'
	      }, props)
	  };
	  fi.FiFolder = function FiFolder(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'
	      }, props)
	  };
	  fi.FiFramer = function FiFramer(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7"/>'
	      }, props)
	  };
	  fi.FiFrown = function FiFrown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/>'
	      }, props)
	  };
	  fi.FiGift = function FiGift(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'
	      }, props)
	  };
	  fi.FiGitBranch = function FiGitBranch(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'
	      }, props)
	  };
	  fi.FiGitCommit = function FiGitCommit(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="4"/><path d="M1.05 12H7M17.01 12h5.95"/>'
	      }, props)
	  };
	  fi.FiGitMerge = function FiGitMerge(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>'
	      }, props)
	  };
	  fi.FiGitPullRequest = function FiGitPullRequest(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12"/>'
	      }, props)
	  };
	  fi.FiGithub = function FiGithub(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
	      }, props)
	  };
	  fi.FiGitlab = function FiGitlab(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22.65 14.39 12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>'
	      }, props)
	  };
	  fi.FiGlobe = function FiGlobe(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
	      }, props)
	  };
	  fi.FiGrid = function FiGrid(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>'
	      }, props)
	  };
	  fi.FiHardDrive = function FiHardDrive(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11zM6 16h.01M10 16h.01"/>'
	      }, props)
	  };
	  fi.FiHash = function FiHash(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>'
	      }, props)
	  };
	  fi.FiHeadphones = function FiHeadphones(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>'
	      }, props)
	  };
	  fi.FiHeart = function FiHeart(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
	      }, props)
	  };
	  fi.FiHelpCircle = function FiHelpCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>'
	      }, props)
	  };
	  fi.FiHexagon = function FiHexagon(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>'
	      }, props)
	  };
	  fi.FiHome = function FiHome(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'
	      }, props)
	  };
	  fi.FiImage = function FiImage(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'
	      }, props)
	  };
	  fi.FiInbox = function FiInbox(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'
	      }, props)
	  };
	  fi.FiInfo = function FiInfo(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'
	      }, props)
	  };
	  fi.FiInstagram = function FiInstagram(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>'
	      }, props)
	  };
	  fi.FiItalic = function FiItalic(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 4h-9M14 20H5M15 4 9 20"/>'
	      }, props)
	  };
	  fi.FiKey = function FiKey(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>'
	      }, props)
	  };
	  fi.FiLayers = function FiLayers(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'
	      }, props)
	  };
	  fi.FiLayout = function FiLayout(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>'
	      }, props)
	  };
	  fi.FiLifeBuoy = function FiLifeBuoy(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M14.83 9.17l3.53-3.53M4.93 19.07l4.24-4.24"/>'
	      }, props)
	  };
	  fi.FiLink2 = function FiLink2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3M8 12h8"/>'
	      }, props)
	  };
	  fi.FiLink = function FiLink(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
	      }, props)
	  };
	  fi.FiLinkedin = function FiLinkedin(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>'
	      }, props)
	  };
	  fi.FiList = function FiList(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'
	      }, props)
	  };
	  fi.FiLoader = function FiLoader(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>'
	      }, props)
	  };
	  fi.FiLock = function FiLock(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
	      }, props)
	  };
	  fi.FiLogIn = function FiLogIn(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>'
	      }, props)
	  };
	  fi.FiLogOut = function FiLogOut(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
	      }, props)
	  };
	  fi.FiMail = function FiMail(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>'
	      }, props)
	  };
	  fi.FiMapPin = function FiMapPin(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
	      }, props)
	  };
	  fi.FiMap = function FiMap(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"/>'
	      }, props)
	  };
	  fi.FiMaximize2 = function FiMaximize2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
	      }, props)
	  };
	  fi.FiMaximize = function FiMaximize(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>'
	      }, props)
	  };
	  fi.FiMeh = function FiMeh(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/>'
	      }, props)
	  };
	  fi.FiMenu = function FiMenu(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M3 12h18M3 6h18M3 18h18"/>'
	      }, props)
	  };
	  fi.FiMessageCircle = function FiMessageCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'
	      }, props)
	  };
	  fi.FiMessageSquare = function FiMessageSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
	      }, props)
	  };
	  fi.FiMicOff = function FiMicOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m1 1 22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v4M8 23h8"/>'
	      }, props)
	  };
	  fi.FiMic = function FiMic(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>'
	      }, props)
	  };
	  fi.FiMinimize2 = function FiMinimize2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>'
	      }, props)
	  };
	  fi.FiMinimize = function FiMinimize(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
	      }, props)
	  };
	  fi.FiMinusCircle = function FiMinusCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>'
	      }, props)
	  };
	  fi.FiMinusSquare = function FiMinusSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M8 12h8"/>'
	      }, props)
	  };
	  fi.FiMinus = function FiMinus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 12h14"/>'
	      }, props)
	  };
	  fi.FiMonitor = function FiMonitor(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="14" x="2" y="3" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>'
	      }, props)
	  };
	  fi.FiMoon = function FiMoon(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
	      }, props)
	  };
	  fi.FiMoreHorizontal = function FiMoreHorizontal(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
	      }, props)
	  };
	  fi.FiMoreVertical = function FiMoreVertical(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>'
	      }, props)
	  };
	  fi.FiMousePointer = function FiMousePointer(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3zM13 13l6 6"/>'
	      }, props)
	  };
	  fi.FiMove = function FiMove(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m5 9-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>'
	      }, props)
	  };
	  fi.FiMusic = function FiMusic(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'
	      }, props)
	  };
	  fi.FiNavigation2 = function FiNavigation2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m12 2 7 19-7-4-7 4 7-19z"/>'
	      }, props)
	  };
	  fi.FiNavigation = function FiNavigation(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m3 11 19-9-9 19-2-8-8-2z"/>'
	      }, props)
	  };
	  fi.FiOctagon = function FiOctagon(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z"/>'
	      }, props)
	  };
	  fi.FiPackage = function FiPackage(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>'
	      }, props)
	  };
	  fi.FiPaperclip = function FiPaperclip(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>'
	      }, props)
	  };
	  fi.FiPauseCircle = function FiPauseCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M10 15V9M14 15V9"/>'
	      }, props)
	  };
	  fi.FiPause = function FiPause(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>'
	      }, props)
	  };
	  fi.FiPenTool = function FiPenTool(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'
	      }, props)
	  };
	  fi.FiPercent = function FiPercent(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'
	      }, props)
	  };
	  fi.FiPhoneCall = function FiPhoneCall(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPhoneForwarded = function FiPhoneForwarded(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m19 1 4 4-4 4M15 5h8M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPhoneIncoming = function FiPhoneIncoming(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 2v6h6M23 1l-7 7M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPhoneMissed = function FiPhoneMissed(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m23 1-6 6M17 1l6 6M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPhoneOff = function FiPhoneOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91M23 1 1 23"/>'
	      }, props)
	  };
	  fi.FiPhoneOutgoing = function FiPhoneOutgoing(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 7V1h-6M16 8l7-7M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPhone = function FiPhone(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
	      }, props)
	  };
	  fi.FiPieChart = function FiPieChart(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>'
	      }, props)
	  };
	  fi.FiPlayCircle = function FiPlayCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/>'
	      }, props)
	  };
	  fi.FiPlay = function FiPlay(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m5 3 14 9-14 9V3z"/>'
	      }, props)
	  };
	  fi.FiPlusCircle = function FiPlusCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>'
	      }, props)
	  };
	  fi.FiPlusSquare = function FiPlusSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M12 8v8M8 12h8"/>'
	      }, props)
	  };
	  fi.FiPlus = function FiPlus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 5v14M5 12h14"/>'
	      }, props)
	  };
	  fi.FiPocket = function FiPocket(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"/><path d="m8 10 4 4 4-4"/>'
	      }, props)
	  };
	  fi.FiPower = function FiPower(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>'
	      }, props)
	  };
	  fi.FiPrinter = function FiPrinter(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>'
	      }, props)
	  };
	  fi.FiRadio = function FiRadio(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>'
	      }, props)
	  };
	  fi.FiRefreshCcw = function FiRefreshCcw(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>'
	      }, props)
	  };
	  fi.FiRefreshCw = function FiRefreshCw(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'
	      }, props)
	  };
	  fi.FiRepeat = function FiRepeat(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'
	      }, props)
	  };
	  fi.FiRewind = function FiRewind(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m11 19-9-7 9-7v14zM22 19l-9-7 9-7v14z"/>'
	      }, props)
	  };
	  fi.FiRotateCcw = function FiRotateCcw(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>'
	      }, props)
	  };
	  fi.FiRotateCw = function FiRotateCw(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'
	      }, props)
	  };
	  fi.FiRss = function FiRss(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>'
	      }, props)
	  };
	  fi.FiSave = function FiSave(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>'
	      }, props)
	  };
	  fi.FiScissors = function FiScissors(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>'
	      }, props)
	  };
	  fi.FiSearch = function FiSearch(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>'
	      }, props)
	  };
	  fi.FiSend = function FiSend(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>'
	      }, props)
	  };
	  fi.FiServer = function FiServer(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><path d="M6 6h.01M6 18h.01"/>'
	      }, props)
	  };
	  fi.FiSettings = function FiSettings(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
	      }, props)
	  };
	  fi.FiShare2 = function FiShare2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>'
	      }, props)
	  };
	  fi.FiShare = function FiShare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>'
	      }, props)
	  };
	  fi.FiShieldOff = function FiShieldOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18M4.73 4.73 4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiShield = function FiShield(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
	      }, props)
	  };
	  fi.FiShoppingBag = function FiShoppingBag(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'
	      }, props)
	  };
	  fi.FiShoppingCart = function FiShoppingCart(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'
	      }, props)
	  };
	  fi.FiShuffle = function FiShuffle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'
	      }, props)
	  };
	  fi.FiSidebar = function FiSidebar(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/>'
	      }, props)
	  };
	  fi.FiSkipBack = function FiSkipBack(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M19 20 9 12l10-8v16zM5 19V5"/>'
	      }, props)
	  };
	  fi.FiSkipForward = function FiSkipForward(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m5 4 10 8-10 8V4zM19 5v14"/>'
	      }, props)
	  };
	  fi.FiSlack = function FiSlack(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zM20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5zM3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14zM14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5zM15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5zM8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>'
	      }, props)
	  };
	  fi.FiSlash = function FiSlash(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/>'
	      }, props)
	  };
	  fi.FiSliders = function FiSliders(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>'
	      }, props)
	  };
	  fi.FiSmartphone = function FiSmartphone(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>'
	      }, props)
	  };
	  fi.FiSmile = function FiSmile(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'
	      }, props)
	  };
	  fi.FiSpeaker = function FiSpeaker(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><circle cx="12" cy="14" r="4"/><path d="M12 6h.01"/>'
	      }, props)
	  };
	  fi.FiSquare = function FiSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>'
	      }, props)
	  };
	  fi.FiStar = function FiStar(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
	      }, props)
	  };
	  fi.FiStopCircle = function FiStopCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="M9 9h6v6H9z"/>'
	      }, props)
	  };
	  fi.FiSun = function FiSun(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
	      }, props)
	  };
	  fi.FiSunrise = function FiSunrise(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 18a5 5 0 0 0-10 0M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4"/>'
	      }, props)
	  };
	  fi.FiSunset = function FiSunset(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 18a5 5 0 0 0-10 0M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M16 5l-4 4-4-4"/>'
	      }, props)
	  };
	  fi.FiTable = function FiTable(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>'
	      }, props)
	  };
	  fi.FiTablet = function FiTablet(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>'
	      }, props)
	  };
	  fi.FiTag = function FiTag(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/>'
	      }, props)
	  };
	  fi.FiTarget = function FiTarget(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'
	      }, props)
	  };
	  fi.FiTerminal = function FiTerminal(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m4 17 6-6-6-6M12 19h8"/>'
	      }, props)
	  };
	  fi.FiThermometer = function FiThermometer(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>'
	      }, props)
	  };
	  fi.FiThumbsDown = function FiThumbsDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>'
	      }, props)
	  };
	  fi.FiThumbsUp = function FiThumbsUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>'
	      }, props)
	  };
	  fi.FiToggleLeft = function FiToggleLeft(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="22" height="14" x="1" y="5" rx="7" ry="7"/><circle cx="8" cy="12" r="3"/>'
	      }, props)
	  };
	  fi.FiToggleRight = function FiToggleRight(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="22" height="14" x="1" y="5" rx="7" ry="7"/><circle cx="16" cy="12" r="3"/>'
	      }, props)
	  };
	  fi.FiTool = function FiTool(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
	      }, props)
	  };
	  fi.FiTrash2 = function FiTrash2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>'
	      }, props)
	  };
	  fi.FiTrash = function FiTrash(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'
	      }, props)
	  };
	  fi.FiTrello = function FiTrello(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M7 7h3v9H7zM14 7h3v5h-3z"/>'
	      }, props)
	  };
	  fi.FiTrendingDown = function FiTrendingDown(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m23 18-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/>'
	      }, props)
	  };
	  fi.FiTrendingUp = function FiTrendingUp(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>'
	      }, props)
	  };
	  fi.FiTriangle = function FiTriangle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>'
	      }, props)
	  };
	  fi.FiTruck = function FiTruck(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'
	      }, props)
	  };
	  fi.FiTv = function FiTv(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><path d="m17 2-5 5-5-5"/>'
	      }, props)
	  };
	  fi.FiTwitch = function FiTwitch(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>'
	      }, props)
	  };
	  fi.FiTwitter = function FiTwitter(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>'
	      }, props)
	  };
	  fi.FiType = function FiType(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>'
	      }, props)
	  };
	  fi.FiUmbrella = function FiUmbrella(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>'
	      }, props)
	  };
	  fi.FiUnderline = function FiUnderline(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16"/>'
	      }, props)
	  };
	  fi.FiUnlock = function FiUnlock(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'
	      }, props)
	  };
	  fi.FiUploadCloud = function FiUploadCloud(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m16 16-4-4-4 4M12 12v9"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><path d="m16 16-4-4-4 4"/>'
	      }, props)
	  };
	  fi.FiUpload = function FiUpload(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'
	      }, props)
	  };
	  fi.FiUserCheck = function FiUserCheck(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>'
	      }, props)
	  };
	  fi.FiUserMinus = function FiUserMinus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 11h-6"/>'
	      }, props)
	  };
	  fi.FiUserPlus = function FiUserPlus(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>'
	      }, props)
	  };
	  fi.FiUserX = function FiUserX(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="m18 8 5 5M23 8l-5 5"/>'
	      }, props)
	  };
	  fi.FiUser = function FiUser(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
	      }, props)
	  };
	  fi.FiUsers = function FiUsers(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
	      }, props)
	  };
	  fi.FiVideoOff = function FiVideoOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiVideo = function FiVideo(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m23 7-7 5 7 5V7z"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/>'
	      }, props)
	  };
	  fi.FiVoicemail = function FiVoicemail(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="5.5" cy="11.5" r="4.5"/><circle cx="18.5" cy="11.5" r="4.5"/><path d="M5.5 16h13"/>'
	      }, props)
	  };
	  fi.FiVolume1 = function FiVolume1(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07"/>'
	      }, props)
	  };
	  fi.FiVolume2 = function FiVolume2(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>'
	      }, props)
	  };
	  fi.FiVolumeX = function FiVolumeX(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>'
	      }, props)
	  };
	  fi.FiVolume = function FiVolume(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M11 5 6 9H2v6h4l5 4V5z"/>'
	      }, props)
	  };
	  fi.FiWatch = function FiWatch(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="7"/><path d="M12 9v3l1.5 1.5M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>'
	      }, props)
	  };
	  fi.FiWifiOff = function FiWifiOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="m1 1 22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>'
	      }, props)
	  };
	  fi.FiWifi = function FiWifi(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>'
	      }, props)
	  };
	  fi.FiWind = function FiWind(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'
	      }, props)
	  };
	  fi.FiXCircle = function FiXCircle(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>'
	      }, props)
	  };
	  fi.FiXOctagon = function FiXOctagon(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM15 9l-6 6M9 9l6 6"/>'
	      }, props)
	  };
	  fi.FiXSquare = function FiXSquare(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m9 9 6 6M15 9l-6 6"/>'
	      }, props)
	  };
	  fi.FiX = function FiX(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M18 6 6 18M6 6l12 12"/>'
	      }, props)
	  };
	  fi.FiYoutube = function FiYoutube(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z"/>'
	      }, props)
	  };
	  fi.FiZapOff = function FiZapOff(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M12.41 6.75 13 2l-2.43 2.92M18.57 12.91 21 10h-5.34M8 8l-5 6h9l-1 8 5-6M1 1l22 22"/>'
	      }, props)
	  };
	  fi.FiZap = function FiZap(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>'
	      }, props)
	  };
	  fi.FiZoomIn = function FiZoomIn(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>'
	      }, props)
	  };
	  fi.FiZoomOut = function FiZoomOut(props) {
	      return IconTemplate({
	        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
	        c: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/>'
	      }, props)
	  };
	return fi;
}

var fiExports = requireFi();

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init, env = {}, locals = {}) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    clientAddress: "127.0.0.1",
    env,
    locals,
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

const api = [
  {
    GET: "skip",
    path: "/*404"
  },
  {
    GET: "skip",
    path: "/"
  },
  {
    GET: "skip",
    path: "/about/"
  },
  {
    GET: "skip",
    path: "/sharing/catch-22-experience"
  }
];
function expandOptionals$1(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals$1(suffix).reduce(
    (results, expansion) => [...results, ...prefixes.map((p) => p + expansion)],
    []
  );
}
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      score -= 1;
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.flatMap((route) => {
  const paths = expandOptionals$1(route.path);
  return paths.map((path) => ({ ...route, path }));
}).map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}

function createBeforeLeave() {
    let listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore)
            return !(ignore = false);
        const e = {
            to,
            options,
            defaultPrevented: false,
            preventDefault: () => (e.defaultPrevented = true)
        };
        for (const l of listeners)
            l.listener({
                ...e,
                from: l.location,
                retry: (force) => {
                    force && (ignore = true);
                    l.navigate(to, options);
                }
            });
        return !e.defaultPrevented;
    }
    return {
        subscribe,
        confirm
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "$1");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = (s) => matchFilters === undefined ? undefined : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            const dynamic = segment[0] === ":";
            const key = dynamic ? segment.slice(1) : segment;
            if (dynamic && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            }
            else if (dynamic || !matchSegment(locSegment, segment)) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
            if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
            }
            else {
                return null;
            }
        }
        return match;
    };
}
function matchSegment(input, filter) {
    const isEqual = (s) => s.localeCompare(input, undefined, { sensitivity: "base" }) === 0;
    if (filter === undefined) {
        return true;
    }
    else if (typeof filter === "string") {
        return isEqual(filter);
    }
    else if (typeof filter === "function") {
        return filter(input);
    }
    else if (Array.isArray(filter)) {
        return filter.some(isEqual);
    }
    else if (filter instanceof RegExp) {
        return filter.test(input);
    }
    return false;
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS$1 = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
    const route = useRoute();
    return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
    const router = useRouter();
    return createMemo(() => {
        const to_ = to();
        return to_ !== undefined ? router.renderPath(to_) : to_;
    });
};
const useLocation = () => useRouter().location;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin);
    const pathname = createMemo(() => url().pathname);
    const search = createMemo(() => url().search, true);
    const hash = createMemo(() => url().hash);
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on$1(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath = resolvePath("", base);
    const output = out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    const start = async (callback) => {
        setIsRouting(true);
        try {
            await startTransition(callback);
        }
        finally {
            setIsRouting(false);
        }
    };
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    beforeLeave.confirm(to, options) && utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS$1) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory,
        beforeLeave
    };
}
function createRouteContext(router, parent, child, match, params) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (staticIntegration({
    value: url || ""
  }) );
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return props.children;
    }
  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  const params = createMemoObject(() => {
    const m = matches();
    const params = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params, m[i].params);
    }
    return params;
  });
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on$1(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i], params);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent(Show, {
    get when() {
      return routeStates() && root;
    },
    keyed: true,
    children: route => createComponent(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show, {
    get when() {
      return route.child;
    },
    keyed: true,
    children: child => createComponent(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};
function A$1(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation();
  const isActive = createMemo(() => {
    const to_ = to();
    if (to_ === undefined) return false;
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = normalizePath(location.pathname).toLowerCase();
    return props.end ? path === loc : loc.startsWith(path);
  });
  return ssrElement("a", mergeProps({
    link: true
  }, rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...(props.class && {
          [props.class]: true
        }),
        [props.inactiveClass]: !isActive(),
        [props.activeClass]: isActive(),
        ...rest.classList
      };
    },
    get ["aria-current"]() {
      return isActive() ? "page" : undefined;
    }
  }), undefined, true);
}

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

const ServerContext = createContext({});

const A = A$1;
const Routes = Routes$1;

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash, serverResource) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        return serverResource ? _fn.call(ctx, args[0], ctx) : _fn.call(ctx, ...args);
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

function renderAsync(fn, options) {
  return () => apiRoutes({
    forward: inlineServerFunctions({
      async forward(event) {
        let pageEvent = createPageEvent(event);
        let markup = await renderToStringAsync(() => fn(pageEvent), options);
        if (pageEvent.routerContext && pageEvent.routerContext.url) {
          return redirect(pageEvent.routerContext.url, {
            headers: pageEvent.responseHeaders
          });
        }
        markup = handleIslandsRouting(pageEvent, markup);
        return new Response(markup, {
          status: pageEvent.getStatusCode(),
          headers: pageEvent.responseHeaders
        });
      }
    })
  });
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath || "",
    routerContext: {},
    tags: [],
    env: event.env,
    clientAddress: event.clientAddress,
    locals: event.locals,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");
const MetaProvider = props => {
  const cascadedTagInstances = new Map();
  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }
        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag];
        // track indices synchronously
        cascadedTagInstances.set(tagType, instances);
        return index;
      }
      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
  {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
    };
    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }
  return createComponent(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    id,
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) ;
  });
  {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${tag.props[k]}"`).join("");
    return tag.props.children ? `<${tag.tag} data-sm="${tag.id}"${props}>${
    // Tags might contain multiple text children:
    //   <Title>example - {myCompany}</Title>
    Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children}</${tag.tag}>` : `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props);
const Meta$1 = props => MetaTag("meta", props);

const _tmpl$$8 = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: (e, reset) => {
      return createComponent(Show, {
        get when() {
          return !props.fallback;
        },
        get fallback() {
          return props.fallback && props.fallback(e, reset);
        },
        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorMessage(props) {
  return ssr(_tmpl$$8, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const routeLayouts = {
  "/*404": {
    "id": "/*404",
    "layouts": []
  },
  "/": {
    "id": "/",
    "layouts": []
  },
  "/about/": {
    "id": "/about/",
    "layouts": []
  },
  "/sharing/catch-22-experience": {
    "id": "/sharing/catch-22-experience",
    "layouts": []
  }
};

const _tmpl$$7 = ["<link", " rel=\"stylesheet\"", ">"],
  _tmpl$2$2 = ["<link", " rel=\"modulepreload\"", ">"];
function flattenIslands(match, manifest) {
  let result = [...match];
  match.forEach(m => {
    if (m.type !== "island") return;
    const islandManifest = manifest[m.href];
    if (islandManifest) {
      const res = flattenIslands(islandManifest.assets, manifest);
      result.push(...res);
    }
  });
  return result;
}
function getAssetsFromManifest(manifest, routerContext) {
  let match = routerContext.matches ? routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routeLayouts[fullPath];
      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }
    return memo;
  }, []) : [];
  match.push(...(manifest["entry-client"] || []));
  match = manifest ? flattenIslands(match, manifest) : [];
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$7, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2$2, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}

/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */
function Links() {
  const context = useContext(ServerContext);
  useAssets(() => getAssetsFromManifest(context.env.manifest, context.routerContext));
  return null;
}

function Meta() {
  const context = useContext(ServerContext);
  // @ts-expect-error The ssr() types do not match the Assets child types
  useAssets(() => ssr(renderTags(context.tags)));
  return null;
}

const _tmpl$4 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent(HydrationScript, {}), isIslands , createComponent(NoHydration, {
    get children() {
      return (      ssr(_tmpl$4, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }
  }), isDev ];
}

function Html(props) {
  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [escape(props.children), createComponent(Meta, {}), createComponent(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => escape(props.children) , false);
  }
}

const _tmpl$$6 = ["<main", " class=\"mt-32\"><div class=\"max-w-[500px] mx-auto my-[1rem] text-center\"><h1 class=\"text-5xl my-4 text-slate-100\">! not found<span class=\"text-indigo-500\"> 404 </span>Page</h1><!--#-->", "<!--/--></div></main>"];
function NotFound() {
  return ssr(_tmpl$$6, ssrHydrationKey(), escape(createComponent(A, {
    href: "/",
    "class": "mt-10 block text-sm text-indigo-500 font-bold",
    children: "Go Back Home"
  })));
}

function MetaHead(props) {
  return [createComponent(Meta$1, {
    name: "twitter:site",
    content: "@github"
  }), createComponent(Meta$1, {
    name: "twitter:card",
    content: "summary_large_image"
  }), createComponent(Meta$1, {
    name: "twitter:title",
    get content() {
      return props.title || "";
    }
  }), createComponent(Meta$1, {
    name: "twitter:description",
    get content() {
      return props.body || "";
    }
  }), createComponent(Title, {
    get children() {
      return [props.title || "", " | Lwin Moe Paing "];
    }
  })];
}

const settingStore = persistentAtom(
  "setting",
  {
    darkmode: true
  },
  {
    encode: (value) => {
      return JSON.stringify(value);
    },
    decode: (value) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }
);

const _tmpl$$5 = ["<svg", " xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 343.26 300\"><defs><linearGradient id=\"linear-gradient\" x1=\"106.82\" y1=\"116.42\" x2=\"236.39\" y2=\"116.42\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#5453a3\"></stop><stop offset=\"1\" stop-color=\"#89a7d7\"></stop></linearGradient><linearGradient id=\"linear-gradient-2\" x1=\"217.23\" y1=\"76.02\" x2=\"226.62\" y2=\"76.02\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-3\" x1=\"99.59\" y1=\"116.05\" x2=\"105.03\" y2=\"116.05\" gradientTransform=\"translate(57.81 -32.27) rotate(22.83)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-4\" x1=\"216.61\" y1=\"168.55\" x2=\"220.28\" y2=\"154.58\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#5453a3\"></stop><stop offset=\"1\" stop-color=\"#f0536f\"></stop></linearGradient><linearGradient id=\"linear-gradient-5\" x1=\"75.13\" y1=\"130.13\" x2=\"240.12\" y2=\"130.13\" gradientTransform=\"translate(4.95 -3.41) rotate(-4.06)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-6\" x1=\"55.86\" y1=\"158.27\" x2=\"171.63\" y2=\"158.27\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-7\" x1=\"56.08\" y1=\"211.44\" x2=\"87.59\" y2=\"211.44\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-8\" x1=\"57.4\" y1=\"213.61\" x2=\"85.27\" y2=\"213.61\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-9\" x1=\"56.08\" y1=\"215.15\" x2=\"87.61\" y2=\"215.15\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-10\" x1=\"86.56\" y1=\"214.54\" x2=\"171.73\" y2=\"214.54\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-11\" x1=\"171.63\" y1=\"158.27\" x2=\"287.4\" y2=\"158.27\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-12\" x1=\"255.67\" y1=\"211.44\" x2=\"287.18\" y2=\"211.44\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-13\" x1=\"257.99\" y1=\"213.61\" x2=\"285.86\" y2=\"213.61\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-14\" x1=\"255.65\" y1=\"215.15\" x2=\"287.18\" y2=\"215.15\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-15\" x1=\"171.42\" y1=\"214.54\" x2=\"256.69\" y2=\"214.54\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-16\" x1=\"144.51\" y1=\"107.26\" x2=\"161.18\" y2=\"107.26\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#5453a3\"></stop><stop offset=\"1\" stop-color=\"#f0536f\"></stop></linearGradient><linearGradient id=\"linear-gradient-17\" x1=\"157.17\" y1=\"122.98\" x2=\"168.14\" y2=\"122.98\" gradientTransform=\"translate(325.31 245.96) rotate(-180)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-18\" x1=\"158.42\" y1=\"114.92\" x2=\"117.45\" y2=\"114.92\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-19\" x1=\"498.24\" y1=\"207.31\" x2=\"500.52\" y2=\"207.31\" gradientTransform=\"translate(678.58 302) rotate(-180)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#101130\"></stop><stop offset=\"1\" stop-color=\"#444\"></stop></linearGradient><linearGradient id=\"linear-gradient-20\" x1=\"495.15\" y1=\"200.48\" x2=\"499.32\" y2=\"200.48\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-21\" x1=\"495.48\" y1=\"202.83\" x2=\"501.48\" y2=\"202.83\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-22\" x1=\"495.25\" y1=\"206.38\" x2=\"498.24\" y2=\"206.38\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-23\" x1=\"495.82\" y1=\"201.94\" x2=\"500.61\" y2=\"201.94\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-24\" x1=\"502.29\" y1=\"208.65\" x2=\"505.52\" y2=\"208.65\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-25\" x1=\"491.23\" y1=\"205.69\" x2=\"493.66\" y2=\"205.69\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-26\" x1=\"495.82\" y1=\"215.93\" x2=\"499.32\" y2=\"215.93\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-27\" x1=\"522.23\" y1=\"200.84\" x2=\"524.39\" y2=\"200.84\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-28\" x1=\"643.02\" y1=\"178.94\" x2=\"643.87\" y2=\"178.94\" gradientTransform=\"translate(829.33 285.36) rotate(-180)\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-29\" x1=\"496.41\" y1=\"195.47\" x2=\"497.38\" y2=\"195.47\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-30\" x1=\"491.77\" y1=\"200.84\" x2=\"495.82\" y2=\"200.84\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-31\" x1=\"493.93\" y1=\"212.18\" x2=\"495.25\" y2=\"212.18\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-32\" x1=\"493.66\" y1=\"203.26\" x2=\"495.82\" y2=\"203.26\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-33\" x1=\"493.66\" y1=\"204.75\" x2=\"495.82\" y2=\"204.75\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-34\" x1=\"495.82\" y1=\"209.73\" x2=\"499.59\" y2=\"209.73\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-35\" x1=\"495.82\" y1=\"214.45\" x2=\"499.59\" y2=\"214.45\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-36\" x1=\"495.82\" y1=\"182.86\" x2=\"497.38\" y2=\"182.86\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-37\" x1=\"493.12\" y1=\"197.87\" x2=\"495.82\" y2=\"197.87\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-38\" x1=\"492.31\" y1=\"195.58\" x2=\"494.2\" y2=\"195.58\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-39\" x1=\"495.18\" y1=\"190.62\" x2=\"496.41\" y2=\"190.62\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-40\" x1=\"499.32\" y1=\"215.39\" x2=\"502.55\" y2=\"215.39\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-41\" x1=\"493.98\" y1=\"189.26\" x2=\"496.41\" y2=\"189.26\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-42\" x1=\"492.04\" y1=\"192.17\" x2=\"496.41\" y2=\"192.17\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-43\" x1=\"521.42\" y1=\"203.26\" x2=\"524.66\" y2=\"203.26\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-44\" x1=\"516.3\" y1=\"213.37\" x2=\"520.07\" y2=\"213.37\" href=\"#linear-gradient-19\"></linearGradient><linearGradient id=\"linear-gradient-45\" x1=\"159.07\" y1=\"237.01\" x2=\"189.37\" y2=\"121.84\" href=\"#linear-gradient-4\"></linearGradient><linearGradient id=\"linear-gradient-46\" x1=\"142.91\" y1=\"160.05\" x2=\"205.66\" y2=\"109.9\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#5453a3\"></stop><stop offset=\"0\" stop-color=\"#5953a1\"></stop><stop offset=\"1\" stop-color=\"#f0536f\"></stop></linearGradient><linearGradient id=\"linear-gradient-47\" x1=\"158.79\" y1=\"179.93\" x2=\"221.55\" y2=\"129.78\" href=\"#linear-gradient-46\"></linearGradient><linearGradient id=\"linear-gradient-48\" x1=\"149.55\" y1=\"168.36\" x2=\"212.3\" y2=\"118.21\" href=\"#linear-gradient-46\"></linearGradient><linearGradient id=\"linear-gradient-49\" x1=\"176.93\" y1=\"202.62\" x2=\"239.68\" y2=\"152.48\" href=\"#linear-gradient-46\"></linearGradient><linearGradient id=\"linear-gradient-50\" x1=\"123.07\" y1=\"213.43\" x2=\"141.16\" y2=\"213.43\" href=\"#linear-gradient-4\"></linearGradient><linearGradient id=\"linear-gradient-51\" x1=\"201.66\" y1=\"213.43\" x2=\"219.76\" y2=\"213.43\" href=\"#linear-gradient-4\"></linearGradient><linearGradient id=\"linear-gradient-52\" x1=\"168.32\" y1=\"300.06\" x2=\"184.21\" y2=\"239.69\" href=\"#linear-gradient-4\"></linearGradient><linearGradient id=\"linear-gradient-53\" x1=\"164.96\" y1=\"236.37\" x2=\"178.93\" y2=\"236.37\" href=\"#linear-gradient-4\"></linearGradient><clipPath id=\"clippath\"><path id=\"Pathing\" d=\"M194.48,139.64c1.28,2.16,2.44,3.92,3.35,4.95,2.76,3.11,7.95,10.02,3.45,24.7-4.49,14.68-5.87,19.35-4.15,24.87,1.73,5.53,5.53,8.64,3.45,12.44-2.07,3.8-2.5,4.15-2.5,4.15,0,0,5.01,.52,6.65,2.68s-1.73,10.02-3.02,14.16c-1.3,4.15-2.42,5.96-8.64,6.13s-21.85,0-21.85,0c0,0-15.63,.17-21.85,0-6.22-.17-7.34-1.99-8.64-6.13-1.3-4.15-4.66-12-3.02-14.16s6.65-2.68,6.65-2.68c0,0-.43-.35-2.5-4.15-2.07-3.8,1.73-6.91,3.45-12.44,1.73-5.53,.35-10.19-4.15-24.87-4.49-14.68,.69-21.59,3.45-24.7,.91-1.03,2.07-2.79,3.35-4.95H80.72v160.65h178.82V139.64h-65.06Z\" style=\"", "\"></path></clipPath><mask id=\"mask\" x=\"44.31\" y=\"42.96\" width=\"223.48\" height=\"339.04\" maskUnits=\"userSpaceOnUse\"></mask><radialGradient id=\"radial-gradient\" cx=\"-373.42\" cy=\"624.25\" fx=\"-373.42\" fy=\"624.25\" r=\"115.02\" gradientTransform=\"translate(533.23 842.07) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".41\" stop-color=\"#73cddd\"></stop><stop offset=\"1\" stop-color=\"#7a88c4\"></stop></radialGradient><linearGradient id=\"linear-gradient-54\" x1=\"236.03\" y1=\"160.49\" x2=\"59.22\" y2=\"74.71\" gradientTransform=\"translate(-2.25 338.68) scale(1 -1)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-55\" x1=\"245.84\" y1=\"140.28\" x2=\"69.02\" y2=\"54.5\" gradientTransform=\"translate(-2.25 338.68) scale(1 -1)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-56\" x1=\"254.72\" y1=\"121.98\" x2=\"77.9\" y2=\"36.2\" gradientTransform=\"translate(-2.25 338.68) scale(1 -1)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-57\" x1=\"246.56\" y1=\"138.79\" x2=\"69.75\" y2=\"53.01\" gradientTransform=\"translate(-2.25 338.68) scale(1 -1)\" href=\"#linear-gradient-16\"></linearGradient><radialGradient id=\"radial-gradient-2\" cx=\"-460.02\" cy=\"711.48\" fx=\"-460.02\" fy=\"711.48\" r=\"74.56\" gradientTransform=\"translate(636.85 946.45) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#6f469c\"></stop><stop offset=\"1\" stop-color=\"#ed2224\"></stop></radialGradient><radialGradient id=\"radial-gradient-3\" cx=\"-1087.29\" cy=\"4073.29\" fx=\"-1087.29\" fy=\"4073.29\" r=\"74.56\" gradientTransform=\"translate(701.63 956.85) rotate(-8.69) scale(.36 -.18)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f27792\"></stop><stop offset=\"1\" stop-color=\"#ed2224\"></stop></radialGradient><clipPath id=\"clippath-1\"><ellipse cx=\"104.01\" cy=\"152.23\" rx=\"7.96\" ry=\"3.66\" style=\"", "\"></ellipse></clipPath><radialGradient id=\"radial-gradient-4\" cx=\"101.69\" cy=\"146.11\" fx=\"101.69\" fy=\"146.11\" r=\"14.25\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#cdd19c\"></stop><stop offset=\".13\" stop-color=\"#c6ca98\" stop-opacity=\".84\"></stop><stop offset=\".35\" stop-color=\"#bcc093\" stop-opacity=\".58\"></stop><stop offset=\".45\" stop-color=\"#b9bd92\" stop-opacity=\".48\"></stop><stop offset=\".51\" stop-color=\"#9fa895\" stop-opacity=\".38\"></stop><stop offset=\".64\" stop-color=\"#73839c\" stop-opacity=\".22\"></stop><stop offset=\".77\" stop-color=\"#5269a1\" stop-opacity=\".1\"></stop><stop offset=\".89\" stop-color=\"#3f59a4\" stop-opacity=\".02\"></stop><stop offset=\"1\" stop-color=\"#3954a5\" stop-opacity=\"0\"></stop></radialGradient><clipPath id=\"clippath-2\"><path d=\"M104.15,135.49c-.38,0-.7,.3-.7,.69v16.01s0,.45,.7,.37l.7-.08v-16.29c0-.38-.3-.69-.68-.69,0,0-.01,0-.02,0Z\" style=\"", "\"></path></clipPath><radialGradient id=\"radial-gradient-5\" cx=\"105.19\" cy=\"120\" fx=\"105.19\" fy=\"120\" r=\"23.56\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d8d992\"></stop><stop offset=\".14\" stop-color=\"#cdd19c\"></stop><stop offset=\".24\" stop-color=\"#c6ca98\" stop-opacity=\".84\"></stop><stop offset=\".4\" stop-color=\"#bcc093\" stop-opacity=\".58\"></stop><stop offset=\".48\" stop-color=\"#b9bd92\" stop-opacity=\".48\"></stop><stop offset=\".54\" stop-color=\"#c6caa7\" stop-opacity=\".38\"></stop><stop offset=\".66\" stop-color=\"#dfe1cd\" stop-opacity=\".22\"></stop><stop offset=\".78\" stop-color=\"#f0f1e8\" stop-opacity=\".1\"></stop><stop offset=\".9\" stop-color=\"#fbfbf9\" stop-opacity=\".02\"></stop><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"></stop></radialGradient><linearGradient id=\"linear-gradient-58\" x1=\"74.66\" y1=\"98.79\" x2=\"117.05\" y2=\"132.03\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#f4ee6e\"></stop><stop offset=\".24\" stop-color=\"#f0eb71\"></stop><stop offset=\".42\" stop-color=\"#e7e57a\"></stop><stop offset=\".59\" stop-color=\"#d6da8a\"></stop><stop offset=\".75\" stop-color=\"#bfcaa1\"></stop><stop offset=\".9\" stop-color=\"#a1b7bf\"></stop><stop offset=\"1\" stop-color=\"#89a7d7\"></stop></linearGradient><linearGradient id=\"linear-gradient-59\" x1=\"229.49\" y1=\"-58.4\" x2=\"236.63\" y2=\"-58.4\" gradientTransform=\"translate(134.28 372.4) rotate(-90)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-60\" x1=\"59.98\" y1=\"130.09\" x2=\"65.51\" y2=\"130.09\" gradientTransform=\"translate(-18.67 11.99) rotate(-9.62)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-61\" x1=\"63.64\" y1=\"280.29\" x2=\"72.66\" y2=\"280.29\" gradientTransform=\"translate(-211.41 244.28) rotate(-70.86)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-62\" x1=\"64.41\" y1=\"237.48\" x2=\"66.94\" y2=\"237.48\" gradientTransform=\"translate(250.94 424.69) rotate(146.15)\" href=\"#linear-gradient-16\"></linearGradient><linearGradient id=\"linear-gradient-63\" x1=\"265.07\" y1=\"49.13\" x2=\"275.07\" y2=\"46.36\" href=\"#linear-gradient\"></linearGradient><radialGradient id=\"radial-gradient-6\" cx=\"270.07\" cy=\"47.75\" fx=\"270.07\" fy=\"47.75\" r=\"3.28\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#7180bf\"></stop><stop offset=\".1\" stop-color=\"#6a7abc\" stop-opacity=\".92\"></stop><stop offset=\".29\" stop-color=\"#5a6db4\" stop-opacity=\".71\"></stop><stop offset=\".55\" stop-color=\"#3f58a7\" stop-opacity=\".38\"></stop><stop offset=\".81\" stop-color=\"#21409a\" stop-opacity=\"0\"></stop></radialGradient><linearGradient id=\"linear-gradient-64\" x1=\"268.6\" y1=\"47.75\" x2=\"271.54\" y2=\"47.75\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-65\" x1=\"225.22\" y1=\"151.31\" x2=\"255.47\" y2=\"150.19\" gradientTransform=\"translate(-33.05 69.3) rotate(-15.48)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#d4d4d4\"></stop><stop offset=\"1\" stop-color=\"#fff\"></stop></linearGradient><clipPath id=\"clippath-3\"><polygon points=\"216.68 157 232.45 143.14 248.67 146.49 232.69 161.68 216.68 157\" style=\"", "\"></polygon></clipPath><linearGradient id=\"linear-gradient-66\" x1=\"215.9\" y1=\"153.03\" x2=\"250.96\" y2=\"153.03\" gradientTransform=\"translate(-33.05 69.3) rotate(-15.48)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-67\" x1=\"245.76\" y1=\"136.88\" x2=\"266.3\" y2=\"144.42\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-68\" x1=\"242.23\" y1=\"142.96\" x2=\"245.4\" y2=\"144.12\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-69\" x1=\"268.36\" y1=\"140.19\" x2=\"276.39\" y2=\"138.42\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-70\" x1=\"268.64\" y1=\"141.44\" x2=\"276.67\" y2=\"139.67\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-71\" x1=\"268.84\" y1=\"142.35\" x2=\"276.87\" y2=\"140.57\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-72\" x1=\"269.01\" y1=\"143.14\" x2=\"277.04\" y2=\"141.36\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-73\" x1=\"270.39\" y1=\"145.09\" x2=\"278.42\" y2=\"143.32\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-74\" x1=\"270.48\" y1=\"145.5\" x2=\"278.51\" y2=\"143.72\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-75\" x1=\"270.87\" y1=\"147.24\" x2=\"278.9\" y2=\"145.46\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-76\" x1=\"271.08\" y1=\"148.21\" x2=\"279.11\" y2=\"146.44\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><linearGradient id=\"linear-gradient-77\" x1=\"271.17\" y1=\"148.63\" x2=\"279.21\" y2=\"146.86\" gradientTransform=\"translate(28.32 -46.07) rotate(9.85)\" href=\"#linear-gradient\"></linearGradient><clipPath id=\"clippath-4\"><rect x=\"164.34\" y=\"223.98\" width=\"14.16\" height=\"5.82\" rx=\"2.75\" ry=\"2.75\" style=\"", "\"></rect></clipPath><linearGradient id=\"linear-gradient-78\" x1=\"-385.22\" y1=\"515.19\" x2=\"-385\" y2=\"509.96\" gradientTransform=\"translate(-213.47 -279.65) rotate(-180) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#010101\" stop-opacity=\".5\"></stop><stop offset=\"1\" stop-color=\"#010101\" stop-opacity=\".8\"></stop></linearGradient><linearGradient id=\"linear-gradient-79\" x1=\"171.05\" y1=\"83.77\" x2=\"171.27\" y2=\"78.54\" gradientTransform=\"translate(0 302) scale(1 -1)\" href=\"#linear-gradient-78\"></linearGradient><clipPath id=\"clippath-5\"><circle cx=\"167.6\" cy=\"226.89\" r=\"2.26\" style=\"", "\"></circle></clipPath><clipPath id=\"clippath-6\"><circle cx=\"172.21\" cy=\"226.89\" r=\"2.26\" style=\"", "\"></circle></clipPath></defs><g id=\"Cycle\"><circle id=\"Inner_Cycle\" data-name=\"Inner Cycle\" cx=\"171.6\" cy=\"116.42\" r=\"64.54\" style=\"", "\"></circle><g id=\"Inner_Icons\" data-name=\"Inner Icons\"><circle cx=\"221.93\" cy=\"76.02\" r=\"4.69\" style=\"", "\"></circle><circle cx=\"107.07\" cy=\"114.39\" r=\"2.72\" style=\"", "\"></circle><circle cx=\"218.69\" cy=\"160.63\" r=\"3.78\" style=\"", "\"></circle></g><g><circle id=\"Outter_Cycles\" data-name=\"Outter Cycles\" cx=\"171.4\" cy=\"115.24\" r=\"82\" style=\"", "\"></circle><g id=\"Icon_Path\" data-name=\"Icon Path\"><g id=\"Html\"><path d=\"M176.22,36.96c-.18-.07-.35-.13-.53-.2-.84-.3-1.68-.6-2.52-.91-.14-.05-.29-.1-.43-.15-.03,0-.04-.02-.04-.05,0-.49-.01-.98-.02-1.48,0-.45-.01-.9-.02-1.36,0-.49-.02-.98-.02-1.47,0-.49-.01-.98-.02-1.47,0-.49-.01-.98-.02-1.47,0-.45-.01-.9-.02-1.36,0-.13,0-.27,0-.4,0-.05,0-.06,.06-.06,.94,.07,1.88,.14,2.83,.21,1.97,.15,3.93,.3,5.9,.44,.07,0,.07,0,.06,.07-.05,.29-.1,.58-.15,.87-.05,.29-.1,.59-.15,.88-.05,.29-.09,.57-.14,.86-.05,.29-.1,.59-.15,.88-.05,.28-.09,.57-.14,.85-.05,.29-.1,.59-.15,.88-.05,.29-.09,.58-.14,.86-.05,.29-.1,.58-.15,.87-.05,.29-.09,.58-.14,.86-.05,.29-.1,.58-.14,.87,0,.05-.02,.1-.02,.15,0,.04-.02,.05-.05,.05-.32,.06-.64,.13-.97,.19-.88,.17-1.77,.35-2.65,.52,0,0-.02,0-.02,0h-.03Z\" style=\"", "\"></path><path d=\"M176.86,28.77c.03-.35,.05-.69,.08-1.04,0-.05,.01-.06,.06-.06,1.17,.09,2.33,.18,3.5,.26,.05,0,.06,.02,.05,.06-.02,.1-.04,.2-.05,.31-.01,.09-.03,.18-.04,.27-.03,.14-.05,.29-.07,.43-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.09-.03,.18-.04,.27-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.09-.03,.18-.04,.28-.02,.14-.05,.28-.07,.42-.02,.09-.03,.19-.04,.28-.02,.14-.05,.27-.07,.41-.02,.1-.03,.19-.04,.29,0,.05-.02,.08-.08,.09-.35,.07-.71,.14-1.06,.21-.3,.06-.6,.12-.91,.18-.31,.06-.62,.12-.93,.19-.03,0-.03-.01-.03-.03,0-.09,.01-.18,.02-.27,.02-.26,.04-.51,.06-.77,0-.02,0-.05,0-.07,0-.01,.02-.02,.03-.02,.27-.06,.55-.11,.82-.16,.46-.09,.92-.18,1.39-.28,.07-.01,.07-.01,.08-.08,.06-.33,.11-.65,.16-.98,.05-.29,.1-.58,.14-.86,.05-.32,.11-.65,.16-.97,.02-.13,.04-.26,.06-.39,.01-.07,0-.07-.06-.08-.44-.03-.87-.07-1.31-.1-.39-.03-.78-.06-1.18-.09-.22-.01-.45-.03-.67-.05-.24-.02-.47-.03-.71-.05-.03,0-.06,0-.07-.03,.03-.02,.06-.01,.09,0,.41,.03,.82,.06,1.24,.09,.01,0,.02,0,.03,0q.08,0,.09-.08c.02-.31,.05-.62,.07-.94,0-.03,0-.06,.02-.08,.03-.02,.07-.01,.1,0,.81,.06,1.63,.12,2.44,.18,.02,0,.05,0,.07,0,.03,0,.05-.01,.05-.04,.04-.22,.08-.45,.11-.67,.02-.1,.03-.2,.05-.29,0-.05,0-.06-.05-.07-.02,0-.04,0-.06,0-.85-.06-1.69-.13-2.54-.19-.03,0-.07,0-.1-.03Z\" style=\"", "\"></path><path d=\"M175.23,30.9s.04,0,.06,.01c.47,.04,.93,.07,1.4,.11,.02,.02,.01,.05,.01,.07-.02,.32-.05,.65-.07,.97,0,.02,0,.04-.01,.06,0,0,0,0,0,0-.02,0-.04,0-.07,0-.78-.06-1.57-.12-2.35-.18-.05,0-.06-.02-.06-.07,0-.33,0-.66-.01-.99,0-.41-.01-.81-.02-1.22,0-.35,0-.71-.02-1.06,0-.05,.02-.05,.06-.04,.89,.07,1.77,.13,2.66,.2,.02,0,.05,0,.07,0,.02,0,.04,0,.07,0,.88,.07,1.76,.13,2.64,.2,.05,0,.06,.02,.05,.07-.06,.33-.11,.66-.17,1,0,.05-.04,.04-.07,.04-.68-.05-1.35-.1-2.03-.15-.19-.01-.39-.03-.58-.04-.03,.02-.06,.01-.09,0-.45-.03-.91-.07-1.36-.1-.1,0-.09,0-.09,.09,0,.25,0,.51,.01,.76,0,.06,0,.11,0,.17,0,.03,0,.06-.01,.09Z\" style=\"", "\"></path><path d=\"M176.4,35.04s-.01,0-.02,0c-.3-.11-.6-.22-.9-.33-.42-.15-.84-.3-1.26-.46-.04-.01-.05-.03-.05-.07,0-.34,0-.68-.01-1.02,0-.21,0-.41,0-.62,0-.04,0-.06,.06-.06,.33,.03,.67,.05,1,.08,.04,0,.05,.02,.05,.06,0,.27,0,.53,0,.8,0,.02,0,.04,.03,.05,.39,.14,.78,.27,1.17,.41,0,0,.01,0,.02,0,0,0,0,0,0,0,0,.02,0,.05,0,.07-.03,.34-.05,.68-.08,1.02,0,.02,0,.03,0,.05Z\" style=\"", "\"></path><path d=\"M176.48,33.89c.04-.59,.09-1.18,.13-1.77h0s.05-.01,.07-.01c.41,.03,.81,.06,1.22,.09,.08,0,.08,.01,.07,.09-.04,.26-.09,.53-.13,.79-.03,.17-.06,.34-.08,.51,0,.06-.02,.07-.08,.08-.38,.07-.76,.14-1.14,.22-.02,0-.05,.01-.07,0h0Z\" style=\"", "\"></path><path d=\"M176.48,33.9c.4-.08,.79-.15,1.19-.22,.06-.01,.07-.03,.08-.09,.05-.29,.09-.58,.14-.87,.03-.15,.05-.31,.08-.46,0-.02,0-.03-.02-.03-.01,0-.02,0-.04,0-.41-.03-.83-.06-1.24-.09-.02,0-.04,0-.06,0,.03-.37,.06-.73,.08-1.1,.02,0,.04,0,.06,0,.82,.06,1.63,.12,2.45,.18,.05,0,.07,0,.06,.07-.09,.52-.17,1.04-.26,1.56-.08,.5-.17,1-.25,1.5-.01,.07-.03,.14-.03,.21,0,.04-.02,.05-.06,.06-.57,.11-1.13,.22-1.7,.34-.18,.04-.37,.07-.55,.11-.02-.02,0-.04,0-.06,.03-.36,.05-.72,.08-1.09Z\" style=\"", "\"></path><path d=\"M175.23,30.9c0-.08,0-.16,0-.24,0-.27,0-.54-.01-.81,0-.01,0-.03,0-.04,0-.04,.01-.05,.05-.04,.31,.02,.62,.05,.94,.07,.19,.01,.39,.03,.58,.05-.03,.35-.05,.71-.08,1.06,0,.05-.02,.06-.07,.06-.44-.04-.89-.07-1.33-.1-.02,0-.05,0-.07,0Z\" style=\"", "\"></path></g><g id=\"Css\"><path d=\"M249.51,106.09l8.8-1.35,.6,8.65-8.89-.14-1.27-3.45,.76-3.71Z\" style=\"", "\"></path><path d=\"M249.6,109.74l8.17-.58,.24,3.56-7.36-.12-1.06-2.87Z\" style=\"", "\"></path><path d=\"M256.92,111.91l-.39-5.48-1.06,.22,.18,2.6-1.28-2.48-1.02,.22,.27,3.77-1.45-.03-.34-1.26,.21-1.18,.81-.15-.08-1.06-1.69,.26-.47,2.32,.85,2.14,3.35,.04-.16-2.31,1.22,2.44,1.04-.07Z\" style=\"", "\"></path></g><g id=\"Javascript\"><path d=\"M221.06,187.06c.14,.44-.05,.47-.19,.56-.79,.51-1.58,1.02-2.37,1.53-.86,.55-1.72,1.11-2.57,1.66-.04,.03-.08,.05-.13,.07-.5,.28-.97,.61-1.45,.92-.56,.36-1.13,.73-1.69,1.09-.08,.05-.15,.12-.25,.11l-.1-.08c-.16-.42-.4-.79-.63-1.17-.58-.95-1.08-1.96-1.61-2.94-.41-.77-.82-1.54-1.23-2.31-.45-.84-.89-1.69-1.34-2.53-.09-.16-.07-.32,.05-.45,.74-.87,1.48-1.74,2.25-2.59,.36-.4,.8-.69,1.34-.82,.11-.03,.21-.08,.32-.12,.98-.32,1.96-.62,2.94-.92,.22-.07,.38,0,.51,.17,.77,1.04,1.57,2.06,2.36,3.08,.77,1.01,1.55,2.01,2.32,3.02,.39,.52,.75,1.06,1.13,1.59,.06,.08,.07,.2,.33,.1Z\" style=\"", "\"></path><path d=\"M215.8,190.86s.06-.03,.09-.04c.04,0,.04,0,.02,.03-1.1,.71-2.2,1.42-3.3,2.13-.05,.03-.1,.13-.19,.07,.02-.06,.08-.08,.13-.11,1.04-.67,2.08-1.34,3.12-2.01,.04-.03,.08-.06,.13-.06Z\" style=\"", "\"></path><path d=\"M215.8,190.86c-1.12,.73-2.25,1.46-3.37,2.19l-.03-.04c1.04-.67,2.08-1.34,3.12-2.01,.09-.06,.17-.13,.28-.13Z\" style=\"", "\"></path><path d=\"M218.49,189.14c.86-.56,1.73-1.12,2.59-1.69,.04,.12-.08,.1-.12,.13-.81,.53-1.63,1.06-2.45,1.59-.04,0-.04,0-.02-.03Z\" style=\"", "\"></path><path d=\"M218.49,189.14s.02,.02,.02,.03l-2.6,1.68s-.02-.02-.02-.03c.86-.56,1.73-1.12,2.59-1.68Z\" style=\"", "\"></path><path d=\"M213.55,185.38c.82,1.26,1.63,2.52,2.45,3.78q.19,.29-.09,.47c-1,.65-2,1.3-3.01,1.94-.25,.16-.3,.14-.44-.13-.42-.81-.85-1.61-1.27-2.42-.39-.74-.77-1.49-1.16-2.23-.31-.58-.63-1.16-.94-1.74-.16-.29-.3-.59-.46-.89-.06-.12-.02-.2,.05-.29,.7-.8,1.39-1.6,2.08-2.41,.14-.17,.21-.1,.3,.05,.83,1.28,1.66,2.56,2.48,3.85Z\" style=\"", "\"></path><path d=\"M213.77,184.89c-.67-1.03-1.34-2.07-2.01-3.1-.16-.24-.16-.25,.11-.33,.83-.28,1.67-.55,2.5-.84,.26-.09,.34,0,.57,.8,.67,.62,.77,.76,.5,.86-.14,.05-.27,.11-.41,.17q-.37,.16-.59-.19t-.66-.21-.17,.53c1.04,1.6,2.07,3.21,3.11,4.81,.13,.19,.13,.3-.09,.41-.14,.07-.26,.17-.39,.25-.34,.22-.28,.25-.51-.1-.66-1.02-1.32-2.04-1.98-3.06Z\" style=\"", "\"></path><path d=\"M212.64,190.38c-.16-.4-.38-.77-.48-1.19,.36-.3,.77-.52,1.16-.77,.17-.11,.19-.19,.08-.36-.29-.42-.56-.84-.82-1.27-.08-.13-.14-.14-.27-.06-.35,.24-.71,.47-1.07,.69-.06,.04-.11,.12-.21,.09-.11-.19-.22-.39-.33-.58-.12-.14-.23-.28-.28-.46-.18-.44-.47-.82-.69-1.24-.2-.37-.42-.74-.64-1.1-.08-.13-.06-.21,.04-.31,.55-.56,1.1-1.13,1.65-1.7,.11-.11,.17-.11,.26,.03,.16,.26,.32,.51,.49,.76,.08,.12,.06,.19-.02,.3-.32,.39-.62,.79-.94,1.18-.1,.12-.12,.22-.03,.37,.23,.38,.44,.76,.65,1.15,.07,.12,.1,.13,.21,.03,.4-.36,.81-.7,1.22-1.06,.09-.08,.14-.08,.21,.02,.81,1.27,1.63,2.54,2.44,3.81-.01,.04-.05,.06-.08,.09-.8,.51-1.59,1.03-2.39,1.54-.04,.02-.07,.07-.13,.04Z\" style=\"", "\"></path><path d=\"M211.02,187.52c.43-.27,.86-.53,1.28-.81,.13-.09,.2-.07,.28,.06,.29,.46,.59,.92,.89,1.38,.08,.11,.07,.17-.05,.25-.42,.26-.84,.53-1.26,.8,.12-.2,.35-.27,.52-.39,.19-.14,.39-.27,.6-.39,.16-.09,.19-.19,.08-.35-.27-.39-.52-.79-.77-1.19-.09-.15-.18-.18-.33-.07-.32,.22-.64,.42-.97,.63-.08,.05-.16,.13-.27,.09Z\" style=\"", "\"></path><path d=\"M212.64,190.38c.87-.56,1.73-1.11,2.6-1.67-.02,.09-.1,.13-.16,.17-.73,.47-1.46,.94-2.19,1.42-.07,.05-.14,.11-.24,.08Z\" style=\"", "\"></path><path d=\"M210.4,186.48c.09,.15,.19,.3,.28,.46-.15-.12-.26-.26-.28-.46Z\" style=\"", "\"></path></g><g id=\"React\"><path d=\"M114.33,167.58l.22-.02c.48-.03,.91,.06,1.25,.42,.37,.38,.6,.84,.66,1.37,.05,.45,.12,.89,.06,1.34-.03,.21,.06,.32,.27,.38,.51,.16,1.01,.35,1.45,.67,.46,.34,.84,.74,.9,1.35l.02,.22c0,.91-.58,1.43-1.24,1.9-.22,.16-.46,.3-.71,.39-.25,.09-.29,.24-.23,.48,.14,.56,.19,1.12,.13,1.7-.06,.58-.27,1.09-.75,1.45-.18,.13-.37,.21-.6,.21-.16,.01-.33,.03-.49,.04-.63,.08-1.17-.19-1.7-.48-.2-.11-.37-.33-.58-.31-.2,.01-.33,.25-.5,.39-.51,.42-1.07,.74-1.75,.82l-.39,.03c-1-.1-1.51-.58-1.74-1.59-.11-.48-.15-.96-.1-1.45,.02-.23-.05-.33-.27-.4-.72-.23-1.39-.55-1.92-1.12-.26-.27-.37-.59-.45-.94l-.03-.34c.04-.86,.61-1.37,1.24-1.83,.26-.19,.53-.35,.82-.49,.16-.07,.19-.17,.15-.33-.13-.56-.22-1.12-.15-1.7,.07-.61,.27-1.15,.8-1.51,.38-.26,.82-.24,1.24-.25,.69-.02,1.25,.33,1.82,.67,.36,.22,.28,.29,.67-.07,.54-.5,1.14-.91,1.89-1.02Z\" style=\"", "\"></path><path d=\"M109.23,177.47c-.06-.44-.03-.84,.03-1.24,.02-.17-.02-.21-.18-.25-.7-.17-1.36-.4-1.92-.88-.61-.53-.67-1.15-.16-1.77,.46-.55,1.06-.88,1.71-1.15,.18-.07,.25-.13,.18-.36-.21-.63-.32-1.27-.23-1.93,.11-.9,.67-1.29,1.56-1.1,.64,.14,1.2,.46,1.72,.85,.18,.14,.29,.17,.47-.03,.4-.45,.86-.83,1.41-1.09,.96-.44,1.71-.04,1.92,.99,.12,.58,.12,1.15,.04,1.73-.03,.19,0,.29,.22,.34,.67,.15,1.32,.37,1.86,.82,.64,.54,.69,1.14,.16,1.78-.45,.54-1.04,.87-1.68,1.14-.18,.08-.22,.14-.16,.35,.2,.67,.33,1.35,.19,2.05-.17,.84-.7,1.18-1.53,1.02-.67-.13-1.24-.48-1.76-.89-.16-.13-.24-.13-.38,.03-.47,.52-1,.95-1.67,1.2-.76,.28-1.33,.02-1.63-.72-.07-.17-.13-.35-.14-.54,0-.12-.02-.24-.03-.33Z\" style=\"", "\"></path><path d=\"M112.69,175.62c-.16,.01-.32,0-.48,.04-.46,.13-.75-.07-.99-.45-.23-.38-.49-.73-.74-1.09-.09-.13-.11-.24-.04-.39,.22-.54,.47-1.06,.74-1.57,.08-.14,.17-.2,.33-.22,.55-.04,1.1-.09,1.65-.14,.17-.02,.29,.03,.39,.16,.36,.47,.7,.95,1.01,1.45,.07,.11,.07,.19,.03,.31-.23,.56-.49,1.09-.76,1.63-.07,.14-.16,.19-.31,.2-.28,.02-.56,.05-.84,.07,0,0,0,0,0,0Z\" style=\"", "\"></path><path d=\"M109.05,172.57c.1-.04,.1,.05,.13,.1,.18,.41,.37,.81,.59,1.2,.05,.08,.04,.16,0,.24-.14,.4-.27,.81-.36,1.23-.03,.14-.08,.18-.23,.15-.56-.14-1.09-.32-1.57-.65-.58-.41-.62-.88-.1-1.36,.42-.4,.92-.66,1.45-.88,.03-.01,.05-.02,.08-.03Z\" style=\"", "\"></path><path d=\"M109.69,177.48c0-.43,0-.82,.06-1.21,.02-.15,.07-.15,.2-.15,.44,.03,.87,.05,1.31,.07,.11,0,.17,.06,.23,.13,.28,.33,.58,.64,.89,.93,.07,.06,.12,.11,.03,.2-.45,.47-.93,.9-1.55,1.13-.53,.2-.83,.05-1.02-.49-.07-.21-.11-.43-.15-.62Z\" style=\"", "\"></path><path d=\"M115.33,170.14c.02,.34,0,.71-.04,1.08-.01,.12-.05,.22-.21,.19-.41-.07-.84-.08-1.25-.1-.12,0-.2-.05-.28-.14-.28-.3-.57-.6-.85-.89-.05-.05-.16-.09-.06-.2,.49-.52,.99-1.02,1.71-1.22,.31-.09,.53-.01,.7,.26,.19,.3,.25,.64,.29,1.03Z\" style=\"", "\"></path><path d=\"M115.9,176.79c.05,.37,.04,.71-.08,1.04-.12,.33-.35,.47-.7,.43-.72-.09-1.28-.48-1.85-.89-.09-.06-.06-.11,0-.18,.26-.34,.5-.7,.71-1.08,.06-.1,.14-.15,.26-.18,.41-.09,.82-.19,1.22-.3,.15-.04,.2,0,.24,.14,.09,.34,.2,.68,.2,1.02Z\" style=\"", "\"></path><path d=\"M109.86,169.24c.49,0,.98,.27,1.45,.57,.57,.36,.56,.37,.17,.92-.11,.16-.23,.32-.32,.5-.11,.24-.29,.34-.54,.38-.34,.05-.68,.14-1,.25-.1,.03-.2,.05-.25-.09-.19-.63-.33-1.27-.22-1.93,.07-.39,.26-.56,.7-.59Z\" style=\"", "\"></path><path d=\"M117.87,173.28c.02,.18-.05,.34-.15,.47-.44,.57-1.05,.88-1.69,1.16-.12,.05-.13-.03-.16-.09-.18-.41-.38-.81-.61-1.2-.06-.1-.03-.17,0-.27,.12-.39,.24-.78,.35-1.18,.04-.14,.09-.18,.23-.14,.54,.13,1.06,.3,1.53,.61,.23,.16,.46,.33,.5,.64Z\" style=\"", "\"></path><path d=\"M114.41,175.36c.2-.43,.38-.81,.56-1.22,.19,.27,.3,.57,.44,.85,.05,.1,0,.14-.09,.16-.29,.07-.57,.19-.92,.2Z\" style=\"", "\"></path><path d=\"M110.15,174.54c.29,.41,.53,.76,.79,1.13-.33,.03-.64-.02-.94-.04-.11,0-.12-.05-.1-.14,.08-.29,.16-.59,.25-.94Z\" style=\"", "\"></path><path d=\"M112.07,176.19l1.33-.11c-.14,.3-.33,.53-.51,.78-.05,.06-.08,.09-.15,.03-.23-.21-.47-.42-.67-.7Z\" style=\"", "\"></path><path d=\"M113,171.29l-1.34,.11c.14-.3,.33-.54,.52-.78,.05-.07,.11-.06,.16,0,.21,.22,.42,.43,.65,.67Z\" style=\"", "\"></path><path d=\"M114.1,171.83c.34-.02,.64,.03,.94,.07,.1,.01,.12,.07,.09,.16-.08,.29-.16,.57-.25,.89-.27-.38-.51-.73-.78-1.12Z\" style=\"", "\"></path><path d=\"M110.05,173.36c-.15-.32-.27-.58-.39-.84-.05-.1-.03-.16,.08-.19,.29-.07,.56-.19,.89-.2-.19,.4-.36,.78-.57,1.23Z\" style=\"", "\"></path><path d=\"M113.55,173.66c.05,.59-.37,1.08-.97,1.12-.57,.04-1.08-.41-1.12-.98-.04-.57,.39-1.05,.97-1.1,.6-.05,1.07,.35,1.12,.96Z\" style=\"", "\"></path></g><g><path d=\"M99.25,86.19s-.04-.05-.06-.07c-.01-.06,0-.11,.04-.16,.08-.07,.15-.2,.29-.1-.07,.11-.14,.23-.21,.34-.02,0-.04,0-.06,0Z\" style=\"", "\"></path><path d=\"M93.55,83.66c-.27-.08-.48-.26-.7-.42-.5-.47-.6-1.09-.66-1.72-.1-1.12,.17-2.19,.53-3.23,.27-.63,.56-1.25,.88-1.86,.37-.69,.79-1.34,1.24-1.97,.06-.08,.12-.22,.28-.14,.14,.45,.28,.9,.42,1.36,.02,.07,.02,.16,.12,.18-.19,.43,0,.63,.37,.89,.52,.35,1.01,.74,1.51,1.11,.24,.18,.41,.42,.45,.73-.02,.31-.14,.61-.21,.91-.08,.22-.04,.45-.12,.67-.08,.24-.16,.28-.39,.18-.24-.1-.41-.31-.59-.49-.28-.29-.65-.43-.96-.67-.19-.15-.45-.19-.64-.45-.03,.67,.02,1.25,.08,1.83,.04,.42,0,.83-.19,1.23-.19,.39-.46,.77-.35,1.25,.02,.1,0,.21-.1,.26-.14,.08-.15,.22-.19,.35-.26,.17-.52-.02-.78,0Z\" style=\"", "\"></path><path d=\"M92.79,78.26c-.28,.85-.52,1.71-.56,2.6-.03,.74,.06,1.49,.48,2.14,.05,.07,.09,.15,.13,.23-.77-.43-1.54-.87-2.24-1.41-.52-.4-.7-1.03-.79-1.67-.14-1,.04-1.98,.35-2.93,.11-.32,.16-.67,.37-.95,.21,.01,.34,.14,.41,.33,.06,.14,.14,.16,.28,.12,.48-.13,.6-.06,.71,.41,.04,.16,.1,.17,.23,.1,.23-.13,.44-.05,.63,.09,.18,.13,.12,.31,.09,.49-.03,.15-.06,.3-.1,.45Z\" style=\"", "\"></path><path d=\"M92.79,78.26c.01-.18,.01-.36,.05-.53,.03-.14,.07-.27-.08-.36-.17-.1-.34-.21-.54-.08-.27,.17-.31,.16-.33-.15-.02-.35-.23-.49-.56-.36-.22,.09-.4,.15-.44-.19-.02-.18-.24-.19-.33-.31,.39-1.04,.96-1.98,1.56-2.9,.14-.21,.3-.41,.45-.62,.06-.09,.11-.13,.21-.06,.77,.5,1.55,1.01,2.32,1.51,.02,.02,.03,.07,.04,.1-.36,.2-.49,.59-.71,.9-.46,.64-.8,1.37-1.17,2.06-.17,.32-.25,.67-.44,.98Z\" style=\"", "\"></path><path d=\"M94.31,83.64c-.04-.17-.12-.35,.17-.38,.1-.01,.09-.14,.07-.23-.07-.3-.01-.57,.15-.84,.26-.44,.47-.95,.4-1.46-.06-.44-.03-.88-.13-1.31-.05-.22,.07-.44-.01-.66-.02-.04,0-.1,.06-.12,.07-.02,.11,.02,.15,.06,.33,.35,.79,.5,1.17,.77,.22,.16,.42,.36,.62,.54,.03,.03,.06,.06,.08,.09,.11,.14,.28,.24,.43,.22,.16-.02,.09-.25,.15-.38,.07-.14-.03-.32,.08-.45,.06,.05,.08,.12,.07,.19-.08,.79,.18,1.53,.37,2.28,.05,.24,.18,.47,.16,.73-.09,.22-.22,.17-.32,.02-.12-.19-.28-.29-.47-.38-.21-.1-.43-.22-.58-.4-.34-.42-.86-.57-1.29-.93,.02,.6,.23,1.12,.34,1.67,0,.03,0,.06-.02,.08-.34,.14-.49,.47-.75,.7h0c-.13,.05-.28,.04-.36,.18-.04,.01-.07,.02-.11,.04-.14,0-.29,.07-.43-.02Z\" style=\"", "\"></path><path d=\"M100.84,76.77c.06,0,.12-.04,.17,.01,.12,.19,.36,.27,.42,.5,.03,.12-.04,.18-.13,.24-.18,.11-.26,.27-.25,.47,.01,.79-.32,1.52-.45,2.29-.04,.22-.26,.32-.31,.53-.19,.75-.48,1.48-.64,2.25-.06,.3-.02,.61-.11,.91-.02,.08-.01,.18-.07,.22-.33,.2-.35,.55-.45,.86-.18,.05-.18-.11-.21-.2-.07-.17-.07-.37-.14-.54-.1-.36-.24-.72-.26-1.1-.06-.26,.09-.46,.19-.68,.29-.69,.53-1.4,.78-2.1,.23-.63,.39-1.28,.55-1.93,.11-.44,.26-.85,.47-1.25,.06-.11,.07-.25,.12-.37,.07-.17,.17-.24,.34-.11Z\" style=\"", "\"></path><path d=\"M100.84,76.77c-.14-.05-.24-.02-.27,.15-.08,.33-.17,.66-.43,.91-.03,.03-.05,.09-.05,.13,0,.67-.29,1.29-.46,1.92-.15,.56-.32,1.12-.57,1.66-.16,.33-.21,.71-.4,1.03-.12,.2-.21,.4-.19,.63-.25-.08-.16-.32-.22-.48,0-.25-.14-.47-.16-.71-.17-.53,.01-1.02,.2-1.5,.35-.93,.57-1.9,.86-2.84,.11-.35,.22-.72,.53-.97,.26-.17,.57-.13,.86-.19,.14,.04,.23,.14,.29,.27Z\" style=\"", "\"></path><path d=\"M102.03,78.41c.13,.22,.09,.47,.12,.71-.04,.25-.02,.51-.04,.76-.06,.34-.16,.67-.14,1.02,0,.02-.02,.04-.03,.06-.12,.13-.09,.31-.14,.46-.13,.26-.22,.54-.27,.83h0c-.19,.35-.38,.7-.48,1.1-.04,.06-.07,.13-.11,.19-.14,.08-.15,.23-.2,.36-.11,.2-.23,.41-.34,.61-.06,.04-.12,.1-.2,.05-.09-.06-.17,0-.25,.02-.08,.02-.16,0-.2-.08-.04-.08-.03-.17,.04-.21,.27-.17,.29-.42,.33-.71,.04-.27,.11-.58,.38-.77,.09-.06,.1-.16,.07-.24-.14-.33-.05-.66,.01-.99,.04-.18,.06-.37,.07-.55,0-.04,.01-.09,.03-.13,.04-.18,.13-.32,.29-.42,.24-.15,.28-.42,.37-.65,.07-.2,.15-.35,.4-.25,.08,.03,.14,.02,.14-.08,0-.08-.03-.15-.12-.12-.15,.05-.25,.02-.29-.14-.06-.21-.06-.44,.13-.56,.15-.09,.22-.2,.27-.35,.07-.04,.1,.03,.14,.06Z\" style=\"", "\"></path><path d=\"M100.75,80.91s0,.08,0,.12c-.05,.22-.05,.45-.24,.6-.04,.03-.05,.09-.05,.14,.02,.55-.27,1.02-.44,1.52-.11,.32-.24,.62-.32,.95-.02,.1-.06,.21,0,.28,.19,.19,.07,.36-.02,.53-.07,.14-.16,.27-.21,.42-.05,.17-.17,.21-.32,.16-.19-.16-.25-.35-.15-.58,0-.2,.04-.39,.08-.58,.01-.06,.02-.13,.08-.15,.39-.13,.35-.49,.37-.78,.03-.59,.21-1.15,.39-1.71,.11-.35,.21-.71,.31-1.06,.02-.06,0-.14,.04-.17,.44-.32,.32-.85,.48-1.28,.18-.49,.25-1,.25-1.53,0-.17,.12-.27,.28-.34,.06-.03,.19-.07,.1-.2,.22-.06,.21,.19,.34,.25,.04,.08,.08,.16,.12,.23,.03,.13,.08,.26,.02,.4-.22,.31-.43,.61-.48,1.01-.07,.49-.31,.92-.48,1.38-.04,.12-.07,.26-.13,.38Z\" style=\"", "\"></path><path d=\"M99,85.06c.03,.19,.03,.38,.16,.54,.2,.1,.11,.27,.1,.42-.02,.03-.04,.07-.06,.1-.37-.23-.73-.45-1.1-.68-.09-.13-.23-.19-.37-.24-.04,0-.08,0-.09-.05-.05-.15-.19-.15-.31-.2-.04-.09-.17-.03-.21-.12-.12-.12-.25-.23-.42-.27-.2-.07-.28-.24-.33-.41-.14-.43-.16-.89-.36-1.31,0-.03-.04-.05-.04-.09,0-.02,0-.04,0-.06,.03-.09,0-.21,.13-.24,.12-.02,.18,.07,.22,.17,.08,.2,.3,.36,.18,.63,.09-.15,.22-.17,.35-.12,.24,.08,.48,.19,.66,.38,.09,.1,.22,.17,.3,.28,.23,.28,.61,.35,.87,.59,.03,.03,.03-.08,.08-.09,.14,.24,.08,.56,.27,.78Z\" style=\"", "\"></path><path d=\"M97.93,78.56c-.11-.46-.48-.69-.83-.94-.36-.26-.76-.48-1.05-.82-.1-.11-.25-.09-.36-.19-.27-.22-.3-.41-.09-.7,.02-.02,.03-.05,.05-.07,.07-.17,.24-.23,.37-.33,.5,.42,1.04,.78,1.6,1.11,.14,.08,.25,.18,.35,.31,.07,.1,.14,.19,.23,.27q.33,.28,.18,.66c-.06,.17-.14,.34-.24,.5-.05,.08-.07,.19-.2,.18Z\" style=\"", "\"></path><path d=\"M98.31,77.86c.04-.09,.08-.18,.11-.27,.03-.09,.04-.18-.09-.2-.08-.01-.15-.05-.2-.12-.4-.59-1.05-.84-1.59-1.23-.19-.14-.41-.28-.52-.52,.18-.31,.48-.44,.8-.55,.1,.03,.22,0,.28,.13,.07,.16,.22,.19,.37,.2,.04,0,0,0,.03,0,.15,.03,.38,.05,.37,.22-.02,.22-.25,.08-.39,.11-.02,0-.04,0,0,0,.33,.08,.73,.11,1,.48,.16,.22,.37,.43,.62,.59,.08,.05,.13,.12,.13,.22-.01,.11-.09,.17-.16,.24-.19,.17-.37,.34-.52,.56-.05,.08-.11,.17-.23,.13Z\" style=\"", "\"></path><path d=\"M99.17,76.95c-.16-.27-.46-.4-.64-.65-.02-.03-.08-.04-.09-.07-.26-.48-.73-.47-1.18-.54-.05,0-.09-.02-.19-.04,.27-.16,.53,.01,.79-.11-.12-.09-.22-.14-.35-.16-.19-.02-.42,.03-.48-.26-.01-.06-.14-.09-.21-.14,.47-.17,.93-.18,1.37,.09,.07,.12,.2,.14,.31,.19,.17,.04,.28,.19,.43,.26,.1,.14,.27,.17,.41,.24,.41,.24,.83,.45,1.22,.73-.03,.08-.12,.13-.19,.12-.23-.03-.44,.07-.65,.11-.19,.05-.29,.31-.54,.22Z\" style=\"", "\"></path><path d=\"M99.25,86.02c-.1-.13,.03-.3-.1-.42,.14,.01,.24,0,.26-.19,.02-.22,.24-.37,.29-.6,0-.04,.1-.08,.04-.12-.34-.2-.13-.47-.07-.67,.18-.56,.41-1.11,.63-1.67,.05-.13,.06-.25,.06-.37,0-.22,0-.43,.24-.56,.15-.08,.02-.29,.15-.39,0,.31-.08,.62-.13,.92-.03,.18-.05,.35,.04,.54,.07,.15,.09,.31-.15,.47-.2,.13-.35,.48-.3,.77,.06,.3-.1,.45-.3,.58-.08,.06-.13,.11-.09,.18,.05,.09,.13,.09,.21,0,.12-.14,.21-.1,.24,.08,0,.28-.23,.45-.35,.67-.05,.09-.11,.18-.15,.28-.1,.09-.18,.2-.23,.33-.13-.01-.18,.11-.27,.17Z\" style=\"", "\"></path><path d=\"M95.95,82.75s.03,.06,.04,.09c-.2,.05-.27,.26-.42,.37-.12,.08-.19,.22-.35,.25,.19-.29,.3-.66,.73-.7Z\" style=\"", "\"></path><path d=\"M101.06,83.35c-.05-.16-.07-.31,.09-.43,.18-.14,.08-.42,.25-.57,.04-.04,.07-.09,.13-.11-.11,.39-.3,.74-.48,1.1Z\" style=\"", "\"></path><path d=\"M99.75,85.52c0-.11,.02-.2,.09-.29,.16-.21,.28-.44,.41-.66,.05-.02,.1-.03,.16-.05-.19,.35-.4,.69-.66,1Z\" style=\"", "\"></path><path d=\"M101.98,80.9c-.08-.35-.04-.69,.11-1.01,.01-.02,.02-.02,.03-.02,0,0,.01,.01,.01,.02,0,.34-.09,.67-.16,1.01Z\" style=\"", "\"></path><path d=\"M94.31,83.64c.14,0,.29,.02,.43,.02-.4,.16-.8,.13-1.2,0,.25-.12,.51,.13,.77-.01Z\" style=\"", "\"></path><path d=\"M101.69,77.51c-.16-.03-.19-.23-.34-.25-.03-.22-.33-.25-.34-.48,.29,.19,.55,.4,.68,.73Z\" style=\"", "\"></path><path d=\"M101.79,78.17c0-.14,.01-.28,.02-.42,.17,.19,.19,.43,.22,.67-.04-.02-.09-.04-.13-.06-.06-.04-.15-.08-.11-.18Z\" style=\"", "\"></path><path d=\"M101.54,82.26c-.03-.31,.09-.58,.25-.83,.01-.02,.02-.03,.04-.02,.01,0,.02,.01,.02,.02-.11,.27-.16,.57-.31,.83Z\" style=\"", "\"></path><path d=\"M102.13,79.9s-.03,0-.05,0c.02-.26-.04-.52,.07-.77,.02,.26,0,.52-.02,.77Z\" style=\"", "\"></path><path d=\"M94.85,83.63c.04-.22,.2-.21,.36-.18-.09,.11-.23,.15-.36,.18Z\" style=\"", "\"></path><path d=\"M97.72,85.19c.19-.02,.32,.05,.37,.24-.14-.06-.27-.13-.37-.24Z\" style=\"", "\"></path><path d=\"M97.32,84.94c.14,.01,.34-.08,.31,.2-.12-.05-.22-.1-.31-.2Z\" style=\"", "\"></path><path d=\"M101.84,81.43s-.03,0-.05,0c.02-.17-.03-.35,.16-.46-.03,.15-.07,.31-.1,.46Z\" style=\"", "\"></path><path d=\"M96.68,84.56c.21-.02,.34,.09,.42,.27-.14-.09-.28-.18-.42-.27Z\" style=\"", "\"></path><path d=\"M100.76,83.91c0-.16-.01-.32,.2-.36-.05,.13-.1,.26-.2,.36Z\" style=\"", "\"></path><path d=\"M99.33,75.77c-.18-.01-.33-.06-.41-.24,.15,.05,.29,.14,.41,.24Z\" style=\"", "\"></path><path d=\"M98.49,75.26c-.14,0-.3,.02-.31-.19,.12,.04,.22,.1,.31,.19Z\" style=\"", "\"></path><path d=\"M99.17,76.95c.2-.02,.32-.25,.54-.22-.27,.36-.47,.74-.52,1.19-.02,.19-.09,.38-.17,.52-.22,.4-.19,.85-.36,1.26-.18,.43-.28,.88-.48,1.31-.15,.33-.02,.67-.09,.99-.27-.81-.48-1.63-.39-2.5,.07-.31,.14-.62,.22-.94,.17-.21,.27-.46,.38-.7,.29-.31,.55-.64,.86-.92Z\" style=\"", "\"></path><path d=\"M98.73,84.27c0,.06-.02,.13-.02,.2-.33-.26-.73-.38-1.02-.67-.2-.2-.38-.44-.68-.54-.2-.07-.4-.22-.53,.09-.02,.05-.1,.08-.15,.03-.05-.05,0-.09,.03-.12,.17-.11,.11-.22,.02-.34-.04-.06-.09-.13-.12-.2-.03-.09-.05-.21-.16-.22-.11,0-.07,.15-.15,.19-.18-.46-.28-.95-.36-1.44-.02-.12-.02-.25-.03-.36,.09-.05,.12,.01,.16,.05,.21,.19,.43,.36,.71,.45,.28,.09,.4,.39,.62,.56,.21,.16,.42,.33,.68,.39,.19,.04,.21,.22,.3,.33,.06,.08,.11,.23,.23,.04,.16,.12,.06,.36,.22,.48,.04,.37,.17,.72,.26,1.07Z\" style=\"", "\"></path><path d=\"M101.79,78.17c.03,.06,.12,.09,.11,.18,0,.18,.05,.35-.23,.39-.16,.02-.2,.48-.09,.61,.08,.08,.12,0,.17-.03,.08-.07,.16-.06,.2,.02,.06,.12,.04,.25,0,.37-.04,.1-.12,.02-.17,0-.21-.13-.29-.08-.36,.16-.09,.29-.14,.64-.5,.77-.14,.05-.08,.22-.18,.29,.01-.47,.26-.87,.39-1.31,.02-.05,.07-.1,.07-.16,.02-.41,.21-.77,.36-1.14,.04-.1,.11-.16,.23-.14Z\" style=\"", "\"></path><path d=\"M100.59,83.59c.05,.16,.1,.25,.04,.35,0,.01-.07,.02-.07,.01-.07-.1-.04-.19,.03-.36Z\" style=\"", "\"></path></g></g></g></g><g id=\"Desk\" style=\"", "\"><polyline points=\"171.63 143.3 130.91 143.3 56.18 158.94 86.67 173.24 132.46 162.63 171.63 162.63\" style=\"", "\"></polyline><polygon points=\"56.18 158.94 56.18 163.83 83.92 176.8 85.17 262.75 87.49 263.94 86.67 173.16 56.18 158.94\" style=\"", "\"></polygon><polygon points=\"84.49 258.6 61.42 246.56 61.42 166.28 57.5 164.45 57.5 246.3 85.17 262.75 85.11 258.93 84.49 258.6\" style=\"", "\"></polygon><polygon points=\"57.5 164.45 57.5 246.3 87.49 263.94 86.71 266.4 56.18 248.7 56.52 163.92 57.5 164.45\" style=\"", "\"></polygon><polygon points=\"171.52 166.9 132.97 165.72 89.68 175.34 90.54 262.75 89.33 265.71 86.71 266.4 87.49 263.94 86.67 173.24 132.46 162.63 171.63 162.63 171.52 166.9\" style=\"", "\"></polygon><polyline points=\"171.63 143.3 212.35 143.3 287.08 158.94 256.59 173.24 210.8 162.63 171.63 162.63\" style=\"", "\"></polyline><polygon points=\"287.08 158.94 287.08 163.83 259.34 176.8 258.09 262.75 255.77 263.94 256.59 173.16 287.08 158.94\" style=\"", "\"></polygon><polygon points=\"258.77 258.6 281.84 246.56 281.84 166.28 285.76 164.45 285.76 246.3 258.09 262.75 258.15 258.93 258.77 258.6\" style=\"", "\"></polygon><polygon points=\"285.76 164.45 285.76 246.3 255.77 263.94 256.54 266.4 287.08 248.7 286.74 163.92 285.76 164.45\" style=\"", "\"></polygon><polygon points=\"171.52 166.9 210.29 165.72 253.58 175.34 252.72 262.75 253.92 265.71 256.54 266.4 255.77 263.94 256.59 173.24 210.8 162.63 171.63 162.63 171.52 166.9\" style=\"", "\"></polygon></g><g id=\"Human_With_Chair\" data-name=\"Human With Chair\"><g id=\"Lcd\"><rect x=\"135.27\" y=\"96.23\" width=\"70.72\" height=\"50.51\" rx=\"5.61\" ry=\"5.61\" style=\"", "\"></rect><rect x=\"138.18\" y=\"99.76\" width=\"64.9\" height=\"37.6\" rx=\"1.91\" ry=\"1.91\" style=\"", "\"></rect></g><g id=\"Keyboard\"><rect x=\"144.51\" y=\"105.16\" width=\"16.67\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"163.18\" y=\"105.16\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"175.84\" y=\"105.16\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"170.13\" y=\"120.88\" width=\"4.21\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" transform=\"translate(344.47 245.96) rotate(180)\" style=\"", "\"></rect><rect x=\"157.17\" y=\"120.88\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" transform=\"translate(325.31 245.96) rotate(180)\" style=\"", "\"></rect><rect x=\"144.51\" y=\"120.88\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" transform=\"translate(299.99 245.96) rotate(180)\" style=\"", "\"></rect><rect x=\"140.69\" y=\"112.81\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"153.26\" y=\"112.81\" width=\"14.45\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"169.2\" y=\"112.81\" width=\"18.58\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"150.32\" y=\"129.03\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"162.98\" y=\"129.03\" width=\"10.96\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"175.56\" y=\"129.03\" width=\"18.58\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect><rect x=\"189.27\" y=\"112.81\" width=\"10.71\" height=\"4.21\" rx=\"1.88\" ry=\"1.88\" style=\"", "\"></rect></g><g id=\"Shirt\"><path d=\"M172.38,132.1c2.5,.25,10.29-2.15,9.19-2.41s-2.52-6-2.52-6l-.57-2.21s-5.8,1.61-6.51,1.53c-.7,.08-6.96-1.53-6.96-1.53l-.57,2.21s-1.42,5.75-2.52,6,6.69,2.66,9.19,2.41\" style=\"", "\"></path><path d=\"M137.17,150.58l-2.04,12.7s-.18,10.68,3.85,8.65,7.08-11.47,7.08-11.47l-8.9-9.88Z\" style=\"", "\"></path><path d=\"M206.09,150.58l2.04,12.7s.18,10.68-3.85,8.65-7.08-11.47-7.08-11.47l8.9-9.88Z\" style=\"", "\"></path><path d=\"M171.84,131.52s6.04-1.11,9.19-2.2,2.72,0,2.72,0c0,0,10.13,1.96,14.28,5.34,4.14,3.38,6.54,9.26,6.54,9.26l2.29,8.28s-2.07,2.51-6.1,3.16c-4.03,.65-8.5,1.09-8.5,1.09l-2.9-5.78s.91,23,0,29.43-2.11,6.76-8.87,6.87c-6.76,.11-8.68,0-8.68,0h-.1s-1.93,.11-8.68,0c-6.76-.11-7.96-.44-8.87-6.87s0-29.43,0-29.43l-2.9,5.78s-4.47-.44-8.5-1.09-6.1-3.16-6.1-3.16l2.29-8.28s2.4-5.89,6.54-9.26,14.28-5.34,14.28-5.34c0,0-.43-1.09,2.72,0s9.19,2.2,9.19,2.2\" style=\"", "\"></path></g><g id=\"Stable_Hairs\" data-name=\"Stable Hairs\"><ellipse cx=\"171.62\" cy=\"111.2\" rx=\"10.3\" ry=\"13.96\" style=\"", "\"></ellipse><polygon points=\"157.43 111.54 157.5 111.45 157.57 111.62 157.43 111.54\" style=\"", "\"></polygon><polygon points=\"177.44 98.88 177.37 98.87 177.38 98.83 177.44 98.88\" style=\"", "\"></polygon><polygon points=\"177.38 98.83 177.37 98.87 177.38 98.82 177.38 98.83\" style=\"", "\"></polygon><polygon points=\"177.37 98.87 177.36 98.81 177.38 98.82 177.37 98.87\" style=\"", "\"></polygon><polygon points=\"178.99 89.98 180.33 99.41 178.05 95.1 178.99 89.98\" style=\"", "\"></polygon><polygon points=\"159.58 109.11 159.58 108.84 159.63 109.01 157.5 111.45 157.43 111.27 156.89 106.42 161.79 106.53 159.58 109.11\" style=\"", "\"></polygon><polygon points=\"177.84 94.56 180.33 99.4 177.16 98.81 177.1 98.75 177.84 94.56\" style=\"", "\"></polygon><polygon points=\"161.79 104.59 161.79 106.53 156.89 106.42 162.76 101.68 161.79 104.59\" style=\"", "\"></polygon><polygon points=\"156.89 106.42 157.96 103.72 162.76 101.68 156.89 106.42\" style=\"", "\"></polygon><polygon points=\"183.43 103.37 179.26 100.7 182.76 99.68 183.43 103.37\" style=\"", "\"></polygon><polygon points=\"183.57 103.56 181.31 104.64 180.34 102.7 179.37 100.76 183.54 103.42 183.57 103.56\" style=\"", "\"></polygon><polygon points=\"183.1 99.73 177.7 99.43 177.1 98.6 180.33 99.41 183.1 99.73\" style=\"", "\"></polygon><polygon points=\"183.33 91.56 182.76 99.68 180.33 99.41 183.33 91.56\" style=\"", "\"></polygon><polygon points=\"183.49 103.72 182.17 108.47 181.2 104.59 183.46 103.51 183.49 103.72\" style=\"", "\"></polygon><polygon points=\"179.26 100.7 177.97 99.41 182.76 99.68 179.26 100.7\" style=\"", "\"></polygon><polygon points=\"176.29 92.4 173.91 98.76 173.84 98.76 173.06 95.37 176.29 92.4\" style=\"", "\"></polygon><polygon points=\"173.84 98.76 170.97 98.76 173.06 95.37 173.84 98.76\" style=\"", "\"></polygon><polygon points=\"174.14 91.33 176.29 92.4 173.06 95.37 174.14 91.33\" style=\"", "\"></polygon><polygon points=\"170.87 98.76 168.58 98.76 168.48 98.87 170.09 95.91 170.87 98.76\" style=\"", "\"></polygon><polygon points=\"173.06 95.37 170.97 98.76 170.87 98.76 170.09 95.91 173.06 95.37\" style=\"", "\"></polygon><polygon points=\"170.09 95.91 171.17 92.13 173.06 95.37 170.09 95.91\" style=\"", "\"></polygon><polygon points=\"171.17 92.13 174.14 91.33 173.06 95.37 171.17 92.13\" style=\"", "\"></polygon><polygon points=\"167.67 94.02 170.63 88.9 170.09 95.91 167.67 94.02\" style=\"", "\"></polygon><polygon points=\"170.63 88.9 176.02 87.28 171.17 92.13 170.09 95.91 170.63 88.9\" style=\"", "\"></polygon><polygon points=\"177.36 98.81 177.32 98.76 176.34 98.76 173.91 98.76 176.29 92.4 177.36 98.81\" style=\"", "\"></polygon><polygon points=\"170.09 95.91 168.48 98.87 167.67 94.02 170.09 95.91\" style=\"", "\"></polygon><polygon points=\"187.34 94.83 184.92 97.79 184.92 94.83 187.34 94.83\" style=\"", "\"></polygon><polygon points=\"180.87 85.4 182.76 85.13 179.26 87.01 180.87 85.4\" style=\"", "\"></polygon><polygon points=\"161.74 118.55 159.85 116.93 160.82 113.32 161.74 118.55\" style=\"", "\"></polygon><polygon points=\"154.19 101.57 156.08 100.22 156.35 102.11 154.19 101.57\" style=\"", "\"></polygon><path d=\"M186.26,109.11l-.81-5.39s1.08,3.77,.81,5.39Z\" style=\"", "\"></path><polygon points=\"159.85 116.93 157.57 111.62 160.82 113.32 159.85 116.93\" style=\"", "\"></polygon><polygon points=\"157.96 103.72 156.35 102.11 156.08 100.22 157.16 98.06 157.96 103.72\" style=\"", "\"></polygon><polygon points=\"181.2 106.53 181.2 104.59 182.17 108.47 181.2 106.53\" style=\"", "\"></polygon><polygon points=\"162.76 101.68 157.96 103.72 157.16 98.06 162.76 101.68\" style=\"", "\"></polygon><polygon points=\"159.72 108.91 161.79 106.53 160.82 109.44 159.72 108.91\" style=\"", "\"></polygon><polygon points=\"164.7 100.7 162.76 101.68 157.16 98.06 167.61 99.73 164.7 100.7\" style=\"", "\"></polygon><polygon points=\"184.55 113.98 182.76 118.55 182.17 114.29 184.55 113.98\" style=\"", "\"></polygon><polygon points=\"184.92 99.41 186.8 102.91 182.76 99.68 184.92 99.41\" style=\"", "\"></polygon><polygon points=\"183.57 88.09 184.65 88.09 183.33 91.56 183.57 88.09\" style=\"", "\"></polygon><polygon points=\"184.65 88.09 185.19 91.06 184.92 94.83 182.76 99.68 184.65 88.09\" style=\"", "\"></polygon><polygon points=\"184.92 97.79 184.92 99.41 182.76 99.68 184.92 97.79\" style=\"", "\"></polygon><polygon points=\"184.92 94.83 184.92 97.79 182.76 99.68 184.92 94.83\" style=\"", "\"></polygon><polygon points=\"183.33 91.56 184.65 88.09 182.76 99.68 183.33 91.56\" style=\"", "\"></polygon><polygon points=\"180.33 99.41 180.88 95.91 182.22 87.28 183.57 88.09 183.33 91.56 180.33 99.41\" style=\"", "\"></polygon><polygon points=\"180.88 95.91 180.33 99.41 178.99 89.98 182.76 85.13 180.33 91.33 180.88 95.91\" style=\"", "\"></polygon><polygon points=\"179.26 87.01 182.76 85.13 178.99 89.98 179.26 87.01\" style=\"", "\"></polygon><polygon points=\"180.33 91.33 182.76 85.13 182.22 87.28 180.88 95.91 180.33 91.33\" style=\"", "\"></polygon><path d=\"M186.26,109.11c-.27,1.62-1.08,3.23-1.08,3.23l-.59,1.5-1.2-2.66,2.87-2.08Z\" style=\"", "\"></path><polygon points=\"186.8 102.91 187.34 107.5 185.45 103.72 182.76 99.68 186.8 102.91\" style=\"", "\"></polygon><polygon points=\"167.67 94.02 168.48 98.87 164.97 94.83 167.67 94.02\" style=\"", "\"></polygon><polygon points=\"181.2 118.17 182.76 118.55 181.2 120.11 181.2 119.14 181.2 118.17\" style=\"", "\"></polygon><polygon points=\"159.72 108.91 160.82 109.44 160.82 113.32 159.63 109.01 159.72 108.91\" style=\"", "\"></polygon><polygon points=\"178.05 95.1 177.91 94.83 177.38 98.82 177.36 98.81 176.29 92.4 179.26 87.01 178.99 89.98 178.05 95.1\" style=\"", "\"></polygon><polygon points=\"183.57 103.45 183.43 103.37 182.76 99.68 185.45 103.72 184.38 108.58 183.57 103.45\" style=\"", "\"></polygon><polygon points=\"185.45 103.72 186.26 109.11 184.38 108.58 185.45 103.72\" style=\"", "\"></polygon><polygon points=\"183.57 103.17 184.92 108.5 186.53 109.11 181.95 108.58 183.57 103.17\" style=\"", "\"></polygon><polygon points=\"183.3 111.27 182.17 114.29 182.17 111.38 182.17 108.47 183.4 111.2 183.3 111.27\" style=\"", "\"></polygon><polygon points=\"160.82 113.32 157.57 111.62 157.5 111.45 159.63 109.01 160.82 113.32\" style=\"", "\"></polygon><polygon points=\"162.28 87.28 164.16 87.01 162.01 89.71 162.28 87.28\" style=\"", "\"></polygon><polygon points=\"159.04 96.99 158.5 90.79 162.01 89.71 159.04 96.99\" style=\"", "\"></polygon><polygon points=\"162.01 89.71 164.16 87.01 164.97 88.9 164.97 94.83 162.01 89.71\" style=\"", "\"></polygon><polygon points=\"164.97 88.9 166.32 89.71 164.97 94.83 164.97 88.9\" style=\"", "\"></polygon><polygon points=\"164.97 94.83 166.32 89.71 167.67 94.02 164.97 94.83\" style=\"", "\"></polygon><polygon points=\"164.97 94.83 168.48 98.87 165.51 96.72 164.97 94.83\" style=\"", "\"></polygon><polygon points=\"161.74 94.56 167.61 99.73 159.04 96.99 162.01 89.71 161.74 94.56\" style=\"", "\"></polygon><polygon points=\"168.48 98.87 167.61 99.73 165.51 96.72 168.48 98.87\" style=\"", "\"></polygon><polygon points=\"162.01 89.71 164.97 94.83 165.51 96.72 167.61 99.73 161.74 94.56 162.01 89.71\" style=\"", "\"></polygon><polygon points=\"170.63 88.9 174.67 85.4 178.45 85.94 176.02 87.28 170.63 88.9\" style=\"", "\"></polygon><polygon points=\"171.17 92.13 176.02 87.28 179.26 87.01 174.14 91.33 171.17 92.13\" style=\"", "\"></polygon><polygon points=\"172.52 85.94 174.67 85.4 170.63 88.9 172.52 85.94\" style=\"", "\"></polygon><polygon points=\"169.89 87.53 172.52 85.94 170.63 88.9 169.89 87.53\" style=\"", "\"></polygon><polygon points=\"178.45 85.94 179.26 87.01 176.02 87.28 178.45 85.94\" style=\"", "\"></polygon><polygon points=\"170.63 88.9 167.67 94.02 166.32 89.71 169.89 87.53 170.63 88.9\" style=\"", "\"></polygon><polygon points=\"174.14 91.33 179.26 87.01 176.29 92.4 174.14 91.33\" style=\"", "\"></polygon><polygon points=\"166.32 89.71 168.75 85.4 169.89 87.53 166.32 89.71\" style=\"", "\"></polygon><polygon points=\"182.17 114.29 182.76 118.55 181.2 118.17 182.17 114.29\" style=\"", "\"></polygon><polygon points=\"183.3 111.27 183.4 111.2 184.6 113.85 184.55 113.98 182.17 114.29 183.3 111.27\" style=\"", "\"></polygon><polygon points=\"182.17 108.47 186.53 109.11 183.4 111.2 182.17 108.47\" style=\"", "\"></polygon><g><path d=\"M162.3,119.77l.3,1.76-.15,1.3,.88-1.53,.89,2.09v1.21l.84-1.3,.6,1.3v1.11l1.11-1.02,1.26,.83s1.15,.32,1.2,.65,0,.83,0,.83v-1.99l1.5,.79,.64,1.21,.28-1.21s-1.86-1.62-2-1.81-.42-1.99-.42-1.99l-1.62,1.39-1.06-1.48-.47-2.6s-.88-.28-.88,0-.67-.74-.67-.74l-.95-5.54,2.3-5.6,2.16-3.33-2.96,2.92-1.54,2.09-.92,2.38-.3,2.31-.38,2.09-1.48,.81\" style=\"", "\"></path><polygon points=\"168.72 100.68 168.97 107.14 167.24 104.52 167.67 108.17 165.89 105.68 166.56 115.09 165.08 112.77 165.22 110.35 163.09 108.99 164.25 102.74 166.79 99.37 168.22 98.85 168.72 100.68\" style=\"", "\"></polygon><polygon points=\"170.18 98.7 168.88 102.64 168.36 99.67 167.68 103.53 166.82 101.61 166.82 106.15 165.18 103.66 164.4 105.02 163.23 103.11 163.88 99.35 164.85 100 165.7 100.16 166.7 98.68 167.5 99.62 167.68 98.81 168.88 98 169.58 98.68 170.18 98.7\" style=\"", "\"></polygon><polygon points=\"164.9 100.19 164.06 106.83 162.88 103.34 163.01 108.66 161.18 106.28 161.66 102.89 162.15 101.43 164.9 100.19\" style=\"", "\"></polygon><polygon points=\"161.69 108.44 163.2 111.42 163.2 113.95 163.36 116.39 162.53 114.6 162.32 117.91 161.38 118.14 160.44 115.9 160.44 113.63 159.67 113.82 160.44 107.72 161.5 106.5 161.69 108.44\" style=\"", "\"></polygon><polygon points=\"160.61 117.91 161.56 120.02 161.25 122.25 162.77 120.44 162.32 117.91 160.61 117.91\" style=\"", "\"></polygon><polygon points=\"162.88 102.49 165.36 110.32 163.59 108.23 164.68 112.44 161.5 109.3 161.45 106.62 161.72 105.11 162.77 106.8 162.88 102.49\" style=\"", "\"></polygon></g><g><path d=\"M180.71,118.88l-.3,1.76,.15,1.3-.88-1.53-.89,2.09v1.21l-.84-1.3-.6,1.3v1.11l-1.11-1.02-1.26,.83s-1.15,.32-1.2,.65,0,.83,0,.83v-1.99l-1.5,.79-.64,1.21-.28-1.21s1.86-1.62,2-1.81,.42-1.99,.42-1.99l1.62,1.39,1.06-1.48,.47-2.6s.88-.28,.88,0,.67-.74,.67-.74l.95-5.54-2.3-5.6-2.16-3.33,2.96,2.92,1.54,2.09,.92,2.38,.3,2.31,.38,2.09,1.48,.81\" style=\"", "\"></path><polygon points=\"174.28 99.79 174.04 106.25 175.77 103.63 175.33 107.28 177.11 104.8 176.44 114.2 177.92 111.88 177.79 109.47 179.91 108.1 178.76 101.86 176.21 98.49 174.79 97.97 174.28 99.79\" style=\"", "\"></polygon><polygon points=\"172.83 97.82 174.12 101.75 174.65 98.79 175.32 102.64 176.18 100.73 176.18 105.27 177.83 102.78 178.61 104.14 179.77 102.22 179.12 98.47 178.15 99.11 177.3 99.28 176.3 97.79 175.51 98.74 175.32 97.93 174.12 97.12 173.42 97.79 172.83 97.82\" style=\"", "\"></polygon><polygon points=\"178.11 99.31 178.94 105.95 180.13 102.46 179.99 107.78 181.83 105.4 181.34 102 180.86 100.55 178.11 99.31\" style=\"", "\"></polygon><polygon points=\"181.31 107.55 179.8 110.54 179.8 113.07 179.64 115.51 180.48 113.72 180.68 117.03 181.62 117.26 182.56 115.02 182.56 112.75 183.34 112.94 182.56 106.83 181.5 105.61 181.31 107.55\" style=\"", "\"></polygon><polygon points=\"182.39 117.03 181.44 119.14 181.76 121.37 180.24 119.56 180.68 117.03 182.39 117.03\" style=\"", "\"></polygon><polygon points=\"180.13 101.61 177.65 109.44 179.41 107.35 178.32 111.56 181.5 108.42 181.56 105.73 181.29 104.23 180.24 105.92 180.13 101.61\" style=\"", "\"></polygon></g></g><g id=\"Animation_Hairs\" data-name=\"Animation Hairs\"><polygon points=\"186.13 91.33 186.67 94.83 184.24 94.83 186.13 91.33\" style=\"", "\"></polygon><polygon points=\"188.15 97.79 184.92 99.41 184.92 97.79 188.15 97.79\" style=\"", "\"></polygon><polygon points=\"177.21 83.24 178.45 85.94 174.67 85.4 177.21 83.24\" style=\"", "\"></polygon><polygon points=\"155.54 98.6 153.92 97.25 157.16 98.06 156.08 100.22 154.19 99.41 155.54 98.6\" style=\"", "\"></polygon><polygon points=\"163.62 85.13 162.28 87.28 160.93 86.47 163.62 85.13\" style=\"", "\"></polygon><polygon points=\"157.16 98.06 157.16 96.99 156.35 95.91 157.96 96.18 159.04 96.99 167.61 99.73 157.16 98.06\" style=\"", "\"></polygon><polygon points=\"158.5 90.79 160.93 86.47 162.28 87.28 162.01 89.71 158.5 90.79\" style=\"", "\"></polygon><polygon points=\"168.75 85.4 173.11 83.24 172.52 85.94 169.89 87.53 168.75 85.4\" style=\"", "\"></polygon></g><g id=\"Chair\"><g><path d=\"M189.27,277.25l-.27,1.58s1.66,.62,3.81,.27,5.93-.71,6.82-1.51,.76-3.16-.16-2.58-9.37,2.4-10.19,2.24Z\" style=\"", "\"></path><path d=\"M198.3,270.82s.85-.88,1.61,.35-.12,4.55-.12,4.55\" style=\"", "\"></path><path d=\"M189,269.97s-.06,3.73,.72,4.85l-.72,.79,.36,1.52s2.17,.79,5.71,0c3.54-.79,4.53-1.37,4.58-1.52s.04-2.16-.26-2.36-.65,.25-.65,.25c0,0-.25-3.92-.66-5.32s-1.29-.69-1.29-.69c0,0-6.3,2.73-7.79,2.48Z\" style=\"", "\"></path><path d=\"M190.89,265.18s-1.16,1.59-.63,2.2,1.27,1.03,3.47,.48,2.24-3.05,2.24-3.05c0,0,.02-.98,.69-.61s1.33,1.33,1.33,1.91,0,1.95-1.67,2.78-3.8,1.97-5.07,1.52-3.2-.23-3-1.82,1.19-3.04,1.91-3.23\" style=\"", "\"></path><path d=\"M194.34,200.62s10.17-6.99,13.04,.98c3.22,8.96-8.98,46.66-8.98,46.66,0,0-4.58,13.05-2.1,15.8,1.55,1.72-2.77,4.51-4.56,3.86-1.07-.39-2.03-.81-2.03-.81,0,0-1.8-.13-.81-11.12,.99-10.99,2.64-43.59-4.15-41.82l9.59-13.54Z\" style=\"", "\"></path></g><g><path d=\"M155.22,276.94l.27,1.58s-1.66,.62-3.81,.27c-2.14-.35-5.93-.71-6.82-1.51s-.76-3.16,.16-2.58,9.37,2.4,10.19,2.24Z\" style=\"", "\"></path><path d=\"M146.19,270.51s-.85-.88-1.61,.35,.12,4.55,.12,4.55\" style=\"", "\"></path><path d=\"M155.5,269.67s.06,3.73-.72,4.85l.72,.79-.36,1.52s-2.17,.79-5.71,0c-3.54-.79-4.53-1.37-4.58-1.52s-.04-2.16,.26-2.36,.65,.25,.65,.25c0,0,.25-3.92,.66-5.32s1.29-.69,1.29-.69c0,0,6.3,2.73,7.79,2.48Z\" style=\"", "\"></path><path d=\"M153.61,264.88s1.16,1.59,.63,2.2-1.27,1.03-3.47,.48-2.24-3.05-2.24-3.05c0,0-.02-.98-.69-.61s-1.33,1.33-1.33,1.91,0,1.95,1.67,2.78c1.67,.83,3.8,1.97,5.07,1.52s3.2-.23,3-1.82-1.19-3.04-1.91-3.23\" style=\"", "\"></path><path d=\"M150.15,200.32s-10.17-6.99-13.04,.98c-3.22,8.96,8.98,46.66,8.98,46.66,0,0,4.58,13.05,2.1,15.8-1.55,1.72,2.77,4.51,4.56,3.86,1.07-.39,2.03-.81,2.03-.81,0,0,1.8-.13,.81-11.12-.99-10.99-2.64-43.59,4.15-41.82l-9.59-13.54Z\" style=\"", "\"></path></g><g><path d=\"M204.92,213.4c-1.64-2.16-6.65-2.68-6.65-2.68,0,0,.43-.35,2.5-4.15,2.07-3.8-1.73-6.91-3.45-12.44s-.35-10.19,4.15-24.87c4.49-14.68-.69-21.59-3.45-24.7-2.76-3.11-7.77-12.95-11.75-20.21-3.97-7.25-14.85-5.01-14.85-5.01,0,0-10.88-2.25-14.85,5.01-3.97,7.25-8.98,17.1-11.75,20.21-2.76,3.11-7.95,10.02-3.45,24.7,4.49,14.68,5.87,19.35,4.15,24.87-1.73,5.53-5.53,8.64-3.45,12.44,2.07,3.8,2.5,4.15,2.5,4.15,0,0-5.01,.52-6.65,2.68s1.73,10.02,3.02,14.16c1.3,4.15,2.42,5.96,8.64,6.13,6.22,.17,21.85,0,21.85,0,0,0,15.63,.17,21.85,0s7.34-1.99,8.64-6.13c1.3-4.15,4.66-12,3.02-14.16Zm-37.35-65.55c-3.45,.46-12.41,.43-13.33-.09s-2.22-2.1-1.76-3.14c.46-1.04,12.26-8.2,14.68-7.69s2.5,1.15,2.56,2.19c0,0,1.3,8.26-2.16,8.72Zm21.49-.09c-.92,.52-9.87,.55-13.33,.09s-2.16-8.72-2.16-8.72c.06-1.04,.14-1.67,2.56-2.19s14.22,6.65,14.68,7.69c.46,1.04-.83,2.62-1.76,3.14Z\" style=\"", "\"></path><path d=\"M169.74,139.12c-.06-1.04-.14-1.67-2.56-2.19s-14.22,6.65-14.68,7.69c-.46,1.04,.83,2.62,1.76,3.14s9.87,.55,13.33,.09,2.16-8.72,2.16-8.72Zm-1.64,6.16s-.52,1.04-1.61,1.04-10.94,.23-11.4,0-.69-1.35,.52-1.93,10.24-6.21,11.4-5.99c2.56,.49,1.18,6.33,1.09,6.88Z\" style=\"", "\"></path><path d=\"M151.73,232.28s1.03-2.48,1.32-7.43-1.47-11.23-1.64-11.83-.22-8.98,.64-14.34,7.22-24.27,6.53-33.25c-.69-8.98-10.19-21.07-10.19-21.07,0,0-1.03-2.25-1.95-1.61s-1.33,.74-.63,1.61c0,0,10.19,12.26,10.88,21.25,.69,8.98-5.35,27.12-6.22,32.47-.86,5.35-1.04,14.29-.86,14.9s1.95,6.64,1.67,11.59c-.29,4.95-2.13,7.72-2.13,7.72,0,0-.75,.81,.29,1.27s1.79-.33,2.29-1.27Z\" style=\"", "\"></path><path d=\"M173.58,139.12c.06-1.04,.14-1.67,2.56-2.19s14.22,6.65,14.68,7.69c.46,1.04-.83,2.62-1.76,3.14s-9.87,.55-13.33,.09-2.16-8.72-2.16-8.72Zm1.64,6.16s.52,1.04,1.61,1.04,10.94,.23,11.4,0,.69-1.35-.52-1.93-10.24-6.21-11.4-5.99c-2.56,.49-1.18,6.33-1.09,6.88Z\" style=\"", "\"></path><path d=\"M191.58,232.28s-1.03-2.48-1.32-7.43c-.29-4.95,1.47-11.23,1.64-11.83s.22-8.98-.64-14.34c-.86-5.35-7.22-24.27-6.53-33.25,.69-8.98,10.19-21.07,10.19-21.07,0,0,1.03-2.25,1.95-1.61s1.33,.74,.63,1.61c0,0-10.19,12.26-10.88,21.25s5.35,27.12,6.22,32.47c.86,5.35,1.04,14.29,.86,14.9s-1.95,6.64-1.67,11.59,2.13,7.72,2.13,7.72c0,0,.75,.81-.29,1.27s-1.79-.33-2.29-1.27Z\" style=\"", "\"></path></g><g><g><path d=\"M140.87,228.04c-.23-.06-1.18-2.65-1.18-2.65l-5.49-1.27-.23-1.61,1.73-3.34s-3.68-13.93-3.74-14.91,2.65,1.04,3.63,0,1.09-5.99-3.97-6.39-8.29,.69-8.29,3.63,.46,3.63,1.78,2.94,2.1-1.04,2.38-.29,.68,4.09,.68,4.09l.69-.4,1.32,12.55,1.32,.4,.58,6.05s1.27,2.24,5.37,2.25c4.1,.01,3.43-1.04,3.43-1.04Z\" style=\"", "\"></path><path d=\"M201.96,228.04c.23-.06,1.18-2.65,1.18-2.65l5.49-1.27,.23-1.61-1.73-3.34s3.68-13.93,3.74-14.91-2.65,1.04-3.63,0-1.09-5.99,3.97-6.39,8.29,.69,8.29,3.63-.46,3.63-1.78,2.94-2.1-1.04-2.38-.29-.68,4.09-.68,4.09l-.69-.4-1.32,12.55-1.32,.4-.58,6.05s-1.27,2.24-5.37,2.25c-4.1,.01-3.43-1.04-3.43-1.04Z\" style=\"", "\"></path><path d=\"M172.18,293.76h1.34l-.09,2.07h3.8l.52-8.46-3.02-.17,.78-14.16c7.69,.35,29.62,8.9,29.62,8.9v7.69h4.06v-1.81h1.47v1.81h3.89v-8.46h-3.71v1.38h-1.64v-1.3s-4.15-2.5-14.16-7.34c-10.02-4.84-19.52-5.1-19.52-5.1l2.42-15.03h-1.81l1.03-15.59s-4.96,.69-4.96,.69l-4.96-.69,1.03,15.59h-1.81l2.42,15.03s-9.5,.26-19.52,5.1c-10.02,4.84-14.16,7.34-14.16,7.34v1.3h-1.64v-1.38h-3.71v8.46h3.89v-1.81h1.47v1.81h4.06v-7.69s21.94-8.55,29.62-8.9l.78,14.16-3.02,.17,.52,8.46h3.8l-.09-2.07s1.34,0,1.34,0Z\" style=\"", "\"></path></g><path d=\"M178.66,233.87s-.22,3.02-.91,3.83-6.05,1.18-6.05,1.18h.47s-5.35-.36-6.05-1.18-.91-3.83-.91-3.83h13.43Z\" style=\"", "\"></path></g></g></g><g id=\"Transform_Wave\"><g style=\"", "\"><g id=\"Wave\"><g style=\"", "\"><g id=\"wave3\"><path d=\"M232.34,255.27c-8.81,8.13-15.61,32.72-23.29,39.01-7.68,6.29-1.39,7.58,4.01,3.23,11.47-9.23,14.78-29.59,20.57-37.97s3.28-8.5-1.3-4.27Z\" style=\"", "\"></path></g></g><g id=\"wave2\"><path d=\"M138.82,149.86c8.03-4.15,15.84,2.57,28.86,2.1,13.84-.5,31.13-11.67,45.48-1.39,9.69,6.94,7.84,24.35,13.87,36.91,6.04,12.55,20.22,18.78,20.22,31.25,0,14.46-19.59,10.26-21.52,33.42-.67,8.05-10.49,9.99-12.67-.08-2.14-9.89,5.29-15.86,9.31-28.21,2.2-6.75-.16-15.17-7.68-26.45-7.42-11.13-6.98-20.84-16.4-29.25-9.42-8.41-22.43,.75-30.71,2.95-9.48,2.52-16.45-2.01-26.41-.55-9.96,1.46-13.6,13.34-18.4,9.11-5.7-5.04,8-25.64,16.03-29.79h0Z\" style=\"", "\"></path><path d=\"M101.32,207.75c-4.78,6.39-6.12,18.29-3.52,23.91,2.77,5.99,8.35,10.7,12.25,19.88,3.9,9.18-2.77,27.35,13.76,37.34,17.12,10.35,31.46-7.38,49.67-3.94,11.28,2.14,23.03,1.64,23.91-6.8s-12.73-11.16-27.86-9.4c-15.86,1.85-26.47,12.37-37.79,7.96-11.32-4.41-6.94-23.55-10.71-31.26-4.49-9.16-10.78-6.59-15.37-12.76-5.75-7.72,1.39-20.1,2.75-23.21,1.88-4.29-1.45-9.25-7.08-1.73h0Z\" style=\"", "\"></path><path d=\"M135.8,271.02c-.25,2.17,5.35,3.04,9.57,1.51,3.75-1.36,6.21-4.94,5.35-6.17-1.64-2.33-14.47,.82-14.91,4.66h0Z\" style=\"", "\"></path><path d=\"M94.79,245.25c2.98,.13,.91,11.38,7.17,24.61,5.71,12.07,17.58,15.74,14.79,19.08s-13.96-4.32-19.69-16.65c-5.35-11.48-6.25-27.22-2.27-27.04Z\" style=\"", "\"></path></g><g id=\"wave1\"><path d=\"M211.32,145.64c1.31,5.41-15.57,7.14-16.48,3.79-1.11-4.08,14.66-11.35,16.48-3.79Z\" style=\"", "\"></path><path d=\"M133.21,243.53c2.81-1.31,7.62,8.7,4.06,10.08-4.84,1.87-7.07-8.66-4.06-10.08Z\" style=\"", "\"></path><path d=\"M196.48,285.37c1.61,2.18,14.31-1.55,13.75-4.72-.56-3.17-4.51-3.67-8.99-1.87s-5.73,5.26-4.75,6.58h0Z\" style=\"", "\"></path><path d=\"M240.17,255.22c5.25,2.04,9.29-4.18,5.52-8.54-2.55-2.93-9.06,7.16-5.52,8.54Z\" style=\"", "\"></path></g></g></g></g><g id=\"Lamp\"><g id=\"LampFooter\"><path d=\"M111.96,152.23v2.45c0,.22-.1,.42-.28,.55-.82,.6-3.43,2.24-7.61,2.19h-.35c-4.18,.05-6.79-1.59-7.61-2.19-.18-.13-.28-.33-.28-.55v-2.45\" style=\"", "\"></path><g><ellipse cx=\"104.01\" cy=\"152.23\" rx=\"7.96\" ry=\"3.66\" style=\"", "\"></ellipse><g style=\"", "\"><polygon id=\"LightShadow\" points=\"95.55 160.87 116.7 151.53 93.38 131.36 86.69 139.86 95.55 160.87\" style=\"", "\"></polygon></g></g></g><g id=\"LampFooterStick\"><path d=\"M104.15,135.49c-.38,0-.7,.3-.7,.69v16.01s0,.45,.7,.37l.7-.08v-16.29c0-.38-.3-.69-.68-.69,0,0-.01,0-.02,0Z\" style=\"", "\"></path><g style=\"", "\"><polyline points=\"103.45 135.42 104.15 153.79 102.07 153.79 102.46 135.42 103.45 135.42\" style=\"", "\"></polyline></g></g><circle id=\"Light\" cx=\"105.19\" cy=\"120\" r=\"23.56\" style=\"", "\"></circle><path id=\"LampHead\" d=\"M95.55,135.33c-.01,.72,2.41,1.96,3.09,2.19,1.39,.46,2.11,.85,6.35,.56,3.42-.23,5.05-.63,6.58-1.03,.78-.21,1.38-.81,1.38-1.62v-26.31c0-.63-.36-1.21-.93-1.48-1.14-.54-3.4-1.27-7.25-1.22-4.81,.06-6.78,.36-7.98,1.01-.5,.27-.8,.82-.81,1.39l-.43,26.51Z\" style=\"", "\"></path></g><g id=\"Particles\"><g id=\"Left_Middle\"><circle cx=\"75.88\" cy=\"139.35\" r=\"3.32\" style=\"", "\"></circle><path d=\"M67.16,131.36l-2.24,1c-.24,.11-.51,.05-.69-.15l-1.64-1.82c-.17-.19-.2-.47-.07-.7l1.23-2.12c.13-.22,.39-.34,.64-.29l2.4,.51c.25,.05,.44,.26,.47,.52l.26,2.44c.03,.26-.11,.5-.35,.61Z\" style=\"", "\"></path></g><g id=\"Left_Button\"><polygon points=\"72.41 272.26 77.34 276.73 79.34 268.89 72.41 272.26\" style=\"", "\"></polygon><path d=\"M63.81,261.38s2.31,3.1,2.07,4.3-2.7,.4-3.19-1.93,1.12-2.37,1.12-2.37Z\" style=\"", "\"></path></g><circle id=\"Top_Left_Circle\" cx=\"59.14\" cy=\"49.69\" r=\"1.43\" style=\"", "\"></circle><rect id=\"Top_Left_Yellow\" x=\"78.39\" y=\"31.3\" width=\"1.61\" height=\"11.72\" rx=\".8\" ry=\".8\" transform=\"translate(-4.41 62.9) rotate(-42.25)\" style=\"", "\"></rect><g id=\"Top_Right\"><circle cx=\"270.07\" cy=\"47.75\" r=\"5.06\" style=\"", "\"></circle><circle cx=\"270.07\" cy=\"47.75\" r=\"3.28\" style=\"", "\"></circle><circle cx=\"270.07\" cy=\"47.75\" r=\"1.47\" style=\"", "\"></circle></g></g><g id=\"Book\"><g><g><path d=\"M248.8,147.27c.02,.34,.03,.69,.05,1.03-1.18,.88-2.1,2.04-3.25,2.94-1.31,1-2.65,1.97-3.84,3.11-.87,.8-1.69,1.64-2.44,2.57-.67,.83-1.39,1.63-2.13,2.41-.62,.65-1.28,1.27-1.9,1.92-.33,.35-.74,.61-1.08,.95-.22,.21-.55,.11-.79,.26-.23,.04-.44,0-.66-.06-.7-.2-1.42-.3-2.17-.48,.16,.21,.53,.1,.53,.38,0,.21-.15,.39-.36,.48-.39,.04-.75-.11-1.12-.21-1.48-.4-2.94-.96-4.45-1.17-2.04-.28-3.89-1.14-5.82-1.72-.67-.2-1.35-.41-2.02-.63-.13-.04-.27-.07-.4-.13-.17-.08-.43-.11-.39-.37,.04-.24,.26-.36,.5-.4,.11-.02,.23-.02,.34,0,.72,.2,1.46,.31,2.19,.49,.67,.16,1.35,.26,2.05,.1,.5-.04,.92,.22,1.39,.33,1.86,.45,3.68,1.01,5.52,1.53,1.35,.38,2.7,.76,4.01,1.28,.15,.06,.3,.06,.46,.08,.42-.21,.79-.5,1.14-.81,1.08-.94,2.12-1.92,3.1-2.97,.28-.3,.62-.53,.87-.86,.03-.03,.05-.06,.08-.08,.29-.19,.51-.45,.73-.71,.03-.03,.05-.05,.09-.08,.34-.19,.55-.53,.82-.8,.92-1.03,1.99-1.91,2.99-2.85,1.56-1.47,3.17-2.87,4.69-4.37,.34-.34,.72-.64,1.02-1.01,.07-.08,.15-.17,.28-.16Z\" style=\"", "\"></path><path d=\"M245.56,151.16c.53-.51,1.1-.98,1.62-1.52,.43-.45,.86-.92,1.4-1.25,.08-.05,.18-.06,.28-.09,0,.23,.11,.45,.06,.68-1.34,1.02-2.47,2.24-3.68,3.53,.42-.01,.65-.18,.88-.36,.21-.17,.4-.35,.63-.5,.1-.06,.21-.11,.31-.01,.1,.1,.04,.21-.03,.3-.12,.17-.24,.34-.32,.42,.54-.35,1.02-.91,1.61-1.34,.23-.17,.33-.51,.69-.52,.24,.37,.25,.57-.05,.86-.94,.91-1.9,1.81-2.84,2.72-1.04,1.01-2.13,1.97-3.14,3.02-.29,.31-.68,.51-.95,.84-.06,.06-.12,.11-.2,.14-.2,.05-.41,.08-.62,.14-.1,.04-.23,.06-.31-.05-.07-.11-.03-.23,.04-.32,.14-.2,.31-.38,.07-.62-.03-.03-.03-.09,0-.12,.3-.46-.17-.54-.38-.63-.36-.15-.26-.29-.1-.5,.77-.98,1.68-1.82,2.6-2.65,.54-.48,1.1-.93,1.6-1.44,.33-.19,.57-.48,.84-.74Z\" style=\"", "\"></path><path d=\"M248.8,147.27c-.9,.98-1.91,1.85-2.86,2.78-.72,.71-1.49,1.35-2.21,2.05-.93,.91-1.91,1.77-2.87,2.65-.35,.32-.64,.7-1.01,.99-.36,.19-.51,.61-.87,.79-.26,.26-.53,.52-.79,.77h0c-.84,.79-1.63,1.63-2.5,2.38-.77,.67-1.43,1.47-2.31,2.01-.06,.04-.11,.08-.19,.07-.11-.04-.08-.13-.08-.22,0-.04,.02-.08,.04-.12,.46-.49,.98-.92,1.48-1.38,1-.94,1.95-1.95,3-2.84,.83-.7,1.52-1.55,2.37-2.22,.22-.13,.35-.36,.54-.53,.96-.87,1.93-1.73,2.87-2.62,.34-.32,.66-.65,1.01-.97,1.32-1.21,2.64-2.41,3.91-3.68,.09-.09,.18-.24,.35-.14,.04,.07,.08,.15,.13,.22Z\" style=\"", "\"></path><path d=\"M249.03,150.43s-.04,.06-.06,.1c-.71,.66-1.41,1.32-2.2,1.89-.11,.08-.22,.16-.38,.19,.22-.3,.44-.59,.71-.98-.44,.1-.66,.35-.89,.56-.22,.21-.5,.3-.76,.44-.09,.05-.23,.09-.31-.02-.09-.12,.04-.22,.1-.29,.51-.56,1.03-1.11,1.56-1.65,.48-.47,.99-.91,1.46-1.39,.18-.18,.37-.29,.62-.32,.04,.48,.08,.97,.13,1.45Z\" style=\"", "\"></path><path d=\"M221.62,158.79c-.29,.17-.62,.17-.92,.14-.62-.07-1.24-.19-1.85-.34-.5-.13-1.03-.14-1.52-.35-.08-.04-.2-.02-.29,0-.19,.03-.38,.16-.42,.31-.06,.2,.19,.2,.32,.25,.77,.25,1.55,.47,2.32,.73,.79,.26,1.56,.56,2.35,.81,1.13,.36,2.23,.81,3.45,.9,.84,.06,1.66,.39,2.48,.62,.71,.2,1.42,.42,2.13,.62-.22,.26-.51,.16-.76,.13,.62,.15,1.23,.39,1.86,.55,.15,.04,.28,.14,.25,.34-.01,.09,.02,.16,.08,.23,.1,.09,.18,.2,.1,.33-.09,.15-.25,.13-.38,.08-.38-.16-.8-.1-1.24-.32,.35,.26,.94,.04,.94,.67-.44,.17-.81-.15-1.21-.21-.26-.04-.51-.14-.78-.19-.21-.13-.44-.15-.67-.18-.04,0-.07-.03-.1-.05-.02-.03-.03-.07-.03-.11,.04-.17-.1-.16-.19-.2-.51-.24-1.07-.29-1.59-.5-.09-.04-.19-.04-.23-.16,0-.25,.05-.55-.37-.31-.12,.07-.33,0-.33-.16,0-.38-.26-.32-.49-.36-.33-.05-.61,.02-.84,.26-.43,.15-.79-.15-1.17-.24-.76-.18-1.52-.4-2.28-.62-.11-.03-.22-.06-.29-.15-.04-.07,.06-.18-.03-.23-.13-.07-.19,.07-.28,.12-.17,.06-.32,.07-.43-.11,.26-.45,.24-.49-.25-.74-.36-.18-.39-.31-.13-.55-.53-.22-1.07-.4-1.62-.56-.33-.09-.62-.24-.88-.47-.09-.09-.1-.18-.03-.29,.21-.48,.56-.66,1.08-.51,.25,.07,.5-.02,.72-.17,.68,.09,1.34,.28,2,.47,.38,.11,.76,.21,1.15,.29,.16,.03,.35,.03,.37,.27Z\" style=\"", "\"></path><path d=\"M233.37,162.39c.18-.05,.29-.33,.55-.15,.03,.02,.17-.08,.24-.14,.65-.58,1.28-1.17,1.91-1.78,.71-.69,1.37-1.44,2.05-2.15,.56-.59,1.01-1.27,1.56-1.87,.64-.7,1.24-1.44,2.04-1.99,0,.02,.02,.04,.03,.05,0,.11-.06,.19-.13,.26-1.01,.95-1.77,2.1-2.7,3.11-.09,.1-.26,.19-.05,.37,.15,.13,.25,.2,.42,.04,.14-.14,.31-.25,.48-.35,.14-.08,.3-.25,.45-.08,.16,.18,.01,.34-.11,.47-.06,.03,.04,.06,0,.03-.01,0,0-.02,.02-.03,.12-.1,.27-.15,.39-.06,.14,.12,0,.26-.06,.37-.11,.2-.28,.35-.43,.56,.37-.16,.65-.52,1.09-.37-.11,.41-.46,.61-.77,.84-.39-.01-.7,.19-1,.4-.09,.06-.2,.16-.3,.05-.09-.1,.01-.21,.08-.3,.05-.07,.11-.13,.17-.19,.19-.21,.45-.4,.07-.67-.07-.05,.02-.16-.03-.26-1.65,1.34-3.18,2.78-4.58,4.37,.23-.1,.37-.31,.58-.43,.07-.04,.16-.09,.23-.02,.07,.07,.02,.16-.01,.23-.15,.31-.45,.46-.71,.65-.24,.06-.4,.24-.59,.38-.13,.1-.26,.21-.44,.2-.06-.01-.11-.04-.14-.1,0-.2,.15-.32,.27-.46,.11-.13,.19-.27,.3-.41-.26,.02-.42,.33-.71,.25-.07-.08-.09-.18-.07-.28,.12-.11,.05-.18-.06-.24-.06-.1-.07-.2,0-.29Z\" style=\"", "\"></path><path d=\"M233.21,165.36c-.18-.1-.4-.1-.59-.15-.43-.21-.91-.23-1.36-.38-.26-.09-.59-.05-.74-.36-.04-.31-.28-.37-.52-.4-.23-.03-.44-.07-.6-.26,.1-.14,.24-.1,.34-.05,.36,.21,.81,.06,1.16,.29,.07,.05,.21,.08,.26-.03,.06-.14-.05-.2-.16-.24-.13-.05-.25-.06-.1-.27,.16-.24-.12-.23-.26-.27-.67-.2-1.35-.4-2.02-.66,.35-.08,.71,.05,1.04-.09,.36,.08,.71,.21,1.08,.21,.98,.18,1.92,.53,2.89,.73,.09,.12,.08,.25,.03,.38,.03,.02,.06,.05,.09,.07,.1,.11,.06,.26,.12,.39,.04,.12,.06,.24,.08,.37\" style=\"", "\"></path><path d=\"M229.09,160.35c1.3,.36,2.59,.79,3.91,1.08,.08,.02,.14,.08,.21,.13l-.05,.18c.09,.15,.17,.29-.11,.29-.48,.11-.9-.16-1.28-.31-1.22-.5-2.5-.79-3.75-1.17-1.34-.41-2.69-.79-4.05-1.14-.78-.2-1.54-.48-2.34-.62-.09-.13-.24-.14-.37-.17-.69-.12-1.35-.35-2.02-.54-.36-.1-.76-.12-1.11-.29-.1,.02-.18,0-.23-.1-.09-.16-.27-.11-.4-.18-.14-.07-.37-.06-.36-.31,.21-.04,.4,.01,.61,.08,.63,.2,1.28,.37,1.92,.54,.43,.12,.86,.22,1.29,.33,1.1,.16,2.14,.56,3.22,.83,.2,.15,.43,.15,.66,.18\" style=\"", "\"></path><path d=\"M233.58,163.38c-.35,.17-.65-.05-.96-.14-.63-.18-1.28-.26-1.87-.57,.14-.02,.14-.17,.21-.24,.15-.16,.11-.24-.09-.27-.21-.03-.53-.08-.48-.29,.06-.26,.34-.04,.5,0,.69,.16,1.4,.22,2.08,.47,.12,.05,.27,.03,.4,.04,.02,.11,.05,.22,.07,.33,.06,.05,.07,.1,.03,.17l.07,.33c.06,.05,.07,.1,.03,.17Z\" style=\"", "\"></path><path d=\"M233.04,162.03c.16-.05,.14-.17,.11-.29,.71-.41,1.23-1.04,1.83-1.57,.7-.62,1.37-1.27,2.06-1.9,.2-.18,.4-.36,.57-.56,.15-.18,.33-.35,.58-.4-.07,.25-.28,.38-.45,.55-1.17,1.15-2.31,2.32-3.54,3.39-.18,.16-.39,.27-.58,.42-.14,.1-.31,.15-.34,.39-.02,.18-.16,.05-.24-.02Z\" style=\"", "\"></path><path d=\"M245.56,151.16c-.2,.32-.44,.61-.79,.77-.81,.74-1.7,1.39-2.51,2.12-.14,.13-.28,.34-.54,.25,.26-.4,.65-.71,1.02-.98,.71-.52,1.31-1.18,2.1-1.6,.27-.15,.42-.46,.72-.57Z\" style=\"", "\"></path><path d=\"M238.19,157.3c.17-.36,.45-.59,.79-.77-.19,.33-.42,.63-.79,.77Z\" style=\"", "\"></path><path d=\"M238.98,156.53c.33-.23,.42-.7,.87-.79-.28,.27-.44,.68-.87,.79Z\" style=\"", "\"></path><path d=\"M241.71,154.31c.91-.73,1.83-1.45,2.73-2.19,.1-.08,.18-.17,.32-.19-.38,.59-.99,.95-1.49,1.41-.97,.88-1.91,1.78-2.74,2.78-.12,.15-.17,.25,.1,.23,.1,0,.21-.02,.24,.11,.07,.25,.26,.23,.51,.14-.11,.19-.19,.31-.26,.43-.03,.06-.11,.15-.05,.19,.51,.31,.04,.48-.09,.7-.04,.07-.07,.15-.03,.25,.29,.01,.55-.2,.85-.16-.17,.3-.31,.64-.73,.67-.47-.01-.78,.41-1.25,.52,.13-.44,.55-.63,.65-1.04-.26-.09-.4,.14-.68,.27,.14-.18,.23-.29,.31-.41,.06-.08,.13-.17,.06-.27-.1-.12-.18,0-.25,.05-.21,.13-.42,.27-.62,.44-.12,.11-.35,.46-.44-.05-.68-.25-.07-.46,.05-.61,.65-.82,1.34-1.62,2-2.44,.25-.31,.65-.46,.81-.84Z\" style=\"", "\"></path><path d=\"M217.14,157.2c.18,.24,.46,.22,.71,.29,.07,.02,.32,.01,.07,.17-.16,.18-.32,.06-.48,.01-.3-.11-.5,.14-.74,.22-.43,.15-.6,.01-.53-.45,.02-.03,.05-.06,.08-.08,.05-.01,.11,0,.16,0,.02,0,.05,.05,.07,0,0,0-.04-.04-.04-.07,.01-.06,.06-.09,.1-.12,.2-.05,.41-.19,.6,.02Z\" style=\"", "\"></path><path d=\"M247.88,150.92c-.18,.17-.36,.34-.55,.52,.09-.27,.27-.45,.55-.52Z\" style=\"", "\"></path><path d=\"M217.22,160.48c-.49-.3-.85-.7-1.07-1.23,.08-.04,.25,.01,.18-.19-.05-.13-.08-.28,.07-.38,.71,.52,1.59,.59,2.37,.93,.1,.04,.25,.04,.27,.17,.04,.22-.15,.08-.23,.13-.16,.09-.05,.18,.01,.22,.14,.09,.31,.14,.46,.21,.11,.06,.29,.06,.23,.28-.05,.17,.06,.43-.27,.41-.12,.08-.22-.01-.32-.05-.18-.11-.39-.1-.59-.12-.06-.01-.11-.03-.16-.06-.3-.15-.65-.14-.94-.31Z\" style=\"", "\"></path><path d=\"M221.37,161.96c-.25-.1-.54-.05-.77-.2-.02-.02-.05-.03-.07-.05-.25-.09-.53-.05-.76-.2-.26-.14-.51-.29-.82-.23-.36-.22-.83-.13-1.14-.46,.08-.2,.09-.2,.42-.09,.03,.02,.07,.04,.1,.07,.21,.06,.42,.07,.63,.13,.09,.04,.19,.08,.28,.11,.14,.11,.29,.12,.45,.08,.14-.08,.22,0,.28,.11,.65,.19,1.31,.35,1.96,.56,.44,.14,.9,.18,1.32,.39,.15,.08,.32,.12,.49,.07,.69,.16,1.41,.23,2.03,.61,.67,.2,1.35,.41,2.02,.61,.08,.02,.18,.04,.18,.15,0,.11-.12,.09-.19,.12-.22,0-.44,0-.63-.14-.05-.07-.11-.05-.17-.04-.52-.16-1.07-.24-1.58-.45h0c-.24-.09-.52-.05-.74-.19-.03-.02-.06-.04-.09-.06-.25-.05-.51-.08-.75-.19\" style=\"", "\"></path><path d=\"M225.76,162.86c-.67-.22-1.4-.27-2.03-.61,.04-.35,.37-.28,.56-.34,.19-.06,.44,.03,.65,.07,.15,.03,.29,.1,.2,.28-.06,.12-.05,.18,.08,.21,.1,.02,.2,.05,.25-.07,.03-.1,.03-.19,.18-.16,.15,.03,.15,.12,.15,.25,0,.13,.23,.27-.04,.37Z\" style=\"", "\"></path><path d=\"M216.39,158.68c-.04,.14-.02,.26,.06,.39,.06,.09,.02,.24-.06,.3-.13,.1-.11-.16-.24-.12-.23-.33-.18-.72-.22-1.08,.09-.25,.05-.56,.3-.75,.03,.15-.13,.36,.09,.44,.25,.09,.48-.09,.63-.21,.19-.15,.32-.14,.5-.06,.05,.18,.02,.33-.2,.3-.49-.05-.77,.17-.91,.62-.07,.07-.06,.13,.03,.17Z\" style=\"", "\"></path><path d=\"M216.36,158.51c.04-.45,.34-.74,.85-.7,.22,.01,.19-.14,.26-.22,.15,.05,.28,.15,.45,.08,.07,.04,.13,.09,.2,.13-.19,.39-.56,.3-.84,.24-.4-.09-.67-.07-.8,.37-.01,.04-.08,.07-.13,.11Z\" style=\"", "\"></path><path d=\"M219.96,161.22c-.09-.04-.19-.08-.28-.11-.02-.18,.1-.22,.24-.2,.09,.01,.2,.05,.21,.16,0,.1-.09,.13-.17,.15Z\" style=\"", "\"></path><path d=\"M223.72,161.44c-.23,.04-.37-.02-.49-.15-.01-.01,.03-.1,.05-.1,.18-.02,.33,.04,.44,.25Z\" style=\"", "\"></path><path d=\"M235.1,164.45c-.05,.03-.1,.07-.15,.1-.03,.15-.14,.22-.28,.23-.26-.13-.52-.3-.84-.24,.03-.09,.01-.18-.05-.25,.22-.45,.62-.71,1-.99,.21-.29,.64-.38,.74-.81-.4,.13-.56,.6-1.02,.6,1.46-1.78,3.14-3.33,4.95-4.77,.13,.2-.28,.53,.23,.55,.11,0,.02,.26-.06,.36-.18,.23-.38,.44-.62,.73,.5-.16,.78-.67,1.3-.5-.31,.31-.6,.65-.94,.93-.77,.65-1.44,1.4-2.21,2.04-.47,.39-.96,.8-1.31,1.33-.25,.22-.38,.57-.72,.69Z\" style=\"", "\"></path><path d=\"M234.82,161.95c.26-.56,.78-.87,1.21-1.27,.22-.2,.46-.36,.62-.62,.07-.11,.18-.29,.32-.18,.14,.11,0,.28-.11,.35-.51,.29-.81,.8-1.26,1.17-.25,.2-.45,.45-.77,.55Z\" style=\"", "\"></path><path d=\"M233.58,163.38c-.01-.06-.02-.11-.03-.17,.24-.21,.53-.34,.87-.49-.17,.46-.47,.75-.74,1.06-.03-.14-.06-.27-.1-.41Z\" style=\"", "\"></path><path d=\"M234.78,163.3c-.29,.37-.66,.66-1,.99-.04-.14-.06-.28-.01-.43,.28-.05,.44-.29,.67-.43,.11-.06,.17-.26,.35-.14Z\" style=\"", "\"></path><path d=\"M237.4,159.53c.07-.26,.2-.4,.54-.46-.23,.17-.26,.41-.54,.46Z\" style=\"", "\"></path><path d=\"M234.47,162.7c.08-.24,.16-.36,.31-.44q0,.21-.31,.44Z\" style=\"", "\"></path><path d=\"M233.48,162.88c-.01-.06-.02-.11-.03-.17,.11,.02,.23-.23,.3-.04,.08,.2-.16,.15-.27,.2Z\" style=\"", "\"></path><path d=\"M233.83,164.54c.36-.3,.59-.04,.84,.18-.01,.29-.21,.42-.45,.52\" style=\"", "\"></path><path d=\"M218.21,160.72c-.14,.05-.32-.13-.42,.09-.24-.04-.42-.16-.58-.34,.34,.06,.69,.05,1,.24Z\" style=\"", "\"></path><path d=\"M216.27,157.4c.03-.09,.11-.11,.19-.11,.08,.1,.25,0,.31,.17-.18,.04-.34,.02-.5-.06Z\" style=\"", "\"></path><path d=\"M218.95,160.91c-.24,.09-.44,0-.63-.13,.22-.01,.45-.07,.63,.13Z\" style=\"", "\"></path></g><g><polygon points=\"216.68 157 232.45 143.14 248.67 146.49 232.69 161.68 216.68 157\" style=\"", "\"></polygon><g style=\"", "\"><circle cx=\"247.33\" cy=\"146.87\" r=\"1.88\" style=\"", "\"></circle><circle cx=\"231.77\" cy=\"158.99\" r=\".43\" style=\"", "\"></circle><circle cx=\"232.57\" cy=\"159.82\" r=\".2\" style=\"", "\"></circle><ellipse cx=\"233.22\" cy=\"142.92\" rx=\"2.92\" ry=\"2.21\" transform=\"translate(-24.43 51.08) rotate(-11.88)\" style=\"", "\"></ellipse><ellipse cx=\"231.02\" cy=\"143.44\" rx=\"2.92\" ry=\"2.21\" transform=\"translate(-24.58 50.64) rotate(-11.88)\" style=\"", "\"></ellipse><g><rect x=\"243.13\" y=\"148.33\" width=\".17\" height=\".74\" rx=\".07\" ry=\".07\" transform=\"translate(-25.4 53.26) rotate(-11.88)\" style=\"", "\"></rect><rect x=\"243.14\" y=\"148.32\" width=\".17\" height=\".74\" rx=\".07\" ry=\".07\" transform=\"translate(338.65 -119.94) rotate(78.12)\" style=\"", "\"></rect></g><g><rect x=\"241.88\" y=\"148.86\" width=\".22\" height=\".94\" rx=\".07\" ry=\".07\" transform=\"translate(-25.56 53.02) rotate(-11.88)\" style=\"", "\"></rect><rect x=\"241.88\" y=\"148.84\" width=\".22\" height=\".94\" rx=\".07\" ry=\".07\" transform=\"translate(338.28 -118.24) rotate(78.12)\" style=\"", "\"></rect></g><g><rect x=\"222.23\" y=\"154.55\" width=\".17\" height=\".74\" rx=\".07\" ry=\".07\" transform=\"translate(-27.13 49.09) rotate(-11.88)\" style=\"", "\"></rect><rect x=\"222.24\" y=\"154.53\" width=\".17\" height=\".74\" rx=\".07\" ry=\".07\" transform=\"translate(328.13 -94.56) rotate(78.12)\" style=\"", "\"></rect></g><g><rect x=\"220.98\" y=\"155.07\" width=\".22\" height=\".94\" rx=\".07\" ry=\".07\" transform=\"translate(-27.29 48.85) rotate(-11.88)\" style=\"", "\"></rect><rect x=\"220.99\" y=\"155.05\" width=\".22\" height=\".94\" rx=\".07\" ry=\".07\" transform=\"translate(327.76 -92.86) rotate(78.12)\" style=\"", "\"></rect></g></g></g><g><path d=\"M227.8,149.72l.16,.05-.45,.41,.5,.18,.45-.41,.16,.05-1.07,.97-.16-.05,.5-.46-.5-.18-.5,.46-.16-.05,1.07-.97Z\" style=\"", "\"></path><path d=\"M229.11,150.33l-.4-.14,.12-.11,.95,.33-.12,.11-.4-.14-.96,.87-.15-.05,.96-.87Z\" style=\"", "\"></path><path d=\"M229.98,150.49l.19,.07-.29,.47-.11,.18h0s.23-.13,.23-.13l.63-.35,.19,.07-1.07,.97-.15-.05,.54-.49c.1-.09,.31-.25,.4-.33h0s-.28,.16-.28,.16l-.59,.32-.11-.04,.25-.44,.14-.21h0c-.08,.09-.25,.26-.35,.35l-.54,.49-.14-.05,1.07-.97Z\" style=\"", "\"></path><path d=\"M231.19,150.91l.15,.05-.96,.87,.59,.21-.12,.1-.74-.26,1.07-.97Z\" style=\"", "\"></path><path d=\"M232.42,152.35c.31-.28,.89-.15,1.12-.36,.06-.06,.09-.12,0-.15s-.2,.01-.29,.09c-.2,.18-.23,.51-.16,.72,.02,.09,.06,.16,.11,.2l-.15,.09c-.06-.05-.11-.13-.14-.24-.07-.26-.01-.62,.2-.82,.14-.13,.36-.19,.52-.14s.15,.16,.02,.28c-.27,.24-.85,.15-1.09,.36-.12,.11-.1,.21,.03,.26,.09,.03,.23,.02,.38-.02,.19-.05,.37-.14,.56-.26l.14,.05c-.21,.13-.43,.23-.66,.31-.2,.06-.38,.08-.55,.02-.21-.07-.23-.24-.06-.4Z\" style=\"", "\"></path><path d=\"M234.91,152.9c.34-.31,.78-.42,1.09-.31,.14,.05,.2,.15,.2,.23l-.17,.05c0-.08-.04-.14-.14-.17-.23-.08-.54,.02-.81,.26s-.29,.45-.06,.53c.11,.04,.24,.03,.39-.01v.11c-.19,.06-.36,.07-.52,0-.3-.1-.32-.37,.03-.69Z\" style=\"", "\"></path><path d=\"M235.61,153.65l.19-.05c.01,.11,.08,.2,.22,.24,.16,.06,.33,.03,.43-.06,.11-.1,.05-.17-.02-.25l-.11-.12c-.08-.08-.14-.2,.02-.34s.45-.2,.68-.12c.15,.05,.23,.15,.24,.25l-.17,.05c-.02-.08-.07-.15-.19-.19-.14-.05-.29-.03-.39,.06-.1,.09-.03,.17,.04,.24l.1,.12c.1,.1,.14,.21-.02,.35-.17,.15-.47,.22-.73,.13-.18-.06-.26-.17-.28-.3Z\" style=\"", "\"></path><path d=\"M236.71,154.04l.19-.05c.01,.11,.08,.2,.22,.24,.16,.06,.33,.03,.43-.06,.11-.1,.05-.17-.02-.25l-.11-.12c-.08-.08-.14-.2,.02-.34s.45-.2,.68-.12c.15,.05,.23,.15,.24,.25l-.17,.05c-.02-.08-.07-.15-.19-.19-.14-.05-.29-.03-.39,.06-.1,.09-.03,.17,.04,.24l.1,.12c.1,.1,.14,.21-.02,.35-.17,.15-.47,.22-.73,.13-.18-.06-.26-.17-.28-.3Z\" style=\"", "\"></path></g><path d=\"M216.55,157.39l15.87-14.01,16.11,3.32-.42,.67-15.33,14.24-15.11-4.33s-1.9-.22-1.55,1.85,2.92,2.52,2.92,2.52l14.9,3.66,15.47-14.21\" style=\"", "\"></path></g><path d=\"M268.39,138.02c-2.94-2.2-20.78-1.07-24.75,5.36\" style=\"", "\"></path><path d=\"M244.3,143.31l-1.18,.61s-.08-.94-.32-1.27,.96,.66,1.5,.66Z\" style=\"", "\"></path><g><path d=\"M272.43,138.75s-.08-.05-.13-.07c-.05-.02-.1-.05-.15-.07-.05-.02-.11-.04-.16-.06-.05-.02-.1-.04-.15-.06-.02,0-.04-.01-.07-.02-.02,0-.05-.02-.07-.02-.02,0-.04-.01-.05-.01-.02,0-.02,0-.03,0-.03,.07-.06,.16-.09,.26-.03,.1-.07,.2-.1,.3-.03,.1-.06,.19-.08,.28-.02,.09-.04,.15-.04,.19,0,.02,.02,.05,.05,.08s.09,.05,.14,.07c.02,0,.05,.02,.07,.02,.03,0,.05,.02,.08,.03,.03,.01,.05,.03,.07,.05,.01,.02,.02,.04,0,.06,0,.02-.02,.04-.03,.06-.01,.02-.05,.01-.1,0-.02,0-.06-.02-.11-.04-.05-.02-.1-.04-.16-.07-.06-.03-.12-.05-.18-.07-.06-.02-.12-.03-.17-.04-.12-.02-.24-.03-.35-.04-.11,0-.21,0-.3,0s-.17,0-.24,.02c-.07,.01-.11,.03-.15,.04-.02,.01-.03,.01-.03,.01,0,0-.01,0-.02,0,0,0-.02-.01-.03-.04s-.02-.05-.01-.08c0-.01,.04-.03,.09-.04s.12-.02,.2-.03c.08,0,.16-.01,.24-.01,.08,0,.15,0,.21,0,.02-.02,.05-.07,.1-.16s.1-.22,.17-.4c.07-.18,.16-.4,.26-.67,.1-.27,.22-.59,.36-.96,.04-.1,.07-.21,.11-.32,.04-.11,.07-.21,.09-.31,.03-.09,.05-.18,.06-.25,.01-.07,.02-.13,0-.16,0-.03-.03-.05-.07-.07-.04-.02-.08-.04-.13-.06l-.17-.06s-.03-.01-.05-.02c-.02,0-.04-.02-.06-.03-.02-.01-.03-.02-.04-.04,0-.01-.01-.03,0-.04,.01-.03,.02-.05,.04-.06s.06,0,.12,.02c.03,.01,.06,.02,.11,.04,.04,.02,.09,.04,.13,.05,.04,.02,.09,.03,.13,.05,.04,.02,.08,.03,.12,.05,.09,.03,.21,.07,.35,.1,.14,.03,.29,.07,.43,.12,.11,.03,.22,.07,.33,.11,.11,.04,.21,.07,.31,.11,.1,.03,.18,.06,.25,.09,.07,.02,.12,.04,.15,.04,.05-.07,.11-.13,.16-.18,.05-.05,.1-.07,.13-.06,.01,0,.03,.02,.05,.04,.02,.02,.03,.04,.02,.05-.01,0-.02,.01-.03,.02-.02,.01-.03,.02-.03,.03-.06,.05-.11,.11-.18,.2-.06,.08-.12,.17-.17,.27-.05,.09-.1,.19-.15,.28-.04,.09-.07,.17-.08,.24-.02,.04-.05,.06-.07,.05-.05-.02-.07-.03-.07-.05s0-.04,.01-.05c.01-.02,.03-.05,.04-.08,.02-.04,.03-.06,.04-.09,.03-.07,.02-.14,0-.2-.03-.07-.07-.13-.14-.19s-.15-.12-.25-.17c-.1-.06-.21-.1-.32-.14-.03-.01-.07-.03-.13-.04-.05-.02-.1-.02-.13,0-.01,.02-.04,.07-.07,.14-.03,.07-.07,.16-.11,.26-.04,.1-.08,.21-.13,.32-.04,.11-.09,.23-.13,.33-.04,.11-.08,.21-.11,.29-.03,.09-.06,.16-.07,.2,.06,.02,.11,.04,.16,.06l.16,.06c.17,.06,.32,.12,.46,.15,.13,.04,.22,.06,.27,.06,.03,0,.05,0,.08-.01s.04-.02,.06-.04,.03-.03,.05-.03c.01-.01,.03-.01,.04,0,.01,0,.03,.02,.04,.04s0,.03,0,.04c-.03,.03-.06,.06-.09,.12-.03,.05-.07,.11-.1,.17-.03,.06-.07,.13-.1,.2-.03,.07-.06,.14-.08,.2,0,.01,0,.02-.01,.04,0,.01,0,.03-.01,.04,0,0-.01,.01-.03,.01-.01,0-.03,0-.04,0s-.03-.01-.04-.02c-.01,0-.01-.01-.01-.02,0-.02,.01-.04,.02-.06,0-.03,0-.05,0-.08,0-.03,0-.06-.02-.08-.01-.03-.04-.06-.07-.09l-.06-.04Z\" style=\"", "\"></path><path d=\"M275.55,138.78s-.09,.03-.15,.06c-.06,.02-.12,.04-.18,.06-.06,.02-.12,.03-.18,.04-.06,0-.11,0-.16-.01-.04-.01-.07-.04-.1-.07-.02-.03-.05-.06-.07-.09-.02-.03-.04-.06-.06-.09-.02-.03-.04-.05-.07-.06-.08-.03-.15-.02-.23,.03-.08,.04-.15,.11-.22,.19-.07,.09-.13,.18-.19,.29-.06,.11-.1,.22-.14,.32-.03,.09-.05,.16-.07,.22-.01,.06-.02,.11-.02,.15,0,.04,.01,.07,.03,.09,.02,.02,.05,.04,.08,.05,.04,.01,.08,.02,.13,.03,.01,0,.01,0,.01,.02,0,.02,0,.03,0,.04,0,0,0,.01-.02,.01-.01,0-.02,0-.02,0-.07,0-.15,0-.22,.01s-.14,.01-.19,.02c-.05,0-.1,0-.16,0-.06,0-.11,0-.15-.02-.05-.02-.08-.04-.11-.06s-.03-.05-.03-.06c0-.01,.01-.03,.02-.03,.01,0,.03-.03,.04-.06,.02-.04,.05-.09,.07-.15,.03-.06,.06-.12,.09-.18,.03-.07,.06-.13,.09-.21,.03-.07,.06-.14,.09-.21,.06-.16,.1-.3,.13-.42,.03-.11,.04-.21,.04-.29,0-.08-.02-.14-.05-.19-.03-.05-.09-.08-.15-.11-.02,0-.03-.01-.04-.01-.01,0-.02,0-.04,0-.02,0-.02-.02-.02-.04s.02-.03,.04-.03c.04,0,.1-.02,.18-.04,.08-.01,.16-.03,.24-.04s.16-.02,.24-.02c.08,0,.13,0,.16,0,.04,.01,.06,.04,.08,.07,.02,.03,.02,.07,.02,.11,0,.04,0,.09-.02,.14-.01,.05-.02,.1-.04,.14-.01,.04-.03,.07-.04,.11-.02,.04-.03,.08-.05,.12,.2-.14,.37-.25,.51-.32,.14-.07,.26-.08,.35-.05,.03,.01,.06,.04,.09,.08,.02,.04,.05,.09,.07,.13s.05,.1,.08,.14c.03,.04,.07,.07,.11,.09,.04,.01,.07,.02,.09,.02,.02,0,.04,0,.05,0,.02,0,.03,.03,.02,.06h0Z\" style=\"", "\"></path><path d=\"M276.82,140.73s-.11,.05-.2,.09c-.09,.04-.19,.07-.3,.1-.12,.03-.24,.04-.37,.04-.13,0-.26-.02-.39-.07-.12-.04-.23-.1-.32-.18-.1-.08-.18-.17-.24-.27-.06-.1-.1-.22-.11-.36-.01-.13,0-.28,.07-.44,.05-.13,.09-.24,.14-.32,.05-.09,.1-.16,.16-.22,.05-.06,.11-.11,.16-.15,.05-.04,.11-.07,.16-.1,.07-.03,.14-.06,.22-.09s.17-.04,.26-.05,.18-.01,.27,0c.09,0,.18,.03,.27,.06,.16,.06,.27,.13,.34,.21,.07,.08,.09,.17,.05,.26-.02,.06-.06,.1-.11,.14,.03,0,.07,0,.13,0,.05,0,.1,0,.16-.01,.05,0,.1,0,.14-.01,.04,0,.07,0,.09-.01,0,0,.01,0,.02,0,0,0,0,.01,0,.02-.01,.04-.03,.07-.06,.08-.02,.02-.05,.03-.07,.04-.06,.01-.14,.02-.24,.04-.1,.01-.21,.02-.34,.03-.12,0-.25,.02-.38,.02-.13,0-.25,.02-.36,.02-.11,0-.21,.02-.3,.02-.08,0-.14,.01-.17,.02-.04,.1-.05,.2-.04,.29,0,.1,.04,.19,.08,.28,.05,.09,.11,.17,.2,.24,.08,.07,.18,.13,.3,.17,.1,.04,.2,.06,.29,.07,.09,0,.17,0,.24,0,.07,0,.12-.01,.16-.03,.04,0,.06-.01,.07-.01,.01,0,.02,.01,.03,.03,0,.01,0,.03,0,.04Zm-1.28-1.2c.05,0,.12,0,.19,0,.07,0,.14,0,.21-.01,.07,0,.13-.02,.19-.02s.1-.02,.14-.03c.07-.02,.11-.07,.15-.16,.01-.03,.02-.07,.02-.11,0-.04,0-.08-.02-.12-.01-.04-.04-.08-.07-.11s-.07-.06-.11-.07c-.04-.01-.09-.02-.14,0-.06,.01-.12,.04-.18,.09-.06,.05-.13,.12-.19,.21-.06,.09-.12,.21-.17,.36Z\" style=\"", "\"></path><path d=\"M278.82,141.45s-.11,.05-.2,.09c-.09,.04-.19,.07-.3,.1-.12,.03-.24,.04-.37,.04-.13,0-.26-.02-.39-.07-.12-.04-.23-.1-.32-.18-.1-.08-.18-.17-.24-.27s-.1-.22-.11-.36c-.01-.13,0-.28,.07-.43,.05-.13,.09-.24,.14-.32,.05-.09,.1-.16,.16-.22,.05-.06,.11-.11,.16-.15,.05-.04,.11-.07,.16-.1,.06-.03,.14-.06,.22-.09,.08-.02,.17-.04,.26-.05,.09,0,.18-.01,.27,0,.09,0,.18,.03,.27,.06,.15,.06,.27,.13,.34,.21,.07,.08,.09,.17,.05,.26-.02,.06-.06,.1-.11,.14,.03,0,.07,0,.13,0,.05,0,.1,0,.16-.01,.05,0,.1,0,.14-.01,.04,0,.07,0,.09-.01,0,0,.01,0,.02,0,0,0,0,.01,0,.02-.01,.04-.03,.07-.06,.08-.02,.02-.05,.03-.07,.04-.06,.01-.13,.02-.24,.04s-.21,.02-.34,.03c-.12,0-.25,.02-.38,.03-.13,0-.25,.01-.37,.02-.11,0-.21,.02-.3,.02-.08,0-.14,.01-.17,.02-.03,.1-.05,.2-.04,.29,0,.1,.04,.19,.08,.28,.05,.09,.11,.17,.19,.24s.18,.13,.3,.17c.1,.04,.2,.06,.29,.07,.09,0,.17,0,.24,0,.07,0,.12-.01,.16-.03,.04,0,.06-.01,.06-.01,.01,0,.02,.01,.03,.03,0,.01,.01,.03,0,.04Zm-1.28-1.2c.06,0,.12,0,.19,0s.14,0,.21-.02c.07,0,.13-.02,.19-.02s.1-.02,.14-.03c.06-.02,.11-.07,.15-.16,.01-.03,.02-.07,.02-.11s0-.08-.02-.12c-.01-.04-.04-.08-.07-.11s-.07-.06-.12-.07c-.04-.01-.09-.02-.14,0-.06,.01-.11,.04-.18,.09-.06,.05-.13,.12-.19,.21-.06,.09-.12,.21-.17,.36Z\" style=\"", "\"></path><path d=\"M283.05,144.37s.01-.09,.01-.14c0-.05-.03-.08-.08-.1-.04-.02-.1-.03-.18-.06-.08-.02-.16-.04-.24-.07-.09-.02-.17-.05-.26-.07-.08-.02-.16-.05-.22-.07-.25-.09-.46-.21-.62-.35s-.29-.3-.38-.47c-.09-.17-.13-.36-.14-.56s.03-.41,.11-.62c.11-.3,.25-.53,.42-.71,.17-.18,.36-.31,.57-.39,.21-.08,.43-.11,.66-.1,.23,0,.47,.06,.69,.14,.07,.03,.14,.05,.22,.09,.08,.03,.15,.07,.22,.1,.07,.03,.13,.06,.18,.09,.05,.03,.09,.05,.11,.06,.01,0,.04-.01,.07-.06,.03-.05,.07-.1,.11-.15,.04-.05,.09-.1,.14-.14,.05-.04,.09-.06,.13-.04,.04,.03,.07,.06,.09,.09,.01,.02,0,.04-.06,.06-.08,.03-.16,.08-.24,.15-.08,.07-.15,.16-.23,.27-.03,.03-.06,.08-.1,.14-.04,.06-.08,.14-.12,.22-.01,.02-.04,.03-.06,.01-.03-.01-.04-.04-.04-.08,0-.05-.01-.1-.03-.17-.02-.06-.06-.13-.11-.2-.05-.07-.12-.14-.2-.2-.08-.06-.18-.12-.29-.16-.13-.05-.26-.05-.39-.03-.13,.03-.25,.09-.37,.17-.12,.08-.22,.19-.32,.31-.1,.13-.18,.26-.24,.41,.02,.01,.07,.04,.14,.07s.15,.07,.23,.1c.08,.03,.17,.07,.25,.1,.08,.03,.14,.05,.18,.06,.09,.03,.18,.06,.28,.09,.09,.02,.18,.04,.26,.05,.08,.01,.15,.02,.21,.02,.06,0,.11,0,.14-.02,.02-.01,.04-.01,.06,0,.02,.01,.03,.02,.04,.04-.02,.02-.04,.05-.07,.09-.03,.04-.06,.08-.1,.13-.04,.05-.07,.1-.11,.17-.03,.06-.07,.13-.09,.2-.01,.03-.04,.03-.06,0-.02-.02-.03-.04-.03-.07,0-.05-.01-.1-.05-.14-.04-.04-.09-.08-.15-.12-.07-.04-.14-.08-.23-.11-.09-.03-.18-.07-.29-.11-.19-.07-.35-.13-.47-.17s-.21-.07-.26-.08c-.03,.09-.06,.18-.08,.29-.02,.11-.04,.21-.04,.33,0,.11,0,.22,.02,.34,.02,.11,.05,.22,.1,.32,.05,.1,.12,.19,.21,.27,.09,.08,.21,.15,.35,.2,.13,.05,.26,.07,.37,.08,.11,0,.22,0,.31-.03,.09-.02,.17-.05,.23-.09,.06-.03,.11-.07,.14-.1,.01,0,.02,0,.02,0,.01,0,.02,.01,.04,.03s.02,.03,.01,.04c-.02,.03-.04,.06-.06,.09-.04,.07-.08,.15-.11,.24-.03,.07-.05,.15-.07,.22-.02,.07-.03,.14-.03,.19-.03,0-.06,0-.08-.01-.02,0-.03-.03-.03-.06Z\" style=\"", "\"></path><path d=\"M284.46,141.17c.02-.06,.05-.1,.09-.1,.03,0,.07,0,.1,.02,.1,.03,.19,.07,.26,.09,.08,.03,.15,.05,.22,.08,.06,.02,.13,.04,.18,.05,.06,.01,.11,.02,.17,.02,.03,0,.04,0,.03,.03,0,.02,0,.03-.01,.05,0,.02-.02,.03-.04,.03-.02,0-.04,0-.07,0-.02,0-.05,0-.07-.01-.02,0-.03,0-.04,0-.02,.03-.05,.09-.1,.19s-.1,.21-.17,.35c-.06,.13-.13,.28-.19,.43s-.12,.3-.17,.44c.04-.02,.09-.04,.17-.07,.08-.03,.17-.06,.27-.08s.21-.03,.32-.03,.22,.02,.33,.06c.11,.04,.2,.09,.28,.16s.14,.15,.19,.24c.04,.09,.07,.19,.07,.3s-.01,.23-.06,.35c-.04,.1-.09,.2-.17,.29s-.17,.18-.27,.26c-.1,.08-.22,.15-.35,.21-.13,.06-.26,.11-.4,.14-.14,.03-.28,.05-.41,.05-.14,0-.27-.03-.4-.07-.14-.05-.25-.11-.34-.17-.08-.07-.14-.13-.18-.19-.04-.06-.06-.11-.07-.16-.01-.04-.02-.07-.01-.08,.02-.02,.05-.09,.1-.2,.05-.11,.11-.24,.18-.41,.07-.16,.14-.34,.22-.53,.08-.2,.15-.39,.22-.58,.06-.17,.11-.31,.14-.42,.03-.12,.06-.21,.08-.29,.02-.08,.02-.14,.03-.18,0-.05,0-.08-.01-.11-.02-.06-.05-.09-.09-.11l-.05-.02Zm.07,1.99s-.05,.1-.08,.17c-.03,.07-.05,.14-.08,.21-.02,.07-.05,.13-.06,.19-.02,.06-.03,.09-.03,.11,0,.05,0,.1,.01,.16,.01,.06,.04,.12,.08,.18s.08,.12,.14,.17,.13,.09,.21,.12c.18,.07,.35,.06,.52-.03,.16-.08,.29-.26,.39-.52,.05-.15,.08-.28,.07-.39,0-.12-.03-.22-.07-.3-.04-.09-.09-.15-.16-.21-.06-.06-.12-.09-.18-.12-.08-.03-.16-.04-.22-.04-.06,0-.12,.01-.18,.03-.09,.03-.16,.06-.22,.11s-.1,.1-.14,.17Z\" style=\"", "\"></path><path d=\"M287.82,145.48s-.1,.03-.17,.06c-.07,.02-.15,.04-.23,.06-.09,.02-.18,.02-.28,.03-.1,0-.19-.02-.29-.05-.14-.05-.26-.12-.36-.21-.09-.09-.16-.19-.21-.3-.05-.11-.07-.23-.07-.36s.03-.26,.07-.39c.05-.15,.13-.28,.21-.38,.09-.1,.18-.18,.28-.25,.1-.06,.2-.11,.3-.14,.1-.03,.19-.05,.26-.06,.04,0,.08-.01,.13-.02,.05,0,.11,0,.17,0s.12,0,.19,.02,.13,.03,.2,.05c.12,.04,.24,.1,.34,.18,.1,.07,.19,.16,.25,.26s.11,.21,.12,.34c.02,.13,0,.26-.06,.41-.04,.12-.11,.22-.19,.32-.08,.09-.17,.17-.26,.23-.09,.06-.17,.11-.25,.15-.08,.04-.14,.06-.17,.08Zm-.51-.11c.16,.06,.31,.04,.44-.05,.13-.09,.24-.27,.34-.52,.05-.13,.07-.26,.07-.38,0-.12-.01-.24-.05-.34-.03-.11-.09-.2-.16-.28-.07-.08-.15-.14-.25-.17-.07-.03-.15-.03-.22-.02-.08,.01-.15,.05-.23,.1-.07,.05-.14,.13-.21,.22-.06,.09-.12,.2-.16,.32-.05,.13-.07,.26-.07,.38,0,.12,.03,.23,.07,.33,.04,.1,.1,.18,.17,.25,.07,.07,.16,.12,.25,.16Z\" style=\"", "\"></path><path d=\"M290.29,146.37s-.1,.03-.17,.06c-.07,.02-.15,.04-.23,.06-.09,.02-.18,.02-.28,.03-.1,0-.19-.02-.29-.05-.14-.05-.26-.12-.36-.21-.09-.09-.16-.19-.21-.3-.05-.11-.07-.23-.07-.36s.03-.26,.07-.39c.05-.15,.13-.28,.21-.38,.09-.1,.18-.18,.28-.25,.1-.06,.2-.11,.3-.14,.1-.03,.19-.05,.26-.06,.03,0,.08-.01,.13-.02,.05,0,.11,0,.17,0s.12,0,.19,.02c.07,0,.13,.03,.2,.05,.12,.04,.24,.1,.34,.18,.11,.07,.19,.16,.25,.26,.07,.1,.11,.21,.12,.34,.02,.13,0,.26-.06,.41-.04,.12-.11,.22-.19,.32-.08,.09-.17,.17-.26,.23-.09,.06-.18,.11-.25,.15-.08,.04-.14,.06-.17,.08Zm-.51-.11c.17,.06,.31,.04,.44-.05,.13-.09,.24-.27,.34-.52,.05-.13,.07-.25,.08-.38,0-.12-.01-.24-.05-.34-.03-.11-.09-.2-.15-.28-.07-.08-.15-.14-.25-.17-.07-.03-.15-.03-.22-.02s-.15,.05-.23,.1c-.07,.05-.14,.12-.21,.21s-.12,.2-.16,.32c-.05,.13-.07,.26-.07,.38,0,.12,.03,.23,.07,.33s.1,.18,.17,.25,.16,.12,.25,.16Z\" style=\"", "\"></path><path d=\"M291.87,146.2c-.02,.06-.05,.13-.08,.21s-.07,.17-.1,.27c-.04,.1-.05,.18-.03,.24,.02,.06,.05,.09,.1,.11,0,0,.01,0,.02,0,.01,0,.02,0,.04,0s.03,0,.04,0h.02s.01,.01,.01,.02c0,.01,0,.02,0,.03-.02,.01-.07,.02-.14,.03-.07,0-.15,.01-.24,.01-.09,0-.17,0-.24,0-.08,0-.13-.01-.17-.03-.04-.01-.07-.04-.08-.07-.02-.03-.02-.05-.02-.06,0,0,0-.01,0-.02,0,0,0,0,0,0,0,0,0,0,.01-.01,0,0,.01-.02,.02-.03,.02-.03,.05-.08,.08-.14,.03-.05,.06-.13,.1-.21,.04-.09,.08-.19,.13-.31s.11-.27,.18-.44c.05-.13,.1-.27,.15-.4,.05-.13,.09-.25,.14-.37,.04-.11,.08-.22,.12-.31,.03-.1,.06-.18,.09-.24,.05-.14,.08-.25,.09-.33,.01-.08,.02-.14,0-.17-.01-.04-.03-.06-.07-.08-.03-.01-.06-.03-.07-.03,0-.03,.02-.05,.03-.07,.01-.02,.03-.03,.04-.04,.02,0,.04-.01,.07,0,.05,.02,.11,.04,.18,.06,.07,.02,.14,.05,.22,.07,.08,.02,.15,.04,.23,.06s.14,.03,.2,.04c.02,0,.03,.01,.02,.02,0,.01-.01,.04-.03,.06,0,.02-.02,.02-.03,.02-.02,0-.03,0-.05,0-.02,0-.03,0-.04-.01-.01,0-.03,0-.04,.01,0,.01-.02,.03-.04,.05-.02,.02-.04,.05-.06,.09-.03,.05-.07,.13-.11,.22-.04,.09-.09,.2-.14,.31-.05,.11-.1,.24-.15,.36s-.11,.25-.15,.37c-.05,.12-.09,.23-.13,.33-.04,.1-.07,.19-.1,.25,.08,.03,.18,.04,.29,.04,.11,0,.22-.03,.33-.07,.11-.04,.2-.1,.29-.17,.09-.07,.15-.16,.19-.27,.03-.08,.02-.13-.04-.15-.05-.02-.09-.02-.13-.02-.04,0-.07,0-.08,0-.04-.02-.06-.04-.06-.06,0-.02,.02-.03,.04-.05,.02-.02,.04-.02,.06-.03,.06,.02,.13,.04,.21,.06,.08,.02,.16,.04,.24,.06,.08,.02,.16,.03,.24,.05,.07,.01,.14,.03,.19,.03,.01,.01,.02,.02,.01,.03,0,.03-.05,.07-.13,.14-.08,.07-.18,.14-.29,.22-.12,.07-.24,.14-.38,.2-.14,.06-.27,.1-.39,.11,.03,.03,.05,.08,.08,.16,.03,.07,.07,.16,.1,.25,.04,.09,.07,.19,.12,.29s.09,.2,.13,.29c.05,.09,.1,.17,.15,.23,.05,.07,.11,.11,.17,.13,.04,.02,.08,.02,.11,.02s.06,0,.09,0c.01,.01,.02,.03,.01,.04,0,.02-.03,.04-.06,.06-.03,.01-.09,.02-.17,.01-.05,0-.12,0-.19,0-.07,0-.14,0-.21,0s-.12,0-.17,0-.08,0-.09-.01c-.02-.01-.05-.06-.08-.12s-.07-.15-.11-.25c-.04-.1-.08-.2-.12-.32s-.08-.22-.13-.32c-.04-.1-.08-.19-.12-.28-.04-.08-.08-.14-.11-.17h-.03Z\" style=\"", "\"></path></g></g><g id=\"CenterPoint\"><circle cx=\"172.23\" cy=\"115.24\" r=\"2.1\" style=\"", "\"></circle></g><g id=\"Theme\"><g id=\"Toggler\" class=\"", "\"><g id=\"Background_Container\" data-name=\"Background Container\"><rect id=\"Background_Rectangle\" data-name=\"Background Rectangle\" x=\"164.34\" y=\"223.98\" width=\"14.16\" height=\"5.82\" rx=\"2.75\" ry=\"2.75\" style=\"", "\"></rect><g style=\"", "\"><g><g id=\"Bg_Circle_Group\" data-name=\"Bg Circle Group\"><circle cx=\"167.6\" cy=\"226.89\" r=\"7.76\" style=\"", "\"></circle><circle cx=\"167.6\" cy=\"226.89\" r=\"6\" style=\"", "\"></circle><circle cx=\"167.6\" cy=\"226.89\" r=\"4.09\" style=\"", "\"></circle></g><g id=\"Cloud\"><path d=\"M179.04,227.15c0-.83-.67-1.5-1.5-1.5s-1.5,.67-1.5,1.5c0,.08,0,.15,.02,.22-.53,.16-.93,.61-1.03,1.16-.15-.05-.32-.08-.49-.08-.48,0-.9,.22-1.18,.57-.16-.06-.34-.09-.52-.09-.3,0-.58,.09-.81,.24-.27-.34-.7-.57-1.17-.57-.6,0-1.11,.35-1.35,.85-.24-.21-.57-.34-.93-.34-.51,0-.96,.26-1.18,.64-.2-.25-.5-.41-.85-.41-.59,0-1.08,.48-1.08,1.08s.48,1.08,1.08,1.08c.41,0,.76-.22,.94-.56,.24,.3,.63,.5,1.08,.5s.82-.19,1.06-.47c.27,.38,.72,.63,1.22,.63,.3,0,.58-.09,.81-.24,.27,.34,.7,.57,1.17,.57s.9-.22,1.18-.57c.16,.06,.34,.09,.52,.09,.74,0,1.35-.53,1.47-1.23,.15,.05,.32,.08,.49,.08,.83,0,1.5-.67,1.5-1.5,0-.08,0-.15-.02-.22,.61-.19,1.05-.76,1.05-1.43h0Z\" style=\"", "\"></path><path d=\"M177.4,224.48c-.91,0-1.64,.73-1.64,1.64,0,.1,0,.19,.02,.28-.05,0-.1,0-.16,0-.46,0-.88,.19-1.18,.5-.15-.04-.3-.07-.46-.07-.69,0-1.28,.43-1.52,1.03-.18,0-.35,.04-.5,.09-.28-.25-.66-.41-1.07-.41-.67,0-1.24,.41-1.48,.99-.19-.08-.4-.13-.63-.13-.53,0-1,.26-1.29,.65-.27-.21-.61-.34-.98-.34-.89,0-1.6,.72-1.6,1.6s.72,1.6,1.6,1.6c.53,0,1-.26,1.29-.65,.27,.21,.61,.34,.98,.34,.67,0,1.24-.41,1.48-.99,.19,.08,.4,.13,.63,.13,.19,0,.37-.03,.54-.09,.28,.25,.66,.41,1.07,.41,.65,0,1.22-.39,1.47-.95,0,0,.02,0,.02,0,.46,0,.88-.19,1.18-.5,.15,.04,.3,.07,.46,.07,.91,0,1.64-.73,1.64-1.64,0-.1,0-.19-.02-.28,.05,0,.1,0,.16,0,.91,0,1.64-.73,1.64-1.64s-.73-1.64-1.64-1.64h0Z\" style=\"", "\"></path></g><g id=\"Inner_Shadow\" data-name=\"Inner Shadow\"><path id=\"Bottom_Shadow\" data-name=\"Bottom Shadow\" d=\"M167.25,230.41h8.34c1.6,0,2.91-1.31,2.91-2.91h0c0-.08,0-.16-.01-.24-.12,1.49-1.38,2.67-2.9,2.67h-8.34c-1.52,0-2.77-1.18-2.9-2.67,0,.08-.01,.16-.01,.24h0c0,1.6,1.31,2.91,2.91,2.91h0Z\" style=\"", "\"></path><path id=\"Top_Shadow\" data-name=\"Top Shadow\" d=\"M175.61,223.36h-8.34c-1.6,0-2.91,1.31-2.91,2.91h0c0,.08-.11,.17-.1,.25,.12-1.49,1.49-2.67,3.01-2.67h8.34c1.52,0,2.77,1.18,2.9,2.67,0-.08,.01-.16,.01-.24h0c0-1.6-1.31-2.91-2.91-2.91h0Z\" style=\"", "\"></path></g><g id=\"Star_Group\" data-name=\"Star Group\" style=\"", "\"><path d=\"M171.94,225.94l-.21,.12s-.03,.03-.04,.04l-.11,.21-.11-.2s-.03-.04-.06-.06l-.2-.11,.2-.11s.04-.03,.05-.06l.11-.2,.11,.21s.03,.04,.05,.05l.21,.11Z\" style=\"", "\"></path><path d=\"M171.38,227.42l-.1,.06s-.02,.01-.02,.02l-.05,.1-.05-.1s-.02-.02-.03-.03l-.1-.05,.1-.06s.02-.02,.03-.03l.05-.1,.06,.1s.01,.02,.02,.02l.1,.05Z\" style=\"", "\"></path><path d=\"M170.06,225.7l-.08,.05s-.01,.01-.02,.02l-.04,.08-.04-.08s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z\" style=\"", "\"></path><path d=\"M169.48,226.97l-.05,.03s0,0-.01,.01l-.03,.05-.03-.05s0-.01-.01-.01l-.05-.03,.05-.03s.01,0,.01-.01l.03-.05,.03,.05s0,0,.01,.01l.05,.03h0Z\" style=\"", "\"></path><path d=\"M170.4,228.22l-.16,.09s-.03,.02-.03,.03l-.08,.16-.08-.15s-.03-.03-.04-.04l-.15-.08,.15-.08s.03-.02,.04-.04l.08-.15,.09,.15s.02,.03,.04,.04l.15,.08h0Z\" style=\"", "\"></path><path d=\"M167.35,225.18l-.21,.12s-.03,.03-.04,.04l-.11,.21-.11-.2s-.03-.04-.06-.06l-.2-.11,.2-.11s.04-.03,.05-.06l.11-.2,.11,.2s.03,.04,.05,.05l.21,.11Z\" style=\"", "\"></path><path d=\"M167.22,226.69l-.11,.06s-.02,.01-.02,.02l-.06,.11-.06-.1s-.02-.02-.03-.03l-.1-.05,.1-.06s.02-.02,.03-.03l.06-.1,.06,.1s.01,.02,.03,.02l.11,.06Z\" style=\"", "\"></path><path d=\"M166.17,228.04l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z\" style=\"", "\"></path><path d=\"M165.78,228.5l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z\" style=\"", "\"></path><path d=\"M167.17,228.81l-.08,.04s-.01,0-.02,.02l-.04,.08-.04-.07s-.01-.02-.02-.02l-.08-.04,.08-.04s.02-.01,.02-.02l.04-.08,.04,.08s.01,.01,.02,.02l.08,.04h0Z\" style=\"", "\"></path><path d=\"M165.78,225.94l-.13,.07s-.02,.02-.03,.03l-.07,.13-.07-.12s-.02-.03-.03-.03l-.12-.06,.12-.07s.02-.02,.03-.03l.07-.12,.07,.12s.02,.02,.03,.03l.12,.07h0Z\" style=\"", "\"></path></g></g></g><rect x=\"164.34\" y=\"223.98\" width=\"14.16\" height=\"5.82\" rx=\"2.75\" ry=\"2.75\" style=\"", "\"></rect></g><g id=\"Button\"><circle cx=\"167.6\" cy=\"226.89\" r=\"2.26\" style=\"", "\"></circle><g style=\"", "\"><g><path id=\"Left_Path\" data-name=\"Left Path\" d=\"M169.7,225.77c.11,.26,.18,.55,.18,.85,0,1.24-1.06,2.25-2.36,2.25-.97,0-1.81-.56-2.17-1.37,.3,.95,1.19,1.64,2.24,1.64,1.3,0,2.35-1.05,2.35-2.35,0-.37-.09-.72-.24-1.03Z\" style=\"", "\"></path><path id=\"Top_Path\" data-name=\"Top Path\" d=\"M165.42,226.97c0-1.28,1.03-2.31,2.31-2.31,.45,0,.87,.18,1.22,.4-.38-.27-.84-.48-1.33-.48-1.28,0-2.31,1.03-2.31,2.31,0,.83,.49,1.52,1.14,1.93-.59-.42-1.03-1.08-1.03-1.86h0Z\" style=\"", "\"></path><g id=\"Moon\"><circle cx=\"172.21\" cy=\"226.89\" r=\"2.26\" style=\"", "\"></circle><g style=\"", "\"><g><path id=\"Left_Path-2\" data-name=\"Left Path-2\" d=\"M174.31,225.77c.11,.26,.18,.55,.18,.85,0,1.24-1.06,2.25-2.36,2.25-.97,0-1.81-.56-2.17-1.37,.3,.95,1.19,1.64,2.24,1.64,1.3,0,2.35-1.05,2.35-2.35,0-.37-.09-.72-.24-1.03h0Z\" style=\"", "\"></path><path id=\"Top_Path-2\" data-name=\"Top Path-2\" d=\"M170.03,226.97c0-1.28,1.03-2.31,2.31-2.31,.45,0,.87,.18,1.22,.4-.38-.27-.84-.48-1.33-.48-1.28,0-2.31,1.03-2.31,2.31,0,.83,.49,1.52,1.14,1.93-.59-.42-1.03-1.08-1.03-1.86h0Z\" style=\"", "\"></path><g id=\"Moon_Dots\" data-name=\"Moon Dots\"><circle cx=\"172.04\" cy=\"225.55\" r=\".35\" style=\"", "\"></circle><circle cx=\"173.1\" cy=\"227.53\" r=\".45\" style=\"", "\"></circle><circle cx=\"171.29\" cy=\"227.07\" r=\".74\" style=\"", "\"></circle></g></g></g></g></g></g></g></g></g></svg>"];
const MyAnimation = () => {
  const setting = p(settingStore);
  return ssr(_tmpl$$5, ssrHydrationKey(), "fill:" + "none", "fill:" + "#171311", "fill:" + "#0f0b0b", "fill:" + "url(#linear-gradient-65)", "fill:" + "none", "fill:" + "none", "fill:" + "none", "fill:" + "none" + (";stroke:" + "url(#linear-gradient)") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "0.5px"), "fill:" + "url(#linear-gradient-2)", "fill:" + "url(#linear-gradient-3)", "fill:" + "url(#linear-gradient-4)", "fill:" + "none" + (";stroke:" + "url(#linear-gradient-5)") + (";stroke-dasharray:" + "0 0 5 6") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round"), "fill:" + "#e34e26", "fill:" + "#f0672a", "fill:" + "#ededee", "fill:" + "#eaeaea", "fill:" + "#f0672a", "fill:" + "#fff", "fill:" + "#e34f26", "fill:" + "#1e74bb", "fill:" + "#1e88c7", "fill:" + "#fff", "fill:" + "#e7c92f", "fill:" + "#faf4dd", "fill:" + "#e6c61f", "fill:" + "#f4e5ad", "fill:" + "#f5ecc6", "fill:" + "#fddd22", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fddb00", "fill:" + "#fddb00", "fill:" + "#fddb00", "fill:" + "#fff", "fill:" + "#53c0dd", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#fff", "fill:" + "#55c0dd", "fill:" + "#3b5176", "fill:" + "#5389c4", "fill:" + "#91c2e5", "fill:" + "#82b9e0", "fill:" + "#4a7cbd", "fill:" + "#2f5593", "fill:" + "#345d9c", "fill:" + "#284a85", "fill:" + "#2a4e8a", "fill:" + "#3f6bb1", "fill:" + "#4c80c0", "fill:" + "#4879ba", "fill:" + "#4572b4", "fill:" + "#2a4d8a", "fill:" + "#5279aa", "fill:" + "#33456d", "fill:" + "#364972", "fill:" + "#223d63", "fill:" + "#597eac", "fill:" + "#354f73", "fill:" + "#2c456f", "fill:" + "#2f4566", "fill:" + "#23304e", "fill:" + "#5279aa", "fill:" + "#476693", "fill:" + "#46689a", "fill:" + "#27385f", "fill:" + "#516998", "fill:" + "#2e426b", "fill:" + "#536c9c", "fill:" + "#517198", "fill:" + "#3964a5", "fill:" + "#4472b5", "fill:" + "#2a4d8a", "fill:" + "#2a4d8a", "opacity:" + "0.95", "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-6)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-7)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-8)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-9)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-10)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-11)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-12)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-13)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-14)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-15)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#e2e2e2" + (";stroke:" + "#303030") + (";stroke-miterlimit:" + "10"), "fill:" + "#181c1e", "fill:" + "url(#linear-gradient-16)", "fill:" + "#181c1e", "fill:" + "#181c1e", "fill:" + "#181c1e", "fill:" + "url(#linear-gradient-17)", "fill:" + "#7a88c4", "fill:" + "url(#linear-gradient-18)", "fill:" + "#5454a4", "fill:" + "#ed2224", "fill:" + "#f26f63", "fill:" + "#181c1e", "fill:" + "#181c1e", "fill:" + "#f26f63", "fill:" + "#eeae8a", "fill:" + "#fab693", "fill:" + "#fab693", "fill:" + "#233871", "fill:" + "#10111e", "fill:" + "#fff" + (";stroke:" + "#8c8c8c") + (";stroke-miterlimit:" + "10"), "fill:" + "#fff" + (";stroke:" + "#8c8c8c") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "2px"), "fill:" + "#fff" + (";stroke:" + "#8c8c8c") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "2px"), "fill:" + "#fff" + (";stroke:" + "#8c8c8c") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "2px"), "fill:" + "url(#linear-gradient-19)", "fill:" + "#10111e", "fill:" + "#10122d", "fill:" + "#11123e", "fill:" + "#1a194b", "fill:" + "url(#linear-gradient-20)", "fill:" + "#10122d", "fill:" + "url(#linear-gradient-21)", "fill:" + "url(#linear-gradient-22)", "fill:" + "#404b75", "fill:" + "url(#linear-gradient-23)", "fill:" + "#404b75", "fill:" + "#222745", "fill:" + "url(#linear-gradient-24)", "fill:" + "#121123", "fill:" + "#121123", "fill:" + "#222745", "fill:" + "#2f3860", "fill:" + "#112", "fill:" + "#2f3860", "fill:" + "#2f3860", "fill:" + "#2f3860", "fill:" + "url(#linear-gradient-25)", "fill:" + "url(#linear-gradient-26)", "fill:" + "#11122e", "fill:" + "url(#linear-gradient-27)", "fill:" + "url(#linear-gradient-28)", "fill:" + "#090d10", "fill:" + "#12122b", "fill:" + "url(#linear-gradient-29)", "fill:" + "#171745", "fill:" + "#10111e", "fill:" + "#141143", "fill:" + "#202658", "fill:" + "url(#linear-gradient-30)", "fill:" + "url(#linear-gradient-31)", "fill:" + "#222745", "fill:" + "url(#linear-gradient-32)", "fill:" + "url(#linear-gradient-33)", "fill:" + "#2f3860", "fill:" + "#404b75", "fill:" + "url(#linear-gradient-34)", "fill:" + "url(#linear-gradient-35)", "fill:" + "#222745", "fill:" + "#10122d", "fill:" + "#10122d", "fill:" + "#10122d", "fill:" + "url(#linear-gradient-36)", "fill:" + "#10111e", "fill:" + "#222745", "fill:" + "url(#linear-gradient-37)", "fill:" + "url(#linear-gradient-38)", "fill:" + "#404b75", "fill:" + "url(#linear-gradient-39)", "fill:" + "#1b223f", "fill:" + "#112", "fill:" + "#060809", "fill:" + "#222745", "fill:" + "#112", "fill:" + "#222745", "fill:" + "#464c62", "fill:" + "#222659", "fill:" + "#112", "fill:" + "#404b75", "fill:" + "#2f3860", "fill:" + "#404b75", "fill:" + "#10122d", "fill:" + "#464c62", "fill:" + "url(#linear-gradient-40)", "fill:" + "#404b75", "fill:" + "#10122d", "fill:" + "#10122d", "fill:" + "#10122d", "fill:" + "url(#linear-gradient-41)", "fill:" + "url(#linear-gradient-42)", "fill:" + "#0c132b", "fill:" + "#171745", "fill:" + "#404b75", "fill:" + "#0c132b", "fill:" + "#141143", "fill:" + "#0c132b", "fill:" + "#10111e", "fill:" + "#0c132b", "fill:" + "#171745", "fill:" + "#404b75", "fill:" + "#0c132b", "fill:" + "#141143", "fill:" + "#0c132b", "fill:" + "#10111e", "fill:" + "#202658", "fill:" + "#10122d", "fill:" + "#404b75", "fill:" + "url(#linear-gradient-43)", "fill:" + "#112", "fill:" + "#25285f", "fill:" + "url(#linear-gradient-44)", "fill:" + "#2f3860", "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "#46494c") + (";stroke-miterlimit:" + "10"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-45)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "url(#linear-gradient-46)", "fill:" + "url(#linear-gradient-47)", "fill:" + "url(#linear-gradient-48)", "fill:" + "url(#linear-gradient-49)", "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-50)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-51)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-52)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#181c1e" + (";stroke:" + "url(#linear-gradient-53)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "clip-path:" + "url(#clippath)", "mask:" + "url(#mask)", "fill:" + "url(#radial-gradient)", "fill:" + "url(#linear-gradient-54)", "fill:" + "url(#linear-gradient-55)", "fill:" + "url(#linear-gradient-56)", "fill:" + "url(#linear-gradient-57)", "fill:" + "#f26f63", "fill:" + "url(#radial-gradient-2)", "fill:" + "url(#radial-gradient-3)", "fill:" + "#f27792", "fill:" + "#1d1314", "fill:" + "#171311", "clip-path:" + "url(#clippath-1)", "fill:" + "url(#radial-gradient-4)" + (";opacity:" + `${setting().darkmode ? "1" : "0"}`), "fill:" + "#0f0b0b", "clip-path:" + "url(#clippath-2)", "fill:" + "#241f1b", "fill:" + "url(#radial-gradient-5)" + (";opacity:" + `${setting().darkmode ? "1" : "0"}`), "fill:" + "url(#linear-gradient-58)" + (";stroke:" + "#181818") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-59)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-60)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-61)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "url(#linear-gradient-62)", "fill:" + "#82b9e0", "fill:" + "#fddb00", "fill:" + "none" + (";stroke:" + "url(#linear-gradient-63)") + (";stroke-dasharray:" + "0 0 0.4 1") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "0.25px"), "fill:" + "url(#radial-gradient-6)", "fill:" + "url(#linear-gradient-64)", "fill:" + "#e4e4e3", "fill:" + "#f0f0f0", "fill:" + "#cccbcb", "fill:" + "#e7e6e6", "fill:" + "#d7d7d7", "fill:" + "#e7e6e6", "fill:" + "#ccc", "fill:" + "#b3b3b3", "fill:" + "#d9d9d9", "fill:" + "#d9d9d9", "fill:" + "#e7e6e6", "fill:" + "#d9d9d9", "fill:" + "#d9d9d9", "fill:" + "#e8e8e8", "fill:" + "#949495", "fill:" + "#f0f0f0", "fill:" + "#d4d4d4", "fill:" + "#e4e4e3", "fill:" + "#d4d4d4", "fill:" + "#b8b8b9", "fill:" + "#d4d4d4", "fill:" + "#d4d4d4", "fill:" + "#e4e4e3", "fill:" + "#e4e4e3", "fill:" + "#e4e4e3", "fill:" + "#e8e8e8", "fill:" + "#e8e8e8", "fill:" + "#e4e4e3", "fill:" + "#e8e8e8", "fill:" + "#e8e8e8", "fill:" + "#e8e8e8", "fill:" + "#d7d7d7", "fill:" + "#b8babc", "fill:" + "#d7d7d7", "fill:" + "url(#linear-gradient-65)", "clip-path:" + "url(#clippath-3)", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#98bee3", "fill:" + "#98bee3", "fill:" + "#98bee3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#ef63a3", "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "#231f20" + (";stroke:" + "#181c1e") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.05px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-66)") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "0.5px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-67)") + (";stroke-linecap:" + "round") + (";stroke-linejoin:" + "round") + (";stroke-width:" + "0.5px"), "fill:" + "none" + (";stroke:" + "url(#linear-gradient-68)") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.75px"), "fill:" + "url(#linear-gradient-69)", "fill:" + "url(#linear-gradient-70)", "fill:" + "url(#linear-gradient-71)", "fill:" + "url(#linear-gradient-72)", "fill:" + "url(#linear-gradient-73)", "fill:" + "url(#linear-gradient-74)", "fill:" + "url(#linear-gradient-75)", "fill:" + "url(#linear-gradient-76)", "fill:" + "url(#linear-gradient-77)", "fill:" + "#10111e", `${setting().darkmode ? "animate" : ""}`, "fill:" + "#4282b4", "clip-path:" + "url(#clippath-4)", "fill:" + "#f6fcfe" + (";isolation:" + "isolate") + (";opacity:" + "0.1"), "fill:" + "#f6fcfe" + (";isolation:" + "isolate") + (";opacity:" + "0.2"), "fill:" + "#f6fcfe" + (";isolation:" + "isolate") + (";opacity:" + "0.4"), "fill:" + "#f6fcfe", "fill:" + "#f6fcfe" + (";isolation:" + "isolate") + (";opacity:" + "0.3"), "fill:" + "url(#linear-gradient-78)", "fill:" + "url(#linear-gradient-79)", "opacity:" + "0", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "#f6fcfe", "fill:" + "none" + (";stroke:" + "#f1efef") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.5px"), "fill:" + "#f8cc36", "clip-path:" + "url(#clippath-5)", "fill:" + "#1f2135" + (";isolation:" + "isolate") + (";opacity:" + "0.1"), "fill:" + "#f6fcfe", "fill:" + "#cecfdb", "clip-path:" + "url(#clippath-6)", "fill:" + "#1f2135" + (";isolation:" + "isolate") + (";opacity:" + "0.1"), "fill:" + "#f6fcfe", "fill:" + "#a0a5bc" + (";stroke:" + "#aaa9aa") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#a0a5bc" + (";stroke:" + "#aaa9aa") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"), "fill:" + "#a0a5bc" + (";stroke:" + "#aaa9aa") + (";stroke-miterlimit:" + "10") + (";stroke-width:" + "0.2px"));
};

const _tmpl$$4 = ["<div", " class=\"container px-4 sm:px-8\"><div class=\"max-w-[580px] mx-auto\">", "</div><div class=\"max-w-[500px] mx-auto my-[1rem] text-center\"><h5 class=\"text-lg text-indigo-500 my-2\">Hi My name is </h5><h1 class=\"text-4xl my-3\">Lwin Moe Paing</h1><h2 class=\"text-lg my-2\">\uD83E\uDD1D I\u2019m <span class=\"text-indigo-500 font-bold\">Frontend Developer</span>, and looking for help with Javascript Language to build Many Free Softwares to help people who can't afford to pay !</h2></div></div>"];
function HomePage() {
  return [createComponent(MetaHead, {
    title: "Home",
    body: "Portfolio : Lwin Moe Paing (Developer)"
  }), ssr(_tmpl$$4, ssrHydrationKey(), escape(createComponent(MyAnimation, {})))];
}

const _tmpl$$3 = ["<div", ">AboutPage</div>"];
function AboutPage() {
  return ssr(_tmpl$$3, ssrHydrationKey());
}

const _tmpl$$2 = ["<div", ">Catch22ExperiencePage</div>"];
function Catch22ExperiencePage() {
  return ssr(_tmpl$$2, ssrHydrationKey());
}

/// <reference path="../server/types.tsx" />

const fileRoutes = [{
  component: NotFound,
  path: "/*404"
}, {
  component: HomePage,
  path: "/"
}, {
  component: AboutPage,
  path: "/about/"
}, {
  component: Catch22ExperiencePage,
  path: "/sharing/catch-22-experience"
}];

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return fileRoutes;
};

const _tmpl$$1 = ["<span", " class=\"h-6 w-6 cursor-pointer hover:text-indigo-500\">", "</span>"],
  _tmpl$2$1 = ["<header", "><nav class=\"main-nav backdrop-blur-xl bg-white/20 dark:bg-black/10 z-30 top-0 shadow-sm fixed flex justify-center items-center px-4 sm:px-8 h-16 w-full\"><div class=\"max-wrapper w-full h-full flex justify-between items-center text-lg \"><h2 class=\"font-extrabold\">Lwin Moe Paing <span>Dev</span> </h2><div class=\"hidden sm:flex gap-5 font-bold \"><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div></div></nav></header>"];
function Navbar() {
  const setting = p(settingStore);
  return ssr(_tmpl$2$1, ssrHydrationKey(), escape(createComponent(A$1, {
    "class": "hover:text-indigo-500",
    href: "/blog",
    get children() {
      return [" ", "Blog", " "];
    }
  })), escape(createComponent(A$1, {
    "class": "hover:text-indigo-500",
    href: "/books",
    get children() {
      return [" ", "Books", " "];
    }
  })), escape(createComponent(A$1, {
    "class": "hover:text-indigo-500",
    href: "/sharing",
    get children() {
      return [" ", "Sharing", " "];
    }
  })), escape(createComponent(A$1, {
    "class": "hover:text-indigo-500",
    href: "/slides",
    get children() {
      return [" ", "Slides", " "];
    }
  })), escape(createComponent(Show, {
    get when() {
      return setting().darkmode;
    },
    get fallback() {
      return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(fiExports.FiMoon, {
        "class": "w-full h-full"
      })));
    },
    get children() {
      return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(fiExports.FiSun, {
        "class": "w-full h-full"
      })));
    }
  })));
}

const _tmpl$ = ["<link", " rel=\"preconnect\" href=\"https://fonts.googleapis.com\">"],
  _tmpl$2 = ["<link", " rel=\"preconnect\" href=\"https://fonts.gstatic.com\">"],
  _tmpl$3 = ["<link", " href=\"https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&amp;display=swap\" rel=\"stylesheet\">"];
function Root() {
  const setting = p(settingStore);
  return createComponent(Html, {
    lang: "en",
    get ["class"]() {
      return `${setting().darkmode ? "dark" : ""}`;
    },
    get children() {
      return [createComponent(Head, {
        get children() {
          return [createComponent(Title, {
            children: "Lwin Moe Paing Dev"
          }), createComponent(Meta$1, {
            charset: "utf-8"
          }), createComponent(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          }), ssr(_tmpl$, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey()), ssr(_tmpl$3, ssrHydrationKey())];
        }
      }), createComponent(Body, {
        "class": `dark:bg-black pt-[4rem] pb-[1rem] dark:text-slate-100`,
        get children() {
          return [createComponent(Navbar, {}), createComponent(ErrorBoundary, {
            get children() {
              return createComponent(Suspense, {
                get children() {
                  return createComponent(Routes, {
                    get children() {
                      return createComponent(FileRoutes, {});
                    }
                  });
                }
              });
            }
          }), createComponent(Scripts, {})];
        }
      })];
    }
  });
}

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
const dataFn = rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** Input parameters for to an Exchange factory function. */

/** Function responsible for receiving an observable [operation]{@link Operation} and returning a [result]{@link OperationResult}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware(exchanges);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {
  return createComponent(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;

  // @ts-ignore
  sharedConfig.context.requestContext = event;
  return createComponent(ServerContext.Provider, {
    value: event,
    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return event.tags;
        },
        get children() {
          return createComponent(StartRouter, {
            url: path,
            get out() {
              return event.routerContext;
            },
            location: path,
            get prevLocation() {
              return event.prevUrl;
            },
            data: dataFn,
            routes: fileRoutes,
            get children() {
              return [docType, createComponent(Root, {})];
            }
          });
        }
      });
    }
  });
}

const entryServer = createHandler(renderAsync(event => createComponent(StartServer, {
  event: event
})));

const MAX_REDIRECTS = 10;
async function handleRequest(req) {
  req.headers = {};
  req.method = "GET";
  const webRes = await entryServer({
    request: createRequest(req),
    env: { manifest }
  });
  return webRes;
}

var server = async req => {
  let webRes = await handleRequest(req);
  if (webRes.status === 200) {
    return webRes.text();
  } else if (webRes.status === 302) {
    let redirects = 1;
    while (redirects < MAX_REDIRECTS) {
      webRes = await handleRequest({ url: webRes.headers.get("location") });
      if (webRes.status === 200) {
        return webRes.text();
      } else if (webRes.status === 302) {
        redirects++;
      } else {
        return "<h1>Error</h1>";
      }
    }
  }
  return webRes.text();
};

export { server as default };
