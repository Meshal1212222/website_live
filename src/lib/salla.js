/**
 * Salla API Service - Full Sync
 * تزامن كامل مع سلة
 */

import { saveStoreTokens as fbSaveTokens, getStoreTokens as fbGetTokens, getAllStores as fbGetAllStores } from './firebase';

const SALLA_API_BASE = 'https://api.salla.dev/admin/v2';

// ============================================
// Token Management
// ============================================

export async function saveStoreTokens(merchantId, tokens) {
  await fbSaveTokens(merchantId, tokens);
}

export async function getStoreTokens(merchantId) {
  return await fbGetTokens(merchantId);
}

export async function getAllStores() {
  return await fbGetAllStores();
}

export async function refreshAccessToken(merchantId) {
  const stored = await getStoreTokens(merchantId);
  if (!stored || !stored.refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://accounts.salla.sa/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.SALLA_CLIENT_ID,
      client_secret: process.env.SALLA_CLIENT_SECRET,
      refresh_token: stored.refresh_token,
    }),
  });

  if (!response.ok) throw new Error('Failed to refresh token');
  const tokens = await response.json();
  await saveStoreTokens(merchantId, tokens);
  return tokens;
}

export async function sallaRequest(merchantId, endpoint, options = {}) {
  let stored = await getStoreTokens(merchantId);
  if (!stored) throw new Error('Store not authorized');

  if (Date.now() >= stored.expires_at) {
    await refreshAccessToken(merchantId);
    stored = await getStoreTokens(merchantId);
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

// ============================================
// Store Info (GET) - معلومات المتجر
// ============================================

export async function getStoreInfo(merchantId) {
  return sallaRequest(merchantId, '/store/info');
}

export async function getStoreSeo(merchantId) {
  return sallaRequest(merchantId, '/store/seo');
}

// ============================================
// Categories (GET) - التصنيفات
// ============================================

export async function getCategories(merchantId) {
  return sallaRequest(merchantId, '/categories');
}

export async function getCategory(merchantId, categoryId) {
  return sallaRequest(merchantId, `/categories/${categoryId}`);
}

// ============================================
// Products (GET) - المنتجات
// ============================================

export async function getProducts(merchantId, page = 1, perPage = 20) {
  return sallaRequest(merchantId, `/products?page=${page}&per_page=${perPage}`);
}

export async function getProduct(merchantId, productId) {
  return sallaRequest(merchantId, `/products/${productId}`);
}

export async function getProductsByCategory(merchantId, categoryId, page = 1) {
  return sallaRequest(merchantId, `/products?category_id=${categoryId}&page=${page}`);
}

export async function searchProducts(merchantId, query) {
  return sallaRequest(merchantId, `/products?keyword=${encodeURIComponent(query)}`);
}

// ============================================
// Pages (GET) - الصفحات
// ============================================

export async function getPages(merchantId) {
  return sallaRequest(merchantId, '/pages');
}

export async function getPage(merchantId, pageId) {
  return sallaRequest(merchantId, `/pages/${pageId}`);
}

// ============================================
// Offers & Coupons (GET) - العروض والكوبونات
// ============================================

export async function getOffers(merchantId) {
  return sallaRequest(merchantId, '/offers');
}

export async function getCoupons(merchantId) {
  return sallaRequest(merchantId, '/coupons');
}

export async function validateCoupon(merchantId, code) {
  return sallaRequest(merchantId, `/coupons/validate?code=${code}`);
}

// ============================================
// Customers (GET & POST) - العملاء
// ============================================

export async function getCustomers(merchantId) {
  return sallaRequest(merchantId, '/customers');
}

export async function getCustomer(merchantId, customerId) {
  return sallaRequest(merchantId, `/customers/${customerId}`);
}

// ⬆️ POST - إضافة عميل جديد للسلة
export async function createCustomer(merchantId, customerData) {
  return sallaRequest(merchantId, '/customers', {
    method: 'POST',
    body: JSON.stringify({
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      mobile: customerData.mobile,
      mobile_code: customerData.mobile_code || '+966',
    }),
  });
}

// ⬆️ PUT - تحديث بيانات العميل
export async function updateCustomer(merchantId, customerId, customerData) {
  return sallaRequest(merchantId, `/customers/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify(customerData),
  });
}

// ============================================
// Orders (GET & POST) - الطلبات
// ============================================

export async function getOrders(merchantId, page = 1) {
  return sallaRequest(merchantId, `/orders?page=${page}`);
}

export async function getOrder(merchantId, orderId) {
  return sallaRequest(merchantId, `/orders/${orderId}`);
}

// ⬆️ POST - إنشاء طلب جديد (من الموقع الخارجي → سلة)
export async function createOrder(merchantId, orderData) {
  return sallaRequest(merchantId, '/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

// ============================================
// Reviews (GET & POST) - المراجعات
// ============================================

export async function getProductReviews(merchantId, productId) {
  return sallaRequest(merchantId, `/products/${productId}/reviews`);
}

// ⬆️ POST - إضافة مراجعة (من الموقع → سلة)
export async function createReview(merchantId, productId, reviewData) {
  return sallaRequest(merchantId, `/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      rating: reviewData.rating,
      comment: reviewData.comment,
      customer_name: reviewData.customer_name,
      customer_email: reviewData.customer_email,
    }),
  });
}

// ============================================
// Shipping & Payment - الشحن والدفع
// ============================================

export async function getShippingMethods(merchantId) {
  return sallaRequest(merchantId, '/shipping/methods');
}

export async function getPaymentMethods(merchantId) {
  return sallaRequest(merchantId, '/payment/methods');
}

// ============================================
// Brands - الماركات
// ============================================

export async function getBrands(merchantId) {
  return sallaRequest(merchantId, '/brands');
}

export async function getBrand(merchantId, brandId) {
  return sallaRequest(merchantId, `/brands/${brandId}`);
}

// ============================================
// Cart - سلة التسوق
// ============================================

export async function calculateCart(merchantId, items, couponCode = null) {
  const body = { items };
  if (couponCode) body.coupon_code = couponCode;

  return sallaRequest(merchantId, '/cart/calculate', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// ============================================
// Checkout - الدفع (Headless)
// ============================================

/**
 * إنشاء رابط دفع مباشر
 * يرسل العميل لصفحة الدفع في سلة
 */
export async function createCheckout(merchantId, checkoutData) {
  // إنشاء السلة أولاً
  const cartResult = await sallaRequest(merchantId, '/carts', {
    method: 'POST',
    body: JSON.stringify({
      items: checkoutData.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    }),
  });

  return cartResult;
}

/**
 * الحصول على رابط الدفع المباشر من المنتج
 */
export function getProductCheckoutUrl(product, quantity = 1) {
  // رابط الإضافة للسلة في سلة مباشرة
  if (product.urls?.customer) {
    return `${product.urls.customer}?add-to-cart=${product.id}&quantity=${quantity}`;
  }
  return null;
}

/**
 * بناء رابط checkout لعدة منتجات
 */
export function buildCheckoutUrl(storeUrl, items) {
  // بناء رابط السلة مع المنتجات
  const params = items.map(item => `cart[${item.product_id}]=${item.quantity}`).join('&');
  return `https://${storeUrl}/cart?${params}`;
}

// ============================================
// Wishlist - المفضلة
// ============================================

export async function addToWishlist(merchantId, customerId, productId) {
  return sallaRequest(merchantId, `/customers/${customerId}/wishlist`, {
    method: 'POST',
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function getWishlist(merchantId, customerId) {
  return sallaRequest(merchantId, `/customers/${customerId}/wishlist`);
}

// ============================================
// Addresses - العناوين
// ============================================

export async function getCustomerAddresses(merchantId, customerId) {
  return sallaRequest(merchantId, `/customers/${customerId}/addresses`);
}

export async function createCustomerAddress(merchantId, customerId, addressData) {
  return sallaRequest(merchantId, `/customers/${customerId}/addresses`, {
    method: 'POST',
    body: JSON.stringify(addressData),
  });
}

// ============================================
// Contact - التواصل
// ============================================

// ⬆️ POST - إرسال رسالة تواصل (من الموقع → سلة)
export async function sendContactMessage(merchantId, messageData) {
  return sallaRequest(merchantId, '/contacts', {
    method: 'POST',
    body: JSON.stringify({
      name: messageData.name,
      email: messageData.email,
      phone: messageData.phone,
      message: messageData.message,
    }),
  });
}
