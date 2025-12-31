import { NextResponse } from 'next/server';
import { getProducts, getCategories, getStoreInfo } from '@/lib/salla';
import { getMerchantInfo } from '@/lib/firebase';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/**
 * Claude AI Chat API
 * دعم فني ذكي للتجار
 */
export async function POST(request) {
  try {
    const { message, merchantId, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // جلب معلومات المتجر للسياق
    let storeContext = '';
    if (merchantId) {
      try {
        const [storeInfo, products, categories] = await Promise.all([
          getStoreInfo(merchantId).catch(() => null),
          getProducts(merchantId, 1, 10).catch(() => null),
          getCategories(merchantId).catch(() => null),
        ]);

        if (storeInfo?.data) {
          storeContext = `
معلومات المتجر:
- اسم المتجر: ${storeInfo.data.name}
- الرابط: ${storeInfo.data.domain}
- عدد المنتجات: ${products?.data?.length || 'غير معروف'}
- التصنيفات: ${categories?.data?.map(c => c.name).join(', ') || 'غير معروف'}
`;
        }
      } catch (e) {
        console.log('Could not fetch store context:', e.message);
      }
    }

    // بناء System Prompt
    const systemPrompt = `أنت مساعد ذكي لمنصة "موقعي لايف" - منصة تربط متاجر سلة بالمواقع الخارجية.

مهامك:
1. مساعدة التجار في ربط متاجرهم مع مواقعهم الخارجية
2. الإجابة على الأسئلة التقنية حول التكامل
3. شرح كيفية استخدام الـ APIs
4. المساعدة في حل المشاكل التقنية
5. تقديم نصائح لتحسين المتجر

معلومات المنصة:
- الـ API: https://wepsitelive-production.up.railway.app
- كود التكامل: <script src="https://wepsitelive-production.up.railway.app/widget.js?merchant=MERCHANT_ID"></script>
- التوثيق: /api/docs

${storeContext}

أجب بالعربية بشكل ودود ومختصر. إذا كان السؤال تقني، قدم أمثلة كود.`;

    // إذا لم يكن هناك Anthropic API Key، نستخدم ردود جاهزة
    if (!ANTHROPIC_API_KEY) {
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({
        success: true,
        response: fallbackResponse,
        fallback: true
      });
    }

    // استدعاء Claude API
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Claude API error:', error);
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(message),
        fallback: true
      });
    }

    const data = await response.json();
    const aiResponse = data.content[0]?.text || 'عذراً، لم أتمكن من معالجة طلبك.';

    return NextResponse.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      success: true,
      response: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
      fallback: true
    });
  }
}

/**
 * ردود احتياطية إذا لم يكن Claude متوفر
 */
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('كود') || lowerMessage.includes('تكامل') || lowerMessage.includes('script')) {
    return `لإضافة موقعي لايف لموقعك، أضف هذا الكود:

\`\`\`html
<script src="https://wepsitelive-production.up.railway.app/widget.js?merchant=YOUR_MERCHANT_ID"></script>
\`\`\`

استبدل YOUR_MERCHANT_ID بمعرف متجرك.`;
  }

  if (lowerMessage.includes('منتج') || lowerMessage.includes('products')) {
    return `لجلب المنتجات، استخدم هذا الـ API:

\`\`\`
GET /api/products?merchant_id=YOUR_ID
\`\`\`

سيعيد لك قائمة بجميع منتجات متجرك.`;
  }

  if (lowerMessage.includes('تصنيف') || lowerMessage.includes('categories')) {
    return `لجلب التصنيفات:

\`\`\`
GET /api/categories?merchant_id=YOUR_ID
\`\`\`

لجلب منتجات تصنيف معين:
\`\`\`
GET /api/products/category?merchant_id=YOUR_ID&category_id=CAT_ID
\`\`\``;
  }

  if (lowerMessage.includes('سعر') || lowerMessage.includes('اشتراك') || lowerMessage.includes('تكلفة')) {
    return `خطط الاشتراك:

💎 **الباقة الأساسية**: 375 ريال/شهر
- ربط موقع واحد
- دعم فني
- تحديثات مستمرة

تواصل معنا للمزيد من التفاصيل!`;
  }

  if (lowerMessage.includes('مرحبا') || lowerMessage.includes('هلا') || lowerMessage.includes('السلام')) {
    return `أهلاً وسهلاً! 👋

أنا مساعدك الذكي في موقعي لايف. كيف أقدر أساعدك اليوم؟

يمكنني مساعدتك في:
- ربط متجرك بموقعك الخارجي
- شرح الـ APIs
- حل المشاكل التقنية`;
  }

  return `شكراً على سؤالك!

للمساعدة السريعة:
- **التكامل**: اسأل عن "كود التكامل"
- **المنتجات**: اسأل عن "API المنتجات"
- **التصنيفات**: اسأل عن "التصنيفات"

أو اكتب سؤالك بالتفصيل وسأساعدك! 🚀`;
}

// GET للتحقق من حالة الـ API
export async function GET() {
  return NextResponse.json({
    status: 'Chat API is ready',
    hasAnthropicKey: !!ANTHROPIC_API_KEY
  });
}
