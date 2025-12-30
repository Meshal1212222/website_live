import { NextResponse } from 'next/server';
import { getShippingMethods, getAllStores } from '@/lib/salla';

/**
 * جلب طرق الشحن
 * GET /api/shipping
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

    const shipping = await getShippingMethods(targetMerchant);

    return NextResponse.json({
      success: true,
      data: shipping.data
    });

  } catch (error) {
    console.error('❌ Shipping API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
