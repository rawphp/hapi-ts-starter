import { Server, ServerRegisterOptions } from 'hapi';
import { Routes } from './routes';

async function register(server: Server, options: ServerRegisterOptions) {
  server.dependency([]);

  server.route(Routes);

  await server.register({
    plugin: require('hapi-auth-cookie'), // cookie session and authentication management
  });

  await server.register({
    plugin: require('hapi-view-context'),
    options: {
      context: {},
      contextHandler: (context, request) => {
        context.id = request.id;

        if (request.auth.isAuthenticated) {
          context.user = request.auth.artifacts;
        }

        return context;
      },
    },
  });

  await server.register({
    plugin: require('yar'),
    options: {
      cookieOptions: {
        password: 'e92a18d6-6950-4115-8c19-89bbcb6b96d5',
        isSecure: process.env.NODE_ENV !== 'development',
      },
    },
  });

  server.auth.strategy('session', 'cookie', {
    password: '1b671a64-40d5-491e-99b0-da01ff1f3341',
    cookie: 'sid-hapi-ts-starter',
    redirectTo: '/auth/login',
    isSecure: false,
    validateFunc: async (request, session) => {
      return {
        valid: true,
        credentials: {
          email: session.email,
        },
      };
    },
  });

  server.auth.default('session');

  await server.register({
    plugin: require('inert'), // for serving static files and directories
  });

  await server.register({
    plugin: require('hapi-pino'), // logging provider
    options: {
      prettyPrint: false,
      logPayload: true,
      logRouteTags: true,
      mergeHapiLogData: true,
      logEvents: ['response', 'onPostStart'],
    },
  });

  await server.register({
    plugin: require('vision'), // templating provider
  });

  (server as any).views({
    engines: {
      hbs: require('handlebars'),
    },
    path: './templates',
    layoutPath: './templates/layouts',
    layout: 'dashboard', // default layout
    partialsPath: './templates/partials',
    isCached: process.env.NODE_ENV === 'production', // cached in production only
    context: {
      title: 'Hapi Ts Starter',
      location: 'Unknown',
    }
  });

  server.log('info', 'Plugin registered: core');
}

export const plugin = {
  name: 'core',
  version: '1.0.0',
  register,
};

// export * from './types';
