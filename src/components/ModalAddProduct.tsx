"use client";
import React, { FC, useEffect, useRef } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import NcModal from "@/shared/NcModal/NcModal";
import Label from "@/components/Label/Label";
import Textarea from "@/shared/Textarea/Textarea";
import Image from "next/image";
import { avatarImgs } from "@/contains/fakeData";
import Select from "@/shared/Select/Select";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
}

const ModalAddProduct: FC<ModalEditProps> = ({ show, onCloseModalEdit }) => {
  const textareaRef = useRef(null);

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

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg pb-5 font-semibold text-neutral-900 dark:text-neutral-200">
          Add Product
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0  max-w-3xl space-y-6">
            <div>
              <Label>Product Name</Label>
              <Input className="mt-1.5" placeholder="" />
            </div>

            <div>
              <Label>Price</Label>
              <Input className="mt-1.5" placeholder="$7.99" type="number" />
            </div>

            <div>
              <Label>Price</Label>
              <Input className="mt-1.5" placeholder="$7.99" type="number" />
            </div>

            <div>
              <Label>Image</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-camera"></i>
                </span>
                <Input className="!rounded-l-none" type="file" />
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select className="mt-1.5">
                <option value="Male">Category 1</option>
                <option value="Female">Category 2</option>
                <option value="Other">Category 3</option>
              </Select>
            </div>

            <div>
              <Label>Product Description</Label>
              <Textarea className="mt-1.5" placeholder="" />
            </div>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalEdit}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
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
