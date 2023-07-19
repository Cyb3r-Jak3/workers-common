"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleCORS = exports.DefaultCORSHeaders = exports.HandleCachedResponse = exports.JSONAPIErrorResponse = exports.JSONAPIResponse = exports.JSONResponse = exports.JSONContentHeader = void 0;
exports.JSONContentHeader = 'application/json; charset=UTF-8';
/**
 * Creates a JSON response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options
 * @returns JSON Response
 */
function JSONResponse(ResponseData, options) {
    var status;
    if (options === undefined || options.status === undefined) {
        status = 200;
    }
    else {
        status = options.status;
    }
    var send_headers = new Headers({
        'content-type': exports.JSONContentHeader,
    });
    if (options === null || options === void 0 ? void 0 : options.extra_headers) {
        for (var _i = 0, _a = Object.keys(options.extra_headers); _i < _a.length; _i++) {
            var key = _a[_i];
            send_headers.append(key, options.extra_headers[key]);
        }
    }
    return new Response(JSON.stringify(ResponseData !== null && ResponseData !== void 0 ? ResponseData : {}), {
        status: status,
        headers: send_headers,
    });
}
exports.JSONResponse = JSONResponse;
/**
 * Creates a JSON API response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options
 * @returns JSON Response
 */
function JSONAPIResponse(ResponseData, options) {
    var _a, _b;
    return JSONResponse({
        success: (_a = options === null || options === void 0 ? void 0 : options.success) !== null && _a !== void 0 ? _a : true,
        error: (_b = options === null || options === void 0 ? void 0 : options.error) !== null && _b !== void 0 ? _b : null,
        results: ResponseData !== null && ResponseData !== void 0 ? ResponseData : {},
    }, options);
}
exports.JSONAPIResponse = JSONAPIResponse;
/**
 * Simple wrapper for making JSON responses with error status codes
 * @param errMessage String or object to turn into JSON
 * @param status HTTP status code to return. Defaults to 500
 * @returns
 */
function JSONAPIErrorResponse(errMessage, status, extraError) {
    if (status === void 0) { status = 500; }
    return JSONAPIResponse({ Error: extraError }, { status: status, success: false, error: errMessage });
}
exports.JSONAPIErrorResponse = JSONAPIErrorResponse;
/**
 *
 * @param resp Response that hit cache
 * @returns Response with X-Worker-Cache Header
 */
function HandleCachedResponse(resp) {
    var newHeaders = new Headers(resp.headers);
    newHeaders.set('X-Worker-Cache', 'HIT');
    return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: newHeaders,
    });
}
exports.HandleCachedResponse = HandleCachedResponse;
exports.DefaultCORSHeaders = {
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
function HandleCORS(request, cors_headers) {
    var _a, _b, _c, _d;
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    var headers = request.headers;
    if (headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null) {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': (_a = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowOrigin) !== null && _a !== void 0 ? _a : exports.DefaultCORSHeaders['Access-Control-Allow-Origin'],
                'Access-Control-Allow-Methods': ((_b = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowMethods) !== null && _b !== void 0 ? _b : exports.DefaultCORSHeaders['Access-Control-Allow-Methods']).join(', '),
                'Access-Control-Max-Age': ((_c = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.MaxAge) !== null && _c !== void 0 ? _c : exports.DefaultCORSHeaders['Access-Control-Max-Age']).toString(),
            },
        });
    }
    // Handle standard OPTIONS request.
    return new Response(null, {
        headers: {
            Allow: ((_d = cors_headers === null || cors_headers === void 0 ? void 0 : cors_headers.AllowMethods) !== null && _d !== void 0 ? _d : exports.DefaultCORSHeaders['Access-Control-Allow-Methods']).join(', '),
        },
    });
}
exports.HandleCORS = HandleCORS;
//# sourceMappingURL=responses.js.map