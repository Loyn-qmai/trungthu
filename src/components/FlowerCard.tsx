import React from 'react';
import { Heart, Eye, Sparkles } from 'lucide-react';
import { MooncakeItem, FlowerItem } from '../types';
import { formatVND, calculateDiscountPercentage, convertGoogleDriveUrl } from '../utils/format';
import { getMatchingMooncakeImage } from '../utils/imageMatcher';

interface FlowerCardProps {
  flower: MooncakeItem | FlowerItem;
  isFavorite: boolean;
  onToggleFavorite: (flower: any) => void;
  onQuickView: (flower: any) => void;
  isDark?: boolean;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({
  flower,
  isFavorite,
  onToggleFavorite,
  onQuickView,
  isDark = false,
}) => {
  const discountPercent = calculateDiscountPercentage(flower.price, flower.originalPrice);

  return (
    <div
      onClick={() => onQuickView(flower)}
      className={`group rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col cursor-pointer relative shadow-md hover:shadow-xl hover:-translate-y-0.5 ${
        isDark
          ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-400 text-amber-100 backdrop-blur-xs'
          : 'bg-white border-amber-200/80 hover:border-amber-400 text-stone-900'
      }`}
    >
      {/* Top Image Container */}
      <div className={`relative aspect-1/1 w-full overflow-hidden ${
        isDark ? 'bg-slate-950/60' : 'bg-amber-50/50'
      }`}>
        <img
          src={convertGoogleDriveUrl(flower.imageUrl) || flower.imageUrl || getMatchingMooncakeImage(flower.name, flower.category)}
          alt={flower.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
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

        {/* Overlay backdrop on hover */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(flower);
            }}
            className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded-full text-xs shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Xem Chi Tiết</span>
          </button>
        </div>

        {/* Badges Top Left */}
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {(flower.inStock === false || (flower.stockCount !== undefined && flower.stockCount <= 0)) && (
            <span className="bg-slate-950/90 text-white text-[8px] sm:text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1 border border-stone-700">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span>Hết Hàng</span>
            </span>
          )}
          {flower.isBestSeller && (
            <span className="bg-amber-400 text-slate-950 text-[8px] sm:text-[10px] font-black tracking-wide uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs flex items-center gap-0.5 sm:gap-1">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-slate-950" />
              <span className="hidden xs:inline">Bán Chạy</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-600 text-white text-[8px] sm:text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Favorite Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(flower);
          }}
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1 sm:p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : isDark
                ? 'bg-slate-950/70 text-amber-200 hover:text-amber-400 border border-amber-500/30'
                : 'bg-white/80 text-stone-600 hover:text-amber-600 hover:bg-white'
          }`}
          title={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? 'fill-slate-950' : ''}`} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-3">
        <div>
          {/* Category Tag */}
          <span className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider block mb-0.5 sm:mb-1 truncate ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}>
            {flower.categoryName || 'Bánh Trung Thu'}
          </span>

          {/* Title */}
          <h3 className={`font-serif font-bold text-xs sm:text-base line-clamp-2 leading-tight sm:leading-snug mb-1 sm:mb-2 transition-colors ${
            isDark
              ? 'text-amber-50 group-hover:text-amber-300'
              : 'text-stone-900 group-hover:text-amber-700'
          }`}>
            {flower.name}
          </h3>

          {/* Unit Quantity Highlight */}
          <div className={`border rounded-md sm:rounded-lg p-1 sm:p-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-xs my-0.5 sm:my-1 gap-0.5 ${
            isDark
              ? 'bg-slate-950/80 border-amber-500/20'
              : 'bg-amber-50/80 border-amber-200/60'
          }`}>
            <span className={`font-medium text-[9px] sm:text-xs hidden xs:inline ${
              isDark ? 'text-amber-200/70' : 'text-stone-500'
            }`}>Quy cách:</span>
            <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] sm:text-xs ${
              isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                : 'bg-white text-amber-900 border border-amber-200'
            }`}>
              {flower.unitQuantity || '1 Bánh'}
            </span>
          </div>
        </div>

        {/* Footer: Price & View Details Action */}
        <div className={`pt-1.5 sm:pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-1 sm:gap-2 ${
          isDark ? 'border-amber-500/20' : 'border-stone-100'
        }`}>
          <div>
            <span className={`text-[8px] sm:text-[10px] uppercase tracking-wider hidden sm:block font-medium ${
              isDark ? 'text-amber-200/50' : 'text-stone-400'
            }`}>Giá bán</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={`font-extrabold text-xs sm:text-xl leading-none ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}>
                {formatVND(flower.price)}
              </span>
              {flower.originalPrice && flower.originalPrice > flower.price && (
                <span className={`text-[9px] sm:text-xs line-through leading-none ${
                  isDark ? 'text-amber-200/40' : 'text-stone-400'
                }`}>
                  {formatVND(flower.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(flower);
            }}
            className={`w-full sm:w-auto px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 ${
              flower.inStock === false || (flower.stockCount !== undefined && flower.stockCount <= 0)
                ? 'bg-stone-300 text-stone-700 hover:bg-stone-400'
                : isDark
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950'
                  : 'bg-stone-900 hover:bg-amber-600 text-white'
            }`}
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>
              {flower.inStock === false || (flower.stockCount !== undefined && flower.stockCount <= 0)
                ? 'Tạm Hết'
                : 'Chi Tiết'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

