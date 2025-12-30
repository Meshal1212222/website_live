import { NextResponse } from 'next/server';
import { getStoreInfo, getCategories, getProducts, getAllStores } from '@/lib/salla';

/**
 * Widget Configuration API
 * GET /api/widget?merchant_id=xxx
 *
 * Returns store info and initial data for widget
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

    // Fetch store info, categories, and products in parallel
    const [storeInfo, categories, products] = await Promise.all([
      getStoreInfo(targetMerchant).catch(() => null),
      getCategories(targetMerchant).catch(() => ({ data: [] })),
      getProducts(targetMerchant, 1, 12).catch(() => ({ data: [] })),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        store: storeInfo?.data || null,
        categories: categories?.data || [],
        products: products?.data || [],
        widget_url: `${process.env.NEXT_PUBLIC_APP_URL}/widget.js`,
        embed_code: `<!-- Mawqi Widget -->
<script src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js" data-merchant="${targetMerchant}"></script>

<!-- اختر ما تريد عرضه -->
<div id="mawqi-search"></div>
<div id="mawqi-categories"></div>
<div id="mawqi-products"></div>`,
      }
    });

  } catch (error) {
    console.error('❌ Widget API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
