/*
*
*
* */

declare module 'express-serve-static-core' {
    export interface Request {
        user?: any;
    }
}

declare module 'express' {
    export interface Request {
        user?: any
    }
}
