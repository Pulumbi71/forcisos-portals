'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@forcisos/auth';

type Stage = 'loading' | 'set-password' | 'success' | 'error';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    // Read code from URL without useSearchParams to avoid prerender issues
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) { setStage('error'); setError('Invalid or missing reset code. Please request a new password reset link.'); return; }
    supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => {
      if (exchangeError) { setStage('error'); setError('This reset link has expired or already been used. Please request a new one.'); }
      else { setStage('set-password'); }
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) { setError(updateError.message); return; }
      setStage('success');
      setTimeout(() => router.push('/'), 3000);
    } catch { setError('An unexpected error occurred. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0d1b30 60%, #0a1520 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4" style={{ backgroundColor: '#00BCD4' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/><path d="M16 9L23 13V21L16 25L9 21V13L16 9Z" fill="white" fillOpacity="0.3"/><circle cx="16" cy="17" r="3" fill="white"/></svg>
          </div>
          <p className="text-white font-bold text-xl tracking-wide">4CISOs Platform</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1" style={{ backgroundColor: '#00BCD4' }} />
          <div className="p-8">
            {stage === 'loading' && (<div className="text-center py-8"><svg className="animate-spin w-10 h-10 mx-auto mb-4" style={{ color: '#00BCD4' }} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg><p className="text-gray-500">Verifying your reset link...</p></div>)}
            {stage === 'set-password' && (<>
              <div className="mb-6"><h2 className="text-2xl font-bold" style={{ color: '#1B2A4A' }}>Set new password</h2><p className="text-gray-500 mt-1 text-sm">Choose a strong password for your account</p></div>
              {error && (<div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200"><p className="text-red-700 text-sm">{error}</p></div>)}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B2A4A' }}>New Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" required disabled={loading} className="w-full px-4 py-3 pr-12 border-2 rounded-lg text-gray-900 placeholder-gray-400 outline-none disabled:bg-gray-50" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                  </div>
                  {password.length > 0 && (<div className="mt-2 flex gap-1">{[1,2,3,4].map(i => (<div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{ backgroundColor: password.length >= i * 3 ? (password.length >= 12 ? '#00BCD4' : password.length >= 8 ? '#f59e0b' : '#ef4444') : '#e2e8f0' }} />))}</div>)}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#1B2A4A' }}>Confirm Password</label>
                  <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required disabled={loading} className="w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 outline-none disabled:bg-gray-50" style={{ borderColor: confirmPassword && confirmPassword !== password ? '#ef4444' : '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                  {confirmPassword && confirmPassword !== password && (<p className="text-xs text-red-500 mt-1">Passwords do not match</p>)}
                </div>
                <button type="submit" disabled={loading || password !== confirmPassword || password.length < 8} className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60 mt-2" style={{ backgroundColor: '#00BCD4' }}>{loading ? 'Updating...' : 'Set New Password'}</button>
              </form>
            </>)}
            {stage === 'success' && (<div className="text-center py-4"><div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#e0f7fa' }}><svg className="w-8 h-8" style={{ color: '#00BCD4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h2 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Password updated!</h2><p className="text-gray-500 text-sm">Redirecting to the portal...</p></div>)}
            {stage === 'error' && (<div className="text-center py-4"><div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-red-50"><svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><h2 className="text-xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Link expired</h2><p className="text-gray-500 text-sm mb-6">{error}</p><a href="/login" className="text-sm font-medium hover:underline" style={{ color: '#00BCD4' }}>← Back to sign in</a></div>)}
          </div>
        </div>
        <p className="text-center mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 Forcisos. All rights reserved.</p>
      </div>
    </div>
  );
}
