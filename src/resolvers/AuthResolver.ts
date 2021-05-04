import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {IAuthData, IUser} from '../types/user';
import config from '../config/config';

const singup = async (args: any): Promise<IUser | Error> => {
    try {
        const existingUser = await User.findOne({email: args.userInput.email});
        if (existingUser) {
            return new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
            email: args.userInput.email,
            password: hashedPassword
        });
        const new_user: IUser = await user.save();
        return new_user;
    } catch (err) {
        throw err;
    }
};
const login = async (args: any): Promise<IAuthData> => {
    const {userInput: {email, password}} = args;
    const user = await User.findOne({email: email});
    if (!user) {
        throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
        {id: user._id, email: user.email},
        config.jwtSecret,
        {
            expiresIn: '1h'
        });
    return {id: user.id, token: token, tokenExpiration: 1};
};

export default {login, singup};