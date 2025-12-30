'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function DemoStorefront() {
  const [merchantId, setMerchantId] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState(null);
  const [showCode, setShowCode] = useState(false);

  // Load widget config
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/widget');
        const data = await res.json();
        if (data.success) {
          setWidgetConfig(data.data);
        }
      } catch (error) {
        console.error('Failed to load widget config:', error);
      }
    }
    loadConfig();
  }, []);

  const handleLoadWidget = () => {
    if (merchantId) {
      setIsLoaded(true);
      // Reload widget with new merchant
      if (window.MawqiWidget) {
        window.MawqiWidget.refresh();
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8eeff 100%)',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️ تجربة الـ Widget</h1>
        <p style={{ opacity: 0.9 }}>هذه صفحة توضيحية لشكل الـ Widget على موقعك الخارجي</p>
      </header>

      {/* Controls */}
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a1a2e' }}>⚙️ إعداد الـ Widget</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            معرف التاجر (Merchant ID)
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="أدخل معرف التاجر من سلة"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
            <button
              onClick={handleLoadWidget}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              تحميل
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: '0.5rem 1rem',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {showCode ? '🙈 إخفاء الكود' : '👀 عرض كود التضمين'}
        </button>

        {showCode && widgetConfig && (
          <pre style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#1a1a2e',
            color: '#10b981',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem',
            direction: 'ltr',
            textAlign: 'left',
          }}>
            {widgetConfig.embed_code}
          </pre>
        )}
      </div>

      {/* Widget Demo Area */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1a1a2e', textAlign: 'center' }}>
          🏪 معاينة المتجر
        </h2>

        {!isLoaded ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <p>أدخل معرف التاجر واضغط "تحميل" لعرض المنتجات</p>
          </div>
        ) : (
          <>
            {/* Widget containers */}
            <div id="mawqi-search"></div>
            <div id="mawqi-categories"></div>
            <div id="mawqi-products"></div>

            {/* Load widget script */}
            <Script
              src="/widget.js"
              data-merchant={merchantId}
              strategy="afterInteractive"
              onLoad={() => {
                if (window.MawqiWidget) {
                  window.MawqiWidget.refresh();
                }
              }}
            />
          </>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a1a2e' }}>📖 كيفية الاستخدام</h2>

        <div style={{ lineHeight: 1.8 }}>
          <p><strong>1.</strong> اربط متجرك في سلة مع موقعي لايف</p>
          <p><strong>2.</strong> احصل على معرف التاجر (Merchant ID)</p>
          <p><strong>3.</strong> أضف الكود التالي لموقعك:</p>

          <pre style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9ff',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem',
            direction: 'ltr',
            textAlign: 'left',
          }}>
{`<!-- في <head> أو قبل </body> -->
<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget.js"
        data-merchant="YOUR_MERCHANT_ID">
</script>

<!-- في المكان المطلوب -->
<div id="mawqi-search"></div>     <!-- صندوق البحث -->
<div id="mawqi-categories"></div> <!-- فلتر التصنيفات -->
<div id="mawqi-products"></div>   <!-- شبكة المنتجات -->`}
          </pre>

          <p style={{ marginTop: '1rem' }}><strong>4.</strong> تخصيص CSS حسب تصميم موقعك</p>
        </div>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '1.5rem',
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1a1a2e', textAlign: 'center' }}>
          ✨ مميزات الـ Widget
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { icon: '🔄', title: 'تزامن فوري', desc: 'أي تغيير في سلة يظهر مباشرة' },
            { icon: '🎨', title: 'قابل للتخصيص', desc: 'غيّر الألوان والتصميم بسهولة' },
            { icon: '📱', title: 'متجاوب', desc: 'يعمل على جميع الأجهزة' },
            { icon: '⚡', title: 'سريع', desc: 'تحميل خفيف وأداء عالي' },
            { icon: '🔍', title: 'بحث مدمج', desc: 'ابحث في المنتجات مباشرة' },
            { icon: '🛒', title: 'سلة تسوق', desc: 'أضف للسلة وأكمل الشراء' },
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', color: '#1a1a2e' }}>{feature.title}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#666',
      }}>
        <p>موقعي لايف - تزامن كامل مع سلة</p>
      </footer>
    </div>
  );
}
