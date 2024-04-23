import { defineType, defineField } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("A valid email is required."),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "about",
      title: "About",
      type: "string",
    }),
    defineField({
      name: "ethereumAddress",
      title: "Ethereum Address",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^0x[a-fA-F0-9]{40}$/, {
          name: "ethereum address",
        }).error(
          "The Ethereum address must start with 0x followed by 40 hexadecimal characters."
        ),
    }),
    defineField({
      name: "orderHistory",
      title: "Order History",
      type: "array",
      of: [{ type: "reference", to: { type: "order" } }],
      description: "The history of orders made by the user.",
    }),
    defineField({
      name: "wishlist",
      title: "Wishlist",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
      description: "A list of products the user wishes to purchase.",
    }),
    defineField({
      name: "cart",
      title: "Cart",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
      description: "Current products in the user’s shopping cart.",
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({
          name: "street",
          title: "Street",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          title: "State / Province / Region",
          type: "string",
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
        }),
      ],
      options: {
        collapsible: true, // Makes the object field collapsible in the studio for better UX
        collapsed: false, // Defaults to open (false) or closed (true)
      },
    }),
    defineField({
      name: "isSupplier",
      title: "Is Supplier",
      description: "Check if the user is also a supplier",
      type: "boolean",
    }),
    defineField({
      name: "supplierName",
      title: "Supplier Name",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
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
              scheme: ["http", "https"],
            }).error("The URL must start with http:// or https://"),
        }),
      ],
    }),
  ],
});
