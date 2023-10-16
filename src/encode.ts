export type AlgorithmIdentifier =
    | 'SHA-256'
    | 'SHA-384'
    | 'SHA-512'
    | 'SHA-1'
    | 'MD5'

/**
 * Turns the array buffer from crypto into a string. Stolen from stackoverflow
 * @param buffer Crypto Buffer
 * @returns Hex string
 */
export function Hex(buffer: ArrayBuffer): string {
    const hexCodes = []
    const view = new DataView(buffer)
    for (let i = 0; i < view.byteLength; i += 4) {
        //Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        // const value =
        // toString(16) will give the hex representation of the number without padding
        const stringValue = view.getUint32(i).toString(16)
        // We use concatenation and slice for padding
        const padding = '00000000'
        const paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue)
    }
    // Join all the hex strings into one

    return hexCodes.join('')
}

/**
 * Generates a hash from a string
 * @param toHash String to hash
 * @param algorithm Algorithm to use when hashing
 * @returns Hash
 */
export async function GenerateHash(
    toHash: string,
    algorithm: AlgorithmIdentifier
): Promise<string> {
    return Hex(
        await crypto.subtle.digest(
            algorithm,
            new TextEncoder().encode(toHash.trim())
        )
    )
}

/**
 * Generates a buffer from a hex string
 * @param hexString String to hash
 * @returns ArrayBuffer
 */
export function FromHexStringToBytes(hexString: string): ArrayBufferLike {
    const bytes = new Uint8Array(hexString.length / 2)
    for (let idx = 0; idx < hexString.length; idx += 2) {
        bytes[idx / 2] = parseInt(hexString.substring(idx, idx + 2), 16)
    }
    return bytes.buffer
}

// Copied from https://github.com/honojs/hono/blob/b6c0e45d5f141f00578191f912d755230936eda2/src/utils/encode.ts

/**
 * Decodes a base64url string into a Uint8Array
 * @param str URL string to decode
 * @returns Uint8Array of the decoded string
 */
export const DecodeBase64Url = (str: string): Uint8Array => {
    return DecodeBase64(
        str.replace(/_|-/g, (m) => ({ _: '/', '-': '+' })[m] ?? m)
    )
}

/**
 * Encodes a Uint8Array into a base64url string
 * @param buf Encodes a Uint8Array into a base64url string
 * @returns base64url string
 */
export const EncodeBase64Url = (buf: ArrayBufferLike): string =>
    EncodeBase64(buf).replace(/\/|\+/g, (m) => ({ '/': '_', '+': '-' })[m] ?? m)

/**
 * Encodes a Uint8Array into a base64 string with support for utf-8 characters
 * @param buf Buffer to encode
 * @returns base64 string
 */
export const EncodeBase64 = (buf: ArrayBufferLike): string => {
    let binary = ''
    const bytes = new Uint8Array(buf)
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

/**
 * Decodes a base64 string into a Uint8Array with support for utf-8 characters
 * @param str String to decode
 * @returns Uint8Array of the decoded string
 */
export const DecodeBase64 = (str: string): Uint8Array => {
    const binary = atob(str)
    const bytes = new Uint8Array(new ArrayBuffer(binary.length))
    const half = binary.length / 2
    for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
        bytes[i] = binary.charCodeAt(i)
        bytes[j] = binary.charCodeAt(j)
    }
    return bytes
}
