import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // Footerも後で黒くしましょう
import StepIndicator from "@/components/layout/StepIndicator";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 selection:bg-yellow-500/30">
      <Header />
      
      <main className="flex-1 w-full">
        <StepIndicator />
        
        <div className="max-w-3xl mx-auto px-4 pb-20">
          {/* 黒に映えるダークグレーのカード */}
          <div className="bg-[#111] rounded-none border border-gray-800 p-8 md:p-12 shadow-2xl shadow-black">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}