import { MooncakeItem, OccasionId, MooncakeCategory } from '../types';

export const OCCASIONS: { id: OccasionId; name: string; icon: string; description: string }[] = [
  { id: 'all', name: 'Tất cả dịp', icon: '🌕', description: 'Tất cả các dòng bánh & hộp quà Trung Thu' },
  { id: 'bieu-tang', name: 'Biếu Tặng Đối Tác', icon: '🎁', description: 'Hộp quà cao cấp, thiết kế sang trọng' },
  { id: 'gia-dinh', name: 'Sum Vầy Gia Đình', icon: '🥮', description: 'Hương vị truyền thống ấm áp tình thân' },
  { id: 'tre-em', name: 'Trẻ Em & Bạn Bè', icon: '🏮', description: 'Bánh nhân chảy, socola & lava hiện đại' },
  { id: 'an-kieng', name: 'Ăn Kiêng & Thanh Đạm', icon: '🍃', description: 'Ít ngọt, đường Isomalt & hạt dinh dưỡng' },
];

export const CATEGORIES: { id: MooncakeCategory | 'all'; name: string; icon?: string }[] = [
  { id: 'all', name: 'Tất cả danh mục', icon: '🥮' },
  { id: 'huong-vi-truyen-thong', name: 'Hương Vị Truyền Thống', icon: '🏮' },
  { id: 'huong-vi-hien-dai', name: 'Hương Vị Hiện Đại', icon: '✨' },
  { id: 'banh-truyen-thong', name: 'Bánh Nướng Truyền Thống', icon: '🥮' },
  { id: 'banh-deo', name: 'Bánh Dẻo Thượng Hạng', icon: '🌕' },
  { id: 'banh-hien-dai', name: 'Bánh Hiện Đại & Trứng Chảy', icon: '🍮' },
  { id: 'hop-qua-bieu', name: 'Hộp Quà Biếu Hoàng Gia', icon: '🎁' },
  { id: 'banh-chay', name: 'Bánh Ăn Kiêng & Hạt Dinh Dưỡng', icon: '🍃' },
  { id: 'combo-tu-chon', name: 'Set Combo', icon: '🍱' },
];

export const SAMPLE_MOONCAKES: MooncakeItem[] = [];

export const BOX_STYLES = [
  { id: 'b-hoang-gia', name: 'Hộp Sơn Mài Hoàng Gia (Red-Gold)', extraPrice: 150000, desc: 'Dát vàng 24K, lót lụa vàng' },
  { id: 'b-nguyet-cat', name: 'Hộp Giấy Cứng Cao Cấp Đỏ', extraPrice: 80000, desc: 'Họa tiết trăng rằm dập nổi' },
  { id: 'b-truyen-thong', name: 'Hộp Truyền Thống Hoa Bách Hợp', extraPrice: 50000, desc: 'Ấm áp hoài niệm' },
  { id: 'b-go-vip', name: 'Hộp Gỗ VIP Khóa Đồng', extraPrice: 250000, desc: 'Đẳng cấp biếu đối tác lớn' },
];

export const RIBBONS = [
  { id: 'r-gold', name: 'Nơ Vàng Gold Hoàng Kim', colorHex: '#D97706' },
  { id: 'r-do', name: 'Nơ Đỏ Nhung Sang Trọng', colorHex: '#DC2626' },
  { id: 'r-cam', name: 'Nơ Cam Ấm Áp', colorHex: '#EA580C' },
  { id: 'r-xanh', name: 'Nơ Trà Xanh Bách Thảo', colorHex: '#15803D' },
];

export const INDIVIDUAL_MOONCAKE_OPTIONS = [
  { id: 'm-thap-cam', name: 'Bánh Nướng Thập Cẩm Gà Quay', unitPrice: 150000, img: '🥮' },
  { id: 'm-dau-xanh', name: 'Bánh Nướng Đậu Xanh Trứng Muối', unitPrice: 120000, img: '🌕' },
  { id: 'm-hat-sen', name: 'Bánh Nướng Hạt Sen Trà Xanh', unitPrice: 125000, img: '🍵' },
  { id: 'm-lava', name: 'Bánh Lava Trứng Chảy Hongkong', unitPrice: 140000, img: '🥚' },
  { id: 'm-sau-rieng', name: 'Bánh Sầu Riêng Musang King', unitPrice: 160000, img: '🟡' },
  { id: 'm-deo-sen', name: 'Bánh Dẻo Hương Hoa Bưởi', unitPrice: 110000, img: '⚪' },
];

export const GIFT_ADDONS = [
  { id: 'a-tra-o-long', name: 'Hũ Trà Ô Long Thượng Hạng (100g)', price: 150000 },
  { id: 'a-den-long', name: 'Lồng Đèn Thỏ Ngọc Xinh Xắn', price: 50000 },
  { id: 'a-thiep', name: 'Thiệp Trăng Rằm Viết Tay Thủ Công', price: 20000 },
  { id: 'a-tui-xach', name: 'Túi Xách Sơn Mài Đồng Bộ', price: 30000 },
];

// Compatibility exports
export const SAMPLE_FLOWERS = SAMPLE_MOONCAKES;
export const BOKET_WRAPPERS = BOX_STYLES;
export const MAIN_FLOWERS_OPTIONS = INDIVIDUAL_MOONCAKE_OPTIONS;
export const SECONDARY_FLOWERS_OPTIONS = GIFT_ADDONS;
