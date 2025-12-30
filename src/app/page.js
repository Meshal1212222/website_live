'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const features = [
    {
      icon: '🔗',
      title: 'ربط سهل',
      description: 'اربط موقعك الخارجي مع سلة بخطوات بسيطة'
    },
    {
      icon: '🌐',
      title: 'دعم جميع المنصات',
      description: 'WordPress، Webflow، Wix، أو أي موقع مخصص'
    },
    {
      icon: '🛒',
      title: 'تكامل كامل',
      description: 'سلة التسوق والمنتجات والطلبات في موقعك'
    },
    {
      icon: '⚡',
      title: 'أداء عالي',
      description: 'سرعة تحميل فائقة وتجربة مستخدم سلسة'
    }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />

        <div style={{
          textAlign: 'center',
          color: 'white',
          maxWidth: '800px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            animation: 'fadeIn 0.6s ease-out'
          }}>
            🚀
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '20px',
            fontWeight: '700',
            animation: 'fadeIn 0.6s ease-out 0.1s backwards'
          }}>
            موقعي لايف
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            opacity: 0.95,
            marginBottom: '15px',
            animation: 'fadeIn 0.6s ease-out 0.2s backwards'
          }}>
            اربط موقعك الخارجي مع متجرك في سلة
          </p>

          <p style={{
            fontSize: '1.1rem',
            opacity: 0.85,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            animation: 'fadeIn 0.6s ease-out 0.3s backwards'
          }}>
            صمم موقعك على أي منصة تريدها، ونحن نربطه مع سلة لتحصل على تجربة تسوق متكاملة
          </p>

          {/* Email Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              maxWidth: '450px',
              margin: '0 auto',
              animation: 'fadeIn 0.6s ease-out 0.4s backwards'
            }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1rem',
                    width: '280px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    direction: 'rtl'
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#1e293b',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                >
                  انضم للقائمة
                </button>
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                كن أول من يعرف عند الإطلاق
              </p>
            </form>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '30px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.4s ease-out'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✅</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>شكراً لك!</h3>
              <p style={{ opacity: 0.9 }}>سنتواصل معك قريباً عند الإطلاق</p>
            </div>
          )}

          {/* Coming Soon Badge */}
          <div style={{
            marginTop: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '12px 24px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.6s ease-out 0.5s backwards'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              background: '#4ade80',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <span style={{ fontWeight: '500' }}>قريباً جداً...</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 20px',
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '50px',
            color: '#1e293b'
          }}>
            لماذا موقعي لايف؟
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '25px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '10px',
                  color: '#1e293b'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  lineHeight: '1.7'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1e293b',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
            موقعي لايف
          </h3>
          <p style={{ opacity: 0.7, marginBottom: '20px' }}>
            منصة ربط المواقع الخارجية مع سلة
          </p>
          <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
