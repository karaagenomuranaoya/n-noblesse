import { z } from "zod";

// --- 共通のバリデーションルール ---

// 半角数字のみ
const numberString = z
  .string()
  .regex(/^[0-9]+$/, { message: "半角数字で入力してください" });

// 全角カタカナのみ
const katakanaString = z
  .string()
  .regex(/^[ァ-ヶー]+$/, { message: "全角カタカナで入力してください" });

// 電話番号 (ハイフンなし10-11桁)
const phoneSchema = z
  .string()
  .min(10, { message: "電話番号が短すぎます" })
  .max(11, { message: "電話番号が長すぎます" })
  .regex(/^[0-9]+$/, { message: "ハイフンなしの半角数字で入力してください" });

// 郵便番号 (ハイフンなし7桁)
const zipSchema = z
  .string()
  .length(7, { message: "7桁の半角数字で入力してください（ハイフン不要）" })
  .regex(/^[0-9]+$/, { message: "半角数字で入力してください" });

// --- ステップごとのスキーマ定義 ---

// STEP 1: 本人確認情報
export const step1Schema = z.object({
  lastName: z.string().min(1, { message: "姓を入力してください" }),
  firstName: z.string().min(1, { message: "名を入力してください" }),
  lastNameKana: katakanaString.min(1, { message: "セイを入力してください" }),
  firstNameKana: katakanaString.min(1, { message: "メイを入力してください" }),
  
  birthDate: z.string().refine((date) => {
    // 簡易的な年齢チェック (18歳以上)
    const birth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  }, { message: "申し訳ございません。18歳未満の方はN-NOBLESSEにお申し込みいただけません。" }),

  zipCode: zipSchema,
  prefecture: z.string().min(1, { message: "都道府県を選択してください" }),
  city: z.string().min(1, { message: "市区町村を入力してください" }),
  street: z.string().min(1, { message: "番地を入力してください" }),
  building: z.string().optional(), // 建物名は任意
  
  phone: phoneSchema,
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
});

// STEP 2: 勤務先・年収情報
export const step2Schema = z.object({
  companyName: z.string().min(1, { message: "勤務先名を入力してください" }),
  companyPhone: phoneSchema,
  
  employmentStatus: z.enum(["employee", "self_employed", "executive", "other"] as const, {
    message: "雇用形態を選択してください",
  }),
  
  yearsOfService: z.coerce.number().min(0, { message: "勤続年数を入力してください" }),
  
  annualIncome: z.coerce
    .number()
    .min(100, { message: "年収を正しく入力してください" })
    .max(1000000, { message: "入力内容をご確認ください" }), // 100億円以上は流石にエラー
    
  hasLoan: z.enum(["yes", "no"] as const, {
    message: "借入状況を選択してください" ,
  }),
});

// STEP 3: 口座・暗証番号
export const step3Schema = z.object({
  bankCode: z.string().length(4, { message: "銀行コードは4桁です" }),
  branchCode: z.string().length(3, { message: "支店コードは3桁です" }),
  accountType: z.enum(["ordinary", "current"], {
    message: "口座種別を選択してください",
  }),
  accountNumber: z.string()
    .min(7, { message: "口座番号は7桁です" })
    .max(7, { message: "口座番号は7桁です" })
    .regex(/^[0-9]+$/, { message: "半角数字のみです" }),
    
  pinCode: z.string()
    .length(4, { message: "暗証番号は4桁で設定してください" })
    .regex(/^[0-9]+$/, { message: "半角数字のみです" }),
    
  pinCodeConfirm: z.string(),
}).refine((data) => data.pinCode === data.pinCodeConfirm, {
  message: "暗証番号が一致しません",
  path: ["pinCodeConfirm"], // エラーを表示する場所
});

// 型定義のエクスポート
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;