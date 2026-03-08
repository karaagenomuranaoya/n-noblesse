import { create } from 'zustand';
import { type Step1Data, type Step2Data, type Step3Data } from './schema';

interface ApplyState {
  // 各ステップのデータ（最初は空っぽなのでnull許容）
  step1: Step1Data | null;
  step2: Step2Data | null;
  step3: Step3Data | null;

  // データを保存するアクション
  setStep1: (data: Step1Data) => void;
  setStep2: (data: Step2Data) => void;
  setStep3: (data: Step3Data) => void;
  
  // 全データを消去（完了後などに使う）
  reset: () => void;
}

export const useApplyStore = create<ApplyState>((set) => ({
  step1: null,
  step2: null,
  step3: null,
  
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  setStep3: (data) => set({ step3: data }),
  
  reset: () => set({ step1: null, step2: null, step3: null }),
}));