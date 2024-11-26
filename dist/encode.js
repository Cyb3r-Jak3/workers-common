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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeBase64Url = exports.DecodeBase64Url = exports.DecodeBase64 = exports.EncodeBase64 = void 0;
exports.Hex = Hex;
exports.GenerateHash = GenerateHash;
exports.FromHexStringToBytes = FromHexStringToBytes;
/**
 * Turns the array buffer from crypto into a string. Stolen from stackoverflow
 * @param buffer Crypto Buffer
 * @returns Hex string
 */
function Hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        //Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        // const value =
        // toString(16) will give the hex representation of the number without padding
        const stringValue = view.getUint32(i).toString(16);
        // We use concatenation and slice for padding
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join('');
}
/**
 * Generates a hash from a string
 * @param toHash String to hash
 * @param algorithm Algorithm to use when hashing
 * @returns Hex string of the hash
 * @throws Error if the algorithm is not supported
 */
function GenerateHash(toHash, algorithm) {
    return __awaiter(this, void 0, void 0, function* () {
        return Hex(yield crypto.subtle.digest(algorithm, new TextEncoder().encode(toHash.trim())));
    });
}
/**
 * Generates a buffer from a hex string
 * @param hexString String to hash
 * @returns ArrayBuffer
 */
function FromHexStringToBytes(hexString) {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let idx = 0; idx < hexString.length; idx += 2) {
        bytes[idx / 2] = parseInt(hexString.substring(idx, idx + 2), 16);
    }
    return bytes.buffer;
}
// Copied from https://github.com/honojs/hono/blob/b6c0e45d5f141f00578191f912d755230936eda2/src/utils/encode.ts
/**
 * Encodes a Uint8Array into a base64 string with support for utf-8 characters
 * @param buf Buffer to encode
 * @returns base64 string
 */
const EncodeBase64 = (buf) => {
    let binary = '';
    const bytes = new Uint8Array(buf);
    // #skipcq: JS-0361
    for (let i = 0; i < bytes.length; i++) {
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
const DecodeBase64 = (str) => {
    const binary = atob(str);
    const bytes = new Uint8Array(new ArrayBuffer(binary.length));
    const half = binary.length / 2;
    for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
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
const DecodeBase64Url = (str) => {
    return (0, exports.DecodeBase64)(str.replace(/_|-/g, (m) => { var _a; return (_a = ({ _: '/', '-': '+' })[m]) !== null && _a !== void 0 ? _a : m; }));
};
exports.DecodeBase64Url = DecodeBase64Url;
/**
 * Encodes a Uint8Array into a base64url string
 * @param buf Encodes a Uint8Array into a base64url string
 * @returns base64url string
 */
const EncodeBase64Url = (buf) => (0, exports.EncodeBase64)(buf).replace(/\/|\+/g, (m) => { var _a; return (_a = ({ '/': '_', '+': '-' })[m]) !== null && _a !== void 0 ? _a : m; });
exports.EncodeBase64Url = EncodeBase64Url;
//# sourceMappingURL=encode.js.map