'use client';

import { useState, useEffect } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      icon: '🚀',
      question: 'ما هو موقعي لايف؟',
      answer: 'منصة ثورية تربط متجرك في سلة مع أي موقع خارجي. تزامن تلقائي كامل للمنتجات والطلبات والعملاء - كل شيء في سلة يظهر على موقعك فوراً!'
    },
    {
      icon: '⚡',
      question: 'كيف يعمل التطبيق؟',
      answer: 'بسيط جداً: ثبّت التطبيق من سلة ← انسخ الكود ← الصقه في موقعك ← انتهى! أي تغيير في سلة يظهر مباشرة على موقعك الخارجي.'
    },
    {
      icon: '🌍',
      question: 'هل يعمل على أي موقع؟',
      answer: 'نعم 100%! أي دومين، أي استضافة - GoDaddy، Hostinger، Namecheap، أو أي مزود. موقع WordPress، HTML، React، أو أي تقنية. يعمل في كل مكان!'
    },
    {
      icon: '👨‍💻',
      question: 'هل أحتاج خبرة برمجية؟',
      answer: 'أبداً! سطر كود واحد تنسخه وتلصقه - مثل إضافة فيديو يوتيوب. إذا تعرف تنسخ وتلصق، تقدر تستخدم موقعي لايف!'
    },
    {
      icon: '🔐',
      question: 'هل بياناتي آمنة؟',
      answer: 'أمان على أعلى مستوى! تشفير متقدم، لا مشاركة مع أطراف ثالثة، ونلتزم بأعلى معايير حماية البيانات العالمية.'
    },
    {
      icon: '🛒',
      question: 'ماذا عن الطلبات؟',
      answer: 'كل طلب من موقعك الخارجي يظهر مباشرة في لوحة تحكم سلة. إدارة واحدة، بدون تكرار، بدون تعقيد!'
    },
    {
      icon: '🎨',
      question: 'هل أقدر أخصص التصميم؟',
      answer: 'طبعاً! الـ Widget قابل للتخصيص بالكامل. غيّر الألوان، الخطوط، الأحجام - خليه يطابق هوية موقعك تماماً.'
    },
    {
      icon: '⏱️',
      question: 'كم يستغرق الإعداد؟',
      answer: 'أقل من 5 دقائق! جدياً. ثبّت، انسخ، الصق، وابدأ البيع. أسرع من طلب قهوة!'
    },
    {
      icon: '🔄',
      question: 'هل التحديث فوري؟',
      answer: 'نعم! Real-time sync. غيّرت السعر في سلة؟ يتغير على موقعك بالثواني. أضفت منتج؟ يظهر فوراً. بدون أي تدخل يدوي.'
    },
    {
      icon: '📞',
      question: 'كيف أتواصل مع الدعم؟',
      answer: 'راسلنا على meshal.hgz@gmail.com - نرد بسرعة ونساعدك بكل شيء تحتاجه!'
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
      overflow: 'hidden',
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '5%',
        fontSize: '4rem',
        opacity: 0.1,
        transform: `translateY(${scrollY * 0.2}px)`,
        pointerEvents: 'none',
      }}>❓</div>
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '10%',
        fontSize: '3rem',
        opacity: 0.1,
        transform: `translateY(${scrollY * -0.15}px)`,
        pointerEvents: 'none',
      }}>💡</div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'bounce 2s ease-in-out infinite',
        }}>
          🤔
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          الأسئلة الشائعة
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          كل اللي تحتاج تعرفه عن موقعي لايف
        </p>
      </div>

      {/* FAQ Items */}
      <div style={{
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1.5rem 4rem',
      }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              marginBottom: '1rem',
              borderRadius: '20px',
              overflow: 'hidden',
              background: openIndex === index
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))'
                : 'rgba(255,255,255,0.03)',
              border: openIndex === index
                ? '1px solid rgba(102, 126, 234, 0.3)'
                : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'right',
              }}
            >
              <span style={{
                fontSize: '2rem',
                transition: 'transform 0.3s',
                transform: openIndex === index ? 'scale(1.2)' : 'scale(1)',
              }}>
                {faq.icon}
              </span>
              <span style={{
                flex: 1,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'white',
              }}>
                {faq.question}
              </span>
              <span style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: openIndex === index
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                transition: 'all 0.3s',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)',
              }}>
                +
              </span>
            </button>
            <div style={{
              maxHeight: openIndex === index ? '300px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              <p style={{
                padding: '0 1.5rem 1.5rem 4.5rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8,
                fontSize: '1rem',
              }}>
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto 4rem',
        padding: '0 2rem',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: 'white',
              marginBottom: '1rem',
              fontWeight: '700',
            }}>
              لم تجد جوابك؟
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '1.5rem',
              fontSize: '1.1rem',
            }}>
              تواصل معنا مباشرة وسنساعدك
            </p>
            <a
              href="mailto:meshal.hgz@gmail.com"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'white',
                color: '#667eea',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.1rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              راسلنا الآن 📧
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

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
