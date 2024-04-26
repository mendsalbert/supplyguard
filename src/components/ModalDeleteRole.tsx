"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonThird from "@/shared/Button/ButtonThird";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { removeRole } from "@/features/role/roleSlice";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
  roleId?: any;
}

const ModalRoleDelete: FC<ModalDeleteProps> = ({
  show,
  onCloseModalDelete,
  roleId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const deletedRole = await dispatch(removeRole(roleId)).unwrap();

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
          Revoke Role
        </h3>
        <span className="text-sm">
          Are you sure you want to revoke this Role? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonThird
            loading={isLoading}
            className="bg-red-500 text-white"
            onClick={handleSubmit}
            type="submit"
          >
            Revoke
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

export default ModalRoleDelete;
