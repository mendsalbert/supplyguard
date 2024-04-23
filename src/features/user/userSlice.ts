import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchUsers as fetchUsersAPI,
  addUser as addUserAPI,
  fetchUser as fetchUserAPI,
  fetchUserByAddress as fetchUserByAddressAPI,
  updateUserByAddress as updateUserByAddressAPI,
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
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

export const fetchUserByAddress = createAsyncThunk(
  "users/fetchUserByAddress",
  async (ethereumAddress: string) => {
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
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export default userSlice.reducer;
