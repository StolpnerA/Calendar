"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      ;(function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
          if (code < NUMBER) return -1; //no match
          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

          // base64 is 4/3 + up to two characters of the original data
          arr = new Arr(b64.length * 3 / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? b64.length - 4 : b64.length;

          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,

          // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\base64-js\\lib\\b64.js", "/..\\..\\node_modules\\base64-js\\lib");
  }, { "buffer": 2, "e/U+97": 4 }], 2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      };

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;

      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */
      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);
          arr.foo = function () {
            return 42;
          };
          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();

      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */
      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

        // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.
        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);
          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        }

        // Find the length
        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');

        var buf;
        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;
        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      }

      // STATIC METHODS
      // ==============

      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';
        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;
          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;
          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;
          case 'base64':
            ret = base64ToBytes(str).length;
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };

      // BUFFER INSTANCE METHODS
      // =======================

      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          assert(!isNaN(byte), 'Invalid hex string');
          buf[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;
          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;
          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;
          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;

        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length;

        // Fastpath empty strings
        if (end === start) return '';

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;
          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;
          case 'binary':
            ret = _binarySlice(self, start, end);
            break;
          case 'base64':
            ret = _base64Slice(self, start, end);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;

        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0;

        // Copy 0 bytes; we're done
        if (end === start) return;
        if (target.length === 0 || source.length === 0) return;

        // Fatal error conditions
        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;

        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
          return newBuf;
        }
      };

      // `get` will be removed in Node 0.13+
      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };

      // `set` will be removed in Node 0.13+
      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }
        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }
        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);
        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);
        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;

        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;

        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      };

      // fill(value, start=0, end=buffer.length)
      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start');

        // Fill 0 bytes; we're done
        if (end === start) return;
        if (this.length === 0) return;

        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };

      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */
      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      };

      // HELPER FUNCTIONS
      // ================

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;

      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */
      Buffer._augment = function (arr) {
        arr._isBuffer = true;

        // save reference to original Uint8Array get/set methods before overwriting
        arr._get = arr.get;
        arr._set = arr.set;

        // deprecated, will be removed in node 0.13+
        arr.get = BP.get;
        arr.set = BP.set;

        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;

        return arr;
      };

      // slice(start, end)
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }
        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;
        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }

      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */
      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\buffer\\index.js", "/..\\..\\node_modules\\buffer");
  }, { "base64-js": 1, "buffer": 2, "e/U+97": 4, "ieee754": 3 }], 3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];

        i += d;

        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\ieee754\\index.js", "/..\\..\\node_modules\\ieee754");
  }, { "buffer": 2, "e/U+97": 4 }], 4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      // TODO(shtylman)
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\process\\browser.js", "/..\\..\\node_modules\\process");
  }, { "buffer": 2, "e/U+97": 4 }], 5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _dataBase = require("./dataBase");

      var _dataBase2 = _interopRequireDefault(_dataBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var calendarPage = function () {
        function calendarPage() {
          _classCallCheck(this, calendarPage);
        }

        _createClass(calendarPage, [{
          key: "Render",
          value: function Render(dateMonth) {
            this.buildHeader();
            this.exitButton();
            this.RenderPage();
            this.renderButtonCalendar();
            this.renderCalendar(dateMonth);
            this.addHandlerEvent(dateMonth);
            // что-то на подобии конструктора, тут рендерица календарь и добавляюцца обработчики
          }
        }, {
          key: "buildHeader",
          value: function buildHeader() {
            //тут рендерица кто зашел и кнопка выхода
            var header = document.querySelector("header");
            var div = document.querySelector("div");
            header = header.innerHTML = "\n  <div class=\"col-md-9\"></div>\n            <div class=\"col-md-3\">\n            <p class=\"lead\">" + sessionStorage.getItem("user") + " <button class=\"btn btn-default\" id=\"exit\">\u0412\u044B\u0445\u043E\u0434</button><p>\n            </div>";
            div = div.innerHTML = " \n  <div class=\"contant\">\n            </div>";
          }
        }, {
          key: "exitButton",
          value: function exitButton() {
            //обработчик выхода на главную страницу
            document.querySelector("#exit").addEventListener("click", function () {
              location.hash = "";
            });
          }
        }, {
          key: "RenderPage",
          value: function RenderPage(dateMonth) {
            //знаю не лучшее название, тут создаються дивы для рендара календаря и кнопок
            var placeButtonRender = document.querySelector(".contant").innerHTML = "<div class=\"ButtonPlace\"></div>";
            var placeCalendarRender = document.querySelector(".contant").innerHTML += "<br><br> <div class=\"CalendarPlace\"></div>";
            console.log(dateMonth);
          }
        }, {
          key: "renderButtonCalendar",
          value: function renderButtonCalendar() {
            // сама отрисовка кнопок
            document.querySelector(".ButtonPlace").innerHTML = "    \n          <div align=\"center\">\n                <button class=\"btn btn-default\" id=\"backButton\">\u041D\u0430\u0437\u0430\u0434</button>\n                <span class=\"material-design-iconic-font\" id=\"tegMonth\"></span>\n                <button class=\"btn btn-default\" id=\"forwardButton\">\u0412\u043F\u0435\u0440\u0435\u0434</button>\n            </div>";
          }
        }, {
          key: "renderCalendar",
          value: function renderCalendar(dateMonth) {
            //вот тут рендарица календарь на текущий месяц
            var year = dateMonth[0]; // разбераеться масив для получения года и месяца
            var month = dateMonth[1];

            var arrMonth = [
            //массив с месяцами для отображения какой сейчас месяц и год
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            var showMonth = month - 1; // минусуем месяц т.к меняли начало года не с 0 а с 1
            document.querySelector("#tegMonth").innerHTML = arrMonth[showMonth] + " " + year;
            function createCalendar(year, month) {
              var elem = document.querySelector(".CalendarPlace");
              var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
              var d = new Date(year, mon);
              var table = "<table class=\"table table-bordered table-hover\"><tr><th>\u043F\u043D</th><th>\u0432\u0442</th><th>\u0441\u0440</th><th>\u0447\u0442</th><th>\u043F\u0442</th><th>\u0441\u0431</th><th>\u0432\u0441</th></tr><tr>";
              // заполнить первый ряд от понедельника
              // и до дня, с которого начинается месяц
              for (var i = 0; i < getDay(d); i++) {
                table += "<td></td>";
              }
              // ячейки календаря с датами
              while (d.getMonth() == mon) {
                table += "<td class=\"d" + d.getDate() + "_" + month + "_" + year + "\">" + d.getDate() + "</td>";

                if (getDay(d) % 7 == 6) {
                  // вс, последний день - перевод строки
                  table += "</tr><tr>";
                }
                d.setDate(d.getDate() + 1);
              }
              // добить таблицу пустыми ячейками, если нужно
              if (getDay(d) != 0) {
                for (var i = getDay(d); i < 7; i++) {
                  table += "<td></td>";
                }
              }
              // закрыть таблицу
              table += "</tr></table>";
              // только одно присваивание innerHTML
              elem.innerHTML = table;
              var dataBase = new _dataBase2.default();

              dataBase.loadFromDB();
            }

            function getDay(date) {
              // получить номер дня недели, от 0(пн) до 6(вс)
              var day = date.getDay();
              if (day == 0) day = 7;
              return day - 1;
            }

            createCalendar(year, month); //вызов внутренней функции рендара каледаря
            return dateMonth; // возращяем дату на которую производился рендар календаря
          }
        }, {
          key: "addHandlerEvent",
          value: function addHandlerEvent(dateMonth) {
            var _this = this;

            // тут добавляються обработчики для листания месяцев + обработчики на удаление и добавлени заголовков
            document.querySelector("#backButton").addEventListener("click", function () {
              return _this.addEventForBackButoon(dateMonth);
            });
            document.querySelector("#forwardButton").addEventListener("click", function () {
              return _this.addEventForForwardButton(dateMonth);
            });
            document.querySelector("table").addEventListener("dblclick", function () {
              return _this.renderMadal(event);
            });
            document.querySelector("table").addEventListener("click", function () {
              return _this.delCaption(event);
            });
          }
        }, {
          key: "addEventForForwardButton",
          value: function addEventForForwardButton(dateMonth) {
            // тут код добавление месяца или года в зависимости какой месяц пришел + вызов функции рендара полученной даты
            var year = dateMonth[0];
            var month = dateMonth[1];
            if (month === 12) {
              year = year + 1;
              month = 1;
              dateMonth[0] = year;
              dateMonth[1] = month;
            } else {
              month = month + 1;
              dateMonth[1] = month;
            }
            document.querySelector(".CalendarPlace").innerHTML = ""; // очистка календаря для того что бы даты менялись
            this.renderCalendar(dateMonth); // тут сам вызов данного метада для рендара
          }
        }, {
          key: "addEventForBackButoon",
          value: function addEventForBackButoon(dateMonth) {
            // тут код вычита месяца или года в зависимости какой месяц пришел + вызов функции рендара полученной даты
            var year = dateMonth[0];
            var month = dateMonth[1];
            if (month === 1) {
              year = year - 1;
              month = 12;
              dateMonth[0] = year;
              dateMonth[1] = month;
            } else {
              month = month - 1;
              dateMonth[1] = month;
            }
            document.querySelector(".CalendarPlace").innerHTML = ""; // очистка календаря для того что бы даты менялись
            this.renderCalendar(dateMonth); // тут сам вызов данного метада для рендара
          }
        }, {
          key: "addCaption",
          value: function addCaption(taskTitle, taskDescription, data) {
            var dataBase = new _dataBase2.default();
            document.querySelector("." + data).innerHTML += "<div>" + taskTitle + "<button class=\"cross\">[x]</button></div>";
            dataBase.SaveEventInDB(taskTitle, taskDescription, data);
          }
        }, {
          key: "delCaption",
          value: function delCaption(e) {
            // тут код для удаления заголовка
            var target = e.target;
            if (target.tagName != "BUTTON" || target.className != 'cross') return;
            var text = target.parentNode.innerHTML.slice(0, -34);
            var date = target.parentNode.parentNode.className;
            target.parentNode.remove();
            var dataBase = new _dataBase2.default(); //создание экземпляра класса базы данных
            dataBase.deleteEventInDB(date, text); // вызов метода из базы для удаления евента принимает на вход текст заголовка и тег в какой записали
          }
        }, {
          key: "renderMadal",
          value: function renderMadal(e) {
            var _this2 = this;

            var target = e.target;
            if (target.tagName !== "TD") return;
            var data = target.className;
            var tbody = document.querySelector("tbody");
            tbody.innerHTML += "\n        <div class=\"note-create-form\">\n                    <div class=\"note-header\">\n                         <span class=\"day\">" + data + "</span>\n                         <span class=\"glyphicon glyphicon glyphicon-remove closeModal\"></span>\n                    </div>\n                    <div class=\"note-title\"><input type=\"text\" placeholder=\"Title\" id=\"taskTitleInput\"></div>\n                    <div class=\"note-body\">\n                                <textarea id=\"taskDescriptionInput\">\n                                \n</textarea>\n                            </div>\n                            <button class=\"btn btn-default my-btn-default\">Save</button>\n                        </div>";
            var modal = document.querySelector(".note-create-form");
            var closeModal = modal.querySelector(".closeModal");
            var save = modal.querySelector("button");
            modal.style.display = "flex";
            taskDescriptionInput.value = "";
            closeModal.addEventListener("click", function () {
              return modal.remove();
            });
            save.addEventListener("click", function () {
              var taskTitle = taskTitleInput.value;
              var taskDescription = taskDescriptionInput.value;
              if (taskTitle) _this2.addCaption(taskTitle, taskDescription, data);
              modal.remove();
            });
          }
        }]);

        return calendarPage;
      }();

      exports.default = calendarPage;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\CalendarPage.js", "/components");
  }, { "./dataBase": 7, "buffer": 2, "e/U+97": 4 }], 6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _signIn = require("./signIn");

      var _signIn2 = _interopRequireDefault(_signIn);

      var _dataBase = require("./dataBase");

      var _dataBase2 = _interopRequireDefault(_dataBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var indexPage = function () {
        function indexPage() {
          _classCallCheck(this, indexPage);
        }

        _createClass(indexPage, [{
          key: "renderPage",
          value: function renderPage() {
            // тут производиться рендер нашей входной страницы
            var div = document.querySelector("div");
            var CreateDiv = "\n            <div class=\"container\">\n            <div class = 'error'>\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C</div>\n            <div class=\"form-group\">\n                <label for=\"usr\">\u041B\u043E\u0433\u0438\u043D:</label>\n                <input type=\"text\" class=\"form-control\" id=\"usr\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"pwd\">\u041F\u0430\u0440\u043E\u043B\u044C:</label>\n                <input type=\"password\" class=\"form-control\" id=\"pwd\">\n            </div>\n            <div  id=\"eror\"></div>\n                <button type=\"button\" class=\"btn btn-large btn-success\" id=\"butAut\" >\u0412\u0445\u043E\u0434</button>\n        </div>\n        </div>";
            div = div.innerHTML = CreateDiv; // отрисовка страницы
          }
        }, {
          key: "addHendler",
          value: function addHendler() {
            // тут добавляеца оброботчик на кнопку входа с промисом
            document.querySelector("#butAut").addEventListener("click", function () {
              var log = usr.value;
              var pass = pwd.value;
              var userIn = new _signIn2.default();
              Promise.resolve().then(function () {
                return userIn.trySigninByLoginAndPass(log, pass);
              }).catch(function () {
                return userIn.tryRegisterWithLoginAndEmail(log, pass);
              }).then(function () {
                return location.hash = "Calendar";
              }).catch(function () {
                return document.querySelector(".error").style.display = "block";
              });
            });
          }
        }]);

        return indexPage;
      }();

      exports.default = indexPage; // экспортируем функцию в роутер index
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\IndexPage.js", "/components");
  }, { "./dataBase": 7, "./signIn": 9, "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var db = function () {
        function db() {
          _classCallCheck(this, db);
        }

        _createClass(db, [{
          key: "addUser",
          value: function addUser(task, login, pass) {
            //метод добавления пользователя в систему и создание примитивного структуры хранения данных
            if (!task || !login || !pass) return;
            var obj = {
              password: pass,
              tasks: task
            };
            localStorage.setItem("" + login, JSON.stringify(obj)); // сохранение пользователя в системе
          }
        }, {
          key: "getAll",
          value: function getAll(login) {
            var ls = JSON.parse(localStorage.getItem("" + login)); // превращение нашего текста с объектом в нормальный объект
            return ls;
          }
        }, {
          key: "SaveEventInDB",
          value: function SaveEventInDB(taskTitle, taskDescription, dateDay) {
            // сохранение Заголовка в системе + создание системы хранения для текства и коментраиев и готова задача или нет
            var obj = this.getAll(sessionStorage.getItem("user"));
            obj.tasks["" + dateDay] = obj.tasks["" + dateDay] || {
              title: [],
              text: [],
              done: []
            };
            var arrTitle = obj.tasks["" + dateDay].title;
            arrTitle.push(taskTitle);
            var arrDescription = obj.tasks["" + dateDay].text;
            arrDescription.push(taskDescription);
            var arrDone = obj.tasks["" + dateDay].done;
            arrDone.push(false);
            localStorage.setItem("" + sessionStorage.getItem("user"), JSON.stringify(obj));
          }
        }, {
          key: "deleteEventInDB",
          value: function deleteEventInDB(dateDay, text) {
            //удаление пока только заголовка
            if (dateDay == '') return;
            var obj = this.getAll(sessionStorage.getItem("user"));
            var index = obj.tasks["" + dateDay].title.indexOf(text);
            obj.tasks["" + dateDay].title.splice(index, 1);
            obj.tasks["" + dateDay].text.splice(index, 1);
            obj.tasks["" + dateDay].done.splice(index, 1);
            localStorage.setItem("" + sessionStorage.getItem("user"), JSON.stringify(obj));
          }
        }, {
          key: "loadFromDB",
          value: function loadFromDB() {
            // загрузки пока нету тут только пока базавая прогрузка объека
            var obj = this.getAll(sessionStorage.getItem("user"));
            var cal = document.querySelector("table");
            for (var dateLoad in obj.tasks) {
              var loadData = obj.tasks["" + dateLoad].title;
              var res = cal.querySelector("." + dateLoad);
              if (res != null) {
                if (loadData.length - 1 == 0) {
                  res.innerHTML += "<div id=\"events\">" + loadData + "<button class=\"cross\">[x]</button></div>";
                } else {
                  for (var i = 0; i < loadData.length; i++) {
                    var dbArr = loadData;
                    res.innerHTML += "<div id=\"events\">" + dbArr[i] + "<button class=\"cross\">[x]</button></div>";
                  }
                }
              }
            }
          }
        }]);

        return db;
      }();

      exports.default = db;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\dataBase.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _dataBase = require("./dataBase");

      var _dataBase2 = _interopRequireDefault(_dataBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var dayViewPage = function () {
        function dayViewPage() {
          _classCallCheck(this, dayViewPage);
        }

        _createClass(dayViewPage, [{
          key: "buildPages",
          value: function buildPages() {
            this.renderHeader();
            this.exitButton();
            this.test();
          }
        }, {
          key: "renderHeader",
          value: function renderHeader() {
            var header = document.querySelector("header");
            var div = document.querySelector("div");
            header = header.innerHTML = "\n  <div class=\"col-md-9\"></div>\n            <div class=\"col-md-3\">\n            <p class=\"lead\">" + sessionStorage.getItem("user") + " <button class=\"btn btn-default\" id=\"exit\">\u0412\u044B\u0445\u043E\u0434</button><p>\n            </div>";
          }
        }, {
          key: "exitButton",
          value: function exitButton() {
            //обработчик выхода на главную страницу
            document.querySelector("#exit").addEventListener("click", function () {
              location.hash = "";
            });
          }
        }]);

        return dayViewPage;
      }();

      exports.default = dayViewPage;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\dayViewPage.js", "/components");
  }, { "./dataBase": 7, "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _dataBase = require("./dataBase");

      var _dataBase2 = _interopRequireDefault(_dataBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var signIn = function () {
        function signIn() {
          _classCallCheck(this, signIn);

          this.db = new _dataBase2.default();
        }

        _createClass(signIn, [{
          key: "trySigninByLoginAndPass",
          value: function trySigninByLoginAndPass(login, password) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              var user = _this.db.getAll(login);
              if (user != null && user.password == password && login != "" && password != "") {
                sessionStorage.setItem("user", "" + login);
                return resolve();
              }
              reject();
            });
          }
        }, {
          key: "tryRegisterWithLoginAndEmail",
          value: function tryRegisterWithLoginAndEmail(login, password) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              var user = _this2.db.getAll(login);
              if (!user) {
                _this2.db.addUser({}, login, password);
                sessionStorage.setItem("user", "" + login);
                return resolve();
              } else {
                return reject();
              }
            });
          }
        }]);

        return signIn;
      }();

      exports.default = signIn;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\signIn.js", "/components");
  }, { "./dataBase": 7, "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      var _Router = require("./utils/Router");

      var _Router2 = _interopRequireDefault(_Router);

      var _index = require("./routes/index");

      var _Calendar = require("./routes/Calendar");

      var _DayView = require("./routes/DayView");

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var routes = [_index.index, _Calendar.Calendar, _DayView.dayView];
      new _Router2.default({ routes: routes });
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_c2689705.js", "/");
  }, { "./routes/Calendar": 11, "./routes/DayView": 12, "./routes/index": 13, "./utils/Router": 14, "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Calendar = undefined;

      var _CalendarPage = require("../components/CalendarPage");

      var _CalendarPage2 = _interopRequireDefault(_CalendarPage);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      //import { userOnline } from "../components/signIn";
      var div = document.querySelector("div");
      var Calendar = {
        name: "Calendar",
        match: function match(text) {
          return text === "Calendar";
        },
        onBeforeEnter: function onBeforeEnter() {
          // при заходе на страницу проверяеться, залогино ли ты заходишь , если нет то пошел вон!

          if (!sessionStorage.getItem("user")) location.hash = "";
        },
        onEnter: function onEnter() {
          // тут создаеться массив с годом и месяцем для передачи его в рендер
          var dateMonth = [];
          var date = new Date();
          var mont = date.getMonth();
          var yer = date.getFullYear();
          dateMonth.push(yer);
          dateMonth.push(mont + 1);
          //
          var calendar = new _CalendarPage2.default(); // создание экземпляра класса
          calendar.Render(dateMonth); // рендер страницы и добавление обработчика
        },
        onLeave: function onLeave() {
          //при выходе с страницы чистица header ,div
          document.querySelector("header").innerHTML = "";
          div.innerHTML = "";
        }
      };

      exports.Calendar = Calendar;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\Calendar.js", "/routes");
  }, { "../components/CalendarPage": 5, "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.dayView = undefined;

      var _dayViewPage = require("../components/dayViewPage");

      var _dayViewPage2 = _interopRequireDefault(_dayViewPage);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var dayView = {
        name: "dayView",
        match: function match(text) {
          return text === "dayView";
        },
        onBeforeEnter: function onBeforeEnter() {
          return console.log("onBeforeEnter index");
        },
        onEnter: function onEnter() {
          var dayView = new _dayViewPage2.default();
          dayView.buildPages();
        },
        onLeave: function onLeave() {
          document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
          document.querySelector("header").innerHTML = "";
        }
      };
      exports.dayView = dayView;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\DayView.js", "/routes");
  }, { "../components/dayViewPage": 8, "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.index = undefined;

      var _IndexPage = require("../components/IndexPage");

      var _IndexPage2 = _interopRequireDefault(_IndexPage);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var div = document.querySelector("div");
      var index = {
        name: "index",
        match: "",
        onBeforeEnter: function onBeforeEnter() {
          return console.log("onBeforeEnter index");
        },
        onEnter: function onEnter() {
          var index = new _IndexPage2.default(); // создание экземплара класа indexPage
          index.renderPage(); //рендер страницы
          index.addHendler(); // добавление обработчика
        },
        onLeave: function onLeave() {
          document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
        }
      };

      exports.index = index;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\index.js", "/routes");
  }, { "../components/IndexPage": 6, "buffer": 2, "e/U+97": 4 }], 14: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var Router = function Router(options) {
        this.routes = options.routes;
        this.init();
      };

      Router.prototype = {
        init: function init() {
          var _this = this;

          window.addEventListener("hashchange", function (ev) {
            return _this.handleUrl(ev.oldURL.split("#")[1] || "", ev.newURL.split("#")[1]);
          });
          this.handleUrl(undefined, window.location.hash.slice(1));
        },
        getParam: function getParam(newRoute, currentRoute) {
          var param = newRoute.match(currentRoute.match) || [];
          return param[1];
        },
        handleUrl: function handleUrl(oldRoute, newRoute) {
          var _this2 = this;

          var currentRoute = this.routes.find(function (item) {
            if (typeof item.match === "string") {
              return newRoute === item.match;
            } else if (typeof item.match === "function") {
              return item.match(newRoute);
            } else if (item.match instanceof RegExp) {
              return newRoute.match(item.match);
            }
          });
          if (oldRoute !== undefined) {
            var previousRoute = this.routes.find(function (item) {
              if (typeof item.match === "string") {
                return oldRoute === item.match;
              } else if (typeof item.match === "function") {
                return item.match(oldRoute);
              } else if (item.match instanceof RegExp) {
                return oldRoute.match(item.match);
              }
            });
          }
          var currentParam = this.getParam(newRoute, currentRoute);
          console.log("---> router oldURL: " + oldRoute);
          console.log("---> router findNewActiveRoute: " + newRoute + " -- " + (currentRoute || {}).name);
          Promise.resolve().then(function () {
            return previousRoute && previousRoute.onLeave && previousRoute.onLeave(oldRoute.split("=")[1]);
          }).then(function () {
            return currentRoute && currentRoute.onBeforeEnter && currentRoute.onBeforeEnter(currentParam);
          }).then(function () {
            return currentRoute && currentRoute.onEnter && currentRoute.onEnter(_this2.eventBus, currentParam);
          });
        }
      };

      exports.default = Router;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\Router.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [10]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9DYWxlbmRhci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9DYWxlbmRhci9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvc3JjL3NjcmlwdC9jb21wb25lbnRzL0NhbGVuZGFyUGFnZS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvc3JjL3NjcmlwdC9jb21wb25lbnRzL0luZGV4UGFnZS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvc3JjL3NjcmlwdC9jb21wb25lbnRzL2RhdGFCYXNlLmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9DYWxlbmRhci9zcmMvc2NyaXB0L2NvbXBvbmVudHMvZGF5Vmlld1BhZ2UuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL0NhbGVuZGFyL3NyYy9zY3JpcHQvY29tcG9uZW50cy9zaWduSW4uanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL0NhbGVuZGFyL3NyYy9zY3JpcHQvZmFrZV9jMjY4OTcwNS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvQ2FsZW5kYXIvc3JjL3NjcmlwdC9yb3V0ZXMvQ2FsZW5kYXIuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL0NhbGVuZGFyL3NyYy9zY3JpcHQvcm91dGVzL0RheVZpZXcuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL0NhbGVuZGFyL3NyYy9zY3JpcHQvcm91dGVzL2luZGV4LmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9DYWxlbmRhci9zcmMvc2NyaXB0L3V0aWxzL1JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBLEFBQ0E7O0FBQ0EsbUJBQ0E7O0FBQ0EsMkJBQ0E7QUFDQSxBQUNBOzttRUFDQSxBQUNBOztrQ0FDQTttQ0FDQTtvQ0FDQTttQ0FDQTttQ0FDQTsyQ0FDQTs0Q0FDQSxBQUNBOzs2QkFDQTtvQ0FDQTtrRUFDQTtvRUFDQTt3Q0FDQTs4REFDQTsrQ0FDQTt1REFDQTtBQUNBLEFBQ0E7O3FDQUNBOzBDQUNBLEFBQ0E7O2tDQUNBOzRCQUNBO0FBQ0EsQUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO3dCQUNBOzZGQUNBLEFBQ0E7O0FBQ0E7NkNBQ0EsQUFDQTs7QUFDQTtzREFDQSxBQUNBOztrQkFDQSxBQUNBOzsyQkFDQTt1QkFDQTtBQUNBLEFBQ0E7O29EQUNBO3lJQUNBO3FDQUNBO21DQUNBO3VCQUNBO0FBQ0EsQUFDQTs7a0NBQ0E7NEVBQ0E7dUJBQ0E7eUNBQ0E7OEdBQ0E7NEJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztpQkFDQTtBQUNBLEFBQ0E7O3NDQUNBO2NBQ0E7MENBQ0E7O0FBQ0E7bUJBQ0E7Y0FDQTtjQUNBLEFBQ0E7OytCQUNBO2lDQUNBO0FBQ0EsQUFDQTs7d0NBQ0E7Z0hBQ0E7QUFDQSxBQUNBOztBQUNBOzhFQUNBO3NFQUNBO3NDQUNBO0FBQ0EsQUFDQTs7QUFDQTtrQkFDQTtpQkFDQTswQ0FDQTt1Q0FDQTsyQ0FDQTt3QkFDQTtBQUNBO2lCQUNBOzJFQUNBO3VDQUNBOzJDQUNBOzJDQUNBO3dCQUNBO0FBQ0EsQUFDQSxBQUNBOzs7aUJBQ0E7QUFDQSxBQUNBOzs4QkFDQTtnQ0FDQTtvRUFDQSxBQUNBOzs7QUN4SEE7QUFDQSxBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7QUFDQTtBQUNBLDRCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7O0FBQ0EsMkNBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1lBQ0E7b0NBQ0E7bUNBQ0E7Z0NBQ0E7bUJBQ0E7QUFDQTt5RUFDQTtvQkFDQTtpQkFDQTtBQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxpREFDQTs0RUFDQSxBQUNBOzswRUFDQSxBQUNBOztBQUNBO0FBQ0E7d0RBQ0E7K0JBQ0E7MkNBQ0E7Z0NBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7WUFDQTsrTEFDQTs2QkFDQSxBQUNBOztZQUNBO29DQUNBO0FBQ0E7K0NBQ0E7ZUFDQTtBQUNBO2dCQUNBO3VCQUNBOzBCQUNBO0FBQ0EsQUFDQTs7WUFDQTs4RUFDQTtBQUNBO21CQUNBO3dDQUNBO0FBQ0E7dUNBQ0E7OEZBQ0E7QUFDQTtzQ0FDQTtnQ0FDQTs0RUFDQTt1Q0FDQTtxQkFDQTtBQUNBO0FBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSw4Q0FDQTtpQ0FDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7bUJBQ0E7QUFDQTttQkFDQSxBQUNBOztBQUNBOztBQUNBLHFDQUNBO3FEQUNBO0FBQ0E7O0FBQ0EsbURBQ0E7WUFDQTtvQkFDQTs0QkFDQTtlQUNBOytCQUNBO0FBQ0E7ZUFDQTtlQUNBO21DQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7c0JBQ0E7QUFDQTtlQUNBO3FDQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTsrQkFDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLG1EQUNBOzhFQUNBLEFBQ0E7OytCQUNBOzRCQUNBO3NDQUNBO3NCQUNBO0FBQ0EsQUFDQTs7WUFDQTs2Q0FDQTt3QkFDQTs0Q0FDQTttQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7NkJBQ0E7a0JBQ0E7MENBQ0E7MEJBQ0E7eUJBQ0E7c0JBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLHNEQUNBO21DQUNBO3FDQUNBO3FCQUNBO21CQUNBO2VBQ0E7MEJBQ0E7a0NBQ0E7cUJBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7NEJBQ0E7aUNBQ0EsQUFDQTs7aUNBQ0E7NEJBQ0E7QUFDQTt5Q0FDQTt1REFDQTsrQkFDQTs0QkFDQTtBQUNBO21DQUNBO2VBQ0E7QUFDQTs7QUFDQSx1REFDQTsrRkFDQTtlQUNBO0FBQ0E7O0FBQ0Esd0RBQ0E7Z0dBQ0E7ZUFDQTtBQUNBOztBQUNBLHlEQUNBO2dEQUNBO0FBQ0E7O0FBQ0EseURBQ0E7aUdBQ0E7ZUFDQTtBQUNBOztBQUNBLDBEQUNBO2tHQUNBO2VBQ0E7QUFDQTs7QUFDQSwyRUFDQTtBQUNBO0FBQ0E7OEJBQ0E7aUNBQ0E7dUJBQ0E7cUJBQ0E7QUFDQTtlQUNBO0FBQ0E7cUJBQ0E7cUJBQ0E7bUJBQ0E7bUJBQ0E7QUFDQSxBQUNBOzttQ0FDQTtzQ0FDQTtxQkFDQTttQkFDQTtlQUNBOzBCQUNBO2tDQUNBO3FCQUNBO0FBQ0E7QUFDQTs4Q0FDQSxBQUNBOztZQUNBO2dCQUNBO2VBQ0E7a0RBQ0E7QUFDQTtlQUNBO2VBQ0E7bURBQ0E7QUFDQTtlQUNBO29EQUNBO0FBQ0E7ZUFDQTtxREFDQTtBQUNBO2VBQ0E7cURBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO3NEQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7bUJBQ0EsQUFDQTs7OENBQ0E7aUNBQ0E7MkRBQ0EsQUFDQTs7QUFDQTtrQ0FDQSxBQUNBOztZQUNBO2dCQUNBO2VBQ0E7eUNBQ0E7QUFDQTtlQUNBO2VBQ0E7MENBQ0E7QUFDQTtlQUNBOzJDQUNBO0FBQ0E7ZUFDQTs0Q0FDQTtBQUNBO2VBQ0E7NENBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBOzZDQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0EsNENBQ0E7O2dCQUVBOzhEQUNBLEFBQ0E7QUFIQTtBQUlBOztBQUNBO0FBQ0EsMEVBQ0E7cUJBQ0EsQUFDQTs7NEJBQ0E7MENBQ0E7MENBQ0EsQUFDQTs7QUFDQTsyQkFDQTt3REFDQSxBQUNBOztBQUNBOzZCQUNBO2tFQUNBO29EQUNBO2lEQUNBLEFBQ0E7O0FBQ0E7MENBQ0E7NkZBQ0EsQUFDQTs7d0JBQ0EsQUFDQTs7a0RBQ0E7d0NBQ0E7Z0RBQ0E7QUFDQTtlQUNBO3lEQUNBO0FBQ0E7QUFDQTs7QUFDQSw2Q0FDQTsrQ0FDQTtzQ0FDQTtlQUNBO3VEQUNBO0FBQ0E7QUFDQTs7QUFDQSwyQ0FDQTtrQkFDQTtrQkFDQTttQ0FDQSxBQUNBOzswQ0FDQTs4QkFDQTtpRUFDQTtrQkFDQTtpQkFDQTt5Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7b0NBQ0E7QUFDQTs7QUFDQSw0Q0FDQTtrQkFDQTttQ0FDQSxBQUNBOzswQ0FDQTt5Q0FDQTtnQkFDQTtBQUNBOztBQUNBLDZDQUNBO3VDQUNBO0FBQ0E7O0FBQ0EsMENBQ0E7c0JBQ0EsQUFDQTs7eUNBQ0E7Z0RBQ0EsQUFDQTs7a0JBQ0E7MENBQ0E7MkJBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsOENBQ0E7cUNBQ0E7a0JBQ0E7a0RBQ0E7K0RBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EscURBQ0E7dUJBQ0E7a0NBQ0E7OEJBQ0EsQUFDQTs7b0NBQ0E7c0RBQ0E7ZUFDQTsrQkFDQTt1REFDQTs2Q0FDQTtpQ0FDQTtBQUNBO2lCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLCtDQUNBO29CQUNBOzhCQUNBO0FBQ0E7O0FBQ0E7QUFDQSxrREFDQTtvQkFDQTtrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBOzBEQUNBO3VDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7b0JBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O1lBQ0E7MEJBQ0E7b0JBQ0E7MERBQ0E7ZUFDQTsrQkFDQTtvREFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztZQUNBOzBCQUNBO3lEQUNBOzBEQUNBO3FCQUNBO3VFQUNBO2VBQ0E7eURBQ0E7MERBQ0E7b0RBQ0E7NkNBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLDhEQUNBO3VCQUNBOzBEQUNBO3VDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7aUNBQ0E7d0VBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3lEQUNBO3dCQUNBOzREQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7eURBQ0E7d0JBQ0E7Z0VBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MENBQ0E7QUFDQSxBQUNBOzsyREFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBOzBEQUNBO3VDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7dUJBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTsyQkFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O21FQUNBOzhHQUNBO0FBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7MkJBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzttRUFDQTt1RUFDQTtBQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBLHNFQUNBO3VCQUNBO3dEQUNBOzBEQUNBO3VDQUNBO2tDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7Z0hBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTtvQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O2tKQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3dDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7c0pBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7dURBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzs0REFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt3REFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7OzREQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBO0FBQ0EsMkRBQ0E7NEJBQ0E7NEJBQ0E7NkJBQ0EsQUFDQTs7dUNBQ0E7bUNBQ0E7QUFDQSxBQUNBOzsyREFDQTs2QkFDQSxBQUNBOztBQUNBOzJCQUNBOytCQUNBLEFBQ0E7O2tEQUNBOytDQUNBLEFBQ0E7OzBDQUNBO29CQUNBO0FBQ0E7QUFDQTs7QUFDQSw2Q0FDQTtrQkFDQTt1QkFDQTtzQ0FDQTs4QkFDQTsrQ0FDQTt5QkFDQTtBQUNBO0FBQ0E7QUFDQTs0Q0FDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7O0FBQ0EsbURBQ0E7K0NBQ0E7c0NBQ0E7b0NBQ0E7aUJBQ0E7MENBQ0E7K0RBQ0E7NEJBQ0E7d0JBQ0E7QUFDQTtlQUNBOzBCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsK0JBQ0E7aUNBQ0E7eUNBQ0E7QUFDQTs7QUFDQSxzQkFDQTs7QUFDQSxBQUNBLEFBQ0E7OztBQUNBLHVDQUNBO3dCQUNBLEFBQ0E7O0FBQ0E7dUJBQ0E7dUJBQ0EsQUFDQTs7QUFDQTtxQkFDQTtxQkFDQSxBQUNBOzt1QkFDQTswQkFDQTtnQ0FDQTt3QkFDQTtzQkFDQTt1QkFDQTsyQkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTswQkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs4QkFDQTs4QkFDQTs0QkFDQTsrQkFDQTsrQkFDQTsrQkFDQTsrQkFDQTsyQkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTsrQkFDQTsrQkFDQTtzQkFDQTt5QkFDQTsrQkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0E7QUFDQTs4Q0FFQTt3QkFEQSxDQUVBO2lDQUNBOytCQUNBO2lCQUNBOytCQUNBO2VBQ0E7QUFDQTs7QUFDQSw4QkFDQTtBQUNBO0FBQ0E7QUFDQTs4QkFDQTtnQ0FDQTtBQUNBOztBQUNBLGdDQUNBO29EQUNBOzZEQUNBO1dBQ0E7QUFDQTs7QUFDQSxtQ0FDQTtzTEFDQTtBQUNBOztBQUNBLHdCQUNBOzRDQUNBOzBCQUNBO0FBQ0E7O0FBQ0EsZ0NBQ0E7d0JBQ0E7NkNBQ0E7aUNBQ0E7Z0VBQ0E7d0JBQ0E7NENBQ0E7Z0ZBQ0E7K0NBQ0E7NENBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGlDQUNBO3dCQUNBOzZDQUNBO0FBQ0E7NkNBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7bUJBQ0E7d0JBQ0E7NkNBQ0E7NkJBQ0E7b0JBQ0E7bUJBQ0E7eUJBQ0E7eUJBQ0E7QUFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0Esa0NBQ0E7a0NBQ0E7QUFDQTs7QUFDQSxvREFDQTtZQUNBO3lDQUNBOzJEQUNBO2dDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLG1DQUNBO1lBQ0E7b0NBQ0E7c0JBQ0E7OENBQ0E7QUFDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7O0FBQ0EscUNBQ0E7MENBQ0E7MkJBQ0E7NkJBQ0E7NENBQ0E7QUFDQTs7QUFDQSwwQ0FDQTswQ0FDQTs2QkFDQTs2QkFDQTs0Q0FDQTtBQUNBOztBQUNBLDZDQUNBOzBDQUNBOzZCQUNBOzZCQUNBO0FBQ0E7O0FBQ0EscUNBQ0E7OENBQ0E7QUFDQSxBQUNBOzs7QUN6aENBO0FBQ0EsQUFDQTs7QUFDQSxtRUFDQTtlQUNBO3VDQUNBO2lDQUNBOzRCQUNBO3FCQUNBO29DQUNBOzRCQUNBO2dDQUNBLEFBQ0E7O2FBQ0EsQUFDQTs7Z0NBQ0E7ZUFDQTtpQkFDQTtpRkFDQSxBQUNBOztnQ0FDQTtlQUNBO2lCQUNBO2lGQUNBLEFBQ0E7O3FCQUNBO2tCQUNBOytCQUNBOzBDQUNBO2VBQ0E7OEJBQ0E7a0JBQ0E7QUFDQTtrREFDQTtBQUNBOztBQUNBLDJFQUNBO2tCQUNBO3VDQUNBO2lDQUNBOzRCQUNBO3FFQUNBO29DQUNBOzRCQUNBO2dFQUNBLEFBQ0E7O3lCQUNBLEFBQ0E7O2dEQUNBO2lDQUNBO2NBQ0E7ZUFDQTtnREFDQTtpREFDQTtBQUNBO2lCQUNBO0FBQ0E7OEJBQ0E7MEJBQ0E7aUJBQ0E7MENBQ0E7QUFDQTs4QkFDQTtBQUNBO2lCQUNBO0FBQ0EsQUFDQTs7aUNBQ0E7Z0JBQ0E7Z0JBQ0E7cUNBQ0E7OENBQ0E7b0JBQ0E7aUJBQ0E7NkRBQ0E7Z0JBQ0E7QUFDQTtBQUNBLEFBQ0E7O3VGQUNBLEFBQ0E7O3dCQUNBO2dCQUNBO3NGQUNBLEFBQ0E7O3NDQUNBO0FBQ0EsQUFDQTs7O0FDeEZBO0FBQ0EsQUFDQTs7QUFDQSxBQUNBOztBQUNBLHFDQUNBOztBQUNBLHFDQUNBO3NFQUNBO29GQUNBLEFBQ0E7OzZCQUNBOzhCQUNBO3VDQUNBO0FBQ0E7QUFDQSxBQUNBOztxQkFDQTtzQkFDQTsyREFDQTs0QkFDQTtzRkFDQTtpQkFDQTtvQ0FDQTsrQkFDQTtBQUNBO0FBQ0E7QUFDQTthQUNBLEFBQ0E7O3VDQUNBO3VCQUNBOytDQUNBO0FBQ0E7QUFDQSxBQUNBOztxQ0FDQTt5QkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQ0E7O0FBQ0EsdUJBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQ0E7O0FBQ0Esd0NBQ0E7d0JBQ0E7QUFDQTs7QUFDQTtBQUNBLGdDQUNBO2VBQ0E7O0FBQ0EscUNBQ0E7d0JBQ0E7QUFDQSxBQUNBOzs7QUNwRUE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBLDhCQUNBOztBQUNBLDhDQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EscUNBQ0E7Z0NBQ0E7Z0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTs0Q0FDQTtpQkFDQTtpQkFDQTtpQkFDQTtpQkFDQTtnQ0FDQTtpQ0FDQTtBQUNBO0FBQ0E7QUFWQTtlQVlBO3dDQUNBO0FBQ0E7Z0RBQ0E7NkNBQ0E7c0xBQ0E7a0NBQ0E7QUFDQTtBQVJBO2VBVUE7dUNBQ0E7QUFDQTtrRkFDQTs4QkFDQTtBQUNBO0FBQ0E7QUFQQTtlQVNBO2dEQUNBO0FBQ0E7bUZBQ0E7c0ZBQ0E7d0JBQ0E7QUFDQTtBQVBBO2VBU0E7aURBQ0E7QUFDQTsrREFDQTtBQUNBO0FBTEE7ZUFPQTs7QUFFQTtxQ0FDQTtrQ0FDQSxBQUNBOzs7QUFFQTtvQkFEQSxpR0FFQTt1Q0FDQTt3RkFDQTs7Z0RBRUE7a0NBREEsQ0FFQTtxQ0FDQTswQkFDQTtBQUNBO0FBQ0E7a0RBQ0E7eUJBQ0E7QUFDQTtBQUNBOzBDQUNBOzBHQUNBLEFBQ0E7O3dDQUNBO0FBQ0E7MkJBQ0E7QUFDQTt3Q0FDQTtBQUNBO0FBQ0E7a0NBQ0E7b0RBQ0E7MkJBQ0E7QUFDQTtBQUNBO0FBQ0E7dUJBQ0E7QUFDQTsrQkFDQTs0Q0FDQSxBQUNBOzt1QkFDQTtBQUNBLEFBQ0E7O2tDQUNBO0FBQ0E7NkJBQ0E7a0NBQ0E7MkJBQ0E7QUFDQSxBQUNBOzt5Q0FDQTs2QkFwREEsQ0FxREE7QUFDQTtBQXhEQTtlQTBEQTtxREFDQTt3QkFDQSxBQUNBOztBQUNBO3dGQUNBO2lEQUNBO0FBQ0E7MkZBQ0E7b0RBQ0E7QUFDQTtxRkFDQTt1Q0FDQTtBQUNBO2tGQUNBO3NDQUNBO0FBQ0E7QUFDQTtBQWxCQTtlQW9CQTs7QUFFQTtpQ0FDQTtrQ0FDQTs4QkFDQTs0QkFDQTtzQkFDQTs2QkFDQTs2QkFDQTttQkFDQTs4QkFDQTs2QkFDQTtBQUNBO3FFQUNBOzJDQWJBLENBY0E7QUFDQTtBQWpCQTtlQW1CQTs7QUFFQTtpQ0FDQTtrQ0FDQTs2QkFDQTs0QkFDQTtzQkFDQTs2QkFDQTs2QkFDQTttQkFDQTs4QkFDQTs2QkFDQTtBQUNBO3FFQUNBOzJDQWJBLENBY0E7QUFDQTtBQWpCQTtlQW1CQTt1RUFDQTswQ0FDQTtrRkFDQTsrREFDQTtBQUNBO0FBTkE7ZUFRQTt3Q0FDQTtBQUNBOzJCQUNBOzJFQUNBOzZEQUNBO29EQUNBOzhCQUNBO3FEQUNBO2tEQUNBO0FBQ0E7QUFYQTtlQWFBO3lDQUNBO3lCQUNBLEFBQ0E7OzJCQUNBO3lDQUNBOzhCQUNBOytDQUNBO3FMQUNBOytDQUNBO2lEQUNBOzJDQUNBO2tDQUNBO3lDQUNBOzZEQUNBOzJCQUNBO0FBQ0E7dURBQ0E7NkNBQ0E7eURBQ0E7MkVBQ0E7b0JBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQTFCQTs7ZUEyQkE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUNuT0E7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDhCQUNBOztBQUNBLDhDQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0Esa0NBQ0E7NkJBQ0E7Z0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTt1Q0FDQTtBQUNBOzZDQUNBOzRCQUNBOzZDQUNBO0FBQ0E7QUFQQTtlQVNBO3VDQUNBO0FBQ0E7b0ZBQ0E7NEJBQ0E7NkJBQ0E7d0NBQ0E7aURBQ0E7MkRBQ0E7bUNBQ0E7Z0VBQ0E7a0NBQ0E7dUNBQ0E7bUNBQ0E7d0VBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBO0FBcEJBOztlQXFCQTtBQUNBOztBQUNBLG1DQUNBLEFBQ0E7OztBQzVEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSwyQkFDQTtzQkFDQTtnQ0FDQTtBQUNBLEFBQ0E7OztlQUVBO3FEQUNBO0FBQ0E7MENBQ0E7O3dCQUVBO3FCQUNBLEFBQ0E7QUFIQTttRUFJQTtBQUNBO0FBVkE7ZUFZQTt3Q0FDQTttRUFDQTttQkFDQTtBQUNBO0FBTEE7ZUFPQTs2RUFDQTtBQUNBO3lEQUNBOztxQkFFQTtvQkFDQTtvQkFDQSxBQUNBO0FBSkE7bURBS0E7MEJBQ0E7eURBQ0E7Z0NBQ0E7a0RBQ0E7eUJBQ0E7cUZBQ0E7QUFDQTtBQWpCQTtlQW1CQTt5REFDQTtBQUNBOytCQUNBO3lEQUNBOzhEQUNBO3dEQUNBO3VEQUNBO3VEQUNBO3FGQUNBO0FBQ0E7QUFYQTtlQWFBO3VDQUNBO0FBQ0E7eURBQ0E7NkNBQ0E7NENBQ0E7c0RBQ0E7Z0RBQ0E7K0JBQ0E7OENBQ0E7c0VBQ0E7dUJBQ0E7NERBQ0E7Z0NBQ0E7d0VBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQXRCQTs7ZUF1QkE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUMzRkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBLDhCQUNBOztBQUNBLDhDQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0Esb0NBQ0E7K0JBQ0E7Z0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTt1Q0FDQTtpQkFDQTtpQkFDQTtpQkFDQTtBQUNBO0FBTkE7ZUFRQTt5Q0FDQTtnREFDQTs2Q0FDQTtzTEFDQTtBQUNBO0FBTkE7ZUFRQTt1Q0FDQTtBQUNBO2tGQUNBOzhCQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFUQTs7ZUFVQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ25EQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSwrQkFDQTswQkFDQTtnQ0FDQSxBQUNBOzttQ0FDQTtBQUNBLEFBQ0E7OztlQUVBO21FQUNBO3dCQUNBLEFBQ0E7OzBEQUNBO3lDQUNBOzhGQUNBO29EQUNBO3VCQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtlQWVBO3dFQUNBO3lCQUNBLEFBQ0E7OzBEQUNBOzBDQUNBO3lCQUNBOzZDQUNBO29EQUNBO3VCQUNBO3FCQUNBO3VCQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQWpCQTs7ZUFrQkE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUM3REE7QUFDQSxBQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDJCQUNBOztBQUNBLDhCQUNBOztBQUNBLDZCQUNBOztBQUNBOztBQUNBOztBQUNBO0FBQ0EscUNBQ0EsQUFDQTs7O0FDbEJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSx5QkFDQTs7QUFDQSxrQ0FDQTs7QUFDQSxrREFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7Y0FFQTtvQ0FDQTswQkFDQTtBQUNBO2dEQUNBO0FBQ0EsQUFDQTs7K0RBQ0E7QUFDQTtvQ0FDQTtBQUNBOzBCQUNBO3lCQUNBOzBCQUNBO3lCQUNBO3lCQUNBO2dDQUNBO0FBQ0E7dURBQ0E7c0NBQ0E7QUFDQTtvQ0FDQTtBQUNBO3VEQUNBOzBCQUNBO0FBQ0EsQUFDQTtBQTNCQTs7QUE0QkEseUJBQ0EsQUFDQTs7O0FDL0NBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSx3QkFDQTs7QUFDQSxpQ0FDQTs7QUFDQSxpREFDQTs7QUFDQTs7QUFDQTs7QUFDQTtjQUVBO29DQUNBOzBCQUNBO0FBQ0E7Z0RBQ0E7NkJBQ0E7QUFDQTtvQ0FDQTswQ0FDQTtrQkFDQTtBQUNBO29DQUNBO3dEQUNBO3VEQUNBO0FBQ0E7QUFmQTtBQWdCQSx3QkFDQSxBQUNBOzs7QUNqQ0E7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLHNCQUNBOztBQUNBLCtCQUNBOztBQUNBLCtDQUNBOztBQUNBOztBQUNBOztBQUNBO0FBQ0E7Y0FFQTtlQUNBO2dEQUNBOzZCQUNBO0FBQ0E7O2lEQUVBOzZCQURBLENBRUE7OEJBQ0E7QUFDQTtvQ0FDQTt3REFDQTtBQUNBLEFBQ0E7QUFkQTs7QUFlQSxzQkFDQSxBQUNBOzs7QUNqQ0E7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLDRDQUNBOzhCQUNBO2FBQ0E7QUFDQTs7QUFDQTs4QkFFQTtzQkFDQSxBQUNBOzs4REFDQTt1RkFDQTtBQUNBOytEQUNBO0FBQ0E7NERBQ0E7NERBQ0E7dUJBQ0E7QUFDQTswREFDQTt1QkFDQSxBQUNBOzs4REFDQTtnREFDQTt1Q0FDQTt5REFDQTtnQ0FDQTtxREFDQTt5Q0FDQTtBQUNBO0FBQ0E7c0NBQ0E7aUVBQ0E7a0RBQ0E7eUNBQ0E7MkRBQ0E7a0NBQ0E7dURBQ0E7MkNBQ0E7QUFDQTtBQUNBO0FBQ0E7cURBQ0E7K0NBQ0E7b0dBQ0E7NkNBQ0E7dUdBQ0E7OEJBQ0E7NEZBQ0E7OEJBQ0E7aUdBQ0E7QUFDQTtBQUNBLEFBQ0E7QUEvQ0E7O0FBZ0RBLHdCQUNBLEFBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXk7XG5cblx0dmFyIFBMVVMgPSAnKycuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKTtcblx0dmFyIExPV0VSID0gJ2EnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBVUFBFUiA9ICdBJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgU0xBU0hfVVJMX1NBRkUgPSAnXycuY2hhckNvZGVBdCgwKTtcblxuXHRmdW5jdGlvbiBkZWNvZGUoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKTtcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fCBjb2RlID09PSBQTFVTX1VSTF9TQUZFKSByZXR1cm4gNjI7IC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fCBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSkgcmV0dXJuIDYzOyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUikgcmV0dXJuIC0xOyAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMCkgcmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2O1xuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNikgcmV0dXJuIGNvZGUgLSBVUFBFUjtcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpIHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNjtcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5KGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyO1xuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoO1xuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMDtcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKTtcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aDtcblxuXHRcdHZhciBMID0gMDtcblxuXHRcdGZ1bmN0aW9uIHB1c2godikge1xuXHRcdFx0YXJyW0wrK10gPSB2O1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpO1xuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOCk7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0O1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyO1xuXHRcdFx0cHVzaCh0bXAgPj4gOCAmIDB4RkYpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdCAgICBleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMyxcblx0XHQgICAgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdCAgICB0ZW1wLFxuXHRcdCAgICBsZW5ndGg7XG5cblx0XHRmdW5jdGlvbiBlbmNvZGUobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKTtcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyB1aW50OFtpICsgMl07XG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApO1xuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMik7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA8PCA0ICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSAnPT0nO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArIHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgMiAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz0nO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5O1xuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0O1xufSkodHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkLmJhc2U2NGpzID0ge30gOiBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSTJOQzVxY3lKZExDSnVZVzFsY3lJNld5SnNiMjlyZFhBaUxDSmxlSEJ2Y25Seklpd2lRWEp5SWl3aVZXbHVkRGhCY25KaGVTSXNJa0Z5Y21GNUlpd2lVRXhWVXlJc0ltTm9ZWEpEYjJSbFFYUWlMQ0pUVEVGVFNDSXNJazVWVFVKRlVpSXNJa3hQVjBWU0lpd2lWVkJRUlZJaUxDSlFURlZUWDFWU1RGOVRRVVpGSWl3aVUweEJVMGhmVlZKTVgxTkJSa1VpTENKa1pXTnZaR1VpTENKbGJIUWlMQ0pqYjJSbElpd2lZalkwVkc5Q2VYUmxRWEp5WVhraUxDSmlOalFpTENKcElpd2lhaUlzSW13aUxDSjBiWEFpTENKd2JHRmpaVWh2YkdSbGNuTWlMQ0poY25JaUxDSnNaVzVuZEdnaUxDSkZjbkp2Y2lJc0lteGxiaUlzSW1Ob1lYSkJkQ0lzSWt3aUxDSndkWE5vSWl3aWRpSXNJblZwYm5RNFZHOUNZWE5sTmpRaUxDSjFhVzUwT0NJc0ltVjRkSEpoUW5sMFpYTWlMQ0p2ZFhSd2RYUWlMQ0owWlcxd0lpd2laVzVqYjJSbElpd2liblZ0SWl3aWRISnBjR3hsZEZSdlFtRnpaVFkwSWl3aWRHOUNlWFJsUVhKeVlYa2lMQ0ptY205dFFubDBaVUZ5Y21GNUlpd2lZbUZ6WlRZMGFuTWlYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzU1VGQlNVRXNVMEZCVXl4clJVRkJZanM3UVVGRlFTeERRVUZGTEZkQlFWVkRMRTlCUVZZc1JVRkJiVUk3UVVGRGNFSTdPMEZCUlVNc1MwRkJTVU1zVFVGQlR5eFBRVUZQUXl4VlFVRlFMRXRCUVhOQ0xGZEJRWFpDTEVkQlEwNUJMRlZCUkUwc1IwRkZUa01zUzBGR1NqczdRVUZKUkN4TFFVRkpReXhQUVVGVExFbEJRVWxETEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlF5eFJRVUZUTEVsQlFVbEVMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUlN4VFFVRlRMRWxCUVVsR0xGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpSeXhSUVVGVExFbEJRVWxJTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlNTeFJRVUZUTEVsQlFVbEtMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKU3l4blFrRkJaMElzU1VGQlNVd3NWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJjRUk3UVVGRFFTeExRVUZKVFN4cFFrRkJhVUlzU1VGQlNVNHNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJja0k3TzBGQlJVRXNWVUZCVTA4c1RVRkJWQ3hEUVVGcFFrTXNSMEZCYWtJc1JVRkJjMEk3UVVGRGNrSXNUVUZCU1VNc1QwRkJUMFFzU1VGQlNWSXNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJXRHRCUVVOQkxFMUJRVWxUTEZOQlFWTldMRWxCUVZRc1NVRkRRVlVzVTBGQlUwb3NZVUZFWWl4RlFVVkRMRTlCUVU4c1JVRkJVQ3hEUVVwdlFpeERRVWxXTzBGQlExZ3NUVUZCU1Vrc1UwRkJVMUlzUzBGQlZDeEpRVU5CVVN4VFFVRlRTQ3hqUVVSaUxFVkJSVU1zVDBGQlR5eEZRVUZRTEVOQlVHOUNMRU5CVDFZN1FVRkRXQ3hOUVVGSlJ5eFBRVUZQVUN4TlFVRllMRVZCUTBNc1QwRkJUeXhEUVVGRExFTkJRVklzUTBGVWIwSXNRMEZUVmp0QlFVTllMRTFCUVVsUExFOUJRVTlRTEZOQlFWTXNSVUZCY0VJc1JVRkRReXhQUVVGUFR5eFBRVUZQVUN4TlFVRlFMRWRCUVdkQ0xFVkJRV2hDTEVkQlFYRkNMRVZCUVRWQ08wRkJRMFFzVFVGQlNVOHNUMEZCVDB3c1VVRkJVU3hGUVVGdVFpeEZRVU5ETEU5QlFVOUxMRTlCUVU5TUxFdEJRV1E3UVVGRFJDeE5RVUZKU3l4UFFVRlBUaXhSUVVGUkxFVkJRVzVDTEVWQlEwTXNUMEZCVDAwc1QwRkJUMDRzUzBGQlVDeEhRVUZsTEVWQlFYUkNPMEZCUTBRN08wRkJSVVFzVlVGQlUwOHNZMEZCVkN4RFFVRjVRa01zUjBGQmVrSXNSVUZCT0VJN1FVRkROMElzVFVGQlNVTXNRMEZCU2l4RlFVRlBReXhEUVVGUUxFVkJRVlZETEVOQlFWWXNSVUZCWVVNc1IwRkJZaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5ETEVkQlFXaERPenRCUVVWQkxFMUJRVWxPTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFYSkNMRVZCUVhkQ08wRkJRM1pDTEZOQlFVMHNTVUZCU1VNc1MwRkJTaXhEUVVGVkxHZEVRVUZXTEVOQlFVNDdRVUZEUVRzN1FVRkZSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1VNc1RVRkJUVlFzU1VGQlNVOHNUVUZCWkR0QlFVTkJSaXhwUWtGQlpTeFJRVUZSVEN4SlFVRkpWU3hOUVVGS0xFTkJRVmRFTEUxQlFVMHNRMEZCYWtJc1EwRkJVaXhIUVVFNFFpeERRVUU1UWl4SFFVRnJReXhSUVVGUlZDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4RFFVRnVSanM3UVVGRlFUdEJRVU5CU0N4UlFVRk5MRWxCUVVseVFpeEhRVUZLTEVOQlFWRmxMRWxCUVVsUExFMUJRVW9zUjBGQllTeERRVUZpTEVkQlFXbENMRU5CUVdwQ0xFZEJRWEZDUml4WlFVRTNRaXhEUVVGT096dEJRVVZCTzBGQlEwRkdMRTFCUVVsRkxHVkJRV1VzUTBGQlppeEhRVUZ0UWt3c1NVRkJTVThzVFVGQlNpeEhRVUZoTEVOQlFXaERMRWRCUVc5RFVDeEpRVUZKVHl4TlFVRTFRenM3UVVGRlFTeE5RVUZKU1N4SlFVRkpMRU5CUVZJN08wRkJSVUVzVjBGQlUwTXNTVUZCVkN4RFFVRmxReXhEUVVGbUxFVkJRV3RDTzBGQlEycENVQ3hQUVVGSlN5eEhRVUZLTEVsQlFWZEZMRU5CUVZnN1FVRkRRVHM3UVVGRlJDeFBRVUZMV2l4SlFVRkpMRU5CUVVvc1JVRkJUME1zU1VGQlNTeERRVUZvUWl4RlFVRnRRa1FzU1VGQlNVVXNRMEZCZGtJc1JVRkJNRUpHTEV0QlFVc3NRMEZCVEN4RlFVRlJReXhMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNwRFJTeFRRVUZQVWl4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRU5CUVZnc1EwRkJVQ3hMUVVGNVFpeEZRVUV4UWl4SFFVRnBRMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4TFFVRTJRaXhGUVVFNVJDeEhRVUZ4UlV3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RFFVRnNSeXhIUVVGMVIwd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hEUVVFM1J6dEJRVU5CVnl4UlFVRkxMRU5CUVVOU0xFMUJRVTBzVVVGQlVDeExRVUZ2UWl4RlFVRjZRanRCUVVOQlVTeFJRVUZMTEVOQlFVTlNMRTFCUVUwc1RVRkJVQ3hMUVVGclFpeERRVUYyUWp0QlFVTkJVU3hSUVVGTFVpeE5RVUZOTEVsQlFWZzdRVUZEUVRzN1FVRkZSQ3hOUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZEZGtKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFTkJRVEZDTEVkQlFXZERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVc1Rk8wRkJRMEZYTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQkxFZEJTRVFzVFVGSFR5eEpRVUZKUXl4cFFrRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkRPVUpFTEZOQlFVOVNMRTlCUVU5SkxFbEJRVWxWTEUxQlFVb3NRMEZCVjFRc1EwRkJXQ3hEUVVGUUxFdEJRWGxDTEVWQlFURkNMRWRCUVdsRFRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRVGxFTEVkQlFXOUZUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVhaSE8wRkJRMEZYTEZGQlFVMVNMRTlCUVU4c1EwRkJVaXhIUVVGaExFbEJRV3hDTzBGQlEwRlJMRkZCUVV0U0xFMUJRVTBzU1VGQldEdEJRVU5CT3p0QlFVVkVMRk5CUVU5RkxFZEJRVkE3UVVGRFFUczdRVUZGUkN4VlFVRlRVU3hoUVVGVUxFTkJRWGRDUXl4TFFVRjRRaXhGUVVFclFqdEJRVU01UWl4TlFVRkpaQ3hEUVVGS08wRkJRVUVzVFVGRFEyVXNZVUZCWVVRc1RVRkJUVklzVFVGQlRpeEhRVUZsTEVOQlJEZENPMEZCUVVFc1RVRkRaME03UVVGREwwSlZMRmRCUVZNc1JVRkdWanRCUVVGQkxFMUJSME5ETEVsQlNFUTdRVUZCUVN4TlFVZFBXQ3hOUVVoUU96dEJRVXRCTEZkQlFWTlpMRTFCUVZRc1EwRkJhVUpETEVkQlFXcENMRVZCUVhOQ08wRkJRM0pDTEZWQlFVOXlReXhQUVVGUE1rSXNUVUZCVUN4RFFVRmpWU3hIUVVGa0xFTkJRVkE3UVVGRFFUczdRVUZGUkN4WFFVRlRReXhsUVVGVUxFTkJRVEJDUkN4SFFVRXhRaXhGUVVFclFqdEJRVU01UWl4VlFVRlBSQ3hQUVVGUFF5eFBRVUZQTEVWQlFWQXNSMEZCV1N4SlFVRnVRaXhKUVVFeVFrUXNUMEZCVDBNc1QwRkJUeXhGUVVGUUxFZEJRVmtzU1VGQmJrSXNRMEZCTTBJc1IwRkJjMFJFTEU5QlFVOURMRTlCUVU4c1EwRkJVQ3hIUVVGWExFbEJRV3hDTEVOQlFYUkVMRWRCUVdkR1JDeFBRVUZQUXl4TlFVRk5MRWxCUVdJc1EwRkJka1k3UVVGRFFUczdRVUZGUkR0QlFVTkJMRTlCUVV0dVFpeEpRVUZKTEVOQlFVb3NSVUZCVDAwc1UwRkJVMUVzVFVGQlRWSXNUVUZCVGl4SFFVRmxVeXhWUVVGd1F5eEZRVUZuUkdZc1NVRkJTVTBzVFVGQmNFUXNSVUZCTkVST0xFdEJRVXNzUTBGQmFrVXNSVUZCYjBVN1FVRkRia1ZwUWl4VlFVRlBMRU5CUVVOSUxFMUJRVTFrTEVOQlFVNHNTMEZCV1N4RlFVRmlMRXRCUVc5Q1l5eE5RVUZOWkN4SlFVRkpMRU5CUVZZc1MwRkJaMElzUTBGQmNFTXNTVUZCTUVOakxFMUJRVTFrTEVsQlFVa3NRMEZCVml4RFFVRnFSRHRCUVVOQlowSXNZVUZCVlVrc1owSkJRV2RDU0N4SlFVRm9RaXhEUVVGV08wRkJRMEU3TzBGQlJVUTdRVUZEUVN4VlFVRlJSaXhWUVVGU08wRkJRME1zVVVGQlN5eERRVUZNTzBGQlEwTkZMRmRCUVU5SUxFMUJRVTFCTEUxQlFVMVNMRTFCUVU0c1IwRkJaU3hEUVVGeVFpeERRVUZRTzBGQlEwRlZMR05CUVZWRkxFOUJRVTlFTEZGQlFWRXNRMEZCWml4RFFVRldPMEZCUTBGRUxHTkJRVlZGTEU5QlFWRkVMRkZCUVZFc1EwRkJWQ3hIUVVGakxFbEJRWEpDTEVOQlFWWTdRVUZEUVVRc1kwRkJWU3hKUVVGV08wRkJRMEU3UVVGRFJDeFJRVUZMTEVOQlFVdzdRVUZEUTBNc1YwRkJUeXhEUVVGRFNDeE5RVUZOUVN4TlFVRk5VaXhOUVVGT0xFZEJRV1VzUTBGQmNrSXNTMEZCTWtJc1EwRkJOVUlzU1VGQmEwTlJMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGNlF6dEJRVU5CVlN4alFVRlZSU3hQUVVGUFJDeFJRVUZSTEVWQlFXWXNRMEZCVmp0QlFVTkJSQ3hqUVVGVlJTeFBRVUZSUkN4UlFVRlJMRU5CUVZRc1IwRkJZeXhKUVVGeVFpeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SFFVRldPMEZCUTBFN1FVRmlSanM3UVVGblFrRXNVMEZCVDBFc1RVRkJVRHRCUVVOQk96dEJRVVZFYWtNc1UwRkJVWE5ETEZkQlFWSXNSMEZCYzBKMlFpeGpRVUYwUWp0QlFVTkJaaXhUUVVGUmRVTXNZVUZCVWl4SFFVRjNRbFFzWVVGQmVFSTdRVUZEUVN4RFFYcElReXhGUVhsSVFTeFBRVUZQT1VJc1QwRkJVQ3hMUVVGdFFpeFhRVUZ1UWl4SFFVRnJReXhWUVVGTGQwTXNVVUZCVEN4SFFVRm5RaXhGUVVGc1JDeEhRVUYzUkhoRExFOUJla2g0UkN4RFFVRkVJaXdpWm1sc1pTSTZJbUkyTkM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCc2IyOXJkWEFnUFNBblFVSkRSRVZHUjBoSlNrdE1UVTVQVUZGU1UxUlZWbGRZV1ZwaFltTmtaV1puYUdscWEyeHRibTl3Y1hKemRIVjJkM2g1ZWpBeE1qTTBOVFkzT0Rrckx5YzdYRzVjYmpzb1puVnVZM1JwYjI0Z0tHVjRjRzl5ZEhNcElIdGNibHgwSjNWelpTQnpkSEpwWTNRbk8xeHVYRzRnSUhaaGNpQkJjbklnUFNBb2RIbHdaVzltSUZWcGJuUTRRWEp5WVhrZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1Z4dUlDQWdJRDhnVldsdWREaEJjbkpoZVZ4dUlDQWdJRG9nUVhKeVlYbGNibHh1WEhSMllYSWdVRXhWVXlBZ0lEMGdKeXNuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JSUNBOUlDY3ZKeTVqYUdGeVEyOWtaVUYwS0RBcFhHNWNkSFpoY2lCT1ZVMUNSVklnUFNBbk1DY3VZMmhoY2tOdlpHVkJkQ2d3S1Z4dVhIUjJZWElnVEU5WFJWSWdJRDBnSjJFbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRlZRVUVWU0lDQTlJQ2RCSnk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQlFURlZUWDFWU1RGOVRRVVpGSUQwZ0p5MG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZOTVFWTklYMVZTVEY5VFFVWkZJRDBnSjE4bkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4dVhIUm1kVzVqZEdsdmJpQmtaV052WkdVZ0tHVnNkQ2tnZTF4dVhIUmNkSFpoY2lCamIyUmxJRDBnWld4MExtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MFhIUnBaaUFvWTI5a1pTQTlQVDBnVUV4VlV5QjhmRnh1WEhSY2RDQWdJQ0JqYjJSbElEMDlQU0JRVEZWVFgxVlNURjlUUVVaRktWeHVYSFJjZEZ4MGNtVjBkWEp1SURZeUlDOHZJQ2NySjF4dVhIUmNkR2xtSUNoamIyUmxJRDA5UFNCVFRFRlRTQ0I4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCVFRFRlRTRjlWVWt4ZlUwRkdSU2xjYmx4MFhIUmNkSEpsZEhWeWJpQTJNeUF2THlBbkx5ZGNibHgwWEhScFppQW9ZMjlrWlNBOElFNVZUVUpGVWlsY2JseDBYSFJjZEhKbGRIVnliaUF0TVNBdkwyNXZJRzFoZEdOb1hHNWNkRngwYVdZZ0tHTnZaR1VnUENCT1ZVMUNSVklnS3lBeE1DbGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxJQzBnVGxWTlFrVlNJQ3NnTWpZZ0t5QXlObHh1WEhSY2RHbG1JQ2hqYjJSbElEd2dWVkJRUlZJZ0t5QXlOaWxjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1ZWQlFSVkpjYmx4MFhIUnBaaUFvWTI5a1pTQThJRXhQVjBWU0lDc2dNallwWEc1Y2RGeDBYSFJ5WlhSMWNtNGdZMjlrWlNBdElFeFBWMFZTSUNzZ01qWmNibHgwZlZ4dVhHNWNkR1oxYm1OMGFXOXVJR0kyTkZSdlFubDBaVUZ5Y21GNUlDaGlOalFwSUh0Y2JseDBYSFIyWVhJZ2FTd2dhaXdnYkN3Z2RHMXdMQ0J3YkdGalpVaHZiR1JsY25Nc0lHRnljbHh1WEc1Y2RGeDBhV1lnS0dJMk5DNXNaVzVuZEdnZ0pTQTBJRDRnTUNrZ2UxeHVYSFJjZEZ4MGRHaHliM2NnYm1WM0lFVnljbTl5S0NkSmJuWmhiR2xrSUhOMGNtbHVaeTRnVEdWdVozUm9JRzExYzNRZ1ltVWdZU0J0ZFd4MGFYQnNaU0J2WmlBMEp5bGNibHgwWEhSOVhHNWNibHgwWEhRdkx5QjBhR1VnYm5WdFltVnlJRzltSUdWeGRXRnNJSE5wWjI1eklDaHdiR0ZqWlNCb2IyeGtaWEp6S1Z4dVhIUmNkQzh2SUdsbUlIUm9aWEpsSUdGeVpTQjBkMjhnY0d4aFkyVm9iMnhrWlhKekxDQjBhR0Z1SUhSb1pTQjBkMjhnWTJoaGNtRmpkR1Z5Y3lCaVpXWnZjbVVnYVhSY2JseDBYSFF2THlCeVpYQnlaWE5sYm5RZ2IyNWxJR0o1ZEdWY2JseDBYSFF2THlCcFppQjBhR1Z5WlNCcGN5QnZibXg1SUc5dVpTd2dkR2hsYmlCMGFHVWdkR2h5WldVZ1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUWdjbVZ3Y21WelpXNTBJRElnWW5sMFpYTmNibHgwWEhRdkx5QjBhR2x6SUdseklHcDFjM1FnWVNCamFHVmhjQ0JvWVdOcklIUnZJRzV2ZENCa2J5QnBibVJsZUU5bUlIUjNhV05sWEc1Y2RGeDBkbUZ5SUd4bGJpQTlJR0kyTkM1c1pXNW5kR2hjYmx4MFhIUndiR0ZqWlVodmJHUmxjbk1nUFNBblBTY2dQVDA5SUdJMk5DNWphR0Z5UVhRb2JHVnVJQzBnTWlrZ1B5QXlJRG9nSnowbklEMDlQU0JpTmpRdVkyaGhja0YwS0d4bGJpQXRJREVwSUQ4Z01TQTZJREJjYmx4dVhIUmNkQzh2SUdKaGMyVTJOQ0JwY3lBMEx6TWdLeUIxY0NCMGJ5QjBkMjhnWTJoaGNtRmpkR1Z5Y3lCdlppQjBhR1VnYjNKcFoybHVZV3dnWkdGMFlWeHVYSFJjZEdGeWNpQTlJRzVsZHlCQmNuSW9ZalkwTG14bGJtZDBhQ0FxSURNZ0x5QTBJQzBnY0d4aFkyVkliMnhrWlhKektWeHVYRzVjZEZ4MEx5OGdhV1lnZEdobGNtVWdZWEpsSUhCc1lXTmxhRzlzWkdWeWN5d2diMjVzZVNCblpYUWdkWEFnZEc4Z2RHaGxJR3hoYzNRZ1kyOXRjR3hsZEdVZ05DQmphR0Z5YzF4dVhIUmNkR3dnUFNCd2JHRmpaVWh2YkdSbGNuTWdQaUF3SUQ4Z1lqWTBMbXhsYm1kMGFDQXRJRFFnT2lCaU5qUXViR1Z1WjNSb1hHNWNibHgwWEhSMllYSWdUQ0E5SURCY2JseHVYSFJjZEdaMWJtTjBhVzl1SUhCMWMyZ2dLSFlwSUh0Y2JseDBYSFJjZEdGeWNsdE1LeXRkSUQwZ2RseHVYSFJjZEgxY2JseHVYSFJjZEdadmNpQW9hU0E5SURBc0lHb2dQU0F3T3lCcElEd2diRHNnYVNBclBTQTBMQ0JxSUNzOUlETXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UZ3BJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z01USXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXlLU2tnUER3Z05pa2dmQ0JrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ015a3BYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXdNQ2tnUGo0Z01UWXBYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXBJRDQrSURncFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmVnh1WEc1Y2RGeDBhV1lnS0hCc1lXTmxTRzlzWkdWeWN5QTlQVDBnTWlrZ2UxeHVYSFJjZEZ4MGRHMXdJRDBnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drcEtTQThQQ0F5S1NCOElDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBJQ3NnTVNrcElENCtJRFFwWEc1Y2RGeDBYSFJ3ZFhOb0tIUnRjQ0FtSURCNFJrWXBYRzVjZEZ4MGZTQmxiSE5sSUdsbUlDaHdiR0ZqWlVodmJHUmxjbk1nUFQwOUlERXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UQXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z05Da2dmQ0FvWkdWamIyUmxLR0kyTkM1amFHRnlRWFFvYVNBcklESXBLU0ErUGlBeUtWeHVYSFJjZEZ4MGNIVnphQ2dvZEcxd0lENCtJRGdwSUNZZ01IaEdSaWxjYmx4MFhIUmNkSEIxYzJnb2RHMXdJQ1lnTUhoR1JpbGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnWVhKeVhHNWNkSDFjYmx4dVhIUm1kVzVqZEdsdmJpQjFhVzUwT0ZSdlFtRnpaVFkwSUNoMWFXNTBPQ2tnZTF4dVhIUmNkSFpoY2lCcExGeHVYSFJjZEZ4MFpYaDBjbUZDZVhSbGN5QTlJSFZwYm5RNExteGxibWQwYUNBbElETXNJQzh2SUdsbUlIZGxJR2hoZG1VZ01TQmllWFJsSUd4bFpuUXNJSEJoWkNBeUlHSjVkR1Z6WEc1Y2RGeDBYSFJ2ZFhSd2RYUWdQU0JjSWx3aUxGeHVYSFJjZEZ4MGRHVnRjQ3dnYkdWdVozUm9YRzVjYmx4MFhIUm1kVzVqZEdsdmJpQmxibU52WkdVZ0tHNTFiU2tnZTF4dVhIUmNkRngwY21WMGRYSnVJR3h2YjJ0MWNDNWphR0Z5UVhRb2JuVnRLVnh1WEhSY2RIMWNibHh1WEhSY2RHWjFibU4wYVc5dUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNBb2JuVnRLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdaVzVqYjJSbEtHNTFiU0ErUGlBeE9DQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBeE1pQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBMklDWWdNSGd6UmlrZ0t5QmxibU52WkdVb2JuVnRJQ1lnTUhnelJpbGNibHgwWEhSOVhHNWNibHgwWEhRdkx5Qm5ieUIwYUhKdmRXZG9JSFJvWlNCaGNuSmhlU0JsZG1WeWVTQjBhSEpsWlNCaWVYUmxjeXdnZDJVbmJHd2daR1ZoYkNCM2FYUm9JSFJ5WVdsc2FXNW5JSE4wZFdabUlHeGhkR1Z5WEc1Y2RGeDBabTl5SUNocElEMGdNQ3dnYkdWdVozUm9JRDBnZFdsdWREZ3ViR1Z1WjNSb0lDMGdaWGgwY21GQ2VYUmxjenNnYVNBOElHeGxibWQwYURzZ2FTQXJQU0F6S1NCN1hHNWNkRngwWEhSMFpXMXdJRDBnS0hWcGJuUTRXMmxkSUR3OElERTJLU0FySUNoMWFXNTBPRnRwSUNzZ01WMGdQRHdnT0NrZ0t5QW9kV2x1ZERoYmFTQXJJREpkS1Z4dVhIUmNkRngwYjNWMGNIVjBJQ3M5SUhSeWFYQnNaWFJVYjBKaGMyVTJOQ2gwWlcxd0tWeHVYSFJjZEgxY2JseHVYSFJjZEM4dklIQmhaQ0IwYUdVZ1pXNWtJSGRwZEdnZ2VtVnliM01zSUdKMWRDQnRZV3RsSUhOMWNtVWdkRzhnYm05MElHWnZjbWRsZENCMGFHVWdaWGgwY21FZ1lubDBaWE5jYmx4MFhIUnpkMmwwWTJnZ0tHVjRkSEpoUW5sMFpYTXBJSHRjYmx4MFhIUmNkR05oYzJVZ01UcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlIVnBiblE0VzNWcGJuUTRMbXhsYm1kMGFDQXRJREZkWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNCbGJtTnZaR1VvZEdWdGNDQStQaUF5S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRHc4SURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlDYzlQU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSY2RHTmhjMlVnTWpwY2JseDBYSFJjZEZ4MGRHVnRjQ0E5SUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXlYU0E4UENBNEtTQXJJQ2gxYVc1ME9GdDFhVzUwT0M1c1pXNW5kR2dnTFNBeFhTbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJR1Z1WTI5a1pTaDBaVzF3SUQ0K0lERXdLVnh1WEhSY2RGeDBYSFJ2ZFhSd2RYUWdLejBnWlc1amIyUmxLQ2gwWlcxd0lENCtJRFFwSUNZZ01IZ3pSaWxjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2dvZEdWdGNDQThQQ0F5S1NBbUlEQjRNMFlwWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNBblBTZGNibHgwWEhSY2RGeDBZbkpsWVd0Y2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdiM1YwY0hWMFhHNWNkSDFjYmx4dVhIUmxlSEJ2Y25SekxuUnZRbmwwWlVGeWNtRjVJRDBnWWpZMFZHOUNlWFJsUVhKeVlYbGNibHgwWlhod2IzSjBjeTVtY205dFFubDBaVUZ5Y21GNUlEMGdkV2x1ZERoVWIwSmhjMlUyTkZ4dWZTaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlBb2RHaHBjeTVpWVhObE5qUnFjeUE5SUh0OUtTQTZJR1Y0Y0c5eWRITXBLVnh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlxcXFxiNjQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKTtcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpO1xuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MDtcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTI7XG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApO1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gNDI7XG4gICAgfTtcbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJiB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nOyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSgpO1xuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pO1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1YmplY3QpO1xuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdCk7XG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSc7XG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGg7XG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpO2Vsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZyk7ZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCk7IC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpO1xuXG4gIHZhciBidWY7XG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXM7XG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aDtcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSkgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSk7ZWxzZSBidWZbaV0gPSBzdWJqZWN0W2ldO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZyk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcik7XG59O1xuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXQ7XG4gIHN0ciA9IHN0ciArICcnO1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKTtcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKTtcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aCk7XG4gIHZhciBwb3MgPSAwO1xuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpO1xuICAgIHBvcyArPSBpdGVtLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gYnVmO1xufTtcblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMDtcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aDtcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKTtcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDI7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZTtcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyO1xuICByZXR1cm4gaTtcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aDtcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG9mZnNldDtcbiAgICBvZmZzZXQgPSBsZW5ndGg7XG4gICAgbGVuZ3RoID0gc3dhcDtcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIHJldDtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwO1xuICBlbmQgPSBlbmQgIT09IHVuZGVmaW5lZCA/IE51bWJlcihlbmQpIDogZW5kID0gc2VsZi5sZW5ndGg7XG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuICcnO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH07XG59O1xuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMDtcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0Jyk7XG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLCAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydCkgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0O1xuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIHRtcCA9ICcnO1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICAgIHRtcCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKTtcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gIH1yZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDA7XG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW47XG5cbiAgdmFyIG91dCA9ICcnO1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMCk7XG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pO1xuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydDtcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZjtcbiAgfVxufTtcblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpO1xufTtcblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF07XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgODtcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWw7XG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDg7XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgM107XG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMTtlbHNlIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWREb3VibGUoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgMHhmZiA8PCA4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDg7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZik7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSB2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4ICYgMHhmZjtcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KTtlbHNlIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMDtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGg7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJyk7XG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpO1xuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuO1xuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZTtcbiAgfVxufTtcblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pO1xuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLic7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiBuZXcgQnVmZmVyKHRoaXMpLmJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXTtcbiAgICAgIH1yZXR1cm4gYnVmLmJ1ZmZlcjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpO1xuICB9XG59O1xuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0oc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKCk7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlO1xuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZTtcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0O1xuICBhcnIuX3NldCA9IGFyci5zZXQ7XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldDtcbiAgYXJyLnNldCA9IEJQLnNldDtcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZTtcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmc7XG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9KU09OID0gQlAudG9KU09OO1xuICBhcnIuY29weSA9IEJQLmNvcHk7XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlO1xuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4O1xuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFO1xuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFO1xuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFO1xuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFO1xuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50ODtcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEU7XG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFO1xuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRTtcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkU7XG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFO1xuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRTtcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRTtcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRTtcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4O1xuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEU7XG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRTtcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFO1xuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkU7XG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDg7XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEU7XG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkU7XG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEU7XG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkU7XG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEU7XG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkU7XG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRTtcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFO1xuICBhcnIuZmlsbCA9IEJQLmZpbGw7XG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdDtcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyO1xuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICBpbmRleCA9IH5+aW5kZXg7IC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICBpbmRleCArPSBsZW47XG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXg7XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBjb2VyY2UobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aCk7XG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheShzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH0pKHN1YmplY3QpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8IHN1YmplY3QgJiYgKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIHRvSGV4KG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpO1xuICByZXR1cm4gbi50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYiA8PSAweDdGKSBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSk7ZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpO1xuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKys7XG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkgKyAxKSkuc3Vic3RyKDEpLnNwbGl0KCclJyk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKTtcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGMsIGhpLCBsbztcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoaSA9IGMgPj4gODtcbiAgICBsbyA9IGMgJSAyNTY7XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pO1xuICAgIGJ5dGVBcnJheS5wdXNoKGhpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKTtcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlcihzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGggfHwgaSA+PSBzcmMubGVuZ3RoKSBicmVhaztcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV07XG4gIH1cbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTsgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG59XG5cbmZ1bmN0aW9uIGFzc2VydCh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbUpoYzJVMk5DSXNJbkpsY1hWcGNtVWlMQ0pwWldWbE56VTBJaXdpWlhod2IzSjBjeUlzSWtKMVptWmxjaUlzSWxOc2IzZENkV1ptWlhJaUxDSkpUbE5RUlVOVVgwMUJXRjlDV1ZSRlV5SXNJbkJ2YjJ4VGFYcGxJaXdpWDNWelpWUjVjR1ZrUVhKeVlYbHpJaXdpWW5WbUlpd2lRWEp5WVhsQ2RXWm1aWElpTENKaGNuSWlMQ0pWYVc1ME9FRnljbUY1SWl3aVptOXZJaXdpYzNWaVlYSnlZWGtpTENKbElpd2ljM1ZpYW1WamRDSXNJbVZ1WTI5a2FXNW5JaXdpYm05YVpYSnZJaXdpZEhsd1pTSXNJbk4wY21sdVozUnlhVzBpTENKc1pXNW5kR2dpTENKamIyVnlZMlVpTENKaWVYUmxUR1Z1WjNSb0lpd2lSWEp5YjNJaUxDSmZZWFZuYldWdWRDSXNJbDlwYzBKMVptWmxjaUlzSW1raUxDSmZjMlYwSWl3aWFYTkJjbkpoZVdsemFDSXNJbWx6UW5WbVptVnlJaXdpY21WaFpGVkpiblE0SWl3aWQzSnBkR1VpTENKcGMwVnVZMjlrYVc1bklpd2lVM1J5YVc1bklpd2lkRzlNYjNkbGNrTmhjMlVpTENKaUlpd2lkVzVrWldacGJtVmtJaXdpYzNSeUlpd2ljbVYwSWl3aWRYUm1PRlJ2UW5sMFpYTWlMQ0ppWVhObE5qUlViMEo1ZEdWeklpd2lZMjl1WTJGMElpd2liR2x6ZENJc0luUnZkR0ZzVEdWdVozUm9JaXdpWVhOelpYSjBJaXdpYVhOQmNuSmhlU0lzSW5CdmN5SXNJbWwwWlcwaUxDSmpiM0I1SWl3aVgyaGxlRmR5YVhSbElpd2ljM1J5YVc1bklpd2liMlptYzJWMElpd2lUblZ0WW1WeUlpd2ljbVZ0WVdsdWFXNW5JaXdpYzNSeVRHVnVJaXdpWW5sMFpTSXNJbkJoY25ObFNXNTBJaXdpYzNWaWMzUnlJaXdpYVhOT1lVNGlMQ0pmWTJoaGNuTlhjbWwwZEdWdUlpd2lYM1YwWmpoWGNtbDBaU0lzSW1Ob1lYSnpWM0pwZEhSbGJpSXNJbUpzYVhSQ2RXWm1aWElpTENKZllYTmphV2xYY21sMFpTSXNJbUZ6WTJscFZHOUNlWFJsY3lJc0lsOWlhVzVoY25sWGNtbDBaU0lzSWw5aVlYTmxOalJYY21sMFpTSXNJbDkxZEdZeE5teGxWM0pwZEdVaUxDSjFkR1l4Tm14bFZHOUNlWFJsY3lJc0luQnliM1J2ZEhsd1pTSXNJbWx6Um1sdWFYUmxJaXdpYzNkaGNDSXNJblJ2VTNSeWFXNW5JaXdpYzNSaGNuUWlMQ0psYm1RaUxDSnpaV3htSWl3aVgyaGxlRk5zYVdObElpd2lYM1YwWmpoVGJHbGpaU0lzSWw5aGMyTnBhVk5zYVdObElpd2lYMkpwYm1GeWVWTnNhV05sSWl3aVgySmhjMlUyTkZOc2FXTmxJaXdpWDNWMFpqRTJiR1ZUYkdsalpTSXNJblJ2U2xOUFRpSXNJbVJoZEdFaUxDSkJjbkpoZVNJc0luTnNhV05sSWl3aVkyRnNiQ0lzSWw5aGNuSWlMQ0owWVhKblpYUWlMQ0owWVhKblpYUmZjM1JoY25RaUxDSnpiM1Z5WTJVaUxDSnNaVzRpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpY21Weklpd2lkRzF3SWl3aVRXRjBhQ0lzSW0xcGJpSXNJbVJsWTI5a1pWVjBaamhEYUdGeUlpd2labkp2YlVOb1lYSkRiMlJsSWl3aWIzVjBJaXdpZEc5SVpYZ2lMQ0ppZVhSbGN5SXNJbU5zWVcxd0lpd2ljMnhwWTJWTVpXNGlMQ0p1WlhkQ2RXWWlMQ0puWlhRaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWMyVjBJaXdpZGlJc0luZHlhWFJsVlVsdWREZ2lMQ0p1YjBGemMyVnlkQ0lzSWw5eVpXRmtWVWx1ZERFMklpd2liR2wwZEd4bFJXNWthV0Z1SWl3aWRtRnNJaXdpY21WaFpGVkpiblF4Tmt4Rklpd2ljbVZoWkZWSmJuUXhOa0pGSWl3aVgzSmxZV1JWU1c1ME16SWlMQ0p5WldGa1ZVbHVkRE15VEVVaUxDSnlaV0ZrVlVsdWRETXlRa1VpTENKeVpXRmtTVzUwT0NJc0ltNWxaeUlzSWw5eVpXRmtTVzUwTVRZaUxDSnlaV0ZrU1c1ME1UWk1SU0lzSW5KbFlXUkpiblF4TmtKRklpd2lYM0psWVdSSmJuUXpNaUlzSW5KbFlXUkpiblF6TWt4Rklpd2ljbVZoWkVsdWRETXlRa1VpTENKZmNtVmhaRVpzYjJGMElpd2ljbVZoWkNJc0luSmxZV1JHYkc5aGRFeEZJaXdpY21WaFpFWnNiMkYwUWtVaUxDSmZjbVZoWkVSdmRXSnNaU0lzSW5KbFlXUkViM1ZpYkdWTVJTSXNJbkpsWVdSRWIzVmliR1ZDUlNJc0luWmhiSFZsSWl3aWRtVnlhV1oxYVc1MElpd2lYM2R5YVhSbFZVbHVkREUySWl3aWFpSXNJbmR5YVhSbFZVbHVkREUyVEVVaUxDSjNjbWwwWlZWSmJuUXhOa0pGSWl3aVgzZHlhWFJsVlVsdWRETXlJaXdpZDNKcGRHVlZTVzUwTXpKTVJTSXNJbmR5YVhSbFZVbHVkRE15UWtVaUxDSjNjbWwwWlVsdWREZ2lMQ0oyWlhKcFpuTnBiblFpTENKZmQzSnBkR1ZKYm5ReE5pSXNJbmR5YVhSbFNXNTBNVFpNUlNJc0luZHlhWFJsU1c1ME1UWkNSU0lzSWw5M2NtbDBaVWx1ZERNeUlpd2lkM0pwZEdWSmJuUXpNa3hGSWl3aWQzSnBkR1ZKYm5Rek1rSkZJaXdpWDNkeWFYUmxSbXh2WVhRaUxDSjJaWEpwWmtsRlJVVTNOVFFpTENKM2NtbDBaVVpzYjJGMFRFVWlMQ0ozY21sMFpVWnNiMkYwUWtVaUxDSmZkM0pwZEdWRWIzVmliR1VpTENKM2NtbDBaVVJ2ZFdKc1pVeEZJaXdpZDNKcGRHVkViM1ZpYkdWQ1JTSXNJbVpwYkd3aUxDSmphR0Z5UTI5a1pVRjBJaXdpYVc1emNHVmpkQ0lzSW1wdmFXNGlMQ0owYjBGeWNtRjVRblZtWm1WeUlpd2lZblZtWm1WeUlpd2lkSEpwYlNJc0luSmxjR3hoWTJVaUxDSkNVQ0lzSWw5blpYUWlMQ0owYjB4dlkyRnNaVk4wY21sdVp5SXNJbWx1WkdWNElpd2laR1ZtWVhWc2RGWmhiSFZsSWl3aVkyVnBiQ0lzSWs5aWFtVmpkQ0lzSW00aUxDSmllWFJsUVhKeVlYa2lMQ0p3ZFhOb0lpd2lhQ0lzSW1WdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0luTndiR2wwSWl3aVl5SXNJbWhwSWl3aWJHOGlMQ0owYjBKNWRHVkJjbkpoZVNJc0luTnlZeUlzSW1SemRDSXNJbVJsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ0lzSW1WeWNpSXNJbTFoZUNJc0ltWnNiMjl5SWl3aWRHVnpkQ0lzSW0xbGMzTmhaMlVpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3UVVGQlFUczdPenM3T3p0QlFVOUJMRWxCUVVsQkxGTkJRVk5ETEZGQlFWRXNWMEZCVWl4RFFVRmlPMEZCUTBFc1NVRkJTVU1zVlVGQlZVUXNVVUZCVVN4VFFVRlNMRU5CUVdRN08wRkJSVUZGTEZGQlFWRkRMRTFCUVZJc1IwRkJhVUpCTEUxQlFXcENPMEZCUTBGRUxGRkJRVkZGTEZWQlFWSXNSMEZCY1VKRUxFMUJRWEpDTzBGQlEwRkVMRkZCUVZGSExHbENRVUZTTEVkQlFUUkNMRVZCUVRWQ08wRkJRMEZHTEU5QlFVOUhMRkZCUVZBc1IwRkJhMElzU1VGQmJFSTdPMEZCUlVFN096czdPMEZCUzBGSUxFOUJRVTlKTEdWQlFWQXNSMEZCTUVJc1dVRkJXVHRCUVVOd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTVHRCUVVOR0xGRkJRVWxETEUxQlFVMHNTVUZCU1VNc1YwRkJTaXhEUVVGblFpeERRVUZvUWl4RFFVRldPMEZCUTBFc1VVRkJTVU1zVFVGQlRTeEpRVUZKUXl4VlFVRktMRU5CUVdWSUxFZEJRV1lzUTBGQlZqdEJRVU5CUlN4UlFVRkpSU3hIUVVGS0xFZEJRVlVzV1VGQldUdEJRVUZGTEdGQlFVOHNSVUZCVUR0QlFVRlhMRXRCUVc1RE8wRkJRMEVzVjBGQlR5eFBRVUZQUml4SlFVRkpSU3hIUVVGS0xFVkJRVkFzU1VGRFNDeFBRVUZQUml4SlFVRkpSeXhSUVVGWUxFdEJRWGRDTEZWQlJEVkNMRU5CU2tVc1EwRkxjVU03UVVGRGVFTXNSMEZPUkN4RFFVMUZMRTlCUVU5RExFTkJRVkFzUlVGQlZUdEJRVU5XTEZkQlFVOHNTMEZCVUR0QlFVTkVPMEZCUTBZc1EwRm1kMElzUlVGQmVrSTdPMEZCYVVKQk96czdPenM3T3pzN096czdRVUZaUVN4VFFVRlRXQ3hOUVVGVUxFTkJRV2xDV1N4UFFVRnFRaXhGUVVFd1FrTXNVVUZCTVVJc1JVRkJiME5ETEUxQlFYQkRMRVZCUVRSRE8wRkJRekZETEUxQlFVa3NSVUZCUlN4blFrRkJaMEprTEUxQlFXeENMRU5CUVVvc1JVRkRSU3hQUVVGUExFbEJRVWxCTEUxQlFVb3NRMEZCVjFrc1QwRkJXQ3hGUVVGdlFrTXNVVUZCY0VJc1JVRkJPRUpETEUxQlFUbENMRU5CUVZBN08wRkJSVVlzVFVGQlNVTXNZMEZCWTBnc1QwRkJaQ3g1UTBGQlkwRXNUMEZCWkN4RFFVRktPenRCUVVWQk8wRkJRMEU3UVVGRFFTeE5RVUZKUXl4aFFVRmhMRkZCUVdJc1NVRkJlVUpGTEZOQlFWTXNVVUZCZEVNc1JVRkJaMFE3UVVGRE9VTklMR05CUVZWSkxGZEJRVmRLTEU5QlFWZ3NRMEZCVmp0QlFVTkJMRmRCUVU5QkxGRkJRVkZMTEUxQlFWSXNSMEZCYVVJc1EwRkJha0lzUzBGQmRVSXNRMEZCT1VJc1JVRkJhVU03UVVGREwwSk1MR2RDUVVGVlFTeFZRVUZWTEVkQlFYQkNPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbExMRTFCUVVvN1FVRkRRU3hOUVVGSlJpeFRRVUZUTEZGQlFXSXNSVUZEUlVVc1UwRkJVME1zVDBGQlQwNHNUMEZCVUN4RFFVRlVMRU5CUkVZc1MwRkZTeXhKUVVGSlJ5eFRRVUZUTEZGQlFXSXNSVUZEU0VVc1UwRkJVMnBDTEU5QlFVOXRRaXhWUVVGUUxFTkJRV3RDVUN4UFFVRnNRaXhGUVVFeVFrTXNVVUZCTTBJc1EwRkJWQ3hEUVVSSExFdEJSVUVzU1VGQlNVVXNVMEZCVXl4UlFVRmlMRVZCUTBoRkxGTkJRVk5ETEU5QlFVOU9MRkZCUVZGTExFMUJRV1lzUTBGQlZDeERRVVJITEVOQlF6WkNPMEZCUkRkQ0xFOUJSMGdzVFVGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2RVUkJRVllzUTBGQlRqczdRVUZGUml4TlFVRkpaaXhIUVVGS08wRkJRMEVzVFVGQlNVd3NUMEZCVDBrc1pVRkJXQ3hGUVVFMFFqdEJRVU14UWp0QlFVTkJReXhWUVVGTlRDeFBRVUZQY1VJc1VVRkJVQ3hEUVVGblFpeEpRVUZKWWl4VlFVRktMRU5CUVdWVExFMUJRV1lzUTBGQmFFSXNRMEZCVGp0QlFVTkVMRWRCU0VRc1RVRkhUenRCUVVOTU8wRkJRMEZhTEZWQlFVMHNTVUZCVGp0QlFVTkJRU3hSUVVGSldTeE5RVUZLTEVkQlFXRkJMRTFCUVdJN1FVRkRRVm9zVVVGQlNXbENMRk5CUVVvc1IwRkJaMElzU1VGQmFFSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSlF5eERRVUZLTzBGQlEwRXNUVUZCU1haQ0xFOUJRVTlKTEdWQlFWQXNTVUZCTUVJc1QwRkJUMUVzVVVGQlVVOHNWVUZCWml4TFFVRTRRaXhSUVVFMVJDeEZRVUZ6UlR0QlFVTndSVHRCUVVOQlpDeFJRVUZKYlVJc1NVRkJTaXhEUVVGVFdpeFBRVUZVTzBGQlEwUXNSMEZJUkN4TlFVZFBMRWxCUVVsaExGZEJRVmRpTEU5QlFWZ3NRMEZCU2l4RlFVRjVRanRCUVVNNVFqdEJRVU5CTEZOQlFVdFhMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSXNWVUZCU1haQ0xFOUJRVTh3UWl4UlFVRlFMRU5CUVdkQ1pDeFBRVUZvUWl4RFFVRktMRVZCUTBWUUxFbEJRVWxyUWl4RFFVRktMRWxCUVZOWUxGRkJRVkZsTEZOQlFWSXNRMEZCYTBKS0xFTkJRV3hDTEVOQlFWUXNRMEZFUml4TFFVZEZiRUlzU1VGQlNXdENMRU5CUVVvc1NVRkJVMWdzVVVGQlVWY3NRMEZCVWl4RFFVRlVPMEZCUTBnN1FVRkRSaXhIUVZKTkxFMUJVVUVzU1VGQlNWSXNVMEZCVXl4UlFVRmlMRVZCUVhWQ08wRkJRelZDVml4UlFVRkpkVUlzUzBGQlNpeERRVUZWYUVJc1QwRkJWaXhGUVVGdFFpeERRVUZ1UWl4RlFVRnpRa01zVVVGQmRFSTdRVUZEUkN4SFFVWk5MRTFCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZVTEVsQlFYRkNMRU5CUVVObUxFOUJRVTlKTEdWQlFUZENMRWxCUVdkRUxFTkJRVU5WTEUxQlFYSkVMRVZCUVRaRU8wRkJRMnhGTEZOQlFVdFRMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSnNRaXhWUVVGSmEwSXNRMEZCU2l4SlFVRlRMRU5CUVZRN1FVRkRSRHRCUVVOR096dEJRVVZFTEZOQlFVOXNRaXhIUVVGUU8wRkJRMFE3TzBGQlJVUTdRVUZEUVRzN1FVRkZRVXdzVDBGQlR6WkNMRlZCUVZBc1IwRkJiMElzVlVGQlZXaENMRkZCUVZZc1JVRkJiMEk3UVVGRGRFTXNWVUZCVVdsQ0xFOUJRVTlxUWl4UlFVRlFMRVZCUVdsQ2EwSXNWMEZCYWtJc1JVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVTBGQlREdEJRVU5CTEZOQlFVc3NWVUZCVER0QlFVTkZMR0ZCUVU4c1NVRkJVRHRCUVVOR08wRkJRMFVzWVVGQlR5eExRVUZRTzBGQlpFbzdRVUZuUWtRc1EwRnFRa1E3TzBGQmJVSkJMMElzVDBGQlR6QkNMRkZCUVZBc1IwRkJhMElzVlVGQlZVMHNRMEZCVml4RlFVRmhPMEZCUXpkQ0xGTkJRVThzUTBGQlF5eEZRVUZGUVN4TlFVRk5MRWxCUVU0c1NVRkJZMEVzVFVGQlRVTXNVMEZCY0VJc1NVRkJhVU5FTEVWQlFVVldMRk5CUVhKRExFTkJRVkk3UVVGRFJDeERRVVpFT3p0QlFVbEJkRUlzVDBGQlQyMUNMRlZCUVZBc1IwRkJiMElzVlVGQlZXVXNSMEZCVml4RlFVRmxja0lzVVVGQlppeEZRVUY1UWp0QlFVTXpReXhOUVVGSmMwSXNSMEZCU2p0QlFVTkJSQ3hSUVVGTlFTeE5RVUZOTEVWQlFWbzdRVUZEUVN4VlFVRlJja0lzV1VGQldTeE5RVUZ3UWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFVb3NSMEZCWVN4RFFVRnVRanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOUXl4WlFVRlpSaXhIUVVGYUxFVkJRV2xDYWtJc1RVRkJka0k3UVVGRFFUdEJRVU5HTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5GYTBJc1dVRkJUVVFzU1VGQlNXcENMRTFCUVZZN1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVVVzWTBGQlkwZ3NSMEZCWkN4RlFVRnRRbXBDTEUxQlFYcENPMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUVN4VFFVRkxMRk5CUVV3N1FVRkRRU3hUUVVGTExGVkJRVXc3UVVGRFJXdENMRmxCUVUxRUxFbEJRVWxxUWl4TlFVRktMRWRCUVdFc1EwRkJia0k3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpSeXhMUVVGS0xFTkJRVlVzYTBKQlFWWXNRMEZCVGp0QlFYWkNTanRCUVhsQ1FTeFRRVUZQWlN4SFFVRlFPMEZCUTBRc1EwRTNRa1E3TzBGQkswSkJia01zVDBGQlQzTkRMRTFCUVZBc1IwRkJaMElzVlVGQlZVTXNTVUZCVml4RlFVRm5Ra01zVjBGQmFFSXNSVUZCTmtJN1FVRkRNME5ETEZOQlFVOURMRkZCUVZGSUxFbEJRVklzUTBGQlVDeEZRVUZ6UWl4blJFRkRiRUlzTUVKQlJFbzdPMEZCUjBFc1RVRkJTVUVzUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkRja0lzVjBGQlR5eEpRVUZKYWtJc1RVRkJTaXhEUVVGWExFTkJRVmdzUTBGQlVEdEJRVU5FTEVkQlJrUXNUVUZGVHl4SlFVRkpkVU1zUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkROVUlzVjBGQlQzTkNMRXRCUVVzc1EwRkJUQ3hEUVVGUU8wRkJRMFE3TzBGQlJVUXNUVUZCU1doQ0xFTkJRVW83UVVGRFFTeE5RVUZKTEU5QlFVOXBRaXhYUVVGUUxFdEJRWFZDTEZGQlFUTkNMRVZCUVhGRE8wRkJRMjVEUVN4clFrRkJZeXhEUVVGa08wRkJRMEVzVTBGQlMycENMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKWjBJc1MwRkJTM1JDTEUxQlFYSkNMRVZCUVRaQ1RTeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EybENMSEZDUVVGbFJDeExRVUZMYUVJc1EwRkJUQ3hGUVVGUlRpeE5RVUYyUWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVFVGQlNWb3NUVUZCVFN4SlFVRkpUQ3hOUVVGS0xFTkJRVmQzUXl4WFFVRllMRU5CUVZZN1FVRkRRU3hOUVVGSlJ5eE5RVUZOTEVOQlFWWTdRVUZEUVN4UFFVRkxjRUlzU1VGQlNTeERRVUZVTEVWQlFWbEJMRWxCUVVsblFpeExRVUZMZEVJc1RVRkJja0lzUlVGQk5rSk5MRWRCUVRkQ0xFVkJRV3RETzBGQlEyaERMRkZCUVVseFFpeFBRVUZQVEN4TFFVRkxhRUlzUTBGQlRDeERRVUZZTzBGQlEwRnhRaXhUUVVGTFF5eEpRVUZNTEVOQlFWVjRReXhIUVVGV0xFVkJRV1Z6UXl4SFFVRm1PMEZCUTBGQkxGZEJRVTlETEV0QlFVc3pRaXhOUVVGYU8wRkJRMFE3UVVGRFJDeFRRVUZQV2l4SFFVRlFPMEZCUTBRc1EwRXhRa1E3TzBGQk5FSkJPMEZCUTBFN08wRkJSVUVzVTBGQlUzbERMRk5CUVZRc1EwRkJiMEo2UXl4SFFVRndRaXhGUVVGNVFqQkRMRTFCUVhwQ0xFVkJRV2xEUXl4TlFVRnFReXhGUVVGNVF5OUNMRTFCUVhwRExFVkJRV2xFTzBGQlF5OURLMElzVjBGQlUwTXNUMEZCVDBRc1RVRkJVQ3hMUVVGclFpeERRVUV6UWp0QlFVTkJMRTFCUVVsRkxGbEJRVmszUXl4SlFVRkpXU3hOUVVGS0xFZEJRV0VyUWl4TlFVRTNRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqczdRVUZGUkR0QlFVTkJMRTFCUVVsRExGTkJRVk5LTEU5QlFVODVRaXhOUVVGd1FqdEJRVU5CZDBJc1UwRkJUMVVzVTBGQlV5eERRVUZVTEV0QlFXVXNRMEZCZEVJc1JVRkJlVUlzYjBKQlFYcENPenRCUVVWQkxFMUJRVWxzUXl4VFFVRlRhME1zVTBGQlV5eERRVUYwUWl4RlFVRjVRanRCUVVOMlFteERMR0ZCUVZOclF5eFRRVUZUTEVOQlFXeENPMEZCUTBRN1FVRkRSQ3hQUVVGTExFbEJRVWsxUWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbE9MRTFCUVhCQ0xFVkJRVFJDVFN4SFFVRTFRaXhGUVVGcFF6dEJRVU12UWl4UlFVRkpOa0lzVDBGQlQwTXNVMEZCVTA0c1QwRkJUMDhzVFVGQlVDeERRVUZqTDBJc1NVRkJTU3hEUVVGc1FpeEZRVUZ4UWl4RFFVRnlRaXhEUVVGVUxFVkJRV3RETEVWQlFXeERMRU5CUVZnN1FVRkRRV3RDTEZkQlFVOHNRMEZCUTJNc1RVRkJUVWdzU1VGQlRpeERRVUZTTEVWQlFYRkNMRzlDUVVGeVFqdEJRVU5CTDBNc1VVRkJTVEpETEZOQlFWTjZRaXhEUVVGaUxFbEJRV3RDTmtJc1NVRkJiRUk3UVVGRFJEdEJRVU5FY0VRc1UwRkJUM2RFTEdGQlFWQXNSMEZCZFVKcVF5eEpRVUZKTEVOQlFUTkNPMEZCUTBFc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOclF5eFZRVUZVTEVOQlFYRkNjRVFzUjBGQmNrSXNSVUZCTUVJd1F5eE5RVUV4UWl4RlFVRnJRME1zVFVGQmJFTXNSVUZCTUVNdlFpeE5RVUV4UXl4RlFVRnJSRHRCUVVOb1JDeE5RVUZKZVVNc1pVRkJaVEZFTEU5QlFVOTNSQ3hoUVVGUUxFZEJRMnBDUnl4WFFVRlhka0lzV1VGQldWY3NUVUZCV2l4RFFVRllMRVZCUVdkRE1VTXNSMEZCYUVNc1JVRkJjVU15UXl4TlFVRnlReXhGUVVFMlF5OUNMRTFCUVRkRExFTkJSRVk3UVVGRlFTeFRRVUZQZVVNc1dVRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTkZMRmRCUVZRc1EwRkJjMEoyUkN4SFFVRjBRaXhGUVVFeVFqQkRMRTFCUVROQ0xFVkJRVzFEUXl4TlFVRnVReXhGUVVFeVF5OUNMRTFCUVRORExFVkJRVzFFTzBGQlEycEVMRTFCUVVsNVF5eGxRVUZsTVVRc1QwRkJUM2RFTEdGQlFWQXNSMEZEYWtKSExGZEJRVmRGTEdGQlFXRmtMRTFCUVdJc1EwRkJXQ3hGUVVGcFF6RkRMRWRCUVdwRExFVkJRWE5ETWtNc1RVRkJkRU1zUlVGQk9FTXZRaXhOUVVFNVF5eERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRTU3haUVVGVUxFTkJRWFZDZWtRc1IwRkJka0lzUlVGQk5FSXdReXhOUVVFMVFpeEZRVUZ2UTBNc1RVRkJjRU1zUlVGQk5FTXZRaXhOUVVFMVF5eEZRVUZ2UkR0QlFVTnNSQ3hUUVVGUE1rTXNXVUZCV1haRUxFZEJRVm9zUlVGQmFVSXdReXhOUVVGcVFpeEZRVUY1UWtNc1RVRkJla0lzUlVGQmFVTXZRaXhOUVVGcVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVemhETEZsQlFWUXNRMEZCZFVJeFJDeEhRVUYyUWl4RlFVRTBRakJETEUxQlFUVkNMRVZCUVc5RFF5eE5RVUZ3UXl4RlFVRTBReTlDTEUxQlFUVkRMRVZCUVc5RU8wRkJRMnhFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkMFFpeGpRVUZqVlN4TlFVRmtMRU5CUVZnc1JVRkJhME14UXl4SFFVRnNReXhGUVVGMVF6SkRMRTFCUVhaRExFVkJRU3RETDBJc1RVRkJMME1zUTBGRVJqdEJRVVZCTEZOQlFVOTVReXhaUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTAwc1lVRkJWQ3hEUVVGM1FqTkVMRWRCUVhoQ0xFVkJRVFpDTUVNc1RVRkJOMElzUlVGQmNVTkRMRTFCUVhKRExFVkJRVFpETDBJc1RVRkJOME1zUlVGQmNVUTdRVUZEYmtRc1RVRkJTWGxETEdWQlFXVXhSQ3hQUVVGUGQwUXNZVUZCVUN4SFFVTnFRa2NzVjBGQlYwMHNaVUZCWld4Q0xFMUJRV1lzUTBGQldDeEZRVUZ0UXpGRExFZEJRVzVETEVWQlFYZERNa01zVFVGQmVFTXNSVUZCWjBRdlFpeE5RVUZvUkN4RFFVUkdPMEZCUlVFc1UwRkJUM2xETEZsQlFWQTdRVUZEUkRzN1FVRkZSREZFTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZEVNc1MwRkJha0lzUjBGQmVVSXNWVUZCVlcxQ0xFMUJRVllzUlVGQmEwSkRMRTFCUVd4Q0xFVkJRVEJDTDBJc1RVRkJNVUlzUlVGQmEwTktMRkZCUVd4RExFVkJRVFJETzBGQlEyNUZPMEZCUTBFN1FVRkRRU3hOUVVGSmMwUXNVMEZCVTI1Q0xFMUJRVlFzUTBGQlNpeEZRVUZ6UWp0QlFVTndRaXhSUVVGSkxFTkJRVU50UWl4VFFVRlRiRVFzVFVGQlZDeERRVUZNTEVWQlFYVkNPMEZCUTNKQ1NpeHBRa0ZCVjBrc1RVRkJXRHRCUVVOQlFTeGxRVUZUWjBJc1UwRkJWRHRCUVVORU8wRkJRMFlzUjBGTVJDeE5RVXRQTzBGQlFVYzdRVUZEVWl4UlFVRkpiVU1zVDBGQlQzWkVMRkZCUVZnN1FVRkRRVUVzWlVGQlYyMURMRTFCUVZnN1FVRkRRVUVzWVVGQlV5OUNMRTFCUVZRN1FVRkRRVUVzWVVGQlUyMUVMRWxCUVZRN1FVRkRSRHM3UVVGRlJIQkNMRmRCUVZORExFOUJRVTlFTEUxQlFWQXNTMEZCYTBJc1EwRkJNMEk3UVVGRFFTeE5RVUZKUlN4WlFVRlpMRXRCUVV0cVF5eE5RVUZNTEVkQlFXTXJRaXhOUVVFNVFqdEJRVU5CTEUxQlFVa3NRMEZCUXk5Q0xFMUJRVXdzUlVGQllUdEJRVU5ZUVN4aFFVRlRhVU1zVTBGQlZEdEJRVU5FTEVkQlJrUXNUVUZGVHp0QlFVTk1ha01zWVVGQlUyZERMRTlCUVU5b1F5eE5RVUZRTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hUUVVGVGFVTXNVMEZCWWl4RlFVRjNRanRCUVVOMFFtcERMR1ZCUVZOcFF5eFRRVUZVTzBGQlEwUTdRVUZEUmp0QlFVTkVja01zWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHM3UVVGRlFTeE5RVUZKU1N4SFFVRktPMEZCUTBFc1ZVRkJVWFJDTEZGQlFWSTdRVUZEUlN4VFFVRkxMRXRCUVV3N1FVRkRSWE5DTEZsQlFVMVhMRlZCUVZVc1NVRkJWaXhGUVVGblFrTXNUVUZCYUVJc1JVRkJkMEpETEUxQlFYaENMRVZCUVdkREwwSXNUVUZCYUVNc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOYzBJc1YwRkJWeXhKUVVGWUxFVkJRV2xDVml4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGT08wRkJRMEU3UVVGRFJpeFRRVUZMTEU5QlFVdzdRVUZEUld0Q0xGbEJRVTE1UWl4WlFVRlpMRWxCUVZvc1JVRkJhMEppTEUxQlFXeENMRVZCUVRCQ1F5eE5RVUV4UWl4RlFVRnJReTlDTEUxQlFXeERMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVEpDTEdGQlFXRXNTVUZCWWl4RlFVRnRRbVlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhSUVVGTU8wRkJRMFZyUWl4WlFVRk5ORUlzWVVGQllTeEpRVUZpTEVWQlFXMUNhRUlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZyUWl4WlFVRk5Oa0lzWTBGQll5eEpRVUZrTEVWQlFXOUNha0lzVFVGQmNFSXNSVUZCTkVKRExFMUJRVFZDTEVWQlFXOURMMElzVFVGQmNFTXNRMEZCVGp0QlFVTkJPMEZCUTBZN1FVRkRSU3haUVVGTkxFbEJRVWxITEV0QlFVb3NRMEZCVlN4clFrRkJWaXhEUVVGT08wRkJlRUpLTzBGQk1FSkJMRk5CUVU5bExFZEJRVkE3UVVGRFJDeERRWFpFUkRzN1FVRjVSRUZ1UXl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWtjc1VVRkJha0lzUjBGQk5FSXNWVUZCVlhoRUxGRkJRVllzUlVGQmIwSjVSQ3hMUVVGd1FpeEZRVUV5UWtNc1IwRkJNMElzUlVGQlowTTdRVUZETVVRc1RVRkJTVU1zVDBGQlR5eEpRVUZZT3p0QlFVVkJNMFFzWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHRCUVVOQmRVTXNWVUZCVVhKQ0xFOUJRVTl4UWl4TFFVRlFMRXRCUVdsQ0xFTkJRWHBDTzBGQlEwRkRMRkZCUVU5QkxGRkJRVkYwUXl4VFFVRlVMRWRCUTBablFpeFBRVUZQYzBJc1IwRkJVQ3hEUVVSRkxFZEJSVVpCTEUxQlFVMURMRXRCUVV0MlJDeE5RVVptT3p0QlFVbEJPMEZCUTBFc1RVRkJTWE5FTEZGQlFWRkVMRXRCUVZvc1JVRkRSU3hQUVVGUExFVkJRVkE3TzBGQlJVWXNUVUZCU1c1RExFZEJRVW83UVVGRFFTeFZRVUZSZEVJc1VVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5GYzBJc1dVRkJUWE5ETEZWQlFWVkVMRWxCUVZZc1JVRkJaMEpHTEV0QlFXaENMRVZCUVhWQ1F5eEhRVUYyUWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUlhCRExGbEJRVTExUXl4WFFVRlhSaXhKUVVGWUxFVkJRV2xDUml4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eFBRVUZNTzBGQlEwVndReXhaUVVGTmQwTXNXVUZCV1Vnc1NVRkJXaXhGUVVGclFrWXNTMEZCYkVJc1JVRkJlVUpETEVkQlFYcENMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GY0VNc1dVRkJUWGxETEdGQlFXRktMRWxCUVdJc1JVRkJiVUpHTEV0QlFXNUNMRVZCUVRCQ1F5eEhRVUV4UWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExGRkJRVXc3UVVGRFJYQkRMRmxCUVUwd1F5eGhRVUZoVEN4SlFVRmlMRVZCUVcxQ1JpeExRVUZ1UWl4RlFVRXdRa01zUjBGQk1VSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZ3UXl4WlFVRk5Na01zWTBGQlkwNHNTVUZCWkN4RlFVRnZRa1lzUzBGQmNFSXNSVUZCTWtKRExFZEJRVE5DTEVOQlFVNDdRVUZEUVR0QlFVTkdPMEZCUTBVc1dVRkJUU3hKUVVGSmJrUXNTMEZCU2l4RFFVRlZMR3RDUVVGV0xFTkJRVTQ3UVVGNFFrbzdRVUV3UWtFc1UwRkJUMlVzUjBGQlVEdEJRVU5FTEVOQmVrTkVPenRCUVRKRFFXNURMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENZU3hOUVVGcVFpeEhRVUV3UWl4WlFVRlpPMEZCUTNCRExGTkJRVTg3UVVGRFRHaEZMRlZCUVUwc1VVRkVSRHRCUVVWTWFVVXNWVUZCVFVNc1RVRkJUV1lzVTBGQlRpeERRVUZuUW1kQ0xFdEJRV2hDTEVOQlFYTkNReXhKUVVGMFFpeERRVUV5UWl4TFFVRkxReXhKUVVGTUxFbEJRV0VzU1VGQmVFTXNSVUZCT0VNc1EwRkJPVU03UVVGR1JDeEhRVUZRTzBGQlNVUXNRMEZNUkRzN1FVRlBRVHRCUVVOQmNFWXNUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnlRaXhKUVVGcVFpeEhRVUYzUWl4VlFVRlZkME1zVFVGQlZpeEZRVUZyUWtNc1dVRkJiRUlzUlVGQlowTm9RaXhMUVVGb1F5eEZRVUYxUTBNc1IwRkJka01zUlVGQk5FTTdRVUZEYkVVc1RVRkJTV2RDTEZOQlFWTXNTVUZCWWpzN1FVRkZRU3hOUVVGSkxFTkJRVU5xUWl4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJSQ3hKUVVGUlFTeFJRVUZSTEVOQlFYQkNMRVZCUVhWQ1FTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU8wRkJRM1pDTEUxQlFVa3NRMEZCUTNGRkxGbEJRVXdzUlVGQmJVSkJMR1ZCUVdVc1EwRkJaanM3UVVGRmJrSTdRVUZEUVN4TlFVRkpaaXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWxsTEU5QlFVOXdSU3hOUVVGUUxFdEJRV3RDTEVOQlFXeENMRWxCUVhWQ2MwVXNUMEZCVDNSRkxFMUJRVkFzUzBGQmEwSXNRMEZCTjBNc1JVRkJaMFE3TzBGQlJXaEVPMEZCUTBGM1FpeFRRVUZQT0VJc1QwRkJUMFFzUzBGQlpDeEZRVUZ4UWl4NVFrRkJja0k3UVVGRFFUZENMRk5CUVU4MlF5eG5Ra0ZCWjBJc1EwRkJhRUlzU1VGQmNVSkJMR1ZCUVdWRUxFOUJRVTl3UlN4TlFVRnNSQ3hGUVVOSkxESkNRVVJLTzBGQlJVRjNRaXhUUVVGUE5rSXNVMEZCVXl4RFFVRlVMRWxCUVdOQkxGRkJRVkZwUWl4UFFVRlBkRVVzVFVGQmNFTXNSVUZCTkVNc01rSkJRVFZETzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVHl4RFFVRlFMRWxCUVZsQkxFOUJRVTluUWl4UFFVRlBkRVVzVFVGQmFrTXNSVUZCZVVNc2VVSkJRWHBET3p0QlFVVkJPMEZCUTBFc1RVRkJTWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRV1lzUlVGRFJYTkVMRTFCUVUwc1MwRkJTM1JFTEUxQlFWZzdRVUZEUml4TlFVRkpiMFVzVDBGQlQzQkZMRTFCUVZBc1IwRkJaMEp4UlN4WlFVRm9RaXhIUVVFclFtWXNUVUZCVFVRc1MwRkJla01zUlVGRFJVTXNUVUZCVFdNc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbWhDTEV0QlFYSkRPenRCUVVWR0xFMUJRVWxyUWl4TlFVRk5ha0lzVFVGQlRVUXNTMEZCYUVJN08wRkJSVUVzVFVGQlNXdENMRTFCUVUwc1IwRkJUaXhKUVVGaExFTkJRVU40Uml4UFFVRlBTU3hsUVVGNlFpeEZRVUV3UXp0QlFVTjRReXhUUVVGTExFbEJRVWx0UWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbHBSU3hIUVVGd1FpeEZRVUY1UW1wRkxFZEJRWHBDTzBGQlEwVTRSQ3hoUVVGUE9VUXNTVUZCU1N0RUxGbEJRVmdzU1VGQk1rSXNTMEZCU3k5RUxFbEJRVWtyUXl4TFFVRlVMRU5CUVROQ08wRkJSRVk3UVVGRlJDeEhRVWhFTEUxQlIwODdRVUZEVEdVc1YwRkJUemRFTEVsQlFWQXNRMEZCV1N4TFFVRkxaQ3hSUVVGTUxFTkJRV00wUkN4TFFVRmtMRVZCUVhGQ1FTeFJRVUZSYTBJc1IwRkJOMElzUTBGQldpeEZRVUVyUTBZc1dVRkJMME03UVVGRFJEdEJRVU5HTEVOQmFFTkVPenRCUVd0RFFTeFRRVUZUVkN4WlFVRlVMRU5CUVhWQ2VFVXNSMEZCZGtJc1JVRkJORUpwUlN4TFFVRTFRaXhGUVVGdFEwTXNSMEZCYmtNc1JVRkJkME03UVVGRGRFTXNUVUZCU1VRc1ZVRkJWU3hEUVVGV0xFbEJRV1ZETEZGQlFWRnNSU3hKUVVGSldTeE5RVUV2UWl4RlFVRjFRenRCUVVOeVF5eFhRVUZQY2tJc1QwRkJUelpHTEdGQlFWQXNRMEZCY1VKd1JpeEhRVUZ5UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hOUVVWUE8wRkJRMHdzVjBGQlQxUXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhKUVVGSk5rVXNTMEZCU2l4RFFVRlZXaXhMUVVGV0xFVkJRV2xDUXl4SFFVRnFRaXhEUVVGeVFpeERRVUZRTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGVFJ5eFZRVUZVTEVOQlFYRkNja1VzUjBGQmNrSXNSVUZCTUVKcFJTeExRVUV4UWl4RlFVRnBRME1zUjBGQmFrTXNSVUZCYzBNN1FVRkRjRU1zVFVGQlNXMUNMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxETEUxQlFVMHNSVUZCVmp0QlFVTkJjRUlzVVVGQlRYRkNMRXRCUVV0RExFZEJRVXdzUTBGQlUzaEdMRWxCUVVsWkxFMUJRV0lzUlVGQmNVSnpSQ3hIUVVGeVFpeERRVUZPT3p0QlFVVkJMRTlCUVVzc1NVRkJTV2hFTEVsQlFVa3JReXhMUVVGaUxFVkJRVzlDTDBNc1NVRkJTV2RFTEVkQlFYaENMRVZCUVRaQ2FFUXNSMEZCTjBJc1JVRkJhME03UVVGRGFFTXNVVUZCU1d4Q0xFbEJRVWxyUWl4RFFVRktMRXRCUVZVc1NVRkJaQ3hGUVVGdlFqdEJRVU5zUW0xRkxHRkJRVTlKTEdWQlFXVklMRWRCUVdZc1NVRkJjMEkzUkN4UFFVRlBhVVVzV1VGQlVDeERRVUZ2UWpGR0xFbEJRVWxyUWl4RFFVRktMRU5CUVhCQ0xFTkJRVGRDTzBGQlEwRnZSU3haUVVGTkxFVkJRVTQ3UVVGRFJDeExRVWhFTEUxQlIwODdRVUZEVEVFc1lVRkJUeXhOUVVGTmRFWXNTVUZCU1d0Q0xFTkJRVW9zUlVGQlR6aERMRkZCUVZBc1EwRkJaMElzUlVGQmFFSXNRMEZCWWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVTBGQlQzRkNMRTFCUVUxSkxHVkJRV1ZJTEVkQlFXWXNRMEZCWWp0QlFVTkVPenRCUVVWRUxGTkJRVk5vUWl4WFFVRlVMRU5CUVhOQ2RFVXNSMEZCZEVJc1JVRkJNa0pwUlN4TFFVRXpRaXhGUVVGclEwTXNSMEZCYkVNc1JVRkJkVU03UVVGRGNrTXNUVUZCU1hCRExFMUJRVTBzUlVGQlZqdEJRVU5CYjBNc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSTdRVUZEUlZrc1YwRkJUMHdzVDBGQlQybEZMRmxCUVZBc1EwRkJiMEl4Uml4SlFVRkphMElzUTBGQlNpeERRVUZ3UWl4RFFVRlFPMEZCUkVZc1IwRkZRU3hQUVVGUFdTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xETEZsQlFWUXNRMEZCZFVKMlJTeEhRVUYyUWl4RlFVRTBRbWxGTEV0QlFUVkNMRVZCUVcxRFF5eEhRVUZ1UXl4RlFVRjNRenRCUVVOMFF5eFRRVUZQU1N4WlFVRlpkRVVzUjBGQldpeEZRVUZwUW1sRkxFdEJRV3BDTEVWQlFYZENReXhIUVVGNFFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMFVzVTBGQlZDeERRVUZ2UW5CRkxFZEJRWEJDTEVWQlFYbENhVVVzUzBGQmVrSXNSVUZCWjBORExFZEJRV2hETEVWQlFYRkRPMEZCUTI1RExFMUJRVWxwUWl4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkRzN1FVRkZRU3hOUVVGSkxFTkJRVU54UkN4TFFVRkVMRWxCUVZWQkxGRkJRVkVzUTBGQmRFSXNSVUZCZVVKQkxGRkJRVkVzUTBGQlVqdEJRVU42UWl4TlFVRkpMRU5CUVVORExFZEJRVVFzU1VGQlVVRXNUVUZCVFN4RFFVRmtMRWxCUVcxQ1FTeE5RVUZOYVVJc1IwRkJOMElzUlVGQmEwTnFRaXhOUVVGTmFVSXNSMEZCVGpzN1FVRkZiRU1zVFVGQlNWRXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmVrVXNTVUZCU1N0RExFdEJRV0lzUlVGQmIwSXZReXhKUVVGSlowUXNSMEZCZUVJc1JVRkJOa0pvUkN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUTNsRkxGZEJRVTlETEUxQlFVMDFSaXhKUVVGSmEwSXNRMEZCU2l4RFFVRk9MRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTk1UlN4SFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUyeENMR0ZCUVZRc1EwRkJkMEo2UlN4SFFVRjRRaXhGUVVFMlFtbEZMRXRCUVRkQ0xFVkJRVzlEUXl4SFFVRndReXhGUVVGNVF6dEJRVU4yUXl4TlFVRkpNa0lzVVVGQlVUZEdMRWxCUVVrMlJTeExRVUZLTEVOQlFWVmFMRXRCUVZZc1JVRkJhVUpETEVkQlFXcENMRU5CUVZvN1FVRkRRU3hOUVVGSmJVSXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmJrVXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKTWtVc1RVRkJUV3BHTEUxQlFURkNMRVZCUVd0RFRTeExRVUZMTEVOQlFYWkRMRVZCUVRCRE8wRkJRM2hEYlVVc1YwRkJUelZFTEU5QlFVOXBSU3haUVVGUUxFTkJRVzlDUnl4TlFVRk5NMFVzUTBGQlRpeEpRVUZYTWtVc1RVRkJUVE5GTEVsQlFVVXNRMEZCVWl4SlFVRmhMRWRCUVRWRExFTkJRVkE3UVVGRFJEdEJRVU5FTEZOQlFVOXRSU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXhSaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbWRDTEV0QlFXcENMRWRCUVhsQ0xGVkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUXpkRExFMUJRVWxwUWl4TlFVRk5MRXRCUVV0MlJTeE5RVUZtTzBGQlEwRnhSQ3hWUVVGUk5rSXNUVUZCVFRkQ0xFdEJRVTRzUlVGQllXdENMRWRCUVdJc1JVRkJhMElzUTBGQmJFSXNRMEZCVWp0QlFVTkJha0lzVVVGQlRUUkNMRTFCUVUwMVFpeEhRVUZPTEVWQlFWZHBRaXhIUVVGWUxFVkJRV2RDUVN4SFFVRm9RaXhEUVVGT096dEJRVVZCTEUxQlFVbDRSaXhQUVVGUFNTeGxRVUZZTEVWQlFUUkNPMEZCUXpGQ0xGZEJRVTlLTEU5QlFVOXhRaXhSUVVGUUxFTkJRV2RDTEV0QlFVdFlMRkZCUVV3c1EwRkJZelJFTEV0QlFXUXNSVUZCY1VKRExFZEJRWEpDTEVOQlFXaENMRU5CUVZBN1FVRkRSQ3hIUVVaRUxFMUJSVTg3UVVGRFRDeFJRVUZKTmtJc1YwRkJWemRDTEUxQlFVMUVMRXRCUVhKQ08wRkJRMEVzVVVGQlNTdENMRk5CUVZNc1NVRkJTWEpITEUxQlFVb3NRMEZCVjI5SExGRkJRVmdzUlVGQmNVSnVSU3hUUVVGeVFpeEZRVUZuUXl4SlFVRm9ReXhEUVVGaU8wRkJRMEVzVTBGQlN5eEpRVUZKVml4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVazJSU3hSUVVGd1FpeEZRVUU0UWpkRkxFZEJRVGxDTEVWQlFXMURPMEZCUTJwRE9FVXNZVUZCVHpsRkxFTkJRVkFzU1VGQldTeExRVUZMUVN4SlFVRkpLME1zUzBGQlZDeERRVUZhTzBGQlEwUTdRVUZEUkN4WFFVRlBLMElzVFVGQlVEdEJRVU5FTzBGQlEwWXNRMEZtUkRzN1FVRnBRa0U3UVVGRFFYSkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENiME1zUjBGQmFrSXNSMEZCZFVJc1ZVRkJWWFJFTEUxQlFWWXNSVUZCYTBJN1FVRkRka04xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVVzM1JTeFRRVUZNTEVOQlFXVnhRaXhOUVVGbUxFTkJRVkE3UVVGRFJDeERRVWhFT3p0QlFVdEJPMEZCUTBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuVkRMRWRCUVdwQ0xFZEJRWFZDTEZWQlFWVkRMRU5CUVZZc1JVRkJZVEZFTEUxQlFXSXNSVUZCY1VJN1FVRkRNVU4xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVV0SExGVkJRVXdzUTBGQlowSkVMRU5CUVdoQ0xFVkJRVzFDTVVRc1RVRkJia0lzUTBGQlVEdEJRVU5FTEVOQlNFUTdPMEZCUzBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuWkRMRk5CUVdwQ0xFZEJRVFpDTEZWQlFWVnhRaXhOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZGtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSEZEUVVFM1FqdEJRVU5FT3p0QlFVVkVMRTFCUVVrclFpeFZRVUZWTEV0QlFVc3ZRaXhOUVVGdVFpeEZRVU5GT3p0QlFVVkdMRk5CUVU4c1MwRkJTeXRDTEUxQlFVd3NRMEZCVUR0QlFVTkVMRU5CVmtRN08wRkJXVUVzVTBGQlV6WkVMRmRCUVZRc1EwRkJjMEo0Unl4SFFVRjBRaXhGUVVFeVFqSkRMRTFCUVROQ0xFVkJRVzFET0VRc1dVRkJia01zUlVGQmFVUkdMRkZCUVdwRUxFVkJRVEpFTzBGQlEzcEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmRVVXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeE5RVUZKZFVJc1IwRkJTanRCUVVOQkxFMUJRVWxFTEZsQlFVb3NSVUZCYTBJN1FVRkRhRUpETEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4RFFVRk9PMEZCUTBFc1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1QwRkJUekZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNRMEZCTVVJN1FVRkRTQ3hIUVVwRUxFMUJTVTg3UVVGRFRDdEVMRlZCUVUweFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFTkJRWEpDTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1EwRkJVRHRCUVVOSU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRU1zV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQUXl4WlFVRlpMRWxCUVZvc1JVRkJhMEkzUkN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJclF5eFpRVUZxUWl4SFFVRm5ReXhWUVVGVmFrVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOURMRmxCUVZrc1NVRkJXaXhGUVVGclFqZEVMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTAwc1YwRkJWQ3hEUVVGelFqZEhMRWRCUVhSQ0xFVkJRVEpDTWtNc1RVRkJNMElzUlVGQmJVTTRSQ3haUVVGdVF5eEZRVUZwUkVZc1VVRkJha1FzUlVGQk1rUTdRVUZEZWtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExIRkRRVUZvUXp0QlFVTkVPenRCUVVWRUxFMUJRVWwxUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkR0QlFVTkJMRTFCUVVrclFpeFZRVUZWZDBNc1IwRkJaQ3hGUVVORk96dEJRVVZHTEUxQlFVbDFRaXhIUVVGS08wRkJRMEVzVFVGQlNVUXNXVUZCU2l4RlFVRnJRanRCUVVOb1FpeFJRVUZKT1VRc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUVUZCVFRGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUlVGQmVrSTdRVUZEUml4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeERRVUV4UWp0QlFVTkdLMFFzVjBGQlR6RkhMRWxCUVVreVF5eE5RVUZLTEVOQlFWQTdRVUZEUVN4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4TlFVRk5RU3hQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RlFVRnVRaXhMUVVFd1FpeERRVUZxUXl4RFFVRk9PMEZCUTBnc1IwRlNSQ3hOUVZGUE8wRkJRMHdzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HTEZGQlFVbEJMRk5CUVZNc1EwRkJWQ3hIUVVGaGQwTXNSMEZCYWtJc1JVRkRSWFZDTEU5QlFVOHhSeXhKUVVGSk1rTXNVMEZCVXl4RFFVRmlMRU5CUVZBN1FVRkRSaXRFTEZWQlFVMUJMRTlCUVU4eFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFVkJRV1lzUzBGQmMwSXNRMEZCTjBJc1EwRkJUanRCUVVORU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhVVFzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWVzVGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQVFN4WlFVRlpMRWxCUVZvc1JVRkJhMEpzUlN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKclJDeFpRVUZxUWl4SFFVRm5ReXhWUVVGVmNFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOU5MRmxCUVZrc1NVRkJXaXhGUVVGclFteEZMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbTFFTEZGQlFXcENMRWRCUVRSQ0xGVkJRVlZ5UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRFUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZEU1N4blFrRkVTanRCUVVWQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh4UTBGQk4wSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSkswSXNWVUZCVlN4TFFVRkxMMElzVFVGQmJrSXNSVUZEUlRzN1FVRkZSaXhOUVVGSmNVY3NUVUZCVFN4TFFVRkxkRVVzVFVGQlRDeEpRVUZsTEVsQlFYcENPMEZCUTBFc1RVRkJTWE5GTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1QwRkJUeXhMUVVGTGRFVXNUVUZCVEN4RFFVRlFMRWRCUVhOQ0xFTkJRWFpDTEVsQlFUUkNMRU5CUVVNc1EwRkJjRU1zUTBGRVJpeExRVWRGTEU5QlFVOHNTMEZCUzBFc1RVRkJUQ3hEUVVGUU8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVM1ZGTEZWQlFWUXNRMEZCY1VKc1NDeEhRVUZ5UWl4RlFVRXdRakpETEUxQlFURkNMRVZCUVd0RE9FUXNXVUZCYkVNc1JVRkJaMFJHTEZGQlFXaEVMRVZCUVRCRU8wRkJRM2hFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNUVUZCVFVZc1dVRkJXWGhITEVkQlFWb3NSVUZCYVVJeVF5eE5RVUZxUWl4RlFVRjVRamhFTEZsQlFYcENMRVZCUVhWRExFbEJRWFpETEVOQlFWWTdRVUZEUVN4TlFVRkpVU3hOUVVGTlVDeE5RVUZOTEUxQlFXaENPMEZCUTBFc1RVRkJTVThzUjBGQlNpeEZRVU5GTEU5QlFVOHNRMEZCUXl4VFFVRlRVQ3hIUVVGVUxFZEJRV1VzUTBGQmFFSXNTVUZCY1VJc1EwRkJReXhEUVVFM1FpeERRVVJHTEV0QlIwVXNUMEZCVDBFc1IwRkJVRHRCUVVOSU96dEJRVVZFTDBjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKelJDeFhRVUZxUWl4SFFVRXJRaXhWUVVGVmVFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRM3BFTEZOQlFVOVhMRmRCUVZjc1NVRkJXQ3hGUVVGcFFuWkZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlY2UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDFjc1YwRkJWeXhKUVVGWUxFVkJRV2xDZGtVc1RVRkJha0lzUlVGQmVVSXNTMEZCZWtJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRZeXhWUVVGVUxFTkJRWEZDY2tnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVFVGQlNYVkZMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1hWQ0xFMUJRVTFITEZsQlFWazNSeXhIUVVGYUxFVkJRV2xDTWtNc1RVRkJha0lzUlVGQmVVSTRSQ3haUVVGNlFpeEZRVUYxUXl4SlFVRjJReXhEUVVGV08wRkJRMEVzVFVGQlNWRXNUVUZCVFZBc1RVRkJUU3hWUVVGb1FqdEJRVU5CTEUxQlFVbFBMRWRCUVVvc1JVRkRSU3hQUVVGUExFTkJRVU1zWVVGQllWQXNSMEZCWWl4SFFVRnRRaXhEUVVGd1FpeEpRVUY1UWl4RFFVRkRMRU5CUVdwRExFTkJSRVlzUzBGSFJTeFBRVUZQUVN4SFFVRlFPMEZCUTBnN08wRkJSVVF2Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVelJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQyTXNWMEZCVnl4SlFVRllMRVZCUVdsQ01VVXNUVUZCYWtJc1JVRkJlVUlzU1VGQmVrSXNSVUZCSzBJMFJDeFJRVUV2UWl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNRVFzVjBGQmFrSXNSMEZCSzBJc1ZVRkJWVFZGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVONlJDeFRRVUZQWXl4WFFVRlhMRWxCUVZnc1JVRkJhVUl4UlN4TlFVRnFRaXhGUVVGNVFpeExRVUY2UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTnBRaXhWUVVGVUxFTkJRWEZDZUVnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVTBGQlQyNUNMRkZCUVZGblNTeEpRVUZTTEVOQlFXRjZTQ3hIUVVGaUxFVkJRV3RDTWtNc1RVRkJiRUlzUlVGQk1FSTRSQ3haUVVFeFFpeEZRVUYzUXl4RlFVRjRReXhGUVVFMFF5eERRVUUxUXl4RFFVRlFPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpaRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVdlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRamhFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlZvUml4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJsQ0xGZEJRVmNzU1VGQldDeEZRVUZwUWpkRkxFMUJRV3BDTEVWQlFYbENMRXRCUVhwQ0xFVkJRV2RETkVRc1VVRkJhRU1zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM0ZDTEZkQlFWUXNRMEZCYzBJMVNDeEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4VFFVRlBia0lzVVVGQlVXZEpMRWxCUVZJc1EwRkJZWHBJTEVkQlFXSXNSVUZCYTBJeVF5eE5RVUZzUWl4RlFVRXdRamhFTEZsQlFURkNMRVZCUVhkRExFVkJRWGhETEVWQlFUUkRMRU5CUVRWRExFTkJRVkE3UVVGRFJEczdRVUZGUkRsSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ1owVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXeEdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1NVRkJNVUlzUlVGQlowTTBSQ3hSUVVGb1F5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVVc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1R0xFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUGNVSXNXVUZCV1N4SlFVRmFMRVZCUVd0Q2FrWXNUVUZCYkVJc1JVRkJNRUlzUzBGQk1VSXNSVUZCYVVNMFJDeFJRVUZxUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENlVU1zVlVGQmFrSXNSMEZCT0VJc1ZVRkJWWGxDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJReTlFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh6UTBGQk4wSTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1NVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpjRVlzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGQk1rSTdPMEZCUlROQ0xFOUJRVXNyUWl4TlFVRk1MRWxCUVdWdlJpeExRVUZtTzBGQlEwUXNRMEZZUkRzN1FVRmhRU3hUUVVGVFJTeFpRVUZVTEVOQlFYVkNha2tzUjBGQmRrSXNSVUZCTkVJclNDeExRVUUxUWl4RlFVRnRRM0JHTEUxQlFXNURMRVZCUVRKRE9FUXNXVUZCTTBNc1JVRkJlVVJHTEZGQlFYcEVMRVZCUVcxRk8wRkJRMnBGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRVzlJTEdOQlFWVkVMRXRCUVZZc1JVRkJhVUlzVFVGQmFrSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeFBRVUZMTEVsQlFVbHFSU3hKUVVGSkxFTkJRVklzUlVGQlYyZElMRWxCUVVrelF5eExRVUZMUXl4SFFVRk1MRU5CUVZOTUxFMUJRVTE0UXl4TlFVRm1MRVZCUVhWQ0xFTkJRWFpDTEVOQlFYQkNMRVZCUVN0RGVrSXNTVUZCU1dkSUxFTkJRVzVFTEVWQlFYTkVhRWdzUjBGQmRFUXNSVUZCTWtRN1FVRkRla1JzUWl4UlFVRkpNa01zVTBGQlUzcENMRU5CUVdJc1NVRkRTU3hEUVVGRE5rY3NVVUZCVXl4UlFVRlRMRXRCUVV0MFFpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRTFRaXhEUVVGdVFpeE5RVU5KTEVOQlFVTjFSaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVaeVF6dEJRVWRFTzBGQlEwWTdPMEZCUlVSMlFpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkZMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVktMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEyeEZNRUlzWlVGQllTeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UW5CR0xFMUJRVEZDTEVWQlFXdERMRWxCUVd4RExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUoxUlN4aFFVRnFRaXhIUVVGcFF5eFZRVUZWVEN4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRCQ0xHVkJRV0VzU1VGQllpeEZRVUZ0UWtZc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXl4TFFVRnNReXhGUVVGNVF6UkVMRkZCUVhwRE8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRPRUlzV1VGQlZDeERRVUYxUW5KSkxFZEJRWFpDTEVWQlFUUkNLMGdzUzBGQk5VSXNSVUZCYlVOd1JpeE5RVUZ1UXl4RlFVRXlRemhFTEZsQlFUTkRMRVZCUVhsRVJpeFJRVUY2UkN4RlFVRnRSVHRCUVVOcVJTeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHpKR0xGVkJRVlZ1Unl4VFFVRldMRWxCUVhWQ2JVY3NWVUZCVlN4SlFVRjRReXhGUVVFNFF5eGxRVUU1UXp0QlFVTkJNMFlzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zYzBOQlFXaERPMEZCUTBGdlNDeGpRVUZWUkN4TFFVRldMRVZCUVdsQ0xGVkJRV3BDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVDBGQlN5eEpRVUZKYWtVc1NVRkJTU3hEUVVGU0xFVkJRVmRuU0N4SlFVRkpNME1zUzBGQlMwTXNSMEZCVEN4RFFVRlRUQ3hOUVVGTmVFTXNUVUZCWml4RlFVRjFRaXhEUVVGMlFpeERRVUZ3UWl4RlFVRXJRM3BDTEVsQlFVbG5TQ3hEUVVGdVJDeEZRVUZ6UkdoSUxFZEJRWFJFTEVWQlFUSkVPMEZCUTNwRWJFSXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUTBzMlJ5eFZRVUZWTEVOQlFVTjBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVGNFF5eEhRVUUyUXl4SlFVUnFSRHRCUVVWRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxGTEdGQlFXcENMRWRCUVdsRExGVkJRVlZRTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGT0VJc1pVRkJZU3hKUVVGaUxFVkJRVzFDVGl4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJd1JTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlVpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUaENMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrNHNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNa1VzVTBGQmFrSXNSMEZCTmtJc1ZVRkJWVlFzUzBGQlZpeEZRVUZwUW5CR0xFMUJRV3BDTEVWQlFYbENORVFzVVVGQmVrSXNSVUZCYlVNN1FVRkRPVVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSE5EUVVFM1FqdEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4SlFVRnFRaXhGUVVGMVFpeERRVUZETEVsQlFYaENPMEZCUTBRN08wRkJSVVFzVFVGQlNYQkdMRlZCUVZVc1MwRkJTeTlDTEUxQlFXNUNMRVZCUTBVN08wRkJSVVlzVFVGQlNXMUlMRk5CUVZNc1EwRkJZaXhGUVVORkxFdEJRVXQ2UWl4VlFVRk1MRU5CUVdkQ2VVSXNTMEZCYUVJc1JVRkJkVUp3Uml4TlFVRjJRaXhGUVVFclFqUkVMRkZCUVM5Q0xFVkJSRVlzUzBGSFJTeExRVUZMUkN4VlFVRk1MRU5CUVdkQ0xFOUJRVTk1UWl4TFFVRlFMRWRCUVdVc1EwRkJMMElzUlVGQmEwTndSaXhOUVVGc1F5eEZRVUV3UXpSRUxGRkJRVEZETzBGQlEwZ3NRMEZtUkRzN1FVRnBRa0VzVTBGQlUyMURMRmRCUVZRc1EwRkJjMEl4U1N4SFFVRjBRaXhGUVVFeVFpdElMRXRCUVROQ0xFVkJRV3REY0VZc1RVRkJiRU1zUlVGQk1FTTRSQ3haUVVFeFF5eEZRVUYzUkVZc1VVRkJlRVFzUlVGQmEwVTdRVUZEYUVVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSE5EUVVGb1F6dEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4TlFVRnFRaXhGUVVGNVFpeERRVUZETEUxQlFURkNPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1RSRExGTkJRVk1zUTBGQllpeEZRVU5GUlN4aFFVRmhha2tzUjBGQllpeEZRVUZyUWl0SUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNNFJDeFpRVUZxUXl4RlFVRXJRMFlzVVVGQkwwTXNSVUZFUml4TFFVZEZNRUlzWVVGQllXcEpMRWRCUVdJc1JVRkJhMElzVTBGQlV5dElMRXRCUVZRc1IwRkJhVUlzUTBGQmJrTXNSVUZCYzBOd1JpeE5RVUYwUXl4RlFVRTRRemhFTEZsQlFUbERMRVZCUVRSRVJpeFJRVUUxUkR0QlFVTklPenRCUVVWRU5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSTRSU3haUVVGcVFpeEhRVUZuUXl4VlFVRlZXaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSVzFETEdOQlFWa3NTVUZCV2l4RlFVRnJRbGdzUzBGQmJFSXNSVUZCZVVKd1JpeE5RVUY2UWl4RlFVRnBReXhKUVVGcVF5eEZRVUYxUXpSRUxGRkJRWFpETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDSzBVc1dVRkJha0lzUjBGQlowTXNWVUZCVldJc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZEYWtWdFF5eGpRVUZaTEVsQlFWb3NSVUZCYTBKWUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1MwRkJha01zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM05ETEZkQlFWUXNRMEZCYzBJM1NTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeFZRVUZxUWl4RlFVRTJRaXhEUVVGRExGVkJRVGxDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlRTeGhRVUZoY2trc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGT0VJc1lVRkJZWEpKTEVkQlFXSXNSVUZCYTBJc1lVRkJZU3RJTEV0QlFXSXNSMEZCY1VJc1EwRkJka01zUlVGQk1FTndSaXhOUVVFeFF5eEZRVUZyUkRoRUxGbEJRV3hFTEVWQlFXZEZSaXhSUVVGb1JUdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpwUml4WlFVRnFRaXhIUVVGblF5eFZRVUZWWml4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhORExHTkJRVmtzU1VGQldpeEZRVUZyUW1Rc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2EwWXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXaENMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEycEZjME1zWTBGQldTeEpRVUZhTEVWQlFXdENaQ3hMUVVGc1FpeEZRVUY1UW5CR0xFMUJRWHBDTEVWQlFXbERMRXRCUVdwRExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJMRk5CUVZONVF5eFhRVUZVTEVOQlFYTkNhRW9zUjBGQmRFSXNSVUZCTWtJclNDeExRVUV6UWl4RlFVRnJRM0JHTEUxQlFXeERMRVZCUVRCRE9FUXNXVUZCTVVNc1JVRkJkMFJHTEZGQlFYaEVMRVZCUVd0Rk8wRkJRMmhGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4elFrRkJjRUlzUlVGQk5FTXNRMEZCUXl4elFrRkJOME03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuRkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVnVRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zU1VGQmFrTXNSVUZCZFVNMFJDeFJRVUYyUXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5OR0xGbEJRV3BDTEVkQlFXZERMRlZCUVZWd1FpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYbERMR05CUVZrc1NVRkJXaXhGUVVGclFtcENMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVXpaRExGbEJRVlFzUTBGQmRVSndTaXhIUVVGMlFpeEZRVUUwUWl0SUxFdEJRVFZDTEVWQlFXMURjRVlzVFVGQmJrTXNSVUZCTWtNNFJDeFpRVUV6UXl4RlFVRjVSRVlzVVVGQmVrUXNSVUZCYlVVN1FVRkRha1VzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUTBrc2MwTkJSRW83UVVGRlFYRkpMR2xDUVVGaGJFSXNTMEZCWWl4RlFVRnZRaXgxUWtGQmNFSXNSVUZCTmtNc1EwRkJReXgxUWtGQk9VTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJqRkdMRlZCUVZFNFFpeExRVUZTTEVOQlFXTjJRaXhIUVVGa0xFVkJRVzFDSzBnc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVMRVZCUVdoRUxFVkJRVzlFTEVOQlFYQkVPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5kR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMFFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTVUZCYkVNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxHTEdGQlFXcENMRWRCUVdsRExGVkJRVlYyUWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRaRExHVkJRV0VzU1VGQllpeEZRVUZ0UW5KQ0xFdEJRVzVDTEVWQlFUQkNjRVlzVFVGQk1VSXNSVUZCYTBNc1MwRkJiRU1zUlVGQmVVTTBSQ3hSUVVGNlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFN1FVRkRRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVZc1NVRkJha0lzUjBGQmQwSXNWVUZCVlhoQ0xFdEJRVllzUlVGQmFVSTVSQ3hMUVVGcVFpeEZRVUYzUWtNc1IwRkJlRUlzUlVGQk5rSTdRVUZEYmtRc1RVRkJTU3hEUVVGRE5rUXNTMEZCVEN4RlFVRlpRU3hSUVVGUkxFTkJRVkk3UVVGRFdpeE5RVUZKTEVOQlFVTTVSQ3hMUVVGTUxFVkJRVmxCTEZGQlFWRXNRMEZCVWp0QlFVTmFMRTFCUVVrc1EwRkJRME1zUjBGQlRDeEZRVUZWUVN4TlFVRk5MRXRCUVV0MFJDeE5RVUZZT3p0QlFVVldMRTFCUVVrc1QwRkJUMjFJTEV0QlFWQXNTMEZCYVVJc1VVRkJja0lzUlVGQkswSTdRVUZETjBKQkxGbEJRVkZCTEUxQlFVMTVRaXhWUVVGT0xFTkJRV2xDTEVOQlFXcENMRU5CUVZJN1FVRkRSRHM3UVVGRlJIQklMRk5CUVU4c1QwRkJUekpHTEV0QlFWQXNTMEZCYVVJc1VVRkJha0lzU1VGQk5rSXNRMEZCUXpkRkxFMUJRVTAyUlN4TFFVRk9MRU5CUVhKRExFVkJRVzFFTEhWQ1FVRnVSRHRCUVVOQk0wWXNVMEZCVHpoQ0xFOUJRVTlFTEV0QlFXUXNSVUZCY1VJc1lVRkJja0k3TzBGQlJVRTdRVUZEUVN4TlFVRkpReXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWtzUzBGQlMzSkVMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN08wRkJSWFpDZDBJc1UwRkJUelpDTEZOQlFWTXNRMEZCVkN4SlFVRmpRU3hSUVVGUkxFdEJRVXR5UkN4TlFVRnNReXhGUVVFd1F5eHhRa0ZCTVVNN1FVRkRRWGRDTEZOQlFVODRRaXhQUVVGUExFTkJRVkFzU1VGQldVRXNUMEZCVHl4TFFVRkxkRVFzVFVGQkwwSXNSVUZCZFVNc2JVSkJRWFpET3p0QlFVVkJMRTlCUVVzc1NVRkJTVTBzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1F5eFRRVUZMUVN4RFFVRk1MRWxCUVZVMlJ5eExRVUZXTzBGQlEwUTdRVUZEUml4RFFYUkNSRHM3UVVGM1FrRndTU3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRalJHTEU5QlFXcENMRWRCUVRKQ0xGbEJRVms3UVVGRGNrTXNUVUZCU1RsRUxFMUJRVTBzUlVGQlZqdEJRVU5CTEUxQlFVbFNMRTFCUVUwc1MwRkJTM1pGTEUxQlFXWTdRVUZEUVN4UFFVRkxMRWxCUVVsTkxFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTV2xGTEVkQlFYQkNMRVZCUVhsQ2FrVXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSjVSU3hSUVVGSmVrVXNRMEZCU2l4SlFVRlRNRVVzVFVGQlRTeExRVUZMTVVVc1EwRkJUQ3hEUVVGT0xFTkJRVlE3UVVGRFFTeFJRVUZKUVN4TlFVRk5lRUlzVVVGQlVVY3NhVUpCUVd4Q0xFVkJRWEZETzBGQlEyNURPRVlzVlVGQlNYcEZMRWxCUVVrc1EwRkJVaXhKUVVGaExFdEJRV0k3UVVGRFFUdEJRVU5FTzBGQlEwWTdRVUZEUkN4VFFVRlBMR0ZCUVdGNVJTeEpRVUZKSzBRc1NVRkJTaXhEUVVGVExFZEJRVlFzUTBGQllpeEhRVUUyUWl4SFFVRndRenRCUVVORUxFTkJXRVE3TzBGQllVRTdPenM3UVVGSlFTOUtMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRVlzWVVGQmFrSXNSMEZCYVVNc1dVRkJXVHRCUVVNelF5eE5RVUZKTEU5QlFVOTRTaXhWUVVGUUxFdEJRWE5DTEZkQlFURkNMRVZCUVhWRE8wRkJRM0pETEZGQlFVbFNMRTlCUVU5SkxHVkJRVmdzUlVGQk5FSTdRVUZETVVJc1lVRkJVU3hKUVVGSlNpeE5RVUZLTEVOQlFWY3NTVUZCV0N4RFFVRkVMRU5CUVcxQ2FVc3NUVUZCTVVJN1FVRkRSQ3hMUVVaRUxFMUJSVTg3UVVGRFRDeFZRVUZKTlVvc1RVRkJUU3hKUVVGSlJ5eFZRVUZLTEVOQlFXVXNTMEZCUzFNc1RVRkJjRUlzUTBGQlZqdEJRVU5CTEZkQlFVc3NTVUZCU1Uwc1NVRkJTU3hEUVVGU0xFVkJRVmRwUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCTVVJc1JVRkJhME5OTEVsQlFVbHBSU3hIUVVGMFF5eEZRVUV5UTJwRkxFdEJRVXNzUTBGQmFFUTdRVUZEUld4Q0xGbEJRVWxyUWl4RFFVRktMRWxCUVZNc1MwRkJTMEVzUTBGQlRDeERRVUZVTzBGQlJFWXNUMEZGUVN4UFFVRlBiRUlzU1VGQlNUUktMRTFCUVZnN1FVRkRSRHRCUVVOR0xFZEJWRVFzVFVGVFR6dEJRVU5NTEZWQlFVMHNTVUZCU1RkSkxFdEJRVW9zUTBGQlZTeHZSRUZCVml4RFFVRk9PMEZCUTBRN1FVRkRSaXhEUVdKRU96dEJRV1ZCTzBGQlEwRTdPMEZCUlVFc1UwRkJVMG9zVlVGQlZDeERRVUZ4UW10Q0xFZEJRWEpDTEVWQlFUQkNPMEZCUTNoQ0xFMUJRVWxCTEVsQlFVbG5TU3hKUVVGU0xFVkJRV01zVDBGQlQyaEpMRWxCUVVsblNTeEpRVUZLTEVWQlFWQTdRVUZEWkN4VFFVRlBhRWtzU1VGQlNXbEpMRTlCUVVvc1EwRkJXU3haUVVGYUxFVkJRVEJDTEVWQlFURkNMRU5CUVZBN1FVRkRSRHM3UVVGRlJDeEpRVUZKUXl4TFFVRkxjRXNzVDBGQlQydEZMRk5CUVdoQ096dEJRVVZCT3pzN1FVRkhRV3hGTEU5QlFVOXhRaXhSUVVGUUxFZEJRV3RDTEZWQlFWVmtMRWRCUVZZc1JVRkJaVHRCUVVNdlFrRXNUVUZCU1dVc1UwRkJTaXhIUVVGblFpeEpRVUZvUWpzN1FVRkZRVHRCUVVOQlppeE5RVUZKT0Vvc1NVRkJTaXhIUVVGWE9Vb3NTVUZCU1N0R0xFZEJRV1k3UVVGRFFTOUdMRTFCUVVscFFpeEpRVUZLTEVkQlFWZHFRaXhKUVVGSmEwY3NSMEZCWmpzN1FVRkZRVHRCUVVOQmJFY3NUVUZCU1N0R0xFZEJRVW9zUjBGQlZUaEVMRWRCUVVjNVJDeEhRVUZpTzBGQlEwRXZSaXhOUVVGSmEwY3NSMEZCU2l4SFFVRlZNa1FzUjBGQlJ6TkVMRWRCUVdJN08wRkJSVUZzUnl4TlFVRkpjVUlzUzBGQlNpeEhRVUZaZDBrc1IwRkJSM2hKTEV0QlFXWTdRVUZEUVhKQ0xFMUJRVWs0UkN4UlFVRktMRWRCUVdVclJpeEhRVUZITDBZc1VVRkJiRUk3UVVGRFFUbEVMRTFCUVVrclNpeGpRVUZLTEVkQlFYRkNSaXhIUVVGSEwwWXNVVUZCZUVJN1FVRkRRVGxFTEUxQlFVbDNSU3hOUVVGS0xFZEJRV0Z4Uml4SFFVRkhja1lzVFVGQmFFSTdRVUZEUVhoRkxFMUJRVWx6UXl4SlFVRktMRWRCUVZkMVNDeEhRVUZIZGtnc1NVRkJaRHRCUVVOQmRFTXNUVUZCU1RKRkxFdEJRVW9zUjBGQldXdEdMRWRCUVVkc1JpeExRVUZtTzBGQlEwRXpSU3hOUVVGSmIwSXNVMEZCU2l4SFFVRm5RbmxKTEVkQlFVZDZTU3hUUVVGdVFqdEJRVU5CY0VJc1RVRkJTWGxITEZsQlFVb3NSMEZCYlVKdlJDeEhRVUZIY0VRc1dVRkJkRUk3UVVGRFFYcEhMRTFCUVVrd1J5eFpRVUZLTEVkQlFXMUNiVVFzUjBGQlIyNUVMRmxCUVhSQ08wRkJRMEV4Unl4TlFVRkpORWNzV1VGQlNpeEhRVUZ0UW1sRUxFZEJRVWRxUkN4WlFVRjBRanRCUVVOQk5VY3NUVUZCU1RaSExGbEJRVW9zUjBGQmJVSm5SQ3hIUVVGSGFFUXNXVUZCZEVJN1FVRkRRVGRITEUxQlFVazRSeXhSUVVGS0xFZEJRV1VyUXl4SFFVRkhMME1zVVVGQmJFSTdRVUZEUVRsSExFMUJRVWxwU0N4WFFVRktMRWRCUVd0Q05FTXNSMEZCUnpWRExGZEJRWEpDTzBGQlEwRnFTQ3hOUVVGSmEwZ3NWMEZCU2l4SFFVRnJRakpETEVkQlFVY3pReXhYUVVGeVFqdEJRVU5CYkVnc1RVRkJTVzlJTEZkQlFVb3NSMEZCYTBKNVF5eEhRVUZIZWtNc1YwRkJja0k3UVVGRFFYQklMRTFCUVVseFNDeFhRVUZLTEVkQlFXdENkME1zUjBGQlIzaERMRmRCUVhKQ08wRkJRMEZ5U0N4TlFVRkpkMGdzVjBGQlNpeEhRVUZyUW5GRExFZEJRVWR5UXl4WFFVRnlRanRCUVVOQmVFZ3NUVUZCU1hsSUxGZEJRVW9zUjBGQmEwSnZReXhIUVVGSGNFTXNWMEZCY2tJN1FVRkRRWHBJTEUxQlFVa3lTQ3haUVVGS0xFZEJRVzFDYTBNc1IwRkJSMnhETEZsQlFYUkNPMEZCUTBFelNDeE5RVUZKTkVnc1dVRkJTaXhIUVVGdFFtbERMRWRCUVVkcVF5eFpRVUYwUWp0QlFVTkJOVWdzVFVGQlNXOUhMRlZCUVVvc1IwRkJhVUo1UkN4SFFVRkhla1FzVlVGQmNFSTdRVUZEUVhCSExFMUJRVWxwU1N4aFFVRktMRWRCUVc5Q05FSXNSMEZCUnpWQ0xHRkJRWFpDTzBGQlEwRnFTU3hOUVVGSmEwa3NZVUZCU2l4SFFVRnZRakpDTEVkQlFVY3pRaXhoUVVGMlFqdEJRVU5CYkVrc1RVRkJTVzlKTEdGQlFVb3NSMEZCYjBKNVFpeEhRVUZIZWtJc1lVRkJka0k3UVVGRFFYQkpMRTFCUVVseFNTeGhRVUZLTEVkQlFXOUNkMElzUjBGQlIzaENMR0ZCUVhaQ08wRkJRMEZ5U1N4TlFVRkpjMGtzVTBGQlNpeEhRVUZuUW5WQ0xFZEJRVWQyUWl4VFFVRnVRanRCUVVOQmRFa3NUVUZCU1hsSkxGbEJRVW9zUjBGQmJVSnZRaXhIUVVGSGNFSXNXVUZCZEVJN1FVRkRRWHBKTEUxQlFVa3dTU3haUVVGS0xFZEJRVzFDYlVJc1IwRkJSMjVDTEZsQlFYUkNPMEZCUTBFeFNTeE5RVUZKTkVrc1dVRkJTaXhIUVVGdFFtbENMRWRCUVVkcVFpeFpRVUYwUWp0QlFVTkJOVWtzVFVGQlNUWkpMRmxCUVVvc1IwRkJiVUpuUWl4SFFVRkhhRUlzV1VGQmRFSTdRVUZEUVRkSkxFMUJRVWxuU2l4WlFVRktMRWRCUVcxQ1lTeEhRVUZIWWl4WlFVRjBRanRCUVVOQmFFb3NUVUZCU1dsS0xGbEJRVW9zUjBGQmJVSlpMRWRCUVVkYUxGbEJRWFJDTzBGQlEwRnFTaXhOUVVGSmJVb3NZVUZCU2l4SFFVRnZRbFVzUjBGQlIxWXNZVUZCZGtJN1FVRkRRVzVLTEUxQlFVbHZTaXhoUVVGS0xFZEJRVzlDVXl4SFFVRkhWQ3hoUVVGMlFqdEJRVU5CY0Vvc1RVRkJTWEZLTEVsQlFVb3NSMEZCVjFFc1IwRkJSMUlzU1VGQlpEdEJRVU5CY2tvc1RVRkJTWFZLTEU5QlFVb3NSMEZCWTAwc1IwRkJSMDRzVDBGQmFrSTdRVUZEUVhaS0xFMUJRVWw1U2l4aFFVRktMRWRCUVc5Q1NTeEhRVUZIU2l4aFFVRjJRanM3UVVGRlFTeFRRVUZQZWtvc1IwRkJVRHRCUVVORUxFTkJiRVJFT3p0QlFXOUVRVHRCUVVOQkxGTkJRVk0wUml4TFFVRlVMRU5CUVdkQ2IwVXNTMEZCYUVJc1JVRkJkVUl2UlN4SFFVRjJRaXhGUVVFMFFtZEdMRmxCUVRWQ0xFVkJRVEJETzBGQlEzaERMRTFCUVVrc1QwRkJUMFFzUzBGQlVDeExRVUZwUWl4UlFVRnlRaXhGUVVFclFpeFBRVUZQUXl4WlFVRlFPMEZCUXk5Q1JDeFZRVUZSTEVOQlFVTXNRMEZCUTBFc1MwRkJWaXhEUVVaM1F5eERRVVYwUWp0QlFVTnNRaXhOUVVGSlFTeFRRVUZUTDBVc1IwRkJZaXhGUVVGclFpeFBRVUZQUVN4SFFVRlFPMEZCUTJ4Q0xFMUJRVWtyUlN4VFFVRlRMRU5CUVdJc1JVRkJaMElzVDBGQlQwRXNTMEZCVUR0QlFVTm9Ra0VzVjBGQlV5OUZMRWRCUVZRN1FVRkRRU3hOUVVGSkswVXNVMEZCVXl4RFFVRmlMRVZCUVdkQ0xFOUJRVTlCTEV0QlFWQTdRVUZEYUVJc1UwRkJUeXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNKS0xFMUJRVlFzUTBGQmFVSkVMRTFCUVdwQ0xFVkJRWGxDTzBGQlEzWkNPMEZCUTBFN1FVRkRRVHRCUVVOQlFTeFhRVUZUTEVOQlFVTXNRMEZCUXpKRkxFdEJRVXMyUlN4SlFVRk1MRU5CUVZVc1EwRkJRM2hLTEUxQlFWZ3NRMEZCV0R0QlFVTkJMRk5CUVU5QkxGTkJRVk1zUTBGQlZDeEhRVUZoTEVOQlFXSXNSMEZCYVVKQkxFMUJRWGhDTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEU5QlFWUXNRMEZCYTBJNVFpeFBRVUZzUWl4RlFVRXlRanRCUVVONlFpeFRRVUZQTEVOQlFVTnhSU3hOUVVGTmRrTXNUMEZCVGl4SlFVRnBRaXhWUVVGVk9VSXNUMEZCVml4RlFVRnRRanRCUVVNeFF5eFhRVUZQT0Vvc1QwRkJUM2hITEZOQlFWQXNRMEZCYVVKSExGRkJRV3BDTEVOQlFUQkNZeXhKUVVFeFFpeERRVUVyUW5aRkxFOUJRUzlDTEUxQlFUUkRMR2RDUVVGdVJEdEJRVU5FTEVkQlJrMHNSVUZGU2tFc1QwRkdTU3hEUVVGUU8wRkJSMFE3TzBGQlJVUXNVMEZCVTJFc1ZVRkJWQ3hEUVVGeFFtSXNUMEZCY2tJc1JVRkJPRUk3UVVGRE5VSXNVMEZCVHpoQ0xGRkJRVkU1UWl4UFFVRlNMRXRCUVc5Q1dpeFBRVUZQTUVJc1VVRkJVQ3hEUVVGblFtUXNUMEZCYUVJc1EwRkJjRUlzU1VGRFNFRXNWMEZCVnl4UlFVRlBRU3hQUVVGUUxIbERRVUZQUVN4UFFVRlFMRTlCUVcxQ0xGRkJRVGxDTEVsQlEwRXNUMEZCVDBFc1VVRkJVVXNzVFVGQlppeExRVUV3UWl4UlFVWTVRanRCUVVkRU96dEJRVVZFTEZOQlFWTm5SaXhMUVVGVUxFTkJRV2RDTUVVc1EwRkJhRUlzUlVGQmJVSTdRVUZEYWtJc1RVRkJTVUVzU1VGQlNTeEZRVUZTTEVWQlFWa3NUMEZCVHl4TlFVRk5RU3hGUVVGRmRFY3NVVUZCUml4RFFVRlhMRVZCUVZnc1EwRkJZanRCUVVOYUxGTkJRVTl6Unl4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5xUXl4WFFVRlVMRU5CUVhOQ1JpeEhRVUYwUWl4RlFVRXlRanRCUVVONlFpeE5RVUZKTUVrc1dVRkJXU3hGUVVGb1FqdEJRVU5CTEU5QlFVc3NTVUZCU1hKS0xFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVmNzU1VGQlNXcENMRTFCUVhoQ0xFVkJRV2REVFN4SFFVRm9ReXhGUVVGeFF6dEJRVU51UXl4UlFVRkpVeXhKUVVGSlJTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4RFFVRlNPMEZCUTBFc1VVRkJTVk1zUzBGQlN5eEpRVUZVTEVWQlEwVTBTU3hWUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZtTEVWQlJFWXNTMEZGU3p0QlFVTklMRlZCUVVrclF5eFJRVUZSTDBNc1EwRkJXanRCUVVOQkxGVkJRVWxUTEV0QlFVc3NUVUZCVEN4SlFVRmxRU3hMUVVGTExFMUJRWGhDTEVWQlFXZERWRHRCUVVOb1F5eFZRVUZKZFVvc1NVRkJTVU1zYlVKQlFXMUNOMGtzU1VGQlNXZEVMRXRCUVVvc1EwRkJWVm9zUzBGQlZpeEZRVUZwUWk5RExFbEJRVVVzUTBGQmJrSXNRMEZCYmtJc1JVRkJNRU1yUWl4TlFVRXhReXhEUVVGcFJDeERRVUZxUkN4RlFVRnZSREJJTEV0QlFYQkVMRU5CUVRCRUxFZEJRVEZFTEVOQlFWSTdRVUZEUVN4WFFVRkxMRWxCUVVsNlF5eEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWwxUXl4RlFVRkZOMG9zVFVGQmRFSXNSVUZCT0VKelNDeEhRVUU1UWp0QlFVTkZjVU1zYTBKQlFWVkRMRWxCUVZZc1EwRkJaWGhJTEZOQlFWTjVTQ3hGUVVGRmRrTXNRMEZCUml4RFFVRlVMRVZCUVdVc1JVRkJaaXhEUVVGbU8wRkJSRVk3UVVGRlJEdEJRVU5HTzBGQlEwUXNVMEZCVDNGRExGTkJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRMMGNzV1VGQlZDeERRVUYxUWpOQ0xFZEJRWFpDTEVWQlFUUkNPMEZCUXpGQ0xFMUJRVWt3U1N4WlFVRlpMRVZCUVdoQ08wRkJRMEVzVDBGQlN5eEpRVUZKY2tvc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpWeXhKUVVGSmFrSXNUVUZCZUVJc1JVRkJaME5OTEVkQlFXaERMRVZCUVhGRE8wRkJRMjVETzBGQlEwRnhTaXhqUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeEpRVUZ2UWl4SlFVRnVRenRCUVVORU8wRkJRMFFzVTBGQlQzRktMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTTBjc1kwRkJWQ3hEUVVGNVFpOUNMRWRCUVhwQ0xFVkJRVGhDTzBGQlF6VkNMRTFCUVVrclNTeERRVUZLTEVWQlFVOURMRVZCUVZBc1JVRkJWME1zUlVGQldEdEJRVU5CTEUxQlFVbFFMRmxCUVZrc1JVRkJhRUk3UVVGRFFTeFBRVUZMTEVsQlFVbHlTaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsWExFbEJRVWxxUWl4TlFVRjRRaXhGUVVGblEwMHNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTXdTaXhSUVVGSkwwa3NTVUZCU1RKSUxGVkJRVW9zUTBGQlpYUkpMRU5CUVdZc1EwRkJTanRCUVVOQk1rb3NVMEZCUzBRc1MwRkJTeXhEUVVGV08wRkJRMEZGTEZOQlFVdEdMRWxCUVVrc1IwRkJWRHRCUVVOQlRDeGpRVUZWUXl4SlFVRldMRU5CUVdWTkxFVkJRV1k3UVVGRFFWQXNZMEZCVlVNc1NVRkJWaXhEUVVGbFN5eEZRVUZtTzBGQlEwUTdPMEZCUlVRc1UwRkJUMDRzVTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMlNTeGhRVUZVTEVOQlFYZENTQ3hIUVVGNFFpeEZRVUUyUWp0QlFVTXpRaXhUUVVGUGRFTXNUMEZCVDNkTUxGZEJRVkFzUTBGQmJVSnNTaXhIUVVGdVFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEZWQlFWUXNRMEZCY1VJd1NDeEhRVUZ5UWl4RlFVRXdRa01zUjBGQk1VSXNSVUZCSzBKMFNTeE5RVUV2UWl4RlFVRjFReTlDTEUxQlFYWkRMRVZCUVN0RE8wRkJRemRETEUxQlFVa3dRaXhIUVVGS08wRkJRMEVzVDBGQlN5eEpRVUZKY0VJc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpUaXhOUVVGd1FpeEZRVUUwUWswc1IwRkJOVUlzUlVGQmFVTTdRVUZETDBJc1VVRkJTMEVzU1VGQlNYbENMRTFCUVVvc1NVRkJZM05KTEVsQlFVbHlTeXhOUVVGdVFpeEpRVUVyUWswc1MwRkJTemhLTEVsQlFVbHdTeXhOUVVFMVF5eEZRVU5GTzBGQlEwWnhTeXhSUVVGSkwwb3NTVUZCU1hsQ0xFMUJRVklzU1VGQmEwSnhTU3hKUVVGSk9Vb3NRMEZCU2l4RFFVRnNRanRCUVVORU8wRkJRMFFzVTBGQlQwRXNRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk4xUlN4alFVRlVMRU5CUVhsQ05VUXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSXNUVUZCU1R0QlFVTkdMRmRCUVU5eFNpeHRRa0ZCYlVKeVNpeEhRVUZ1UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hEUVVWRkxFOUJRVTl6U2l4SFFVRlFMRVZCUVZrN1FVRkRXaXhYUVVGUE1Vb3NUMEZCVDJsRkxGbEJRVkFzUTBGQmIwSXNUVUZCY0VJc1EwRkJVQ3hEUVVSWkxFTkJRM1ZDTzBGQlEzQkRPMEZCUTBZN08wRkJSVVE3T3pzN08wRkJTMEVzVTBGQlUzTkRMRk5CUVZRc1EwRkJiMEpFTEV0QlFYQkNMRVZCUVRKQ2NVUXNSMEZCTTBJc1JVRkJaME03UVVGRE9VSm9TaXhUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTXNRMEZCYUVJc1JVRkJiVUlzTUVSQlFXNUNPMEZCUTBFelJpeFRRVUZQTWtZc1UwRkJVM0ZFTEVkQlFXaENMRVZCUVhGQ0xEWkRRVUZ5UWp0QlFVTkJhRW9zVTBGQlQyMUVMRXRCUVVzNFJpeExRVUZNTEVOQlFWZDBSQ3hMUVVGWUxFMUJRWE5DUVN4TFFVRTNRaXhGUVVGdlF5eHJRMEZCY0VNN1FVRkRSRHM3UVVGRlJDeFRRVUZUVlN4VFFVRlVMRU5CUVc5Q1ZpeExRVUZ3UWl4RlFVRXlRbkZFTEVkQlFUTkNMRVZCUVdkRE5VWXNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTndSQ3hUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTnhSQ3hIUVVGb1FpeEZRVUZ4UWl4NVEwRkJja0k3UVVGRFFXaEtMRk5CUVU4eVJpeFRRVUZUZGtNc1IwRkJhRUlzUlVGQmNVSXNNRU5CUVhKQ08wRkJRMEZ3UkN4VFFVRlBiVVFzUzBGQlN6aEdMRXRCUVV3c1EwRkJWM1JFTEV0QlFWZ3NUVUZCYzBKQkxFdEJRVGRDTEVWQlFXOURMR3REUVVGd1F6dEJRVU5FT3p0QlFVVkVMRk5CUVZOclFpeFpRVUZVTEVOQlFYVkNiRUlzUzBGQmRrSXNSVUZCT0VKeFJDeEhRVUU1UWl4RlFVRnRRelZHTEVkQlFXNURMRVZCUVhkRE8wRkJRM1JEY0VRc1UwRkJUeXhQUVVGUE1rWXNTMEZCVUN4TFFVRnBRaXhSUVVGNFFpeEZRVUZyUXl4MVEwRkJiRU03UVVGRFFUTkdMRk5CUVU4eVJpeFRRVUZUY1VRc1IwRkJhRUlzUlVGQmNVSXNlVU5CUVhKQ08wRkJRMEZvU2l4VFFVRlBNa1lzVTBGQlUzWkRMRWRCUVdoQ0xFVkJRWEZDTERCRFFVRnlRanRCUVVORU96dEJRVVZFTEZOQlFWTndSQ3hOUVVGVUxFTkJRV2xDYTBvc1NVRkJha0lzUlVGQmRVSkRMRTlCUVhaQ0xFVkJRV2RETzBGQlF6bENMRTFCUVVrc1EwRkJRMFFzU1VGQlRDeEZRVUZYTEUxQlFVMHNTVUZCU1haTExFdEJRVW9zUTBGQlZYZExMRmRCUVZjc2EwSkJRWEpDTEVOQlFVNDdRVUZEV2lJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFJVnh1SUNvZ1ZHaGxJR0oxWm1abGNpQnRiMlIxYkdVZ1puSnZiU0J1YjJSbExtcHpMQ0JtYjNJZ2RHaGxJR0p5YjNkelpYSXVYRzRnS2x4dUlDb2dRR0YxZEdodmNpQWdJRVpsY205emN5QkJZbTkxYTJoaFpHbHFaV2dnUEdabGNtOXpjMEJtWlhKdmMzTXViM0puUGlBOGFIUjBjRG92TDJabGNtOXpjeTV2Y21jK1hHNGdLaUJBYkdsalpXNXpaU0FnVFVsVVhHNGdLaTljYmx4dWRtRnlJR0poYzJVMk5DQTlJSEpsY1hWcGNtVW9KMkpoYzJVMk5DMXFjeWNwWEc1MllYSWdhV1ZsWlRjMU5DQTlJSEpsY1hWcGNtVW9KMmxsWldVM05UUW5LVnh1WEc1bGVIQnZjblJ6TGtKMVptWmxjaUE5SUVKMVptWmxjbHh1Wlhod2IzSjBjeTVUYkc5M1FuVm1abVZ5SUQwZ1FuVm1abVZ5WEc1bGVIQnZjblJ6TGtsT1UxQkZRMVJmVFVGWVgwSlpWRVZUSUQwZ05UQmNia0oxWm1abGNpNXdiMjlzVTJsNlpTQTlJRGd4T1RKY2JseHVMeW9xWEc0Z0tpQkpaaUJnUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWMyQTZYRzRnS2lBZ0lEMDlQU0IwY25WbElDQWdJRlZ6WlNCVmFXNTBPRUZ5Y21GNUlHbHRjR3hsYldWdWRHRjBhVzl1SUNobVlYTjBaWE4wS1Z4dUlDb2dJQ0E5UFQwZ1ptRnNjMlVnSUNCVmMyVWdUMkpxWldOMElHbHRjR3hsYldWdWRHRjBhVzl1SUNoamIyMXdZWFJwWW14bElHUnZkMjRnZEc4Z1NVVTJLVnh1SUNvdlhHNUNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUQwZ0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0x5OGdSR1YwWldOMElHbG1JR0p5YjNkelpYSWdjM1Z3Y0c5eWRITWdWSGx3WldRZ1FYSnlZWGx6TGlCVGRYQndiM0owWldRZ1luSnZkM05sY25NZ1lYSmxJRWxGSURFd0t5d2dSbWx5WldadmVDQTBLeXhjYmlBZ0x5OGdRMmh5YjIxbElEY3JMQ0JUWVdaaGNta2dOUzR4S3l3Z1QzQmxjbUVnTVRFdU5pc3NJR2xQVXlBMExqSXJMaUJKWmlCMGFHVWdZbkp2ZDNObGNpQmtiMlZ6SUc1dmRDQnpkWEJ3YjNKMElHRmtaR2x1WjF4dUlDQXZMeUJ3Y205d1pYSjBhV1Z6SUhSdklHQlZhVzUwT0VGeWNtRjVZQ0JwYm5OMFlXNWpaWE1zSUhSb1pXNGdkR2hoZENkeklIUm9aU0J6WVcxbElHRnpJRzV2SUdCVmFXNTBPRUZ5Y21GNVlDQnpkWEJ3YjNKMFhHNGdJQzh2SUdKbFkyRjFjMlVnZDJVZ2JtVmxaQ0IwYnlCaVpTQmhZbXhsSUhSdklHRmtaQ0JoYkd3Z2RHaGxJRzV2WkdVZ1FuVm1abVZ5SUVGUVNTQnRaWFJvYjJSekxpQlVhR2x6SUdseklHRnVJR2x6YzNWbFhHNGdJQzh2SUdsdUlFWnBjbVZtYjNnZ05DMHlPUzRnVG05M0lHWnBlR1ZrT2lCb2RIUndjem92TDJKMVozcHBiR3hoTG0xdmVtbHNiR0V1YjNKbkwzTm9iM2RmWW5WbkxtTm5hVDlwWkQwMk9UVTBNemhjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUVGeWNtRjVRblZtWm1WeUtEQXBYRzRnSUNBZ2RtRnlJR0Z5Y2lBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0dKMVppbGNiaUFnSUNCaGNuSXVabTl2SUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdORElnZlZ4dUlDQWdJSEpsZEhWeWJpQTBNaUE5UFQwZ1lYSnlMbVp2YnlncElDWW1YRzRnSUNBZ0lDQWdJSFI1Y0dWdlppQmhjbkl1YzNWaVlYSnlZWGtnUFQwOUlDZG1kVzVqZEdsdmJpY2dMeThnUTJoeWIyMWxJRGt0TVRBZ2JHRmpheUJnYzNWaVlYSnlZWGxnWEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlZjYmlBZ2ZWeHVmU2tvS1Z4dVhHNHZLaXBjYmlBcUlFTnNZWE56T2lCQ2RXWm1aWEpjYmlBcUlEMDlQVDA5UFQwOVBUMDlQVDFjYmlBcVhHNGdLaUJVYUdVZ1FuVm1abVZ5SUdOdmJuTjBjblZqZEc5eUlISmxkSFZ5Ym5NZ2FXNXpkR0Z1WTJWeklHOW1JR0JWYVc1ME9FRnljbUY1WUNCMGFHRjBJR0Z5WlNCaGRXZHRaVzUwWldSY2JpQXFJSGRwZEdnZ1puVnVZM1JwYjI0Z2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWVd4c0lIUm9aU0J1YjJSbElHQkNkV1ptWlhKZ0lFRlFTU0JtZFc1amRHbHZibk11SUZkbElIVnpaVnh1SUNvZ1lGVnBiblE0UVhKeVlYbGdJSE52SUhSb1lYUWdjM0YxWVhKbElHSnlZV05yWlhRZ2JtOTBZWFJwYjI0Z2QyOXlhM01nWVhNZ1pYaHdaV04wWldRZ0xTMGdhWFFnY21WMGRYSnVjMXh1SUNvZ1lTQnphVzVuYkdVZ2IyTjBaWFF1WEc0Z0tseHVJQ29nUW5rZ1lYVm5iV1Z1ZEdsdVp5QjBhR1VnYVc1emRHRnVZMlZ6TENCM1pTQmpZVzRnWVhadmFXUWdiVzlrYVdaNWFXNW5JSFJvWlNCZ1ZXbHVkRGhCY25KaGVXQmNiaUFxSUhCeWIzUnZkSGx3WlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnUW5WbVptVnlJQ2h6ZFdKcVpXTjBMQ0JsYm1OdlpHbHVaeXdnYm05YVpYSnZLU0I3WEc0Z0lHbG1JQ2doS0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJDZFdabVpYSXBLVnh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dRblZtWm1WeUtITjFZbXBsWTNRc0lHVnVZMjlrYVc1bkxDQnViMXBsY204cFhHNWNiaUFnZG1GeUlIUjVjR1VnUFNCMGVYQmxiMllnYzNWaWFtVmpkRnh1WEc0Z0lDOHZJRmR2Y210aGNtOTFibVE2SUc1dlpHVW5jeUJpWVhObE5qUWdhVzF3YkdWdFpXNTBZWFJwYjI0Z1lXeHNiM2R6SUdadmNpQnViMjR0Y0dGa1pHVmtJSE4wY21sdVozTmNiaUFnTHk4Z2QyaHBiR1VnWW1GelpUWTBMV3B6SUdSdlpYTWdibTkwTGx4dUlDQnBaaUFvWlc1amIyUnBibWNnUFQwOUlDZGlZWE5sTmpRbklDWW1JSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdjM1ZpYW1WamRDQTlJSE4wY21sdVozUnlhVzBvYzNWaWFtVmpkQ2xjYmlBZ0lDQjNhR2xzWlNBb2MzVmlhbVZqZEM1c1pXNW5kR2dnSlNBMElDRTlQU0F3S1NCN1hHNGdJQ0FnSUNCemRXSnFaV04wSUQwZ2MzVmlhbVZqZENBcklDYzlKMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUVacGJtUWdkR2hsSUd4bGJtZDBhRnh1SUNCMllYSWdiR1Z1WjNSb1hHNGdJR2xtSUNoMGVYQmxJRDA5UFNBbmJuVnRZbVZ5SnlsY2JpQWdJQ0JzWlc1bmRHZ2dQU0JqYjJWeVkyVW9jM1ZpYW1WamRDbGNiaUFnWld4elpTQnBaaUFvZEhsd1pTQTlQVDBnSjNOMGNtbHVaeWNwWEc0Z0lDQWdiR1Z1WjNSb0lEMGdRblZtWm1WeUxtSjVkR1ZNWlc1bmRHZ29jM1ZpYW1WamRDd2daVzVqYjJScGJtY3BYRzRnSUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdlltcGxZM1FuS1Z4dUlDQWdJR3hsYm1kMGFDQTlJR052WlhKalpTaHpkV0pxWldOMExteGxibWQwYUNrZ0x5OGdZWE56ZFcxbElIUm9ZWFFnYjJKcVpXTjBJR2x6SUdGeWNtRjVMV3hwYTJWY2JpQWdaV3h6WlZ4dUlDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25SbWx5YzNRZ1lYSm5kVzFsYm5RZ2JtVmxaSE1nZEc4Z1ltVWdZU0J1ZFcxaVpYSXNJR0Z5Y21GNUlHOXlJSE4wY21sdVp5NG5LVnh1WEc0Z0lIWmhjaUJpZFdaY2JpQWdhV1lnS0VKMVptWmxjaTVmZFhObFZIbHdaV1JCY25KaGVYTXBJSHRjYmlBZ0lDQXZMeUJRY21WbVpYSnlaV1E2SUZKbGRIVnliaUJoYmlCaGRXZHRaVzUwWldRZ1lGVnBiblE0UVhKeVlYbGdJR2x1YzNSaGJtTmxJR1p2Y2lCaVpYTjBJSEJsY21admNtMWhibU5sWEc0Z0lDQWdZblZtSUQwZ1FuVm1abVZ5TGw5aGRXZHRaVzUwS0c1bGR5QlZhVzUwT0VGeWNtRjVLR3hsYm1kMGFDa3BYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdMeThnUm1Gc2JHSmhZMnM2SUZKbGRIVnliaUJVU0VsVElHbHVjM1JoYm1ObElHOW1JRUoxWm1abGNpQW9ZM0psWVhSbFpDQmllU0JnYm1WM1lDbGNiaUFnSUNCaWRXWWdQU0IwYUdselhHNGdJQ0FnWW5WbUxteGxibWQwYUNBOUlHeGxibWQwYUZ4dUlDQWdJR0oxWmk1ZmFYTkNkV1ptWlhJZ1BTQjBjblZsWEc0Z0lIMWNibHh1SUNCMllYSWdhVnh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lBbUppQjBlWEJsYjJZZ2MzVmlhbVZqZEM1aWVYUmxUR1Z1WjNSb0lEMDlQU0FuYm5WdFltVnlKeWtnZTF4dUlDQWdJQzh2SUZOd1pXVmtJRzl3ZEdsdGFYcGhkR2x2YmlBdExTQjFjMlVnYzJWMElHbG1JSGRsSjNKbElHTnZjSGxwYm1jZ1puSnZiU0JoSUhSNWNHVmtJR0Z5Y21GNVhHNGdJQ0FnWW5WbUxsOXpaWFFvYzNWaWFtVmpkQ2xjYmlBZ2ZTQmxiSE5sSUdsbUlDaHBjMEZ5Y21GNWFYTm9LSE4xWW1wbFkzUXBLU0I3WEc0Z0lDQWdMeThnVkhKbFlYUWdZWEp5WVhrdGFYTm9JRzlpYW1WamRITWdZWE1nWVNCaWVYUmxJR0Z5Y21GNVhHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNCcFppQW9RblZtWm1WeUxtbHpRblZtWm1WeUtITjFZbXBsWTNRcEtWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMExuSmxZV1JWU1c1ME9DaHBLVnh1SUNBZ0lDQWdaV3h6WlZ4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCemRXSnFaV04wVzJsZFhHNGdJQ0FnZlZ4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdZblZtTG5keWFYUmxLSE4xWW1wbFkzUXNJREFzSUdWdVkyOWthVzVuS1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpJQ1ltSUNGdWIxcGxjbThwSUh0Y2JpQWdJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2diR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdKMVpsdHBYU0E5SURCY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnWW5WbVhHNTlYRzVjYmk4dklGTlVRVlJKUXlCTlJWUklUMFJUWEc0dkx5QTlQVDA5UFQwOVBUMDlQVDA5UFZ4dVhHNUNkV1ptWlhJdWFYTkZibU52WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2hsYm1OdlpHbHVaeWtnZTF4dUlDQnpkMmwwWTJnZ0tGTjBjbWx1WnlobGJtTnZaR2x1WnlrdWRHOU1iM2RsY2tOaGMyVW9LU2tnZTF4dUlDQWdJR05oYzJVZ0oyaGxlQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0JqWVhObElDZGlhVzVoY25rbk9seHVJQ0FnSUdOaGMyVWdKMkpoYzJVMk5DYzZYRzRnSUNBZ1kyRnpaU0FuY21GM0p6cGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVmNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxtbHpRblZtWm1WeUlEMGdablZ1WTNScGIyNGdLR0lwSUh0Y2JpQWdjbVYwZFhKdUlDRWhLR0lnSVQwOUlHNTFiR3dnSmlZZ1lpQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHSXVYMmx6UW5WbVptVnlLVnh1ZlZ4dVhHNUNkV1ptWlhJdVlubDBaVXhsYm1kMGFDQTlJR1oxYm1OMGFXOXVJQ2h6ZEhJc0lHVnVZMjlrYVc1bktTQjdYRzRnSUhaaGNpQnlaWFJjYmlBZ2MzUnlJRDBnYzNSeUlDc2dKeWRjYmlBZ2MzZHBkR05vSUNobGJtTnZaR2x1WnlCOGZDQW5kWFJtT0NjcElIdGNiaUFnSUNCallYTmxJQ2RvWlhnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnYzNSeUxteGxibWQwYUNBdklESmNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJQ0FnY21WMElEMGdkWFJtT0ZSdlFubDBaWE1vYzNSeUtTNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWVhOamFXa25PbHh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJR0poYzJVMk5GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRXTnpNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRXTnpMVEluT2x4dUlDQWdJR05oYzJVZ0ozVjBaakUyYkdVbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmkweE5teGxKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHZ2dLaUF5WEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdSbFptRjFiSFE2WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMVZ1YTI1dmQyNGdaVzVqYjJScGJtY25LVnh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWFJjYm4xY2JseHVRblZtWm1WeUxtTnZibU5oZENBOUlHWjFibU4wYVc5dUlDaHNhWE4wTENCMGIzUmhiRXhsYm1kMGFDa2dlMXh1SUNCaGMzTmxjblFvYVhOQmNuSmhlU2hzYVhOMEtTd2dKMVZ6WVdkbE9pQkNkV1ptWlhJdVkyOXVZMkYwS0d4cGMzUXNJRnQwYjNSaGJFeGxibWQwYUYwcFhGeHVKeUFyWEc0Z0lDQWdJQ0FuYkdsemRDQnphRzkxYkdRZ1ltVWdZVzRnUVhKeVlYa3VKeWxjYmx4dUlDQnBaaUFvYkdsemRDNXNaVzVuZEdnZ1BUMDlJREFwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdibVYzSUVKMVptWmxjaWd3S1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLR3hwYzNRdWJHVnVaM1JvSUQwOVBTQXhLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHeHBjM1JiTUYxY2JpQWdmVnh1WEc0Z0lIWmhjaUJwWEc0Z0lHbG1JQ2gwZVhCbGIyWWdkRzkwWVd4TVpXNW5kR2dnSVQwOUlDZHVkVzFpWlhJbktTQjdYRzRnSUNBZ2RHOTBZV3hNWlc1bmRHZ2dQU0F3WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHeHBjM1F1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lIUnZkR0ZzVEdWdVozUm9JQ3M5SUd4cGMzUmJhVjB1YkdWdVozUm9YRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdKMVppQTlJRzVsZHlCQ2RXWm1aWElvZEc5MFlXeE1aVzVuZEdncFhHNGdJSFpoY2lCd2IzTWdQU0F3WEc0Z0lHWnZjaUFvYVNBOUlEQTdJR2tnUENCc2FYTjBMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHbDBaVzBnUFNCc2FYTjBXMmxkWEc0Z0lDQWdhWFJsYlM1amIzQjVLR0oxWml3Z2NHOXpLVnh1SUNBZ0lIQnZjeUFyUFNCcGRHVnRMbXhsYm1kMGFGeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCaWRXWmNibjFjYmx4dUx5OGdRbFZHUmtWU0lFbE9VMVJCVGtORklFMUZWRWhQUkZOY2JpOHZJRDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibVoxYm1OMGFXOXVJRjlvWlhoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJRzltWm5ObGRDQTlJRTUxYldKbGNpaHZabVp6WlhRcElIeDhJREJjYmlBZ2RtRnlJSEpsYldGcGJtbHVaeUE5SUdKMVppNXNaVzVuZEdnZ0xTQnZabVp6WlhSY2JpQWdhV1lnS0NGc1pXNW5kR2dwSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0J5WlcxaGFXNXBibWRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0JPZFcxaVpYSW9iR1Z1WjNSb0tWeHVJQ0FnSUdsbUlDaHNaVzVuZEdnZ1BpQnlaVzFoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSEpsYldGcGJtbHVaMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUcxMWMzUWdZbVVnWVc0Z1pYWmxiaUJ1ZFcxaVpYSWdiMllnWkdsbmFYUnpYRzRnSUhaaGNpQnpkSEpNWlc0Z1BTQnpkSEpwYm1jdWJHVnVaM1JvWEc0Z0lHRnpjMlZ5ZENoemRISk1aVzRnSlNBeUlEMDlQU0F3TENBblNXNTJZV3hwWkNCb1pYZ2djM1J5YVc1bkp5bGNibHh1SUNCcFppQW9iR1Z1WjNSb0lENGdjM1J5VEdWdUlDOGdNaWtnZTF4dUlDQWdJR3hsYm1kMGFDQTlJSE4wY2t4bGJpQXZJREpjYmlBZ2ZWeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0o1ZEdVZ1BTQndZWEp6WlVsdWRDaHpkSEpwYm1jdWMzVmljM1J5S0drZ0tpQXlMQ0F5S1N3Z01UWXBYRzRnSUNBZ1lYTnpaWEowS0NGcGMwNWhUaWhpZVhSbEtTd2dKMGx1ZG1Gc2FXUWdhR1Y0SUhOMGNtbHVaeWNwWEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMGdZbmwwWlZ4dUlDQjlYRzRnSUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMGdhU0FxSURKY2JpQWdjbVYwZFhKdUlHbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaamhYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZNFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjloYzJOcGFWZHlhWFJsSUNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlHTm9ZWEp6VjNKcGRIUmxiaUE5SUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMWNiaUFnSUNCaWJHbDBRblZtWm1WeUtHRnpZMmxwVkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsWGNtbDBaU2hpZFdZc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpWVhObE5qUlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaGlZWE5sTmpSVWIwSjVkR1Z6S0hOMGNtbHVaeWtzSUdKMVppd2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJSEpsZEhWeWJpQmphR0Z5YzFkeWFYUjBaVzVjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpFMmJHVlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaDFkR1l4Tm14bFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdVZ1BTQm1kVzVqZEdsdmJpQW9jM1J5YVc1bkxDQnZabVp6WlhRc0lHeGxibWQwYUN3Z1pXNWpiMlJwYm1jcElIdGNiaUFnTHk4Z1UzVndjRzl5ZENCaWIzUm9JQ2h6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0xDQmxibU52WkdsdVp5bGNiaUFnTHk4Z1lXNWtJSFJvWlNCc1pXZGhZM2tnS0hOMGNtbHVaeXdnWlc1amIyUnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCcFppQW9hWE5HYVc1cGRHVW9iMlptYzJWMEtTa2dlMXh1SUNBZ0lHbG1JQ2doYVhOR2FXNXBkR1VvYkdWdVozUm9LU2tnZTF4dUlDQWdJQ0FnWlc1amIyUnBibWNnUFNCc1pXNW5kR2hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHNnSUM4dklHeGxaMkZqZVZ4dUlDQWdJSFpoY2lCemQyRndJRDBnWlc1amIyUnBibWRjYmlBZ0lDQmxibU52WkdsdVp5QTlJRzltWm5ObGRGeHVJQ0FnSUc5bVpuTmxkQ0E5SUd4bGJtZDBhRnh1SUNBZ0lHeGxibWQwYUNBOUlITjNZWEJjYmlBZ2ZWeHVYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlIUm9hWE11YkdWdVozUm9JQzBnYjJabWMyVjBYRzRnSUdsbUlDZ2hiR1Z1WjNSb0tTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ2NtVnRZV2x1YVc1blhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ1RuVnRZbVZ5S0d4bGJtZDBhQ2xjYmlBZ0lDQnBaaUFvYkdWdVozUm9JRDRnY21WdFlXbHVhVzVuS1NCN1hHNGdJQ0FnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdJQ0I5WEc0Z0lIMWNiaUFnWlc1amIyUnBibWNnUFNCVGRISnBibWNvWlc1amIyUnBibWNnZkh3Z0ozVjBaamduS1M1MGIweHZkMlZ5UTJGelpTZ3BYRzVjYmlBZ2RtRnlJSEpsZEZ4dUlDQnpkMmwwWTJnZ0tHVnVZMjlrYVc1bktTQjdYRzRnSUNBZ1kyRnpaU0FuYUdWNEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5b1pYaFhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVmR5YVhSbEtIUm9hWE1zSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmWW1sdVlYSjVWM0pwZEdVb2RHaHBjeXdnYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RWYm10dWIzZHVJR1Z1WTI5a2FXNW5KeWxjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY2dQU0JtZFc1amRHbHZiaUFvWlc1amIyUnBibWNzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpYRzVjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc0Z0lITjBZWEowSUQwZ1RuVnRZbVZ5S0hOMFlYSjBLU0I4ZkNBd1hHNGdJR1Z1WkNBOUlDaGxibVFnSVQwOUlIVnVaR1ZtYVc1bFpDbGNiaUFnSUNBL0lFNTFiV0psY2lobGJtUXBYRzRnSUNBZ09pQmxibVFnUFNCelpXeG1MbXhsYm1kMGFGeHVYRzRnSUM4dklFWmhjM1J3WVhSb0lHVnRjSFI1SUhOMGNtbHVaM05jYmlBZ2FXWWdLR1Z1WkNBOVBUMGdjM1JoY25RcFhHNGdJQ0FnY21WMGRYSnVJQ2NuWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZOc2FXTmxLSE5sYkdZc0lITjBZWEowTENCbGJtUXBYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjloYzJOcGFWTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VTJ4cFkyVW9jMlZzWml3Z2MzUmhjblFzSUdWdVpDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBJRDBnWDNWMFpqRTJiR1ZUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5S1UwOU9JRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lIUjVjR1U2SUNkQ2RXWm1aWEluTEZ4dUlDQWdJR1JoZEdFNklFRnljbUY1TG5CeWIzUnZkSGx3WlM1emJHbGpaUzVqWVd4c0tIUm9hWE11WDJGeWNpQjhmQ0IwYUdsekxDQXdLVnh1SUNCOVhHNTlYRzVjYmk4dklHTnZjSGtvZEdGeVoyVjBRblZtWm1WeUxDQjBZWEpuWlhSVGRHRnlkRDB3TENCemIzVnlZMlZUZEdGeWREMHdMQ0J6YjNWeVkyVkZibVE5WW5WbVptVnlMbXhsYm1kMGFDbGNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVZMjl3ZVNBOUlHWjFibU4wYVc5dUlDaDBZWEpuWlhRc0lIUmhjbWRsZEY5emRHRnlkQ3dnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ2MyOTFjbU5sSUQwZ2RHaHBjMXh1WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNBbUppQmxibVFnSVQwOUlEQXBJR1Z1WkNBOUlIUm9hWE11YkdWdVozUm9YRzRnSUdsbUlDZ2hkR0Z5WjJWMFgzTjBZWEowS1NCMFlYSm5aWFJmYzNSaGNuUWdQU0F3WEc1Y2JpQWdMeThnUTI5d2VTQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdnZ1BUMDlJREFnZkh3Z2MyOTFjbU5sTG14bGJtZDBhQ0E5UFQwZ01Da2djbVYwZFhKdVhHNWNiaUFnTHk4Z1JtRjBZV3dnWlhKeWIzSWdZMjl1WkdsMGFXOXVjMXh1SUNCaGMzTmxjblFvWlc1a0lENDlJSE4wWVhKMExDQW5jMjkxY21ObFJXNWtJRHdnYzI5MWNtTmxVM1JoY25RbktWeHVJQ0JoYzNObGNuUW9kR0Z5WjJWMFgzTjBZWEowSUQ0OUlEQWdKaVlnZEdGeVoyVjBYM04wWVhKMElEd2dkR0Z5WjJWMExteGxibWQwYUN4Y2JpQWdJQ0FnSUNkMFlYSm5aWFJUZEdGeWRDQnZkWFFnYjJZZ1ltOTFibVJ6SnlsY2JpQWdZWE56WlhKMEtITjBZWEowSUQ0OUlEQWdKaVlnYzNSaGNuUWdQQ0J6YjNWeVkyVXViR1Z1WjNSb0xDQW5jMjkxY21ObFUzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnYzI5MWNtTmxMbXhsYm1kMGFDd2dKM052ZFhKalpVVnVaQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNibHh1SUNBdkx5QkJjbVVnZDJVZ2IyOWlQMXh1SUNCcFppQW9aVzVrSUQ0Z2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dMU0IwWVhKblpYUmZjM1JoY25RZ1BDQmxibVFnTFNCemRHRnlkQ2xjYmlBZ0lDQmxibVFnUFNCMFlYSm5aWFF1YkdWdVozUm9JQzBnZEdGeVoyVjBYM04wWVhKMElDc2djM1JoY25SY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWlc1a0lDMGdjM1JoY25SY2JseHVJQ0JwWmlBb2JHVnVJRHdnTVRBd0lIeDhJQ0ZDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5bGNiaUFnSUNBZ0lIUmhjbWRsZEZ0cElDc2dkR0Z5WjJWMFgzTjBZWEowWFNBOUlIUm9hWE5iYVNBcklITjBZWEowWFZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhSaGNtZGxkQzVmYzJWMEtIUm9hWE11YzNWaVlYSnlZWGtvYzNSaGNuUXNJSE4wWVhKMElDc2diR1Z1S1N3Z2RHRnlaMlYwWDNOMFlYSjBLVnh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUdsbUlDaHpkR0Z5ZENBOVBUMGdNQ0FtSmlCbGJtUWdQVDA5SUdKMVppNXNaVzVuZEdncElIdGNiaUFnSUNCeVpYUjFjbTRnWW1GelpUWTBMbVp5YjIxQ2VYUmxRWEp5WVhrb1luVm1LVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQmlZWE5sTmpRdVpuSnZiVUo1ZEdWQmNuSmhlU2hpZFdZdWMyeHBZMlVvYzNSaGNuUXNJR1Z1WkNrcFhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhNZ1BTQW5KMXh1SUNCMllYSWdkRzF3SUQwZ0p5ZGNiaUFnWlc1a0lEMGdUV0YwYUM1dGFXNG9ZblZtTG14bGJtZDBhQ3dnWlc1a0tWeHVYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0dKMVpsdHBYU0E4UFNBd2VEZEdLU0I3WEc0Z0lDQWdJQ0J5WlhNZ0t6MGdaR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLU0FySUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQWdJQ0FnZEcxd0lEMGdKeWRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RHMXdJQ3M5SUNjbEp5QXJJR0oxWmx0cFhTNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdjbVZ6SUNzZ1pHVmpiMlJsVlhSbU9FTm9ZWElvZEcxd0tWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZllYTmphV2xUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnlaWFFnUFNBbkoxeHVJQ0JsYm1RZ1BTQk5ZWFJvTG0xcGJpaGlkV1l1YkdWdVozUm9MQ0JsYm1RcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BYRzRnSUNBZ2NtVjBJQ3M5SUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lISmxkSFZ5YmlCZllYTmphV2xUYkdsalpTaGlkV1lzSUhOMFlYSjBMQ0JsYm1RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc1Y2JpQWdhV1lnS0NGemRHRnlkQ0I4ZkNCemRHRnlkQ0E4SURBcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ0I4ZkNCbGJtUWdQQ0F3SUh4OElHVnVaQ0ErSUd4bGJpa2daVzVrSUQwZ2JHVnVYRzVjYmlBZ2RtRnlJRzkxZENBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdiM1YwSUNzOUlIUnZTR1Y0S0dKMVpsdHBYU2xjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdiM1YwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkxZEdZeE5teGxVMnhwWTJVZ0tHSjFaaXdnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ1lubDBaWE1nUFNCaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDbGNiaUFnZG1GeUlISmxjeUE5SUNjblhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnWW5sMFpYTXViR1Z1WjNSb095QnBJQ3M5SURJcElIdGNiaUFnSUNCeVpYTWdLejBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlNoaWVYUmxjMXRwWFNBcklHSjVkR1Z6VzJrck1WMGdLaUF5TlRZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMxeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5Oc2FXTmxJRDBnWm5WdVkzUnBiMjRnS0hOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlHeGxiaUE5SUhSb2FYTXViR1Z1WjNSb1hHNGdJSE4wWVhKMElEMGdZMnhoYlhBb2MzUmhjblFzSUd4bGJpd2dNQ2xjYmlBZ1pXNWtJRDBnWTJ4aGJYQW9aVzVrTENCc1pXNHNJR3hsYmlsY2JseHVJQ0JwWmlBb1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQkNkV1ptWlhJdVgyRjFaMjFsYm5Rb2RHaHBjeTV6ZFdKaGNuSmhlU2h6ZEdGeWRDd2daVzVrS1NsY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllYSWdjMnhwWTJWTVpXNGdQU0JsYm1RZ0xTQnpkR0Z5ZEZ4dUlDQWdJSFpoY2lCdVpYZENkV1lnUFNCdVpYY2dRblZtWm1WeUtITnNhV05sVEdWdUxDQjFibVJsWm1sdVpXUXNJSFJ5ZFdVcFhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemJHbGpaVXhsYmpzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0J1WlhkQ2RXWmJhVjBnUFNCMGFHbHpXMmtnS3lCemRHRnlkRjFjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUc1bGQwSjFabHh1SUNCOVhHNTlYRzVjYmk4dklHQm5aWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtZGxkQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvSnk1blpYUW9LU0JwY3lCa1pYQnlaV05oZEdWa0xpQkJZMk5sYzNNZ2RYTnBibWNnWVhKeVlYa2dhVzVrWlhobGN5QnBibk4wWldGa0xpY3BYRzRnSUhKbGRIVnliaUIwYUdsekxuSmxZV1JWU1c1ME9DaHZabVp6WlhRcFhHNTlYRzVjYmk4dklHQnpaWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTmxkQ0E5SUdaMWJtTjBhVzl1SUNoMkxDQnZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NXpaWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbmR5YVhSbFZVbHVkRGdvZGl3Z2IyWm1jMlYwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdjbVYwZFhKdUlIUm9hWE5iYjJabWMyVjBYVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkZWSmJuUXhOaUFvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeElEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUhaaGNpQjJZV3hjYmlBZ2FXWWdLR3hwZEhSc1pVVnVaR2xoYmlrZ2UxeHVJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURFZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURGZElEdzhJRGhjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IyWVd3Z1BTQmlkV1piYjJabWMyVjBYU0E4UENBNFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME1UWk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXhOaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzSmxZV1JWU1c1ME16SWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTXlBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNYRzRnSUdsbUlDaHNhWFIwYkdWRmJtUnBZVzRwSUh0Y2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ01pQThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFFnS3lBeVhTQThQQ0F4Tmx4dUlDQWdJR2xtSUNodlptWnpaWFFnS3lBeElEd2diR1Z1S1Z4dUlDQWdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFFnS3lBeFhTQThQQ0E0WEc0Z0lDQWdkbUZzSUh3OUlHSjFabHR2Wm1aelpYUmRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRE1nUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZENBcklETmRJRHc4SURJMElENCtQaUF3S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURFMlhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklESWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklESmRJRHc4SURoY2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ015QThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQjhQU0JpZFdaYmIyWm1jMlYwSUNzZ00xMWNiaUFnSUNCMllXd2dQU0IyWVd3Z0t5QW9ZblZtVzI5bVpuTmxkRjBnUER3Z01qUWdQajQrSURBcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5Rek1paDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xGeHVJQ0FnSUNBZ0lDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUc1bFp5QTlJSFJvYVhOYmIyWm1jMlYwWFNBbUlEQjRPREJjYmlBZ2FXWWdLRzVsWnlsY2JpQWdJQ0J5WlhSMWNtNGdLREI0Wm1ZZ0xTQjBhR2x6VzI5bVpuTmxkRjBnS3lBeEtTQXFJQzB4WEc0Z0lHVnNjMlZjYmlBZ0lDQnlaWFIxY200Z2RHaHBjMXR2Wm1aelpYUmRYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrU1c1ME1UWWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTVNBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNJRDBnWDNKbFlXUlZTVzUwTVRZb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2RISjFaU2xjYmlBZ2RtRnlJRzVsWnlBOUlIWmhiQ0FtSURCNE9EQXdNRnh1SUNCcFppQW9ibVZuS1Z4dUlDQWdJSEpsZEhWeWJpQW9NSGhtWm1abUlDMGdkbUZzSUNzZ01Ta2dLaUF0TVZ4dUlDQmxiSE5sWEc0Z0lDQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JKYm5ReE5reEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrU1c1ME1UWW9kR2hwY3l3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME1UWkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkVsdWRERTJLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpFbHVkRE15SUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklETWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklISmxZV1FnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2RtRnlJSFpoYkNBOUlGOXlaV0ZrVlVsdWRETXlLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJSFJ5ZFdVcFhHNGdJSFpoY2lCdVpXY2dQU0IyWVd3Z0ppQXdlRGd3TURBd01EQXdYRzRnSUdsbUlDaHVaV2NwWEc0Z0lDQWdjbVYwZFhKdUlDZ3dlR1ptWm1abVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXpNa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNeklvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkRE15S0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRVpzYjJGMElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z01qTXNJRFFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVac2IyRjBURVVnUFNCbWRXNWpkR2x2YmlBb2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0J5WlhSMWNtNGdYM0psWVdSR2JHOWhkQ2gwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSR2JHOWhkRUpGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JteHZZWFFvZEdocGN5d2diMlptYzJWMExDQm1ZV3h6WlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5eVpXRmtSRzkxWW14bElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUEzSUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z05USXNJRGdwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JHOTFZbXhsS0hSb2FYTXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsVlVsdWREZ2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJRHdnZEdocGN5NXNaVzVuZEdnc0lDZDBjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtZFdsdWRDaDJZV3gxWlN3Z01IaG1aaWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwSUhKbGRIVnlibHh1WEc0Z0lIUm9hWE5iYjJabWMyVjBYU0E5SUhaaGJIVmxYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXhOaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVlwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2dhaUE5SUUxaGRHZ3ViV2x1S0d4bGJpQXRJRzltWm5ObGRDd2dNaWs3SUdrZ1BDQnFPeUJwS3lzcElIdGNiaUFnSUNCaWRXWmJiMlptYzJWMElDc2dhVjBnUFZ4dUlDQWdJQ0FnSUNBb2RtRnNkV1VnSmlBb01IaG1aaUE4UENBb09DQXFJQ2hzYVhSMGJHVkZibVJwWVc0Z1B5QnBJRG9nTVNBdElHa3BLU2twSUQ0K1BseHVJQ0FnSUNBZ0lDQWdJQ0FnS0d4cGRIUnNaVVZ1WkdsaGJpQS9JR2tnT2lBeElDMGdhU2tnS2lBNFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpWVkpiblF4TmloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXpNaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVptWm1abUtWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUdvZ1BTQk5ZWFJvTG0xcGJpaHNaVzRnTFNCdlptWnpaWFFzSURRcE95QnBJRHdnYWpzZ2FTc3JLU0I3WEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMWNiaUFnSUNBZ0lDQWdLSFpoYkhWbElENCtQaUFvYkdsMGRHeGxSVzVrYVdGdUlEOGdhU0E2SURNZ0xTQnBLU0FxSURncElDWWdNSGhtWmx4dUlDQjlYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWVlNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxTVzUwT0NBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWnphVzUwS0haaGJIVmxMQ0F3ZURkbUxDQXRNSGc0TUNsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2FXWWdLSFpoYkhWbElENDlJREFwWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtEQjRabVlnS3lCMllXeDFaU0FySURFc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVWx1ZERFMklDaGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QjJZV3gxWlNjcFhHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ2Wm1aelpYUWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JRzltWm5ObGRDY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FySURFZ1BDQmlkV1l1YkdWdVozUm9MQ0FuVkhKNWFXNW5JSFJ2SUhkeWFYUmxJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdJQ0IyWlhKcFpuTnBiblFvZG1Gc2RXVXNJREI0TjJabVppd2dMVEI0T0RBd01DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbG1JQ2gyWVd4MVpTQStQU0F3S1Z4dUlDQWdJRjkzY21sMFpWVkpiblF4TmloaWRXWXNJSFpoYkhWbExDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwWEc0Z0lHVnNjMlZjYmlBZ0lDQmZkM0pwZEdWVlNXNTBNVFlvWW5WbUxDQXdlR1ptWm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkREUyVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTVRZb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVWx1ZERFMktIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzZHlhWFJsU1c1ME16SWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1jMmx1ZENoMllXeDFaU3dnTUhnM1ptWm1abVptWml3Z0xUQjRPREF3TURBd01EQXBYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQnBaaUFvZG1Gc2RXVWdQajBnTUNsY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTXpJb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdYM2R5YVhSbFZVbHVkRE15S0dKMVppd2dNSGhtWm1abVptWm1aaUFySUhaaGJIVmxJQ3NnTVN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWSmJuUXpNaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVsdWRETXlRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmZDNKcGRHVkdiRzloZENBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaSlJVVkZOelUwS0haaGJIVmxMQ0F6TGpRd01qZ3lNelEyTmpNNE5USTRPRFpsS3pNNExDQXRNeTQwTURJNE1qTTBOall6T0RVeU9EZzJaU3N6T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lESXpMQ0EwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJteHZZWFJNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkdiRzloZENoMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVWnNiMkYwUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSbXh2WVhRb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZFYjNWaWJHVWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ055QThJR0oxWmk1c1pXNW5kR2dzWEc0Z0lDQWdJQ0FnSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1TVVZGUlRjMU5DaDJZV3gxWlN3Z01TNDNPVGMyT1RNeE16UTROakl6TVRVM1JTc3pNRGdzSUMweExqYzVOelk1TXpFek5EZzJNak14TlRkRkt6TXdPQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xsWldVM05UUXVkM0pwZEdVb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSURVeUxDQTRLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUkc5MVlteGxURVVnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJHOTFZbXhsS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dUx5OGdabWxzYkNoMllXeDFaU3dnYzNSaGNuUTlNQ3dnWlc1a1BXSjFabVpsY2k1c1pXNW5kR2dwWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1acGJHd2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdhV1lnS0NGMllXeDFaU2tnZG1Gc2RXVWdQU0F3WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNrZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JseHVJQ0JwWmlBb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhaaGJIVmxJRDBnZG1Gc2RXVXVZMmhoY2tOdlpHVkJkQ2d3S1Z4dUlDQjlYRzVjYmlBZ1lYTnpaWEowS0hSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI1MWJXSmxjaWNnSmlZZ0lXbHpUbUZPS0haaGJIVmxLU3dnSjNaaGJIVmxJR2x6SUc1dmRDQmhJRzUxYldKbGNpY3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdjM1JoY25Rc0lDZGxibVFnUENCemRHRnlkQ2NwWEc1Y2JpQWdMeThnUm1sc2JDQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJvYVhNdWJHVnVaM1JvSUQwOVBTQXdLU0J5WlhSMWNtNWNibHh1SUNCaGMzTmxjblFvYzNSaGNuUWdQajBnTUNBbUppQnpkR0Z5ZENBOElIUm9hWE11YkdWdVozUm9MQ0FuYzNSaGNuUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ01DQW1KaUJsYm1RZ1BEMGdkR2hwY3k1c1pXNW5kR2dzSUNkbGJtUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BJSHRjYmlBZ0lDQjBhR2x6VzJsZElEMGdkbUZzZFdWY2JpQWdmVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtbHVjM0JsWTNRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lIWmhjaUJ2ZFhRZ1BTQmJYVnh1SUNCMllYSWdiR1Z1SUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc1pXNDdJR2tyS3lrZ2UxeHVJQ0FnSUc5MWRGdHBYU0E5SUhSdlNHVjRLSFJvYVhOYmFWMHBYRzRnSUNBZ2FXWWdLR2tnUFQwOUlHVjRjRzl5ZEhNdVNVNVRVRVZEVkY5TlFWaGZRbGxVUlZNcElIdGNiaUFnSUNBZ0lHOTFkRnRwSUNzZ01WMGdQU0FuTGk0dUoxeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlDYzhRblZtWm1WeUlDY2dLeUJ2ZFhRdWFtOXBiaWduSUNjcElDc2dKejRuWEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJRzVsZHlCZ1FYSnlZWGxDZFdabVpYSmdJSGRwZEdnZ2RHaGxJQ3BqYjNCcFpXUXFJRzFsYlc5eWVTQnZaaUIwYUdVZ1luVm1abVZ5SUdsdWMzUmhibU5sTGx4dUlDb2dRV1JrWldRZ2FXNGdUbTlrWlNBd0xqRXlMaUJQYm14NUlHRjJZV2xzWVdKc1pTQnBiaUJpY205M2MyVnljeUIwYUdGMElITjFjSEJ2Y25RZ1FYSnlZWGxDZFdabVpYSXVYRzRnS2k5Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUJjbkpoZVVKMVptWmxjaUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCVmFXNTBPRUZ5Y21GNUlDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ2UxeHVJQ0FnSUdsbUlDaENkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6S1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnS0c1bGR5QkNkV1ptWlhJb2RHaHBjeWtwTG1KMVptWmxjbHh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMllYSWdZblZtSUQwZ2JtVjNJRlZwYm5RNFFYSnlZWGtvZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdZblZtTG14bGJtZDBhRHNnYVNBOElHeGxianNnYVNBclBTQXhLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0IwYUdselcybGRYRzRnSUNBZ0lDQnlaWFIxY200Z1luVm1MbUoxWm1abGNseHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjBKMVptWmxjaTUwYjBGeWNtRjVRblZtWm1WeUlHNXZkQ0J6ZFhCd2IzSjBaV1FnYVc0Z2RHaHBjeUJpY205M2MyVnlKeWxjYmlBZ2ZWeHVmVnh1WEc0dkx5QklSVXhRUlZJZ1JsVk9RMVJKVDA1VFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUhOMGNtbHVaM1J5YVcwZ0tITjBjaWtnZTF4dUlDQnBaaUFvYzNSeUxuUnlhVzBwSUhKbGRIVnliaUJ6ZEhJdWRISnBiU2dwWEc0Z0lISmxkSFZ5YmlCemRISXVjbVZ3YkdGalpTZ3ZYbHhjY3l0OFhGeHpLeVF2Wnl3Z0p5Y3BYRzU5WEc1Y2JuWmhjaUJDVUNBOUlFSjFabVpsY2k1d2NtOTBiM1I1Y0dWY2JseHVMeW9xWEc0Z0tpQkJkV2R0Wlc1MElHRWdWV2x1ZERoQmNuSmhlU0FxYVc1emRHRnVZMlVxSUNodWIzUWdkR2hsSUZWcGJuUTRRWEp5WVhrZ1kyeGhjM01oS1NCM2FYUm9JRUoxWm1abGNpQnRaWFJvYjJSelhHNGdLaTljYmtKMVptWmxjaTVmWVhWbmJXVnVkQ0E5SUdaMWJtTjBhVzl1SUNoaGNuSXBJSHRjYmlBZ1lYSnlMbDlwYzBKMVptWmxjaUE5SUhSeWRXVmNibHh1SUNBdkx5QnpZWFpsSUhKbFptVnlaVzVqWlNCMGJ5QnZjbWxuYVc1aGJDQlZhVzUwT0VGeWNtRjVJR2RsZEM5elpYUWdiV1YwYUc5a2N5QmlaV1p2Y21VZ2IzWmxjbmR5YVhScGJtZGNiaUFnWVhKeUxsOW5aWFFnUFNCaGNuSXVaMlYwWEc0Z0lHRnljaTVmYzJWMElEMGdZWEp5TG5ObGRGeHVYRzRnSUM4dklHUmxjSEpsWTJGMFpXUXNJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJ1YjJSbElEQXVNVE1yWEc0Z0lHRnljaTVuWlhRZ1BTQkNVQzVuWlhSY2JpQWdZWEp5TG5ObGRDQTlJRUpRTG5ObGRGeHVYRzRnSUdGeWNpNTNjbWwwWlNBOUlFSlFMbmR5YVhSbFhHNGdJR0Z5Y2k1MGIxTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHh2WTJGc1pWTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHBUVDA0Z1BTQkNVQzUwYjBwVFQwNWNiaUFnWVhKeUxtTnZjSGtnUFNCQ1VDNWpiM0I1WEc0Z0lHRnljaTV6YkdsalpTQTlJRUpRTG5Oc2FXTmxYRzRnSUdGeWNpNXlaV0ZrVlVsdWREZ2dQU0JDVUM1eVpXRmtWVWx1ZERoY2JpQWdZWEp5TG5KbFlXUlZTVzUwTVRaTVJTQTlJRUpRTG5KbFlXUlZTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRlZKYm5ReE5rSkZJRDBnUWxBdWNtVmhaRlZKYm5ReE5rSkZYRzRnSUdGeWNpNXlaV0ZrVlVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrVlVsdWRETXlURVZjYmlBZ1lYSnlMbkpsWVdSVlNXNTBNekpDUlNBOUlFSlFMbkpsWVdSVlNXNTBNekpDUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRGdnUFNCQ1VDNXlaV0ZrU1c1ME9GeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlRFVWdQU0JDVUM1eVpXRmtTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlFrVWdQU0JDVUM1eVpXRmtTVzUwTVRaQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVRFVWdQU0JDVUM1eVpXRmtTVzUwTXpKTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVFrVWdQU0JDVUM1eVpXRmtTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFRFVWdQU0JDVUM1eVpXRmtSbXh2WVhSTVJWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFFrVWdQU0JDVUM1eVpXRmtSbXh2WVhSQ1JWeHVJQ0JoY25JdWNtVmhaRVJ2ZFdKc1pVeEZJRDBnUWxBdWNtVmhaRVJ2ZFdKc1pVeEZYRzRnSUdGeWNpNXlaV0ZrUkc5MVlteGxRa1VnUFNCQ1VDNXlaV0ZrUkc5MVlteGxRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRGdnUFNCQ1VDNTNjbWwwWlZWSmJuUTRYRzRnSUdGeWNpNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1FsQXVkM0pwZEdWVlNXNTBNVFpNUlZ4dUlDQmhjbkl1ZDNKcGRHVlZTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxWVWx1ZERFMlFrVmNiaUFnWVhKeUxuZHlhWFJsVlVsdWRETXlURVVnUFNCQ1VDNTNjbWwwWlZWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpWVkpiblF6TWtKRklEMGdRbEF1ZDNKcGRHVlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5RNElEMGdRbEF1ZDNKcGRHVkpiblE0WEc0Z0lHRnljaTUzY21sMFpVbHVkREUyVEVVZ1BTQkNVQzUzY21sMFpVbHVkREUyVEVWY2JpQWdZWEp5TG5keWFYUmxTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxTVzUwTVRaQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5Rek1reEZJRDBnUWxBdWQzSnBkR1ZKYm5Rek1reEZYRzRnSUdGeWNpNTNjbWwwWlVsdWRETXlRa1VnUFNCQ1VDNTNjbWwwWlVsdWRETXlRa1ZjYmlBZ1lYSnlMbmR5YVhSbFJteHZZWFJNUlNBOUlFSlFMbmR5YVhSbFJteHZZWFJNUlZ4dUlDQmhjbkl1ZDNKcGRHVkdiRzloZEVKRklEMGdRbEF1ZDNKcGRHVkdiRzloZEVKRlhHNGdJR0Z5Y2k1M2NtbDBaVVJ2ZFdKc1pVeEZJRDBnUWxBdWQzSnBkR1ZFYjNWaWJHVk1SVnh1SUNCaGNuSXVkM0pwZEdWRWIzVmliR1ZDUlNBOUlFSlFMbmR5YVhSbFJHOTFZbXhsUWtWY2JpQWdZWEp5TG1acGJHd2dQU0JDVUM1bWFXeHNYRzRnSUdGeWNpNXBibk53WldOMElEMGdRbEF1YVc1emNHVmpkRnh1SUNCaGNuSXVkRzlCY25KaGVVSjFabVpsY2lBOUlFSlFMblJ2UVhKeVlYbENkV1ptWlhKY2JseHVJQ0J5WlhSMWNtNGdZWEp5WEc1OVhHNWNiaTh2SUhOc2FXTmxLSE4wWVhKMExDQmxibVFwWEc1bWRXNWpkR2x2YmlCamJHRnRjQ0FvYVc1a1pYZ3NJR3hsYml3Z1pHVm1ZWFZzZEZaaGJIVmxLU0I3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdhVzVrWlhnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0J5WlhSMWNtNGdaR1ZtWVhWc2RGWmhiSFZsWEc0Z0lHbHVaR1Y0SUQwZ2ZuNXBibVJsZURzZ0lDOHZJRU52WlhKalpTQjBieUJwYm5SbFoyVnlMbHh1SUNCcFppQW9hVzVrWlhnZ1BqMGdiR1Z1S1NCeVpYUjFjbTRnYkdWdVhHNGdJR2xtSUNocGJtUmxlQ0ErUFNBd0tTQnlaWFIxY200Z2FXNWtaWGhjYmlBZ2FXNWtaWGdnS3owZ2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdjbVYwZFhKdUlEQmNibjFjYmx4dVpuVnVZM1JwYjI0Z1kyOWxjbU5sSUNoc1pXNW5kR2dwSUh0Y2JpQWdMeThnUTI5bGNtTmxJR3hsYm1kMGFDQjBieUJoSUc1MWJXSmxjaUFvY0c5emMybGliSGtnVG1GT0tTd2djbTkxYm1RZ2RYQmNiaUFnTHk4Z2FXNGdZMkZ6WlNCcGRDZHpJR1p5WVdOMGFXOXVZV3dnS0dVdVp5NGdNVEl6TGpRMU5pa2dkR2hsYmlCa2J5QmhYRzRnSUM4dklHUnZkV0pzWlNCdVpXZGhkR1VnZEc4Z1kyOWxjbU5sSUdFZ1RtRk9JSFJ2SURBdUlFVmhjM2tzSUhKcFoyaDBQMXh1SUNCc1pXNW5kR2dnUFNCK2ZrMWhkR2d1WTJWcGJDZ3JiR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdiR1Z1WjNSb0lEd2dNQ0EvSURBZ09pQnNaVzVuZEdoY2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQmNuSmhlU0FvYzNWaWFtVmpkQ2tnZTF4dUlDQnlaWFIxY200Z0tFRnljbUY1TG1selFYSnlZWGtnZkh3Z1puVnVZM1JwYjI0Z0tITjFZbXBsWTNRcElIdGNiaUFnSUNCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tITjFZbXBsWTNRcElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5YRzRnSUgwcEtITjFZbXBsWTNRcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUdselFYSnlZWGxwYzJnZ0tITjFZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR2x6UVhKeVlYa29jM1ZpYW1WamRDa2dmSHdnUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBJSHg4WEc0Z0lDQWdJQ0J6ZFdKcVpXTjBJQ1ltSUhSNWNHVnZaaUJ6ZFdKcVpXTjBJRDA5UFNBbmIySnFaV04wSnlBbUpseHVJQ0FnSUNBZ2RIbHdaVzltSUhOMVltcGxZM1F1YkdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SjF4dWZWeHVYRzVtZFc1amRHbHZiaUIwYjBobGVDQW9iaWtnZTF4dUlDQnBaaUFvYmlBOElERTJLU0J5WlhSMWNtNGdKekFuSUNzZ2JpNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ2NtVjBkWEp1SUc0dWRHOVRkSEpwYm1jb01UWXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVjBaamhVYjBKNWRHVnpJQ2h6ZEhJcElIdGNiaUFnZG1GeUlHSjVkR1ZCY25KaGVTQTlJRnRkWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2djM1J5TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0lnUFNCemRISXVZMmhoY2tOdlpHVkJkQ2hwS1Z4dUlDQWdJR2xtSUNoaUlEdzlJREI0TjBZcFhHNGdJQ0FnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2h6ZEhJdVkyaGhja052WkdWQmRDaHBLU2xjYmlBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUhaaGNpQnpkR0Z5ZENBOUlHbGNiaUFnSUNBZ0lHbG1JQ2hpSUQ0OUlEQjRSRGd3TUNBbUppQmlJRHc5SURCNFJFWkdSaWtnYVNzclhHNGdJQ0FnSUNCMllYSWdhQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISXVjMnhwWTJVb2MzUmhjblFzSUdrck1Ta3BMbk4xWW5OMGNpZ3hLUzV6Y0d4cGRDZ25KU2NwWEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJxSUQwZ01Ec2dhaUE4SUdndWJHVnVaM1JvT3lCcUt5c3BYRzRnSUNBZ0lDQWdJR0o1ZEdWQmNuSmhlUzV3ZFhOb0tIQmhjbk5sU1c1MEtHaGJhbDBzSURFMktTbGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzJOcGFWUnZRbmwwWlhNZ0tITjBjaWtnZTF4dUlDQjJZWElnWW5sMFpVRnljbUY1SUQwZ1cxMWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemRISXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0F2THlCT2IyUmxKM01nWTI5a1pTQnpaV1Z0Y3lCMGJ5QmlaU0JrYjJsdVp5QjBhR2x6SUdGdVpDQnViM1FnSmlBd2VEZEdMaTVjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NBbUlEQjRSa1lwWEc0Z0lIMWNiaUFnY21WMGRYSnVJR0o1ZEdWQmNuSmhlVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFkR1l4Tm14bFZHOUNlWFJsY3lBb2MzUnlLU0I3WEc0Z0lIWmhjaUJqTENCb2FTd2diRzljYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdZeUE5SUhOMGNpNWphR0Z5UTI5a1pVRjBLR2twWEc0Z0lDQWdhR2tnUFNCaklENCtJRGhjYmlBZ0lDQnNieUE5SUdNZ0pTQXlOVFpjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoc2J5bGNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2hvYVNsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCaWVYUmxRWEp5WVhsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWW1GelpUWTBWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSEpsZEhWeWJpQmlZWE5sTmpRdWRHOUNlWFJsUVhKeVlYa29jM1J5S1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJpYkdsMFFuVm1abVZ5SUNoemNtTXNJR1J6ZEN3Z2IyWm1jMlYwTENCc1pXNW5kR2dwSUh0Y2JpQWdkbUZ5SUhCdmMxeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLQ2hwSUNzZ2IyWm1jMlYwSUQ0OUlHUnpkQzVzWlc1bmRHZ3BJSHg4SUNocElENDlJSE55WXk1c1pXNW5kR2dwS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa2MzUmJhU0FySUc5bVpuTmxkRjBnUFNCemNtTmJhVjFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdhVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmtaV052WkdWVmRHWTRRMmhoY2lBb2MzUnlLU0I3WEc0Z0lIUnllU0I3WEc0Z0lDQWdjbVYwZFhKdUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSElwWEc0Z0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJSEpsZEhWeWJpQlRkSEpwYm1jdVpuSnZiVU5vWVhKRGIyUmxLREI0UmtaR1JDa2dMeThnVlZSR0lEZ2dhVzUyWVd4cFpDQmphR0Z5WEc0Z0lIMWNibjFjYmx4dUx5cGNiaUFxSUZkbElHaGhkbVVnZEc4Z2JXRnJaU0J6ZFhKbElIUm9ZWFFnZEdobElIWmhiSFZsSUdseklHRWdkbUZzYVdRZ2FXNTBaV2RsY2k0Z1ZHaHBjeUJ0WldGdWN5QjBhR0YwSUdsMFhHNGdLaUJwY3lCdWIyNHRibVZuWVhScGRtVXVJRWwwSUdoaGN5QnVieUJtY21GamRHbHZibUZzSUdOdmJYQnZibVZ1ZENCaGJtUWdkR2hoZENCcGRDQmtiMlZ6SUc1dmRGeHVJQ29nWlhoalpXVmtJSFJvWlNCdFlYaHBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlIWmxjbWxtZFdsdWRDQW9kbUZzZFdVc0lHMWhlQ2tnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQajBnTUN3Z0ozTndaV05wWm1sbFpDQmhJRzVsWjJGMGFYWmxJSFpoYkhWbElHWnZjaUIzY21sMGFXNW5JR0Z1SUhWdWMybG5ibVZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRHc5SUcxaGVDd2dKM1poYkhWbElHbHpJR3hoY21kbGNpQjBhR0Z1SUcxaGVHbHRkVzBnZG1Gc2RXVWdabTl5SUhSNWNHVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFpuTnBiblFnS0haaGJIVmxMQ0J0WVhnc0lHMXBiaWtnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQRDBnYldGNExDQW5kbUZzZFdVZ2JHRnlaMlZ5SUhSb1lXNGdiV0Y0YVcxMWJTQmhiR3h2ZDJWa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUQ0OUlHMXBiaXdnSjNaaGJIVmxJSE50WVd4c1pYSWdkR2hoYmlCdGFXNXBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFprbEZSVVUzTlRRZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzNObGNuUWdLSFJsYzNRc0lHMWxjM05oWjJVcElIdGNiaUFnYVdZZ0tDRjBaWE4wS1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvYldWemMyRm5aU0I4ZkNBblJtRnBiR1ZrSUdGemMyVnlkR2x2YmljcFhHNTlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbTtcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBuQml0cyA9IC03O1xuICB2YXIgaSA9IGlzTEUgPyBuQnl0ZXMgLSAxIDogMDtcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxO1xuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgcyA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGUgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKHMgPyAtMSA6IDEpICogSW5maW5pdHk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYztcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBydCA9IG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwO1xuICB2YXIgaSA9IGlzTEUgPyAwIDogbkJ5dGVzIC0gMTtcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xO1xuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IGUgPDwgbUxlbiB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1WNGNHOXlkSE1pTENKeVpXRmtJaXdpWW5WbVptVnlJaXdpYjJabWMyVjBJaXdpYVhOTVJTSXNJbTFNWlc0aUxDSnVRbmwwWlhNaUxDSmxJaXdpYlNJc0ltVk1aVzRpTENKbFRXRjRJaXdpWlVKcFlYTWlMQ0p1UW1sMGN5SXNJbWtpTENKa0lpd2ljeUlzSWs1aFRpSXNJa2x1Wm1sdWFYUjVJaXdpVFdGMGFDSXNJbkJ2ZHlJc0luZHlhWFJsSWl3aWRtRnNkV1VpTENKaklpd2ljblFpTENKaFluTWlMQ0pwYzA1aFRpSXNJbVpzYjI5eUlpd2liRzluSWl3aVRFNHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCUVN4UlFVRlJReXhKUVVGU0xFZEJRV1VzVlVGQlZVTXNUVUZCVml4RlFVRnJRa01zVFVGQmJFSXNSVUZCTUVKRExFbEJRVEZDTEVWQlFXZERReXhKUVVGb1F5eEZRVUZ6UTBNc1RVRkJkRU1zUlVGQk9FTTdRVUZETTBRc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFPMEZCUTBFc1RVRkJTVU1zVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsRkxGRkJRVkVzUTBGQlF5eERRVUZpTzBGQlEwRXNUVUZCU1VNc1NVRkJTVlFzVDBGQlVVVXNVMEZCVXl4RFFVRnFRaXhIUVVGelFpeERRVUU1UWp0QlFVTkJMRTFCUVVsUkxFbEJRVWxXTEU5QlFVOHNRMEZCUXl4RFFVRlNMRWRCUVZrc1EwRkJjRUk3UVVGRFFTeE5RVUZKVnl4SlFVRkpZaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGU096dEJRVVZCUVN4UFFVRkxReXhEUVVGTU96dEJRVVZCVUN4TlFVRkpVU3hKUVVGTExFTkJRVU1zUzBGQlRTeERRVUZEU0N4TFFVRlNMRWxCUVd0Q0xFTkJRVE5DTzBGQlEwRkhMRkZCUVU4c1EwRkJRMGdzUzBGQlVqdEJRVU5CUVN4WFFVRlRTQ3hKUVVGVU8wRkJRMEVzVTBGQlQwY3NVVUZCVVN4RFFVRm1MRVZCUVd0Q1RDeEpRVUZKUVN4SlFVRkpMRWRCUVVvc1IwRkJWVXdzVDBGQlQwTXNVMEZCVTFVc1EwRkJhRUlzUTBGQlpDeEZRVUZyUTBFc1MwRkJTME1zUTBGQmRrTXNSVUZCTUVOR0xGTkJRVk1zUTBGQmNrVXNSVUZCZDBVc1EwRkJSVHM3UVVGRk1VVktMRTFCUVVsRUxFbEJRVXNzUTBGQlF5eExRVUZOTEVOQlFVTkxMRXRCUVZJc1NVRkJhMElzUTBGQk0wSTdRVUZEUVV3c1VVRkJUeXhEUVVGRFN5eExRVUZTTzBGQlEwRkJMRmRCUVZOUUxFbEJRVlE3UVVGRFFTeFRRVUZQVHl4UlFVRlJMRU5CUVdZc1JVRkJhMEpLTEVsQlFVbEJMRWxCUVVrc1IwRkJTaXhIUVVGVlRpeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeERRVUZrTEVWQlFXdERRU3hMUVVGTFF5eERRVUYyUXl4RlFVRXdRMFlzVTBGQlV5eERRVUZ5UlN4RlFVRjNSU3hEUVVGRk96dEJRVVV4UlN4TlFVRkpUQ3hOUVVGTkxFTkJRVllzUlVGQllUdEJRVU5ZUVN4UlFVRkpMRWxCUVVsSkxFdEJRVkk3UVVGRFJDeEhRVVpFTEUxQlJVOHNTVUZCU1Vvc1RVRkJUVWNzU1VGQlZpeEZRVUZuUWp0QlFVTnlRaXhYUVVGUFJpeEpRVUZKVVN4SFFVRktMRWRCUVZjc1EwRkJRMFFzU1VGQlNTeERRVUZETEVOQlFVd3NSMEZCVXl4RFFVRldMRWxCUVdWRkxGRkJRV3BETzBGQlEwUXNSMEZHVFN4TlFVVkJPMEZCUTB4VUxGRkJRVWxCTEVsQlFVbFZMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJVanRCUVVOQlJTeFJRVUZKUVN4SlFVRkpTU3hMUVVGU08wRkJRMFE3UVVGRFJDeFRRVUZQTEVOQlFVTkpMRWxCUVVrc1EwRkJReXhEUVVGTUxFZEJRVk1zUTBGQlZpeEpRVUZsVUN4RFFVRm1MRWRCUVcxQ1ZTeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWldpeEpRVUZKUml4SlFVRm9RaXhEUVVFeFFqdEJRVU5FTEVOQkwwSkVPenRCUVdsRFFVd3NVVUZCVVc5Q0xFdEJRVklzUjBGQlowSXNWVUZCVld4Q0xFMUJRVllzUlVGQmEwSnRRaXhMUVVGc1FpeEZRVUY1UW14Q0xFMUJRWHBDTEVWQlFXbERReXhKUVVGcVF5eEZRVUYxUTBNc1NVRkJka01zUlVGQk5rTkRMRTFCUVRkRExFVkJRWEZFTzBGQlEyNUZMRTFCUVVsRExFTkJRVW9zUlVGQlQwTXNRMEZCVUN4RlFVRlZZeXhEUVVGV08wRkJRMEVzVFVGQlNXSXNUMEZCVDBnc1UwRkJVeXhEUVVGVUxFZEJRV0ZFTEVsQlFXSXNSMEZCYjBJc1EwRkJMMEk3UVVGRFFTeE5RVUZKU3l4UFFVRlBMRU5CUVVNc1MwRkJTMFFzU1VGQlRpeEpRVUZqTEVOQlFYcENPMEZCUTBFc1RVRkJTVVVzVVVGQlVVUXNVVUZCVVN4RFFVRndRanRCUVVOQkxFMUJRVWxoTEV0QlFVMXNRaXhUUVVGVExFVkJRVlFzUjBGQlkyRXNTMEZCUzBNc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeERRVUZETEVWQlFXSXNTVUZCYlVKRUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1EwRkJReXhGUVVGaUxFTkJRV3BETEVkQlFXOUVMRU5CUVRsRU8wRkJRMEVzVFVGQlNVNHNTVUZCU1ZRc1QwRkJUeXhEUVVGUUxFZEJRVmxGTEZOQlFWTXNRMEZCTjBJN1FVRkRRU3hOUVVGSlVTeEpRVUZKVml4UFFVRlBMRU5CUVZBc1IwRkJWeXhEUVVGRExFTkJRWEJDTzBGQlEwRXNUVUZCU1Zjc1NVRkJTVTBzVVVGQlVTeERRVUZTTEVsQlFXTkJMRlZCUVZVc1EwRkJWaXhKUVVGbExFbEJRVWxCTEV0QlFVb3NSMEZCV1N4RFFVRjZReXhIUVVFNFF5eERRVUU1UXl4SFFVRnJSQ3hEUVVFeFJEczdRVUZGUVVFc1ZVRkJVVWdzUzBGQlMwMHNSMEZCVEN4RFFVRlRTQ3hMUVVGVUxFTkJRVkk3TzBGQlJVRXNUVUZCU1Vrc1RVRkJUVW9zUzBGQlRpeExRVUZuUWtFc1ZVRkJWVW9zVVVGQk9VSXNSVUZCZDBNN1FVRkRkRU5VTEZGQlFVbHBRaXhOUVVGTlNpeExRVUZPTEVsQlFXVXNRMEZCWml4SFFVRnRRaXhEUVVGMlFqdEJRVU5CWkN4UlFVRkpSeXhKUVVGS08wRkJRMFFzUjBGSVJDeE5RVWRQTzBGQlEweElMRkZCUVVsWExFdEJRVXRSTEV0QlFVd3NRMEZCVjFJc1MwRkJTMU1zUjBGQlRDeERRVUZUVGl4TFFVRlVMRWxCUVd0Q1NDeExRVUZMVlN4SFFVRnNReXhEUVVGS08wRkJRMEVzVVVGQlNWQXNVMEZCVTBNc1NVRkJTVW9zUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRFdpeERRVUZpTEVOQlFXSXNTVUZCWjBNc1EwRkJjRU1zUlVGQmRVTTdRVUZEY2tOQk8wRkJRMEZsTEZkQlFVc3NRMEZCVER0QlFVTkVPMEZCUTBRc1VVRkJTV1lzU1VGQlNVa3NTMEZCU2l4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENWU3hsUVVGVFJTeExRVUZMUkN4RFFVRmtPMEZCUTBRc1MwRkdSQ3hOUVVWUE8wRkJRMHhFTEdWQlFWTkZMRXRCUVV0TUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1NVRkJTVklzUzBGQmFFSXNRMEZCWkR0QlFVTkVPMEZCUTBRc1VVRkJTVlVzVVVGQlVVTXNRMEZCVWl4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENaanRCUVVOQlpTeFhRVUZMTEVOQlFVdzdRVUZEUkRzN1FVRkZSQ3hSUVVGSlppeEpRVUZKU1N4TFFVRktMRWxCUVdGRUxFbEJRV3BDTEVWQlFYVkNPMEZCUTNKQ1JpeFZRVUZKTEVOQlFVbzdRVUZEUVVRc1ZVRkJTVWNzU1VGQlNqdEJRVU5FTEV0QlNFUXNUVUZIVHl4SlFVRkpTQ3hKUVVGSlNTeExRVUZLTEVsQlFXRXNRMEZCYWtJc1JVRkJiMEk3UVVGRGVrSklMRlZCUVVrc1EwRkJRMkVzVVVGQlVVTXNRMEZCVWl4SFFVRlpMRU5CUVdJc1NVRkJhMEpLTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCZEVJN1FVRkRRVVVzVlVGQlNVRXNTVUZCU1Vrc1MwRkJVanRCUVVORUxFdEJTRTBzVFVGSFFUdEJRVU5NU0N4VlFVRkpZU3hSUVVGUlNDeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWlVpeFJRVUZSTEVOQlFYQkNMRU5CUVZJc1IwRkJhVU5QTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCY2tNN1FVRkRRVVVzVlVGQlNTeERRVUZLTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGUFJpeFJRVUZSTEVOQlFXWXNSVUZCYTBKSUxFOUJRVTlETEZOQlFWTlZMRU5CUVdoQ0xFbEJRWEZDVEN4SlFVRkpMRWxCUVhwQ0xFVkJRU3RDU3l4TFFVRkxReXhEUVVGd1F5eEZRVUYxUTA0c1MwRkJTeXhIUVVFMVF5eEZRVUZwUkVnc1VVRkJVU3hEUVVFelJTeEZRVUU0UlN4RFFVRkZPenRCUVVWb1JrVXNUVUZCUzBFc1MwRkJTMFlzU1VGQlRpeEhRVUZqUnl4RFFVRnNRanRCUVVOQlF5eFZRVUZSU2l4SlFVRlNPMEZCUTBFc1UwRkJUMGtzVDBGQlR5eERRVUZrTEVWQlFXbENVQ3hQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhKUVVGeFFrNHNTVUZCU1N4SlFVRjZRaXhGUVVFclFrMHNTMEZCUzBNc1EwRkJjRU1zUlVGQmRVTlFMRXRCUVVzc1IwRkJOVU1zUlVGQmFVUkZMRkZCUVZFc1EwRkJNVVVzUlVGQk5rVXNRMEZCUlRzN1FVRkZMMFZRTEZOQlFVOURMRk5CUVZOVkxFTkJRVlFzUjBGQllVTXNRMEZCY0VJc1MwRkJNRUpETEVsQlFVa3NSMEZCT1VJN1FVRkRSQ3hEUVd4RVJDSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbVY0Y0c5eWRITXVjbVZoWkNBOUlHWjFibU4wYVc5dUlDaGlkV1ptWlhJc0lHOW1abk5sZEN3Z2FYTk1SU3dnYlV4bGJpd2dia0o1ZEdWektTQjdYRzRnSUhaaGNpQmxMQ0J0WEc0Z0lIWmhjaUJsVEdWdUlEMGdia0o1ZEdWeklDb2dPQ0F0SUcxTVpXNGdMU0F4WEc0Z0lIWmhjaUJsVFdGNElEMGdLREVnUER3Z1pVeGxiaWtnTFNBeFhHNGdJSFpoY2lCbFFtbGhjeUE5SUdWTllYZ2dQajRnTVZ4dUlDQjJZWElnYmtKcGRITWdQU0F0TjF4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBb2JrSjVkR1Z6SUMwZ01Ta2dPaUF3WEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSUMweElEb2dNVnh1SUNCMllYSWdjeUE5SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFZ4dVhHNGdJR2tnS3owZ1pGeHVYRzRnSUdVZ1BTQnpJQ1lnS0NneElEdzhJQ2d0YmtKcGRITXBLU0F0SURFcFhHNGdJSE1nUGo0OUlDZ3Ria0pwZEhNcFhHNGdJRzVDYVhSeklDczlJR1ZNWlc1Y2JpQWdabTl5SUNnN0lHNUNhWFJ6SUQ0Z01Ec2daU0E5SUdVZ0tpQXlOVFlnS3lCaWRXWm1aWEpiYjJabWMyVjBJQ3NnYVYwc0lHa2dLejBnWkN3Z2JrSnBkSE1nTFQwZ09Da2dlMzFjYmx4dUlDQnRJRDBnWlNBbUlDZ29NU0E4UENBb0xXNUNhWFJ6S1NrZ0xTQXhLVnh1SUNCbElENCtQU0FvTFc1Q2FYUnpLVnh1SUNCdVFtbDBjeUFyUFNCdFRHVnVYRzRnSUdadmNpQW9PeUJ1UW1sMGN5QStJREE3SUcwZ1BTQnRJQ29nTWpVMklDc2dZblZtWm1WeVcyOW1abk5sZENBcklHbGRMQ0JwSUNzOUlHUXNJRzVDYVhSeklDMDlJRGdwSUh0OVhHNWNiaUFnYVdZZ0tHVWdQVDA5SURBcElIdGNiaUFnSUNCbElEMGdNU0F0SUdWQ2FXRnpYRzRnSUgwZ1pXeHpaU0JwWmlBb1pTQTlQVDBnWlUxaGVDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdElEOGdUbUZPSURvZ0tDaHpJRDhnTFRFZ09pQXhLU0FxSUVsdVptbHVhWFI1S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUcwZ1BTQnRJQ3NnVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQmxJRDBnWlNBdElHVkNhV0Z6WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2h6SUQ4Z0xURWdPaUF4S1NBcUlHMGdLaUJOWVhSb0xuQnZkeWd5TENCbElDMGdiVXhsYmlsY2JuMWNibHh1Wlhod2IzSjBjeTUzY21sMFpTQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJSFpoYkhWbExDQnZabVp6WlhRc0lHbHpURVVzSUcxTVpXNHNJRzVDZVhSbGN5a2dlMXh1SUNCMllYSWdaU3dnYlN3Z1kxeHVJQ0IyWVhJZ1pVeGxiaUE5SUc1Q2VYUmxjeUFxSURnZ0xTQnRUR1Z1SUMwZ01WeHVJQ0IyWVhJZ1pVMWhlQ0E5SUNneElEdzhJR1ZNWlc0cElDMGdNVnh1SUNCMllYSWdaVUpwWVhNZ1BTQmxUV0Y0SUQ0K0lERmNiaUFnZG1GeUlISjBJRDBnS0cxTVpXNGdQVDA5SURJeklEOGdUV0YwYUM1d2IzY29NaXdnTFRJMEtTQXRJRTFoZEdndWNHOTNLRElzSUMwM055a2dPaUF3S1Z4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBd0lEb2dLRzVDZVhSbGN5QXRJREVwWEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSURFZ09pQXRNVnh1SUNCMllYSWdjeUE5SUhaaGJIVmxJRHdnTUNCOGZDQW9kbUZzZFdVZ1BUMDlJREFnSmlZZ01TQXZJSFpoYkhWbElEd2dNQ2tnUHlBeElEb2dNRnh1WEc0Z0lIWmhiSFZsSUQwZ1RXRjBhQzVoWW5Nb2RtRnNkV1VwWEc1Y2JpQWdhV1lnS0dselRtRk9LSFpoYkhWbEtTQjhmQ0IyWVd4MVpTQTlQVDBnU1c1bWFXNXBkSGtwSUh0Y2JpQWdJQ0J0SUQwZ2FYTk9ZVTRvZG1Gc2RXVXBJRDhnTVNBNklEQmNiaUFnSUNCbElEMGdaVTFoZUZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdVZ1BTQk5ZWFJvTG1ac2IyOXlLRTFoZEdndWJHOW5LSFpoYkhWbEtTQXZJRTFoZEdndVRFNHlLVnh1SUNBZ0lHbG1JQ2gyWVd4MVpTQXFJQ2hqSUQwZ1RXRjBhQzV3YjNjb01pd2dMV1VwS1NBOElERXBJSHRjYmlBZ0lDQWdJR1V0TFZ4dUlDQWdJQ0FnWXlBcVBTQXlYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxJQ3NnWlVKcFlYTWdQajBnTVNrZ2UxeHVJQ0FnSUNBZ2RtRnNkV1VnS3owZ2NuUWdMeUJqWEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIWmhiSFZsSUNzOUlISjBJQ29nVFdGMGFDNXdiM2NvTWl3Z01TQXRJR1ZDYVdGektWeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RtRnNkV1VnS2lCaklENDlJRElwSUh0Y2JpQWdJQ0FnSUdVcksxeHVJQ0FnSUNBZ1l5QXZQU0F5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0dVZ0t5QmxRbWxoY3lBK1BTQmxUV0Y0S1NCN1hHNGdJQ0FnSUNCdElEMGdNRnh1SUNBZ0lDQWdaU0E5SUdWTllYaGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0F4S1NCN1hHNGdJQ0FnSUNCdElEMGdLSFpoYkhWbElDb2dZeUF0SURFcElDb2dUV0YwYUM1d2IzY29NaXdnYlV4bGJpbGNiaUFnSUNBZ0lHVWdQU0JsSUNzZ1pVSnBZWE5jYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2JTQTlJSFpoYkhWbElDb2dUV0YwYUM1d2IzY29NaXdnWlVKcFlYTWdMU0F4S1NBcUlFMWhkR2d1Y0c5M0tESXNJRzFNWlc0cFhHNGdJQ0FnSUNCbElEMGdNRnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1p2Y2lBb095QnRUR1Z1SUQ0OUlEZzdJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBYU0E5SUcwZ0ppQXdlR1ptTENCcElDczlJR1FzSUcwZ0x6MGdNalUyTENCdFRHVnVJQzA5SURncElIdDlYRzVjYmlBZ1pTQTlJQ2hsSUR3OElHMU1aVzRwSUh3Z2JWeHVJQ0JsVEdWdUlDczlJRzFNWlc1Y2JpQWdabTl5SUNnN0lHVk1aVzRnUGlBd095QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMGdQU0JsSUNZZ01IaG1aaXdnYVNBclBTQmtMQ0JsSUM4OUlESTFOaXdnWlV4bGJpQXRQU0E0S1NCN2ZWeHVYRzRnSUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwSUMwZ1pGMGdmRDBnY3lBcUlERXlPRnh1ZlZ4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0oKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvJztcbn07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1KeWIzZHpaWEl1YW5NaVhTd2libUZ0WlhNaU9sc2ljSEp2WTJWemN5SXNJbTF2WkhWc1pTSXNJbVY0Y0c5eWRITWlMQ0p1WlhoMFZHbGpheUlzSW1OaGJsTmxkRWx0YldWa2FXRjBaU0lzSW5kcGJtUnZkeUlzSW5ObGRFbHRiV1ZrYVdGMFpTSXNJbU5oYmxCdmMzUWlMQ0p3YjNOMFRXVnpjMkZuWlNJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSm1JaXdpY1hWbGRXVWlMQ0psZGlJc0luTnZkWEpqWlNJc0ltUmhkR0VpTENKemRHOXdVSEp2Y0dGbllYUnBiMjRpTENKc1pXNW5kR2dpTENKbWJpSXNJbk5vYVdaMElpd2ljSFZ6YUNJc0luTmxkRlJwYldWdmRYUWlMQ0owYVhSc1pTSXNJbUp5YjNkelpYSWlMQ0psYm5ZaUxDSmhjbWQySWl3aWJtOXZjQ0lzSW05dUlpd2lZV1JrVEdsemRHVnVaWElpTENKdmJtTmxJaXdpYjJabUlpd2ljbVZ0YjNabFRHbHpkR1Z1WlhJaUxDSnlaVzF2ZG1WQmJHeE1hWE4wWlc1bGNuTWlMQ0psYldsMElpd2lZbWx1WkdsdVp5SXNJbTVoYldVaUxDSkZjbkp2Y2lJc0ltTjNaQ0lzSW1Ob1pHbHlJaXdpWkdseUlsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJPenRCUVVWQkxFbEJRVWxCTEZWQlFWVkRMRTlCUVU5RExFOUJRVkFzUjBGQmFVSXNSVUZCTDBJN08wRkJSVUZHTEZGQlFWRkhMRkZCUVZJc1IwRkJiMElzV1VGQldUdEJRVU0xUWl4UlFVRkpReXhyUWtGQmEwSXNUMEZCVDBNc1RVRkJVQ3hMUVVGclFpeFhRVUZzUWl4SlFVTnVRa0VzVDBGQlQwTXNXVUZFVmp0QlFVVkJMRkZCUVVsRExGVkJRVlVzVDBGQlQwWXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU5ZUVN4UFFVRlBSeXhYUVVSSkxFbEJRMWRJTEU5QlFVOUpMR2RDUVVSb1F6czdRVUZKUVN4UlFVRkpUQ3hsUVVGS0xFVkJRWEZDTzBGQlEycENMR1ZCUVU4c1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlFVVXNiVUpCUVU5TUxFOUJRVTlETEZsQlFWQXNRMEZCYjBKSkxFTkJRWEJDTEVOQlFWQTdRVUZCSzBJc1UwRkJja1E3UVVGRFNEczdRVUZGUkN4UlFVRkpTQ3hQUVVGS0xFVkJRV0U3UVVGRFZDeFpRVUZKU1N4UlFVRlJMRVZCUVZvN1FVRkRRVTRzWlVGQlQwa3NaMEpCUVZBc1EwRkJkMElzVTBGQmVFSXNSVUZCYlVNc1ZVRkJWVWNzUlVGQlZpeEZRVUZqTzBGQlF6ZERMR2RDUVVGSlF5eFRRVUZUUkN4SFFVRkhReXhOUVVGb1FqdEJRVU5CTEdkQ1FVRkpMRU5CUVVOQkxGZEJRVmRTTEUxQlFWZ3NTVUZCY1VKUkxGZEJRVmNzU1VGQmFrTXNTMEZCTUVORUxFZEJRVWRGTEVsQlFVZ3NTMEZCV1N4alFVRXhSQ3hGUVVFd1JUdEJRVU4wUlVZc2JVSkJRVWRITEdWQlFVZzdRVUZEUVN4dlFrRkJTVW9zVFVGQlRVc3NUVUZCVGl4SFFVRmxMRU5CUVc1Q0xFVkJRWE5DTzBGQlEyeENMSGRDUVVGSlF5eExRVUZMVGl4TlFVRk5UeXhMUVVGT0xFVkJRVlE3UVVGRFFVUTdRVUZEU0R0QlFVTktPMEZCUTBvc1UwRlVSQ3hGUVZOSExFbEJWRWc3TzBGQlYwRXNaVUZCVHl4VFFVRlRaQ3hSUVVGVUxFTkJRV3RDWXl4RlFVRnNRaXhGUVVGelFqdEJRVU42UWs0c2EwSkJRVTFSTEVsQlFVNHNRMEZCVjBZc1JVRkJXRHRCUVVOQldpeHRRa0ZCVDBjc1YwRkJVQ3hEUVVGdFFpeGpRVUZ1UWl4RlFVRnRReXhIUVVGdVF6dEJRVU5JTEZOQlNFUTdRVUZKU0RzN1FVRkZSQ3hYUVVGUExGTkJRVk5NTEZGQlFWUXNRMEZCYTBKakxFVkJRV3hDTEVWQlFYTkNPMEZCUTNwQ1J5eHRRa0ZCVjBnc1JVRkJXQ3hGUVVGbExFTkJRV1k3UVVGRFNDeExRVVpFTzBGQlIwZ3NRMEZxUTJ0Q0xFVkJRVzVDT3p0QlFXMURRV3BDTEZGQlFWRnhRaXhMUVVGU0xFZEJRV2RDTEZOQlFXaENPMEZCUTBGeVFpeFJRVUZSYzBJc1QwRkJVaXhIUVVGclFpeEpRVUZzUWp0QlFVTkJkRUlzVVVGQlVYVkNMRWRCUVZJc1IwRkJZeXhGUVVGa08wRkJRMEYyUWl4UlFVRlJkMElzU1VGQlVpeEhRVUZsTEVWQlFXWTdPMEZCUlVFc1UwRkJVME1zU1VGQlZDeEhRVUZuUWl4RFFVRkZPenRCUVVWc1FucENMRkZCUVZFd1FpeEZRVUZTTEVkQlFXRkVMRWxCUVdJN1FVRkRRWHBDTEZGQlFWRXlRaXhYUVVGU0xFZEJRWE5DUml4SlFVRjBRanRCUVVOQmVrSXNVVUZCVVRSQ0xFbEJRVklzUjBGQlpVZ3NTVUZCWmp0QlFVTkJla0lzVVVGQlVUWkNMRWRCUVZJc1IwRkJZMG9zU1VGQlpEdEJRVU5CZWtJc1VVRkJVVGhDTEdOQlFWSXNSMEZCZVVKTUxFbEJRWHBDTzBGQlEwRjZRaXhSUVVGUkswSXNhMEpCUVZJc1IwRkJOa0pPTEVsQlFUZENPMEZCUTBGNlFpeFJRVUZSWjBNc1NVRkJVaXhIUVVGbFVDeEpRVUZtT3p0QlFVVkJla0lzVVVGQlVXbERMRTlCUVZJc1IwRkJhMElzVlVGQlZVTXNTVUZCVml4RlFVRm5RanRCUVVNNVFpeFZRVUZOTEVsQlFVbERMRXRCUVVvc1EwRkJWU3hyUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkRzN1FVRkpRVHRCUVVOQmJrTXNVVUZCVVc5RExFZEJRVklzUjBGQll5eFpRVUZaTzBGQlFVVXNWMEZCVHl4SFFVRlFPMEZCUVZrc1EwRkJlRU03UVVGRFFYQkRMRkZCUVZGeFF5eExRVUZTTEVkQlFXZENMRlZCUVZWRExFZEJRVllzUlVGQlpUdEJRVU16UWl4VlFVRk5MRWxCUVVsSUxFdEJRVW9zUTBGQlZTeG5RMEZCVml4RFFVRk9PMEZCUTBnc1EwRkdSQ0lzSW1acGJHVWlPaUppY205M2MyVnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5OGdjMmhwYlNCbWIzSWdkWE5wYm1jZ2NISnZZMlZ6Y3lCcGJpQmljbTkzYzJWeVhHNWNiblpoY2lCd2NtOWpaWE56SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN2ZUdGNibHh1Y0hKdlkyVnpjeTV1WlhoMFZHbGpheUE5SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RtRnlJR05oYmxObGRFbHRiV1ZrYVdGMFpTQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbk5sZEVsdGJXVmthV0YwWlR0Y2JpQWdJQ0IyWVhJZ1kyRnVVRzl6ZENBOUlIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNBZ0ppWWdkMmx1Wkc5M0xuQnZjM1JOWlhOellXZGxJQ1ltSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlYRzRnSUNBZ08xeHVYRzRnSUNBZ2FXWWdLR05oYmxObGRFbHRiV1ZrYVdGMFpTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLR1lwSUhzZ2NtVjBkWEp1SUhkcGJtUnZkeTV6WlhSSmJXMWxaR2xoZEdVb1ppa2dmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWTJGdVVHOXpkQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdjWFZsZFdVZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMjFsYzNOaFoyVW5MQ0JtZFc1amRHbHZiaUFvWlhZcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpiM1Z5WTJVZ1BTQmxkaTV6YjNWeVkyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSE52ZFhKalpTQTlQVDBnZDJsdVpHOTNJSHg4SUhOdmRYSmpaU0E5UFQwZ2JuVnNiQ2tnSmlZZ1pYWXVaR0YwWVNBOVBUMGdKM0J5YjJObGMzTXRkR2xqYXljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxkaTV6ZEc5d1VISnZjR0ZuWVhScGIyNG9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NYVmxkV1V1YkdWdVozUm9JRDRnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1ptNGdQU0J4ZFdWMVpTNXphR2xtZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYmlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTd2dkSEoxWlNrN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlHNWxlSFJVYVdOcktHWnVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnhkV1YxWlM1d2RYTm9LR1p1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXdiM04wVFdWemMyRm5aU2duY0hKdlkyVnpjeTEwYVdOckp5d2dKeW9uS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYm1WNGRGUnBZMnNvWm00cElIdGNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htYml3Z01DazdYRzRnSUNBZ2ZUdGNibjBwS0NrN1hHNWNibkJ5YjJObGMzTXVkR2wwYkdVZ1BTQW5Zbkp2ZDNObGNpYzdYRzV3Y205alpYTnpMbUp5YjNkelpYSWdQU0IwY25WbE8xeHVjSEp2WTJWemN5NWxibllnUFNCN2ZUdGNibkJ5YjJObGMzTXVZWEpuZGlBOUlGdGRPMXh1WEc1bWRXNWpkR2x2YmlCdWIyOXdLQ2tnZTMxY2JseHVjSEp2WTJWemN5NXZiaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbUZrWkV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011YjI1alpTQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtOW1aaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbkpsYlc5MlpVeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWNtVnRiM1psUVd4c1RHbHpkR1Z1WlhKeklEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdVpXMXBkQ0E5SUc1dmIzQTdYRzVjYm5CeWIyTmxjM011WW1sdVpHbHVaeUE5SUdaMWJtTjBhVzl1SUNodVlXMWxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtSnBibVJwYm1jZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVmVnh1WEc0dkx5QlVUMFJQS0hOb2RIbHNiV0Z1S1Z4dWNISnZZMlZ6Y3k1amQyUWdQU0JtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlBbkx5Y2dmVHRjYm5CeWIyTmxjM011WTJoa2FYSWdQU0JtZFc1amRHbHZiaUFvWkdseUtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1Ob1pHbHlJR2x6SUc1dmRDQnpkWEJ3YjNKMFpXUW5LVHRjYm4wN1hHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXFxcXGJyb3dzZXIuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZGF0YUJhc2UgPSByZXF1aXJlKFwiLi9kYXRhQmFzZVwiKTtcblxudmFyIF9kYXRhQmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXRhQmFzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBjYWxlbmRhclBhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY2FsZW5kYXJQYWdlKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgY2FsZW5kYXJQYWdlKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoY2FsZW5kYXJQYWdlLCBbe1xuICAgICAgICBrZXk6IFwiUmVuZGVyXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBSZW5kZXIoZGF0ZU1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkSGVhZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmV4aXRCdXR0b24oKTtcbiAgICAgICAgICAgIHRoaXMuUmVuZGVyUGFnZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJCdXR0b25DYWxlbmRhcigpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihkYXRlTW9udGgpO1xuICAgICAgICAgICAgdGhpcy5hZGRIYW5kbGVyRXZlbnQoZGF0ZU1vbnRoKTtcbiAgICAgICAgICAgIC8vINGH0YLQvi3RgtC+INC90LAg0L/QvtC00L7QsdC40Lgg0LrQvtC90YHRgtGA0YPQutGC0L7RgNCwLCDRgtGD0YIg0YDQtdC90LTQtdGA0LjRhtCwINC60LDQu9C10L3QtNCw0YDRjCDQuCDQtNC+0LHQsNCy0LvRj9GO0YbRhtCwINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImJ1aWxkSGVhZGVyXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZEhlYWRlcigpIHtcbiAgICAgICAgICAgIC8v0YLRg9GCINGA0LXQvdC00LXRgNC40YbQsCDQutGC0L4g0LfQsNGI0LXQuyDQuCDQutC90L7Qv9C60LAg0LLRi9GF0L7QtNCwXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlclwiKTtcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpO1xuICAgICAgICAgICAgaGVhZGVyID0gaGVhZGVyLmlubmVySFRNTCA9IFwiXFxuICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtOVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTNcXFwiPlxcbiAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWFkXFxcIj5cIiArIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpICsgXCIgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBpZD1cXFwiZXhpdFxcXCI+XFx1MDQxMlxcdTA0NEJcXHUwNDQ1XFx1MDQzRVxcdTA0MzQ8L2J1dHRvbj48cD5cXG4gICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICAgICAgICAgIGRpdiA9IGRpdi5pbm5lckhUTUwgPSBcIiBcXG4gIDxkaXYgY2xhc3M9XFxcImNvbnRhbnRcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZXhpdEJ1dHRvblwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZXhpdEJ1dHRvbigpIHtcbiAgICAgICAgICAgIC8v0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9GF0L7QtNCwINC90LAg0LPQu9Cw0LLQvdGD0Y4g0YHRgtGA0LDQvdC40YbRg1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIlJlbmRlclBhZ2VcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIFJlbmRlclBhZ2UoZGF0ZU1vbnRoKSB7XG4gICAgICAgICAgICAvL9C30L3QsNGOINC90LUg0LvRg9GH0YjQtdC1INC90LDQt9Cy0LDQvdC40LUsINGC0YPRgiDRgdC+0LfQtNCw0Y7RgtGM0YHRjyDQtNC40LLRiyDQtNC70Y8g0YDQtdC90LTQsNGA0LAg0LrQsNC70LXQvdC00LDRgNGPINC4INC60L3QvtC/0L7QulxuICAgICAgICAgICAgdmFyIHBsYWNlQnV0dG9uUmVuZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YW50XCIpLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz1cXFwiQnV0dG9uUGxhY2VcXFwiPjwvZGl2PlwiO1xuICAgICAgICAgICAgdmFyIHBsYWNlQ2FsZW5kYXJSZW5kZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhbnRcIikuaW5uZXJIVE1MICs9IFwiPGJyPjxicj4gPGRpdiBjbGFzcz1cXFwiQ2FsZW5kYXJQbGFjZVxcXCI+PC9kaXY+XCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlTW9udGgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicmVuZGVyQnV0dG9uQ2FsZW5kYXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckJ1dHRvbkNhbGVuZGFyKCkge1xuICAgICAgICAgICAgLy8g0YHQsNC80LAg0L7RgtGA0LjRgdC+0LLQutCwINC60L3QvtC/0L7QulxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5CdXR0b25QbGFjZVwiKS5pbm5lckhUTUwgPSBcIiAgICBcXG4gICAgICAgICAgPGRpdiBhbGlnbj1cXFwiY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBpZD1cXFwiYmFja0J1dHRvblxcXCI+XFx1MDQxRFxcdTA0MzBcXHUwNDM3XFx1MDQzMFxcdTA0MzQ8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1hdGVyaWFsLWRlc2lnbi1pY29uaWMtZm9udFxcXCIgaWQ9XFxcInRlZ01vbnRoXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgaWQ9XFxcImZvcndhcmRCdXR0b25cXFwiPlxcdTA0MTJcXHUwNDNGXFx1MDQzNVxcdTA0NDBcXHUwNDM1XFx1MDQzNDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicmVuZGVyQ2FsZW5kYXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKGRhdGVNb250aCkge1xuICAgICAgICAgICAgLy/QstC+0YIg0YLRg9GCINGA0LXQvdC00LDRgNC40YbQsCDQutCw0LvQtdC90LTQsNGA0Ywg0L3QsCDRgtC10LrRg9GJ0LjQuSDQvNC10YHRj9GGXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGVNb250aFswXTsgLy8g0YDQsNC30LHQtdGA0LDQtdGC0YzRgdGPINC80LDRgdC40LIg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDQs9C+0LTQsCDQuCDQvNC10YHRj9GG0LBcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGVNb250aFsxXTtcblxuICAgICAgICAgICAgdmFyIGFyck1vbnRoID0gW1xuICAgICAgICAgICAgLy/QvNCw0YHRgdC40LIg0YEg0LzQtdGB0Y/RhtCw0LzQuCDQtNC70Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjyDQutCw0LrQvtC5INGB0LXQudGH0LDRgSDQvNC10YHRj9GGINC4INCz0L7QtFxuICAgICAgICAgICAgXCLQr9C90LLQsNGA0YxcIiwgXCLQpNC10LLRgNCw0LvRjFwiLCBcItCc0LDRgNGCXCIsIFwi0JDQv9GA0LXQu9GMXCIsIFwi0JzQsNC5XCIsIFwi0JjRjtC90YxcIiwgXCLQmNGO0LvRjFwiLCBcItCQ0LLQs9GD0YHRglwiLCBcItCh0LXQvdGC0Y/QsdGA0YxcIiwgXCLQntC60YLRj9Cx0YDRjFwiLCBcItCd0L7Rj9Cx0YDRjFwiLCBcItCU0LXQutCw0LHRgNGMXCJdO1xuICAgICAgICAgICAgdmFyIHNob3dNb250aCA9IG1vbnRoIC0gMTsgLy8g0LzQuNC90YPRgdGD0LXQvCDQvNC10YHRj9GGINGCLtC6INC80LXQvdGP0LvQuCDQvdCw0YfQsNC70L4g0LPQvtC00LAg0L3QtSDRgSAwINCwINGBIDFcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVnTW9udGhcIikuaW5uZXJIVE1MID0gYXJyTW9udGhbc2hvd01vbnRoXSArIFwiIFwiICsgeWVhcjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhbGVuZGFyKHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkNhbGVuZGFyUGxhY2VcIik7XG4gICAgICAgICAgICAgICAgdmFyIG1vbiA9IG1vbnRoIC0gMTsgLy8g0LzQtdGB0Y/RhtGLINCyIEpTINC40LTRg9GCINC+0YIgMCDQtNC+IDExLCDQsCDQvdC1INC+0YIgMSDQtNC+IDEyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSh5ZWFyLCBtb24pO1xuICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IFwiPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1ob3ZlclxcXCI+PHRyPjx0aD5cXHUwNDNGXFx1MDQzRDwvdGg+PHRoPlxcdTA0MzJcXHUwNDQyPC90aD48dGg+XFx1MDQ0MVxcdTA0NDA8L3RoPjx0aD5cXHUwNDQ3XFx1MDQ0MjwvdGg+PHRoPlxcdTA0M0ZcXHUwNDQyPC90aD48dGg+XFx1MDQ0MVxcdTA0MzE8L3RoPjx0aD5cXHUwNDMyXFx1MDQ0MTwvdGg+PC90cj48dHI+XCI7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjRgtGMINC/0LXRgNCy0YvQuSDRgNGP0LQg0L7RgiDQv9C+0L3QtdC00LXQu9GM0L3QuNC60LBcbiAgICAgICAgICAgICAgICAvLyDQuCDQtNC+INC00L3Rjywg0YEg0LrQvtGC0L7RgNC+0LPQviDQvdCw0YfQuNC90LDQtdGC0YHRjyDQvNC10YHRj9GGXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnZXREYXkoZCk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD48L3RkPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDRj9GH0LXQudC60Lgg0LrQsNC70LXQvdC00LDRgNGPINGBINC00LDRgtCw0LzQuFxuICAgICAgICAgICAgICAgIHdoaWxlIChkLmdldE1vbnRoKCkgPT0gbW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkIGNsYXNzPVxcXCJkXCIgKyBkLmdldERhdGUoKSArIFwiX1wiICsgbW9udGggKyBcIl9cIiArIHllYXIgKyBcIlxcXCI+XCIgKyBkLmdldERhdGUoKSArIFwiPC90ZD5cIjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0RGF5KGQpICUgNyA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQstGBLCDQv9C+0YHQu9C10LTQvdC40Lkg0LTQtdC90YwgLSDQv9C10YDQtdCy0L7QtCDRgdGC0YDQvtC60LhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj48dHI+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vINC00L7QsdC40YLRjCDRgtCw0LHQu9C40YbRgyDQv9GD0YHRgtGL0LzQuCDRj9GH0LXQudC60LDQvNC4LCDQtdGB0LvQuCDQvdGD0LbQvdC+XG4gICAgICAgICAgICAgICAgaWYgKGdldERheShkKSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBnZXREYXkoZCk7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPjwvdGQ+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC60YDRi9GC0Ywg0YLQsNCx0LvQuNGG0YNcbiAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+PC90YWJsZT5cIjtcbiAgICAgICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L7QtNC90L4g0L/RgNC40YHQstCw0LjQstCw0L3QuNC1IGlubmVySFRNTFxuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gdGFibGU7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFCYXNlID0gbmV3IF9kYXRhQmFzZTIuZGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZGF0YUJhc2UubG9hZEZyb21EQigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0L3QvtC80LXRgCDQtNC90Y8g0L3QtdC00LXQu9C4LCDQvtGCIDAo0L/QvSkg0LTQviA2KNCy0YEpXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRheSA9PSAwKSBkYXkgPSA3O1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXkgLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjcmVhdGVDYWxlbmRhcih5ZWFyLCBtb250aCk7IC8v0LLRi9C30L7QsiDQstC90YPRgtGA0LXQvdC90LXQuSDRhNGD0L3QutGG0LjQuCDRgNC10L3QtNCw0YDQsCDQutCw0LvQtdC00LDRgNGPXG4gICAgICAgICAgICByZXR1cm4gZGF0ZU1vbnRoOyAvLyDQstC+0LfRgNCw0YnRj9C10Lwg0LTQsNGC0YMg0L3QsCDQutC+0YLQvtGA0YPRjiDQv9GA0L7QuNC30LLQvtC00LjQu9GB0Y8g0YDQtdC90LTQsNGAINC60LDQu9C10L3QtNCw0YDRj1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiYWRkSGFuZGxlckV2ZW50XCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRIYW5kbGVyRXZlbnQoZGF0ZU1vbnRoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDRgtGD0YIg0LTQvtCx0LDQstC70Y/RjtGC0YzRgdGPINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0LTQu9GPINC70LjRgdGC0LDQvdC40Y8g0LzQtdGB0Y/RhtC10LIgKyDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INC90LAg0YPQtNCw0LvQtdC90LjQtSDQuCDQtNC+0LHQsNCy0LvQtdC90Lgg0LfQsNCz0L7Qu9C+0LLQutC+0LJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmFja0J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5hZGRFdmVudEZvckJhY2tCdXRvb24oZGF0ZU1vbnRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3J3YXJkQnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmFkZEV2ZW50Rm9yRm9yd2FyZEJ1dHRvbihkYXRlTW9udGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGFibGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVuZGVyTWFkYWwoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGFibGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZGVsQ2FwdGlvbihldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImFkZEV2ZW50Rm9yRm9yd2FyZEJ1dHRvblwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRXZlbnRGb3JGb3J3YXJkQnV0dG9uKGRhdGVNb250aCkge1xuICAgICAgICAgICAgLy8g0YLRg9GCINC60L7QtCDQtNC+0LHQsNCy0LvQtdC90LjQtSDQvNC10YHRj9GG0LAg0LjQu9C4INCz0L7QtNCwINCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0LrQsNC60L7QuSDQvNC10YHRj9GGINC/0YDQuNGI0LXQuyArINCy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0YDQtdC90LTQsNGA0LAg0L/QvtC70YPRh9C10L3QvdC+0Lkg0LTQsNGC0YtcbiAgICAgICAgICAgIHZhciB5ZWFyID0gZGF0ZU1vbnRoWzBdO1xuICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZU1vbnRoWzFdO1xuICAgICAgICAgICAgaWYgKG1vbnRoID09PSAxMikge1xuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgICAgICBtb250aCA9IDE7XG4gICAgICAgICAgICAgICAgZGF0ZU1vbnRoWzBdID0geWVhcjtcbiAgICAgICAgICAgICAgICBkYXRlTW9udGhbMV0gPSBtb250aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9udGggPSBtb250aCArIDE7XG4gICAgICAgICAgICAgICAgZGF0ZU1vbnRoWzFdID0gbW9udGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkNhbGVuZGFyUGxhY2VcIikuaW5uZXJIVE1MID0gXCJcIjsgLy8g0L7Rh9C40YHRgtC60LAg0LrQsNC70LXQvdC00LDRgNGPINC00LvRjyDRgtC+0LPQviDRh9GC0L4g0LHRiyDQtNCw0YLRiyDQvNC10L3Rj9C70LjRgdGMXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKGRhdGVNb250aCk7IC8vINGC0YPRgiDRgdCw0Lwg0LLRi9C30L7QsiDQtNCw0L3QvdC+0LPQviDQvNC10YLQsNC00LAg0LTQu9GPINGA0LXQvdC00LDRgNCwXG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJhZGRFdmVudEZvckJhY2tCdXRvb25cIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEV2ZW50Rm9yQmFja0J1dG9vbihkYXRlTW9udGgpIHtcbiAgICAgICAgICAgIC8vINGC0YPRgiDQutC+0LQg0LLRi9GH0LjRgtCwINC80LXRgdGP0YbQsCDQuNC70Lgg0LPQvtC00LAg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQutCw0LrQvtC5INC80LXRgdGP0YYg0L/RgNC40YjQtdC7ICsg0LLRi9C30L7QsiDRhNGD0L3QutGG0LjQuCDRgNC10L3QtNCw0YDQsCDQv9C+0LvRg9GH0LXQvdC90L7QuSDQtNCw0YLRi1xuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlTW9udGhbMF07XG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlTW9udGhbMV07XG4gICAgICAgICAgICBpZiAobW9udGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICAgICAgbW9udGggPSAxMjtcbiAgICAgICAgICAgICAgICBkYXRlTW9udGhbMF0gPSB5ZWFyO1xuICAgICAgICAgICAgICAgIGRhdGVNb250aFsxXSA9IG1vbnRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb250aCA9IG1vbnRoIC0gMTtcbiAgICAgICAgICAgICAgICBkYXRlTW9udGhbMV0gPSBtb250aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuQ2FsZW5kYXJQbGFjZVwiKS5pbm5lckhUTUwgPSBcIlwiOyAvLyDQvtGH0LjRgdGC0LrQsCDQutCw0LvQtdC90LTQsNGA0Y8g0LTQu9GPINGC0L7Qs9C+INGH0YLQviDQsdGLINC00LDRgtGLINC80LXQvdGP0LvQuNGB0YxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoZGF0ZU1vbnRoKTsgLy8g0YLRg9GCINGB0LDQvCDQstGL0LfQvtCyINC00LDQvdC90L7Qs9C+INC80LXRgtCw0LTQsCDQtNC70Y8g0YDQtdC90LTQsNGA0LBcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImFkZENhcHRpb25cIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENhcHRpb24odGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBkYXRhQmFzZSA9IG5ldyBfZGF0YUJhc2UyLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBkYXRhKS5pbm5lckhUTUwgKz0gXCI8ZGl2PlwiICsgdGFza1RpdGxlICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjcm9zc1xcXCI+W3hdPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICBkYXRhQmFzZS5TYXZlRXZlbnRJbkRCKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImRlbENhcHRpb25cIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlbENhcHRpb24oZSkge1xuICAgICAgICAgICAgLy8g0YLRg9GCINC60L7QtCDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDQt9Cw0LPQvtC70L7QstC60LBcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAhPSBcIkJVVFRPTlwiIHx8IHRhcmdldC5jbGFzc05hbWUgIT0gJ2Nyb3NzJykgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRleHQgPSB0YXJnZXQucGFyZW50Tm9kZS5pbm5lckhUTUwuc2xpY2UoMCwgLTM0KTtcbiAgICAgICAgICAgIHZhciBkYXRlID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWU7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHZhciBkYXRhQmFzZSA9IG5ldyBfZGF0YUJhc2UyLmRlZmF1bHQoKTsgLy/RgdC+0LfQtNCw0L3QuNC1INGN0LrQt9C10LzQv9C70Y/RgNCwINC60LvQsNGB0YHQsCDQsdCw0LfRiyDQtNCw0L3QvdGL0YVcbiAgICAgICAgICAgIGRhdGFCYXNlLmRlbGV0ZUV2ZW50SW5EQihkYXRlLCB0ZXh0KTsgLy8g0LLRi9C30L7QsiDQvNC10YLQvtC00LAg0LjQtyDQsdCw0LfRiyDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDQtdCy0LXQvdGC0LAg0L/RgNC40L3QuNC80LDQtdGCINC90LAg0LLRhdC+0LQg0YLQtdC60YHRgiDQt9Cw0LPQvtC70L7QstC60LAg0Lgg0YLQtdCzINCyINC60LDQutC+0Lkg0LfQsNC/0LjRgdCw0LvQuFxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicmVuZGVyTWFkYWxcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlck1hZGFsKGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09IFwiVERcIikgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB0YXJnZXQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgdmFyIHRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJub3RlLWNyZWF0ZS1mb3JtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm5vdGUtaGVhZGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImRheVxcXCI+XCIgKyBkYXRhICsgXCI8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUgY2xvc2VNb2RhbFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJub3RlLXRpdGxlXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIlRpdGxlXFxcIiBpZD1cXFwidGFza1RpdGxlSW5wdXRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibm90ZS1ib2R5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cXFwidGFza0Rlc2NyaXB0aW9uSW5wdXRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuPC90ZXh0YXJlYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBteS1idG4tZGVmYXVsdFxcXCI+U2F2ZTwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ub3RlLWNyZWF0ZS1mb3JtXCIpO1xuICAgICAgICAgICAgdmFyIGNsb3NlTW9kYWwgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlTW9kYWxcIik7XG4gICAgICAgICAgICB2YXIgc2F2ZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBjbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYXZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhc2tUaXRsZSA9IHRhc2tUaXRsZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGFza1RpdGxlKSBfdGhpczIuYWRkQ2FwdGlvbih0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBjYWxlbmRhclBhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNhbGVuZGFyUGFnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrTmhiR1Z1WkdGeVVHRm5aUzVxY3lKZExDSnVZVzFsY3lJNld5SmpZV3hsYm1SaGNsQmhaMlVpTENKa1lYUmxUVzl1ZEdnaUxDSmlkV2xzWkVobFlXUmxjaUlzSW1WNGFYUkNkWFIwYjI0aUxDSlNaVzVrWlhKUVlXZGxJaXdpY21WdVpHVnlRblYwZEc5dVEyRnNaVzVrWVhJaUxDSnlaVzVrWlhKRFlXeGxibVJoY2lJc0ltRmtaRWhoYm1Sc1pYSkZkbVZ1ZENJc0ltaGxZV1JsY2lJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltUnBkaUlzSW1sdWJtVnlTRlJOVENJc0luTmxjM05wYjI1VGRHOXlZV2RsSWl3aVoyVjBTWFJsYlNJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSndiR0ZqWlVKMWRIUnZibEpsYm1SbGNpSXNJbkJzWVdObFEyRnNaVzVrWVhKU1pXNWtaWElpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpZVdWaGNpSXNJbTF2Ym5Sb0lpd2lZWEp5VFc5dWRHZ2lMQ0p6YUc5M1RXOXVkR2dpTENKamNtVmhkR1ZEWVd4bGJtUmhjaUlzSW1Wc1pXMGlMQ0p0YjI0aUxDSmtJaXdpUkdGMFpTSXNJblJoWW14bElpd2lhU0lzSW1kbGRFUmhlU0lzSW1kbGRFMXZiblJvSWl3aVoyVjBSR0YwWlNJc0luTmxkRVJoZEdVaUxDSmtZWFJoUW1GelpTSXNJbXh2WVdSR2NtOXRSRUlpTENKa1lYUmxJaXdpWkdGNUlpd2lZV1JrUlhabGJuUkdiM0pDWVdOclFuVjBiMjl1SWl3aVlXUmtSWFpsYm5SR2IzSkdiM0ozWVhKa1FuVjBkRzl1SWl3aWNtVnVaR1Z5VFdGa1lXd2lMQ0psZG1WdWRDSXNJbVJsYkVOaGNIUnBiMjRpTENKMFlYTnJWR2wwYkdVaUxDSjBZWE5yUkdWelkzSnBjSFJwYjI0aUxDSmtZWFJoSWl3aVUyRjJaVVYyWlc1MFNXNUVRaUlzSW1VaUxDSjBZWEpuWlhRaUxDSjBZV2RPWVcxbElpd2lZMnhoYzNOT1lXMWxJaXdpZEdWNGRDSXNJbkJoY21WdWRFNXZaR1VpTENKemJHbGpaU0lzSW5KbGJXOTJaU0lzSW1SbGJHVjBaVVYyWlc1MFNXNUVRaUlzSW5SaWIyUjVJaXdpYlc5a1lXd2lMQ0pqYkc5elpVMXZaR0ZzSWl3aWMyRjJaU0lzSW5OMGVXeGxJaXdpWkdsemNHeGhlU0lzSW5SaGMydEVaWE5qY21sd2RHbHZia2x1Y0hWMElpd2lkbUZzZFdVaUxDSjBZWE5yVkdsMGJHVkpibkIxZENJc0ltRmtaRU5oY0hScGIyNGlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3TzBGQlFVRTdPenM3T3pzN08wbEJRMDFCTEZrN096czdPenM3SzBKQlEwdERMRk1zUlVGQlZ6dEJRVU5rTEdsQ1FVRkxReXhYUVVGTU8wRkJRMEVzYVVKQlFVdERMRlZCUVV3N1FVRkRRU3hwUWtGQlMwTXNWVUZCVER0QlFVTkJMR2xDUVVGTFF5eHZRa0ZCVER0QlFVTkJMR2xDUVVGTFF5eGpRVUZNTEVOQlFXOUNUQ3hUUVVGd1FqdEJRVU5CTEdsQ1FVRkxUU3hsUVVGTUxFTkJRWEZDVGl4VFFVRnlRanRCUVVOQk8wRkJRMGc3T3p0elEwRkZZVHRCUVVOV08wRkJRMEVzWjBKQlFVbFBMRk5CUVZORExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1VVRkJka0lzUTBGQllqdEJRVU5CTEdkQ1FVRkpReXhOUVVGTlJpeFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xFdEJRWFpDTEVOQlFWWTdRVUZEUVVZc2NVSkJRVk5CTEU5QlFVOUpMRk5CUVZBc1owaEJSMkZETEdWQlFXVkRMRTlCUVdZc1EwRkRiRUlzVFVGRWEwSXNRMEZJWWl4clNFRkJWRHRCUVU5QlNDeHJRa0ZCVFVFc1NVRkJTVU1zVTBGQlNpeHhSRUZCVGp0QlFVZElPenM3Y1VOQlJWazdRVUZEVkR0QlFVTkJTQ3h4UWtGQlUwTXNZVUZCVkN4RFFVRjFRaXhQUVVGMlFpeEZRVUZuUTBzc1owSkJRV2hETEVOQlFXbEVMRTlCUVdwRUxFVkJRVEJFTEZsQlFVMDdRVUZETlVSRExIbENRVUZUUXl4SlFVRlVMRWRCUVdkQ0xFVkJRV2hDTzBGQlEwZ3NZVUZHUkR0QlFVZElPenM3YlVOQlJWVm9RaXhUTEVWQlFWYzdRVUZEYkVJN1FVRkRRU3huUWtGQlNXbENMRzlDUVVGeFFsUXNVMEZCVTBNc1lVRkJWQ3hEUVVOeVFpeFZRVVJ4UWl4RlFVVjJRa1VzVTBGR2RVSXNjME5CUVhwQ08wRkJSMEVzWjBKQlFVbFBMSE5DUVVGMVFsWXNVMEZCVTBNc1lVRkJWQ3hEUVVOMlFpeFZRVVIxUWl4RlFVVjZRa1VzVTBGR2VVSXNhMFJCUVROQ08wRkJSMEZSTEc5Q1FVRlJReXhIUVVGU0xFTkJRVmx3UWl4VFFVRmFPMEZCUTBnN096c3JRMEZGYzBJN1FVRkRia0k3UVVGRFFWRXNjVUpCUVZORExHRkJRVlFzUTBGQmRVSXNZMEZCZGtJc1JVRkJkVU5GTEZOQlFYWkRPMEZCVFVnN096dDFRMEZGWTFnc1V5eEZRVUZYTzBGQlEzUkNPMEZCUTBFc1owSkJRVWx4UWl4UFFVRlBja0lzVlVGQlZTeERRVUZXTEVOQlFWZ3NRMEZHYzBJc1EwRkZSenRCUVVONlFpeG5Ra0ZCU1hOQ0xGRkJRVkYwUWl4VlFVRlZMRU5CUVZZc1EwRkJXanM3UVVGRlFTeG5Ra0ZCU1hWQ0xGZEJRVmM3UVVGRFdEdEJRVU5CTEc5Q1FVWlhMRVZCUjFnc1UwRklWeXhGUVVsWUxFMUJTbGNzUlVGTFdDeFJRVXhYTEVWQlRWZ3NTMEZPVnl4RlFVOVlMRTFCVUZjc1JVRlJXQ3hOUVZKWExFVkJVMWdzVVVGVVZ5eEZRVlZZTEZWQlZsY3NSVUZYV0N4VFFWaFhMRVZCV1Znc1VVRmFWeXhGUVdGWUxGTkJZbGNzUTBGQlpqdEJRV1ZCTEdkQ1FVRkpReXhaUVVGWlJpeFJRVUZSTEVOQlFYaENMRU5CY0VKelFpeERRVzlDU3p0QlFVTXpRbVFzY1VKQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVjBGQmRrSXNSVUZCYjBORkxGTkJRWEJETEVkQlEwbFpMRk5CUVZORExGTkJRVlFzU1VGQmMwSXNSMEZCZEVJc1IwRkJORUpJTEVsQlJHaERPMEZCUlVFc2NVSkJRVk5KTEdOQlFWUXNRMEZCZDBKS0xFbEJRWGhDTEVWQlFUaENReXhMUVVFNVFpeEZRVUZ4UXp0QlFVTnFReXh2UWtGQlNVa3NUMEZCVDJ4Q0xGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1owSkJRWFpDTEVOQlFWZzdRVUZEUVN4dlFrRkJTV3RDTEUxQlFVMU1MRkZCUVZFc1EwRkJiRUlzUTBGR2FVTXNRMEZGV2p0QlFVTnlRaXh2UWtGQlNVMHNTVUZCU1N4SlFVRkpReXhKUVVGS0xFTkJRVk5TTEVsQlFWUXNSVUZCWlUwc1IwRkJaaXhEUVVGU08wRkJRMEVzYjBKQlFVbEhMRFJPUVVGS08wRkJRMEU3UVVGRFFUdEJRVU5CTEhGQ1FVRkxMRWxCUVVsRExFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVU1zVDBGQlQwb3NRMEZCVUN4RFFVRndRaXhGUVVFclFrY3NSMEZCTDBJc1JVRkJiME03UVVGRGFFTkVMRFpDUVVGVExGZEJRVlE3UVVGRFNEdEJRVU5FTzBGQlEwRXNkVUpCUVU5R0xFVkJRVVZMTEZGQlFVWXNUVUZCWjBKT0xFZEJRWFpDTEVWQlFUUkNPMEZCUTNoQ1J5d3JRMEZCZDBKR0xFVkJRVVZOTEU5QlFVWXNSVUZCZUVJc1UwRkJkVU5hTEV0QlFYWkRMRk5CUVdkRVJDeEpRVUZvUkN4WFFVRjVSRThzUlVGQlJVMHNUMEZCUml4RlFVRjZSRHM3UVVGRlFTeDNRa0ZCU1VZc1QwRkJUMG9zUTBGQlVDeEpRVUZaTEVOQlFWb3NTVUZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZEY0VJN1FVRkRRVVVzYVVOQlFWTXNWMEZCVkR0QlFVTklPMEZCUTBSR0xITkNRVUZGVHl4UFFVRkdMRU5CUVZWUUxFVkJRVVZOTEU5QlFVWXNTMEZCWXl4RFFVRjRRanRCUVVOSU8wRkJRMFE3UVVGRFFTeHZRa0ZCU1VZc1QwRkJUMG9zUTBGQlVDeExRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMmhDTEhsQ1FVRkxMRWxCUVVsSExFbEJRVWxETEU5QlFVOUtMRU5CUVZBc1EwRkJZaXhGUVVGM1FrY3NTVUZCU1N4RFFVRTFRaXhGUVVFclFrRXNSMEZCTDBJc1JVRkJiME03UVVGRGFFTkVMR2xEUVVGVExGZEJRVlE3UVVGRFNEdEJRVU5LTzBGQlEwUTdRVUZEUVVFc2VVSkJRVk1zWlVGQlZEdEJRVU5CTzBGQlEwRktMSEZDUVVGTFppeFRRVUZNTEVkQlFXbENiVUlzUzBGQmFrSTdRVUZEUVN4dlFrRkJTVTBzVjBGQlZ5eDNRa0ZCWmpzN1FVRkZRVUVzZVVKQlFWTkRMRlZCUVZRN1FVRkRTRHM3UVVGRlJDeHhRa0ZCVTB3c1RVRkJWQ3hEUVVGblFrMHNTVUZCYUVJc1JVRkJjMEk3UVVGRGJFSTdRVUZEUVN4dlFrRkJTVU1zVFVGQlRVUXNTMEZCUzA0c1RVRkJUQ3hGUVVGV08wRkJRMEVzYjBKQlFVbFBMRTlCUVU4c1EwRkJXQ3hGUVVGalFTeE5RVUZOTEVOQlFVNDdRVUZEWkN4MVFrRkJUMEVzVFVGQlRTeERRVUZpTzBGQlEwZzdPMEZCUlVSa0xESkNRVUZsU2l4SlFVRm1MRVZCUVhGQ1F5eExRVUZ5UWl4RlFXcEZjMElzUTBGcFJVODdRVUZETjBJc2JVSkJRVTkwUWl4VFFVRlFMRU5CYkVWelFpeERRV3RGU2p0QlFVTnlRanM3TzNkRFFVVmxRU3hUTEVWQlFWYzdRVUZCUVRzN1FVRkRka0k3UVVGRFFWRXNjVUpCUTB0RExHRkJSRXdzUTBGRGJVSXNZVUZFYmtJc1JVRkZTMHNzWjBKQlJrd3NRMEZGYzBJc1QwRkdkRUlzUlVGRkswSTdRVUZCUVN4MVFrRkJUU3hOUVVGTE1FSXNjVUpCUVV3c1EwRkJNa0o0UXl4VFFVRXpRaXhEUVVGT08wRkJRVUVzWVVGR0wwSTdRVUZIUVZFc2NVSkJRMHRETEdGQlJFd3NRMEZEYlVJc1owSkJSRzVDTEVWQlJVdExMR2RDUVVaTUxFTkJSWE5DTEU5QlJuUkNMRVZCUlN0Q08wRkJRVUVzZFVKQlEzWkNMRTFCUVVzeVFpeDNRa0ZCVEN4RFFVRTRRbnBETEZOQlFUbENMRU5CUkhWQ08wRkJRVUVzWVVGR0wwSTdRVUZMUVZFc2NVSkJRMHRETEdGQlJFd3NRMEZEYlVJc1QwRkVia0lzUlVGRlMwc3NaMEpCUmt3c1EwRkZjMElzVlVGR2RFSXNSVUZGYTBNN1FVRkJRU3gxUWtGQlRTeE5RVUZMTkVJc1YwRkJUQ3hEUVVGcFFrTXNTMEZCYWtJc1EwRkJUanRCUVVGQkxHRkJSbXhETzBGQlIwRnVReXh4UWtGRFMwTXNZVUZFVEN4RFFVTnRRaXhQUVVSdVFpeEZRVVZMU3l4blFrRkdUQ3hEUVVWelFpeFBRVVowUWl4RlFVVXJRanRCUVVGQkxIVkNRVUZOTEUxQlFVczRRaXhWUVVGTUxFTkJRV2RDUkN4TFFVRm9RaXhEUVVGT08wRkJRVUVzWVVGR0wwSTdRVUZIU0RzN08ybEVRVVYzUWpORExGTXNSVUZCVnp0QlFVTm9RenRCUVVOQkxHZENRVUZKY1VJc1QwRkJUM0pDTEZWQlFWVXNRMEZCVml4RFFVRllPMEZCUTBFc1owSkJRVWx6UWl4UlFVRlJkRUlzVlVGQlZTeERRVUZXTEVOQlFWbzdRVUZEUVN4blFrRkJTWE5DTEZWQlFWVXNSVUZCWkN4RlFVRnJRanRCUVVOa1JDeDFRa0ZCVDBFc1QwRkJUeXhEUVVGa08wRkJRMEZETEhkQ1FVRlJMRU5CUVZJN1FVRkRRWFJDTERCQ1FVRlZMRU5CUVZZc1NVRkJaWEZDTEVsQlFXWTdRVUZEUVhKQ0xEQkNRVUZWTEVOQlFWWXNTVUZCWlhOQ0xFdEJRV1k3UVVGRFNDeGhRVXhFTEUxQlMwODdRVUZEU0VFc2QwSkJRVkZCTEZGQlFWRXNRMEZCYUVJN1FVRkRRWFJDTERCQ1FVRlZMRU5CUVZZc1NVRkJaWE5DTEV0QlFXWTdRVUZEU0R0QlFVTkVaQ3h4UWtGQlUwTXNZVUZCVkN4RFFVRjFRaXhuUWtGQmRrSXNSVUZCZVVORkxGTkJRWHBETEVkQlFYRkVMRVZCUVhKRUxFTkJZbWRETEVOQllYbENPMEZCUTNwRUxHbENRVUZMVGl4alFVRk1MRU5CUVc5Q1RDeFRRVUZ3UWl4RlFXUm5ReXhEUVdOQk8wRkJRMjVET3pzN09FTkJSWEZDUVN4VExFVkJRVmM3UVVGRE4wSTdRVUZEUVN4blFrRkJTWEZDTEU5QlFVOXlRaXhWUVVGVkxFTkJRVllzUTBGQldEdEJRVU5CTEdkQ1FVRkpjMElzVVVGQlVYUkNMRlZCUVZVc1EwRkJWaXhEUVVGYU8wRkJRMEVzWjBKQlFVbHpRaXhWUVVGVkxFTkJRV1FzUlVGQmFVSTdRVUZEWWtRc2RVSkJRVTlCTEU5QlFVOHNRMEZCWkR0QlFVTkJReXgzUWtGQlVTeEZRVUZTTzBGQlEwRjBRaXd3UWtGQlZTeERRVUZXTEVsQlFXVnhRaXhKUVVGbU8wRkJRMEZ5UWl3d1FrRkJWU3hEUVVGV0xFbEJRV1Z6UWl4TFFVRm1PMEZCUTBnc1lVRk1SQ3hOUVV0UE8wRkJRMGhCTEhkQ1FVRlJRU3hSUVVGUkxFTkJRV2hDTzBGQlEwRjBRaXd3UWtGQlZTeERRVUZXTEVsQlFXVnpRaXhMUVVGbU8wRkJRMGc3UVVGRFJHUXNjVUpCUVZORExHRkJRVlFzUTBGQmRVSXNaMEpCUVhaQ0xFVkJRWGxEUlN4VFFVRjZReXhIUVVGeFJDeEZRVUZ5UkN4RFFXSTJRaXhEUVdFMFFqdEJRVU42UkN4cFFrRkJTMDRzWTBGQlRDeERRVUZ2UWt3c1UwRkJjRUlzUlVGa05rSXNRMEZqUnp0QlFVTnVRenM3TzIxRFFVVlZOa01zVXl4RlFVRlhReXhsTEVWQlFXbENReXhKTEVWQlFVMDdRVUZEZWtNc1owSkJRVWxZTEZkQlFWY3NkMEpCUVdZN1FVRkRRVFZDTEhGQ1FVRlRReXhoUVVGVUxFOUJRMUZ6UXl4SlFVUlNMRVZCUlVWd1F5eFRRVVpHTEdOQlJYVkNhME1zVTBGR2RrSTdRVUZIUVZRc2NVSkJRVk5aTEdGQlFWUXNRMEZCZFVKSUxGTkJRWFpDTEVWQlFXdERReXhsUVVGc1F5eEZRVUZ0UkVNc1NVRkJia1E3UVVGRFNEczdPMjFEUVVWVlJTeERMRVZCUVVjN1FVRkRWanRCUVVOQkxHZENRVUZKUXl4VFFVRlRSQ3hGUVVGRlF5eE5RVUZtTzBGQlEwRXNaMEpCUVVsQkxFOUJRVTlETEU5QlFWQXNTVUZCYTBJc1VVRkJiRUlzU1VGQk9FSkVMRTlCUVU5RkxGTkJRVkFzU1VGQmIwSXNUMEZCZEVRc1JVRkJLMFE3UVVGREwwUXNaMEpCUVVsRExFOUJRVTlJTEU5QlFVOUpMRlZCUVZBc1EwRkJhMEl6UXl4VFFVRnNRaXhEUVVFMFFqUkRMRXRCUVRWQ0xFTkJRV3RETEVOQlFXeERMRVZCUVhGRExFTkJRVU1zUlVGQmRFTXNRMEZCV0R0QlFVTkJMR2RDUVVGSmFrSXNUMEZCVDFrc1QwRkJUMGtzVlVGQlVDeERRVUZyUWtFc1ZVRkJiRUlzUTBGQk5rSkdMRk5CUVhoRE8wRkJRMEZHTEcxQ1FVRlBTU3hWUVVGUUxFTkJRV3RDUlN4TlFVRnNRanRCUVVOQkxHZENRVUZKY0VJc1YwRkJWeXgzUWtGQlppeERRVkJWTEVOQlQyVTdRVUZEZWtKQkxIRkNRVUZUY1VJc1pVRkJWQ3hEUVVGNVFtNUNMRWxCUVhwQ0xFVkJRU3RDWlN4SlFVRXZRaXhGUVZKVkxFTkJVVFJDTzBGQlEzcERPenM3YjBOQlJWZEtMRU1zUlVGQlJ6dEJRVUZCT3p0QlFVTllMR2RDUVVGSlF5eFRRVUZUUkN4RlFVRkZReXhOUVVGbU8wRkJRMEVzWjBKQlFVbEJMRTlCUVU5RExFOUJRVkFzUzBGQmJVSXNTVUZCZGtJc1JVRkJOa0k3UVVGRE4wSXNaMEpCUVVsS0xFOUJRVTlITEU5QlFVOUZMRk5CUVd4Q08wRkJRMEVzWjBKQlFVbE5MRkZCUVZGc1JDeFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xFOUJRWFpDTEVOQlFWbzdRVUZEUVdsRUxHdENRVUZOTDBNc1UwRkJUaXh0U2tGSGNVTnZReXhKUVVoeVF6dEJRV05CTEdkQ1FVRkpXU3hSUVVGUmJrUXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeHRRa0ZCZGtJc1EwRkJXanRCUVVOQkxHZENRVUZKYlVRc1lVRkJZVVFzVFVGQlRXeEVMR0ZCUVU0c1EwRkJiMElzWVVGQmNFSXNRMEZCYWtJN1FVRkRRU3huUWtGQlNXOUVMRTlCUVU5R0xFMUJRVTFzUkN4aFFVRk9MRU5CUVc5Q0xGRkJRWEJDTEVOQlFWZzdRVUZEUVd0RUxHdENRVUZOUnl4TFFVRk9MRU5CUVZsRExFOUJRVm9zUjBGQmMwSXNUVUZCZEVJN1FVRkRRVU1zYVVOQlFYRkNReXhMUVVGeVFpeEhRVUUyUWl4RlFVRTNRanRCUVVOQlRDeDFRa0ZCVnpsRExHZENRVUZZTEVOQlFUUkNMRTlCUVRWQ0xFVkJRWEZETzBGQlFVRXNkVUpCUVUwMlF5eE5RVUZOU0N4TlFVRk9MRVZCUVU0N1FVRkJRU3hoUVVGeVF6dEJRVU5CU3l4cFFrRkJTeTlETEdkQ1FVRk1MRU5CUVhOQ0xFOUJRWFJDTEVWQlFTdENMRmxCUVUwN1FVRkRha01zYjBKQlFVa3JRaXhaUVVGWmNVSXNaVUZCWlVRc1MwRkJMMEk3UVVGRFFTeHZRa0ZCU1c1Q0xHdENRVUZyUW10Q0xIRkNRVUZ4UWtNc1MwRkJNME03UVVGRFFTeHZRa0ZCU1hCQ0xGTkJRVW9zUlVGQlpTeFBRVUZMYzBJc1ZVRkJUQ3hEUVVGblFuUkNMRk5CUVdoQ0xFVkJRVEpDUXl4bFFVRXpRaXhGUVVFMFEwTXNTVUZCTlVNN1FVRkRabGtzYzBKQlFVMUlMRTFCUVU0N1FVRkRTQ3hoUVV4RU8wRkJUVWc3T3pzN096dHJRa0ZGVlhwRUxGa2lMQ0ptYVd4bElqb2lRMkZzWlc1a1lYSlFZV2RsTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElHUmlJR1p5YjIwZ1hDSXVMMlJoZEdGQ1lYTmxYQ0k3WEc1amJHRnpjeUJqWVd4bGJtUmhjbEJoWjJVZ2UxeHVJQ0FnSUZKbGJtUmxjaWhrWVhSbFRXOXVkR2dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVpZFdsc1pFaGxZV1JsY2lncE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WNGFYUkNkWFIwYjI0b0tUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1U1pXNWtaWEpRWVdkbEtDazdYRzRnSUNBZ0lDQWdJSFJvYVhNdWNtVnVaR1Z5UW5WMGRHOXVRMkZzWlc1a1lYSW9LVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzVrWlhKRFlXeGxibVJoY2loa1lYUmxUVzl1ZEdncE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Ga1pFaGhibVJzWlhKRmRtVnVkQ2hrWVhSbFRXOXVkR2dwTzF4dUlDQWdJQ0FnSUNBdkx5RFJoOUdDMEw0dDBZTFF2aURRdmRDd0lOQy8wTDdRdE5DKzBMSFF1TkM0SU5DNjBMN1F2ZEdCMFlMUmdOR0QwTHJSZ3RDKzBZRFFzQ3dnMFlMUmc5R0NJTkdBMExYUXZkQzAwTFhSZ05DNDBZYlFzQ0RRdXRDdzBMdlF0ZEM5MExUUXNOR0EwWXdnMExnZzBMVFF2dEN4MExEUXN0QzcwWS9SanRHRzBZYlFzQ0RRdnRDeDBZRFFzTkN4MEw3Umd0R0gwTGpRdXRDNFhHNGdJQ0FnZlZ4dVhHNGdJQ0FnWW5WcGJHUklaV0ZrWlhJb0tTQjdYRzRnSUNBZ0lDQWdJQzh2MFlMUmc5R0NJTkdBMExYUXZkQzAwTFhSZ05DNDBZYlFzQ0RRdXRHQzBMNGcwTGZRc05HSTBMWFF1eURRdUNEUXV0QzkwTDdRdjlDNjBMQWcwTExSaTlHRjBMN1F0TkN3WEc0Z0lDQWdJQ0FnSUhaaGNpQm9aV0ZrWlhJZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aWFHVmhaR1Z5WENJcE8xeHVJQ0FnSUNBZ0lDQjJZWElnWkdsMklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0ltUnBkbHdpS1R0Y2JpQWdJQ0FnSUNBZ2FHVmhaR1Z5SUQwZ2FHVmhaR1Z5TG1sdWJtVnlTRlJOVENBOUlHQmNiaUFnUEdScGRpQmpiR0Z6Y3oxY0ltTnZiQzF0WkMwNVhDSStQQzlrYVhZK1hHNGdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyOXNMVzFrTFROY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUR4d0lHTnNZWE56UFZ3aWJHVmhaRndpUGlSN2MyVnpjMmx2YmxOMGIzSmhaMlV1WjJWMFNYUmxiU2hjYmlBZ0lDQWdJQ0FnSUNBZ0lGd2lkWE5sY2x3aVhHNGdJQ0FnSUNBZ0lDbDlJRHhpZFhSMGIyNGdZMnhoYzNNOVhDSmlkRzRnWW5SdUxXUmxabUYxYkhSY0lpQnBaRDFjSW1WNGFYUmNJajdRa3RHTDBZWFF2dEMwUEM5aWRYUjBiMjQrUEhBK1hHNGdJQ0FnSUNBZ0lDQWdJQ0E4TDJScGRqNWdPMXh1SUNBZ0lDQWdJQ0JrYVhZZ1BTQmthWFl1YVc1dVpYSklWRTFNSUQwZ1lDQmNiaUFnUEdScGRpQmpiR0Z6Y3oxY0ltTnZiblJoYm5SY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbUE3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdaWGhwZEVKMWRIUnZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ0x5L1F2dEN4MFlEUXNOQ3gwTDdSZ3RHSDBMalF1aURRc3RHTDBZWFF2dEMwMExBZzBMM1FzQ0RRczlDNzBMRFFzdEM5MFlQUmppRFJnZEdDMFlEUXNOQzkwTGpSaHRHRFhHNGdJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJalpYaHBkRndpS1M1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aVkyeHBZMnRjSWl3Z0tDa2dQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdiRzlqWVhScGIyNHVhR0Z6YUNBOUlGd2lYQ0k3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUZKbGJtUmxjbEJoWjJVb1pHRjBaVTF2Ym5Sb0tTQjdYRzRnSUNBZ0lDQWdJQzh2MExmUXZkQ3cwWTRnMEwzUXRTRFF1OUdEMFlmUmlOQzEwTFVnMEwzUXNOQzMwTExRc05DOTBMalF0U3dnMFlMUmc5R0NJTkdCMEw3UXQ5QzAwTERSanRHQzBZelJnZEdQSU5DMDBMalFzdEdMSU5DMDBMdlJqeURSZ05DMTBMM1F0TkN3MFlEUXNDRFF1dEN3MEx2UXRkQzkwTFRRc05HQTBZOGcwTGdnMExyUXZkQyswTC9RdnRDNlhHNGdJQ0FnSUNBZ0lIWmhjaUJ3YkdGalpVSjFkSFJ2YmxKbGJtUmxjaUE5SUNoa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRnh1SUNBZ0lDQWdJQ0FnSUNBZ1hDSXVZMjl1ZEdGdWRGd2lYRzRnSUNBZ0lDQWdJQ2t1YVc1dVpYSklWRTFNSUQwZ1lEeGthWFlnWTJ4aGMzTTlYQ0pDZFhSMGIyNVFiR0ZqWlZ3aVBqd3ZaR2wyUG1BcE8xeHVJQ0FnSUNBZ0lDQjJZWElnY0d4aFkyVkRZV3hsYm1SaGNsSmxibVJsY2lBOUlDaGtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z4dUlDQWdJQ0FnSUNBZ0lDQWdYQ0l1WTI5dWRHRnVkRndpWEc0Z0lDQWdJQ0FnSUNrdWFXNXVaWEpJVkUxTUlDczlJR0E4WW5JK1BHSnlQaUE4WkdsMklHTnNZWE56UFZ3aVEyRnNaVzVrWVhKUWJHRmpaVndpUGp3dlpHbDJQbUFwTzF4dUlDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5aGtZWFJsVFc5dWRHZ3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxibVJsY2tKMWRIUnZia05oYkdWdVpHRnlLQ2tnZTF4dUlDQWdJQ0FnSUNBdkx5RFJnZEN3MEx6UXNDRFF2dEdDMFlEUXVOR0IwTDdRc3RDNjBMQWcwTHJRdmRDKzBML1F2dEM2WEc0Z0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1UW5WMGRHOXVVR3hoWTJWY0lpa3VhVzV1WlhKSVZFMU1JRDBnWUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0E4WkdsMklHRnNhV2R1UFZ3aVkyVnVkR1Z5WENJK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHSjFkSFJ2YmlCamJHRnpjejFjSW1KMGJpQmlkRzR0WkdWbVlYVnNkRndpSUdsa1BWd2lZbUZqYTBKMWRIUnZibHdpUHRDZDBMRFF0OUN3MExROEwySjFkSFJ2Ymo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGMzQmhiaUJqYkdGemN6MWNJbTFoZEdWeWFXRnNMV1JsYzJsbmJpMXBZMjl1YVdNdFptOXVkRndpSUdsa1BWd2lkR1ZuVFc5dWRHaGNJajQ4TDNOd1lXNCtYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR0oxZEhSdmJpQmpiR0Z6Y3oxY0ltSjBiaUJpZEc0dFpHVm1ZWFZzZEZ3aUlHbGtQVndpWm05eWQyRnlaRUoxZEhSdmJsd2lQdENTMEwvUXRkR0EwTFhRdER3dlluVjBkRzl1UGx4dUlDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1lEdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpXNWtaWEpEWVd4bGJtUmhjaWhrWVhSbFRXOXVkR2dwSUh0Y2JpQWdJQ0FnSUNBZ0x5L1FzdEMrMFlJZzBZTFJnOUdDSU5HQTBMWFF2ZEMwMExEUmdOQzQwWWJRc0NEUXV0Q3cwTHZRdGRDOTBMVFFzTkdBMFl3ZzBMM1FzQ0RSZ3RDMTBMclJnOUdKMExqUXVTRFF2TkMxMFlIUmo5R0dYRzRnSUNBZ0lDQWdJSFpoY2lCNVpXRnlJRDBnWkdGMFpVMXZiblJvV3pCZE95QXZMeURSZ05DdzBMZlFzZEMxMFlEUXNOQzEwWUxSak5HQjBZOGcwTHpRc05HQjBMalFzaURRdE5DNzBZOGcwTC9RdnRDNzBZUFJoOUMxMEwzUXVOR1BJTkN6MEw3UXROQ3dJTkM0SU5DODBMWFJnZEdQMFliUXNGeHVJQ0FnSUNBZ0lDQjJZWElnYlc5dWRHZ2dQU0JrWVhSbFRXOXVkR2hiTVYwN1hHNWNiaUFnSUNBZ0lDQWdkbUZ5SUdGeWNrMXZiblJvSUQwZ1cxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHkvUXZOQ3cwWUhSZ2RDNDBMSWcwWUVnMEx6UXRkR0IwWS9SaHRDdzBMelF1Q0RRdE5DNzBZOGcwTDdSZ3RDKzBMSFJnTkN3MExiUXRkQzkwTGpSanlEUXV0Q3cwTHJRdnRDNUlOR0IwTFhRdWRHSDBMRFJnU0RRdk5DMTBZSFJqOUdHSU5DNElOQ3owTDdRdEZ4dUlDQWdJQ0FnSUNBZ0lDQWdYQ0xRcjlDOTBMTFFzTkdBMFl4Y0lpeGNiaUFnSUNBZ0lDQWdJQ0FnSUZ3aTBLVFF0ZEN5MFlEUXNOQzcwWXhjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJRndpMEp6UXNOR0EwWUpjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJRndpMEpEUXY5R0EwTFhRdTlHTVhDSXNYRzRnSUNBZ0lDQWdJQ0FnSUNCY0l0Q2MwTERRdVZ3aUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnWENMUW1OR08wTDNSakZ3aUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnWENMUW1OR08wTHZSakZ3aUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnWENMUWtOQ3kwTFBSZzlHQjBZSmNJaXhjYmlBZ0lDQWdJQ0FnSUNBZ0lGd2kwS0hRdGRDOTBZTFJqOUN4MFlEUmpGd2lMRnh1SUNBZ0lDQWdJQ0FnSUNBZ1hDTFFudEM2MFlMUmo5Q3gwWURSakZ3aUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnWENMUW5kQyswWS9Rc2RHQTBZeGNJaXhjYmlBZ0lDQWdJQ0FnSUNBZ0lGd2kwSlRRdGRDNjBMRFFzZEdBMFl4Y0lseHVJQ0FnSUNBZ0lDQmRPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2MyaHZkMDF2Ym5Sb0lEMGdiVzl1ZEdnZ0xTQXhPeUF2THlEUXZOQzQwTDNSZzlHQjBZUFF0ZEM4SU5DODBMWFJnZEdQMFlZZzBZSXUwTG9nMEx6UXRkQzkwWS9RdTlDNElOQzkwTERSaDlDdzBMdlF2aURRczlDKzBMVFFzQ0RRdmRDMUlOR0JJREFnMExBZzBZRWdNVnh1SUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtGd2lJM1JsWjAxdmJuUm9YQ0lwTG1sdWJtVnlTRlJOVENBOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JoY25KTmIyNTBhRnR6YUc5M1RXOXVkR2hkSUNzZ1hDSWdYQ0lnS3lCNVpXRnlPMXh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJqY21WaGRHVkRZV3hsYm1SaGNpaDVaV0Z5TENCdGIyNTBhQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdWc1pXMGdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtGd2lMa05oYkdWdVpHRnlVR3hoWTJWY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiVzl1SUQwZ2JXOXVkR2dnTFNBeE95QXZMeURRdk5DMTBZSFJqOUdHMFlzZzBMSWdTbE1nMExqUXROR0QwWUlnMEw3UmdpQXdJTkMwMEw0Z01URXNJTkN3SU5DOTBMVWcwTDdSZ2lBeElOQzAwTDRnTVRKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCa0lEMGdibVYzSUVSaGRHVW9lV1ZoY2l3Z2JXOXVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIwWVdKc1pTQTlJR0E4ZEdGaWJHVWdZMnhoYzNNOVhDSjBZV0pzWlNCMFlXSnNaUzFpYjNKa1pYSmxaQ0IwWVdKc1pTMW9iM1psY2x3aVBqeDBjajQ4ZEdnKzBML1F2VHd2ZEdnK1BIUm9QdEN5MFlJOEwzUm9QangwYUQ3UmdkR0FQQzkwYUQ0OGRHZyswWWZSZ2p3dmRHZytQSFJvUHRDLzBZSThMM1JvUGp4MGFEN1JnZEN4UEM5MGFENDhkR2crMExMUmdUd3ZkR2crUEM5MGNqNDhkSEkrWUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SU5DMzBMRFF2OUMrMEx2UXZkQzQwWUxSakNEUXY5QzEwWURRc3RHTDBMa2cwWURSajlDMElOQyswWUlnMEwvUXZ0QzkwTFhRdE5DMTBMdlJqTkM5MExqUXV0Q3dYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5RFF1Q0RRdE5DK0lOQzAwTDNSanl3ZzBZRWcwTHJRdnRHQzBMN1JnTkMrMExQUXZpRFF2ZEN3MFlmUXVOQzkwTERRdGRHQzBZSFJqeURRdk5DMTBZSFJqOUdHWEc0Z0lDQWdJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR2RsZEVSaGVTaGtLVHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR0ZpYkdVZ0t6MGdYQ0k4ZEdRK1BDOTBaRDVjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJTkdQMFlmUXRkQzUwTHJRdUNEUXV0Q3cwTHZRdGRDOTBMVFFzTkdBMFk4ZzBZRWcwTFRRc05HQzBMRFF2TkM0WEc0Z0lDQWdJQ0FnSUNBZ0lDQjNhR2xzWlNBb1pDNW5aWFJOYjI1MGFDZ3BJRDA5SUcxdmJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJoWW14bElDczlJR0E4ZEdRZ1kyeGhjM005WENKa0pIdGtMbWRsZEVSaGRHVW9LWDFmSkh0dGIyNTBhSDFmSkh0NVpXRnlmVndpUGlSN1pDNW5aWFJFWVhSbEtDbDlQQzkwWkQ1Z08xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dkbGRFUmhlU2hrS1NBbElEY2dQVDBnTmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlEUXN0R0JMQ0RRdjlDKzBZSFF1OUMxMExUUXZkQzQwTGtnMExUUXRkQzkwWXdnTFNEUXY5QzEwWURRdGRDeTBMN1F0Q0RSZ2RHQzBZRFF2dEM2MExoY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR0ZpYkdVZ0t6MGdYQ0k4TDNSeVBqeDBjajVjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pDNXpaWFJFWVhSbEtHUXVaMlYwUkdGMFpTZ3BJQ3NnTVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeURRdE5DKzBMSFF1TkdDMFl3ZzBZTFFzTkN4MEx2UXVOR0cwWU1nMEwvUmc5R0IwWUxSaTlDODBMZ2cwWS9SaDlDMTBMblF1dEN3MEx6UXVDd2cwTFhSZ2RDNzBMZ2cwTDNSZzlDMjBMM1F2bHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2RsZEVSaGVTaGtLU0FoUFNBd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUdkbGRFUmhlU2hrS1RzZ2FTQThJRGM3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMFlXSnNaU0FyUFNCY0lqeDBaRDQ4TDNSa1Bsd2lPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklOQzMwTERRdXRHQTBZdlJndEdNSU5HQzBMRFFzZEM3MExqUmh0R0RYRzRnSUNBZ0lDQWdJQ0FnSUNCMFlXSnNaU0FyUFNCY0lqd3ZkSEkrUEM5MFlXSnNaVDVjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SU5HQzBMN1F1OUdNMExyUXZpRFF2dEMwMEwzUXZpRFF2OUdBMExqUmdkQ3kwTERRdU5DeTBMRFF2ZEM0MExVZ2FXNXVaWEpJVkUxTVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkdWdExtbHVibVZ5U0ZSTlRDQTlJSFJoWW14bE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYkdWMElHUmhkR0ZDWVhObElEMGdibVYzSUdSaUtDazdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmhkR0ZDWVhObExteHZZV1JHY205dFJFSW9LVHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlHZGxkRVJoZVNoa1lYUmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeURRdjlDKzBMdlJnOUdIMExqUmd0R01JTkM5MEw3UXZOQzEwWUFnMExUUXZkR1BJTkM5MExYUXROQzEwTHZRdUN3ZzBMN1JnaUF3S05DLzBMMHBJTkMwMEw0Z05palFzdEdCS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdSaGVTQTlJR1JoZEdVdVoyVjBSR0Y1S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pHRjVJRDA5SURBcElHUmhlU0E5SURjN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdaR0Y1SUMwZ01UdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUdOeVpXRjBaVU5oYkdWdVpHRnlLSGxsWVhJc0lHMXZiblJvS1RzZ0x5L1FzdEdMMExmUXZ0Q3lJTkN5MEwzUmc5R0MwWURRdGRDOTBMM1F0ZEM1SU5HRTBZUFF2ZEM2MFliUXVOQzRJTkdBMExYUXZkQzAwTERSZ05Dd0lOQzYwTERRdTlDMTBMVFFzTkdBMFk5Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdSaGRHVk5iMjUwYURzZ0x5OGcwTExRdnRDMzBZRFFzTkdKMFkvUXRkQzhJTkMwMExEUmd0R0RJTkM5MExBZzBMclF2dEdDMEw3UmdOR0QwWTRnMEwvUmdOQyswTGpRdDlDeTBMN1F0TkM0MEx2UmdkR1BJTkdBMExYUXZkQzAwTERSZ0NEUXV0Q3cwTHZRdGRDOTBMVFFzTkdBMFk5Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JoWkdSSVlXNWtiR1Z5UlhabGJuUW9aR0YwWlUxdmJuUm9LU0I3WEc0Z0lDQWdJQ0FnSUM4dklOR0MwWVBSZ2lEUXROQyswTEhRc05DeTBMdlJqOUdPMFlMUmpOR0IwWThnMEw3UXNkR0EwTERRc2RDKzBZTFJoOUM0MExyUXVDRFF0TkM3MFk4ZzBMdlF1TkdCMFlMUXNOQzkwTGpSanlEUXZOQzEwWUhSajlHRzBMWFFzaUFySU5DKzBMSFJnTkN3MExIUXZ0R0MwWWZRdU5DNjBMZ2cwTDNRc0NEUmc5QzAwTERRdTlDMTBMM1F1TkMxSU5DNElOQzAwTDdRc2RDdzBMTFF1OUMxMEwzUXVDRFF0OUN3MExQUXZ0QzcwTDdRc3RDNjBMN1FzbHh1SUNBZ0lDQWdJQ0JrYjJOMWJXVnVkRnh1SUNBZ0lDQWdJQ0FnSUNBZ0xuRjFaWEo1VTJWc1pXTjBiM0lvWENJalltRmphMEoxZEhSdmJsd2lLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmpiR2xqYTF3aUxDQW9LU0E5UGlCMGFHbHpMbUZrWkVWMlpXNTBSbTl5UW1GamEwSjFkRzl2Ymloa1lYUmxUVzl1ZEdncEtUdGNiaUFnSUNBZ0lDQWdaRzlqZFcxbGJuUmNiaUFnSUNBZ0lDQWdJQ0FnSUM1eGRXVnllVk5sYkdWamRHOXlLRndpSTJadmNuZGhjbVJDZFhSMGIyNWNJaWxjYmlBZ0lDQWdJQ0FnSUNBZ0lDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lZMnhwWTJ0Y0lpd2dLQ2tnUFQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbUZrWkVWMlpXNTBSbTl5Um05eWQyRnlaRUoxZEhSdmJpaGtZWFJsVFc5dWRHZ3BYRzRnSUNBZ0lDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ0lDQmtiMk4xYldWdWRGeHVJQ0FnSUNBZ0lDQWdJQ0FnTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0owWVdKc1pWd2lLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmtZbXhqYkdsamExd2lMQ0FvS1NBOVBpQjBhR2x6TG5KbGJtUmxjazFoWkdGc0tHVjJaVzUwS1NrN1hHNGdJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MFhHNGdJQ0FnSUNBZ0lDQWdJQ0F1Y1hWbGNubFRaV3hsWTNSdmNpaGNJblJoWW14bFhDSXBYRzRnSUNBZ0lDQWdJQ0FnSUNBdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltTnNhV05yWENJc0lDZ3BJRDArSUhSb2FYTXVaR1ZzUTJGd2RHbHZiaWhsZG1WdWRDa3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHRmtaRVYyWlc1MFJtOXlSbTl5ZDJGeVpFSjFkSFJ2Ymloa1lYUmxUVzl1ZEdncElIdGNiaUFnSUNBZ0lDQWdMeThnMFlMUmc5R0NJTkM2MEw3UXRDRFF0TkMrMExIUXNOQ3kwTHZRdGRDOTBMalF0U0RRdk5DMTBZSFJqOUdHMExBZzBMalF1OUM0SU5DejBMN1F0TkN3SU5DeUlOQzMwTERRc3RDNDBZSFF1TkM4MEw3UmdkR0MwTGdnMExyUXNOQzYwTDdRdVNEUXZOQzEwWUhSajlHR0lOQy8wWURRdU5HSTBMWFF1eUFySU5DeTBZdlF0OUMrMExJZzBZVFJnOUM5MExyUmh0QzQwTGdnMFlEUXRkQzkwTFRRc05HQTBMQWcwTC9RdnRDNzBZUFJoOUMxMEwzUXZkQyswTGtnMExUUXNOR0MwWXRjYmlBZ0lDQWdJQ0FnZG1GeUlIbGxZWElnUFNCa1lYUmxUVzl1ZEdoYk1GMDdYRzRnSUNBZ0lDQWdJSFpoY2lCdGIyNTBhQ0E5SUdSaGRHVk5iMjUwYUZzeFhUdGNiaUFnSUNBZ0lDQWdhV1lnS0cxdmJuUm9JRDA5UFNBeE1pa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2VXVmhjaUE5SUhsbFlYSWdLeUF4TzF4dUlDQWdJQ0FnSUNBZ0lDQWdiVzl1ZEdnZ1BTQXhPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pHRjBaVTF2Ym5Sb1d6QmRJRDBnZVdWaGNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUdSaGRHVk5iMjUwYUZzeFhTQTlJRzF2Ym5Sb08xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYlc5dWRHZ2dQU0J0YjI1MGFDQXJJREU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtZWFJsVFc5dWRHaGJNVjBnUFNCdGIyNTBhRHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpTGtOaGJHVnVaR0Z5VUd4aFkyVmNJaWt1YVc1dVpYSklWRTFNSUQwZ1hDSmNJanNnTHk4ZzBMN1JoOUM0MFlIUmd0QzYwTEFnMExyUXNOQzcwTFhRdmRDMDBMRFJnTkdQSU5DMDBMdlJqeURSZ3RDKzBMUFF2aURSaDlHQzBMNGcwTEhSaXlEUXROQ3cwWUxSaXlEUXZOQzEwTDNSajlDNzBMalJnZEdNWEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ1WkdWeVEyRnNaVzVrWVhJb1pHRjBaVTF2Ym5Sb0tUc2dMeThnMFlMUmc5R0NJTkdCMExEUXZDRFFzdEdMMExmUXZ0Q3lJTkMwMExEUXZkQzkwTDdRczlDK0lOQzgwTFhSZ3RDdzBMVFFzQ0RRdE5DNzBZOGcwWURRdGRDOTBMVFFzTkdBMExCY2JpQWdJQ0I5WEc1Y2JpQWdJQ0JoWkdSRmRtVnVkRVp2Y2tKaFkydENkWFJ2YjI0b1pHRjBaVTF2Ym5Sb0tTQjdYRzRnSUNBZ0lDQWdJQzh2SU5HQzBZUFJnaURRdXRDKzBMUWcwTExSaTlHSDBMalJndEN3SU5DODBMWFJnZEdQMFliUXNDRFF1TkM3MExnZzBMUFF2dEMwMExBZzBMSWcwTGZRc05DeTBMalJnZEM0MEx6UXZ0R0IwWUxRdUNEUXV0Q3cwTHJRdnRDNUlOQzgwTFhSZ2RHUDBZWWcwTC9SZ05DNDBZalF0ZEM3SUNzZzBMTFJpOUMzMEw3UXNpRFJoTkdEMEwzUXV0R0cwTGpRdUNEUmdOQzEwTDNRdE5DdzBZRFFzQ0RRdjlDKzBMdlJnOUdIMExYUXZkQzkwTDdRdVNEUXROQ3cwWUxSaTF4dUlDQWdJQ0FnSUNCMllYSWdlV1ZoY2lBOUlHUmhkR1ZOYjI1MGFGc3dYVHRjYmlBZ0lDQWdJQ0FnZG1GeUlHMXZiblJvSUQwZ1pHRjBaVTF2Ym5Sb1d6RmRPMXh1SUNBZ0lDQWdJQ0JwWmlBb2JXOXVkR2dnUFQwOUlERXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIbGxZWElnUFNCNVpXRnlJQzBnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzF2Ym5Sb0lEMGdNVEk3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtZWFJsVFc5dWRHaGJNRjBnUFNCNVpXRnlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pHRjBaVTF2Ym5Sb1d6RmRJRDBnYlc5dWRHZzdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCdGIyNTBhQ0E5SUcxdmJuUm9JQzBnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1JoZEdWTmIyNTBhRnN4WFNBOUlHMXZiblJvTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJdVEyRnNaVzVrWVhKUWJHRmpaVndpS1M1cGJtNWxja2hVVFV3Z1BTQmNJbHdpT3lBdkx5RFF2dEdIMExqUmdkR0MwTHJRc0NEUXV0Q3cwTHZRdGRDOTBMVFFzTkdBMFk4ZzBMVFF1OUdQSU5HQzBMN1FzOUMrSU5HSDBZTFF2aURRc2RHTElOQzAwTERSZ3RHTElOQzgwTFhRdmRHUDBMdlF1TkdCMFl4Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5Wlc1a1pYSkRZV3hsYm1SaGNpaGtZWFJsVFc5dWRHZ3BPeUF2THlEUmd0R0QwWUlnMFlIUXNOQzhJTkN5MFl2UXQ5QyswTElnMExUUXNOQzkwTDNRdnRDejBMNGcwTHpRdGRHQzBMRFF0TkN3SU5DMDBMdlJqeURSZ05DMTBMM1F0TkN3MFlEUXNGeHVJQ0FnSUgxY2JseHVJQ0FnSUdGa1pFTmhjSFJwYjI0b2RHRnphMVJwZEd4bExDQjBZWE5yUkdWelkzSnBjSFJwYjI0c0lHUmhkR0VwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJR1JoZEdGQ1lYTmxJRDBnYm1WM0lHUmlLQ2s3WEc0Z0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YRzRnSUNBZ0lDQWdJQ0FnSUNCZ0xpUjdaR0YwWVgxZ1hHNGdJQ0FnSUNBZ0lDa3VhVzV1WlhKSVZFMU1JQ3M5SUdBOFpHbDJQaVI3ZEdGemExUnBkR3hsZlR4aWRYUjBiMjRnWTJ4aGMzTTlYQ0pqY205emMxd2lQbHQ0WFR3dlluVjBkRzl1UGp3dlpHbDJQbUE3WEc0Z0lDQWdJQ0FnSUdSaGRHRkNZWE5sTGxOaGRtVkZkbVZ1ZEVsdVJFSW9kR0Z6YTFScGRHeGxMQ0IwWVhOclJHVnpZM0pwY0hScGIyNHNJR1JoZEdFcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdSbGJFTmhjSFJwYjI0b1pTa2dlMXh1SUNBZ0lDQWdJQ0F2THlEUmd0R0QwWUlnMExyUXZ0QzBJTkMwMEx2Ump5RFJnOUMwMExEUXU5QzEwTDNRdU5HUElOQzMwTERRczlDKzBMdlF2dEN5MExyUXNGeHVJQ0FnSUNBZ0lDQjJZWElnZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFE3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBZWEpuWlhRdWRHRm5UbUZ0WlNBaFBTQmNJa0pWVkZSUFRsd2lJSHg4SUhSaGNtZGxkQzVqYkdGemMwNWhiV1VnSVQwZ0oyTnliM056SnlrZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnSUNCMllYSWdkR1Y0ZENBOUlIUmhjbWRsZEM1d1lYSmxiblJPYjJSbExtbHVibVZ5U0ZSTlRDNXpiR2xqWlNnd0xDQXRNelFwTzF4dUlDQWdJQ0FnSUNCMllYSWdaR0YwWlNBOUlIUmhjbWRsZEM1d1lYSmxiblJPYjJSbExuQmhjbVZ1ZEU1dlpHVXVZMnhoYzNOT1lXMWxPMXh1SUNBZ0lDQWdJQ0IwWVhKblpYUXVjR0Z5Wlc1MFRtOWtaUzV5WlcxdmRtVW9LVHRjYmlBZ0lDQWdJQ0FnYkdWMElHUmhkR0ZDWVhObElEMGdibVYzSUdSaUtDazdJQzh2MFlIUXZ0QzMwTFRRc05DOTBMalF0U0RSamRDNjBMZlF0ZEM4MEwvUXU5R1AwWURRc0NEUXV0QzcwTERSZ2RHQjBMQWcwTEhRc05DMzBZc2cwTFRRc05DOTBMM1JpOUdGWEc0Z0lDQWdJQ0FnSUdSaGRHRkNZWE5sTG1SbGJHVjBaVVYyWlc1MFNXNUVRaWhrWVhSbExDQjBaWGgwS1RzZ0x5OGcwTExSaTlDMzBMN1FzaURRdk5DMTBZTFF2dEMwMExBZzBMalF0eURRc2RDdzBMZlJpeURRdE5DNzBZOGcwWVBRdE5DdzBMdlF0ZEM5MExqUmp5RFF0ZEN5MExYUXZkR0MwTEFnMEwvUmdOQzQwTDNRdU5DODBMRFF0ZEdDSU5DOTBMQWcwTExSaGRDKzBMUWcwWUxRdGRDNjBZSFJnaURRdDlDdzBMUFF2dEM3MEw3UXN0QzYwTEFnMExnZzBZTFF0ZEN6SU5DeUlOQzYwTERRdXRDKzBMa2cwTGZRc05DLzBMalJnZEN3MEx2UXVGeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGJtUmxjazFoWkdGc0tHVXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlIUmhjbWRsZENBOUlHVXVkR0Z5WjJWME8xeHVJQ0FnSUNBZ0lDQnBaaUFvZEdGeVoyVjBMblJoWjA1aGJXVWdJVDA5SUZ3aVZFUmNJaWtnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pHRjBZU0E5SUhSaGNtZGxkQzVqYkdGemMwNWhiV1U3WEc0Z0lDQWdJQ0FnSUd4bGRDQjBZbTlrZVNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENKMFltOWtlVndpS1R0Y2JpQWdJQ0FnSUNBZ2RHSnZaSGt1YVc1dVpYSklWRTFNSUNzOUlHQmNiaUFnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW01dmRHVXRZM0psWVhSbExXWnZjbTFjSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW01dmRHVXRhR1ZoWkdWeVhDSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSE53WVc0Z1kyeGhjM005WENKa1lYbGNJajRrZTJSaGRHRjlQQzl6Y0dGdVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQVndpWjJ4NWNHaHBZMjl1SUdkc2VYQm9hV052YmlCbmJIbHdhR2xqYjI0dGNtVnRiM1psSUdOc2IzTmxUVzlrWVd4Y0lqNDhMM053WVc0K1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aWJtOTBaUzEwYVhSc1pWd2lQanhwYm5CMWRDQjBlWEJsUFZ3aWRHVjRkRndpSUhCc1lXTmxhRzlzWkdWeVBWd2lWR2wwYkdWY0lpQnBaRDFjSW5SaGMydFVhWFJzWlVsdWNIVjBYQ0krUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnViM1JsTFdKdlpIbGNJajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSFJsZUhSaGNtVmhJR2xrUFZ3aWRHRnphMFJsYzJOeWFYQjBhVzl1U1c1d2RYUmNJajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzQ4TDNSbGVIUmhjbVZoUGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEd3ZaR2wyUGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGlkWFIwYjI0Z1kyeGhjM005WENKaWRHNGdZblJ1TFdSbFptRjFiSFFnYlhrdFluUnVMV1JsWm1GMWJIUmNJajVUWVhabFBDOWlkWFIwYjI0K1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVnTzF4dUlDQWdJQ0FnSUNCc1pYUWdiVzlrWVd3Z1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aUxtNXZkR1V0WTNKbFlYUmxMV1p2Y20xY0lpazdYRzRnSUNBZ0lDQWdJR3hsZENCamJHOXpaVTF2WkdGc0lEMGdiVzlrWVd3dWNYVmxjbmxUWld4bFkzUnZjaWhjSWk1amJHOXpaVTF2WkdGc1hDSXBPMXh1SUNBZ0lDQWdJQ0JzWlhRZ2MyRjJaU0E5SUcxdlpHRnNMbkYxWlhKNVUyVnNaV04wYjNJb1hDSmlkWFIwYjI1Y0lpazdYRzRnSUNBZ0lDQWdJRzF2WkdGc0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNCY0ltWnNaWGhjSWp0Y2JpQWdJQ0FnSUNBZ2RHRnphMFJsYzJOeWFYQjBhVzl1U1c1d2RYUXVkbUZzZFdVZ1BTQmNJbHdpTzF4dUlDQWdJQ0FnSUNCamJHOXpaVTF2WkdGc0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmpiR2xqYTF3aUxDQW9LU0E5UGlCdGIyUmhiQzV5WlcxdmRtVW9LU2s3WEc0Z0lDQWdJQ0FnSUhOaGRtVXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbU5zYVdOclhDSXNJQ2dwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4bGRDQjBZWE5yVkdsMGJHVWdQU0IwWVhOclZHbDBiR1ZKYm5CMWRDNTJZV3gxWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCMFlYTnJSR1Z6WTNKcGNIUnBiMjRnUFNCMFlYTnJSR1Z6WTNKcGNIUnBiMjVKYm5CMWRDNTJZV3gxWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMFlYTnJWR2wwYkdVcElIUm9hWE11WVdSa1EyRndkR2x2YmloMFlYTnJWR2wwYkdVc0lIUmhjMnRFWlhOamNtbHdkR2x2Yml3Z1pHRjBZU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnRiMlJoYkM1eVpXMXZkbVVvS1Z4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNCOVhHNTlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQmpZV3hsYm1SaGNsQmhaMlU3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxDYWxlbmRhclBhZ2UuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfc2lnbkluID0gcmVxdWlyZShcIi4vc2lnbkluXCIpO1xuXG52YXIgX3NpZ25JbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaWduSW4pO1xuXG52YXIgX2RhdGFCYXNlID0gcmVxdWlyZShcIi4vZGF0YUJhc2VcIik7XG5cbnZhciBfZGF0YUJhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGF0YUJhc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgaW5kZXhQYWdlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpbmRleFBhZ2UoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGluZGV4UGFnZSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoaW5kZXhQYWdlLCBbe1xuICAgIGtleTogXCJyZW5kZXJQYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclBhZ2UoKSB7XG4gICAgICAvLyDRgtGD0YIg0L/RgNC+0LjQt9Cy0L7QtNC40YLRjNGB0Y8g0YDQtdC90LTQtdGAINC90LDRiNC10Lkg0LLRhdC+0LTQvdC+0Lkg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIik7XG4gICAgICB2YXIgQ3JlYXRlRGl2ID0gXCJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3MgPSAnZXJyb3InPlxcdTA0MURcXHUwNDM1XFx1MDQzMlxcdTA0MzVcXHUwNDQwXFx1MDQzRFxcdTA0NEJcXHUwNDM5IFxcdTA0M0JcXHUwNDNFXFx1MDQzM1xcdTA0MzhcXHUwNDNEIFxcdTA0MzhcXHUwNDNCXFx1MDQzOCBcXHUwNDNGXFx1MDQzMFxcdTA0NDBcXHUwNDNFXFx1MDQzQlxcdTA0NEM8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwidXNyXFxcIj5cXHUwNDFCXFx1MDQzRVxcdTA0MzNcXHUwNDM4XFx1MDQzRDo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInVzclxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcInB3ZFxcXCI+XFx1MDQxRlxcdTA0MzBcXHUwNDQwXFx1MDQzRVxcdTA0M0JcXHUwNDRDOjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInB3ZFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiAgaWQ9XFxcImVyb3JcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGFyZ2UgYnRuLXN1Y2Nlc3NcXFwiIGlkPVxcXCJidXRBdXRcXFwiID5cXHUwNDEyXFx1MDQ0NVxcdTA0M0VcXHUwNDM0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiO1xuICAgICAgZGl2ID0gZGl2LmlubmVySFRNTCA9IENyZWF0ZURpdjsgLy8g0L7RgtGA0LjRgdC+0LLQutCwINGB0YLRgNCw0L3QuNGG0YtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkSGVuZGxlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRIZW5kbGVyKCkge1xuICAgICAgLy8g0YLRg9GCINC00L7QsdCw0LLQu9GP0LXRhtCwINC+0LHRgNC+0LHQvtGC0YfQuNC6INC90LAg0LrQvdC+0L/QutGDINCy0YXQvtC00LAg0YEg0L/RgNC+0LzQuNGB0L7QvFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXRBdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvZyA9IHVzci52YWx1ZTtcbiAgICAgICAgdmFyIHBhc3MgPSBwd2QudmFsdWU7XG4gICAgICAgIHZhciB1c2VySW4gPSBuZXcgX3NpZ25JbjIuZGVmYXVsdCgpO1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdXNlckluLnRyeVNpZ25pbkJ5TG9naW5BbmRQYXNzKGxvZywgcGFzcyk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdXNlckluLnRyeVJlZ2lzdGVyV2l0aExvZ2luQW5kRW1haWwobG9nLCBwYXNzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhhc2ggPSBcIkNhbGVuZGFyXCI7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBpbmRleFBhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGluZGV4UGFnZTsgLy8g0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC8INGE0YPQvdC60YbQuNGOINCyINGA0L7Rg9GC0LXRgCBpbmRleFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtsdVpHVjRVR0ZuWlM1cWN5SmRMQ0p1WVcxbGN5STZXeUpwYm1SbGVGQmhaMlVpTENKa2FYWWlMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0pEY21WaGRHVkVhWFlpTENKcGJtNWxja2hVVFV3aUxDSmhaR1JGZG1WdWRFeHBjM1JsYm1WeUlpd2liRzluSWl3aWRYTnlJaXdpZG1Gc2RXVWlMQ0p3WVhOeklpd2ljSGRrSWl3aWRYTmxja2x1SWl3aVVISnZiV2x6WlNJc0luSmxjMjlzZG1VaUxDSjBhR1Z1SWl3aWRISjVVMmxuYm1sdVFubE1iMmRwYmtGdVpGQmhjM01pTENKallYUmphQ0lzSW5SeWVWSmxaMmx6ZEdWeVYybDBhRXh2WjJsdVFXNWtSVzFoYVd3aUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSnpkSGxzWlNJc0ltUnBjM0JzWVhraVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPMEZCUVVFN096czdRVUZEUVRzN096czdPenM3U1VGRFRVRXNVenM3T3pzN096dHBRMEZEVXp0QlFVTllPMEZCUTBFc1ZVRkJTVU1zVFVGQlRVTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUYyUWl4RFFVRldPMEZCUTBFc1ZVRkJTVU1zY1RGQ1FVRktPMEZCWlVGSUxGbEJRVTFCTEVsQlFVbEpMRk5CUVVvc1IwRkJaMEpFTEZOQlFYUkNMRU5CYkVKWExFTkJhMEp6UWp0QlFVTnNRenM3TzJsRFFVTlpPMEZCUTFnN1FVRkRRVVlzWlVGQlUwTXNZVUZCVkN4RFFVRjFRaXhUUVVGMlFpeEZRVUZyUTBjc1owSkJRV3hETEVOQlFXMUVMRTlCUVc1RUxFVkJRVFJFTEZsQlFVMDdRVUZEYUVVc1dVRkJTVU1zVFVGQlRVTXNTVUZCU1VNc1MwRkJaRHRCUVVOQkxGbEJRVWxETEU5QlFVOURMRWxCUVVsR0xFdEJRV1k3UVVGRFFTeFpRVUZKUnl4VFFVRlRMSE5DUVVGaU8wRkJRMEZETEdkQ1FVRlJReXhQUVVGU0xFZEJRMGRETEVsQlJFZ3NRMEZEVVR0QlFVRkJMR2xDUVVGTlNDeFBRVUZQU1N4MVFrRkJVQ3hEUVVFclFsUXNSMEZCTDBJc1JVRkJiME5ITEVsQlFYQkRMRU5CUVU0N1FVRkJRU3hUUVVSU0xFVkJSVWRQTEV0QlJrZ3NRMEZGVXp0QlFVRkJMR2xDUVVGTlRDeFBRVUZQVFN3MFFrRkJVQ3hEUVVGdlExZ3NSMEZCY0VNc1JVRkJlVU5ITEVsQlFYcERMRU5CUVU0N1FVRkJRU3hUUVVaVUxFVkJSMGRMTEVsQlNFZ3NRMEZIVVR0QlFVRkJMR2xDUVVGUFNTeFRRVUZUUXl4SlFVRlVMRWRCUVdkQ0xGVkJRWFpDTzBGQlFVRXNVMEZJVWl4RlFVbEhTQ3hMUVVwSUxFTkJTMGs3UVVGQlFTeHBRa0ZCVDJZc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4UlFVRjJRaXhGUVVGcFEydENMRXRCUVdwRExFTkJRWFZEUXl4UFFVRjJReXhIUVVGcFJDeFBRVUY0UkR0QlFVRkJMRk5CVEVvN1FVRlBSQ3hQUVZoRU8wRkJXVVE3T3pzN096dHJRa0ZIV1hSQ0xGTXNSVUZCVnlJc0ltWnBiR1VpT2lKSmJtUmxlRkJoWjJVdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdjMmxuYmtsdUlHWnliMjBnWENJdUwzTnBaMjVKYmx3aU8xeHVhVzF3YjNKMElHUmlJR1p5YjIwZ1hDSXVMMlJoZEdGQ1lYTmxYQ0k3WEc1amJHRnpjeUJwYm1SbGVGQmhaMlVnZTF4dUlDQnlaVzVrWlhKUVlXZGxLQ2tnZTF4dUlDQWdJQzh2SU5HQzBZUFJnaURRdjlHQTBMN1F1TkMzMExMUXZ0QzAwTGpSZ3RHTTBZSFJqeURSZ05DMTBMM1F0TkMxMFlBZzBMM1FzTkdJMExYUXVTRFFzdEdGMEw3UXROQzkwTDdRdVNEUmdkR0MwWURRc05DOTBMalJodEdMWEc0Z0lDQWdkbUZ5SUdScGRpQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSmthWFpjSWlrN1hHNGdJQ0FnZG1GeUlFTnlaV0YwWlVScGRpQTlJR0JjYmlBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqYjI1MFlXbHVaWEpjSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM01nUFNBblpYSnliM0luUHRDZDBMWFFzdEMxMFlEUXZkR0wwTGtnMEx2UXZ0Q3owTGpRdlNEUXVOQzcwTGdnMEwvUXNOR0EwTDdRdTlHTVBDOWthWFkrWEc0Z0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpWm05eWJTMW5jbTkxY0Z3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHNZV0psYkNCbWIzSTlYQ0oxYzNKY0lqN1FtOUMrMExQUXVOQzlPand2YkdGaVpXdytYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR2x1Y0hWMElIUjVjR1U5WENKMFpYaDBYQ0lnWTJ4aGMzTTlYQ0ptYjNKdExXTnZiblJ5YjJ4Y0lpQnBaRDFjSW5WemNsd2lQbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEc0Z0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpWm05eWJTMW5jbTkxY0Z3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHNZV0psYkNCbWIzSTlYQ0p3ZDJSY0lqN1FuOUN3MFlEUXZ0QzcwWXc2UEM5c1lXSmxiRDVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4YVc1d2RYUWdkSGx3WlQxY0luQmhjM04zYjNKa1hDSWdZMnhoYzNNOVhDSm1iM0p0TFdOdmJuUnliMnhjSWlCcFpEMWNJbkIzWkZ3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJQ0JwWkQxY0ltVnliM0pjSWo0OEwyUnBkajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WW5WMGRHOXVJSFI1Y0dVOVhDSmlkWFIwYjI1Y0lpQmpiR0Z6Y3oxY0ltSjBiaUJpZEc0dGJHRnlaMlVnWW5SdUxYTjFZMk5sYzNOY0lpQnBaRDFjSW1KMWRFRjFkRndpSUQ3UWt0R0YwTDdRdER3dlluVjBkRzl1UGx4dUlDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStZRHRjYmlBZ0lDQmthWFlnUFNCa2FYWXVhVzV1WlhKSVZFMU1JRDBnUTNKbFlYUmxSR2wyT3lBdkx5RFF2dEdDMFlEUXVOR0IwTDdRc3RDNjBMQWcwWUhSZ3RHQTBMRFF2ZEM0MFliUmkxeHVJQ0I5WEc0Z0lHRmtaRWhsYm1Sc1pYSW9LU0I3WEc0Z0lDQWdMeThnMFlMUmc5R0NJTkMwMEw3UXNkQ3cwTExRdTlHUDBMWFJodEN3SU5DKzBMSFJnTkMrMExIUXZ0R0MwWWZRdU5DNklOQzkwTEFnMExyUXZkQyswTC9RdXRHRElOQ3kwWVhRdnRDMDBMQWcwWUVnMEwvUmdOQyswTHpRdU5HQjBMN1F2Rnh1SUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJalluVjBRWFYwWENJcExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmpiR2xqYTF3aUxDQW9LU0E5UGlCN1hHNGdJQ0FnSUNCMllYSWdiRzluSUQwZ2RYTnlMblpoYkhWbE8xeHVJQ0FnSUNBZ2RtRnlJSEJoYzNNZ1BTQndkMlF1ZG1Gc2RXVTdYRzRnSUNBZ0lDQnNaWFFnZFhObGNrbHVJRDBnYm1WM0lITnBaMjVKYmlncE8xeHVJQ0FnSUNBZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0NsY2JpQWdJQ0FnSUNBZ0xuUm9aVzRvS0NrZ1BUNGdkWE5sY2tsdUxuUnllVk5wWjI1cGJrSjVURzluYVc1QmJtUlFZWE56S0d4dlp5d2djR0Z6Y3lrcFhHNGdJQ0FnSUNBZ0lDNWpZWFJqYUNnb0tTQTlQaUIxYzJWeVNXNHVkSEo1VW1WbmFYTjBaWEpYYVhSb1RHOW5hVzVCYm1SRmJXRnBiQ2hzYjJjc0lIQmhjM01wS1Z4dUlDQWdJQ0FnSUNBdWRHaGxiaWdvS1NBOVBpQW9iRzlqWVhScGIyNHVhR0Z6YUNBOUlGd2lRMkZzWlc1a1lYSmNJaWtwWEc0Z0lDQWdJQ0FnSUM1allYUmphQ2hjYmlBZ0lDQWdJQ0FnSUNBb0tTQTlQaUFvWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaGNJaTVsY25KdmNsd2lLUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdYQ0ppYkc5amExd2lLVnh1SUNBZ0lDQWdJQ0FwTzF4dUlDQWdJSDBwTzF4dUlDQjlYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdsdVpHVjRVR0ZuWlRzZ0x5OGcwWTNRdXRHQjBML1F2dEdBMFlMUXVOR0EwWVBRdGRDOElOR0UwWVBRdmRDNjBZYlF1TkdPSU5DeUlOR0EwTDdSZzlHQzBMWFJnQ0JwYm1SbGVGeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcSW5kZXhQYWdlLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgZGIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRiKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBkYik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoZGIsIFt7XG4gICAga2V5OiBcImFkZFVzZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkVXNlcih0YXNrLCBsb2dpbiwgcGFzcykge1xuICAgICAgLy/QvNC10YLQvtC0INC00L7QsdCw0LLQu9C10L3QuNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgdC40YHRgtC10LzRgyDQuCDRgdC+0LfQtNCw0L3QuNC1INC/0YDQuNC80LjRgtC40LLQvdC+0LPQviDRgdGC0YDRg9C60YLRg9GA0Ysg0YXRgNCw0L3QtdC90LjRjyDQtNCw0L3QvdGL0YVcbiAgICAgIGlmICghdGFzayB8fCAhbG9naW4gfHwgIXBhc3MpIHJldHVybjtcbiAgICAgIHZhciBvYmogPSB7XG4gICAgICAgIHBhc3N3b3JkOiBwYXNzLFxuICAgICAgICB0YXNrczogdGFza1xuICAgICAgfTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiXCIgKyBsb2dpbiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7IC8vINGB0L7RhdGA0LDQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgdC40YHRgtC10LzQtVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKGxvZ2luKSB7XG4gICAgICB2YXIgbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiXCIgKyBsb2dpbikpOyAvLyDQv9GA0LXQstGA0LDRidC10L3QuNC1INC90LDRiNC10LPQviDRgtC10LrRgdGC0LAg0YEg0L7QsdGK0LXQutGC0L7QvCDQsiDQvdC+0YDQvNCw0LvRjNC90YvQuSDQvtCx0YrQtdC60YJcbiAgICAgIHJldHVybiBscztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiU2F2ZUV2ZW50SW5EQlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBTYXZlRXZlbnRJbkRCKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCBkYXRlRGF5KSB7XG4gICAgICAvLyDRgdC+0YXRgNCw0L3QtdC90LjQtSDQl9Cw0LPQvtC70L7QstC60LAg0LIg0YHQuNGB0YLQtdC80LUgKyDRgdC+0LfQtNCw0L3QuNC1INGB0LjRgdGC0LXQvNGLINGF0YDQsNC90LXQvdC40Y8g0LTQu9GPINGC0LXQutGB0YLQstCwINC4INC60L7QvNC10L3RgtGA0LDQuNC10LIg0Lgg0LPQvtGC0L7QstCwINC30LDQtNCw0YfQsCDQuNC70Lgg0L3QtdGCXG4gICAgICB2YXIgb2JqID0gdGhpcy5nZXRBbGwoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpO1xuICAgICAgb2JqLnRhc2tzW1wiXCIgKyBkYXRlRGF5XSA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0gfHwge1xuICAgICAgICB0aXRsZTogW10sXG4gICAgICAgIHRleHQ6IFtdLFxuICAgICAgICBkb25lOiBbXVxuICAgICAgfTtcbiAgICAgIHZhciBhcnJUaXRsZSA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGU7XG4gICAgICBhcnJUaXRsZS5wdXNoKHRhc2tUaXRsZSk7XG4gICAgICB2YXIgYXJyRGVzY3JpcHRpb24gPSBvYmoudGFza3NbXCJcIiArIGRhdGVEYXldLnRleHQ7XG4gICAgICBhcnJEZXNjcmlwdGlvbi5wdXNoKHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICB2YXIgYXJyRG9uZSA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0uZG9uZTtcbiAgICAgIGFyckRvbmUucHVzaChmYWxzZSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlwiICsgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIiksIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVFdmVudEluREJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlRXZlbnRJbkRCKGRhdGVEYXksIHRleHQpIHtcbiAgICAgIC8v0YPQtNCw0LvQtdC90LjQtSDQv9C+0LrQsCDRgtC+0LvRjNC60L4g0LfQsNCz0L7Qu9C+0LLQutCwXG4gICAgICBpZiAoZGF0ZURheSA9PSAnJykgcmV0dXJuO1xuICAgICAgdmFyIG9iaiA9IHRoaXMuZ2V0QWxsKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcbiAgICAgIHZhciBpbmRleCA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGUuaW5kZXhPZih0ZXh0KTtcbiAgICAgIG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGV4dC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgb2JqLnRhc2tzW1wiXCIgKyBkYXRlRGF5XS5kb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlwiICsgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIiksIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsb2FkRnJvbURCXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRGcm9tREIoKSB7XG4gICAgICAvLyDQt9Cw0LPRgNGD0LfQutC4INC/0L7QutCwINC90LXRgtGDINGC0YPRgiDRgtC+0LvRjNC60L4g0L/QvtC60LAg0LHQsNC30LDQstCw0Y8g0L/RgNC+0LPRgNGD0LfQutCwINC+0LHRitC10LrQsFxuICAgICAgdmFyIG9iaiA9IHRoaXMuZ2V0QWxsKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcbiAgICAgIHZhciBjYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGFibGVcIik7XG4gICAgICBmb3IgKHZhciBkYXRlTG9hZCBpbiBvYmoudGFza3MpIHtcbiAgICAgICAgdmFyIGxvYWREYXRhID0gb2JqLnRhc2tzW1wiXCIgKyBkYXRlTG9hZF0udGl0bGU7XG4gICAgICAgIHZhciByZXMgPSBjYWwucXVlcnlTZWxlY3RvcihcIi5cIiArIGRhdGVMb2FkKTtcbiAgICAgICAgaWYgKHJlcyAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxvYWREYXRhLmxlbmd0aCAtIDEgPT0gMCkge1xuICAgICAgICAgICAgcmVzLmlubmVySFRNTCArPSBcIjxkaXYgaWQ9XFxcImV2ZW50c1xcXCI+XCIgKyBsb2FkRGF0YSArIFwiPGJ1dHRvbiBjbGFzcz1cXFwiY3Jvc3NcXFwiPlt4XTwvYnV0dG9uPjwvZGl2PlwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvYWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBkYkFyciA9IGxvYWREYXRhO1xuICAgICAgICAgICAgICByZXMuaW5uZXJIVE1MICs9IFwiPGRpdiBpZD1cXFwiZXZlbnRzXFxcIj5cIiArIGRiQXJyW2ldICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjcm9zc1xcXCI+W3hdPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIGRiO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkYjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltUmhkR0ZDWVhObExtcHpJbDBzSW01aGJXVnpJanBiSW1SaUlpd2lkR0Z6YXlJc0lteHZaMmx1SWl3aWNHRnpjeUlzSW05aWFpSXNJbkJoYzNOM2IzSmtJaXdpZEdGemEzTWlMQ0pzYjJOaGJGTjBiM0poWjJVaUxDSnpaWFJKZEdWdElpd2lTbE5QVGlJc0luTjBjbWx1WjJsbWVTSXNJbXh6SWl3aWNHRnljMlVpTENKblpYUkpkR1Z0SWl3aWRHRnphMVJwZEd4bElpd2lkR0Z6YTBSbGMyTnlhWEIwYVc5dUlpd2laR0YwWlVSaGVTSXNJbWRsZEVGc2JDSXNJbk5sYzNOcGIyNVRkRzl5WVdkbElpd2lkR2wwYkdVaUxDSjBaWGgwSWl3aVpHOXVaU0lzSW1GeWNsUnBkR3hsSWl3aWNIVnphQ0lzSW1GeWNrUmxjMk55YVhCMGFXOXVJaXdpWVhKeVJHOXVaU0lzSW1sdVpHVjRJaXdpYVc1a1pYaFBaaUlzSW5Od2JHbGpaU0lzSW1OaGJDSXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbVJoZEdWTWIyRmtJaXdpYkc5aFpFUmhkR0VpTENKeVpYTWlMQ0pzWlc1bmRHZ2lMQ0pwYm01bGNraFVUVXdpTENKcElpd2laR0pCY25JaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3U1VGQlRVRXNSVHM3T3pzN096czBRa0ZEU1VNc1NTeEZRVUZOUXl4TExFVkJRVTlETEVrc1JVRkJUVHRCUVVONlFqdEJRVU5CTEZWQlFVa3NRMEZCUTBZc1NVRkJSQ3hKUVVGVExFTkJRVU5ETEV0QlFWWXNTVUZCYlVJc1EwRkJRME1zU1VGQmVFSXNSVUZCT0VJN1FVRkRPVUlzVlVGQlNVTXNUVUZCVFR0QlFVTlNReXhyUWtGQlZVWXNTVUZFUmp0QlFVVlNSeXhsUVVGUFREdEJRVVpETEU5QlFWWTdRVUZKUVUwc2JVSkJRV0ZETEU5QlFXSXNUVUZCZDBKT0xFdEJRWGhDTEVWQlFXbERUeXhMUVVGTFF5eFRRVUZNTEVOQlFXVk9MRWRCUVdZc1EwRkJha01zUlVGUWVVSXNRMEZQT0VJN1FVRkRlRVE3T3pzeVFrRkRUVVlzU3l4RlFVRlBPMEZCUTFvc1ZVRkJTVk1zUzBGQlMwWXNTMEZCUzBjc1MwRkJUQ3hEUVVGWFRDeGhRVUZoVFN4UFFVRmlMRTFCUVhkQ1dDeExRVUY0UWl4RFFVRllMRU5CUVZRc1EwRkVXU3hEUVVNeVF6dEJRVU4yUkN4aFFVRlBVeXhGUVVGUU8wRkJRMFE3T3p0clEwRkRZVWNzVXl4RlFVRlhReXhsTEVWQlFXbENReXhQTEVWQlFWTTdRVUZEYWtRN1FVRkRRU3hWUVVGSldpeE5RVUZOTEV0QlFVdGhMRTFCUVV3c1EwRkJXVU1zWlVGQlpVd3NUMEZCWml4RFFVRjFRaXhOUVVGMlFpeERRVUZhTEVOQlFWWTdRVUZEUVZRc1ZVRkJTVVVzUzBGQlNpeE5RVUZoVlN4UFFVRmlMRWxCUVRCQ1dpeEpRVUZKUlN4TFFVRktMRTFCUVdGVkxFOUJRV0lzUzBGQk1rSTdRVUZEYmtSSExHVkJRVThzUlVGRU5FTTdRVUZGYmtSRExHTkJRVTBzUlVGR05rTTdRVUZIYmtSRExHTkJRVTA3UVVGSU5rTXNUMEZCY2tRN1FVRkxRU3hWUVVGSlF5eFhRVUZYYkVJc1NVRkJTVVVzUzBGQlNpeE5RVUZoVlN4UFFVRmlMRVZCUVhkQ1J5eExRVUYyUXp0QlFVTkJSeXhsUVVGVFF5eEpRVUZVTEVOQlFXTlVMRk5CUVdRN1FVRkRRU3hWUVVGSlZTeHBRa0ZCYVVKd1FpeEpRVUZKUlN4TFFVRktMRTFCUVdGVkxFOUJRV0lzUlVGQmQwSkpMRWxCUVRkRE8wRkJRMEZKTEhGQ1FVRmxSQ3hKUVVGbUxFTkJRVzlDVWl4bFFVRndRanRCUVVOQkxGVkJRVWxWTEZWQlFWVnlRaXhKUVVGSlJTeExRVUZLTEUxQlFXRlZMRTlCUVdJc1JVRkJkMEpMTEVsQlFYUkRPMEZCUTBGSkxHTkJRVkZHTEVsQlFWSXNRMEZCWVN4TFFVRmlPMEZCUTBGb1FpeHRRa0ZCWVVNc1QwRkJZaXhOUVVOTFZTeGxRVUZsVEN4UFFVRm1MRU5CUVhWQ0xFMUJRWFpDTEVOQlJFd3NSVUZGUlVvc1MwRkJTME1zVTBGQlRDeERRVUZsVGl4SFFVRm1MRU5CUmtZN1FVRkpSRHM3TzI5RFFVTnBRbGtzVHl4RlFVRlRTU3hKTEVWQlFVMDdRVUZETDBJN1FVRkRRU3hWUVVGSlNpeFhRVUZYTEVWQlFXWXNSVUZCYlVJN1FVRkRia0lzVlVGQlNWb3NUVUZCVFN4TFFVRkxZU3hOUVVGTUxFTkJRVmxETEdWQlFXVk1MRTlCUVdZc1EwRkJkVUlzVFVGQmRrSXNRMEZCV2l4RFFVRldPMEZCUTBFc1ZVRkJTV0VzVVVGQlVYUkNMRWxCUVVsRkxFdEJRVW9zVFVGQllWVXNUMEZCWWl4RlFVRjNRa2NzUzBGQmVFSXNRMEZCT0VKUkxFOUJRVGxDTEVOQlFYTkRVQ3hKUVVGMFF5eERRVUZhTzBGQlEwRm9RaXhWUVVGSlJTeExRVUZLTEUxQlFXRlZMRTlCUVdJc1JVRkJkMEpITEV0QlFYaENMRU5CUVRoQ1V5eE5RVUU1UWl4RFFVRnhRMFlzUzBGQmNrTXNSVUZCTkVNc1EwRkJOVU03UVVGRFFYUkNMRlZCUVVsRkxFdEJRVW9zVFVGQllWVXNUMEZCWWl4RlFVRjNRa2tzU1VGQmVFSXNRMEZCTmtKUkxFMUJRVGRDTEVOQlFXOURSaXhMUVVGd1F5eEZRVUV5UXl4RFFVRXpRenRCUVVOQmRFSXNWVUZCU1VVc1MwRkJTaXhOUVVGaFZTeFBRVUZpTEVWQlFYZENTeXhKUVVGNFFpeERRVUUyUWs4c1RVRkJOMElzUTBGQmIwTkdMRXRCUVhCRExFVkJRVEpETEVOQlFUTkRPMEZCUTBGdVFpeHRRa0ZCWVVNc1QwRkJZaXhOUVVOTFZTeGxRVUZsVEN4UFFVRm1MRU5CUVhWQ0xFMUJRWFpDTEVOQlJFd3NSVUZGUlVvc1MwRkJTME1zVTBGQlRDeERRVUZsVGl4SFFVRm1MRU5CUmtZN1FVRkpSRHM3TzJsRFFVTlpPMEZCUTFnN1FVRkRRU3hWUVVGSlFTeE5RVUZOTEV0QlFVdGhMRTFCUVV3c1EwRkJXVU1zWlVGQlpVd3NUMEZCWml4RFFVRjFRaXhOUVVGMlFpeERRVUZhTEVOQlFWWTdRVUZEUVN4VlFVRkpaMElzVFVGQlRVTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeFBRVUYyUWl4RFFVRldPMEZCUTBFc1YwRkJTeXhKUVVGSlF5eFJRVUZVTEVsQlFYRkNOVUlzU1VGQlNVVXNTMEZCZWtJc1JVRkJaME03UVVGRE9VSXNXVUZCU1RKQ0xGZEJRVmMzUWl4SlFVRkpSU3hMUVVGS0xFMUJRV0V3UWl4UlFVRmlMRVZCUVhsQ1lpeExRVUY0UXp0QlFVTkJMRmxCUVVsbExFMUJRVTFNTEVsQlFVbEZMR0ZCUVVvc1QwRkJjMEpETEZGQlFYUkNMRU5CUVZZN1FVRkRRU3haUVVGSlJTeFBRVUZQTEVsQlFWZ3NSVUZCYVVJN1FVRkRaaXhqUVVGSlJDeFRRVUZUUlN4TlFVRlVMRWRCUVd0Q0xFTkJRV3hDTEVsQlFYVkNMRU5CUVROQ0xFVkJRVGhDTzBGQlF6VkNSQ3huUWtGQlNVVXNVMEZCU2l3MFFrRkJjVU5JTEZGQlFYSkRPMEZCUTBRc1YwRkdSQ3hOUVVWUE8wRkJRMHdzYVVKQlFVc3NTVUZCU1Vrc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpTaXhUUVVGVFJTeE5RVUUzUWl4RlFVRnhRMFVzUjBGQmNrTXNSVUZCTUVNN1FVRkRlRU1zYTBKQlFVbERMRkZCUVZGTUxGRkJRVm83UVVGRFFVTXNhMEpCUVVsRkxGTkJRVW9zTkVKQlFYRkRSU3hOUVVOdVEwUXNRMEZFYlVNc1EwRkJja003UVVGSFJEdEJRVU5HTzBGQlEwWTdRVUZEUmp0QlFVTkdPenM3T3pzN2EwSkJSVmx5UXl4Rklpd2labWxzWlNJNkltUmhkR0ZDWVhObExtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWTJ4aGMzTWdaR0lnZTF4dUlDQmhaR1JWYzJWeUtIUmhjMnNzSUd4dloybHVMQ0J3WVhOektTQjdYRzRnSUNBZ0x5L1F2TkMxMFlMUXZ0QzBJTkMwMEw3UXNkQ3cwTExRdTlDMTBMM1F1TkdQSU5DLzBMN1F1OUdNMExmUXZ0Q3kwTERSZ3RDMTBMdlJqeURRc2lEUmdkQzQwWUhSZ3RDMTBMelJneURRdUNEUmdkQyswTGZRdE5DdzBMM1F1TkMxSU5DLzBZRFF1TkM4MExqUmd0QzQwTExRdmRDKzBMUFF2aURSZ2RHQzBZRFJnOUM2MFlMUmc5R0EwWXNnMFlYUmdOQ3cwTDNRdGRDOTBMalJqeURRdE5DdzBMM1F2ZEdMMFlWY2JpQWdJQ0JwWmlBb0lYUmhjMnNnZkh3Z0lXeHZaMmx1SUh4OElDRndZWE56S1NCeVpYUjFjbTQ3WEc0Z0lDQWdkbUZ5SUc5aWFpQTlJSHRjYmlBZ0lDQWdJSEJoYzNOM2IzSmtPaUJ3WVhOekxGeHVJQ0FnSUNBZ2RHRnphM002SUhSaGMydGNiaUFnSUNCOU8xeHVJQ0FnSUd4dlkyRnNVM1J2Y21GblpTNXpaWFJKZEdWdEtHQWtlMnh2WjJsdWZXQXNJRXBUVDA0dWMzUnlhVzVuYVdaNUtHOWlhaWtwT3lBdkx5RFJnZEMrMFlYUmdOQ3cwTDNRdGRDOTBMalF0U0RRdjlDKzBMdlJqTkMzMEw3UXN0Q3cwWUxRdGRDNzBZOGcwTElnMFlIUXVOR0IwWUxRdGRDODBMVmNiaUFnZlZ4dUlDQm5aWFJCYkd3b2JHOW5hVzRwSUh0Y2JpQWdJQ0IyWVhJZ2JITWdQU0JLVTA5T0xuQmhjbk5sS0d4dlkyRnNVM1J2Y21GblpTNW5aWFJKZEdWdEtHQWtlMnh2WjJsdWZXQXBLVHNnTHk4ZzBML1JnTkMxMExMUmdOQ3cwWW5RdGRDOTBMalF0U0RRdmRDdzBZalF0ZEN6MEw0ZzBZTFF0ZEM2MFlIUmd0Q3dJTkdCSU5DKzBMSFJpdEMxMExyUmd0QyswTHdnMExJZzBMM1F2dEdBMEx6UXNOQzcwWXpRdmRHTDBMa2cwTDdRc2RHSzBMWFF1dEdDWEc0Z0lDQWdjbVYwZFhKdUlHeHpPMXh1SUNCOVhHNGdJRk5oZG1WRmRtVnVkRWx1UkVJb2RHRnphMVJwZEd4bExDQjBZWE5yUkdWelkzSnBjSFJwYjI0c0lHUmhkR1ZFWVhrcElIdGNiaUFnSUNBdkx5RFJnZEMrMFlYUmdOQ3cwTDNRdGRDOTBMalF0U0RRbDlDdzBMUFF2dEM3MEw3UXN0QzYwTEFnMExJZzBZSFF1TkdCMFlMUXRkQzgwTFVnS3lEUmdkQyswTGZRdE5DdzBMM1F1TkMxSU5HQjBMalJnZEdDMExYUXZOR0xJTkdGMFlEUXNOQzkwTFhRdmRDNDBZOGcwTFRRdTlHUElOR0MwTFhRdXRHQjBZTFFzdEN3SU5DNElOQzYwTDdRdk5DMTBMM1JndEdBMExEUXVOQzEwTElnMExnZzBMUFF2dEdDMEw3UXN0Q3dJTkMzMExEUXROQ3cwWWZRc0NEUXVOQzcwTGdnMEwzUXRkR0NYRzRnSUNBZ2RtRnlJRzlpYWlBOUlIUm9hWE11WjJWMFFXeHNLSE5sYzNOcGIyNVRkRzl5WVdkbExtZGxkRWwwWlcwb1hDSjFjMlZ5WENJcEtUdGNiaUFnSUNCdlltb3VkR0Z6YTNOYllDUjdaR0YwWlVSaGVYMWdYU0E5SUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsUkdGNWZXQmRJSHg4SUh0Y2JpQWdJQ0FnSUhScGRHeGxPaUJiWFN4Y2JpQWdJQ0FnSUhSbGVIUTZJRnRkTEZ4dUlDQWdJQ0FnWkc5dVpUb2dXMTFjYmlBZ0lDQjlPMXh1SUNBZ0lIWmhjaUJoY25KVWFYUnNaU0E5SUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsUkdGNWZXQmRMblJwZEd4bE8xeHVJQ0FnSUdGeWNsUnBkR3hsTG5CMWMyZ29kR0Z6YTFScGRHeGxLVHRjYmlBZ0lDQjJZWElnWVhKeVJHVnpZM0pwY0hScGIyNGdQU0J2WW1vdWRHRnphM05iWUNSN1pHRjBaVVJoZVgxZ1hTNTBaWGgwTzF4dUlDQWdJR0Z5Y2tSbGMyTnlhWEIwYVc5dUxuQjFjMmdvZEdGemEwUmxjMk55YVhCMGFXOXVLVHRjYmlBZ0lDQjJZWElnWVhKeVJHOXVaU0E5SUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsUkdGNWZXQmRMbVJ2Ym1VN1hHNGdJQ0FnWVhKeVJHOXVaUzV3ZFhOb0tHWmhiSE5sS1R0Y2JpQWdJQ0JzYjJOaGJGTjBiM0poWjJVdWMyVjBTWFJsYlNoY2JpQWdJQ0FnSUdBa2UzTmxjM05wYjI1VGRHOXlZV2RsTG1kbGRFbDBaVzBvWENKMWMyVnlYQ0lwZldBc1hHNGdJQ0FnSUNCS1UwOU9Mbk4wY21sdVoybG1lU2h2WW1vcFhHNGdJQ0FnS1R0Y2JpQWdmVnh1SUNBZ0lHUmxiR1YwWlVWMlpXNTBTVzVFUWloa1lYUmxSR0Y1TENCMFpYaDBLU0I3WEc0Z0lDQWdMeS9SZzlDMDBMRFF1OUMxMEwzUXVOQzFJTkMvMEw3UXV0Q3dJTkdDMEw3UXU5R00wTHJRdmlEUXQ5Q3cwTFBRdnRDNzBMN1FzdEM2MExCY2JpQWdJQ0JwWmlBb1pHRjBaVVJoZVNBOVBTQW5KeWtnY21WMGRYSnVPMXh1SUNBZ0lIWmhjaUJ2WW1vZ1BTQjBhR2x6TG1kbGRFRnNiQ2h6WlhOemFXOXVVM1J2Y21GblpTNW5aWFJKZEdWdEtGd2lkWE5sY2x3aUtTazdYRzRnSUNBZ2RtRnlJR2x1WkdWNElEMGdiMkpxTG5SaGMydHpXMkFrZTJSaGRHVkVZWGw5WUYwdWRHbDBiR1V1YVc1a1pYaFBaaWgwWlhoMEtUdGNiaUFnSUNCdlltb3VkR0Z6YTNOYllDUjdaR0YwWlVSaGVYMWdYUzUwYVhSc1pTNXpjR3hwWTJVb2FXNWtaWGdzSURFcE8xeHVJQ0FnSUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsUkdGNWZXQmRMblJsZUhRdWMzQnNhV05sS0dsdVpHVjRMQ0F4S1R0Y2JpQWdJQ0J2WW1vdWRHRnphM05iWUNSN1pHRjBaVVJoZVgxZ1hTNWtiMjVsTG5Od2JHbGpaU2hwYm1SbGVDd2dNU2s3WEc0Z0lDQWdiRzlqWVd4VGRHOXlZV2RsTG5ObGRFbDBaVzBvWEc0Z0lDQWdJQ0JnSkh0elpYTnphVzl1VTNSdmNtRm5aUzVuWlhSSmRHVnRLRndpZFhObGNsd2lLWDFnTEZ4dUlDQWdJQ0FnU2xOUFRpNXpkSEpwYm1kcFpua29iMkpxS1Z4dUlDQWdJQ2s3WEc0Z0lIMWNiaUFnYkc5aFpFWnliMjFFUWlncElIdGNiaUFnSUNBdkx5RFF0OUN3MExQUmdOR0QwTGZRdXRDNElOQy8wTDdRdXRDd0lOQzkwTFhSZ3RHRElOR0MwWVBSZ2lEUmd0QyswTHZSak5DNjBMNGcwTC9RdnRDNjBMQWcwTEhRc05DMzBMRFFzdEN3MFk4ZzBML1JnTkMrMExQUmdOR0QwTGZRdXRDd0lOQyswTEhSaXRDMTBMclFzRnh1SUNBZ0lHeGxkQ0J2WW1vZ1BTQjBhR2x6TG1kbGRFRnNiQ2h6WlhOemFXOXVVM1J2Y21GblpTNW5aWFJKZEdWdEtGd2lkWE5sY2x3aUtTazdYRzRnSUNBZ2JHVjBJR05oYkNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENKMFlXSnNaVndpS1R0Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JrWVhSbFRHOWhaQ0JwYmlCdlltb3VkR0Z6YTNNcElIdGNiaUFnSUNBZ0lHeGxkQ0JzYjJGa1JHRjBZU0E5SUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsVEc5aFpIMWdYUzUwYVhSc1pUdGNiaUFnSUNBZ0lHeGxkQ0J5WlhNZ1BTQmpZV3d1Y1hWbGNubFRaV3hsWTNSdmNpaGdMaVI3WkdGMFpVeHZZV1I5WUNrN1hHNGdJQ0FnSUNCcFppQW9jbVZ6SUNFOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR3h2WVdSRVlYUmhMbXhsYm1kMGFDQXRJREVnUFQwZ01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGN5NXBibTVsY2toVVRVd2dLejBnWUR4a2FYWWdhV1E5WENKbGRtVnVkSE5jSWo0a2UyeHZZV1JFWVhSaGZUeGlkWFIwYjI0Z1kyeGhjM005WENKamNtOXpjMXdpUGx0NFhUd3ZZblYwZEc5dVBqd3ZaR2wyUG1BN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzYjJGa1JHRjBZUzVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmlRWEp5SUQwZ2JHOWhaRVJoZEdFN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhNdWFXNXVaWEpJVkUxTUlDczlJR0E4WkdsMklHbGtQVndpWlhabGJuUnpYQ0krSkh0a1lrRnljbHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhVnh1SUNBZ0lDQWdJQ0FnSUNBZ1hYMDhZblYwZEc5dUlHTnNZWE56UFZ3aVkzSnZjM05jSWo1YmVGMDhMMkoxZEhSdmJqNDhMMlJwZGo1Z08xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1Wlhod2IzSjBJR1JsWm1GMWJIUWdaR0k3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxkYXRhQmFzZS5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9kYXRhQmFzZSA9IHJlcXVpcmUoXCIuL2RhdGFCYXNlXCIpO1xuXG52YXIgX2RhdGFCYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RhdGFCYXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIGRheVZpZXdQYWdlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkYXlWaWV3UGFnZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgZGF5Vmlld1BhZ2UpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKGRheVZpZXdQYWdlLCBbe1xuICAgIGtleTogXCJidWlsZFBhZ2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkUGFnZXMoKSB7XG4gICAgICB0aGlzLnJlbmRlckhlYWRlcigpO1xuICAgICAgdGhpcy5leGl0QnV0dG9uKCk7XG4gICAgICB0aGlzLnRlc3QoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVySGVhZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckhlYWRlcigpIHtcbiAgICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpO1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIik7XG4gICAgICBoZWFkZXIgPSBoZWFkZXIuaW5uZXJIVE1MID0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcImNvbC1tZC05XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtM1xcXCI+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlYWRcXFwiPlwiICsgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikgKyBcIiA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGlkPVxcXCJleGl0XFxcIj5cXHUwNDEyXFx1MDQ0QlxcdTA0NDVcXHUwNDNFXFx1MDQzNDwvYnV0dG9uPjxwPlxcbiAgICAgICAgICAgIDwvZGl2PlwiO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJleGl0QnV0dG9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGV4aXRCdXR0b24oKSB7XG4gICAgICAvL9C+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvRhdC+0LTQsCDQvdCwINCz0LvQsNCy0L3Rg9GOINGB0YLRgNCw0L3QuNGG0YNcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCJcIjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBkYXlWaWV3UGFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZGF5Vmlld1BhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVJoZVZacFpYZFFZV2RsTG1weklsMHNJbTVoYldWeklqcGJJbVJoZVZacFpYZFFZV2RsSWl3aWNtVnVaR1Z5U0dWaFpHVnlJaXdpWlhocGRFSjFkSFJ2YmlJc0luUmxjM1FpTENKb1pXRmtaWElpTENKa2IyTjFiV1Z1ZENJc0luRjFaWEo1VTJWc1pXTjBiM0lpTENKa2FYWWlMQ0pwYm01bGNraFVUVXdpTENKelpYTnphVzl1VTNSdmNtRm5aU0lzSW1kbGRFbDBaVzBpTENKaFpHUkZkbVZ1ZEV4cGMzUmxibVZ5SWl3aWJHOWpZWFJwYjI0aUxDSm9ZWE5vSWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096dEJRVUZCT3pzN096czdPenRKUVVOTlFTeFhPenM3T3pzN08ybERRVU5UTzBGQlExZ3NWMEZCUzBNc1dVRkJURHRCUVVOQkxGZEJRVXRETEZWQlFVdzdRVUZEUVN4WFFVRkxReXhKUVVGTU8wRkJRMFE3T3p0dFEwRkRZenRCUVVOaUxGVkJRVWxETEZOQlFWTkRMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNVVUZCZGtJc1EwRkJZanRCUVVOQkxGVkJRVWxETEUxQlFVMUdMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNTMEZCZGtJc1EwRkJWanRCUVVOQlJpeGxRVUZUUVN4UFFVRlBTU3hUUVVGUUxHZElRVWRwUWtNc1pVRkJaVU1zVDBGQlppeERRVU5vUWl4TlFVUm5RaXhEUVVocVFpeHJTRUZCVkR0QlFVOUVPenM3YVVOQlExazdRVUZEV0R0QlFVTkJUQ3hsUVVGVFF5eGhRVUZVTEVOQlFYVkNMRTlCUVhaQ0xFVkJRV2REU3l4blFrRkJhRU1zUTBGQmFVUXNUMEZCYWtRc1JVRkJNRVFzV1VGQlRUdEJRVU01UkVNc2FVSkJRVk5ETEVsQlFWUXNSMEZCWjBJc1JVRkJhRUk3UVVGRFJDeFBRVVpFTzBGQlIwUTdPenM3T3p0clFrRkZXV0lzVnlJc0ltWnBiR1VpT2lKa1lYbFdhV1YzVUdGblpTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JrWWlCbWNtOXRJRndpTGk5a1lYUmhRbUZ6WlZ3aU8xeHVZMnhoYzNNZ1pHRjVWbWxsZDFCaFoyVWdlMXh1SUNCaWRXbHNaRkJoWjJWektDa2dlMXh1SUNBZ0lIUm9hWE11Y21WdVpHVnlTR1ZoWkdWeUtDazdYRzRnSUNBZ2RHaHBjeTVsZUdsMFFuVjBkRzl1S0NrN1hHNGdJQ0FnZEdocGN5NTBaWE4wS0NrN1hHNGdJSDFjYmlBZ2NtVnVaR1Z5U0dWaFpHVnlLQ2tnZTF4dUlDQWdJSFpoY2lCb1pXRmtaWElnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpYUdWaFpHVnlYQ0lwTzF4dUlDQWdJSFpoY2lCa2FYWWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtGd2laR2wyWENJcE8xeHVJQ0FnSUdobFlXUmxjaUE5SUdobFlXUmxjaTVwYm01bGNraFVUVXdnUFNCZ1hHNGdJRHhrYVhZZ1kyeGhjM005WENKamIyd3RiV1F0T1Z3aVBqd3ZaR2wyUGx4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OdmJDMXRaQzB6WENJK1hHNGdJQ0FnSUNBZ0lDQWdJQ0E4Y0NCamJHRnpjejFjSW14bFlXUmNJajRrZTNObGMzTnBiMjVUZEc5eVlXZGxMbWRsZEVsMFpXMG9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lGd2lkWE5sY2x3aVhHNGdJQ0FnSUNBZ0lDQWdJQ0FwZlNBOFluVjBkRzl1SUdOc1lYTnpQVndpWW5SdUlHSjBiaTFrWldaaGRXeDBYQ0lnYVdROVhDSmxlR2wwWENJKzBKTFJpOUdGMEw3UXREd3ZZblYwZEc5dVBqeHdQbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrWUR0Y2JpQWdmVnh1SUNCbGVHbDBRblYwZEc5dUtDa2dlMXh1SUNBZ0lDOHYwTDdRc2RHQTBMRFFzZEMrMFlMUmg5QzQwTG9nMExMUmk5R0YwTDdRdE5Dd0lOQzkwTEFnMExQUXU5Q3cwTExRdmRHRDBZNGcwWUhSZ3RHQTBMRFF2ZEM0MFliUmcxeHVJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0lqWlhocGRGd2lLUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpWTJ4cFkydGNJaXdnS0NrZ1BUNGdlMXh1SUNBZ0lDQWdiRzlqWVhScGIyNHVhR0Z6YUNBOUlGd2lYQ0k3WEc0Z0lDQWdmU2s3WEc0Z0lIMWNibjFjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1JoZVZacFpYZFFZV2RsTzF4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxkYXlWaWV3UGFnZS5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9kYXRhQmFzZSA9IHJlcXVpcmUoXCIuL2RhdGFCYXNlXCIpO1xuXG52YXIgX2RhdGFCYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RhdGFCYXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHNpZ25JbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2lnbkluKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBzaWduSW4pO1xuXG4gICAgdGhpcy5kYiA9IG5ldyBfZGF0YUJhc2UyLmRlZmF1bHQoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhzaWduSW4sIFt7XG4gICAga2V5OiBcInRyeVNpZ25pbkJ5TG9naW5BbmRQYXNzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyeVNpZ25pbkJ5TG9naW5BbmRQYXNzKGxvZ2luLCBwYXNzd29yZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHVzZXIgPSBfdGhpcy5kYi5nZXRBbGwobG9naW4pO1xuICAgICAgICBpZiAodXNlciAhPSBudWxsICYmIHVzZXIucGFzc3dvcmQgPT0gcGFzc3dvcmQgJiYgbG9naW4gIT0gXCJcIiAmJiBwYXNzd29yZCAhPSBcIlwiKSB7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJcIiwgXCJcIiArIGxvZ2luKTtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyeVJlZ2lzdGVyV2l0aExvZ2luQW5kRW1haWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJ5UmVnaXN0ZXJXaXRoTG9naW5BbmRFbWFpbChsb2dpbiwgcGFzc3dvcmQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdXNlciA9IF90aGlzMi5kYi5nZXRBbGwobG9naW4pO1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBfdGhpczIuZGIuYWRkVXNlcih7fSwgbG9naW4sIHBhc3N3b3JkKTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlclwiLCBcIlwiICsgbG9naW4pO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gc2lnbkluO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzaWduSW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk5wWjI1SmJpNXFjeUpkTENKdVlXMWxjeUk2V3lKemFXZHVTVzRpTENKa1lpSXNJbXh2WjJsdUlpd2ljR0Z6YzNkdmNtUWlMQ0pRY205dGFYTmxJaXdpY21WemIyeDJaU0lzSW5KbGFtVmpkQ0lzSW5WelpYSWlMQ0puWlhSQmJHd2lMQ0p6WlhOemFXOXVVM1J2Y21GblpTSXNJbk5sZEVsMFpXMGlMQ0poWkdSVmMyVnlJbDBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3T3p0QlFVRkJPenM3T3pzN096dEpRVU5OUVN4Tk8wRkJRMG9zYjBKQlFXTTdRVUZCUVRzN1FVRkRXaXhUUVVGTFF5eEZRVUZNTEVkQlFWVXNkMEpCUVZZN1FVRkRSRHM3T3pzMFEwRkRkVUpETEVzc1JVRkJUME1zVVN4RlFVRlZPMEZCUVVFN08wRkJRM1pETEdGQlFVOHNTVUZCU1VNc1QwRkJTaXhEUVVGWkxGVkJRVU5ETEU5QlFVUXNSVUZCVlVNc1RVRkJWaXhGUVVGeFFqdEJRVU4wUXl4WlFVRkpReXhQUVVGUExFMUJRVXRPTEVWQlFVd3NRMEZCVVU4c1RVRkJVaXhEUVVGbFRpeExRVUZtTEVOQlFWZzdRVUZEUVN4WlFVTkZTeXhSUVVGUkxFbEJRVklzU1VGRFFVRXNTMEZCUzBvc1VVRkJUQ3hKUVVGcFFrRXNVVUZFYWtJc1NVRkZRVVFzVTBGQlV5eEZRVVpVTEVsQlIwRkRMRmxCUVZrc1JVRktaQ3hGUVV0Rk8wRkJRMEZOTEhsQ1FVRmxReXhQUVVGbUxFTkJRWFZDTEUxQlFYWkNMRTlCUVd0RFVpeExRVUZzUXp0QlFVTkJMR2xDUVVGUFJ5eFRRVUZRTzBGQlEwUTdRVUZEUkVNN1FVRkRSQ3hQUVZwTkxFTkJRVkE3UVVGaFJEczdPMmxFUVVVMFFrb3NTeXhGUVVGUFF5eFJMRVZCUVZVN1FVRkJRVHM3UVVGRE5VTXNZVUZCVHl4SlFVRkpReXhQUVVGS0xFTkJRVmtzVlVGQlEwTXNUMEZCUkN4RlFVRlZReXhOUVVGV0xFVkJRWEZDTzBGQlEzUkRMRmxCUVVsRExFOUJRVThzVDBGQlMwNHNSVUZCVEN4RFFVRlJUeXhOUVVGU0xFTkJRV1ZPTEV0QlFXWXNRMEZCV0R0QlFVTkJMRmxCUVVrc1EwRkJRMHNzU1VGQlRDeEZRVUZYTzBGQlExUXNhVUpCUVV0T0xFVkJRVXdzUTBGQlVWVXNUMEZCVWl4RFFVRm5RaXhGUVVGb1FpeEZRVUZ2UWxRc1MwRkJjRUlzUlVGQk1rSkRMRkZCUVROQ08wRkJRMEZOTEhsQ1FVRmxReXhQUVVGbUxFTkJRWFZDTEUxQlFYWkNMRTlCUVd0RFVpeExRVUZzUXp0QlFVTkJMR2xDUVVGUFJ5eFRRVUZRTzBGQlEwUXNVMEZLUkN4TlFVbFBPMEZCUTB3c2FVSkJRVTlETEZGQlFWQTdRVUZEUkR0QlFVTkdMRTlCVkUwc1EwRkJVRHRCUVZWRU96czdPenM3YTBKQlJWbE9MRTBpTENKbWFXeGxJam9pYzJsbmJrbHVMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUdSaUlHWnliMjBnWENJdUwyUmhkR0ZDWVhObFhDSTdYRzVqYkdGemN5QnphV2R1U1c0Z2UxeHVJQ0JqYjI1emRISjFZM1J2Y2lncElIdGNiaUFnSUNCMGFHbHpMbVJpSUQwZ2JtVjNJR1JpS0NrN1hHNGdJSDFjYmlBZ2RISjVVMmxuYm1sdVFubE1iMmRwYmtGdVpGQmhjM01vYkc5bmFXNHNJSEJoYzNOM2IzSmtLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHNWxkeUJRY205dGFYTmxLQ2h5WlhOdmJIWmxMQ0J5WldwbFkzUXBJRDArSUh0Y2JpQWdJQ0FnSUd4bGRDQjFjMlZ5SUQwZ2RHaHBjeTVrWWk1blpYUkJiR3dvYkc5bmFXNHBPMXh1SUNBZ0lDQWdhV1lnS0Z4dUlDQWdJQ0FnSUNCMWMyVnlJQ0U5SUc1MWJHd2dKaVpjYmlBZ0lDQWdJQ0FnZFhObGNpNXdZWE56ZDI5eVpDQTlQU0J3WVhOemQyOXlaQ0FtSmx4dUlDQWdJQ0FnSUNCc2IyZHBiaUFoUFNCY0lsd2lJQ1ltWEc0Z0lDQWdJQ0FnSUhCaGMzTjNiM0prSUNFOUlGd2lYQ0pjYmlBZ0lDQWdJQ2tnZTF4dUlDQWdJQ0FnSUNCelpYTnphVzl1VTNSdmNtRm5aUzV6WlhSSmRHVnRLRndpZFhObGNsd2lMQ0JnSkh0c2IyZHBibjFnS1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMyOXNkbVVvS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGFtVmpkQ2dwTzF4dUlDQWdJSDBwTzF4dUlDQjlYRzVjYmlBZ2RISjVVbVZuYVhOMFpYSlhhWFJvVEc5bmFXNUJibVJGYldGcGJDaHNiMmRwYml3Z2NHRnpjM2R2Y21RcElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb0tISmxjMjlzZG1Vc0lISmxhbVZqZENrZ1BUNGdlMXh1SUNBZ0lDQWdiR1YwSUhWelpYSWdQU0IwYUdsekxtUmlMbWRsZEVGc2JDaHNiMmRwYmlrN1hHNGdJQ0FnSUNCcFppQW9JWFZ6WlhJcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1a1lpNWhaR1JWYzJWeUtIdDlMQ0JzYjJkcGJpd2djR0Z6YzNkdmNtUXBPMXh1SUNBZ0lDQWdJQ0J6WlhOemFXOXVVM1J2Y21GblpTNXpaWFJKZEdWdEtGd2lkWE5sY2x3aUxDQmdKSHRzYjJkcGJuMWdLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEpsYzI5c2RtVW9LVHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaV3BsWTNRb0tUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOUtUdGNiaUFnZlZ4dWZWeHVaWGh3YjNKMElHUmxabUYxYkhRZ2MybG5ia2x1TzF4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxzaWduSW4uanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfUm91dGVyID0gcmVxdWlyZShcIi4vdXRpbHMvUm91dGVyXCIpO1xuXG52YXIgX1JvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXIpO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZShcIi4vcm91dGVzL2luZGV4XCIpO1xuXG52YXIgX0NhbGVuZGFyID0gcmVxdWlyZShcIi4vcm91dGVzL0NhbGVuZGFyXCIpO1xuXG52YXIgX0RheVZpZXcgPSByZXF1aXJlKFwiLi9yb3V0ZXMvRGF5Vmlld1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHJvdXRlcyA9IFtfaW5kZXguaW5kZXgsIF9DYWxlbmRhci5DYWxlbmRhciwgX0RheVZpZXcuZGF5Vmlld107XG5uZXcgX1JvdXRlcjIuZGVmYXVsdCh7IHJvdXRlczogcm91dGVzIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1aaGEyVmZZekkyT0RrM01EVXVhbk1pWFN3aWJtRnRaWE1pT2xzaWNtOTFkR1Z6SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQk96czdPMEZCUTBFN08wRkJRMEU3TzBGQlEwRTdPenM3UVVGRFFTeEpRVUZOUVN4VFFVRlRMRzlFUVVGbU8wRkJRMEVzY1VKQlFWY3NSVUZCUlVFc1kwRkJSaXhGUVVGWUlpd2labWxzWlNJNkltWmhhMlZmWXpJMk9EazNNRFV1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ1VtOTFkR1Z5SUdaeWIyMGdYQ0l1TDNWMGFXeHpMMUp2ZFhSbGNsd2lPMXh5WEc1cGJYQnZjblFnZXlCcGJtUmxlQ0I5SUdaeWIyMGdYQ0l1TDNKdmRYUmxjeTlwYm1SbGVGd2lPMXh5WEc1cGJYQnZjblFnZXlCRFlXeGxibVJoY2lCOUlHWnliMjBnWENJdUwzSnZkWFJsY3k5RFlXeGxibVJoY2x3aU8xeHlYRzVwYlhCdmNuUWdleUJrWVhsV2FXVjNJSDBnWm5KdmJTQmNJaTR2Y205MWRHVnpMMFJoZVZacFpYZGNJanRjY2x4dVkyOXVjM1FnY205MWRHVnpJRDBnVzJsdVpHVjRMQ0JEWVd4bGJtUmhjaXdnWkdGNVZtbGxkMTA3WEhKY2JtNWxkeUJTYjNWMFpYSW9leUJ5YjNWMFpYTWdmU2s3SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2MyNjg5NzA1LmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNhbGVuZGFyID0gdW5kZWZpbmVkO1xuXG52YXIgX0NhbGVuZGFyUGFnZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL0NhbGVuZGFyUGFnZVwiKTtcblxudmFyIF9DYWxlbmRhclBhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2FsZW5kYXJQYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy9pbXBvcnQgeyB1c2VyT25saW5lIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2lnbkluXCI7XG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKTtcbnZhciBDYWxlbmRhciA9IHtcbiAgbmFtZTogXCJDYWxlbmRhclwiLFxuICBtYXRjaDogZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICAgIHJldHVybiB0ZXh0ID09PSBcIkNhbGVuZGFyXCI7XG4gIH0sXG4gIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7XG4gICAgLy8g0L/RgNC4INC30LDRhdC+0LTQtSDQvdCwINGB0YLRgNCw0L3QuNGG0YMg0L/RgNC+0LLQtdGA0Y/QtdGC0YzRgdGPLCDQt9Cw0LvQvtCz0LjQvdC+INC70Lgg0YLRiyDQt9Cw0YXQvtC00LjRiNGMICwg0LXRgdC70Lgg0L3QtdGCINGC0L4g0L/QvtGI0LXQuyDQstC+0L0hXG5cbiAgICBpZiAoIXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKSBsb2NhdGlvbi5oYXNoID0gXCJcIjtcbiAgfSxcbiAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICAvLyDRgtGD0YIg0YHQvtC30LTQsNC10YLRjNGB0Y8g0LzQsNGB0YHQuNCyINGBINCz0L7QtNC+0Lwg0Lgg0LzQtdGB0Y/RhtC10Lwg0LTQu9GPINC/0LXRgNC10LTQsNGH0Lgg0LXQs9C+INCyINGA0LXQvdC00LXRgFxuICAgIHZhciBkYXRlTW9udGggPSBbXTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIG1vbnQgPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgdmFyIHllciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBkYXRlTW9udGgucHVzaCh5ZXIpO1xuICAgIGRhdGVNb250aC5wdXNoKG1vbnQgKyAxKTtcbiAgICAvL1xuICAgIHZhciBjYWxlbmRhciA9IG5ldyBfQ2FsZW5kYXJQYWdlMi5kZWZhdWx0KCk7IC8vINGB0L7Qt9C00LDQvdC40LUg0Y3QutC30LXQvNC/0LvRj9GA0LAg0LrQu9Cw0YHRgdCwXG4gICAgY2FsZW5kYXIuUmVuZGVyKGRhdGVNb250aCk7IC8vINGA0LXQvdC00LXRgCDRgdGC0YDQsNC90LjRhtGLINC4INC00L7QsdCw0LLQu9C10L3QuNC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LBcbiAgfSxcbiAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAvL9C/0YDQuCDQstGL0YXQvtC00LUg0YEg0YHRgtGA0LDQvdC40YbRiyDRh9C40YHRgtC40YbQsCBoZWFkZXIgLGRpdlxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxufTtcblxuZXhwb3J0cy5DYWxlbmRhciA9IENhbGVuZGFyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtOaGJHVnVaR0Z5TG1weklsMHNJbTVoYldWeklqcGJJbVJwZGlJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0lrTmhiR1Z1WkdGeUlpd2libUZ0WlNJc0ltMWhkR05vSWl3aWRHVjRkQ0lzSW05dVFtVm1iM0psUlc1MFpYSWlMQ0p6WlhOemFXOXVVM1J2Y21GblpTSXNJbWRsZEVsMFpXMGlMQ0pzYjJOaGRHbHZiaUlzSW1oaGMyZ2lMQ0p2YmtWdWRHVnlJaXdpWkdGMFpVMXZiblJvSWl3aVpHRjBaU0lzSWtSaGRHVWlMQ0p0YjI1MElpd2laMlYwVFc5dWRHZ2lMQ0o1WlhJaUxDSm5aWFJHZFd4c1dXVmhjaUlzSW5CMWMyZ2lMQ0pqWVd4bGJtUmhjaUlzSWxKbGJtUmxjaUlzSW05dVRHVmhkbVVpTENKcGJtNWxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZCUVRzN096czdPMEZCUTBFN1FVRkRRU3hKUVVGSlFTeE5RVUZOUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEV0QlFYWkNMRU5CUVZZN1FVRkRRU3hKUVVGSlF5eFhRVUZYTzBGQlEySkRMRkZCUVUwc1ZVRkVUenRCUVVWaVF5eFRRVUZQTzBGQlFVRXNWMEZCVVVNc1UwRkJVeXhWUVVGcVFqdEJRVUZCTEVkQlJrMDdRVUZIWWtNc2FVSkJRV1VzZVVKQlFVMDdRVUZEYmtJN08wRkJSVUVzVVVGQlNTeERRVUZEUXl4bFFVRmxReXhQUVVGbUxFTkJRWFZDTEUxQlFYWkNMRU5CUVV3c1JVRkJjVU5ETEZOQlFWTkRMRWxCUVZRc1IwRkJaMElzUlVGQmFFSTdRVUZEZEVNc1IwRlFXVHRCUVZGaVF5eFhRVUZUTEcxQ1FVRk5PMEZCUTJJN1FVRkRRU3hSUVVGSlF5eFpRVUZaTEVWQlFXaENPMEZCUTBFc1VVRkJTVU1zVDBGQlR5eEpRVUZKUXl4SlFVRktMRVZCUVZnN1FVRkRRU3hSUVVGSlF5eFBRVUZQUml4TFFVRkxSeXhSUVVGTUxFVkJRVmc3UVVGRFFTeFJRVUZKUXl4TlFVRk5TaXhMUVVGTFN5eFhRVUZNTEVWQlFWWTdRVUZEUVU0c1kwRkJWVThzU1VGQlZpeERRVUZsUml4SFFVRm1PMEZCUTBGTUxHTkJRVlZQTEVsQlFWWXNRMEZCWlVvc1QwRkJUeXhEUVVGMFFqdEJRVU5CTzBGQlEwRXNVVUZCU1Vzc1YwRkJWeXcwUWtGQlppeERRVlJoTEVOQlUzTkNPMEZCUTI1RFFTeGhRVUZUUXl4TlFVRlVMRU5CUVdkQ1ZDeFRRVUZvUWl4RlFWWmhMRU5CVldVN1FVRkROMElzUjBGdVFsazdRVUZ2UW1KVkxGZEJRVk1zYlVKQlFVMDdRVUZEWWp0QlFVTkJkRUlzWVVGQlUwTXNZVUZCVkN4RFFVRjFRaXhSUVVGMlFpeEZRVUZwUTNOQ0xGTkJRV3BETEVkQlFUWkRMRVZCUVRkRE8wRkJRMEY0UWl4UlFVRkpkMElzVTBGQlNpeEhRVUZuUWl4RlFVRm9RanRCUVVORU8wRkJlRUpaTEVOQlFXWTdPMUZCTWtKVGNrSXNVU3hIUVVGQlFTeFJJaXdpWm1sc1pTSTZJa05oYkdWdVpHRnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUdOaGJHVnVaR0Z5VUdGblpTQm1jbTl0SUZ3aUxpNHZZMjl0Y0c5dVpXNTBjeTlEWVd4bGJtUmhjbEJoWjJWY0lqdGNjbHh1THk5cGJYQnZjblFnZXlCMWMyVnlUMjVzYVc1bElIMGdabkp2YlNCY0lpNHVMMk52YlhCdmJtVnVkSE12YzJsbmJrbHVYQ0k3WEhKY2JuWmhjaUJrYVhZZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aVpHbDJYQ0lwTzF4eVhHNTJZWElnUTJGc1pXNWtZWElnUFNCN1hISmNiaUFnYm1GdFpUb2dYQ0pEWVd4bGJtUmhjbHdpTEZ4eVhHNGdJRzFoZEdOb09pQjBaWGgwSUQwK0lIUmxlSFFnUFQwOUlGd2lRMkZzWlc1a1lYSmNJaXhjY2x4dUlDQnZia0psWm05eVpVVnVkR1Z5T2lBb0tTQTlQaUI3WEhKY2JpQWdJQ0F2THlEUXY5R0EwTGdnMExmUXNOR0YwTDdRdE5DMUlOQzkwTEFnMFlIUmd0R0EwTERRdmRDNDBZYlJneURRdjlHQTBMN1FzdEMxMFlEUmo5QzEwWUxSak5HQjBZOHNJTkMzMExEUXU5QyswTFBRdU5DOTBMNGcwTHZRdUNEUmd0R0xJTkMzMExEUmhkQyswTFRRdU5HSTBZd2dMQ0RRdGRHQjBMdlF1Q0RRdmRDMTBZSWcwWUxRdmlEUXY5QyswWWpRdGRDN0lOQ3kwTDdRdlNGY2NseHVYSEpjYmlBZ0lDQnBaaUFvSVhObGMzTnBiMjVUZEc5eVlXZGxMbWRsZEVsMFpXMG9YQ0oxYzJWeVhDSXBLU0JzYjJOaGRHbHZiaTVvWVhOb0lEMGdYQ0pjSWp0Y2NseHVJQ0I5TEZ4eVhHNGdJRzl1Ulc1MFpYSTZJQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDOHZJTkdDMFlQUmdpRFJnZEMrMExmUXROQ3cwTFhSZ3RHTTBZSFJqeURRdk5DdzBZSFJnZEM0MExJZzBZRWcwTFBRdnRDMDBMN1F2Q0RRdUNEUXZOQzEwWUhSajlHRzBMWFF2Q0RRdE5DNzBZOGcwTC9RdGRHQTBMWFF0TkN3MFlmUXVDRFF0ZEN6MEw0ZzBMSWcwWURRdGRDOTBMVFF0ZEdBWEhKY2JpQWdJQ0JzWlhRZ1pHRjBaVTF2Ym5Sb0lEMGdXMTA3WEhKY2JpQWdJQ0JzWlhRZ1pHRjBaU0E5SUc1bGR5QkVZWFJsS0NrN1hISmNiaUFnSUNCc1pYUWdiVzl1ZENBOUlHUmhkR1V1WjJWMFRXOXVkR2dvS1R0Y2NseHVJQ0FnSUd4bGRDQjVaWElnUFNCa1lYUmxMbWRsZEVaMWJHeFpaV0Z5S0NrN1hISmNiaUFnSUNCa1lYUmxUVzl1ZEdndWNIVnphQ2g1WlhJcE8xeHlYRzRnSUNBZ1pHRjBaVTF2Ym5Sb0xuQjFjMmdvYlc5dWRDQXJJREVwTzF4eVhHNGdJQ0FnTHk5Y2NseHVJQ0FnSUd4bGRDQmpZV3hsYm1SaGNpQTlJRzVsZHlCallXeGxibVJoY2xCaFoyVW9LVHNnTHk4ZzBZSFF2dEMzMExUUXNOQzkwTGpRdFNEUmpkQzYwTGZRdGRDODBML1F1OUdQMFlEUXNDRFF1dEM3MExEUmdkR0IwTEJjY2x4dUlDQWdJR05oYkdWdVpHRnlMbEpsYm1SbGNpaGtZWFJsVFc5dWRHZ3BPeUF2THlEUmdOQzEwTDNRdE5DMTBZQWcwWUhSZ3RHQTBMRFF2ZEM0MFliUml5RFF1Q0RRdE5DKzBMSFFzTkN5MEx2UXRkQzkwTGpRdFNEUXZ0Q3gwWURRc05DeDBMN1JndEdIMExqUXV0Q3dYSEpjYmlBZ2ZTeGNjbHh1SUNCdmJreGxZWFpsT2lBb0tTQTlQaUI3WEhKY2JpQWdJQ0F2TDlDLzBZRFF1Q0RRc3RHTDBZWFF2dEMwMExVZzBZRWcwWUhSZ3RHQTBMRFF2ZEM0MFliUml5RFJoOUM0MFlIUmd0QzQwWWJRc0NCb1pXRmtaWElnTEdScGRseHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSW1obFlXUmxjbHdpS1M1cGJtNWxja2hVVFV3Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnWkdsMkxtbHVibVZ5U0ZSTlRDQTlJRndpWENJN1hISmNiaUFnZlZ4eVhHNTlPMXh5WEc1Y2NseHVaWGh3YjNKMElIc2dRMkZzWlc1a1lYSWdmVHRjY2x4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcm91dGVzXFxcXENhbGVuZGFyLmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRheVZpZXcgPSB1bmRlZmluZWQ7XG5cbnZhciBfZGF5Vmlld1BhZ2UgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXlWaWV3UGFnZVwiKTtcblxudmFyIF9kYXlWaWV3UGFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXlWaWV3UGFnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkYXlWaWV3ID0ge1xuICBuYW1lOiBcImRheVZpZXdcIixcbiAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dCA9PT0gXCJkYXlWaWV3XCI7XG4gIH0sXG4gIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKFwib25CZWZvcmVFbnRlciBpbmRleFwiKTtcbiAgfSxcbiAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICB2YXIgZGF5VmlldyA9IG5ldyBfZGF5Vmlld1BhZ2UyLmRlZmF1bHQoKTtcbiAgICBkYXlWaWV3LmJ1aWxkUGFnZXMoKTtcbiAgfSxcbiAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpLmlubmVySFRNTCA9IFwiXCI7IC8vINC/0YDQuCDQv9C+0LrQuNC00LDQvdC40Lgg0LTQsNC90L3QvtC5INGB0YLRgNCw0L3QuNGG0Ysg0L/RgNC+0LjQt9Cy0L7QtNC40YLRjNGB0Y8g0L7Rh9C40YHRgtC60LBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbn07XG5leHBvcnRzLmRheVZpZXcgPSBkYXlWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtSaGVWWnBaWGN1YW5NaVhTd2libUZ0WlhNaU9sc2laR0Y1Vm1sbGR5SXNJbTVoYldVaUxDSnRZWFJqYUNJc0luUmxlSFFpTENKdmJrSmxabTl5WlVWdWRHVnlJaXdpWTI5dWMyOXNaU0lzSW14dlp5SXNJbTl1Ulc1MFpYSWlMQ0ppZFdsc1pGQmhaMlZ6SWl3aWIyNU1aV0YyWlNJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltbHVibVZ5U0ZSTlRDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenRCUVVGQk96czdPenM3UVVGRFFTeEpRVUZKUVN4VlFVRlZPMEZCUTFwRExGRkJRVTBzVTBGRVRUdEJRVVZhUXl4VFFVRlBPMEZCUVVFc1YwRkJVVU1zVTBGQlV5eFRRVUZxUWp0QlFVRkJMRWRCUmtzN1FVRkhXa01zYVVKQlFXVTdRVUZCUVN4WFFVRk5ReXhSUVVGUlF5eEhRVUZTTEhWQ1FVRk9PMEZCUVVFc1IwRklTRHRCUVVsYVF5eFhRVUZUTEcxQ1FVRk5PMEZCUTJJc1VVRkJTVkFzVlVGQlZTd3lRa0ZCWkR0QlFVTkJRU3haUVVGUlVTeFZRVUZTTzBGQlEwUXNSMEZRVnp0QlFWRmFReXhYUVVGVExHMUNRVUZOTzBGQlEySkRMR0ZCUVZORExHRkJRVlFzUTBGQmRVSXNTMEZCZGtJc1JVRkJPRUpETEZOQlFUbENMRWRCUVRCRExFVkJRVEZETEVOQlJHRXNRMEZEYVVNN1FVRkRPVU5HTEdGQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVVVGQmRrSXNSVUZCYVVORExGTkJRV3BETEVkQlFUWkRMRVZCUVRkRE8wRkJRMFE3UVVGWVZ5eERRVUZrTzFGQllWTmFMRThzUjBGQlFVRXNUeUlzSW1acGJHVWlPaUpFWVhsV2FXVjNMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUdSaGVWWnBaWGRRWVdkbElHWnliMjBnWENJdUxpOWpiMjF3YjI1bGJuUnpMMlJoZVZacFpYZFFZV2RsWENJN1hHNTJZWElnWkdGNVZtbGxkeUE5SUh0Y2JpQWdibUZ0WlRvZ1hDSmtZWGxXYVdWM1hDSXNYRzRnSUcxaGRHTm9PaUIwWlhoMElEMCtJSFJsZUhRZ1BUMDlJRndpWkdGNVZtbGxkMXdpTEZ4dUlDQnZia0psWm05eVpVVnVkR1Z5T2lBb0tTQTlQaUJqYjI1emIyeGxMbXh2WnloZ2IyNUNaV1p2Y21WRmJuUmxjaUJwYm1SbGVHQXBMRnh1SUNCdmJrVnVkR1Z5T2lBb0tTQTlQaUI3WEc0Z0lDQWdiR1YwSUdSaGVWWnBaWGNnUFNCdVpYY2daR0Y1Vm1sbGQxQmhaMlVvS1R0Y2JpQWdJQ0JrWVhsV2FXVjNMbUoxYVd4a1VHRm5aWE1vS1R0Y2JpQWdmU3hjYmlBZ2IyNU1aV0YyWlRvZ0tDa2dQVDRnZTF4dUlDQWdJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSmthWFpjSWlrdWFXNXVaWEpJVkUxTUlEMGdYQ0pjSWpzZ0x5OGcwTC9SZ05DNElOQy8wTDdRdXRDNDBMVFFzTkM5MExqUXVDRFF0TkN3MEwzUXZkQyswTGtnMFlIUmd0R0EwTERRdmRDNDBZYlJpeURRdjlHQTBMN1F1TkMzMExMUXZ0QzAwTGpSZ3RHTTBZSFJqeURRdnRHSDBMalJnZEdDMExyUXNGeHVJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0pvWldGa1pYSmNJaWt1YVc1dVpYSklWRTFNSUQwZ1hDSmNJanRjYmlBZ2ZWeHVmVHRjYm1WNGNHOXlkQ0I3SUdSaGVWWnBaWGNnZlR0Y2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxEYXlWaWV3LmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmluZGV4ID0gdW5kZWZpbmVkO1xuXG52YXIgX0luZGV4UGFnZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL0luZGV4UGFnZVwiKTtcblxudmFyIF9JbmRleFBhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSW5kZXhQYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIik7XG52YXIgaW5kZXggPSB7XG4gIG5hbWU6IFwiaW5kZXhcIixcbiAgbWF0Y2g6IFwiXCIsXG4gIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKFwib25CZWZvcmVFbnRlciBpbmRleFwiKTtcbiAgfSxcbiAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICB2YXIgaW5kZXggPSBuZXcgX0luZGV4UGFnZTIuZGVmYXVsdCgpOyAvLyDRgdC+0LfQtNCw0L3QuNC1INGN0LrQt9C10LzQv9C70LDRgNCwINC60LvQsNGB0LAgaW5kZXhQYWdlXG4gICAgaW5kZXgucmVuZGVyUGFnZSgpOyAvL9GA0LXQvdC00LXRgCDRgdGC0YDQsNC90LjRhtGLXG4gICAgaW5kZXguYWRkSGVuZGxlcigpOyAvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutCwXG4gIH0sXG4gIG9uTGVhdmU6IGZ1bmN0aW9uIG9uTGVhdmUoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKS5pbm5lckhUTUwgPSBcIlwiOyAvLyDQv9GA0Lgg0L/QvtC60LjQtNCw0L3QuNC4INC00LDQvdC90L7QuSDRgdGC0YDQsNC90LjRhtGLINC/0YDQvtC40LfQstC+0LTQuNGC0YzRgdGPINC+0YfQuNGB0YLQutCwXG4gIH1cbn07XG5cbmV4cG9ydHMuaW5kZXggPSBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbVJwZGlJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltbHVaR1Y0SWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpYjI1Q1pXWnZjbVZGYm5SbGNpSXNJbU52Ym5OdmJHVWlMQ0pzYjJjaUxDSnZia1Z1ZEdWeUlpd2ljbVZ1WkdWeVVHRm5aU0lzSW1Ga1pFaGxibVJzWlhJaUxDSnZia3hsWVhabElpd2lhVzV1WlhKSVZFMU1JbDBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3TzBGQlFVRTdPenM3T3p0QlFVTkJMRWxCUVVsQkxFMUJRVTFETEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzUzBGQmRrSXNRMEZCVmp0QlFVTkJMRWxCUVVsRExGRkJRVkU3UVVGRFZrTXNVVUZCVFN4UFFVUkpPMEZCUlZaRExGTkJRVThzUlVGR1J6dEJRVWRXUXl4cFFrRkJaVHRCUVVGQkxGZEJRVTFETEZGQlFWRkRMRWRCUVZJc2RVSkJRVTQ3UVVGQlFTeEhRVWhNTzBGQlNWWkRMRmRCUVZNc2JVSkJRVTA3UVVGRFlpeFJRVUZKVGl4UlFVRlJMSGxDUVVGYUxFTkJSR0VzUTBGRFowSTdRVUZETjBKQkxGVkJRVTFQTEZWQlFVNHNSMEZHWVN4RFFVVlBPMEZCUTNCQ1VDeFZRVUZOVVN4VlFVRk9MRWRCU0dFc1EwRkhUenRCUVVOeVFpeEhRVkpUTzBGQlUxWkRMRmRCUVZNc2JVSkJRVTA3UVVGRFlsZ3NZVUZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUYyUWl4RlFVRTRRbGNzVTBGQk9VSXNSMEZCTUVNc1JVRkJNVU1zUTBGRVlTeERRVU5wUXp0QlFVTXZRenRCUVZoVExFTkJRVm83TzFGQlkxTldMRXNzUjBGQlFVRXNTeUlzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JwYm1SbGVGQmhaMlVnWm5KdmJTQmNJaTR1TDJOdmJYQnZibVZ1ZEhNdlNXNWtaWGhRWVdkbFhDSTdYSEpjYm5aaGNpQmthWFlnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpWkdsMlhDSXBPMXh5WEc1MllYSWdhVzVrWlhnZ1BTQjdYSEpjYmlBZ2JtRnRaVG9nWENKcGJtUmxlRndpTEZ4eVhHNGdJRzFoZEdOb09pQmNJbHdpTEZ4eVhHNGdJRzl1UW1WbWIzSmxSVzUwWlhJNklDZ3BJRDArSUdOdmJuTnZiR1V1Ykc5bktHQnZia0psWm05eVpVVnVkR1Z5SUdsdVpHVjRZQ2tzWEhKY2JpQWdiMjVGYm5SbGNqb2dLQ2tnUFQ0Z2UxeHlYRzRnSUNBZ2JHVjBJR2x1WkdWNElEMGdibVYzSUdsdVpHVjRVR0ZuWlNncE95QXZMeURSZ2RDKzBMZlF0TkN3MEwzUXVOQzFJTkdOMExyUXQ5QzEwTHpRdjlDNzBMRFJnTkN3SU5DNjBMdlFzTkdCMExBZ2FXNWtaWGhRWVdkbFhISmNiaUFnSUNCcGJtUmxlQzV5Wlc1a1pYSlFZV2RsS0NrN0lDOHYwWURRdGRDOTBMVFF0ZEdBSU5HQjBZTFJnTkN3MEwzUXVOR0cwWXRjY2x4dUlDQWdJR2x1WkdWNExtRmtaRWhsYm1Sc1pYSW9LVHNnTHk4ZzBMVFF2dEN4MExEUXN0QzcwTFhRdmRDNDBMVWcwTDdRc2RHQTBMRFFzZEMrMFlMUmg5QzQwTHJRc0Z4eVhHNGdJSDBzWEhKY2JpQWdiMjVNWldGMlpUb2dLQ2tnUFQ0Z2UxeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSW1ScGRsd2lLUzVwYm01bGNraFVUVXdnUFNCY0lsd2lPeUF2THlEUXY5R0EwTGdnMEwvUXZ0QzYwTGpRdE5DdzBMM1F1TkM0SU5DMDBMRFF2ZEM5MEw3UXVTRFJnZEdDMFlEUXNOQzkwTGpSaHRHTElOQy8wWURRdnRDNDBMZlFzdEMrMExUUXVOR0MwWXpSZ2RHUElOQyswWWZRdU5HQjBZTFF1dEN3WEhKY2JpQWdmVnh5WEc1OU8xeHlYRzVjY2x4dVpYaHdiM0owSUhzZ2FXNWtaWGdnZlR0Y2NseHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxpbmRleC5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFJvdXRlciA9IGZ1bmN0aW9uIFJvdXRlcihvcHRpb25zKSB7XG4gIHRoaXMucm91dGVzID0gb3B0aW9ucy5yb3V0ZXM7XG4gIHRoaXMuaW5pdCgpO1xufTtcblxuUm91dGVyLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZVVybChldi5vbGRVUkwuc3BsaXQoXCIjXCIpWzFdIHx8IFwiXCIsIGV2Lm5ld1VSTC5zcGxpdChcIiNcIilbMV0pO1xuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlVXJsKHVuZGVmaW5lZCwgd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xuICB9LFxuICBnZXRQYXJhbTogZnVuY3Rpb24gZ2V0UGFyYW0obmV3Um91dGUsIGN1cnJlbnRSb3V0ZSkge1xuICAgIHZhciBwYXJhbSA9IG5ld1JvdXRlLm1hdGNoKGN1cnJlbnRSb3V0ZS5tYXRjaCkgfHwgW107XG4gICAgcmV0dXJuIHBhcmFtWzFdO1xuICB9LFxuICBoYW5kbGVVcmw6IGZ1bmN0aW9uIGhhbmRsZVVybChvbGRSb3V0ZSwgbmV3Um91dGUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBjdXJyZW50Um91dGUgPSB0aGlzLnJvdXRlcy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ld1JvdXRlID09PSBpdGVtLm1hdGNoO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVtLm1hdGNoKG5ld1JvdXRlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5tYXRjaCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gbmV3Um91dGUubWF0Y2goaXRlbS5tYXRjaCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9sZFJvdXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBwcmV2aW91c1JvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXR1cm4gb2xkUm91dGUgPT09IGl0ZW0ubWF0Y2g7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBpdGVtLm1hdGNoKG9sZFJvdXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLm1hdGNoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgcmV0dXJuIG9sZFJvdXRlLm1hdGNoKGl0ZW0ubWF0Y2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRQYXJhbSA9IHRoaXMuZ2V0UGFyYW0obmV3Um91dGUsIGN1cnJlbnRSb3V0ZSk7XG4gICAgY29uc29sZS5sb2coXCItLS0+IHJvdXRlciBvbGRVUkw6IFwiICsgb2xkUm91dGUpO1xuICAgIGNvbnNvbGUubG9nKFwiLS0tPiByb3V0ZXIgZmluZE5ld0FjdGl2ZVJvdXRlOiBcIiArIG5ld1JvdXRlICsgXCIgLS0gXCIgKyAoY3VycmVudFJvdXRlIHx8IHt9KS5uYW1lKTtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwcmV2aW91c1JvdXRlICYmIHByZXZpb3VzUm91dGUub25MZWF2ZSAmJiBwcmV2aW91c1JvdXRlLm9uTGVhdmUob2xkUm91dGUuc3BsaXQoXCI9XCIpWzFdKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIoY3VycmVudFBhcmFtKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIoX3RoaXMyLmV2ZW50QnVzLCBjdXJyZW50UGFyYW0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSb3V0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbEp2ZFhSbGNpNXFjeUpkTENKdVlXMWxjeUk2V3lKU2IzVjBaWElpTENKdmNIUnBiMjV6SWl3aWNtOTFkR1Z6SWl3aWFXNXBkQ0lzSW5CeWIzUnZkSGx3WlNJc0luZHBibVJ2ZHlJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSm9ZVzVrYkdWVmNtd2lMQ0psZGlJc0ltOXNaRlZTVENJc0luTndiR2wwSWl3aWJtVjNWVkpNSWl3aWRXNWtaV1pwYm1Wa0lpd2liRzlqWVhScGIyNGlMQ0pvWVhOb0lpd2ljMnhwWTJVaUxDSm5aWFJRWVhKaGJTSXNJbTVsZDFKdmRYUmxJaXdpWTNWeWNtVnVkRkp2ZFhSbElpd2ljR0Z5WVcwaUxDSnRZWFJqYUNJc0ltOXNaRkp2ZFhSbElpd2labWx1WkNJc0ltbDBaVzBpTENKU1pXZEZlSEFpTENKd2NtVjJhVzkxYzFKdmRYUmxJaXdpWTNWeWNtVnVkRkJoY21GdElpd2lZMjl1YzI5c1pTSXNJbXh2WnlJc0ltNWhiV1VpTENKUWNtOXRhWE5sSWl3aWNtVnpiMngyWlNJc0luUm9aVzRpTENKdmJreGxZWFpsSWl3aWIyNUNaV1p2Y21WRmJuUmxjaUlzSW05dVJXNTBaWElpTENKbGRtVnVkRUoxY3lKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN1FVRkJRU3hKUVVGSlFTeFRRVUZUTEZOQlFWUkJMRTFCUVZNc1EwRkJVME1zVDBGQlZDeEZRVUZyUWp0QlFVTTNRaXhQUVVGTFF5eE5RVUZNTEVkQlFXTkVMRkZCUVZGRExFMUJRWFJDTzBGQlEwRXNUMEZCUzBNc1NVRkJURHRCUVVORUxFTkJTRVE3TzBGQlMwRklMRTlCUVU5SkxGTkJRVkFzUjBGQmJVSTdRVUZEYWtKRUxGRkJRVTBzWjBKQlFWYzdRVUZCUVRzN1FVRkRaa1VzVjBGQlQwTXNaMEpCUVZBc1EwRkJkMElzV1VGQmVFSXNSVUZCYzBNN1FVRkJRU3hoUVVOd1F5eE5RVUZMUXl4VFFVRk1MRU5CUVdWRExFZEJRVWRETEUxQlFVZ3NRMEZCVlVNc1MwRkJWaXhEUVVGblFpeEhRVUZvUWl4RlFVRnhRaXhEUVVGeVFpeExRVUV5UWl4RlFVRXhReXhGUVVFNFEwWXNSMEZCUjBjc1RVRkJTQ3hEUVVGVlJDeExRVUZXTEVOQlFXZENMRWRCUVdoQ0xFVkJRWEZDTEVOQlFYSkNMRU5CUVRsRExFTkJSRzlETzBGQlFVRXNTMEZCZEVNN1FVRkhRU3hUUVVGTFNDeFRRVUZNTEVOQlFXVkxMRk5CUVdZc1JVRkJNRUpRTEU5QlFVOVJMRkZCUVZBc1EwRkJaMEpETEVsQlFXaENMRU5CUVhGQ1F5eExRVUZ5UWl4RFFVRXlRaXhEUVVFelFpeERRVUV4UWp0QlFVTkVMRWRCVG1kQ08wRkJUMnBDUXl4WlFVRlZMR3RDUVVGVFF5eFJRVUZVTEVWQlFXMUNReXhaUVVGdVFpeEZRVUZwUXp0QlFVTjZReXhSUVVGSlF5eFJRVUZSUml4VFFVRlRSeXhMUVVGVUxFTkJRV1ZHTEdGQlFXRkZMRXRCUVRWQ0xFdEJRWE5ETEVWQlFXeEVPMEZCUTBFc1YwRkJUMFFzVFVGQlRTeERRVUZPTEVOQlFWQTdRVUZEUkN4SFFWWm5RanRCUVZkcVFsb3NZVUZCVnl4dFFrRkJVMk1zVVVGQlZDeEZRVUZ0UWtvc1VVRkJia0lzUlVGQk5rSTdRVUZCUVRzN1FVRkRkRU1zVVVGQlNVTXNaVUZCWlN4TFFVRkxhRUlzVFVGQlRDeERRVUZaYjBJc1NVRkJXaXhEUVVGcFFpeG5Ra0ZCVVR0QlFVTXhReXhWUVVGSkxFOUJRVTlETEV0QlFVdElMRXRCUVZvc1MwRkJjMElzVVVGQk1VSXNSVUZCYjBNN1FVRkRiRU1zWlVGQlQwZ3NZVUZCWVUwc1MwRkJTMGdzUzBGQmVrSTdRVUZEUkN4UFFVWkVMRTFCUlU4c1NVRkJTU3hQUVVGUFJ5eExRVUZMU0N4TFFVRmFMRXRCUVhOQ0xGVkJRVEZDTEVWQlFYTkRPMEZCUXpORExHVkJRVTlITEV0QlFVdElMRXRCUVV3c1EwRkJWMGdzVVVGQldDeERRVUZRTzBGQlEwUXNUMEZHVFN4TlFVVkJMRWxCUVVsTkxFdEJRVXRJTEV0QlFVd3NXVUZCYzBKSkxFMUJRVEZDTEVWQlFXdERPMEZCUTNaRExHVkJRVTlRTEZOQlFWTkhMRXRCUVZRc1EwRkJaVWNzUzBGQlMwZ3NTMEZCY0VJc1EwRkJVRHRCUVVORU8wRkJRMFlzUzBGU2EwSXNRMEZCYmtJN1FVRlRRU3hSUVVGSlF5eGhRVUZoVkN4VFFVRnFRaXhGUVVFMFFqdEJRVU14UWl4VlFVRkpZU3huUWtGQlowSXNTMEZCUzNaQ0xFMUJRVXdzUTBGQldXOUNMRWxCUVZvc1EwRkJhVUlzWjBKQlFWRTdRVUZETTBNc1dVRkJTU3hQUVVGUFF5eExRVUZMU0N4TFFVRmFMRXRCUVhOQ0xGRkJRVEZDTEVWQlFXOURPMEZCUTJ4RExHbENRVUZQUXl4aFFVRmhSU3hMUVVGTFNDeExRVUY2UWp0QlFVTkVMRk5CUmtRc1RVRkZUeXhKUVVGSkxFOUJRVTlITEV0QlFVdElMRXRCUVZvc1MwRkJjMElzVlVGQk1VSXNSVUZCYzBNN1FVRkRNME1zYVVKQlFVOUhMRXRCUVV0SUxFdEJRVXdzUTBGQlYwTXNVVUZCV0N4RFFVRlFPMEZCUTBRc1UwRkdUU3hOUVVWQkxFbEJRVWxGTEV0QlFVdElMRXRCUVV3c1dVRkJjMEpKTEUxQlFURkNMRVZCUVd0RE8wRkJRM1pETEdsQ1FVRlBTQ3hUUVVGVFJDeExRVUZVTEVOQlFXVkhMRXRCUVV0SUxFdEJRWEJDTEVOQlFWQTdRVUZEUkR0QlFVTkdMRTlCVW0xQ0xFTkJRWEJDTzBGQlUwUTdRVUZEUkN4UlFVRkpUU3hsUVVGbExFdEJRVXRXTEZGQlFVd3NRMEZCWTBNc1VVRkJaQ3hGUVVGM1FrTXNXVUZCZUVJc1EwRkJia0k3UVVGRFFWTXNXVUZCVVVNc1IwRkJVaXd3UWtGQmJVTlFMRkZCUVc1RE8wRkJRMEZOTEZsQlFWRkRMRWRCUVZJc2MwTkJRM0ZEV0N4UlFVUnlReXhaUVVOdlJDeERRVUZEUXl4blFrRkJaMElzUlVGQmFrSXNSVUZETDBOWExFbEJSa3c3UVVGSlFVTXNXVUZCVVVNc1QwRkJVaXhIUVVOSFF5eEpRVVJJTEVOQlJVazdRVUZCUVN4aFFVTkZVQ3hwUWtGRFFVRXNZMEZCWTFFc1QwRkVaQ3hKUVVWQlVpeGpRVUZqVVN4UFFVRmtMRU5CUVhOQ1dpeFRRVUZUV0N4TFFVRlVMRU5CUVdVc1IwRkJaaXhGUVVGdlFpeERRVUZ3UWl4RFFVRjBRaXhEUVVoR08wRkJRVUVzUzBGR1NpeEZRVTlIYzBJc1NVRlFTQ3hEUVZGSk8wRkJRVUVzWVVGRFJXUXNaMEpCUTBGQkxHRkJRV0ZuUWl4aFFVUmlMRWxCUlVGb1FpeGhRVUZoWjBJc1lVRkJZaXhEUVVFeVFsSXNXVUZCTTBJc1EwRklSanRCUVVGQkxFdEJVa29zUlVGaFIwMHNTVUZpU0N4RFFXTkpPMEZCUVVFc1lVRkRSV1FzWjBKQlEwRkJMR0ZCUVdGcFFpeFBRVVJpTEVsQlJVRnFRaXhoUVVGaGFVSXNUMEZCWWl4RFFVRnhRaXhQUVVGTFF5eFJRVUV4UWl4RlFVRnZRMVlzV1VGQmNFTXNRMEZJUmp0QlFVRkJMRXRCWkVvN1FVRnRRa1E3UVVGNlJHZENMRU5CUVc1Q096dHJRa0UwUkdVeFFpeE5JaXdpWm1sc1pTSTZJbEp2ZFhSbGNpNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQlNiM1YwWlhJZ1BTQm1kVzVqZEdsdmJpaHZjSFJwYjI1ektTQjdYSEpjYmlBZ2RHaHBjeTV5YjNWMFpYTWdQU0J2Y0hScGIyNXpMbkp2ZFhSbGN6dGNjbHh1SUNCMGFHbHpMbWx1YVhRb0tUdGNjbHh1ZlR0Y2NseHVYSEpjYmxKdmRYUmxjaTV3Y205MGIzUjVjR1VnUFNCN1hISmNiaUFnYVc1cGREb2dablZ1WTNScGIyNG9LU0I3WEhKY2JpQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbWhoYzJoamFHRnVaMlZjSWl3Z1pYWWdQVDVjY2x4dUlDQWdJQ0FnZEdocGN5NW9ZVzVrYkdWVmNtd29aWFl1YjJ4a1ZWSk1Mbk53YkdsMEtGd2lJMXdpS1ZzeFhTQjhmQ0JjSWx3aUxDQmxkaTV1WlhkVlVrd3VjM0JzYVhRb1hDSWpYQ0lwV3pGZEtWeHlYRzRnSUNBZ0tUdGNjbHh1SUNBZ0lIUm9hWE11YUdGdVpHeGxWWEpzS0hWdVpHVm1hVzVsWkN3Z2QybHVaRzkzTG14dlkyRjBhVzl1TG1oaGMyZ3VjMnhwWTJVb01Ta3BPMXh5WEc0Z0lIMHNYSEpjYmlBZ1oyVjBVR0Z5WVcwNklHWjFibU4wYVc5dUtHNWxkMUp2ZFhSbExDQmpkWEp5Wlc1MFVtOTFkR1VwSUh0Y2NseHVJQ0FnSUhaaGNpQndZWEpoYlNBOUlHNWxkMUp2ZFhSbExtMWhkR05vS0dOMWNuSmxiblJTYjNWMFpTNXRZWFJqYUNrZ2ZId2dXMTA3WEhKY2JpQWdJQ0J5WlhSMWNtNGdjR0Z5WVcxYk1WMDdYSEpjYmlBZ2ZTeGNjbHh1SUNCb1lXNWtiR1ZWY213NklHWjFibU4wYVc5dUtHOXNaRkp2ZFhSbExDQnVaWGRTYjNWMFpTa2dlMXh5WEc0Z0lDQWdkbUZ5SUdOMWNuSmxiblJTYjNWMFpTQTlJSFJvYVhNdWNtOTFkR1Z6TG1acGJtUW9hWFJsYlNBOVBpQjdYSEpjYmlBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYVhSbGJTNXRZWFJqYUNBOVBUMGdYQ0p6ZEhKcGJtZGNJaWtnZTF4eVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYZFNiM1YwWlNBOVBUMGdhWFJsYlM1dFlYUmphRHRjY2x4dUlDQWdJQ0FnZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnYVhSbGJTNXRZWFJqYUNBOVBUMGdYQ0ptZFc1amRHbHZibHdpS1NCN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHbDBaVzB1YldGMFkyZ29ibVYzVW05MWRHVXBPMXh5WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dsMFpXMHViV0YwWTJnZ2FXNXpkR0Z1WTJWdlppQlNaV2RGZUhBcElIdGNjbHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdibVYzVW05MWRHVXViV0YwWTJnb2FYUmxiUzV0WVhSamFDazdYSEpjYmlBZ0lDQWdJSDFjY2x4dUlDQWdJSDBwTzF4eVhHNGdJQ0FnYVdZZ0tHOXNaRkp2ZFhSbElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2NseHVJQ0FnSUNBZ2RtRnlJSEJ5WlhacGIzVnpVbTkxZEdVZ1BTQjBhR2x6TG5KdmRYUmxjeTVtYVc1a0tHbDBaVzBnUFQ0Z2UxeHlYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYVhSbGJTNXRZWFJqYUNBOVBUMGdYQ0p6ZEhKcGJtZGNJaWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHOXNaRkp2ZFhSbElEMDlQU0JwZEdWdExtMWhkR05vTzF4eVhHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlHbDBaVzB1YldGMFkyZ2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdsMFpXMHViV0YwWTJnb2IyeGtVbTkxZEdVcE8xeHlYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvYVhSbGJTNXRZWFJqYUNCcGJuTjBZVzVqWlc5bUlGSmxaMFY0Y0NrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRzlzWkZKdmRYUmxMbTFoZEdOb0tHbDBaVzB1YldGMFkyZ3BPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ2ZTazdYSEpjYmlBZ0lDQjlYSEpjYmlBZ0lDQjJZWElnWTNWeWNtVnVkRkJoY21GdElEMGdkR2hwY3k1blpYUlFZWEpoYlNodVpYZFNiM1YwWlN3Z1kzVnljbVZ1ZEZKdmRYUmxLVHRjY2x4dUlDQWdJR052Ym5OdmJHVXViRzluS0dBdExTMCtJSEp2ZFhSbGNpQnZiR1JWVWt3NklDUjdiMnhrVW05MWRHVjlZQ2s3WEhKY2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloY2NseHVJQ0FnSUNBZ1lDMHRMVDRnY205MWRHVnlJR1pwYm1ST1pYZEJZM1JwZG1WU2IzVjBaVG9nSkh0dVpYZFNiM1YwWlgwZ0xTMGdKSHNvWTNWeWNtVnVkRkp2ZFhSbElIeDhJSHQ5S1Z4eVhHNGdJQ0FnSUNBZ0lDNXVZVzFsZldCY2NseHVJQ0FnSUNrN1hISmNiaUFnSUNCUWNtOXRhWE5sTG5KbGMyOXNkbVVvS1Z4eVhHNGdJQ0FnSUNBdWRHaGxiaWhjY2x4dUlDQWdJQ0FnSUNBb0tTQTlQbHh5WEc0Z0lDQWdJQ0FnSUNBZ2NISmxkbWx2ZFhOU2IzVjBaU0FtSmx4eVhHNGdJQ0FnSUNBZ0lDQWdjSEpsZG1sdmRYTlNiM1YwWlM1dmJreGxZWFpsSUNZbVhISmNiaUFnSUNBZ0lDQWdJQ0J3Y21WMmFXOTFjMUp2ZFhSbExtOXVUR1ZoZG1Vb2IyeGtVbTkxZEdVdWMzQnNhWFFvWENJOVhDSXBXekZkS1Z4eVhHNGdJQ0FnSUNBcFhISmNiaUFnSUNBZ0lDNTBhR1Z1S0Z4eVhHNGdJQ0FnSUNBZ0lDZ3BJRDArWEhKY2JpQWdJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFVtOTFkR1VnSmlaY2NseHVJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlNiM1YwWlM1dmJrSmxabTl5WlVWdWRHVnlJQ1ltWEhKY2JpQWdJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFVtOTFkR1V1YjI1Q1pXWnZjbVZGYm5SbGNpaGpkWEp5Wlc1MFVHRnlZVzBwWEhKY2JpQWdJQ0FnSUNsY2NseHVJQ0FnSUNBZ0xuUm9aVzRvWEhKY2JpQWdJQ0FnSUNBZ0tDa2dQVDVjY2x4dUlDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SU2IzVjBaU0FtSmx4eVhHNGdJQ0FnSUNBZ0lDQWdZM1Z5Y21WdWRGSnZkWFJsTG05dVJXNTBaWElnSmlaY2NseHVJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlNiM1YwWlM1dmJrVnVkR1Z5S0hSb2FYTXVaWFpsYm5SQ2RYTXNJR04xY25KbGJuUlFZWEpoYlNsY2NseHVJQ0FnSUNBZ0tUdGNjbHh1SUNCOVhISmNibjA3WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQlNiM1YwWlhJN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi91dGlsc1xcXFxSb3V0ZXIuanNcIixcIi91dGlsc1wiKSJdfQ==
