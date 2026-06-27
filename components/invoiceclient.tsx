
import Headingcard from "./ui/headingcard";
import Invoicestasdata from "./invoicestasdata";
import Invoicerecenttable from "./invoicerecenttable";
import Invoiceform from "./invoiceform";
import getAllTheInvoiceData, {
  getAlltheClientsOfTheUser,
  getProjectsByClient,
} from "@/app/server/invoice/queries";

export default async function InvoicingDashboard() {
  const data = await getAllTheInvoiceData();
  const cleints = await getAlltheClientsOfTheUser();
  const cleintProject = await getProjectsByClient();
  return (
    <div className="min-h-screen  text-slate-900 font-sans antialiased p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* --- Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Headingcard
              title="Invoicing"
              description=" Manage billing, track payments, and generate new invoices."
            />
          </div>
        </div>

        {/* --- Stats Cards Grid --- */}
        <Invoicestasdata data={data} />

        {/* --- Recent Invoices Table --- */}
        <Invoicerecenttable data={data.recentInvoices} />

        {/* --- Create New Invoice Form Component --- */}
        <Invoiceform cleint={cleints} project={cleintProject} />
      </div>
    </div>
  );
}
