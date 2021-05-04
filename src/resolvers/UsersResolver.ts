import {IUser} from '../types/user';
import User from '../models/user';
import Todo from '../models/todo';
import {RequestWithUser} from "../types/RequestWithUser";
import {ITodo} from "../types/todo";

const getUser = async (args: any, req: RequestWithUser): Promise<IUser> => {
    try {
        const user: IUser= await User.findById( args.id);
        return user;
    } catch (error) {
        throw error
    }
}

const userProfile = async (args: any, req: RequestWithUser): Promise<IUser> => {
    const currentUser = req.user['id']
    try {
        const user: IUser = await User.findById(currentUser);
        const todos: ITodo[] = await Todo.find({owner: currentUser})
        user['todos'] = todos
        return user;
    } catch (error) {
        throw error
    }
}

const getUsers = async (args: any): Promise<IUser[]> => {
    try {
        const users: IUser[] = await User.find();
        return users;
    } catch (error) {
        throw error
    }
}


const updateUser = async (args: any, req: RequestWithUser): Promise<void> => {
    try {
        const updateUser: IUser | null = await User.findByIdAndUpdate(
            {_id: req.user},
            args
        )
    } catch (error) {
        throw error
    }
}

const deleteUser = async (args: any): Promise<string> => {
    /*
    * delete a specified user
    * delete the list of todos with owner is the id of connected user
    * delete the id of the connected user from guests list
    *
    * */
    try {
        await User.findByIdAndRemove(args.id)
        await Todo.deleteMany({owner: args.id})
        await Todo.updateMany({}, {$pull: {guests: args.id}}, {new: true})
        return "user deleted"

    } catch (error) {
        throw error
    }
}

export default {users: getUsers, userProfile, updateUser, deleteUser, user: getUser};
