import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export interface ModalApproveOrderProps {
  show: boolean;
  onCloseModalDelete?: () => void;
}

const ModalApproveOrder: FC<ModalApproveOrderProps> = ({
  show,
  onCloseModalDelete,
}) => {
  const { open } = useWeb3Modal();

  const handleClickSubmitForm = () => {};

  const renderContent = () => {
    return (
      <>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Not Connected or Mismatch Address
        </h3>
        <span className="text-sm">
          To Approve an order , You will have to be authenticated
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={() => open()} type="submit">
            Connect Here
          </ButtonPrimary>
        </div>
      </>
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

export default ModalApproveOrder;
