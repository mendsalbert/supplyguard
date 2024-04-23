import { defineType, defineField } from "sanity";

export default defineType({
  name: "supplierUser",
  title: "Supplier User",
  type: "document",
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (Rule) => Rule.required().error("A username is required."),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Full name is required."),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("A valid email is required."),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "reference",
      to: [{ type: "supplierRole" }],
      description: "Assign a role to this user.",
    }),
    defineField({
      name: "supplier",
      title: "Supplier",
      type: "reference",
      to: [{ type: "user" }],
      description: "The supplier this user belongs to.",
    }),
    defineField({
      name: "ethereumAddress",
      title: "Ethereum Address",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^0x[a-fA-F0-9]{40}$/, {
          name: "ethereum address", // Providing a name for the regex pattern in error messages
        }).error(
          "The Ethereum address must start with 0x followed by 40 hexadecimal characters."
        ),
    }),
    // Optional authentication fields could be added here if necessary
  ],
});
