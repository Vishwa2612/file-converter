declare module 'file-saver';

import 'convertapi-js';

declare module 'convertapi-js' {
    export interface ConvertApiConfig {
        apiKey: string;
    }

    export function auth(apiKey: string): ConvertApiConfig;
}
