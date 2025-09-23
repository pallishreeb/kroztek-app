import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

// ✅ Define proper types
export interface BillingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  transactionId: string;
  createdAt: { seconds: number };
  billingDetails: BillingDetails;
  userEmail: string;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();

  // Branding colors
  const primaryColor: [number, number, number] = [41, 128, 185];
  const secondaryColor: [number, number, number] = [52, 73, 94];
  const successColor: [number, number, number] = [39, 174, 96];
  const textColor: [number, number, number] = [44, 62, 80];

  // ✅ Format currency
  const formatCurrency = (amount: number): string =>
    `Rs. ${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // ✅ Horizontal line helper
  const addHorizontalLine = (y: number, color: [number, number, number] = [200, 200, 200]) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
  };

  // --- HEADER ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("KROZTEK", 20, 25);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("INTEGRATION SOLUTION", 20, 35);

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 190, 25, { align: "right" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`#${order.transactionId}`, 190, 35, { align: "right" });

  doc.setTextColor(...textColor);

  // --- COMPANY INFO ---
  let yPos = 60;

  doc.setFontSize(10);
  doc.text("Authorized Partner of CG Power", 20, yPos);
  doc.text("GSTIN: 21EOUPS1807D1ZX", 20, yPos + 8);
  doc.text("Phone: +91-1234567890", 20, yPos + 16);
  doc.text("Email: support@kroztek.com", 20, yPos + 24);

  doc.text(
    `Invoice Date: ${new Date(order.createdAt.seconds * 1000).toLocaleDateString("en-IN")}`,
    190,
    yPos,
    { align: "right" }
  );
  doc.text(
    `Due Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN")}`,
    190,
    yPos + 8,
    { align: "right" }
  );

  yPos += 40;
  addHorizontalLine(yPos);
  yPos += 10;

  // --- BILLING INFO ---
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("BILL TO:", 20, yPos);

  doc.setFontSize(12);
  doc.setTextColor(...textColor);
  doc.text(`${order.billingDetails.firstName} ${order.billingDetails.lastName}`, 20, yPos + 12);

  doc.setFontSize(10);
  doc.text(`${order.billingDetails.address}`, 20, yPos + 22);
  doc.text(
    `${order.billingDetails.city}, ${order.billingDetails.state} - ${order.billingDetails.zip}`,
    20,
    yPos + 30
  );
  doc.text(`Phone: ${order.billingDetails.phone}`, 20, yPos + 38);
  doc.text(`Email: ${order.userEmail}`, 20, yPos + 46);

  yPos += 60;
  addHorizontalLine(yPos);
  yPos += 15;

  // --- PRODUCTS TABLE ---
  const tableData: RowInput[] = order.cart.map((item, index) => [
    (index + 1).toString(),
    item.name,
    item.quantity.toString(),
    formatCurrency(item.price),
    formatCurrency(item.price * item.quantity),
  ]);

  autoTable(doc, {
    head: [["Sr.", "Product Description", "Qty", "Unit Price", "Amount"]],
    body: tableData,
    startY: yPos,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 6,
      textColor,
      lineColor: [200, 200, 200],
      lineWidth: 0.4,
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 11,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 15 },
      1: { cellWidth: 85 },
      2: { halign: "center", cellWidth: 20 },
      3: { halign: "right", cellWidth: 35 },
      4: { halign: "right", cellWidth: 35 },
    },
    margin: { left: 15, right: 15 },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  const totalsStartX = 120;
  const totalsWidth = 70;

  // --- TOTALS ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text("Subtotal:", totalsStartX, finalY);
  doc.text(formatCurrency(order.subtotal), totalsStartX + totalsWidth, finalY, { align: "right" });

  doc.text("Tax (18% GST):", totalsStartX, finalY + 8);
  doc.text(formatCurrency(order.tax), totalsStartX + totalsWidth, finalY + 8, { align: "right" });

  doc.setDrawColor(...textColor);
  doc.setLineWidth(0.5);
  doc.line(totalsStartX, finalY + 16, totalsStartX + totalsWidth, finalY + 16);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...successColor);
  doc.text("TOTAL:", totalsStartX, finalY + 26);
  doc.text(formatCurrency(order.total), totalsStartX + totalsWidth, finalY + 26, { align: "right" });

  // --- FOOTER ---
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(250, 250, 250);
  doc.rect(0, pageHeight - 30, 210, 30, "F");

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text(
    "Thank you for your business!",
    doc.internal.pageSize.getWidth() / 2,
    pageHeight - 18,
    { align: "center" }
  );

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...secondaryColor);
  doc.text(
    "www.kroztek.com | support@kroztek.com | +91-1234567890",
    doc.internal.pageSize.getWidth() / 2,
    pageHeight - 8,
    { align: "center" }
  );

  doc.save(`Kroztek_Invoice_${order.transactionId}.pdf`);
};
