'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function StorePage() {
  const params = useParams();
  const merchantId = params.merchantId;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (merchantId) {
      loadStore();
    }
  }, [merchantId]);

  const loadStore = async () => {
    setLoading(true);
    try {
      // جلب كل البيانات بالتوازي
      const [productsRes, categoriesRes, storeRes] = await Promise.all([
        fetch(`${API_BASE}/api/products?merchant_id=${merchantId}`),
        fetch(`${API_BASE}/api/categories?merchant_id=${merchantId}`),
        fetch(`${API_BASE}/api/store?merchant_id=${merchantId}&include=info`),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const storeData = await storeRes.json();

      if (productsData.success !== false) {
        setProducts(productsData.data || []);
      }
      if (categoriesData.success !== false) {
        setCategories(categoriesData.data || []);
      }
      if (storeData.success) {
        setStoreInfo(storeData.data?.info?.data || null);
      }
    } catch (error) {
      console.error('Error loading store:', error);
    }
    setLoading(false);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.price?.amount || item.sale_price?.amount || 0;
    return sum + (price * item.quantity);
  }, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery ||
      product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory ||
      product.categories?.some(cat => cat.id === activeCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Tajawal, sans-serif',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>⚡</div>
          <p>جاري تحميل المتجر...</p>
        </div>
        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(10, 10, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          {/* Logo/Store Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {storeInfo?.logo && (
              <img
                src={storeInfo.logo}
                alt={storeInfo.name}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            )}
            <h1 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'white',
            }}>
              {storeInfo?.name || 'المتجر'}
            </h1>
          </div>

          {/* Search */}
          <div style={{
            flex: 1,
            maxWidth: '400px',
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 ابحث عن منتج..."
              style={{
                width: '100%',
                padding: '0.8rem 1.2rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              position: 'relative',
              padding: '0.8rem 1.2rem',
              background: cart.length > 0
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
            }}
          >
            🛒
            {cart.length > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}>
        {/* Categories */}
        {categories.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2rem',
          }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: '0.7rem 1.5rem',
                background: !activeCategory
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.95rem',
              }}
            >
              الكل
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.7rem 1.5rem',
                  background: activeCategory === cat.id
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '0.95rem',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{
                aspectRatio: '1',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={product.thumbnail || product.image?.url || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {product.sale_price && product.price && product.sale_price.amount < product.price.amount && (
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ef4444',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}>
                    خصم
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.2rem' }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {product.name}
                </h3>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    color: '#10b981',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                  }}>
                    {(product.sale_price?.amount || product.price?.amount || 0).toFixed(2)}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    {product.currency || 'ر.س'}
                  </span>
                  {product.sale_price && product.price && product.sale_price.amount < product.price.amount && (
                    <span style={{
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'line-through',
                      fontSize: '0.9rem',
                    }}>
                      {product.price.amount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  🛒 أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(255,255,255,0.5)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <p>لا توجد منتجات</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 200,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '400px',
            background: '#0a0a1a',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            zIndex: 201,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Cart Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <h2 style={{ color: 'white', fontSize: '1.3rem' }}>🛒 السلة</h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
              {cart.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                  <p>السلة فارغة</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    marginBottom: '0.75rem',
                  }}>
                    <img
                      src={item.thumbnail || item.image?.url}
                      alt={item.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        color: 'white',
                        fontSize: '0.95rem',
                        marginBottom: '0.3rem',
                      }}>
                        {item.name}
                      </h4>
                      <p style={{ color: '#10b981', fontWeight: '600' }}>
                        {(item.sale_price?.amount || item.price?.amount || 0).toFixed(2)} ر.س
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          -
                        </button>
                        <span style={{ color: 'white', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            marginRight: 'auto',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                }}>
                  <span>المجموع:</span>
                  <span style={{ color: '#10b981' }}>{cartTotal.toFixed(2)} ر.س</span>
                </div>
                <button
                  onClick={() => {
                    // التوجيه لسلة للإكمال
                    if (storeInfo?.url) {
                      window.open(storeInfo.url, '_blank');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                  }}
                >
                  إتمام الطلب ✨
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Powered by */}
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.85rem',
      }}>
        مدعوم من <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>موقعي لايف</a> ⚡
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>
    </div>
  );
}
