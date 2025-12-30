import { NextResponse } from 'next/server';
import { getBrands, getAllStores } from '@/lib/salla';

/**
 * جلب الماركات
 * GET /api/brands
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

    const brands = await getBrands(targetMerchant);

    return NextResponse.json({
      success: true,
      data: brands.data
    });

  } catch (error) {
    console.error('❌ Brands API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
