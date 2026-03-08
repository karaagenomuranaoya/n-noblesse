import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Crown, 
  Phone, 
  Gem, 
  Plane, 
  Wine, 
  Utensils, 
  ArrowRight, 
  AlertTriangle,
  CreditCard,
  Terminal
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-gray-200 font-sans selection:bg-yellow-500/30">
      
      {/* ヒーローセクション */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* 背景画像（ダークフィルター付き） */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-60 scale-105 animate-in fade-in duration-[2s]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559599238-308793637427?q=80&w=2670&auto=format&fit=crop")' }} // リゾート・夜景
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* コンテンツ */}
        <div className="relative z-10 text-center space-y-8 px-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <span className="text-xl tracking-[0.4em] text-gray-300">N-NOBLESSE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 pb-2">
            BEST TIME
          </h1>
          
          <p className="text-gray-300 text-sm md:text-base tracking-wider max-w-lg mx-auto leading-loose">
            世界を統べる、選ばれし貴方へ。<br />
            日常を凌駕する至高の体験をこのカードと。
          </p>
        </div>
      </section>

      {/* ★★★ ネタバラシ / 注意書きセクション ★★★ */}
      <section className="bg-[#1a0505] border-t-4 border-red-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 text-red-500 animate-pulse">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-2xl font-bold uppercase tracking-widest">Disclaimer / Important Notice</h2>
          </div>
          
          <div className="bg-black/50 border border-red-900/30 p-8 rounded-lg font-mono text-gray-300 space-y-6">
            <div className="flex gap-4">
              <Terminal className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-red-400 font-bold text-lg mb-2">これは架空のサイトです</h3>
                <p className="leading-relaxed mb-4">
                  このWebサイト（N-NOBLESSE）は、フロントエンド開発の練習およびデモンストレーションを目的として作成された<span className="text-white font-bold underline decoration-red-500">架空のクレジットカード申し込みサイト</span>です。
                </p>
                <p className="leading-relaxed">
                  実在する企業、サービス、団体とは一切関係ありません。また、独自に創作された規約やサービス内容はすべてフィクションです。
                </p>
              </div>
            </div>

            <div className="border-t border-red-900/30 pt-6 flex gap-4">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 font-bold text-xs">!</div>
              <div>
                <h3 className="text-white font-bold mb-2">個人情報を入力しないでください</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  このサイトはデータベースを持たず、入力された情報はブラウザ内（React State/Zustand）でのみ一時的に保持され、リロードすると消滅します。外部サーバーへ送信されることはありませんが、
                  <span className="text-red-400 font-bold">絶対に本物の氏名、住所、電話番号、口座情報などを入力しないでください。</span>
                  入力フォームには、画面上の「デモ入力（虫アイコン）」ボタンを使用してダミーデータを入力することをお勧めします。
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 text-right mt-4">
              Project: Front-end Practice / Built with Next.js 15
            </div>
          </div>
        </div>
      </section>

      {/* コンシェルジュセクション（画像：ディナー/ワイン） */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 text-yellow-500 mb-2">
              <Phone className="w-6 h-6" />
              <span className="text-sm tracking-widest uppercase">Concierge Service</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
              24時間365日対応。<br/>
              <span className="text-gray-400 text-2xl">「N-NOBLESSE 専属コンシェルジュ・デスク」</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              飛行機やタクシーはもちろん、ホテル・宿泊施設の予約、レストランの紹介および予約、希少な商品・チケットの探索手配、その他ライフスタイルに関する相談を私共がお手伝いさせていただきます。
            </p>
            <div className="bg-[#111] p-4 border-l-2 border-yellow-600 text-xs text-gray-500">
              <p>
                ※ コンシェルジュが手配、予約、または購入を代行した商品やサービス等の実費、および手配に伴い発生する正当な手数料（手配業者への手数料、キャンセル料等）については、すべて本カードによる決済をもってお客様の負担とさせていただきます。
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 group">
            <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="relative h-[500px] w-full overflow-hidden rounded-sm border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" // ラグジュアリーなバー/ワイン
                alt="Concierge" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                <div className="flex items-center gap-4 text-white">
                  <Wine className="w-5 h-5 text-yellow-500" />
                  <span className="font-serif tracking-widest">Premium Reserve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* リワードセクション（画像：ワイン・フレンチ・葉巻） */}
      <section className="py-24 bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <Gem className="w-10 h-10 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif text-white">N-NOBLESSE REWARD</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              当社が独自に運営するプレミアム・ロイヤルティプログラムに基づき、<br className="hidden md:block"/>
              日々の決済を通じて、至高の輝き「Nポイント」を付与いたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Item 1: Wine */}
            <div className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden mb-6 border border-gray-800 group-hover:border-yellow-600/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop" 
                  alt="Vintage Wine"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl text-white font-serif mb-3 group-hover:text-yellow-500 transition-colors">
                Vintage Wine
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-3 group-hover:border-yellow-900/30 transition-colors">
                市場には出回らない、幻のヴィンテージ。<br/>
                ブルゴーニュの深淵を、貴方のセラーへお届けします。
              </p>
            </div>

            {/* Item 2: French Cuisine */}
            <div className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden mb-6 border border-gray-800 group-hover:border-yellow-600/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop" 
                  alt="French Cuisine"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl text-white font-serif mb-3 group-hover:text-yellow-500 transition-colors">
                Grand Maison
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-3 group-hover:border-yellow-900/30 transition-colors">
                お客様のためだけに用意された、一席。<br/>
                世界最高峰のシェフが振るう、芸術的な一皿を。
              </p>
            </div>

            {/* Item 3: Timepiece (Watch) */}
            <div className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden mb-6 border border-gray-800 group-hover:border-yellow-600/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                {/* 高級時計の画像 */}
                <img 
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2670&auto=format&fit=crop" 
                  alt="Luxury Timepiece"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl text-white font-serif mb-3 group-hover:text-yellow-500 transition-colors">
                Masterpiece
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-3 group-hover:border-yellow-900/30 transition-colors">
                時を刻む芸術品。<br/>
                スイスの職人が組み上げた、永遠に受け継がれる輝きを。
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600 italic font-serif">
              ※ ポイント交換は、専属コンシェルジュデスクにて承ります。<br/>
              ※ 商品は季節や希少性により変動いたします。
            </p>
          </div>
        </div>
      </section>

      {/* 年会費＆申し込みセクション（The Black Card） */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center">
        {/* 背景素材: ダークな高級テクスチャ */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop")' }} // ダーク・抽象・高級感
        />
        {/* オーバーレイ: 金色の光を微かに入れるグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#1a1a00]/80 to-black/90" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* 左側: カードビジュアル（CSSで描画するブラックカード） */}
          <div className="flex justify-center lg:justify-end perspective-1000 group">
            <div className="relative w-80 h-52 md:w-96 md:h-60 rounded-2xl bg-gradient-to-br from-[#2a2a2a] via-[#000] to-[#1a1a1a] border border-gray-700 shadow-2xl shadow-yellow-900/20 transform transition-transform duration-700 hover:rotate-y-12 hover:scale-105 select-none">
              {/* カードの光沢エフェクト */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
              
              <div className="absolute top-6 left-6 text-yellow-500 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <span className="font-serif font-bold tracking-widest text-lg">N-NOBLESSE</span>
              </div>
              
              <div className="absolute top-6 right-6">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-600 opacity-80" />
              </div>

              <div className="absolute bottom-6 left-6 text-gray-300 font-mono text-lg tracking-[0.2em] shadow-black drop-shadow-md">
                5928 1010 1582 4989
              </div>
              
              <div className="absolute bottom-6 right-6 text-xs text-gray-500 tracking-widest uppercase">
                Platinum Status
              </div>
            </div>
          </div>

          {/* 右側: オファー＆アクション */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-1 rounded-full border border-yellow-500/50 bg-yellow-900/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-2 animate-pulse">
              Special Invitation
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              世界への扉を、<br/>
              今、その手に。
            </h2>

            <div className="space-y-4 py-4 border-y border-gray-800/50">
              <div className="flex flex-col md:flex-row items-center lg:items-end gap-4 justify-center lg:justify-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">通常年会費</p>
                  <p className="text-2xl text-gray-400 line-through decoration-gray-600">¥11,000</p>
                </div>
                <ArrowRight className="hidden md:block w-8 h-8 text-yellow-500 mb-2" />
                <ArrowRight className="md:hidden w-6 h-6 text-yellow-500 rotate-90 my-[-10px]" />
                <div>
                  <p className="text-sm text-yellow-500 font-bold mb-1">初年度特別優待</p>
                  <p className="text-5xl md:text-6xl font-serif text-white font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600">
                    無料
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-lg mx-auto lg:mx-0">
              まずは1年間、N-NOBLESSEの世界をご堪能ください。<br/>
              その価値を感じていただけなければ、いつでも解約が可能です。<br/>
            </p>

            <div className="pt-4">
              <Link href="/apply/terms" className="block md:inline-block">
                <Button className="w-full md:w-auto h-16 px-12 text-xl rounded-none relative overflow-hidden group border border-yellow-600 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  <span className="relative z-10 flex items-center justify-center font-serif text-black font-bold tracking-widest">
                    申し込む <ArrowRight className="ml-3 w-6 h-6" />
                  </span>
                </Button>
              </Link>
              <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest">
                Application takes only 3 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  );
}