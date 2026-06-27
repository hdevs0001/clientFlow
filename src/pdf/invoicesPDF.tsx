import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a clean modern font (Inter) for that premium SaaS look

// TypeScript Interfaces
export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  projectName: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  issueDate: string;
  dueDate: string;
  from: {
    name: string;
    email: string;
    businessName?: string;
    phone?: string;
  };
  billTo: {
    name: string;
    email: string;
    companyName?: string;
    address: string;
  };
  items: InvoiceItem[];
  taxRate?: number; // e.g., 0.18 for 18% GST
  discount?: number; // Absolute value in INR
  notes?: string;
  paymentTermsDays?: number;
}

interface InvoicePDFProps {
  data: InvoiceData;
}

// Global Style Constants
const colors = {
  primary: "#0F172A", // Slate 900
  secondary: "#475569", // Slate 600
  muted: "#94A3B8", // Slate 400
  border: "#E2E8F0", // Slate 200
  bgLight: "#F8FAFC", // Slate 50
  accent: "#6366F1", // Indigo 500
  accentLight: "#EEF2FF", // Indigo 50
  status: {
    Paid: { text: "#16A34A", bg: "#DCFCE7" },
    Draft: { text: "#475569", bg: "#F1F5F9" },
    Sent: { text: "#2563EB", bg: "#DBEAFE" },
    Overdue: { text: "#DC2626", bg: "#FEE2E2" },
  },
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.primary,
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: 1,
    borderColor: colors.border,
    paddingBottom: 24,
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: "column",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: -0.5,
    color: colors.primary,
  },
  projectName: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: "flex-start",
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logoPlaceholder: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.accent,
    letterSpacing: -0.5,
  },

  // Grid Information
  addressGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  addressColumn: {
    width: "45%",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: colors.muted,
    marginBottom: 8,
  },
  metaGrid: {
    flexDirection: "row",
    backgroundColor: colors.bgLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 32,
    border: 1,
    borderColor: colors.border,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: 500,
    color: colors.secondary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.primary,
  },

  // Table Styles
  table: {
    width: "auto",
    marginBottom: 24,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    alignItems: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderColor: colors.primary,
    paddingBottom: 8,
    alignItems: "center",
  },
  th: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.secondary,
  },
  td: {
    fontSize: 10,
    color: colors.primary,
  },
  colDesc: { width: "55%", textAlign: "left", paddingRight: 8 },
  colQty: { width: "15%", textAlign: "center" },
  colRate: { width: "15%", textAlign: "right" },
  colAmt: { width: "15%", textAlign: "right" },

  // Summary Section
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  summaryWrapper: {
    width: "40%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryLabel: {
    color: colors.secondary,
    fontSize: 10,
  },
  summaryValue: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 500,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: colors.border,
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.primary,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.accent,
  },

  // Footer / Notes
  bottomSection: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: 20,
    marginTop: "auto", // Pushes footer to the bottom of page if space permits
  },
  notesTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.secondary,
    marginBottom: 4,
  },
  notesBody: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 16,
    maxWidth: "80%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingTop: 12,
    fontSize: 8,
    color: colors.muted,
  },
});

// Helper Function for formatting INR currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => {
  // Math Calculations
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.quantity * item.rate,
    0,
  );
  const discountAmount = data.discount || 0;
  const taxAmount = data.taxRate
    ? (subtotal - discountAmount) * data.taxRate
    : 0;
  const grandTotal = subtotal - discountAmount + taxAmount;

  const currentStatusStyle = colors.status[data.status] || colors.status.Draft;

  return (
    <Document title={`Invoice-${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={styles.projectName}>{data.projectName}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: currentStatusStyle.bg },
              ]}
            >
              <Text style={{ color: currentStatusStyle.text }}>
                {data.status}
              </Text>
            </View>
          </View>
          <View>
            {/* Optional Logo placeholder - modern minimal text brand */}
            <Text style={styles.logoPlaceholder}>
              {data.from.businessName || data.from.name}
            </Text>
          </View>
        </View>

        {/* FROM & BILL TO SECTION */}
        <View style={styles.addressGrid}>
          <View style={styles.addressColumn}>
            <Text style={styles.sectionTitle}>From</Text>
            {data.from.businessName && (
              <Text style={{ fontWeight: 600 }}>{data.from.businessName}</Text>
            )}
            <Text>{data.from.name}</Text>
            <Text style={{ color: colors.secondary }}>{data.from.email}</Text>
            {data.from.phone && (
              <Text style={{ color: colors.secondary }}>{data.from.phone}</Text>
            )}
          </View>

          <View style={styles.addressColumn}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            {data.billTo.companyName && (
              <Text style={{ fontWeight: 600 }}>{data.billTo.companyName}</Text>
            )}
            <Text>{data.billTo.name}</Text>
            <Text style={{ color: colors.secondary }}>{data.billTo.email}</Text>
            <Text style={{ color: colors.secondary, marginTop: 4 }}>
              {data.billTo.address}
            </Text>
          </View>
        </View>

        {/* INVOICE META INFORMATION GRID */}
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Invoice Number</Text>
            <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date Issued</Text>
            <Text style={styles.metaValue}>{data.issueDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{data.dueDate}</Text>
          </View>
        </View>

        {/* ITEMS TABLE */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, styles.colDesc]}>Description</Text>
            <Text style={[styles.th, styles.colQty]}>QTY</Text>
            <Text style={[styles.th, styles.colRate]}>Rate</Text>
            <Text style={[styles.th, styles.colAmt]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.td, styles.colDesc, { fontWeight: 500 }]}>
                {item.description}
              </Text>
              <Text style={[styles.td, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.td, styles.colRate]}>{`₹${item.rate}`}</Text>
              <Text style={[styles.td, styles.colAmt, { fontWeight: 500 }]}>
                {`₹${item.quantity * item.rate}`}
              </Text>
            </View>
          ))}
        </View>

        {/* SUMMARY SECTION */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryWrapper}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{`₹${subtotal}`}</Text>
            </View>

            {data.discount !== undefined && data.discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={[styles.summaryValue, { color: "#DC2626" }]}>
                  -{formatCurrency(data.discount)}
                </Text>
              </View>
            )}

            {data.taxRate !== undefined && data.taxRate > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Tax ({data.taxRate * 100}%)
                </Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(taxAmount)}
                </Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Due</Text>
              <Text style={styles.totalValue}>{`₹${grandTotal}`}</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM SECTION: NOTES & TERMS & FOOTER */}
        <View style={styles.bottomSection}>
          {data.notes && (
            <View>
              <Text style={styles.notesTitle}>Notes</Text>
              <Text style={styles.notesBody}>{data.notes}</Text>
            </View>
          )}

          <View style={{ marginBottom: 24 }}>
            <Text style={styles.notesTitle}>Terms & Conditions</Text>
            <Text style={styles.notesBody}>
              Payment is due within {data.paymentTermsDays || 15} days from the
              invoice issuance date. Late payments may incur additional
              transaction charges. Payment should be executed securely via the
              previously agreed corporate banking routing methods.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>Generated via ClientFlow</Text>
            <Text>Date: {data.issueDate}</Text>
            <Text>Thank you for your business!</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
