"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2Data } from "@/lib/schema";
import { useApplyStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ArrowLeft, ArrowRight, Building2, Briefcase, Bug } from "lucide-react";

export default function Step2Page() {
  const router = useRouter();
  const { step2, setStep2 } = useApplyStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      companyName: step2?.companyName || "",
      companyPhone: step2?.companyPhone || "",
      employmentStatus: step2?.employmentStatus || undefined,
      yearsOfService: step2?.yearsOfService || undefined,
      annualIncome: step2?.annualIncome || undefined,
      hasLoan: step2?.hasLoan || undefined,
    },
  });

  // --- デモ用データ入力機能 ---
  const fillDemoData = () => {
    setValue("companyName", "株式会社 天下布武ホールディングス");
    setValue("companyPhone", "0315821234"); // 03-1582-0602 (本能寺)
    setValue("employmentStatus", "executive"); // もちろん経営者
    setValue("yearsOfService", 49); // 人生五十年
    setValue("annualIncome", 500000); // 50億円（石高換算）
    setValue("hasLoan", "yes"); // 鉄砲の大量購入ローンあり
  };
  // -------------------------

  const onSubmit = (data: Step2Data) => {
    console.log("Step2 Data:", data);
    setStep2(data);
    router.push("/apply/step3");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      {/* ヘッダー＆デモボタン */}
      <div className="border-b border-gray-800 pb-4 mb-8 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-serif text-white">お勤め先・収入について</h2>
          </div>
          <p className="text-gray-400 text-sm">
            審査の参考とさせていただきます。正確な情報をご入力ください。
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          onClick={fillDemoData}
          className="h-8 text-xs border-dashed border-white text-white hover:text-yellow-500 hover:border-yellow-500 shrink-0 px-3"
          title="信長クラスの年収を入力します"
        >
          <Bug className="w-3 h-3 mr-1" />
          デモ入力
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 勤務先情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">お勤め先名 (全角)</Label>
            <Input 
              id="companyName" 
              placeholder="株式会社ネオカード" 
              {...register("companyName")} 
            />
            <ErrorMessage>{errors.companyName?.message}</ErrorMessage>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyPhone">お勤め先電話番号 (直通可)</Label>
            <Input 
              id="companyPhone" 
              type="tel" 
              placeholder="0312345678" 
              {...register("companyPhone")} 
            />
            <ErrorMessage>{errors.companyPhone?.message}</ErrorMessage>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8" />

        {/* 雇用形態・勤続年数 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="employmentStatus">雇用形態</Label>
            <div className="relative">
              <select
                id="employmentStatus"
                className="flex h-12 w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 appearance-none cursor-pointer"
                {...register("employmentStatus")}
              >
                <option value="">選択してください</option>
                <option value="employee">正社員</option>
                <option value="executive">役員・経営者</option>
                <option value="self_employed">個人事業主</option>
                <option value="other">その他（派遣・契約など）</option>
              </select>
              <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <ErrorMessage>{errors.employmentStatus?.message}</ErrorMessage>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsOfService">勤続年数 (年)</Label>
            <Input 
              id="yearsOfService" 
              type="number" 
              placeholder="5" 
              min="0"
              {...register("yearsOfService")} 
            />
            <ErrorMessage>{errors.yearsOfService?.message}</ErrorMessage>
          </div>
        </div>

        {/* 年収 */}
        <div className="space-y-2">
          <Label htmlFor="annualIncome">ご年収 (昨年度・税込)</Label>
          <div className="relative">
            <Input 
              id="annualIncome" 
              type="number" 
              placeholder="800" 
              className="pr-12 text-right text-lg font-mono tracking-wider" // 数字を見やすく右寄せ
              {...register("annualIncome")} 
            />
            <div className="absolute right-4 top-3 text-gray-400 text-sm font-bold">
              万円
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            ※ 例：800万円の場合は「800」と入力
          </p>
          <ErrorMessage className="text-right">{errors.annualIncome?.message}</ErrorMessage>
        </div>

        {/* 借入状況 */}
        <div className="space-y-3 bg-[#111] border border-gray-800 p-6 rounded-lg">
          <Label className="text-base text-gray-200">他社からのお借入状況</Label>
          <p className="text-xs text-gray-500 mb-4">
            ※ 住宅ローン・自動車ローンを除く、無担保借入（カードローン等）の有無
          </p>
          
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                value="no" 
                className="w-5 h-5 accent-yellow-500 cursor-pointer"
                {...register("hasLoan")}
              />
              <span className="text-sm group-hover:text-white transition-colors">なし</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                value="yes" 
                className="w-5 h-5 accent-yellow-500 cursor-pointer"
                {...register("hasLoan")}
              />
              <span className="text-sm group-hover:text-white transition-colors">あり</span>
            </label>
          </div>
          <ErrorMessage>{errors.hasLoan?.message}</ErrorMessage>
        </div>

        {/* ボタンエリア */}
        <div className="pt-8 flex justify-between gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/apply/step1")}
            className="w-full md:w-auto min-w-[140px]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> 戻る
          </Button>

          <Button 
            type="submit" 
            isLoading={isSubmitting} 
            className="w-full md:w-auto min-w-[200px]"
          >
            次へ進む <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}