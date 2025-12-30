import { NextResponse } from 'next/server';
import { searchProducts, getAllStores } from '@/lib/salla';

/**
 * بحث المنتجات
 * GET /api/search?q=قميص
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Search query required' }, { status: 400 });
    }

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const results = await searchProducts(targetMerchant, query);

    return NextResponse.json({
      success: true,
      query: query,
      data: results.data
    });

  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
