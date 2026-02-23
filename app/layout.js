import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invoice App",
  description: "Create Free Invoices with ease using our Invoice App. Generate professional invoices in seconds, customize them to your needs, and manage your billing efficiently. Perfect for freelancers, small businesses, and anyone looking to streamline their invoicing process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar />
      <div className="mt-16">
        {children}
        </div>
      </body>
    </html>
  );
}
