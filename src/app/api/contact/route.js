import { NextResponse } from 'next/server';
import { sendContactMessage, getAllStores } from '@/lib/salla';

/**
 * إرسال رسالة تواصل (من الموقع → سلة)
 * POST /api/contact
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { merchant_id, name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message required' }, { status: 400 });
    }

    let targetMerchant = merchant_id;
    if (!targetMerchant) {
      const stores = await getAllStores();
      if (stores.length === 0) {
        return NextResponse.json({ error: 'No stores connected' }, { status: 400 });
      }
      targetMerchant = stores[0].merchantId;
    }

    const contact = await sendContactMessage(targetMerchant, {
      name,
      email,
      phone,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: contact.data
    });

  } catch (error) {
    console.error('❌ Contact error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
