import { NextResponse } from 'next/server';
import { getProducts, getAllStores } from '@/lib/salla';

/**
 * جلب المنتجات
 * GET /api/products?merchant_id=xxx&page=1&per_page=20
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = parseInt(searchParams.get('per_page')) || 20;

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

    const products = await getProducts(targetMerchant, page, perPage);

    return NextResponse.json({
      success: true,
      data: products.data,
      pagination: products.pagination
    });

  } catch (error) {
    console.error('❌ Products API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
