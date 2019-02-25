import { Server, ServerRegisterOptions } from 'hapi';
import { Routes } from './routes';
import { UserManager } from './UserManager';

function register(server: Server, options: ServerRegisterOptions) {
  server.dependency(['vision', 'core']);

  server.route(Routes);

  async function handle (request, h) {
    if (request.server.decorations.server.indexOf('getUserManager') === -1) {
      request.server.decorate('server', 'getUserManager', () => new UserManager());
    }

    return h.continue;
  }

  server.ext('onPostAuth', async (request, h) => {
    return handle(request, h);
  });

  server.log('info', 'Plugin registered: users');
}

export const plugin = {
  name: 'users',
  version: '1.0.0',
  register,
};

export * from './types';
