"use client";

import Link from "next/link";
import { useEffect, useState } from "react"; // ← 追加
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useApplyStore } from "@/lib/store"; // ★追加


export default function CompletePage() {
  const { reset } = useApplyStore(); // ★追加

  const [applicationId, setApplicationId] = useState("");
  useEffect(() => {
    reset(); // ★追加
    const id = "N-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setApplicationId(id);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in-95 duration-700">
      
      {/* 完了アイコン（背後に光の演出） */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-full" />
        <CheckCircle className="w-24 h-24 text-yellow-500 relative z-10" />
      </div>

      <h1 className="text-3xl md:text-4xl font-serif text-white mb-6 text-center tracking-tight">
        お申し込みを受け付けました
      </h1>
      
      <p className="text-gray-400 text-center max-w-md mb-10 leading-relaxed text-sm md:text-base">
        かけがえのないBEST TIME<br/>
        -N-NOBLESSE-<br />
        申し込みデモンストレーションはこれにて終了です。<br />
        ご覧いただき本当にありがとうございました！
      </p>

      {/* 受付番号カード */}
      <div className="bg-[#111] border border-gray-800 p-8 rounded-xl w-full max-w-sm mb-12 text-center relative overflow-hidden shadow-2xl shadow-black">
        {/* 上部のゴールドライン */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700" />
        
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">
          Application ID
        </p>
        <p className="text-3xl font-mono text-white tracking-widest font-bold">
          {applicationId || "LOADING..."}
        </p>
        
      </div>

      {/* アクションボタン */}
      <div className="flex flex-col w-full max-w-xs gap-4">
        {/* 下のボタン（Link自体にTailwindを当ててボタン化する） */}
        <Link 
        href="/" 
        className="flex items-center justify-center w-full px-4 py-2 text-gray-500 border border-gray-800 rounded-md hover:text-white hover:border-gray-600 transition-colors"
        >
            トップページへ戻る
        </Link>
      </div>
      
    </div>
  );
}