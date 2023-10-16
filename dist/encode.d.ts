export type AlgorithmIdentifier = 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1' | 'MD5';
/**
 * Turns the array buffer from crypto into a string. Stolen from stackoverflow
 * @param buffer Crypto Buffer
 * @returns Hex string
 */
export declare function Hex(buffer: ArrayBuffer): string;
/**
 * Generates a hash from a string
 * @param toHash String to hash
 * @param algorithm Algorithm to use when hashing
 * @returns Hash
 */
export declare function GenerateHash(toHash: string, algorithm: AlgorithmIdentifier): Promise<string>;
/**
 * Generates a buffer from a hex string
 * @param hexString String to hash
 * @returns ArrayBuffer
 */
export declare function FromHexStringToBytes(hexString: string): ArrayBufferLike;
/**
 * Encodes a Uint8Array into a base64 string with support for utf-8 characters
 * @param buf Buffer to encode
 * @returns base64 string
 */
export declare const EncodeBase64: (buf: ArrayBufferLike) => string;
/**
 * Decodes a base64 string into a Uint8Array with support for utf-8 characters
 * @param str String to decode
 * @returns Uint8Array of the decoded string
 */
export declare const DecodeBase64: (str: string) => Uint8Array;
/**
 * Decodes a base64url string into a Uint8Array
 * @param str URL string to decode
 * @returns Uint8Array of the decoded string
 */
export declare const DecodeBase64Url: (str: string) => Uint8Array;
/**
 * Encodes a Uint8Array into a base64url string
 * @param buf Encodes a Uint8Array into a base64url string
 * @returns base64url string
 */
export declare const EncodeBase64Url: (buf: ArrayBufferLike) => string;
//# sourceMappingURL=encode.d.ts.map