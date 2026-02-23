"use client";

/*
  InvoiceGenerate Component
  -------------------------
  - Saves business info to localStorage
  - Allows logo upload
  - Allows table header colour selection
  - Unlimited items
  - No per-row total column
  - Grand total displayed under table
  - Generates professional PDF
*/

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceGenerate = () => {

  /* =============================
     DEFAULT BUSINESS STRUCTURE
  ============================== */
  const defaultBusiness = {
    name: "",
    address: "",
    email: "",
    phone: "",
    tableColor: "#1f2937",
    logo: "",
  };

  /* =============================
     STATE
  ============================== */

  const [business, setBusiness] = useState(defaultBusiness);

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [items, setItems] = useState([
    { title: "", description: "", quantity: 1, price: 0 },
  ]);

  /* =============================
     LOAD BUSINESS FROM STORAGE
     (merge with defaults to avoid
      controlled/uncontrolled bug)
  ============================== */
  useEffect(() => {
    const saved = localStorage.getItem("invoiceBusiness");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBusiness({ ...defaultBusiness, ...parsed });
    }
  }, []);

  /* =============================
     SAVE BUSINESS TO STORAGE
  ============================== */
  useEffect(() => {
    localStorage.setItem("invoiceBusiness", JSON.stringify(business));
  }, [business]);

  /* =============================
     HANDLERS
  ============================== */

  const handleBusinessChange = (e) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];

    if (e.target.name === "quantity" || e.target.name === "price") {
      updatedItems[index][e.target.name] = Number(e.target.value);
    } else {
      updatedItems[index][e.target.name] = e.target.value;
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { title: "", description: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  /* =============================
     LOGO UPLOAD
  ============================== */
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBusiness({
        ...business,
        logo: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  /* =============================
     CALCULATE GRAND TOTAL
  ============================== */
  const grandTotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  /* =============================
     HEX TO RGB (for jsPDF)
  ============================== */
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  /* =============================
     GENERATE PDF
  ============================== */
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Logo
    if (business.logo) {
      doc.addImage(business.logo, "PNG", 14, 10, 40, 20);
    }

    doc.setFontSize(20);
    doc.text("INVOICE", 160, 20);

    doc.setFontSize(12);

    // Business Info
    doc.text("From:", 14, 40);
    doc.text(business.name || "", 14, 47);
    doc.text(business.address || "", 14, 53);
    doc.text(business.email || "", 14, 59);
    doc.text(business.phone || "", 14, 65);

    // Customer Info
    doc.text("Bill To:", 140, 40);
    doc.text(customer.name || "", 140, 47);
    doc.text(customer.address || "", 140, 53);
    doc.text(customer.email || "", 140, 59);
    doc.text(customer.phone || "", 140, 65);

    // Convert colour
    const rgb = hexToRgb(business.tableColor);

    // Table data WITHOUT total column
    const tableData = items.map((item) => [
      item.title,
      item.description,
      item.quantity,
      "£" + item.price.toFixed(2),
    ]);

    autoTable(doc, {
      startY: 80,
      head: [["Item", "Description", "Qty", "Price"]],
      body: tableData,
      headStyles: {
        fillColor: [rgb.r, rgb.g, rgb.b],
      },
    });

    // Grand Total under table
    doc.setFontSize(14);
    doc.text(
      "Grand Total: £" + grandTotal.toFixed(2),
      140,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("invoice.pdf");
  };

  /* =============================
     UI
  ============================== */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Invoice Creator
        </h1>

        {/* BUSINESS */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3">Business Details</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input className="input" name="name" placeholder="Business Name"
              value={business.name}
              onChange={handleBusinessChange} />

            <input className="input" name="address" placeholder="Business Address"
              value={business.address}
              onChange={handleBusinessChange} />

            <input className="input" name="email" placeholder="Business Email"
              value={business.email}
              onChange={handleBusinessChange} />

            <input className="input" name="phone" placeholder="Business Phone"
              value={business.phone}
              onChange={handleBusinessChange} />

            <div className="flex items-center gap-3">
              <label>Table Header Colour:</label>
              <input
                type="color"
                name="tableColor"
                value={business.tableColor}
                onChange={handleBusinessChange}
              />
            </div>

            <div className="flex items-center gap-3">
              <label>Upload Logo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </div>

          </div>
        </section>

        {/* CUSTOMER */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3">Customer Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input className="input" name="name" placeholder="Customer Name"
              onChange={handleCustomerChange} />
            <input className="input" name="address" placeholder="Customer Address"
              onChange={handleCustomerChange} />
            <input className="input" name="email" placeholder="Customer Email"
              onChange={handleCustomerChange} />
            <input className="input" name="phone" placeholder="Customer Phone"
              onChange={handleCustomerChange} />
          </div>
        </section>

        {/* ITEMS */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3">Items</h2>

          {items.map((item, index) => (
            <div key={index}
              className="grid grid-cols-12 gap-3 mb-3 items-center">

              <input className="input col-span-3"
                name="title"
                placeholder="Item"
                value={item.title}
                onChange={(e) => handleItemChange(index, e)} />

              <input className="input col-span-3"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)} />

              <input type="number"
                className="input col-span-2"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)} />

              <input type="number"
                className="input col-span-2"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)} />

              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white rounded-lg p-2 col-span-2">
                Remove
              </button>

            </div>
          ))}

          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            + Add Item
          </button>
        </section>

        {/* GRAND TOTAL */}
        <div className="text-right text-xl font-bold mb-6">
          Grand Total: £{grandTotal.toFixed(2)}
        </div>

        {/* PDF BUTTON */}
        <div className="text-center">
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
            Download PDF Invoice
          </button>
        </div>

      </div>

      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          padding: 8px;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default InvoiceGenerate;