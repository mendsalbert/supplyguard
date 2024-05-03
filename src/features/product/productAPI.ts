// src/features/product/ProductAPI.ts
import { client } from "@/api/client";
import { Product, Image } from "./productSlice";

const uploadImage = async (imageFile: any) => {
  if (!imageFile) return null;
  try {
    const imageAsset = await client.assets.upload("image", imageFile, {
      filename: imageFile.name,
      contentType: imageFile.type,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageAsset._id,
      },
    };
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};

export const createProduct = async (productData: Product, imageFile: any) => {
  try {
    const image = await uploadImage(imageFile);
    const newProduct = await client.create({
      _type: "product",
      ...productData,
      image: image,
    });
    return newProduct;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

export const editProduct = async (
  productId: any,
  productData: any,
  imageFile: any
) => {
  try {
    let updatedData = { ...productData };
    if (imageFile) {
      const image = await uploadImage(imageFile);
      updatedData.image = image;
    }
    const updatedProduct = await client
      .patch(productId)
      .set(updatedData)
      .commit();
    return updatedProduct;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const query = `*[_type == "product"]{
      ...,
      "category": category->{
       ...
      },
      "supplier": supplier->{
        ...
      }
    }`;
    const products = client.fetch(query);
    return products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    throw error;
  }
};

export const getSingleProduct = async (productId: any) => {
  try {
    const query = `*[_type == "product" && _id == $productId][0]`;
    return await client.fetch(query, { productId });
  } catch (error) {
    console.error("Failed to fetch single product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: any) => {
  try {
    return await client.delete(productId);
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

export const getAllProductsFromSupplier = async (
  supplierEthereumAddress: any
) => {
  const query = `
  *[_type == "product" && supplier->ethereumAddress == $supplierEthereumAddress]{
    ...,
    "category": category->{
      ...  // Specify the fields you want from the category
    },
    "supplier": supplier->{
      ...  // Specify the fields you want from the supplier
    }
  }
`;

  const params = {
    supplierEthereumAddress,
  };

  // Then use the query and params with your Sanity client to fetch the data
  try {
    const products = await client.fetch(query, params);
    return products;
  } catch (error) {
    console.error("Error fetching products from supplier:", error);
    throw error; // You can re-throw the error to be caught by the calling function
  }
};
