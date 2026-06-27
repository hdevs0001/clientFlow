import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "../invoicesPDF";

export async function generateInvoicePdf(invoiceData: any): Promise<Buffer> {
  const stream = await pdf(
    <InvoicePDF data={invoiceData} />
  ).toBuffer();

  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk)
    );
  }

  return Buffer.concat(chunks);
}