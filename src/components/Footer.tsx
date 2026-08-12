import React, { useState } from 'react';
import { Phone, Clock, Heart, Quote, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  phoneNumber: string;
  isDark?: boolean;
}

const MID_AUTUMN_QUOTES = [
  {
    quote: "Mặt trăng tròn trịa trên cao / Rằm tháng Tám tới xôn xao xóm làng.",
    author: "Ca Dao Dân Gian Việt Nam",
  },
  {
    quote: "Muốn ăn bánh dẻo bánh nướng / Tháng Tám đêm rằm rủ nhau ngắm trăng.",
    author: "Tục Ngữ Dân Gian",
  },
  {
    quote: "Tháng Tám đêm rằm trăng sáng tỏ / Ngồi trông chú Cuội thế gian cười.",
    author: "Thi Sĩ Tản Đà",
  },
  {
    quote: "Trăng vắt ngang đầu ngọn tre / Mẹ xẻ chiếc bánh ngọt xòe tình thân.",
    author: "Ca Dao Trung Thu Đoàn Viên",
  },
];

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, phoneNumber, isDark = false }) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [adminHintToast, setAdminHintToast] = useState<string | null>(null);
  const cleanPhoneLink = phoneNumber.replace(/\s+/g, '');

  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    if (nextCount >= 5) {
      setLogoClicks(0);
      setAdminHintToast('🔓 Đã kích hoạt trang Admin Quản Lý!');
      if (onOpenAdmin) {
        onOpenAdmin();
      }
      setTimeout(() => setAdminHintToast(null), 3000);
    } else if (nextCount >= 2) {
      setAdminHintToast(`Bấm thêm ${5 - nextCount} lần nữa để mở trang Admin`);
      setTimeout(() => setAdminHintToast(null), 2000);
    }
  };

  return (
    <footer className={`text-xs sm:text-sm pt-16 pb-10 border-t relative select-none backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-950/90 text-amber-200/90 border-amber-500/30'
        : 'bg-stone-100 text-stone-700 border-stone-200'
    }`}>
      
      {/* Toast Alert for Admin Unlock */}
      {adminHintToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4" />
          <span>{adminHintToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b ${
          isDark ? 'border-stone-800/80' : 'border-stone-200'
        }`}>
          
          {/* Brand & Contact (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo with Secret Admin Trigger */}
            <div
              onClick={handleLogoClick}
              className={`inline-flex items-center gap-3 cursor-pointer group p-1.5 -ml-1.5 rounded-xl transition-all active:scale-95 ${
                isDark ? 'hover:bg-stone-900/60' : 'hover:bg-amber-50'
              }`}
              title="Nhấp 5 lần liên tiếp để mở Trang Admin Quản Lý"
            >
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-all moon-glow shrink-0">
                <svg className="w-8 h-8 text-amber-950/80 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="9" fill="#fef3c7" opacity="0.9" />
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="#d97706" opacity="0.4" />
                  <path d="M7 14c1.5 0 2.5-1 3.5-1s2 1 3.5 1 2.5-1 3.5-1" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <span className={`font-serif text-2xl font-extrabold tracking-tight block leading-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Tiệm Trung Thu
                </span>
                <span className={`text-[11px] tracking-widest uppercase font-bold block ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  Quà Biếu Cao Cấp
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Tiệm Trung Thu chuyên cung cấp các dòng bánh nướng, bánh dẻo truyền thống và hiện đại nghệ thuật. Mỗi hộp bánh là một tác phẩm tinh tế mang thông điệp thành kính, yêu thương và may mắn cho Đêm Rằm Tròn Đầy.
            </p>

            {/* Hotline & Hours Details */}
            <div className={`space-y-2.5 text-xs pt-2 border-t ${
              isDark ? 'text-stone-300 border-stone-900' : 'text-stone-700 border-stone-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                <span>
                  Hotline / Zalo đặt bánh: <a href={`tel:${cleanPhoneLink}`} className={`font-bold text-sm ml-1 underline ${
                    isDark ? 'text-amber-400 hover:text-amber-300 decoration-amber-500/40' : 'text-amber-700 hover:text-amber-900 decoration-amber-700/40'
                  }`}>{phoneNumber}</a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className={`w-4 h-4 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                <span>Giờ mở cửa: 07:30 - 21:30 (Tất cả các ngày trong tuần)</span>
              </div>
            </div>
          </div>

          {/* Trung Thu Đoàn Viên Section (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`flex items-center gap-2 ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
              <Sparkles className="w-4 h-4" />
              <h4 className={`font-serif font-bold text-sm uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Trung Thu Đoàn Viên
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MID_AUTUMN_QUOTES.map((q, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl flex flex-col justify-between border transition-colors ${
                    isDark
                      ? 'bg-stone-900/80 border-stone-800/80 hover:border-amber-900/60'
                      : 'bg-white border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  <Quote className={`w-4 h-4 mb-1 shrink-0 ${isDark ? 'text-amber-500/60' : 'text-amber-600'}`} />
                  <p className={`text-[11px] italic leading-relaxed mb-2 font-serif ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    "{q.quote}"
                  </p>
                  <span className={`text-[10px] font-semibold text-right block uppercase tracking-wide ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    — {q.author}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info & Guarantees (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`font-serif font-bold text-sm uppercase tracking-wider mb-3 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Cam Kết Thương Hiệu
            </h4>

            <ul className={`space-y-2.5 text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              <li className={`flex items-center gap-2 p-2.5 rounded-xl border ${
                isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>100% Nguyên liệu tươi ngon, an toàn vệ sinh</span>
              </li>
              <li className={`flex items-center gap-2 p-2.5 rounded-xl border ${
                isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>In logo thương hiệu theo yêu cầu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
          isDark ? 'text-stone-500' : 'text-stone-500'
        }`}>
          <p>© 2026 Tiệm Trung Thu. Tất cả quyền được bảo lưu.</p>
          <div className={`flex items-center gap-1.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            <span>Đồng hành cùng</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>Tiệm Trung Thu - Quà Biếu Cao Cấp</span>
          </div>
        </div>

      </div>
    </footer>
  );
};


