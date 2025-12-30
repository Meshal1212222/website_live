'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'ما هو موقعي لايف؟',
      answer: 'موقعي لايف هو تطبيق يربط متجرك في سلة مع موقعك الخارجي، بحيث تتم مزامنة المنتجات والطلبات والعملاء تلقائياً بين المنصتين.'
    },
    {
      question: 'كيف يعمل التطبيق؟',
      answer: 'بعد تثبيت التطبيق من سلة، تضيف كود بسيط لموقعك الخارجي. بعدها أي تغيير في سلة (منتج جديد، تعديل سعر، إلخ) يظهر فوراً على موقعك.'
    },
    {
      question: 'هل يعمل على أي موقع؟',
      answer: 'نعم! يعمل على أي موقع بأي استضافة - GoDaddy، Hostinger، أو أي مزود آخر. سواء كان موقعك WordPress أو HTML أو أي منصة أخرى.'
    },
    {
      question: 'هل أحتاج خبرة برمجية؟',
      answer: 'لا، فقط تنسخ كود بسيط وتلصقه في موقعك. الكود جاهز ولا يحتاج أي تعديل.'
    },
    {
      question: 'هل بياناتي آمنة؟',
      answer: 'نعم، نستخدم تشفير متقدم ولا نشارك بياناتك مع أي طرف ثالث. بياناتك تُستخدم فقط للتزامن بين سلة وموقعك.'
    },
    {
      question: 'ماذا يحدث إذا ألغيت تثبيت التطبيق؟',
      answer: 'عند إلغاء التثبيت، يتوقف التزامن ويتم حذف جميع بيانات الربط المخزنة. موقعك وبيانات سلة تبقى كما هي.'
    },
    {
      question: 'هل يدعم التطبيق جميع مميزات سلة؟',
      answer: 'نعم، يدعم: المنتجات، التصنيفات، الطلبات، العملاء، الكوبونات، العروض، المراجعات، وأكثر.'
    },
    {
      question: 'كم يستغرق الإعداد؟',
      answer: 'أقل من 5 دقائق! ثبّت التطبيق، انسخ الكود، الصقه في موقعك، وانتهى.'
    },
    {
      question: 'هل يمكنني تخصيص شكل المنتجات؟',
      answer: 'نعم، يمكنك تعديل CSS لتخصيص الألوان والخطوط والتصميم حسب هوية موقعك.'
    },
    {
      question: 'كيف أتواصل مع الدعم الفني؟',
      answer: 'تواصل معنا عبر البريد الإلكتروني: meshal.hgz@gmail.com وسنرد عليك في أقرب وقت.'
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8eeff 100%)',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#1a1a2e',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}>
          الأسئلة الشائعة
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '3rem',
        }}>
          إجابات على أكثر الأسئلة شيوعاً
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'right',
                }}
              >
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1a1a2e',
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  color: '#667eea',
                  transform: openIndex === index ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div style={{
                  padding: '0 1.5rem 1.25rem',
                  color: '#555',
                  lineHeight: 1.8,
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '16px',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>لم تجد إجابة سؤالك؟</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            تواصل معنا وسنساعدك
          </p>
          <a
            href="mailto:meshal.hgz@gmail.com"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'white',
              color: '#667eea',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            راسلنا
          </a>
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: '#999',
        }}>
          <p>© 2024 موقعي لايف - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
