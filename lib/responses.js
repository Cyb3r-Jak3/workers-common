/**
 * Creates a JSON response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options for
 * @returns JSON Response
 */
export function JSONResponse(ResponseData, options) {
    var status;
    if (options === undefined || options.status === undefined) {
        status = 200;
    }
    else {
        status = options.status;
    }
    var send_headers = new Headers({
        'content-type': 'application/json; charset=UTF-8',
    });
    if (options === null || options === void 0 ? void 0 : options.extra_headers) {
        for (var _i = 0, _a = Object.keys(options.extra_headers); _i < _a.length; _i++) {
            var key = _a[_i];
            send_headers.append(key, options.extra_headers[key]);
        }
    }
    return new Response(JSON.stringify(ResponseData), {
        status: status,
        headers: send_headers,
    });
}
/**
 * Simple wrapper for making JSON responses with error status codes
 * @param errMessage String or object to turn into JSON
 * @param status HTTP status code to return. Defaults to 500
 * @returns
 */
export function JSONErrorResponse(errMessage, status) {
    if (status === void 0) { status = 500; }
    return JSONResponse({ Error: errMessage }, { status: status });
}
/**
 *
 * @param resp Response that hit cache
 * @returns Response with X-Worker-Cache Header
 */
export function HandleCachedResponse(resp) {
    var newHeaders = new Headers(resp.headers);
    newHeaders.set('X-Worker-Cache', 'HIT');
    return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: newHeaders,
    });
}
export var DefaultCORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['GET', 'HEAD', 'POST', 'OPTIONS'],
    'Access-Control-Max-Age': 86400,
};
/**
 * Handles any CORs requests
 * @param request Incoming request to handle CORs for
 * @param cors_headers CORS response header parameters. If unset, will use DefaultCORSHeaders
 * @returns CORs response
 */
export function HandleCORS(request, cors_headers) {
    var _a, _b, _c, _d;
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    var headers = request.headers;
    if (headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null) {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': (_a = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowOrigin) !== null && _a !== void 0 ? _a : DefaultCORSHeaders['Access-Control-Allow-Origin'],
                'Access-Control-Allow-Methods': ((_b = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowMethods) !== null && _b !== void 0 ? _b : DefaultCORSHeaders['Access-Control-Allow-Methods']).join(', '),
                'Access-Control-Max-Age': ((_c = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.MaxAge) !== null && _c !== void 0 ? _c : DefaultCORSHeaders['Access-Control-Max-Age']).toString(),
            },
        });
    }
    else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
            headers: {
                Allow: ((_d = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowMethods) !== null && _d !== void 0 ? _d : DefaultCORSHeaders['Access-Control-Allow-Methods']).join(', '),
            },
        });
    }
}
//# sourceMappingURL=responses.js.map