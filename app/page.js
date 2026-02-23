import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center px-6">
      
      {/* Container */}
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Create Professional <span className="text-indigo-500">Invoices</span> in Seconds
          </h1>

          <p className="text-slate-400 text-lg">
            Generate clean, downloadable invoices instantly. 
            Perfect for freelancers, students, and small businesses.
          </p>

          <div className="flex gap-4">
            <Link
              href="/create-invoice"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-xl font-semibold shadow-lg shadow-indigo-600/30"
            >
              Generate Invoice
            </Link>

            <button className="px-6 py-3 border border-slate-600 hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300 rounded-xl">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Visual Card */}
        <div className="relative">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
            
            {/* Fake Invoice Preview */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">Invoice #001</h2>
                <span className="text-slate-400">£450.00</span>
              </div>

              <div className="h-px bg-slate-700"></div>

              <div className="flex justify-between text-sm text-slate-400">
                <span>Website Design</span>
                <span>£300</span>
              </div>

              <div className="flex justify-between text-sm text-slate-400">
                <span>Hosting</span>
                <span>£150</span>
              </div>

              <div className="h-px bg-slate-700"></div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>£450</span>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -z-10 top-10 left-10 w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>
        </div>

      </div>
    </main>
  );
};

export default Page;