import React, { useState } from 'react';
import { Wand2, X, Check, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatVND } from '../utils/format';

interface CustomBouquetBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customCartItem: any) => void;
}

const MOONCAKE_FLAVOR_OPTIONS = [
  { id: 'f1', name: 'Thập Cẩm Gà Quay Vi Cá (200g)', unitPrice: 120000, img: '🥮' },
  { id: 'f2', name: 'Đậu Xanh Hạt Sen Trứng Muối (180g)', unitPrice: 95000, img: '🌕' },
  { id: 'f3', name: 'Lava Kem Trứng Chảy (150g)', unitPrice: 105000, img: '🧀' },
  { id: 'f4', name: 'Trà Xanh Matcha Trứng Muối (180g)', unitPrice: 98000, img: '🍵' },
  { id: 'f5', name: 'Môn Dừa Sữa Trứng Muối (180g)', unitPrice: 92000, img: '🟣' },
  { id: 'f6', name: 'Hạt Óc Chó Táo Đỏ Ăn Kiêng (150g)', unitPrice: 110000, img: '🍎' },
];

const BOX_DESIGNS = [
  { id: 'b1', name: 'Hộp Hoàng Gia Đỏ Son (4 bánh)', extraPrice: 80000, colorHex: '#991b1b' },
  { id: 'b2', name: 'Hộp Trăng Vàng Kim Mạ (4 bánh)', extraPrice: 100000, colorHex: '#d97706' },
  { id: 'b3', name: 'Hộp Song Ngư Đoàn Viên (6 bánh)', extraPrice: 120000, colorHex: '#1e3a8a' },
];

const ADDONS = [
  { id: 'a1', name: 'Hộp Trà Ô Long Thượng Hạng (100g)', price: 150000 },
  { id: 'a2', name: 'Lồng Đèn Giấy Lụa Truyền Thống', price: 45000 },
  { id: 'a3', name: 'Thiệp Đúc Kim Thêu Tay Hoàng Gia', price: 20000 },
];

export const CustomBouquetBuilder: React.FC<CustomBouquetBuilderProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<{ [id: string]: number }>({
    f1: 1,
    f2: 1,
    f3: 1,
    f4: 1,
  });
  const [selectedBox, setSelectedBox] = useState(BOX_DESIGNS[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['a1']);
  const [cardMessage, setCardMessage] = useState('');

  if (!isOpen) return null;

  const updateFlavorQty = (id: string, delta: number) => {
    const current = selectedFlavors[id] || 0;
    const next = Math.max(0, current + delta);
    setSelectedFlavors({
      ...selectedFlavors,
      [id]: next,
    });
  };

  const totalCakes = (Object.values(selectedFlavors) as number[]).reduce((a: number, b: number) => a + b, 0);

  // Calculate prices
  const cakesCost = Object.entries(selectedFlavors).reduce((sum: number, [id, qty]: [string, number]) => {
    const opt = MOONCAKE_FLAVOR_OPTIONS.find((o) => o.id === id);
    return sum + (opt ? opt.unitPrice * qty : 0);
  }, 0);

  const boxCost = selectedBox.extraPrice;
  const addonsCost = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalCost = cakesCost + boxCost + addonsCost;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((i) => i !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleAddCustomToCart = () => {
    const flavorDetails = Object.entries(selectedFlavors)
      .filter(([_, qty]: [string, number]) => qty > 0)
      .map(([id, qty]) => {
        const opt = MOONCAKE_FLAVOR_OPTIONS.find((o) => o.id === id);
        return `${qty}x ${opt?.name}`;
      });

    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    const customMooncakeItem = {
      id: `custom-box-${Date.now()}`,
      name: `Hộp Bánh Tự Chọn DIY (${totalCakes} bánh) - ${selectedBox.name}`,
      category: 'hop-qua-cao-cap',
      categoryName: 'Hộp Quà Tự Chọn DIY',
      occasion: ['midautumn', 'gratitude'],
      occasionNames: ['Tự Phối Theo Yêu Cầu'],
      price: totalCost,
      rating: 5.0,
      reviewsCount: 1,
      imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
      description: `Hộp bánh tự chọn gồm: ${flavorDetails.join(', ')}. ${selectedBox.name}. Kèm: ${addonNames.join(', ')}.`,
      meaning: 'Món quà tự tay chăm chút thể hiện thành ý vẹn tròn.',
      ingredients: flavorDetails,
      tags: ['Tự chọn DIY', 'Hộp quà độc bản'],
      inStock: true,
    };

    onAddToCart({
      id: `cart-custom-${Date.now()}`,
      flower: customMooncakeItem,
      size: 'standard',
      sizeLabel: 'Tự chọn DIY',
      unitPrice: totalCost,
      quantity: 1,
      greetingCardText: cardMessage,
      isCustomBouquet: true,
      customDetails: {
        flavors: flavorDetails,
        box: selectedBox.name,
        addons: addonNames,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-amber-200 relative my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            <Wand2 className="w-4 h-4" />
            <span>Thượng Phong Mooncake DIY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Tự Phối Hộp Quà Trung Thu Theo Yêu Cầu</h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light mt-1">
            Tự tay lựa chọn từng vị bánh, kiểu dáng hộp sang trọng và quà kèm độc đáo dành riêng cho người thân & đối tác!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns (Steps 1 to 4) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Flavor Options */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  Chọn các vị bánh nướng & bánh dẻo:
                </span>
                <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-full border border-amber-200">
                  Đã chọn: {totalCakes} bánh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MOONCAKE_FLAVOR_OPTIONS.map((f) => {
                  const qty = selectedFlavors[f.id] || 0;
                  return (
                    <div
                      key={f.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        qty > 0
                          ? 'bg-white border-amber-400 ring-1 ring-amber-300'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-2xl shrink-0">{f.img}</span>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-stone-900 block truncate">{f.name}</span>
                          <span className="text-[10px] text-amber-700 font-medium">{formatVND(f.unitPrice)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          onClick={() => updateFlavorQty(f.id, -1)}
                          className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{qty}</span>
                        <button
                          onClick={() => updateFlavorQty(f.id, 1)}
                          className="w-6 h-6 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Box Design */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                Chọn kiểu thiết kế hộp quà:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BOX_DESIGNS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBox(b)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedBox.id === b.id
                        ? 'bg-white border-amber-500 ring-1 ring-amber-500 text-stone-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: b.colorHex }} />
                      <span className="text-xs font-bold">{b.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-800">+{formatVND(b.extraPrice)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Addons */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                Thêm trà ngon & Quà tặng kèm:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((ad) => {
                  const isChecked = selectedAddons.includes(ad.id);
                  return (
                    <button
                      key={ad.id}
                      onClick={() => toggleAddon(ad.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-100/80 border-amber-500 text-amber-950 font-medium'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-semibold">{ad.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-stone-600">+{formatVND(ad.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Greeting card */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                4. Thiệp chúc mừng Trung Thu (Viết tay miễn phí):
              </label>
              <textarea
                rows={2}
                placeholder="Nhập câu chúc Trung Thu gửi trao người nhận..."
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-stone-800"
              />
            </div>
          </div>

          {/* Right Column: Live Price Summary */}
          <div className="bg-stone-900 text-white p-6 rounded-2xl flex flex-col justify-between border border-stone-800">
            <div>
              <div className="border-b border-stone-800 pb-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  BẢNG TÓM TẮT ĐẶT BÁNH
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-100">Hộp Quà Trung Thu DIY</h3>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-3 text-xs text-stone-300 mb-6">
                <div className="flex justify-between">
                  <span>Bánh trung thu ({totalCakes} bánh):</span>
                  <span className="font-semibold text-stone-100">{formatVND(cakesCost)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Vỏ hộp ({selectedBox.name}):</span>
                  <span className="font-semibold text-stone-100">{formatVND(boxCost)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Trà & Quà tặng kèm:</span>
                  <span className="font-semibold text-stone-100">{formatVND(addonsCost)}</span>
                </div>
              </div>

              {/* Recipe Checklist */}
              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/80 mb-6 text-xs space-y-1.5">
                <span className="text-amber-300 font-semibold block mb-1">🥮 Danh mục trong hộp:</span>
                {Object.entries(selectedFlavors)
                  .filter(([_, qty]: [string, number]) => qty > 0)
                  .map(([id, qty]) => {
                    const opt = MOONCAKE_FLAVOR_OPTIONS.find((o) => o.id === id);
                    return (
                      <p key={id} className="text-stone-200 text-[11px]">
                        • {qty}x {opt?.name}
                      </p>
                    );
                  })}
              </div>
            </div>

            {/* Total Price & Add Button */}
            <div>
              <div className="pt-4 border-t border-stone-800 flex items-baseline justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">TỔNG CỘNG:</span>
                <span className="font-serif font-bold text-2xl text-amber-300">{formatVND(totalCost)}</span>
              </div>

              <button
                disabled={totalCakes === 0}
                onClick={handleAddCustomToCart}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-950/40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Hộp Bánh Vào Giỏ</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

