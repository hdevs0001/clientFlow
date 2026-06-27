import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvoiceEmail(
  email: string,
  pdfBuffer: Buffer,
  invoiceNumber: string,
) {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",

    to: "hdevs0001@gmail.com",

    subject: `Invoice ${invoiceNumber}`,

    html: `
      <h2>Invoice Attached</h2>
      <p>Please find your invoice attached.</p>
    `,

    attachments: [
      {
        filename: `${invoiceNumber}.pdf`,
        content: pdfBuffer.toString("base64"),
      },
    ],
  });
  console.log(JSON.stringify(result, null, 2));
}
