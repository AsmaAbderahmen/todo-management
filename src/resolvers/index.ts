import usersResolver from './UsersResolver';
import authResolver from './AuthResolver';

export const RootResolver = {
    ...usersResolver,
    ...authResolver,
}
