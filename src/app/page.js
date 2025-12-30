'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const features = [
    {
      icon: '🔗',
      title: 'ربط سهل وسريع',
      description: 'اربط موقعك الخارجي مع سلة بضغطة زر واحدة',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '🛒',
      title: 'سلة تسوق متكاملة',
      description: 'المنتجات والأسعار والمخزون متزامنة تلقائياً',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '🎫',
      title: 'كوبونات وعروض',
      description: 'كوبونات الخصم والعروض تعمل في موقعك مباشرة',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '📊',
      title: 'تحليلات متقدمة',
      description: 'تتبع الزوار والمبيعات والتحويلات بالتفصيل',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '🔍',
      title: 'تحسين السيو',
      description: 'Meta tags وSchema markup تلقائي لكل منتج',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '💰',
      title: 'التسويق بالعمولة',
      description: 'روابط المسوقين تعمل وتُتبع في موقعك',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      icon: '🌐',
      title: 'كل المنصات',
      description: 'WordPress، Webflow، Wix، أو أي موقع مخصص',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'تزامن فوري',
      description: 'أي تغيير في سلة يظهر في موقعك خلال ثواني',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)'
    },
    {
      icon: '🔔',
      title: 'إشعارات ذكية',
      description: 'تنبيهات الطلبات والمخزون في الوقت الفعلي',
      gradient: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)'
    }
  ];

  const steps = [
    { number: '01', title: 'صمم موقعك', description: 'استخدم أي منصة تفضلها لبناء موقعك' },
    { number: '02', title: 'اربط مع سلة', description: 'أضف كود الربط البسيط لموقعك' },
    { number: '03', title: 'ابدأ البيع', description: 'استقبل الطلبات مباشرة في متجرك' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', overflow: 'hidden' }}>

      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Floating Orbs */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(245, 87, 108, 0.3))',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '30px',
            backdropFilter: 'blur(10px)',
            animation: 'fadeInDown 0.8s ease-out'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#4ade80',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>قريباً - سجل الآن للوصول المبكر</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '25px',
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
          }}>
            <span style={{ display: 'block' }}>اربط موقعك مع</span>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>سلة</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.8',
            animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
          }}>
            صمم موقعك على أي منصة تحبها، ونحن نربطه بمتجرك في سلة.
            <br />
            تجربة تسوق متكاملة بتصميمك الخاص.
          </p>

          {/* Email Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              animation: 'fadeInUp 0.8s ease-out 0.6s backwards'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '20px'
              }}>
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '18px 28px',
                    fontSize: '1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    width: '300px',
                    outline: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    direction: 'rtl'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                    e.target.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '18px 40px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  انضم للقائمة ←
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                +500 مسجل في قائمة الانتظار
              </p>
            </form>
          ) : (
            <div style={{
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              padding: '30px 50px',
              borderRadius: '20px',
              animation: 'scaleIn 0.4s ease-out',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎉</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#4ade80' }}>تم التسجيل بنجاح!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>سنتواصل معك فور الإطلاق</p>
            </div>
          )}

          {/* Scroll Indicator */}
          <div style={{
            marginTop: '80px',
            animation: 'bounce 2s infinite'
          }}>
            <div style={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '20px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <div style={{
                width: '4px',
                height: '10px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '2px',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scrollDown 2s infinite'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              لماذا <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>موقعي لايف</span>؟
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              كل ما تحتاجه لربط موقعك بمتجرك في سلة
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '35px',
                  transition: 'all 0.4s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: feature.gradient,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '20px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.7'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              كيف يعمل؟
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              ثلاث خطوات بسيطة للبدء
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '30px 40px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  minWidth: '80px'
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '32px',
          padding: '60px 40px',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            جاهز تبدأ؟
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            انضم لقائمة الانتظار وكن أول من يجرب المنصة
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: '18px 50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '16px',
              border: 'none',
              background: 'white',
              color: '#667eea',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 20px 50px rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            سجل الآن مجاناً
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '50px 20px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              موقعي لايف
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              منصة ربط المواقع مع سلة
            </p>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Readex Pro', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        ::selection {
          background: rgba(102, 126, 234, 0.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes scrollDown {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
