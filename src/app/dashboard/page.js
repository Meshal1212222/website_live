'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [merchantId, setMerchantId] = useState('');
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState('');

  const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

  // Check connection
  const checkConnection = async () => {
    if (!merchantId) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/store?merchant_id=${merchantId}&include=info`);
      const data = await res.json();

      if (data.success) {
        setStoreInfo(data.data?.info?.data || null);
        setConnected(true);
      } else {
        setConnected(false);
        setStoreInfo(null);
      }
    } catch (error) {
      setConnected(false);
    }
    setLoading(false);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const widgetCode = `<!-- موقعي لايف Widget -->
<script src="${API_BASE}/widget.js" data-merchant="${merchantId}"></script>

<!-- ضع هذه العناصر حيث تريد العرض -->
<div id="mawqi-search"></div>
<div id="mawqi-categories"></div>
<div id="mawqi-products"></div>`;

  const apiExample = `// جلب المنتجات
fetch('${API_BASE}/api/products?merchant_id=${merchantId}')
  .then(res => res.json())
  .then(data => console.log(data));

// جلب التصنيفات
fetch('${API_BASE}/api/categories?merchant_id=${merchantId}')
  .then(res => res.json())
  .then(data => console.log(data));`;

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
        padding: '3rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}>
          🎛️ لوحة التحكم
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          اربط موقعك بمتجرك في سلة
        </p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
      }}>
        {/* Step 1: Enter Merchant ID */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}>1</span>
            <h2 style={{ color: 'white', fontSize: '1.3rem' }}>أدخل Merchant ID</h2>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontSize: '0.95rem' }}>
            تحصل على Merchant ID بعد تثبيت التطبيق من سلة
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="مثال: 371583637"
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none',
              }}
            />
            <button
              onClick={checkConnection}
              disabled={loading || !merchantId}
              style={{
                padding: '1rem 2rem',
                background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '1rem',
              }}
            >
              {loading ? '⏳ جاري...' : '🔗 تحقق'}
            </button>
          </div>

          {connected && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              ✅ متصل بنجاح! {storeInfo?.name && `- ${storeInfo.name}`}
            </div>
          )}
        </div>

        {/* Step 2: Widget Code */}
        {merchantId && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>2</span>
              <h2 style={{ color: 'white', fontSize: '1.3rem' }}>كود الـ Widget</h2>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              انسخ هذا الكود والصقه في موقعك
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
              }}>
                {widgetCode}
              </pre>
              <button
                onClick={() => copyToClipboard(widgetCode, 'widget')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: copied === 'widget' ? '#10b981' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {copied === 'widget' ? '✅ تم النسخ!' : '📋 نسخ'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: API Example */}
        {merchantId && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>3</span>
              <h2 style={{ color: 'white', fontSize: '1.3rem' }}>أو استخدم الـ API</h2>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              للمطورين - استخدم الـ APIs مباشرة
            </p>

            <div style={{ position: 'relative' }}>
              <pre style={{
                background: '#1a1a2e',
                padding: '1.5rem',
                borderRadius: '12px',
                overflow: 'auto',
                color: '#f59e0b',
                fontSize: '0.85rem',
                direction: 'ltr',
                textAlign: 'left',
              }}>
                {apiExample}
              </pre>
              <button
                onClick={() => copyToClipboard(apiExample, 'api')}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: copied === 'api' ? '#10b981' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {copied === 'api' ? '✅ تم النسخ!' : '📋 نسخ'}
              </button>
            </div>
          </div>
        )}

        {/* APIs List */}
        {merchantId && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              📡 الـ APIs المتاحة
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { name: 'المنتجات', endpoint: '/api/products', icon: '📦' },
                { name: 'التصنيفات', endpoint: '/api/categories', icon: '📂' },
                { name: 'المتجر', endpoint: '/api/store', icon: '🏪' },
                { name: 'الماركات', endpoint: '/api/brands', icon: '🏷️' },
                { name: 'الطلبات', endpoint: '/api/orders', icon: '🛒' },
                { name: 'البحث', endpoint: '/api/search', icon: '🔍' },
              ].map((api, idx) => (
                <a
                  key={idx}
                  href={`${API_BASE}${api.endpoint}?merchant_id=${merchantId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{api.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600' }}>{api.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', direction: 'ltr' }}>
                      {api.endpoint}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        color: 'rgba(255,255,255,0.4)',
      }}>
        <p>موقعي لايف - تزامن كامل مع سلة</p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
