import { NextResponse } from 'next/server';
import { createReview, getProductReviews, getAllStores } from '@/lib/salla';

/**
 * إضافة مراجعة (من الموقع → سلة)
 * POST /api/reviews
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, product_id, rating, comment, customer_name, customer_email } = body;

    if (!product_id || !rating) {
      return NextResponse.json({ error: 'Product ID and rating required' }, { status: 400 });
    }

    let targetMerchant = merchant_id;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const review = await createReview(targetMerchant, product_id, {
      rating,
      comment,
      customer_name,
      customer_email
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      data: review.data
    });

  } catch (error) {
    console.error('❌ Create review error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * جلب مراجعات منتج
 * GET /api/reviews?product_id=123
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const productId = searchParams.get('product_id');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const reviews = await getProductReviews(targetMerchant, productId);

    return NextResponse.json({
      success: true,
      data: reviews.data
    });

  } catch (error) {
    console.error('❌ Get reviews error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
