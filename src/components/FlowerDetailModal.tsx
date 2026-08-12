import React from 'react';
import { X, Heart, Check, Sparkles, PhoneCall, MessageCircle } from 'lucide-react';
import { MooncakeItem, FlowerItem } from '../types';
import { formatVND, calculateDiscountPercentage, convertGoogleDriveUrl } from '../utils/format';
import { getMatchingMooncakeImage } from '../utils/imageMatcher';

interface FlowerDetailModalProps {
  flower: MooncakeItem | FlowerItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (flower: any) => void;
  isDark?: boolean;
}

export const FlowerDetailModal: React.FC<FlowerDetailModalProps> = ({
  flower,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  isDark = false,
}) => {
  if (!isOpen || !flower) return null;

  const discountPercent = calculateDiscountPercentage(flower.price, flower.originalPrice);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in overflow-y-auto ${
      isDark ? 'bg-slate-950/80' : 'bg-stone-900/60'
    }`}>
      <div
        className={`rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border relative my-8 transition-colors ${
          isDark
            ? 'bg-slate-900 text-amber-100 border-amber-500/40'
            : 'bg-white text-stone-900 border-amber-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-colors ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-200 border-amber-500/30'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
          }`}
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Details */}
          <div className={`p-6 flex flex-col justify-center items-center relative ${
            isDark ? 'bg-slate-950/60' : 'bg-amber-50/40'
          }`}>
            <div className={`relative w-full aspect-1/1 rounded-2xl overflow-hidden shadow-md border ${
              isDark ? 'border-amber-500/20' : 'border-amber-200'
            }`}>
              <img
                src={convertGoogleDriveUrl(flower.imageUrl) || flower.imageUrl || getMatchingMooncakeImage(flower.name, flower.category)}
                alt={flower.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('lh3.googleusercontent.com/d/')) {
                    const fileIdMatch = target.src.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (fileIdMatch && fileIdMatch[1]) {
                      target.src = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
                      return;
                    }
                  } else if (target.src.includes('drive.google.com/thumbnail')) {
                    const fileIdMatch = target.src.match(/id=([a-zA-Z0-9_-]+)/);
                    if (fileIdMatch && fileIdMatch[1]) {
                      target.src = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
                      return;
                    }
                  }
                  target.src = getMatchingMooncakeImage(flower.name, flower.category);
                }}
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-amber-300/30">
                  Giảm {discountPercent}%
                </span>
              )}
            </div>

            {/* Included Ingredients / Items */}
            {(flower.ingredients || flower.flowersIncluded) && (
              <div className={`w-full mt-4 p-3.5 rounded-xl border text-xs ${
                isDark
                  ? 'bg-slate-900 border-amber-500/30'
                  : 'bg-white border-amber-200'
              }`}>
                <span className={`font-semibold block mb-1.5 flex items-center gap-1 ${
                  isDark ? 'text-amber-300' : 'text-amber-800'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Thành phần nhân / Chi tiết hộp bánh:
                </span>
                <ul className={`grid grid-cols-1 gap-1 ${
                  isDark ? 'text-amber-100/80' : 'text-stone-700'
                }`}>
                  {(flower.ingredients || flower.flowersIncluded || []).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Information & Phone Contact */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Favorite */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-widest ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  {flower.categoryName || 'Bánh Trung Thu'}
                </span>

                <button
                  onClick={() => onToggleFavorite(flower)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    isFavorite
                      ? isDark
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-amber-100 border-amber-300 text-amber-800'
                      : isDark
                        ? 'border-amber-500/30 text-amber-200/80 hover:bg-amber-500/10'
                        : 'border-stone-200 text-stone-600 hover:bg-amber-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{isFavorite ? 'Đã yêu thích' : 'Lưu lại'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className={`font-serif font-bold text-xl sm:text-2xl leading-tight mb-2 ${
                isDark ? 'text-amber-50' : 'text-stone-900'
              }`}>
                {flower.name}
              </h2>

              {/* Out of Stock Tag Notification */}
              {(flower.inStock === false || (flower.stockCount !== undefined && flower.stockCount <= 0)) && (
                <div className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-bold p-2.5 rounded-xl flex items-center gap-2 my-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span>Sản phẩm hiện đang TẠM HẾT HÀNG. Vui lòng liên hệ Hotline/Zalo để đặt trước!</span>
                </div>
              )}

              {/* Price & Unit Quantity Card */}
              <div className={`p-4 rounded-2xl border my-4 ${
                isDark
                  ? 'bg-slate-950/80 border-amber-500/30'
                  : 'bg-amber-50/70 border-amber-200'
              }`}>
                <span className={`text-[10px] uppercase font-semibold block ${
                  isDark ? 'text-amber-200/60' : 'text-stone-500'
                }`}>Đơn Giá Niêm Yết</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-2xl sm:text-3xl font-extrabold ${
                    isDark ? 'text-amber-400' : 'text-amber-700'
                  }`}>
                    {formatVND(flower.price)}
                  </span>
                  {flower.originalPrice && flower.originalPrice > flower.price && (
                    <span className={`text-xs line-through ${
                      isDark ? 'text-amber-200/40' : 'text-stone-400'
                    }`}>
                      {formatVND(flower.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Clear specification of weight / packaging */}
                <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isDark ? 'border-amber-500/20 text-amber-200' : 'border-amber-200 text-stone-700'
                }`}>
                  <span>Trọng lượng / Quy cách:</span>
                  <span className={`px-3 py-1 rounded-full border ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                      : 'bg-white text-amber-800 border-amber-200 shadow-2xs'
                  }`}>
                    {flower.unitQuantity || '1 Bánh'}
                  </span>
                </div>
              </div>

              {/* Description & Meaning */}
              <div className={`space-y-2 text-xs sm:text-sm leading-relaxed mb-4 ${
                isDark ? 'text-amber-100/90' : 'text-stone-700'
              }`}>
                <p>{flower.description}</p>
                {flower.meaning && (
                  <div className={`p-2.5 rounded-r-lg text-xs italic border-l-3 ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-400 text-amber-200'
                      : 'bg-amber-50 border-amber-500 text-stone-800'
                  }`}>
                    💡 <span className={`font-semibold not-italic ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>Ý nghĩa:</span> {flower.meaning}
                  </div>
                )}
              </div>
            </div>

            {/* Direct Contact Hotline & Zalo Buttons */}
            <div className={`pt-4 border-t space-y-2 ${
              isDark ? 'border-amber-500/20' : 'border-stone-200'
            }`}>
              <a
                href="tel:0344447914"
                className={`w-full font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isDark
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Gọi Đặt Bánh Ngay: 0344 447 914</span>
              </a>

              <a
                href="https://zalo.me/0344447914"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo Tư Vấn Báo Giá (0344 447 914)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

