'use client'

import Image from "next/image";
import { useState } from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MenuIcon, ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// Mock data for the stock marquee
const mockStockData = [
  { symbol: "NIFTY 50", price: "24,350.75", change: "+120.25 (0.50%)", isPositive: true },
  { symbol: "SENSEX", price: "79,890.10", change: "+310.50 (0.39%)", isPositive: true },
  { symbol: "RELIANCE", price: "3,145.60", change: "-22.10 (0.70%)", isPositive: false },
  { symbol: "TCS", price: "4,105.20", change: "+55.80 (1.38%)", isPositive: true },
  { symbol: "HDFCBANK", price: "1,752.90", change: "-11.45 (0.65%)", isPositive: false },
  { symbol: "INFY", price: "1,688.00", change: "+21.15 (1.27%)", isPositive: true },
  { symbol: "BANKNIFTY", price: "53,720.40", change: "-250.70 (0.46%)", isPositive: false },
  { symbol: "NIFTY 50", price: "24,350.75", change: "+120.25 (0.50%)", isPositive: true },
  { symbol: "SENSEX", price: "79,890.10", change: "+310.50 (0.39%)", isPositive: true },
  { symbol: "RELIANCE", price: "3,145.60", change: "-22.10 (0.70%)", isPositive: false },
  { symbol: "TCS", price: "4,105.20", change: "+55.80 (1.38%)", isPositive: true },
  { symbol: "HDFCBANK", price: "1,752.90", change: "-11.45 (0.65%)", isPositive: false },
  { symbol: "INFY", price: "1,688.00", change: "+21.15 (1.27%)", isPositive: true },
  { symbol: "BANKNIFTY", price: "53,720.40", change: "-250.70 (0.46%)", isPositive: false },
];

// A small component for each stock item to keep the code clean
const StockItem = ({ symbol, price, change, isPositive }) => (
  <div className="flex items-center mx-6 text-sm">
    <span className="font-semibold text-slate-400">{symbol}</span>
    <span className="ml-4 font-mono text-slate-200">{price}</span>
    <div className={`ml-3 flex items-center font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      <span className="ml-1">{change}</span>
    </div>
  </div>
);

export default function Home() {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(0);

  // FAQ data array
  const faqData = [
    {
      question: "Is my money safe with Nubra?",
      answer: "Absolutely. Nubra is a SEBI registered broker. Your funds are always kept in a separate, segregated account and are never used for proprietary purposes, ensuring complete security and compliance."
    },
    {
      question: "What are the account opening charges?",
      answer: "We believe in making markets accessible to everyone. Account opening with Nubra is completely free. There are no Annual Maintenance Charges (AMC) for the first year."
    },
    {
      question: "Can I trade in all market segments?",
      answer: "Yes. Once your account is active, you can trade across all major segments including Equities (Delivery & Intraday), Futures & Options (F&O), Currencies, and Commodities on both NSE and BSE."
    }
  ];

  useEffect(() => {
    const words = ["Genius", "Trade Master", "Strategists"];
    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    let masterTl;

    function initAnimation() {
      // --- Blinking Cursor Timeline ---
      gsap.to(cursorElement, {
        autoAlpha: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // --- Master Timeline for Typing/Deleting ---
      masterTl = gsap.timeline({ repeat: -1 });

      words.forEach(word => {
        const wordTl = gsap.timeline({
          yoyo: true,
          repeat: 1,
          repeatDelay: 1.5,
        });

        wordTl.to(textElement, {
          duration: word.length * 0.15,
          text: word,
          ease: "none",
          color: "rgba(200, 100, 255, 0.5)",
          whiteSpace: "nowrap"
        });

        masterTl.add(wordTl);
      });
    }

    initAnimation();

    // Cleanup function to kill all animations on unmount
    return () => {
      gsap.killTweensOf([textElement, cursorElement]);
      if (masterTl) masterTl.kill();
    };

  }, []);
  return (
    <div className="flex flex-col justify-start sm:justify-center items-center relative min-h-screen w-screen bg-gradient-to-b overflow-x-hidden from-slate-950 to-slate-900">
      <header className="flex w-screen border-b-1 border-violet-400/50 h-20 fixed px-4 sm:px-10 backdrop-blur-lg top-0 items-center justify-between z-[9999]">
        <div className="text-white text-2xl font-bold tracking-wider">Nubra</div>
        <div className="hidden sm:flex justify-around items-center text-white gap-10">
          <span>Features</span>
          <span>Support</span>
          <span>Nubra API</span>
          <span
            style={{
              boxShadow: `
                0 0 20px rgba(139, 69, 199, 0.6),
                0 0 40px rgba(34, 211, 238, 0.4),
                inset 0 0 10px rgba(139, 69, 199, 0.3),
                inset 0 0 20px rgba(34, 211, 238, 0.2)
              `
            }}
            className="bg-white cursor-pointer text-black hover:bg-transparent hover:text-white border-1 border-white transition-colors rounded-lg px-4 py-2 flex justify-center items-center"
          >
            Open Demat
          </span>
        </div>
        <div className="sm:hidden flex w-10 h-10 justify-center items-center">
          <MenuIcon className="text-white" />
        </div>
      </header>

      <section className="relative flex flex-col mb-10 sm:mb-auto gap-10 sm:flex-row sm:items-center justify-start sm:justify-around sm:min-h-screen w-screen px-10 pt-28 sm:pt-0 overflow-hidden">
        <GridPattern
          strokeDasharray={"4 2"}
          className={
            "absolute inset-0 [mask-image:radial-gradient(1000px_circle_at_top_left,rgba(0,0,255),transparent)]"
          }
        />
        <div className="relative z-10 text-transparent bg-gradient-to-r from-violet-500 to-cyan-200 bg-clip-text flex flex-col justify-start font-bold">
          <span className="text-nowrap text-5xl sm:text-7xl">PRO Grade</span>
          <span className="text-nowrap text-5xl sm:text-7xl">Power Addons</span>
          <span className="text-2xl sm:text-4xl mt-5 sm:mt-10 text-white">{"for the "}
            <span ref={textRef}></span>
            <span ref={cursorRef} className="text-cyan-400 opacity-0">|</span>
          </span>
          <button
            className="w-40 h-12 mb-3 ml-3 bg-gradient-to-br from-violet-500 to-blue-400 hover:opacity-85 from-70% rounded-lg mt-10 text-white transition-all duration-300"
            style={{
              boxShadow: `
                0 0 10px rgba(139, 69, 199, 0.6),
                0 0 14px rgba(34, 211, 238, 0.4),
                inset 0 0 10px rgba(139, 69, 199, 0.3),
                inset 0 0 20px rgba(34, 211, 238, 0.2)
              `
            }}
          >
            {"Login / Sign up"}
          </button>
        </div>
        <div className="relative z-10 flex border-1 border-violet-400 rounded-lg [box-shadow:0px_0px_50px_rgba(150,50,235,0.3)]">
          <div className="relative w-90 h-100">
            <Image
              src="/chart-trade.webp"
              alt="Nubra Pro Grade Features"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative min-h-screen w-screen flex flex-col">
        <div className="w-full py-3 overflow-hidden border-y border-cyan-400/20 bg-slate-900/50">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Render the list of stocks */}
            {mockStockData.map((stock, index) => (
              <StockItem key={index} {...stock} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center z-10 relative">
          {/* <div className="absolute inset-0 bg-violet-500/5 rounded-xl blur-3xl -z-10"></div>
          <div className="absolute inset-0 shadow-[0_0_100px_rgba(139,69,199,0.2)] rounded-xl -z-10"></div> */}
          <span className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-200 z-10 mt-10">Features Module</span>
          <span className="sm:text-lg text-violet-300">Power-addons to be precise</span>
          <div className="absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.3),transparent_70%)]" />

          <div className="max-w-screen mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-0 ">

              {/* Trade Instantly Feature */}
              <div className="relative rounded-lg p-4 sm:p-8 transition-all duration-300 group text-center hover:scale-105 transform">
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/chart-trade.webp"
                    alt="Trade Instantly from Charts"
                    fill
                    className="object-contain "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Trade Instantly from the Charts</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Chart → Tap → Trade. Fire orders right directly from the chart in milliseconds.
                </p>
              </div>

              {/* Complete Options Suite */}
              <div className="relative rounded-lg p-4 sm:p-8 transition-all duration-300 group text-center hover:scale-105 transform">
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/options-suite.webp"
                    alt="Complete Options Suite"
                    fill
                    className="object-contain "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Complete Options Suite</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Build, test, and trade any strategy-spreads, straddles, strangles, custom legs-all in one click.
                </p>
              </div>

              {/* One-click Basket Orders */}
              <div className="relative rounded-lg p-4 sm:p-8 transition-all duration-300 group text-center hover:scale-105 transform">
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/flexi-basket.png"
                    alt="One-click Basket Orders"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">One-click Basket Orders</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Build any multi-leg option spread and send it as a single shot-no leg risk. (Flexi Basket)
                </p>
              </div>

            </div>
          </div>
          <div className="text-xl sm:text-4xl mb-10 font-[600px] text-transparent bg-clip-text bg-gradient-to-l from-violet-400 to-violet-200">Analyze, Build, and Execute- all at one place</div>
        </div>
        <div className="absolute bottom-0 w-screen h-px bg-violet-200/20" />
      </section>

      <section className="relative w-full py-20 flex justify-center items-center">

        <GridPattern
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className="[mask-image:radial-gradient(300px_circle_at_top_left,white,transparent)]"
        />
        <GridPattern
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className="[mask-image:radial-gradient(500px_circle_at_bottom_right,white,transparent)]"
        />


        <div className="w-full max-w-7xl px-6 flex flex-col items-center">
          <h2 className="text-5xl sm:text-7xl overflow-clips pb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-200 z-10 text-center">
            Complete Pricing Transparency
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl text-center">
            No hidden fees. Just a clear, straightforward pricing structure for all your trading needs.
          </p>

          {/* Table Wrapper for rounded corners and border - Made scrollable on mobile */}
          <div className="mt-16 w-full overflow-x-auto">
            <div className="min-w-[800px] border border-violet-500/30 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-lg">
              <table className="w-full text-left">
                <thead className="bg-slate-800/60">
                  <tr>
                    <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap">Charges</th>
                    <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap">EQ Delivery</th>
                    <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap">EQ Intraday</th>
                    <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap">Options</th>
                    <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap">Futures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* Brokerage Row */}
                  <tr className="text-slate-400">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">Brokerage</td>
                    <td className="p-4 sm:p-6 font-mono text-green-400 font-semibold whitespace-nowrap">₹0</td>
                    <td className="p-4 sm:p-6 font-mono text-violet-300 whitespace-nowrap">0.03% of turnover</td>
                    <td className="p-4 sm:p-6 font-mono text-sm text-violet-300">
                      <div className="whitespace-nowrap">₹2 per ₹1000 Premium</div>
                      <div className="text-xs text-slate-500 whitespace-nowrap">capped at ₹5 per lot (whichever is lower)</div>
                    </td>
                    <td className="p-4 sm:p-6 font-mono text-violet-300 whitespace-nowrap">₹10 per lot</td>
                  </tr>

                  {/* Exchange Transaction Charges Row */}
                  <tr className="text-slate-400">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">Exchange Transaction Charges</td>
                    <td className="p-4 sm:p-6 font-mono text-sm">
                      <div className="whitespace-nowrap">0.00297% <span className="text-slate-500">NSE</span></div>
                      <div className="whitespace-nowrap">0.00357% <span className="text-slate-500">BSE</span></div>
                    </td>
                    <td className="p-4 sm:p-6 font-mono text-sm">
                      <div className="whitespace-nowrap">0.00297% <span className="text-slate-500">NSE</span></div>
                      <div className="whitespace-nowrap">0.00357% <span className="text-slate-500">BSE</span></div>
                    </td>
                    <td className="p-4 sm:p-6 font-mono text-sm">
                      <div className="whitespace-nowrap">0.03503% <span className="text-slate-500">NSE</span></div>
                      <div className="whitespace-nowrap">0.0325% <span className="text-slate-500">BSE</span></div>
                      <div className="text-xs text-slate-500 whitespace-nowrap">On Premium</div>
                    </td>
                    <td className="p-4 sm:p-6 font-mono text-sm">
                      <div className="whitespace-nowrap">0.00173% <span className="text-slate-500">NSE</span></div>
                      <div className="whitespace-nowrap">0.00% <span className="text-slate-500">BSE</span></div>
                    </td>
                  </tr>

                  {/* Securities Transaction Tax (STT) Row */}
                  <tr className="text-slate-400">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">Securities Transaction Tax (STT)</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.1% <span className="text-xs text-slate-500">(B & S)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.025% <span className="text-xs text-slate-500">(S)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.1% <span className="text-xs text-slate-500">(S on Sell Premium)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.02% <span className="text-xs text-slate-500">(S)</span></td>
                  </tr>

                  {/* SEBI Turnover Charges Row */}
                  <tr className="text-slate-400">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">SEBI Turnover Charges</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">₹10 / Crore</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">₹10 / Crore</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">₹10 / Crore</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">₹10 / Crore</td>
                  </tr>

                  {/* GST Row */}
                  <tr className="text-slate-400 bg-slate-800/30">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">GST</td>
                    <td colSpan={4} className="p-4 sm:p-6 font-mono text-sm text-orange-300">18% on (Brokerage + SEBI charges + Transaction charges)</td>
                  </tr>

                  {/* Stamp Duty Row */}
                  <tr className="text-slate-400">
                    <td className="p-4 sm:p-6 font-semibold text-slate-300 whitespace-nowrap">Stamp Duty</td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.015% <span className="text-xs text-slate-500">(B)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.003% <span className="text-xs text-slate-500">(B)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.003% <span className="text-xs text-slate-500">(B)</span></td>
                    <td className="p-4 sm:p-6 font-mono whitespace-nowrap">0.002% <span className="text-xs text-slate-500">(B)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-screen h-px bg-violet-200/20" />
      </section>

      <section className="relative w-full py-20 flex justify-center items-center">
        <div className="w-full max-w-7xl px-6 flex flex-col items-center">
          <h2 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-200 z-10 text-center">
            Get Started in 3 Steps
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl text-center">
            Join the future of trading with a setup so fast, you'll be in the market before you know it.
          </p>

          {/* Timeline Container */}
          <div className="relative mt-20 w-full max-w-3xl">
            {/* The Vertical Line */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-slate-800 rounded-full" aria-hidden="true"></div>
            {/* Mobile Vertical Line */}
            <div className="block sm:hidden absolute left-8 top-0 w-1 h-full bg-slate-800 rounded-full" aria-hidden="true"></div>

            <div className="relative flex flex-col gap-8 sm:gap-16">

              {/* Step 1: Signup */}
              <div className="flex justify-start items-center w-full">
                {/* Desktop Layout */}
                <div className="hidden sm:flex w-1/2 justify-end pr-8">
                  <div className="p-6 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg max-w-sm text-right">
                    <h3 className="text-2xl font-semibold text-white">Quick Signup</h3>
                    <p className="mt-2 text-slate-400">Begin your journey with our seamless, hassle-free signup process.</p>
                  </div>
                </div>

                {/* Desktop Circle */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                </div>

                {/* Mobile Layout */}
                <div className="flex sm:hidden items-center w-full">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                  </div>
                  <div className="ml-16 flex-1">
                    <div className="p-4 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg">
                      <h3 className="text-lg font-semibold text-white">Quick Signup</h3>
                      <p className="mt-2 text-sm text-slate-400">Begin your journey with our seamless, hassle-free signup process.</p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-1/2"></div>
              </div>

              {/* Step 2: KYC & Add Funds */}
              <div className="flex justify-start items-center w-full">
                {/* Desktop Layout */}
                <div className="hidden sm:block w-1/2"></div>
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                </div>
                <div className="hidden sm:flex w-1/2 justify-start pl-8">
                  <div className="p-6 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg max-w-sm text-left">
                    <h3 className="text-2xl font-semibold text-white">Verify & Fund</h3>
                    <p className="mt-2 text-slate-400">Instantly complete our digital KYC and add funds securely.</p>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex sm:hidden items-center w-full">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                  </div>
                  <div className="ml-16 flex-1">
                    <div className="p-4 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg">
                      <h3 className="text-lg font-semibold text-white">Verify & Fund</h3>
                      <p className="mt-2 text-sm text-slate-400">Instantly complete our digital KYC and add funds securely.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Start Trading */}
              <div className="flex justify-start items-center w-full">
                {/* Desktop Layout */}
                <div className="hidden sm:flex w-1/2 justify-end pr-8">
                  <div className="p-6 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg max-w-sm text-right">
                    <h3 className="text-2xl font-semibold text-white">Start Trading</h3>
                    <p className="mt-2 text-slate-400">You're all set. Dive into the markets and execute your first trade.</p>
                  </div>
                </div>
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                </div>

                {/* Mobile Layout */}
                <div className="flex sm:hidden items-center w-full">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                  </div>
                  <div className="ml-16 flex-1">
                    <div className="p-4 bg-slate-900/50 border border-violet-500/30 rounded-2xl backdrop-blur-lg">
                      <h3 className="text-lg font-semibold text-white">Start Trading</h3>
                      <p className="mt-2 text-sm text-slate-400">You're all set. Dive into the markets and execute your first trade.</p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-1/2"></div>
              </div>

            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-screen h-px bg-violet-200/20" />
      </section>

      <section className="relative w-full py-20 flex justify-center items-center">
        <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row gap-8 md:gap-24">

          {/* Left Column: Title */}
          <div className="md:w-1/3">
            <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-200">
              Your Questions,
              <br />
              Answered.
            </h2>
            <p className="mt-4 text-slate-400">
              Everything you need to know to get started with confidence. If you have more questions, our support team is always ready to help.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="md:w-2/3">
            <GridPattern
              x={-1}
              y={-1}
              strokeDasharray={"4 2"}
              className="[mask-image:radial-gradient(500px_circle_at_bottom_left,white,transparent)]"

            />
            <div className="flex flex-col gap-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-slate-700/80 rounded-lg overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <div className="text-cyan-400">
                      {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out grid ${openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-400 px-6 pb-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-screen h-px bg-violet-400/20" />
      </section>

      <footer className="flex flex-col items-start gap-5 w-screen relative h-50 bg-slate-950/50 py-5 px-4">
        <div className="text-3xl font-bold text-white">Nubra</div>
        <div className="text-sm text-white">This site is not associated with Nubra and is just a prototype</div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  )
}