"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import NcModal from "@/shared/NcModal/NcModal";
import Label from "@/components/Label/Label";
import Textarea from "@/shared/Textarea/Textarea";
import Image from "next/image";
import { avatarImgs } from "@/contains/fakeData";
import Select from "@/shared/Select/Select";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchUserByAddress } from "@/features/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createRole,
  fetchRole,
  Role,
  selectCurrentRole,
  updateRole,
} from "@/features/role/roleSlice";
export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
  roleId?: any;
}

const ModalEditRole: FC<ModalEditProps> = ({
  show,
  onCloseModalEdit,
  roleId,
}) => {
  const textareaRef = useRef(null);
  const user = useAppSelector((state) => state.users.currentUser) as any;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentRole = useAppSelector(selectCurrentRole);

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
    dispatch(fetchRole(roleId));
  }, [dispatch, isLoading, roleId]);

  useEffect(() => {
    // Check if the user data is available before setting it
    if (currentRole) {
      setRoleData({
        fullname: currentRole.fullname || "",
        email: currentRole.email || "",
        ethaddress: currentRole.ethaddress || "",
        responsibilities: currentRole.responsibilities || "",
        noticeMessage: currentRole.noticeMessage || "",
        supplier: {
          _type: "reference",
          _ref: currentRole.supplier?._ref || "",
        },
      });
    }
  }, [currentRole]);

  const [roleData, setRoleData] = useState<Role>({
    fullname: "",
    email: "",
    ethaddress: "" as any,
    responsibilities: "",
    noticeMessage: "",
    supplier: {
      _type: "reference",
      _ref: "",
    },
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const [nestedKey, nestedName] = name.split(".");
    roleData_(value);

    if (nestedName) {
      setRoleData((prevData: any) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedName]: value,
        },
      }));
    } else {
      setRoleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const id = toast.loading("Updating...");
    setIsLoading(true);

    try {
      const onAddRole = await dispatch(
        updateRole({ roleId, roleData })
      ).unwrap();

      toast.update(id, {
        render: "All is good :) Role Added!",
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

  const roleData_ = (e: any) => {
    setRoleData((prevData) => ({
      ...prevData,

      supplier: {
        _type: "reference",
        _ref: user?._id,
      },
    }));
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg pb-5 font-semibold text-neutral-900 dark:text-neutral-200">
          Edit Role
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0  max-w-3xl space-y-6">
            <div>
              <Label> Name</Label>
              <Input
                className="mt-1.5"
                placeholder="John Doe"
                name="fullname"
                value={roleData.fullname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label> Email</Label>
              <Input
                className="mt-1.5"
                placeholder="example@gmail.com"
                type="email"
                name="email"
                value={roleData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label> ETH Address</Label>
              <Input
                className="mt-1.5"
                placeholder="0x4fd...34f"
                name="ethaddress"
                value={roleData.ethaddress}
                onChange={handleInputChange}
              />
            </div>
            {/* <div>
              <Label> Image</Label>
              <Input className="mt-1.5" placeholder="0x4fd...34f" type="file" />
            </div> */}

            <div>
              <Label>Role</Label>
              <Select
                className="mt-1.5"
                name="responsibilities"
                value={roleData.responsibilities}
                onChange={handleInputChange}
              >
                <option value="">---Select Role--- </option>
                <option value="SupplierManager">Supplier Manager </option>
                <option value="ProductOverseer">Production Overseer</option>
                <option value="QualityInspector">Quality Inspector</option>
                <option value="InventoryController">
                  Inventory Controller
                </option>
                <option value="LogisticsCoordinations">
                  Logistics Coordinations
                </option>
                <option value="FulfillmentOperator">
                  Fulfillment Operator
                </option>
              </Select>
            </div>

            <div>
              <Label>Notice Message </Label>
              <Textarea
                className="mt-1.5"
                placeholder=""
                name="noticeMessage"
                value={roleData.noticeMessage}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            loading={isLoading}
            onClick={handleSubmit}
            type="submit"
          >
            Edit
          </ButtonPrimary>
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

export default ModalEditRole;
