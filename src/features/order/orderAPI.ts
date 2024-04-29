import { client } from "@/api/client";
import { Resend } from "resend";
var QRCode = require("qrcode");

const resend = new Resend("re_FdoHGMrF_H7rzYBvDY7CiW27Tx9ZEWRLx");

const fetchProductDetails = async (productId: any) => {
  const query = `*[_type == "product" && _id == $productId]`;
  return await client.fetch(query, { productId });
};

// Helper to fetch supplier roles based on Ethereum address
const fetchSupplierRoles = async (ethereumAddress: any) => {
  const query = `*[_type == "supplierRole" && ethaddress == $ethereumAddress]`;
  return await client.fetch(query, { ethereumAddress });
};

// Function to fetch a specific order by ID
export const fetchOrder = async (orderId: any) => {
  const query = `*[_type == "order" && ethereumAddress == $orderId][0]{
    _id,
    _type,
    orderNumber,
    status,
    ethereumAddress,
    user->{
      _id,
      name,
      ethereumAddress
    },
    roleApprovals,
    items[] {
      quantity,
      roles,
      product->{
        _id,
        name,
        description,
        price,
        image ,
        supplier,
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
const initRoleApprovals = (items: any) => {
  return items.map((item: any) => ({
    roles: item.roles.map((role: any) => ({
      role: role._id,
      approved: false,
      approvedAt: null,
    })),
  }));
};

// Send an email to the next role for approval
const sendApprovalRequestEmail = async (role: any) => {
  try {
    const requestBody = {
      from: "supplyguard@supplyguard.xyz",
      to: "mendsalbert@gmail.com",
      subject: "Approve this ",
      html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Join Alan on Vercel<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;padding-left:0.5rem;padding-right:0.5rem">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:465px;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td><img alt="Vercel" height="37" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto" width="40" /></td>
                </tr>
              </tbody>
            </table>
            <h1 class="" style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px">Join <strong>Enigma</strong> on <strong>Vercel</strong></h1>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello <!-- -->alanturing<!-- -->,</p>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)"><strong>Alan</strong> (<a href="mailto:alan.turing@example.com" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" target="_blank">alan.turing@example.com</a>) has invited you to the <strong>Enigma</strong> team on<!-- --> <strong>Vercel</strong>.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="right" data-id="__react-email-column"><img height="64" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-user.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:9999px" width="64" /></td>
                          <td align="center" data-id="__react-email-column"><img alt="invited you to" height="9" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-arrow.png" style="display:block;outline:none;border:none;text-decoration:none" width="12" /></td>
                          <td align="left" data-id="__react-email-column"><img height="64" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/vercel-team.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:9999px" width="64" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
              <tbody>
                <tr>
                  <td><a href="https://vercel.com/teams/invite/foo" style="background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Join the team</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">or copy and paste this URL into your browser:<!-- --> <a href="https://vercel.com/teams/invite/foo" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" target="_blank">https://vercel.com/teams/invite/foo</a></p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px" />
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(102,102,102)">This invitation was intended for<!-- --> <span style="color:rgb(0,0,0)">alanturing</span>. This invite was sent from <span style="color:rgb(0,0,0)">204.13.186.218</span> <!-- -->located in<!-- --> <span style="color:rgb(0,0,0)">São Paulo, Brazil</span>. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account&#x27;s safety, please reply to this email to get in touch with us.</p>
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

const sendUserOrderEmail = async (email: any, orderDetails: any) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(
      "http://localhost:3000/track-order"
    );

    const requestBody = {
      from: "supplyguard@supplyguard.xyz",
      to: "mendsalbert@gmail.com",
      subject: "Test Email",
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
              productDetail.smartContractAddress
            );
            return {
              product: item.product,
              quantity: item.quantity,
              roles: supplierRoles,
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
      roleApprovals: initRoleApprovals(flatProductsWithRoles),
    };
    const createdOrder = await client.create({
      _type: "order",
      ...newOrder,
    });

    // await sendUserOrderEmail(email, orderDetails);
    if (
      flatProductsWithRoles.length > 0 &&
      flatProductsWithRoles[0].roles.length > 0
    ) {
      // await sendApprovalRequestEmail(flatProductsWithRoles[0].roles[0]);
    }

    return createdOrder;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw new Error("Failed to add order");
  }
};

// API to fetch orders by user Ethereum address
export const fetchOrdersByUser = async (ethereumAddress: any) => {
  const query = `*[_type == "order" && user.ethereumAddress == $ethereumAddress]`;
  try {
    return await client.fetch(query, { ethereumAddress });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

// API to update role approval
export const updateRoleApproval = async (
  orderId: any,
  roleAddress: any,
  approvalStatus: any
) => {
  try {
    const order = await fetchOrder(orderId);
    const currentRoleIndex = order.roleApprovals.findIndex(
      (r: any) => r.role._ref === roleAddress
    );

    const allPreviousApproved = order.roleApprovals
      .slice(0, currentRoleIndex)
      .every((r: any) => r.approved);
    if (!allPreviousApproved) {
      throw new Error("Previous roles have not completed their approvals.");
    }

    await client
      .patch(orderId)
      .set({
        [`roleApprovals[${currentRoleIndex}].approved`]: approvalStatus,
        [`roleApprovals[${currentRoleIndex}].approvedAt`]:
          new Date().toISOString(),
      })
      .commit();

    const nextRoleIndex = currentRoleIndex + 1;
    if (order.roleApprovals[nextRoleIndex]) {
      sendApprovalRequestEmail(order.roleApprovals[nextRoleIndex].role._ref);
    }

    return await fetchOrder(orderId);
  } catch (error) {
    console.error("Failed to update role approval:", error);
    throw new Error("Failed to update role approval");
  }
};
