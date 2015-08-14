(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var object = _x,
        property = _x2,
        receiver = _x3;
    desc = parent = getter = undefined;
    var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
};

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Tiles = _interopRequire(require("./tiles"));

/**
* Moza
*/

var Moza = (function (_Tiles) {
  function Moza() {
    _classCallCheck(this, Moza);

    _get(Object.getPrototypeOf(Moza.prototype), "constructor", this).call(this); // This will call the parent constructor=
  }

  _inherits(Moza, _Tiles);

  _createClass(Moza, {
    build: {

      /*
      * Build
      * @param {object} params - el, col & row
      */

      value: function build(params) {
        this.buildGrid(params);
        // Build the tiles. At this point we will have the size and position of all the tiles.
        this.buildTiles();
        // This will parse the
        this.showTile(params);
      }
    }
  });

  return Moza;
})(Tiles);

global.Moza = Moza;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qZHVndWF5L1NpdGVzL21vemEvc3JjL2pzL21vemEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7QUFFYixJQUFJLGVBQWUsR0FBRyxTQUFBLGVBQUEsQ0FBVSxHQUFHLEVBQUU7QUFBRSxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FBRSxDQUFDOztBQUU5RixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtBQUFFLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FBRSxNQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQUUsT0FBUSxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsUUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFLLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBUSxXQUFXLENBQUM7R0FBRSxDQUFDO0NBQUUsQ0FBQSxFQUFHLENBQUM7O0FBRWhjLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0FBV3JCLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsV0FBUyxFQUFFLE9BQU8sTUFBTSxFQWIwQjtBQWNoRCxVQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2Ys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Q0FBQztPQUN2QjtLQW9CRTtHQUNGLENBQUMsQ0FBQzs7QUFFSCxTQXRDSSxJQUFJLENBQUE7Q0F1Q1QsQ0FBQSxDQXZDa0IsS0FBSyxDQUFBLENBQUE7O0FBa0J4QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVGlsZXMgZnJvbSAnLi90aWxlcyc7XG5cbi8qKlxuKiBNb3phXG4qL1xuY2xhc3MgTW96YSBleHRlbmRzIFRpbGVzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTsgLy8gVGhpcyB3aWxsIGNhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3Rvcj1cbiAgfVxuXG4gIC8qXG4gICogQnVpbGRcbiAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gZWwsIGNvbCAmIHJvd1xuICAqL1xuICBidWlsZChwYXJhbXMpIHtcbiAgICB0aGlzLmJ1aWxkR3JpZChwYXJhbXMpO1xuICAgIC8vIEJ1aWxkIHRoZSB0aWxlcy4gQXQgdGhpcyBwb2ludCB3ZSB3aWxsIGhhdmUgdGhlIHNpemUgYW5kIHBvc2l0aW9uIG9mIGFsbCB0aGUgdGlsZXMuXG4gICAgdGhpcy5idWlsZFRpbGVzKCk7XG4gICAgLy8gVGhpcyB3aWxsIHBhcnNlIHRoZVxuICAgIHRoaXMuc2hvd1RpbGUocGFyYW1zKTtcbiAgfVxufVxuXG5nbG9iYWwuTW96YSA9IE1vemE7XG4iXX0=
},{"./tiles":7}],2:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? (this || self)
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this.getHeader('Content-Type');
    var serialize = request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

Request.prototype.then = function (fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":3,"reduce":4}],3:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],4:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var constants = {
  data: {
    url: "../data/data.json"
  },
  // The first tile size have the priority.
  // That mean will parse the tile size from top to bottom.
  // Its better to add the biggest tile at the top.
  TILE_SIZE: {
    XXL: {
      maxAmount: 1,
      col: 5,
      row: 5
    },
    XL: {
      maxAmount: 2,
      col: 4,
      row: 4
    },
    L: {
      maxAmount: 10,
      col: 3,
      row: 2
    },
    M: {
      maxAmount: 10,
      col: 2,
      row: 2
    },
    S: {
      maxAmount: 10,
      col: 2,
      row: 1
    },
    XS: {
      maxAmount: 50,
      col: 1,
      row: 1
    }
  }
};
exports.constants = constants;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var constants = require("./config").constants;

/**
* Grid
*/

var Grid = (function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.container = null;
    this.gridWidth = null;
    this.gridHeight = null;
    this.col = null;
    this.row = null;
    this.gridWidthSpacer = null;
    this.gridHeightSpacer = null;
    this.tileWidth = null;
    this.tileHeight = null;
    this.coords = {
      all: [],
      free: [],
      taken: []
    };
  }

  _createClass(Grid, {
    checkAvailabilityOfCoordsFromCoord: {

      /**
      * Check availability of coords from coord
      * @param {object} coords
      */

      value: function checkAvailabilityOfCoordsFromCoord(coords) {
        var _this = this;

        var y = 0;
        coords.forEach(function (coord) {
          var i = _this.coords.free.length;
          while (i--) {
            if (_this.coords.free[i].x === coord.x && _this.coords.free[i].y === coord.y) {
              y++;
            }
          }
        });
        return coords.length === y;
      }
    },
    getOccupationFromCoord: {

      /*
      * Get occupation from coord
      * This will get an array with all the point occuped by the tile
      * @param {number} totalCol
      * @param {number} totalRow
      * @param {object} coord
      */

      value: function getOccupationFromCoord(params) {
        var totalCol = params.totalCol;
        var totalRow = params.totalRow;
        var coord = params.coord;
        var coords = [];
        if (coord) {
          for (var i = 0; i < totalCol; i++) {
            for (var j = 0; j < totalRow; j++) {
              coords.push(this.getCoord(i + coord.x, j + coord.y));
            }
          }
          return coords;
        }
        // todo: should return something anyway
      }
    },
    getNewTileArea: {

      /*
      * Get new tileArea
      * Iterate across each free coordinates to test if the tile can be placed
      * @param {string} tileSize
      * @returns {array|undefined}
      */

      value: function getNewTileArea(tileSize) {
        var _this = this;

        var targets = [],
            totalCol = constants.TILE_SIZE[tileSize].col,
            totalRow = constants.TILE_SIZE[tileSize].row;
        this.coords.free.forEach(function (freeCoord) {
          // make sure the tile ending end don't go futher then the grid edge
          var tileRightEdge = (freeCoord.x + totalCol) * _this.tileWidth,
              tileBottomEdge = (freeCoord.y + totalRow) * _this.tileHeight;
          if (tileRightEdge <= _this.gridWidth && tileBottomEdge <= _this.gridHeight) {
            // We jsut fond a good spot for this tile.
            // It's time to check if the area is clear.
            var coords = _this.getOccupationFromCoord({ totalCol: totalCol, totalRow: totalRow, coord: freeCoord });
            if (_this.checkAvailabilityOfCoordsFromCoord(coords)) {
              targets.push(freeCoord);
            }
          }
        });
        // If the targets is empty that mean 2 things:
        // - the tile was to big
        // - the tile had the right size but no area was available
        return targets.length > 0 ? this.shuffle(targets) : undefined;
      }
    },
    putFreeCoorToTakenCoor: {

      /*
      * Put free coor to taken coor
      * @param {object} coord
      */

      value: function putFreeCoorToTakenCoor(coord) {
        var _this = this;

        //todo: Remove the if statement and add a filter before forEach
        this.coords.free.forEach(function (myCoord, index) {
          // todo: clean this up
          if (myCoord.x === coord.x && myCoord.y === coord.y) {
            _this.coords.free.splice(index, 1);
          }
        });
        this.coords.taken.push(coord);
      }
    },
    shuffle: {

      /*
      * Shuffle
      * @param {object} o
      */

      value: function shuffle(o) {
        for (var j = undefined, x = undefined, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
        return o;
      }
    },
    getCoord: {

      /*
      * Get coord
      * @param {number} x
      * @param {number} y
      */

      value: function getCoord(x, y) {
        return { x: x, y: y };
      }
    },
    setCoords: {

      /*
      * Set coords
      */

      value: function setCoords() {
        for (var i = 0; i < this.col; i++) {
          for (var j = 0; j < this.row; j++) {
            this.coords.all.push(this.getCoord(i, j));
          }
        }
        //  Clone the arrayY of all position and add it to free position array.
        this.coords.free = this.coords.all;
      }
    },
    showCoords: {

      /*
      * Show coords
      * This will show black dots for each coordonate
      */

      value: function showCoords() {
        var _this = this;

        this.coords.all.forEach(function (coord) {
          var left = _this.gridWidth / _this.col * coord.x,
              top = _this.gridHeight / _this.row * coord.y;
          left = left * 100 / _this.gridWidth;
          top = top * 100 / _this.gridHeight;
          var node = document.createElement("DIV");
          node.style.cssText = "top: " + (top - 0.5) + "%; left: " + (left - 0.2) + "%";
          _this.container.appendChild(node);
        });
      }
    },
    buildGrid: {

      /*
      * Build grid
      * @param {string} el
      * @param {number} gCol
      * @param {number} gRow
      */

      value: function buildGrid(params) {
        var el = params.el;
        var col = params.col;
        var row = params.row;

        this.el = el;
        this.container = document.getElementById(el);
        this.gridWidth = this.container.clientWidth;
        this.gridHeight = this.container.clientHeight;
        this.col = col; //todo: this should be more specific. it will help understand the code when we call this from a sub function.
        this.row = row;
        this.gridWidthSpacer = 2 * 100 / this.gridWidth;
        this.gridHeightSpacer = 2 * 100 / this.gridHeight;
        this.tileWidth = this.gridWidth / col; //todo: find a more specific name for this. its more a zone or area then tile
        this.tileHeight = this.gridHeight / row;

        // Set coordonate
        this.setCoords();
        this.showCoords();
      }
    }
  });

  return Grid;
})();

module.exports = Grid;

},{"./config":5}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var object = _x,
        property = _x2,
        receiver = _x3;
    desc = parent = getter = undefined;
    var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
};

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var constants = require("./config").constants;

var Grid = _interopRequire(require("./grid"));

var request = _interopRequire(require("../../node_modules/superagent/lib/client.js"));

/**
* Tile
*/

var Tiles = (function (_Grid) {
  function Tiles() {
    _classCallCheck(this, Tiles);

    _get(Object.getPrototypeOf(Tiles.prototype), "constructor", this).call(this); // This will call the parent constructor
    this.tiles = [];
    this.tileQueue = [];
    for (var i = 0, len = 40; i < len; i++) {
      this.tiles.push({
        id: i,
        title: "title",
        img: ""
      });
    }
  }

  _inherits(Tiles, _Grid);

  _createClass(Tiles, {
    showTile: {
      value: function showTile(params) {
        var _this = this;

        var url = params.url;
        var that = this;
        //todo: optomize this. code duplication.
        if (url) {
          console.log(url);
          request.get(url).end(function (err, res) {
            res = JSON.parse(res.text);
            that.tileQueue.forEach(function (item, index) {
              var node = document.createElement("DIV");
              node.style.cssText = "top: " + item.y + "%; left: " + item.x + "%; width: " + item.width + "%; height: " + item.height + "%; background-image: url(" + res[index].img + ")";
              node.className = "tile";
              that.container.appendChild(node);
            });
          });
        } else {
          this.tileQueue.forEach(function (item, index) {
            var node = document.createElement("DIV");
            node.style.cssText = "top: " + item.y + "%; left: " + item.x + "%; width: " + item.width + "%; height: " + item.height + "%";
            node.className = "tile";
            _this.container.appendChild(node);
          });
        }
      }
    },
    getNextTileSize: {

      /*
      * Get next tile size
      * This will get the next tile size to use.
      * @param {string} tileIndex
      */

      value: function getNextTileSize(tileIndex) {
        var currentTileCount = 0,
            tileSize = null;
        for (var size in constants.TILE_SIZE) {
          currentTileCount = currentTileCount + constants.TILE_SIZE[size].maxAmount;
          if (tileIndex < currentTileCount) {
            return size;
          }
        }
        return tileSize;
      }
    },
    reduceTileSize: {

      /*
      * Reduce tile size
      * This is checking all the tile size and look for the next area smaller then the current one.
      * To find the area we just ened to multiply the col and row (constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row)
      * @param {string} currentTileSize - big, medium, small, ect.
      */

      value: function reduceTileSize(currentTileSize) {
        var currentTile = constants.TILE_SIZE[currentTileSize],
            currentTileArea = currentTile.col * currentTile.row,
            nextSize = null; // This will return null if no smaller tile are found.
        for (var size in constants.TILE_SIZE) {
          var nextTileArea = constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row;
          if (nextTileArea < currentTileArea) {
            return size;
          }
        }
        return nextSize;
      }
    },
    getMaxTileCount: {

      /*
      * Get max tile count
      */

      value: function getMaxTileCount() {
        var maxTileCount = 0;
        for (var size in constants.TILE_SIZE) {
          maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
        }
        return maxTileCount;
      }
    },
    buildTiles: {

      /*
      * Build tiles
      */

      value: function buildTiles() {
        var _this = this;

        var size = null,
            tileCount = 0,
            maxTile = this.getMaxTileCount();

        this.tiles.forEach(function (tile, index) {
          if (_this.coords.free.length > 0 && tileCount < maxTile) {
            (function () {

              tile.size = _this.getNextTileSize(tileCount);
              var availableAreaCoords = null;

              // If no space were found that mean the tile is to big.
              // Need to size it down a bit
              var findNextAvailableAreaCoords = (function () {
                tile.size = this.reduceTileSize(tile.size);
                if (!tile.size) {
                  return undefined;
                }
                var availableAreaCoords = this.getNewTileArea(tile.size);
                if (!availableAreaCoords) {
                  return findNextAvailableAreaCoords();
                }
                return availableAreaCoords;
              }).bind(_this);

              // Check if we found a place for the tile
              availableAreaCoords = findNextAvailableAreaCoords();
              // Just making sure we have space for this tile.
              // We wont need this condition after I make a recursion for the downsizing tile function
              if (availableAreaCoords) {
                tileCount++;
                tile.key = index;
                tile.target = availableAreaCoords[0]; //Take the first one in the array. They are already shoveled
                tile.col = constants.TILE_SIZE[tile.size].col;
                tile.row = constants.TILE_SIZE[tile.size].row;
                var myTile = new Tile(_this, tile);

                // Update free & taken coords
                var tileOccupationCoords = _this.getOccupationFromCoord({ totalCol: tile.col, totalRow: tile.row, coord: tile.target });
                tileOccupationCoords.forEach(function (coords) {
                  _this.putFreeCoorToTakenCoor(coords);
                });
                _this.tileQueue.push(myTile.getTileInfos());
              } else {}
            })();
          }
        });
      }
    }
  });

  return Tiles;
})(Grid);

/**
* Tile
* @param {object} grid
* @param {object} params
*/
function Tile(grid, params) {
  this.grid = grid;
  this.params = params;
}

/*
* Get tile infos
*/
Tile.prototype.getTileInfos = function () {
  var _params = this.params;
  var size = _params.size;
  var target = _params.target;
  var col = _params.col;
  var row = _params.row;
  var key = _params.key;var _grid = this.grid;
  var tileWidth = _grid.tileWidth;
  var tileHeight = _grid.tileHeight;
  var gridWidth = _grid.gridWidth;
  var gridHeight = _grid.gridHeight;
  var gridWidthSpacer = _grid.gridWidthSpacer;
  var gridHeightSpacer = _grid.gridHeightSpacer;

  return {
    size: size,
    x: target.x * tileWidth * 100 / gridWidth,
    y: target.y * tileHeight * 100 / gridHeight,
    width: col * 100 / this.grid.col - gridWidthSpacer,
    height: row * 100 / this.grid.row - gridHeightSpacer,
    id: key
  };
};

module.exports = Tiles;

// no tile added to the queue because we did not find the space for it

},{"../../node_modules/superagent/lib/client.js":2,"./config":5,"./grid":6}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW96YS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyIsIi9Vc2Vycy9qZHVndWF5L1NpdGVzL21vemEvc3JjL2pzL2NvbmZpZy5qcyIsIi9Vc2Vycy9qZHVndWF5L1NpdGVzL21vemEvc3JjL2pzL2dyaWQuanMiLCIvVXNlcnMvamR1Z3VheS9TaXRlcy9tb3phL3NyYy9qcy90aWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbG5DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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UyxDQUFBO0FBMENkLE1BMUNnQixVQUFVLEdBQUEsS0FBQSxDQUFWLFVBQVUsQ0FBQTtBQTJDMUIsTUEzQzRCLFNBQVMsR0FBQSxLQUFBLENBQVQsU0FBUyxDQUFBO0FBNENyQyxNQTVDdUMsVUFBVSxHQUFBLEtBQUEsQ0FBVixVQUFVLENBQUE7QUE2Q2pELE1BN0NtRCxlQUFlLEdBQUEsS0FBQSxDQUFmLGVBQWUsQ0FBQTtBQThDbEUsTUE5Q29FLGdCQUFnQixHQUFBLEtBQUEsQ0FBaEIsZ0JBQWdCLENBQUE7O0FBQ3BGLFNBQU87QUFDTCxRQUFJLEVBQUosSUFBSTtBQUNKLEtBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUztBQUN6QyxLQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVU7QUFDM0MsU0FBSyxFQUFFLEdBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUksZUFBZTtBQUNwRCxVQUFNLEVBQUUsR0FBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxnQkFBZ0I7QUFDdEQsTUFBRSxFQUFFLEdBQUc7R0FDUixDQUFDO0NBQ0gsQ0FBQzs7QUFpREYsTUFBTSxDQUFDLE9BQU8sR0EvQ0MsS0FBSyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajtcbn07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlO1xuICAgIH1PYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTtcbiAgfXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgX2FnYWluID0gZmFsc2U7XG4gICAgdmFyIG9iamVjdCA9IF94LFxuICAgICAgICBwcm9wZXJ0eSA9IF94MixcbiAgICAgICAgcmVjZWl2ZXIgPSBfeDM7XG4gICAgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDtcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7aWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO2lmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF94ID0gcGFyZW50O1xuICAgICAgICBfeDIgPSBwcm9wZXJ0eTtcbiAgICAgICAgX3gzID0gcmVjZWl2ZXI7XG4gICAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlIF9mdW5jdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjICYmIGRlc2Mud3JpdGFibGUpIHtcbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7aWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9cmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTtpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIFRpbGVzID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuL3RpbGVzXCIpKTtcblxuLyoqXG4qIE1vemFcbiovXG5cbnZhciBNb3phID0gKGZ1bmN0aW9uIChfVGlsZXMpIHtcbiAgZnVuY3Rpb24gTW96YSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW96YSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNb3phLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzKTsgLy8gVGhpcyB3aWxsIGNhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3Rvcj1cbiAgfVxuXG4gIF9pbmhlcml0cyhNb3phLCBfVGlsZXMpO1xuXG4gIF9jcmVhdGVDbGFzcyhNb3phLCB7XG4gICAgYnVpbGQ6IHtcblxuICAgICAgLypcbiAgICAgICogQnVpbGRcbiAgICAgICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIGVsLCBjb2wgJiByb3dcbiAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZChwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5idWlsZEdyaWQocGFyYW1zKTtcbiAgICAgICAgLy8gQnVpbGQgdGhlIHRpbGVzLiBBdCB0aGlzIHBvaW50IHdlIHdpbGwgaGF2ZSB0aGUgc2l6ZSBhbmQgcG9zaXRpb24gb2YgYWxsIHRoZSB0aWxlcy5cbiAgICAgICAgdGhpcy5idWlsZFRpbGVzKCk7XG4gICAgICAgIC8vIFRoaXMgd2lsbCBwYXJzZSB0aGVcbiAgICAgICAgdGhpcy5zaG93VGlsZShwYXJhbXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIE1vemE7XG59KShUaWxlcyk7XG5cbmdsb2JhbC5Nb3phID0gTW96YTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXFaSFZuZFdGNUwxTnBkR1Z6TDIxdmVtRXZjM0pqTDJwekwyMXZlbUV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRmxCUVZrc1EwRkJRenM3UVVGRllpeEpRVUZKTEdWQlFXVXNSMEZCUnl4VFFVRkJMR1ZCUVVFc1EwRkJWU3hIUVVGSExFVkJRVVU3UVVGQlJTeFRRVUZQTEVkQlFVY3NTVUZCU1N4SFFVRkhMRU5CUVVNc1ZVRkJWU3hIUVVGSExFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNSMEZCUnl4SFFVRkhMRU5CUVVNN1EwRkJSU3hEUVVGRE96dEJRVVU1Uml4SlFVRkpMRmxCUVZrc1IwRkJSeXhEUVVGRExGbEJRVms3UVVGQlJTeFhRVUZUTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVVTdRVUZCUlN4VFFVRkxMRWxCUVVrc1IwRkJSeXhKUVVGSkxFdEJRVXNzUlVGQlJUdEJRVUZGTEZWQlFVa3NTVUZCU1N4SFFVRkhMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZMTEVOQlFVTXNXVUZCV1N4SFFVRkhMRWxCUVVrc1EwRkJReXhKUVVGTExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU03UzBGQlJTeE5RVUZQTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMGRCUVVVc1QwRkJVU3hWUVVGVkxGZEJRVmNzUlVGQlJTeFZRVUZWTEVWQlFVVXNWMEZCVnl4RlFVRkZPMEZCUVVVc1VVRkJTU3hWUVVGVkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1YwRkJWeXhEUVVGRExGTkJRVk1zUlVGQlJTeFZRVUZWTEVOQlFVTXNRMEZCUXl4SlFVRkxMRmRCUVZjc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1YwRkJWeXhEUVVGRExFTkJRVU1zVDBGQlVTeFhRVUZYTEVOQlFVTTdSMEZCUlN4RFFVRkRPME5CUVVVc1EwRkJRU3hGUVVGSExFTkJRVU03TzBGQlJXaGpMRWxCUVVrc1NVRkJTU3hIUVVGSExGTkJRVk1zUjBGQlJ5eERRVUZCTEVWQlFVRXNSVUZCUVN4SFFVRkJMRVZCUVVFc1IwRkJRU3hGUVVGQk8wRkJWM0pDTEUxQlFVa3NUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenM3UVVGRmJFSXNWMEZCVXl4RlFVRkZMRTlCUVU4c1RVRkJUU3hGUVdJd1FqdEJRV05vUkN4VlFVRk5MRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMllzVVVGbWIwSXNUVUZCVFN4SFFVRkJMRVZCUVVFN1VVRkJSU3hSUVVGUkxFZEJRVUVzUjBGQlFUdFJRVUZGTEZGQlFWRXNSMEZCUVN4SFFVRkJMRU5CUVVFN1FVRkJVU3hSUVVGSkxFZEJRVzlHTEUxQlFVMHNSMEZCTmswc1RVRkJUU3hIUVVGQkxGTkJRVUVzUTBGQlFUdEJRVUZ5VkN4UlFVRkpMRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zZDBKQlFYZENMRU5CUVVNc1RVRkJUU3hGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETEVsQlFVc3NTVUZCU1N4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVGRkxGVkJRVWtzVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zU1VGQlN5eE5RVUZOTEV0QlFVc3NTVUZCU1N4RlFVRkZPMEZCUVVVc1pVRkJUeXhUUVVGVExFTkJRVU03VDBGQlJTeE5RVUZOTzBGQmRVSnNUeXhWUVVGRkxFZEJka0kyVHl4TlFVRk5MRU5CUVVFN1FVRjNRbkpRTEZkQlFVY3NSMEY0UW05UUxGRkJRVkVzUTBGQlFUdEJRWGxDTDFBc1YwRkJSeXhIUVhwQ09GQXNVVUZCVVN4RFFVRkJPMEZCTUVKNlVTeGpRVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTJRc2FVSkJRVk1zVTBGQlV5eERRVUZETzA5Qk0wSXdVRHRMUVVGRkxFMUJRVTBzU1VGQlNTeFBRVUZQTEVsQlFVa3NTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVU3UVVGQlJTeGhRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1MwRkJSU3hOUVVGTk8wRkJRVVVzVlVGQlNTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGTExFMUJRVTBzUzBGQlN5eFRRVUZUTEVWQlFVVTdRVUZCUlN4bFFVRlBMRk5CUVZNc1EwRkJRenRQUVVGRkxFOUJRVkVzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRMUVVGRk8wZEJRVVU3UTBGQlFTeERRVUZET3p0QlFVVXhZeXhKUVVGSkxGTkJRVk1zUjBGQlJ5eFRRVUZCTEZOQlFVRXNRMEZCVlN4UlFVRlJMRVZCUVVVc1ZVRkJWU3hGUVVGRk8wRkJRVVVzVFVGQlNTeFBRVUZQTEZWQlFWVXNTMEZCU3l4VlFVRlZMRWxCUVVrc1ZVRkJWU3hMUVVGTExFbEJRVWtzUlVGQlJUdEJRVUZGTEZWQlFVMHNTVUZCU1N4VFFVRlRMRU5CUVVNc01FUkJRVEJFTEVkQlFVY3NUMEZCVHl4VlFVRlZMRU5CUVVNc1EwRkJRenRIUVVGRkxGRkJRVk1zUTBGQlF5eFRRVUZUTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhWUVVGVkxFbEJRVWtzVlVGQlZTeERRVUZETEZOQlFWTXNSVUZCUlN4RlFVRkZMRmRCUVZjc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFJRVUZSTEVWQlFVVXNWVUZCVlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hSUVVGUkxFVkJRVVVzU1VGQlNTeEZRVUZGTEZsQlFWa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlN5eFZRVUZWTEVWQlFVVXNVVUZCVVN4RFFVRkRMRk5CUVZNc1IwRkJSeXhWUVVGVkxFTkJRVU03UTBGQlJTeERRVUZET3p0QlFVVm9ZaXhKUVVGSkxHVkJRV1VzUjBGQlJ5eFRRVUZCTEdWQlFVRXNRMEZCVlN4UlFVRlJMRVZCUVVVc1YwRkJWeXhGUVVGRk8wRkJRVVVzVFVGQlNTeEZRVUZGTEZGQlFWRXNXVUZCV1N4WFFVRlhMRU5CUVVFc1JVRkJSenRCUVVGRkxGVkJRVTBzU1VGQlNTeFRRVUZUTEVOQlFVTXNiVU5CUVcxRExFTkJRVU1zUTBGQlF6dEhRVUZGTzBOQlFVVXNRMEZCUXpzN1FVRkZha3NzU1VGV1R5eExRVUZMTEVkQlFVRXNaVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJUU3hUUVVGVExFTkJRVUVzUTBGQlFTeERRVUZCT3pzN096czdRVUZuUWpOQ0xFbEJXRTBzU1VGQlNTeEhRVUZCTEVOQlFVRXNWVUZCUVN4TlFVRkJMRVZCUVVFN1FVRkRSeXhYUVVSUUxFbEJRVWtzUjBGRFRUdEJRVmxhTEcxQ1FVRmxMRU5CUVVNc1NVRkJTU3hGUVdKc1FpeEpRVUZKTEVOQlFVRXNRMEZCUVRzN1FVRkZUaXhSUVVGQkxFTkJRVUVzVFVGQlFTeERRVUZCTEdOQlFVRXNRMEZHUlN4SlFVRkpMRU5CUVVFc1UwRkJRU3hEUVVGQkxFVkJRVUVzWVVGQlFTeEZRVUZCTEVsQlFVRXNRMEZCUVN4RFFVRkJMRWxCUVVFc1EwRkJRU3hKUVVGQkxFTkJRVUVzUTBGRlJUdEhRVU5VT3p0QlFXVkVMRmRCUVZNc1EwRnNRa3dzU1VGQlNTeEZRVUZCTEUxQlFVRXNRMEZCUVN4RFFVRkJPenRCUVc5Q1VpeGpRVUZaTEVOQmNFSlNMRWxCUVVrc1JVRkJRVHRCUVZOU0xGTkJRVXNzUlVGQlFUczdPenM3T3p0QlFXMUNSQ3hYUVVGTExFVkJia0pLTEZOQlFVRXNTMEZCUVN4RFFVRkRMRTFCUVUwc1JVRkJSVHRCUVVOYUxGbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN08wRkJSWFpDTEZsQlFVa3NRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenM3UVVGRmJFSXNXVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dFBRVU4yUWp0TFFXOUNSVHRIUVVOR0xFTkJRVU1zUTBGQlF6czdRVUZGU0N4VFFYUkRTU3hKUVVGSkxFTkJRVUU3UTBGMVExUXNRMEZCUVN4RFFYWkRhMElzUzBGQlN5eERRVUZCTEVOQlFVRTdPMEZCYTBKNFFpeE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReUlzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1cGJYQnZjblFnVkdsc1pYTWdabkp2YlNBbkxpOTBhV3hsY3ljN1hHNWNiaThxS2x4dUtpQk5iM3BoWEc0cUwxeHVZMnhoYzNNZ1RXOTZZU0JsZUhSbGJtUnpJRlJwYkdWeklIdGNiaUFnWTI5dWMzUnlkV04wYjNJb0tTQjdYRzRnSUNBZ2MzVndaWElvS1RzZ0x5OGdWR2hwY3lCM2FXeHNJR05oYkd3Z2RHaGxJSEJoY21WdWRDQmpiMjV6ZEhKMVkzUnZjajFjYmlBZ2ZWeHVYRzRnSUM4cVhHNGdJQ29nUW5WcGJHUmNiaUFnS2lCQWNHRnlZVzBnZTI5aWFtVmpkSDBnY0dGeVlXMXpJQzBnWld3c0lHTnZiQ0FtSUhKdmQxeHVJQ0FxTDF4dUlDQmlkV2xzWkNod1lYSmhiWE1wSUh0Y2JpQWdJQ0IwYUdsekxtSjFhV3hrUjNKcFpDaHdZWEpoYlhNcE8xeHVJQ0FnSUM4dklFSjFhV3hrSUhSb1pTQjBhV3hsY3k0Z1FYUWdkR2hwY3lCd2IybHVkQ0IzWlNCM2FXeHNJR2hoZG1VZ2RHaGxJSE5wZW1VZ1lXNWtJSEJ2YzJsMGFXOXVJRzltSUdGc2JDQjBhR1VnZEdsc1pYTXVYRzRnSUNBZ2RHaHBjeTVpZFdsc1pGUnBiR1Z6S0NrN1hHNGdJQ0FnTHk4Z1ZHaHBjeUIzYVd4c0lIQmhjbk5sSUhSb1pWeHVJQ0FnSUhSb2FYTXVjMmh2ZDFScGJHVW9jR0Z5WVcxektUdGNiaUFnZlZ4dWZWeHVYRzVuYkc5aVlXd3VUVzk2WVNBOUlFMXZlbUU3WEc0aVhYMD0iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgncmVkdWNlJyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3QgPSAndW5kZWZpbmVkJyA9PSB0eXBlb2Ygd2luZG93XG4gID8gKHRoaXMgfHwgc2VsZilcbiAgOiB3aW5kb3c7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBUT0RPOiBmdXR1cmUgcHJvb2YsIG1vdmUgdG8gY29tcG9lbnQgbGFuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0hvc3Qob2JqKSB7XG4gIHZhciBzdHIgPSB7fS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgc3dpdGNoIChzdHIpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZpbGVdJzpcbiAgICBjYXNlICdbb2JqZWN0IEJsb2JdJzpcbiAgICBjYXNlICdbb2JqZWN0IEZvcm1EYXRhXSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG51bGwgIT0gb2JqW2tleV0pIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4gLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFydHM7XG4gIHZhciBwYWlyO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwYXJ0cyA9IHBhaXIuc3BsaXQoJz0nKTtcbiAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gdHlwZShzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJhbXMoc3RyKXtcbiAgcmV0dXJuIHJlZHVjZShzdHIuc3BsaXQoLyAqOyAqLyksIGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLylcbiAgICAgICwga2V5ID0gcGFydHMuc2hpZnQoKVxuICAgICAgLCB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHRoaXMuc2V0U3RhdHVzUHJvcGVydGllcyh0aGlzLnhoci5zdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG4gIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICA/IHRoaXMucGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgIDogbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAvLyBjb250ZW50LXR5cGVcbiAgdmFyIGN0ID0gdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB0eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgdmFyIG9iaiA9IHBhcmFtcyhjdCk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHRoaXNba2V5XSA9IG9ialtrZXldO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpe1xuICB2YXIgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAvLyBoYW5kbGUgSUU5IGJ1ZzogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cblxuICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IDEgPT0gdHlwZTtcbiAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgdGhpcy5jbGllbnRFcnJvciA9IDQgPT0gdHlwZTtcbiAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgID8gdGhpcy50b0Vycm9yKClcbiAgICA6IGZhbHNlO1xuXG4gIC8vIHN1Z2FyXG4gIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXM7XG4gIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG4gIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcblxuICB2YXIgbXNnID0gJ2Nhbm5vdCAnICsgbWV0aG9kICsgJyAnICsgdXJsICsgJyAoJyArIHRoaXMuc3RhdHVzICsgJyknO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9O1xuICB0aGlzLl9oZWFkZXIgPSB7fTtcbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB2YXIgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgfVxuXG4gICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICB2YXIgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgIG5ld19lcnIucmVzcG9uc2UgPSByZXM7XG4gICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuXG4gICAgc2VsZi5jYWxsYmFjayhuZXdfZXJyLCByZXMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBTZXQgdGltZW91dCB0byBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbihtcyl7XG4gIHRoaXMuX3RpbWVvdXQgPSBtcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3RpbWVvdXQgPSAwO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLmFib3J0ZWQpIHJldHVybjtcbiAgdGhpcy5hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIuYWJvcnQoKTtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oZmllbGQsIHZhbCl7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5nZXRIZWFkZXIgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3Mpe1xuICB2YXIgc3RyID0gYnRvYSh1c2VyICsgJzonICsgcGFzcyk7XG4gIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBzdHIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuKlxuKiBFeGFtcGxlczpcbipcbiogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4qICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4qXG4qIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4qIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuKiBAYXBpIHB1YmxpY1xuKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICogcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB0aGlzLl9mb3JtRGF0YS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBmaWxlbmFtZWAuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBxdWVyeXN0cmluZ1xuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG11bHRpcGxlIGRhdGEgXCJ3cml0ZXNcIlxuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuc2VuZCh7IHNlYXJjaDogJ3F1ZXJ5JyB9KVxuICogICAgICAgICAuc2VuZCh7IHJhbmdlOiAnMS4uNScgfSlcbiAqICAgICAgICAgLnNlbmQoeyBvcmRlcjogJ2Rlc2MnIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaiB8fCBpc0hvc3QoZGF0YSkpIHJldHVybiB0aGlzO1xuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0RXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgb2YgJyArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKDAgPT0gc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICBpZiAoc2VsZi5hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdmFyIGhhbmRsZVByb2dyZXNzID0gZnVuY3Rpb24oZSl7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgfVxuICB0cnkge1xuICAgIGlmICh4aHIudXBsb2FkICYmIHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgfVxuXG4gIC8vIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB2YXIgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuICB4aHIuc2VuZChkYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZhdXggcHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG4gIHJldHVybiB0aGlzLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgIGVyciA/IHJlamVjdChlcnIpIDogZnVsZmlsbChyZXMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RgLlxuICovXG5cbnJlcXVlc3QuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogSXNzdWUgYSByZXF1ZXN0OlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgIHJlcXVlc3QoJ0dFVCcsICcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnLCBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdXJsIG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5kZWwgPSBmdW5jdGlvbih1cmwsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0O1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiXG4vKipcbiAqIFJlZHVjZSBgYXJyYCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtNaXhlZH0gaW5pdGlhbFxuICpcbiAqIFRPRE86IGNvbWJhdGlibGUgZXJyb3IgaGFuZGxpbmc/XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIGZuLCBpbml0aWFsKXsgIFxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBjdXJyID0gYXJndW1lbnRzLmxlbmd0aCA9PSAzXG4gICAgPyBpbml0aWFsXG4gICAgOiBhcnJbaWR4KytdO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBjdXJyID0gZm4uY2FsbChudWxsLCBjdXJyLCBhcnJbaWR4XSwgKytpZHgsIGFycik7XG4gIH1cbiAgXG4gIHJldHVybiBjdXJyO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XG4gIGRhdGE6IHtcbiAgICB1cmw6ICcuLi9kYXRhL2RhdGEuanNvbidcbiAgfSxcbiAgLy8gVGhlIGZpcnN0IHRpbGUgc2l6ZSBoYXZlIHRoZSBwcmlvcml0eS5cbiAgLy8gVGhhdCBtZWFuIHdpbGwgcGFyc2UgdGhlIHRpbGUgc2l6ZSBmcm9tIHRvcCB0byBib3R0b20uXG4gIC8vIEl0cyBiZXR0ZXIgdG8gYWRkIHRoZSBiaWdnZXN0IHRpbGUgYXQgdGhlIHRvcC5cbiAgVElMRV9TSVpFOiB7XG4gICAgWFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDEsXG4gICAgICBjb2w6IDUsXG4gICAgICByb3c6IDVcbiAgICB9LFxuICAgIFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDIsXG4gICAgICBjb2w6IDQsXG4gICAgICByb3c6IDRcbiAgICB9LFxuICAgIEw6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDMsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIE06IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIFM6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDFcbiAgICB9LFxuICAgIFhTOiB7XG4gICAgICBtYXhBbW91bnQ6IDUwLFxuICAgICAgY29sOiAxLFxuICAgICAgcm93OiAxXG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2NvbnN0YW50c30gZnJvbSAnLi9jb25maWcnO1xuXG4vKipcbiogR3JpZFxuKi9cbmNsYXNzIEdyaWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5ncmlkV2lkdGggPSBudWxsO1xuICAgIHRoaXMuZ3JpZEhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5jb2wgPSBudWxsO1xuICAgIHRoaXMucm93ID0gbnVsbDtcbiAgICB0aGlzLmdyaWRXaWR0aFNwYWNlciA9IG51bGw7XG4gICAgdGhpcy5ncmlkSGVpZ2h0U3BhY2VyID0gbnVsbDtcbiAgICB0aGlzLnRpbGVXaWR0aCA9IG51bGw7XG4gICAgdGhpcy50aWxlSGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmNvb3JkcyA9IHtcbiAgICAgIGFsbDogW10sXG4gICAgICBmcmVlOiBbXSxcbiAgICAgIHRha2VuOiBbXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBDaGVjayBhdmFpbGFiaWxpdHkgb2YgY29vcmRzIGZyb20gY29vcmRcbiAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRzXG4gICovXG4gIGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSB7XG4gICAgbGV0IHkgPSAwO1xuICAgIGNvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGxldCBpID0gdGhpcy5jb29yZHMuZnJlZS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLmNvb3Jkcy5mcmVlW2ldLnggPT09IGNvb3JkLnggJiYgdGhpcy5jb29yZHMuZnJlZVtpXS55ID09PSBjb29yZC55KSB7XG4gICAgICAgICAgeSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvb3Jkcy5sZW5ndGggPT09IHk7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgb2NjdXBhdGlvbiBmcm9tIGNvb3JkXG4gICogVGhpcyB3aWxsIGdldCBhbiBhcnJheSB3aXRoIGFsbCB0aGUgcG9pbnQgb2NjdXBlZCBieSB0aGUgdGlsZVxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbENvbFxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbFJvd1xuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHBhcmFtcykge1xuICAgIGxldCB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXMsXG4gICAgICAgIGNvb3JkcyA9IFtdO1xuICAgIGlmIChjb29yZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG90YWxSb3c7IGorKykge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKHRoaXMuZ2V0Q29vcmQoaSArIGNvb3JkLngsIGogKyBjb29yZC55KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIC8vIHRvZG86IHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheVxuICB9O1xuXG4gIC8qXG4gICogR2V0IG5ldyB0aWxlQXJlYVxuICAqIEl0ZXJhdGUgYWNyb3NzIGVhY2ggZnJlZSBjb29yZGluYXRlcyB0byB0ZXN0IGlmIHRoZSB0aWxlIGNhbiBiZSBwbGFjZWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGlsZVNpemVcbiAgKiBAcmV0dXJucyB7YXJyYXl8dW5kZWZpbmVkfVxuICAqL1xuICBnZXROZXdUaWxlQXJlYSh0aWxlU2l6ZSkge1xuICAgIGxldCB0YXJnZXRzID0gW10sXG4gICAgICAgdG90YWxDb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5jb2wsXG4gICAgICAgdG90YWxSb3cgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5yb3c7XG4gICAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgICBsZXQgdGlsZVJpZ2h0RWRnZSA9IChmcmVlQ29vcmQueCArIHRvdGFsQ29sKSAqIHRoaXMudGlsZVdpZHRoLFxuICAgICAgICAgIHRpbGVCb3R0b21FZGdlID0gKGZyZWVDb29yZC55ICsgdG90YWxSb3cpICogdGhpcy50aWxlSGVpZ2h0O1xuICAgICAgaWYgKHRpbGVSaWdodEVkZ2UgPD0gdGhpcy5ncmlkV2lkdGggJiYgdGlsZUJvdHRvbUVkZ2UgPD0gdGhpcy5ncmlkSGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGpzdXQgZm9uZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sLCB0b3RhbFJvdywgY29vcmQ6IGZyZWVDb29yZH0pO1xuICAgICAgICBpZiAodGhpcy5jaGVja0F2YWlsYWJpbGl0eU9mQ29vcmRzRnJvbUNvb3JkKGNvb3JkcykpIHtcbiAgICAgICAgICB0YXJnZXRzLnB1c2goZnJlZUNvb3JkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIElmIHRoZSB0YXJnZXRzIGlzIGVtcHR5IHRoYXQgbWVhbiAyIHRoaW5nczpcbiAgICAvLyAtIHRoZSB0aWxlIHdhcyB0byBiaWdcbiAgICAvLyAtIHRoZSB0aWxlIGhhZCB0aGUgcmlnaHQgc2l6ZSBidXQgbm8gYXJlYSB3YXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIHRhcmdldHMubGVuZ3RoID4gMCA/IHRoaXMuc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKlxuICAqIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBwdXRGcmVlQ29vclRvVGFrZW5Db29yKGNvb3JkKSB7XG4gICAgLy90b2RvOiBSZW1vdmUgdGhlIGlmIHN0YXRlbWVudCBhbmQgYWRkIGEgZmlsdGVyIGJlZm9yZSBmb3JFYWNoXG4gICAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKChteUNvb3JkLCBpbmRleCkgPT4ge1xuICAgICAgLy8gdG9kbzogY2xlYW4gdGhpcyB1cFxuICAgICAgaWYgKG15Q29vcmQueCA9PT0gY29vcmQueCAmJiBteUNvb3JkLnkgPT09IGNvb3JkLnkpIHtcbiAgICAgICAgdGhpcy5jb29yZHMuZnJlZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29vcmRzLnRha2VuLnB1c2goY29vcmQpO1xuICB9O1xuXG4gIC8qXG4gICogU2h1ZmZsZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICovXG4gIHNodWZmbGUobykge1xuICAgIGZvcihsZXQgaiwgeCwgaSA9IG8ubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgY29vcmRcbiAgKiBAcGFyYW0ge251bWJlcn0geFxuICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICovXG4gIGdldENvb3JkKHgsIHkpIHtcbiAgICAgIHJldHVybiB7eCwgeX07XG4gIH07XG5cbiAgLypcbiAgKiBTZXQgY29vcmRzXG4gICovXG4gIHNldENvb3JkcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5yb3c7IGorKykge1xuICAgICAgICB0aGlzLmNvb3Jkcy5hbGwucHVzaCh0aGlzLmdldENvb3JkKGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gIENsb25lIHRoZSBhcnJheVkgb2YgYWxsIHBvc2l0aW9uIGFuZCBhZGQgaXQgdG8gZnJlZSBwb3NpdGlvbiBhcnJheS5cbiAgICB0aGlzLmNvb3Jkcy5mcmVlID0gdGhpcy5jb29yZHMuYWxsO1xuICB9O1xuXG4gIC8qXG4gICogU2hvdyBjb29yZHNcbiAgKiBUaGlzIHdpbGwgc2hvdyBibGFjayBkb3RzIGZvciBlYWNoIGNvb3Jkb25hdGVcbiAgKi9cbiAgc2hvd0Nvb3JkcygpIHtcbiAgICB0aGlzLmNvb3Jkcy5hbGwuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBsZXQgbGVmdCA9IHRoaXMuZ3JpZFdpZHRoIC8gdGhpcy5jb2wgKiBjb29yZC54LFxuICAgICAgICAgIHRvcCA9IHRoaXMuZ3JpZEhlaWdodCAvIHRoaXMucm93ICogY29vcmQueTtcbiAgICAgIGxlZnQgPSBsZWZ0ICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gICAgICB0b3AgPSB0b3AgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke3RvcC0wLjV9JTsgbGVmdDogJHtsZWZ0LTAuMn0lYDtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qXG4gICogQnVpbGQgZ3JpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBlbFxuICAqIEBwYXJhbSB7bnVtYmVyfSBnQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IGdSb3dcbiAgKi9cbiAgYnVpbGRHcmlkKHBhcmFtcykge1xuICAgIHZhciB7ZWwsIGNvbCwgcm93fSA9IHBhcmFtcztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gICAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICB0aGlzLmdyaWRIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5jb2wgPSBjb2w7Ly90b2RvOiB0aGlzIHNob3VsZCBiZSBtb3JlIHNwZWNpZmljLiBpdCB3aWxsIGhlbHAgdW5kZXJzdGFuZCB0aGUgY29kZSB3aGVuIHdlIGNhbGwgdGhpcyBmcm9tIGEgc3ViIGZ1bmN0aW9uLlxuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuZ3JpZFdpZHRoU3BhY2VyID0gMiAqIDEwMCAvIHRoaXMuZ3JpZFdpZHRoO1xuICAgIHRoaXMuZ3JpZEhlaWdodFNwYWNlciA9IDIgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gICAgdGhpcy50aWxlV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAvIGNvbDsgLy90b2RvOiBmaW5kIGEgbW9yZSBzcGVjaWZpYyBuYW1lIGZvciB0aGlzLiBpdHMgbW9yZSBhIHpvbmUgb3IgYXJlYSB0aGVuIHRpbGVcbiAgICB0aGlzLnRpbGVIZWlnaHQgPSB0aGlzLmdyaWRIZWlnaHQgLyByb3c7XG5cbiAgICAvLyBTZXQgY29vcmRvbmF0ZVxuICAgIHRoaXMuc2V0Q29vcmRzKCk7XG4gICAgdGhpcy5zaG93Q29vcmRzKCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7Y29uc3RhbnRzfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL2dyaWQnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyc7XG5cbi8qKlxuKiBUaWxlXG4qL1xuY2xhc3MgVGlsZXMgZXh0ZW5kcyBHcmlkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTsgLy8gVGhpcyB3aWxsIGNhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3RvclxuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLnRpbGVRdWV1ZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSA0MDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLnRpbGVzLnB1c2goe1xuICAgICAgICBpZDogaSxcbiAgICAgICAgdGl0bGU6ICd0aXRsZScsXG4gICAgICAgIGltZzogJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3dUaWxlKHBhcmFtcyl7XG4gICAgbGV0IHt1cmx9ID0gcGFyYW1zLFxuICAgICAgICB0aGF0ID0gdGhpcztcbiAgICAvL3RvZG86IG9wdG9taXplIHRoaXMuIGNvZGUgZHVwbGljYXRpb24uXG4gICAgaWYodXJsKXtcbiAgICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgICByZXF1ZXN0XG4gICAgICAgIC5nZXQodXJsKVxuICAgICAgICAuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICB0aGF0LnRpbGVRdWV1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtpdGVtLnl9JTsgbGVmdDogJHtpdGVtLnh9JTsgd2lkdGg6ICR7aXRlbS53aWR0aH0lOyBoZWlnaHQ6ICR7aXRlbS5oZWlnaHR9JTsgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7cmVzW2luZGV4XS5pbWd9KWA7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9ICd0aWxlJztcbiAgICAgICAgICAgIHRoYXQuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMudGlsZVF1ZXVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtpdGVtLnl9JTsgbGVmdDogJHtpdGVtLnh9JTsgd2lkdGg6ICR7aXRlbS53aWR0aH0lOyBoZWlnaHQ6ICR7aXRlbS5oZWlnaHR9JWA7XG4gICAgICAgIG5vZGUuY2xhc3NOYW1lID0gJ3RpbGUnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIEdldCBuZXh0IHRpbGUgc2l6ZVxuICAqIFRoaXMgd2lsbCBnZXQgdGhlIG5leHQgdGlsZSBzaXplIHRvIHVzZS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gdGlsZUluZGV4XG4gICovXG4gIGdldE5leHRUaWxlU2l6ZSh0aWxlSW5kZXgpIHtcbiAgICBsZXQgY3VycmVudFRpbGVDb3VudCA9IDAsXG4gICAgICAgIHRpbGVTaXplID0gbnVsbDtcbiAgICBmb3IobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSl7XG4gICAgICBjdXJyZW50VGlsZUNvdW50ID0gY3VycmVudFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgICAgaWYodGlsZUluZGV4IDwgY3VycmVudFRpbGVDb3VudCl7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGlsZVNpemU7XG4gIH07XG5cbiAgLypcbiAgKiBSZWR1Y2UgdGlsZSBzaXplXG4gICogVGhpcyBpcyBjaGVja2luZyBhbGwgdGhlIHRpbGUgc2l6ZSBhbmQgbG9vayBmb3IgdGhlIG5leHQgYXJlYSBzbWFsbGVyIHRoZW4gdGhlIGN1cnJlbnQgb25lLlxuICAqIFRvIGZpbmQgdGhlIGFyZWEgd2UganVzdCBlbmVkIHRvIG11bHRpcGx5IHRoZSBjb2wgYW5kIHJvdyAoY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdylcbiAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRpbGVTaXplIC0gYmlnLCBtZWRpdW0sIHNtYWxsLCBlY3QuXG4gICovXG4gIHJlZHVjZVRpbGVTaXplKGN1cnJlbnRUaWxlU2l6ZSkge1xuICAgIGxldCBjdXJyZW50VGlsZSA9IGNvbnN0YW50cy5USUxFX1NJWkVbY3VycmVudFRpbGVTaXplXSxcbiAgICAgICAgY3VycmVudFRpbGVBcmVhID0gY3VycmVudFRpbGUuY29sICogY3VycmVudFRpbGUucm93LFxuICAgICAgICBuZXh0U2l6ZSA9IG51bGw7IC8vIFRoaXMgd2lsbCByZXR1cm4gbnVsbCBpZiBubyBzbWFsbGVyIHRpbGUgYXJlIGZvdW5kLlxuICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgbGV0IG5leHRUaWxlQXJlYSA9IGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3c7XG4gICAgICBpZiAobmV4dFRpbGVBcmVhIDwgY3VycmVudFRpbGVBcmVhKSB7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dFNpemU7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgbWF4IHRpbGUgY291bnRcbiAgKi9cbiAgZ2V0TWF4VGlsZUNvdW50KCkge1xuICAgIGxldCBtYXhUaWxlQ291bnQgPSAwO1xuICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgbWF4VGlsZUNvdW50ID0gbWF4VGlsZUNvdW50ICsgY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5tYXhBbW91bnQ7XG4gICAgfVxuICAgIHJldHVybiBtYXhUaWxlQ291bnQ7XG4gIH07XG5cbiAgLypcbiAgKiBCdWlsZCB0aWxlc1xuICAqL1xuICBidWlsZFRpbGVzKCkge1xuICAgIGxldCBzaXplID0gbnVsbCxcbiAgICAgICAgdGlsZUNvdW50ID0gMCxcbiAgICAgICAgbWF4VGlsZSA9IHRoaXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUsIGluZGV4KSA9PiB7XG4gICAgICBpZih0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aCA+IDAgJiYgdGlsZUNvdW50IDwgbWF4VGlsZSkge1xuXG4gICAgICAgIHRpbGUuc2l6ZSA9IHRoaXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgICAvLyBJZiBubyBzcGFjZSB3ZXJlIGZvdW5kIHRoYXQgbWVhbiB0aGUgdGlsZSBpcyB0byBiaWcuXG4gICAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICAgIGxldCBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aWxlLnNpemUgPSB0aGlzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG4gICAgICAgICAgaWYoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSB0aGlzLmdldE5ld1RpbGVBcmVhKHRpbGUuc2l6ZSk7XG4gICAgICAgICAgaWYoIWF2YWlsYWJsZUFyZWFDb29yZHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXZhaWxhYmxlQXJlYUNvb3JkcztcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICAgIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgICAgLy8gSnVzdCBtYWtpbmcgc3VyZSB3ZSBoYXZlIHNwYWNlIGZvciB0aGlzIHRpbGUuXG4gICAgICAgIC8vIFdlIHdvbnQgbmVlZCB0aGlzIGNvbmRpdGlvbiBhZnRlciBJIG1ha2UgYSByZWN1cnNpb24gZm9yIHRoZSBkb3duc2l6aW5nIHRpbGUgZnVuY3Rpb25cbiAgICAgICAgaWYoYXZhaWxhYmxlQXJlYUNvb3Jkcyl7XG4gICAgICAgICAgdGlsZUNvdW50Kys7XG4gICAgICAgICAgdGlsZS5rZXkgPSBpbmRleDtcbiAgICAgICAgICB0aWxlLnRhcmdldCA9IGF2YWlsYWJsZUFyZWFDb29yZHNbMF07IC8vVGFrZSB0aGUgZmlyc3Qgb25lIGluIHRoZSBhcnJheS4gVGhleSBhcmUgYWxyZWFkeSBzaG92ZWxlZFxuICAgICAgICAgIHRpbGUuY29sID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLmNvbDtcbiAgICAgICAgICB0aWxlLnJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5yb3c7XG4gICAgICAgICAgbGV0IG15VGlsZSA9IG5ldyBUaWxlKHRoaXMsIHRpbGUpO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgICBsZXQgdGlsZU9jY3VwYXRpb25Db29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sOiB0aWxlLmNvbCwgdG90YWxSb3c6IHRpbGUucm93LCBjb29yZDogdGlsZS50YXJnZXR9KTtcbiAgICAgICAgICB0aWxlT2NjdXBhdGlvbkNvb3Jkcy5mb3JFYWNoKGNvb3JkcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnRpbGVRdWV1ZS5wdXNoKG15VGlsZS5nZXRUaWxlSW5mb3MoKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5cbi8qKlxuKiBUaWxlXG4qIEBwYXJhbSB7b2JqZWN0fSBncmlkXG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiovXG5mdW5jdGlvbiBUaWxlKGdyaWQsIHBhcmFtcykge1xuICB0aGlzLmdyaWQgPSBncmlkO1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbn1cblxuLypcbiogR2V0IHRpbGUgaW5mb3NcbiovXG5UaWxlLnByb3RvdHlwZS5nZXRUaWxlSW5mb3MgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHtzaXplLCB0YXJnZXQsIGNvbCwgcm93LCBrZXl9ID0gdGhpcy5wYXJhbXMsXG4gICAgICB7dGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCBncmlkV2lkdGgsIGdyaWRIZWlnaHQsIGdyaWRXaWR0aFNwYWNlciwgZ3JpZEhlaWdodFNwYWNlcn0gPSB0aGlzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgc2l6ZSxcbiAgICB4OiB0YXJnZXQueCAqIHRpbGVXaWR0aCAqIDEwMCAvIGdyaWRXaWR0aCxcbiAgICB5OiB0YXJnZXQueSAqIHRpbGVIZWlnaHQgKiAxMDAgLyBncmlkSGVpZ2h0LFxuICAgIHdpZHRoOiAoY29sICogMTAwIC8gdGhpcy5ncmlkLmNvbCkgLSBncmlkV2lkdGhTcGFjZXIsXG4gICAgaGVpZ2h0OiAocm93ICogMTAwIC8gdGhpcy5ncmlkLnJvdykgLSBncmlkSGVpZ2h0U3BhY2VyLFxuICAgIGlkOiBrZXlcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVzO1xuIl19
