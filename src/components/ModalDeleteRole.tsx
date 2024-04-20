import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonThird from "@/shared/Button/ButtonThird";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
}

const ModalRoleDelete: FC<ModalDeleteProps> = ({
  show,
  onCloseModalDelete,
}) => {
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Revoke Role(Name of person)
        </h3>
        <span className="text-sm">
          Are you sure you want to revoke this Role? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonThird
            className="bg-red-500 text-white"
            onClick={handleClickSubmitForm}
            type="submit"
          >
            Revoke
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

export default ModalRoleDelete;
