/*
* isAuth is a middleware that tests the validity of a uses's token
* */

import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {RequestWithUser} from "../types/RequestWithUser";
import {IAuthData} from '../types/user';

export const isAuth: any = (expressRequest: Request, res: Response, next: any) => {
    const req = expressRequest as RequestWithUser;
    const authHeader = req.headers["authorization"];
    let jwtPayload;

    if (!authHeader) {

        next();
        return;
    }

    const token: string = authHeader.split('Bearer ')[1];
    if (!token) {
        next();
        return;
    }
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret) as IAuthData;
        req.user = jwtPayload;
    } catch (error) {
        res.send({
            message: "Something is wrong with the provided token, please try to login again",
        });
        return;
    }
    next();
};
