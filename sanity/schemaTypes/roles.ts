import { defineType, defineField } from "sanity";

export default defineType({
  name: "supplierRole",
  title: "Supplier Role",
  type: "document",
  fields: [
    defineField({
      name: "fullname",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "ethaddress",
      title: "Eth Address",
      type: "string",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "string",
      description: "List of responsibilities for this role.",
    }),
    defineField({
      name: "noticeMessage",
      title: "Notice Message",
      type: "text",
    }),

    defineField({
      name: "supplier",
      title: "Supplier",
      type: "reference",
      to: [{ type: "user" }],
    }),
  ],
});
