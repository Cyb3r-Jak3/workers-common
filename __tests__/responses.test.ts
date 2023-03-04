import {
    JSONResponse,
    JSONAPIResponse,
    JSONAPIErrorResponse,
    HandleCachedResponse,
    HandleCORS,
} from '../src/responses'

describe('JSONResponse', () => {
    test('Basic', async () => {
        const resp = JSONResponse({ hello: 'world' })
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('content-type')).toEqual(
            'application/json; charset=UTF-8'
        )
        const jsonData = await resp.json()
        expect(jsonData.hello).toEqual('world')
    })
    test('Custom Status', async () => {
        const resp = JSONResponse(
            { hello: 'world' },
            { status: 400, success: false }
        )
        expect(resp.status).toEqual(400)
        const jsonData = await resp.json()
        expect(jsonData.hello).toEqual('world')
    })
    test('Extra Headers', async () => {
        const resp = JSONResponse(
            { hello: 'world' },
            { extra_headers: { extra: 'header' } }
        )
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('extra')).toEqual('header')
        const jsonData = await resp.json()
        expect(jsonData.hello).toEqual('world')
    })
})

describe('JSONAPIResponse', () => {
    test('Basic', async () => {
        const resp = JSONAPIResponse({ hello: 'world' })
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('content-type')).toEqual(
            'application/json; charset=UTF-8'
        )
        const jsonData = await resp.json()
        expect(jsonData.success).toEqual(true)
        expect(jsonData.results?.hello).toEqual('world')
    })
    test('Custom Status', async () => {
        const resp = JSONAPIResponse(
            { hello: 'world' },
            { status: 400, success: false }
        )
        expect(resp.status).toEqual(400)
        const jsonData = await resp.json()
        expect(jsonData.success).toEqual(false)
        expect(jsonData.results?.hello).toEqual('world')
    })
    test('Extra Headers', async () => {
        const resp = JSONAPIResponse(
            { hello: 'world' },
            { extra_headers: { extra: 'header' } }
        )
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('extra')).toEqual('header')
        const jsonData = await resp.json()
        expect(jsonData.results?.hello).toEqual('world')
    })
})

describe('JSONErrorResponse', () => {
    test('Basic', async () => {
        const resp = JSONAPIErrorResponse('error')
        expect(resp.status).toEqual(500)
        expect(resp.headers.get('content-type')).toEqual(
            'application/json; charset=UTF-8'
        )
        const jsonData = await resp.json()
        expect(jsonData.success).toEqual(false)
        expect(jsonData.error).toEqual('error')
    })
    test('Custom Status', async () => {
        const resp = JSONAPIErrorResponse('error', 400)
        expect(resp.status).toEqual(400)
        const jsonData = await resp.json()
        expect(jsonData.success).toEqual(false)
        expect(jsonData.results)
        expect(jsonData.error).toEqual('error')
    })
    test('Extra Error Message', async () => {
        const resp = JSONAPIErrorResponse('error', 400, "can't do that")
        expect(resp.status).toEqual(400)
        const jsonData = await resp.json()
        expect(jsonData.success).toEqual(false)
        expect(jsonData.results)
        expect(jsonData.error).toEqual('error')
        expect(jsonData.results.Error).toEqual("can't do that")
    })
})

describe('HandleCacheResponse', () => {
    test('Basic', () => {
        const cached = HandleCachedResponse(JSONResponse({ hello: 'world' }))
        expect(cached.status).toEqual(200)
        expect(cached.headers.get('X-Worker-Cache')).toEqual('HIT')
    })
})

describe('HandleCORS', () => {
    test('No Headers with default response headers', () => {
        const req = new Request('https://example.com')
        const resp = HandleCORS(req)
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('Allow')).toEqual('GET, HEAD, POST, OPTIONS')
    })
    test('No Headers with custom response headers', () => {
        const req = new Request('https://example.com')
        const resp = HandleCORS(req, { AllowMethods: ['GET', 'OPTIONS'] })
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('Allow')).toEqual('GET, OPTIONS')
    })
    test('With headers with default responses headers', () => {
        const req = new Request('https://example.com', {
            headers: {
                Origin: '*',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'X-AUTH',
            },
        })
        const resp = HandleCORS(req)
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('Access-Control-Allow-Origin')).toEqual('*')
        expect(resp.headers.get('Access-Control-Allow-Methods')).toEqual(
            'GET, HEAD, POST, OPTIONS'
        )
        expect(resp.headers.get('Access-Control-Max-Age')).toEqual('86400')
    })
    test('With headers with custom responses headers', () => {
        const req = new Request('https://example.com', {
            headers: {
                Origin: '*',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'X-AUTH',
            },
        })
        const resp = HandleCORS(req, {
            AllowOrigin: 'example.com',
            AllowMethods: ['GET, OPTIONS'],
            MaxAge: 10,
        })
        expect(resp.status).toEqual(200)
        expect(resp.headers.get('Access-Control-Allow-Origin')).toEqual(
            'example.com'
        )
        expect(resp.headers.get('Access-Control-Allow-Methods')).toEqual(
            'GET, OPTIONS'
        )
        expect(resp.headers.get('Access-Control-Max-Age')).toEqual('10')
    })
})
