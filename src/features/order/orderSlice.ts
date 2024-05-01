import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addOrder as addOrderAPI,
  fetchOrdersByUser as getAllOrdersForUserAPI,
  updateRoleApproval as updateRoleApprovalAPI,
  fetchOrder as fetchOrderAPI,
  fetchAllOrders as fetchOrdersAPI,
  getOrdersToBeApprovedByRole,
} from "./orderAPI"; // Assuming these functions are defined in orderAPI
import { RootState } from "../../app/store";

export interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _type: "reference";
    _ref: string;
  };
  items: Array<{ _type: "reference"; _ref: string }>;
  status: string;
  transactionHash?: string;
  shippedAt?: string;
  deliveredAt?: string;
  totalCost: number;
  roleApprovals: Array<{
    role: { _type: "reference"; _ref: string };
    approved: boolean;
    approvedAt?: string;
  }>;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  status: "idle",
  error: null,
};

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({
    orderData,

    email,
  }: {
    orderData: Order;

    email: any;
  }) => {
    return await addOrderAPI(orderData, email);
  }
);

export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (userEthAddress: string) => {
    return await getAllOrdersForUserAPI(userEthAddress);
  }
);

export const updateRoleApproval = createAsyncThunk(
  "orders/updateRoleApproval",
  async ({
    orderId,
    roleApprovalData,
    approvalStatus,
    documentId,
  }: {
    orderId: string;
    roleApprovalData: any;
    approvalStatus: any;
    documentId: any;
  }) => {
    return await updateRoleApprovalAPI(
      orderId,
      roleApprovalData,
      approvalStatus,
      documentId
    );
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId: any) => {
    return await fetchOrderAPI(orderId);
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  return await fetchOrdersAPI();
});

export const fetchOrdersForApproval = createAsyncThunk(
  "orders/fetchForApproval",
  async (
    {
      supplierAddress,
      roleAddress,
    }: { supplierAddress: any; roleAddress: any },
    { rejectWithValue }
  ) => {
    try {
      const orders = await getOrdersToBeApprovedByRole(
        supplierAddress,
        roleAddress
      );
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.orders.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add order";
        state.status = "failed";
      })
      .addCase(
        fetchOrdersByUser.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(
        updateRoleApproval.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order._id === action.payload._id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.currentOrder = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchOrdersForApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersForApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersForApproval.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;

export default orderSlice.reducer;
