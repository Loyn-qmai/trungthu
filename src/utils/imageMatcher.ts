// Utility for automatically finding high-quality matching mooncake imagery for products without an image

export const MOONCAKE_IMAGE_PRESETS: Record<string, string[]> = {
  nuong_thap_cam: [
    "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
  ],
  nuong_trung_muoi: [
    "https://images.unsplash.com/photo-1630406144797-821be1f35d75?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
  ],
  banh_deo: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=800&q=80",
  ],
  hop_qua_bieu: [
    "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  ],
  lava_trung_chay: [
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  ],
  banh_chay: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  ],
  general: [
    "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1630406144797-821be1f35d75?auto=format&fit=crop&w=800&q=80",
  ],
};

export const FLOWER_IMAGE_PRESETS = MOONCAKE_IMAGE_PRESETS;

/**
 * Returns a high-quality matching mooncake image URL based on product name & category keywords
 */
export function getMatchingMooncakeImage(name: string, category?: string): string {
  const lowerName = (name || "").toLowerCase();
  const lowerCategory = (category || "").toLowerCase();

  // Keyword check
  if (lowerName.includes("thập cẩm") || lowerName.includes("gà quay") || lowerName.includes("xá xíu")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.nuong_thap_cam);
  }
  if (lowerName.includes("dẻo") || lowerName.includes("sen bưởi") || lowerCategory.includes("deo")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.banh_deo);
  }
  if (lowerName.includes("lava") || lowerName.includes("trứng chảy") || lowerName.includes("sầu riêng") || lowerName.includes("matcha")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.lava_trung_chay);
  }
  if (lowerName.includes("hộp") || lowerName.includes("biếu") || lowerName.includes("hoàng gia") || lowerCategory.includes("hop-qua")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.hop_qua_bieu);
  }
  if (lowerName.includes("chay") || lowerName.includes("ăn kiêng") || lowerName.includes("hạt") || lowerCategory.includes("chay")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.banh_chay);
  }
  if (lowerName.includes("trứng") || lowerName.includes("đậu xanh") || lowerName.includes("hạt sen")) {
    return getRandom(MOONCAKE_IMAGE_PRESETS.nuong_trung_muoi);
  }

  // Fallback default
  return getRandom(MOONCAKE_IMAGE_PRESETS.general);
}

// Backward compatibility alias
export const getMatchingFlowerImage = getMatchingMooncakeImage;

function getRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

