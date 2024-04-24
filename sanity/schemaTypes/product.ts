import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price in USD",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "supplier",
      title: "Supplier",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "smartContractAddress",
      title: "Smart Contract Address",
      type: "string",
      description: "Ethereum address for the product’s smart contract",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
    }),
    defineField({
      name: "inventoryQuantity",
      title: "Inventory Quantity",
      type: "number",
    }),
  ],
});
