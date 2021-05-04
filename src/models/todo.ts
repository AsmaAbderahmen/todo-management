import {ITodo} from '../types/todo';
import {model, Schema} from 'mongoose';

const comment_schema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String
}, {timestamps: true, usePushEach: true})

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    guests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [comment_schema]

}, {timestamps: true, usePushEach: true})


export default model<ITodo>('Todo', todoSchema)
