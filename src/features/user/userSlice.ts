import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchUsers as fetchUsersAPI,
  addUser as addUserAPI,
  fetchUser as fetchUserAPI,
  fetchUserByAddress as fetchUserByAddressAPI,
  updateUserByAddress as updateUserByAddressAPI,
  addToCart,
  addToWishlist,
  addOrderToHistory,
  removeFromCart,
  removeFromWishlist,
  getCart,
} from "./userAPI";
interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface ContactInfo {
  phone: string;
  website: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption?: string;
  alt?: string;
}

export interface User {
  username?: string;
  fullName?: string;
  email?: string;
  phone?: any;
  about?: string;
  ethereumAddress?: any;
  orderHistory?: Array<{ _ref: string; _type: "reference" }>;
  wishlist?: Array<{ _ref: string; _type: "reference" }>;
  cart?: Array<{ _ref: string; _type: "reference" }>;
  profilePicture?: Image;
  shippingAddress?: ShippingAddress;
  isSupplier?: boolean;
  supplierName?: string;
  description?: string;
  image?: Image;
  address?: string;
  contactInfo?: ContactInfo;
}

interface UserState {
  details: {
    cart: any[];
    wishlist: any[];
    orderHistory: any[];
  };
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  details: {
    cart: [],
    wishlist: [],
    orderHistory: [],
  },
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

export const fetchUserByAddress = createAsyncThunk(
  "users/fetchUserByAddress",
  async (ethereumAddress: any) => {
    return await fetchUserByAddressAPI(ethereumAddress);
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsersAPI();
});

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  return await addUserAPI(user);
});

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id: string) => {
    return await fetchUserAPI(id);
  }
);

export const updateUserByAddress = createAsyncThunk(
  "users/updateUserByAddress",
  async ({
    ethereumAddress,
    userData,
    imageFile,
  }: {
    ethereumAddress: any;
    userData: Partial<User>;
    imageFile: any;
  }) => {
    return await updateUserByAddressAPI(ethereumAddress, userData, imageFile);
  }
);

export const addProductToCart = createAsyncThunk(
  "users/addToCart",
  async ({ userId, productId }: { userId: any; productId: any }) => {
    return await addToCart(userId, productId);
  }
);

export const addProductToWishlist = createAsyncThunk(
  "users/addToWishlist",
  async ({ userId, productId }: { userId: any; productId: any }) => {
    return await addToWishlist(userId, productId);
  }
);

export const addOrderToUserHistory = createAsyncThunk(
  "users/addOrderToHistory",
  async ({ userId, orderId }: { userId: any; orderId: any }) => {
    return await addOrderToHistory(userId, orderId);
  }
);
export const removeProductFromCart = createAsyncThunk(
  "users/removeFromCart",
  async ({ userId, productId }: { userId: any; productId: any }) => {
    return await removeFromCart(userId, productId);
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "users/removeFromWishlist",
  async ({ userId, productId }: { userId: any; productId: any }) => {
    return await removeFromWishlist(userId, productId);
  }
);

export const fetchCart = createAsyncThunk(
  "users/fetchCart",
  async (userId: any, { rejectWithValue }) => {
    try {
      const cartItems = await getCart(userId);

      return cartItems;
    } catch (error) {
      return rejectWithValue("Failed to fetch cart");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
        state.status = "failed";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(
        getSingleUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchUserByAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserByAddress.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchUserByAddress.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch user by address";
        state.status = "failed";
      })
      .addCase(updateUserByAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateUserByAddress.fulfilled,
        (state, action: PayloadAction<any>) => {
          const index = state.users.findIndex(
            (user) => user.ethereumAddress === action.payload.ethereumAddress
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateUserByAddress.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to update user by address";
        state.status = "failed";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        // state.details.cart.push(action.payload);
        // console.log("View Products To Cart : userSlice.tsx", action.payload);
        state.details.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.details.wishlist = action.payload.wishlist;
      })
      .addCase(addOrderToUserHistory.fulfilled, (state, action) => {
        state.details.orderHistory = action.payload.orderHistory;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        // state.details.cart = state.details.cart.filter(
        //   (item) => item._ref !== action.meta.arg.productId
        // );
        // state.details.cart = action.payload;
        state.details.cart = action.payload as any;
        state.status = "succeeded";
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.details.wishlist = state.details.wishlist.filter(
          (item) => item._ref !== action.meta.arg.productId
        );
        state.status = "succeeded";
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        // console.log("View Products To Cart : userSlice.tsx", action.payload);
        state.details.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        // state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectCurrentCart = (state: RootState) => state.users.details.cart;

export default userSlice.reducer;
