export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Readex Pro, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>موقعي لايف</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>اربط موقعك الخارجي مع متجرك في سلة</p>
        <div style={{
          marginTop: '40px',
          padding: '20px 40px',
          background: 'white',
          borderRadius: '10px',
          color: '#667eea',
          fontWeight: 'bold'
        }}>
          قريباً...
        </div>
      </div>
    </div>
  );
}
