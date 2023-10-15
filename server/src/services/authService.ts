import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginData, UserData } from "../types";
import { emailRegexp } from "../configs";

export const registerUser = async (userData: UserData) => {
  const { first_name, last_name, email, password } = userData;

  let errors: string[] = [];
  let checkUser = await User.findOne({ email });
  if (checkUser) errors.push("This email address is already in user");

  if (
    first_name.length < 3 ||
    first_name.length > 50 ||
    last_name.length < 3 ||
    last_name.length > 50
  )
    errors.push(
      "Name should be at least 3 characters long and max 50 characters long"
    );

  if (!emailRegexp.test(email))
    errors.push("Please fill a valid email address");

  if (password.length < 8)
    errors.push("Password should be at least 8 characters long");

  if (errors.length >= 1) throw { message: [errors] };

  let user = new User(userData);
  return await user.save();
};

export const loginUser = async ({ email, password }: LoginData) => {
  let user = await User.findOne({ email });
  if (!user) throw { message: "Invalid email or password" };

  let hasValidPass = await bcrypt.compare(password, user.password);
  if (!hasValidPass) throw { message: "Invalid email or password" };

  if (!process.env.SECRET) throw { message: "No SECRET found" };

  let token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET
  );

  return token;
};

export const getUser = async (id: string) => {
  return await User.findById(id).lean();
};
