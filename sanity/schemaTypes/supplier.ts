import { defineType, defineField } from "sanity";

export default defineType({
  name: "supplier",
  title: "Supplier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("A supplier name is required."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(500).warning("Keep the description concise."),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true,
          },
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
          validation: (Rule) =>
            Rule.required().error("Alternative text is required."),
        },
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required().error("An address is required."),
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) =>
            Rule.email().error("That is not a valid email address."),
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https", "mailto"], // Add 'mailto' if you want to include email addresses as valid URIs
            }).error("The URL must start with http:// or https://"),
        }),
      ],
    }),
    defineField({
      name: "isSupplier",
      title: "Is Supplier",
      type: "boolean",
      description: "Is this user a supplier?",
    }),
  ],
});
