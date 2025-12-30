import { NextResponse } from 'next/server';
import { createOrder, validateCoupon, getAllStores } from '@/lib/salla';

/**
 * إنشاء طلب
 * POST /api/cart/checkout
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, customer, items, coupon_code, shipping_address } = body;

    // إذا لم يحدد التاجر، نستخدم أول متجر مسجل
    let targetMerchant = merchant_id;
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

    // التحقق من الكوبون إذا موجود
    let couponValid = null;
    if (coupon_code) {
      try {
        couponValid = await validateCoupon(targetMerchant, coupon_code);
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid coupon code' },
          { status: 400 }
        );
      }
    }

    // إنشاء الطلب
    const orderData = {
      customer: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        mobile: customer.mobile,
      },
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        options: item.options || [],
      })),
      shipping_address: shipping_address,
      coupon_code: coupon_code || undefined,
    };

    const order = await createOrder(targetMerchant, orderData);

    return NextResponse.json({
      success: true,
      order: order.data,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('❌ Cart API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

/**
 * التحقق من كوبون
 * GET /api/cart/coupon?code=xxx&merchant_id=xxx
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const merchantId = searchParams.get('merchant_id');

    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    // إذا لم يحدد التاجر، نستخدم أول متجر مسجل
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

    const coupon = await validateCoupon(targetMerchant, code);

    return NextResponse.json({
      success: true,
      valid: true,
      coupon: coupon.data
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      valid: false,
      error: 'Invalid coupon code'
    });
  }
}
