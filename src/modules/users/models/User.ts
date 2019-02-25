import { Document, model, Model, Schema } from 'mongoose';
import { IUser } from '../types';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    organisation: { type: String, required: false },
    googleId: { type: String, required: false },
    facebookId: { type: String, required: false },
    email: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const User: Model<IUserDocument> = model<IUserDocument>('User', userSchema);
