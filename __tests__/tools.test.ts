import {
    ParseBoolean,
    ParseStringArray,
    ClampValue,
    EncodeHTML,
    IsValidHexColor,
} from '../src/tools'

describe('ParseBoolean', () => {
    test('Boolean', () => {
        expect(ParseBoolean(true)).toEqual(true)
    })
    test('String true', () => {
        expect(ParseBoolean('true')).toEqual(true)
    })
    test('String False', () => {
        expect(ParseBoolean('false')).toEqual(false)
    })
    test('String neither', () => {
        expect(ParseBoolean('')).toEqual(undefined)
    })
})

describe('ParseArray', () => {
    test('Empty', () => {
        expect(ParseStringArray('')).toEqual([])
    })
    test('Default delimiter', () => {
        const result = ParseStringArray('item1,item2')
        expect(result.length).toEqual(2)
        expect(result[0]).toEqual('item1')
        expect(result[1]).toEqual('item2')
    })
    test('Custom delimiter', () => {
        const result = ParseStringArray('item1|item2', '|')
        expect(result.length).toEqual(2)
        expect(result[0]).toEqual('item1')
        expect(result[1]).toEqual('item2')
    })
})

describe('ClampValue', () => {
    test('Normal Number', () => {
        expect(ClampValue(10, 5, 11)).toEqual(10)
    })
    test('Over Max Number', () => {
        expect(ClampValue(13, 5, 11)).toEqual(11)
    })
    test('Not a number Max Number', () => {
        expect(ClampValue('', 5, 11)).toEqual(5)
    })
    test('String Number', () => {
        expect(ClampValue('11', 5, 12)).toEqual(11)
    })
})

describe('EncodeHTML', () => {
    test('No change', () => {
        expect(EncodeHTML('no change')).toEqual('no change')
    })
    test('Change', () => {
        expect(EncodeHTML('\u9999')).toEqual('&#39321;')
    })
})

describe('IsValidHexColor', () => {
    test('Valid Color', () => {
        expect(IsValidHexColor('ff0000')).toEqual(true)
    })
    test('Invalid Color', () => {
        expect(IsValidHexColor('')).toEqual(false)
    })
})
