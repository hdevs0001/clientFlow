"use client";

import { createInvoice } from "@/app/server/invoice/action";
import {
  getAlltheClientsOfTheUser,
  getProjectsByClient,
} from "@/app/server/invoice/queries";
import { Calendar, ChevronDown, Plus, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Invoiceform({
  cleint,
  project,
}: {
  cleint: Awaited<ReturnType<typeof getAlltheClientsOfTheUser>>;
  project: Awaited<ReturnType<typeof getProjectsByClient>>;
}) {
  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      rate: 0,
    },
  ]);
  const [issueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [paymentTerms, setPaymentTerms] = useState("RECEIPT");

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        rate: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: "description" | "quantity" | "rate",
    value: string | number,
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );
  const total = subtotal;
  function handlePaymentTerms(value: string) {
    setPaymentTerms(value);

    const date = new Date(issueDate);

    switch (value) {
      case "NET15":
        date.setDate(date.getDate() + 15);
        break;

      case "NET30":
        date.setDate(date.getDate() + 30);
        break;

      case "RECEIPT":
        break;
    }

    setDueDate(date.toISOString().split("T")[0]);
  }
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const filteredProjects = project.filter(
    (project) => project.clientId === clientId,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      toast.error("Please select a client");
      return;
    }

    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    if (
      items.some(
        (item) =>
          !item.description.trim() || item.quantity <= 0 || item.rate <= 0,
      )
    ) {
      toast.error("Please complete all line items");
      return;
    }

    try {
      const result = await createInvoice({
        clientId,
        projectId,
        dueDate,
        items,
      });

      if (result.success) {
        toast.success(`Invoice ${result.invoiceNumber} created successfully`);

        setClientId("");
        setProjectId("");

        setItems([
          {
            description: "",
            quantity: 1,
            rate: 0,
          },
        ]);

        setPaymentTerms("RECEIPT");
        setDueDate(new Date().toISOString().split("T")[0]);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to create invoice");
    }
  };
  return (
    <div className="bg-white border-t-[3px] border-t-[#2528D4] border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Create New Invoice</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Fill out the details below to generate a professional invoice.
        </p>
      </div>

      <form className="p-4 sm:p-6 space-y-6" onSubmit={handleSubmit}>
        {/* Form Metas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-4">
            {/* Client Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Client
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={clientId}
                  onChange={(e) => {
                    setClientId(e.target.value);
                    setProjectId("");
                  }}
                  required
                >
                  <option value="">Select a client...</option>

                  {cleint.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
            {/* Project Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Project
              </label>
              <div className="relative">
                <select
                  className={`w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                    !clientId
                      ? "cursor-not-allowed bg-slate-100"
                      : "cursor-pointer"
                  }`}
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  disabled={!clientId}
                  required
                >
                  <option value="">
                    {clientId ? "Select a project..." : "Select client first"}
                  </option>
                  {filteredProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Form Metas Right Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Invoice Number
              </label>
              <input
                type="text"
                value="AUTO-GENERATED"
                disabled
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Issue Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={issueDate}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 cursor-not-allowed"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Due Date
              </label>
              <div className="relative">
                <select
                  value={paymentTerms}
                  onChange={(e) => handlePaymentTerms(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="NET15">Net 15</option>
                  <option value="NET30">Net 30</option>
                  <option value="RECEIPT">Due on Receipt</option>
                </select>

                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Set Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Line Items Section --- */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Line Items
          </h3>

          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="hidden md:grid bg-slate-50/50 px-4 py-2 border-b border-slate-100 grid-cols-12 gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 md:grid md:grid-cols-12 gap-3 items-center border-b border-slate-100"
              >
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", Number(e.target.value))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-center"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(index, "rate", Number(e.target.value))
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-right"
                    required
                  />
                </div>

                <div className="col-span-2 text-right font-bold text-slate-900">
                  ₹{(item.quantity * item.rate).toFixed(2)}
                </div>

                <div className="col-span-1 flex justify-end">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2528D4] hover:underline pt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Line Item
          </button>
        </div>

        {/* --- Notes & Financial Breakdown Footer --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100/80">
          {/* Left Side: Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Notes / Terms
            </label>
            <textarea
              rows={4}
              defaultValue="Thank you for your business. Payment is due within 30 days."
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all runtime-resize-none"
            />
          </div>

          {/* Right Side: Totals Module */}
          <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-4 flex flex-col justify-between space-y-4 md:space-y-3">
            <div className="space-y-2 text-sm font-medium text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Line Items</span>
                <span className="font-semibold text-slate-900">
                  {items.length}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-slate-900">
              <span className="text-base font-bold">Total</span>

              <span className="text-xl font-black tracking-tight">
                ₹
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Final Action Submission Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-slate-50">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-[#2528D4] hover:bg-[#1D20B5] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 fill-white" />
            Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
