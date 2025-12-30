import { NextResponse } from 'next/server';
import { saveStoreTokens } from '@/lib/salla';

/**
 * Salla Webhook Handler
 * يستقبل الأحداث من سلة
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const event = body.event;
    const data = body.data;

    console.log('📥 Salla Webhook:', event);

    switch (event) {
      // تفويض التطبيق - النمط السهل
      case 'app.store.authorize':
        await handleStoreAuthorize(data);
        break;

      // تحديث المنتج
      case 'product.created':
      case 'product.updated':
        await handleProductUpdate(data);
        break;

      // حذف المنتج
      case 'product.deleted':
        await handleProductDelete(data);
        break;

      // طلب جديد
      case 'order.created':
        await handleNewOrder(data);
        break;

      // تحديث حالة الطلب
      case 'order.updated':
        await handleOrderUpdate(data);
        break;

      // تثبيت التطبيق
      case 'app.installed':
        console.log('✅ App installed for merchant:', data.merchant);
        break;

      // إلغاء تثبيت التطبيق
      case 'app.uninstalled':
        console.log('❌ App uninstalled for merchant:', data.merchant);
        break;

      default:
        console.log('📌 Unhandled event:', event);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * معالجة تفويض المتجر (النمط السهل)
 */
async function handleStoreAuthorize(data) {
  const { access_token, refresh_token, expires_in, merchant } = data;

  console.log('🔐 Store authorized:', merchant);

  // حفظ التوكنات
  saveStoreTokens(merchant.toString(), {
    access_token,
    refresh_token,
    expires_in,
  });

  console.log('✅ Tokens saved for merchant:', merchant);
}

/**
 * معالجة تحديث المنتج
 */
async function handleProductUpdate(data) {
  console.log('📦 Product updated:', data.id);
  // يمكن إضافة logic لتحديث الكاش أو إرسال إشعار
}

/**
 * معالجة حذف المنتج
 */
async function handleProductDelete(data) {
  console.log('🗑️ Product deleted:', data.id);
  // يمكن إضافة logic لحذف من الكاش
}

/**
 * معالجة طلب جديد
 */
async function handleNewOrder(data) {
  console.log('🛒 New order:', data.id);
  // يمكن إرسال إشعار للتاجر
}

/**
 * معالجة تحديث الطلب
 */
async function handleOrderUpdate(data) {
  console.log('📝 Order updated:', data.id);
}

// التحقق من صحة الـ webhook (اختياري للأمان الإضافي)
export async function GET() {
  return NextResponse.json({
    status: 'Salla webhook endpoint is ready',
    supported_events: [
      'app.store.authorize',
      'app.installed',
      'app.uninstalled',
      'product.created',
      'product.updated',
      'product.deleted',
      'order.created',
      'order.updated'
    ]
  });
}
