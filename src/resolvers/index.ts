import usersResolver from './UsersResolver';
import todosResolver from './TodosResolver';
import authResolver from './AuthResolver';

export const RootResolver = {
    ...usersResolver,
    ...todosResolver,
    ...authResolver,
}
