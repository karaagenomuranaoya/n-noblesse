"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1Data } from "@/lib/schema";
import { useApplyStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Search, ArrowRight, Bug } from "lucide-react"; // ← Bugアイコンを追加

export default function Step1Page() {
  const router = useRouter();
  const { step1, setStep1 } = useApplyStore();
  const [isSearchingZip, setIsSearchingZip] = useState(false);

  // フォームの設定
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      lastName: step1?.lastName || "",
      firstName: step1?.firstName || "",
      lastNameKana: step1?.lastNameKana || "",
      firstNameKana: step1?.firstNameKana || "",
      birthDate: step1?.birthDate || "",
      zipCode: step1?.zipCode || "",
      prefecture: step1?.prefecture || "",
      city: step1?.city || "",
      street: step1?.street || "",
      building: step1?.building || "",
      phone: step1?.phone || "",
      email: step1?.email || "",
    },
  });

  // --- デモ用データ入力機能 ---
  const fillDemoData = () => {
    setValue("lastName", "織田");
    setValue("firstName", "信長");
    setValue("lastNameKana", "オダ");
    setValue("firstNameKana", "ノブナガ");
    setValue("birthDate", "1985-06-23");
    setValue("zipCode", "1000001");
    setValue("prefecture", "東京都");
    setValue("city", "千代田区");
    setValue("street", "千代田1-1");
    setValue("building", "江戸城天守閣 101号室");
    setValue("phone", "09012345678");
    setValue("email", "nobunaga@demo.example.com");
  };
  // -------------------------

  // 郵便番号検索ロジック (zipcloud APIを使用)
  const searchAddress = async () => {
    const zip = document.querySelector<HTMLInputElement>('input[name="zipCode"]')?.value;
    
    if (!zip || zip.length < 7) {
      alert("郵便番号を7桁入力してください");
      return;
    }

    setIsSearchingZip(true);
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
      const data = await response.json();

      if (data.results) {
        const result = data.results[0];
        setValue("prefecture", result.address1);
        setValue("city", result.address2);
        setValue("street", result.address3);
        setFocus("street"); 
      } else {
        alert("住所が見つかりませんでした。");
      }
    } catch (error) {
      console.error("住所検索エラー:", error);
      alert("住所検索に失敗しました。手動で入力してください。");
    } finally {
      setIsSearchingZip(false);
    }
  };

  const onSubmit = (data: Step1Data) => {
    console.log("Step1 Data:", data);
    setStep1(data);
    router.push("/apply/step2");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ヘッダー部分をFlexにしてデモボタンを配置 */}
      <div className="border-b border-gray-800 pb-4 mb-8 flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">本人情報の入力</h2>
          <p className="text-gray-400 text-sm mt-1">
            N-NOBLESSEの発行には、厳格な本人確認が必要です。正確にご入力ください。
          </p>
        </div>
        
        {/* デモボタン */}
        <Button 
          type="button" 
          variant="outline" 
          onClick={fillDemoData}
          className="h-8 text-xs border-dashed border-white text-white hover:text-yellow-500 hover:border-yellow-500 shrink-0 px-3"
          title="デモ用データを自動入力します"
        >
          <Bug className="w-3 h-3 mr-1" />
          デモ入力
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 氏名グループ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lastName">姓 (漢字)</Label>
            <Input id="lastName" placeholder="信長" {...register("lastName")} />
            <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">名 (漢字)</Label>
            <Input id="firstName" placeholder="直也" {...register("firstName")} />
            <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
          </div>
        </div>

        {/* カナグループ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lastNameKana">セイ (全角カナ)</Label>
            <Input id="lastNameKana" placeholder="ノブナガ" {...register("lastNameKana")} />
            <ErrorMessage>{errors.lastNameKana?.message}</ErrorMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstNameKana">メイ (全角カナ)</Label>
            <Input id="firstNameKana" placeholder="ナオヤ" {...register("firstNameKana")} />
            <ErrorMessage>{errors.firstNameKana?.message}</ErrorMessage>
          </div>
        </div>

        {/* 生年月日 */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">生年月日</Label>
          <Input 
            id="birthDate" 
            type="date" 
            className="w-full md:w-1/2 [color-scheme:dark]"
            {...register("birthDate")} 
          />
          <ErrorMessage>{errors.birthDate?.message}</ErrorMessage>
        </div>

        <div className="border-t border-gray-800 my-8" />

        {/* 住所グループ */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="zipCode">郵便番号 (ハイフンなし)</Label>
            <div className="flex gap-2 max-w-md">
              <Input 
                id="zipCode" 
                placeholder="1000001" 
                maxLength={7}
                {...register("zipCode")} 
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={searchAddress}
                isLoading={isSearchingZip}
                className="shrink-0"
              >
                <Search className="w-4 h-4 mr-2" />
                住所検索
              </Button>
            </div>
            <ErrorMessage>{errors.zipCode?.message}</ErrorMessage>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="prefecture">都道府県</Label>
              <Input id="prefecture" placeholder="東京都" {...register("prefecture")} readOnly tabIndex={-1} className="bg-[#111]" />
              <ErrorMessage>{errors.prefecture?.message}</ErrorMessage>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">市区町村</Label>
              <Input id="city" placeholder="千代田区千代田" {...register("city")} />
              <ErrorMessage>{errors.city?.message}</ErrorMessage>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">番地</Label>
            <Input id="street" placeholder="1-1" {...register("street")} />
            <ErrorMessage>{errors.street?.message}</ErrorMessage>
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">建物名・部屋番号 (任意)</Label>
            <Input id="building" placeholder="江戸城タワー 30階" {...register("building")} />
          </div>
        </div>

        <div className="border-t border-gray-800 my-8" />

        {/* 連絡先グループ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">電話番号 (ハイフンなし)</Label>
            <Input id="phone" type="tel" placeholder="09012345678" {...register("phone")} />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="nobunaga@example.com" {...register("email")} />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
        </div>

        {/* 送信ボタンエリア */}
        <div className="pt-8 flex justify-end">
          <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto min-w-[200px]">
            次へ進む <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}