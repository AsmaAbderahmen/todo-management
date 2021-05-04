import {Request} from "express";
import {IAuthData} from "./user"

//RequestWithUser is the express Request data plus the connected user data
export interface RequestWithUser extends Request {
    user: IAuthData;
}
