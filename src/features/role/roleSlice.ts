// src/features/role/roleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  addRole,
  editRole,
  deleteRole,
  getAllRoles,
  getSingleRole,
  getRolesBySupplier,
} from "./roleAPI";

export interface Role {
  _id?: any;
  fullname?: any;
  email?: any;
  ethaddress?: any;
  responsibilities?: any;
  noticeMessage?: any;
  image?: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: any;
    };
  };
  supplier?: {
    _type: "reference";
    _ref: any;
  };
  createdAt?: any;
}

interface RoleState {
  rolesBySupplier: Role[];
  roles: Role[];
  currentRole: Role | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RoleState = {
  rolesBySupplier: [],
  roles: [],
  currentRole: null,
  status: "idle",
  error: null,
};

// Async thunks
export const fetchRoles = createAsyncThunk("roles/fetchAll", async () => {
  return await getAllRoles();
});

export const fetchRole = createAsyncThunk(
  "roles/fetchSingle",
  async (roleId: string) => {
    return await getSingleRole(roleId);
  }
);

export const createRole = createAsyncThunk(
  "roles/create",
  async (roleData: Role) => {
    return await addRole(roleData);
  }
);

export const updateRole = createAsyncThunk(
  "roles/update",
  async ({ roleId, roleData }: { roleId: string; roleData: Role }) => {
    return await editRole(roleId, roleData);
  }
);

export const removeRole = createAsyncThunk(
  "roles/delete",
  async (roleId: string) => {
    return await deleteRole(roleId);
  }
);
export const fetchRolesBySupplier = createAsyncThunk(
  "roles/fetchBySupplier",
  async (supplierEthereumAddress: string) => {
    return await getRolesBySupplier(supplierEthereumAddress);
  }
);

// Slice
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.roles = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.currentRole = action.payload;

        state.status = "succeeded";
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<any>) => {
        state.roles.push(action.payload);
        state.rolesBySupplier.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateRole.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.roles.findIndex(
          (role) => role._id === action.payload._id
        );
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        const roleIndex = state.rolesBySupplier.findIndex(
          (role) => role._id === action.payload._id
        );
        if (roleIndex !== -1) {
          state.rolesBySupplier[roleIndex] = action.payload;
        }

        state.status = "succeeded";
      })
      .addCase(removeRole.fulfilled, (state, action: PayloadAction<any>) => {
        const roleId = action.payload.documentIds[0];

        state.roles = state.roles.filter((role) => role._id !== roleId);
        state.rolesBySupplier = state.rolesBySupplier.filter(
          (role) => role._id !== roleId
        );
        state.status = "succeeded";
      })
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch roles";
        state.status = "failed";
      })
      .addCase(
        fetchRolesBySupplier.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.rolesBySupplier = action.payload; // Assuming you want to overwrite the roles list; adjust if needed
          state.status = "succeeded";
        }
      )
      .addCase(fetchRolesBySupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRolesBySupplier.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to fetch roles by supplier";
        state.status = "failed";
      });
  },
});

export const selectAllRoles = (state: RootState) => state.roles.roles;
export const selectCurrentRole = (state: RootState) => state.roles.currentRole;
export const selectRolesBySupplier = (state: RootState) =>
  state.roles.rolesBySupplier;
export default roleSlice.reducer;
