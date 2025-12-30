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

  const problems = [
    { icon: '😩', text: 'تصمم موقع وتحتاج تدير منتجاتك من مكانين' },
    { icon: '😤', text: 'صفحات الهبوط تكلفك وقت ومال' },
    { icon: '😵', text: 'تحليلات مبعثرة بين أدوات مختلفة' },
    { icon: '🤯', text: 'كل تغيير في المنتج تحدثه يدوياً' },
  ];

  const solutions = [
    {
      icon: '🎯',
      title: 'إدارة واحدة من سلة',
      description: 'غيّر السعر، أضف منتج، عدّل الوصف - كله من سلة وموقعك يتحدث تلقائياً',
      highlight: 'صفر عمل إضافي'
    },
    {
      icon: '🚀',
      title: 'صفحة هبوط جاهزة',
      description: 'ما تحتاج تصمم صفحة هبوط - نعطيك صفحة احترافية متزامنة مع متجرك',
      highlight: 'وفّر آلاف الريالات'
    },
    {
      icon: '🤖',
      title: 'تحليلات ذكية بالـ AI',
      description: 'تعرف أي منتج يبيع أكثر، أفضل وقت للعروض، وتوقعات المبيعات',
      highlight: 'قرارات مبنية على بيانات'
    },
    {
      icon: '🎨',
      title: 'صمم بأي منصة',
      description: 'Webflow، WordPress، Wix، Framer - أو حتى كود خاص. كلها تشتغل',
      highlight: 'حرية كاملة'
    },
  ];

  const comparisons = [
    { feature: 'إدارة المنتجات', before: 'مكانين مختلفين', after: 'سلة فقط' },
    { feature: 'تحديث الأسعار', before: 'يدوي في كل مكان', after: 'تلقائي فوري' },
    { feature: 'صفحة الهبوط', before: 'تصميم + استضافة + صيانة', after: 'جاهزة ومجانية' },
    { feature: 'التحليلات', before: 'Google Analytics + أدوات أخرى', after: 'AI يحللك كل شي' },
    { feature: 'المخزون', before: 'تتابعه يدوياً', after: 'متزامن لحظياً' },
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
            background: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '30px',
            animation: 'fadeInDown 0.8s ease-out'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#4ade80',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '0.9rem', color: '#4ade80' }}>متجرك في سلة + موقعك المخصص = 🔥</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 7vw, 4rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '25px',
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
          }}>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.9)' }}>موقعك الخارجي</span>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>يُدار من سلة</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto 20px',
            lineHeight: '1.8',
            animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
          }}>
            صمم موقعك بأي منصة تحبها.
            <br />
            <strong style={{ color: 'white' }}>كل شي ثاني علينا:</strong> المنتجات، الأسعار، المخزون، الطلبات - كلها من سلة
          </p>

          {/* Key Points */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            animation: 'fadeInUp 0.8s ease-out 0.5s backwards'
          }}>
            {['تزامن فوري', 'تحليلات AI', 'صفحة هبوط مجانية'].map((point, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '0.95rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                ✓ {point}
              </div>
            ))}
          </div>

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
                  أبي أجرب! 🚀
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                انضم لـ +500 تاجر في قائمة الانتظار
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
              <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#4ade80' }}>تم التسجيل!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>بنتواصل معك قريب جداً</p>
            </div>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section style={{
        padding: '80px 20px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '50px'
          }}>
            😫 المشكلة اللي كلنا نعاني منها
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {problems.map((problem, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 100, 100, 0.05)',
                  border: '1px solid rgba(255, 100, 100, 0.2)',
                  borderRadius: '16px',
                  padding: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <span style={{ fontSize: '2rem' }}>{problem.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{problem.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '20px'
          }}>
            ✨ الحل؟ <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>موقعي لايف</span>
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '60px',
            fontSize: '1.1rem'
          }}>
            ركز على التصميم. الباقي علينا.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {solutions.map((solution, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '35px',
                  transition: 'all 0.4s ease',
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
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{solution.icon}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '12px' }}>
                  {solution.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '20px' }}>
                  {solution.description}
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: '#a78bfa',
                  display: 'inline-block'
                }}>
                  {solution.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '60px'
          }}>
            قبل وبعد 🔄
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'rgba(255,255,255,0.05)',
              padding: '20px',
              fontWeight: '600'
            }}>
              <span></span>
              <span style={{ color: '#f87171', textAlign: 'center' }}>❌ قبل</span>
              <span style={{ color: '#4ade80', textAlign: 'center' }}>✅ بعد</span>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: '500' }}>{item.feature}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: '0.9rem' }}>{item.before}</span>
                <span style={{ color: '#4ade80', textAlign: 'center', fontSize: '0.9rem' }}>{item.after}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{
        padding: '100px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '60px'
          }}>
            كيف يشتغل؟ ⚡
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {[
              { num: '1', title: 'صمم موقعك', desc: 'استخدم Webflow، WordPress، Wix، أو أي منصة. أنت الفنان!' },
              { num: '2', title: 'اربط مع سلة', desc: 'نسخ + لصق كود واحد بس. ما يحتاج مبرمج.' },
              { num: '3', title: 'استرخ وبيع', desc: 'كل تغيير في سلة → يظهر في موقعك. تلقائي 100%' },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '30px',
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
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
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '32px',
          padding: '60px 40px',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            خلك من أوائل المستخدمين 🚀
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            سجل الآن واحصل على وصول مبكر + خصم خاص للمؤسسين
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
            سجلني الآن! 🎯
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
              موقعك الخارجي يُدار من سلة
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

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
