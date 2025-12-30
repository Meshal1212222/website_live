import { NextResponse } from 'next/server';
import { getProduct, getAllStores } from '@/lib/salla';

/**
 * جلب منتج واحد
 * GET /api/product?merchant_id=xxx&product_id=xxx
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const productId = searchParams.get('product_id');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // إذا لم يحدد التاجر، نجلب من أول متجر مسجل
    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json(
          { error: 'No stores connected. Please install the app from Salla.' },
          { status: 400 }
        );
      }
      targetMerchant = stores[0].merchantId;
    }

    const product = await getProduct(targetMerchant, productId);

    return NextResponse.json({
      success: true,
      data: product.data
    });

  } catch (error) {
    console.error('❌ Product API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
