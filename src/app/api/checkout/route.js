import { NextResponse } from 'next/server';
import { getStoreInfo, getProduct, getAllStores } from '@/lib/salla';

/**
 * Checkout API - إنشاء رابط الدفع في سلة
 * POST /api/checkout
 *
 * يستقبل المنتجات ويرجع رابط الدفع في سلة
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, items, return_url } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // إذا لم يحدد التاجر، نستخدم أول متجر
    let targetMerchant = merchant_id;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json(
          { error: 'No stores connected' },
          { status: 400 }
        );
      }
      targetMerchant = stores[0].merchantId;
    }

    // جلب معلومات المتجر للحصول على الرابط
    const storeInfo = await getStoreInfo(targetMerchant);
    const storeUrl = storeInfo?.data?.domain || storeInfo?.data?.url;

    if (!storeUrl) {
      return NextResponse.json(
        { error: 'Could not get store URL' },
        { status: 400 }
      );
    }

    // بناء رابط السلة مع المنتجات
    // سلة تدعم إضافة منتجات للسلة عبر الرابط
    const cartParams = items.map(item =>
      `add-to-cart=${item.product_id}&quantity=${item.quantity}`
    ).join('&');

    // رابط الدفع المباشر
    // الطريقة 1: إضافة للسلة ثم الانتقال للدفع
    const checkoutUrl = `https://${storeUrl}/cart?${cartParams}&proceed=checkout`;

    // الطريقة 2: رابط منتج واحد (للطلبات السريعة)
    let quickBuyUrl = null;
    if (items.length === 1) {
      try {
        const product = await getProduct(targetMerchant, items[0].product_id);
        if (product?.data?.urls?.customer) {
          quickBuyUrl = `${product.data.urls.customer}?add-to-cart=${items[0].product_id}&quantity=${items[0].quantity}`;
        }
      } catch (e) {
        console.log('Could not get product URL');
      }
    }

    return NextResponse.json({
      success: true,
      checkout_url: checkoutUrl,
      quick_buy_url: quickBuyUrl,
      store_url: storeUrl,
      instructions: {
        ar: 'سيتم تحويلك لصفحة الدفع في سلة لإتمام عملية الشراء',
        en: 'You will be redirected to Salla checkout to complete your purchase'
      }
    });

  } catch (error) {
    console.error('❌ Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    );
  }
}

/**
 * GET - الحصول على رابط الدفع لمنتج واحد
 * /api/checkout?merchant_id=xxx&product_id=xxx&quantity=1
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const productId = searchParams.get('product_id');
    const quantity = parseInt(searchParams.get('quantity')) || 1;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json(
          { error: 'No stores connected' },
          { status: 400 }
        );
      }
      targetMerchant = stores[0].merchantId;
    }

    // جلب المنتج للحصول على رابط الدفع
    const product = await getProduct(targetMerchant, productId);

    if (!product?.data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productUrl = product.data.urls?.customer;
    const checkoutUrl = productUrl
      ? `${productUrl}?add-to-cart=${productId}&quantity=${quantity}`
      : null;

    return NextResponse.json({
      success: true,
      product: {
        id: product.data.id,
        name: product.data.name,
        price: product.data.price,
        thumbnail: product.data.thumbnail,
      },
      checkout_url: checkoutUrl,
      quantity
    });

  } catch (error) {
    console.error('❌ Checkout GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get checkout URL' },
      { status: 500 }
    );
  }
}
