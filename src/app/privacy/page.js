'use client';

import { useEffect, useState } from 'react';

export default function PrivacyPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      icon: '🔐',
      title: 'المعلومات التي نجمعها',
      items: [
        'معلومات المتجر الأساسية (الاسم، الشعار)',
        'بيانات المنتجات والتصنيفات',
        'معلومات الطلبات للتزامن',
        'رموز الوصول للاتصال بسلة',
      ]
    },
    {
      icon: '⚡',
      title: 'كيف نستخدم المعلومات',
      items: [
        'تزامن بيانات متجرك مع موقعك',
        'عرض المنتجات على موقعك الخارجي',
        'معالجة الطلبات وإرسالها لسلة',
        'تحسين الخدمة وتجربة المستخدم',
      ]
    },
    {
      icon: '🛡️',
      title: 'حماية المعلومات',
      items: [
        'تشفير متقدم لجميع البيانات',
        'تخزين آمن لرموز الوصول',
        'لا مشاركة مع أطراف ثالثة',
        'معايير أمان عالمية',
      ]
    },
    {
      icon: '✨',
      title: 'حقوقك',
      items: [
        'طلب حذف بياناتك في أي وقت',
        'إلغاء التثبيت وحذف كل شيء',
        'الاستفسار عن بياناتك المخزنة',
        'التحكم الكامل في معلوماتك',
      ]
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
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, rgba(102, 126, 234, ${0.1 - i * 0.015}), rgba(118, 75, 162, ${0.1 - i * 0.015}))`,
            top: `${10 + i * 15}%`,
            left: `${10 + i * 20}%`,
            transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'float 3s ease-in-out infinite',
        }}>
          🔒
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          سياسة الخصوصية
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          نلتزم بحماية خصوصيتك وأمان بياناتك
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50px',
          display: 'inline-block',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.9rem',
        }}>
          آخر تحديث: ديسمبر 2024
        </div>
      </div>

      {/* Content Sections */}
      <div style={{
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.border = '1px solid rgba(102, 126, 234, 0.3)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
            }}>
              {section.icon}
            </div>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}>
              {section.title}
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {section.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: '0.5rem 0',
                    color: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={{
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto 4rem',
        padding: '0 2rem',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'white',
            marginBottom: '1rem',
          }}>
            تواصل معنا
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '1.5rem',
          }}>
            للأسئلة حول سياسة الخصوصية
          </p>
          <a
            href="mailto:meshal.hgz@gmail.com"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            meshal.hgz@gmail.com
          </a>
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

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
