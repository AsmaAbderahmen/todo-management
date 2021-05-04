import { IUser } from '../types/user';
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type: String
    }
}, { timestamps: true })


export default model<IUser>('User', todoSchema)
