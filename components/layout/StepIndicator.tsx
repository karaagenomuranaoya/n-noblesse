"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { id: "terms", label: "規約同意", path: "/apply/terms" },
  { id: "step1", label: "本人情報", path: "/apply/step1" },
  { id: "step2", label: "勤務先", path: "/apply/step2" },
  { id: "step3", label: "口座設定", path: "/apply/step3" },
  { id: "confirm", label: "確認", path: "/apply/confirm" },
];

export default function StepIndicator() {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) => pathname.includes(step.path));

  if (pathname.includes("/complete")) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* モバイル用 */}
      <div className="md:hidden mb-6 text-center">
        <span className="text-xs tracking-widest text-yellow-500 uppercase">Step {currentStepIndex + 1}</span>
        <h2 className="text-lg font-serif text-white mt-1">{steps[currentStepIndex]?.label}</h2>
      </div>

      {/* PC用 */}
      <div className="hidden md:flex justify-between items-center relative">
        {/* 背景線 */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -z-10 -translate-y-1/2" />
        
        {/* 進捗線（ゴールド） */}
        <div 
          className="absolute top-1/2 left-0 h-[1px] bg-yellow-600 -z-10 -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-[#0a0a0a] px-3">
              <div
                className={cn(
                  "w-3 h-3 rounded-full border transition-all duration-500",
                  isCompleted
                    ? "bg-yellow-600 border-yellow-600" // 完了
                    : isCurrent
                    ? "bg-black border-yellow-500 scale-125 ring-4 ring-yellow-500/20" // 現在
                    : "bg-black border-gray-700" // 未完了
                )}
              />
              <span
                className={cn(
                  "text-xs tracking-wider transition-colors duration-300 font-medium",
                  isCurrent ? "text-yellow-500" : isCompleted ? "text-gray-400" : "text-gray-700"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}