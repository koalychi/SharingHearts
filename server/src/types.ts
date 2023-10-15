import { Request } from "express";

export type UserType = any

export type UserRequest = Request & {user: UserType}

export type ErrorType = {
  message: string
}

export type LoginData = {
  email: string,
  password: string
}

export type UserData = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  university?: string,
  major?: string,
  bio?: string,
  contacts?: string,
  tags?: string[],
}

export type TaskType = {
  title: string,
  description: string,
  tags: string[]
  deadline: string
}