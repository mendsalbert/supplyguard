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
  const query = `
    *[_type == "user" && ethereumAddress == $ethereumAddress] {
      ...,
      "wishlist": wishlist[]->{
        _id,
        name,
        description,
        price,
        status,
        image,
        supplier->{
          supplierName
        },
        category->{
          name,
          description
        }
      }
    }
  `;

  try {
    // Passing parameters correctly using the second argument of client.fetch
    const user = await client.fetch(query, { ethereumAddress });
    return user[0]; // Assuming you want to return the first user if multiple users have the same address
  } catch (error) {
    console.error("Failed to fetch user by address:", error);
    throw new Error("Failed to fetch user by address");
  }
};

export const updateUserByAddress = async (
  ethereumAddress: any,
  userData: Partial<User>,
  imageFile?: File
) => {
  console.log("fsdfafsdfsfd");
  try {
    const query = `*[_type == "user" && ethereumAddress == '${ethereumAddress}']`;
    const [user] = await client.fetch(query, { ethereumAddress });

    if (!user) {
      throw new Error("User not found");
    }

    let imageAssetId = user.profilePicture?.asset?._ref;

    if (imageFile) {
      const imageAsset = await client.assets.upload("image", imageFile, {
        filename: imageFile.name,
      });

      if (imageAsset?._id) {
        imageAssetId = imageAsset._id;
      } else {
        throw new Error("Image upload failed");
      }
    }

    // If we have a new image asset, add it to userData
    if (imageAssetId) {
      userData.profilePicture = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAssetId,
        },
      };
    }

    // Update the user document with the new data, including the new image if uploaded
    const result = await client.patch(user._id).set(userData).commit();

    return result;
  } catch (error) {
    console.error("Failed to update user by address:", error);
    throw new Error("Failed to update user by address");
  }
};

// Function to add a product to the user's cart
export const addToCart = async (userId: any, productId: any) => {
  try {
    const updatedUser = await client
      .patch(userId) // the user's document ID
      .setIfMissing({ cart: [] })
      .insert("after", "cart[-1]", [
        {
          _type: "reference",
          _ref: productId,
        },
      ])
      .commit();
    return updatedUser;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

// Function to add a product to the user's wishlist
export const addToWishlist = async (userId: any, productId: any) => {
  try {
    const updatedUser = await client
      .patch(userId)
      .setIfMissing({ wishlist: [] })
      .insert("after", "wishlist[-1]", [
        {
          _type: "reference",
          _ref: productId,
        },
      ])
      .commit();
    return updatedUser;
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    throw error;
  }
};

// Function to add an order to the user's order history
export const addOrderToHistory = async (userId: any, orderId: any) => {
  try {
    const updatedUser = await client
      .patch(userId)
      .setIfMissing({ orderHistory: [] })
      .insert("after", "orderHistory[-1]", [
        {
          _type: "reference",
          _ref: orderId,
        },
      ])
      .commit();
    return updatedUser;
  } catch (error) {
    console.error("Failed to add order to history:", error);
    throw error;
  }
};

// Function to remove a product from the user's cart
export const removeFromCart = async (userId: any, productId: any) => {
  try {
    const updatedUser = await client
      .patch(userId) // the user's document ID
      .unset([`cart[_ref=="${productId}"]`])
      .commit();
    return updatedUser;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    throw error;
  }
};

// Function to remove a product from the user's wishlist
export const removeFromWishlist = async (userId: any, productId: any) => {
  try {
    const updatedUser = await client
      .patch(userId)
      .unset([`wishlist[_ref=="${productId}"]`])
      .commit();
    return updatedUser;
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    throw error;
  }
};
