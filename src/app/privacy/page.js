export const metadata = {
  title: 'سياسة الخصوصية - موقعي لايف',
  description: 'سياسة الخصوصية لتطبيق موقعي لايف',
};

export default function PrivacyPage() {
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
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: '#1a1a2e',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          سياسة الخصوصية
        </h1>

        <p style={{ color: '#666', marginBottom: '1rem' }}>
          آخر تحديث: ديسمبر 2024
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>مقدمة</h2>
          <p style={{ lineHeight: 1.8, color: '#444' }}>
            نحن في "موقعي لايف" نلتزم بحماية خصوصية مستخدمينا. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدام تطبيقنا.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>المعلومات التي نجمعها</h2>
          <ul style={{ lineHeight: 2, color: '#444', paddingRight: '1.5rem' }}>
            <li>معلومات المتجر الأساسية من منصة سلة (الاسم، الوصف، الشعار)</li>
            <li>بيانات المنتجات والتصنيفات والأسعار</li>
            <li>معلومات الطلبات لغرض التزامن</li>
            <li>رموز الوصول (Access Tokens) للاتصال بمنصة سلة</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>كيف نستخدم المعلومات</h2>
          <ul style={{ lineHeight: 2, color: '#444', paddingRight: '1.5rem' }}>
            <li>تزامن بيانات متجرك مع موقعك الخارجي</li>
            <li>عرض المنتجات والتصنيفات على موقعك</li>
            <li>معالجة الطلبات وإرسالها لمنصة سلة</li>
            <li>تحسين خدماتنا وتجربة المستخدم</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>حماية المعلومات</h2>
          <p style={{ lineHeight: 1.8, color: '#444' }}>
            نستخدم تقنيات تشفير متقدمة لحماية بياناتك. يتم تخزين رموز الوصول بشكل آمن ولا تتم مشاركتها مع أي طرف ثالث. نلتزم بأعلى معايير الأمان لحماية معلوماتك.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>مشاركة المعلومات</h2>
          <p style={{ lineHeight: 1.8, color: '#444' }}>
            لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة. المعلومات تُستخدم فقط لتقديم خدمة التزامن بين متجرك وموقعك الخارجي.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>حقوقك</h2>
          <ul style={{ lineHeight: 2, color: '#444', paddingRight: '1.5rem' }}>
            <li>يمكنك طلب حذف بياناتك في أي وقت</li>
            <li>يمكنك إلغاء تثبيت التطبيق وسيتم حذف جميع البيانات المرتبطة</li>
            <li>يمكنك التواصل معنا للاستفسار عن بياناتك</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>التواصل معنا</h2>
          <p style={{ lineHeight: 1.8, color: '#444' }}>
            للأسئلة حول سياسة الخصوصية، تواصل معنا عبر البريد الإلكتروني:
            <br />
            <a href="mailto:meshal.hgz@gmail.com" style={{ color: '#667eea' }}>
              meshal.hgz@gmail.com
            </a>
          </p>
        </section>

        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #eee',
          textAlign: 'center',
          color: '#999',
        }}>
          <p>© 2024 موقعي لايف - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
