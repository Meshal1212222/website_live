import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK للـ Server-side
 */

let db = null;

export function initFirebaseAdmin() {
  if (getApps().length === 0) {
    // التحقق من وجود Service Account
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
      // استخدام Service Account JSON
      initializeApp({
        credential: cert(JSON.parse(serviceAccount)),
      });
    } else {
      // استخدام متغيرات البيئة المنفصلة
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  db = getFirestore();
  return db;
}

export function getDb() {
  if (!db) {
    return initFirebaseAdmin();
  }
  return db;
}

// ============================================
// Store Tokens Operations
// ============================================

/**
 * حفظ tokens المتجر
 */
export async function saveStoreTokens(merchantId, tokens) {
  const db = getDb();

  await db.collection('stores').doc(merchantId).set({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: Date.now() + (tokens.expires_in * 1000),
    store_info: tokens.store_info || null,
    created_at: tokens.created_at || Date.now(),
    updated_at: Date.now(),
  }, { merge: true });

  console.log('✅ Tokens saved for merchant:', merchantId);
}

/**
 * جلب tokens المتجر
 */
export async function getStoreTokens(merchantId) {
  const db = getDb();

  const doc = await db.collection('stores').doc(merchantId).get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}

/**
 * جلب كل المتاجر المسجلة
 */
export async function getAllStores() {
  const db = getDb();

  const snapshot = await db.collection('stores').get();

  const stores = [];
  snapshot.forEach(doc => {
    stores.push({ merchantId: doc.id, ...doc.data() });
  });

  return stores;
}

/**
 * حذف متجر
 */
export async function deleteStore(merchantId) {
  const db = getDb();
  await db.collection('stores').doc(merchantId).delete();
  console.log('🗑️ Store deleted:', merchantId);
}

/**
 * تحديث معلومات المتجر
 */
export async function updateStoreInfo(merchantId, storeInfo) {
  const db = getDb();

  await db.collection('stores').doc(merchantId).update({
    store_info: storeInfo,
    updated_at: Date.now(),
  });
}

// ============================================
// Subscribers Operations (للنشرة البريدية)
// ============================================

/**
 * إضافة مشترك جديد
 */
export async function addSubscriber(email) {
  const db = getDb();

  await db.collection('subscribers').doc(email).set({
    email,
    subscribed_at: Date.now(),
    status: 'active',
  });

  console.log('📧 New subscriber:', email);
}

/**
 * جلب كل المشتركين
 */
export async function getAllSubscribers() {
  const db = getDb();

  const snapshot = await db.collection('subscribers').get();

  const subscribers = [];
  snapshot.forEach(doc => {
    subscribers.push(doc.data());
  });

  return subscribers;
}

// ============================================
// Analytics Operations
// ============================================

/**
 * تسجيل حدث
 */
export async function logEvent(eventName, data) {
  const db = getDb();

  await db.collection('events').add({
    event: eventName,
    data,
    timestamp: Date.now(),
  });
}

/**
 * جلب إحصائيات المتجر
 */
export async function getStoreAnalytics(merchantId) {
  const db = getDb();

  const doc = await db.collection('analytics').doc(merchantId).get();

  if (!doc.exists) {
    return { views: 0, orders: 0, revenue: 0 };
  }

  return doc.data();
}
