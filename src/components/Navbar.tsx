import React from 'react';
import { Heart, Sparkles, PhoneCall, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  phoneNumber: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  activeTab,
  setActiveTab,
  phoneNumber,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const cleanPhoneLink = phoneNumber.replace(/\s+/g, '');

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-md transition-colors duration-300 ${
      isDark
        ? 'bg-slate-950/85 border-amber-500/30 text-amber-100'
        : 'bg-white/95 border-amber-200/80 text-stone-900'
    }`}>
      {/* Top Banner Notice */}
      <div className={`text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b ${
        isDark
          ? 'bg-gradient-to-r from-red-950 via-amber-950 to-indigo-950 text-amber-200 border-amber-500/20'
          : 'bg-gradient-to-r from-red-900 via-amber-900 to-red-950 text-amber-100 border-amber-800/20'
      }`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>✨ TIỆM TRUNG THU - Quà Biếu Cao Cấp Đêm Rằm Tháng Tám Tròn Đầy</span>
        <a href={`tel:${cleanPhoneLink}`} className="hidden md:inline-flex items-center gap-1 ml-3 text-amber-300 hover:text-white transition-colors font-bold">
          <PhoneCall className="w-3 h-3 text-amber-400" /> Hotline / Zalo: {phoneNumber}
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Full Moon Logo (Trăng Tròn) */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('catalog')}>
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-all moon-glow">
              {/* Full Moon Surface Details */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/60 via-transparent to-amber-900/30"></div>
              {/* Traditional Cloud Accent */}
              <svg className="w-8 h-8 text-amber-950/80 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="9" fill="#fef3c7" opacity="0.9" />
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="#d97706" opacity="0.4" />
                <path d="M7 14c1.5 0 2.5-1 3.5-1s2 1 3.5 1 2.5-1 3.5-1" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div>
              <span className={`font-serif text-2xl font-extrabold tracking-tight block leading-tight ${
                isDark ? 'text-amber-100' : 'text-amber-950'
              }`}>
                Tiệm Trung Thu
              </span>
              <span className={`text-[11px] tracking-widest uppercase font-bold block ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}>
                🌕 Quà Biếu Cao Cấp
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'catalog'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                    : 'bg-amber-600 text-white font-bold shadow-sm'
                  : isDark
                    ? 'text-amber-100/90 hover:text-amber-300 hover:bg-amber-500/20'
                    : 'text-stone-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              🥮 Tất Cả Mẫu Bánh
            </button>

            <button
              onClick={() => setActiveTab('care-tips')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'care-tips'
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                    : 'bg-amber-600 text-white font-bold shadow-sm'
                  : isDark
                    ? 'text-amber-100/90 hover:text-amber-300 hover:bg-amber-500/20'
                    : 'text-stone-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              📖 Hướng Dẫn Bảo Quản
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Switcher Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Chuyển chế độ sáng/tối"
              className={`p-2.5 rounded-full transition-all border flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'text-amber-300 hover:bg-amber-500/20 border-amber-500/40 bg-slate-900/80 shadow-xs'
                  : 'text-amber-900 hover:bg-amber-100 border-amber-300 bg-amber-50 shadow-xs'
              }`}
              title={isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-amber-900 fill-amber-900/20" />
              )}
            </button>

            {/* Direct Contact Button */}
            <a
              href={`tel:${cleanPhoneLink}`}
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 text-amber-50 shadow-sm'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{phoneNumber}</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenFavorites}
              aria-label="Wishlist"
              className={`p-2.5 rounded-full relative transition-colors border ${
                isDark
                  ? 'text-amber-200 hover:text-white hover:bg-amber-500/20 border-amber-500/40'
                  : 'text-stone-700 hover:text-amber-800 hover:bg-amber-100 border-amber-200'
              }`}
              title="Danh sách yêu thích"
            >
              <Heart className={`w-5 h-5 ${isDark ? 'text-amber-400 fill-amber-400/20' : 'text-amber-800'}`} />
              {favoritesCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 animate-scale-in ${
                  isDark
                    ? 'bg-amber-500 text-slate-950 border-slate-900'
                    : 'bg-red-700 text-white border-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isDark
                  ? 'text-amber-200 hover:text-white hover:bg-amber-500/20'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-amber-50'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t py-3 space-y-2 animate-fade-in rounded-b-2xl p-3 ${
            isDark
              ? 'border-amber-500/30 bg-slate-900/95 text-amber-100'
              : 'border-amber-200 bg-amber-50/90 text-stone-800'
          }`}>
            <button
              onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-medium hover:bg-amber-500/20 rounded-xl flex items-center gap-2"
            >
              🥮 Tất Cả Mẫu Bánh & Hộp Quà
            </button>
            <button
              onClick={() => { setActiveTab('care-tips'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-medium hover:bg-amber-500/20 rounded-xl flex items-center gap-2"
            >
              📖 Hướng Dẫn Bảo Quản
            </button>
            <a
              href={`tel:${cleanPhoneLink}`}
              className="w-full text-left px-4 py-2.5 text-amber-600 font-bold hover:bg-amber-500/20 rounded-xl flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Hotline Đặt Bánh: {phoneNumber}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};


