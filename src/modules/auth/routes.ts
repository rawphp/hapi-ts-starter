import * as Joi from 'joi';
import { User } from '../users/models/User';

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .max(32)
    .required(),
});

export const Routes = [
  {
    path: '/auth/login',
    method: 'GET',
    handler: (request, reply) => {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/');
      }

      return reply.view('auth/login');
    },
    config: {
      auth: false,
    },
  },
  {
    path: '/auth/verify',
    method: 'POST',
    handler: async (request, reply) => {
      try {
        const val: any = await Joi.validate(request.payload, loginSchema);

        const user: any = await User.findOne({ email: val.email });

        if (!user) {
          return reply.redirect('/auth/login');
        }

        console.log('user', user);

        if (user.password === val.password) {
          request.cookieAuth.set(user);

          return reply.redirect('/');
        }

        return reply.redirect.back();
      } catch (error) {
        console.log('login error', error.message);

        return reply.redirect('/auth/login');
      }
    },
    config: {
      auth: { mode: 'try' },
    },
  },
  {
    path: '/auth/logout',
    method: 'GET',
    handler: (request, reply) => {
      request.cookieAuth.clear();

      return reply.redirect('/');
    },
  },
];
