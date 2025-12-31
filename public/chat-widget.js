/**
 * موقعي لايف - Chat Widget
 * دعم فني ذكي مدعوم بـ Claude AI
 */
(function() {
  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  // الحصول على merchant_id من الـ script tag
  const scriptTag = document.currentScript;
  const merchantId = scriptTag?.getAttribute('data-merchant') ||
                     new URLSearchParams(scriptTag?.src.split('?')[1]).get('merchant');

  // إنشاء الـ Widget
  function createWidget() {
    // الحاوية الرئيسية
    const container = document.createElement('div');
    container.id = 'mawqi-chat-widget';
    container.innerHTML = `
      <style>
        #mawqi-chat-widget {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          direction: rtl;
        }
        #mawqi-chat-widget * {
          box-sizing: border-box;
        }
        .mawqi-chat-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .mawqi-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5);
        }
        .mawqi-chat-button svg {
          width: 28px;
          height: 28px;
          fill: white;
        }
        .mawqi-chat-window {
          position: fixed;
          bottom: 90px;
          left: 20px;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          z-index: 9999;
          display: none;
          flex-direction: column;
          overflow: hidden;
        }
        .mawqi-chat-window.open {
          display: flex;
          animation: mawqi-slide-up 0.3s ease;
        }
        @keyframes mawqi-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mawqi-chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mawqi-chat-header-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .mawqi-chat-header-info h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .mawqi-chat-header-info p {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.8;
        }
        .mawqi-chat-close {
          margin-right: auto;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
        }
        .mawqi-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mawqi-message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
        }
        .mawqi-message.user {
          background: #667eea;
          color: white;
          align-self: flex-start;
          border-bottom-right-radius: 4px;
        }
        .mawqi-message.bot {
          background: #f0f0f0;
          color: #333;
          align-self: flex-end;
          border-bottom-left-radius: 4px;
        }
        .mawqi-message pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 12px;
          margin: 8px 0;
        }
        .mawqi-message code {
          font-family: 'Courier New', monospace;
        }
        .mawqi-chat-input {
          display: flex;
          padding: 15px;
          border-top: 1px solid #eee;
          gap: 10px;
        }
        .mawqi-chat-input input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
          direction: rtl;
        }
        .mawqi-chat-input input:focus {
          border-color: #667eea;
        }
        .mawqi-chat-input button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #667eea;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mawqi-chat-input button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .mawqi-chat-input button svg {
          width: 20px;
          height: 20px;
          fill: white;
          transform: rotate(180deg);
        }
        .mawqi-typing {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: #f0f0f0;
          border-radius: 16px;
          align-self: flex-end;
          width: fit-content;
        }
        .mawqi-typing span {
          width: 8px;
          height: 8px;
          background: #999;
          border-radius: 50%;
          animation: mawqi-bounce 1.4s infinite ease-in-out;
        }
        .mawqi-typing span:nth-child(1) { animation-delay: 0s; }
        .mawqi-typing span:nth-child(2) { animation-delay: 0.2s; }
        .mawqi-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes mawqi-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        @media (max-width: 480px) {
          .mawqi-chat-window {
            width: calc(100% - 40px);
            height: calc(100% - 110px);
            bottom: 90px;
            left: 20px;
            right: 20px;
          }
        }
      </style>

      <button class="mawqi-chat-button" id="mawqi-toggle">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
      </button>

      <div class="mawqi-chat-window" id="mawqi-window">
        <div class="mawqi-chat-header">
          <div class="mawqi-chat-header-avatar">🤖</div>
          <div class="mawqi-chat-header-info">
            <h4>مساعد موقعي لايف</h4>
            <p>مدعوم بالذكاء الاصطناعي</p>
          </div>
          <button class="mawqi-chat-close" id="mawqi-close">✕</button>
        </div>

        <div class="mawqi-chat-messages" id="mawqi-messages">
          <div class="mawqi-message bot">
            أهلاً! 👋 أنا مساعدك الذكي. كيف أقدر أساعدك اليوم؟
          </div>
        </div>

        <div class="mawqi-chat-input">
          <input type="text" id="mawqi-input" placeholder="اكتب رسالتك..." />
          <button id="mawqi-send">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Event Listeners
    const toggle = document.getElementById('mawqi-toggle');
    const close = document.getElementById('mawqi-close');
    const window = document.getElementById('mawqi-window');
    const input = document.getElementById('mawqi-input');
    const send = document.getElementById('mawqi-send');
    const messages = document.getElementById('mawqi-messages');

    let conversationHistory = [];

    toggle.addEventListener('click', () => {
      window.classList.toggle('open');
      if (window.classList.contains('open')) {
        input.focus();
      }
    });

    close.addEventListener('click', () => {
      window.classList.remove('open');
    });

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      // إضافة رسالة المستخدم
      addMessage(text, 'user');
      input.value = '';
      send.disabled = true;

      // إضافة مؤشر الكتابة
      const typing = document.createElement('div');
      typing.className = 'mawqi-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;

      try {
        const response = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            merchantId: merchantId,
            conversationHistory: conversationHistory
          })
        });

        const data = await response.json();

        // إزالة مؤشر الكتابة
        typing.remove();

        if (data.success) {
          addMessage(data.response, 'bot');
          conversationHistory.push(
            { role: 'user', content: text },
            { role: 'assistant', content: data.response }
          );
        } else {
          addMessage('عذراً، حدث خطأ. حاول مرة أخرى.', 'bot');
        }
      } catch (error) {
        typing.remove();
        addMessage('عذراً، لم أتمكن من الاتصال. تأكد من اتصالك بالإنترنت.', 'bot');
      }

      send.disabled = false;
    }

    function addMessage(text, type) {
      const msg = document.createElement('div');
      msg.className = `mawqi-message ${type}`;

      // تحويل الكود إلى HTML
      let formattedText = text
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      msg.innerHTML = formattedText;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  }

  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
