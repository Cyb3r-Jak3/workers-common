interface JSONResponseOptions {
    status?: number;
    extra_headers?: Record<string, string>;
}
/**
 * Creates a JSON response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options for
 * @returns JSON Response
 */
export declare function JSONResponse(ResponseData: string | unknown, options?: JSONResponseOptions): Response;
/**
 * Simple wrapper for making JSON responses with error status codes
 * @param errMessage String or object to turn into JSON
 * @param status HTTP status code to return. Defaults to 500
 * @returns
 */
export declare function JSONErrorResponse(errMessage: string, status?: number): Response;
/**
 *
 * @param resp Response that hit cache
 * @returns Response with X-Worker-Cache Header
 */
export declare function HandleCachedResponse(resp: Response): Response;
export interface CORS_Headers {
    AllowOrigin?: string;
    AllowMethods?: string[];
    MaxAge?: number;
}
export declare const DefaultCORSHeaders: {
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Methods': string[];
    'Access-Control-Max-Age': number;
};
/**
 * Handles any CORs requests
 * @param request Incoming request to handle CORs for
 * @param cors_headers CORS response header parameters. If unset, will use DefaultCORSHeaders
 * @returns CORs response
 */
export declare function HandleCORS(request: Request, cors_headers?: CORS_Headers): Response;
export {};
//# sourceMappingURL=responses.d.ts.map