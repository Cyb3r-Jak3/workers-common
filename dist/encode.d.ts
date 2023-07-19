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
//# sourceMappingURL=encode.d.ts.map