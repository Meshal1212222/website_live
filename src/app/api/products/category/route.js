import { NextResponse } from 'next/server';
import { getProductsByCategory, getAllStores } from '@/lib/salla';

/**
 * جلب المنتجات حسب التصنيف
 * GET /api/products/category?category_id=xxx&merchant_id=xxx&page=1
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const categoryId = searchParams.get('category_id');
    const page = parseInt(searchParams.get('page')) || 1;

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // إذا لم يحدد التاجر، نستخدم أول متجر
    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json(
          { error: 'No stores connected' },
          { status: 400 }
        );
      }
      targetMerchant = stores[0].merchantId;
    }

    const products = await getProductsByCategory(targetMerchant, categoryId, page);

    return NextResponse.json({
      success: true,
      data: products.data,
      pagination: products.pagination
    });

  } catch (error) {
    console.error('❌ Products by Category API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
