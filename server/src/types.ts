import { User } from './models/User';
import { Request } from "express";

export type UserType = any

export type UserRequest = Request & {user: UserType}