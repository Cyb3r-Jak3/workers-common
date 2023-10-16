"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeBase64Url = exports.DecodeBase64Url = exports.DecodeBase64 = exports.EncodeBase64 = exports.FromHexStringToBytes = exports.GenerateHash = exports.Hex = void 0;
/**
 * Turns the array buffer from crypto into a string. Stolen from stackoverflow
 * @param buffer Crypto Buffer
 * @returns Hex string
 */
function Hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        //Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        // const value =
        // toString(16) will give the hex representation of the number without padding
        var stringValue = view.getUint32(i).toString(16);
        // We use concatenation and slice for padding
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join('');
}
exports.Hex = Hex;
/**
 * Generates a hash from a string
 * @param toHash String to hash
 * @param algorithm Algorithm to use when hashing
 * @returns Hash
 */
function GenerateHash(toHash, algorithm) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = Hex;
                    return [4 /*yield*/, crypto.subtle.digest(algorithm, new TextEncoder().encode(toHash.trim()))];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    });
}
exports.GenerateHash = GenerateHash;
/**
 * Generates a buffer from a hex string
 * @param hexString String to hash
 * @returns ArrayBuffer
 */
function FromHexStringToBytes(hexString) {
    var bytes = new Uint8Array(hexString.length / 2);
    for (var idx = 0; idx < hexString.length; idx += 2) {
        bytes[idx / 2] = parseInt(hexString.substring(idx, idx + 2), 16);
    }
    return bytes.buffer;
}
exports.FromHexStringToBytes = FromHexStringToBytes;
// Copied from https://github.com/honojs/hono/blob/b6c0e45d5f141f00578191f912d755230936eda2/src/utils/encode.ts
/**
 * Encodes a Uint8Array into a base64 string with support for utf-8 characters
 * @param buf Buffer to encode
 * @returns base64 string
 */
var EncodeBase64 = function (buf) {
    var binary = '';
    var bytes = new Uint8Array(buf);
    // #skipcq: JS-0361
    for (var i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
exports.EncodeBase64 = EncodeBase64;
/**
 * Decodes a base64 string into a Uint8Array with support for utf-8 characters
 * @param str String to decode
 * @returns Uint8Array of the decoded string
 */
var DecodeBase64 = function (str) {
    var binary = atob(str);
    var bytes = new Uint8Array(new ArrayBuffer(binary.length));
    var half = binary.length / 2;
    for (var i = 0, j = binary.length - 1; i <= half; i++, j--) {
        bytes[i] = binary.charCodeAt(i);
        bytes[j] = binary.charCodeAt(j);
    }
    return bytes;
};
exports.DecodeBase64 = DecodeBase64;
/**
 * Decodes a base64url string into a Uint8Array
 * @param str URL string to decode
 * @returns Uint8Array of the decoded string
 */
var DecodeBase64Url = function (str) {
    return (0, exports.DecodeBase64)(str.replace(/_|-/g, function (m) { var _a; return (_a = ({ _: '/', '-': '+' })[m]) !== null && _a !== void 0 ? _a : m; }));
};
exports.DecodeBase64Url = DecodeBase64Url;
/**
 * Encodes a Uint8Array into a base64url string
 * @param buf Encodes a Uint8Array into a base64url string
 * @returns base64url string
 */
var EncodeBase64Url = function (buf) {
    return (0, exports.EncodeBase64)(buf).replace(/\/|\+/g, function (m) { var _a; return (_a = ({ '/': '_', '+': '-' })[m]) !== null && _a !== void 0 ? _a : m; });
};
exports.EncodeBase64Url = EncodeBase64Url;
//# sourceMappingURL=encode.js.map