import React from 'react';
import { Sparkles, Clock, ShieldCheck, HeartHandshake, ArrowRight, Wand2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomBuilderClick: () => void;
  onGiftAdvisorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomBuilderClick,
  onGiftAdvisorClick,
}) => {
  return (
    <section className="relative text-white overflow-hidden border-b border-amber-500/20">
      {/* Background Hero Image with Dark Blue Fairy Tale Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1600&q=80"
          alt="Tiệm Trung Thu Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 scale-105 transition-transform duration-10000 hover:scale-100 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-blue-950/80 to-purple-950/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d21] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tiệm Trung Thu - Quà Biếu Cao Cấp Đêm Rằm Tháng 8</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-50 leading-[1.15] mb-6">
            Thăng Hoa Hương Vị <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              Gửi Trọn Tình Thân
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed font-light mb-8 max-w-xl">
            Từng chiếc bánh tại Tiệm Trung Thu được nghệ nhân nhào nặn tỉ mỉ từ nguyên liệu tự nhiên hảo hạng: Bập bùng vị thập cẩm truyền thống, đậu xanh mịn màng đến lava kem trứng béo ngậy. Lựa chọn hoàn hảo cho quà biếu cao cấp, gắn kết thâm giao.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="bg-gradient-to-r from-amber-600 via-red-700 to-amber-700 hover:from-amber-500 hover:to-red-600 text-white font-bold px-6 py-3.5 rounded-full shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 border border-amber-400/30"
            >
              <span>Xem BST Bánh Trung Thu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onCustomBuilderClick}
              className="bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-400/40 font-medium px-6 py-3.5 rounded-full backdrop-blur-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Wand2 className="w-4 h-4 text-amber-400" />
              <span>Tự Mix Hộp Quà Theo Ý Thích</span>
            </button>

            <button
              onClick={onGiftAdvisorClick}
              className="text-amber-200 hover:text-white underline underline-offset-4 text-sm font-medium px-2 py-2"
            >
              Cần AI tư vấn chọn hộp quà? 👉
            </button>
          </div>
        </div>

        {/* Feature badges row */}
        <div className="mt-16 pt-8 border-t border-amber-900/40 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-300">
          <div className="flex items-center gap-3.5 bg-stone-900/80 p-3.5 rounded-2xl border border-amber-900/40 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/40">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-100">Giao Hàng Tận Nơi</h4>
              <p className="text-xs text-stone-400">Đảm bảo hộp quà nguyên vẹn, sang trọng</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-stone-900/80 p-3.5 rounded-2xl border border-amber-900/40 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-red-950/80 text-amber-300 border border-red-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-100">Cam Kết Chất Lượng</h4>
              <p className="text-xs text-stone-400">Nguyên liệu tự nhiên, an toàn 100%</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-stone-900/80 p-3.5 rounded-2xl border border-amber-900/40 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-100">In Logo & Thiệp Tặng</h4>
              <p className="text-xs text-stone-400">Thiệp chúc ép kim & đóng gói tỉ mỉ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


