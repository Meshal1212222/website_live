/**
 * موقعي لايف - Widget
 * قطعة الكود التي يضيفها التاجر لموقعه الخارجي
 *
 * Usage:
 * <script src="https://yourapp.com/widget.js" data-merchant="MERCHANT_ID"></script>
 * <div id="mawqi-products"></div>
 */

(function() {
  'use strict';

  // Get script tag and config
  const script = document.currentScript;
  const merchantId = script?.getAttribute('data-merchant');
  const apiBase = script?.src.replace('/widget.js', '') || '';

  // Widget styles
  const styles = `
    .mawqi-widget {
      font-family: 'Tajawal', 'Segoe UI', Tahoma, sans-serif;
      direction: rtl;
    }

    .mawqi-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }

    .mawqi-product-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .mawqi-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .mawqi-product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .mawqi-product-info {
      padding: 1rem;
    }

    .mawqi-product-name {
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a2e;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    }

    .mawqi-product-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #667eea;
    }

    .mawqi-product-price-old {
      font-size: 0.875rem;
      color: #999;
      text-decoration: line-through;
      margin-right: 0.5rem;
    }

    .mawqi-add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.75rem;
      transition: opacity 0.2s;
    }

    .mawqi-add-to-cart:hover {
      opacity: 0.9;
    }

    .mawqi-loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .mawqi-loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: mawqi-spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes mawqi-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .mawqi-error {
      text-align: center;
      padding: 2rem;
      color: #e74c3c;
      background: #fdf0f0;
      border-radius: 8px;
    }

    .mawqi-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 1rem;
      justify-content: center;
    }

    .mawqi-category-btn {
      padding: 0.5rem 1rem;
      background: #f5f5f5;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .mawqi-category-btn:hover,
    .mawqi-category-btn.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .mawqi-search-box {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .mawqi-search-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      direction: rtl;
    }

    .mawqi-search-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .mawqi-search-btn {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  `;

  // Inject styles
  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Add Tajawal font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // API calls
  async function fetchProducts(categoryId = null) {
    let url = `${apiBase}/api/products?merchant_id=${merchantId}`;
    if (categoryId) url += `&category_id=${categoryId}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  }

  async function fetchCategories() {
    const response = await fetch(`${apiBase}/api/categories?merchant_id=${merchantId}`);
    const data = await response.json();
    return data.data || [];
  }

  async function searchProducts(query) {
    const response = await fetch(`${apiBase}/api/search?merchant_id=${merchantId}&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.data || [];
  }

  // Render functions
  function renderLoading(container) {
    container.innerHTML = `
      <div class="mawqi-loading">
        <div class="mawqi-loading-spinner"></div>
        <div>جاري التحميل...</div>
      </div>
    `;
  }

  function renderError(container, message) {
    container.innerHTML = `
      <div class="mawqi-error">
        <p>${message}</p>
      </div>
    `;
  }

  function renderProduct(product) {
    const image = product.image?.url || product.images?.[0]?.url || 'https://via.placeholder.com/300x200?text=No+Image';
    const hasDiscount = product.sale_price && product.sale_price < product.price;

    return `
      <div class="mawqi-product-card" data-product-id="${product.id}">
        <img class="mawqi-product-image" src="${image}" alt="${product.name}" loading="lazy">
        <div class="mawqi-product-info">
          <h3 class="mawqi-product-name">${product.name}</h3>
          <div class="mawqi-product-price">
            ${hasDiscount ? `<span class="mawqi-product-price-old">${product.price} ر.س</span>` : ''}
            ${hasDiscount ? product.sale_price : product.price} ر.س
          </div>
          <button class="mawqi-add-to-cart" data-product-id="${product.id}">
            أضف للسلة
          </button>
        </div>
      </div>
    `;
  }

  function renderProducts(container, products) {
    if (!products || products.length === 0) {
      container.innerHTML = '<div class="mawqi-error">لا توجد منتجات</div>';
      return;
    }

    container.innerHTML = `
      <div class="mawqi-products-grid">
        ${products.map(renderProduct).join('')}
      </div>
    `;

    // Add click handlers
    container.querySelectorAll('.mawqi-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-product-id');
        window.dispatchEvent(new CustomEvent('mawqi:addToCart', { detail: { productId } }));

        // Visual feedback
        btn.textContent = 'تمت الإضافة ✓';
        setTimeout(() => { btn.textContent = 'أضف للسلة'; }, 2000);
      });
    });
  }

  function renderCategories(container, categories, onSelect) {
    const html = `
      <div class="mawqi-categories">
        <button class="mawqi-category-btn active" data-category="">الكل</button>
        ${categories.map(cat => `
          <button class="mawqi-category-btn" data-category="${cat.id}">${cat.name}</button>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll('.mawqi-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.mawqi-category-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        onSelect(e.target.getAttribute('data-category'));
      });
    });
  }

  function renderSearchBox(container, onSearch) {
    container.innerHTML = `
      <div class="mawqi-search-box">
        <input type="text" class="mawqi-search-input" placeholder="ابحث عن منتج...">
        <button class="mawqi-search-btn">بحث</button>
      </div>
    `;

    const input = container.querySelector('.mawqi-search-input');
    const btn = container.querySelector('.mawqi-search-btn');

    btn.addEventListener('click', () => onSearch(input.value));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') onSearch(input.value);
    });
  }

  // Initialize widget
  async function initWidget() {
    if (!merchantId) {
      console.error('Mawqi Widget: merchant_id مطلوب');
      return;
    }

    injectStyles();

    // Products widget
    const productsContainer = document.getElementById('mawqi-products');
    if (productsContainer) {
      productsContainer.classList.add('mawqi-widget');
      renderLoading(productsContainer);

      try {
        const products = await fetchProducts();
        renderProducts(productsContainer, products);
      } catch (error) {
        renderError(productsContainer, 'خطأ في تحميل المنتجات');
      }
    }

    // Categories widget
    const categoriesContainer = document.getElementById('mawqi-categories');
    if (categoriesContainer) {
      categoriesContainer.classList.add('mawqi-widget');

      try {
        const categories = await fetchCategories();
        renderCategories(categoriesContainer, categories, async (categoryId) => {
          if (productsContainer) {
            renderLoading(productsContainer);
            const products = categoryId
              ? await fetchProducts(categoryId)
              : await fetchProducts();
            renderProducts(productsContainer, products);
          }
        });
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }

    // Search widget
    const searchContainer = document.getElementById('mawqi-search');
    if (searchContainer) {
      searchContainer.classList.add('mawqi-widget');
      renderSearchBox(searchContainer, async (query) => {
        if (productsContainer && query) {
          renderLoading(productsContainer);
          try {
            const products = await searchProducts(query);
            renderProducts(productsContainer, products);
          } catch (error) {
            renderError(productsContainer, 'خطأ في البحث');
          }
        }
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  // Expose API
  window.MawqiWidget = {
    refresh: initWidget,
    fetchProducts,
    fetchCategories,
    searchProducts
  };

})();
