import { GenerateHash, Hex, FromHexStringToBytes } from '../../src/encode'

describe('Generate Hash', () => {
    test('Good Hash', async () => {
        const hash = await GenerateHash('hello world', 'SHA-256')
        expect(hash).toEqual(
            'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
        )
    })
    test('MD5 Hash', async () => {
        expect(await GenerateHash('hello world', 'MD5')).toEqual('5eb63bbbe01eeed093cb22bb8f5acdc3')
    })
})

describe('Hex ', () => {
    test('Good Hash', async () => {
        const hexString = await GenerateHash('hello world', 'SHA-256')
        const buffer = FromHexStringToBytes(hexString)
        const hash = Hex(buffer)
        expect(hash).toEqual(
            'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
        )
    })
})
