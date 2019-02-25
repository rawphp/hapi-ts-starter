import { Server, ServerRegisterOptions } from 'hapi';
import { Routes } from './routes';

function register(server: Server, options: ServerRegisterOptions) {
  server.dependency(['vision', 'users']);

  server.route(Routes);

  server.log('info', 'Plugin registered: auth');
}

export const plugin = {
  name: 'auth',
  version: '1.0.0',
  register,
};
