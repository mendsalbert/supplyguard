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
    // Check if the user already exists by Ethereum address
    const existingUsersQuery = `*[_type == "user" && ethereumAddress == $ethereumAddress]`;
    const existingUsers = await client.fetch(existingUsersQuery, {
      ethereumAddress: user.ethereumAddress,
    });

    if (existingUsers.length > 0) {
      // User already exists with the same Ethereum address
      throw new Error("A user with this Ethereum address already exists.");
    }

    // If no existing user, create a new one
    const newUser = await client.create({
      _type: "user",
      ...user,
    });
    return newUser;
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
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
          supplierName,
          ethereumAddress
        },
        category->{
          name,
          description
        }
      },
      "cart": cart[]->{
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
  try {
    const query = `*[_type == "user" && ethereumAddress == $ethereumAddress]`;
    const params = { ethereumAddress }; // Using an object to hold parameters
    const users = await client.fetch(query, params);
    const user = users[0]; // Assuming you want the first user that matches

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

export const addToCart = async (userId: any, productId: any) => {
  try {
    // First, update the cart by adding the new product
    await client
      .patch(userId)
      .setIfMissing({ cart: [] })
      .insert("after", "cart[-1]", [
        {
          _type: "reference",
          _ref: productId,
        },
      ])
      .commit();

    // After updating, fetch the updated cart details with full product information
    const query = `
      *[_id == $userId] {
        "cart": cart[]->{
          _id,
          name,
          description,
          price,
          image,
          supplier->{
            supplierName,
            ethereumAddress
          },
          category->{
            name,
            description
          }
        }
      }
    `;

    // Execute the query to fetch detailed cart items
    const updatedUserCart = await client.fetch(query, { userId });

    // Return the first user's detailed cart (assuming _id is unique and only one user is expected to match)
    if (updatedUserCart.length > 0) {
      return updatedUserCart[0].cart;
    }

    return []; // If no user or cart found, return an empty array
  } catch (error) {
    console.error("Failed to add to cart and fetch updated cart:", error);
    throw new Error("Failed to add to cart and fetch updated cart");
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
    // First, remove the product from the cart
    await client
      .patch(userId)
      .unset([`cart[_ref=="${productId}"]`]) // Correctly unset the reference
      .commit();
    // After updating, fetch the updated cart details with full product information
    const query = `
      *[_id == $userId] {
        "cart": cart[]->{
          _id,
          name,
          description,
          price,
          image,
          supplier->{
            supplierName,
            ethereumAddress
          },
          category->{
            name,
            description
          }
        }
      }
    `;

    // Execute the query to fetch detailed cart items
    const updatedUserCart = await client.fetch(query, { userId });

    // Return the first user's detailed cart (assuming _id is unique and only one user is expected to match)
    if (updatedUserCart.length > 0) {
      return updatedUserCart[0].cart;
    }

    return []; // If no user or cart found, return an empty array
  } catch (error) {
    console.error("Failed to remove from cart and fetch updated cart:", error);
    throw new Error("Failed to remove from cart and fetch updated cart");
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

export const getCart = async (userId: any) => {
  const query = `
    *[_type == "user" && _id == $userId] {
      "cart": cart[]->{
        _id,
        name,
        description,
        price,
        image,
        supplier->{
          supplierName,
          ethereumAddress

        },
        category->{
          name,
          description
        }
      }
    }
  `;

  const params = {
    userId,
  };
  try {
    const result = await client.fetch(query, params);

    return result[0].cart;
  } catch (error) {
    console.error("Failed to fetch cart for user:", error);
    throw new Error("Failed to fetch cart");
  }
};
