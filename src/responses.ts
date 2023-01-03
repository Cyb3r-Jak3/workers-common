interface JSONResponseOptions {
    status?: number
    success?: boolean
    error?: string
    extra_headers?: Record<string, string>
}

export const JSONContentHeader = 'application/json; charset=UTF-8'

/**
 * Creates a JSON response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options for
 * @returns JSON Response
 */
export function JSONResponse(
    ResponseData: string | unknown,
    options?: JSONResponseOptions
): Response {
    let status: number
    if (options === undefined || options.status === undefined) {
        status = 200
    } else {
        status = options.status
    }

    const send_headers = new Headers({
        'content-type': JSONContentHeader,
    })
    if (options?.extra_headers) {
        for (const key of Object.keys(options.extra_headers)) {
            send_headers.append(key, options.extra_headers[key])
        }
    }
    return new Response(
        JSON.stringify({
            success: options?.success ?? true,
            error: options?.error ?? null,
            results: ResponseData,
        }),
        {
            status,
            headers: send_headers,
        }
    )
}

/**
 * Simple wrapper for making JSON responses with error status codes
 * @param errMessage String or object to turn into JSON
 * @param status HTTP status code to return. Defaults to 500
 * @returns
 */
export function JSONErrorResponse(
    errMessage: string,
    status = 500,
    extraError?: string
): Response {
    return JSONResponse(
        { Error: extraError },
        { status, success: false, error: errMessage }
    )
}

/**
 *
 * @param resp Response that hit cache
 * @returns Response with X-Worker-Cache Header
 */

export function HandleCachedResponse(resp: Response): Response {
    const newHeaders = new Headers(resp.headers)
    newHeaders.set('X-Worker-Cache', 'HIT')
    return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: newHeaders,
    })
}

export interface CORS_Headers {
    AllowOrigin?: string
    AllowMethods?: string[]
    MaxAge?: number
}

export const DefaultCORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['GET', 'HEAD', 'POST', 'OPTIONS'],
    'Access-Control-Max-Age': 86400,
}

/**
 * Handles any CORs requests
 * @param request Incoming request to handle CORs for
 * @param cors_headers CORS response header parameters. If unset, will use DefaultCORSHeaders
 * @returns CORs response
 */
export function HandleCORS(
    request: Request,
    cors_headers?: CORS_Headers
): Response {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin':
                    cors_headers?.AllowOrigin ??
                    DefaultCORSHeaders['Access-Control-Allow-Origin'],
                'Access-Control-Allow-Methods': (
                    cors_headers?.AllowMethods ??
                    DefaultCORSHeaders['Access-Control-Allow-Methods']
                ).join(', '),
                'Access-Control-Max-Age': (
                    cors_headers?.MaxAge ??
                    DefaultCORSHeaders['Access-Control-Max-Age']
                ).toString(),
            },
        })
    }
    // Handle standard OPTIONS request.
    return new Response(null, {
        headers: {
            Allow: (
                cors_headers?.AllowMethods ??
                DefaultCORSHeaders['Access-Control-Allow-Methods']
            ).join(', '),
        },
    })
}
