import { defineType, defineField } from "sanity";

export default defineType({
  name: "supplierRole",
  title: "Supplier Role",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("A title for the role is required."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required().error("A description of the role is required."),
    }),
    // You can add additional fields like responsibilities, qualifications, etc.
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      description: "List of responsibilities for this role.",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("The creation date of the role is required."),
    }),
  ],
});
