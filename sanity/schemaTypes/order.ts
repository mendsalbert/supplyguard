import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("An order number is required."),
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      description: "The user who placed the order.",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
      description: "Products included in the order.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio", // Display as radio buttons in the studio
      },
      validation: (Rule) => Rule.required().error("Order status is required."),
    }),
    defineField({
      name: "transactionHash",
      title: "Transaction Hash",
      type: "string",
      description: "The Ethereum transaction hash associated with this order.",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("The order creation date is required."),
    }),
    defineField({
      name: "shippedAt",
      title: "Shipped At",
      type: "datetime",
      description: "The date and time the order was shipped.",
    }),
    defineField({
      name: "deliveredAt",
      title: "Delivered At",
      type: "datetime",
      description: "The date and time the order was delivered.",
    }),
    defineField({
      name: "totalCost",
      title: "Total Cost",
      type: "number",
      description: "The total cost of the order in ETH.",
      validation: (Rule) =>
        Rule.required().min(0).error("Total cost must be a positive number."),
    }),
    // defineField({
    //   name: "assignedTo",
    //   title: "Assigned To",
    //   type: "reference",
    //   to: [{ type: "supplierRole" }],
    //   description: "Role responsible for handling the order.",
    // }),
    defineField({
      name: "roleApprovals",
      title: "Role Approvals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "role",
              title: "Role",
              type: "reference",
              to: [{ type: "supplierRole" }],
            }),
            defineField({
              name: "approved",
              title: "Approved",
              type: "boolean",
              initialValue: false,
              description: "Whether the role has approved the order.",
            }),
            defineField({
              name: "approvedAt",
              title: "Approved At",
              type: "datetime",
              description:
                "The date and time when the role approved the order.",
            }),
          ],
        },
      ],
      description: "Tracking approvals for each role assigned to the order.",
    }),
    // You may add additional fields such as shipping address, billing details, etc.
  ],
});
