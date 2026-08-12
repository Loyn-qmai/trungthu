import React, { useState, useEffect, useMemo } from 'react';
import { MooncakeItem, OccasionId, MooncakeCategory } from '../types';
import { OCCASIONS, CATEGORIES } from '../data/mooncakes';
import { FlowerCard } from './FlowerCard';
import { Filter, RefreshCw, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface FlowerGridProps {
  flowers: MooncakeItem[];
  favorites: string[];
  onToggleFavorite: (flower: any) => void;
  onQuickView: (flower: any) => void;
  selectedOccasion: OccasionId;
  setSelectedOccasion: (occ: OccasionId) => void;
  selectedCategory: MooncakeCategory;
  setSelectedCategory: (cat: MooncakeCategory) => void;
  sortBy: string;
  setSortBy: (sort: 'popular' | 'price-asc' | 'price-desc' | 'rating') => void;
  isDark?: boolean;
}

export const FlowerGrid: React.FC<FlowerGridProps> = ({
  flowers,
  favorites,
  onToggleFavorite,
  onQuickView,
  selectedOccasion,
  setSelectedOccasion,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  isDark = false,
}) => {
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);
  const [showOnlyBestSeller, setShowOnlyBestSeller] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedOccasion, selectedCategory, showOnlyDiscount, showOnlyBestSeller, sortBy, itemsPerPage]);

  // Filter flowers
  const filteredFlowers = useMemo(() => {
    return flowers
      .filter((flower) => {
        // Occasion filter
        if (selectedOccasion !== 'all' && flower.occasion && !flower.occasion.includes(selectedOccasion)) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'huong-vi-truyen-thong') {
            const isTraditional =
              flower.category === 'banh-truyen-thong' ||
              flower.category === 'banh-deo' ||
              flower.category === 'huong-vi-truyen-thong' ||
              flower.tags?.some((t) => t.toLowerCase().includes('truyền thống') || t.toLowerCase().includes('đặc sản')) ||
              flower.description.toLowerCase().includes('truyền thống') ||
              flower.description.toLowerCase().includes('thập cẩm') ||
              flower.name.toLowerCase().includes('truyền thống') ||
              flower.name.toLowerCase().includes('thập cẩm') ||
              flower.name.toLowerCase().includes('đậu xanh') ||
              flower.name.toLowerCase().includes('hạt sen') ||
              flower.filling?.toLowerCase().includes('thập cẩm') ||
              flower.filling?.toLowerCase().includes('đậu xanh');
            if (!isTraditional) return false;
          } else if (selectedCategory === 'huong-vi-hien-dai') {
            const isModern =
              flower.category === 'banh-hien-dai' ||
              flower.category === 'huong-vi-hien-dai' ||
              flower.tags?.some((t) =>
                ['hiện đại', 'lava', 'sầu riêng', 'musang king', 'socola', 'matcha', 'bestseller'].some((kw) =>
                  t.toLowerCase().includes(kw)
                )
              ) ||
              flower.description.toLowerCase().includes('hiện đại') ||
              flower.description.toLowerCase().includes('lava') ||
              flower.description.toLowerCase().includes('trứng chảy') ||
              flower.description.toLowerCase().includes('socola') ||
              flower.description.toLowerCase().includes('musang king') ||
              flower.description.toLowerCase().includes('matcha') ||
              flower.name.toLowerCase().includes('lava') ||
              flower.name.toLowerCase().includes('socola') ||
              flower.name.toLowerCase().includes('sầu riêng') ||
              flower.name.toLowerCase().includes('musang king') ||
              flower.name.toLowerCase().includes('trứng chảy') ||
              flower.filling?.toLowerCase().includes('lava') ||
              flower.filling?.toLowerCase().includes('socola') ||
              flower.filling?.toLowerCase().includes('trứng chảy');
            if (!isModern) return false;
          } else {
            if (flower.category !== selectedCategory) {
              return false;
            }
          }
        }
        // Discounts only
        if (showOnlyDiscount && (!flower.originalPrice || flower.originalPrice <= flower.price)) {
          return false;
        }
        // Best sellers only
        if (showOnlyBestSeller && !flower.isBestSeller) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aInStock = a.inStock !== false;
        const bInStock = b.inStock !== false;

        // Push out-of-stock items to the bottom
        if (aInStock && !bInStock) return -1;
        if (!aInStock && bInStock) return 1;

        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        // Default: Sort from newest added to oldest
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
  }, [flowers, selectedOccasion, selectedCategory, showOnlyDiscount, showOnlyBestSeller, sortBy]);

  // Pagination Math
  const totalPages = Math.ceil(filteredFlowers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFlowers.length);

  const paginatedFlowers = useMemo(() => {
    return filteredFlowers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFlowers, startIndex, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const catalogElement = document.getElementById('flower-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSelectedOccasion('all');
    setSelectedCategory('all');
    setShowOnlyDiscount(false);
    setShowOnlyBestSeller(false);
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <section id="flower-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Compact Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b ${
        isDark ? 'border-amber-500/30' : 'border-amber-200'
      }`}>
        <div>
          <h1 className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 ${
            isDark ? 'text-amber-100' : 'text-stone-900'
          }`}>
            <span>Danh Sách Bánh Trung Thu & Hộp Quà</span>
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${
            isDark ? 'text-amber-200/80' : 'text-stone-600'
          }`}>
            Hình ảnh thực tế, giá niêm yết, thành phần nhân bánh và tình trạng kho hàng cập nhật liên tục.
          </p>
        </div>
      </div>

      {/* Filter Sections: Occasions & Categories/Flavors */}
      <div className="space-y-3 mb-6">
        {/* Row 1: Occasions Bar Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className={`text-xs font-bold shrink-0 uppercase tracking-wider pr-1 ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}>
            Dịp tặng:
          </span>
          {OCCASIONS.map((occ) => {
            const isActive = selectedOccasion === occ.id;
            return (
              <button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm shadow-amber-500/30'
                      : 'bg-amber-600 text-white font-extrabold shadow-xs'
                    : isDark
                      ? 'bg-slate-950/80 text-amber-100/90 hover:text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 font-medium'
                      : 'bg-white text-stone-700 hover:bg-amber-50 border border-amber-200 font-medium'
                }`}
              >
                <span>{occ.icon}</span>
                <span>{occ.name}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Categories & Flavor Filter Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-1">
          <label
            htmlFor="category-select"
            className={`text-xs font-bold shrink-0 uppercase tracking-wider ${
              isDark ? 'text-amber-400' : 'text-amber-800'
            }`}
          >
            Hương vị & Loại:
          </label>
          <div className="relative inline-block w-full sm:w-auto min-w-[280px]">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as MooncakeCategory)}
              className={`w-full px-4 py-2 pr-10 rounded-xl text-xs sm:text-sm font-bold appearance-none cursor-pointer border transition-all shadow-xs focus:outline-none ${
                isDark
                  ? 'bg-slate-900 border-amber-500/50 text-amber-100 hover:border-amber-400 focus:ring-2 focus:ring-amber-400'
                  : 'bg-white border-amber-300 text-stone-900 hover:border-amber-500 focus:ring-2 focus:ring-amber-500'
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-900'}
                >
                  {cat.icon ? `${cat.icon}  ${cat.name}` : cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-amber-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Counter & Active Filter Indicators + Top Pagination Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm mb-6 p-3 sm:p-4 rounded-2xl border backdrop-blur-md ${
        isDark
          ? 'bg-slate-900/80 text-amber-200/90 border-amber-500/30'
          : 'bg-amber-50/60 text-stone-700 border-amber-200'
      }`}>
        <div className="flex items-center gap-2 flex-wrap">
          {filteredFlowers.length > 0 ? (
            <div>
              Hiển thị <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>{startIndex + 1} - {endIndex}</span> trong tổng số{' '}
              <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>{filteredFlowers.length}</span> sản phẩm
            </div>
          ) : (
            <span className={isDark ? 'text-amber-200' : 'text-stone-600'}>Không có sản phẩm nào</span>
          )}

          {/* Quick toggle chips */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => setShowOnlyBestSeller((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                showOnlyBestSeller
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-amber-700 text-white border-amber-800'
                  : isDark
                    ? 'bg-slate-950/60 border-amber-500/30 text-amber-200/80 hover:bg-amber-500/20'
                    : 'bg-white border-amber-200 text-stone-700 hover:bg-amber-50'
              }`}
            >
              🔥 Bán chạy
            </button>

            <button
              onClick={() => setShowOnlyDiscount((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                showOnlyDiscount
                  ? isDark
                    ? 'bg-red-500 text-white border-red-400'
                    : 'bg-red-600 text-white border-red-700'
                  : isDark
                    ? 'bg-slate-950/60 border-amber-500/30 text-amber-200/80 hover:bg-amber-500/20'
                    : 'bg-white border-amber-200 text-stone-700 hover:bg-amber-50'
              }`}
            >
              🏷️ Giảm giá
            </button>
          </div>

          {(selectedOccasion !== 'all' || selectedCategory !== 'all' || showOnlyDiscount || showOnlyBestSeller) && (
            <button
              onClick={resetFilters}
              className={`flex items-center gap-1 font-bold transition-colors ml-2 underline underline-offset-2 ${
                isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
          {/* Sort By selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`hidden md:inline ${isDark ? 'text-amber-200/70' : 'text-stone-500'}`}>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer shadow-xs border ${
                isDark
                  ? 'bg-slate-950/90 border-amber-500/40 text-amber-100'
                  : 'bg-white border-amber-200 text-stone-800'
              }`}
            >
              <option value="popular" className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>🔥 Mới & Nổi bật</option>
              <option value="price-asc" className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>💵 Giá: Thấp đến Cao</option>
              <option value="price-desc" className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>💎 Giá: Cao đến Thấp</option>
              <option value="rating" className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>⭐ Đánh giá cao nhất</option>
            </select>
          </div>

          {/* Items per page selector */}
          {filteredFlowers.length > 8 && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`hidden md:inline ${isDark ? 'text-amber-200/70' : 'text-stone-500'}`}>Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className={`rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer shadow-xs border ${
                  isDark
                    ? 'bg-slate-950/90 border-amber-500/40 text-amber-100'
                    : 'bg-white border-amber-200 text-stone-800'
                }`}
              >
                <option value={8} className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>8 / trang (2 hàng)</option>
                <option value={12} className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>12 / trang (3 hàng)</option>
                <option value={16} className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>16 / trang (4 hàng)</option>
                <option value={24} className={isDark ? 'bg-slate-900 text-amber-100' : 'bg-white text-stone-800'}>24 / trang</option>
              </select>
            </div>
          )}

          {/* Top Compact Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1.5 rounded-lg border text-xs transition-all disabled:opacity-30 ${
                  isDark
                    ? 'border-amber-500/30 bg-slate-950/90 text-amber-200 hover:bg-amber-500/20'
                    : 'border-amber-200 bg-white text-stone-700 hover:bg-amber-100'
                }`}
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'text-amber-300 bg-slate-950/90 border-amber-500/30'
                  : 'text-amber-900 bg-white border-amber-200'
              }`}>
                {currentPage}/{totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1.5 rounded-lg border text-xs transition-all disabled:opacity-30 ${
                  isDark
                    ? 'border-amber-500/30 bg-slate-950/90 text-amber-200 hover:bg-amber-500/20'
                    : 'border-amber-200 bg-white text-stone-700 hover:bg-amber-100'
                }`}
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Flower Grid Items */}
      {paginatedFlowers.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {paginatedFlowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                isFavorite={favorites.includes(flower.id)}
                onToggleFavorite={onToggleFavorite}
                onQuickView={onQuickView}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Pagination Controls Bar */}
          {totalPages > 1 && (
            <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDark ? 'border-amber-500/30' : 'border-amber-200'
            }`}>
              <span className={`text-xs ${isDark ? 'text-amber-200/80' : 'text-stone-500'}`}>
                Trang <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{currentPage}</span> / <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{totalPages}</span>
              </span>

              <div className="flex items-center gap-1.5">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 ${
                    isDark
                      ? 'border-amber-500/30 bg-slate-950/80 text-amber-200 hover:bg-amber-500/20'
                      : 'border-amber-200 bg-white text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden xs:inline">Trang trước</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  if (
                    totalPages > 7 &&
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    Math.abs(pageNum - currentPage) > 1
                  ) {
                    if (pageNum === 2 && currentPage > 3) return <span key={pageNum} className={`px-1 text-xs ${isDark ? 'text-amber-300/60' : 'text-stone-400'}`}>...</span>;
                    if (pageNum === totalPages - 1 && currentPage < totalPages - 2) return <span key={pageNum} className={`px-1 text-xs ${isDark ? 'text-amber-300/60' : 'text-stone-400'}`}>...</span>;
                    return null;
                  }

                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? isDark
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                            : 'bg-amber-600 text-white shadow-md scale-105'
                          : isDark
                            ? 'bg-slate-950/80 border border-amber-500/30 text-amber-200 hover:bg-amber-500/20'
                            : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 ${
                    isDark
                      ? 'border-amber-500/30 bg-slate-950/80 text-amber-200 hover:bg-amber-500/20'
                      : 'border-amber-200 bg-white text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <span className="hidden xs:inline">Trang sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={`rounded-3xl p-12 text-center max-w-lg mx-auto my-8 backdrop-blur-md border ${
          isDark
            ? 'bg-slate-900/80 border-amber-500/30'
            : 'bg-amber-50/50 border-amber-200'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border ${
            isDark
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'bg-white text-amber-600 border-amber-200'
          }`}>
            <Filter className="w-8 h-8" />
          </div>
          <h3 className={`font-serif text-xl font-bold mb-2 ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>Không tìm thấy sản phẩm phù hợp</h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-amber-200/80' : 'text-stone-600'}`}>
            Chưa có sản phẩm bánh trung thu nào khớp với bộ lọc của bạn. Hãy thử chọn danh mục khác.
          </p>
          <button
            onClick={resetFilters}
            className={`text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md ${
              isDark
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-stone-900 hover:bg-amber-600 text-white'
            }`}
          >
            Xem Tất Cả Mẫu Bánh
          </button>
        </div>
      )}
    </section>
  );
};

