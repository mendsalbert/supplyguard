// src/features/product/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
  getAllProductsFromSupplier as getAllProductsFromSupplierAPI,
} from "./productAPI";

export interface Image {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}

export interface Product {
  _id?: string;
  name: any;
  description?: string;
  sku: string;
  price: any;
  image?: Image;
  category?: {
    _type: "reference";
    _ref: string;
  };
  supplier?: {
    _type: "reference";
    _ref: string;
  };
  smartContractAddress?: any;
  status?: "available" | "outOfStock" | "discontinued";
  inventoryQuantity?: any;
}

interface ProductState {
  productsBySupplier: Product[];
  products: Product[];
  currentProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  productsBySupplier: [],
  products: [],
  currentProduct: null,
  status: "idle",
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await getAllProducts();
});

export const fetchProduct = createAsyncThunk(
  "products/fetchSingle",
  async (productId: any) => {
    return await getSingleProduct(productId);
  }
);

export const addProduct = createAsyncThunk(
  "products/create",
  async ({ productData, imageFile }: { productData: any; imageFile: any }) => {
    return await createProduct(productData, imageFile);
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({
    productId,
    productData,
    imageFile,
  }: {
    productId: any;
    productData: any;
    imageFile: any;
  }) => {
    return await editProduct(productId, productData, imageFile);
  }
);

export const removeProduct = createAsyncThunk(
  "products/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(productId);
      if (response) {
        return productId;
      } else {
        return rejectWithValue("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return rejectWithValue("Failed to delete product");
    }
  }
);

export const fetchProductsFromSupplier = createAsyncThunk(
  "products/fetchFromSupplier",
  async (ethereumAddress: string) => {
    return await getAllProductsFromSupplierAPI(ethereumAddress);
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          console.log("product", action.payload);

          state.currentProduct = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.products.push(action.payload);
        state.productsBySupplier.push(action.payload);

        state.status = "succeeded";
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }

        // Also update product in the productsBySupplier array if it exists there
        const supplierIndex = state.productsBySupplier.findIndex(
          (product) => product._id === action.payload._id
        );
        if (supplierIndex !== -1) {
          state.productsBySupplier[supplierIndex] = action.payload;
        }

        state.status = "succeeded";
        // console.log("Product updated, products count:", state.products.length);
        // console.log(
        //   "Product updated in supplier list, count:",
        //   state.productsBySupplier.length
        // );
      })
      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<any>) => {
        // The payload is assumed to be the product ID of the product to be removed
        const productId = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
        state.productsBySupplier = state.productsBySupplier.filter(
          (product) => product._id !== productId
        );
        state.status = "succeeded";
      })

      .addCase(fetchProductsFromSupplier.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        fetchProductsFromSupplier.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          // console.log("Products fetched: ", action.payload);
          state.productsBySupplier = action.payload;
          state.status = "succeeded";
        }
      )

      .addCase(fetchProductsFromSupplier.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to fetch products from supplier";
        state.status = "failed";
      });
  },
});

export const selectProductsBySupplier = (state: RootState) =>
  state.products.productsBySupplier;
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;

export default productSlice.reducer;
