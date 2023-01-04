import { GenerateHash } from '../src/encode'

describe('HandleCacheResponse', () => {
    test('Good Hash', async () => {
        const hash = await GenerateHash('hello world', 'SHA-256')
        expect(hash).toEqual(
            'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
        )
    })
    test('Invalid Hash', async () => {
        await expect(GenerateHash('hello world', '')).rejects.toThrow(
            'Unrecognized name.'
        )
    })
})
