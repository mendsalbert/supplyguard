import { client } from "@/api/client";
import { Resend } from "resend";
var QRCode = require("qrcode");

const resend = new Resend("re_FdoHGMrF_H7rzYBvDY7CiW27Tx9ZEWRLx");
const roleResponsibilitiesOrder = [
  "SupplierManager",
  "ProductOverseer",
  "QualityInspector",
  "InventoryController",
  "LogisticsCoordinations",
  "FulfillmentOperator",
];

const sortRolesByResponsibilities = (roles: any) => {
  return roles.sort((a: any, b: any) => {
    return (
      roleResponsibilitiesOrder.indexOf(a.role.responsibilities) -
      roleResponsibilitiesOrder.indexOf(b.role.responsibilities)
    );
  });
};

const fetchProductDetails = async (productId: any) => {
  const query = `*[_type == "product" && _id == $productId]`;
  return await client.fetch(query, { productId });
};

// Helper to fetch supplier roles based on Ethereum address
const fetchSupplierRoles = async (ethereumAddress: any) => {
  const query = `*[_type == "supplierRole" && supplier._ref == $ethereumAddress]`;
  return await client.fetch(query, { ethereumAddress });
};

export const fetchOrder = async (orderId: any) => {
  const query = `*[_type == "order" && ethereumAddress == $orderId]{
   ...,
    user->{
      _id,
      name,
      ethereumAddress
    },
    roleApprovals[]{
      ...,
      role->{
        ...,
        supplier->{
         ...,
         profilePicture
        }
      }
     },
    items[] {
      quantity,
      roles,
      productId,
      product->{
        _id,
        name,
        description,
        price,
        image ,
        supplier->{
          supplierName
        },
        category->{
          ...,
        }
      }
    }
  }`;
  try {
    const order = await client.fetch(query, { orderId });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw new Error("Failed to fetch order");
  }
};
// Function to fetch a specific order by ID
export const fetchOrderD = async (orderId: any) => {
  const query = `*[_type == "order" && orderNumber == $orderId]{
   ...,
    user->{
      _id,
      name,
      ethereumAddress
    },
    roleApprovals[]{
      role->{
        ...,
        supplier->{
         ...,
         profilePicture
        }
      }
     },
    items[] {
      quantity,
      roles,
      productId,
      product->{
        _id,
        name,
        description,
        price,
        image ,
        supplier->{
          supplierName
        },
        category
        
      }
    }
  }`;
  try {
    const order = await client.fetch(query, { orderId });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw new Error("Failed to fetch order");
  }
};

// Initialize role approvals with the first role set to active
// const initRoleApprovals = (items: any) => {
//    items.map((item: any) => ({
//     roles: item.roles.map((role: any) => ({
//       role: role._id,
//       approved: false,
//       approvedAt: null,
//     })),
//   }));
// };

// const initRoleApprovals = (items: any) => {
//   return items.flatMap((item: any) =>
//     item.roles.map((role: any) => ({
//       role: role._id,
//       approved: false,
//       approvedAt: null,
//     }))
//   );
// };

const initRoleApprovals = (items: any) => {
  return items.flatMap((item: any) =>
    item.roles.map((role: any) => ({
      role: {
        _type: "reference",
        _ref: role._id,
      },
      approved: false,
      approvedAt: null,
      productId: item.productId, // Ensure this is correct; productId needs to be a property on item
    }))
  );
};

const sendApprovalRequestEmail = async (role: any, createdOrder: any) => {
  let orderNumner = createdOrder.orderNumber;
  let orderDate = createdOrder.orderDate;

  role.map(async (r: any) => {
    await Promise.all(
      r.roles.map(async (rr: any) => {
        if (rr.responsibilities === "SupplierManager") {
          const qrCodeDataURL = await QRCode.toDataURL(
            `http://localhost:3000/approve-order/${orderNumner}/${r.supplierAddress}/${r.productId}/${rr.ethaddress}/${rr.responsibilities}/${rr.fullname}`
          );

          const requestBody = {
            from: "supplyguard@supplyguard.xyz",
            to: rr.email,
            subject: `${"Approve Order - "}${orderNumner}`,
            html: `
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html dir="ltr" lang="en">
          
                <head>
                  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                </head>
                <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Get your order summary, estimated delivery date and more<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
                </div>
          
                <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
                    <tbody>
                      <tr style="width:100%">
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
                            <tbody>
                              <tr>
                                <td>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td data-id="__react-email-column">
                                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Aprove Order </p>
                                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderNumner}</p>
                                        </td>
                                        <td align="right" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank" href=${`http://localhost:3000/approve-order/${orderNumner}/${r.supplierAddress}/${r.productId}/${rr.ethaddress}/${rr.responsibilities}/${rr.fullname}`}>View Order</a></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
                            <tbody>
                              <tr>
                                <td>
                                <img alt="Nike" height="150" width="150" src="${qrCodeDataURL}" style="display:block;outline:none;border:none;text-decoration:none;margin:auto"  />
                                <img alt="Nike" height="120" width="120"  src="https://i.postimg.cc/KvCHFcgx/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" />
                                  <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">Open and Verify this Order.</h1>
                                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500"> Use the link above to view its progress or simply Scan the QR code.</p>
                                
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                         
                         
                          
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
                            <tbody>
                              <tr>
                                <td>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td data-id="__react-email-column" style="width:170px">
                                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderNumner}</p>
                                        </td>
                                        <td data-id="__react-email-column">
                                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderDate}</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
                            <tbody>
                              <tr>
                                <td>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
                                        <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>
                                        
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        
                                        <td colSpan="2" data-id="__react-email-column" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td data-id="__react-email-column">
                                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                            <tbody style="width:100%">
                                              <tr style="width:100%">
                                                <td data-id="__react-email-column" style="width:16px"><img height="26px" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/nike-phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
                                                <td data-id="__react-email-column">
                                                  <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td data-id="__react-email-column">
                                          <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm GMT</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                            <tbody>
                              <tr>
                                <td>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Supplyguard.xyz</p>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Clothing</a></td>
                                        <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Sport Equipment</a></td>
                                        <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Pharmaceuticals</a></td>
                                        
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                            <tbody>
                              <tr>
                                <td>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td data-id="__react-email-column">
                                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
                                        </td>
                                        <td data-id="__react-email-column">
                                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2024 Supplyguard, Inc. All Rights Reserved.</p>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">SUPPLYGUARD, INC. Worldwide</p>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </body>
          
              </html>     
        `,
          };

          const response = await fetch("/api/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
        }
      })
    );
  });
};

const sendApprovalRequestEmailToNextPerson = async (
  roles: any,
  createdOrder: any
) => {
  let orderNumner = createdOrder.orderNumber;
  let orderDate = createdOrder.orderDate;

  const uniqueProductIds = [
    ...new Set(roles.map((role: any) => role.productId)),
  ];

  uniqueProductIds.forEach((productId) => {
    const rolesForProduct = roles.filter(
      (role: any) => role.productId === productId
    );

    const sortedRoles = sortRolesByResponsibilities(rolesForProduct);

    const currentRoleIndex = sortedRoles.findIndex((r: any) => !r.approved);

    if (currentRoleIndex > 0) {
      const previousRole = sortedRoles[currentRoleIndex - 1];
      if (previousRole && previousRole.approved) {
        const nextRole = sortedRoles[currentRoleIndex];

        if (nextRole) {
          const qrCodeDataURL = QRCode.toDataURL(
            `http://localhost:3000/approve-order/${orderNumner}/${nextRole.role.supplier.supplierAddress}/${nextRole.productId}/${nextRole.role.ethaddress}/${nextRole.role.responsibilities}/${nextRole.role.fullname}`
          ).then((qrCodeDataURL: any) => {
            const requestBody = {
              from: "supplyguard@supplyguard.xyz",
              to: nextRole.role.email,
              subject: `${"Approve Order - "}${orderNumner}`,
              html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html dir="ltr" lang="en">

                  <head>
                    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                  </head>
                  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Get your order summary, estimated delivery date and more<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
                  </div>

                  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
                      <tbody>
                        <tr style="width:100%">
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
                              <tbody>
                                <tr>
                                  <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td data-id="__react-email-column">
                                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Aprove Order </p>
                                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderNumner}</p>
                                          </td>
                                          <td align="right" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank" href=${`http://localhost:3000/approve-order/${orderNumner}/${nextRole.role.supplier.ethereumAddress}/${nextRole.productId}/${nextRole.role.ethaddress}/${nextRole.role.responsibilities}/${nextRole.role.fullname}`}>View Order</a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
                              <tbody>
                                <tr>
                                  <td>
                                  <img alt="Nike" height="150" width="150" src="${qrCodeDataURL}" style="display:block;outline:none;border:none;text-decoration:none;margin:auto"  />
                                  <img alt="Nike" height="120" width="120"  src="https://i.postimg.cc/KvCHFcgx/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" />
                                    <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">Open and Verify this Order.</h1>
                                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500"> Use the link above to view its progress or simply Scan the QR code.</p>

                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />

                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
                              <tbody>
                                <tr>
                                  <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td data-id="__react-email-column" style="width:170px">
                                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderNumner}</p>
                                          </td>
                                          <td data-id="__react-email-column">
                                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderDate}</p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">

                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />

                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
                              <tbody>
                                <tr>
                                  <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
                                          <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>

                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">

                                          <td colSpan="2" data-id="__react-email-column" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td data-id="__react-email-column">
                                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                              <tbody style="width:100%">
                                                <tr style="width:100%">
                                                  <td data-id="__react-email-column" style="width:16px"><img height="26px" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/nike-phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
                                                  <td data-id="__react-email-column">
                                                    <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td data-id="__react-email-column">
                                            <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm GMT</p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                              <tbody>
                                <tr>
                                  <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Supplyguard.xyz</p>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Clothing</a></td>
                                          <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Sport Equipment</a></td>
                                          <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Pharmaceuticals</a></td>

                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                              <tbody>
                                <tr>
                                  <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td data-id="__react-email-column">
                                            <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
                                          </td>
                                          <td data-id="__react-email-column">
                                            <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2024 Supplyguard, Inc. All Rights Reserved.</p>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">SUPPLYGUARD, INC. Worldwide</p>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </body>

                </html>
          `,
            };

            fetch("/api/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }).then((res) => {
              console.log(res);
            });
          });

          console.log(
            `Sending email to ${nextRole.role.responsibilities} for product ${productId}`,
            nextRole.role.email,
            nextRole
          );
        }
      }
    } else if (currentRoleIndex === 0) {
      const firstRole = sortedRoles[0];
      if (firstRole) {
        console.log(
          `Sending initial email to ${firstRole.role.responsibilities} for product ${productId}`,
          firstRole.role.email
        );
      }
    } else {
      console.log(
        `All roles have approved for product ${productId} or no roles pending approval.`
      );
    }
  });
};

const sendUserOrderEmail = async (email: any, orderDetails: any) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(
      "http://localhost:3000/track-order"
    );

    const requestBody = {
      from: "supplyguard@supplyguard.xyz",
      to: "mendsalbert@gmail.com",
      subject: "It's On Its Way",
      html: `

      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">

        <head>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Get your order summary, estimated delivery date and more<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>

        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
            <tbody>
              <tr style="width:100%">
                <td>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column">
                                  <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Tracking Number</p>
                                  <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">
                                  ${orderDetails.orderNumber}</p>
                                </td>
                                <td align="right" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank" href="http://localhost:3000/track-order">Track Package</a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
                    <tbody>
                      <tr>
                        <td>
                        <img alt="Nike" height="150" width="150" src="${qrCodeDataURL}" style="display:block;outline:none;border:none;text-decoration:none;margin:auto"  />
                        <img alt="Nike" height="120" width="120"  src="https://i.postimg.cc/KvCHFcgx/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" />
                          <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">It&#x27;s On Its Way.</h1>
                          <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">You order&#x27;s is on its way. Use the link above to track its progress or simply Scan the QR code.</p>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />

                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column" style="width:170px">
                                  <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                                  <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">
                                  ${orderDetails.orderNumber}
                                 </p>
                                </td>
                                <td data-id="__react-email-column">
                                  <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                                  <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${new Date().toISOString()}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td align="center" data-id="__react-email-column"><a href='http://localhost:3000/track-order' style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Order Status</a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />

                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
                                <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>

                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
                            <tbody style="width:100%">
                              <tr style="width:100%">

                                <td colSpan="2" data-id="__react-email-column" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
                              </tr>
                            </tbody>
                          </table>
                          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column">
                                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                    <tbody style="width:100%">
                                      <tr style="width:100%">
                                        <td data-id="__react-email-column" style="width:16px"><img height="26px" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/nike-phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
                                        <td data-id="__react-email-column">
                                          <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td data-id="__react-email-column">
                                  <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm GMT</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Supplyguard.xyz</p>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Clothing</a></td>
                                <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Sport Equipment</a></td>
                                <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Pharmaceuticals</a></td>

                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column">
                                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
                                </td>
                                <td data-id="__react-email-column">
                                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2024 Supplyguard, Inc. All Rights Reserved.</p>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">SUPPLYGUARD, INC. Worldwide</p>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>

      </html>
          `,
    };
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error(error);
  }
};

export const addOrder = async (orderDetails: any, email: any) => {
  try {
    // Map over each item to get details and associate the supplier roles
    const productsWithRoles = await Promise.all(
      orderDetails.items.map(async (item: any) => {
        const productDetails = await fetchProductDetails(item.product._ref);
        return await Promise.all(
          productDetails.map(async (productDetail: any) => {
            const supplierRoles = await fetchSupplierRoles(
              productDetail.supplier._ref
            );

            return {
              product: item.product,
              quantity: item.quantity,
              roles: supplierRoles,
              productId: item.productId,
              supplierAddress: item.supplierAddress,
            };
          })
        );
      })
    );

    const flatProductsWithRoles = productsWithRoles.flat();
    const newOrder = {
      ...orderDetails,
      items: flatProductsWithRoles,
      status: "pending",
      orderDate: new Date().toISOString(),
      roleApprovals: initRoleApprovals(flatProductsWithRoles),
    };
    const createdOrder = await client.create({
      _type: "order",
      ...newOrder,
    });

    await sendUserOrderEmail(email, orderDetails);
    if (flatProductsWithRoles.length > 0) {
      await sendApprovalRequestEmail(flatProductsWithRoles, createdOrder);
    }

    return createdOrder;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw new Error("Failed to add order");
  }
};

// API to fetch orders by user Ethereum address
export const fetchOrdersByUser = async (ethereumAddress: any) => {
  const query = `*[_type == "order" && user.ethereumAddress == $ethereumAddress]{
    ...,
  user->{
    _id,
    name,
    ethereumAddress
  },
  roleApprovals[]{
    ...,
    role->{
      ...,
      supplier->{
       ...,
       profilePicture
      }
    }
   },
  items[] {
    quantity,
    roles,
    productId,
    product->{
      _id,
      name,
      description,
      price,
      image ,
      supplier->{
        supplierName
      },
      category
      
    }
  }
  }`;
  try {
    return await client.fetch(query, { ethereumAddress });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

// API to update role approval
// to approve a role, you need specific order id , supplier-address, approval-status, product id
export const updateRoleApproval = async (
  orderId: any,
  roleAddress: any,
  approvalStatus: any,
  documentId: any
) => {
  try {
    // const order = await fetchOrder(orderId);

    const order = await client
      .fetch(
        `*[_id == $documentId]{
        ...,
         user->{
           _id,
           name,
           ethereumAddress
         },
         roleApprovals[]{
           ...,
           role->{
             ...,
             supplier->{
              ...,
              profilePicture
             }
           }
          },
         items[] {
           quantity,
           roles,
           productId,
           product->{
             _id,
             name,
             description,
             price,
             image ,
             supplier->{
               supplierName
             },
             category
             
           }
         }
       }`,
        { documentId }
      )
      .then((res) => res[0]);

    const currentRoleIndex = order.roleApprovals.findIndex(
      (r: any) => r.role.ethaddress === roleAddress
    );

    // const currentRoleIndex = order.findIndex((orderItem: any) =>
    //   orderItem.roleApprovals.some(
    //     (approval: any) => approval.role.ethaddress === roleAddress
    //   )
    // );

    // console.log(currentRoleIndex);

    // const allPreviousApproved = order.roleApprovals
    //   .slice(0, currentRoleIndex)
    //   .every((r: any) => r.approved);

    // if (!allPreviousApproved) {
    //   throw new Error("Previous roles have not completed their approvals.");
    // }

    // if (
    //   !order ||
    //   !order.roleApprovals ||
    //   order.roleApprovals.length <= currentRoleIndex
    // ) {
    //   throw new Error(
    //     "Role approval data is invalid or the index is out of bounds."
    //   );
    // }
    // console.log(document);

    let updatedRole = await client
      .patch(documentId)
      .set({
        [`roleApprovals[${currentRoleIndex}].approved`]: approvalStatus,
        [`roleApprovals[${currentRoleIndex}].approvedAt`]:
          new Date().toISOString(),
      })
      .commit();

    const orderOfUpdatedRoles = await client
      .fetch(
        `*[_id == $documentId]{
        ...,
         user->{
           _id,
           name,
           ethereumAddress
         },
         roleApprovals[]{
           ...,
           role->{
             ...,
             supplier->{
              ...,
              profilePicture
             }
           }
          },
         items[] {
           quantity,
           roles,
           productId,
           product->{
             _id,
             name,
             description,
             price,
             image ,
             supplier->{
               supplierName
             },
             category
             
           }
         }
       }`,
        { documentId }
      )
      .then((res) => res[0]);

    const nextRoleIndex = currentRoleIndex + 1;

    if (order.roleApprovals[nextRoleIndex]) {
      sendApprovalRequestEmailToNextPerson(
        orderOfUpdatedRoles.roleApprovals,
        order
      );
    }

    return await fetchOrderD(documentId);
  } catch (error) {
    console.error("Failed to update role approval:", error);
    throw new Error("Failed to update role approval");
  }
};

// Fetches all orders from the database
export const fetchAllOrders = async () => {
  try {
    const query = `*[_type == "order"]{
      ...,
    user->{
      _id,
      name,
      ethereumAddress
    },
    roleApprovals[]{
      ...,
      role->{
        ...,
        supplier->{
         ...,
         profilePicture
        }
      }
     },
    items[] {
      quantity,
      roles,
      productId,
      product->{
        _id,
        name,
        description,
        price,
        image ,
        supplier->{
          supplierName
        },
        category->{
         ...,
        }
      }
    }
    }`;
    const orders = await client.fetch(query);
    return orders;
  } catch (error) {
    console.error("Failed to fetch all orders:", error);
    throw new Error("Failed to fetch all orders");
  }
};

export const getOrdersToBeApprovedByRole = async (
  supplierAddress: any,
  roleAddress: any
) => {
  try {
    const query = `
      *[_type == "order" && ethereumAddress == $supplierAddress && roleApprovals[role.ethereumAddress == $roleAddress && !approved].length > 0]{
        ...,
        items[]->{
          product->{name, _id},
          quantity
        },
        roleApprovals[]{
          role->{name, ethereumAddress},
          approved,
          approvedAt
        }
      }
    `;

    const params = { supplierAddress, roleAddress };

    // Assume `client` is your configured client for querying the database.
    const orders = await client.fetch(query, params);
    return orders;
  } catch (error) {
    console.error("Failed to fetch orders for approval:", error);
    throw new Error("Failed to fetch orders for approval");
  }
};
