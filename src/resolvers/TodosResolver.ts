import {ITodo} from '../types/todo';
import Todo from '../models/todo';
import {RequestWithUser} from "../types/RequestWithUser";


const createTodo = async (args: any, req: RequestWithUser): Promise<ITodo> => {
    //Create a new_todo by the connected user
    const currentUser = req.user['id']
    args['owner'] = currentUser
    const todo: ITodo = new Todo(args);
    await todo.save();
    const newTodo = await todo.populate('owner').execPopulate()
    return newTodo;
}

const getTodo = async (args: any, req: RequestWithUser): Promise<ITodo> => {
    // get a specified todo_ by id passed on args
    try {
        const todo: ITodo[] = await Todo.find({_id: args.id}).populate('owner guests');
        return todo[0];
    } catch (error) {
        throw error
    }
}

const getTodos = async (args: any, req: RequestWithUser): Promise<ITodo[]> => {
    /*
     *get the list of todos for the cennected user
     *the list will contain the list of todos created by himself or he is identified in
     * */
    const currentUser = req.user['id']
    try {
        const todos: ITodo[] = await Todo.find({
            $or: [{owner: currentUser}, {
                guests: {$in: [currentUser]}
            }]
        }).populate('owner guests');
        return todos;
    } catch (error) {
        throw error
    }
}

const updateTodo = async (args: any): Promise<void> => {
    try {
        await Todo.findByIdAndUpdate({_id: args.id}, args)
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (args: any, req: RequestWithUser): Promise<string> => {
    const currentUser = req.user['id']
    try {
        const todo = await getTodo(args.id, req)
        if (todo.owner['_id'] == currentUser) {
            await Todo.deleteOne(args.id)
            return "deleted"
        } else {
            return "not allowed to delete"
        }
    } catch (error) {
        throw error
    }
}

const shareTodo = async (args: any): Promise<void> => {
    try {
        await Todo.update({_id: args.id}, {$push: {guests: args.new_guests}}, {new: true})
    } catch (error) {
        throw error
    }
}

const addComment = async (args: any, req: RequestWithUser): Promise<void> => {
    try {
        const currentUser = req.user['id'];
        await Todo.update({_id: args.id}, {$push: {comments: {text: args.text, user: currentUser}}}, {new: true})
    } catch (error) {
        throw error
    }
}

export default {todos: getTodos, commentTodo: addComment, updateTodo, deleteTodo, todo: getTodo, createTodo, shareTodo}
