/**
 * Email Service - Resend
 * خدمة الإيميلات
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'موقعي لايف <noreply@mawqi.live>';

/**
 * إرسال إيميل
 */
export async function sendEmail({ to, subject, html, text }) {
  if (!RESEND_API_KEY) {
    console.log('⚠️ RESEND_API_KEY not set, skipping email');
    console.log('📧 Would send email to:', to);
    console.log('📧 Subject:', subject);
    return { success: true, skipped: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
        text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Email send failed:', data);
      return { success: false, error: data };
    }

    console.log('✅ Email sent successfully:', data.id);
    return { success: true, id: data.id };

  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * إيميل ترحيب للتاجر الجديد
 */
export async function sendWelcomeEmail(merchant) {
  const { email, name, storeName, merchantId } = merchant;

  const subject = `🎉 مرحباً بك في موقعي لايف - ${storeName}`;

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 40px; }
    .content h2 { color: #333; margin-top: 0; }
    .content p { color: #666; line-height: 1.8; }
    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .features { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .features li { margin: 10px 0; color: #555; }
    .footer { background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px; }
    .code-box { background: #f0f0f0; padding: 15px; border-radius: 5px; font-family: monospace; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 موقعي لايف</h1>
      <p>أهلاً وسهلاً بك!</p>
    </div>
    <div class="content">
      <h2>مرحباً ${name || 'عزيزي التاجر'}! 👋</h2>
      <p>تم تفعيل تطبيق <strong>موقعي لايف</strong> على متجرك <strong>${storeName}</strong> بنجاح!</p>

      <div class="features">
        <h3>🎁 ماذا يمكنك فعله الآن:</h3>
        <ul>
          <li>✅ ربط موقعك الخارجي بمتجر سلة</li>
          <li>✅ عرض منتجاتك على أي موقع</li>
          <li>✅ مزامنة تلقائية للمنتجات والطلبات</li>
          <li>✅ تجربة Headless Commerce</li>
        </ul>
      </div>

      <h3>🔗 كود التكامل الخاص بك:</h3>
      <div class="code-box">
        &lt;script src="https://wepsitelive-production.up.railway.app/widget.js?merchant=${merchantId}"&gt;&lt;/script&gt;
      </div>

      <p>أضف هذا الكود في موقعك الخارجي وشاهد السحر! ✨</p>

      <a href="https://wepsitelive-production.up.railway.app/dashboard?merchant=${merchantId}" class="button">
        الذهاب للوحة التحكم →
      </a>

      <p>إذا واجهت أي مشكلة، لا تتردد في التواصل معنا.</p>
    </div>
    <div class="footer">
      <p>موقعي لايف - منصة ربط المواقع مع سلة</p>
      <p>© 2025 جميع الحقوق محفوظة</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
مرحباً ${name || 'عزيزي التاجر'}!

تم تفعيل تطبيق موقعي لايف على متجرك ${storeName} بنجاح!

كود التكامل الخاص بك:
<script src="https://wepsitelive-production.up.railway.app/widget.js?merchant=${merchantId}"></script>

لوحة التحكم:
https://wepsitelive-production.up.railway.app/dashboard?merchant=${merchantId}

فريق موقعي لايف
  `;

  return sendEmail({ to: email, subject, html, text });
}

/**
 * إيميل إشعار طلب جديد
 */
export async function sendOrderNotification(merchant, order) {
  const subject = `🛒 طلب جديد #${order.id} - ${order.total} ر.س`;

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; }
    .header { border-bottom: 2px solid #667eea; padding-bottom: 20px; margin-bottom: 20px; }
    .order-info { background: #f9f9f9; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🛒 طلب جديد!</h2>
    </div>
    <div class="order-info">
      <p><strong>رقم الطلب:</strong> #${order.id}</p>
      <p><strong>المبلغ:</strong> ${order.total} ر.س</p>
      <p><strong>العميل:</strong> ${order.customer?.name || 'غير محدد'}</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to: merchant.email, subject, html });
}
