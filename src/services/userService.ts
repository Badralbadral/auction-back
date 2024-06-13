import { UserModel } from "@/models/user.schema";
import { UserType } from "@/types/userType";
const jwt = require("jsonwebtoken");

export const getUsers = async () => {
  const users = await UserModel.find();
  return users;
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: String
): Promise<UserType> => {
  const createUser = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
  });
  return createUser;
};

export const loginService = async (email: string, password: string) => {
  try {
    const users = await UserModel.findOne({ email, password });
    if (email == users.email && password == users.password) {
      const userInfo = {
        email: email,
        password: password,
      };
      const newToken = jwt.sign(userInfo, "my-super-duper-secret-key", {
        expiresIn: "1h",
      });
      console.log("successfully logged");
      return newToken;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
