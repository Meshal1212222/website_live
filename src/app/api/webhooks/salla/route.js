import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { saveStoreTokens } from '@/lib/salla';

/**
 * Salla Webhook Handler
 * يستقبل الأحداث من سلة
 */
export async function POST(request) {
  try {
    // التحقق من صحة الـ Signature
    const signature = request.headers.get('x-salla-signature');
    const rawBody = await request.text();

    if (signature && process.env.SALLA_WEBHOOK_SECRET) {
      const expectedSignature = createHmac('sha256', process.env.SALLA_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const body = JSON.parse(rawBody);
    const event = body.event;
    const data = body.data;
    const merchant = body.merchant;

    console.log('📥 Salla Webhook:', event);
    console.log('📦 Full payload:', JSON.stringify(body, null, 2));

    switch (event) {
      // تفويض التطبيق - النمط السهل
      case 'app.store.authorize':
        await handleStoreAuthorize(body);
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
async function handleStoreAuthorize(body) {
  // محاولة إيجاد معرف التاجر من مواقع مختلفة في الـ payload
  const merchantId = body.merchant?.id ||
                     body.merchant ||
                     body.data?.merchant?.id ||
                     body.data?.merchant ||
                     body.data?.store_id ||
                     body.data?.merchant_id ||
                     body.store_id ||
                     body.merchant_id;

  // التوكنات قد تكون في data أو في root
  const access_token = body.data?.access_token || body.access_token;
  const refresh_token = body.data?.refresh_token || body.refresh_token;
  const expires_in = body.data?.expires_in || body.expires_in || 14400;

  console.log('🔐 Store authorized:', merchantId);
  console.log('🔑 Access token exists:', !!access_token);

  if (!merchantId) {
    console.error('❌ Could not find merchant ID in payload');
    return;
  }

  if (!access_token) {
    console.error('❌ Could not find access token in payload');
    return;
  }

  // حفظ التوكنات
  await saveStoreTokens(merchantId.toString(), {
    access_token,
    refresh_token,
    expires_in,
  });

  console.log('✅ Tokens saved for merchant:', merchantId);
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
