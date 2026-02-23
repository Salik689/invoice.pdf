import React from 'react'
import InvoiceGenerate from '../components/InvoiceGenerate';

export const metadata = {
  title: "Generate Invoices - Invoice App",
  description: "Free Invoice Generator - Create professional invoices in seconds with our easy-to-use invoice generator. Customize your invoices with your business logo, colors, and details. Perfect for freelancers, small businesses, and anyone looking to streamline their billing process.",
};

const page = () => {
  return (
    <>
    <InvoiceGenerate />
    </>
  )
}

export default page
