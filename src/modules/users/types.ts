import { EventEmitter } from 'events';

export const enum UserEvent {
  UserAdded = 'UserAdded',
  UserUpdated = 'UserUpdated',
  UserDeleted = 'UserDeleted',
}

export interface IUser {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  organisation: string;
  googleId: string;
  facebookId: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserManager extends EventEmitter {
  addUser(user: IUser): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  findUser(userId: string): Promise<IUser>;
  updateUser(user: IUser): Promise<IUser>;
  deleteUser(userId: string): Promise<boolean>;
}
