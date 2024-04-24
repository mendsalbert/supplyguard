"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonThird from "@/shared/Button/ButtonThird";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { removeProduct } from "@/features/product";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
  productId?: any;
}

const ModalProductDelete: FC<ModalDeleteProps> = ({
  show,
  onCloseModalDelete,
  productId,
}) => {
  const dispatch = useAppDispatch();

  const handleClickSubmitForm = async () => {
    // console.log(productId);
    try {
      const onAddProduct = await dispatch(removeProduct(productId)).unwrap();
      console.log(onAddProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    const dispatch = useAppDispatch();

    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete Product
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this Product? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonThird
            className="bg-red-500 text-white"
            onClick={handleClickSubmitForm}
            type="submit"
          >
            Delete
          </ButtonThird>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
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
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalProductDelete;
