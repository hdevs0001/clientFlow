import getAllTheInvoiceData from "@/app/server/invoice/queries";
import {
  Plus,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
interface StatCard {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  iconColor: string;
  textColor?: string;
}

export default function Invoicestasdata({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllTheInvoiceData>>;
}) {
  const statsData: StatCard[] = [
    {
      title: "Total Revenue (YTD)",
      value: data.totalRevenue,
      subtext: "INR",
      icon: <DollarSign className="w-4 h-4 text-indigo-600" />,
      iconColor: "bg-indigo-50 border-indigo-100",
    },
    {
      title: "Paid ",
      value: data.invoiceCountPaid,
      subtext: " Invoices",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      iconColor: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "Pending",
      value: data.pendingRevenue,
      subtext: `${data.invoiceCountPending} Invoices awaiting payment`,
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      iconColor: "bg-amber-50 border-amber-100",
    },
    {
      title: "Overdue",
      value: data.overdueRevenue,
      subtext: `${data.invoiceCountOverdue} Invoices past due`,
      icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
      iconColor: "bg-red-50 border-red-100",
      textColor: "text-red-600",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, i) => (
        <div
          key={i}
          className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-500 tracking-tight">
              {stat.title}
            </span>
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center ${stat.iconColor}`}
            >
              {stat.icon}
            </div>
          </div>
          <div>
            <span
              className={`text-2xl font-bold tracking-tight ${stat.textColor || "text-slate-900"}`}
            >
              {stat.value}
            </span>
            <p
              className={`text-xs mt-1 font-medium ${stat.textColor ? "text-red-500/90" : "text-slate-400"}`}
            >
              {stat.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
