import { EventEmitter } from 'events';
import * as Joi from 'joi';
import { getDebug } from '../../utils/getDebug';
import { User } from './models/User';
import { IUser, IUserManager, UserEvent } from './types';

const debug = getDebug();

const registerSchema = Joi.object().keys({
  firstName: Joi.string()
    .max(32)
    .required(),
  lastName: Joi.string()
    .max(32)
    .required(),
  organisation: Joi.string()
    .max(32)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .max(32)
    .required(),
  isAdmin: Joi.boolean().disallow(),
});

export class UserManager extends EventEmitter implements IUserManager {
  public async addUser(data: IUser): Promise<IUser> {
    debug('[UserManager] addUser', { user: data });

    try {
      const val: any = await Joi.validate(data, registerSchema);

      const user = await User.create(val);
      await user.save();

      this.emit(UserEvent.UserAdded, { user });

      return user.toObject();
    } catch (error) {
      console.error('[UserManager] addUser.error', error.message);

      throw error;
    }
  }

  public async getUsers(): Promise<IUser[]> {
    debug('[UserManager] getUsers');

    try {
      return (await User.find()).map((user) => user.toObject());
    } catch (error) {
      console.error('[UserManager] getUsers.error', error.message);

      throw error;
    }
  }

  public async findUser(userId: string): Promise<IUser> {
    debug('[UserManager] findUser', { userId });

    try {
      return null;
    } catch (error) {
      console.error('[UserManager] findUser.error', error.message);

      throw error;
    }
  }

  public async updateUser(user: IUser): Promise<IUser> {
    debug('[UserManager] updateUser', { user });

    try {
      this.emit(UserEvent.UserUpdated, { user });

      return null;
    } catch (error) {
      console.error('[UserManager] updateUser.error', error.message);

      throw error;
    }
  }

  public async deleteUser(userId: string): Promise<boolean> {
    debug('[UserManager] deleteUser', { userId });

    try {
      this.emit(UserEvent.UserDeleted, { userId });

      return null;
    } catch (error) {
      console.error('[UserManager] deleteUser.error', error.message);

      throw error;
    }
  }
}
