"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ScrollText, CheckSquare } from "lucide-react";
import { TERMS_TEXT } from "@/lib/terms";

export default function TermsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (agreed) {
      router.push("/apply/step1");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-gray-800 pb-4 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ScrollText className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-serif text-white">会員規約の確認</h2>
        </div>
        <p className="text-gray-400 text-sm">
          N-NOBLESSEカードのお申し込みにあたり、以下の規約をご確認ください。
        </p>
      </div>

      {/* 規約表示エリア（長文テキストをそのまま表示） */}
      <div className="bg-[#111] border border-gray-800 rounded-lg p-6 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent shadow-inner">
        <div className="text-sm text-gray-300 leading-relaxed font-serif">
          {/* whitespace-pre-wrap: 改行やスペースをそのまま表示し、端で折り返す */}
          <p className="whitespace-pre-wrap">
            {TERMS_TEXT}
          </p>
        </div>
      </div>

      {/* 同意チェックエリア */}
      <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800 flex flex-col items-center gap-4">
        <label className="flex items-center gap-4 cursor-pointer group p-2 hover:bg-white/5 rounded-md transition-colors w-full md:w-auto justify-center">
          <div className="relative">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            {/* カスタムチェックボックスのデザイン */}
            <div className="w-6 h-6 border-2 border-gray-600 rounded bg-[#0a0a0a] peer-checked:bg-yellow-600 peer-checked:border-yellow-600 transition-all flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors">
            上記規約の内容を確認し、同意します
          </span>
        </label>
      </div>

      {/* ボタンエリア */}
      <div className="pt-4 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!agreed} // チェックしないと押せない
          className="w-full md:w-auto min-w-[200px]"
        >
          同意して進む <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}