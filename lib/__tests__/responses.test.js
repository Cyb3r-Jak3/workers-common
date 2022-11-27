import { JSONResponse, JSONErrorResponse, HandleCachedResponse, HandleCORS } from '../src/responses';
describe('JSONResponse', function () {
    test('Basic', function () {
        var resp = JSONResponse({ hello: 'world' });
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("content-type")).toEqual('application/json; charset=UTF-8');
    });
    test('Custom Status', function () {
        var resp = JSONResponse({ hello: "world" }, { status: 400 });
        expect(resp.status).toEqual(400);
    });
    test('Extra Header', function () {
        var resp = JSONResponse({ hello: "world" }, { extra_headers: { extra: "header" } });
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("extra")).toEqual("header");
    });
});
describe('JSONErrorResponse', function () {
    test('Basic', function () {
        var resp = JSONErrorResponse("error");
        expect(resp.status).toEqual(500);
        expect(resp.headers.get("content-type")).toEqual('application/json; charset=UTF-8');
    });
    test('Custom Status', function () {
        var resp = JSONErrorResponse("error", 400);
        expect(resp.status).toEqual(400);
    });
});
describe('HandleCacheResponse', function () {
    test('Basic', function () {
        var resp = JSONResponse({ hello: 'world' });
        var cached = HandleCachedResponse(resp);
        expect(cached.status).toEqual(200);
        expect(cached.headers.get("X-Worker-Cache")).toEqual('HIT');
    });
});
describe('HandleCORS', function () {
    test('No Headers with default response headers', function () {
        var req = new Request("https://example.com");
        var resp = HandleCORS(req);
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("Allow")).toEqual('GET, HEAD, POST, OPTIONS');
    });
    test('No Headers with custom response headers', function () {
        var req = new Request("https://example.com");
        var resp = HandleCORS(req, { AllowMethods: ["GET", "OPTIONS"] });
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("Allow")).toEqual('GET, OPTIONS');
    });
    test('With headers with default responses headers', function () {
        var req = new Request("https://example.com", { headers: { "Origin": "*", "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "X-AUTH" } });
        var resp = HandleCORS(req);
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("Access-Control-Allow-Origin")).toEqual('*');
        expect(resp.headers.get("Access-Control-Allow-Methods")).toEqual('GET, HEAD, POST, OPTIONS');
        expect(resp.headers.get("Access-Control-Max-Age")).toEqual('86400');
    });
    test('With headers with custom responses headers', function () {
        var req = new Request("https://example.com", { headers: { "Origin": "*", "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "X-AUTH" } });
        var resp = HandleCORS(req, { AllowOrigin: "example.com", AllowMethods: ["GET, OPTIONS"], MaxAge: 10 });
        expect(resp.status).toEqual(200);
        expect(resp.headers.get("Access-Control-Allow-Origin")).toEqual('example.com');
        expect(resp.headers.get("Access-Control-Allow-Methods")).toEqual('GET, OPTIONS');
        expect(resp.headers.get("Access-Control-Max-Age")).toEqual('10');
    });
});
//# sourceMappingURL=responses.test.js.map