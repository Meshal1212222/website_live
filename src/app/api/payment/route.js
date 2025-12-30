import { NextResponse } from 'next/server';
import { getPaymentMethods, getAllStores } from '@/lib/salla';

/**
 * جلب طرق الدفع
 * GET /api/payment
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

    const payment = await getPaymentMethods(targetMerchant);

    return NextResponse.json({
      success: true,
      data: payment.data
    });

  } catch (error) {
    console.error('❌ Payment API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
