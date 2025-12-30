/**
 * Salla API Service
 * للتعامل مع جميع طلبات API سلة
 */

const SALLA_API_BASE = 'https://api.salla.dev/admin/v2';

// تخزين مؤقت للـ tokens (في الإنتاج استخدم قاعدة بيانات)
let tokensStore = new Map();

/**
 * حفظ tokens المتجر
 */
export function saveStoreTokens(merchantId, tokens) {
  tokensStore.set(merchantId, {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: Date.now() + (tokens.expires_in * 1000),
    store_info: tokens.store_info || null
  });
}

/**
 * جلب tokens المتجر
 */
export function getStoreTokens(merchantId) {
  return tokensStore.get(merchantId);
}

/**
 * جلب كل المتاجر المسجلة
 */
export function getAllStores() {
  const stores = [];
  tokensStore.forEach((value, key) => {
    stores.push({ merchantId: key, ...value });
  });
  return stores;
}

/**
 * تجديد Access Token
 */
export async function refreshAccessToken(merchantId) {
  const stored = tokensStore.get(merchantId);
  if (!stored || !stored.refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://accounts.salla.sa/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.SALLA_CLIENT_ID,
      client_secret: process.env.SALLA_CLIENT_SECRET,
      refresh_token: stored.refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const tokens = await response.json();
  saveStoreTokens(merchantId, tokens);
  return tokens;
}

/**
 * إرسال طلب لـ Salla API
 */
export async function sallaRequest(merchantId, endpoint, options = {}) {
  let stored = tokensStore.get(merchantId);

  if (!stored) {
    throw new Error('Store not authorized');
  }

  // تجديد التوكن إذا انتهت صلاحيته
  if (Date.now() >= stored.expires_at) {
    await refreshAccessToken(merchantId);
    stored = tokensStore.get(merchantId);
  }

  const response = await fetch(`${SALLA_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${stored.access_token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Salla API request failed');
  }

  return response.json();
}

/**
 * جلب معلومات المتجر
 */
export async function getStoreInfo(merchantId) {
  return sallaRequest(merchantId, '/store/info');
}

/**
 * جلب المنتجات
 */
export async function getProducts(merchantId, page = 1, perPage = 20) {
  return sallaRequest(merchantId, `/products?page=${page}&per_page=${perPage}`);
}

/**
 * جلب منتج معين
 */
export async function getProduct(merchantId, productId) {
  return sallaRequest(merchantId, `/products/${productId}`);
}

/**
 * جلب التصنيفات
 */
export async function getCategories(merchantId) {
  return sallaRequest(merchantId, '/categories');
}

/**
 * جلب العروض
 */
export async function getOffers(merchantId) {
  return sallaRequest(merchantId, '/offers');
}

/**
 * جلب الكوبونات
 */
export async function getCoupons(merchantId) {
  return sallaRequest(merchantId, '/coupons');
}

/**
 * إنشاء طلب
 */
export async function createOrder(merchantId, orderData) {
  return sallaRequest(merchantId, '/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

/**
 * جلب إعدادات السيو
 */
export async function getSeoSettings(merchantId) {
  return sallaRequest(merchantId, '/store/seo');
}

/**
 * جلب طرق الشحن
 */
export async function getShippingMethods(merchantId) {
  return sallaRequest(merchantId, '/shipping/methods');
}

/**
 * جلب طرق الدفع
 */
export async function getPaymentMethods(merchantId) {
  return sallaRequest(merchantId, '/payment/methods');
}

/**
 * التحقق من كوبون
 */
export async function validateCoupon(merchantId, code) {
  return sallaRequest(merchantId, `/coupons/validate?code=${code}`);
}
