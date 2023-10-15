import {Task, User} from '../models'
import { TaskType } from '../types';

export const getAll =  async (page: number, limit: number) => {
    return await (Task as any).paginate({}, page, limit);
}

export const findById = async (id: string) => {
    return await Task.findById(id);
}

export const edit = async (id: string, data: TaskType) => {
    return await Task.updateOne({ _id: id }, data);
}

export const create = async (data: TaskType, userId: string) => {
    let task = new Task({...data, author_id: userId})
    await task.save();
    await User.updateOne({ _id: userId }, { $push: { tasks: task } });
    
    return task
}
