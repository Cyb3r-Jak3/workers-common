import { JSONResponse, JSONErrorResponse, HandleCachedResponse, HandleCORS } from '../src/responses'

describe('JSONResponse', () => {
    test('Basic', () => {
        const resp = JSONResponse({ hello: 'world' })
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("content-type")).toEqual('application/json; charset=UTF-8')
    })
    test('Custom Status', () => {
        const resp = JSONResponse({hello: "world"}, {status: 400})
        expect(resp.status).toEqual(400)
    })
    test('Extra Header', () => {
        const resp = JSONResponse({hello: "world"}, {extra_headers: {extra: "header"}})
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("extra")).toEqual("header")
    })
})

describe('JSONErrorResponse', () => {
    test('Basic', () => {
        const resp = JSONErrorResponse("error")
        expect(resp.status).toEqual(500)
        expect(resp.headers.get("content-type")).toEqual('application/json; charset=UTF-8')
    })
    test('Custom Status', () => {
        const resp = JSONErrorResponse("error", 400)
        expect(resp.status).toEqual(400)
    })
})

describe('HandleCacheResponse', () => {
    test('Basic', () => {
        const resp = JSONResponse({ hello: 'world' })
        const cached = HandleCachedResponse(resp)
        expect(cached.status).toEqual(200)
        expect(cached.headers.get("X-Worker-Cache")).toEqual('HIT')
    })
})


describe('HandleCORS', () => {
    test('No Headers with default response headers', () => {
        const req = new Request("https://example.com")
        const resp = HandleCORS(req)
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("Allow")).toEqual('GET, HEAD, POST, OPTIONS')
    })
    test('No Headers with custom response headers', () => {
        const req = new Request("https://example.com")
        const resp = HandleCORS(req, {AllowMethods: ["GET", "OPTIONS"]})
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("Allow")).toEqual('GET, OPTIONS')
    })
    test('With headers with default responses headers', () => {
        const req = new Request("https://example.com", {headers: {"Origin": "*", "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "X-AUTH" }})
        const resp = HandleCORS(req,)
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("Access-Control-Allow-Origin")).toEqual('*')
        expect(resp.headers.get("Access-Control-Allow-Methods")).toEqual('GET, HEAD, POST, OPTIONS')
        expect(resp.headers.get("Access-Control-Max-Age")).toEqual('86400')
    })
    test('With headers with custom responses headers', () => {
        const req = new Request("https://example.com", {headers: {"Origin": "*", "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "X-AUTH" }})
        const resp = HandleCORS(req, {AllowOrigin: "example.com", AllowMethods: ["GET, OPTIONS"], MaxAge: 10})
        expect(resp.status).toEqual(200)
        expect(resp.headers.get("Access-Control-Allow-Origin")).toEqual('example.com')
        expect(resp.headers.get("Access-Control-Allow-Methods")).toEqual('GET, OPTIONS')
        expect(resp.headers.get("Access-Control-Max-Age")).toEqual('10')
    })
})