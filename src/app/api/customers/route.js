import { NextResponse } from 'next/server';
import { createCustomer, getCustomer, getAllStores } from '@/lib/salla';

/**
 * تسجيل عميل جديد (من الموقع → سلة)
 * POST /api/customers
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, first_name, last_name, email, mobile, mobile_code } = body;

    let targetMerchant = merchant_id;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    // إنشاء العميل في سلة
    const customer = await createCustomer(targetMerchant, {
      first_name,
      last_name,
      email,
      mobile,
      mobile_code: mobile_code || '+966'
    });

    return NextResponse.json({
      success: true,
      message: 'Customer created successfully',
      data: customer.data
    });

  } catch (error) {
    console.error('❌ Create customer error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * جلب بيانات عميل
 * GET /api/customers?id=123
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchant_id');
    const customerId = searchParams.get('id');

    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
    }

    let targetMerchant = merchantId;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const customer = await getCustomer(targetMerchant, customerId);

    return NextResponse.json({
      success: true,
      data: customer.data
    });

  } catch (error) {
    console.error('❌ Get customer error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
