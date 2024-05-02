import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export interface ModalCheckoutProps {
  show: boolean;
  onCloseModalCheckout: () => void;
}

const ModalCheckout: FC<ModalCheckoutProps> = ({
  show,
  onCloseModalCheckout,
}) => {
  const handleClickSubmitForm = () => {};

  const renderContent = () => {
    return (
      <div className="text-center">
        <h3 className="text-lg py-3 text-center font-semibold text-neutral-900 dark:text-neutral-200">
          Scan QR Code To Track Order
        </h3>
        <span className="mb-3">
          <QRCode
            size={50}
            style={{ height: "300", maxWidth: "100%", width: "100%" }}
            value={"http://localhost:3000/track-order"}
            viewBox={`0 0 50 50`}
          />
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={onCloseModalCheckout} type="submit">
            Close
          </ButtonPrimary>
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
      onCloseModal={onCloseModalCheckout}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalCheckout;
