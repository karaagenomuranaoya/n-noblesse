"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3Data } from "@/lib/schema";
import { useApplyStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ArrowLeft, CheckCircle2, Landmark, Lock, Bug } from "lucide-react";

export default function Step3Page() {
  const router = useRouter();
  const { step3, setStep3 } = useApplyStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      bankCode: step3?.bankCode || "",
      branchCode: step3?.branchCode || "",
      accountType: (step3?.accountType || undefined) as any,
      accountNumber: step3?.accountNumber || "",
      pinCode: step3?.pinCode || "",
      pinCodeConfirm: step3?.pinCodeConfirm || "",
    },
  });

  // --- デモ用データ入力機能 ---
  const fillDemoData = () => {
    setValue("bankCode", "1582"); // 1582年（本能寺銀行）
    setValue("branchCode", "758"); // 758（ナゴヤ支店）
    setValue("accountType", "current"); // 当座（経営者なので）
    setValue("accountNumber", "1560060"); // 1560年（桶狭間の戦い）
    setValue("pinCode", "4989"); // 四苦八苦（天下統一の苦労）
    setValue("pinCodeConfirm", "4989");
  };
  // -------------------------

  const onSubmit = (data: Step3Data) => {
    console.log("Step3 Data:", data);
    setStep3(data);
    router.push("/apply/confirm");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      {/* ヘッダー＆デモボタン */}
      <div className="border-b border-gray-800 pb-4 mb-8 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Landmark className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-serif text-white">お支払い口座の設定</h2>
          </div>
          <p className="text-gray-400 text-sm">
            カードご利用代金のお引き落とし口座を設定します。<br/>
            ご本人様名義の口座をご指定ください。
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          onClick={fillDemoData}
          className="h-8 text-xs border-dashed border-white text-white hover:text-yellow-500 hover:border-yellow-500 shrink-0 px-3"
          title="天下布武銀行の口座を入力します"
        >
          <Bug className="w-3 h-3 mr-1" />
          デモ入力
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* 銀行・支店コード */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bankCode">銀行コード (4桁)</Label>
            <Input 
              id="bankCode" 
              placeholder="0001" 
              maxLength={4}
              className="font-mono tracking-widest text-center"
              {...register("bankCode")} 
            />
            <ErrorMessage>{errors.bankCode?.message}</ErrorMessage>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="branchCode">支店コード (3桁)</Label>
            <Input 
              id="branchCode" 
              placeholder="001" 
              maxLength={3}
              className="font-mono tracking-widest text-center"
              {...register("branchCode")} 
            />
            <ErrorMessage>{errors.branchCode?.message}</ErrorMessage>
          </div>
        </div>

        {/* 口座種別 */}
        <div className="space-y-3">
          <Label>口座種別</Label>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                value="ordinary" 
                className="w-5 h-5 accent-yellow-500 cursor-pointer"
                {...register("accountType")}
              />
              <span className="text-sm group-hover:text-white transition-colors">普通預金</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                value="current" 
                className="w-5 h-5 accent-yellow-500 cursor-pointer"
                {...register("accountType")}
              />
              <span className="text-sm group-hover:text-white transition-colors">当座預金</span>
            </label>
          </div>
          <ErrorMessage>{errors.accountType?.message as any}</ErrorMessage>

        </div>

        {/* 口座番号 */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber">口座番号 (7桁)</Label>
          <Input 
            id="accountNumber" 
            placeholder="1234567" 
            maxLength={7}
            className="font-mono tracking-widest text-lg"
            {...register("accountNumber")} 
          />
          <ErrorMessage>{errors.accountNumber?.message}</ErrorMessage>
        </div>

        <div className="border-t border-gray-800 my-8" />

        {/* 暗証番号設定エリア */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-lg space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-medium text-white">暗証番号の設定</h3>
          </div>
          <p className="text-xs text-gray-500">
            ※ 4桁の数字を設定してください。<br/>
            ※ 生年月日や電話番号など、推測されやすい番号は避けてください。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pinCode">暗証番号</Label>
              <Input 
                id="pinCode" 
                type="password" 
                maxLength={4} 
                placeholder="****"
                className="text-center text-xl tracking-[0.5em]"
                {...register("pinCode")} 
              />
              <ErrorMessage>{errors.pinCode?.message}</ErrorMessage>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCodeConfirm">確認のため再入力</Label>
              <Input 
                id="pinCodeConfirm" 
                type="password" 
                maxLength={4} 
                placeholder="****"
                className="text-center text-xl tracking-[0.5em]"
                {...register("pinCodeConfirm")} 
              />
              <ErrorMessage>{errors.pinCodeConfirm?.message}</ErrorMessage>
            </div>
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="pt-8 flex justify-between gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/apply/step2")}
            className="w-full md:w-auto min-w-[140px]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> 戻る
          </Button>

          <Button 
            type="submit" 
            isLoading={isSubmitting} 
            className="w-full md:w-auto min-w-[200px]"
          >
            確認画面へ <CheckCircle2 className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}