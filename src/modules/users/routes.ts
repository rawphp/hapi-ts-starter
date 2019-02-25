import { Request } from 'hapi';
import { IUserManager } from './types';

export const Routes = [
  {
    path: '/admin/users',
    method: 'GET',
    handler: async (request, reply) => {
      const userManager: IUserManager = request.server.getUserManager();

      const users = await userManager.getUsers();

      console.log('users', users);

      return reply.view('users/list', { users });
    },
  },
  {
    path: '/users/register',
    method: 'GET',
    handler: (request: Request, reply) => {
      return reply.view('users/register');
    },
    config: {
      auth: false,
    },
  },
  {
    path: '/users/register',
    method: 'POST',
    handler: async (request, reply) => {
      try {
        const userManager: IUserManager = request.server.getUserManager();

        await userManager.addUser(request.payload);

        return reply.redirect('/auth/login');
      } catch (error) {
        console.error('register.error', error.message);

        return reply.redirect('/users/register');
      }
    },
    config: {
      auth: false,
    },
  },
];
