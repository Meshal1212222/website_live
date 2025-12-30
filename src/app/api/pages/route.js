import { NextResponse } from 'next/server';
import { getPages, getPage, getAllStores } from '@/lib/salla';

/**
 * جلب الصفحات (من نحن، تواصل معنا، السياسات...)
 * GET /api/pages
 * GET /api/pages?id=123
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const pageId = searchParams.get('id');

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    // جلب صفحة محددة أو كل الصفحات
    if (pageId) {
      const page = await getPage(targetMerchant, pageId);
      return NextResponse.json({ success: true, data: page.data });
    }

    const pages = await getPages(targetMerchant);

    return NextResponse.json({
      success: true,
      data: pages.data
    });

  } catch (error) {
    console.error('❌ Pages API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
