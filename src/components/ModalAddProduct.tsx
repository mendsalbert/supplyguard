"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import NcModal from "@/shared/NcModal/NcModal";
import Label from "@/components/Label/Label";
import Textarea from "@/shared/Textarea/Textarea";
import Select from "@/shared/Select/Select";
import { fetchUserByAddress } from "@/features/user";
import { useAppDispatch, useAppSelector } from "@/app/store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchCategories,
  selectCategories,
} from "@/features/category/categorySlice";
import { addProduct } from "@/features/product";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
}

const ModalAddProduct: FC<ModalEditProps> = ({ show, onCloseModalEdit }) => {
  const user = useAppSelector((state) => state.users.currentUser) as any;

  const textareaRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { categories, status, error } = useAppSelector(selectCategories);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
    dispatch(fetchCategories());
  }, [dispatch, isLoading]);

  const [imageFile, setImageFile] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    sku: "" as any,
    price: "",
    category: {
      _type: "reference",
      _ref: "", // This is the ID of the selected category
    },
    supplier: {
      _type: "reference",
      _ref: "", // This is the ID of the selected supplier
    },
    smartContractAddress: "",
    status: "",
    inventoryQuantity: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const [nestedKey, nestedName] = name.split(".");
    generateSKU(value);

    if (nestedName) {
      setProductData((prevData: any) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedName]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = toast.loading("Adding Product...");
    setIsLoading(true);

    try {
      const onAddProduct = await dispatch(
        addProduct({
          productData,
          imageFile,
        })
      ).unwrap();

      toast.update(id, {
        render: "All is good :) Product Added!",
        type: "success",
        isLoading: false,
      });

      setIsLoading(false);
      onCloseModalEdit();
    } catch (error) {
      console.error(error);
      toast.update(id, {
        render: "Ops! Something went wrong",
        type: "error",
        isLoading: false,
      });
      setIsLoading(false);
      onCloseModalEdit();
    }
  };

  const generateSKU = (e: any) => {
    const nameslice = productData?.name?.slice(0, 1).toUpperCase();
    const priceslice = productData.price.slice(0, 1);
    const inventoryQuantity = productData.inventoryQuantity;

    const sku = `${nameslice}${priceslice}${inventoryQuantity}SG24`;
    setProductData((prevData) => ({
      ...prevData,
      sku: sku,
      supplier: {
        _type: "reference",
        _ref: user?._id,
      },
      smartContractAddress: user?.ethereumAddress,
    }));
  };

  const renderContent = () => {
    return (
      <div>
        <ToastContainer hideProgressBar={false} />

        <h3 className="text-lg pb-5 font-semibold text-neutral-900 dark:text-neutral-200">
          Add Product
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow mt-10 md:mt-0  max-w-3xl space-y-6">
              <div>
                <Label>Product Name</Label>
                <Input
                  className="mt-1.5"
                  placeholder=""
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  className="mt-1.5"
                  placeholder="$7.99"
                  type="number"
                  name="price"
                  value={productData.price}
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Inventory Quantity</Label>
                <Input
                  className="mt-1.5"
                  placeholder="54"
                  type="number"
                  name="inventoryQuantity"
                  value={productData.inventoryQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>SKU</Label>
                <Input
                  className="mt-1.5"
                  // placeholder="YM754SG"
                  type="text"
                  disabled
                  name="sku"
                  value={productData.sku}
                />
              </div>

              <div>
                <Label>Image</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-camera"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    type="file"
                    required
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  className="mt-1.5"
                  name="category._ref"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">--- Select Category ---</option>

                  {categories?.map((category, index) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  className="mt-1.5"
                  name="status"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">--- Select Status ---</option>
                  <option value="available">Available</option>
                  <option value="outOfStock">Out Of Stock</option>
                  <option value="discontinued">Discontinued</option>
                </Select>
              </div>

              <div>
                <Label>Product Description</Label>
                <Textarea
                  className="mt-1.5"
                  placeholder=""
                  required
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 space-x-3">
            <ButtonPrimary type="submit" loading={isLoading}>
              Submit
            </ButtonPrimary>
            <ButtonSecondary type="button" onClick={onCloseModalEdit}>
              Cancel
            </ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEdit}
      contentExtraClass="max-w-3xl"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalAddProduct;
