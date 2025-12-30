'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [merchantId, setMerchantId] = useState('');
  const [copied, setCopied] = useState('');
  const [status, setStatus] = useState('loading');

  const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    // Get merchant ID from URL params
    const merchant = searchParams.get('merchant') ||
                     searchParams.get('merchant_id') ||
                     searchParams.get('store_id');

    if (merchant) {
      setMerchantId(merchant);
      setStatus('success');
    } else {
      setStatus('no_merchant');
    }
  }, [searchParams]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const widgetCode = `<!-- موقعي لايف Widget -->
<script src="${API_BASE}/widget.js" data-merchant="${merchantId}"></script>

<div id="mawqi-products"></div>`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(118, 75, 162, 0.2) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '600px',
        width: '100%',
      }}>
        {status === 'loading' && (
          <div style={{
            textAlign: 'center',
            color: 'white',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p>جاري التحميل...</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            {/* Success Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem',
            }}>
              ✓
            </div>

            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '0.5rem',
            }}>
              تم الربط بنجاح! 🎉
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '2rem',
            }}>
              متجرك الآن متصل بموقعي لايف
            </p>

            {/* Merchant ID Box */}
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              border: '2px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}>
                Merchant ID الخاص بك
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#667eea',
                  fontFamily: 'monospace',
                }}>
                  {merchantId}
                </span>
                <button
                  onClick={() => copyToClipboard(merchantId, 'id')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: copied === 'id' ? '#10b981' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {copied === 'id' ? '✅' : '📋'}
                </button>
              </div>
            </div>

            {/* Widget Code */}
            <div style={{
              background: '#1a1a2e',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem',
              position: 'relative',
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                textAlign: 'right',
              }}>
                كود التضمين - انسخه لموقعك:
              </p>
              <pre style={{
                color: '#10b981',
                fontSize: '0.8rem',
                direction: 'ltr',
                textAlign: 'left',
                overflow: 'auto',
                margin: 0,
              }}>
                {widgetCode}
              </pre>
              <button
                onClick={() => copyToClipboard(widgetCode, 'code')}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: copied === 'code' ? '#10b981' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                {copied === 'code' ? '✅ تم!' : 'نسخ'}
              </button>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <a
                href={`/dashboard?merchant_id=${merchantId}`}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                🎛️ لوحة التحكم
              </a>
              <a
                href={`/api/products?merchant_id=${merchantId}`}
                target="_blank"
                style={{
                  padding: '1rem 2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                📦 عرض المنتجات
              </a>
            </div>
          </div>
        )}

        {status === 'no_merchant' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}>
              مرحباً بك في موقعي لايف
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '2rem',
            }}>
              ثبّت التطبيق من سلة للبدء
            </p>
            <a
              href="/dashboard"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '12px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              الذهاب للوحة التحكم
            </a>
          </div>
        )}

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '2rem',
          fontSize: '0.9rem',
        }}>
          موقعي لايف - تزامن كامل مع سلة
        </p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
