import { client } from "../../api/client";
import { User } from "./userSlice";

export const fetchUsers = async () => {
  const query = '*[_type == "user"]';
  try {
    const users = await client.fetch(query);
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const addUser = async (user: User) => {
  try {
    const newUser = await client.create({
      _type: "user",
      ...user,
    });
    console.log("fsdf", newUser);
    return newUser;
  } catch (error) {
    console.error("Failed to add user:", error);
    throw new Error("Failed to add user");
  }
};

export const fetchUser = async (id: string) => {
  const query = `*[_type == "user" && _id == $id][0]`;
  try {
    const user = await client.fetch(query, { id });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const fetchUserByAddress = async (ethereumAddress: string) => {
  const query = `*[_type == "user" && ethereumAddress == '${ethereumAddress}']`;
  console.log(query);

  try {
    const user = await client.fetch(query, { ethereumAddress });
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user by address:", error);
    throw new Error("Failed to fetch user by address");
  }
};

// userAPI.ts
export const updateUserByAddress = async (
  ethereumAddress: string,
  userData: Partial<User>
) => {
  try {
    const query = `*[_type == "user" && ethereumAddress == '${ethereumAddress}']`;
    const user = await client.fetch(query, { ethereumAddress });
    if (user && user._id) {
      const result = await client.patch(user._id).set(userData).commit();
      return result;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Failed to update user by address:", error);
    throw new Error("Failed to update user by address");
  }
};
