import { NextResponse } from 'next/server';
import { getStoreInfo, getCategories, getOffers, getCoupons, getAllStores } from '@/lib/salla';

/**
 * جلب معلومات المتجر
 * GET /api/store?merchant_id=xxx
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const include = searchParams.get('include')?.split(',') || ['info'];

    // إذا لم يحدد التاجر، نجلب من أول متجر مسجل
    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = getAllStores();
      if (stores.length === 0) {
        return NextResponse.json(
          { error: 'No stores connected. Please install the app from Salla.' },
          { status: 400 }
        );
      }
      targetMerchant = stores[0].merchantId;
    }

    const result = {};

    // جلب المعلومات المطلوبة
    if (include.includes('info') || include.includes('all')) {
      result.info = await getStoreInfo(targetMerchant);
    }

    if (include.includes('categories') || include.includes('all')) {
      result.categories = await getCategories(targetMerchant);
    }

    if (include.includes('offers') || include.includes('all')) {
      result.offers = await getOffers(targetMerchant);
    }

    if (include.includes('coupons') || include.includes('all')) {
      result.coupons = await getCoupons(targetMerchant);
    }

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Store API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch store info' },
      { status: 500 }
    );
  }
}
