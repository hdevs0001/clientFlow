"use client";

import { toast } from "sonner";
import getAllTheInvoiceData from "@/app/server/invoice/queries";
import { Filter, Send } from "lucide-react";
import { Button } from "./ui/button";
import { sendInvoice } from "@/app/server/invoice/invoiceemail";
import { useState, useTransition } from "react";

export default function Invoicerecenttable({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllTheInvoiceData>>["recentInvoices"];
}) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Recent Invoices
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No invoices yet
          </h3>

          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            Create your first invoice to start tracking payments, pending
            balances, and overdue invoices.
          </p>

          <button className="mt-6 inline-flex items-center justify-center gap-2 bg-[#2528D4] hover:bg-[#1D20B5] text-white text-sm font-medium px-4 py-2 rounded-xl">
            Create Invoice
          </button>
        </div>
      </div>
    );
  }

  const [sendingInvoiceId, setSendingInvoiceId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Recent Invoices</h2>

        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile */}
      <div className="block md:hidden divide-y divide-slate-100">
        {data.map((row) => {
          const isOverdue =
            row.status === "UNPAID" && new Date(row.dueDate) < new Date();

          const displayStatus =
            row.status === "PAID" ? "Paid" : isOverdue ? "Overdue" : "Pending";

          return (
            <div
              key={row.id}
              className={`p-4 space-y-2.5 transition-colors ${
                isOverdue ? "bg-red-50/10" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isOverdue ? "text-red-600" : "text-slate-500"
                  }`}
                >
                  {row.id}
                </span>

                {displayStatus === "Paid" && (
                  <span className="inline-flex px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Paid
                  </span>
                )}

                {displayStatus === "Pending" && (
                  <span className="inline-flex px-2 py-0.5 text-[11px] font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Pending
                  </span>
                )}

                {displayStatus === "Overdue" && (
                  <span className="inline-flex px-2 py-0.5 text-[11px] font-bold rounded-full bg-red-50 text-red-700 border border-red-100">
                    Overdue
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {row.clientName}
                </h4>

                <p className="text-xs text-slate-400 font-normal">
                  {row.projectName}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-slate-500">
                  <span className="text-slate-400">Due:</span>{" "}
                  {new Date(row.dueDate).toLocaleDateString("en-IN")}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold ${
                      isOverdue ? "text-red-600" : "text-slate-900"
                    }`}
                  >
                    ₹{row.amount.toLocaleString()}
                  </span>

                  <Button
                    disabled={isPending && sendingInvoiceId === row.id}
                    onClick={() => {
                      setSendingInvoiceId(row.id);

                      startTransition(async () => {
                        const loadingToast =
                          toast.loading("Sending invoice...");

                        try {
                          await sendInvoice(row.id);

                          toast.success("Invoice sent successfully", {
                            id: loadingToast,
                          });
                        } catch (error) {
                          toast.error("Failed to send invoice", {
                            id: loadingToast,
                          });
                        } finally {
                          setSendingInvoiceId(null);
                        }
                      });
                    }}
                  >
                    {isPending && sendingInvoiceId === row.id ? (
                      "Sending..."
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              <th className="py-3 px-5">ID</th>
              <th className="py-3 px-5">Client</th>
              <th className="py-3 px-5">Project</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Due Date</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm font-medium divide-y divide-slate-100/70">
            {data.map((row) => {
              const isOverdue =
                row.status === "UNPAID" && new Date(row.dueDate) < new Date();

              const displayStatus =
                row.status === "PAID"
                  ? "Paid"
                  : isOverdue
                    ? "Overdue"
                    : "Pending";

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50/40 transition-colors ${
                    isOverdue ? "bg-red-50/20" : ""
                  }`}
                >
                  <td
                    className={`py-4 px-5 font-semibold ${
                      isOverdue ? "text-red-600" : "text-slate-600"
                    }`}
                  >
                    {row.id}
                  </td>

                  <td className="py-4 px-5 text-slate-900">{row.clientName}</td>

                  <td className="py-4 px-5 text-slate-500 font-normal">
                    {row.projectName}
                  </td>

                  <td
                    className={`py-4 px-5 font-semibold ${
                      isOverdue ? "text-red-600" : "text-slate-900"
                    }`}
                  >
                    ₹{row.amount.toLocaleString()}
                  </td>

                  <td
                    className={`py-4 px-5 font-normal ${
                      isOverdue ? "text-red-600" : "text-slate-500"
                    }`}
                  >
                    {new Date(row.dueDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="py-4 px-5">
                    {displayStatus === "Paid" && (
                      <span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Paid
                      </span>
                    )}

                    {displayStatus === "Pending" && (
                      <span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Pending
                      </span>
                    )}

                    {displayStatus === "Overdue" && (
                      <span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-full bg-red-50 text-red-700 border border-red-100">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <Button
                      disabled={isPending && sendingInvoiceId === row.id}
                      onClick={() => {
                        setSendingInvoiceId(row.id);

                        startTransition(async () => {
                          const loadingToast =
                            toast.loading("Sending invoice...");

                          try {
                            await sendInvoice(row.id);

                            toast.success("Invoice sent successfully", {
                              id: loadingToast,
                            });
                          } catch (error) {
                            toast.error("Failed to send invoice", {
                              id: loadingToast,
                            });
                          } finally {
                            setSendingInvoiceId(null);
                          }
                        });
                      }}
                    >
                      {isPending && sendingInvoiceId === row.id ? (
                        "Sending..."
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
