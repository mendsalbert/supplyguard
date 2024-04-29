import { Resend } from "resend";
import * as React from "react";

const resend = new Resend("re_FdoHGMrF_H7rzYBvDY7CiW27Tx9ZEWRLx");

export async function POST(request: any) {
  try {
    const requestBody = await request.json();
    const { to, subject, html } = requestBody;

    const { data, error } = await resend.emails.send({
      from: "supplyguard@supplyguard.xyz",
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
