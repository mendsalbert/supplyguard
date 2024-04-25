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
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const onAddProduct = await dispatch(removeProduct(productId)).unwrap();
      onCloseModalDelete();
      setIsLoading(false);
    } catch (error) {
      onCloseModalDelete();
      setIsLoading(false);
      console.error(error);
    }
  };

  const renderContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete Product
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this Product? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonThird
            loading={isLoading}
            className="bg-red-500 text-white"
            onClick={handleSubmit}
          >
            Delete
          </ButtonThird>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
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
