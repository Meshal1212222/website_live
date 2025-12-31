'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const merchantId = searchParams.get('merchant');

  const [storeInfo, setStoreInfo] = useState(null);
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const API_BASE = typeof window !== 'undefined' ? window.location.origin : 'https://wepsitelive-production.up.railway.app';
  const integrationCode = `<script src="${API_BASE}/widget.js?merchant=${merchantId}"></script>`;
  const chatCode = `<script src="${API_BASE}/chat-widget.js?merchant=${merchantId}"></script>`;

  useEffect(() => {
    if (merchantId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [merchantId]);

  async function fetchData() {
    try {
      const [storeRes, productsRes, categoriesRes] = await Promise.all([
        fetch(`/api/store?merchant_id=${merchantId}`).catch(() => null),
        fetch(`/api/products?merchant_id=${merchantId}&per_page=1`).catch(() => null),
        fetch(`/api/categories?merchant_id=${merchantId}`).catch(() => null),
      ]);

      if (storeRes?.ok) {
        const storeData = await storeRes.json();
        setStoreInfo(storeData.data);
      }

      const products = productsRes?.ok ? await productsRes.json() : null;
      const categories = categoriesRes?.ok ? await categoriesRes.json() : null;

      setStats({
        products: products?.pagination?.total || products?.data?.length || 0,
        categories: categories?.data?.length || 0,
        orders: 0
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!merchantId) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h2>⚠️ معرف المتجر مطلوب</h2>
          <p>يرجى الوصول للوحة التحكم من رابط التفعيل في الإيميل</p>
        </div>
        <style jsx>{`
          .error-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
          .error-card { background: white; padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="spinner"></div>
          <p>جاري تحميل بيانات متجرك...</p>
        </div>
        <style jsx>{`
          .loading-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          .loading-card { background: white; padding: 60px; border-radius: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .spinner { width: 50px; height: 50px; border: 4px solid #e0e0e0; border-top-color: #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">موقعي لايف</span>
          </div>
          <div className="store-info">
            <span className="store-name">{storeInfo?.name || 'متجرك'}</span>
            <span className="badge">متصل ✓</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav">
            {['overview', 'integration', 'chat', 'settings'].map(tab => (
              <button
                key={tab}
                className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'overview' && '📊 نظرة عامة'}
                {tab === 'integration' && '🔗 التكامل'}
                {tab === 'chat' && '💬 الدعم الذكي'}
                {tab === 'settings' && '⚙️ الإعدادات'}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="content">
          {activeTab === 'overview' && (
            <>
              <h1 className="title">مرحباً بك! 👋</h1>
              <p className="subtitle">إليك نظرة سريعة على متجرك</p>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.products}</div>
                    <div className="stat-label">منتج</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📁</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.categories}</div>
                    <div className="stat-label">تصنيف</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🛒</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.orders}</div>
                    <div className="stat-label">طلب</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <div className="stat-number">متصل</div>
                    <div className="stat-label">حالة الربط</div>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2 className="section-title">إجراءات سريعة</h2>
                <div className="actions-grid">
                  <button className="action-card" onClick={() => setActiveTab('integration')}>
                    <span className="action-icon">🔗</span>
                    <span>احصل على كود التكامل</span>
                  </button>
                  <button className="action-card" onClick={() => setActiveTab('chat')}>
                    <span className="action-icon">💬</span>
                    <span>إضافة الدعم الذكي</span>
                  </button>
                  <a href={`/api/products?merchant_id=${merchantId}`} target="_blank" className="action-card">
                    <span className="action-icon">📡</span>
                    <span>اختبار الـ API</span>
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === 'integration' && (
            <>
              <h1 className="title">🔗 كود التكامل</h1>
              <p className="subtitle">أضف هذا الكود في موقعك الخارجي لعرض منتجاتك</p>

              <div className="code-section">
                <h3>كود عرض المنتجات:</h3>
                <div className="code-box">
                  <code>{integrationCode}</code>
                  <button className="copy-btn" onClick={() => copyToClipboard(integrationCode)}>
                    {copied ? '✓ تم النسخ' : '📋 نسخ'}
                  </button>
                </div>
              </div>

              <div className="code-section">
                <h3>كود ويدجت الشات:</h3>
                <div className="code-box">
                  <code>{chatCode}</code>
                  <button className="copy-btn" onClick={() => copyToClipboard(chatCode)}>
                    {copied ? '✓ تم النسخ' : '📋 نسخ'}
                  </button>
                </div>
              </div>

              <div className="api-docs">
                <h3>🔌 الـ APIs المتاحة:</h3>
                <div className="api-list">
                  <div className="api-item">
                    <span>جميع المنتجات:</span>
                    <code>/api/products?merchant_id={merchantId}</code>
                  </div>
                  <div className="api-item">
                    <span>منتج واحد:</span>
                    <code>/api/product?merchant_id={merchantId}&product_id=ID</code>
                  </div>
                  <div className="api-item">
                    <span>التصنيفات:</span>
                    <code>/api/categories?merchant_id={merchantId}</code>
                  </div>
                  <div className="api-item">
                    <span>منتجات تصنيف:</span>
                    <code>/api/products/category?merchant_id={merchantId}&category_id=ID</code>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'chat' && (
            <>
              <h1 className="title">💬 الدعم الذكي</h1>
              <p className="subtitle">أضف مساعد ذكي مدعوم بالذكاء الاصطناعي لموقعك</p>

              <div className="feature-card">
                <h3>🤖 مميزات الدعم الذكي:</h3>
                <ul className="feature-list">
                  <li>✅ يرد على أسئلة العملاء تلقائياً</li>
                  <li>✅ يفهم العربية بشكل ممتاز</li>
                  <li>✅ يساعد في الاستفسارات التقنية</li>
                  <li>✅ متوفر 24/7</li>
                </ul>
              </div>

              <div className="code-section">
                <h3>أضف هذا الكود لموقعك:</h3>
                <div className="code-box">
                  <code>{chatCode}</code>
                  <button className="copy-btn" onClick={() => copyToClipboard(chatCode)}>
                    {copied ? '✓ تم النسخ' : '📋 نسخ'}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h1 className="title">⚙️ الإعدادات</h1>
              <p className="subtitle">إعدادات متجرك</p>

              <div className="settings-card">
                <h3>معلومات المتجر:</h3>
                <div className="settings-row">
                  <span>معرف المتجر:</span>
                  <code>{merchantId}</code>
                </div>
                <div className="settings-row">
                  <span>اسم المتجر:</span>
                  <span>{storeInfo?.name || '-'}</span>
                </div>
                <div className="settings-row">
                  <span>الحالة:</span>
                  <span className="status-active">متصل ✓</span>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <style jsx>{`
        .page { min-height: 100vh; background: #f5f7fa; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 40px; }
        .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-icon { font-size: 28px; }
        .logo-text { font-size: 22px; font-weight: 600; }
        .store-info { display: flex; align-items: center; gap: 15px; }
        .store-name { font-size: 16px; }
        .badge { background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 13px; }
        .main { display: flex; max-width: 1400px; margin: 0 auto; padding: 30px 40px; gap: 30px; }
        .sidebar { width: 220px; flex-shrink: 0; }
        .nav { background: white; border-radius: 12px; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .nav-item { display: block; width: 100%; padding: 12px 15px; border: none; background: none; text-align: right; font-size: 14px; cursor: pointer; border-radius: 8px; margin-bottom: 5px; }
        .nav-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .content { flex: 1; }
        .title { font-size: 28px; font-weight: 600; margin-bottom: 10px; color: #333; }
        .subtitle { color: #666; margin-bottom: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: white; border-radius: 12px; padding: 25px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stat-icon { font-size: 32px; }
        .stat-number { font-size: 24px; font-weight: 600; color: #333; }
        .stat-label { font-size: 13px; color: #888; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 18px; margin-bottom: 20px; color: #333; }
        .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .action-card { background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; text-decoration: none; color: #333; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .action-card:hover { border-color: #667eea; }
        .action-icon { font-size: 28px; }
        .code-section { margin-bottom: 30px; }
        .code-box { background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 10px; position: relative; margin-top: 10px; overflow: auto; }
        .copy-btn { position: absolute; top: 10px; left: 10px; background: #667eea; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px; }
        .api-docs { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .api-list { margin-top: 15px; }
        .api-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
        .feature-card { background: white; padding: 25px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .feature-list { list-style: none; margin-top: 15px; }
        .feature-list li { margin: 10px 0; }
        .settings-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .settings-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee; }
        .status-active { color: #28a745; font-weight: 600; }
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .actions-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .main { flex-direction: column; padding: 20px; }
          .sidebar { width: 100%; }
          .stats-grid { grid-template-columns: 1fr; }
          .actions-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; direction: rtl; }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{padding: 40, textAlign: 'center'}}>جاري التحميل...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
