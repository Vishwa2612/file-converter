declare module 'pdf-parse' {
    function pdfParse(dataBuffer: any, options?: any): Promise<any>;
    export = pdfParse;
}
