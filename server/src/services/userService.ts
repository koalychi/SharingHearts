import { emailRegexp } from '../configs';
import { User } from '../models'
import { UserData } from '../types';

export const edit = async (userId: string, userData: Partial<UserData>) => {
  const { first_name, last_name, email, password } = userData;

  let errors: string[] = [];
  let checkUser = await User.findOne({ email });
  if (checkUser) errors.push("This email address is already in user");

  if (
    (first_name && first_name.length < 3) ||
    (first_name && first_name.length > 50) ||
    (last_name && last_name.length < 3) ||
    (last_name && last_name.length > 50)
  )
    errors.push(
      "Name should be at least 3 characters long and max 50 characters long"
    );

  if (email && !emailRegexp.test(email))
    errors.push("Please fill a valid email address");

  if (password && password.length < 8)
    errors.push("Password should be at least 8 characters long");

  if (errors.length >= 1) throw { message: [errors] };  

  return await User.updateOne({ _id: userId }, { $set: { ...userData } });
}

export const getUserById = async (userId: string) => {
    return await User.findById(userId).populate("createdSells").lean();
}
