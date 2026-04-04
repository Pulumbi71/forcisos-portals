'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 500, padding: 32, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Something went wrong</h2>
          <p style={{ color: '#666', marginBottom: 8 }}>{error.message}</p>
          <p style={{ color: '#999', fontSize: 12, marginBottom: 24 }}>{error.digest ? 'Digest: ' + error.digest : ''}</p>
          <button onClick={reset} style={{ padding: '8px 24px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>Try again</button>
        </div>
      </body>
    </html>
  );
}
