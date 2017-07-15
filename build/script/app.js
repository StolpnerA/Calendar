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
              return _this.addCaption(event, dateMonth);
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
          value: function addCaption(e) {
            // тут код добавления заголовка
            var target = e.target;
            if (target.tagName !== "TD") return;
            var data = target.className;
            var q = prompt("Введите заголовок события?", "Пожрать");
            if (!q) return;
            target.innerHTML += "<div id=\"events\">" + q + "<button class=\"cross\">[x]</button></div>";
            var dataBase = new _dataBase2.default(); //создание экземпляра класса базы данных
            dataBase.SaveEventInDB(q, data); // вызов метода из базы для добавления евента принимает на вход текст заголовка и тег в какой записали
          }
        }, {
          key: "delCaption",
          value: function delCaption(e) {
            // тут код для удаления заголовка
            var target = e.target;
            if (target.tagName !== "BUTTON") return;
            var text = target.parentNode.innerHTML.slice(0, -34);
            var date = target.parentNode.parentNode.className;
            target.parentNode.remove();
            var dataBase = new _dataBase2.default(); //создание экземпляра класса базы данных
            dataBase.deleteEventInDB(date, text); // вызов метода из базы для удаления евента принимает на вход текст заголовка и тег в какой записали
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
            var CreateDiv = "\n            <div class=\"container\">\n            <div class = 'error'>\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C</div>\n            <div class=\"form-group\">\n                <label for=\"usr\">\u041B\u043E\u0433\u0438\u043D:</label>\n                <input type=\"text\" class=\"form-control\" id=\"usr\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"pwd\">\u041F\u0430\u0440\u043E\u043B\u044C:</label>\n                <input type=\"password\" class=\"form-control\" id=\"pwd\">\n            </div>\n            <div  id=\"eror\"></div>\n                <button type=\"button\" class=\"btn btn-large btn-success\" id=\"butAut\" >\u0412\u0445\u043E\u0434</button>\n                <a href=\"#Calendar\">fsdf</a>\n        </div>\n        </div>";
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
  }, { "./dataBase": 7, "./signIn": 8, "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
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
          value: function SaveEventInDB(caption, dateDay) {
            // сохранение Заголовка в системе + создание системы хранения для текства и коментраиев и готова задача или нет
            var obj = this.getAll(sessionStorage.getItem("user"));
            if (obj.tasks["" + dateDay]) {
              var arr = obj.tasks["" + dateDay].title;
              arr.push(caption);
            } else {
              obj.tasks["" + dateDay] = {
                title: [],
                text: [],
                done: [],
                comments: []
              };
              var arr = obj.tasks["" + dateDay].title;
              arr.push(caption);
            }
            localStorage.setItem("" + sessionStorage.getItem("user"), JSON.stringify(obj));
          }
        }, {
          key: "deleteEventInDB",
          value: function deleteEventInDB(dateDay, text) {
            //удаление пока только заголовка
            var obj = this.getAll(sessionStorage.getItem("user"));
            var index = obj.tasks["" + dateDay].title.indexOf(text);
            obj.tasks["" + dateDay].title.splice(index, 1);
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
  }, { "./dataBase": 7, "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      var _Router = require("./utils/Router");

      var _Router2 = _interopRequireDefault(_Router);

      var _index = require("./routes/index");

      var _Calendar = require("./routes/Calendar");

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var routes = [_index.index, _Calendar.Calendar];
      new _Router2.default({ routes: routes });
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_ad5ce9d0.js", "/");
  }, { "./routes/Calendar": 10, "./routes/index": 11, "./utils/Router": 12, "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
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
          //при выходе с страницы чистица header ,div, userOnline
          document.querySelector("header").innerHTML = "";
          div.innerHTML = "";
        }
      };

      exports.Calendar = Calendar;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\Calendar.js", "/routes");
  }, { "../components/CalendarPage": 5, "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
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
  }, { "../components/IndexPage": 6, "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
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
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [9]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NhbGVuZGFyL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9DYWxlbmRhci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCJEOi9DYWxlbmRhci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiRDovQ2FsZW5kYXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJEOi9DYWxlbmRhci9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiRDovQ2FsZW5kYXIvc3JjL3NjcmlwdC9jb21wb25lbnRzL0NhbGVuZGFyUGFnZS5qcyIsIkQ6L0NhbGVuZGFyL3NyYy9zY3JpcHQvY29tcG9uZW50cy9JbmRleFBhZ2UuanMiLCJEOi9DYWxlbmRhci9zcmMvc2NyaXB0L2NvbXBvbmVudHMvZGF0YUJhc2UuanMiLCJEOi9DYWxlbmRhci9zcmMvc2NyaXB0L2NvbXBvbmVudHMvc2lnbkluLmpzIiwiRDovQ2FsZW5kYXIvc3JjL3NjcmlwdC9mYWtlX2FkNWNlOWQwLmpzIiwiRDovQ2FsZW5kYXIvc3JjL3NjcmlwdC9yb3V0ZXMvQ2FsZW5kYXIuanMiLCJEOi9DYWxlbmRhci9zcmMvc2NyaXB0L3JvdXRlcy9pbmRleC5qcyIsIkQ6L0NhbGVuZGFyL3NyYy9zY3JpcHQvdXRpbHMvUm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EsQUFDQTs7QUFDQSxtQkFDQTs7QUFDQSwyQkFDQTtBQUNBLEFBQ0E7O21FQUNBLEFBQ0E7O2tDQUNBO21DQUNBO29DQUNBO21DQUNBO21DQUNBOzJDQUNBOzRDQUNBLEFBQ0E7OzZCQUNBO29DQUNBO2tFQUNBO29FQUNBO3dDQUNBOzhEQUNBOytDQUNBO3VEQUNBO0FBQ0EsQUFDQTs7cUNBQ0E7MENBQ0EsQUFDQTs7a0NBQ0E7NEJBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7d0JBQ0E7NkZBQ0EsQUFDQTs7QUFDQTs2Q0FDQSxBQUNBOztBQUNBO3NEQUNBLEFBQ0E7O2tCQUNBLEFBQ0E7OzJCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7b0RBQ0E7eUlBQ0E7cUNBQ0E7bUNBQ0E7dUJBQ0E7QUFDQSxBQUNBOztrQ0FDQTs0RUFDQTt1QkFDQTt5Q0FDQTs4R0FDQTs0QkFDQTt1QkFDQTtBQUNBLEFBQ0E7O2lCQUNBO0FBQ0EsQUFDQTs7c0NBQ0E7Y0FDQTswQ0FDQTs7QUFDQTttQkFDQTtjQUNBO2NBQ0EsQUFDQTs7K0JBQ0E7aUNBQ0E7QUFDQSxBQUNBOzt3Q0FDQTtnSEFDQTtBQUNBLEFBQ0E7O0FBQ0E7OEVBQ0E7c0VBQ0E7c0NBQ0E7QUFDQSxBQUNBOztBQUNBO2tCQUNBO2lCQUNBOzBDQUNBO3VDQUNBOzJDQUNBO3dCQUNBO0FBQ0E7aUJBQ0E7MkVBQ0E7dUNBQ0E7MkNBQ0E7MkNBQ0E7d0JBQ0E7QUFDQSxBQUNBLEFBQ0E7OztpQkFDQTtBQUNBLEFBQ0E7OzhCQUNBO2dDQUNBO29FQUNBLEFBQ0E7OztBQ3hIQTtBQUNBLEFBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7OztBQUNBO0FBQ0EsNEJBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7QUFDQSwyQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7WUFDQTtvQ0FDQTttQ0FDQTtnQ0FDQTttQkFDQTtBQUNBO3lFQUNBO29CQUNBO2lCQUNBO0FBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7Ozs7OztBQUNBLGlEQUNBOzRFQUNBLEFBQ0E7OzBFQUNBLEFBQ0E7O0FBQ0E7QUFDQTt3REFDQTsrQkFDQTsyQ0FDQTtnQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTtZQUNBOytMQUNBOzZCQUNBLEFBQ0E7O1lBQ0E7b0NBQ0E7QUFDQTsrQ0FDQTtlQUNBO0FBQ0E7Z0JBQ0E7dUJBQ0E7MEJBQ0E7QUFDQSxBQUNBOztZQUNBOzhFQUNBO0FBQ0E7bUJBQ0E7d0NBQ0E7QUFDQTt1Q0FDQTs4RkFDQTtBQUNBO3NDQUNBO2dDQUNBOzRFQUNBO3VDQUNBO3FCQUNBO0FBQ0E7QUFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLDhDQUNBO2lDQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTttQkFDQTtBQUNBO21CQUNBLEFBQ0E7O0FBQ0E7O0FBQ0EscUNBQ0E7cURBQ0E7QUFDQTs7QUFDQSxtREFDQTtZQUNBO29CQUNBOzRCQUNBO2VBQ0E7K0JBQ0E7QUFDQTtlQUNBO2VBQ0E7bUNBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtzQkFDQTtBQUNBO2VBQ0E7cUNBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBOytCQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0EsbURBQ0E7OEVBQ0EsQUFDQTs7K0JBQ0E7NEJBQ0E7c0NBQ0E7c0JBQ0E7QUFDQSxBQUNBOztZQUNBOzZDQUNBO3dCQUNBOzRDQUNBO21DQUNBO0FBQ0E7QUFDQSxBQUNBOzs2QkFDQTtrQkFDQTswQ0FDQTswQkFDQTt5QkFDQTtzQkFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0Esc0RBQ0E7bUNBQ0E7cUNBQ0E7cUJBQ0E7bUJBQ0E7ZUFDQTswQkFDQTtrQ0FDQTtxQkFDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTs0QkFDQTtpQ0FDQSxBQUNBOztpQ0FDQTs0QkFDQTtBQUNBO3lDQUNBO3VEQUNBOytCQUNBOzRCQUNBO0FBQ0E7bUNBQ0E7ZUFDQTtBQUNBOztBQUNBLHVEQUNBOytGQUNBO2VBQ0E7QUFDQTs7QUFDQSx3REFDQTtnR0FDQTtlQUNBO0FBQ0E7O0FBQ0EseURBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx5REFDQTtpR0FDQTtlQUNBO0FBQ0E7O0FBQ0EsMERBQ0E7a0dBQ0E7ZUFDQTtBQUNBOztBQUNBLDJFQUNBO0FBQ0E7QUFDQTs4QkFDQTtpQ0FDQTt1QkFDQTtxQkFDQTtBQUNBO2VBQ0E7QUFDQTtxQkFDQTtxQkFDQTttQkFDQTttQkFDQTtBQUNBLEFBQ0E7O21DQUNBO3NDQUNBO3FCQUNBO21CQUNBO2VBQ0E7MEJBQ0E7a0NBQ0E7cUJBQ0E7QUFDQTtBQUNBOzhDQUNBLEFBQ0E7O1lBQ0E7Z0JBQ0E7ZUFDQTtrREFDQTtBQUNBO2VBQ0E7ZUFDQTttREFDQTtBQUNBO2VBQ0E7b0RBQ0E7QUFDQTtlQUNBO3FEQUNBO0FBQ0E7ZUFDQTtxREFDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7c0RBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTttQkFDQSxBQUNBOzs4Q0FDQTtpQ0FDQTsyREFDQSxBQUNBOztBQUNBO2tDQUNBLEFBQ0E7O1lBQ0E7Z0JBQ0E7ZUFDQTt5Q0FDQTtBQUNBO2VBQ0E7ZUFDQTswQ0FDQTtBQUNBO2VBQ0E7MkNBQ0E7QUFDQTtlQUNBOzRDQUNBO0FBQ0E7ZUFDQTs0Q0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7NkNBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSw0Q0FDQTs7Z0JBRUE7OERBQ0EsQUFDQTtBQUhBO0FBSUE7O0FBQ0E7QUFDQSwwRUFDQTtxQkFDQSxBQUNBOzs0QkFDQTswQ0FDQTswQ0FDQSxBQUNBOztBQUNBOzJCQUNBO3dEQUNBLEFBQ0E7O0FBQ0E7NkJBQ0E7a0VBQ0E7b0RBQ0E7aURBQ0EsQUFDQTs7QUFDQTswQ0FDQTs2RkFDQSxBQUNBOzt3QkFDQSxBQUNBOztrREFDQTt3Q0FDQTtnREFDQTtBQUNBO2VBQ0E7eURBQ0E7QUFDQTtBQUNBOztBQUNBLDZDQUNBOytDQUNBO3NDQUNBO2VBQ0E7dURBQ0E7QUFDQTtBQUNBOztBQUNBLDJDQUNBO2tCQUNBO2tCQUNBO21DQUNBLEFBQ0E7OzBDQUNBOzhCQUNBO2lFQUNBO2tCQUNBO2lCQUNBO3lDQUNBO0FBQ0E7QUFDQSxBQUNBOztvQ0FDQTtBQUNBOztBQUNBLDRDQUNBO2tCQUNBO21DQUNBLEFBQ0E7OzBDQUNBO3lDQUNBO2dCQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7dUNBQ0E7QUFDQTs7QUFDQSwwQ0FDQTtzQkFDQSxBQUNBOzt5Q0FDQTtnREFDQSxBQUNBOztrQkFDQTswQ0FDQTsyQkFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSw4Q0FDQTtxQ0FDQTtrQkFDQTtrREFDQTsrREFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxxREFDQTt1QkFDQTtrQ0FDQTs4QkFDQSxBQUNBOztvQ0FDQTtzREFDQTtlQUNBOytCQUNBO3VEQUNBOzZDQUNBO2lDQUNBO0FBQ0E7aUJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsK0NBQ0E7b0JBQ0E7OEJBQ0E7QUFDQTs7QUFDQTtBQUNBLGtEQUNBO29CQUNBO2tDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7MERBQ0E7dUNBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztvQkFDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7WUFDQTswQkFDQTtvQkFDQTswREFDQTtlQUNBOytCQUNBO29EQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O1lBQ0E7MEJBQ0E7eURBQ0E7MERBQ0E7cUJBQ0E7dUVBQ0E7ZUFDQTt5REFDQTswREFDQTtvREFDQTs2Q0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsOERBQ0E7dUJBQ0E7MERBQ0E7dUNBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztpQ0FDQTt3RUFDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7eURBQ0E7d0JBQ0E7NERBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzt5REFDQTt3QkFDQTtnRUFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBDQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7MERBQ0E7dUNBQ0E7MkJBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOzt1QkFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7bUVBQ0E7OEdBQ0E7QUFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTsyQkFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O21FQUNBO3VFQUNBO0FBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0Esc0VBQ0E7dUJBQ0E7d0RBQ0E7MERBQ0E7dUNBQ0E7a0NBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztnSEFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO29DQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7a0pBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7d0NBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztzSkFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt1REFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7OzREQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3dEQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7NERBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0E7QUFDQSwyREFDQTs0QkFDQTs0QkFDQTs2QkFDQSxBQUNBOzt1Q0FDQTttQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBOzZCQUNBLEFBQ0E7O0FBQ0E7MkJBQ0E7K0JBQ0EsQUFDQTs7a0RBQ0E7K0NBQ0EsQUFDQTs7MENBQ0E7b0JBQ0E7QUFDQTtBQUNBOztBQUNBLDZDQUNBO2tCQUNBO3VCQUNBO3NDQUNBOzhCQUNBOytDQUNBO3lCQUNBO0FBQ0E7QUFDQTtBQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7QUFDQSxtREFDQTsrQ0FDQTtzQ0FDQTtvQ0FDQTtpQkFDQTswQ0FDQTsrREFDQTs0QkFDQTt3QkFDQTtBQUNBO2VBQ0E7MEJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSwrQkFDQTtpQ0FDQTt5Q0FDQTtBQUNBOztBQUNBLHNCQUNBOztBQUNBLEFBQ0EsQUFDQTs7O0FBQ0EsdUNBQ0E7d0JBQ0EsQUFDQTs7QUFDQTt1QkFDQTt1QkFDQSxBQUNBOztBQUNBO3FCQUNBO3FCQUNBLEFBQ0E7O3VCQUNBOzBCQUNBO2dDQUNBO3dCQUNBO3NCQUNBO3VCQUNBOzJCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzBCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzhCQUNBOzhCQUNBOzRCQUNBOytCQUNBOytCQUNBOytCQUNBOytCQUNBOzJCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOytCQUNBOytCQUNBO3NCQUNBO3lCQUNBOytCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQTtBQUNBOzhDQUVBO3dCQURBLENBRUE7aUNBQ0E7K0JBQ0E7aUJBQ0E7K0JBQ0E7ZUFDQTtBQUNBOztBQUNBLDhCQUNBO0FBQ0E7QUFDQTtBQUNBOzhCQUNBO2dDQUNBO0FBQ0E7O0FBQ0EsZ0NBQ0E7b0RBQ0E7NkRBQ0E7V0FDQTtBQUNBOztBQUNBLG1DQUNBO3NMQUNBO0FBQ0E7O0FBQ0Esd0JBQ0E7NENBQ0E7MEJBQ0E7QUFDQTs7QUFDQSxnQ0FDQTt3QkFDQTs2Q0FDQTtpQ0FDQTtnRUFDQTt3QkFDQTs0Q0FDQTtnRkFDQTsrQ0FDQTs0Q0FDQTtBQUNBO0FBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsaUNBQ0E7d0JBQ0E7NkNBQ0E7QUFDQTs2Q0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxtQ0FDQTttQkFDQTt3QkFDQTs2Q0FDQTs2QkFDQTtvQkFDQTttQkFDQTt5QkFDQTt5QkFDQTtBQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxrQ0FDQTtrQ0FDQTtBQUNBOztBQUNBLG9EQUNBO1lBQ0E7eUNBQ0E7MkRBQ0E7Z0NBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7WUFDQTtvQ0FDQTtzQkFDQTs4Q0FDQTtBQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7QUFDQSxxQ0FDQTswQ0FDQTsyQkFDQTs2QkFDQTs0Q0FDQTtBQUNBOztBQUNBLDBDQUNBOzBDQUNBOzZCQUNBOzZCQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7MENBQ0E7NkJBQ0E7NkJBQ0E7QUFDQTs7QUFDQSxxQ0FDQTs4Q0FDQTtBQUNBLEFBQ0E7OztBQ3poQ0E7QUFDQSxBQUNBOztBQUNBLG1FQUNBO2VBQ0E7dUNBQ0E7aUNBQ0E7NEJBQ0E7cUJBQ0E7b0NBQ0E7NEJBQ0E7Z0NBQ0EsQUFDQTs7YUFDQSxBQUNBOztnQ0FDQTtlQUNBO2lCQUNBO2lGQUNBLEFBQ0E7O2dDQUNBO2VBQ0E7aUJBQ0E7aUZBQ0EsQUFDQTs7cUJBQ0E7a0JBQ0E7K0JBQ0E7MENBQ0E7ZUFDQTs4QkFDQTtrQkFDQTtBQUNBO2tEQUNBO0FBQ0E7O0FBQ0EsMkVBQ0E7a0JBQ0E7dUNBQ0E7aUNBQ0E7NEJBQ0E7cUVBQ0E7b0NBQ0E7NEJBQ0E7Z0VBQ0EsQUFDQTs7eUJBQ0EsQUFDQTs7Z0RBQ0E7aUNBQ0E7Y0FDQTtlQUNBO2dEQUNBO2lEQUNBO0FBQ0E7aUJBQ0E7QUFDQTs4QkFDQTswQkFDQTtpQkFDQTswQ0FDQTtBQUNBOzhCQUNBO0FBQ0E7aUJBQ0E7QUFDQSxBQUNBOztpQ0FDQTtnQkFDQTtnQkFDQTtxQ0FDQTs4Q0FDQTtvQkFDQTtpQkFDQTs2REFDQTtnQkFDQTtBQUNBO0FBQ0EsQUFDQTs7dUZBQ0EsQUFDQTs7d0JBQ0E7Z0JBQ0E7c0ZBQ0EsQUFDQTs7c0NBQ0E7QUFDQSxBQUNBOzs7QUN4RkE7QUFDQSxBQUNBOztBQUNBLEFBQ0E7O0FBQ0EscUNBQ0E7O0FBQ0EscUNBQ0E7c0VBQ0E7b0ZBQ0EsQUFDQTs7NkJBQ0E7OEJBQ0E7dUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O3FCQUNBO3NCQUNBOzJEQUNBOzRCQUNBO3NGQUNBO2lCQUNBO29DQUNBOytCQUNBO0FBQ0E7QUFDQTtBQUNBO2FBQ0EsQUFDQTs7dUNBQ0E7dUJBQ0E7K0NBQ0E7QUFDQTtBQUNBLEFBQ0E7O3FDQUNBO3lCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFDQTs7QUFDQSx1QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFDQTs7QUFDQSx3Q0FDQTt3QkFDQTtBQUNBOztBQUNBO0FBQ0EsZ0NBQ0E7ZUFDQTs7QUFDQSxxQ0FDQTt3QkFDQTtBQUNBLEFBQ0E7OztBQ3BFQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxxQ0FDQTtnQ0FDQTtnQ0FDQTtBQUNBLEFBQ0E7OztlQUVBOzRDQUNBO2lCQUNBO2lCQUNBO2lCQUNBO2lCQUNBO2dDQUNBO2lDQUNBO0FBQ0E7QUFDQTtBQVZBO2VBWUE7d0NBQ0E7QUFDQTtnREFDQTs2Q0FDQTtzTEFDQTtrQ0FDQTtBQUNBO0FBUkE7ZUFVQTt1Q0FDQTtBQUNBO2tGQUNBOzhCQUNBO0FBQ0E7QUFDQTtBQVBBO2VBU0E7Z0RBQ0E7QUFDQTttRkFDQTtzRkFDQTt3QkFDQTtBQUNBO0FBUEE7ZUFTQTtpREFDQTtBQUNBOytEQUNBO0FBQ0E7QUFMQTtlQU9BOztBQUVBO3FDQUNBO2tDQUNBLEFBQ0E7OztBQUVBO29CQURBLGlHQUVBO3VDQUNBO3dGQUNBOztnREFFQTtrQ0FEQSxDQUVBO3FDQUNBOzBCQUNBO0FBQ0E7QUFDQTtrREFDQTt5QkFDQTtBQUNBO0FBQ0E7MENBQ0E7MEdBQ0EsQUFDQTs7d0NBQ0E7QUFDQTsyQkFDQTtBQUNBO3dDQUNBO0FBQ0E7QUFDQTtrQ0FDQTtvREFDQTsyQkFDQTtBQUNBO0FBQ0E7QUFDQTt1QkFDQTtBQUNBOytCQUNBOzRDQUNBLEFBQ0E7O3VCQUNBO0FBQ0E7a0NBQ0E7QUFDQTs2QkFDQTtrQ0FDQTsyQkFDQTtBQUNBO3lDQUNBLEFBQ0E7OzZCQW5EQSxDQW9EQTtBQUNBO0FBdkRBO2VBeURBO3FEQUNBO3dCQUNBLEFBQ0E7O0FBQ0E7d0ZBQ0E7aURBQ0E7QUFDQTsyRkFDQTtvREFDQTtBQUNBO3FGQUNBOzZDQUNBO0FBQ0E7a0ZBQ0E7c0NBQ0E7QUFDQTtBQUNBO0FBbEJBO2VBb0JBOztBQUVBO2lDQUNBO2tDQUNBOzhCQUNBOzRCQUNBO3NCQUNBOzZCQUNBOzZCQUNBO21CQUNBOzhCQUNBOzZCQUNBO0FBQ0E7cUVBQ0E7MkNBYkEsQ0FjQTtBQUNBO0FBakJBO2VBbUJBOztBQUVBO2lDQUNBO2tDQUNBOzZCQUNBOzRCQUNBO3NCQUNBOzZCQUNBOzZCQUNBO21CQUNBOzhCQUNBOzZCQUNBO0FBQ0E7cUVBQ0E7MkNBYkEsQ0FjQTtBQUNBO0FBakJBO2VBbUJBO3dDQUNBO0FBQ0E7MkJBQ0E7eUNBQ0E7OEJBQ0E7eURBQ0E7b0JBQ0E7NERBQ0E7cURBQ0E7NkNBQ0E7QUFDQTtBQVpBO2VBY0E7d0NBQ0E7QUFDQTsyQkFDQTs2Q0FDQTs2REFDQTtvREFDQTs4QkFDQTtxREFDQTtrREFDQTtBQUNBLEFBQ0EsQUFDQTtBQWJBOztlQWNBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDL01BO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSw0QkFDQTs7QUFDQSw0Q0FDQTs7QUFDQSw4QkFDQTs7QUFDQSw4Q0FDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLGtDQUNBOzZCQUNBO2dDQUNBO0FBQ0EsQUFDQTs7O2VBRUE7dUNBQ0E7QUFDQTs2Q0FDQTs0QkFDQTs2Q0FDQTtBQUNBO0FBUEE7ZUFTQTt1Q0FDQTtBQUNBO29GQUNBOzRCQUNBOzZCQUNBO3dDQUNBO2lEQUNBOzJEQUNBO21DQUNBO2dFQUNBO2tDQUNBO3VDQUNBO21DQUNBO3dFQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQXBCQTs7ZUFxQkE7QUFDQTs7QUFDQSxtQ0FDQSxBQUNBOzs7QUM1REE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsMkJBQ0E7c0JBQ0E7Z0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTtxREFDQTtBQUNBOzBDQUNBOzt3QkFFQTtxQkFDQSxBQUNBO0FBSEE7bUVBSUE7QUFDQTtBQVZBO2VBWUE7d0NBQ0E7bUVBQ0E7bUJBQ0E7QUFDQTtBQUxBO2VBT0E7MERBQ0E7QUFDQTt5REFDQTt5Q0FDQTtnREFDQTt1QkFDQTttQkFDQTs7dUJBRUE7c0JBQ0E7c0JBQ0E7MEJBQ0EsQUFDQTtBQUxBO2dEQU1BO3VCQUNBO0FBQ0E7cUZBQ0E7QUFDQTtBQW5CQTtlQXFCQTt5REFDQTtBQUNBO3lEQUNBOzhEQUNBO3dEQUNBO3FGQUNBO0FBQ0E7QUFSQTtlQVVBO3VDQUNBO0FBQ0E7eURBQ0E7NkNBQ0E7NENBQ0E7c0RBQ0E7Z0RBQ0E7K0JBQ0E7OENBQ0E7c0VBQ0E7dUJBQ0E7NERBQ0E7Z0NBQ0E7d0VBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQXRCQTs7ZUF1QkE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUMxRkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBLDhCQUNBOztBQUNBLDhDQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsK0JBQ0E7MEJBQ0E7Z0NBQ0EsQUFDQTs7bUNBQ0E7QUFDQSxBQUNBOzs7ZUFFQTttRUFDQTt3QkFDQSxBQUNBOzswREFDQTt5Q0FDQTs4RkFDQTtvREFDQTt1QkFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkE7ZUFlQTt3RUFDQTt5QkFDQSxBQUNBOzswREFDQTswQ0FDQTt5QkFDQTs2Q0FDQTtvREFDQTt1QkFDQTtxQkFDQTt1QkFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFqQkE7O2VBa0JBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDN0RBO0FBQ0EsQUFDQTs7QUFDQSw0QkFDQTs7QUFDQSw0Q0FDQTs7QUFDQSwyQkFDQTs7QUFDQSw4QkFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUNBLHFDQUNBLEFBQ0E7OztBQ2hCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEseUJBQ0E7O0FBQ0Esa0NBQ0E7O0FBQ0Esa0RBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO2NBRUE7b0NBQ0E7MEJBQ0E7QUFDQTtnREFDQTtBQUNBLEFBQ0E7OytEQUNBO0FBQ0E7b0NBQ0E7QUFDQTswQkFDQTt5QkFDQTswQkFDQTt5QkFDQTt5QkFDQTtnQ0FDQTtBQUNBO3VEQUNBO3NDQUNBO0FBQ0E7b0NBQ0E7QUFDQTt1REFDQTswQkFDQTtBQUNBLEFBQ0E7QUEzQkE7O0FBNEJBLHlCQUNBLEFBQ0E7OztBQy9DQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsc0JBQ0E7O0FBQ0EsK0JBQ0E7O0FBQ0EsK0NBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtjQUVBO2VBQ0E7Z0RBQ0E7NkJBQ0E7QUFDQTs7aURBRUE7NkJBREEsQ0FFQTs4QkFDQTtBQUNBO29DQUNBO3dEQUNBO0FBQ0EsQUFDQTtBQWRBOztBQWVBLHNCQUNBLEFBQ0E7OztBQ2pDQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsNENBQ0E7OEJBQ0E7YUFDQTtBQUNBOztBQUNBOzhCQUVBO3NCQUNBLEFBQ0E7OzhEQUNBO3VGQUNBO0FBQ0E7K0RBQ0E7QUFDQTs0REFDQTs0REFDQTt1QkFDQTtBQUNBOzBEQUNBO3VCQUNBLEFBQ0E7OzhEQUNBO2dEQUNBO3VDQUNBO3lEQUNBO2dDQUNBO3FEQUNBO3lDQUNBO0FBQ0E7QUFDQTtzQ0FDQTtpRUFDQTtrREFDQTt5Q0FDQTsyREFDQTtrQ0FDQTt1REFDQTsyQ0FDQTtBQUNBO0FBQ0E7QUFDQTtxREFDQTsrQ0FDQTtvR0FDQTs2Q0FDQTt1R0FDQTs4QkFDQTs0RkFDQTs4QkFDQTtpR0FDQTtBQUNBO0FBQ0EsQUFDQTtBQS9DQTs7QUFnREEsd0JBQ0EsQUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheTtcblxuXHR2YXIgUExVUyA9ICcrJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgU0xBU0ggPSAnLycuY2hhckNvZGVBdCgwKTtcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgTE9XRVIgPSAnYScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFVQUEVSID0gJ0EnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBTTEFTSF9VUkxfU0FGRSA9ICdfJy5jaGFyQ29kZUF0KDApO1xuXG5cdGZ1bmN0aW9uIGRlY29kZShlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApO1xuXHRcdGlmIChjb2RlID09PSBQTFVTIHx8IGNvZGUgPT09IFBMVVNfVVJMX1NBRkUpIHJldHVybiA2MjsgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIIHx8IGNvZGUgPT09IFNMQVNIX1VSTF9TQUZFKSByZXR1cm4gNjM7IC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKSByZXR1cm4gLTE7IC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKSByZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjY7XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KSByZXR1cm4gY29kZSAtIFVQUEVSO1xuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNikgcmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2O1xuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnI7XG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKTtcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGg7XG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwO1xuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpO1xuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoO1xuXG5cdFx0dmFyIEwgPSAwO1xuXG5cdFx0ZnVuY3Rpb24gcHVzaCh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHY7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSk7XG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpO1xuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KTtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQ7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTAgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDI7XG5cdFx0XHRwdXNoKHRtcCA+PiA4ICYgMHhGRik7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnI7XG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0KHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0ICAgIGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLFxuXHRcdCAgICAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0ICAgIHRlbXAsXG5cdFx0ICAgIGxlbmd0aDtcblxuXHRcdGZ1bmN0aW9uIGVuY29kZShudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0KG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpO1xuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArIHVpbnQ4W2kgKyAyXTtcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcCk7XG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV07XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wIDw8IDQgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgdWludDhbdWludDgubGVuZ3RoIC0gMV07XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMCk7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiA0ICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA8PCAyICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSAnPSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXk7XG5cdGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjQ7XG59KSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQuYmFzZTY0anMgPSB7fSA6IGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1JMk5DNXFjeUpkTENKdVlXMWxjeUk2V3lKc2IyOXJkWEFpTENKbGVIQnZjblJ6SWl3aVFYSnlJaXdpVldsdWREaEJjbkpoZVNJc0lrRnljbUY1SWl3aVVFeFZVeUlzSW1Ob1lYSkRiMlJsUVhRaUxDSlRURUZUU0NJc0lrNVZUVUpGVWlJc0lreFBWMFZTSWl3aVZWQlFSVklpTENKUVRGVlRYMVZTVEY5VFFVWkZJaXdpVTB4QlUwaGZWVkpNWDFOQlJrVWlMQ0prWldOdlpHVWlMQ0psYkhRaUxDSmpiMlJsSWl3aVlqWTBWRzlDZVhSbFFYSnlZWGtpTENKaU5qUWlMQ0pwSWl3aWFpSXNJbXdpTENKMGJYQWlMQ0p3YkdGalpVaHZiR1JsY25NaUxDSmhjbklpTENKc1pXNW5kR2dpTENKRmNuSnZjaUlzSW14bGJpSXNJbU5vWVhKQmRDSXNJa3dpTENKd2RYTm9JaXdpZGlJc0luVnBiblE0Vkc5Q1lYTmxOalFpTENKMWFXNTBPQ0lzSW1WNGRISmhRbmwwWlhNaUxDSnZkWFJ3ZFhRaUxDSjBaVzF3SWl3aVpXNWpiMlJsSWl3aWJuVnRJaXdpZEhKcGNHeGxkRlJ2UW1GelpUWTBJaXdpZEc5Q2VYUmxRWEp5WVhraUxDSm1jbTl0UW5sMFpVRnljbUY1SWl3aVltRnpaVFkwYW5NaVhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNTVUZCU1VFc1UwRkJVeXhyUlVGQllqczdRVUZGUVN4RFFVRkZMRmRCUVZWRExFOUJRVllzUlVGQmJVSTdRVUZEY0VJN08wRkJSVU1zUzBGQlNVTXNUVUZCVHl4UFFVRlBReXhWUVVGUUxFdEJRWE5DTEZkQlFYWkNMRWRCUTA1QkxGVkJSRTBzUjBGRlRrTXNTMEZHU2pzN1FVRkpSQ3hMUVVGSlF5eFBRVUZUTEVsQlFVbERMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUXl4UlFVRlRMRWxCUVVsRUxGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpSU3hUUVVGVExFbEJRVWxHTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlJ5eFJRVUZUTEVsQlFVbElMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKU1N4UlFVRlRMRWxCUVVsS0xGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpTeXhuUWtGQlowSXNTVUZCU1V3c1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQmNFSTdRVUZEUVN4TFFVRkpUU3hwUWtGQmFVSXNTVUZCU1U0c1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQmNrSTdPMEZCUlVFc1ZVRkJVMDhzVFVGQlZDeERRVUZwUWtNc1IwRkJha0lzUlVGQmMwSTdRVUZEY2tJc1RVRkJTVU1zVDBGQlQwUXNTVUZCU1ZJc1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQldEdEJRVU5CTEUxQlFVbFRMRk5CUVZOV0xFbEJRVlFzU1VGRFFWVXNVMEZCVTBvc1lVRkVZaXhGUVVWRExFOUJRVThzUlVGQlVDeERRVXB2UWl4RFFVbFdPMEZCUTFnc1RVRkJTVWtzVTBGQlUxSXNTMEZCVkN4SlFVTkJVU3hUUVVGVFNDeGpRVVJpTEVWQlJVTXNUMEZCVHl4RlFVRlFMRU5CVUc5Q0xFTkJUMVk3UVVGRFdDeE5RVUZKUnl4UFFVRlBVQ3hOUVVGWUxFVkJRME1zVDBGQlR5eERRVUZETEVOQlFWSXNRMEZVYjBJc1EwRlRWanRCUVVOWUxFMUJRVWxQTEU5QlFVOVFMRk5CUVZNc1JVRkJjRUlzUlVGRFF5eFBRVUZQVHl4UFFVRlBVQ3hOUVVGUUxFZEJRV2RDTEVWQlFXaENMRWRCUVhGQ0xFVkJRVFZDTzBGQlEwUXNUVUZCU1U4c1QwRkJUMHdzVVVGQlVTeEZRVUZ1UWl4RlFVTkRMRTlCUVU5TExFOUJRVTlNTEV0QlFXUTdRVUZEUkN4TlFVRkpTeXhQUVVGUFRpeFJRVUZSTEVWQlFXNUNMRVZCUTBNc1QwRkJUMDBzVDBGQlQwNHNTMEZCVUN4SFFVRmxMRVZCUVhSQ08wRkJRMFE3TzBGQlJVUXNWVUZCVTA4c1kwRkJWQ3hEUVVGNVFrTXNSMEZCZWtJc1JVRkJPRUk3UVVGRE4wSXNUVUZCU1VNc1EwRkJTaXhGUVVGUFF5eERRVUZRTEVWQlFWVkRMRU5CUVZZc1JVRkJZVU1zUjBGQllpeEZRVUZyUWtNc1dVRkJiRUlzUlVGQlowTkRMRWRCUVdoRE96dEJRVVZCTEUxQlFVbE9MRWxCUVVsUExFMUJRVW9zUjBGQllTeERRVUZpTEVkQlFXbENMRU5CUVhKQ0xFVkJRWGRDTzBGQlEzWkNMRk5CUVUwc1NVRkJTVU1zUzBGQlNpeERRVUZWTEdkRVFVRldMRU5CUVU0N1FVRkRRVHM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTVU1zVFVGQlRWUXNTVUZCU1U4c1RVRkJaRHRCUVVOQlJpeHBRa0ZCWlN4UlFVRlJUQ3hKUVVGSlZTeE5RVUZLTEVOQlFWZEVMRTFCUVUwc1EwRkJha0lzUTBGQlVpeEhRVUU0UWl4RFFVRTVRaXhIUVVGclF5eFJRVUZSVkN4SlFVRkpWU3hOUVVGS0xFTkJRVmRFTEUxQlFVMHNRMEZCYWtJc1EwRkJVaXhIUVVFNFFpeERRVUU1UWl4SFFVRnJReXhEUVVGdVJqczdRVUZGUVR0QlFVTkJTQ3hSUVVGTkxFbEJRVWx5UWl4SFFVRktMRU5CUVZGbExFbEJRVWxQTEUxQlFVb3NSMEZCWVN4RFFVRmlMRWRCUVdsQ0xFTkJRV3BDTEVkQlFYRkNSaXhaUVVFM1FpeERRVUZPT3p0QlFVVkJPMEZCUTBGR0xFMUJRVWxGTEdWQlFXVXNRMEZCWml4SFFVRnRRa3dzU1VGQlNVOHNUVUZCU2l4SFFVRmhMRU5CUVdoRExFZEJRVzlEVUN4SlFVRkpUeXhOUVVFMVF6czdRVUZGUVN4TlFVRkpTU3hKUVVGSkxFTkJRVkk3TzBGQlJVRXNWMEZCVTBNc1NVRkJWQ3hEUVVGbFF5eERRVUZtTEVWQlFXdENPMEZCUTJwQ1VDeFBRVUZKU3l4SFFVRktMRWxCUVZkRkxFTkJRVmc3UVVGRFFUczdRVUZGUkN4UFFVRkxXaXhKUVVGSkxFTkJRVW9zUlVGQlQwTXNTVUZCU1N4RFFVRm9RaXhGUVVGdFFrUXNTVUZCU1VVc1EwRkJka0lzUlVGQk1FSkdMRXRCUVVzc1EwRkJUQ3hGUVVGUlF5eExRVUZMTEVOQlFYWkRMRVZCUVRCRE8wRkJRM3BEUlN4VFFVRlBVaXhQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFTkJRVmdzUTBGQlVDeExRVUY1UWl4RlFVRXhRaXhIUVVGcFEwd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hMUVVFMlFpeEZRVUU1UkN4SFFVRnhSVXdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4TFFVRTJRaXhEUVVGc1J5eEhRVUYxUjB3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeERRVUUzUnp0QlFVTkJWeXhSUVVGTExFTkJRVU5TTEUxQlFVMHNVVUZCVUN4TFFVRnZRaXhGUVVGNlFqdEJRVU5CVVN4UlFVRkxMRU5CUVVOU0xFMUJRVTBzVFVGQlVDeExRVUZyUWl4RFFVRjJRanRCUVVOQlVTeFJRVUZMVWl4TlFVRk5MRWxCUVZnN1FVRkRRVHM3UVVGRlJDeE5RVUZKUXl4cFFrRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkRka0pFTEZOQlFVOVNMRTlCUVU5SkxFbEJRVWxWTEUxQlFVb3NRMEZCVjFRc1EwRkJXQ3hEUVVGUUxFdEJRWGxDTEVOQlFURkNMRWRCUVdkRFRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRVzVGTzBGQlEwRlhMRkZCUVV0U0xFMUJRVTBzU1VGQldEdEJRVU5CTEVkQlNFUXNUVUZIVHl4SlFVRkpReXhwUWtGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRE9VSkVMRk5CUVU5U0xFOUJRVTlKTEVsQlFVbFZMRTFCUVVvc1EwRkJWMVFzUTBGQldDeERRVUZRTEV0QlFYbENMRVZCUVRGQ0xFZEJRV2xEVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFUbEVMRWRCUVc5RlRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRWFpITzBGQlEwRlhMRkZCUVUxU0xFOUJRVThzUTBGQlVpeEhRVUZoTEVsQlFXeENPMEZCUTBGUkxGRkJRVXRTTEUxQlFVMHNTVUZCV0R0QlFVTkJPenRCUVVWRUxGTkJRVTlGTEVkQlFWQTdRVUZEUVRzN1FVRkZSQ3hWUVVGVFVTeGhRVUZVTEVOQlFYZENReXhMUVVGNFFpeEZRVUVyUWp0QlFVTTVRaXhOUVVGSlpDeERRVUZLTzBGQlFVRXNUVUZEUTJVc1lVRkJZVVFzVFVGQlRWSXNUVUZCVGl4SFFVRmxMRU5CUkRkQ08wRkJRVUVzVFVGRFowTTdRVUZETDBKVkxGZEJRVk1zUlVGR1ZqdEJRVUZCTEUxQlIwTkRMRWxCU0VRN1FVRkJRU3hOUVVkUFdDeE5RVWhRT3p0QlFVdEJMRmRCUVZOWkxFMUJRVlFzUTBGQmFVSkRMRWRCUVdwQ0xFVkJRWE5DTzBGQlEzSkNMRlZCUVU5eVF5eFBRVUZQTWtJc1RVRkJVQ3hEUVVGalZTeEhRVUZrTEVOQlFWQTdRVUZEUVRzN1FVRkZSQ3hYUVVGVFF5eGxRVUZVTEVOQlFUQkNSQ3hIUVVFeFFpeEZRVUVyUWp0QlFVTTVRaXhWUVVGUFJDeFBRVUZQUXl4UFFVRlBMRVZCUVZBc1IwRkJXU3hKUVVGdVFpeEpRVUV5UWtRc1QwRkJUME1zVDBGQlR5eEZRVUZRTEVkQlFWa3NTVUZCYmtJc1EwRkJNMElzUjBGQmMwUkVMRTlCUVU5RExFOUJRVThzUTBGQlVDeEhRVUZYTEVsQlFXeENMRU5CUVhSRUxFZEJRV2RHUkN4UFFVRlBReXhOUVVGTkxFbEJRV0lzUTBGQmRrWTdRVUZEUVRzN1FVRkZSRHRCUVVOQkxFOUJRVXR1UWl4SlFVRkpMRU5CUVVvc1JVRkJUMDBzVTBGQlUxRXNUVUZCVFZJc1RVRkJUaXhIUVVGbFV5eFZRVUZ3UXl4RlFVRm5SR1lzU1VGQlNVMHNUVUZCY0VRc1JVRkJORVJPTEV0QlFVc3NRMEZCYWtVc1JVRkJiMFU3UVVGRGJrVnBRaXhWUVVGUExFTkJRVU5JTEUxQlFVMWtMRU5CUVU0c1MwRkJXU3hGUVVGaUxFdEJRVzlDWXl4TlFVRk5aQ3hKUVVGSkxFTkJRVllzUzBGQlowSXNRMEZCY0VNc1NVRkJNRU5qTEUxQlFVMWtMRWxCUVVrc1EwRkJWaXhEUVVGcVJEdEJRVU5CWjBJc1lVRkJWVWtzWjBKQlFXZENTQ3hKUVVGb1FpeERRVUZXTzBGQlEwRTdPMEZCUlVRN1FVRkRRU3hWUVVGUlJpeFZRVUZTTzBGQlEwTXNVVUZCU3l4RFFVRk1PMEZCUTBORkxGZEJRVTlJTEUxQlFVMUJMRTFCUVUxU0xFMUJRVTRzUjBGQlpTeERRVUZ5UWl4RFFVRlFPMEZCUTBGVkxHTkJRVlZGTEU5QlFVOUVMRkZCUVZFc1EwRkJaaXhEUVVGV08wRkJRMEZFTEdOQlFWVkZMRTlCUVZGRUxGRkJRVkVzUTBGQlZDeEhRVUZqTEVsQlFYSkNMRU5CUVZZN1FVRkRRVVFzWTBGQlZTeEpRVUZXTzBGQlEwRTdRVUZEUkN4UlFVRkxMRU5CUVV3N1FVRkRRME1zVjBGQlR5eERRVUZEU0N4TlFVRk5RU3hOUVVGTlVpeE5RVUZPTEVkQlFXVXNRMEZCY2tJc1MwRkJNa0lzUTBGQk5VSXNTVUZCYTBOUkxFMUJRVTFCTEUxQlFVMVNMRTFCUVU0c1IwRkJaU3hEUVVGeVFpeERRVUY2UXp0QlFVTkJWU3hqUVVGVlJTeFBRVUZQUkN4UlFVRlJMRVZCUVdZc1EwRkJWanRCUVVOQlJDeGpRVUZWUlN4UFFVRlJSQ3hSUVVGUkxFTkJRVlFzUjBGQll5eEpRVUZ5UWl4RFFVRldPMEZCUTBGRUxHTkJRVlZGTEU5QlFWRkVMRkZCUVZFc1EwRkJWQ3hIUVVGakxFbEJRWEpDTEVOQlFWWTdRVUZEUVVRc1kwRkJWU3hIUVVGV08wRkJRMEU3UVVGaVJqczdRVUZuUWtFc1UwRkJUMEVzVFVGQlVEdEJRVU5CT3p0QlFVVkVha01zVTBGQlVYTkRMRmRCUVZJc1IwRkJjMEoyUWl4alFVRjBRanRCUVVOQlppeFRRVUZSZFVNc1lVRkJVaXhIUVVGM1FsUXNZVUZCZUVJN1FVRkRRU3hEUVhwSVF5eEZRWGxJUVN4UFFVRlBPVUlzVDBGQlVDeExRVUZ0UWl4WFFVRnVRaXhIUVVGclF5eFZRVUZMZDBNc1VVRkJUQ3hIUVVGblFpeEZRVUZzUkN4SFFVRjNSSGhETEU5QmVraDRSQ3hEUVVGRUlpd2labWxzWlNJNkltSTJOQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkluWmhjaUJzYjI5cmRYQWdQU0FuUVVKRFJFVkdSMGhKU2t0TVRVNVBVRkZTVTFSVlZsZFlXVnBoWW1Oa1pXWm5hR2xxYTJ4dGJtOXdjWEp6ZEhWMmQzaDVlakF4TWpNME5UWTNPRGtyTHljN1hHNWNianNvWm5WdVkzUnBiMjRnS0dWNGNHOXlkSE1wSUh0Y2JseDBKM1Z6WlNCemRISnBZM1FuTzF4dVhHNGdJSFpoY2lCQmNuSWdQU0FvZEhsd1pXOW1JRlZwYm5RNFFYSnlZWGtnSVQwOUlDZDFibVJsWm1sdVpXUW5LVnh1SUNBZ0lEOGdWV2x1ZERoQmNuSmhlVnh1SUNBZ0lEb2dRWEp5WVhsY2JseHVYSFIyWVhJZ1VFeFZVeUFnSUQwZ0p5c25MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZOTVFWTklJQ0E5SUNjdkp5NWphR0Z5UTI5a1pVRjBLREFwWEc1Y2RIWmhjaUJPVlUxQ1JWSWdQU0FuTUNjdVkyaGhja052WkdWQmRDZ3dLVnh1WEhSMllYSWdURTlYUlZJZ0lEMGdKMkVuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGVlFVRVZTSUNBOUlDZEJKeTVqYUdGeVEyOWtaVUYwS0RBcFhHNWNkSFpoY2lCUVRGVlRYMVZTVEY5VFFVWkZJRDBnSnkwbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRk5NUVZOSVgxVlNURjlUUVVaRklEMGdKMThuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHh1WEhSbWRXNWpkR2x2YmlCa1pXTnZaR1VnS0dWc2RDa2dlMXh1WEhSY2RIWmhjaUJqYjJSbElEMGdaV3gwTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwWEhScFppQW9ZMjlrWlNBOVBUMGdVRXhWVXlCOGZGeHVYSFJjZENBZ0lDQmpiMlJsSUQwOVBTQlFURlZUWDFWU1RGOVRRVVpGS1Z4dVhIUmNkRngwY21WMGRYSnVJRFl5SUM4dklDY3JKMXh1WEhSY2RHbG1JQ2hqYjJSbElEMDlQU0JUVEVGVFNDQjhmRnh1WEhSY2RDQWdJQ0JqYjJSbElEMDlQU0JUVEVGVFNGOVZVa3hmVTBGR1JTbGNibHgwWEhSY2RISmxkSFZ5YmlBMk15QXZMeUFuTHlkY2JseDBYSFJwWmlBb1kyOWtaU0E4SUU1VlRVSkZVaWxjYmx4MFhIUmNkSEpsZEhWeWJpQXRNU0F2TDI1dklHMWhkR05vWEc1Y2RGeDBhV1lnS0dOdlpHVWdQQ0JPVlUxQ1JWSWdLeUF4TUNsY2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbElDMGdUbFZOUWtWU0lDc2dNallnS3lBeU5seHVYSFJjZEdsbUlDaGpiMlJsSUR3Z1ZWQlFSVklnS3lBeU5pbGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxJQzBnVlZCUVJWSmNibHgwWEhScFppQW9ZMjlrWlNBOElFeFBWMFZTSUNzZ01qWXBYRzVjZEZ4MFhIUnlaWFIxY200Z1kyOWtaU0F0SUV4UFYwVlNJQ3NnTWpaY2JseDBmVnh1WEc1Y2RHWjFibU4wYVc5dUlHSTJORlJ2UW5sMFpVRnljbUY1SUNoaU5qUXBJSHRjYmx4MFhIUjJZWElnYVN3Z2Fpd2diQ3dnZEcxd0xDQndiR0ZqWlVodmJHUmxjbk1zSUdGeWNseHVYRzVjZEZ4MGFXWWdLR0kyTkM1c1pXNW5kR2dnSlNBMElENGdNQ2tnZTF4dVhIUmNkRngwZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RKYm5aaGJHbGtJSE4wY21sdVp5NGdUR1Z1WjNSb0lHMTFjM1FnWW1VZ1lTQnRkV3gwYVhCc1pTQnZaaUEwSnlsY2JseDBYSFI5WEc1Y2JseDBYSFF2THlCMGFHVWdiblZ0WW1WeUlHOW1JR1Z4ZFdGc0lITnBaMjV6SUNod2JHRmpaU0JvYjJ4a1pYSnpLVnh1WEhSY2RDOHZJR2xtSUhSb1pYSmxJR0Z5WlNCMGQyOGdjR3hoWTJWb2IyeGtaWEp6TENCMGFHRnVJSFJvWlNCMGQyOGdZMmhoY21GamRHVnljeUJpWldadmNtVWdhWFJjYmx4MFhIUXZMeUJ5WlhCeVpYTmxiblFnYjI1bElHSjVkR1ZjYmx4MFhIUXZMeUJwWmlCMGFHVnlaU0JwY3lCdmJteDVJRzl1WlN3Z2RHaGxiaUIwYUdVZ2RHaHlaV1VnWTJoaGNtRmpkR1Z5Y3lCaVpXWnZjbVVnYVhRZ2NtVndjbVZ6Wlc1MElESWdZbmwwWlhOY2JseDBYSFF2THlCMGFHbHpJR2x6SUdwMWMzUWdZU0JqYUdWaGNDQm9ZV05ySUhSdklHNXZkQ0JrYnlCcGJtUmxlRTltSUhSM2FXTmxYRzVjZEZ4MGRtRnlJR3hsYmlBOUlHSTJOQzVzWlc1bmRHaGNibHgwWEhSd2JHRmpaVWh2YkdSbGNuTWdQU0FuUFNjZ1BUMDlJR0kyTkM1amFHRnlRWFFvYkdWdUlDMGdNaWtnUHlBeUlEb2dKejBuSUQwOVBTQmlOalF1WTJoaGNrRjBLR3hsYmlBdElERXBJRDhnTVNBNklEQmNibHh1WEhSY2RDOHZJR0poYzJVMk5DQnBjeUEwTHpNZ0t5QjFjQ0IwYnlCMGQyOGdZMmhoY21GamRHVnljeUJ2WmlCMGFHVWdiM0pwWjJsdVlXd2daR0YwWVZ4dVhIUmNkR0Z5Y2lBOUlHNWxkeUJCY25Jb1lqWTBMbXhsYm1kMGFDQXFJRE1nTHlBMElDMGdjR3hoWTJWSWIyeGtaWEp6S1Z4dVhHNWNkRngwTHk4Z2FXWWdkR2hsY21VZ1lYSmxJSEJzWVdObGFHOXNaR1Z5Y3l3Z2IyNXNlU0JuWlhRZ2RYQWdkRzhnZEdobElHeGhjM1FnWTI5dGNHeGxkR1VnTkNCamFHRnljMXh1WEhSY2RHd2dQU0J3YkdGalpVaHZiR1JsY25NZ1BpQXdJRDhnWWpZMExteGxibWQwYUNBdElEUWdPaUJpTmpRdWJHVnVaM1JvWEc1Y2JseDBYSFIyWVhJZ1RDQTlJREJjYmx4dVhIUmNkR1oxYm1OMGFXOXVJSEIxYzJnZ0tIWXBJSHRjYmx4MFhIUmNkR0Z5Y2x0TUt5dGRJRDBnZGx4dVhIUmNkSDFjYmx4dVhIUmNkR1p2Y2lBb2FTQTlJREFzSUdvZ1BTQXdPeUJwSUR3Z2JEc2dhU0FyUFNBMExDQnFJQ3M5SURNcElIdGNibHgwWEhSY2RIUnRjQ0E5SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocEtTa2dQRHdnTVRncElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeEtTa2dQRHdnTVRJcElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeUtTa2dQRHdnTmlrZ2ZDQmtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBJQ3NnTXlrcFhHNWNkRngwWEhSd2RYTm9LQ2gwYlhBZ0ppQXdlRVpHTURBd01Da2dQajRnTVRZcFhHNWNkRngwWEhSd2RYTm9LQ2gwYlhBZ0ppQXdlRVpHTURBcElENCtJRGdwWEc1Y2RGeDBYSFJ3ZFhOb0tIUnRjQ0FtSURCNFJrWXBYRzVjZEZ4MGZWeHVYRzVjZEZ4MGFXWWdLSEJzWVdObFNHOXNaR1Z5Y3lBOVBUMGdNaWtnZTF4dVhIUmNkRngwZEcxd0lEMGdLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2twS1NBOFBDQXlLU0I4SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocElDc2dNU2twSUQ0K0lEUXBYRzVjZEZ4MFhIUndkWE5vS0hSdGNDQW1JREI0UmtZcFhHNWNkRngwZlNCbGJITmxJR2xtSUNod2JHRmpaVWh2YkdSbGNuTWdQVDA5SURFcElIdGNibHgwWEhSY2RIUnRjQ0E5SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocEtTa2dQRHdnTVRBcElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeEtTa2dQRHdnTkNrZ2ZDQW9aR1ZqYjJSbEtHSTJOQzVqYUdGeVFYUW9hU0FySURJcEtTQStQaUF5S1Z4dVhIUmNkRngwY0hWemFDZ29kRzF3SUQ0K0lEZ3BJQ1lnTUhoR1JpbGNibHgwWEhSY2RIQjFjMmdvZEcxd0lDWWdNSGhHUmlsY2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdZWEp5WEc1Y2RIMWNibHh1WEhSbWRXNWpkR2x2YmlCMWFXNTBPRlJ2UW1GelpUWTBJQ2gxYVc1ME9Da2dlMXh1WEhSY2RIWmhjaUJwTEZ4dVhIUmNkRngwWlhoMGNtRkNlWFJsY3lBOUlIVnBiblE0TG14bGJtZDBhQ0FsSURNc0lDOHZJR2xtSUhkbElHaGhkbVVnTVNCaWVYUmxJR3hsWm5Rc0lIQmhaQ0F5SUdKNWRHVnpYRzVjZEZ4MFhIUnZkWFJ3ZFhRZ1BTQmNJbHdpTEZ4dVhIUmNkRngwZEdWdGNDd2diR1Z1WjNSb1hHNWNibHgwWEhSbWRXNWpkR2x2YmlCbGJtTnZaR1VnS0c1MWJTa2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlHeHZiMnQxY0M1amFHRnlRWFFvYm5WdEtWeHVYSFJjZEgxY2JseHVYSFJjZEdaMWJtTjBhVzl1SUhSeWFYQnNaWFJVYjBKaGMyVTJOQ0FvYm5WdEtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z1pXNWpiMlJsS0c1MWJTQStQaUF4T0NBbUlEQjRNMFlwSUNzZ1pXNWpiMlJsS0c1MWJTQStQaUF4TWlBbUlEQjRNMFlwSUNzZ1pXNWpiMlJsS0c1MWJTQStQaUEySUNZZ01IZ3pSaWtnS3lCbGJtTnZaR1VvYm5WdElDWWdNSGd6UmlsY2JseDBYSFI5WEc1Y2JseDBYSFF2THlCbmJ5QjBhSEp2ZFdkb0lIUm9aU0JoY25KaGVTQmxkbVZ5ZVNCMGFISmxaU0JpZVhSbGN5d2dkMlVuYkd3Z1pHVmhiQ0IzYVhSb0lIUnlZV2xzYVc1bklITjBkV1ptSUd4aGRHVnlYRzVjZEZ4MFptOXlJQ2hwSUQwZ01Dd2diR1Z1WjNSb0lEMGdkV2x1ZERndWJHVnVaM1JvSUMwZ1pYaDBjbUZDZVhSbGN6c2dhU0E4SUd4bGJtZDBhRHNnYVNBclBTQXpLU0I3WEc1Y2RGeDBYSFIwWlcxd0lEMGdLSFZwYm5RNFcybGRJRHc4SURFMktTQXJJQ2gxYVc1ME9GdHBJQ3NnTVYwZ1BEd2dPQ2tnS3lBb2RXbHVkRGhiYVNBcklESmRLVnh1WEhSY2RGeDBiM1YwY0hWMElDczlJSFJ5YVhCc1pYUlViMEpoYzJVMk5DaDBaVzF3S1Z4dVhIUmNkSDFjYmx4dVhIUmNkQzh2SUhCaFpDQjBhR1VnWlc1a0lIZHBkR2dnZW1WeWIzTXNJR0oxZENCdFlXdGxJSE4xY21VZ2RHOGdibTkwSUdadmNtZGxkQ0IwYUdVZ1pYaDBjbUVnWW5sMFpYTmNibHgwWEhSemQybDBZMmdnS0dWNGRISmhRbmwwWlhNcElIdGNibHgwWEhSY2RHTmhjMlVnTVRwY2JseDBYSFJjZEZ4MGRHVnRjQ0E5SUhWcGJuUTRXM1ZwYm5RNExteGxibWQwYUNBdElERmRYRzVjZEZ4MFhIUmNkRzkxZEhCMWRDQXJQU0JsYm1OdlpHVW9kR1Z0Y0NBK1BpQXlLVnh1WEhSY2RGeDBYSFJ2ZFhSd2RYUWdLejBnWlc1amIyUmxLQ2gwWlcxd0lEdzhJRFFwSUNZZ01IZ3pSaWxjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUNjOVBTZGNibHgwWEhSY2RGeDBZbkpsWVd0Y2JseDBYSFJjZEdOaGMyVWdNanBjYmx4MFhIUmNkRngwZEdWdGNDQTlJQ2gxYVc1ME9GdDFhVzUwT0M1c1pXNW5kR2dnTFNBeVhTQThQQ0E0S1NBcklDaDFhVzUwT0Z0MWFXNTBPQzVzWlc1bmRHZ2dMU0F4WFNsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlHVnVZMjlrWlNoMFpXMXdJRDQrSURFd0tWeHVYSFJjZEZ4MFhIUnZkWFJ3ZFhRZ0t6MGdaVzVqYjJSbEtDaDBaVzF3SUQ0K0lEUXBJQ1lnTUhnelJpbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJR1Z1WTI5a1pTZ29kR1Z0Y0NBOFBDQXlLU0FtSURCNE0wWXBYRzVjZEZ4MFhIUmNkRzkxZEhCMWRDQXJQU0FuUFNkY2JseDBYSFJjZEZ4MFluSmxZV3RjYmx4MFhIUjlYRzVjYmx4MFhIUnlaWFIxY200Z2IzVjBjSFYwWEc1Y2RIMWNibHh1WEhSbGVIQnZjblJ6TG5SdlFubDBaVUZ5Y21GNUlEMGdZalkwVkc5Q2VYUmxRWEp5WVhsY2JseDBaWGh3YjNKMGN5NW1jbTl0UW5sMFpVRnljbUY1SUQwZ2RXbHVkRGhVYjBKaGMyVTJORnh1ZlNoMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0ozVnVaR1ZtYVc1bFpDY2dQeUFvZEdocGN5NWlZWE5sTmpScWN5QTlJSHQ5S1NBNklHVjRjRzl5ZEhNcEtWeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXFxcXGI2NC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpO1xudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0Jyk7XG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyO1xuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyO1xuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwO1xuQnVmZmVyLnBvb2xTaXplID0gODE5MjtcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiA0MjtcbiAgICB9O1xuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbic7IC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KCk7XG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybyk7XG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc3ViamVjdCk7XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KTtcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9JztcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aDtcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdCk7ZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKTtlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JykgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKTsgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJyk7XG5cbiAgdmFyIGJ1ZjtcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpcztcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoO1xuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KTtcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKSBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKTtlbHNlIGJ1ZltpXSA9IHN1YmplY3RbaV07XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKTtcbn07XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldDtcbiAgc3RyID0gc3RyICsgJyc7XG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICsgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpO1xuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApO1xuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF07XG4gIH1cblxuICB2YXIgaTtcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIHBvcyA9IDA7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIGl0ZW0uY29weShidWYsIHBvcyk7XG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoO1xuICB9XG4gIHJldHVybiBidWY7XG59O1xuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwO1xuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoO1xuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpO1xuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMjtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpO1xuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKTtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlO1xuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDI7XG4gIHJldHVybiBpO1xufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoO1xuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gb2Zmc2V0O1xuICAgIG9mZnNldCA9IGxlbmd0aDtcbiAgICBsZW5ndGggPSBzd2FwO1xuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMDtcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0O1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKTtcblxuICB2YXIgcmV0O1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKTtcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDA7XG4gIGVuZCA9IGVuZCAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKGVuZCkgOiBlbmQgPSBzZWxmLmxlbmd0aDtcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gJyc7XG5cbiAgdmFyIHJldDtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfTtcbn07XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpcztcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwO1xuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuO1xuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKTtcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKTtcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KSBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnQ7XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgdG1wID0gJyc7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZCk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pO1xuICAgICAgdG1wID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApO1xufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnO1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgfXJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCk7XG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlbjtcblxuICB2YXIgb3V0ID0gJyc7XG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSk7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB2YXIgcmVzID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1Nik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKTtcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbik7XG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0O1xuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmO1xuICB9XG59O1xuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKTtcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldCk7XG59O1xuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKTtcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICByZXR1cm4gdGhpc1tvZmZzZXRdO1xufTtcblxuZnVuY3Rpb24gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWw7XG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XTtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4O1xuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDg7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV07XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbDtcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKSB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTY7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgODtcbiAgICB2YWwgfD0gYnVmW29mZnNldF07XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApO1xuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTY7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgODtcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXTtcbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHRoaXNbb2Zmc2V0XTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKTtcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKTtcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTE7ZWxzZSByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRGbG9hdChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZERvdWJsZShidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZik7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAweGZmIDw8IDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogODtcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDggJiAweGZmO1xuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpO2Vsc2UgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtlbHNlIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtlbHNlIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwO1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aDtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKTtcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0Jyk7XG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm47XG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlO1xuICB9XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSk7XG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPic7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodGhpcykuYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICBidWZbaV0gPSB0aGlzW2ldO1xuICAgICAgfXJldHVybiBidWYuYnVmZmVyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJyk7XG4gIH1cbn07XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbShzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGU7XG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlO1xuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXQ7XG4gIGFyci5fc2V0ID0gYXJyLnNldDtcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0O1xuICBhcnIuc2V0ID0gQlAuc2V0O1xuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlO1xuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZztcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmc7XG4gIGFyci50b0pTT04gPSBCUC50b0pTT047XG4gIGFyci5jb3B5ID0gQlAuY29weTtcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2U7XG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDg7XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEU7XG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkU7XG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEU7XG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkU7XG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4O1xuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRTtcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkU7XG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFO1xuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRTtcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEU7XG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFO1xuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFO1xuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFO1xuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDg7XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRTtcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFO1xuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEU7XG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRTtcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50ODtcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRTtcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRTtcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRTtcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRTtcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRTtcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRTtcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFO1xuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkU7XG4gIGFyci5maWxsID0gQlAuZmlsbDtcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0O1xuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXI7XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gIGluZGV4ID0gfn5pbmRleDsgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW47XG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXg7XG4gIGluZGV4ICs9IGxlbjtcbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleDtcbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGNvZXJjZShsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKTtcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfSkoc3ViamVjdCk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2goc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHwgc3ViamVjdCAmJiAodHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1YmplY3QpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gdG9IZXgobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNik7XG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChiIDw9IDB4N0YpIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGk7XG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrKztcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSArIDEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKykge1xuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICB9XG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzKHN0cikge1xuICB2YXIgYywgaGksIGxvO1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhpID0gYyA+PiA4O1xuICAgIGxvID0gYyAlIDI1NjtcbiAgICBieXRlQXJyYXkucHVzaChsbyk7XG4gICAgYnl0ZUFycmF5LnB1c2goaGkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyhzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpO1xufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCB8fCBpID49IHNyYy5sZW5ndGgpIGJyZWFrO1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXTtcbiAgfVxuICByZXR1cm4gaTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpOyAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50KHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKTtcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jyk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jyk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0KHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltSmhjMlUyTkNJc0luSmxjWFZwY21VaUxDSnBaV1ZsTnpVMElpd2laWGh3YjNKMGN5SXNJa0oxWm1abGNpSXNJbE5zYjNkQ2RXWm1aWElpTENKSlRsTlFSVU5VWDAxQldGOUNXVlJGVXlJc0luQnZiMnhUYVhwbElpd2lYM1Z6WlZSNWNHVmtRWEp5WVhseklpd2lZblZtSWl3aVFYSnlZWGxDZFdabVpYSWlMQ0poY25JaUxDSlZhVzUwT0VGeWNtRjVJaXdpWm05dklpd2ljM1ZpWVhKeVlYa2lMQ0psSWl3aWMzVmlhbVZqZENJc0ltVnVZMjlrYVc1bklpd2libTlhWlhKdklpd2lkSGx3WlNJc0luTjBjbWx1WjNSeWFXMGlMQ0pzWlc1bmRHZ2lMQ0pqYjJWeVkyVWlMQ0ppZVhSbFRHVnVaM1JvSWl3aVJYSnliM0lpTENKZllYVm5iV1Z1ZENJc0lsOXBjMEoxWm1abGNpSXNJbWtpTENKZmMyVjBJaXdpYVhOQmNuSmhlV2x6YUNJc0ltbHpRblZtWm1WeUlpd2ljbVZoWkZWSmJuUTRJaXdpZDNKcGRHVWlMQ0pwYzBWdVkyOWthVzVuSWl3aVUzUnlhVzVuSWl3aWRHOU1iM2RsY2tOaGMyVWlMQ0ppSWl3aWRXNWtaV1pwYm1Wa0lpd2ljM1J5SWl3aWNtVjBJaXdpZFhSbU9GUnZRbmwwWlhNaUxDSmlZWE5sTmpSVWIwSjVkR1Z6SWl3aVkyOXVZMkYwSWl3aWJHbHpkQ0lzSW5SdmRHRnNUR1Z1WjNSb0lpd2lZWE56WlhKMElpd2lhWE5CY25KaGVTSXNJbkJ2Y3lJc0ltbDBaVzBpTENKamIzQjVJaXdpWDJobGVGZHlhWFJsSWl3aWMzUnlhVzVuSWl3aWIyWm1jMlYwSWl3aVRuVnRZbVZ5SWl3aWNtVnRZV2x1YVc1bklpd2ljM1J5VEdWdUlpd2lZbmwwWlNJc0luQmhjbk5sU1c1MElpd2ljM1ZpYzNSeUlpd2lhWE5PWVU0aUxDSmZZMmhoY25OWGNtbDBkR1Z1SWl3aVgzVjBaamhYY21sMFpTSXNJbU5vWVhKelYzSnBkSFJsYmlJc0ltSnNhWFJDZFdabVpYSWlMQ0pmWVhOamFXbFhjbWwwWlNJc0ltRnpZMmxwVkc5Q2VYUmxjeUlzSWw5aWFXNWhjbmxYY21sMFpTSXNJbDlpWVhObE5qUlhjbWwwWlNJc0lsOTFkR1l4Tm14bFYzSnBkR1VpTENKMWRHWXhObXhsVkc5Q2VYUmxjeUlzSW5CeWIzUnZkSGx3WlNJc0ltbHpSbWx1YVhSbElpd2ljM2RoY0NJc0luUnZVM1J5YVc1bklpd2ljM1JoY25RaUxDSmxibVFpTENKelpXeG1JaXdpWDJobGVGTnNhV05sSWl3aVgzVjBaamhUYkdsalpTSXNJbDloYzJOcGFWTnNhV05sSWl3aVgySnBibUZ5ZVZOc2FXTmxJaXdpWDJKaGMyVTJORk5zYVdObElpd2lYM1YwWmpFMmJHVlRiR2xqWlNJc0luUnZTbE5QVGlJc0ltUmhkR0VpTENKQmNuSmhlU0lzSW5Oc2FXTmxJaXdpWTJGc2JDSXNJbDloY25JaUxDSjBZWEpuWlhRaUxDSjBZWEpuWlhSZmMzUmhjblFpTENKemIzVnlZMlVpTENKc1pXNGlMQ0ptY205dFFubDBaVUZ5Y21GNUlpd2ljbVZ6SWl3aWRHMXdJaXdpVFdGMGFDSXNJbTFwYmlJc0ltUmxZMjlrWlZWMFpqaERhR0Z5SWl3aVpuSnZiVU5vWVhKRGIyUmxJaXdpYjNWMElpd2lkRzlJWlhnaUxDSmllWFJsY3lJc0ltTnNZVzF3SWl3aWMyeHBZMlZNWlc0aUxDSnVaWGRDZFdZaUxDSm5aWFFpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpYzJWMElpd2lkaUlzSW5keWFYUmxWVWx1ZERnaUxDSnViMEZ6YzJWeWRDSXNJbDl5WldGa1ZVbHVkREUySWl3aWJHbDBkR3hsUlc1a2FXRnVJaXdpZG1Gc0lpd2ljbVZoWkZWSmJuUXhOa3hGSWl3aWNtVmhaRlZKYm5ReE5rSkZJaXdpWDNKbFlXUlZTVzUwTXpJaUxDSnlaV0ZrVlVsdWRETXlURVVpTENKeVpXRmtWVWx1ZERNeVFrVWlMQ0p5WldGa1NXNTBPQ0lzSW01bFp5SXNJbDl5WldGa1NXNTBNVFlpTENKeVpXRmtTVzUwTVRaTVJTSXNJbkpsWVdSSmJuUXhOa0pGSWl3aVgzSmxZV1JKYm5Rek1pSXNJbkpsWVdSSmJuUXpNa3hGSWl3aWNtVmhaRWx1ZERNeVFrVWlMQ0pmY21WaFpFWnNiMkYwSWl3aWNtVmhaQ0lzSW5KbFlXUkdiRzloZEV4Rklpd2ljbVZoWkVac2IyRjBRa1VpTENKZmNtVmhaRVJ2ZFdKc1pTSXNJbkpsWVdSRWIzVmliR1ZNUlNJc0luSmxZV1JFYjNWaWJHVkNSU0lzSW5aaGJIVmxJaXdpZG1WeWFXWjFhVzUwSWl3aVgzZHlhWFJsVlVsdWRERTJJaXdpYWlJc0luZHlhWFJsVlVsdWRERTJURVVpTENKM2NtbDBaVlZKYm5ReE5rSkZJaXdpWDNkeWFYUmxWVWx1ZERNeUlpd2lkM0pwZEdWVlNXNTBNekpNUlNJc0luZHlhWFJsVlVsdWRETXlRa1VpTENKM2NtbDBaVWx1ZERnaUxDSjJaWEpwWm5OcGJuUWlMQ0pmZDNKcGRHVkpiblF4TmlJc0luZHlhWFJsU1c1ME1UWk1SU0lzSW5keWFYUmxTVzUwTVRaQ1JTSXNJbDkzY21sMFpVbHVkRE15SWl3aWQzSnBkR1ZKYm5Rek1reEZJaXdpZDNKcGRHVkpiblF6TWtKRklpd2lYM2R5YVhSbFJteHZZWFFpTENKMlpYSnBaa2xGUlVVM05UUWlMQ0ozY21sMFpVWnNiMkYwVEVVaUxDSjNjbWwwWlVac2IyRjBRa1VpTENKZmQzSnBkR1ZFYjNWaWJHVWlMQ0ozY21sMFpVUnZkV0pzWlV4Rklpd2lkM0pwZEdWRWIzVmliR1ZDUlNJc0ltWnBiR3dpTENKamFHRnlRMjlrWlVGMElpd2lhVzV6Y0dWamRDSXNJbXB2YVc0aUxDSjBiMEZ5Y21GNVFuVm1abVZ5SWl3aVluVm1abVZ5SWl3aWRISnBiU0lzSW5KbGNHeGhZMlVpTENKQ1VDSXNJbDluWlhRaUxDSjBiMHh2WTJGc1pWTjBjbWx1WnlJc0ltbHVaR1Y0SWl3aVpHVm1ZWFZzZEZaaGJIVmxJaXdpWTJWcGJDSXNJazlpYW1WamRDSXNJbTRpTENKaWVYUmxRWEp5WVhraUxDSndkWE5vSWl3aWFDSXNJbVZ1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ0lzSW5Od2JHbDBJaXdpWXlJc0ltaHBJaXdpYkc4aUxDSjBiMEo1ZEdWQmNuSmhlU0lzSW5OeVl5SXNJbVJ6ZENJc0ltUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDSXNJbVZ5Y2lJc0ltMWhlQ0lzSW1ac2IyOXlJaXdpZEdWemRDSXNJbTFsYzNOaFoyVWlYU3dpYldGd2NHbHVaM01pT2lJN096czdRVUZCUVRzN096czdPenRCUVU5QkxFbEJRVWxCTEZOQlFWTkRMRkZCUVZFc1YwRkJVaXhEUVVGaU8wRkJRMEVzU1VGQlNVTXNWVUZCVlVRc1VVRkJVU3hUUVVGU0xFTkJRV1E3TzBGQlJVRkZMRkZCUVZGRExFMUJRVklzUjBGQmFVSkJMRTFCUVdwQ08wRkJRMEZFTEZGQlFWRkZMRlZCUVZJc1IwRkJjVUpFTEUxQlFYSkNPMEZCUTBGRUxGRkJRVkZITEdsQ1FVRlNMRWRCUVRSQ0xFVkJRVFZDTzBGQlEwRkdMRTlCUVU5SExGRkJRVkFzUjBGQmEwSXNTVUZCYkVJN08wRkJSVUU3T3pzN08wRkJTMEZJTEU5QlFVOUpMR1ZCUVZBc1IwRkJNRUlzV1VGQldUdEJRVU53UXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlNUdEJRVU5HTEZGQlFVbERMRTFCUVUwc1NVRkJTVU1zVjBGQlNpeERRVUZuUWl4RFFVRm9RaXhEUVVGV08wRkJRMEVzVVVGQlNVTXNUVUZCVFN4SlFVRkpReXhWUVVGS0xFTkJRV1ZJTEVkQlFXWXNRMEZCVmp0QlFVTkJSU3hSUVVGSlJTeEhRVUZLTEVkQlFWVXNXVUZCV1R0QlFVRkZMR0ZCUVU4c1JVRkJVRHRCUVVGWExFdEJRVzVETzBGQlEwRXNWMEZCVHl4UFFVRlBSaXhKUVVGSlJTeEhRVUZLTEVWQlFWQXNTVUZEU0N4UFFVRlBSaXhKUVVGSlJ5eFJRVUZZTEV0QlFYZENMRlZCUkRWQ0xFTkJTa1VzUTBGTGNVTTdRVUZEZUVNc1IwRk9SQ3hEUVUxRkxFOUJRVTlETEVOQlFWQXNSVUZCVlR0QlFVTldMRmRCUVU4c1MwRkJVRHRCUVVORU8wRkJRMFlzUTBGbWQwSXNSVUZCZWtJN08wRkJhVUpCT3pzN096czdPenM3T3pzN1FVRlpRU3hUUVVGVFdDeE5RVUZVTEVOQlFXbENXU3hQUVVGcVFpeEZRVUV3UWtNc1VVRkJNVUlzUlVGQmIwTkRMRTFCUVhCRExFVkJRVFJETzBGQlF6RkRMRTFCUVVrc1JVRkJSU3huUWtGQlowSmtMRTFCUVd4Q0xFTkJRVW9zUlVGRFJTeFBRVUZQTEVsQlFVbEJMRTFCUVVvc1EwRkJWMWtzVDBGQldDeEZRVUZ2UWtNc1VVRkJjRUlzUlVGQk9FSkRMRTFCUVRsQ0xFTkJRVkE3TzBGQlJVWXNUVUZCU1VNc1kwRkJZMGdzVDBGQlpDeDVRMEZCWTBFc1QwRkJaQ3hEUVVGS096dEJRVVZCTzBGQlEwRTdRVUZEUVN4TlFVRkpReXhoUVVGaExGRkJRV0lzU1VGQmVVSkZMRk5CUVZNc1VVRkJkRU1zUlVGQlowUTdRVUZET1VOSUxHTkJRVlZKTEZkQlFWZEtMRTlCUVZnc1EwRkJWanRCUVVOQkxGZEJRVTlCTEZGQlFWRkxMRTFCUVZJc1IwRkJhVUlzUTBGQmFrSXNTMEZCZFVJc1EwRkJPVUlzUlVGQmFVTTdRVUZETDBKTUxHZENRVUZWUVN4VlFVRlZMRWRCUVhCQ08wRkJRMFE3UVVGRFJqczdRVUZGUkR0QlFVTkJMRTFCUVVsTExFMUJRVW83UVVGRFFTeE5RVUZKUml4VFFVRlRMRkZCUVdJc1JVRkRSVVVzVTBGQlUwTXNUMEZCVDA0c1QwRkJVQ3hEUVVGVUxFTkJSRVlzUzBGRlN5eEpRVUZKUnl4VFFVRlRMRkZCUVdJc1JVRkRTRVVzVTBGQlUycENMRTlCUVU5dFFpeFZRVUZRTEVOQlFXdENVQ3hQUVVGc1FpeEZRVUV5UWtNc1VVRkJNMElzUTBGQlZDeERRVVJITEV0QlJVRXNTVUZCU1VVc1UwRkJVeXhSUVVGaUxFVkJRMGhGTEZOQlFWTkRMRTlCUVU5T0xGRkJRVkZMTEUxQlFXWXNRMEZCVkN4RFFVUkhMRU5CUXpaQ08wRkJSRGRDTEU5QlIwZ3NUVUZCVFN4SlFVRkpSeXhMUVVGS0xFTkJRVlVzZFVSQlFWWXNRMEZCVGpzN1FVRkZSaXhOUVVGSlppeEhRVUZLTzBGQlEwRXNUVUZCU1V3c1QwRkJUMGtzWlVGQldDeEZRVUUwUWp0QlFVTXhRanRCUVVOQlF5eFZRVUZOVEN4UFFVRlBjVUlzVVVGQlVDeERRVUZuUWl4SlFVRkpZaXhWUVVGS0xFTkJRV1ZUTEUxQlFXWXNRMEZCYUVJc1EwRkJUanRCUVVORUxFZEJTRVFzVFVGSFR6dEJRVU5NTzBGQlEwRmFMRlZCUVUwc1NVRkJUanRCUVVOQlFTeFJRVUZKV1N4TlFVRktMRWRCUVdGQkxFMUJRV0k3UVVGRFFWb3NVVUZCU1dsQ0xGTkJRVW9zUjBGQlowSXNTVUZCYUVJN1FVRkRSRHM3UVVGRlJDeE5RVUZKUXl4RFFVRktPMEZCUTBFc1RVRkJTWFpDTEU5QlFVOUpMR1ZCUVZBc1NVRkJNRUlzVDBGQlQxRXNVVUZCVVU4c1ZVRkJaaXhMUVVFNFFpeFJRVUUxUkN4RlFVRnpSVHRCUVVOd1JUdEJRVU5CWkN4UlFVRkpiVUlzU1VGQlNpeERRVUZUV2l4UFFVRlVPMEZCUTBRc1IwRklSQ3hOUVVkUExFbEJRVWxoTEZkQlFWZGlMRTlCUVZnc1EwRkJTaXhGUVVGNVFqdEJRVU01UWp0QlFVTkJMRk5CUVV0WExFbEJRVWtzUTBGQlZDeEZRVUZaUVN4SlFVRkpUaXhOUVVGb1FpeEZRVUYzUWswc1IwRkJlRUlzUlVGQk5rSTdRVUZETTBJc1ZVRkJTWFpDTEU5QlFVOHdRaXhSUVVGUUxFTkJRV2RDWkN4UFFVRm9RaXhEUVVGS0xFVkJRMFZRTEVsQlFVbHJRaXhEUVVGS0xFbEJRVk5ZTEZGQlFWRmxMRk5CUVZJc1EwRkJhMEpLTEVOQlFXeENMRU5CUVZRc1EwRkVSaXhMUVVkRmJFSXNTVUZCU1d0Q0xFTkJRVW9zU1VGQlUxZ3NVVUZCVVZjc1EwRkJVaXhEUVVGVU8wRkJRMGc3UVVGRFJpeEhRVkpOTEUxQlVVRXNTVUZCU1ZJc1UwRkJVeXhSUVVGaUxFVkJRWFZDTzBGQlF6VkNWaXhSUVVGSmRVSXNTMEZCU2l4RFFVRlZhRUlzVDBGQlZpeEZRVUZ0UWl4RFFVRnVRaXhGUVVGelFrTXNVVUZCZEVJN1FVRkRSQ3hIUVVaTkxFMUJSVUVzU1VGQlNVVXNVMEZCVXl4UlFVRlVMRWxCUVhGQ0xFTkJRVU5tTEU5QlFVOUpMR1ZCUVRkQ0xFbEJRV2RFTEVOQlFVTlZMRTFCUVhKRUxFVkJRVFpFTzBGQlEyeEZMRk5CUVV0VExFbEJRVWtzUTBGQlZDeEZRVUZaUVN4SlFVRkpUaXhOUVVGb1FpeEZRVUYzUWswc1IwRkJlRUlzUlVGQk5rSTdRVUZETTBKc1FpeFZRVUZKYTBJc1EwRkJTaXhKUVVGVExFTkJRVlE3UVVGRFJEdEJRVU5HT3p0QlFVVkVMRk5CUVU5c1FpeEhRVUZRTzBGQlEwUTdPMEZCUlVRN1FVRkRRVHM3UVVGRlFVd3NUMEZCVHpaQ0xGVkJRVkFzUjBGQmIwSXNWVUZCVldoQ0xGRkJRVllzUlVGQmIwSTdRVUZEZEVNc1ZVRkJVV2xDTEU5QlFVOXFRaXhSUVVGUUxFVkJRV2xDYTBJc1YwRkJha0lzUlVGQlVqdEJRVU5GTEZOQlFVc3NTMEZCVER0QlFVTkJMRk5CUVVzc1RVRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzVVVGQlREdEJRVU5CTEZOQlFVc3NTMEZCVER0QlFVTkJMRk5CUVVzc1RVRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVMEZCVER0QlFVTkJMRk5CUVVzc1ZVRkJURHRCUVVORkxHRkJRVThzU1VGQlVEdEJRVU5HTzBGQlEwVXNZVUZCVHl4TFFVRlFPMEZCWkVvN1FVRm5Ra1FzUTBGcVFrUTdPMEZCYlVKQkwwSXNUMEZCVHpCQ0xGRkJRVkFzUjBGQmEwSXNWVUZCVlUwc1EwRkJWaXhGUVVGaE8wRkJRemRDTEZOQlFVOHNRMEZCUXl4RlFVRkZRU3hOUVVGTkxFbEJRVTRzU1VGQlkwRXNUVUZCVFVNc1UwRkJjRUlzU1VGQmFVTkVMRVZCUVVWV0xGTkJRWEpETEVOQlFWSTdRVUZEUkN4RFFVWkVPenRCUVVsQmRFSXNUMEZCVDIxQ0xGVkJRVkFzUjBGQmIwSXNWVUZCVldVc1IwRkJWaXhGUVVGbGNrSXNVVUZCWml4RlFVRjVRanRCUVVNelF5eE5RVUZKYzBJc1IwRkJTanRCUVVOQlJDeFJRVUZOUVN4TlFVRk5MRVZCUVZvN1FVRkRRU3hWUVVGUmNrSXNXVUZCV1N4TlFVRndRanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5GYzBJc1dVRkJUVVFzU1VGQlNXcENMRTFCUVVvc1IwRkJZU3hEUVVGdVFqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMFZyUWl4WlFVRk5ReXhaUVVGWlJpeEhRVUZhTEVWQlFXbENha0lzVFVGQmRrSTdRVUZEUVR0QlFVTkdMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVVVGQlREdEJRVU5CTEZOQlFVc3NTMEZCVER0QlFVTkZhMElzV1VGQlRVUXNTVUZCU1dwQ0xFMUJRVlk3UVVGRFFUdEJRVU5HTEZOQlFVc3NVVUZCVER0QlFVTkZhMElzV1VGQlRVVXNZMEZCWTBnc1IwRkJaQ3hGUVVGdFFtcENMRTFCUVhwQ08wRkJRMEU3UVVGRFJpeFRRVUZMTEUxQlFVdzdRVUZEUVN4VFFVRkxMRTlCUVV3N1FVRkRRU3hUUVVGTExGTkJRVXc3UVVGRFFTeFRRVUZMTEZWQlFVdzdRVUZEUld0Q0xGbEJRVTFFTEVsQlFVbHFRaXhOUVVGS0xFZEJRV0VzUTBGQmJrSTdRVUZEUVR0QlFVTkdPMEZCUTBVc1dVRkJUU3hKUVVGSlJ5eExRVUZLTEVOQlFWVXNhMEpCUVZZc1EwRkJUanRCUVhaQ1NqdEJRWGxDUVN4VFFVRlBaU3hIUVVGUU8wRkJRMFFzUTBFM1FrUTdPMEZCSzBKQmJrTXNUMEZCVDNORExFMUJRVkFzUjBGQlowSXNWVUZCVlVNc1NVRkJWaXhGUVVGblFrTXNWMEZCYUVJc1JVRkJOa0k3UVVGRE0wTkRMRk5CUVU5RExGRkJRVkZJTEVsQlFWSXNRMEZCVUN4RlFVRnpRaXhuUkVGRGJFSXNNRUpCUkVvN08wRkJSMEVzVFVGQlNVRXNTMEZCUzNSQ0xFMUJRVXdzUzBGQlowSXNRMEZCY0VJc1JVRkJkVUk3UVVGRGNrSXNWMEZCVHl4SlFVRkpha0lzVFVGQlNpeERRVUZYTEVOQlFWZ3NRMEZCVUR0QlFVTkVMRWRCUmtRc1RVRkZUeXhKUVVGSmRVTXNTMEZCUzNSQ0xFMUJRVXdzUzBGQlowSXNRMEZCY0VJc1JVRkJkVUk3UVVGRE5VSXNWMEZCVDNOQ0xFdEJRVXNzUTBGQlRDeERRVUZRTzBGQlEwUTdPMEZCUlVRc1RVRkJTV2hDTEVOQlFVbzdRVUZEUVN4TlFVRkpMRTlCUVU5cFFpeFhRVUZRTEV0QlFYVkNMRkZCUVROQ0xFVkJRWEZETzBGQlEyNURRU3hyUWtGQll5eERRVUZrTzBGQlEwRXNVMEZCUzJwQ0xFbEJRVWtzUTBGQlZDeEZRVUZaUVN4SlFVRkpaMElzUzBGQlMzUkNMRTFCUVhKQ0xFVkJRVFpDVFN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUTJsQ0xIRkNRVUZsUkN4TFFVRkxhRUlzUTBGQlRDeEZRVUZSVGl4TlFVRjJRanRCUVVORU8wRkJRMFk3TzBGQlJVUXNUVUZCU1Zvc1RVRkJUU3hKUVVGSlRDeE5RVUZLTEVOQlFWZDNReXhYUVVGWUxFTkJRVlk3UVVGRFFTeE5RVUZKUnl4TlFVRk5MRU5CUVZZN1FVRkRRU3hQUVVGTGNFSXNTVUZCU1N4RFFVRlVMRVZCUVZsQkxFbEJRVWxuUWl4TFFVRkxkRUlzVFVGQmNrSXNSVUZCTmtKTkxFZEJRVGRDTEVWQlFXdERPMEZCUTJoRExGRkJRVWx4UWl4UFFVRlBUQ3hMUVVGTGFFSXNRMEZCVEN4RFFVRllPMEZCUTBGeFFpeFRRVUZMUXl4SlFVRk1MRU5CUVZWNFF5eEhRVUZXTEVWQlFXVnpReXhIUVVGbU8wRkJRMEZCTEZkQlFVOURMRXRCUVVzelFpeE5RVUZhTzBGQlEwUTdRVUZEUkN4VFFVRlBXaXhIUVVGUU8wRkJRMFFzUTBFeFFrUTdPMEZCTkVKQk8wRkJRMEU3TzBGQlJVRXNVMEZCVTNsRExGTkJRVlFzUTBGQmIwSjZReXhIUVVGd1FpeEZRVUY1UWpCRExFMUJRWHBDTEVWQlFXbERReXhOUVVGcVF5eEZRVUY1UXk5Q0xFMUJRWHBETEVWQlFXbEVPMEZCUXk5REswSXNWMEZCVTBNc1QwRkJUMFFzVFVGQlVDeExRVUZyUWl4RFFVRXpRanRCUVVOQkxFMUJRVWxGTEZsQlFWazNReXhKUVVGSldTeE5RVUZLTEVkQlFXRXJRaXhOUVVFM1FqdEJRVU5CTEUxQlFVa3NRMEZCUXk5Q0xFMUJRVXdzUlVGQllUdEJRVU5ZUVN4aFFVRlRhVU1zVTBGQlZEdEJRVU5FTEVkQlJrUXNUVUZGVHp0QlFVTk1ha01zWVVGQlUyZERMRTlCUVU5b1F5eE5RVUZRTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hUUVVGVGFVTXNVMEZCWWl4RlFVRjNRanRCUVVOMFFtcERMR1ZCUVZOcFF5eFRRVUZVTzBGQlEwUTdRVUZEUmpzN1FVRkZSRHRCUVVOQkxFMUJRVWxETEZOQlFWTktMRTlCUVU4NVFpeE5RVUZ3UWp0QlFVTkJkMElzVTBGQlQxVXNVMEZCVXl4RFFVRlVMRXRCUVdVc1EwRkJkRUlzUlVGQmVVSXNiMEpCUVhwQ096dEJRVVZCTEUxQlFVbHNReXhUUVVGVGEwTXNVMEZCVXl4RFFVRjBRaXhGUVVGNVFqdEJRVU4yUW14RExHRkJRVk5yUXl4VFFVRlRMRU5CUVd4Q08wRkJRMFE3UVVGRFJDeFBRVUZMTEVsQlFVazFRaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsT0xFMUJRWEJDTEVWQlFUUkNUU3hIUVVFMVFpeEZRVUZwUXp0QlFVTXZRaXhSUVVGSk5rSXNUMEZCVDBNc1UwRkJVMDRzVDBGQlQwOHNUVUZCVUN4RFFVRmpMMElzU1VGQlNTeERRVUZzUWl4RlFVRnhRaXhEUVVGeVFpeERRVUZVTEVWQlFXdERMRVZCUVd4RExFTkJRVmc3UVVGRFFXdENMRmRCUVU4c1EwRkJRMk1zVFVGQlRVZ3NTVUZCVGl4RFFVRlNMRVZCUVhGQ0xHOUNRVUZ5UWp0QlFVTkJMME1zVVVGQlNUSkRMRk5CUVZONlFpeERRVUZpTEVsQlFXdENOa0lzU1VGQmJFSTdRVUZEUkR0QlFVTkVjRVFzVTBGQlQzZEVMR0ZCUVZBc1IwRkJkVUpxUXl4SlFVRkpMRU5CUVROQ08wRkJRMEVzVTBGQlQwRXNRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5yUXl4VlFVRlVMRU5CUVhGQ2NFUXNSMEZCY2tJc1JVRkJNRUl3UXl4TlFVRXhRaXhGUVVGclEwTXNUVUZCYkVNc1JVRkJNRU12UWl4TlFVRXhReXhGUVVGclJEdEJRVU5vUkN4TlFVRkplVU1zWlVGQlpURkVMRTlCUVU5M1JDeGhRVUZRTEVkQlEycENSeXhYUVVGWGRrSXNXVUZCV1Zjc1RVRkJXaXhEUVVGWUxFVkJRV2RETVVNc1IwRkJhRU1zUlVGQmNVTXlReXhOUVVGeVF5eEZRVUUyUXk5Q0xFMUJRVGRETEVOQlJFWTdRVUZGUVN4VFFVRlBlVU1zV1VGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZORkxGZEJRVlFzUTBGQmMwSjJSQ3hIUVVGMFFpeEZRVUV5UWpCRExFMUJRVE5DTEVWQlFXMURReXhOUVVGdVF5eEZRVUV5UXk5Q0xFMUJRVE5ETEVWQlFXMUVPMEZCUTJwRUxFMUJRVWw1UXl4bFFVRmxNVVFzVDBGQlQzZEVMR0ZCUVZBc1IwRkRha0pITEZkQlFWZEZMR0ZCUVdGa0xFMUJRV0lzUTBGQldDeEZRVUZwUXpGRExFZEJRV3BETEVWQlFYTkRNa01zVFVGQmRFTXNSVUZCT0VNdlFpeE5RVUU1UXl4RFFVUkdPMEZCUlVFc1UwRkJUM2xETEZsQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVFNTeFpRVUZVTEVOQlFYVkNla1FzUjBGQmRrSXNSVUZCTkVJd1F5eE5RVUUxUWl4RlFVRnZRME1zVFVGQmNFTXNSVUZCTkVNdlFpeE5RVUUxUXl4RlFVRnZSRHRCUVVOc1JDeFRRVUZQTWtNc1dVRkJXWFpFTEVkQlFWb3NSVUZCYVVJd1F5eE5RVUZxUWl4RlFVRjVRa01zVFVGQmVrSXNSVUZCYVVNdlFpeE5RVUZxUXl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlV6aERMRmxCUVZRc1EwRkJkVUl4UkN4SFFVRjJRaXhGUVVFMFFqQkRMRTFCUVRWQ0xFVkJRVzlEUXl4TlFVRndReXhGUVVFMFF5OUNMRTFCUVRWRExFVkJRVzlFTzBGQlEyeEVMRTFCUVVsNVF5eGxRVUZsTVVRc1QwRkJUM2RFTEdGQlFWQXNSMEZEYWtKSExGZEJRVmQwUWl4alFVRmpWU3hOUVVGa0xFTkJRVmdzUlVGQmEwTXhReXhIUVVGc1F5eEZRVUYxUXpKRExFMUJRWFpETEVWQlFTdERMMElzVFVGQkwwTXNRMEZFUmp0QlFVVkJMRk5CUVU5NVF5eFpRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMDBzWVVGQlZDeERRVUYzUWpORUxFZEJRWGhDTEVWQlFUWkNNRU1zVFVGQk4wSXNSVUZCY1VORExFMUJRWEpETEVWQlFUWkRMMElzVFVGQk4wTXNSVUZCY1VRN1FVRkRia1FzVFVGQlNYbERMR1ZCUVdVeFJDeFBRVUZQZDBRc1lVRkJVQ3hIUVVOcVFrY3NWMEZCVjAwc1pVRkJaV3hDTEUxQlFXWXNRMEZCV0N4RlFVRnRRekZETEVkQlFXNURMRVZCUVhkRE1rTXNUVUZCZUVNc1JVRkJaMFF2UWl4TlFVRm9SQ3hEUVVSR08wRkJSVUVzVTBGQlQzbERMRmxCUVZBN1FVRkRSRHM3UVVGRlJERkVMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENkRU1zUzBGQmFrSXNSMEZCZVVJc1ZVRkJWVzFDTEUxQlFWWXNSVUZCYTBKRExFMUJRV3hDTEVWQlFUQkNMMElzVFVGQk1VSXNSVUZCYTBOS0xGRkJRV3hETEVWQlFUUkRPMEZCUTI1Rk8wRkJRMEU3UVVGRFFTeE5RVUZKYzBRc1UwRkJVMjVDTEUxQlFWUXNRMEZCU2l4RlFVRnpRanRCUVVOd1FpeFJRVUZKTEVOQlFVTnRRaXhUUVVGVGJFUXNUVUZCVkN4RFFVRk1MRVZCUVhWQ08wRkJRM0pDU2l4cFFrRkJWMGtzVFVGQldEdEJRVU5CUVN4bFFVRlRaMElzVTBGQlZEdEJRVU5FTzBGQlEwWXNSMEZNUkN4TlFVdFBPMEZCUVVjN1FVRkRVaXhSUVVGSmJVTXNUMEZCVDNaRUxGRkJRVmc3UVVGRFFVRXNaVUZCVjIxRExFMUJRVmc3UVVGRFFVRXNZVUZCVXk5Q0xFMUJRVlE3UVVGRFFVRXNZVUZCVTIxRUxFbEJRVlE3UVVGRFJEczdRVUZGUkhCQ0xGZEJRVk5ETEU5QlFVOUVMRTFCUVZBc1MwRkJhMElzUTBGQk0wSTdRVUZEUVN4TlFVRkpSU3haUVVGWkxFdEJRVXRxUXl4TlFVRk1MRWRCUVdNclFpeE5RVUU1UWp0QlFVTkJMRTFCUVVrc1EwRkJReTlDTEUxQlFVd3NSVUZCWVR0QlFVTllRU3hoUVVGVGFVTXNVMEZCVkR0QlFVTkVMRWRCUmtRc1RVRkZUenRCUVVOTWFrTXNZVUZCVTJkRExFOUJRVTlvUXl4TlFVRlFMRU5CUVZRN1FVRkRRU3hSUVVGSlFTeFRRVUZUYVVNc1UwRkJZaXhGUVVGM1FqdEJRVU4wUW1wRExHVkJRVk5wUXl4VFFVRlVPMEZCUTBRN1FVRkRSanRCUVVORWNrTXNZVUZCVjJsQ0xFOUJRVTlxUWl4WlFVRlpMRTFCUVc1Q0xFVkJRVEpDYTBJc1YwRkJNMElzUlVGQldEczdRVUZGUVN4TlFVRkpTU3hIUVVGS08wRkJRMEVzVlVGQlVYUkNMRkZCUVZJN1FVRkRSU3hUUVVGTExFdEJRVXc3UVVGRFJYTkNMRmxCUVUxWExGVkJRVlVzU1VGQlZpeEZRVUZuUWtNc1RVRkJhRUlzUlVGQmQwSkRMRTFCUVhoQ0xFVkJRV2RETDBJc1RVRkJhRU1zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMFZyUWl4WlFVRk5jMElzVjBGQlZ5eEpRVUZZTEVWQlFXbENWaXhOUVVGcVFpeEZRVUY1UWtNc1RVRkJla0lzUlVGQmFVTXZRaXhOUVVGcVF5eERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRTlCUVV3N1FVRkRSV3RDTEZsQlFVMTVRaXhaUVVGWkxFbEJRVm9zUlVGQmEwSmlMRTFCUVd4Q0xFVkJRVEJDUXl4TlFVRXhRaXhGUVVGclF5OUNMRTFCUVd4RExFTkJRVTQ3UVVGRFFUdEJRVU5HTEZOQlFVc3NVVUZCVER0QlFVTkZhMElzV1VGQlRUSkNMR0ZCUVdFc1NVRkJZaXhGUVVGdFFtWXNUVUZCYmtJc1JVRkJNa0pETEUxQlFUTkNMRVZCUVcxREwwSXNUVUZCYmtNc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eFJRVUZNTzBGQlEwVnJRaXhaUVVGTk5FSXNZVUZCWVN4SlFVRmlMRVZCUVcxQ2FFSXNUVUZCYmtJc1JVRkJNa0pETEUxQlFUTkNMRVZCUVcxREwwSXNUVUZCYmtNc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBFc1UwRkJTeXhUUVVGTU8wRkJRMEVzVTBGQlN5eFZRVUZNTzBGQlEwVnJRaXhaUVVGTk5rSXNZMEZCWXl4SlFVRmtMRVZCUVc5Q2FrSXNUVUZCY0VJc1JVRkJORUpETEUxQlFUVkNMRVZCUVc5REwwSXNUVUZCY0VNc1EwRkJUanRCUVVOQk8wRkJRMFk3UVVGRFJTeFpRVUZOTEVsQlFVbEhMRXRCUVVvc1EwRkJWU3hyUWtGQlZpeERRVUZPTzBGQmVFSktPMEZCTUVKQkxGTkJRVTlsTEVkQlFWQTdRVUZEUkN4RFFYWkVSRHM3UVVGNVJFRnVReXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRa2NzVVVGQmFrSXNSMEZCTkVJc1ZVRkJWWGhFTEZGQlFWWXNSVUZCYjBKNVJDeExRVUZ3UWl4RlFVRXlRa01zUjBGQk0wSXNSVUZCWjBNN1FVRkRNVVFzVFVGQlNVTXNUMEZCVHl4SlFVRllPenRCUVVWQk0wUXNZVUZCVjJsQ0xFOUJRVTlxUWl4WlFVRlpMRTFCUVc1Q0xFVkJRVEpDYTBJc1YwRkJNMElzUlVGQldEdEJRVU5CZFVNc1ZVRkJVWEpDTEU5QlFVOXhRaXhMUVVGUUxFdEJRV2xDTEVOQlFYcENPMEZCUTBGRExGRkJRVTlCTEZGQlFWRjBReXhUUVVGVUxFZEJRMFpuUWl4UFFVRlBjMElzUjBGQlVDeERRVVJGTEVkQlJVWkJMRTFCUVUxRExFdEJRVXQyUkN4TlFVWm1PenRCUVVsQk8wRkJRMEVzVFVGQlNYTkVMRkZCUVZGRUxFdEJRVm9zUlVGRFJTeFBRVUZQTEVWQlFWQTdPMEZCUlVZc1RVRkJTVzVETEVkQlFVbzdRVUZEUVN4VlFVRlJkRUlzVVVGQlVqdEJRVU5GTEZOQlFVc3NTMEZCVER0QlFVTkZjMElzV1VGQlRYTkRMRlZCUVZWRUxFbEJRVllzUlVGQlowSkdMRXRCUVdoQ0xFVkJRWFZDUXl4SFFVRjJRaXhEUVVGT08wRkJRMEU3UVVGRFJpeFRRVUZMTEUxQlFVdzdRVUZEUVN4VFFVRkxMRTlCUVV3N1FVRkRSWEJETEZsQlFVMTFReXhYUVVGWFJpeEpRVUZZTEVWQlFXbENSaXhMUVVGcVFpeEZRVUYzUWtNc1IwRkJlRUlzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4UFFVRk1PMEZCUTBWd1F5eFpRVUZOZDBNc1dVRkJXVWdzU1VGQldpeEZRVUZyUWtZc1MwRkJiRUlzUlVGQmVVSkRMRWRCUVhwQ0xFTkJRVTQ3UVVGRFFUdEJRVU5HTEZOQlFVc3NVVUZCVER0QlFVTkZjRU1zV1VGQlRYbERMR0ZCUVdGS0xFbEJRV0lzUlVGQmJVSkdMRXRCUVc1Q0xFVkJRVEJDUXl4SFFVRXhRaXhEUVVGT08wRkJRMEU3UVVGRFJpeFRRVUZMTEZGQlFVdzdRVUZEUlhCRExGbEJRVTB3UXl4aFFVRmhUQ3hKUVVGaUxFVkJRVzFDUml4TFFVRnVRaXhGUVVFd1FrTXNSMEZCTVVJc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBFc1UwRkJTeXhUUVVGTU8wRkJRMEVzVTBGQlN5eFZRVUZNTzBGQlEwVndReXhaUVVGTk1rTXNZMEZCWTA0c1NVRkJaQ3hGUVVGdlFrWXNTMEZCY0VJc1JVRkJNa0pETEVkQlFUTkNMRU5CUVU0N1FVRkRRVHRCUVVOR08wRkJRMFVzV1VGQlRTeEpRVUZKYmtRc1MwRkJTaXhEUVVGVkxHdENRVUZXTEVOQlFVNDdRVUY0UWtvN1FVRXdRa0VzVTBGQlQyVXNSMEZCVUR0QlFVTkVMRU5CZWtORU96dEJRVEpEUVc1RExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ1lTeE5RVUZxUWl4SFFVRXdRaXhaUVVGWk8wRkJRM0JETEZOQlFVODdRVUZEVEdoRkxGVkJRVTBzVVVGRVJEdEJRVVZNYVVVc1ZVRkJUVU1zVFVGQlRXWXNVMEZCVGl4RFFVRm5RbWRDTEV0QlFXaENMRU5CUVhOQ1F5eEpRVUYwUWl4RFFVRXlRaXhMUVVGTFF5eEpRVUZNTEVsQlFXRXNTVUZCZUVNc1JVRkJPRU1zUTBGQk9VTTdRVUZHUkN4SFFVRlFPMEZCU1VRc1EwRk1SRHM3UVVGUFFUdEJRVU5CY0VZc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKeVFpeEpRVUZxUWl4SFFVRjNRaXhWUVVGVmQwTXNUVUZCVml4RlFVRnJRa01zV1VGQmJFSXNSVUZCWjBOb1FpeExRVUZvUXl4RlFVRjFRME1zUjBGQmRrTXNSVUZCTkVNN1FVRkRiRVVzVFVGQlNXZENMRk5CUVZNc1NVRkJZanM3UVVGRlFTeE5RVUZKTEVOQlFVTnFRaXhMUVVGTUxFVkJRVmxCTEZGQlFWRXNRMEZCVWp0QlFVTmFMRTFCUVVrc1EwRkJRME1zUjBGQlJDeEpRVUZSUVN4UlFVRlJMRU5CUVhCQ0xFVkJRWFZDUVN4TlFVRk5MRXRCUVV0MFJDeE5RVUZZTzBGQlEzWkNMRTFCUVVrc1EwRkJRM0ZGTEZsQlFVd3NSVUZCYlVKQkxHVkJRV1VzUTBGQlpqczdRVUZGYmtJN1FVRkRRU3hOUVVGSlppeFJRVUZSUkN4TFFVRmFMRVZCUVcxQ08wRkJRMjVDTEUxQlFVbGxMRTlCUVU5d1JTeE5RVUZRTEV0QlFXdENMRU5CUVd4Q0xFbEJRWFZDYzBVc1QwRkJUM1JGTEUxQlFWQXNTMEZCYTBJc1EwRkJOME1zUlVGQlowUTdPMEZCUldoRU8wRkJRMEYzUWl4VFFVRlBPRUlzVDBGQlQwUXNTMEZCWkN4RlFVRnhRaXg1UWtGQmNrSTdRVUZEUVRkQ0xGTkJRVTgyUXl4blFrRkJaMElzUTBGQmFFSXNTVUZCY1VKQkxHVkJRV1ZFTEU5QlFVOXdSU3hOUVVGc1JDeEZRVU5KTERKQ1FVUktPMEZCUlVGM1FpeFRRVUZQTmtJc1UwRkJVeXhEUVVGVUxFbEJRV05CTEZGQlFWRnBRaXhQUVVGUGRFVXNUVUZCY0VNc1JVRkJORU1zTWtKQlFUVkRPMEZCUTBGM1FpeFRRVUZQT0VJc1QwRkJUeXhEUVVGUUxFbEJRVmxCTEU5QlFVOW5RaXhQUVVGUGRFVXNUVUZCYWtNc1JVRkJlVU1zZVVKQlFYcERPenRCUVVWQk8wRkJRMEVzVFVGQlNYTkVMRTFCUVUwc1MwRkJTM1JFTEUxQlFXWXNSVUZEUlhORUxFMUJRVTBzUzBGQlMzUkVMRTFCUVZnN1FVRkRSaXhOUVVGSmIwVXNUMEZCVDNCRkxFMUJRVkFzUjBGQlowSnhSU3haUVVGb1FpeEhRVUVyUW1Zc1RVRkJUVVFzUzBGQmVrTXNSVUZEUlVNc1RVRkJUV01zVDBGQlQzQkZMRTFCUVZBc1IwRkJaMEp4UlN4WlFVRm9RaXhIUVVFclFtaENMRXRCUVhKRE96dEJRVVZHTEUxQlFVbHJRaXhOUVVGTmFrSXNUVUZCVFVRc1MwRkJhRUk3TzBGQlJVRXNUVUZCU1d0Q0xFMUJRVTBzUjBGQlRpeEpRVUZoTEVOQlFVTjRSaXhQUVVGUFNTeGxRVUY2UWl4RlFVRXdRenRCUVVONFF5eFRRVUZMTEVsQlFVbHRRaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVscFJTeEhRVUZ3UWl4RlFVRjVRbXBGTEVkQlFYcENPMEZCUTBVNFJDeGhRVUZQT1VRc1NVRkJTU3RFTEZsQlFWZ3NTVUZCTWtJc1MwRkJTeTlFTEVsQlFVa3JReXhMUVVGVUxFTkJRVE5DTzBGQlJFWTdRVUZGUkN4SFFVaEVMRTFCUjA4N1FVRkRUR1VzVjBGQlR6ZEVMRWxCUVZBc1EwRkJXU3hMUVVGTFpDeFJRVUZNTEVOQlFXTTBSQ3hMUVVGa0xFVkJRWEZDUVN4UlFVRlJhMElzUjBGQk4wSXNRMEZCV2l4RlFVRXJRMFlzV1VGQkwwTTdRVUZEUkR0QlFVTkdMRU5CYUVORU96dEJRV3REUVN4VFFVRlRWQ3haUVVGVUxFTkJRWFZDZUVVc1IwRkJka0lzUlVGQk5FSnBSU3hMUVVFMVFpeEZRVUZ0UTBNc1IwRkJia01zUlVGQmQwTTdRVUZEZEVNc1RVRkJTVVFzVlVGQlZTeERRVUZXTEVsQlFXVkRMRkZCUVZGc1JTeEpRVUZKV1N4TlFVRXZRaXhGUVVGMVF6dEJRVU55UXl4WFFVRlBja0lzVDBGQlR6WkdMR0ZCUVZBc1EwRkJjVUp3Uml4SFFVRnlRaXhEUVVGUU8wRkJRMFFzUjBGR1JDeE5RVVZQTzBGQlEwd3NWMEZCVDFRc1QwRkJUelpHTEdGQlFWQXNRMEZCY1VKd1JpeEpRVUZKTmtVc1MwRkJTaXhEUVVGVldpeExRVUZXTEVWQlFXbENReXhIUVVGcVFpeERRVUZ5UWl4RFFVRlFPMEZCUTBRN1FVRkRSanM3UVVGRlJDeFRRVUZUUnl4VlFVRlVMRU5CUVhGQ2NrVXNSMEZCY2tJc1JVRkJNRUpwUlN4TFFVRXhRaXhGUVVGcFEwTXNSMEZCYWtNc1JVRkJjME03UVVGRGNFTXNUVUZCU1cxQ0xFMUJRVTBzUlVGQlZqdEJRVU5CTEUxQlFVbERMRTFCUVUwc1JVRkJWanRCUVVOQmNFSXNVVUZCVFhGQ0xFdEJRVXRETEVkQlFVd3NRMEZCVTNoR0xFbEJRVWxaTEUxQlFXSXNSVUZCY1VKelJDeEhRVUZ5UWl4RFFVRk9PenRCUVVWQkxFOUJRVXNzU1VGQlNXaEVMRWxCUVVrclF5eExRVUZpTEVWQlFXOUNMME1zU1VGQlNXZEVMRWRCUVhoQ0xFVkJRVFpDYUVRc1IwRkJOMElzUlVGQmEwTTdRVUZEYUVNc1VVRkJTV3hDTEVsQlFVbHJRaXhEUVVGS0xFdEJRVlVzU1VGQlpDeEZRVUZ2UWp0QlFVTnNRbTFGTEdGQlFVOUpMR1ZCUVdWSUxFZEJRV1lzU1VGQmMwSTNSQ3hQUVVGUGFVVXNXVUZCVUN4RFFVRnZRakZHTEVsQlFVbHJRaXhEUVVGS0xFTkJRWEJDTEVOQlFUZENPMEZCUTBGdlJTeFpRVUZOTEVWQlFVNDdRVUZEUkN4TFFVaEVMRTFCUjA4N1FVRkRURUVzWVVGQlR5eE5RVUZOZEVZc1NVRkJTV3RDTEVOQlFVb3NSVUZCVHpoRExGRkJRVkFzUTBGQlowSXNSVUZCYUVJc1EwRkJZanRCUVVORU8wRkJRMFk3TzBGQlJVUXNVMEZCVDNGQ0xFMUJRVTFKTEdWQlFXVklMRWRCUVdZc1EwRkJZanRCUVVORU96dEJRVVZFTEZOQlFWTm9RaXhYUVVGVUxFTkJRWE5DZEVVc1IwRkJkRUlzUlVGQk1rSnBSU3hMUVVFelFpeEZRVUZyUTBNc1IwRkJiRU1zUlVGQmRVTTdRVUZEY2tNc1RVRkJTWEJETEUxQlFVMHNSVUZCVmp0QlFVTkJiME1zVVVGQlRYRkNMRXRCUVV0RExFZEJRVXdzUTBGQlUzaEdMRWxCUVVsWkxFMUJRV0lzUlVGQmNVSnpSQ3hIUVVGeVFpeERRVUZPT3p0QlFVVkJMRTlCUVVzc1NVRkJTV2hFTEVsQlFVa3JReXhMUVVGaUxFVkJRVzlDTDBNc1NVRkJTV2RFTEVkQlFYaENMRVZCUVRaQ2FFUXNSMEZCTjBJN1FVRkRSVmtzVjBGQlQwd3NUMEZCVDJsRkxGbEJRVkFzUTBGQmIwSXhSaXhKUVVGSmEwSXNRMEZCU2l4RFFVRndRaXhEUVVGUU8wRkJSRVlzUjBGRlFTeFBRVUZQV1N4SFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzbERMRmxCUVZRc1EwRkJkVUoyUlN4SFFVRjJRaXhGUVVFMFFtbEZMRXRCUVRWQ0xFVkJRVzFEUXl4SFFVRnVReXhGUVVGM1F6dEJRVU4wUXl4VFFVRlBTU3haUVVGWmRFVXNSMEZCV2l4RlFVRnBRbWxGTEV0QlFXcENMRVZCUVhkQ1F5eEhRVUY0UWl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwVXNVMEZCVkN4RFFVRnZRbkJGTEVkQlFYQkNMRVZCUVhsQ2FVVXNTMEZCZWtJc1JVRkJaME5ETEVkQlFXaERMRVZCUVhGRE8wRkJRMjVETEUxQlFVbHBRaXhOUVVGTmJrWXNTVUZCU1Zrc1RVRkJaRHM3UVVGRlFTeE5RVUZKTEVOQlFVTnhSQ3hMUVVGRUxFbEJRVlZCTEZGQlFWRXNRMEZCZEVJc1JVRkJlVUpCTEZGQlFWRXNRMEZCVWp0QlFVTjZRaXhOUVVGSkxFTkJRVU5ETEVkQlFVUXNTVUZCVVVFc1RVRkJUU3hEUVVGa0xFbEJRVzFDUVN4TlFVRk5hVUlzUjBGQk4wSXNSVUZCYTBOcVFpeE5RVUZOYVVJc1IwRkJUanM3UVVGRmJFTXNUVUZCU1ZFc1RVRkJUU3hGUVVGV08wRkJRMEVzVDBGQlN5eEpRVUZKZWtVc1NVRkJTU3RETEV0QlFXSXNSVUZCYjBJdlF5eEpRVUZKWjBRc1IwRkJlRUlzUlVGQk5rSm9SQ3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9RM2xGTEZkQlFVOURMRTFCUVUwMVJpeEpRVUZKYTBJc1EwRkJTaXhEUVVGT0xFTkJRVkE3UVVGRFJEdEJRVU5FTEZOQlFVOTVSU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTJ4Q0xHRkJRVlFzUTBGQmQwSjZSU3hIUVVGNFFpeEZRVUUyUW1sRkxFdEJRVGRDTEVWQlFXOURReXhIUVVGd1F5eEZRVUY1UXp0QlFVTjJReXhOUVVGSk1rSXNVVUZCVVRkR0xFbEJRVWsyUlN4TFFVRktMRU5CUVZWYUxFdEJRVllzUlVGQmFVSkRMRWRCUVdwQ0xFTkJRVm83UVVGRFFTeE5RVUZKYlVJc1RVRkJUU3hGUVVGV08wRkJRMEVzVDBGQlN5eEpRVUZKYmtVc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpNa1VzVFVGQlRXcEdMRTFCUVRGQ0xFVkJRV3REVFN4TFFVRkxMRU5CUVhaRExFVkJRVEJETzBGQlEzaERiVVVzVjBGQlR6VkVMRTlCUVU5cFJTeFpRVUZRTEVOQlFXOUNSeXhOUVVGTk0wVXNRMEZCVGl4SlFVRlhNa1VzVFVGQlRUTkZMRWxCUVVVc1EwRkJVaXhKUVVGaExFZEJRVFZETEVOQlFWQTdRVUZEUkR0QlFVTkVMRk5CUVU5dFJTeEhRVUZRTzBGQlEwUTdPMEZCUlVReFJpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFtZENMRXRCUVdwQ0xFZEJRWGxDTEZWQlFWVmFMRXRCUVZZc1JVRkJhVUpETEVkQlFXcENMRVZCUVhOQ08wRkJRemRETEUxQlFVbHBRaXhOUVVGTkxFdEJRVXQyUlN4TlFVRm1PMEZCUTBGeFJDeFZRVUZSTmtJc1RVRkJUVGRDTEV0QlFVNHNSVUZCWVd0Q0xFZEJRV0lzUlVGQmEwSXNRMEZCYkVJc1EwRkJVanRCUVVOQmFrSXNVVUZCVFRSQ0xFMUJRVTAxUWl4SFFVRk9MRVZCUVZkcFFpeEhRVUZZTEVWQlFXZENRU3hIUVVGb1FpeERRVUZPT3p0QlFVVkJMRTFCUVVsNFJpeFBRVUZQU1N4bFFVRllMRVZCUVRSQ08wRkJRekZDTEZkQlFVOUtMRTlCUVU5eFFpeFJRVUZRTEVOQlFXZENMRXRCUVV0WUxGRkJRVXdzUTBGQll6UkVMRXRCUVdRc1JVRkJjVUpETEVkQlFYSkNMRU5CUVdoQ0xFTkJRVkE3UVVGRFJDeEhRVVpFTEUxQlJVODdRVUZEVEN4UlFVRkpOa0lzVjBGQlZ6ZENMRTFCUVUxRUxFdEJRWEpDTzBGQlEwRXNVVUZCU1N0Q0xGTkJRVk1zU1VGQlNYSkhMRTFCUVVvc1EwRkJWMjlITEZGQlFWZ3NSVUZCY1VKdVJTeFRRVUZ5UWl4RlFVRm5ReXhKUVVGb1F5eERRVUZpTzBGQlEwRXNVMEZCU3l4SlFVRkpWaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVrMlJTeFJRVUZ3UWl4RlFVRTRRamRGTEVkQlFUbENMRVZCUVcxRE8wRkJRMnBET0VVc1lVRkJUemxGTEVOQlFWQXNTVUZCV1N4TFFVRkxRU3hKUVVGSkswTXNTMEZCVkN4RFFVRmFPMEZCUTBRN1FVRkRSQ3hYUVVGUEswSXNUVUZCVUR0QlFVTkVPMEZCUTBZc1EwRm1SRHM3UVVGcFFrRTdRVUZEUVhKSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2IwTXNSMEZCYWtJc1IwRkJkVUlzVlVGQlZYUkVMRTFCUVZZc1JVRkJhMEk3UVVGRGRrTjFSQ3hWUVVGUlF5eEhRVUZTTEVOQlFWa3NNa1JCUVZvN1FVRkRRU3hUUVVGUExFdEJRVXMzUlN4VFFVRk1MRU5CUVdWeFFpeE5RVUZtTEVOQlFWQTdRVUZEUkN4RFFVaEVPenRCUVV0Qk8wRkJRMEZvUkN4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5WRExFZEJRV3BDTEVkQlFYVkNMRlZCUVZWRExFTkJRVllzUlVGQllURkVMRTFCUVdJc1JVRkJjVUk3UVVGRE1VTjFSQ3hWUVVGUlF5eEhRVUZTTEVOQlFWa3NNa1JCUVZvN1FVRkRRU3hUUVVGUExFdEJRVXRITEZWQlFVd3NRMEZCWjBKRUxFTkJRV2hDTEVWQlFXMUNNVVFzVFVGQmJrSXNRMEZCVUR0QlFVTkVMRU5CU0VRN08wRkJTMEZvUkN4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5aRExGTkJRV3BDTEVkQlFUWkNMRlZCUVZWeFFpeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRka1FzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1MwRkJTeTlDTEUxQlFYSkNMRVZCUVRaQ0xIRkRRVUUzUWp0QlFVTkVPenRCUVVWRUxFMUJRVWtyUWl4VlFVRlZMRXRCUVVzdlFpeE5RVUZ1UWl4RlFVTkZPenRCUVVWR0xGTkJRVThzUzBGQlN5dENMRTFCUVV3c1EwRkJVRHRCUVVORUxFTkJWa1E3TzBGQldVRXNVMEZCVXpaRUxGZEJRVlFzUTBGQmMwSjRSeXhIUVVGMFFpeEZRVUV5UWpKRExFMUJRVE5DTEVWQlFXMURPRVFzV1VGQmJrTXNSVUZCYVVSR0xGRkJRV3BFTEVWQlFUSkVPMEZCUTNwRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeE5RVUZKZFVVc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4TlFVRkpkVUlzUjBGQlNqdEJRVU5CTEUxQlFVbEVMRmxCUVVvc1JVRkJhMEk3UVVGRGFFSkRMRlZCUVUweFJ5eEpRVUZKTWtNc1RVRkJTaXhEUVVGT08wRkJRMEVzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVDBGQlR6RkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1EwRkJNVUk3UVVGRFNDeEhRVXBFTEUxQlNVODdRVUZEVEN0RUxGVkJRVTB4Unl4SlFVRkpNa01zVFVGQlNpeExRVUZsTEVOQlFYSkNPMEZCUTBFc1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1QwRkJUekZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUTBGQlVEdEJRVU5JTzBGQlEwUXNVMEZCVHl0RUxFZEJRVkE3UVVGRFJEczdRVUZGUkM5SExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ09FTXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXaEZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBReXhaUVVGWkxFbEJRVm9zUlVGQmEwSTNSQ3hOUVVGc1FpeEZRVUV3UWl4SlFVRXhRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUlyUXl4WlFVRnFRaXhIUVVGblF5eFZRVUZWYWtVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlF6RkVMRk5CUVU5RExGbEJRVmtzU1VGQldpeEZRVUZyUWpkRUxFMUJRV3hDTEVWQlFUQkNMRXRCUVRGQ0xFVkJRV2xETkVRc1VVRkJha01zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVMDBzVjBGQlZDeERRVUZ6UWpkSExFZEJRWFJDTEVWQlFUSkNNa01zVFVGQk0wSXNSVUZCYlVNNFJDeFpRVUZ1UXl4RlFVRnBSRVlzVVVGQmFrUXNSVUZCTWtRN1FVRkRla1FzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhGRFFVRm9RenRCUVVORU96dEJRVVZFTEUxQlFVbDFSU3hOUVVGTmJrWXNTVUZCU1Zrc1RVRkJaRHRCUVVOQkxFMUJRVWtyUWl4VlFVRlZkME1zUjBGQlpDeEZRVU5GT3p0QlFVVkdMRTFCUVVsMVFpeEhRVUZLTzBGQlEwRXNUVUZCU1VRc1dVRkJTaXhGUVVGclFqdEJRVU5vUWl4UlFVRkpPVVFzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1RVRkJUVEZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNSVUZCZWtJN1FVRkRSaXhSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RFFVRXhRanRCUVVOR0swUXNWMEZCVHpGSExFbEJRVWt5UXl4TlFVRktMRU5CUVZBN1FVRkRRU3hSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhOUVVGTlFTeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhGUVVGdVFpeExRVUV3UWl4RFFVRnFReXhEUVVGT08wRkJRMGdzUjBGU1JDeE5RVkZQTzBGQlEwd3NVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUVUZCVFRGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUlVGQmVrSTdRVUZEUml4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeERRVUV4UWp0QlFVTkdMRkZCUVVsQkxGTkJRVk1zUTBGQlZDeEhRVUZoZDBNc1IwRkJha0lzUlVGRFJYVkNMRTlCUVU4eFJ5eEpRVUZKTWtNc1UwRkJVeXhEUVVGaUxFTkJRVkE3UVVGRFJpdEVMRlZCUVUxQkxFOUJRVTh4Unl4SlFVRkpNa01zVFVGQlNpeExRVUZsTEVWQlFXWXNTMEZCYzBJc1EwRkJOMElzUTBGQlRqdEJRVU5FTzBGQlEwUXNVMEZCVHl0RUxFZEJRVkE3UVVGRFJEczdRVUZGUkM5SExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2FVUXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXNUZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBUU3haUVVGWkxFbEJRVm9zUlVGQmEwSnNSU3hOUVVGc1FpeEZRVUV3UWl4SlFVRXhRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpyUkN4WlFVRnFRaXhIUVVGblF5eFZRVUZWY0VVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlF6RkVMRk5CUVU5TkxGbEJRVmtzU1VGQldpeEZRVUZyUW14RkxFMUJRV3hDTEVWQlFUQkNMRXRCUVRGQ0xFVkJRV2xETkVRc1VVRkJha01zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFtMUVMRkZCUVdwQ0xFZEJRVFJDTEZWQlFWVnlSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZEVRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkRTU3huUWtGRVNqdEJRVVZCVUN4WFFVRlBUeXhUUVVGVExFdEJRVXN2UWl4TlFVRnlRaXhGUVVFMlFpeHhRMEZCTjBJN1FVRkRSRHM3UVVGRlJDeE5RVUZKSzBJc1ZVRkJWU3hMUVVGTEwwSXNUVUZCYmtJc1JVRkRSVHM3UVVGRlJpeE5RVUZKY1Vjc1RVRkJUU3hMUVVGTGRFVXNUVUZCVEN4SlFVRmxMRWxCUVhwQ08wRkJRMEVzVFVGQlNYTkZMRWRCUVVvc1JVRkRSU3hQUVVGUExFTkJRVU1zVDBGQlR5eExRVUZMZEVVc1RVRkJUQ3hEUVVGUUxFZEJRWE5DTEVOQlFYWkNMRWxCUVRSQ0xFTkJRVU1zUTBGQmNFTXNRMEZFUml4TFFVZEZMRTlCUVU4c1MwRkJTMEVzVFVGQlRDeERRVUZRTzBGQlEwZ3NRMEZtUkRzN1FVRnBRa0VzVTBGQlUzVkZMRlZCUVZRc1EwRkJjVUpzU0N4SFFVRnlRaXhGUVVFd1FqSkRMRTFCUVRGQ0xFVkJRV3RET0VRc1dVRkJiRU1zUlVGQlowUkdMRkZCUVdoRUxFVkJRVEJFTzBGQlEzaEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmRVVXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeE5RVUZKZFVJc1RVRkJUVVlzV1VGQldYaEhMRWRCUVZvc1JVRkJhVUl5UXl4TlFVRnFRaXhGUVVGNVFqaEVMRmxCUVhwQ0xFVkJRWFZETEVsQlFYWkRMRU5CUVZZN1FVRkRRU3hOUVVGSlVTeE5RVUZOVUN4TlFVRk5MRTFCUVdoQ08wRkJRMEVzVFVGQlNVOHNSMEZCU2l4RlFVTkZMRTlCUVU4c1EwRkJReXhUUVVGVFVDeEhRVUZVTEVkQlFXVXNRMEZCYUVJc1NVRkJjVUlzUTBGQlF5eERRVUUzUWl4RFFVUkdMRXRCUjBVc1QwRkJUMEVzUjBGQlVEdEJRVU5JT3p0QlFVVkVMMGNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUp6UkN4WFFVRnFRaXhIUVVFclFpeFZRVUZWZUVVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlEzcEVMRk5CUVU5WExGZEJRVmNzU1VGQldDeEZRVUZwUW5aRkxFMUJRV3BDTEVWQlFYbENMRWxCUVhwQ0xFVkJRU3RDTkVRc1VVRkJMMElzUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuVkVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVjZSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMWNzVjBGQlZ5eEpRVUZZTEVWQlFXbENka1VzVFVGQmFrSXNSVUZCZVVJc1MwRkJla0lzUlVGQlowTTBSQ3hSUVVGb1F5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRU3hUUVVGVFl5eFZRVUZVTEVOQlFYRkNja2dzUjBGQmNrSXNSVUZCTUVJeVF5eE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRVJpeFJRVUZvUkN4RlFVRXdSRHRCUVVONFJDeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjVU5CUVdoRE8wRkJRMFE3TzBGQlJVUXNUVUZCU1hWRkxFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTWFZDTEUxQlFVMUhMRmxCUVZrM1J5eEhRVUZhTEVWQlFXbENNa01zVFVGQmFrSXNSVUZCZVVJNFJDeFpRVUY2UWl4RlFVRjFReXhKUVVGMlF5eERRVUZXTzBGQlEwRXNUVUZCU1ZFc1RVRkJUVkFzVFVGQlRTeFZRVUZvUWp0QlFVTkJMRTFCUVVsUExFZEJRVW9zUlVGRFJTeFBRVUZQTEVOQlFVTXNZVUZCWVZBc1IwRkJZaXhIUVVGdFFpeERRVUZ3UWl4SlFVRjVRaXhEUVVGRExFTkJRV3BETEVOQlJFWXNTMEZIUlN4UFFVRlBRU3hIUVVGUU8wRkJRMGc3TzBGQlJVUXZSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlV6UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJNc1YwRkJWeXhKUVVGWUxFVkJRV2xDTVVVc1RVRkJha0lzUlVGQmVVSXNTVUZCZWtJc1JVRkJLMEkwUkN4UlFVRXZRaXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01FUXNWMEZCYWtJc1IwRkJLMElzVlVGQlZUVkZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU42UkN4VFFVRlBZeXhYUVVGWExFbEJRVmdzUlVGQmFVSXhSU3hOUVVGcVFpeEZRVUY1UWl4TFFVRjZRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJMRk5CUVZOcFFpeFZRVUZVTEVOQlFYRkNlRWdzUjBGQmNrSXNSVUZCTUVJeVF5eE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRVJpeFJRVUZvUkN4RlFVRXdSRHRCUVVONFJDeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjVU5CUVdoRE8wRkJRMFE3TzBGQlJVUXNVMEZCVDI1Q0xGRkJRVkZuU1N4SlFVRlNMRU5CUVdGNlNDeEhRVUZpTEVWQlFXdENNa01zVFVGQmJFSXNSVUZCTUVJNFJDeFpRVUV4UWl4RlFVRjNReXhGUVVGNFF5eEZRVUUwUXl4RFFVRTFReXhEUVVGUU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRalpFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlV2UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJsQ0xGZEJRVmNzU1VGQldDeEZRVUZwUWpkRkxFMUJRV3BDTEVWQlFYbENMRWxCUVhwQ0xFVkJRU3RDTkVRc1VVRkJMMElzUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqaEVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVm9SaXhOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMmxDTEZkQlFWY3NTVUZCV0N4RlFVRnBRamRGTEUxQlFXcENMRVZCUVhsQ0xFdEJRWHBDTEVWQlFXZERORVFzVVVGQmFFTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUzRkNMRmRCUVZRc1EwRkJjMEkxU0N4SFFVRjBRaXhGUVVFeVFqSkRMRTFCUVROQ0xFVkJRVzFET0VRc1dVRkJia01zUlVGQmFVUkdMRkZCUVdwRUxFVkJRVEpFTzBGQlEzcEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hUUVVGUGJrSXNVVUZCVVdkSkxFbEJRVklzUTBGQllYcElMRWRCUVdJc1JVRkJhMEl5UXl4TlFVRnNRaXhGUVVFd1FqaEVMRmxCUVRGQ0xFVkJRWGRETEVWQlFYaERMRVZCUVRSRExFTkJRVFZETEVOQlFWQTdRVUZEUkRzN1FVRkZSRGxITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDWjBVc1dVRkJha0lzUjBGQlowTXNWVUZCVld4R0xFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUGNVSXNXVUZCV1N4SlFVRmFMRVZCUVd0Q2FrWXNUVUZCYkVJc1JVRkJNRUlzU1VGQk1VSXNSVUZCWjBNMFJDeFJRVUZvUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhVVVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWVzVHTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQY1VJc1dVRkJXU3hKUVVGYUxFVkJRV3RDYWtZc1RVRkJiRUlzUlVGQk1FSXNTMEZCTVVJc1JVRkJhVU0wUkN4UlFVRnFReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2VVTXNWVUZCYWtJc1IwRkJPRUlzVlVGQlZYbENMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlF5OUVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFdEJRVXN2UWl4TlFVRnlRaXhGUVVFMlFpeHpRMEZCTjBJN1FVRkRRVzlJTEdOQlFWVkVMRXRCUVZZc1JVRkJhVUlzU1VGQmFrSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmNFWXNWVUZCVlN4TFFVRkxMMElzVFVGQmJrSXNSVUZCTWtJN08wRkJSVE5DTEU5QlFVc3JRaXhOUVVGTUxFbEJRV1Z2Uml4TFFVRm1PMEZCUTBRc1EwRllSRHM3UVVGaFFTeFRRVUZUUlN4WlFVRlVMRU5CUVhWQ2Fra3NSMEZCZGtJc1JVRkJORUlyU0N4TFFVRTFRaXhGUVVGdFEzQkdMRTFCUVc1RExFVkJRVEpET0VRc1dVRkJNME1zUlVGQmVVUkdMRkZCUVhwRUxFVkJRVzFGTzBGQlEycEZMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4elEwRkJhRU03UVVGRFFXOUlMR05CUVZWRUxFdEJRVllzUlVGQmFVSXNUVUZCYWtJN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4UFFVRkxMRWxCUVVscVJTeEpRVUZKTEVOQlFWSXNSVUZCVjJkSUxFbEJRVWt6UXl4TFFVRkxReXhIUVVGTUxFTkJRVk5NTEUxQlFVMTRReXhOUVVGbUxFVkJRWFZDTEVOQlFYWkNMRU5CUVhCQ0xFVkJRU3REZWtJc1NVRkJTV2RJTEVOQlFXNUVMRVZCUVhORWFFZ3NSMEZCZEVRc1JVRkJNa1E3UVVGRGVrUnNRaXhSUVVGSk1rTXNVMEZCVTNwQ0xFTkJRV0lzU1VGRFNTeERRVUZETmtjc1VVRkJVeXhSUVVGVExFdEJRVXQwUWl4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVFMVFpeERRVUZ1UWl4TlFVTkpMRU5CUVVOMVJpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRjRRaXhKUVVFMlFpeERRVVp5UXp0QlFVZEVPMEZCUTBZN08wRkJSVVIyUWl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5ORkxHRkJRV3BDTEVkQlFXbERMRlZCUVZWS0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJ4Rk1FSXNaVUZCWVN4SlFVRmlMRVZCUVcxQ1JpeExRVUZ1UWl4RlFVRXdRbkJHTEUxQlFURkNMRVZCUVd0RExFbEJRV3hETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSjFSU3hoUVVGcVFpeEhRVUZwUXl4VlFVRlZUQ3hMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVEJDTEdWQlFXRXNTVUZCWWl4RlFVRnRRa1lzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJReXhMUVVGc1F5eEZRVUY1UXpSRUxGRkJRWHBETzBGQlEwUXNRMEZHUkRzN1FVRkpRU3hUUVVGVE9FSXNXVUZCVkN4RFFVRjFRbkpKTEVkQlFYWkNMRVZCUVRSQ0swZ3NTMEZCTlVJc1JVRkJiVU53Uml4TlFVRnVReXhGUVVFeVF6aEVMRmxCUVRORExFVkJRWGxFUml4UlFVRjZSQ3hGUVVGdFJUdEJRVU5xUlN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUekpHTEZWQlFWVnVSeXhUUVVGV0xFbEJRWFZDYlVjc1ZVRkJWU3hKUVVGNFF5eEZRVUU0UXl4bFFVRTVRenRCUVVOQk0wWXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjME5CUVdoRE8wRkJRMEZ2U0N4alFVRlZSQ3hMUVVGV0xFVkJRV2xDTEZWQlFXcENPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUMEZCU3l4SlFVRkpha1VzU1VGQlNTeERRVUZTTEVWQlFWZG5TQ3hKUVVGSk0wTXNTMEZCUzBNc1IwRkJUQ3hEUVVGVFRDeE5RVUZOZUVNc1RVRkJaaXhGUVVGMVFpeERRVUYyUWl4RFFVRndRaXhGUVVFclEzcENMRWxCUVVsblNDeERRVUZ1UkN4RlFVRnpSR2hJTEVkQlFYUkVMRVZCUVRKRU8wRkJRM3BFYkVJc1VVRkJTVEpETEZOQlFWTjZRaXhEUVVGaUxFbEJRMHMyUnl4VlFVRlZMRU5CUVVOMFFpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRjRRaXhKUVVFMlFpeERRVUY0UXl4SFFVRTJReXhKUVVScVJEdEJRVVZFTzBGQlEwWTdPMEZCUlVSMlFpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEZMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVlFMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEyeEZPRUlzWlVGQllTeEpRVUZpTEVWQlFXMUNUaXhMUVVGdVFpeEZRVUV3UW5CR0xFMUJRVEZDTEVWQlFXdERMRWxCUVd4RExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUl3UlN4aFFVRnFRaXhIUVVGcFF5eFZRVUZWVWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRoQ0xHVkJRV0VzU1VGQllpeEZRVUZ0UWs0c1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXl4TFFVRnNReXhGUVVGNVF6UkVMRkZCUVhwRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01rVXNVMEZCYWtJc1IwRkJOa0lzVlVGQlZWUXNTMEZCVml4RlFVRnBRbkJHTEUxQlFXcENMRVZCUVhsQ05FUXNVVUZCZWtJc1JVRkJiVU03UVVGRE9VUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1MwRkJTeTlDTEUxQlFYSkNMRVZCUVRaQ0xITkRRVUUzUWp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhKUVVGcVFpeEZRVUYxUWl4RFFVRkRMRWxCUVhoQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1hCR0xGVkJRVlVzUzBGQlN5OUNMRTFCUVc1Q0xFVkJRMFU3TzBGQlJVWXNUVUZCU1cxSUxGTkJRVk1zUTBGQllpeEZRVU5GTEV0QlFVdDZRaXhWUVVGTUxFTkJRV2RDZVVJc1MwRkJhRUlzUlVGQmRVSndSaXhOUVVGMlFpeEZRVUVyUWpSRUxGRkJRUzlDTEVWQlJFWXNTMEZIUlN4TFFVRkxSQ3hWUVVGTUxFTkJRV2RDTEU5QlFVOTVRaXhMUVVGUUxFZEJRV1VzUTBGQkwwSXNSVUZCYTBOd1JpeE5RVUZzUXl4RlFVRXdRelJFTEZGQlFURkRPMEZCUTBnc1EwRm1SRHM3UVVGcFFrRXNVMEZCVTIxRExGZEJRVlFzUTBGQmMwSXhTU3hIUVVGMFFpeEZRVUV5UWl0SUxFdEJRVE5DTEVWQlFXdERjRVlzVFVGQmJFTXNSVUZCTUVNNFJDeFpRVUV4UXl4RlFVRjNSRVlzVVVGQmVFUXNSVUZCYTBVN1FVRkRhRVVzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExITkRRVUZvUXp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhOUVVGcVFpeEZRVUY1UWl4RFFVRkRMRTFCUVRGQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTVFJETEZOQlFWTXNRMEZCWWl4RlFVTkZSU3hoUVVGaGFra3NSMEZCWWl4RlFVRnJRaXRJTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU00UkN4WlFVRnFReXhGUVVFclEwWXNVVUZCTDBNc1JVRkVSaXhMUVVkRk1FSXNZVUZCWVdwSkxFZEJRV0lzUlVGQmEwSXNVMEZCVXl0SUxFdEJRVlFzUjBGQmFVSXNRMEZCYmtNc1JVRkJjME53Uml4TlFVRjBReXhGUVVFNFF6aEVMRmxCUVRsRExFVkJRVFJFUml4UlFVRTFSRHRCUVVOSU96dEJRVVZFTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJNFJTeFpRVUZxUWl4SFFVRm5ReXhWUVVGVldpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJXMURMR05CUVZrc1NVRkJXaXhGUVVGclFsZ3NTMEZCYkVJc1JVRkJlVUp3Uml4TlFVRjZRaXhGUVVGcFF5eEpRVUZxUXl4RlFVRjFRelJFTEZGQlFYWkRPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENLMFVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV0lzUzBGQlZpeEZRVUZwUW5CR0xFMUJRV3BDTEVWQlFYbENORVFzVVVGQmVrSXNSVUZCYlVNN1FVRkRha1Z0UXl4alFVRlpMRWxCUVZvc1JVRkJhMEpZTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zUzBGQmFrTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUzTkRMRmRCUVZRc1EwRkJjMEkzU1N4SFFVRjBRaXhGUVVFeVFpdElMRXRCUVROQ0xFVkJRV3REY0VZc1RVRkJiRU1zUlVGQk1FTTRSQ3haUVVFeFF5eEZRVUYzUkVZc1VVRkJlRVFzUlVGQmEwVTdRVUZEYUVVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSE5EUVVGb1F6dEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4VlFVRnFRaXhGUVVFMlFpeERRVUZETEZWQlFUbENPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1RSRExGTkJRVk1zUTBGQllpeEZRVU5GVFN4aFFVRmhja2tzUjBGQllpeEZRVUZyUWl0SUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNNFJDeFpRVUZxUXl4RlFVRXJRMFlzVVVGQkwwTXNSVUZFUml4TFFVZEZPRUlzWVVGQllYSkpMRWRCUVdJc1JVRkJhMElzWVVGQllTdElMRXRCUVdJc1IwRkJjVUlzUTBGQmRrTXNSVUZCTUVOd1JpeE5RVUV4UXl4RlFVRnJSRGhFTEZsQlFXeEVMRVZCUVdkRlJpeFJRVUZvUlR0QlFVTklPenRCUVVWRU5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnBSaXhaUVVGcVFpeEhRVUZuUXl4VlFVRlZaaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWE5ETEdOQlFWa3NTVUZCV2l4RlFVRnJRbVFzUzBGQmJFSXNSVUZCZVVKd1JpeE5RVUY2UWl4RlFVRnBReXhKUVVGcVF5eEZRVUYxUXpSRUxGRkJRWFpETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYTBZc1dVRkJha0lzUjBGQlowTXNWVUZCVldoQ0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJwRmMwTXNZMEZCV1N4SlFVRmFMRVZCUVd0Q1pDeExRVUZzUWl4RlFVRjVRbkJHTEUxQlFYcENMRVZCUVdsRExFdEJRV3BETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk41UXl4WFFVRlVMRU5CUVhOQ2FFb3NSMEZCZEVJc1JVRkJNa0lyU0N4TFFVRXpRaXhGUVVGclEzQkdMRTFCUVd4RExFVkJRVEJET0VRc1dVRkJNVU1zUlVGQmQwUkdMRkZCUVhoRUxFVkJRV3RGTzBGQlEyaEZMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4elEwRkJhRU03UVVGRFFYRkpMR2xDUVVGaGJFSXNTMEZCWWl4RlFVRnZRaXh6UWtGQmNFSXNSVUZCTkVNc1EwRkJReXh6UWtGQk4wTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJqRkdMRlZCUVZFNFFpeExRVUZTTEVOQlFXTjJRaXhIUVVGa0xFVkJRVzFDSzBnc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVMRVZCUVdoRUxFVkJRVzlFTEVOQlFYQkVPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5GR0xGbEJRV3BDTEVkQlFXZERMRlZCUVZWdVFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYbERMR05CUVZrc1NVRkJXaXhGUVVGclFtcENMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTVUZCYWtNc1JVRkJkVU0wUkN4UlFVRjJRenRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbk5HTEZsQlFXcENMRWRCUVdkRExGVkJRVlZ3UWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhsRExHTkJRVmtzU1VGQldpeEZRVUZyUW1wQ0xFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1MwRkJha01zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVelpETEZsQlFWUXNRMEZCZFVKd1NpeEhRVUYyUWl4RlFVRTBRaXRJTEV0QlFUVkNMRVZCUVcxRGNFWXNUVUZCYmtNc1JVRkJNa000UkN4WlFVRXpReXhGUVVGNVJFWXNVVUZCZWtRc1JVRkJiVVU3UVVGRGFrVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRMGtzYzBOQlJFbzdRVUZGUVhGSkxHbENRVUZoYkVJc1MwRkJZaXhGUVVGdlFpeDFRa0ZCY0VJc1JVRkJOa01zUTBGQlF5eDFRa0ZCT1VNN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUmpGR0xGVkJRVkU0UWl4TFFVRlNMRU5CUVdOMlFpeEhRVUZrTEVWQlFXMUNLMGdzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRUxFVkJRV2hFTEVWQlFXOUVMRU5CUVhCRU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmRHTEdGQlFXcENMRWRCUVdsRExGVkJRVlYwUWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRaRExHVkJRV0VzU1VGQllpeEZRVUZ0UW5KQ0xFdEJRVzVDTEVWQlFUQkNjRVlzVFVGQk1VSXNSVUZCYTBNc1NVRkJiRU1zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEdMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVjJRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVFpETEdWQlFXRXNTVUZCWWl4RlFVRnRRbkpDTEV0QlFXNUNMRVZCUVRCQ2NFWXNUVUZCTVVJc1JVRkJhME1zUzBGQmJFTXNSVUZCZVVNMFJDeFJRVUY2UXp0QlFVTkVMRU5CUmtRN08wRkJTVUU3UVVGRFFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNRVlzU1VGQmFrSXNSMEZCZDBJc1ZVRkJWWGhDTEV0QlFWWXNSVUZCYVVJNVJDeExRVUZxUWl4RlFVRjNRa01zUjBGQmVFSXNSVUZCTmtJN1FVRkRia1FzVFVGQlNTeERRVUZETmtRc1MwRkJUQ3hGUVVGWlFTeFJRVUZSTEVOQlFWSTdRVUZEV2l4TlFVRkpMRU5CUVVNNVJDeExRVUZNTEVWQlFWbEJMRkZCUVZFc1EwRkJVanRCUVVOYUxFMUJRVWtzUTBGQlEwTXNSMEZCVEN4RlFVRlZRU3hOUVVGTkxFdEJRVXQwUkN4TlFVRllPenRCUVVWV0xFMUJRVWtzVDBGQlQyMUlMRXRCUVZBc1MwRkJhVUlzVVVGQmNrSXNSVUZCSzBJN1FVRkROMEpCTEZsQlFWRkJMRTFCUVUxNVFpeFZRVUZPTEVOQlFXbENMRU5CUVdwQ0xFTkJRVkk3UVVGRFJEczdRVUZGUkhCSUxGTkJRVThzVDBGQlR6SkdMRXRCUVZBc1MwRkJhVUlzVVVGQmFrSXNTVUZCTmtJc1EwRkJRemRGTEUxQlFVMDJSU3hMUVVGT0xFTkJRWEpETEVWQlFXMUVMSFZDUVVGdVJEdEJRVU5CTTBZc1UwRkJUemhDTEU5QlFVOUVMRXRCUVdRc1JVRkJjVUlzWVVGQmNrSTdPMEZCUlVFN1FVRkRRU3hOUVVGSlF5eFJRVUZSUkN4TFFVRmFMRVZCUVcxQ08wRkJRMjVDTEUxQlFVa3NTMEZCUzNKRUxFMUJRVXdzUzBGQlowSXNRMEZCY0VJc1JVRkJkVUk3TzBGQlJYWkNkMElzVTBGQlR6WkNMRk5CUVZNc1EwRkJWQ3hKUVVGalFTeFJRVUZSTEV0QlFVdHlSQ3hOUVVGc1F5eEZRVUV3UXl4eFFrRkJNVU03UVVGRFFYZENMRk5CUVU4NFFpeFBRVUZQTEVOQlFWQXNTVUZCV1VFc1QwRkJUeXhMUVVGTGRFUXNUVUZCTDBJc1JVRkJkVU1zYlVKQlFYWkRPenRCUVVWQkxFOUJRVXNzU1VGQlNVMHNTVUZCU1N0RExFdEJRV0lzUlVGQmIwSXZReXhKUVVGSlowUXNSMEZCZUVJc1JVRkJOa0pvUkN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUXl4VFFVRkxRU3hEUVVGTUxFbEJRVlUyUnl4TFFVRldPMEZCUTBRN1FVRkRSaXhEUVhSQ1JEczdRVUYzUWtGd1NTeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqUkdMRTlCUVdwQ0xFZEJRVEpDTEZsQlFWazdRVUZEY2tNc1RVRkJTVGxFTEUxQlFVMHNSVUZCVmp0QlFVTkJMRTFCUVVsU0xFMUJRVTBzUzBGQlMzWkZMRTFCUVdZN1FVRkRRU3hQUVVGTExFbEJRVWxOTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNXbEZMRWRCUVhCQ0xFVkJRWGxDYWtVc1IwRkJla0lzUlVGQk9FSTdRVUZETlVKNVJTeFJRVUZKZWtVc1EwRkJTaXhKUVVGVE1FVXNUVUZCVFN4TFFVRkxNVVVzUTBGQlRDeERRVUZPTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hOUVVGTmVFSXNVVUZCVVVjc2FVSkJRV3hDTEVWQlFYRkRPMEZCUTI1RE9FWXNWVUZCU1hwRkxFbEJRVWtzUTBGQlVpeEpRVUZoTEV0QlFXSTdRVUZEUVR0QlFVTkVPMEZCUTBZN1FVRkRSQ3hUUVVGUExHRkJRV0Y1UlN4SlFVRkpLMFFzU1VGQlNpeERRVUZUTEVkQlFWUXNRMEZCWWl4SFFVRTJRaXhIUVVGd1F6dEJRVU5FTEVOQldFUTdPMEZCWVVFN096czdRVUZKUVM5S0xFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ09FWXNZVUZCYWtJc1IwRkJhVU1zV1VGQldUdEJRVU16UXl4TlFVRkpMRTlCUVU5NFNpeFZRVUZRTEV0QlFYTkNMRmRCUVRGQ0xFVkJRWFZETzBGQlEzSkRMRkZCUVVsU0xFOUJRVTlKTEdWQlFWZ3NSVUZCTkVJN1FVRkRNVUlzWVVGQlVTeEpRVUZKU2l4TlFVRktMRU5CUVZjc1NVRkJXQ3hEUVVGRUxFTkJRVzFDYVVzc1RVRkJNVUk3UVVGRFJDeExRVVpFTEUxQlJVODdRVUZEVEN4VlFVRkpOVW9zVFVGQlRTeEpRVUZKUnl4VlFVRktMRU5CUVdVc1MwRkJTMU1zVFVGQmNFSXNRMEZCVmp0QlFVTkJMRmRCUVVzc1NVRkJTVTBzU1VGQlNTeERRVUZTTEVWQlFWZHBSU3hOUVVGTmJrWXNTVUZCU1Zrc1RVRkJNVUlzUlVGQmEwTk5MRWxCUVVscFJTeEhRVUYwUXl4RlFVRXlRMnBGTEV0QlFVc3NRMEZCYUVRN1FVRkRSV3hDTEZsQlFVbHJRaXhEUVVGS0xFbEJRVk1zUzBGQlMwRXNRMEZCVEN4RFFVRlVPMEZCUkVZc1QwRkZRU3hQUVVGUGJFSXNTVUZCU1RSS0xFMUJRVmc3UVVGRFJEdEJRVU5HTEVkQlZFUXNUVUZUVHp0QlFVTk1MRlZCUVUwc1NVRkJTVGRKTEV0QlFVb3NRMEZCVlN4dlJFRkJWaXhEUVVGT08wRkJRMFE3UVVGRFJpeERRV0pFT3p0QlFXVkJPMEZCUTBFN08wRkJSVUVzVTBGQlUwb3NWVUZCVkN4RFFVRnhRbXRDTEVkQlFYSkNMRVZCUVRCQ08wRkJRM2hDTEUxQlFVbEJMRWxCUVVsblNTeEpRVUZTTEVWQlFXTXNUMEZCVDJoSkxFbEJRVWxuU1N4SlFVRktMRVZCUVZBN1FVRkRaQ3hUUVVGUGFFa3NTVUZCU1dsSkxFOUJRVW9zUTBGQldTeFpRVUZhTEVWQlFUQkNMRVZCUVRGQ0xFTkJRVkE3UVVGRFJEczdRVUZGUkN4SlFVRkpReXhMUVVGTGNFc3NUMEZCVDJ0RkxGTkJRV2hDT3p0QlFVVkJPenM3UVVGSFFXeEZMRTlCUVU5eFFpeFJRVUZRTEVkQlFXdENMRlZCUVZWa0xFZEJRVllzUlVGQlpUdEJRVU12UWtFc1RVRkJTV1VzVTBGQlNpeEhRVUZuUWl4SlFVRm9RanM3UVVGRlFUdEJRVU5CWml4TlFVRkpPRW9zU1VGQlNpeEhRVUZYT1Vvc1NVRkJTU3RHTEVkQlFXWTdRVUZEUVM5R0xFMUJRVWxwUWl4SlFVRktMRWRCUVZkcVFpeEpRVUZKYTBjc1IwRkJaanM3UVVGRlFUdEJRVU5CYkVjc1RVRkJTU3RHTEVkQlFVb3NSMEZCVlRoRUxFZEJRVWM1UkN4SFFVRmlPMEZCUTBFdlJpeE5RVUZKYTBjc1IwRkJTaXhIUVVGVk1rUXNSMEZCUnpORUxFZEJRV0k3TzBGQlJVRnNSeXhOUVVGSmNVSXNTMEZCU2l4SFFVRlpkMGtzUjBGQlIzaEpMRXRCUVdZN1FVRkRRWEpDTEUxQlFVazRSQ3hSUVVGS0xFZEJRV1VyUml4SFFVRkhMMFlzVVVGQmJFSTdRVUZEUVRsRUxFMUJRVWtyU2l4alFVRktMRWRCUVhGQ1JpeEhRVUZITDBZc1VVRkJlRUk3UVVGRFFUbEVMRTFCUVVsM1JTeE5RVUZLTEVkQlFXRnhSaXhIUVVGSGNrWXNUVUZCYUVJN1FVRkRRWGhGTEUxQlFVbHpReXhKUVVGS0xFZEJRVmQxU0N4SFFVRkhka2dzU1VGQlpEdEJRVU5CZEVNc1RVRkJTVEpGTEV0QlFVb3NSMEZCV1d0R0xFZEJRVWRzUml4TFFVRm1PMEZCUTBFelJTeE5RVUZKYjBJc1UwRkJTaXhIUVVGblFubEpMRWRCUVVkNlNTeFRRVUZ1UWp0QlFVTkJjRUlzVFVGQlNYbEhMRmxCUVVvc1IwRkJiVUp2UkN4SFFVRkhjRVFzV1VGQmRFSTdRVUZEUVhwSExFMUJRVWt3Unl4WlFVRktMRWRCUVcxQ2JVUXNSMEZCUjI1RUxGbEJRWFJDTzBGQlEwRXhSeXhOUVVGSk5FY3NXVUZCU2l4SFFVRnRRbWxFTEVkQlFVZHFSQ3haUVVGMFFqdEJRVU5CTlVjc1RVRkJTVFpITEZsQlFVb3NSMEZCYlVKblJDeEhRVUZIYUVRc1dVRkJkRUk3UVVGRFFUZEhMRTFCUVVrNFJ5eFJRVUZLTEVkQlFXVXJReXhIUVVGSEwwTXNVVUZCYkVJN1FVRkRRVGxITEUxQlFVbHBTQ3hYUVVGS0xFZEJRV3RDTkVNc1IwRkJSelZETEZkQlFYSkNPMEZCUTBGcVNDeE5RVUZKYTBnc1YwRkJTaXhIUVVGclFqSkRMRWRCUVVjelF5eFhRVUZ5UWp0QlFVTkJiRWdzVFVGQlNXOUlMRmRCUVVvc1IwRkJhMEo1UXl4SFFVRkhla01zVjBGQmNrSTdRVUZEUVhCSUxFMUJRVWx4U0N4WFFVRktMRWRCUVd0Q2QwTXNSMEZCUjNoRExGZEJRWEpDTzBGQlEwRnlTQ3hOUVVGSmQwZ3NWMEZCU2l4SFFVRnJRbkZETEVkQlFVZHlReXhYUVVGeVFqdEJRVU5CZUVnc1RVRkJTWGxJTEZkQlFVb3NSMEZCYTBKdlF5eEhRVUZIY0VNc1YwRkJja0k3UVVGRFFYcElMRTFCUVVreVNDeFpRVUZLTEVkQlFXMUNhME1zUjBGQlIyeERMRmxCUVhSQ08wRkJRMEV6U0N4TlFVRkpORWdzV1VGQlNpeEhRVUZ0UW1sRExFZEJRVWRxUXl4WlFVRjBRanRCUVVOQk5VZ3NUVUZCU1c5SExGVkJRVW9zUjBGQmFVSjVSQ3hIUVVGSGVrUXNWVUZCY0VJN1FVRkRRWEJITEUxQlFVbHBTU3hoUVVGS0xFZEJRVzlDTkVJc1IwRkJSelZDTEdGQlFYWkNPMEZCUTBGcVNTeE5RVUZKYTBrc1lVRkJTaXhIUVVGdlFqSkNMRWRCUVVjelFpeGhRVUYyUWp0QlFVTkJiRWtzVFVGQlNXOUpMR0ZCUVVvc1IwRkJiMEo1UWl4SFFVRkhla0lzWVVGQmRrSTdRVUZEUVhCSkxFMUJRVWx4U1N4aFFVRktMRWRCUVc5Q2QwSXNSMEZCUjNoQ0xHRkJRWFpDTzBGQlEwRnlTU3hOUVVGSmMwa3NVMEZCU2l4SFFVRm5RblZDTEVkQlFVZDJRaXhUUVVGdVFqdEJRVU5CZEVrc1RVRkJTWGxKTEZsQlFVb3NSMEZCYlVKdlFpeEhRVUZIY0VJc1dVRkJkRUk3UVVGRFFYcEpMRTFCUVVrd1NTeFpRVUZLTEVkQlFXMUNiVUlzUjBGQlIyNUNMRmxCUVhSQ08wRkJRMEV4U1N4TlFVRkpORWtzV1VGQlNpeEhRVUZ0UW1sQ0xFZEJRVWRxUWl4WlFVRjBRanRCUVVOQk5Va3NUVUZCU1RaSkxGbEJRVW9zUjBGQmJVSm5RaXhIUVVGSGFFSXNXVUZCZEVJN1FVRkRRVGRKTEUxQlFVbG5TaXhaUVVGS0xFZEJRVzFDWVN4SFFVRkhZaXhaUVVGMFFqdEJRVU5CYUVvc1RVRkJTV2xLTEZsQlFVb3NSMEZCYlVKWkxFZEJRVWRhTEZsQlFYUkNPMEZCUTBGcVNpeE5RVUZKYlVvc1lVRkJTaXhIUVVGdlFsVXNSMEZCUjFZc1lVRkJka0k3UVVGRFFXNUtMRTFCUVVsdlNpeGhRVUZLTEVkQlFXOUNVeXhIUVVGSFZDeGhRVUYyUWp0QlFVTkJjRW9zVFVGQlNYRktMRWxCUVVvc1IwRkJWMUVzUjBGQlIxSXNTVUZCWkR0QlFVTkJja29zVFVGQlNYVktMRTlCUVVvc1IwRkJZMDBzUjBGQlIwNHNUMEZCYWtJN1FVRkRRWFpLTEUxQlFVbDVTaXhoUVVGS0xFZEJRVzlDU1N4SFFVRkhTaXhoUVVGMlFqczdRVUZGUVN4VFFVRlBla29zUjBGQlVEdEJRVU5FTEVOQmJFUkVPenRCUVc5RVFUdEJRVU5CTEZOQlFWTTBSaXhMUVVGVUxFTkJRV2RDYjBVc1MwRkJhRUlzUlVGQmRVSXZSU3hIUVVGMlFpeEZRVUUwUW1kR0xGbEJRVFZDTEVWQlFUQkRPMEZCUTNoRExFMUJRVWtzVDBGQlQwUXNTMEZCVUN4TFFVRnBRaXhSUVVGeVFpeEZRVUVyUWl4UFFVRlBReXhaUVVGUU8wRkJReTlDUkN4VlFVRlJMRU5CUVVNc1EwRkJRMEVzUzBGQlZpeERRVVozUXl4RFFVVjBRanRCUVVOc1FpeE5RVUZKUVN4VFFVRlRMMFVzUjBGQllpeEZRVUZyUWl4UFFVRlBRU3hIUVVGUU8wRkJRMnhDTEUxQlFVa3JSU3hUUVVGVExFTkJRV0lzUlVGQlowSXNUMEZCVDBFc1MwRkJVRHRCUVVOb1FrRXNWMEZCVXk5RkxFZEJRVlE3UVVGRFFTeE5RVUZKSzBVc1UwRkJVeXhEUVVGaUxFVkJRV2RDTEU5QlFVOUJMRXRCUVZBN1FVRkRhRUlzVTBGQlR5eERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM0pLTEUxQlFWUXNRMEZCYVVKRUxFMUJRV3BDTEVWQlFYbENPMEZCUTNaQ08wRkJRMEU3UVVGRFFUdEJRVU5CUVN4WFFVRlRMRU5CUVVNc1EwRkJRekpGTEV0QlFVczJSU3hKUVVGTUxFTkJRVlVzUTBGQlEzaEtMRTFCUVZnc1EwRkJXRHRCUVVOQkxGTkJRVTlCTEZOQlFWTXNRMEZCVkN4SFFVRmhMRU5CUVdJc1IwRkJhVUpCTEUxQlFYaENPMEZCUTBRN08wRkJSVVFzVTBGQlUzbENMRTlCUVZRc1EwRkJhMEk1UWl4UFFVRnNRaXhGUVVFeVFqdEJRVU42UWl4VFFVRlBMRU5CUVVOeFJTeE5RVUZOZGtNc1QwRkJUaXhKUVVGcFFpeFZRVUZWT1VJc1QwRkJWaXhGUVVGdFFqdEJRVU14UXl4WFFVRlBPRW9zVDBGQlQzaEhMRk5CUVZBc1EwRkJhVUpITEZGQlFXcENMRU5CUVRCQ1l5eEpRVUV4UWl4RFFVRXJRblpGTEU5QlFTOUNMRTFCUVRSRExHZENRVUZ1UkR0QlFVTkVMRWRCUmswc1JVRkZTa0VzVDBGR1NTeERRVUZRTzBGQlIwUTdPMEZCUlVRc1UwRkJVMkVzVlVGQlZDeERRVUZ4UW1Jc1QwRkJja0lzUlVGQk9FSTdRVUZETlVJc1UwRkJUemhDTEZGQlFWRTVRaXhQUVVGU0xFdEJRVzlDV2l4UFFVRlBNRUlzVVVGQlVDeERRVUZuUW1Rc1QwRkJhRUlzUTBGQmNFSXNTVUZEU0VFc1YwRkJWeXhSUVVGUFFTeFBRVUZRTEhsRFFVRlBRU3hQUVVGUUxFOUJRVzFDTEZGQlFUbENMRWxCUTBFc1QwRkJUMEVzVVVGQlVVc3NUVUZCWml4TFFVRXdRaXhSUVVZNVFqdEJRVWRFT3p0QlFVVkVMRk5CUVZOblJpeExRVUZVTEVOQlFXZENNRVVzUTBGQmFFSXNSVUZCYlVJN1FVRkRha0lzVFVGQlNVRXNTVUZCU1N4RlFVRlNMRVZCUVZrc1QwRkJUeXhOUVVGTlFTeEZRVUZGZEVjc1VVRkJSaXhEUVVGWExFVkJRVmdzUTBGQllqdEJRVU5hTEZOQlFVOXpSeXhGUVVGRmRFY3NVVUZCUml4RFFVRlhMRVZCUVZnc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTnFReXhYUVVGVUxFTkJRWE5DUml4SFFVRjBRaXhGUVVFeVFqdEJRVU42UWl4TlFVRkpNRWtzV1VGQldTeEZRVUZvUWp0QlFVTkJMRTlCUVVzc1NVRkJTWEpLTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNWY3NTVUZCU1dwQ0xFMUJRWGhDTEVWQlFXZERUU3hIUVVGb1F5eEZRVUZ4UXp0QlFVTnVReXhSUVVGSlV5eEpRVUZKUlN4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhEUVVGU08wRkJRMEVzVVVGQlNWTXNTMEZCU3l4SlFVRlVMRVZCUTBVMFNTeFZRVUZWUXl4SlFVRldMRU5CUVdVelNTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4RFFVRm1MRVZCUkVZc1MwRkZTenRCUVVOSUxGVkJRVWtyUXl4UlFVRlJMME1zUTBGQldqdEJRVU5CTEZWQlFVbFRMRXRCUVVzc1RVRkJUQ3hKUVVGbFFTeExRVUZMTEUxQlFYaENMRVZCUVdkRFZEdEJRVU5vUXl4VlFVRkpkVW9zU1VGQlNVTXNiVUpCUVcxQ04wa3NTVUZCU1dkRUxFdEJRVW9zUTBGQlZWb3NTMEZCVml4RlFVRnBRaTlETEVsQlFVVXNRMEZCYmtJc1EwRkJia0lzUlVGQk1FTXJRaXhOUVVFeFF5eERRVUZwUkN4RFFVRnFSQ3hGUVVGdlJEQklMRXRCUVhCRUxFTkJRVEJFTEVkQlFURkVMRU5CUVZJN1FVRkRRU3hYUVVGTExFbEJRVWw2UXl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbDFReXhGUVVGRk4wb3NUVUZCZEVJc1JVRkJPRUp6U0N4SFFVRTVRanRCUVVORmNVTXNhMEpCUVZWRExFbEJRVllzUTBGQlpYaElMRk5CUVZONVNDeEZRVUZGZGtNc1EwRkJSaXhEUVVGVUxFVkJRV1VzUlVGQlppeERRVUZtTzBGQlJFWTdRVUZGUkR0QlFVTkdPMEZCUTBRc1UwRkJUM0ZETEZOQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVEwwY3NXVUZCVkN4RFFVRjFRak5DTEVkQlFYWkNMRVZCUVRSQ08wRkJRekZDTEUxQlFVa3dTU3haUVVGWkxFVkJRV2hDTzBGQlEwRXNUMEZCU3l4SlFVRkpja29zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlZ5eEpRVUZKYWtJc1RVRkJlRUlzUlVGQlowTk5MRWRCUVdoRExFVkJRWEZETzBGQlEyNURPMEZCUTBGeFNpeGpRVUZWUXl4SlFVRldMRU5CUVdVelNTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4SlFVRnZRaXhKUVVGdVF6dEJRVU5FTzBGQlEwUXNVMEZCVDNGS0xGTkJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRNMGNzWTBGQlZDeERRVUY1UWk5Q0xFZEJRWHBDTEVWQlFUaENPMEZCUXpWQ0xFMUJRVWtyU1N4RFFVRktMRVZCUVU5RExFVkJRVkFzUlVGQlYwTXNSVUZCV0R0QlFVTkJMRTFCUVVsUUxGbEJRVmtzUlVGQmFFSTdRVUZEUVN4UFFVRkxMRWxCUVVseVNpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxYTEVsQlFVbHFRaXhOUVVGNFFpeEZRVUZuUTAwc1IwRkJhRU1zUlVGQmNVTTdRVUZEYmtNd1NpeFJRVUZKTDBrc1NVRkJTVEpJTEZWQlFVb3NRMEZCWlhSSkxFTkJRV1lzUTBGQlNqdEJRVU5CTWtvc1UwRkJTMFFzUzBGQlN5eERRVUZXTzBGQlEwRkZMRk5CUVV0R0xFbEJRVWtzUjBGQlZEdEJRVU5CVEN4alFVRlZReXhKUVVGV0xFTkJRV1ZOTEVWQlFXWTdRVUZEUVZBc1kwRkJWVU1zU1VGQlZpeERRVUZsU3l4RlFVRm1PMEZCUTBRN08wRkJSVVFzVTBGQlQwNHNVMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk4yU1N4aFFVRlVMRU5CUVhkQ1NDeEhRVUY0UWl4RlFVRTJRanRCUVVNelFpeFRRVUZQZEVNc1QwRkJUM2RNTEZkQlFWQXNRMEZCYlVKc1NpeEhRVUZ1UWl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzbENMRlZCUVZRc1EwRkJjVUl3U0N4SFFVRnlRaXhGUVVFd1FrTXNSMEZCTVVJc1JVRkJLMEowU1N4TlFVRXZRaXhGUVVGMVF5OUNMRTFCUVhaRExFVkJRU3RETzBGQlF6ZERMRTFCUVVrd1FpeEhRVUZLTzBGQlEwRXNUMEZCU3l4SlFVRkpjRUlzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlRpeE5RVUZ3UWl4RlFVRTBRazBzUjBGQk5VSXNSVUZCYVVNN1FVRkRMMElzVVVGQlMwRXNTVUZCU1hsQ0xFMUJRVW9zU1VGQlkzTkpMRWxCUVVseVN5eE5RVUZ1UWl4SlFVRXJRazBzUzBGQlN6aEtMRWxCUVVsd1N5eE5RVUUxUXl4RlFVTkZPMEZCUTBaeFN5eFJRVUZKTDBvc1NVRkJTWGxDTEUxQlFWSXNTVUZCYTBKeFNTeEpRVUZKT1Vvc1EwRkJTaXhEUVVGc1FqdEJRVU5FTzBGQlEwUXNVMEZCVDBFc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTjFSU3hqUVVGVUxFTkJRWGxDTlVRc1IwRkJla0lzUlVGQk9FSTdRVUZETlVJc1RVRkJTVHRCUVVOR0xGZEJRVTl4U2l4dFFrRkJiVUp5U2l4SFFVRnVRaXhEUVVGUU8wRkJRMFFzUjBGR1JDeERRVVZGTEU5QlFVOXpTaXhIUVVGUUxFVkJRVms3UVVGRFdpeFhRVUZQTVVvc1QwRkJUMmxGTEZsQlFWQXNRMEZCYjBJc1RVRkJjRUlzUTBGQlVDeERRVVJaTEVOQlEzVkNPMEZCUTNCRE8wRkJRMFk3TzBGQlJVUTdPenM3TzBGQlMwRXNVMEZCVTNORExGTkJRVlFzUTBGQmIwSkVMRXRCUVhCQ0xFVkJRVEpDY1VRc1IwRkJNMElzUlVGQlowTTdRVUZET1VKb1NpeFRRVUZQTEU5QlFVOHlSaXhMUVVGUUxFdEJRV2xDTEZGQlFYaENMRVZCUVd0RExIVkRRVUZzUXp0QlFVTkJNMFlzVTBGQlR6SkdMRk5CUVZNc1EwRkJhRUlzUlVGQmJVSXNNRVJCUVc1Q08wRkJRMEV6Uml4VFFVRlBNa1lzVTBGQlUzRkVMRWRCUVdoQ0xFVkJRWEZDTERaRFFVRnlRanRCUVVOQmFFb3NVMEZCVDIxRUxFdEJRVXM0Uml4TFFVRk1MRU5CUVZkMFJDeExRVUZZTEUxQlFYTkNRU3hMUVVFM1FpeEZRVUZ2UXl4clEwRkJjRU03UVVGRFJEczdRVUZGUkN4VFFVRlRWU3hUUVVGVUxFTkJRVzlDVml4TFFVRndRaXhGUVVFeVFuRkVMRWRCUVROQ0xFVkJRV2RETlVZc1IwRkJhRU1zUlVGQmNVTTdRVUZEYmtOd1JDeFRRVUZQTEU5QlFVOHlSaXhMUVVGUUxFdEJRV2xDTEZGQlFYaENMRVZCUVd0RExIVkRRVUZzUXp0QlFVTkJNMFlzVTBGQlR6SkdMRk5CUVZOeFJDeEhRVUZvUWl4RlFVRnhRaXg1UTBGQmNrSTdRVUZEUVdoS0xGTkJRVTh5Uml4VFFVRlRka01zUjBGQmFFSXNSVUZCY1VJc01FTkJRWEpDTzBGQlEwRndSQ3hUUVVGUGJVUXNTMEZCU3poR0xFdEJRVXdzUTBGQlYzUkVMRXRCUVZnc1RVRkJjMEpCTEV0QlFUZENMRVZCUVc5RExHdERRVUZ3UXp0QlFVTkVPenRCUVVWRUxGTkJRVk5yUWl4WlFVRlVMRU5CUVhWQ2JFSXNTMEZCZGtJc1JVRkJPRUp4UkN4SFFVRTVRaXhGUVVGdFF6VkdMRWRCUVc1RExFVkJRWGRETzBGQlEzUkRjRVFzVTBGQlR5eFBRVUZQTWtZc1MwRkJVQ3hMUVVGcFFpeFJRVUY0UWl4RlFVRnJReXgxUTBGQmJFTTdRVUZEUVROR0xGTkJRVTh5Uml4VFFVRlRjVVFzUjBGQmFFSXNSVUZCY1VJc2VVTkJRWEpDTzBGQlEwRm9TaXhUUVVGUE1rWXNVMEZCVTNaRExFZEJRV2hDTEVWQlFYRkNMREJEUVVGeVFqdEJRVU5FT3p0QlFVVkVMRk5CUVZOd1JDeE5RVUZVTEVOQlFXbENhMG9zU1VGQmFrSXNSVUZCZFVKRExFOUJRWFpDTEVWQlFXZERPMEZCUXpsQ0xFMUJRVWtzUTBGQlEwUXNTVUZCVEN4RlFVRlhMRTFCUVUwc1NVRkJTWFpMTEV0QlFVb3NRMEZCVlhkTExGZEJRVmNzYTBKQlFYSkNMRU5CUVU0N1FVRkRXaUlzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cUlWeHVJQ29nVkdobElHSjFabVpsY2lCdGIyUjFiR1VnWm5KdmJTQnViMlJsTG1wekxDQm1iM0lnZEdobElHSnliM2R6WlhJdVhHNGdLbHh1SUNvZ1FHRjFkR2h2Y2lBZ0lFWmxjbTl6Y3lCQlltOTFhMmhoWkdscVpXZ2dQR1psY205emMwQm1aWEp2YzNNdWIzSm5QaUE4YUhSMGNEb3ZMMlpsY205emN5NXZjbWMrWEc0Z0tpQkFiR2xqWlc1elpTQWdUVWxVWEc0Z0tpOWNibHh1ZG1GeUlHSmhjMlUyTkNBOUlISmxjWFZwY21Vb0oySmhjMlUyTkMxcWN5Y3BYRzUyWVhJZ2FXVmxaVGMxTkNBOUlISmxjWFZwY21Vb0oybGxaV1UzTlRRbktWeHVYRzVsZUhCdmNuUnpMa0oxWm1abGNpQTlJRUoxWm1abGNseHVaWGh3YjNKMGN5NVRiRzkzUW5WbVptVnlJRDBnUW5WbVptVnlYRzVsZUhCdmNuUnpMa2xPVTFCRlExUmZUVUZZWDBKWlZFVlRJRDBnTlRCY2JrSjFabVpsY2k1d2IyOXNVMmw2WlNBOUlEZ3hPVEpjYmx4dUx5b3FYRzRnS2lCSlppQmdRblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1YzJBNlhHNGdLaUFnSUQwOVBTQjBjblZsSUNBZ0lGVnpaU0JWYVc1ME9FRnljbUY1SUdsdGNHeGxiV1Z1ZEdGMGFXOXVJQ2htWVhOMFpYTjBLVnh1SUNvZ0lDQTlQVDBnWm1Gc2MyVWdJQ0JWYzJVZ1QySnFaV04wSUdsdGNHeGxiV1Z1ZEdGMGFXOXVJQ2hqYjIxd1lYUnBZbXhsSUdSdmQyNGdkRzhnU1VVMktWeHVJQ292WEc1Q2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpJRDBnS0daMWJtTjBhVzl1SUNncElIdGNiaUFnTHk4Z1JHVjBaV04wSUdsbUlHSnliM2R6WlhJZ2MzVndjRzl5ZEhNZ1ZIbHdaV1FnUVhKeVlYbHpMaUJUZFhCd2IzSjBaV1FnWW5KdmQzTmxjbk1nWVhKbElFbEZJREV3S3l3Z1JtbHlaV1p2ZUNBMEt5eGNiaUFnTHk4Z1EyaHliMjFsSURjckxDQlRZV1poY21rZ05TNHhLeXdnVDNCbGNtRWdNVEV1Tmlzc0lHbFBVeUEwTGpJckxpQkpaaUIwYUdVZ1luSnZkM05sY2lCa2IyVnpJRzV2ZENCemRYQndiM0owSUdGa1pHbHVaMXh1SUNBdkx5QndjbTl3WlhKMGFXVnpJSFJ2SUdCVmFXNTBPRUZ5Y21GNVlDQnBibk4wWVc1alpYTXNJSFJvWlc0Z2RHaGhkQ2R6SUhSb1pTQnpZVzFsSUdGeklHNXZJR0JWYVc1ME9FRnljbUY1WUNCemRYQndiM0owWEc0Z0lDOHZJR0psWTJGMWMyVWdkMlVnYm1WbFpDQjBieUJpWlNCaFlteGxJSFJ2SUdGa1pDQmhiR3dnZEdobElHNXZaR1VnUW5WbVptVnlJRUZRU1NCdFpYUm9iMlJ6TGlCVWFHbHpJR2x6SUdGdUlHbHpjM1ZsWEc0Z0lDOHZJR2x1SUVacGNtVm1iM2dnTkMweU9TNGdUbTkzSUdacGVHVmtPaUJvZEhSd2N6b3ZMMkoxWjNwcGJHeGhMbTF2ZW1sc2JHRXViM0puTDNOb2IzZGZZblZuTG1ObmFUOXBaRDAyT1RVME16aGNiaUFnZEhKNUlIdGNiaUFnSUNCMllYSWdZblZtSUQwZ2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0RBcFhHNGdJQ0FnZG1GeUlHRnljaUE5SUc1bGR5QlZhVzUwT0VGeWNtRjVLR0oxWmlsY2JpQWdJQ0JoY25JdVptOXZJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z05ESWdmVnh1SUNBZ0lISmxkSFZ5YmlBME1pQTlQVDBnWVhKeUxtWnZieWdwSUNZbVhHNGdJQ0FnSUNBZ0lIUjVjR1Z2WmlCaGNuSXVjM1ZpWVhKeVlYa2dQVDA5SUNkbWRXNWpkR2x2YmljZ0x5OGdRMmh5YjIxbElEa3RNVEFnYkdGamF5QmdjM1ZpWVhKeVlYbGdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVmNiaUFnZlZ4dWZTa29LVnh1WEc0dktpcGNiaUFxSUVOc1lYTnpPaUJDZFdabVpYSmNiaUFxSUQwOVBUMDlQVDA5UFQwOVBUMWNiaUFxWEc0Z0tpQlVhR1VnUW5WbVptVnlJR052Ym5OMGNuVmpkRzl5SUhKbGRIVnlibk1nYVc1emRHRnVZMlZ6SUc5bUlHQlZhVzUwT0VGeWNtRjVZQ0IwYUdGMElHRnlaU0JoZFdkdFpXNTBaV1JjYmlBcUlIZHBkR2dnWm5WdVkzUnBiMjRnY0hKdmNHVnlkR2xsY3lCbWIzSWdZV3hzSUhSb1pTQnViMlJsSUdCQ2RXWm1aWEpnSUVGUVNTQm1kVzVqZEdsdmJuTXVJRmRsSUhWelpWeHVJQ29nWUZWcGJuUTRRWEp5WVhsZ0lITnZJSFJvWVhRZ2MzRjFZWEpsSUdKeVlXTnJaWFFnYm05MFlYUnBiMjRnZDI5eWEzTWdZWE1nWlhod1pXTjBaV1FnTFMwZ2FYUWdjbVYwZFhKdWMxeHVJQ29nWVNCemFXNW5iR1VnYjJOMFpYUXVYRzRnS2x4dUlDb2dRbmtnWVhWbmJXVnVkR2x1WnlCMGFHVWdhVzV6ZEdGdVkyVnpMQ0IzWlNCallXNGdZWFp2YVdRZ2JXOWthV1o1YVc1bklIUm9aU0JnVldsdWREaEJjbkpoZVdCY2JpQXFJSEJ5YjNSdmRIbHdaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdRblZtWm1WeUlDaHpkV0pxWldOMExDQmxibU52WkdsdVp5d2dibTlhWlhKdktTQjdYRzRnSUdsbUlDZ2hLSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQkNkV1ptWlhJcEtWeHVJQ0FnSUhKbGRIVnliaUJ1WlhjZ1FuVm1abVZ5S0hOMVltcGxZM1FzSUdWdVkyOWthVzVuTENCdWIxcGxjbThwWEc1Y2JpQWdkbUZ5SUhSNWNHVWdQU0IwZVhCbGIyWWdjM1ZpYW1WamRGeHVYRzRnSUM4dklGZHZjbXRoY205MWJtUTZJRzV2WkdVbmN5QmlZWE5sTmpRZ2FXMXdiR1Z0Wlc1MFlYUnBiMjRnWVd4c2IzZHpJR1p2Y2lCdWIyNHRjR0ZrWkdWa0lITjBjbWx1WjNOY2JpQWdMeThnZDJocGJHVWdZbUZ6WlRZMExXcHpJR1J2WlhNZ2JtOTBMbHh1SUNCcFppQW9aVzVqYjJScGJtY2dQVDA5SUNkaVlYTmxOalFuSUNZbUlIUjVjR1VnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ2MzVmlhbVZqZENBOUlITjBjbWx1WjNSeWFXMG9jM1ZpYW1WamRDbGNiaUFnSUNCM2FHbHNaU0FvYzNWaWFtVmpkQzVzWlc1bmRHZ2dKU0EwSUNFOVBTQXdLU0I3WEc0Z0lDQWdJQ0J6ZFdKcVpXTjBJRDBnYzNWaWFtVmpkQ0FySUNjOUoxeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJRVpwYm1RZ2RHaGxJR3hsYm1kMGFGeHVJQ0IyWVhJZ2JHVnVaM1JvWEc0Z0lHbG1JQ2gwZVhCbElEMDlQU0FuYm5WdFltVnlKeWxjYmlBZ0lDQnNaVzVuZEdnZ1BTQmpiMlZ5WTJVb2MzVmlhbVZqZENsY2JpQWdaV3h6WlNCcFppQW9kSGx3WlNBOVBUMGdKM04wY21sdVp5Y3BYRzRnSUNBZ2JHVnVaM1JvSUQwZ1FuVm1abVZ5TG1KNWRHVk1aVzVuZEdnb2MzVmlhbVZqZEN3Z1pXNWpiMlJwYm1jcFhHNGdJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R2WW1wbFkzUW5LVnh1SUNBZ0lHeGxibWQwYUNBOUlHTnZaWEpqWlNoemRXSnFaV04wTG14bGJtZDBhQ2tnTHk4Z1lYTnpkVzFsSUhSb1lYUWdiMkpxWldOMElHbHpJR0Z5Y21GNUxXeHBhMlZjYmlBZ1pXeHpaVnh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblJtbHljM1FnWVhKbmRXMWxiblFnYm1WbFpITWdkRzhnWW1VZ1lTQnVkVzFpWlhJc0lHRnljbUY1SUc5eUlITjBjbWx1Wnk0bktWeHVYRzRnSUhaaGNpQmlkV1pjYmlBZ2FXWWdLRUoxWm1abGNpNWZkWE5sVkhsd1pXUkJjbkpoZVhNcElIdGNiaUFnSUNBdkx5QlFjbVZtWlhKeVpXUTZJRkpsZEhWeWJpQmhiaUJoZFdkdFpXNTBaV1FnWUZWcGJuUTRRWEp5WVhsZ0lHbHVjM1JoYm1ObElHWnZjaUJpWlhOMElIQmxjbVp2Y20xaGJtTmxYRzRnSUNBZ1luVm1JRDBnUW5WbVptVnlMbDloZFdkdFpXNTBLRzVsZHlCVmFXNTBPRUZ5Y21GNUtHeGxibWQwYUNrcFhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ0x5OGdSbUZzYkdKaFkyczZJRkpsZEhWeWJpQlVTRWxUSUdsdWMzUmhibU5sSUc5bUlFSjFabVpsY2lBb1kzSmxZWFJsWkNCaWVTQmdibVYzWUNsY2JpQWdJQ0JpZFdZZ1BTQjBhR2x6WEc0Z0lDQWdZblZtTG14bGJtZDBhQ0E5SUd4bGJtZDBhRnh1SUNBZ0lHSjFaaTVmYVhOQ2RXWm1aWElnUFNCMGNuVmxYRzRnSUgxY2JseHVJQ0IyWVhJZ2FWeHVJQ0JwWmlBb1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjeUFtSmlCMGVYQmxiMllnYzNWaWFtVmpkQzVpZVhSbFRHVnVaM1JvSUQwOVBTQW5iblZ0WW1WeUp5a2dlMXh1SUNBZ0lDOHZJRk53WldWa0lHOXdkR2x0YVhwaGRHbHZiaUF0TFNCMWMyVWdjMlYwSUdsbUlIZGxKM0psSUdOdmNIbHBibWNnWm5KdmJTQmhJSFI1Y0dWa0lHRnljbUY1WEc0Z0lDQWdZblZtTGw5elpYUW9jM1ZpYW1WamRDbGNiaUFnZlNCbGJITmxJR2xtSUNocGMwRnljbUY1YVhOb0tITjFZbXBsWTNRcEtTQjdYRzRnSUNBZ0x5OGdWSEpsWVhRZ1lYSnlZWGt0YVhOb0lHOWlhbVZqZEhNZ1lYTWdZU0JpZVhSbElHRnljbUY1WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JwWmlBb1FuVm1abVZ5TG1selFuVm1abVZ5S0hOMVltcGxZM1FwS1Z4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCemRXSnFaV04wTG5KbFlXUlZTVzUwT0NocEtWeHVJQ0FnSUNBZ1pXeHpaVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0J6ZFdKcVpXTjBXMmxkWEc0Z0lDQWdmVnh1SUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ1luVm1MbmR5YVhSbEtITjFZbXBsWTNRc0lEQXNJR1Z1WTI5a2FXNW5LVnh1SUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHVkVzFpWlhJbklDWW1JQ0ZDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhseklDWW1JQ0Z1YjFwbGNtOHBJSHRjYmlBZ0lDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2JHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR0oxWmx0cFhTQTlJREJjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZblZtWEc1OVhHNWNiaTh2SUZOVVFWUkpReUJOUlZSSVQwUlRYRzR2THlBOVBUMDlQVDA5UFQwOVBUMDlQVnh1WEc1Q2RXWm1aWEl1YVhORmJtTnZaR2x1WnlBOUlHWjFibU4wYVc5dUlDaGxibU52WkdsdVp5a2dlMXh1SUNCemQybDBZMmdnS0ZOMGNtbHVaeWhsYm1OdlpHbHVaeWt1ZEc5TWIzZGxja05oYzJVb0tTa2dlMXh1SUNBZ0lHTmhjMlVnSjJobGVDYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU9DYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxUZ25PbHh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQmpZWE5sSUNkaWFXNWhjbmtuT2x4dUlDQWdJR05oYzJVZ0oySmhjMlUyTkNjNlhHNGdJQ0FnWTJGelpTQW5jbUYzSnpwY2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdWY2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sWEc0Z0lIMWNibjFjYmx4dVFuVm1abVZ5TG1selFuVm1abVZ5SUQwZ1puVnVZM1JwYjI0Z0tHSXBJSHRjYmlBZ2NtVjBkWEp1SUNFaEtHSWdJVDA5SUc1MWJHd2dKaVlnWWlBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUdJdVgybHpRblZtWm1WeUtWeHVmVnh1WEc1Q2RXWm1aWEl1WW5sMFpVeGxibWQwYUNBOUlHWjFibU4wYVc5dUlDaHpkSElzSUdWdVkyOWthVzVuS1NCN1hHNGdJSFpoY2lCeVpYUmNiaUFnYzNSeUlEMGdjM1J5SUNzZ0p5ZGNiaUFnYzNkcGRHTm9JQ2hsYm1OdlpHbHVaeUI4ZkNBbmRYUm1PQ2NwSUh0Y2JpQWdJQ0JqWVhObElDZG9aWGduT2x4dUlDQWdJQ0FnY21WMElEMGdjM1J5TG14bGJtZDBhQ0F2SURKY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuZFhSbU9DYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxUZ25PbHh1SUNBZ0lDQWdjbVYwSUQwZ2RYUm1PRlJ2UW5sMFpYTW9jM1J5S1M1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZWE5qYVdrbk9seHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ1kyRnpaU0FuY21GM0p6cGNiaUFnSUNBZ0lISmxkQ0E5SUhOMGNpNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlHSmhjMlUyTkZSdlFubDBaWE1vYzNSeUtTNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuZFdOek1pYzZYRzRnSUNBZ1kyRnpaU0FuZFdOekxUSW5PbHh1SUNBZ0lHTmhjMlVnSjNWMFpqRTJiR1VuT2x4dUlDQWdJR05oYzJVZ0ozVjBaaTB4Tm14bEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUhOMGNpNXNaVzVuZEdnZ0tpQXlYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR1JsWm1GMWJIUTZYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oxVnVhMjV2ZDI0Z1pXNWpiMlJwYm1jbktWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYUmNibjFjYmx4dVFuVm1abVZ5TG1OdmJtTmhkQ0E5SUdaMWJtTjBhVzl1SUNoc2FYTjBMQ0IwYjNSaGJFeGxibWQwYUNrZ2UxeHVJQ0JoYzNObGNuUW9hWE5CY25KaGVTaHNhWE4wS1N3Z0oxVnpZV2RsT2lCQ2RXWm1aWEl1WTI5dVkyRjBLR3hwYzNRc0lGdDBiM1JoYkV4bGJtZDBhRjBwWEZ4dUp5QXJYRzRnSUNBZ0lDQW5iR2x6ZENCemFHOTFiR1FnWW1VZ1lXNGdRWEp5WVhrdUp5bGNibHh1SUNCcFppQW9iR2x6ZEM1c1pXNW5kR2dnUFQwOUlEQXBJSHRjYmlBZ0lDQnlaWFIxY200Z2JtVjNJRUoxWm1abGNpZ3dLVnh1SUNCOUlHVnNjMlVnYVdZZ0tHeHBjM1F1YkdWdVozUm9JRDA5UFNBeEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUd4cGMzUmJNRjFjYmlBZ2ZWeHVYRzRnSUhaaGNpQnBYRzRnSUdsbUlDaDBlWEJsYjJZZ2RHOTBZV3hNWlc1bmRHZ2dJVDA5SUNkdWRXMWlaWEluS1NCN1hHNGdJQ0FnZEc5MFlXeE1aVzVuZEdnZ1BTQXdYRzRnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUd4cGMzUXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUhSdmRHRnNUR1Z1WjNSb0lDczlJR3hwYzNSYmFWMHViR1Z1WjNSb1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2RtRnlJR0oxWmlBOUlHNWxkeUJDZFdabVpYSW9kRzkwWVd4TVpXNW5kR2dwWEc0Z0lIWmhjaUJ3YjNNZ1BTQXdYRzRnSUdadmNpQW9hU0E5SURBN0lHa2dQQ0JzYVhOMExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdsMFpXMGdQU0JzYVhOMFcybGRYRzRnSUNBZ2FYUmxiUzVqYjNCNUtHSjFaaXdnY0c5ektWeHVJQ0FnSUhCdmN5QXJQU0JwZEdWdExteGxibWQwYUZ4dUlDQjlYRzRnSUhKbGRIVnliaUJpZFdaY2JuMWNibHh1THk4Z1FsVkdSa1ZTSUVsT1UxUkJUa05GSUUxRlZFaFBSRk5jYmk4dklEMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5WEc1Y2JtWjFibU4wYVc5dUlGOW9aWGhYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lHOW1abk5sZENBOUlFNTFiV0psY2lodlptWnpaWFFwSUh4OElEQmNiaUFnZG1GeUlISmxiV0ZwYm1sdVp5QTlJR0oxWmk1c1pXNW5kR2dnTFNCdlptWnpaWFJjYmlBZ2FXWWdLQ0ZzWlc1bmRHZ3BJSHRjYmlBZ0lDQnNaVzVuZEdnZ1BTQnlaVzFoYVc1cGJtZGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNaVzVuZEdnZ1BTQk9kVzFpWlhJb2JHVnVaM1JvS1Z4dUlDQWdJR2xtSUNoc1pXNW5kR2dnUGlCeVpXMWhhVzVwYm1jcElIdGNiaUFnSUNBZ0lHeGxibWQwYUNBOUlISmxiV0ZwYm1sdVoxeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJRzExYzNRZ1ltVWdZVzRnWlhabGJpQnVkVzFpWlhJZ2IyWWdaR2xuYVhSelhHNGdJSFpoY2lCemRISk1aVzRnUFNCemRISnBibWN1YkdWdVozUm9YRzRnSUdGemMyVnlkQ2h6ZEhKTVpXNGdKU0F5SUQwOVBTQXdMQ0FuU1c1MllXeHBaQ0JvWlhnZ2MzUnlhVzVuSnlsY2JseHVJQ0JwWmlBb2JHVnVaM1JvSUQ0Z2MzUnlUR1Z1SUM4Z01pa2dlMXh1SUNBZ0lHeGxibWQwYUNBOUlITjBja3hsYmlBdklESmNiaUFnZlZ4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHSjVkR1VnUFNCd1lYSnpaVWx1ZENoemRISnBibWN1YzNWaWMzUnlLR2tnS2lBeUxDQXlLU3dnTVRZcFhHNGdJQ0FnWVhOelpYSjBLQ0ZwYzA1aFRpaGllWFJsS1N3Z0owbHVkbUZzYVdRZ2FHVjRJSE4wY21sdVp5Y3BYRzRnSUNBZ1luVm1XMjltWm5ObGRDQXJJR2xkSUQwZ1lubDBaVnh1SUNCOVhHNGdJRUoxWm1abGNpNWZZMmhoY25OWGNtbDBkR1Z1SUQwZ2FTQXFJREpjYmlBZ2NtVjBkWEp1SUdsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqaFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaDFkR1k0Vkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWhjMk5wYVZkeWFYUmxJQ2hpZFdZc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwSUh0Y2JpQWdkbUZ5SUdOb1lYSnpWM0pwZEhSbGJpQTlJRUoxWm1abGNpNWZZMmhoY25OWGNtbDBkR1Z1SUQxY2JpQWdJQ0JpYkdsMFFuVm1abVZ5S0dGelkybHBWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aWFXNWhjbmxYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lISmxkSFZ5YmlCZllYTmphV2xYY21sMFpTaGlkV1lzSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlZWE5sTmpSWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loaVlYTmxOalJVYjBKNWRHVnpLSE4wY21sdVp5a3NJR0oxWml3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lISmxkSFZ5YmlCamFHRnljMWR5YVhSMFpXNWNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaakUyYkdWWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loMWRHWXhObXhsVkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1VnUFNCbWRXNWpkR2x2YmlBb2MzUnlhVzVuTENCdlptWnpaWFFzSUd4bGJtZDBhQ3dnWlc1amIyUnBibWNwSUh0Y2JpQWdMeThnVTNWd2NHOXlkQ0JpYjNSb0lDaHpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvTENCbGJtTnZaR2x1WnlsY2JpQWdMeThnWVc1a0lIUm9aU0JzWldkaFkza2dLSE4wY21sdVp5d2daVzVqYjJScGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0JwWmlBb2FYTkdhVzVwZEdVb2IyWm1jMlYwS1NrZ2UxeHVJQ0FnSUdsbUlDZ2hhWE5HYVc1cGRHVW9iR1Z1WjNSb0tTa2dlMXh1SUNBZ0lDQWdaVzVqYjJScGJtY2dQU0JzWlc1bmRHaGNiaUFnSUNBZ0lHeGxibWQwYUNBOUlIVnVaR1ZtYVc1bFpGeHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIc2dJQzh2SUd4bFoyRmplVnh1SUNBZ0lIWmhjaUJ6ZDJGd0lEMGdaVzVqYjJScGJtZGNiaUFnSUNCbGJtTnZaR2x1WnlBOUlHOW1abk5sZEZ4dUlDQWdJRzltWm5ObGRDQTlJR3hsYm1kMGFGeHVJQ0FnSUd4bGJtZDBhQ0E5SUhOM1lYQmNiaUFnZlZ4dVhHNGdJRzltWm5ObGRDQTlJRTUxYldKbGNpaHZabVp6WlhRcElIeDhJREJjYmlBZ2RtRnlJSEpsYldGcGJtbHVaeUE5SUhSb2FYTXViR1Z1WjNSb0lDMGdiMlptYzJWMFhHNGdJR2xtSUNnaGJHVnVaM1JvS1NCN1hHNGdJQ0FnYkdWdVozUm9JRDBnY21WdFlXbHVhVzVuWEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnYkdWdVozUm9JRDBnVG5WdFltVnlLR3hsYm1kMGFDbGNiaUFnSUNCcFppQW9iR1Z1WjNSb0lENGdjbVZ0WVdsdWFXNW5LU0I3WEc0Z0lDQWdJQ0JzWlc1bmRHZ2dQU0J5WlcxaGFXNXBibWRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdaVzVqYjJScGJtY2dQU0JUZEhKcGJtY29aVzVqYjJScGJtY2dmSHdnSjNWMFpqZ25LUzUwYjB4dmQyVnlRMkZ6WlNncFhHNWNiaUFnZG1GeUlISmxkRnh1SUNCemQybDBZMmdnS0dWdVkyOWthVzVuS1NCN1hHNGdJQ0FnWTJGelpTQW5hR1Y0SnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlvWlhoWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxZEdZNEp6cGNiaUFnSUNCallYTmxJQ2QxZEdZdE9DYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZmRYUm1PRmR5YVhSbEtIUm9hWE1zSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjloYzJOcGFWZHlhWFJsS0hSb2FYTXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZZbWx1WVhKNVYzSnBkR1VvZEdocGN5d2djM1J5YVc1bkxDQnZabVp6WlhRc0lHeGxibWQwYUNsY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWlZWE5sTmpSWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBJRDBnWDNWMFpqRTJiR1ZYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFZibXR1YjNkdUlHVnVZMjlrYVc1bkp5bGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jZ1BTQm1kVzVqZEdsdmJpQW9aVzVqYjJScGJtY3NJSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdkbUZ5SUhObGJHWWdQU0IwYUdselhHNWNiaUFnWlc1amIyUnBibWNnUFNCVGRISnBibWNvWlc1amIyUnBibWNnZkh3Z0ozVjBaamduS1M1MGIweHZkMlZ5UTJGelpTZ3BYRzRnSUhOMFlYSjBJRDBnVG5WdFltVnlLSE4wWVhKMEtTQjhmQ0F3WEc0Z0lHVnVaQ0E5SUNobGJtUWdJVDA5SUhWdVpHVm1hVzVsWkNsY2JpQWdJQ0EvSUU1MWJXSmxjaWhsYm1RcFhHNGdJQ0FnT2lCbGJtUWdQU0J6Wld4bUxteGxibWQwYUZ4dVhHNGdJQzh2SUVaaGMzUndZWFJvSUdWdGNIUjVJSE4wY21sdVozTmNiaUFnYVdZZ0tHVnVaQ0E5UFQwZ2MzUmhjblFwWEc0Z0lDQWdjbVYwZFhKdUlDY25YRzVjYmlBZ2RtRnlJSEpsZEZ4dUlDQnpkMmwwWTJnZ0tHVnVZMjlrYVc1bktTQjdYRzRnSUNBZ1kyRnpaU0FuYUdWNEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5b1pYaFRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxZEdZNEp6cGNiaUFnSUNCallYTmxJQ2QxZEdZdE9DYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZmRYUm1PRk5zYVdObEtITmxiR1lzSUhOMFlYSjBMQ0JsYm1RcFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWhjMk5wYVZOc2FXTmxLSE5sYkdZc0lITjBZWEowTENCbGJtUXBYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmWW1sdVlYSjVVMnhwWTJVb2MyVnNaaXdnYzNSaGNuUXNJR1Z1WkNsY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWlZWE5sTmpSVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMElEMGdYM1YwWmpFMmJHVlRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RWYm10dWIzZHVJR1Z1WTI5a2FXNW5KeWxjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlLVTA5T0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUhSNWNHVTZJQ2RDZFdabVpYSW5MRnh1SUNBZ0lHUmhkR0U2SUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpTNWpZV3hzS0hSb2FYTXVYMkZ5Y2lCOGZDQjBhR2x6TENBd0tWeHVJQ0I5WEc1OVhHNWNiaTh2SUdOdmNIa29kR0Z5WjJWMFFuVm1abVZ5TENCMFlYSm5aWFJUZEdGeWREMHdMQ0J6YjNWeVkyVlRkR0Z5ZEQwd0xDQnpiM1Z5WTJWRmJtUTlZblZtWm1WeUxteGxibWQwYUNsY2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdVkyOXdlU0E5SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFzSUhSaGNtZGxkRjl6ZEdGeWRDd2djM1JoY25Rc0lHVnVaQ2tnZTF4dUlDQjJZWElnYzI5MWNtTmxJRDBnZEdocGMxeHVYRzRnSUdsbUlDZ2hjM1JoY25RcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ0FtSmlCbGJtUWdJVDA5SURBcElHVnVaQ0E5SUhSb2FYTXViR1Z1WjNSb1hHNGdJR2xtSUNnaGRHRnlaMlYwWDNOMFlYSjBLU0IwWVhKblpYUmZjM1JoY25RZ1BTQXdYRzVjYmlBZ0x5OGdRMjl3ZVNBd0lHSjVkR1Z6T3lCM1pTZHlaU0JrYjI1bFhHNGdJR2xtSUNobGJtUWdQVDA5SUhOMFlYSjBLU0J5WlhSMWNtNWNiaUFnYVdZZ0tIUmhjbWRsZEM1c1pXNW5kR2dnUFQwOUlEQWdmSHdnYzI5MWNtTmxMbXhsYm1kMGFDQTlQVDBnTUNrZ2NtVjBkWEp1WEc1Y2JpQWdMeThnUm1GMFlXd2daWEp5YjNJZ1kyOXVaR2wwYVc5dWMxeHVJQ0JoYzNObGNuUW9aVzVrSUQ0OUlITjBZWEowTENBbmMyOTFjbU5sUlc1a0lEd2djMjkxY21ObFUzUmhjblFuS1Z4dUlDQmhjM05sY25Rb2RHRnlaMlYwWDNOMFlYSjBJRDQ5SURBZ0ppWWdkR0Z5WjJWMFgzTjBZWEowSUR3Z2RHRnlaMlYwTG14bGJtZDBhQ3hjYmlBZ0lDQWdJQ2QwWVhKblpYUlRkR0Z5ZENCdmRYUWdiMllnWW05MWJtUnpKeWxjYmlBZ1lYTnpaWEowS0hOMFlYSjBJRDQ5SURBZ0ppWWdjM1JoY25RZ1BDQnpiM1Z5WTJVdWJHVnVaM1JvTENBbmMyOTFjbU5sVTNSaGNuUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ01DQW1KaUJsYm1RZ1BEMGdjMjkxY21ObExteGxibWQwYUN3Z0ozTnZkWEpqWlVWdVpDQnZkWFFnYjJZZ1ltOTFibVJ6SnlsY2JseHVJQ0F2THlCQmNtVWdkMlVnYjI5aVAxeHVJQ0JwWmlBb1pXNWtJRDRnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnWlc1a0lEMGdkR2hwY3k1c1pXNW5kR2hjYmlBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdnZ0xTQjBZWEpuWlhSZmMzUmhjblFnUENCbGJtUWdMU0J6ZEdGeWRDbGNiaUFnSUNCbGJtUWdQU0IwWVhKblpYUXViR1Z1WjNSb0lDMGdkR0Z5WjJWMFgzTjBZWEowSUNzZ2MzUmhjblJjYmx4dUlDQjJZWElnYkdWdUlEMGdaVzVrSUMwZ2MzUmhjblJjYmx4dUlDQnBaaUFvYkdWdUlEd2dNVEF3SUh4OElDRkNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6S1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc1pXNDdJR2tyS3lsY2JpQWdJQ0FnSUhSaGNtZGxkRnRwSUNzZ2RHRnlaMlYwWDNOMFlYSjBYU0E5SUhSb2FYTmJhU0FySUhOMFlYSjBYVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFJoY21kbGRDNWZjMlYwS0hSb2FYTXVjM1ZpWVhKeVlYa29jM1JoY25Rc0lITjBZWEowSUNzZ2JHVnVLU3dnZEdGeVoyVjBYM04wWVhKMEtWeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpWVhObE5qUlRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJR2xtSUNoemRHRnlkQ0E5UFQwZ01DQW1KaUJsYm1RZ1BUMDlJR0oxWmk1c1pXNW5kR2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZbUZ6WlRZMExtWnliMjFDZVhSbFFYSnlZWGtvWW5WbUtWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lISmxkSFZ5YmlCaVlYTmxOalF1Wm5KdmJVSjVkR1ZCY25KaGVTaGlkV1l1YzJ4cFkyVW9jM1JoY25Rc0lHVnVaQ2twWEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaamhUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnlaWE1nUFNBbkoxeHVJQ0IyWVhJZ2RHMXdJRDBnSnlkY2JpQWdaVzVrSUQwZ1RXRjBhQzV0YVc0b1luVm1MbXhsYm1kMGFDd2daVzVrS1Z4dVhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNCemRHRnlkRHNnYVNBOElHVnVaRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLR0oxWmx0cFhTQThQU0F3ZURkR0tTQjdYRzRnSUNBZ0lDQnlaWE1nS3owZ1pHVmpiMlJsVlhSbU9FTm9ZWElvZEcxd0tTQXJJRk4wY21sdVp5NW1jbTl0UTJoaGNrTnZaR1VvWW5WbVcybGRLVnh1SUNBZ0lDQWdkRzF3SUQwZ0p5ZGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEcxd0lDczlJQ2NsSnlBcklHSjFabHRwWFM1MGIxTjBjbWx1WnlneE5pbGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2NtVnpJQ3NnWkdWamIyUmxWWFJtT0VOb1lYSW9kRzF3S1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmWVhOamFXbFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCeVpYUWdQU0FuSjF4dUlDQmxibVFnUFNCTllYUm9MbTFwYmloaWRXWXViR1Z1WjNSb0xDQmxibVFwWEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SUhOMFlYSjBPeUJwSUR3Z1pXNWtPeUJwS3lzcFhHNGdJQ0FnY21WMElDczlJRk4wY21sdVp5NW1jbTl0UTJoaGNrTnZaR1VvWW5WbVcybGRLVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aWFXNWhjbmxUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhKbGRIVnliaUJmWVhOamFXbFRiR2xqWlNoaWRXWXNJSE4wWVhKMExDQmxibVFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlvWlhoVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzVjYmlBZ2FXWWdLQ0Z6ZEdGeWRDQjhmQ0J6ZEdGeWRDQThJREFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDQjhmQ0JsYm1RZ1BDQXdJSHg4SUdWdVpDQStJR3hsYmlrZ1pXNWtJRDBnYkdWdVhHNWNiaUFnZG1GeUlHOTFkQ0E5SUNjblhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNCemRHRnlkRHNnYVNBOElHVnVaRHNnYVNzcktTQjdYRzRnSUNBZ2IzVjBJQ3M5SUhSdlNHVjRLR0oxWmx0cFhTbGNiaUFnZlZ4dUlDQnlaWFIxY200Z2IzVjBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTFkR1l4Tm14bFUyeHBZMlVnS0dKMVppd2djM1JoY25Rc0lHVnVaQ2tnZTF4dUlDQjJZWElnWW5sMFpYTWdQU0JpZFdZdWMyeHBZMlVvYzNSaGNuUXNJR1Z1WkNsY2JpQWdkbUZ5SUhKbGN5QTlJQ2NuWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dZbmwwWlhNdWJHVnVaM1JvT3lCcElDczlJRElwSUh0Y2JpQWdJQ0J5WlhNZ0t6MGdVM1J5YVc1bkxtWnliMjFEYUdGeVEyOWtaU2hpZVhSbGMxdHBYU0FySUdKNWRHVnpXMmtyTVYwZ0tpQXlOVFlwWEc0Z0lIMWNiaUFnY21WMGRYSnVJSEpsYzF4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbk5zYVdObElEMGdablZ1WTNScGIyNGdLSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdkbUZ5SUd4bGJpQTlJSFJvYVhNdWJHVnVaM1JvWEc0Z0lITjBZWEowSUQwZ1kyeGhiWEFvYzNSaGNuUXNJR3hsYml3Z01DbGNiaUFnWlc1a0lEMGdZMnhoYlhBb1pXNWtMQ0JzWlc0c0lHeGxiaWxjYmx4dUlDQnBaaUFvUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWN5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCQ2RXWm1aWEl1WDJGMVoyMWxiblFvZEdocGN5NXpkV0poY25KaGVTaHpkR0Z5ZEN3Z1pXNWtLU2xjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IyWVhJZ2MyeHBZMlZNWlc0Z1BTQmxibVFnTFNCemRHRnlkRnh1SUNBZ0lIWmhjaUJ1WlhkQ2RXWWdQU0J1WlhjZ1FuVm1abVZ5S0hOc2FXTmxUR1Z1TENCMWJtUmxabWx1WldRc0lIUnlkV1VwWEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6YkdsalpVeGxianNnYVNzcktTQjdYRzRnSUNBZ0lDQnVaWGRDZFdaYmFWMGdQU0IwYUdselcya2dLeUJ6ZEdGeWRGMWNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJRzVsZDBKMVpseHVJQ0I5WEc1OVhHNWNiaTh2SUdCblpYUmdJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJPYjJSbElEQXVNVE1yWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1kbGRDQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXBJSHRjYmlBZ1kyOXVjMjlzWlM1c2IyY29KeTVuWlhRb0tTQnBjeUJrWlhCeVpXTmhkR1ZrTGlCQlkyTmxjM01nZFhOcGJtY2dZWEp5WVhrZ2FXNWtaWGhsY3lCcGJuTjBaV0ZrTGljcFhHNGdJSEpsZEhWeWJpQjBhR2x6TG5KbFlXUlZTVzUwT0NodlptWnpaWFFwWEc1OVhHNWNiaTh2SUdCelpYUmdJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJPYjJSbElEQXVNVE1yWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5ObGRDQTlJR1oxYm1OMGFXOXVJQ2gyTENCdlptWnpaWFFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvSnk1elpYUW9LU0JwY3lCa1pYQnlaV05oZEdWa0xpQkJZMk5sYzNNZ2RYTnBibWNnWVhKeVlYa2dhVzVrWlhobGN5QnBibk4wWldGa0xpY3BYRzRnSUhKbGRIVnliaUIwYUdsekxuZHlhWFJsVlVsdWREZ29kaXdnYjJabWMyVjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2NtVjBkWEp1SUhSb2FYTmJiMlptYzJWMFhWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRlZKYm5ReE5pQW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF4SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJSFpoY2lCMllXeGNiaUFnYVdZZ0tHeHBkSFJzWlVWdVpHbGhiaWtnZTF4dUlDQWdJSFpoYkNBOUlHSjFabHR2Wm1aelpYUmRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJREVnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREZkSUR3OElEaGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZV3dnUFNCaWRXWmJiMlptYzJWMFhTQThQQ0E0WEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURFZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURGZFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTVRaTVJTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5ReE5paDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME1UWkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXhOaWgwYUdsekxDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNKbFlXUlZTVzUwTXpJZ0tHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNeUE4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdjbVZoWkNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQjJZWElnZG1Gc1hHNGdJR2xtSUNoc2FYUjBiR1ZGYm1ScFlXNHBJSHRjYmlBZ0lDQnBaaUFvYjJabWMyVjBJQ3NnTWlBOElHeGxiaWxjYmlBZ0lDQWdJSFpoYkNBOUlHSjFabHR2Wm1aelpYUWdLeUF5WFNBOFBDQXhObHh1SUNBZ0lHbG1JQ2h2Wm1aelpYUWdLeUF4SUR3Z2JHVnVLVnh1SUNBZ0lDQWdkbUZzSUh3OUlHSjFabHR2Wm1aelpYUWdLeUF4WFNBOFBDQTRYRzRnSUNBZ2RtRnNJSHc5SUdKMVpsdHZabVp6WlhSZFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklETWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dQU0IyWVd3Z0t5QW9ZblZtVzI5bVpuTmxkQ0FySUROZElEdzhJREkwSUQ0K1BpQXdLVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR2xtSUNodlptWnpaWFFnS3lBeElEd2diR1Z1S1Z4dUlDQWdJQ0FnZG1Gc0lEMGdZblZtVzI5bVpuTmxkQ0FySURGZElEdzhJREUyWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURJZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURKZElEdzhJRGhjYmlBZ0lDQnBaaUFvYjJabWMyVjBJQ3NnTXlBOElHeGxiaWxjYmlBZ0lDQWdJSFpoYkNCOFBTQmlkV1piYjJabWMyVjBJQ3NnTTExY2JpQWdJQ0IyWVd3Z1BTQjJZV3dnS3lBb1luVm1XMjltWm5ObGRGMGdQRHdnTWpRZ1BqNCtJREFwWEc0Z0lIMWNiaUFnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF6TWloMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5Rek1paDBhR2x6TENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTEZ4dUlDQWdJQ0FnSUNBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2RtRnlJRzVsWnlBOUlIUm9hWE5iYjJabWMyVjBYU0FtSURCNE9EQmNiaUFnYVdZZ0tHNWxaeWxjYmlBZ0lDQnlaWFIxY200Z0tEQjRabVlnTFNCMGFHbHpXMjltWm5ObGRGMGdLeUF4S1NBcUlDMHhYRzRnSUdWc2MyVmNiaUFnSUNCeVpYUjFjbTRnZEdocGMxdHZabVp6WlhSZFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5eVpXRmtTVzUwTVRZZ0tHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNU0E4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdjbVZoWkNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQjJZWElnZG1Gc0lEMGdYM0psWVdSVlNXNTBNVFlvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnZEhKMVpTbGNiaUFnZG1GeUlHNWxaeUE5SUhaaGJDQW1JREI0T0RBd01GeHVJQ0JwWmlBb2JtVm5LVnh1SUNBZ0lISmxkSFZ5YmlBb01IaG1abVptSUMwZ2RtRnNJQ3NnTVNrZ0tpQXRNVnh1SUNCbGJITmxYRzRnSUNBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkpiblF4Tmt4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtTVzUwTVRZb2RHaHBjeXdnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwTVRaQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRWx1ZERFMktIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkVsdWRETXlJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ2Wm1aelpYUWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JRzltWm5ObGRDY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FySURNZ1BDQmlkV1l1YkdWdVozUm9MQ0FuVkhKNWFXNW5JSFJ2SUhKbFlXUWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQjlYRzVjYmlBZ2RtRnlJR3hsYmlBOUlHSjFaaTVzWlc1bmRHaGNiaUFnYVdZZ0tHOW1abk5sZENBK1BTQnNaVzRwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnZG1GeUlIWmhiQ0E5SUY5eVpXRmtWVWx1ZERNeUtHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lIUnlkV1VwWEc0Z0lIWmhjaUJ1WldjZ1BTQjJZV3dnSmlBd2VEZ3dNREF3TURBd1hHNGdJR2xtSUNodVpXY3BYRzRnSUNBZ2NtVjBkWEp1SUNnd2VHWm1abVptWm1abUlDMGdkbUZzSUNzZ01Ta2dLaUF0TVZ4dUlDQmxiSE5sWEc0Z0lDQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JKYm5Rek1reEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrU1c1ME16SW9kR2hwY3l3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkVsdWRETXlLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpFWnNiMkYwSUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQnBaV1ZsTnpVMExuSmxZV1FvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnTWpNc0lEUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVpzYjJGMFRFVWdQU0JtZFc1amRHbHZiaUFvYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnlaWFIxY200Z1gzSmxZV1JHYkc5aGRDaDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JHYkc5aGRFSkZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUm14dllYUW9kR2hwY3l3Z2IyWm1jMlYwTENCbVlXeHpaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjl5WldGa1JHOTFZbXhsSUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QTNJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQnBaV1ZsTnpVMExuSmxZV1FvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnTlRJc0lEZ3BYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVJ2ZFdKc1pVeEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUkc5MVlteGxLSFJvYVhNc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVSdmRXSnNaVUpGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JHOTFZbXhsS0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxWVWx1ZERnZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QjJZV3gxWlNjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElEd2dkR2hwY3k1c1pXNW5kR2dzSUNkMGNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1kV2x1ZENoMllXeDFaU3dnTUhobVppbGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BJSEpsZEhWeWJseHVYRzRnSUhSb2FYTmJiMlptYzJWMFhTQTlJSFpoYkhWbFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVlZKYm5ReE5pQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeElEd2dZblZtTG14bGJtZDBhQ3dnSjNSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWjFhVzUwS0haaGJIVmxMQ0F3ZUdabVptWXBYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2FpQTlJRTFoZEdndWJXbHVLR3hsYmlBdElHOW1abk5sZEN3Z01pazdJR2tnUENCcU95QnBLeXNwSUh0Y2JpQWdJQ0JpZFdaYmIyWm1jMlYwSUNzZ2FWMGdQVnh1SUNBZ0lDQWdJQ0FvZG1Gc2RXVWdKaUFvTUhobVppQThQQ0FvT0NBcUlDaHNhWFIwYkdWRmJtUnBZVzRnUHlCcElEb2dNU0F0SUdrcEtTa3BJRDQrUGx4dUlDQWdJQ0FnSUNBZ0lDQWdLR3hwZEhSc1pVVnVaR2xoYmlBL0lHa2dPaUF4SUMwZ2FTa2dLaUE0WEc0Z0lIMWNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVlZKYm5ReE5reEZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlZWSmJuUXhOaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlZWSmJuUXhOa0pGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpWVkpiblF4TmloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQm1ZV3h6WlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVlZKYm5Rek1pQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjNSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWjFhVzUwS0haaGJIVmxMQ0F3ZUdabVptWm1abVptS1Z4dUlDQjlYRzVjYmlBZ2RtRnlJR3hsYmlBOUlHSjFaaTVzWlc1bmRHaGNiaUFnYVdZZ0tHOW1abk5sZENBK1BTQnNaVzRwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQXNJR29nUFNCTllYUm9MbTFwYmloc1pXNGdMU0J2Wm1aelpYUXNJRFFwT3lCcElEd2dhanNnYVNzcktTQjdYRzRnSUNBZ1luVm1XMjltWm5ObGRDQXJJR2xkSUQxY2JpQWdJQ0FnSUNBZ0tIWmhiSFZsSUQ0K1BpQW9iR2wwZEd4bFJXNWthV0Z1SUQ4Z2FTQTZJRE1nTFNCcEtTQXFJRGdwSUNZZ01IaG1abHh1SUNCOVhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVlZTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZWU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZWU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWVlNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFNXNTBPQ0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaemFXNTBLSFpoYkhWbExDQXdlRGRtTENBdE1IZzRNQ2xjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnYVdZZ0tIWmhiSFZsSUQ0OUlEQXBYRzRnSUNBZ2RHaHBjeTUzY21sMFpWVkpiblE0S0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLVnh1SUNCbGJITmxYRzRnSUNBZ2RHaHBjeTUzY21sMFpWVkpiblE0S0RCNFptWWdLeUIyWVd4MVpTQXJJREVzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpVbHVkREUySUNoaWRXWXNJSFpoYkhWbExDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlIWmhiSFZsSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCMllXeDFaU2NwWEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQnZabVp6WlhRZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklHOW1abk5sZENjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQXJJREVnUENCaWRXWXViR1Z1WjNSb0xDQW5WSEo1YVc1bklIUnZJSGR5YVhSbElHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ0lDQjJaWEpwWm5OcGJuUW9kbUZzZFdVc0lEQjROMlptWml3Z0xUQjRPREF3TUNsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbUlDaDJZV3gxWlNBK1BTQXdLVnh1SUNBZ0lGOTNjbWwwWlZWSmJuUXhOaWhpZFdZc0lIWmhiSFZsTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBYRzRnSUdWc2MyVmNiaUFnSUNCZmQzSnBkR1ZWU1c1ME1UWW9ZblZtTENBd2VHWm1abVlnS3lCMllXeDFaU0FySURFc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVsdWRERTJURVVnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFNXNTBNVFlvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWSmJuUXhOa0pGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpVbHVkREUyS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNkeWFYUmxTVzUwTXpJZ0tHSjFaaXdnZG1Gc2RXVXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTXlBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbWMybHVkQ2gyWVd4MVpTd2dNSGczWm1abVptWm1aaXdnTFRCNE9EQXdNREF3TURBcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCcFppQW9kbUZzZFdVZ1BqMGdNQ2xjYmlBZ0lDQmZkM0pwZEdWVlNXNTBNeklvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLVnh1SUNCbGJITmxYRzRnSUNBZ1gzZHlhWFJsVlVsdWRETXlLR0oxWml3Z01IaG1abVptWm1abVppQXJJSFpoYkhWbElDc2dNU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZKYm5Rek1paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVWx1ZERNeVFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZkM0pwZEdWR2JHOWhkQ0FvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1pKUlVWRk56VTBLSFpoYkhWbExDQXpMalF3TWpneU16UTJOak00TlRJNE9EWmxLek00TENBdE15NDBNREk0TWpNME5qWXpPRFV5T0RnMlpTc3pPQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xsWldVM05UUXVkM0pwZEdVb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSURJekxDQTBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUm14dllYUk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWR2JHOWhkQ2gwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVac2IyRjBRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJteHZZWFFvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmZDNKcGRHVkViM1ZpYkdVZ0tHSjFaaXdnZG1Gc2RXVXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTnlBOElHSjFaaTVzWlc1bmRHZ3NYRzRnSUNBZ0lDQWdJQ2RVY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbVNVVkZSVGMxTkNoMllXeDFaU3dnTVM0M09UYzJPVE14TXpRNE5qSXpNVFUzUlNzek1EZ3NJQzB4TGpjNU56WTVNekV6TkRnMk1qTXhOVGRGS3pNd09DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbGxaV1UzTlRRdWQzSnBkR1VvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRFV5TENBNEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSRzkxWW14bFRFVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUkc5MVlteGxLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUkc5MVlteGxRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJHOTFZbXhsS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1THk4Z1ptbHNiQ2gyWVd4MVpTd2djM1JoY25ROU1Dd2daVzVrUFdKMVptWmxjaTVzWlc1bmRHZ3BYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbVpwYkd3Z1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lITjBZWEowTENCbGJtUXBJSHRjYmlBZ2FXWWdLQ0YyWVd4MVpTa2dkbUZzZFdVZ1BTQXdYRzRnSUdsbUlDZ2hjM1JoY25RcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ2tnWlc1a0lEMGdkR2hwY3k1c1pXNW5kR2hjYmx4dUlDQnBaaUFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJSFpoYkhWbElEMGdkbUZzZFdVdVkyaGhja052WkdWQmRDZ3dLVnh1SUNCOVhHNWNiaUFnWVhOelpYSjBLSFI1Y0dWdlppQjJZV3gxWlNBOVBUMGdKMjUxYldKbGNpY2dKaVlnSVdselRtRk9LSFpoYkhWbEtTd2dKM1poYkhWbElHbHpJRzV2ZENCaElHNTFiV0psY2ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ2MzUmhjblFzSUNkbGJtUWdQQ0J6ZEdGeWRDY3BYRzVjYmlBZ0x5OGdSbWxzYkNBd0lHSjVkR1Z6T3lCM1pTZHlaU0JrYjI1bFhHNGdJR2xtSUNobGJtUWdQVDA5SUhOMFlYSjBLU0J5WlhSMWNtNWNiaUFnYVdZZ0tIUm9hWE11YkdWdVozUm9JRDA5UFNBd0tTQnlaWFIxY201Y2JseHVJQ0JoYzNObGNuUW9jM1JoY25RZ1BqMGdNQ0FtSmlCemRHRnlkQ0E4SUhSb2FYTXViR1Z1WjNSb0xDQW5jM1JoY25RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnTUNBbUppQmxibVFnUEQwZ2RHaHBjeTVzWlc1bmRHZ3NJQ2RsYm1RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SUhOMFlYSjBPeUJwSUR3Z1pXNWtPeUJwS3lzcElIdGNiaUFnSUNCMGFHbHpXMmxkSUQwZ2RtRnNkV1ZjYmlBZ2ZWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1sdWMzQmxZM1FnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQnZkWFFnUFNCYlhWeHVJQ0IyWVhJZ2JHVnVJRDBnZEdocGN5NXNaVzVuZEdoY2JpQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lHa3JLeWtnZTF4dUlDQWdJRzkxZEZ0cFhTQTlJSFJ2U0dWNEtIUm9hWE5iYVYwcFhHNGdJQ0FnYVdZZ0tHa2dQVDA5SUdWNGNHOXlkSE11U1U1VFVFVkRWRjlOUVZoZlFsbFVSVk1wSUh0Y2JpQWdJQ0FnSUc5MWRGdHBJQ3NnTVYwZ1BTQW5MaTR1SjF4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUNjOFFuVm1abVZ5SUNjZ0t5QnZkWFF1YW05cGJpZ25JQ2NwSUNzZ0p6NG5YRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJnUVhKeVlYbENkV1ptWlhKZ0lIZHBkR2dnZEdobElDcGpiM0JwWldRcUlHMWxiVzl5ZVNCdlppQjBhR1VnWW5WbVptVnlJR2x1YzNSaGJtTmxMbHh1SUNvZ1FXUmtaV1FnYVc0Z1RtOWtaU0F3TGpFeUxpQlBibXg1SUdGMllXbHNZV0pzWlNCcGJpQmljbTkzYzJWeWN5QjBhR0YwSUhOMWNIQnZjblFnUVhKeVlYbENkV1ptWlhJdVhHNGdLaTljYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5QmNuSmhlVUoxWm1abGNpQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJWYVc1ME9FRnljbUY1SUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJR2xtSUNoQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdLRzVsZHlCQ2RXWm1aWElvZEdocGN5a3BMbUoxWm1abGNseHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IyWVhJZ1luVm1JRDBnYm1WM0lGVnBiblE0UVhKeVlYa29kR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2diR1Z1SUQwZ1luVm1MbXhsYm1kMGFEc2dhU0E4SUd4bGJqc2dhU0FyUFNBeEtWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQjBhR2x6VzJsZFhHNGdJQ0FnSUNCeVpYUjFjbTRnWW5WbUxtSjFabVpsY2x4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMEoxWm1abGNpNTBiMEZ5Y21GNVFuVm1abVZ5SUc1dmRDQnpkWEJ3YjNKMFpXUWdhVzRnZEdocGN5QmljbTkzYzJWeUp5bGNiaUFnZlZ4dWZWeHVYRzR2THlCSVJVeFFSVklnUmxWT1ExUkpUMDVUWEc0dkx5QTlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibVoxYm1OMGFXOXVJSE4wY21sdVozUnlhVzBnS0hOMGNpa2dlMXh1SUNCcFppQW9jM1J5TG5SeWFXMHBJSEpsZEhWeWJpQnpkSEl1ZEhKcGJTZ3BYRzRnSUhKbGRIVnliaUJ6ZEhJdWNtVndiR0ZqWlNndlhseGNjeXQ4WEZ4ekt5UXZaeXdnSnljcFhHNTlYRzVjYm5aaGNpQkNVQ0E5SUVKMVptWmxjaTV3Y205MGIzUjVjR1ZjYmx4dUx5b3FYRzRnS2lCQmRXZHRaVzUwSUdFZ1ZXbHVkRGhCY25KaGVTQXFhVzV6ZEdGdVkyVXFJQ2h1YjNRZ2RHaGxJRlZwYm5RNFFYSnlZWGtnWTJ4aGMzTWhLU0IzYVhSb0lFSjFabVpsY2lCdFpYUm9iMlJ6WEc0Z0tpOWNia0oxWm1abGNpNWZZWFZuYldWdWRDQTlJR1oxYm1OMGFXOXVJQ2hoY25JcElIdGNiaUFnWVhKeUxsOXBjMEoxWm1abGNpQTlJSFJ5ZFdWY2JseHVJQ0F2THlCellYWmxJSEpsWm1WeVpXNWpaU0IwYnlCdmNtbG5hVzVoYkNCVmFXNTBPRUZ5Y21GNUlHZGxkQzl6WlhRZ2JXVjBhRzlrY3lCaVpXWnZjbVVnYjNabGNuZHlhWFJwYm1kY2JpQWdZWEp5TGw5blpYUWdQU0JoY25JdVoyVjBYRzRnSUdGeWNpNWZjMlYwSUQwZ1lYSnlMbk5sZEZ4dVhHNGdJQzh2SUdSbGNISmxZMkYwWldRc0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQnViMlJsSURBdU1UTXJYRzRnSUdGeWNpNW5aWFFnUFNCQ1VDNW5aWFJjYmlBZ1lYSnlMbk5sZENBOUlFSlFMbk5sZEZ4dVhHNGdJR0Z5Y2k1M2NtbDBaU0E5SUVKUUxuZHlhWFJsWEc0Z0lHRnljaTUwYjFOMGNtbHVaeUE5SUVKUUxuUnZVM1J5YVc1blhHNGdJR0Z5Y2k1MGIweHZZMkZzWlZOMGNtbHVaeUE5SUVKUUxuUnZVM1J5YVc1blhHNGdJR0Z5Y2k1MGIwcFRUMDRnUFNCQ1VDNTBiMHBUVDA1Y2JpQWdZWEp5TG1OdmNIa2dQU0JDVUM1amIzQjVYRzRnSUdGeWNpNXpiR2xqWlNBOUlFSlFMbk5zYVdObFhHNGdJR0Z5Y2k1eVpXRmtWVWx1ZERnZ1BTQkNVQzV5WldGa1ZVbHVkRGhjYmlBZ1lYSnlMbkpsWVdSVlNXNTBNVFpNUlNBOUlFSlFMbkpsWVdSVlNXNTBNVFpNUlZ4dUlDQmhjbkl1Y21WaFpGVkpiblF4TmtKRklEMGdRbEF1Y21WaFpGVkpiblF4TmtKRlhHNGdJR0Z5Y2k1eVpXRmtWVWx1ZERNeVRFVWdQU0JDVUM1eVpXRmtWVWx1ZERNeVRFVmNiaUFnWVhKeUxuSmxZV1JWU1c1ME16SkNSU0E5SUVKUUxuSmxZV1JWU1c1ME16SkNSVnh1SUNCaGNuSXVjbVZoWkVsdWREZ2dQU0JDVUM1eVpXRmtTVzUwT0Z4dUlDQmhjbkl1Y21WaFpFbHVkREUyVEVVZ1BTQkNVQzV5WldGa1NXNTBNVFpNUlZ4dUlDQmhjbkl1Y21WaFpFbHVkREUyUWtVZ1BTQkNVQzV5WldGa1NXNTBNVFpDUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRE15VEVVZ1BTQkNVQzV5WldGa1NXNTBNekpNUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRE15UWtVZ1BTQkNVQzV5WldGa1NXNTBNekpDUlZ4dUlDQmhjbkl1Y21WaFpFWnNiMkYwVEVVZ1BTQkNVQzV5WldGa1JteHZZWFJNUlZ4dUlDQmhjbkl1Y21WaFpFWnNiMkYwUWtVZ1BTQkNVQzV5WldGa1JteHZZWFJDUlZ4dUlDQmhjbkl1Y21WaFpFUnZkV0pzWlV4RklEMGdRbEF1Y21WaFpFUnZkV0pzWlV4RlhHNGdJR0Z5Y2k1eVpXRmtSRzkxWW14bFFrVWdQU0JDVUM1eVpXRmtSRzkxWW14bFFrVmNiaUFnWVhKeUxuZHlhWFJsVlVsdWREZ2dQU0JDVUM1M2NtbDBaVlZKYm5RNFhHNGdJR0Z5Y2k1M2NtbDBaVlZKYm5ReE5reEZJRDBnUWxBdWQzSnBkR1ZWU1c1ME1UWk1SVnh1SUNCaGNuSXVkM0pwZEdWVlNXNTBNVFpDUlNBOUlFSlFMbmR5YVhSbFZVbHVkREUyUWtWY2JpQWdZWEp5TG5keWFYUmxWVWx1ZERNeVRFVWdQU0JDVUM1M2NtbDBaVlZKYm5Rek1reEZYRzRnSUdGeWNpNTNjbWwwWlZWSmJuUXpNa0pGSUQwZ1FsQXVkM0pwZEdWVlNXNTBNekpDUlZ4dUlDQmhjbkl1ZDNKcGRHVkpiblE0SUQwZ1FsQXVkM0pwZEdWSmJuUTRYRzRnSUdGeWNpNTNjbWwwWlVsdWRERTJURVVnUFNCQ1VDNTNjbWwwWlVsdWRERTJURVZjYmlBZ1lYSnlMbmR5YVhSbFNXNTBNVFpDUlNBOUlFSlFMbmR5YVhSbFNXNTBNVFpDUlZ4dUlDQmhjbkl1ZDNKcGRHVkpiblF6TWt4RklEMGdRbEF1ZDNKcGRHVkpiblF6TWt4RlhHNGdJR0Z5Y2k1M2NtbDBaVWx1ZERNeVFrVWdQU0JDVUM1M2NtbDBaVWx1ZERNeVFrVmNiaUFnWVhKeUxuZHlhWFJsUm14dllYUk1SU0E5SUVKUUxuZHlhWFJsUm14dllYUk1SVnh1SUNCaGNuSXVkM0pwZEdWR2JHOWhkRUpGSUQwZ1FsQXVkM0pwZEdWR2JHOWhkRUpGWEc0Z0lHRnljaTUzY21sMFpVUnZkV0pzWlV4RklEMGdRbEF1ZDNKcGRHVkViM1ZpYkdWTVJWeHVJQ0JoY25JdWQzSnBkR1ZFYjNWaWJHVkNSU0E5SUVKUUxuZHlhWFJsUkc5MVlteGxRa1ZjYmlBZ1lYSnlMbVpwYkd3Z1BTQkNVQzVtYVd4c1hHNGdJR0Z5Y2k1cGJuTndaV04wSUQwZ1FsQXVhVzV6Y0dWamRGeHVJQ0JoY25JdWRHOUJjbkpoZVVKMVptWmxjaUE5SUVKUUxuUnZRWEp5WVhsQ2RXWm1aWEpjYmx4dUlDQnlaWFIxY200Z1lYSnlYRzU5WEc1Y2JpOHZJSE5zYVdObEtITjBZWEowTENCbGJtUXBYRzVtZFc1amRHbHZiaUJqYkdGdGNDQW9hVzVrWlhnc0lHeGxiaXdnWkdWbVlYVnNkRlpoYkhWbEtTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2FXNWtaWGdnSVQwOUlDZHVkVzFpWlhJbktTQnlaWFIxY200Z1pHVm1ZWFZzZEZaaGJIVmxYRzRnSUdsdVpHVjRJRDBnZm41cGJtUmxlRHNnSUM4dklFTnZaWEpqWlNCMGJ5QnBiblJsWjJWeUxseHVJQ0JwWmlBb2FXNWtaWGdnUGowZ2JHVnVLU0J5WlhSMWNtNGdiR1Z1WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0F3S1NCeVpYUjFjbTRnYVc1a1pYaGNiaUFnYVc1a1pYZ2dLejBnYkdWdVhHNGdJR2xtSUNocGJtUmxlQ0ErUFNBd0tTQnlaWFIxY200Z2FXNWtaWGhjYmlBZ2NtVjBkWEp1SURCY2JuMWNibHh1Wm5WdVkzUnBiMjRnWTI5bGNtTmxJQ2hzWlc1bmRHZ3BJSHRjYmlBZ0x5OGdRMjlsY21ObElHeGxibWQwYUNCMGJ5QmhJRzUxYldKbGNpQW9jRzl6YzJsaWJIa2dUbUZPS1N3Z2NtOTFibVFnZFhCY2JpQWdMeThnYVc0Z1kyRnpaU0JwZENkeklHWnlZV04wYVc5dVlXd2dLR1V1Wnk0Z01USXpMalExTmlrZ2RHaGxiaUJrYnlCaFhHNGdJQzh2SUdSdmRXSnNaU0J1WldkaGRHVWdkRzhnWTI5bGNtTmxJR0VnVG1GT0lIUnZJREF1SUVWaGMza3NJSEpwWjJoMFAxeHVJQ0JzWlc1bmRHZ2dQU0IrZmsxaGRHZ3VZMlZwYkNncmJHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z2JHVnVaM1JvSUR3Z01DQS9JREFnT2lCc1pXNW5kR2hjYm4xY2JseHVablZ1WTNScGIyNGdhWE5CY25KaGVTQW9jM1ZpYW1WamRDa2dlMXh1SUNCeVpYUjFjbTRnS0VGeWNtRjVMbWx6UVhKeVlYa2dmSHdnWm5WdVkzUnBiMjRnS0hOMVltcGxZM1FwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5NWpZV3hzS0hOMVltcGxZM1FwSUQwOVBTQW5XMjlpYW1WamRDQkJjbkpoZVYwblhHNGdJSDBwS0hOMVltcGxZM1FwWEc1OVhHNWNibVoxYm1OMGFXOXVJR2x6UVhKeVlYbHBjMmdnS0hOMVltcGxZM1FwSUh0Y2JpQWdjbVYwZFhKdUlHbHpRWEp5WVhrb2MzVmlhbVZqZENrZ2ZId2dRblZtWm1WeUxtbHpRblZtWm1WeUtITjFZbXBsWTNRcElIeDhYRzRnSUNBZ0lDQnpkV0pxWldOMElDWW1JSFI1Y0dWdlppQnpkV0pxWldOMElEMDlQU0FuYjJKcVpXTjBKeUFtSmx4dUlDQWdJQ0FnZEhsd1pXOW1JSE4xWW1wbFkzUXViR1Z1WjNSb0lEMDlQU0FuYm5WdFltVnlKMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjBiMGhsZUNBb2Jpa2dlMXh1SUNCcFppQW9iaUE4SURFMktTQnlaWFIxY200Z0p6QW5JQ3NnYmk1MGIxTjBjbWx1WnlneE5pbGNiaUFnY21WMGRYSnVJRzR1ZEc5VGRISnBibWNvTVRZcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUhWMFpqaFViMEo1ZEdWeklDaHpkSElwSUh0Y2JpQWdkbUZ5SUdKNWRHVkJjbkpoZVNBOUlGdGRYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2MzUnlMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHSWdQU0J6ZEhJdVkyaGhja052WkdWQmRDaHBLVnh1SUNBZ0lHbG1JQ2hpSUR3OUlEQjROMFlwWEc0Z0lDQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHpkSEl1WTJoaGNrTnZaR1ZCZENocEtTbGNiaUFnSUNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoY2lCemRHRnlkQ0E5SUdsY2JpQWdJQ0FnSUdsbUlDaGlJRDQ5SURCNFJEZ3dNQ0FtSmlCaUlEdzlJREI0UkVaR1Jpa2dhU3NyWEc0Z0lDQWdJQ0IyWVhJZ2FDQTlJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhJdWMyeHBZMlVvYzNSaGNuUXNJR2tyTVNrcExuTjFZbk4wY2lneEtTNXpjR3hwZENnbkpTY3BYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnFJRDBnTURzZ2FpQThJR2d1YkdWdVozUm9PeUJxS3lzcFhHNGdJQ0FnSUNBZ0lHSjVkR1ZCY25KaGVTNXdkWE5vS0hCaGNuTmxTVzUwS0doYmFsMHNJREUyS1NsY2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJR0o1ZEdWQmNuSmhlVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhjMk5wYVZSdlFubDBaWE1nS0hOMGNpa2dlMXh1SUNCMllYSWdZbmwwWlVGeWNtRjVJRDBnVzExY2JpQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6ZEhJdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQXZMeUJPYjJSbEozTWdZMjlrWlNCelpXVnRjeUIwYnlCaVpTQmtiMmx1WnlCMGFHbHpJR0Z1WkNCdWIzUWdKaUF3ZURkR0xpNWNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2h6ZEhJdVkyaGhja052WkdWQmRDaHBLU0FtSURCNFJrWXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlHSjVkR1ZCY25KaGVWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWRHWXhObXhsVkc5Q2VYUmxjeUFvYzNSeUtTQjdYRzRnSUhaaGNpQmpMQ0JvYVN3Z2JHOWNiaUFnZG1GeUlHSjVkR1ZCY25KaGVTQTlJRnRkWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2djM1J5TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ1l5QTlJSE4wY2k1amFHRnlRMjlrWlVGMEtHa3BYRzRnSUNBZ2FHa2dQU0JqSUQ0K0lEaGNiaUFnSUNCc2J5QTlJR01nSlNBeU5UWmNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2hzYnlsY2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaG9hU2xjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJpZVhSbFFYSnlZWGxjYm4xY2JseHVablZ1WTNScGIyNGdZbUZ6WlRZMFZHOUNlWFJsY3lBb2MzUnlLU0I3WEc0Z0lISmxkSFZ5YmlCaVlYTmxOalF1ZEc5Q2VYUmxRWEp5WVhrb2MzUnlLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmliR2wwUW5WbVptVnlJQ2h6Y21Nc0lHUnpkQ3dnYjJabWMyVjBMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2RtRnlJSEJ2YzF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tDaHBJQ3NnYjJabWMyVjBJRDQ5SUdSemRDNXNaVzVuZEdncElIeDhJQ2hwSUQ0OUlITnlZeTVzWlc1bmRHZ3BLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrYzNSYmFTQXJJRzltWm5ObGRGMGdQU0J6Y21OYmFWMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2FWeHVmVnh1WEc1bWRXNWpkR2x2YmlCa1pXTnZaR1ZWZEdZNFEyaGhjaUFvYzNSeUtTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdSbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISXBYRzRnSUgwZ1kyRjBZMmdnS0dWeWNpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCVGRISnBibWN1Wm5KdmJVTm9ZWEpEYjJSbEtEQjRSa1pHUkNrZ0x5OGdWVlJHSURnZ2FXNTJZV3hwWkNCamFHRnlYRzRnSUgxY2JuMWNibHh1THlwY2JpQXFJRmRsSUdoaGRtVWdkRzhnYldGclpTQnpkWEpsSUhSb1lYUWdkR2hsSUhaaGJIVmxJR2x6SUdFZ2RtRnNhV1FnYVc1MFpXZGxjaTRnVkdocGN5QnRaV0Z1Y3lCMGFHRjBJR2wwWEc0Z0tpQnBjeUJ1YjI0dGJtVm5ZWFJwZG1VdUlFbDBJR2hoY3lCdWJ5Qm1jbUZqZEdsdmJtRnNJR052YlhCdmJtVnVkQ0JoYm1RZ2RHaGhkQ0JwZENCa2IyVnpJRzV2ZEZ4dUlDb2daWGhqWldWa0lIUm9aU0J0WVhocGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUhabGNtbG1kV2x1ZENBb2RtRnNkV1VzSUcxaGVDa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BqMGdNQ3dnSjNOd1pXTnBabWxsWkNCaElHNWxaMkYwYVhabElIWmhiSFZsSUdadmNpQjNjbWwwYVc1bklHRnVJSFZ1YzJsbmJtVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElEdzlJRzFoZUN3Z0ozWmhiSFZsSUdseklHeGhjbWRsY2lCMGFHRnVJRzFoZUdsdGRXMGdkbUZzZFdVZ1ptOXlJSFI1Y0dVbktWeHVJQ0JoYzNObGNuUW9UV0YwYUM1bWJHOXZjaWgyWVd4MVpTa2dQVDA5SUhaaGJIVmxMQ0FuZG1Gc2RXVWdhR0Z6SUdFZ1puSmhZM1JwYjI1aGJDQmpiMjF3YjI1bGJuUW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjJaWEpwWm5OcGJuUWdLSFpoYkhWbExDQnRZWGdzSUcxcGJpa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BEMGdiV0Y0TENBbmRtRnNkV1VnYkdGeVoyVnlJSFJvWVc0Z2JXRjRhVzExYlNCaGJHeHZkMlZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRDQ5SUcxcGJpd2dKM1poYkhWbElITnRZV3hzWlhJZ2RHaGhiaUJ0YVc1cGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVbktWeHVJQ0JoYzNObGNuUW9UV0YwYUM1bWJHOXZjaWgyWVd4MVpTa2dQVDA5SUhaaGJIVmxMQ0FuZG1Gc2RXVWdhR0Z6SUdFZ1puSmhZM1JwYjI1aGJDQmpiMjF3YjI1bGJuUW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjJaWEpwWmtsRlJVVTNOVFFnS0haaGJIVmxMQ0J0WVhnc0lHMXBiaWtnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQRDBnYldGNExDQW5kbUZzZFdVZ2JHRnlaMlZ5SUhSb1lXNGdiV0Y0YVcxMWJTQmhiR3h2ZDJWa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUQ0OUlHMXBiaXdnSjNaaGJIVmxJSE50WVd4c1pYSWdkR2hoYmlCdGFXNXBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhjM05sY25RZ0tIUmxjM1FzSUcxbGMzTmhaMlVwSUh0Y2JpQWdhV1lnS0NGMFpYTjBLU0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9iV1Z6YzJGblpTQjhmQ0FuUm1GcGJHVmtJR0Z6YzJWeWRHbHZiaWNwWEc1OVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtO1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDE7XG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMTtcbiAgdmFyIG5CaXRzID0gLTc7XG4gIHZhciBpID0gaXNMRSA/IG5CeXRlcyAtIDEgOiAwO1xuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDE7XG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgxIDw8IC1uQml0cykgLSAxO1xuICBzID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgZSA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAocyA/IC0xIDogMSkgKiBJbmZpbml0eTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbik7XG59O1xuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjO1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDE7XG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMTtcbiAgdmFyIHJ0ID0gbUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDA7XG4gIHZhciBpID0gaXNMRSA/IDAgOiBuQnl0ZXMgLSAxO1xuICB2YXIgZCA9IGlzTEUgPyAxIDogLTE7XG4gIHZhciBzID0gdmFsdWUgPCAwIHx8IHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDAgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gZSA8PCBtTGVuIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbVY0Y0c5eWRITWlMQ0p5WldGa0lpd2lZblZtWm1WeUlpd2liMlptYzJWMElpd2lhWE5NUlNJc0ltMU1aVzRpTENKdVFubDBaWE1pTENKbElpd2liU0lzSW1WTVpXNGlMQ0psVFdGNElpd2laVUpwWVhNaUxDSnVRbWwwY3lJc0lta2lMQ0prSWl3aWN5SXNJazVoVGlJc0lrbHVabWx1YVhSNUlpd2lUV0YwYUNJc0luQnZkeUlzSW5keWFYUmxJaXdpZG1Gc2RXVWlMQ0pqSWl3aWNuUWlMQ0poWW5NaUxDSnBjMDVoVGlJc0ltWnNiMjl5SWl3aWJHOW5JaXdpVEU0eUlsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJRU3hSUVVGUlF5eEpRVUZTTEVkQlFXVXNWVUZCVlVNc1RVRkJWaXhGUVVGclFrTXNUVUZCYkVJc1JVRkJNRUpETEVsQlFURkNMRVZCUVdkRFF5eEpRVUZvUXl4RlFVRnpRME1zVFVGQmRFTXNSVUZCT0VNN1FVRkRNMFFzVFVGQlNVTXNRMEZCU2l4RlFVRlBReXhEUVVGUU8wRkJRMEVzVFVGQlNVTXNUMEZCVDBnc1UwRkJVeXhEUVVGVUxFZEJRV0ZFTEVsQlFXSXNSMEZCYjBJc1EwRkJMMEk3UVVGRFFTeE5RVUZKU3l4UFFVRlBMRU5CUVVNc1MwRkJTMFFzU1VGQlRpeEpRVUZqTEVOQlFYcENPMEZCUTBFc1RVRkJTVVVzVVVGQlVVUXNVVUZCVVN4RFFVRndRanRCUVVOQkxFMUJRVWxGTEZGQlFWRXNRMEZCUXl4RFFVRmlPMEZCUTBFc1RVRkJTVU1zU1VGQlNWUXNUMEZCVVVVc1UwRkJVeXhEUVVGcVFpeEhRVUZ6UWl4RFFVRTVRanRCUVVOQkxFMUJRVWxSTEVsQlFVbFdMRTlCUVU4c1EwRkJReXhEUVVGU0xFZEJRVmtzUTBGQmNFSTdRVUZEUVN4TlFVRkpWeXhKUVVGSllpeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeERRVUZTT3p0QlFVVkJRU3hQUVVGTFF5eERRVUZNT3p0QlFVVkJVQ3hOUVVGSlVTeEpRVUZMTEVOQlFVTXNTMEZCVFN4RFFVRkRTQ3hMUVVGU0xFbEJRV3RDTEVOQlFUTkNPMEZCUTBGSExGRkJRVThzUTBGQlEwZ3NTMEZCVWp0QlFVTkJRU3hYUVVGVFNDeEpRVUZVTzBGQlEwRXNVMEZCVDBjc1VVRkJVU3hEUVVGbUxFVkJRV3RDVEN4SlFVRkpRU3hKUVVGSkxFZEJRVW9zUjBGQlZVd3NUMEZCVDBNc1UwRkJVMVVzUTBGQmFFSXNRMEZCWkN4RlFVRnJRMEVzUzBGQlMwTXNRMEZCZGtNc1JVRkJNRU5HTEZOQlFWTXNRMEZCY2tVc1JVRkJkMFVzUTBGQlJUczdRVUZGTVVWS0xFMUJRVWxFTEVsQlFVc3NRMEZCUXl4TFFVRk5MRU5CUVVOTExFdEJRVklzU1VGQmEwSXNRMEZCTTBJN1FVRkRRVXdzVVVGQlR5eERRVUZEU3l4TFFVRlNPMEZCUTBGQkxGZEJRVk5RTEVsQlFWUTdRVUZEUVN4VFFVRlBUeXhSUVVGUkxFTkJRV1lzUlVGQmEwSktMRWxCUVVsQkxFbEJRVWtzUjBGQlNpeEhRVUZWVGl4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4RFFVRmtMRVZCUVd0RFFTeExRVUZMUXl4RFFVRjJReXhGUVVFd1EwWXNVMEZCVXl4RFFVRnlSU3hGUVVGM1JTeERRVUZGT3p0QlFVVXhSU3hOUVVGSlRDeE5RVUZOTEVOQlFWWXNSVUZCWVR0QlFVTllRU3hSUVVGSkxFbEJRVWxKTEV0QlFWSTdRVUZEUkN4SFFVWkVMRTFCUlU4c1NVRkJTVW9zVFVGQlRVY3NTVUZCVml4RlFVRm5RanRCUVVOeVFpeFhRVUZQUml4SlFVRkpVU3hIUVVGS0xFZEJRVmNzUTBGQlEwUXNTVUZCU1N4RFFVRkRMRU5CUVV3c1IwRkJVeXhEUVVGV0xFbEJRV1ZGTEZGQlFXcERPMEZCUTBRc1IwRkdUU3hOUVVWQk8wRkJRMHhVTEZGQlFVbEJMRWxCUVVsVkxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQlVqdEJRVU5CUlN4UlFVRkpRU3hKUVVGSlNTeExRVUZTTzBGQlEwUTdRVUZEUkN4VFFVRlBMRU5CUVVOSkxFbEJRVWtzUTBGQlF5eERRVUZNTEVkQlFWTXNRMEZCVml4SlFVRmxVQ3hEUVVGbUxFZEJRVzFDVlN4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaV2l4SlFVRkpSaXhKUVVGb1FpeERRVUV4UWp0QlFVTkVMRU5CTDBKRU96dEJRV2xEUVV3c1VVRkJVVzlDTEV0QlFWSXNSMEZCWjBJc1ZVRkJWV3hDTEUxQlFWWXNSVUZCYTBKdFFpeExRVUZzUWl4RlFVRjVRbXhDTEUxQlFYcENMRVZCUVdsRFF5eEpRVUZxUXl4RlFVRjFRME1zU1VGQmRrTXNSVUZCTmtORExFMUJRVGRETEVWQlFYRkVPMEZCUTI1RkxFMUJRVWxETEVOQlFVb3NSVUZCVDBNc1EwRkJVQ3hGUVVGVll5eERRVUZXTzBGQlEwRXNUVUZCU1dJc1QwRkJUMGdzVTBGQlV5eERRVUZVTEVkQlFXRkVMRWxCUVdJc1IwRkJiMElzUTBGQkwwSTdRVUZEUVN4TlFVRkpTeXhQUVVGUExFTkJRVU1zUzBGQlMwUXNTVUZCVGl4SlFVRmpMRU5CUVhwQ08wRkJRMEVzVFVGQlNVVXNVVUZCVVVRc1VVRkJVU3hEUVVGd1FqdEJRVU5CTEUxQlFVbGhMRXRCUVUxc1FpeFRRVUZUTEVWQlFWUXNSMEZCWTJFc1MwRkJTME1zUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4RFFVRkRMRVZCUVdJc1NVRkJiVUpFTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzUTBGQlF5eEZRVUZpTEVOQlFXcERMRWRCUVc5RUxFTkJRVGxFTzBGQlEwRXNUVUZCU1U0c1NVRkJTVlFzVDBGQlR5eERRVUZRTEVkQlFWbEZMRk5CUVZNc1EwRkJOMEk3UVVGRFFTeE5RVUZKVVN4SlFVRkpWaXhQUVVGUExFTkJRVkFzUjBGQlZ5eERRVUZETEVOQlFYQkNPMEZCUTBFc1RVRkJTVmNzU1VGQlNVMHNVVUZCVVN4RFFVRlNMRWxCUVdOQkxGVkJRVlVzUTBGQlZpeEpRVUZsTEVsQlFVbEJMRXRCUVVvc1IwRkJXU3hEUVVGNlF5eEhRVUU0UXl4RFFVRTVReXhIUVVGclJDeERRVUV4UkRzN1FVRkZRVUVzVlVGQlVVZ3NTMEZCUzAwc1IwRkJUQ3hEUVVGVFNDeExRVUZVTEVOQlFWSTdPMEZCUlVFc1RVRkJTVWtzVFVGQlRVb3NTMEZCVGl4TFFVRm5Ra0VzVlVGQlZVb3NVVUZCT1VJc1JVRkJkME03UVVGRGRFTlVMRkZCUVVscFFpeE5RVUZOU2l4TFFVRk9MRWxCUVdVc1EwRkJaaXhIUVVGdFFpeERRVUYyUWp0QlFVTkJaQ3hSUVVGSlJ5eEpRVUZLTzBGQlEwUXNSMEZJUkN4TlFVZFBPMEZCUTB4SUxGRkJRVWxYTEV0QlFVdFJMRXRCUVV3c1EwRkJWMUlzUzBGQlMxTXNSMEZCVEN4RFFVRlRUaXhMUVVGVUxFbEJRV3RDU0N4TFFVRkxWU3hIUVVGc1F5eERRVUZLTzBGQlEwRXNVVUZCU1ZBc1UwRkJVME1zU1VGQlNVb3NTMEZCUzBNc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeERRVUZEV2l4RFFVRmlMRU5CUVdJc1NVRkJaME1zUTBGQmNFTXNSVUZCZFVNN1FVRkRja05CTzBGQlEwRmxMRmRCUVVzc1EwRkJURHRCUVVORU8wRkJRMFFzVVVGQlNXWXNTVUZCU1Vrc1MwRkJTaXhKUVVGaExFTkJRV3BDTEVWQlFXOUNPMEZCUTJ4Q1ZTeGxRVUZUUlN4TFFVRkxSQ3hEUVVGa08wRkJRMFFzUzBGR1JDeE5RVVZQTzBGQlEweEVMR1ZCUVZORkxFdEJRVXRNTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzU1VGQlNWSXNTMEZCYUVJc1EwRkJaRHRCUVVORU8wRkJRMFFzVVVGQlNWVXNVVUZCVVVNc1EwRkJVaXhKUVVGaExFTkJRV3BDTEVWQlFXOUNPMEZCUTJ4Q1pqdEJRVU5CWlN4WFFVRkxMRU5CUVV3N1FVRkRSRHM3UVVGRlJDeFJRVUZKWml4SlFVRkpTU3hMUVVGS0xFbEJRV0ZFTEVsQlFXcENMRVZCUVhWQ08wRkJRM0pDUml4VlFVRkpMRU5CUVVvN1FVRkRRVVFzVlVGQlNVY3NTVUZCU2p0QlFVTkVMRXRCU0VRc1RVRkhUeXhKUVVGSlNDeEpRVUZKU1N4TFFVRktMRWxCUVdFc1EwRkJha0lzUlVGQmIwSTdRVUZEZWtKSUxGVkJRVWtzUTBGQlEyRXNVVUZCVVVNc1EwRkJVaXhIUVVGWkxFTkJRV0lzU1VGQmEwSktMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJkRUk3UVVGRFFVVXNWVUZCU1VFc1NVRkJTVWtzUzBGQlVqdEJRVU5FTEV0QlNFMHNUVUZIUVR0QlFVTk1TQ3hWUVVGSllTeFJRVUZSU0N4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaVWl4UlFVRlJMRU5CUVhCQ0xFTkJRVklzUjBGQmFVTlBMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJja003UVVGRFFVVXNWVUZCU1N4RFFVRktPMEZCUTBRN1FVRkRSanM3UVVGRlJDeFRRVUZQUml4UlFVRlJMRU5CUVdZc1JVRkJhMEpJTEU5QlFVOURMRk5CUVZOVkxFTkJRV2hDTEVsQlFYRkNUQ3hKUVVGSkxFbEJRWHBDTEVWQlFTdENTeXhMUVVGTFF5eERRVUZ3UXl4RlFVRjFRMDRzUzBGQlN5eEhRVUUxUXl4RlFVRnBSRWdzVVVGQlVTeERRVUV6UlN4RlFVRTRSU3hEUVVGRk96dEJRVVZvUmtVc1RVRkJTMEVzUzBGQlMwWXNTVUZCVGl4SFFVRmpSeXhEUVVGc1FqdEJRVU5CUXl4VlFVRlJTaXhKUVVGU08wRkJRMEVzVTBGQlQwa3NUMEZCVHl4RFFVRmtMRVZCUVdsQ1VDeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeEpRVUZ4UWs0c1NVRkJTU3hKUVVGNlFpeEZRVUVyUWswc1MwRkJTME1zUTBGQmNFTXNSVUZCZFVOUUxFdEJRVXNzUjBGQk5VTXNSVUZCYVVSRkxGRkJRVkVzUTBGQk1VVXNSVUZCTmtVc1EwRkJSVHM3UVVGRkwwVlFMRk5CUVU5RExGTkJRVk5WTEVOQlFWUXNSMEZCWVVNc1EwRkJjRUlzUzBGQk1FSkRMRWxCUVVrc1IwRkJPVUk3UVVGRFJDeERRV3hFUkNJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltVjRjRzl5ZEhNdWNtVmhaQ0E5SUdaMWJtTjBhVzl1SUNoaWRXWm1aWElzSUc5bVpuTmxkQ3dnYVhOTVJTd2diVXhsYml3Z2JrSjVkR1Z6S1NCN1hHNGdJSFpoY2lCbExDQnRYRzRnSUhaaGNpQmxUR1Z1SUQwZ2JrSjVkR1Z6SUNvZ09DQXRJRzFNWlc0Z0xTQXhYRzRnSUhaaGNpQmxUV0Y0SUQwZ0tERWdQRHdnWlV4bGJpa2dMU0F4WEc0Z0lIWmhjaUJsUW1saGN5QTlJR1ZOWVhnZ1BqNGdNVnh1SUNCMllYSWdia0pwZEhNZ1BTQXROMXh1SUNCMllYSWdhU0E5SUdselRFVWdQeUFvYmtKNWRHVnpJQzBnTVNrZ09pQXdYRzRnSUhaaGNpQmtJRDBnYVhOTVJTQS9JQzB4SURvZ01WeHVJQ0IyWVhJZ2N5QTlJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBYVnh1WEc0Z0lHa2dLejBnWkZ4dVhHNGdJR1VnUFNCeklDWWdLQ2d4SUR3OElDZ3Ria0pwZEhNcEtTQXRJREVwWEc0Z0lITWdQajQ5SUNndGJrSnBkSE1wWEc0Z0lHNUNhWFJ6SUNzOUlHVk1aVzVjYmlBZ1ptOXlJQ2c3SUc1Q2FYUnpJRDRnTURzZ1pTQTlJR1VnS2lBeU5UWWdLeUJpZFdabVpYSmJiMlptYzJWMElDc2dhVjBzSUdrZ0t6MGdaQ3dnYmtKcGRITWdMVDBnT0NrZ2UzMWNibHh1SUNCdElEMGdaU0FtSUNnb01TQThQQ0FvTFc1Q2FYUnpLU2tnTFNBeEtWeHVJQ0JsSUQ0K1BTQW9MVzVDYVhSektWeHVJQ0J1UW1sMGN5QXJQU0J0VEdWdVhHNGdJR1p2Y2lBb095QnVRbWwwY3lBK0lEQTdJRzBnUFNCdElDb2dNalUySUNzZ1luVm1abVZ5VzI5bVpuTmxkQ0FySUdsZExDQnBJQ3M5SUdRc0lHNUNhWFJ6SUMwOUlEZ3BJSHQ5WEc1Y2JpQWdhV1lnS0dVZ1BUMDlJREFwSUh0Y2JpQWdJQ0JsSUQwZ01TQXRJR1ZDYVdGelhHNGdJSDBnWld4elpTQnBaaUFvWlNBOVBUMGdaVTFoZUNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ0SUQ4Z1RtRk9JRG9nS0NoeklEOGdMVEVnT2lBeEtTQXFJRWx1Wm1sdWFYUjVLVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJRzBnUFNCdElDc2dUV0YwYUM1d2IzY29NaXdnYlV4bGJpbGNiaUFnSUNCbElEMGdaU0F0SUdWQ2FXRnpYRzRnSUgxY2JpQWdjbVYwZFhKdUlDaHpJRDhnTFRFZ09pQXhLU0FxSUcwZ0tpQk5ZWFJvTG5CdmR5Z3lMQ0JsSUMwZ2JVeGxiaWxjYm4xY2JseHVaWGh3YjNKMGN5NTNjbWwwWlNBOUlHWjFibU4wYVc5dUlDaGlkV1ptWlhJc0lIWmhiSFZsTENCdlptWnpaWFFzSUdselRFVXNJRzFNWlc0c0lHNUNlWFJsY3lrZ2UxeHVJQ0IyWVhJZ1pTd2diU3dnWTF4dUlDQjJZWElnWlV4bGJpQTlJRzVDZVhSbGN5QXFJRGdnTFNCdFRHVnVJQzBnTVZ4dUlDQjJZWElnWlUxaGVDQTlJQ2d4SUR3OElHVk1aVzRwSUMwZ01WeHVJQ0IyWVhJZ1pVSnBZWE1nUFNCbFRXRjRJRDQrSURGY2JpQWdkbUZ5SUhKMElEMGdLRzFNWlc0Z1BUMDlJREl6SUQ4Z1RXRjBhQzV3YjNjb01pd2dMVEkwS1NBdElFMWhkR2d1Y0c5M0tESXNJQzAzTnlrZ09pQXdLVnh1SUNCMllYSWdhU0E5SUdselRFVWdQeUF3SURvZ0tHNUNlWFJsY3lBdElERXBYRzRnSUhaaGNpQmtJRDBnYVhOTVJTQS9JREVnT2lBdE1WeHVJQ0IyWVhJZ2N5QTlJSFpoYkhWbElEd2dNQ0I4ZkNBb2RtRnNkV1VnUFQwOUlEQWdKaVlnTVNBdklIWmhiSFZsSUR3Z01Da2dQeUF4SURvZ01GeHVYRzRnSUhaaGJIVmxJRDBnVFdGMGFDNWhZbk1vZG1Gc2RXVXBYRzVjYmlBZ2FXWWdLR2x6VG1GT0tIWmhiSFZsS1NCOGZDQjJZV3gxWlNBOVBUMGdTVzVtYVc1cGRIa3BJSHRjYmlBZ0lDQnRJRDBnYVhOT1lVNG9kbUZzZFdVcElEOGdNU0E2SURCY2JpQWdJQ0JsSUQwZ1pVMWhlRnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1VnUFNCTllYUm9MbVpzYjI5eUtFMWhkR2d1Ykc5bktIWmhiSFZsS1NBdklFMWhkR2d1VEU0eUtWeHVJQ0FnSUdsbUlDaDJZV3gxWlNBcUlDaGpJRDBnVFdGMGFDNXdiM2NvTWl3Z0xXVXBLU0E4SURFcElIdGNiaUFnSUNBZ0lHVXRMVnh1SUNBZ0lDQWdZeUFxUFNBeVhHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNobElDc2daVUpwWVhNZ1BqMGdNU2tnZTF4dUlDQWdJQ0FnZG1Gc2RXVWdLejBnY25RZ0x5QmpYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhaaGJIVmxJQ3M5SUhKMElDb2dUV0YwYUM1d2IzY29NaXdnTVNBdElHVkNhV0Z6S1Z4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZG1Gc2RXVWdLaUJqSUQ0OUlESXBJSHRjYmlBZ0lDQWdJR1VySzF4dUlDQWdJQ0FnWXlBdlBTQXlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR1VnS3lCbFFtbGhjeUErUFNCbFRXRjRLU0I3WEc0Z0lDQWdJQ0J0SUQwZ01GeHVJQ0FnSUNBZ1pTQTlJR1ZOWVhoY2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dVZ0t5QmxRbWxoY3lBK1BTQXhLU0I3WEc0Z0lDQWdJQ0J0SUQwZ0tIWmhiSFZsSUNvZ1l5QXRJREVwSUNvZ1RXRjBhQzV3YjNjb01pd2diVXhsYmlsY2JpQWdJQ0FnSUdVZ1BTQmxJQ3NnWlVKcFlYTmNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYlNBOUlIWmhiSFZsSUNvZ1RXRjBhQzV3YjNjb01pd2daVUpwWVhNZ0xTQXhLU0FxSUUxaGRHZ3VjRzkzS0RJc0lHMU1aVzRwWEc0Z0lDQWdJQ0JsSUQwZ01GeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWnZjaUFvT3lCdFRHVnVJRDQ5SURnN0lHSjFabVpsY2x0dlptWnpaWFFnS3lCcFhTQTlJRzBnSmlBd2VHWm1MQ0JwSUNzOUlHUXNJRzBnTHowZ01qVTJMQ0J0VEdWdUlDMDlJRGdwSUh0OVhHNWNiaUFnWlNBOUlDaGxJRHc4SUcxTVpXNHBJSHdnYlZ4dUlDQmxUR1Z1SUNzOUlHMU1aVzVjYmlBZ1ptOXlJQ2c3SUdWTVpXNGdQaUF3T3lCaWRXWm1aWEpiYjJabWMyVjBJQ3NnYVYwZ1BTQmxJQ1lnTUhobVppd2dhU0FyUFNCa0xDQmxJQzg5SURJMU5pd2daVXhsYmlBdFBTQTRLU0I3ZlZ4dVhHNGdJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBJQzBnWkYwZ2ZEMGdjeUFxSURFeU9GeHVmVnh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJy8nO1xufTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUp5YjNkelpYSXVhbk1pWFN3aWJtRnRaWE1pT2xzaWNISnZZMlZ6Y3lJc0ltMXZaSFZzWlNJc0ltVjRjRzl5ZEhNaUxDSnVaWGgwVkdsamF5SXNJbU5oYmxObGRFbHRiV1ZrYVdGMFpTSXNJbmRwYm1SdmR5SXNJbk5sZEVsdGJXVmthV0YwWlNJc0ltTmhibEJ2YzNRaUxDSndiM04wVFdWemMyRm5aU0lzSW1Ga1pFVjJaVzUwVEdsemRHVnVaWElpTENKbUlpd2ljWFZsZFdVaUxDSmxkaUlzSW5OdmRYSmpaU0lzSW1SaGRHRWlMQ0p6ZEc5d1VISnZjR0ZuWVhScGIyNGlMQ0pzWlc1bmRHZ2lMQ0ptYmlJc0luTm9hV1owSWl3aWNIVnphQ0lzSW5ObGRGUnBiV1Z2ZFhRaUxDSjBhWFJzWlNJc0ltSnliM2R6WlhJaUxDSmxibllpTENKaGNtZDJJaXdpYm05dmNDSXNJbTl1SWl3aVlXUmtUR2x6ZEdWdVpYSWlMQ0p2Ym1ObElpd2liMlptSWl3aWNtVnRiM1psVEdsemRHVnVaWElpTENKeVpXMXZkbVZCYkd4TWFYTjBaVzVsY25NaUxDSmxiV2wwSWl3aVltbHVaR2x1WnlJc0ltNWhiV1VpTENKRmNuSnZjaUlzSW1OM1pDSXNJbU5vWkdseUlpd2laR2x5SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQk96dEJRVVZCTEVsQlFVbEJMRlZCUVZWRExFOUJRVTlETEU5QlFWQXNSMEZCYVVJc1JVRkJMMEk3TzBGQlJVRkdMRkZCUVZGSExGRkJRVklzUjBGQmIwSXNXVUZCV1R0QlFVTTFRaXhSUVVGSlF5eHJRa0ZCYTBJc1QwRkJUME1zVFVGQlVDeExRVUZyUWl4WFFVRnNRaXhKUVVOdVFrRXNUMEZCVDBNc1dVRkVWanRCUVVWQkxGRkJRVWxETEZWQlFWVXNUMEZCVDBZc1RVRkJVQ3hMUVVGclFpeFhRVUZzUWl4SlFVTllRU3hQUVVGUFJ5eFhRVVJKTEVsQlExZElMRTlCUVU5SkxHZENRVVJvUXpzN1FVRkpRU3hSUVVGSlRDeGxRVUZLTEVWQlFYRkNPMEZCUTJwQ0xHVkJRVThzVlVGQlZVMHNRMEZCVml4RlFVRmhPMEZCUVVVc2JVSkJRVTlNTEU5QlFVOURMRmxCUVZBc1EwRkJiMEpKTEVOQlFYQkNMRU5CUVZBN1FVRkJLMElzVTBGQmNrUTdRVUZEU0RzN1FVRkZSQ3hSUVVGSlNDeFBRVUZLTEVWQlFXRTdRVUZEVkN4WlFVRkpTU3hSUVVGUkxFVkJRVm83UVVGRFFVNHNaVUZCVDBrc1owSkJRVkFzUTBGQmQwSXNVMEZCZUVJc1JVRkJiVU1zVlVGQlZVY3NSVUZCVml4RlFVRmpPMEZCUXpkRExHZENRVUZKUXl4VFFVRlRSQ3hIUVVGSFF5eE5RVUZvUWp0QlFVTkJMR2RDUVVGSkxFTkJRVU5CTEZkQlFWZFNMRTFCUVZnc1NVRkJjVUpSTEZkQlFWY3NTVUZCYWtNc1MwRkJNRU5FTEVkQlFVZEZMRWxCUVVnc1MwRkJXU3hqUVVFeFJDeEZRVUV3UlR0QlFVTjBSVVlzYlVKQlFVZEhMR1ZCUVVnN1FVRkRRU3h2UWtGQlNVb3NUVUZCVFVzc1RVRkJUaXhIUVVGbExFTkJRVzVDTEVWQlFYTkNPMEZCUTJ4Q0xIZENRVUZKUXl4TFFVRkxUaXhOUVVGTlR5eExRVUZPTEVWQlFWUTdRVUZEUVVRN1FVRkRTRHRCUVVOS08wRkJRMG9zVTBGVVJDeEZRVk5ITEVsQlZFZzdPMEZCVjBFc1pVRkJUeXhUUVVGVFpDeFJRVUZVTEVOQlFXdENZeXhGUVVGc1FpeEZRVUZ6UWp0QlFVTjZRazRzYTBKQlFVMVJMRWxCUVU0c1EwRkJWMFlzUlVGQldEdEJRVU5CV2l4dFFrRkJUMGNzVjBGQlVDeERRVUZ0UWl4alFVRnVRaXhGUVVGdFF5eEhRVUZ1UXp0QlFVTklMRk5CU0VRN1FVRkpTRHM3UVVGRlJDeFhRVUZQTEZOQlFWTk1MRkZCUVZRc1EwRkJhMEpqTEVWQlFXeENMRVZCUVhOQ08wRkJRM3BDUnl4dFFrRkJWMGdzUlVGQldDeEZRVUZsTEVOQlFXWTdRVUZEU0N4TFFVWkVPMEZCUjBnc1EwRnFRMnRDTEVWQlFXNUNPenRCUVcxRFFXcENMRkZCUVZGeFFpeExRVUZTTEVkQlFXZENMRk5CUVdoQ08wRkJRMEZ5UWl4UlFVRlJjMElzVDBGQlVpeEhRVUZyUWl4SlFVRnNRanRCUVVOQmRFSXNVVUZCVVhWQ0xFZEJRVklzUjBGQll5eEZRVUZrTzBGQlEwRjJRaXhSUVVGUmQwSXNTVUZCVWl4SFFVRmxMRVZCUVdZN08wRkJSVUVzVTBGQlUwTXNTVUZCVkN4SFFVRm5RaXhEUVVGRk96dEJRVVZzUW5wQ0xGRkJRVkV3UWl4RlFVRlNMRWRCUVdGRUxFbEJRV0k3UVVGRFFYcENMRkZCUVZFeVFpeFhRVUZTTEVkQlFYTkNSaXhKUVVGMFFqdEJRVU5CZWtJc1VVRkJVVFJDTEVsQlFWSXNSMEZCWlVnc1NVRkJaanRCUVVOQmVrSXNVVUZCVVRaQ0xFZEJRVklzUjBGQlkwb3NTVUZCWkR0QlFVTkJla0lzVVVGQlVUaENMR05CUVZJc1IwRkJlVUpNTEVsQlFYcENPMEZCUTBGNlFpeFJRVUZSSzBJc2EwSkJRVklzUjBGQk5rSk9MRWxCUVRkQ08wRkJRMEY2UWl4UlFVRlJaME1zU1VGQlVpeEhRVUZsVUN4SlFVRm1PenRCUVVWQmVrSXNVVUZCVVdsRExFOUJRVklzUjBGQmEwSXNWVUZCVlVNc1NVRkJWaXhGUVVGblFqdEJRVU01UWl4VlFVRk5MRWxCUVVsRExFdEJRVW9zUTBGQlZTeHJRMEZCVml4RFFVRk9PMEZCUTBnc1EwRkdSRHM3UVVGSlFUdEJRVU5CYmtNc1VVRkJVVzlETEVkQlFWSXNSMEZCWXl4WlFVRlpPMEZCUVVVc1YwRkJUeXhIUVVGUU8wRkJRVmtzUTBGQmVFTTdRVUZEUVhCRExGRkJRVkZ4UXl4TFFVRlNMRWRCUVdkQ0xGVkJRVlZETEVkQlFWWXNSVUZCWlR0QlFVTXpRaXhWUVVGTkxFbEJRVWxJTEV0QlFVb3NRMEZCVlN4blEwRkJWaXhEUVVGT08wRkJRMGdzUTBGR1JDSXNJbVpwYkdVaU9pSmljbTkzYzJWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHk4Z2MyaHBiU0JtYjNJZ2RYTnBibWNnY0hKdlkyVnpjeUJwYmlCaWNtOTNjMlZ5WEc1Y2JuWmhjaUJ3Y205alpYTnpJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3ZlR0Y2JseHVjSEp2WTJWemN5NXVaWGgwVkdsamF5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZG1GeUlHTmhibE5sZEVsdGJXVmthV0YwWlNBOUlIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNBZ0ppWWdkMmx1Wkc5M0xuTmxkRWx0YldWa2FXRjBaVHRjYmlBZ0lDQjJZWElnWTJGdVVHOXpkQ0E5SUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRblhHNGdJQ0FnSmlZZ2QybHVaRzkzTG5CdmMzUk5aWE56WVdkbElDWW1JSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeVhHNGdJQ0FnTzF4dVhHNGdJQ0FnYVdZZ0tHTmhibE5sZEVsdGJXVmthV0YwWlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHWXBJSHNnY21WMGRYSnVJSGRwYm1SdmR5NXpaWFJKYlcxbFpHbGhkR1VvWmlrZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9ZMkZ1VUc5emRDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NYVmxkV1VnUFNCYlhUdGNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMWxjM05oWjJVbkxDQm1kVzVqZEdsdmJpQW9aWFlwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCemIzVnlZMlVnUFNCbGRpNXpiM1Z5WTJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0tITnZkWEpqWlNBOVBUMGdkMmx1Wkc5M0lIeDhJSE52ZFhKalpTQTlQVDBnYm5Wc2JDa2dKaVlnWlhZdVpHRjBZU0E5UFQwZ0ozQnliMk5sYzNNdGRHbGpheWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGRpNXpkRzl3VUhKdmNHRm5ZWFJwYjI0b0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY1hWbGRXVXViR1Z1WjNSb0lENGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWm00Z1BTQnhkV1YxWlM1emFHbG1kQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlN3Z2RISjFaU2s3WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUc1bGVIUlVhV05yS0dadUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeGRXVjFaUzV3ZFhOb0tHWnVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIZHBibVJ2ZHk1d2IzTjBUV1Z6YzJGblpTZ25jSEp2WTJWemN5MTBhV05ySnl3Z0p5b25LVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdibVY0ZEZScFkyc29abTRwSUh0Y2JpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDaG1iaXdnTUNrN1hHNGdJQ0FnZlR0Y2JuMHBLQ2s3WEc1Y2JuQnliMk5sYzNNdWRHbDBiR1VnUFNBblluSnZkM05sY2ljN1hHNXdjbTlqWlhOekxtSnliM2R6WlhJZ1BTQjBjblZsTzF4dWNISnZZMlZ6Y3k1bGJuWWdQU0I3ZlR0Y2JuQnliMk5sYzNNdVlYSm5kaUE5SUZ0ZE8xeHVYRzVtZFc1amRHbHZiaUJ1YjI5d0tDa2dlMzFjYmx4dWNISnZZMlZ6Y3k1dmJpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtRmtaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXViMjVqWlNBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG05bVppQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuSmxiVzkyWlV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y21WdGIzWmxRV3hzVEdsemRHVnVaWEp6SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011WlcxcGRDQTlJRzV2YjNBN1hHNWNibkJ5YjJObGMzTXVZbWx1WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1KcGJtUnBibWNnYVhNZ2JtOTBJSE4xY0hCdmNuUmxaQ2NwTzF4dWZWeHVYRzR2THlCVVQwUlBLSE5vZEhsc2JXRnVLVnh1Y0hKdlkyVnpjeTVqZDJRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUFuTHljZ2ZUdGNibkJ5YjJObGMzTXVZMmhrYVhJZ1BTQm1kVzVqZEdsdmJpQW9aR2x5S1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbU5vWkdseUlHbHpJRzV2ZENCemRYQndiM0owWldRbktUdGNibjA3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcXFxcYnJvd3Nlci5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZGF0YUJhc2UgPSByZXF1aXJlKFwiLi9kYXRhQmFzZVwiKTtcblxudmFyIF9kYXRhQmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXRhQmFzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBjYWxlbmRhclBhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGNhbGVuZGFyUGFnZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgY2FsZW5kYXJQYWdlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhjYWxlbmRhclBhZ2UsIFt7XG4gICAga2V5OiBcIlJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBSZW5kZXIoZGF0ZU1vbnRoKSB7XG4gICAgICB0aGlzLmJ1aWxkSGVhZGVyKCk7XG4gICAgICB0aGlzLmV4aXRCdXR0b24oKTtcbiAgICAgIHRoaXMuUmVuZGVyUGFnZSgpO1xuICAgICAgdGhpcy5yZW5kZXJCdXR0b25DYWxlbmRhcigpO1xuICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihkYXRlTW9udGgpO1xuICAgICAgdGhpcy5hZGRIYW5kbGVyRXZlbnQoZGF0ZU1vbnRoKTtcbiAgICAgIC8vINGH0YLQvi3RgtC+INC90LAg0L/QvtC00L7QsdC40Lgg0LrQvtC90YHRgtGA0YPQutGC0L7RgNCwLCDRgtGD0YIg0YDQtdC90LTQtdGA0LjRhtCwINC60LDQu9C10L3QtNCw0YDRjCDQuCDQtNC+0LHQsNCy0LvRj9GO0YbRhtCwINC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYnVpbGRIZWFkZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRIZWFkZXIoKSB7XG4gICAgICAvL9GC0YPRgiDRgNC10L3QtNC10YDQuNGG0LAg0LrRgtC+INC30LDRiNC10Lsg0Lgg0LrQvdC+0L/QutCwINCy0YvRhdC+0LTQsFxuICAgICAgdmFyIGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKTtcbiAgICAgIGhlYWRlciA9IGhlYWRlci5pbm5lckhUTUwgPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTlcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0zXFxcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVhZFxcXCI+XCIgKyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSArIFwiIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgaWQ9XFxcImV4aXRcXFwiPlxcdTA0MTJcXHUwNDRCXFx1MDQ0NVxcdTA0M0VcXHUwNDM0PC9idXR0b24+PHA+XFxuICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgICBkaXYgPSBkaXYuaW5uZXJIVE1MID0gXCIgXFxuICA8ZGl2IGNsYXNzPVxcXCJjb250YW50XFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cIjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZXhpdEJ1dHRvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBleGl0QnV0dG9uKCkge1xuICAgICAgLy/QvtCx0YDQsNCx0L7RgtGH0LjQuiDQstGL0YXQvtC00LAg0L3QsCDQs9C70LDQstC90YPRjiDRgdGC0YDQsNC90LjRhtGDXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4aXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiUmVuZGVyUGFnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBSZW5kZXJQYWdlKGRhdGVNb250aCkge1xuICAgICAgLy/Qt9C90LDRjiDQvdC1INC70YPRh9GI0LXQtSDQvdCw0LfQstCw0L3QuNC1LCDRgtGD0YIg0YHQvtC30LTQsNGO0YLRjNGB0Y8g0LTQuNCy0Ysg0LTQu9GPINGA0LXQvdC00LDRgNCwINC60LDQu9C10L3QtNCw0YDRjyDQuCDQutC90L7Qv9C+0LpcbiAgICAgIHZhciBwbGFjZUJ1dHRvblJlbmRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFudFwiKS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9XFxcIkJ1dHRvblBsYWNlXFxcIj48L2Rpdj5cIjtcbiAgICAgIHZhciBwbGFjZUNhbGVuZGFyUmVuZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YW50XCIpLmlubmVySFRNTCArPSBcIjxicj48YnI+IDxkaXYgY2xhc3M9XFxcIkNhbGVuZGFyUGxhY2VcXFwiPjwvZGl2PlwiO1xuICAgICAgY29uc29sZS5sb2coZGF0ZU1vbnRoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyQnV0dG9uQ2FsZW5kYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQnV0dG9uQ2FsZW5kYXIoKSB7XG4gICAgICAvLyDRgdCw0LzQsCDQvtGC0YDQuNGB0L7QstC60LAg0LrQvdC+0L/QvtC6XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkJ1dHRvblBsYWNlXCIpLmlubmVySFRNTCA9IFwiICAgIFxcbiAgICAgICAgICA8ZGl2IGFsaWduPVxcXCJjZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGlkPVxcXCJiYWNrQnV0dG9uXFxcIj5cXHUwNDFEXFx1MDQzMFxcdTA0MzdcXHUwNDMwXFx1MDQzNDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibWF0ZXJpYWwtZGVzaWduLWljb25pYy1mb250XFxcIiBpZD1cXFwidGVnTW9udGhcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBpZD1cXFwiZm9yd2FyZEJ1dHRvblxcXCI+XFx1MDQxMlxcdTA0M0ZcXHUwNDM1XFx1MDQ0MFxcdTA0MzVcXHUwNDM0PC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XCI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlckNhbGVuZGFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKGRhdGVNb250aCkge1xuICAgICAgLy/QstC+0YIg0YLRg9GCINGA0LXQvdC00LDRgNC40YbQsCDQutCw0LvQtdC90LTQsNGA0Ywg0L3QsCDRgtC10LrRg9GJ0LjQuSDQvNC10YHRj9GGXG4gICAgICB2YXIgeWVhciA9IGRhdGVNb250aFswXTsgLy8g0YDQsNC30LHQtdGA0LDQtdGC0YzRgdGPINC80LDRgdC40LIg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDQs9C+0LTQsCDQuCDQvNC10YHRj9GG0LBcbiAgICAgIHZhciBtb250aCA9IGRhdGVNb250aFsxXTtcblxuICAgICAgdmFyIGFyck1vbnRoID0gW1xuICAgICAgLy/QvNCw0YHRgdC40LIg0YEg0LzQtdGB0Y/RhtCw0LzQuCDQtNC70Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjyDQutCw0LrQvtC5INGB0LXQudGH0LDRgSDQvNC10YHRj9GGINC4INCz0L7QtFxuICAgICAgXCLQr9C90LLQsNGA0YxcIiwgXCLQpNC10LLRgNCw0LvRjFwiLCBcItCc0LDRgNGCXCIsIFwi0JDQv9GA0LXQu9GMXCIsIFwi0JzQsNC5XCIsIFwi0JjRjtC90YxcIiwgXCLQmNGO0LvRjFwiLCBcItCQ0LLQs9GD0YHRglwiLCBcItCh0LXQvdGC0Y/QsdGA0YxcIiwgXCLQntC60YLRj9Cx0YDRjFwiLCBcItCd0L7Rj9Cx0YDRjFwiLCBcItCU0LXQutCw0LHRgNGMXCJdO1xuICAgICAgdmFyIHNob3dNb250aCA9IG1vbnRoIC0gMTsgLy8g0LzQuNC90YPRgdGD0LXQvCDQvNC10YHRj9GGINGCLtC6INC80LXQvdGP0LvQuCDQvdCw0YfQsNC70L4g0LPQvtC00LAg0L3QtSDRgSAwINCwINGBIDFcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVnTW9udGhcIikuaW5uZXJIVE1MID0gYXJyTW9udGhbc2hvd01vbnRoXSArIFwiIFwiICsgeWVhcjtcbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhbGVuZGFyKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5DYWxlbmRhclBsYWNlXCIpO1xuICAgICAgICB2YXIgbW9uID0gbW9udGggLSAxOyAvLyDQvNC10YHRj9GG0Ysg0LIgSlMg0LjQtNGD0YIg0L7RgiAwINC00L4gMTEsINCwINC90LUg0L7RgiAxINC00L4gMTJcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSh5ZWFyLCBtb24pO1xuICAgICAgICB2YXIgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtaG92ZXJcXFwiPjx0cj48dGg+XFx1MDQzRlxcdTA0M0Q8L3RoPjx0aD5cXHUwNDMyXFx1MDQ0MjwvdGg+PHRoPlxcdTA0NDFcXHUwNDQwPC90aD48dGg+XFx1MDQ0N1xcdTA0NDI8L3RoPjx0aD5cXHUwNDNGXFx1MDQ0MjwvdGg+PHRoPlxcdTA0NDFcXHUwNDMxPC90aD48dGg+XFx1MDQzMlxcdTA0NDE8L3RoPjwvdHI+PHRyPlwiO1xuICAgICAgICAvLyDQt9Cw0L/QvtC70L3QuNGC0Ywg0L/QtdGA0LLRi9C5INGA0Y/QtCDQvtGCINC/0L7QvdC10LTQtdC70YzQvdC40LrQsFxuICAgICAgICAvLyDQuCDQtNC+INC00L3Rjywg0YEg0LrQvtGC0L7RgNC+0LPQviDQvdCw0YfQuNC90LDQtdGC0YHRjyDQvNC10YHRj9GGXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2V0RGF5KGQpOyBpKyspIHtcbiAgICAgICAgICB0YWJsZSArPSBcIjx0ZD48L3RkPlwiO1xuICAgICAgICB9XG4gICAgICAgIC8vINGP0YfQtdC50LrQuCDQutCw0LvQtdC90LTQsNGA0Y8g0YEg0LTQsNGC0LDQvNC4XG4gICAgICAgIHdoaWxlIChkLmdldE1vbnRoKCkgPT0gbW9uKSB7XG4gICAgICAgICAgdGFibGUgKz0gXCI8dGQgY2xhc3M9XFxcImRcIiArIGQuZ2V0RGF0ZSgpICsgXCJfXCIgKyBtb250aCArIFwiX1wiICsgeWVhciArIFwiXFxcIj5cIiArIGQuZ2V0RGF0ZSgpICsgXCI8L3RkPlwiO1xuXG4gICAgICAgICAgaWYgKGdldERheShkKSAlIDcgPT0gNikge1xuICAgICAgICAgICAgLy8g0LLRgSwg0L/QvtGB0LvQtdC00L3QuNC5INC00LXQvdGMIC0g0L/QtdGA0LXQstC+0LQg0YHRgtGA0L7QutC4XG4gICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+PHRyPlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDQtNC+0LHQuNGC0Ywg0YLQsNCx0LvQuNGG0YMg0L/Rg9GB0YLRi9C80Lgg0Y/Rh9C10LnQutCw0LzQuCwg0LXRgdC70Lgg0L3Rg9C20L3QvlxuICAgICAgICBpZiAoZ2V0RGF5KGQpICE9IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gZ2V0RGF5KGQpOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD48L3RkPlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDQt9Cw0LrRgNGL0YLRjCDRgtCw0LHQu9C40YbRg1xuICAgICAgICB0YWJsZSArPSBcIjwvdHI+PC90YWJsZT5cIjtcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC+0LTQvdC+INC/0YDQuNGB0LLQsNC40LLQsNC90LjQtSBpbm5lckhUTUxcbiAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0YWJsZTtcbiAgICAgICAgdmFyIGRhdGFCYXNlID0gbmV3IF9kYXRhQmFzZTIuZGVmYXVsdCgpO1xuXG4gICAgICAgIGRhdGFCYXNlLmxvYWRGcm9tREIoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGdldERheShkYXRlKSB7XG4gICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0L3QvtC80LXRgCDQtNC90Y8g0L3QtdC00LXQu9C4LCDQvtGCIDAo0L/QvSkg0LTQviA2KNCy0YEpXG4gICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICBpZiAoZGF5ID09IDApIGRheSA9IDc7XG4gICAgICAgIHJldHVybiBkYXkgLSAxO1xuICAgICAgfVxuICAgICAgY3JlYXRlQ2FsZW5kYXIoeWVhciwgbW9udGgpOyAvL9Cy0YvQt9C+0LIg0LLQvdGD0YLRgNC10L3QvdC10Lkg0YTRg9C90LrRhtC40Lgg0YDQtdC90LTQsNGA0LAg0LrQsNC70LXQtNCw0YDRj1xuXG4gICAgICByZXR1cm4gZGF0ZU1vbnRoOyAvLyDQstC+0LfRgNCw0YnRj9C10Lwg0LTQsNGC0YMg0L3QsCDQutC+0YLQvtGA0YPRjiDQv9GA0L7QuNC30LLQvtC00LjQu9GB0Y8g0YDQtdC90LTQsNGAINC60LDQu9C10L3QtNCw0YDRj1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRIYW5kbGVyRXZlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkSGFuZGxlckV2ZW50KGRhdGVNb250aCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgLy8g0YLRg9GCINC00L7QsdCw0LLQu9GP0Y7RgtGM0YHRjyDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INC00LvRjyDQu9C40YHRgtCw0L3QuNGPINC80LXRgdGP0YbQtdCyICsg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDQvdCwINGD0LTQsNC70LXQvdC40LUg0Lgg0LTQvtCx0LDQstC70LXQvdC4INC30LDQs9C+0LvQvtCy0LrQvtCyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JhY2tCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZEV2ZW50Rm9yQmFja0J1dG9vbihkYXRlTW9udGgpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZvcndhcmRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZEV2ZW50Rm9yRm9yd2FyZEJ1dHRvbihkYXRlTW9udGgpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGFibGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZENhcHRpb24oZXZlbnQsIGRhdGVNb250aCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuZGVsQ2FwdGlvbihldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkRXZlbnRGb3JGb3J3YXJkQnV0dG9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEV2ZW50Rm9yRm9yd2FyZEJ1dHRvbihkYXRlTW9udGgpIHtcbiAgICAgIC8vINGC0YPRgiDQutC+0LQg0LTQvtCx0LDQstC70LXQvdC40LUg0LzQtdGB0Y/RhtCwINC40LvQuCDQs9C+0LTQsCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC60LDQutC+0Lkg0LzQtdGB0Y/RhiDQv9GA0LjRiNC10LsgKyDQstGL0LfQvtCyINGE0YPQvdC60YbQuNC4INGA0LXQvdC00LDRgNCwINC/0L7Qu9GD0YfQtdC90L3QvtC5INC00LDRgtGLXG4gICAgICB2YXIgeWVhciA9IGRhdGVNb250aFswXTtcbiAgICAgIHZhciBtb250aCA9IGRhdGVNb250aFsxXTtcbiAgICAgIGlmIChtb250aCA9PT0gMTIpIHtcbiAgICAgICAgeWVhciA9IHllYXIgKyAxO1xuICAgICAgICBtb250aCA9IDE7XG4gICAgICAgIGRhdGVNb250aFswXSA9IHllYXI7XG4gICAgICAgIGRhdGVNb250aFsxXSA9IG1vbnRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9udGggPSBtb250aCArIDE7XG4gICAgICAgIGRhdGVNb250aFsxXSA9IG1vbnRoO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5DYWxlbmRhclBsYWNlXCIpLmlubmVySFRNTCA9IFwiXCI7IC8vINC+0YfQuNGB0YLQutCwINC60LDQu9C10L3QtNCw0YDRjyDQtNC70Y8g0YLQvtCz0L4g0YfRgtC+INCx0Ysg0LTQsNGC0Ysg0LzQtdC90Y/Qu9C40YHRjFxuICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihkYXRlTW9udGgpOyAvLyDRgtGD0YIg0YHQsNC8INCy0YvQt9C+0LIg0LTQsNC90L3QvtCz0L4g0LzQtdGC0LDQtNCwINC00LvRjyDRgNC10L3QtNCw0YDQsFxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRFdmVudEZvckJhY2tCdXRvb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRXZlbnRGb3JCYWNrQnV0b29uKGRhdGVNb250aCkge1xuICAgICAgLy8g0YLRg9GCINC60L7QtCDQstGL0YfQuNGC0LAg0LzQtdGB0Y/RhtCwINC40LvQuCDQs9C+0LTQsCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC60LDQutC+0Lkg0LzQtdGB0Y/RhiDQv9GA0LjRiNC10LsgKyDQstGL0LfQvtCyINGE0YPQvdC60YbQuNC4INGA0LXQvdC00LDRgNCwINC/0L7Qu9GD0YfQtdC90L3QvtC5INC00LDRgtGLXG4gICAgICB2YXIgeWVhciA9IGRhdGVNb250aFswXTtcbiAgICAgIHZhciBtb250aCA9IGRhdGVNb250aFsxXTtcbiAgICAgIGlmIChtb250aCA9PT0gMSkge1xuICAgICAgICB5ZWFyID0geWVhciAtIDE7XG4gICAgICAgIG1vbnRoID0gMTI7XG4gICAgICAgIGRhdGVNb250aFswXSA9IHllYXI7XG4gICAgICAgIGRhdGVNb250aFsxXSA9IG1vbnRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9udGggPSBtb250aCAtIDE7XG4gICAgICAgIGRhdGVNb250aFsxXSA9IG1vbnRoO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5DYWxlbmRhclBsYWNlXCIpLmlubmVySFRNTCA9IFwiXCI7IC8vINC+0YfQuNGB0YLQutCwINC60LDQu9C10L3QtNCw0YDRjyDQtNC70Y8g0YLQvtCz0L4g0YfRgtC+INCx0Ysg0LTQsNGC0Ysg0LzQtdC90Y/Qu9C40YHRjFxuICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihkYXRlTW9udGgpOyAvLyDRgtGD0YIg0YHQsNC8INCy0YvQt9C+0LIg0LTQsNC90L3QvtCz0L4g0LzQtdGC0LDQtNCwINC00LvRjyDRgNC10L3QtNCw0YDQsFxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRDYXB0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENhcHRpb24oZSkge1xuICAgICAgLy8g0YLRg9GCINC60L7QtCDQtNC+0LHQsNCy0LvQtdC90LjRjyDQt9Cw0LPQvtC70L7QstC60LBcbiAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAhPT0gXCJURFwiKSByZXR1cm47XG4gICAgICB2YXIgZGF0YSA9IHRhcmdldC5jbGFzc05hbWU7XG4gICAgICB2YXIgcSA9IHByb21wdChcItCS0LLQtdC00LjRgtC1INC30LDQs9C+0LvQvtCy0L7QuiDRgdC+0LHRi9GC0LjRjz9cIiwgXCLQn9C+0LbRgNCw0YLRjFwiKTtcbiAgICAgIGlmICghcSkgcmV0dXJuO1xuICAgICAgdGFyZ2V0LmlubmVySFRNTCArPSBcIjxkaXYgaWQ9XFxcImV2ZW50c1xcXCI+XCIgKyBxICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjcm9zc1xcXCI+W3hdPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICB2YXIgZGF0YUJhc2UgPSBuZXcgX2RhdGFCYXNlMi5kZWZhdWx0KCk7IC8v0YHQvtC30LTQsNC90LjQtSDRjdC60LfQtdC80L/Qu9GP0YDQsCDQutC70LDRgdGB0LAg0LHQsNC30Ysg0LTQsNC90L3Ri9GFXG4gICAgICBkYXRhQmFzZS5TYXZlRXZlbnRJbkRCKHEsIGRhdGEpOyAvLyDQstGL0LfQvtCyINC80LXRgtC+0LTQsCDQuNC3INCx0LDQt9GLINC00LvRjyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQtdCy0LXQvdGC0LAg0L/RgNC40L3QuNC80LDQtdGCINC90LAg0LLRhdC+0LQg0YLQtdC60YHRgiDQt9Cw0LPQvtC70L7QstC60LAg0Lgg0YLQtdCzINCyINC60LDQutC+0Lkg0LfQsNC/0LjRgdCw0LvQuFxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxDYXB0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbENhcHRpb24oZSkge1xuICAgICAgLy8g0YLRg9GCINC60L7QtCDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDQt9Cw0LPQvtC70L7QstC60LBcbiAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAhPT0gXCJCVVRUT05cIikgcmV0dXJuO1xuICAgICAgdmFyIHRleHQgPSB0YXJnZXQucGFyZW50Tm9kZS5pbm5lckhUTUwuc2xpY2UoMCwgLTM0KTtcbiAgICAgIHZhciBkYXRlID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWU7XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgIHZhciBkYXRhQmFzZSA9IG5ldyBfZGF0YUJhc2UyLmRlZmF1bHQoKTsgLy/RgdC+0LfQtNCw0L3QuNC1INGN0LrQt9C10LzQv9C70Y/RgNCwINC60LvQsNGB0YHQsCDQsdCw0LfRiyDQtNCw0L3QvdGL0YVcbiAgICAgIGRhdGFCYXNlLmRlbGV0ZUV2ZW50SW5EQihkYXRlLCB0ZXh0KTsgLy8g0LLRi9C30L7QsiDQvNC10YLQvtC00LAg0LjQtyDQsdCw0LfRiyDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDQtdCy0LXQvdGC0LAg0L/RgNC40L3QuNC80LDQtdGCINC90LAg0LLRhdC+0LQg0YLQtdC60YHRgiDQt9Cw0LPQvtC70L7QstC60LAg0Lgg0YLQtdCzINCyINC60LDQutC+0Lkg0LfQsNC/0LjRgdCw0LvQuFxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBjYWxlbmRhclBhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNhbGVuZGFyUGFnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrTmhiR1Z1WkdGeVVHRm5aUzVxY3lKZExDSnVZVzFsY3lJNld5SmpZV3hsYm1SaGNsQmhaMlVpTENKa1lYUmxUVzl1ZEdnaUxDSmlkV2xzWkVobFlXUmxjaUlzSW1WNGFYUkNkWFIwYjI0aUxDSlNaVzVrWlhKUVlXZGxJaXdpY21WdVpHVnlRblYwZEc5dVEyRnNaVzVrWVhJaUxDSnlaVzVrWlhKRFlXeGxibVJoY2lJc0ltRmtaRWhoYm1Sc1pYSkZkbVZ1ZENJc0ltaGxZV1JsY2lJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltUnBkaUlzSW1sdWJtVnlTRlJOVENJc0luTmxjM05wYjI1VGRHOXlZV2RsSWl3aVoyVjBTWFJsYlNJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSndiR0ZqWlVKMWRIUnZibEpsYm1SbGNpSXNJbkJzWVdObFEyRnNaVzVrWVhKU1pXNWtaWElpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpZVdWaGNpSXNJbTF2Ym5Sb0lpd2lZWEp5VFc5dWRHZ2lMQ0p6YUc5M1RXOXVkR2dpTENKamNtVmhkR1ZEWVd4bGJtUmhjaUlzSW1Wc1pXMGlMQ0p0YjI0aUxDSmtJaXdpUkdGMFpTSXNJblJoWW14bElpd2lhU0lzSW1kbGRFUmhlU0lzSW1kbGRFMXZiblJvSWl3aVoyVjBSR0YwWlNJc0luTmxkRVJoZEdVaUxDSmtZWFJoUW1GelpTSXNJbXh2WVdSR2NtOXRSRUlpTENKa1lYUmxJaXdpWkdGNUlpd2lZV1JrUlhabGJuUkdiM0pDWVdOclFuVjBiMjl1SWl3aVlXUmtSWFpsYm5SR2IzSkdiM0ozWVhKa1FuVjBkRzl1SWl3aVlXUmtRMkZ3ZEdsdmJpSXNJbVYyWlc1MElpd2laR1ZzUTJGd2RHbHZiaUlzSW1VaUxDSjBZWEpuWlhRaUxDSjBZV2RPWVcxbElpd2laR0YwWVNJc0ltTnNZWE56VG1GdFpTSXNJbkVpTENKd2NtOXRjSFFpTENKVFlYWmxSWFpsYm5SSmJrUkNJaXdpZEdWNGRDSXNJbkJoY21WdWRFNXZaR1VpTENKemJHbGpaU0lzSW5KbGJXOTJaU0lzSW1SbGJHVjBaVVYyWlc1MFNXNUVRaUpkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN1FVRkJRVHM3T3pzN096czdTVUZEVFVFc1dUczdPenM3T3pzeVFrRkRSME1zVXl4RlFVRlhPMEZCUTJoQ0xGZEJRVXRETEZkQlFVdzdRVUZEUVN4WFFVRkxReXhWUVVGTU8wRkJRMEVzVjBGQlMwTXNWVUZCVER0QlFVTkJMRmRCUVV0RExHOUNRVUZNTzBGQlEwRXNWMEZCUzBNc1kwRkJUQ3hEUVVGdlFrd3NVMEZCY0VJN1FVRkRRU3hYUVVGTFRTeGxRVUZNTEVOQlFYRkNUaXhUUVVGeVFqdEJRVU5CTzBGQlEwUTdPenRyUTBGRFlUdEJRVU5hTzBGQlEwRXNWVUZCU1U4c1UwRkJVME1zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhSUVVGMlFpeERRVUZpTzBGQlEwRXNWVUZCU1VNc1RVRkJUVVlzVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhMUVVGMlFpeERRVUZXTzBGQlEwRkdMR1ZCUVZOQkxFOUJRVTlKTEZOQlFWQXNaMGhCUjJsQ1F5eGxRVUZsUXl4UFFVRm1MRU5CUTJoQ0xFMUJSR2RDTEVOQlNHcENMR3RJUVVGVU8wRkJUMEZJTEZsQlFVMUJMRWxCUVVsRExGTkJRVW9zY1VSQlFVNDdRVUZIUkRzN08ybERRVU5aTzBGQlExZzdRVUZEUVVnc1pVRkJVME1zWVVGQlZDeERRVUYxUWl4UFFVRjJRaXhGUVVGblEwc3NaMEpCUVdoRExFTkJRV2xFTEU5QlFXcEVMRVZCUVRCRUxGbEJRVTA3UVVGRE9VUkRMR2xDUVVGVFF5eEpRVUZVTEVkQlFXZENMRVZCUVdoQ08wRkJRMFFzVDBGR1JEdEJRVWRFT3pzN0swSkJRMVZvUWl4VExFVkJRVmM3UVVGRGNFSTdRVUZEUVN4VlFVRkphVUlzYjBKQlFYRkNWQ3hUUVVGVFF5eGhRVUZVTEVOQlEzWkNMRlZCUkhWQ0xFVkJSWFpDUlN4VFFVWjFRaXh6UTBGQmVrSTdRVUZIUVN4VlFVRkpUeXh6UWtGQmRVSldMRk5CUVZORExHRkJRVlFzUTBGRGVrSXNWVUZFZVVJc1JVRkZla0pGTEZOQlJubENMR3RFUVVFelFqdEJRVWRCVVN4alFVRlJReXhIUVVGU0xFTkJRVmx3UWl4VFFVRmFPMEZCUTBRN096c3lRMEZEYzBJN1FVRkRja0k3UVVGRFFWRXNaVUZCVTBNc1lVRkJWQ3hEUVVGMVFpeGpRVUYyUWl4RlFVRjFRMFVzVTBGQmRrTTdRVUZOUkRzN08yMURRVU5qV0N4VExFVkJRVmM3UVVGRGVFSTdRVUZEUVN4VlFVRkpjVUlzVDBGQlQzSkNMRlZCUVZVc1EwRkJWaXhEUVVGWUxFTkJSbmRDTEVOQlJVTTdRVUZEZWtJc1ZVRkJTWE5DTEZGQlFWRjBRaXhWUVVGVkxFTkJRVllzUTBGQldqczdRVUZGUVN4VlFVRkpkVUlzVjBGQlZ6dEJRVU5pTzBGQlEwRXNZMEZHWVN4RlFVZGlMRk5CU0dFc1JVRkpZaXhOUVVwaExFVkJTMklzVVVGTVlTeEZRVTFpTEV0QlRtRXNSVUZQWWl4TlFWQmhMRVZCVVdJc1RVRlNZU3hGUVZOaUxGRkJWR0VzUlVGVllpeFZRVlpoTEVWQlYySXNVMEZZWVN4RlFWbGlMRkZCV21Fc1JVRmhZaXhUUVdKaExFTkJRV1k3UVVGbFFTeFZRVUZKUXl4WlFVRlpSaXhSUVVGUkxFTkJRWGhDTEVOQmNFSjNRaXhEUVc5Q1J6dEJRVU16UW1Rc1pVRkJVME1zWVVGQlZDeERRVUYxUWl4WFFVRjJRaXhGUVVGdlEwVXNVMEZCY0VNc1IwRkRSVmtzVTBGQlUwTXNVMEZCVkN4SlFVRnpRaXhIUVVGMFFpeEhRVUUwUWtnc1NVRkVPVUk3UVVGRlFTeGxRVUZUU1N4alFVRlVMRU5CUVhkQ1NpeEpRVUY0UWl4RlFVRTRRa01zUzBGQk9VSXNSVUZCY1VNN1FVRkRia01zV1VGQlNVa3NUMEZCVDJ4Q0xGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1owSkJRWFpDTEVOQlFWZzdRVUZEUVN4WlFVRkphMElzVFVGQlRVd3NVVUZCVVN4RFFVRnNRaXhEUVVadFF5eERRVVZrTzBGQlEzSkNMRmxCUVVsTkxFbEJRVWtzU1VGQlNVTXNTVUZCU2l4RFFVRlRVaXhKUVVGVUxFVkJRV1ZOTEVkQlFXWXNRMEZCVWp0QlFVTkJMRmxCUVVsSExEUk9RVUZLTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVVzc1NVRkJTVU1zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlF5eFBRVUZQU2l4RFFVRlFMRU5CUVhCQ0xFVkJRU3RDUnl4SFFVRXZRaXhGUVVGdlF6dEJRVU5zUTBRc2JVSkJRVk1zVjBGQlZEdEJRVU5FTzBGQlEwUTdRVUZEUVN4bFFVRlBSaXhGUVVGRlN5eFJRVUZHTEUxQlFXZENUaXhIUVVGMlFpeEZRVUUwUWp0QlFVTXhRa2NzY1VOQlFYZENSaXhGUVVGRlRTeFBRVUZHTEVWQlFYaENMRk5CUVhWRFdpeExRVUYyUXl4VFFVRm5SRVFzU1VGQmFFUXNWMEZCZVVSUExFVkJRVVZOTEU5QlFVWXNSVUZCZWtRN08wRkJSVUVzWTBGQlNVWXNUMEZCVDBvc1EwRkJVQ3hKUVVGWkxFTkJRVm9zU1VGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRGRFSTdRVUZEUVVVc2NVSkJRVk1zVjBGQlZEdEJRVU5FTzBGQlEwUkdMRmxCUVVWUExFOUJRVVlzUTBGQlZWQXNSVUZCUlUwc1QwRkJSaXhMUVVGakxFTkJRWGhDTzBGQlEwUTdRVUZEUkR0QlFVTkJMRmxCUVVsR0xFOUJRVTlLTEVOQlFWQXNTMEZCWVN4RFFVRnFRaXhGUVVGdlFqdEJRVU5zUWl4bFFVRkxMRWxCUVVsSExFbEJRVWxETEU5QlFVOUtMRU5CUVZBc1EwRkJZaXhGUVVGM1FrY3NTVUZCU1N4RFFVRTFRaXhGUVVFclFrRXNSMEZCTDBJc1JVRkJiME03UVVGRGJFTkVMSEZDUVVGVExGZEJRVlE3UVVGRFJEdEJRVU5HTzBGQlEwUTdRVUZEUVVFc2FVSkJRVk1zWlVGQlZEdEJRVU5CTzBGQlEwRktMR0ZCUVV0bUxGTkJRVXdzUjBGQmFVSnRRaXhMUVVGcVFqdEJRVU5CTEZsQlFVbE5MRmRCUVZjc2QwSkJRV1k3TzBGQlJVRkJMR2xDUVVGVFF5eFZRVUZVTzBGQlEwUTdRVUZEUkN4bFFVRlRUQ3hOUVVGVUxFTkJRV2RDVFN4SlFVRm9RaXhGUVVGelFqdEJRVU53UWp0QlFVTkJMRmxCUVVsRExFMUJRVTFFTEV0QlFVdE9MRTFCUVV3c1JVRkJWanRCUVVOQkxGbEJRVWxQTEU5QlFVOHNRMEZCV0N4RlFVRmpRU3hOUVVGTkxFTkJRVTQ3UVVGRFpDeGxRVUZQUVN4TlFVRk5MRU5CUVdJN1FVRkRSRHRCUVVORVpDeHhRa0ZCWlVvc1NVRkJaaXhGUVVGeFFrTXNTMEZCY2tJc1JVRXZSSGRDTEVOQkswUkxPenRCUVVVM1FpeGhRVUZQZEVJc1UwRkJVQ3hEUVdwRmQwSXNRMEZwUlU0N1FVRkRia0k3T3p0dlEwRkRaVUVzVXl4RlFVRlhPMEZCUVVFN08wRkJRM3BDTzBGQlEwRlJMR1ZCUTBkRExHRkJSRWdzUTBGRGFVSXNZVUZFYWtJc1JVRkZSMHNzWjBKQlJrZ3NRMEZGYjBJc1QwRkdjRUlzUlVGRk5rSTdRVUZCUVN4bFFVRk5MRTFCUVVzd1FpeHhRa0ZCVEN4RFFVRXlRbmhETEZOQlFUTkNMRU5CUVU0N1FVRkJRU3hQUVVZM1FqdEJRVWRCVVN4bFFVTkhReXhoUVVSSUxFTkJRMmxDTEdkQ1FVUnFRaXhGUVVWSFN5eG5Ra0ZHU0N4RFFVVnZRaXhQUVVad1FpeEZRVVUyUWp0QlFVRkJMR1ZCUTNwQ0xFMUJRVXN5UWl4M1FrRkJUQ3hEUVVFNFFucERMRk5CUVRsQ0xFTkJSSGxDTzBGQlFVRXNUMEZHTjBJN1FVRkxRVkVzWlVGRFIwTXNZVUZFU0N4RFFVTnBRaXhQUVVScVFpeEZRVVZIU3l4blFrRkdTQ3hEUVVWdlFpeFZRVVp3UWl4RlFVVm5RenRCUVVGQkxHVkJRVTBzVFVGQlN6UkNMRlZCUVV3c1EwRkJaMEpETEV0QlFXaENMRVZCUVhWQ00wTXNVMEZCZGtJc1EwRkJUanRCUVVGQkxFOUJSbWhETzBGQlIwRlJMR1ZCUTBkRExHRkJSRWdzUTBGRGFVSXNUMEZFYWtJc1JVRkZSMHNzWjBKQlJrZ3NRMEZGYjBJc1QwRkdjRUlzUlVGRk5rSTdRVUZCUVN4bFFVRk5MRTFCUVVzNFFpeFZRVUZNTEVOQlFXZENSQ3hMUVVGb1FpeERRVUZPTzBGQlFVRXNUMEZHTjBJN1FVRkhSRHM3T3paRFFVTjNRak5ETEZNc1JVRkJWenRCUVVOc1F6dEJRVU5CTEZWQlFVbHhRaXhQUVVGUGNrSXNWVUZCVlN4RFFVRldMRU5CUVZnN1FVRkRRU3hWUVVGSmMwSXNVVUZCVVhSQ0xGVkJRVlVzUTBGQlZpeERRVUZhTzBGQlEwRXNWVUZCU1hOQ0xGVkJRVlVzUlVGQlpDeEZRVUZyUWp0QlFVTm9Ra1FzWlVGQlQwRXNUMEZCVHl4RFFVRmtPMEZCUTBGRExHZENRVUZSTEVOQlFWSTdRVUZEUVhSQ0xHdENRVUZWTEVOQlFWWXNTVUZCWlhGQ0xFbEJRV1k3UVVGRFFYSkNMR3RDUVVGVkxFTkJRVllzU1VGQlpYTkNMRXRCUVdZN1FVRkRSQ3hQUVV4RUxFMUJTMDg3UVVGRFRFRXNaMEpCUVZGQkxGRkJRVkVzUTBGQmFFSTdRVUZEUVhSQ0xHdENRVUZWTEVOQlFWWXNTVUZCWlhOQ0xFdEJRV1k3UVVGRFJEdEJRVU5FWkN4bFFVRlRReXhoUVVGVUxFTkJRWFZDTEdkQ1FVRjJRaXhGUVVGNVEwVXNVMEZCZWtNc1IwRkJjVVFzUlVGQmNrUXNRMEZpYTBNc1EwRmhkVUk3UVVGRGVrUXNWMEZCUzA0c1kwRkJUQ3hEUVVGdlFrd3NVMEZCY0VJc1JVRmthME1zUTBGalJqdEJRVU5xUXpzN096QkRRVU54UWtFc1V5eEZRVUZYTzBGQlF5OUNPMEZCUTBFc1ZVRkJTWEZDTEU5QlFVOXlRaXhWUVVGVkxFTkJRVllzUTBGQldEdEJRVU5CTEZWQlFVbHpRaXhSUVVGUmRFSXNWVUZCVlN4RFFVRldMRU5CUVZvN1FVRkRRU3hWUVVGSmMwSXNWVUZCVlN4RFFVRmtMRVZCUVdsQ08wRkJRMlpFTEdWQlFVOUJMRTlCUVU4c1EwRkJaRHRCUVVOQlF5eG5Ra0ZCVVN4RlFVRlNPMEZCUTBGMFFpeHJRa0ZCVlN4RFFVRldMRWxCUVdWeFFpeEpRVUZtTzBGQlEwRnlRaXhyUWtGQlZTeERRVUZXTEVsQlFXVnpRaXhMUVVGbU8wRkJRMFFzVDBGTVJDeE5RVXRQTzBGQlEweEJMR2RDUVVGUlFTeFJRVUZSTEVOQlFXaENPMEZCUTBGMFFpeHJRa0ZCVlN4RFFVRldMRWxCUVdWelFpeExRVUZtTzBGQlEwUTdRVUZEUkdRc1pVRkJVME1zWVVGQlZDeERRVUYxUWl4blFrRkJka0lzUlVGQmVVTkZMRk5CUVhwRExFZEJRWEZFTEVWQlFYSkVMRU5CWWl0Q0xFTkJZVEJDTzBGQlEzcEVMRmRCUVV0T0xHTkJRVXdzUTBGQmIwSk1MRk5CUVhCQ0xFVkJaQ3RDTEVOQlkwTTdRVUZEYWtNN096c3JRa0ZEVlRaRExFTXNSVUZCUnp0QlFVTmFPMEZCUTBFc1ZVRkJTVU1zVTBGQlUwUXNSVUZCUlVNc1RVRkJaanRCUVVOQkxGVkJRVWxCTEU5QlFVOURMRTlCUVZBc1MwRkJiVUlzU1VGQmRrSXNSVUZCTmtJN1FVRkROMElzVlVGQlNVTXNUMEZCVDBZc1QwRkJUMGNzVTBGQmJFSTdRVUZEUVN4VlFVRkpReXhKUVVGSlF5eFBRVUZQTERSQ1FVRlFMRVZCUVhGRExGTkJRWEpETEVOQlFWSTdRVUZEUVN4VlFVRkpMRU5CUVVORUxFTkJRVXdzUlVGQlVUdEJRVU5TU2l4aFFVRlBia01zVTBGQlVDdzBRa0ZCZDBOMVF5eERRVUY0UXp0QlFVTkJMRlZCUVVsa0xGZEJRVmNzZDBKQlFXWXNRMEZTV1N4RFFWRmhPMEZCUTNwQ1FTeGxRVUZUWjBJc1lVRkJWQ3hEUVVGMVFrWXNRMEZCZGtJc1JVRkJNRUpHTEVsQlFURkNMRVZCVkZrc1EwRlRjVUk3UVVGRGJFTTdPenNyUWtGRFZVZ3NReXhGUVVGSE8wRkJRMW83UVVGRFFTeFZRVUZKUXl4VFFVRlRSQ3hGUVVGRlF5eE5RVUZtTzBGQlEwRXNWVUZCU1VFc1QwRkJUME1zVDBGQlVDeExRVUZ0UWl4UlFVRjJRaXhGUVVGcFF6dEJRVU5xUXl4VlFVRkpUU3hQUVVGUFVDeFBRVUZQVVN4VlFVRlFMRU5CUVd0Q00wTXNVMEZCYkVJc1EwRkJORUkwUXl4TFFVRTFRaXhEUVVGclF5eERRVUZzUXl4RlFVRnhReXhEUVVGRExFVkJRWFJETEVOQlFWZzdRVUZEUVN4VlFVRkpha0lzVDBGQlQxRXNUMEZCVDFFc1ZVRkJVQ3hEUVVGclFrRXNWVUZCYkVJc1EwRkJOa0pNTEZOQlFYaERPMEZCUTBGSUxHRkJRVTlSTEZWQlFWQXNRMEZCYTBKRkxFMUJRV3hDTzBGQlEwRXNWVUZCU1hCQ0xGZEJRVmNzZDBKQlFXWXNRMEZRV1N4RFFVOWhPMEZCUTNwQ1FTeGxRVUZUY1VJc1pVRkJWQ3hEUVVGNVFtNUNMRWxCUVhwQ0xFVkJRU3RDWlN4SlFVRXZRaXhGUVZKWkxFTkJVVEJDTzBGQlEzWkRPenM3T3pzN2EwSkJSVmwwUkN4Wklpd2labWxzWlNJNklrTmhiR1Z1WkdGeVVHRm5aUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCa1lpQm1jbTl0SUZ3aUxpOWtZWFJoUW1GelpWd2lPMXh5WEc1amJHRnpjeUJqWVd4bGJtUmhjbEJoWjJVZ2UxeHlYRzRnSUZKbGJtUmxjaWhrWVhSbFRXOXVkR2dwSUh0Y2NseHVJQ0FnSUhSb2FYTXVZblZwYkdSSVpXRmtaWElvS1R0Y2NseHVJQ0FnSUhSb2FYTXVaWGhwZEVKMWRIUnZiaWdwTzF4eVhHNGdJQ0FnZEdocGN5NVNaVzVrWlhKUVlXZGxLQ2s3WEhKY2JpQWdJQ0IwYUdsekxuSmxibVJsY2tKMWRIUnZia05oYkdWdVpHRnlLQ2s3WEhKY2JpQWdJQ0IwYUdsekxuSmxibVJsY2tOaGJHVnVaR0Z5S0dSaGRHVk5iMjUwYUNrN1hISmNiaUFnSUNCMGFHbHpMbUZrWkVoaGJtUnNaWEpGZG1WdWRDaGtZWFJsVFc5dWRHZ3BPMXh5WEc0Z0lDQWdMeThnMFlmUmd0QytMZEdDMEw0ZzBMM1FzQ0RRdjlDKzBMVFF2dEN4MExqUXVDRFF1dEMrMEwzUmdkR0MwWURSZzlDNjBZTFF2dEdBMExBc0lOR0MwWVBSZ2lEUmdOQzEwTDNRdE5DMTBZRFF1TkdHMExBZzBMclFzTkM3MExYUXZkQzAwTERSZ05HTUlOQzRJTkMwMEw3UXNkQ3cwTExRdTlHUDBZN1JodEdHMExBZzBMN1FzZEdBMExEUXNkQyswWUxSaDlDNDBMclF1Rnh5WEc0Z0lIMWNjbHh1SUNCaWRXbHNaRWhsWVdSbGNpZ3BJSHRjY2x4dUlDQWdJQzh2MFlMUmc5R0NJTkdBMExYUXZkQzAwTFhSZ05DNDBZYlFzQ0RRdXRHQzBMNGcwTGZRc05HSTBMWFF1eURRdUNEUXV0QzkwTDdRdjlDNjBMQWcwTExSaTlHRjBMN1F0TkN3WEhKY2JpQWdJQ0IyWVhJZ2FHVmhaR1Z5SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSW1obFlXUmxjbHdpS1R0Y2NseHVJQ0FnSUhaaGNpQmthWFlnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpWkdsMlhDSXBPMXh5WEc0Z0lDQWdhR1ZoWkdWeUlEMGdhR1ZoWkdWeUxtbHVibVZ5U0ZSTlRDQTlJR0JjY2x4dUlDQThaR2wySUdOc1lYTnpQVndpWTI5c0xXMWtMVGxjSWo0OEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OdmJDMXRaQzB6WENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4d0lHTnNZWE56UFZ3aWJHVmhaRndpUGlSN2MyVnpjMmx2YmxOMGIzSmhaMlV1WjJWMFNYUmxiU2hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JjSW5WelpYSmNJbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXBmU0E4WW5WMGRHOXVJR05zWVhOelBWd2lZblJ1SUdKMGJpMWtaV1poZFd4MFhDSWdhV1E5WENKbGVHbDBYQ0krMEpMUmk5R0YwTDdRdER3dlluVjBkRzl1UGp4d1BseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVnTzF4eVhHNGdJQ0FnWkdsMklEMGdaR2wyTG1sdWJtVnlTRlJOVENBOUlHQWdYSEpjYmlBZ1BHUnBkaUJqYkdGemN6MWNJbU52Ym5SaGJuUmNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1lEdGNjbHh1SUNCOVhISmNiaUFnWlhocGRFSjFkSFJ2YmlncElIdGNjbHh1SUNBZ0lDOHYwTDdRc2RHQTBMRFFzZEMrMFlMUmg5QzQwTG9nMExMUmk5R0YwTDdRdE5Dd0lOQzkwTEFnMExQUXU5Q3cwTExRdmRHRDBZNGcwWUhSZ3RHQTBMRFF2ZEM0MFliUmcxeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSWlObGVHbDBYQ0lwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKamJHbGphMXdpTENBb0tTQTlQaUI3WEhKY2JpQWdJQ0FnSUd4dlkyRjBhVzl1TG1oaGMyZ2dQU0JjSWx3aU8xeHlYRzRnSUNBZ2ZTazdYSEpjYmlBZ2ZWeHlYRzRnSUZKbGJtUmxjbEJoWjJVb1pHRjBaVTF2Ym5Sb0tTQjdYSEpjYmlBZ0lDQXZMOUMzMEwzUXNOR09JTkM5MExVZzBMdlJnOUdIMFlqUXRkQzFJTkM5MExEUXQ5Q3kwTERRdmRDNDBMVXNJTkdDMFlQUmdpRFJnZEMrMExmUXROQ3cwWTdSZ3RHTTBZSFJqeURRdE5DNDBMTFJpeURRdE5DNzBZOGcwWURRdGRDOTBMVFFzTkdBMExBZzBMclFzTkM3MExYUXZkQzAwTERSZ05HUElOQzRJTkM2MEwzUXZ0Qy8wTDdRdWx4eVhHNGdJQ0FnZG1GeUlIQnNZV05sUW5WMGRHOXVVbVZ1WkdWeUlEMGdLR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hISmNiaUFnSUNBZ0lGd2lMbU52Ym5SaGJuUmNJbHh5WEc0Z0lDQWdLUzVwYm01bGNraFVUVXdnUFNCZ1BHUnBkaUJqYkdGemN6MWNJa0oxZEhSdmJsQnNZV05sWENJK1BDOWthWFkrWUNrN1hISmNiaUFnSUNCMllYSWdjR3hoWTJWRFlXeGxibVJoY2xKbGJtUmxjaUE5SUNoa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRnh5WEc0Z0lDQWdJQ0JjSWk1amIyNTBZVzUwWENKY2NseHVJQ0FnSUNrdWFXNXVaWEpJVkUxTUlDczlJR0E4WW5JK1BHSnlQaUE4WkdsMklHTnNZWE56UFZ3aVEyRnNaVzVrWVhKUWJHRmpaVndpUGp3dlpHbDJQbUFwTzF4eVhHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb1pHRjBaVTF2Ym5Sb0tUdGNjbHh1SUNCOVhISmNiaUFnY21WdVpHVnlRblYwZEc5dVEyRnNaVzVrWVhJb0tTQjdYSEpjYmlBZ0lDQXZMeURSZ2RDdzBMelFzQ0RRdnRHQzBZRFF1TkdCMEw3UXN0QzYwTEFnMExyUXZkQyswTC9RdnRDNlhISmNiaUFnSUNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpTGtKMWRIUnZibEJzWVdObFhDSXBMbWx1Ym1WeVNGUk5UQ0E5SUdBZ0lDQWdYSEpjYmlBZ0lDQWdJQ0FnSUNBOFpHbDJJR0ZzYVdkdVBWd2lZMlZ1ZEdWeVhDSStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WW5WMGRHOXVJR05zWVhOelBWd2lZblJ1SUdKMGJpMWtaV1poZFd4MFhDSWdhV1E5WENKaVlXTnJRblYwZEc5dVhDSSswSjNRc05DMzBMRFF0RHd2WW5WMGRHOXVQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhOd1lXNGdZMnhoYzNNOVhDSnRZWFJsY21saGJDMWtaWE5wWjI0dGFXTnZibWxqTFdadmJuUmNJaUJwWkQxY0luUmxaMDF2Ym5Sb1hDSStQQzl6Y0dGdVBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR0oxZEhSdmJpQmpiR0Z6Y3oxY0ltSjBiaUJpZEc0dFpHVm1ZWFZzZEZ3aUlHbGtQVndpWm05eWQyRnlaRUoxZEhSdmJsd2lQdENTMEwvUXRkR0EwTFhRdER3dlluVjBkRzl1UGx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0E4TDJScGRqNWdPMXh5WEc0Z0lIMWNjbHh1SUNCeVpXNWtaWEpEWVd4bGJtUmhjaWhrWVhSbFRXOXVkR2dwSUh0Y2NseHVJQ0FnSUM4djBMTFF2dEdDSU5HQzBZUFJnaURSZ05DMTBMM1F0TkN3MFlEUXVOR0cwTEFnMExyUXNOQzcwTFhRdmRDMDBMRFJnTkdNSU5DOTBMQWcwWUxRdGRDNjBZUFJpZEM0MExrZzBMelF0ZEdCMFkvUmhseHlYRzRnSUNBZ2RtRnlJSGxsWVhJZ1BTQmtZWFJsVFc5dWRHaGJNRjA3SUM4dklOR0EwTERRdDlDeDBMWFJnTkN3MExYUmd0R00wWUhSanlEUXZOQ3cwWUhRdU5DeUlOQzAwTHZSanlEUXY5QyswTHZSZzlHSDBMWFF2ZEM0MFk4ZzBMUFF2dEMwMExBZzBMZ2cwTHpRdGRHQjBZL1JodEN3WEhKY2JpQWdJQ0IyWVhJZ2JXOXVkR2dnUFNCa1lYUmxUVzl1ZEdoYk1WMDdYSEpjYmx4eVhHNGdJQ0FnZG1GeUlHRnljazF2Ym5Sb0lEMGdXMXh5WEc0Z0lDQWdJQ0F2TDlDODBMRFJnZEdCMExqUXNpRFJnU0RRdk5DMTBZSFJqOUdHMExEUXZOQzRJTkMwMEx2Ump5RFF2dEdDMEw3UXNkR0EwTERRdHRDMTBMM1F1TkdQSU5DNjBMRFF1dEMrMExrZzBZSFF0ZEM1MFlmUXNOR0JJTkM4MExYUmdkR1AwWVlnMExnZzBMUFF2dEMwWEhKY2JpQWdJQ0FnSUZ3aTBLL1F2ZEN5MExEUmdOR01YQ0lzWEhKY2JpQWdJQ0FnSUZ3aTBLVFF0ZEN5MFlEUXNOQzcwWXhjSWl4Y2NseHVJQ0FnSUNBZ1hDTFFuTkN3MFlEUmdsd2lMRnh5WEc0Z0lDQWdJQ0JjSXRDUTBML1JnTkMxMEx2UmpGd2lMRnh5WEc0Z0lDQWdJQ0JjSXRDYzBMRFF1VndpTEZ4eVhHNGdJQ0FnSUNCY0l0Q1kwWTdRdmRHTVhDSXNYSEpjYmlBZ0lDQWdJRndpMEpqUmp0QzcwWXhjSWl4Y2NseHVJQ0FnSUNBZ1hDTFFrTkN5MExQUmc5R0IwWUpjSWl4Y2NseHVJQ0FnSUNBZ1hDTFFvZEMxMEwzUmd0R1AwTEhSZ05HTVhDSXNYSEpjYmlBZ0lDQWdJRndpMEo3UXV0R0MwWS9Rc2RHQTBZeGNJaXhjY2x4dUlDQWdJQ0FnWENMUW5kQyswWS9Rc2RHQTBZeGNJaXhjY2x4dUlDQWdJQ0FnWENMUWxOQzEwTHJRc05DeDBZRFJqRndpWEhKY2JpQWdJQ0JkTzF4eVhHNGdJQ0FnZG1GeUlITm9iM2ROYjI1MGFDQTlJRzF2Ym5Sb0lDMGdNVHNnTHk4ZzBMelF1TkM5MFlQUmdkR0QwTFhRdkNEUXZOQzEwWUhSajlHR0lOR0NMdEM2SU5DODBMWFF2ZEdQMEx2UXVDRFF2ZEN3MFlmUXNOQzcwTDRnMExQUXZ0QzAwTEFnMEwzUXRTRFJnU0F3SU5Dd0lOR0JJREZjY2x4dUlDQWdJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSWpkR1ZuVFc5dWRHaGNJaWt1YVc1dVpYSklWRTFNSUQxY2NseHVJQ0FnSUNBZ1lYSnlUVzl1ZEdoYmMyaHZkMDF2Ym5Sb1hTQXJJRndpSUZ3aUlDc2dlV1ZoY2p0Y2NseHVJQ0FnSUdaMWJtTjBhVzl1SUdOeVpXRjBaVU5oYkdWdVpHRnlLSGxsWVhJc0lHMXZiblJvS1NCN1hISmNiaUFnSUNBZ0lIWmhjaUJsYkdWdElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0lpNURZV3hsYm1SaGNsQnNZV05sWENJcE8xeHlYRzRnSUNBZ0lDQjJZWElnYlc5dUlEMGdiVzl1ZEdnZ0xTQXhPeUF2THlEUXZOQzEwWUhSajlHRzBZc2cwTElnU2xNZzBMalF0TkdEMFlJZzBMN1JnaUF3SU5DMDBMNGdNVEVzSU5Dd0lOQzkwTFVnMEw3UmdpQXhJTkMwMEw0Z01USmNjbHh1SUNBZ0lDQWdkbUZ5SUdRZ1BTQnVaWGNnUkdGMFpTaDVaV0Z5TENCdGIyNHBPMXh5WEc0Z0lDQWdJQ0IyWVhJZ2RHRmliR1VnUFNCZ1BIUmhZbXhsSUdOc1lYTnpQVndpZEdGaWJHVWdkR0ZpYkdVdFltOXlaR1Z5WldRZ2RHRmliR1V0YUc5MlpYSmNJajQ4ZEhJK1BIUm9QdEMvMEwwOEwzUm9QangwYUQ3UXN0R0NQQzkwYUQ0OGRHZyswWUhSZ0R3dmRHZytQSFJvUHRHSDBZSThMM1JvUGp4MGFEN1F2OUdDUEM5MGFENDhkR2crMFlIUXNUd3ZkR2crUEhSb1B0Q3kwWUU4TDNSb1Bqd3ZkSEkrUEhSeVBtQTdYSEpjYmlBZ0lDQWdJQzh2SU5DMzBMRFF2OUMrMEx2UXZkQzQwWUxSakNEUXY5QzEwWURRc3RHTDBMa2cwWURSajlDMElOQyswWUlnMEwvUXZ0QzkwTFhRdE5DMTBMdlJqTkM5MExqUXV0Q3dYSEpjYmlBZ0lDQWdJQzh2SU5DNElOQzAwTDRnMExUUXZkR1BMQ0RSZ1NEUXV0QyswWUxRdnRHQTBMN1FzOUMrSU5DOTBMRFJoOUM0MEwzUXNOQzEwWUxSZ2RHUElOQzgwTFhSZ2RHUDBZWmNjbHh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JuWlhSRVlYa29aQ2s3SUdrckt5a2dlMXh5WEc0Z0lDQWdJQ0FnSUhSaFlteGxJQ3M5SUZ3aVBIUmtQand2ZEdRK1hDSTdYSEpjYmlBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnTHk4ZzBZL1JoOUMxMExuUXV0QzRJTkM2MExEUXU5QzEwTDNRdE5DdzBZRFJqeURSZ1NEUXROQ3cwWUxRc05DODBMaGNjbHh1SUNBZ0lDQWdkMmhwYkdVZ0tHUXVaMlYwVFc5dWRHZ29LU0E5UFNCdGIyNHBJSHRjY2x4dUlDQWdJQ0FnSUNCMFlXSnNaU0FyUFNCZ1BIUmtJR05zWVhOelBWd2laQ1I3WkM1blpYUkVZWFJsS0NsOVh5UjdiVzl1ZEdoOVh5UjdlV1ZoY24xY0lqNGtlMlF1WjJWMFJHRjBaU2dwZlR3dmRHUStZRHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdhV1lnS0dkbGRFUmhlU2hrS1NBbElEY2dQVDBnTmlrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnTHk4ZzBMTFJnU3dnMEwvUXZ0R0IwTHZRdGRDMDBMM1F1TkM1SU5DMDBMWFF2ZEdNSUMwZzBML1F0ZEdBMExYUXN0QyswTFFnMFlIUmd0R0EwTDdRdXRDNFhISmNiaUFnSUNBZ0lDQWdJQ0IwWVdKc1pTQXJQU0JjSWp3dmRISStQSFJ5UGx3aU8xeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNCa0xuTmxkRVJoZEdVb1pDNW5aWFJFWVhSbEtDa2dLeUF4S1R0Y2NseHVJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQXZMeURRdE5DKzBMSFF1TkdDMFl3ZzBZTFFzTkN4MEx2UXVOR0cwWU1nMEwvUmc5R0IwWUxSaTlDODBMZ2cwWS9SaDlDMTBMblF1dEN3MEx6UXVDd2cwTFhSZ2RDNzBMZ2cwTDNSZzlDMjBMM1F2bHh5WEc0Z0lDQWdJQ0JwWmlBb1oyVjBSR0Y1S0dRcElDRTlJREFwSUh0Y2NseHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnWjJWMFJHRjVLR1FwT3lCcElEd2dOenNnYVNzcktTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNCMFlXSnNaU0FyUFNCY0lqeDBaRDQ4TDNSa1Bsd2lPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQXZMeURRdDlDdzBMclJnTkdMMFlMUmpDRFJndEN3MExIUXU5QzQwWWJSZzF4eVhHNGdJQ0FnSUNCMFlXSnNaU0FyUFNCY0lqd3ZkSEkrUEM5MFlXSnNaVDVjSWp0Y2NseHVJQ0FnSUNBZ0x5OGcwWUxRdnRDNzBZelF1dEMrSU5DKzBMVFF2ZEMrSU5DLzBZRFF1TkdCMExMUXNOQzQwTExRc05DOTBMalF0U0JwYm01bGNraFVUVXhjY2x4dUlDQWdJQ0FnWld4bGJTNXBibTVsY2toVVRVd2dQU0IwWVdKc1pUdGNjbHh1SUNBZ0lDQWdiR1YwSUdSaGRHRkNZWE5sSUQwZ2JtVjNJR1JpS0NrN1hISmNibHh5WEc0Z0lDQWdJQ0JrWVhSaFFtRnpaUzVzYjJGa1JuSnZiVVJDS0NrN1hISmNiaUFnSUNCOVhISmNiaUFnSUNCbWRXNWpkR2x2YmlCblpYUkVZWGtvWkdGMFpTa2dlMXh5WEc0Z0lDQWdJQ0F2THlEUXY5QyswTHZSZzlHSDBMalJndEdNSU5DOTBMN1F2TkMxMFlBZzBMVFF2ZEdQSU5DOTBMWFF0TkMxMEx2UXVDd2cwTDdSZ2lBd0tOQy8wTDBwSU5DMDBMNGdOaWpRc3RHQktWeHlYRzRnSUNBZ0lDQjJZWElnWkdGNUlEMGdaR0YwWlM1blpYUkVZWGtvS1R0Y2NseHVJQ0FnSUNBZ2FXWWdLR1JoZVNBOVBTQXdLU0JrWVhrZ1BTQTNPMXh5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdaR0Y1SUMwZ01UdGNjbHh1SUNBZ0lIMWNjbHh1SUNBZ0lHTnlaV0YwWlVOaGJHVnVaR0Z5S0hsbFlYSXNJRzF2Ym5Sb0tUc2dMeS9Rc3RHTDBMZlF2dEN5SU5DeTBMM1JnOUdDMFlEUXRkQzkwTDNRdGRDNUlOR0UwWVBRdmRDNjBZYlF1TkM0SU5HQTBMWFF2ZEMwMExEUmdOQ3dJTkM2MExEUXU5QzEwTFRRc05HQTBZOWNjbHh1WEhKY2JpQWdJQ0J5WlhSMWNtNGdaR0YwWlUxdmJuUm9PeUF2THlEUXN0QyswTGZSZ05DdzBZblJqOUMxMEx3ZzBMVFFzTkdDMFlNZzBMM1FzQ0RRdXRDKzBZTFF2dEdBMFlQUmppRFF2OUdBMEw3UXVOQzMwTExRdnRDMDBMalF1OUdCMFk4ZzBZRFF0ZEM5MExUUXNOR0FJTkM2MExEUXU5QzEwTDNRdE5DdzBZRFJqMXh5WEc0Z0lIMWNjbHh1SUNCaFpHUklZVzVrYkdWeVJYWmxiblFvWkdGMFpVMXZiblJvS1NCN1hISmNiaUFnSUNBdkx5RFJndEdEMFlJZzBMVFF2dEN4MExEUXN0QzcwWS9SanRHQzBZelJnZEdQSU5DKzBMSFJnTkN3MExIUXZ0R0MwWWZRdU5DNjBMZ2cwTFRRdTlHUElOQzcwTGpSZ2RHQzBMRFF2ZEM0MFk4ZzBMelF0ZEdCMFkvUmh0QzEwTElnS3lEUXZ0Q3gwWURRc05DeDBMN1JndEdIMExqUXV0QzRJTkM5MExBZzBZUFF0TkN3MEx2UXRkQzkwTGpRdFNEUXVDRFF0TkMrMExIUXNOQ3kwTHZRdGRDOTBMZ2cwTGZRc05DejBMN1F1OUMrMExMUXV0QyswTEpjY2x4dUlDQWdJR1J2WTNWdFpXNTBYSEpjYmlBZ0lDQWdJQzV4ZFdWeWVWTmxiR1ZqZEc5eUtGd2lJMkpoWTJ0Q2RYUjBiMjVjSWlsY2NseHVJQ0FnSUNBZ0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmpiR2xqYTF3aUxDQW9LU0E5UGlCMGFHbHpMbUZrWkVWMlpXNTBSbTl5UW1GamEwSjFkRzl2Ymloa1lYUmxUVzl1ZEdncEtUdGNjbHh1SUNBZ0lHUnZZM1Z0Wlc1MFhISmNiaUFnSUNBZ0lDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aUkyWnZjbmRoY21SQ2RYUjBiMjVjSWlsY2NseHVJQ0FnSUNBZ0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1hDSmpiR2xqYTF3aUxDQW9LU0E5UGx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1JYWmxiblJHYjNKR2IzSjNZWEprUW5WMGRHOXVLR1JoZEdWTmIyNTBhQ2xjY2x4dUlDQWdJQ0FnS1R0Y2NseHVJQ0FnSUdSdlkzVnRaVzUwWEhKY2JpQWdJQ0FnSUM1eGRXVnllVk5sYkdWamRHOXlLRndpZEdGaWJHVmNJaWxjY2x4dUlDQWdJQ0FnTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKa1lteGpiR2xqYTF3aUxDQW9LU0E5UGlCMGFHbHpMbUZrWkVOaGNIUnBiMjRvWlhabGJuUXNJR1JoZEdWTmIyNTBhQ2twTzF4eVhHNGdJQ0FnWkc5amRXMWxiblJjY2x4dUlDQWdJQ0FnTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0owWVdKc1pWd2lLVnh5WEc0Z0lDQWdJQ0F1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWhjSW1Oc2FXTnJYQ0lzSUNncElEMCtJSFJvYVhNdVpHVnNRMkZ3ZEdsdmJpaGxkbVZ1ZENrcE8xeHlYRzRnSUgxY2NseHVJQ0JoWkdSRmRtVnVkRVp2Y2tadmNuZGhjbVJDZFhSMGIyNG9aR0YwWlUxdmJuUm9LU0I3WEhKY2JpQWdJQ0F2THlEUmd0R0QwWUlnMExyUXZ0QzBJTkMwMEw3UXNkQ3cwTExRdTlDMTBMM1F1TkMxSU5DODBMWFJnZEdQMFliUXNDRFF1TkM3MExnZzBMUFF2dEMwMExBZzBMSWcwTGZRc05DeTBMalJnZEM0MEx6UXZ0R0IwWUxRdUNEUXV0Q3cwTHJRdnRDNUlOQzgwTFhSZ2RHUDBZWWcwTC9SZ05DNDBZalF0ZEM3SUNzZzBMTFJpOUMzMEw3UXNpRFJoTkdEMEwzUXV0R0cwTGpRdUNEUmdOQzEwTDNRdE5DdzBZRFFzQ0RRdjlDKzBMdlJnOUdIMExYUXZkQzkwTDdRdVNEUXROQ3cwWUxSaTF4eVhHNGdJQ0FnZG1GeUlIbGxZWElnUFNCa1lYUmxUVzl1ZEdoYk1GMDdYSEpjYmlBZ0lDQjJZWElnYlc5dWRHZ2dQU0JrWVhSbFRXOXVkR2hiTVYwN1hISmNiaUFnSUNCcFppQW9iVzl1ZEdnZ1BUMDlJREV5S1NCN1hISmNiaUFnSUNBZ0lIbGxZWElnUFNCNVpXRnlJQ3NnTVR0Y2NseHVJQ0FnSUNBZ2JXOXVkR2dnUFNBeE8xeHlYRzRnSUNBZ0lDQmtZWFJsVFc5dWRHaGJNRjBnUFNCNVpXRnlPMXh5WEc0Z0lDQWdJQ0JrWVhSbFRXOXVkR2hiTVYwZ1BTQnRiMjUwYUR0Y2NseHVJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUcxdmJuUm9JRDBnYlc5dWRHZ2dLeUF4TzF4eVhHNGdJQ0FnSUNCa1lYUmxUVzl1ZEdoYk1WMGdQU0J0YjI1MGFEdGNjbHh1SUNBZ0lIMWNjbHh1SUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJdVEyRnNaVzVrWVhKUWJHRmpaVndpS1M1cGJtNWxja2hVVFV3Z1BTQmNJbHdpT3lBdkx5RFF2dEdIMExqUmdkR0MwTHJRc0NEUXV0Q3cwTHZRdGRDOTBMVFFzTkdBMFk4ZzBMVFF1OUdQSU5HQzBMN1FzOUMrSU5HSDBZTFF2aURRc2RHTElOQzAwTERSZ3RHTElOQzgwTFhRdmRHUDBMdlF1TkdCMFl4Y2NseHVJQ0FnSUhSb2FYTXVjbVZ1WkdWeVEyRnNaVzVrWVhJb1pHRjBaVTF2Ym5Sb0tUc2dMeThnMFlMUmc5R0NJTkdCMExEUXZDRFFzdEdMMExmUXZ0Q3lJTkMwMExEUXZkQzkwTDdRczlDK0lOQzgwTFhSZ3RDdzBMVFFzQ0RRdE5DNzBZOGcwWURRdGRDOTBMVFFzTkdBMExCY2NseHVJQ0I5WEhKY2JpQWdZV1JrUlhabGJuUkdiM0pDWVdOclFuVjBiMjl1S0dSaGRHVk5iMjUwYUNrZ2UxeHlYRzRnSUNBZ0x5OGcwWUxSZzlHQ0lOQzYwTDdRdENEUXN0R0wwWWZRdU5HQzBMQWcwTHpRdGRHQjBZL1JodEN3SU5DNDBMdlF1Q0RRczlDKzBMVFFzQ0RRc2lEUXQ5Q3cwTExRdU5HQjBMalF2TkMrMFlIUmd0QzRJTkM2MExEUXV0QyswTGtnMEx6UXRkR0IwWS9SaGlEUXY5R0EwTGpSaU5DMTBMc2dLeURRc3RHTDBMZlF2dEN5SU5HRTBZUFF2ZEM2MFliUXVOQzRJTkdBMExYUXZkQzAwTERSZ05Dd0lOQy8wTDdRdTlHRDBZZlF0ZEM5MEwzUXZ0QzVJTkMwMExEUmd0R0xYSEpjYmlBZ0lDQjJZWElnZVdWaGNpQTlJR1JoZEdWTmIyNTBhRnN3WFR0Y2NseHVJQ0FnSUhaaGNpQnRiMjUwYUNBOUlHUmhkR1ZOYjI1MGFGc3hYVHRjY2x4dUlDQWdJR2xtSUNodGIyNTBhQ0E5UFQwZ01Ta2dlMXh5WEc0Z0lDQWdJQ0I1WldGeUlEMGdlV1ZoY2lBdElERTdYSEpjYmlBZ0lDQWdJRzF2Ym5Sb0lEMGdNVEk3WEhKY2JpQWdJQ0FnSUdSaGRHVk5iMjUwYUZzd1hTQTlJSGxsWVhJN1hISmNiaUFnSUNBZ0lHUmhkR1ZOYjI1MGFGc3hYU0E5SUcxdmJuUm9PMXh5WEc0Z0lDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQWdiVzl1ZEdnZ1BTQnRiMjUwYUNBdElERTdYSEpjYmlBZ0lDQWdJR1JoZEdWTmIyNTBhRnN4WFNBOUlHMXZiblJvTzF4eVhHNGdJQ0FnZlZ4eVhHNGdJQ0FnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaGNJaTVEWVd4bGJtUmhjbEJzWVdObFhDSXBMbWx1Ym1WeVNGUk5UQ0E5SUZ3aVhDSTdJQzh2SU5DKzBZZlF1TkdCMFlMUXV0Q3dJTkM2MExEUXU5QzEwTDNRdE5DdzBZRFJqeURRdE5DNzBZOGcwWUxRdnRDejBMNGcwWWZSZ3RDK0lOQ3gwWXNnMExUUXNOR0MwWXNnMEx6UXRkQzkwWS9RdTlDNDBZSFJqRnh5WEc0Z0lDQWdkR2hwY3k1eVpXNWtaWEpEWVd4bGJtUmhjaWhrWVhSbFRXOXVkR2dwT3lBdkx5RFJndEdEMFlJZzBZSFFzTkM4SU5DeTBZdlF0OUMrMExJZzBMVFFzTkM5MEwzUXZ0Q3owTDRnMEx6UXRkR0MwTERRdE5Dd0lOQzAwTHZSanlEUmdOQzEwTDNRdE5DdzBZRFFzRnh5WEc0Z0lIMWNjbHh1SUNCaFpHUkRZWEIwYVc5dUtHVXBJSHRjY2x4dUlDQWdJQzh2SU5HQzBZUFJnaURRdXRDKzBMUWcwTFRRdnRDeDBMRFFzdEM3MExYUXZkQzQwWThnMExmUXNOQ3owTDdRdTlDKzBMTFF1dEN3WEhKY2JpQWdJQ0IyWVhJZ2RHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRN1hISmNiaUFnSUNCcFppQW9kR0Z5WjJWMExuUmhaMDVoYldVZ0lUMDlJRndpVkVSY0lpa2djbVYwZFhKdU8xeHlYRzRnSUNBZ2RtRnlJR1JoZEdFZ1BTQjBZWEpuWlhRdVkyeGhjM05PWVcxbE8xeHlYRzRnSUNBZ2RtRnlJSEVnUFNCd2NtOXRjSFFvWENMUWt0Q3kwTFhRdE5DNDBZTFF0U0RRdDlDdzBMUFF2dEM3MEw3UXN0QyswTG9nMFlIUXZ0Q3gwWXZSZ3RDNDBZOC9YQ0lzSUZ3aTBKL1F2dEMyMFlEUXNOR0MwWXhjSWlrN1hISmNiaUFnSUNCcFppQW9JWEVwSUhKbGRIVnlianRjY2x4dUlDQWdJSFJoY21kbGRDNXBibTVsY2toVVRVd2dLejBnWUR4a2FYWWdhV1E5WENKbGRtVnVkSE5jSWo0a2UzRjlQR0oxZEhSdmJpQmpiR0Z6Y3oxY0ltTnliM056WENJK1czaGRQQzlpZFhSMGIyNCtQQzlrYVhZK1lEdGNjbHh1SUNBZ0lHeGxkQ0JrWVhSaFFtRnpaU0E5SUc1bGR5QmtZaWdwT3lBdkw5R0IwTDdRdDlDMDBMRFF2ZEM0MExVZzBZM1F1dEMzMExYUXZOQy8wTHZSajlHQTBMQWcwTHJRdTlDdzBZSFJnZEN3SU5DeDBMRFF0OUdMSU5DMDBMRFF2ZEM5MFl2UmhWeHlYRzRnSUNBZ1pHRjBZVUpoYzJVdVUyRjJaVVYyWlc1MFNXNUVRaWh4TENCa1lYUmhLVHNnTHk4ZzBMTFJpOUMzMEw3UXNpRFF2TkMxMFlMUXZ0QzAwTEFnMExqUXR5RFFzZEN3MExmUml5RFF0TkM3MFk4ZzBMVFF2dEN4MExEUXN0QzcwTFhRdmRDNDBZOGcwTFhRc3RDMTBMM1JndEN3SU5DLzBZRFF1TkM5MExqUXZOQ3cwTFhSZ2lEUXZkQ3dJTkN5MFlYUXZ0QzBJTkdDMExYUXV0R0IwWUlnMExmUXNOQ3owTDdRdTlDKzBMTFF1dEN3SU5DNElOR0MwTFhRc3lEUXNpRFF1dEN3MExyUXZ0QzVJTkMzMExEUXY5QzQwWUhRc05DNzBMaGNjbHh1SUNCOVhISmNiaUFnWkdWc1EyRndkR2x2YmlobEtTQjdYSEpjYmlBZ0lDQXZMeURSZ3RHRDBZSWcwTHJRdnRDMElOQzAwTHZSanlEUmc5QzAwTERRdTlDMTBMM1F1TkdQSU5DMzBMRFFzOUMrMEx2UXZ0Q3kwTHJRc0Z4eVhHNGdJQ0FnZG1GeUlIUmhjbWRsZENBOUlHVXVkR0Z5WjJWME8xeHlYRzRnSUNBZ2FXWWdLSFJoY21kbGRDNTBZV2RPWVcxbElDRTlQU0JjSWtKVlZGUlBUbHdpS1NCeVpYUjFjbTQ3WEhKY2JpQWdJQ0IyWVhJZ2RHVjRkQ0E5SUhSaGNtZGxkQzV3WVhKbGJuUk9iMlJsTG1sdWJtVnlTRlJOVEM1emJHbGpaU2d3TENBdE16UXBPMXh5WEc0Z0lDQWdkbUZ5SUdSaGRHVWdQU0IwWVhKblpYUXVjR0Z5Wlc1MFRtOWtaUzV3WVhKbGJuUk9iMlJsTG1Oc1lYTnpUbUZ0WlR0Y2NseHVJQ0FnSUhSaGNtZGxkQzV3WVhKbGJuUk9iMlJsTG5KbGJXOTJaU2dwTzF4eVhHNGdJQ0FnYkdWMElHUmhkR0ZDWVhObElEMGdibVYzSUdSaUtDazdJQzh2MFlIUXZ0QzMwTFRRc05DOTBMalF0U0RSamRDNjBMZlF0ZEM4MEwvUXU5R1AwWURRc0NEUXV0QzcwTERSZ2RHQjBMQWcwTEhRc05DMzBZc2cwTFRRc05DOTBMM1JpOUdGWEhKY2JpQWdJQ0JrWVhSaFFtRnpaUzVrWld4bGRHVkZkbVZ1ZEVsdVJFSW9aR0YwWlN3Z2RHVjRkQ2s3SUM4dklOQ3kwWXZRdDlDKzBMSWcwTHpRdGRHQzBMN1F0TkN3SU5DNDBMY2cwTEhRc05DMzBZc2cwTFRRdTlHUElOR0QwTFRRc05DNzBMWFF2ZEM0MFk4ZzBMWFFzdEMxMEwzUmd0Q3dJTkMvMFlEUXVOQzkwTGpRdk5DdzBMWFJnaURRdmRDd0lOQ3kwWVhRdnRDMElOR0MwTFhRdXRHQjBZSWcwTGZRc05DejBMN1F1OUMrMExMUXV0Q3dJTkM0SU5HQzBMWFFzeURRc2lEUXV0Q3cwTHJRdnRDNUlOQzMwTERRdjlDNDBZSFFzTkM3MExoY2NseHVJQ0I5WEhKY2JuMWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdZMkZzWlc1a1lYSlFZV2RsTzF4eVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcQ2FsZW5kYXJQYWdlLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3NpZ25JbiA9IHJlcXVpcmUoXCIuL3NpZ25JblwiKTtcblxudmFyIF9zaWduSW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2lnbkluKTtcblxudmFyIF9kYXRhQmFzZSA9IHJlcXVpcmUoXCIuL2RhdGFCYXNlXCIpO1xuXG52YXIgX2RhdGFCYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RhdGFCYXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIGluZGV4UGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gaW5kZXhQYWdlKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBpbmRleFBhZ2UpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKGluZGV4UGFnZSwgW3tcbiAgICBrZXk6IFwicmVuZGVyUGFnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJQYWdlKCkge1xuICAgICAgLy8g0YLRg9GCINC/0YDQvtC40LfQstC+0LTQuNGC0YzRgdGPINGA0LXQvdC00LXRgCDQvdCw0YjQtdC5INCy0YXQvtC00L3QvtC5INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpO1xuICAgICAgdmFyIENyZWF0ZURpdiA9IFwiXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gJ2Vycm9yJz5cXHUwNDFEXFx1MDQzNVxcdTA0MzJcXHUwNDM1XFx1MDQ0MFxcdTA0M0RcXHUwNDRCXFx1MDQzOSBcXHUwNDNCXFx1MDQzRVxcdTA0MzNcXHUwNDM4XFx1MDQzRCBcXHUwNDM4XFx1MDQzQlxcdTA0MzggXFx1MDQzRlxcdTA0MzBcXHUwNDQwXFx1MDQzRVxcdTA0M0JcXHUwNDRDPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcInVzclxcXCI+XFx1MDQxQlxcdTA0M0VcXHUwNDMzXFx1MDQzOFxcdTA0M0Q6PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJ1c3JcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJwd2RcXFwiPlxcdTA0MUZcXHUwNDMwXFx1MDQ0MFxcdTA0M0VcXHUwNDNCXFx1MDQ0Qzo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJwd2RcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgIGlkPVxcXCJlcm9yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxhcmdlIGJ0bi1zdWNjZXNzXFxcIiBpZD1cXFwiYnV0QXV0XFxcIiA+XFx1MDQxMlxcdTA0NDVcXHUwNDNFXFx1MDQzNDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjQ2FsZW5kYXJcXFwiPmZzZGY8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiO1xuICAgICAgZGl2ID0gZGl2LmlubmVySFRNTCA9IENyZWF0ZURpdjsgLy8g0L7RgtGA0LjRgdC+0LLQutCwINGB0YLRgNCw0L3QuNGG0YtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkSGVuZGxlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRIZW5kbGVyKCkge1xuICAgICAgLy8g0YLRg9GCINC00L7QsdCw0LLQu9GP0LXRhtCwINC+0LHRgNC+0LHQvtGC0YfQuNC6INC90LAg0LrQvdC+0L/QutGDINCy0YXQvtC00LAg0YEg0L/RgNC+0LzQuNGB0L7QvFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXRBdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvZyA9IHVzci52YWx1ZTtcbiAgICAgICAgdmFyIHBhc3MgPSBwd2QudmFsdWU7XG4gICAgICAgIHZhciB1c2VySW4gPSBuZXcgX3NpZ25JbjIuZGVmYXVsdCgpO1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdXNlckluLnRyeVNpZ25pbkJ5TG9naW5BbmRQYXNzKGxvZywgcGFzcyk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdXNlckluLnRyeVJlZ2lzdGVyV2l0aExvZ2luQW5kRW1haWwobG9nLCBwYXNzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhhc2ggPSBcIkNhbGVuZGFyXCI7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBpbmRleFBhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGluZGV4UGFnZTsgLy8g0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC8INGE0YPQvdC60YbQuNGOINCyINGA0L7Rg9GC0LXRgCBpbmRleFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtsdVpHVjRVR0ZuWlM1cWN5SmRMQ0p1WVcxbGN5STZXeUpwYm1SbGVGQmhaMlVpTENKa2FYWWlMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0pEY21WaGRHVkVhWFlpTENKcGJtNWxja2hVVFV3aUxDSmhaR1JGZG1WdWRFeHBjM1JsYm1WeUlpd2liRzluSWl3aWRYTnlJaXdpZG1Gc2RXVWlMQ0p3WVhOeklpd2ljSGRrSWl3aWRYTmxja2x1SWl3aVVISnZiV2x6WlNJc0luSmxjMjlzZG1VaUxDSjBhR1Z1SWl3aWRISjVVMmxuYm1sdVFubE1iMmRwYmtGdVpGQmhjM01pTENKallYUmphQ0lzSW5SeWVWSmxaMmx6ZEdWeVYybDBhRXh2WjJsdVFXNWtSVzFoYVd3aUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSnpkSGxzWlNJc0ltUnBjM0JzWVhraVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPMEZCUVVFN096czdRVUZEUVRzN096czdPenM3U1VGRFRVRXNVenM3T3pzN096dHBRMEZEVXp0QlFVTllPMEZCUTBFc1ZVRkJTVU1zVFVGQlRVTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUYyUWl4RFFVRldPMEZCUTBFc1ZVRkJTVU1zY1RSQ1FVRktPMEZCWjBKQlNDeFpRVUZOUVN4SlFVRkpTU3hUUVVGS0xFZEJRV2RDUkN4VFFVRjBRaXhEUVc1Q1Z5eERRVzFDYzBJN1FVRkRiRU03T3p0cFEwRkRXVHRCUVVOWU8wRkJRMEZHTEdWQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVTBGQmRrSXNSVUZCYTBOSExHZENRVUZzUXl4RFFVRnRSQ3hQUVVGdVJDeEZRVUUwUkN4WlFVRk5PMEZCUTJoRkxGbEJRVWxETEUxQlFVMURMRWxCUVVsRExFdEJRV1E3UVVGRFFTeFpRVUZKUXl4UFFVRlBReXhKUVVGSlJpeExRVUZtTzBGQlEwRXNXVUZCU1Vjc1UwRkJVeXh6UWtGQllqdEJRVU5CUXl4blFrRkJVVU1zVDBGQlVpeEhRVU5IUXl4SlFVUklMRU5CUTFFN1FVRkJRU3hwUWtGQlRVZ3NUMEZCVDBrc2RVSkJRVkFzUTBGQkswSlVMRWRCUVM5Q0xFVkJRVzlEUnl4SlFVRndReXhEUVVGT08wRkJRVUVzVTBGRVVpeEZRVVZIVHl4TFFVWklMRU5CUlZNN1FVRkJRU3hwUWtGQlRVd3NUMEZCVDAwc05FSkJRVkFzUTBGQmIwTllMRWRCUVhCRExFVkJRWGxEUnl4SlFVRjZReXhEUVVGT08wRkJRVUVzVTBGR1ZDeEZRVWRIU3l4SlFVaElMRU5CUjFFN1FVRkJRU3hwUWtGQlQwa3NVMEZCVTBNc1NVRkJWQ3hIUVVGblFpeFZRVUYyUWp0QlFVRkJMRk5CU0ZJc1JVRkpSMGdzUzBGS1NDeERRVXRKTzBGQlFVRXNhVUpCUVU5bUxGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1VVRkJka0lzUlVGQmFVTnJRaXhMUVVGcVF5eERRVUYxUTBNc1QwRkJka01zUjBGQmFVUXNUMEZCZUVRN1FVRkJRU3hUUVV4S08wRkJUMFFzVDBGWVJEdEJRVmxFT3pzN096czdhMEpCUjFsMFFpeFRMRVZCUVZjaUxDSm1hV3hsSWpvaVNXNWtaWGhRWVdkbExtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJSE5wWjI1SmJpQm1jbTl0SUZ3aUxpOXphV2R1U1c1Y0lqdGNjbHh1YVcxd2IzSjBJR1JpSUdaeWIyMGdYQ0l1TDJSaGRHRkNZWE5sWENJN1hISmNibU5zWVhOeklHbHVaR1Y0VUdGblpTQjdYSEpjYmlBZ2NtVnVaR1Z5VUdGblpTZ3BJSHRjY2x4dUlDQWdJQzh2SU5HQzBZUFJnaURRdjlHQTBMN1F1TkMzMExMUXZ0QzAwTGpSZ3RHTTBZSFJqeURSZ05DMTBMM1F0TkMxMFlBZzBMM1FzTkdJMExYUXVTRFFzdEdGMEw3UXROQzkwTDdRdVNEUmdkR0MwWURRc05DOTBMalJodEdMWEhKY2JpQWdJQ0IyWVhJZ1pHbDJJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaGNJbVJwZGx3aUtUdGNjbHh1SUNBZ0lIWmhjaUJEY21WaGRHVkVhWFlnUFNCZ1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmpiMjUwWVdsdVpYSmNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjeUE5SUNkbGNuSnZjaWMrMEozUXRkQ3kwTFhSZ05DOTBZdlF1U0RRdTlDKzBMUFF1TkM5SU5DNDBMdlF1Q0RRdjlDdzBZRFF2dEM3MFl3OEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1admNtMHRaM0p2ZFhCY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhzWVdKbGJDQm1iM0k5WENKMWMzSmNJajdRbTlDKzBMUFF1TkM5T2p3dmJHRmlaV3crWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGFXNXdkWFFnZEhsd1pUMWNJblJsZUhSY0lpQmpiR0Z6Y3oxY0ltWnZjbTB0WTI5dWRISnZiRndpSUdsa1BWd2lkWE55WENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpWm05eWJTMW5jbTkxY0Z3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR3hoWW1Wc0lHWnZjajFjSW5CM1pGd2lQdENmMExEUmdOQyswTHZSakRvOEwyeGhZbVZzUGx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHbHVjSFYwSUhSNWNHVTlYQ0p3WVhOemQyOXlaRndpSUdOc1lYTnpQVndpWm05eWJTMWpiMjUwY205c1hDSWdhV1E5WENKd2QyUmNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdJR2xrUFZ3aVpYSnZjbHdpUGp3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEdKMWRIUnZiaUIwZVhCbFBWd2lZblYwZEc5dVhDSWdZMnhoYzNNOVhDSmlkRzRnWW5SdUxXeGhjbWRsSUdKMGJpMXpkV05qWlhOelhDSWdhV1E5WENKaWRYUkJkWFJjSWlBKzBKTFJoZEMrMExROEwySjFkSFJ2Ymo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGhJR2h5WldZOVhDSWpRMkZzWlc1a1lYSmNJajVtYzJSbVBDOWhQbHh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQbUE3WEhKY2JpQWdJQ0JrYVhZZ1BTQmthWFl1YVc1dVpYSklWRTFNSUQwZ1EzSmxZWFJsUkdsMk95QXZMeURRdnRHQzBZRFF1TkdCMEw3UXN0QzYwTEFnMFlIUmd0R0EwTERRdmRDNDBZYlJpMXh5WEc0Z0lIMWNjbHh1SUNCaFpHUklaVzVrYkdWeUtDa2dlMXh5WEc0Z0lDQWdMeThnMFlMUmc5R0NJTkMwMEw3UXNkQ3cwTExRdTlHUDBMWFJodEN3SU5DKzBMSFJnTkMrMExIUXZ0R0MwWWZRdU5DNklOQzkwTEFnMExyUXZkQyswTC9RdXRHRElOQ3kwWVhRdnRDMDBMQWcwWUVnMEwvUmdOQyswTHpRdU5HQjBMN1F2Rnh5WEc0Z0lDQWdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0lpTmlkWFJCZFhSY0lpa3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbU5zYVdOclhDSXNJQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDQWdkbUZ5SUd4dlp5QTlJSFZ6Y2k1MllXeDFaVHRjY2x4dUlDQWdJQ0FnZG1GeUlIQmhjM01nUFNCd2QyUXVkbUZzZFdVN1hISmNiaUFnSUNBZ0lHeGxkQ0IxYzJWeVNXNGdQU0J1WlhjZ2MybG5ia2x1S0NrN1hISmNiaUFnSUNBZ0lGQnliMjFwYzJVdWNtVnpiMngyWlNncFhISmNiaUFnSUNBZ0lDQWdMblJvWlc0b0tDa2dQVDRnZFhObGNrbHVMblJ5ZVZOcFoyNXBia0o1VEc5bmFXNUJibVJRWVhOektHeHZaeXdnY0dGemN5a3BYSEpjYmlBZ0lDQWdJQ0FnTG1OaGRHTm9LQ2dwSUQwK0lIVnpaWEpKYmk1MGNubFNaV2RwYzNSbGNsZHBkR2hNYjJkcGJrRnVaRVZ0WVdsc0tHeHZaeXdnY0dGemN5a3BYSEpjYmlBZ0lDQWdJQ0FnTG5Sb1pXNG9LQ2tnUFQ0Z0tHeHZZMkYwYVc5dUxtaGhjMmdnUFNCY0lrTmhiR1Z1WkdGeVhDSXBLVnh5WEc0Z0lDQWdJQ0FnSUM1allYUmphQ2hjY2x4dUlDQWdJQ0FnSUNBZ0lDZ3BJRDArSUNoa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpTG1WeWNtOXlYQ0lwTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0JjSW1Kc2IyTnJYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0tUdGNjbHh1SUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdhVzVrWlhoUVlXZGxPeUF2THlEUmpkQzYwWUhRdjlDKzBZRFJndEM0MFlEUmc5QzEwTHdnMFlUUmc5QzkwTHJSaHRDNDBZNGcwTElnMFlEUXZ0R0QwWUxRdGRHQUlHbHVaR1Y0WEhKY2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcSW5kZXhQYWdlLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgZGIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRiKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBkYik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoZGIsIFt7XG4gICAga2V5OiBcImFkZFVzZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkVXNlcih0YXNrLCBsb2dpbiwgcGFzcykge1xuICAgICAgLy/QvNC10YLQvtC0INC00L7QsdCw0LLQu9C10L3QuNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgdC40YHRgtC10LzRgyDQuCDRgdC+0LfQtNCw0L3QuNC1INC/0YDQuNC80LjRgtC40LLQvdC+0LPQviDRgdGC0YDRg9C60YLRg9GA0Ysg0YXRgNCw0L3QtdC90LjRjyDQtNCw0L3QvdGL0YVcbiAgICAgIGlmICghdGFzayB8fCAhbG9naW4gfHwgIXBhc3MpIHJldHVybjtcbiAgICAgIHZhciBvYmogPSB7XG4gICAgICAgIHBhc3N3b3JkOiBwYXNzLFxuICAgICAgICB0YXNrczogdGFza1xuICAgICAgfTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiXCIgKyBsb2dpbiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7IC8vINGB0L7RhdGA0LDQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgdC40YHRgtC10LzQtVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKGxvZ2luKSB7XG4gICAgICB2YXIgbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiXCIgKyBsb2dpbikpOyAvLyDQv9GA0LXQstGA0LDRidC10L3QuNC1INC90LDRiNC10LPQviDRgtC10LrRgdGC0LAg0YEg0L7QsdGK0LXQutGC0L7QvCDQsiDQvdC+0YDQvNCw0LvRjNC90YvQuSDQvtCx0YrQtdC60YJcbiAgICAgIHJldHVybiBscztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiU2F2ZUV2ZW50SW5EQlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBTYXZlRXZlbnRJbkRCKGNhcHRpb24sIGRhdGVEYXkpIHtcbiAgICAgIC8vINGB0L7RhdGA0LDQvdC10L3QuNC1INCX0LDQs9C+0LvQvtCy0LrQsCDQsiDRgdC40YHRgtC10LzQtSArINGB0L7Qt9C00LDQvdC40LUg0YHQuNGB0YLQtdC80Ysg0YXRgNCw0L3QtdC90LjRjyDQtNC70Y8g0YLQtdC60YHRgtCy0LAg0Lgg0LrQvtC80LXQvdGC0YDQsNC40LXQsiDQuCDQs9C+0YLQvtCy0LAg0LfQsNC00LDRh9CwINC40LvQuCDQvdC10YJcbiAgICAgIHZhciBvYmogPSB0aGlzLmdldEFsbChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSk7XG4gICAgICBpZiAob2JqLnRhc2tzW1wiXCIgKyBkYXRlRGF5XSkge1xuICAgICAgICB2YXIgYXJyID0gb2JqLnRhc2tzW1wiXCIgKyBkYXRlRGF5XS50aXRsZTtcbiAgICAgICAgYXJyLnB1c2goY2FwdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmoudGFza3NbXCJcIiArIGRhdGVEYXldID0ge1xuICAgICAgICAgIHRpdGxlOiBbXSxcbiAgICAgICAgICB0ZXh0OiBbXSxcbiAgICAgICAgICBkb25lOiBbXSxcbiAgICAgICAgICBjb21tZW50czogW11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFyciA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGU7XG4gICAgICAgIGFyci5wdXNoKGNhcHRpb24pO1xuICAgICAgfVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJcIiArIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVsZXRlRXZlbnRJbkRCXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUV2ZW50SW5EQihkYXRlRGF5LCB0ZXh0KSB7XG4gICAgICAvL9GD0LTQsNC70LXQvdC40LUg0L/QvtC60LAg0YLQvtC70YzQutC+INC30LDQs9C+0LvQvtCy0LrQsFxuICAgICAgdmFyIG9iaiA9IHRoaXMuZ2V0QWxsKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcbiAgICAgIHZhciBpbmRleCA9IG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGUuaW5kZXhPZih0ZXh0KTtcbiAgICAgIG9iai50YXNrc1tcIlwiICsgZGF0ZURheV0udGl0bGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiXCIgKyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxvYWRGcm9tREJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEZyb21EQigpIHtcbiAgICAgIC8vINC30LDQs9GA0YPQt9C60Lgg0L/QvtC60LAg0L3QtdGC0YMg0YLRg9GCINGC0L7Qu9GM0LrQviDQv9C+0LrQsCDQsdCw0LfQsNCy0LDRjyDQv9GA0L7Qs9GA0YPQt9C60LAg0L7QsdGK0LXQutCwXG4gICAgICB2YXIgb2JqID0gdGhpcy5nZXRBbGwoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpO1xuICAgICAgdmFyIGNhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTtcbiAgICAgIGZvciAodmFyIGRhdGVMb2FkIGluIG9iai50YXNrcykge1xuICAgICAgICB2YXIgbG9hZERhdGEgPSBvYmoudGFza3NbXCJcIiArIGRhdGVMb2FkXS50aXRsZTtcbiAgICAgICAgdmFyIHJlcyA9IGNhbC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgZGF0ZUxvYWQpO1xuICAgICAgICBpZiAocmVzICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAobG9hZERhdGEubGVuZ3RoIC0gMSA9PSAwKSB7XG4gICAgICAgICAgICByZXMuaW5uZXJIVE1MICs9IFwiPGRpdiBpZD1cXFwiZXZlbnRzXFxcIj5cIiArIGxvYWREYXRhICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjcm9zc1xcXCI+W3hdPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9hZERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGRiQXJyID0gbG9hZERhdGE7XG4gICAgICAgICAgICAgIHJlcy5pbm5lckhUTUwgKz0gXCI8ZGl2IGlkPVxcXCJldmVudHNcXFwiPlwiICsgZGJBcnJbaV0gKyBcIjxidXR0b24gY2xhc3M9XFxcImNyb3NzXFxcIj5beF08L2J1dHRvbj48L2Rpdj5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gZGI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1SaGRHRkNZWE5sTG1weklsMHNJbTVoYldWeklqcGJJbVJpSWl3aWRHRnpheUlzSW14dloybHVJaXdpY0dGemN5SXNJbTlpYWlJc0luQmhjM04zYjNKa0lpd2lkR0Z6YTNNaUxDSnNiMk5oYkZOMGIzSmhaMlVpTENKelpYUkpkR1Z0SWl3aVNsTlBUaUlzSW5OMGNtbHVaMmxtZVNJc0lteHpJaXdpY0dGeWMyVWlMQ0puWlhSSmRHVnRJaXdpWTJGd2RHbHZiaUlzSW1SaGRHVkVZWGtpTENKblpYUkJiR3dpTENKelpYTnphVzl1VTNSdmNtRm5aU0lzSW1GeWNpSXNJblJwZEd4bElpd2ljSFZ6YUNJc0luUmxlSFFpTENKa2IyNWxJaXdpWTI5dGJXVnVkSE1pTENKcGJtUmxlQ0lzSW1sdVpHVjRUMllpTENKemNHeHBZMlVpTENKallXd2lMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0prWVhSbFRHOWhaQ0lzSW14dllXUkVZWFJoSWl3aWNtVnpJaXdpYkdWdVozUm9JaXdpYVc1dVpYSklWRTFNSWl3aWFTSXNJbVJpUVhKeUlsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3TzBsQlFVMUJMRVU3T3pzN096czdORUpCUTBsRExFa3NSVUZCVFVNc1N5eEZRVUZQUXl4SkxFVkJRVTA3UVVGRGVrSTdRVUZEUVN4VlFVRkpMRU5CUVVOR0xFbEJRVVFzU1VGQlV5eERRVUZEUXl4TFFVRldMRWxCUVcxQ0xFTkJRVU5ETEVsQlFYaENMRVZCUVRoQ08wRkJRemxDTEZWQlFVbERMRTFCUVUwN1FVRkRVa01zYTBKQlFWVkdMRWxCUkVZN1FVRkZVa2NzWlVGQlQwdzdRVUZHUXl4UFFVRldPMEZCU1VGTkxHMUNRVUZoUXl4UFFVRmlMRTFCUVhkQ1RpeExRVUY0UWl4RlFVRnBRMDhzUzBGQlMwTXNVMEZCVEN4RFFVRmxUaXhIUVVGbUxFTkJRV3BETEVWQlVIbENMRU5CVHpoQ08wRkJRM2hFT3pzN01rSkJRMDFHTEVzc1JVRkJUenRCUVVOYUxGVkJRVWxUTEV0QlFVdEdMRXRCUVV0SExFdEJRVXdzUTBGQlYwd3NZVUZCWVUwc1QwRkJZaXhOUVVGM1FsZ3NTMEZCZUVJc1EwRkJXQ3hEUVVGVUxFTkJSRmtzUTBGRE1rTTdRVUZEZGtRc1lVRkJUMU1zUlVGQlVEdEJRVU5FT3pzN2EwTkJRMkZITEU4c1JVRkJVME1zVHl4RlFVRlRPMEZCUXpsQ08wRkJRMEVzVlVGQlNWZ3NUVUZCVFN4TFFVRkxXU3hOUVVGTUxFTkJRVmxETEdWQlFXVktMRTlCUVdZc1EwRkJkVUlzVFVGQmRrSXNRMEZCV2l4RFFVRldPMEZCUTBFc1ZVRkJTVlFzU1VGQlNVVXNTMEZCU2l4TlFVRmhVeXhQUVVGaUxFTkJRVW9zUlVGQk5rSTdRVUZETTBJc1dVRkJTVWNzVFVGQlRXUXNTVUZCU1VVc1MwRkJTaXhOUVVGaFV5eFBRVUZpTEVWQlFYZENTU3hMUVVGc1F6dEJRVU5CUkN4WlFVRkpSU3hKUVVGS0xFTkJRVk5PTEU5QlFWUTdRVUZEUkN4UFFVaEVMRTFCUjA4N1FVRkRURllzV1VGQlNVVXNTMEZCU2l4TlFVRmhVeXhQUVVGaUxFbEJRVEJDTzBGQlEzaENTU3hwUWtGQlR5eEZRVVJwUWp0QlFVVjRRa1VzWjBKQlFVMHNSVUZHYTBJN1FVRkhlRUpETEdkQ1FVRk5MRVZCU0d0Q08wRkJTWGhDUXl4dlFrRkJWVHRCUVVwakxGTkJRVEZDTzBGQlRVRXNXVUZCU1V3c1RVRkJUV1FzU1VGQlNVVXNTMEZCU2l4TlFVRmhVeXhQUVVGaUxFVkJRWGRDU1N4TFFVRnNRenRCUVVOQlJDeFpRVUZKUlN4SlFVRktMRU5CUVZOT0xFOUJRVlE3UVVGRFJEdEJRVU5FVUN4dFFrRkJZVU1zVDBGQllpeE5RVU5MVXl4bFFVRmxTaXhQUVVGbUxFTkJRWFZDTEUxQlFYWkNMRU5CUkV3c1JVRkZSVW9zUzBGQlMwTXNVMEZCVEN4RFFVRmxUaXhIUVVGbUxFTkJSa1k3UVVGSlJEczdPMjlEUVVObFZ5eFBMRVZCUVZOTkxFa3NSVUZCVFR0QlFVTTNRanRCUVVOQkxGVkJRVWxxUWl4TlFVRk5MRXRCUVV0WkxFMUJRVXdzUTBGQldVTXNaVUZCWlVvc1QwRkJaaXhEUVVGMVFpeE5RVUYyUWl4RFFVRmFMRU5CUVZZN1FVRkRRU3hWUVVGSlZ5eFJRVUZSY0VJc1NVRkJTVVVzUzBGQlNpeE5RVUZoVXl4UFFVRmlMRVZCUVhkQ1NTeExRVUY0UWl4RFFVRTRRazBzVDBGQk9VSXNRMEZCYzBOS0xFbEJRWFJETEVOQlFWbzdRVUZEUVdwQ0xGVkJRVWxGTEV0QlFVb3NUVUZCWVZNc1QwRkJZaXhGUVVGM1Fra3NTMEZCZUVJc1EwRkJPRUpQTEUxQlFUbENMRU5CUVhGRFJpeExRVUZ5UXl4RlFVRTBReXhEUVVFMVF6dEJRVU5CYWtJc2JVSkJRV0ZETEU5QlFXSXNUVUZEUzFNc1pVRkJaVW9zVDBGQlppeERRVUYxUWl4TlFVRjJRaXhEUVVSTUxFVkJSVVZLTEV0QlFVdERMRk5CUVV3c1EwRkJaVTRzUjBGQlppeERRVVpHTzBGQlNVUTdPenRwUTBGRFdUdEJRVU5ZTzBGQlEwRXNWVUZCU1VFc1RVRkJUU3hMUVVGTFdTeE5RVUZNTEVOQlFWbERMR1ZCUVdWS0xFOUJRV1lzUTBGQmRVSXNUVUZCZGtJc1EwRkJXaXhEUVVGV08wRkJRMEVzVlVGQlNXTXNUVUZCVFVNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4UFFVRjJRaXhEUVVGV08wRkJRMEVzVjBGQlN5eEpRVUZKUXl4UlFVRlVMRWxCUVhGQ01VSXNTVUZCU1VVc1MwRkJla0lzUlVGQlowTTdRVUZET1VJc1dVRkJTWGxDTEZkQlFWY3pRaXhKUVVGSlJTeExRVUZLTEUxQlFXRjNRaXhSUVVGaUxFVkJRWGxDV0N4TFFVRjRRenRCUVVOQkxGbEJRVWxoTEUxQlFVMU1MRWxCUVVsRkxHRkJRVW9zVDBGQmMwSkRMRkZCUVhSQ0xFTkJRVlk3UVVGRFFTeFpRVUZKUlN4UFFVRlBMRWxCUVZnc1JVRkJhVUk3UVVGRFppeGpRVUZKUkN4VFFVRlRSU3hOUVVGVUxFZEJRV3RDTEVOQlFXeENMRWxCUVhWQ0xFTkJRVE5DTEVWQlFUaENPMEZCUXpWQ1JDeG5Ra0ZCU1VVc1UwRkJTaXcwUWtGQmNVTklMRkZCUVhKRE8wRkJRMFFzVjBGR1JDeE5RVVZQTzBGQlEwd3NhVUpCUVVzc1NVRkJTVWtzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlNpeFRRVUZUUlN4TlFVRTNRaXhGUVVGeFEwVXNSMEZCY2tNc1JVRkJNRU03UVVGRGVFTXNhMEpCUVVsRExGRkJRVkZNTEZGQlFWbzdRVUZEUVVNc2EwSkJRVWxGTEZOQlFVb3NORUpCUVhGRFJTeE5RVU51UTBRc1EwRkViVU1zUTBGQmNrTTdRVUZIUkR0QlFVTkdPMEZCUTBZN1FVRkRSanRCUVVOR096czdPenM3YTBKQlJWbHVReXhGSWl3aVptbHNaU0k2SW1SaGRHRkNZWE5sTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lZMnhoYzNNZ1pHSWdlMXh5WEc0Z0lHRmtaRlZ6WlhJb2RHRnpheXdnYkc5bmFXNHNJSEJoYzNNcElIdGNjbHh1SUNBZ0lDOHYwTHpRdGRHQzBMN1F0Q0RRdE5DKzBMSFFzTkN5MEx2UXRkQzkwTGpSanlEUXY5QyswTHZSak5DMzBMN1FzdEN3MFlMUXRkQzcwWThnMExJZzBZSFF1TkdCMFlMUXRkQzgwWU1nMExnZzBZSFF2dEMzMExUUXNOQzkwTGpRdFNEUXY5R0EwTGpRdk5DNDBZTFF1TkN5MEwzUXZ0Q3owTDRnMFlIUmd0R0EwWVBRdXRHQzBZUFJnTkdMSU5HRjBZRFFzTkM5MExYUXZkQzQwWThnMExUUXNOQzkwTDNSaTlHRlhISmNiaUFnSUNCcFppQW9JWFJoYzJzZ2ZId2dJV3h2WjJsdUlIeDhJQ0Z3WVhOektTQnlaWFIxY200N1hISmNiaUFnSUNCMllYSWdiMkpxSUQwZ2UxeHlYRzRnSUNBZ0lDQndZWE56ZDI5eVpEb2djR0Z6Y3l4Y2NseHVJQ0FnSUNBZ2RHRnphM002SUhSaGMydGNjbHh1SUNBZ0lIMDdYSEpjYmlBZ0lDQnNiMk5oYkZOMGIzSmhaMlV1YzJWMFNYUmxiU2hnSkh0c2IyZHBibjFnTENCS1UwOU9Mbk4wY21sdVoybG1lU2h2WW1vcEtUc2dMeThnMFlIUXZ0R0YwWURRc05DOTBMWFF2ZEM0MExVZzBML1F2dEM3MFl6UXQ5QyswTExRc05HQzBMWFF1OUdQSU5DeUlOR0IwTGpSZ2RHQzBMWFF2TkMxWEhKY2JpQWdmVnh5WEc0Z0lHZGxkRUZzYkNoc2IyZHBiaWtnZTF4eVhHNGdJQ0FnZG1GeUlHeHpJRDBnU2xOUFRpNXdZWEp6WlNoc2IyTmhiRk4wYjNKaFoyVXVaMlYwU1hSbGJTaGdKSHRzYjJkcGJuMWdLU2s3SUM4dklOQy8wWURRdGRDeTBZRFFzTkdKMExYUXZkQzQwTFVnMEwzUXNOR0kwTFhRczlDK0lOR0MwTFhRdXRHQjBZTFFzQ0RSZ1NEUXZ0Q3gwWXJRdGRDNjBZTFF2dEM4SU5DeUlOQzkwTDdSZ05DODBMRFF1OUdNMEwzUmk5QzVJTkMrMExIUml0QzEwTHJSZ2x4eVhHNGdJQ0FnY21WMGRYSnVJR3h6TzF4eVhHNGdJSDFjY2x4dUlDQlRZWFpsUlhabGJuUkpia1JDS0dOaGNIUnBiMjRzSUdSaGRHVkVZWGtwSUh0Y2NseHVJQ0FnSUM4dklOR0IwTDdSaGRHQTBMRFF2ZEMxMEwzUXVOQzFJTkNYMExEUXM5QyswTHZRdnRDeTBMclFzQ0RRc2lEUmdkQzQwWUhSZ3RDMTBMelF0U0FySU5HQjBMN1F0OUMwMExEUXZkQzQwTFVnMFlIUXVOR0IwWUxRdGRDODBZc2cwWVhSZ05DdzBMM1F0ZEM5MExqUmp5RFF0TkM3MFk4ZzBZTFF0ZEM2MFlIUmd0Q3kwTEFnMExnZzBMclF2dEM4MExYUXZkR0MwWURRc05DNDBMWFFzaURRdUNEUXM5QyswWUxRdnRDeTBMQWcwTGZRc05DMDBMRFJoOUN3SU5DNDBMdlF1Q0RRdmRDMTBZSmNjbHh1SUNBZ0lIWmhjaUJ2WW1vZ1BTQjBhR2x6TG1kbGRFRnNiQ2h6WlhOemFXOXVVM1J2Y21GblpTNW5aWFJKZEdWdEtGd2lkWE5sY2x3aUtTazdYSEpjYmlBZ0lDQnBaaUFvYjJKcUxuUmhjMnR6VzJBa2UyUmhkR1ZFWVhsOVlGMHBJSHRjY2x4dUlDQWdJQ0FnZG1GeUlHRnljaUE5SUc5aWFpNTBZWE5yYzF0Z0pIdGtZWFJsUkdGNWZXQmRMblJwZEd4bE8xeHlYRzRnSUNBZ0lDQmhjbkl1Y0hWemFDaGpZWEIwYVc5dUtUdGNjbHh1SUNBZ0lIMGdaV3h6WlNCN1hISmNiaUFnSUNBZ0lHOWlhaTUwWVhOcmMxdGdKSHRrWVhSbFJHRjVmV0JkSUQwZ2UxeHlYRzRnSUNBZ0lDQWdJSFJwZEd4bE9pQmJYU3hjY2x4dUlDQWdJQ0FnSUNCMFpYaDBPaUJiWFN4Y2NseHVJQ0FnSUNBZ0lDQmtiMjVsT2lCYlhTeGNjbHh1SUNBZ0lDQWdJQ0JqYjIxdFpXNTBjem9nVzExY2NseHVJQ0FnSUNBZ2ZUdGNjbHh1SUNBZ0lDQWdkbUZ5SUdGeWNpQTlJRzlpYWk1MFlYTnJjMXRnSkh0a1lYUmxSR0Y1ZldCZExuUnBkR3hsTzF4eVhHNGdJQ0FnSUNCaGNuSXVjSFZ6YUNoallYQjBhVzl1S1R0Y2NseHVJQ0FnSUgxY2NseHVJQ0FnSUd4dlkyRnNVM1J2Y21GblpTNXpaWFJKZEdWdEtGeHlYRzRnSUNBZ0lDQmdKSHR6WlhOemFXOXVVM1J2Y21GblpTNW5aWFJKZEdWdEtGd2lkWE5sY2x3aUtYMWdMRnh5WEc0Z0lDQWdJQ0JLVTA5T0xuTjBjbWx1WjJsbWVTaHZZbW9wWEhKY2JpQWdJQ0FwTzF4eVhHNGdJSDFjY2x4dUlDQmtaV3hsZEdWRmRtVnVkRWx1UkVJb1pHRjBaVVJoZVN3Z2RHVjRkQ2tnZTF4eVhHNGdJQ0FnTHkvUmc5QzAwTERRdTlDMTBMM1F1TkMxSU5DLzBMN1F1dEN3SU5HQzBMN1F1OUdNMExyUXZpRFF0OUN3MExQUXZ0QzcwTDdRc3RDNjBMQmNjbHh1SUNBZ0lIWmhjaUJ2WW1vZ1BTQjBhR2x6TG1kbGRFRnNiQ2h6WlhOemFXOXVVM1J2Y21GblpTNW5aWFJKZEdWdEtGd2lkWE5sY2x3aUtTazdYSEpjYmlBZ0lDQjJZWElnYVc1a1pYZ2dQU0J2WW1vdWRHRnphM05iWUNSN1pHRjBaVVJoZVgxZ1hTNTBhWFJzWlM1cGJtUmxlRTltS0hSbGVIUXBPMXh5WEc0Z0lDQWdiMkpxTG5SaGMydHpXMkFrZTJSaGRHVkVZWGw5WUYwdWRHbDBiR1V1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjY2x4dUlDQWdJR3h2WTJGc1UzUnZjbUZuWlM1elpYUkpkR1Z0S0Z4eVhHNGdJQ0FnSUNCZ0pIdHpaWE56YVc5dVUzUnZjbUZuWlM1blpYUkpkR1Z0S0Z3aWRYTmxjbHdpS1gxZ0xGeHlYRzRnSUNBZ0lDQktVMDlPTG5OMGNtbHVaMmxtZVNodlltb3BYSEpjYmlBZ0lDQXBPMXh5WEc0Z0lIMWNjbHh1SUNCc2IyRmtSbkp2YlVSQ0tDa2dlMXh5WEc0Z0lDQWdMeThnMExmUXNOQ3owWURSZzlDMzBMclF1Q0RRdjlDKzBMclFzQ0RRdmRDMTBZTFJneURSZ3RHRDBZSWcwWUxRdnRDNzBZelF1dEMrSU5DLzBMN1F1dEN3SU5DeDBMRFF0OUN3MExMUXNOR1BJTkMvMFlEUXZ0Q3owWURSZzlDMzBMclFzQ0RRdnRDeDBZclF0ZEM2MExCY2NseHVJQ0FnSUd4bGRDQnZZbW9nUFNCMGFHbHpMbWRsZEVGc2JDaHpaWE56YVc5dVUzUnZjbUZuWlM1blpYUkpkR1Z0S0Z3aWRYTmxjbHdpS1NrN1hISmNiaUFnSUNCc1pYUWdZMkZzSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSW5SaFlteGxYQ0lwTzF4eVhHNGdJQ0FnWm05eUlDaHNaWFFnWkdGMFpVeHZZV1FnYVc0Z2IySnFMblJoYzJ0ektTQjdYSEpjYmlBZ0lDQWdJR3hsZENCc2IyRmtSR0YwWVNBOUlHOWlhaTUwWVhOcmMxdGdKSHRrWVhSbFRHOWhaSDFnWFM1MGFYUnNaVHRjY2x4dUlDQWdJQ0FnYkdWMElISmxjeUE5SUdOaGJDNXhkV1Z5ZVZObGJHVmpkRzl5S0dBdUpIdGtZWFJsVEc5aFpIMWdLVHRjY2x4dUlDQWdJQ0FnYVdZZ0tISmxjeUFoUFNCdWRXeHNLU0I3WEhKY2JpQWdJQ0FnSUNBZ2FXWWdLR3h2WVdSRVlYUmhMbXhsYm1kMGFDQXRJREVnUFQwZ01Da2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ2NtVnpMbWx1Ym1WeVNGUk5UQ0FyUFNCZ1BHUnBkaUJwWkQxY0ltVjJaVzUwYzF3aVBpUjdiRzloWkVSaGRHRjlQR0oxZEhSdmJpQmpiR0Z6Y3oxY0ltTnliM056WENJK1czaGRQQzlpZFhSMGIyNCtQQzlrYVhZK1lEdGNjbHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNiMkZrUkdGMFlTNXNaVzVuZEdnN0lHa3JLeWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHSkJjbklnUFNCc2IyRmtSR0YwWVR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WekxtbHVibVZ5U0ZSTlRDQXJQU0JnUEdScGRpQnBaRDFjSW1WMlpXNTBjMXdpUGlSN1pHSkJjbkpiWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYVZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JkZlR4aWRYUjBiMjRnWTJ4aGMzTTlYQ0pqY205emMxd2lQbHQ0WFR3dlluVjBkRzl1UGp3dlpHbDJQbUE3WEhKY2JpQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOVhISmNiaUFnZlZ4eVhHNTlYSEpjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1JpTzF4eVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcZGF0YUJhc2UuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZGF0YUJhc2UgPSByZXF1aXJlKFwiLi9kYXRhQmFzZVwiKTtcblxudmFyIF9kYXRhQmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXRhQmFzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBzaWduSW4gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNpZ25JbigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgc2lnbkluKTtcblxuICAgIHRoaXMuZGIgPSBuZXcgX2RhdGFCYXNlMi5kZWZhdWx0KCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3Moc2lnbkluLCBbe1xuICAgIGtleTogXCJ0cnlTaWduaW5CeUxvZ2luQW5kUGFzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cnlTaWduaW5CeUxvZ2luQW5kUGFzcyhsb2dpbiwgcGFzc3dvcmQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB1c2VyID0gX3RoaXMuZGIuZ2V0QWxsKGxvZ2luKTtcbiAgICAgICAgaWYgKHVzZXIgIT0gbnVsbCAmJiB1c2VyLnBhc3N3b3JkID09IHBhc3N3b3JkICYmIGxvZ2luICE9IFwiXCIgJiYgcGFzc3dvcmQgIT0gXCJcIikge1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIFwiXCIgKyBsb2dpbik7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cnlSZWdpc3RlcldpdGhMb2dpbkFuZEVtYWlsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyeVJlZ2lzdGVyV2l0aExvZ2luQW5kRW1haWwobG9naW4sIHBhc3N3b3JkKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHVzZXIgPSBfdGhpczIuZGIuZ2V0QWxsKGxvZ2luKTtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgX3RoaXMyLmRiLmFkZFVzZXIoe30sIGxvZ2luLCBwYXNzd29yZCk7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJcIiwgXCJcIiArIGxvZ2luKTtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIHNpZ25Jbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2lnbkluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OcFoyNUpiaTVxY3lKZExDSnVZVzFsY3lJNld5SnphV2R1U1c0aUxDSmtZaUlzSW14dloybHVJaXdpY0dGemMzZHZjbVFpTENKUWNtOXRhWE5sSWl3aWNtVnpiMngyWlNJc0luSmxhbVZqZENJc0luVnpaWElpTENKblpYUkJiR3dpTENKelpYTnphVzl1VTNSdmNtRm5aU0lzSW5ObGRFbDBaVzBpTENKaFpHUlZjMlZ5SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096dEJRVUZCT3pzN096czdPenRKUVVOTlFTeE5PMEZCUTBvc2IwSkJRV003UVVGQlFUczdRVUZEV2l4VFFVRkxReXhGUVVGTUxFZEJRVlVzZDBKQlFWWTdRVUZEUkRzN096czBRMEZEZFVKRExFc3NSVUZCVDBNc1VTeEZRVUZWTzBGQlFVRTdPMEZCUTNaRExHRkJRVThzU1VGQlNVTXNUMEZCU2l4RFFVRlpMRlZCUVVORExFOUJRVVFzUlVGQlZVTXNUVUZCVml4RlFVRnhRanRCUVVOMFF5eFpRVUZKUXl4UFFVRlBMRTFCUVV0T0xFVkJRVXdzUTBGQlVVOHNUVUZCVWl4RFFVRmxUaXhMUVVGbUxFTkJRVmc3UVVGRFFTeFpRVU5GU3l4UlFVRlJMRWxCUVZJc1NVRkRRVUVzUzBGQlMwb3NVVUZCVEN4SlFVRnBRa0VzVVVGRWFrSXNTVUZGUVVRc1UwRkJVeXhGUVVaVUxFbEJSMEZETEZsQlFWa3NSVUZLWkN4RlFVdEZPMEZCUTBGTkxIbENRVUZsUXl4UFFVRm1MRU5CUVhWQ0xFMUJRWFpDTEU5QlFXdERVaXhMUVVGc1F6dEJRVU5CTEdsQ1FVRlBSeXhUUVVGUU8wRkJRMFE3UVVGRFJFTTdRVUZEUkN4UFFWcE5MRU5CUVZBN1FVRmhSRHM3TzJsRVFVVTBRa29zU3l4RlFVRlBReXhSTEVWQlFWVTdRVUZCUVRzN1FVRkROVU1zWVVGQlR5eEpRVUZKUXl4UFFVRktMRU5CUVZrc1ZVRkJRME1zVDBGQlJDeEZRVUZWUXl4TlFVRldMRVZCUVhGQ08wRkJRM1JETEZsQlFVbERMRTlCUVU4c1QwRkJTMDRzUlVGQlRDeERRVUZSVHl4TlFVRlNMRU5CUVdWT0xFdEJRV1lzUTBGQldEdEJRVU5CTEZsQlFVa3NRMEZCUTBzc1NVRkJUQ3hGUVVGWE8wRkJRMVFzYVVKQlFVdE9MRVZCUVV3c1EwRkJVVlVzVDBGQlVpeERRVUZuUWl4RlFVRm9RaXhGUVVGdlFsUXNTMEZCY0VJc1JVRkJNa0pETEZGQlFUTkNPMEZCUTBGTkxIbENRVUZsUXl4UFFVRm1MRU5CUVhWQ0xFMUJRWFpDTEU5QlFXdERVaXhMUVVGc1F6dEJRVU5CTEdsQ1FVRlBSeXhUUVVGUU8wRkJRMFFzVTBGS1JDeE5RVWxQTzBGQlEwd3NhVUpCUVU5RExGRkJRVkE3UVVGRFJEdEJRVU5HTEU5QlZFMHNRMEZCVUR0QlFWVkVPenM3T3pzN2EwSkJSVmxPTEUwaUxDSm1hV3hsSWpvaWMybG5ia2x1TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElHUmlJR1p5YjIwZ1hDSXVMMlJoZEdGQ1lYTmxYQ0k3WEhKY2JtTnNZWE56SUhOcFoyNUpiaUI3WEhKY2JpQWdZMjl1YzNSeWRXTjBiM0lvS1NCN1hISmNiaUFnSUNCMGFHbHpMbVJpSUQwZ2JtVjNJR1JpS0NrN1hISmNiaUFnZlZ4eVhHNGdJSFJ5ZVZOcFoyNXBia0o1VEc5bmFXNUJibVJRWVhOektHeHZaMmx1TENCd1lYTnpkMjl5WkNrZ2UxeHlYRzRnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtDaHlaWE52YkhabExDQnlaV3BsWTNRcElEMCtJSHRjY2x4dUlDQWdJQ0FnYkdWMElIVnpaWElnUFNCMGFHbHpMbVJpTG1kbGRFRnNiQ2hzYjJkcGJpazdYSEpjYmlBZ0lDQWdJR2xtSUNoY2NseHVJQ0FnSUNBZ0lDQjFjMlZ5SUNFOUlHNTFiR3dnSmlaY2NseHVJQ0FnSUNBZ0lDQjFjMlZ5TG5CaGMzTjNiM0prSUQwOUlIQmhjM04zYjNKa0lDWW1YSEpjYmlBZ0lDQWdJQ0FnYkc5bmFXNGdJVDBnWENKY0lpQW1KbHh5WEc0Z0lDQWdJQ0FnSUhCaGMzTjNiM0prSUNFOUlGd2lYQ0pjY2x4dUlDQWdJQ0FnS1NCN1hISmNiaUFnSUNBZ0lDQWdjMlZ6YzJsdmJsTjBiM0poWjJVdWMyVjBTWFJsYlNoY0luVnpaWEpjSWl3Z1lDUjdiRzluYVc1OVlDazdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEpsYzI5c2RtVW9LVHRjY2x4dUlDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNCeVpXcGxZM1FvS1R0Y2NseHVJQ0FnSUgwcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2RISjVVbVZuYVhOMFpYSlhhWFJvVEc5bmFXNUJibVJGYldGcGJDaHNiMmRwYml3Z2NHRnpjM2R2Y21RcElIdGNjbHh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTZ29jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQTlQaUI3WEhKY2JpQWdJQ0FnSUd4bGRDQjFjMlZ5SUQwZ2RHaHBjeTVrWWk1blpYUkJiR3dvYkc5bmFXNHBPMXh5WEc0Z0lDQWdJQ0JwWmlBb0lYVnpaWElwSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1SaUxtRmtaRlZ6WlhJb2UzMHNJR3h2WjJsdUxDQndZWE56ZDI5eVpDazdYSEpjYmlBZ0lDQWdJQ0FnYzJWemMybHZibE4wYjNKaFoyVXVjMlYwU1hSbGJTaGNJblZ6WlhKY0lpd2dZQ1I3Ykc5bmFXNTlZQ2s3WEhKY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMyOXNkbVVvS1R0Y2NseHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2NseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnFaV04wS0NrN1hISmNiaUFnSUNBZ0lIMWNjbHh1SUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCemFXZHVTVzQ3WEhKY2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcc2lnbkluLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX1JvdXRlciA9IHJlcXVpcmUoXCIuL3V0aWxzL1JvdXRlclwiKTtcblxudmFyIF9Sb3V0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUm91dGVyKTtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoXCIuL3JvdXRlcy9pbmRleFwiKTtcblxudmFyIF9DYWxlbmRhciA9IHJlcXVpcmUoXCIuL3JvdXRlcy9DYWxlbmRhclwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHJvdXRlcyA9IFtfaW5kZXguaW5kZXgsIF9DYWxlbmRhci5DYWxlbmRhcl07XG5uZXcgX1JvdXRlcjIuZGVmYXVsdCh7IHJvdXRlczogcm91dGVzIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1aaGEyVmZZV1ExWTJVNVpEQXVhbk1pWFN3aWJtRnRaWE1pT2xzaWNtOTFkR1Z6SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQk96czdPMEZCUTBFN08wRkJRMEU3T3pzN1FVRkRRU3hKUVVGTlFTeFRRVUZUTEd0RFFVRm1PMEZCUTBFc2NVSkJRVmNzUlVGQlJVRXNZMEZCUml4RlFVRllJaXdpWm1sc1pTSTZJbVpoYTJWZllXUTFZMlU1WkRBdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdVbTkxZEdWeUlHWnliMjBnWENJdUwzVjBhV3h6TDFKdmRYUmxjbHdpTzF4eVhHNXBiWEJ2Y25RZ2V5QnBibVJsZUNCOUlHWnliMjBnWENJdUwzSnZkWFJsY3k5cGJtUmxlRndpTzF4eVhHNXBiWEJ2Y25RZ2V5QkRZV3hsYm1SaGNpQjlJR1p5YjIwZ1hDSXVMM0p2ZFhSbGN5OURZV3hsYm1SaGNsd2lPMXh5WEc1amIyNXpkQ0J5YjNWMFpYTWdQU0JiYVc1a1pYZ3NJRU5oYkdWdVpHRnlYVHRjY2x4dWJtVjNJRkp2ZFhSbGNpaDdJSEp2ZFhSbGN5QjlLVHNpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2FkNWNlOWQwLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNhbGVuZGFyID0gdW5kZWZpbmVkO1xuXG52YXIgX0NhbGVuZGFyUGFnZSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL0NhbGVuZGFyUGFnZVwiKTtcblxudmFyIF9DYWxlbmRhclBhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2FsZW5kYXJQYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy9pbXBvcnQgeyB1c2VyT25saW5lIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2lnbkluXCI7XG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKTtcbnZhciBDYWxlbmRhciA9IHtcbiAgbmFtZTogXCJDYWxlbmRhclwiLFxuICBtYXRjaDogZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICAgIHJldHVybiB0ZXh0ID09PSBcIkNhbGVuZGFyXCI7XG4gIH0sXG4gIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7XG4gICAgLy8g0L/RgNC4INC30LDRhdC+0LTQtSDQvdCwINGB0YLRgNCw0L3QuNGG0YMg0L/RgNC+0LLQtdGA0Y/QtdGC0YzRgdGPLCDQt9Cw0LvQvtCz0LjQvdC+INC70Lgg0YLRiyDQt9Cw0YXQvtC00LjRiNGMICwg0LXRgdC70Lgg0L3QtdGCINGC0L4g0L/QvtGI0LXQuyDQstC+0L0hXG5cbiAgICBpZiAoIXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKSBsb2NhdGlvbi5oYXNoID0gXCJcIjtcbiAgfSxcbiAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICAvLyDRgtGD0YIg0YHQvtC30LTQsNC10YLRjNGB0Y8g0LzQsNGB0YHQuNCyINGBINCz0L7QtNC+0Lwg0Lgg0LzQtdGB0Y/RhtC10Lwg0LTQu9GPINC/0LXRgNC10LTQsNGH0Lgg0LXQs9C+INCyINGA0LXQvdC00LXRgFxuICAgIHZhciBkYXRlTW9udGggPSBbXTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIG1vbnQgPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgdmFyIHllciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBkYXRlTW9udGgucHVzaCh5ZXIpO1xuICAgIGRhdGVNb250aC5wdXNoKG1vbnQgKyAxKTtcbiAgICAvL1xuICAgIHZhciBjYWxlbmRhciA9IG5ldyBfQ2FsZW5kYXJQYWdlMi5kZWZhdWx0KCk7IC8vINGB0L7Qt9C00LDQvdC40LUg0Y3QutC30LXQvNC/0LvRj9GA0LAg0LrQu9Cw0YHRgdCwXG4gICAgY2FsZW5kYXIuUmVuZGVyKGRhdGVNb250aCk7IC8vINGA0LXQvdC00LXRgCDRgdGC0YDQsNC90LjRhtGLINC4INC00L7QsdCw0LLQu9C10L3QuNC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LBcbiAgfSxcbiAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAvL9C/0YDQuCDQstGL0YXQvtC00LUg0YEg0YHRgtGA0LDQvdC40YbRiyDRh9C40YHRgtC40YbQsCBoZWFkZXIgLGRpdiwgdXNlck9ubGluZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxufTtcblxuZXhwb3J0cy5DYWxlbmRhciA9IENhbGVuZGFyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtOaGJHVnVaR0Z5TG1weklsMHNJbTVoYldWeklqcGJJbVJwZGlJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0lrTmhiR1Z1WkdGeUlpd2libUZ0WlNJc0ltMWhkR05vSWl3aWRHVjRkQ0lzSW05dVFtVm1iM0psUlc1MFpYSWlMQ0p6WlhOemFXOXVVM1J2Y21GblpTSXNJbWRsZEVsMFpXMGlMQ0pzYjJOaGRHbHZiaUlzSW1oaGMyZ2lMQ0p2YmtWdWRHVnlJaXdpWkdGMFpVMXZiblJvSWl3aVpHRjBaU0lzSWtSaGRHVWlMQ0p0YjI1MElpd2laMlYwVFc5dWRHZ2lMQ0o1WlhJaUxDSm5aWFJHZFd4c1dXVmhjaUlzSW5CMWMyZ2lMQ0pqWVd4bGJtUmhjaUlzSWxKbGJtUmxjaUlzSW05dVRHVmhkbVVpTENKcGJtNWxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZCUVRzN096czdPMEZCUTBFN1FVRkRRU3hKUVVGSlFTeE5RVUZOUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEV0QlFYWkNMRU5CUVZZN1FVRkRRU3hKUVVGSlF5eFhRVUZYTzBGQlEySkRMRkZCUVUwc1ZVRkVUenRCUVVWaVF5eFRRVUZQTzBGQlFVRXNWMEZCVVVNc1UwRkJVeXhWUVVGcVFqdEJRVUZCTEVkQlJrMDdRVUZIWWtNc2FVSkJRV1VzZVVKQlFVMDdRVUZEYmtJN08wRkJSVUVzVVVGQlNTeERRVUZEUXl4bFFVRmxReXhQUVVGbUxFTkJRWFZDTEUxQlFYWkNMRU5CUVV3c1JVRkJjVU5ETEZOQlFWTkRMRWxCUVZRc1IwRkJaMElzUlVGQmFFSTdRVUZEZEVNc1IwRlFXVHRCUVZGaVF5eFhRVUZUTEcxQ1FVRk5PMEZCUTJJN1FVRkRRU3hSUVVGSlF5eFpRVUZaTEVWQlFXaENPMEZCUTBFc1VVRkJTVU1zVDBGQlR5eEpRVUZKUXl4SlFVRktMRVZCUVZnN1FVRkRRU3hSUVVGSlF5eFBRVUZQUml4TFFVRkxSeXhSUVVGTUxFVkJRVmc3UVVGRFFTeFJRVUZKUXl4TlFVRk5TaXhMUVVGTFN5eFhRVUZNTEVWQlFWWTdRVUZEUVU0c1kwRkJWVThzU1VGQlZpeERRVUZsUml4SFFVRm1PMEZCUTBGTUxHTkJRVlZQTEVsQlFWWXNRMEZCWlVvc1QwRkJUeXhEUVVGMFFqdEJRVU5CTzBGQlEwRXNVVUZCU1Vzc1YwRkJWeXcwUWtGQlppeERRVlJoTEVOQlUzTkNPMEZCUTI1RFFTeGhRVUZUUXl4TlFVRlVMRU5CUVdkQ1ZDeFRRVUZvUWl4RlFWWmhMRU5CVldVN1FVRkROMElzUjBGdVFsazdRVUZ2UW1KVkxGZEJRVk1zYlVKQlFVMDdRVUZEWWp0QlFVTkJkRUlzWVVGQlUwTXNZVUZCVkN4RFFVRjFRaXhSUVVGMlFpeEZRVUZwUTNOQ0xGTkJRV3BETEVkQlFUWkRMRVZCUVRkRE8wRkJRMEY0UWl4UlFVRkpkMElzVTBGQlNpeEhRVUZuUWl4RlFVRm9RanRCUVVORU8wRkJlRUpaTEVOQlFXWTdPMUZCTWtKVGNrSXNVU3hIUVVGQlFTeFJJaXdpWm1sc1pTSTZJa05oYkdWdVpHRnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUdOaGJHVnVaR0Z5VUdGblpTQm1jbTl0SUZ3aUxpNHZZMjl0Y0c5dVpXNTBjeTlEWVd4bGJtUmhjbEJoWjJWY0lqdGNjbHh1THk5cGJYQnZjblFnZXlCMWMyVnlUMjVzYVc1bElIMGdabkp2YlNCY0lpNHVMMk52YlhCdmJtVnVkSE12YzJsbmJrbHVYQ0k3WEhKY2JuWmhjaUJrYVhZZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aVpHbDJYQ0lwTzF4eVhHNTJZWElnUTJGc1pXNWtZWElnUFNCN1hISmNiaUFnYm1GdFpUb2dYQ0pEWVd4bGJtUmhjbHdpTEZ4eVhHNGdJRzFoZEdOb09pQjBaWGgwSUQwK0lIUmxlSFFnUFQwOUlGd2lRMkZzWlc1a1lYSmNJaXhjY2x4dUlDQnZia0psWm05eVpVVnVkR1Z5T2lBb0tTQTlQaUI3WEhKY2JpQWdJQ0F2THlEUXY5R0EwTGdnMExmUXNOR0YwTDdRdE5DMUlOQzkwTEFnMFlIUmd0R0EwTERRdmRDNDBZYlJneURRdjlHQTBMN1FzdEMxMFlEUmo5QzEwWUxSak5HQjBZOHNJTkMzMExEUXU5QyswTFBRdU5DOTBMNGcwTHZRdUNEUmd0R0xJTkMzMExEUmhkQyswTFRRdU5HSTBZd2dMQ0RRdGRHQjBMdlF1Q0RRdmRDMTBZSWcwWUxRdmlEUXY5QyswWWpRdGRDN0lOQ3kwTDdRdlNGY2NseHVYSEpjYmlBZ0lDQnBaaUFvSVhObGMzTnBiMjVUZEc5eVlXZGxMbWRsZEVsMFpXMG9YQ0oxYzJWeVhDSXBLU0JzYjJOaGRHbHZiaTVvWVhOb0lEMGdYQ0pjSWp0Y2NseHVJQ0I5TEZ4eVhHNGdJRzl1Ulc1MFpYSTZJQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDOHZJTkdDMFlQUmdpRFJnZEMrMExmUXROQ3cwTFhSZ3RHTTBZSFJqeURRdk5DdzBZSFJnZEM0MExJZzBZRWcwTFBRdnRDMDBMN1F2Q0RRdUNEUXZOQzEwWUhSajlHRzBMWFF2Q0RRdE5DNzBZOGcwTC9RdGRHQTBMWFF0TkN3MFlmUXVDRFF0ZEN6MEw0ZzBMSWcwWURRdGRDOTBMVFF0ZEdBWEhKY2JpQWdJQ0JzWlhRZ1pHRjBaVTF2Ym5Sb0lEMGdXMTA3WEhKY2JpQWdJQ0JzWlhRZ1pHRjBaU0E5SUc1bGR5QkVZWFJsS0NrN1hISmNiaUFnSUNCc1pYUWdiVzl1ZENBOUlHUmhkR1V1WjJWMFRXOXVkR2dvS1R0Y2NseHVJQ0FnSUd4bGRDQjVaWElnUFNCa1lYUmxMbWRsZEVaMWJHeFpaV0Z5S0NrN1hISmNiaUFnSUNCa1lYUmxUVzl1ZEdndWNIVnphQ2g1WlhJcE8xeHlYRzRnSUNBZ1pHRjBaVTF2Ym5Sb0xuQjFjMmdvYlc5dWRDQXJJREVwTzF4eVhHNGdJQ0FnTHk5Y2NseHVJQ0FnSUd4bGRDQmpZV3hsYm1SaGNpQTlJRzVsZHlCallXeGxibVJoY2xCaFoyVW9LVHNnTHk4ZzBZSFF2dEMzMExUUXNOQzkwTGpRdFNEUmpkQzYwTGZRdGRDODBML1F1OUdQMFlEUXNDRFF1dEM3MExEUmdkR0IwTEJjY2x4dUlDQWdJR05oYkdWdVpHRnlMbEpsYm1SbGNpaGtZWFJsVFc5dWRHZ3BPeUF2THlEUmdOQzEwTDNRdE5DMTBZQWcwWUhSZ3RHQTBMRFF2ZEM0MFliUml5RFF1Q0RRdE5DKzBMSFFzTkN5MEx2UXRkQzkwTGpRdFNEUXZ0Q3gwWURRc05DeDBMN1JndEdIMExqUXV0Q3dYSEpjYmlBZ2ZTeGNjbHh1SUNCdmJreGxZWFpsT2lBb0tTQTlQaUI3WEhKY2JpQWdJQ0F2TDlDLzBZRFF1Q0RRc3RHTDBZWFF2dEMwMExVZzBZRWcwWUhSZ3RHQTBMRFF2ZEM0MFliUml5RFJoOUM0MFlIUmd0QzQwWWJRc0NCb1pXRmtaWElnTEdScGRpd2dkWE5sY2s5dWJHbHVaVnh5WEc0Z0lDQWdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0ltaGxZV1JsY2x3aUtTNXBibTVsY2toVVRVd2dQU0JjSWx3aU8xeHlYRzRnSUNBZ1pHbDJMbWx1Ym1WeVNGUk5UQ0E5SUZ3aVhDSTdYSEpjYmlBZ2ZWeHlYRzU5TzF4eVhHNWNjbHh1Wlhod2IzSjBJSHNnUTJGc1pXNWtZWElnZlR0Y2NseHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxDYWxlbmRhci5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pbmRleCA9IHVuZGVmaW5lZDtcblxudmFyIF9JbmRleFBhZ2UgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9JbmRleFBhZ2VcIik7XG5cbnZhciBfSW5kZXhQYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0luZGV4UGFnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpO1xudmFyIGluZGV4ID0ge1xuICBuYW1lOiBcImluZGV4XCIsXG4gIG1hdGNoOiBcIlwiLFxuICBvbkJlZm9yZUVudGVyOiBmdW5jdGlvbiBvbkJlZm9yZUVudGVyKCkge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhcIm9uQmVmb3JlRW50ZXIgaW5kZXhcIik7XG4gIH0sXG4gIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIoKSB7XG4gICAgdmFyIGluZGV4ID0gbmV3IF9JbmRleFBhZ2UyLmRlZmF1bHQoKTsgLy8g0YHQvtC30LTQsNC90LjQtSDRjdC60LfQtdC80L/Qu9Cw0YDQsCDQutC70LDRgdCwIGluZGV4UGFnZVxuICAgIGluZGV4LnJlbmRlclBhZ2UoKTsgLy/RgNC10L3QtNC10YAg0YHRgtGA0LDQvdC40YbRi1xuICAgIGluZGV4LmFkZEhlbmRsZXIoKTsgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQsFxuICB9LFxuICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIikuaW5uZXJIVE1MID0gXCJcIjsgLy8g0L/RgNC4INC/0L7QutC40LTQsNC90LjQuCDQtNCw0L3QvdC+0Lkg0YHRgtGA0LDQvdC40YbRiyDQv9GA0L7QuNC30LLQvtC00LjRgtGM0YHRjyDQvtGH0LjRgdGC0LrQsFxuICB9XG59O1xuXG5leHBvcnRzLmluZGV4ID0gaW5kZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1ScGRpSXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbWx1WkdWNElpd2libUZ0WlNJc0ltMWhkR05vSWl3aWIyNUNaV1p2Y21WRmJuUmxjaUlzSW1OdmJuTnZiR1VpTENKc2IyY2lMQ0p2YmtWdWRHVnlJaXdpY21WdVpHVnlVR0ZuWlNJc0ltRmtaRWhsYm1Sc1pYSWlMQ0p2Ymt4bFlYWmxJaXdpYVc1dVpYSklWRTFNSWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN08wRkJRVUU3T3pzN096dEJRVU5CTEVsQlFVbEJMRTFCUVUxRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1MwRkJka0lzUTBGQlZqdEJRVU5CTEVsQlFVbERMRkZCUVZFN1FVRkRWa01zVVVGQlRTeFBRVVJKTzBGQlJWWkRMRk5CUVU4c1JVRkdSenRCUVVkV1F5eHBRa0ZCWlR0QlFVRkJMRmRCUVUxRExGRkJRVkZETEVkQlFWSXNkVUpCUVU0N1FVRkJRU3hIUVVoTU8wRkJTVlpETEZkQlFWTXNiVUpCUVUwN1FVRkRZaXhSUVVGSlRpeFJRVUZSTEhsQ1FVRmFMRU5CUkdFc1EwRkRaMEk3UVVGRE4wSkJMRlZCUVUxUExGVkJRVTRzUjBGR1lTeERRVVZQTzBGQlEzQkNVQ3hWUVVGTlVTeFZRVUZPTEVkQlNHRXNRMEZIVHp0QlFVTnlRaXhIUVZKVE8wRkJVMVpETEZkQlFWTXNiVUpCUVUwN1FVRkRZbGdzWVVGQlUwTXNZVUZCVkN4RFFVRjFRaXhMUVVGMlFpeEZRVUU0UWxjc1UwRkJPVUlzUjBGQk1FTXNSVUZCTVVNc1EwRkVZU3hEUVVOcFF6dEJRVU12UXp0QlFWaFRMRU5CUVZvN08xRkJZMU5XTEVzc1IwRkJRVUVzU3lJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCcGJtUmxlRkJoWjJVZ1puSnZiU0JjSWk0dUwyTnZiWEJ2Ym1WdWRITXZTVzVrWlhoUVlXZGxYQ0k3WEhKY2JuWmhjaUJrYVhZZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aVpHbDJYQ0lwTzF4eVhHNTJZWElnYVc1a1pYZ2dQU0I3WEhKY2JpQWdibUZ0WlRvZ1hDSnBibVJsZUZ3aUxGeHlYRzRnSUcxaGRHTm9PaUJjSWx3aUxGeHlYRzRnSUc5dVFtVm1iM0psUlc1MFpYSTZJQ2dwSUQwK0lHTnZibk52YkdVdWJHOW5LR0J2YmtKbFptOXlaVVZ1ZEdWeUlHbHVaR1Y0WUNrc1hISmNiaUFnYjI1RmJuUmxjam9nS0NrZ1BUNGdlMXh5WEc0Z0lDQWdiR1YwSUdsdVpHVjRJRDBnYm1WM0lHbHVaR1Y0VUdGblpTZ3BPeUF2THlEUmdkQyswTGZRdE5DdzBMM1F1TkMxSU5HTjBMclF0OUMxMEx6UXY5QzcwTERSZ05Dd0lOQzYwTHZRc05HQjBMQWdhVzVrWlhoUVlXZGxYSEpjYmlBZ0lDQnBibVJsZUM1eVpXNWtaWEpRWVdkbEtDazdJQzh2MFlEUXRkQzkwTFRRdGRHQUlOR0IwWUxSZ05DdzBMM1F1TkdHMFl0Y2NseHVJQ0FnSUdsdVpHVjRMbUZrWkVobGJtUnNaWElvS1RzZ0x5OGcwTFRRdnRDeDBMRFFzdEM3MExYUXZkQzQwTFVnMEw3UXNkR0EwTERRc2RDKzBZTFJoOUM0MExyUXNGeHlYRzRnSUgwc1hISmNiaUFnYjI1TVpXRjJaVG9nS0NrZ1BUNGdlMXh5WEc0Z0lDQWdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0ltUnBkbHdpS1M1cGJtNWxja2hVVFV3Z1BTQmNJbHdpT3lBdkx5RFF2OUdBMExnZzBML1F2dEM2MExqUXROQ3cwTDNRdU5DNElOQzAwTERRdmRDOTBMN1F1U0RSZ2RHQzBZRFFzTkM5MExqUmh0R0xJTkMvMFlEUXZ0QzQwTGZRc3RDKzBMVFF1TkdDMFl6UmdkR1BJTkMrMFlmUXVOR0IwWUxRdXRDd1hISmNiaUFnZlZ4eVhHNTlPMXh5WEc1Y2NseHVaWGh3YjNKMElIc2dhVzVrWlhnZ2ZUdGNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcaW5kZXguanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBSb3V0ZXIgPSBmdW5jdGlvbiBSb3V0ZXIob3B0aW9ucykge1xuICB0aGlzLnJvdXRlcyA9IG9wdGlvbnMucm91dGVzO1xuICB0aGlzLmluaXQoKTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVVcmwoZXYub2xkVVJMLnNwbGl0KFwiI1wiKVsxXSB8fCBcIlwiLCBldi5uZXdVUkwuc3BsaXQoXCIjXCIpWzFdKTtcbiAgICB9KTtcbiAgICB0aGlzLmhhbmRsZVVybCh1bmRlZmluZWQsIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpKTtcbiAgfSxcbiAgZ2V0UGFyYW06IGZ1bmN0aW9uIGdldFBhcmFtKG5ld1JvdXRlLCBjdXJyZW50Um91dGUpIHtcbiAgICB2YXIgcGFyYW0gPSBuZXdSb3V0ZS5tYXRjaChjdXJyZW50Um91dGUubWF0Y2gpIHx8IFtdO1xuICAgIHJldHVybiBwYXJhbVsxXTtcbiAgfSxcbiAgaGFuZGxlVXJsOiBmdW5jdGlvbiBoYW5kbGVVcmwob2xkUm91dGUsIG5ld1JvdXRlKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgY3VycmVudFJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBuZXdSb3V0ZSA9PT0gaXRlbS5tYXRjaDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlbS5tYXRjaChuZXdSb3V0ZSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuIG5ld1JvdXRlLm1hdGNoKGl0ZW0ubWF0Y2gpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvbGRSb3V0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgcHJldmlvdXNSb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIG9sZFJvdXRlID09PSBpdGVtLm1hdGNoO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5tYXRjaChvbGRSb3V0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5tYXRjaCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgIHJldHVybiBvbGRSb3V0ZS5tYXRjaChpdGVtLm1hdGNoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBjdXJyZW50UGFyYW0gPSB0aGlzLmdldFBhcmFtKG5ld1JvdXRlLCBjdXJyZW50Um91dGUpO1xuICAgIGNvbnNvbGUubG9nKFwiLS0tPiByb3V0ZXIgb2xkVVJMOiBcIiArIG9sZFJvdXRlKTtcbiAgICBjb25zb2xlLmxvZyhcIi0tLT4gcm91dGVyIGZpbmROZXdBY3RpdmVSb3V0ZTogXCIgKyBuZXdSb3V0ZSArIFwiIC0tIFwiICsgKGN1cnJlbnRSb3V0ZSB8fCB7fSkubmFtZSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJldmlvdXNSb3V0ZSAmJiBwcmV2aW91c1JvdXRlLm9uTGVhdmUgJiYgcHJldmlvdXNSb3V0ZS5vbkxlYXZlKG9sZFJvdXRlLnNwbGl0KFwiPVwiKVsxXSk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY3VycmVudFJvdXRlICYmIGN1cnJlbnRSb3V0ZS5vbkJlZm9yZUVudGVyICYmIGN1cnJlbnRSb3V0ZS5vbkJlZm9yZUVudGVyKGN1cnJlbnRQYXJhbSk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY3VycmVudFJvdXRlICYmIGN1cnJlbnRSb3V0ZS5vbkVudGVyICYmIGN1cnJlbnRSb3V0ZS5vbkVudGVyKF90aGlzMi5ldmVudEJ1cywgY3VycmVudFBhcmFtKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWxKdmRYUmxjaTVxY3lKZExDSnVZVzFsY3lJNld5SlNiM1YwWlhJaUxDSnZjSFJwYjI1eklpd2ljbTkxZEdWeklpd2lhVzVwZENJc0luQnliM1J2ZEhsd1pTSXNJbmRwYm1SdmR5SXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlMQ0pvWVc1a2JHVlZjbXdpTENKbGRpSXNJbTlzWkZWU1RDSXNJbk53YkdsMElpd2libVYzVlZKTUlpd2lkVzVrWldacGJtVmtJaXdpYkc5allYUnBiMjRpTENKb1lYTm9JaXdpYzJ4cFkyVWlMQ0puWlhSUVlYSmhiU0lzSW01bGQxSnZkWFJsSWl3aVkzVnljbVZ1ZEZKdmRYUmxJaXdpY0dGeVlXMGlMQ0p0WVhSamFDSXNJbTlzWkZKdmRYUmxJaXdpWm1sdVpDSXNJbWwwWlcwaUxDSlNaV2RGZUhBaUxDSndjbVYyYVc5MWMxSnZkWFJsSWl3aVkzVnljbVZ1ZEZCaGNtRnRJaXdpWTI5dWMyOXNaU0lzSW14dlp5SXNJbTVoYldVaUxDSlFjbTl0YVhObElpd2ljbVZ6YjJ4MlpTSXNJblJvWlc0aUxDSnZia3hsWVhabElpd2liMjVDWldadmNtVkZiblJsY2lJc0ltOXVSVzUwWlhJaUxDSmxkbVZ1ZEVKMWN5SmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVN4SlFVRkpRU3hUUVVGVExGTkJRVlJCTEUxQlFWTXNRMEZCVTBNc1QwRkJWQ3hGUVVGclFqdEJRVU0zUWl4UFFVRkxReXhOUVVGTUxFZEJRV05FTEZGQlFWRkRMRTFCUVhSQ08wRkJRMEVzVDBGQlMwTXNTVUZCVER0QlFVTkVMRU5CU0VRN08wRkJTMEZJTEU5QlFVOUpMRk5CUVZBc1IwRkJiVUk3UVVGRGFrSkVMRkZCUVUwc1owSkJRVmM3UVVGQlFUczdRVUZEWmtVc1YwRkJUME1zWjBKQlFWQXNRMEZCZDBJc1dVRkJlRUlzUlVGQmMwTTdRVUZCUVN4aFFVTndReXhOUVVGTFF5eFRRVUZNTEVOQlFXVkRMRWRCUVVkRExFMUJRVWdzUTBGQlZVTXNTMEZCVml4RFFVRm5RaXhIUVVGb1FpeEZRVUZ4UWl4RFFVRnlRaXhMUVVFeVFpeEZRVUV4UXl4RlFVRTRRMFlzUjBGQlIwY3NUVUZCU0N4RFFVRlZSQ3hMUVVGV0xFTkJRV2RDTEVkQlFXaENMRVZCUVhGQ0xFTkJRWEpDTEVOQlFUbERMRU5CUkc5RE8wRkJRVUVzUzBGQmRFTTdRVUZIUVN4VFFVRkxTQ3hUUVVGTUxFTkJRV1ZMTEZOQlFXWXNSVUZCTUVKUUxFOUJRVTlSTEZGQlFWQXNRMEZCWjBKRExFbEJRV2hDTEVOQlFYRkNReXhMUVVGeVFpeERRVUV5UWl4RFFVRXpRaXhEUVVFeFFqdEJRVU5FTEVkQlRtZENPMEZCVDJwQ1F5eFpRVUZWTEd0Q1FVRlRReXhSUVVGVUxFVkJRVzFDUXl4WlFVRnVRaXhGUVVGcFF6dEJRVU42UXl4UlFVRkpReXhSUVVGUlJpeFRRVUZUUnl4TFFVRlVMRU5CUVdWR0xHRkJRV0ZGTEV0QlFUVkNMRXRCUVhORExFVkJRV3hFTzBGQlEwRXNWMEZCVDBRc1RVRkJUU3hEUVVGT0xFTkJRVkE3UVVGRFJDeEhRVlpuUWp0QlFWZHFRbG9zWVVGQlZ5eHRRa0ZCVTJNc1VVRkJWQ3hGUVVGdFFrb3NVVUZCYmtJc1JVRkJOa0k3UVVGQlFUczdRVUZEZEVNc1VVRkJTVU1zWlVGQlpTeExRVUZMYUVJc1RVRkJUQ3hEUVVGWmIwSXNTVUZCV2l4RFFVRnBRaXhuUWtGQlVUdEJRVU14UXl4VlFVRkpMRTlCUVU5RExFdEJRVXRJTEV0QlFWb3NTMEZCYzBJc1VVRkJNVUlzUlVGQmIwTTdRVUZEYkVNc1pVRkJUMGdzWVVGQllVMHNTMEZCUzBnc1MwRkJla0k3UVVGRFJDeFBRVVpFTEUxQlJVOHNTVUZCU1N4UFFVRlBSeXhMUVVGTFNDeExRVUZhTEV0QlFYTkNMRlZCUVRGQ0xFVkJRWE5ETzBGQlF6TkRMR1ZCUVU5SExFdEJRVXRJTEV0QlFVd3NRMEZCVjBnc1VVRkJXQ3hEUVVGUU8wRkJRMFFzVDBGR1RTeE5RVVZCTEVsQlFVbE5MRXRCUVV0SUxFdEJRVXdzV1VGQmMwSkpMRTFCUVRGQ0xFVkJRV3RETzBGQlEzWkRMR1ZCUVU5UUxGTkJRVk5ITEV0QlFWUXNRMEZCWlVjc1MwRkJTMGdzUzBGQmNFSXNRMEZCVUR0QlFVTkVPMEZCUTBZc1MwRlNhMElzUTBGQmJrSTdRVUZUUVN4UlFVRkpReXhoUVVGaFZDeFRRVUZxUWl4RlFVRTBRanRCUVVNeFFpeFZRVUZKWVN4blFrRkJaMElzUzBGQlMzWkNMRTFCUVV3c1EwRkJXVzlDTEVsQlFWb3NRMEZCYVVJc1owSkJRVkU3UVVGRE0wTXNXVUZCU1N4UFFVRlBReXhMUVVGTFNDeExRVUZhTEV0QlFYTkNMRkZCUVRGQ0xFVkJRVzlETzBGQlEyeERMR2xDUVVGUFF5eGhRVUZoUlN4TFFVRkxTQ3hMUVVGNlFqdEJRVU5FTEZOQlJrUXNUVUZGVHl4SlFVRkpMRTlCUVU5SExFdEJRVXRJTEV0QlFWb3NTMEZCYzBJc1ZVRkJNVUlzUlVGQmMwTTdRVUZETTBNc2FVSkJRVTlITEV0QlFVdElMRXRCUVV3c1EwRkJWME1zVVVGQldDeERRVUZRTzBGQlEwUXNVMEZHVFN4TlFVVkJMRWxCUVVsRkxFdEJRVXRJTEV0QlFVd3NXVUZCYzBKSkxFMUJRVEZDTEVWQlFXdERPMEZCUTNaRExHbENRVUZQU0N4VFFVRlRSQ3hMUVVGVUxFTkJRV1ZITEV0QlFVdElMRXRCUVhCQ0xFTkJRVkE3UVVGRFJEdEJRVU5HTEU5QlVtMUNMRU5CUVhCQ08wRkJVMFE3UVVGRFJDeFJRVUZKVFN4bFFVRmxMRXRCUVV0V0xGRkJRVXdzUTBGQlkwTXNVVUZCWkN4RlFVRjNRa01zV1VGQmVFSXNRMEZCYmtJN1FVRkRRVk1zV1VGQlVVTXNSMEZCVWl3d1FrRkJiVU5RTEZGQlFXNURPMEZCUTBGTkxGbEJRVkZETEVkQlFWSXNjME5CUTNGRFdDeFJRVVJ5UXl4WlFVTnZSQ3hEUVVGRFF5eG5Ra0ZCWjBJc1JVRkJha0lzUlVGREwwTlhMRWxCUmt3N1FVRkpRVU1zV1VGQlVVTXNUMEZCVWl4SFFVTkhReXhKUVVSSUxFTkJSVWs3UVVGQlFTeGhRVU5GVUN4cFFrRkRRVUVzWTBGQlkxRXNUMEZFWkN4SlFVVkJVaXhqUVVGalVTeFBRVUZrTEVOQlFYTkNXaXhUUVVGVFdDeExRVUZVTEVOQlFXVXNSMEZCWml4RlFVRnZRaXhEUVVGd1FpeERRVUYwUWl4RFFVaEdPMEZCUVVFc1MwRkdTaXhGUVU5SGMwSXNTVUZRU0N4RFFWRkpPMEZCUVVFc1lVRkRSV1FzWjBKQlEwRkJMR0ZCUVdGblFpeGhRVVJpTEVsQlJVRm9RaXhoUVVGaFowSXNZVUZCWWl4RFFVRXlRbElzV1VGQk0wSXNRMEZJUmp0QlFVRkJMRXRCVWtvc1JVRmhSMDBzU1VGaVNDeERRV05KTzBGQlFVRXNZVUZEUldRc1owSkJRMEZCTEdGQlFXRnBRaXhQUVVSaUxFbEJSVUZxUWl4aFFVRmhhVUlzVDBGQllpeERRVUZ4UWl4UFFVRkxReXhSUVVFeFFpeEZRVUZ2UTFZc1dVRkJjRU1zUTBGSVJqdEJRVUZCTEV0QlpFbzdRVUZ0UWtRN1FVRjZSR2RDTEVOQlFXNUNPenRyUWtFMFJHVXhRaXhOSWl3aVptbHNaU0k2SWxKdmRYUmxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkluWmhjaUJTYjNWMFpYSWdQU0JtZFc1amRHbHZiaWh2Y0hScGIyNXpLU0I3WEhKY2JpQWdkR2hwY3k1eWIzVjBaWE1nUFNCdmNIUnBiMjV6TG5KdmRYUmxjenRjY2x4dUlDQjBhR2x6TG1sdWFYUW9LVHRjY2x4dWZUdGNjbHh1WEhKY2JsSnZkWFJsY2k1d2NtOTBiM1I1Y0dVZ1BTQjdYSEpjYmlBZ2FXNXBkRG9nWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNCM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWhjSW1oaGMyaGphR0Z1WjJWY0lpd2daWFlnUFQ1Y2NseHVJQ0FnSUNBZ2RHaHBjeTVvWVc1a2JHVlZjbXdvWlhZdWIyeGtWVkpNTG5Od2JHbDBLRndpSTF3aUtWc3hYU0I4ZkNCY0lsd2lMQ0JsZGk1dVpYZFZVa3d1YzNCc2FYUW9YQ0lqWENJcFd6RmRLVnh5WEc0Z0lDQWdLVHRjY2x4dUlDQWdJSFJvYVhNdWFHRnVaR3hsVlhKc0tIVnVaR1ZtYVc1bFpDd2dkMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmd1YzJ4cFkyVW9NU2twTzF4eVhHNGdJSDBzWEhKY2JpQWdaMlYwVUdGeVlXMDZJR1oxYm1OMGFXOXVLRzVsZDFKdmRYUmxMQ0JqZFhKeVpXNTBVbTkxZEdVcElIdGNjbHh1SUNBZ0lIWmhjaUJ3WVhKaGJTQTlJRzVsZDFKdmRYUmxMbTFoZEdOb0tHTjFjbkpsYm5SU2IzVjBaUzV0WVhSamFDa2dmSHdnVzEwN1hISmNiaUFnSUNCeVpYUjFjbTRnY0dGeVlXMWJNVjA3WEhKY2JpQWdmU3hjY2x4dUlDQm9ZVzVrYkdWVmNtdzZJR1oxYm1OMGFXOXVLRzlzWkZKdmRYUmxMQ0J1WlhkU2IzVjBaU2tnZTF4eVhHNGdJQ0FnZG1GeUlHTjFjbkpsYm5SU2IzVjBaU0E5SUhSb2FYTXVjbTkxZEdWekxtWnBibVFvYVhSbGJTQTlQaUI3WEhKY2JpQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2FYUmxiUzV0WVhSamFDQTlQVDBnWENKemRISnBibWRjSWlrZ2UxeHlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGRTYjNWMFpTQTlQVDBnYVhSbGJTNXRZWFJqYUR0Y2NseHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ2FYUmxiUzV0WVhSamFDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2wwWlcwdWJXRjBZMmdvYm1WM1VtOTFkR1VwTzF4eVhHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHbDBaVzB1YldGMFkyZ2dhVzV6ZEdGdVkyVnZaaUJTWldkRmVIQXBJSHRjY2x4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WM1VtOTFkR1V1YldGMFkyZ29hWFJsYlM1dFlYUmphQ2s3WEhKY2JpQWdJQ0FnSUgxY2NseHVJQ0FnSUgwcE8xeHlYRzRnSUNBZ2FXWWdLRzlzWkZKdmRYUmxJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNjbHh1SUNBZ0lDQWdkbUZ5SUhCeVpYWnBiM1Z6VW05MWRHVWdQU0IwYUdsekxuSnZkWFJsY3k1bWFXNWtLR2wwWlcwZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2FYUmxiUzV0WVhSamFDQTlQVDBnWENKemRISnBibWRjSWlrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRzlzWkZKdmRYUmxJRDA5UFNCcGRHVnRMbTFoZEdOb08xeHlYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvZEhsd1pXOW1JR2wwWlcwdWJXRjBZMmdnUFQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHbDBaVzB1YldGMFkyZ29iMnhrVW05MWRHVXBPMXh5WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2FYUmxiUzV0WVhSamFDQnBibk4wWVc1alpXOW1JRkpsWjBWNGNDa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUc5c1pGSnZkWFJsTG0xaGRHTm9LR2wwWlcwdWJXRjBZMmdwTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdmU2s3WEhKY2JpQWdJQ0I5WEhKY2JpQWdJQ0IyWVhJZ1kzVnljbVZ1ZEZCaGNtRnRJRDBnZEdocGN5NW5aWFJRWVhKaGJTaHVaWGRTYjNWMFpTd2dZM1Z5Y21WdWRGSnZkWFJsS1R0Y2NseHVJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQXRMUzArSUhKdmRYUmxjaUJ2YkdSVlVrdzZJQ1I3YjJ4a1VtOTFkR1Y5WUNrN1hISmNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGNjbHh1SUNBZ0lDQWdZQzB0TFQ0Z2NtOTFkR1Z5SUdacGJtUk9aWGRCWTNScGRtVlNiM1YwWlRvZ0pIdHVaWGRTYjNWMFpYMGdMUzBnSkhzb1kzVnljbVZ1ZEZKdmRYUmxJSHg4SUh0OUtWeHlYRzRnSUNBZ0lDQWdJQzV1WVcxbGZXQmNjbHh1SUNBZ0lDazdYSEpjYmlBZ0lDQlFjbTl0YVhObExuSmxjMjlzZG1Vb0tWeHlYRzRnSUNBZ0lDQXVkR2hsYmloY2NseHVJQ0FnSUNBZ0lDQW9LU0E5UGx4eVhHNGdJQ0FnSUNBZ0lDQWdjSEpsZG1sdmRYTlNiM1YwWlNBbUpseHlYRzRnSUNBZ0lDQWdJQ0FnY0hKbGRtbHZkWE5TYjNWMFpTNXZia3hsWVhabElDWW1YSEpjYmlBZ0lDQWdJQ0FnSUNCd2NtVjJhVzkxYzFKdmRYUmxMbTl1VEdWaGRtVW9iMnhrVW05MWRHVXVjM0JzYVhRb1hDSTlYQ0lwV3pGZEtWeHlYRzRnSUNBZ0lDQXBYSEpjYmlBZ0lDQWdJQzUwYUdWdUtGeHlYRzRnSUNBZ0lDQWdJQ2dwSUQwK1hISmNiaUFnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBVbTkxZEdVZ0ppWmNjbHh1SUNBZ0lDQWdJQ0FnSUdOMWNuSmxiblJTYjNWMFpTNXZia0psWm05eVpVVnVkR1Z5SUNZbVhISmNiaUFnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBVbTkxZEdVdWIyNUNaV1p2Y21WRmJuUmxjaWhqZFhKeVpXNTBVR0Z5WVcwcFhISmNiaUFnSUNBZ0lDbGNjbHh1SUNBZ0lDQWdMblJvWlc0b1hISmNiaUFnSUNBZ0lDQWdLQ2tnUFQ1Y2NseHVJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlNiM1YwWlNBbUpseHlYRzRnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRkp2ZFhSbExtOXVSVzUwWlhJZ0ppWmNjbHh1SUNBZ0lDQWdJQ0FnSUdOMWNuSmxiblJTYjNWMFpTNXZia1Z1ZEdWeUtIUm9hWE11WlhabGJuUkNkWE1zSUdOMWNuSmxiblJRWVhKaGJTbGNjbHh1SUNBZ0lDQWdLVHRjY2x4dUlDQjlYSEpjYm4wN1hISmNibHh5WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JTYjNWMFpYSTdYSEpjYmlKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbHNcXFxcUm91dGVyLmpzXCIsXCIvdXRpbHNcIikiXX0=
