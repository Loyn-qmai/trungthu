export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscountPercentage(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If the input is plain text (e.g. flower name from a hyperlink text), it's not a valid image URL
  if (!/^(https?:\/\/|data:image)/i.test(trimmed)) {
    return '';
  }

  if (
    trimmed.includes('drive.google.com') ||
    trimmed.includes('docs.google.com') ||
    trimmed.includes('googleusercontent.com')
  ) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Use Google direct CDN endpoint for primary rendering
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  return trimmed;
}

export function parsePrice(val: any): number {
  if (typeof val === 'number') {
    if (val < 1000 && val > 0) return Math.round(val * 1000);
    return Math.round(val);
  }
  if (val === undefined || val === null) return 50000;
  let str = String(val).toLowerCase().trim();
  if (!str || str === '—' || str === '-' || str === 'null' || str === 'undefined') return 50000;

  // Handle "48k", "160k", "140k", "75.5k", "165k5", "48k 1 cái"
  if (str.includes('k')) {
    const match = str.match(/(\d+([.,]\d+)?)\s*k/);
    if (match) {
      const num = parseFloat(match[1].replace(',', '.'));
      if (!isNaN(num)) return Math.round(num * 1000);
    }
  }

  // Handle "1.5tr", "1,5tr", "1m5"
  if (str.includes('tr') || str.includes('m')) {
    const match = str.match(/(\d+([.,]\d+)?)\s*(tr|m)/);
    if (match) {
      const num = parseFloat(match[1].replace(',', '.'));
      if (!isNaN(num)) return Math.round(num * 1000000);
    }
  }

  // Clean formatted numbers like "200.000", "200,000", "200.000đ", "48000"
  const digitsOnly = str.replace(/[^\d]/g, '');
  if (digitsOnly) {
    const num = parseInt(digitsOnly, 10);
    if (!isNaN(num)) {
      if (num < 1000 && num > 0) return num * 1000;
      return num;
    }
  }

  return 50000;
}
