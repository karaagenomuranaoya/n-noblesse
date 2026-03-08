"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApplyStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Edit2, ShieldCheck, Loader2 } from "lucide-react";

export default function ConfirmPage() {
  const router = useRouter();
  const { step1, step2, step3, reset } = useApplyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // データがない場合（直リンクなど）は最初に戻す
  useEffect(() => {
    if (!step1 || !step2 || !step3) {
      router.replace("/apply/step1");
    }
  }, [step1, step2, step3, router]);

  if (!step1 || !step2 || !step3) return null;

  // 最終送信処理（擬似的なAPIコール）
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // 審査中...の演出（3秒待つ）
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // 送信完了！
    console.log("All Data Submitted:", { ...step1, ...step2, ...step3 });
    router.push("/apply/complete");
  };

  // 表示用の変換マップ
  const employmentMap: Record<string, string> = {
    employee: "正社員",
    self_employed: "個人事業主",
    executive: "役員・経営者",
    other: "その他",
  };

  const accountTypeMap: Record<string, string> = {
    ordinary: "普通預金",
    current: "当座預金",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="border-b border-gray-800 pb-4 mb-8 text-center">
        <h2 className="text-2xl font-serif text-white mb-2">お申し込み内容の確認</h2>
        <p className="text-gray-400 text-sm">
          以下の内容で審査を行います。<br/>
          間違いがなければ「申し込みを完了する」ボタンを押してください。
        </p>
      </div>

      {/* セクション 1: 本人情報 */}
      <section className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-900/50 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-gray-200">本人確認情報</h3>
          <Button 
            variant="outline" 
            className="h-8 px-3 text-xs border-gray-700" 
            onClick={() => router.push("/apply/step1")}
          >
            <Edit2 className="w-3 h-3 mr-1" /> 修正
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem label="お名前" value={`${step1.lastName} ${step1.firstName}`} />
          <InfoItem label="フリガナ" value={`${step1.lastNameKana} ${step1.firstNameKana}`} />
          <InfoItem label="生年月日" value={step1.birthDate} />
          <InfoItem label="電話番号" value={step1.phone} />
          <InfoItem label="メールアドレス" value={step1.email} />
          <InfoItem label="住所" value={`〒${step1.zipCode} ${step1.prefecture}${step1.city}${step1.street} ${step1.building || ""}`} className="md:col-span-2" />
        </div>
      </section>

      {/* セクション 2: 勤務先情報 */}
      <section className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-900/50 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-gray-200">勤務先・収入</h3>
          <Button 
            variant="outline" 
            className="h-8 px-3 text-xs border-gray-700" 
            onClick={() => router.push("/apply/step2")}
          >
            <Edit2 className="w-3 h-3 mr-1" /> 修正
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem label="勤務先名" value={step2.companyName} />
          <InfoItem label="勤務先電話番号" value={step2.companyPhone} />
          <InfoItem label="雇用形態" value={employmentMap[step2.employmentStatus]} />
          <InfoItem label="勤続年数" value={`${step2.yearsOfService}年`} />
          <InfoItem label="年収" value={`${step2.annualIncome}万円`} />
          <InfoItem label="他社借入" value={step2.hasLoan === "yes" ? "あり" : "なし"} />
        </div>
      </section>

      {/* セクション 3: 口座情報 */}
      <section className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-900/50 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-gray-200">お支払い口座</h3>
          <Button 
            variant="outline" 
            className="h-8 px-3 text-xs border-gray-700" 
            onClick={() => router.push("/apply/step3")}
          >
            <Edit2 className="w-3 h-3 mr-1" /> 修正
          </Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem label="金融機関コード" value={step3.bankCode} />
          <InfoItem label="支店コード" value={step3.branchCode} />
          <InfoItem label="口座種別" value={accountTypeMap[step3.accountType]} />
          <InfoItem label="口座番号" value={step3.accountNumber} />
          <InfoItem label="暗証番号" value="****" className="text-gray-500 tracking-widest" />
        </div>
      </section>

      {/* 同意エリア */}
      <div className="bg-yellow-900/10 border border-yellow-500/30 p-4 rounded text-center text-xs text-yellow-500/80">
        <div className="flex justify-center items-center gap-2 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-bold">セキュリティ確認</span>
        </div>
        この内容はSSL暗号化通信により保護されて送信されます。
      </div>

      {/* 最終ボタン */}
      <div className="pt-4 pb-12 flex w-full">
        <Button 
          onClick={handleFinalSubmit} 
          isLoading={isSubmitting}
          className="w-full flex-1 h-16 text-lg shadow-yellow-600/20 shadow-xl"
        >
          {isSubmitting ? (
            "審査サーバーへ送信中..."
          ) : (
            <>
              申し込みを完了する <CheckCircle2 className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// 小さな表示用コンポーネント
function InfoItem({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs text-gray-500 mb-1">{label}</dt>
      <dd className="text-white font-medium break-all">{value}</dd>
    </div>
  );
}