import { Crown } from "lucide-react"; // 王冠アイコンに変更

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto h-20 flex items-center px-6 justify-between">
        {/* ロゴ部分 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-serif font-bold tracking-widest text-white">
              N-NOBLESSE
            </span>
          </div>
          <span className="text-[10px] text-gray-400 tracking-[0.3em] ml-8">
            BEST TIME
          </span>
        </div>

        {/* セキュリティ表示（控えめに） */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 border border-gray-700 rounded px-2 py-1 bg-gray-900">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-300">Secure Connection</span>
          </div>
        </div>
      </div>
    </header>
  );
}