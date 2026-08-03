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
 * @returns Hex string of the hash
 * @throws Error if the algorithm is not supported
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
export declare const EncodeBase64: (buf: ArrayBufferLike | Uint8Array) => string;
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
export declare const EncodeBase64Url: (buf: ArrayBufferLike | Uint8Array) => string;
/**
 * Gets the current time in seconds since the epoch
 * @param date Optional date to use instead of the current time
 * @returns Current time in seconds since the epoch
 * @example
 * NowSeconds() // 1616161616
 * NowSeconds(new Date('2021-01-01T00:00:00Z')) // 1609459200
 * @example
 */
export declare function NowSeconds(date?: Date): number;
/**
 * Gets the current time in minutes since the epoch
 * @param date Optional date to use instead of the current time
 * @returns Current time in minutes since the epoch
 * @example
 * NowMinutes() // 1616161616
 * NowMinutes(new Date('2021-01-01T00:00:00Z')) // 1609459200
 */
export declare function NowMinutes(date?: Date): number;
//# sourceMappingURL=encode.d.ts.map