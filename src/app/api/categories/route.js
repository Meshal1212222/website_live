import { NextResponse } from 'next/server';
import { getCategories, getAllStores } from '@/lib/salla';

/**
 * جلب التصنيفات
 * GET /api/categories
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const categories = await getCategories(targetMerchant);

    return NextResponse.json({
      success: true,
      data: categories.data
    });

  } catch (error) {
    console.error('❌ Categories API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
