import { NextResponse } from 'next/server';
import { getOrders, getOrder, createOrder, getAllStores } from '@/lib/salla';

/**
 * جلب الطلبات
 * GET /api/orders
 * GET /api/orders?id=123 (طلب محدد)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const orderId = searchParams.get('id');
    const page = searchParams.get('page') || 1;

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    // If specific order requested
    if (orderId) {
      const order = await getOrder(targetMerchant, orderId);
      return NextResponse.json({
        success: true,
        data: order.data
      });
    }

    // Get all orders
    const orders = await getOrders(targetMerchant, page);

    return NextResponse.json({
      success: true,
      data: orders.data,
      pagination: orders.pagination
    });

  } catch (error) {
    console.error('❌ Orders API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * إنشاء طلب جديد (من الموقع الخارجي → سلة)
 * POST /api/orders
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, customer, items, shipping_address, payment_method } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order items required' }, { status: 400 });
    }

    let targetMerchant = merchant_id;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const order = await createOrder(targetMerchant, {
      customer,
      items,
      shipping_address,
      payment_method
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: order.data
    });

  } catch (error) {
    console.error('❌ Create order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
