"use client";
import Textarea from "@/shared/Textarea/Textarea";
import Select from "@/shared/Select/Select";
import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { avatarImgs, qrCode } from "@/contains/fakeData";
import ButtonThird from "@/shared/Button/ButtonThird";
import { addNFT } from "@/lib/queries";

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [NFTData, setNFTData] = useState({
    title: "",
    description: "",
    imageUrl: "" as any,
    source: "",
    price: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const [nestedKey, nestedName] = name.split(".");

    if (nestedName) {
      setNFTData((prevData: any) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedName]: value,
        },
      }));
    } else {
      setNFTData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const receipt = await addNFT(
      NFTData.title,
      NFTData.description,
      NFTData.imageUrl,
      NFTData.source,
      NFTData.price
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <h3 className="text-lg pb-5 font-semibold text-neutral-900 dark:text-neutral-200">
          Add NFT
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0  max-w-3xl space-y-6">
            <div>
              <Label>Title</Label>
              <Input
                className="mt-1.5"
                placeholder=""
                name="title"
                value={NFTData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                className="mt-1.5"
                type="number"
                name="price"
                value={NFTData.price}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Image Url</Label>
              <Input
                className="mt-1.5"
                type="text"
                name="imageUrl"
                value={NFTData.imageUrl}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Source</Label>
              <Select
                className="mt-1.5"
                name="source"
                onChange={handleInputChange}
              >
                <option value="">--- Select Source ---</option>
                <option value=" DALLE-2"> DALLE-2</option>
                <option value="Midjourney">Midjourney</option>
              </Select>
            </div>

            <div>
              <Label>Description </Label>
              <Textarea
                className="mt-1.5"
                placeholder=""
                name="description"
                value={NFTData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            type="button"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </ButtonPrimary>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
