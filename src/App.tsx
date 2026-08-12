import React, { useState, useMemo, useEffect } from 'react';
import { SAMPLE_FLOWERS } from './data/flowers';
import { FlowerItem, OccasionId, FlowerCategory, MooncakeItem } from './types';
import { convertGoogleDriveUrl } from './utils/format';
import { Navbar } from './components/Navbar';
import { FlowerGrid } from './components/FlowerGrid';
import { FlowerDetailModal } from './components/FlowerDetailModal';
import { AdminModal } from './components/AdminModal';
import { FlowerCareSection } from './components/FlowerCareSection';
import { Footer } from './components/Footer';
import { Heart, X } from 'lucide-react';

const STORAGE_KEY = 'tiem_trung_thu_mooncakes_v5';
const PHONE_STORAGE_KEY = 'tiem_trung_thu_phone_number';
const THEME_STORAGE_KEY = 'tiem_trung_thu_theme';

// Helper to normalize product names for duplicate matching
const normalizeName = (s?: string) => (s || '').toLowerCase().trim().replace(/\s+/g, ' ');

export default function App() {
  // Theme State (Light mode by default, Dark mode option available)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save theme state', e);
      }
      return next;
    });
  };

  // Store phone number state
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    try {
      return localStorage.getItem(PHONE_STORAGE_KEY) || '0344 447 914';
    } catch {
      return '0344 447 914';
    }
  });

  const handleUpdatePhoneNumber = (newPhone: string) => {
    const trimmed = newPhone.trim();
    if (trimmed) {
      setPhoneNumber(trimmed);
      try {
        localStorage.setItem(PHONE_STORAGE_KEY, trimmed);
      } catch (e) {
        console.error('Failed to save phone to storage', e);
      }
    }
  };

  // Clear previous version storage keys if present
  useEffect(() => {
    try {
      ['tiem_trung_thu_mooncakes', 'tiem_trung_thu_mooncakes_v2', 'tiem_trung_thu_mooncakes_v3', 'tiem_trung_thu_mooncakes_v4'].forEach((k) => {
        localStorage.removeItem(k);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Load saved products from localStorage or initialize with empty array
  const [flowers, setFlowers] = useState<(MooncakeItem | FlowerItem)[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out default sample mooncakes if any
          const userOnly = parsed.filter((item: any) => !item.id?.startsWith('mc-') && !item.id?.startsWith('mooncake-1') && !item.id?.startsWith('mooncake-2'));
          if (userOnly.length > 0) {
            const seen = new Set<string>();
            const deduped: (MooncakeItem | FlowerItem)[] = [];
            
            userOnly.forEach((item: any, idx: number) => {
              const norm = normalizeName(item.name);
              if (!norm || !seen.has(norm)) {
                if (norm) seen.add(norm);
                deduped.push({
                  ...item,
                  imageUrl: convertGoogleDriveUrl(item.imageUrl) || item.imageUrl,
                  createdAt: item.createdAt || (Date.now() - idx * 60000),
                });
              }
            });
            return deduped;
          }
        }
      }
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    return [];
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  // UI state controls
  const [activeTab, setActiveTab] = useState<'catalog' | 'care-tips'>('catalog');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionId>('all');
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Modals
  const [quickViewFlower, setQuickViewFlower] = useState<(MooncakeItem | FlowerItem) | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  // Save to localStorage when flowers change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flowers));
    } catch (e) {
      console.error('Failed to save products to storage', e);
    }
  }, [flowers]);

  // Handlers
  const handleToggleFavorite = (flower: any) => {
    if (favorites.includes(flower.id)) {
      setFavorites(favorites.filter((id) => id !== flower.id));
    } else {
      setFavorites([...favorites, flower.id]);
    }
  };

  const handleSaveFlower = (savedFlower: any) => {
    setFlowers((prev) => {
      const targetName = normalizeName(savedFlower.name);
      const now = Date.now();
      const flowerWithTime = { ...savedFlower, createdAt: savedFlower.createdAt || now };
      
      // Find existing product by ID or matching normalized name
      const existingIndex = prev.findIndex(
        (f) => f.id === savedFlower.id || (targetName && normalizeName(f.name) === targetName)
      );

      if (existingIndex > -1) {
        const existingId = prev[existingIndex].id;
        const updated = [...prev];
        updated[existingIndex] = { ...flowerWithTime, id: existingId, createdAt: now };
        
        // Remove any other duplicate items with the same name
        return updated.filter(
          (item, idx) => idx === existingIndex || !targetName || normalizeName(item.name) !== targetName
        );
      }

      return [{ ...flowerWithTime, createdAt: now }, ...prev];
    });
  };

  const handleBatchImportFlowers = (importedList: any[]) => {
    setFlowers((prev) => {
      let currentList = [...prev];
      const baseTime = Date.now();

      importedList.forEach((newItem, idx) => {
        const targetName = normalizeName(newItem.name);
        if (!targetName) return;

        const now = baseTime + (importedList.length - idx) * 1000;
        const itemWithTime = { ...newItem, createdAt: now };

        const existingIndex = currentList.findIndex(
          (f) => f.id === newItem.id || normalizeName(f.name) === targetName
        );

        if (existingIndex > -1) {
          const existingId = currentList[existingIndex].id;
          currentList[existingIndex] = { ...itemWithTime, id: existingId };
          // Remove duplicate old items with same name
          currentList = currentList.filter(
            (item, idx) => idx === existingIndex || normalizeName(item.name) !== targetName
          );
        } else {
          currentList = [itemWithTime, ...currentList];
        }
      });

      return currentList;
    });
  };

  const handleDeleteFlower = (id: string) => {
    setFlowers((prev) => prev.filter((f) => f.id !== id));
  };

  const handleResetDefaultFlowers = () => {
    const now = Date.now();
    const formattedDefaults = SAMPLE_FLOWERS.map((item, idx) => ({
      ...item,
      imageUrl: convertGoogleDriveUrl(item.imageUrl) || item.imageUrl,
      createdAt: now - idx * 60000,
    }));
    setFlowers(formattedDefaults);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const favoriteFlowersList = useMemo(() => {
    return flowers.filter((f) => favorites.includes(f.id));
  }, [flowers, favorites]);

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 selection:bg-amber-400 selection:text-amber-950 ${
      isDark ? 'bg-midautumn-night text-amber-50' : 'bg-white text-stone-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        phoneNumber={phoneNumber}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'catalog' ? (
          <FlowerGrid
            flowers={flowers}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onQuickView={(flower) => setQuickViewFlower(flower)}
            selectedOccasion={selectedOccasion}
            setSelectedOccasion={setSelectedOccasion}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isDark={isDark}
          />
        ) : (
          /* Care Tips / Tasting Handbook dedicated view */
          <div className="py-12">
            <FlowerCareSection isDark={isDark} />
          </div>
        )}
      </main>

      {/* Footer with Secret Admin Trigger on Logo */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} phoneNumber={phoneNumber} isDark={isDark} />

      {/* Quick View Mooncake Detail Modal */}
      <FlowerDetailModal
        flower={quickViewFlower}
        isOpen={!!quickViewFlower}
        onClose={() => setQuickViewFlower(null)}
        isFavorite={quickViewFlower ? favorites.includes(quickViewFlower.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isDark={isDark}
      />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        flowers={flowers}
        phoneNumber={phoneNumber}
        onUpdatePhoneNumber={handleUpdatePhoneNumber}
        onSaveFlower={handleSaveFlower}
        onBatchImportFlowers={handleBatchImportFlowers}
        onDeleteFlower={handleDeleteFlower}
        onResetDefault={handleResetDefaultFlowers}
      />

      {/* Favorites Modal */}
      {isFavoritesModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in ${
          isDark ? 'bg-slate-950/80' : 'bg-stone-900/60'
        }`}>
          <div className={`rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border transition-colors ${
            isDark
              ? 'bg-slate-900 text-amber-100 border-amber-500/40'
              : 'bg-white text-stone-900 border-amber-200'
          }`}>
            <button
              onClick={() => setIsFavoritesModalOpen(false)}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-200 border-amber-500/30'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`flex items-center gap-2 font-bold mb-4 ${
              isDark ? 'text-amber-300' : 'text-amber-700'
            }`}>
              <Heart className={`w-5 h-5 fill-amber-600 text-amber-600`} />
              <h2 className={`font-serif text-xl font-bold ${
                isDark ? 'text-amber-100' : 'text-stone-900'
              }`}>Mẫu Bánh Yêu Thích Của Bạn</h2>
            </div>

            {favoriteFlowersList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {favoriteFlowersList.map((flower) => (
                  <div
                    key={flower.id}
                    className={`p-3 rounded-2xl border flex gap-3 items-center justify-between ${
                      isDark
                        ? 'bg-slate-950/80 border-amber-500/30'
                        : 'bg-amber-50/50 border-amber-200/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={flower.imageUrl}
                        alt={flower.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className={`font-serif font-bold text-xs line-clamp-1 ${
                          isDark ? 'text-amber-100' : 'text-stone-900'
                        }`}>{flower.name}</h4>
                        <span className={`text-xs font-bold block ${
                          isDark ? 'text-amber-400' : 'text-amber-800'
                        }`}>{flower.price.toLocaleString('vi-VN')}₫</span>
                        <span className={`text-[10px] font-medium ${
                          isDark ? 'text-amber-200/60' : 'text-stone-500'
                        }`}>{flower.unitQuantity || 'Hộp 4 bánh'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setQuickViewFlower(flower);
                        setIsFavoritesModalOpen(false);
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                        isDark
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                          : 'bg-stone-900 hover:bg-amber-600 text-white'
                      }`}
                    >
                      Xem
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 text-sm ${
                isDark ? 'text-amber-200/60' : 'text-stone-500'
              }`}>Bạn chưa chọn mẫu bánh yêu thích nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

