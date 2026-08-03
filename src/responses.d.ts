export interface JSONAPIResponseOptions extends JSONResponseOptions {
    success?: boolean;
    error?: string;
}
export type JSONResponseOptions = {
    status?: number;
    extra_headers?: HeadersInit;
};
export declare const JSONContentHeader = "application/json; charset=UTF-8";
/**
 * Creates a JSON response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options
 * @returns JSON Response
 */
export declare function JSONResponse(ResponseData?: string | object, options?: JSONAPIResponseOptions): Response;
/**
 * Creates a JSON API response
 * @param ResponseData Object to turn into JSON data
 * @param options Extra options
 * @returns JSON Response
 */
export declare function JSONAPIResponse(ResponseData?: string | unknown, options?: JSONAPIResponseOptions): Response;
/**
 * Simple wrapper for making JSON responses with error status codes
 * @param errMessage String or object to turn into JSON
 * @param status HTTP status code to return. Defaults to 500
 * @returns
 */
export declare function JSONAPIErrorResponse(errMessage: string, status?: number, extraError?: string): Response;
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
//# sourceMappingURL=responses.d.ts.map