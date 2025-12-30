'use client';

import { useState } from 'react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState('');
  const [merchantId, setMerchantId] = useState('YOUR_MERCHANT_ID');

  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const codeExamples = {
    html: {
      title: 'HTML عادي',
      icon: '🌐',
      description: 'لأي موقع HTML بسيط',
      code: `<!-- أضف هذا الكود قبل </body> -->

<script src="${API_BASE}/widget.js"
        data-merchant="${merchantId}"></script>

<!-- ضع هذا حيث تريد عرض المنتجات -->
<div id="mawqi-products"></div>`
    },
    nextjs: {
      title: 'Next.js',
      icon: '⚡',
      description: 'لمشاريع Next.js على Vercel',
      code: `// في app/layout.js أو pages/_app.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}

        {/* موقعي لايف Widget */}
        <Script
          src="${API_BASE}/widget.js"
          data-merchant="${merchantId}"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}

// في صفحة المنتجات
export default function ProductsPage() {
  return (
    <div>
      <h1>منتجاتنا</h1>
      <div id="mawqi-products"></div>
    </div>
  )
}`
    },
    react: {
      title: 'React',
      icon: '⚛️',
      description: 'لمشاريع Create React App',
      code: `// في public/index.html أضف قبل </body>:
<script src="${API_BASE}/widget.js"
        data-merchant="${merchantId}"></script>

// أو في أي Component:
import { useEffect } from 'react';

function Products() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '${API_BASE}/widget.js';
    script.setAttribute('data-merchant', '${merchantId}');
    document.body.appendChild(script);
  }, []);

  return <div id="mawqi-products"></div>;
}`
    },
    wordpress: {
      title: 'WordPress',
      icon: '📝',
      description: 'لمواقع ووردبريس',
      code: `/* أضف في footer.php قبل </body> */
/* أو استخدم إضافة "Insert Headers and Footers" */

<script src="${API_BASE}/widget.js"
        data-merchant="${merchantId}"></script>

<!-- في الصفحة أو المقال أضف: -->
<div id="mawqi-products"></div>

/* أو استخدم Shortcode في functions.php: */
function mawqi_products_shortcode() {
    return '<div id="mawqi-products"></div>';
}
add_shortcode('mawqi_products', 'mawqi_products_shortcode');

/* ثم في أي صفحة اكتب: [mawqi_products] */`
    },
    api: {
      title: 'API مباشر',
      icon: '🔌',
      description: 'للمطورين - تحكم كامل',
      code: `// جلب المنتجات
const response = await fetch(
  '${API_BASE}/api/products?merchant_id=${merchantId}'
);
const { data: products } = await response.json();

// عرض المنتجات
products.forEach(product => {
  console.log(product.name, product.price);
});

// ===== APIs المتاحة =====

// المنتجات
GET ${API_BASE}/api/products?merchant_id=${merchantId}

// التصنيفات
GET ${API_BASE}/api/categories?merchant_id=${merchantId}

// البحث
GET ${API_BASE}/api/search?merchant_id=${merchantId}&q=فستان

// معلومات المتجر
GET ${API_BASE}/api/store?merchant_id=${merchantId}

// الماركات
GET ${API_BASE}/api/brands?merchant_id=${merchantId}`
    }
  };

  const steps = [
    {
      num: 1,
      icon: '📲',
      title: 'ثبّت التطبيق',
      desc: 'من متجر تطبيقات سلة، ابحث عن "موقعي لايف" وثبته'
    },
    {
      num: 2,
      icon: '🔑',
      title: 'احصل على Merchant ID',
      desc: 'بعد التثبيت، ستظهر لك صفحة فيها الـ Merchant ID الخاص بك'
    },
    {
      num: 3,
      icon: '📋',
      title: 'انسخ الكود',
      desc: 'اختر نوع موقعك من الأسفل وانسخ الكود المناسب'
    },
    {
      num: 4,
      icon: '✨',
      title: 'الصق وشغّل',
      desc: 'الصق الكود في موقعك وشاهد منتجاتك تظهر مباشرة!'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'relative',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📚</div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}>
          دليل التثبيت
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '1.2rem',
        }}>
          اربط موقعك بسلة في 5 دقائق
        </p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 1.5rem 4rem',
      }}>
        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
              }}>
                {step.icon}
              </div>
              <div style={{
                color: '#667eea',
                fontSize: '0.85rem',
                marginBottom: '0.3rem',
              }}>
                الخطوة {step.num}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Merchant ID Input */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
        }}>
          <label style={{
            color: 'white',
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
          }}>
            🔑 أدخل Merchant ID الخاص بك:
          </label>
          <input
            type="text"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value || 'YOUR_MERCHANT_ID')}
            placeholder="مثال: 371583637"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none',
            }}
          />
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            marginTop: '0.5rem',
          }}>
            💡 تحصل عليه بعد تثبيت التطبيق من سلة
          </p>
        </div>

        {/* Code Tabs */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '0.5rem',
            gap: '0.5rem',
          }}>
            {Object.entries(codeExamples).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.8rem 1.2rem',
                  background: activeTab === key
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === key ? '600' : '400',
                }}
              >
                <span>{val.icon}</span>
                <span>{val.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '1.5rem' }}>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '1rem',
            }}>
              {codeExamples[activeTab].description}
            </p>

            <div style={{ position: 'relative' }}>
              <pre style={{
                background: '#1a1a2e',
                padding: '1.5rem',
                borderRadius: '12px',
                overflow: 'auto',
                color: '#10b981',
                fontSize: '0.85rem',
                direction: 'ltr',
                textAlign: 'left',
                lineHeight: 1.6,
              }}>
                {codeExamples[activeTab].code}
              </pre>
              <button
                onClick={() => copyToClipboard(codeExamples[activeTab].code, activeTab)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: copied === activeTab ? '#10b981' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {copied === activeTab ? '✅ تم!' : '📋 نسخ'}
              </button>
            </div>
          </div>
        </div>

        {/* Widget Options */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '1.3rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            🎨 عناصر العرض المتاحة
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { id: 'mawqi-products', name: 'عرض المنتجات', icon: '📦', desc: 'شبكة منتجات تفاعلية' },
              { id: 'mawqi-categories', name: 'التصنيفات', icon: '📂', desc: 'قائمة تصنيفات المتجر' },
              { id: 'mawqi-search', name: 'البحث', icon: '🔍', desc: 'مربع بحث في المنتجات' },
              { id: 'mawqi-cart', name: 'السلة', icon: '🛒', desc: 'سلة التسوق' },
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <span style={{ color: 'white', fontWeight: '600' }}>{item.name}</span>
                </div>
                <code style={{
                  display: 'block',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  color: '#f59e0b',
                  fontSize: '0.8rem',
                  direction: 'ltr',
                }}>
                  &lt;div id="{item.id}"&gt;&lt;/div&gt;
                </code>
                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}>
            تحتاج مساعدة؟
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '1.5rem',
          }}>
            فريقنا جاهز لمساعدتك في الربط
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a
              href="mailto:meshal.hgz@gmail.com"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'white',
                color: '#667eea',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              📧 راسلنا
            </a>
            <a
              href="/faq"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              ❓ الأسئلة الشائعة
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p>© 2024 موقعي لايف - جميع الحقوق محفوظة</p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        pre::-webkit-scrollbar { height: 8px; }
        pre::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        pre::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>
    </div>
  );
}
