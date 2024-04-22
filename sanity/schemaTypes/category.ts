import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("A title is required."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(200).warning("Shorter descriptions are usually better."),
    }),
    // Add more fields here if you need to
  ],
});
