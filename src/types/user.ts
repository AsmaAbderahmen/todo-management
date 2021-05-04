import {Document} from 'mongoose'

export interface IUser extends Document {
    username: string
    email: string
    password: string
}

export interface IAuthData {
    id: string;
    token: string;
    tokenExpiration: number;
}

