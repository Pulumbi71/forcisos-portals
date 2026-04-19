'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@forcisos/auth';

type Mode = 'login' | 'mfa' | 'forgot' | 'forgot-sent';

export default function TrainerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaFactorId, setMfaFactorId] = useState('');
  const [mfaChallengeId, setMfaChallengeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.message); return; }
      if (data?.user) {
        const userRole = data.user.user_metadata?.role;
        if (userRole !== 'fc_student') {
          await supabase.auth.signOut();
          setError('Access denied. This portal is for trainers only.');
          return;
        }
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal?.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
          const { data: factors } = await supabase.auth.mfa.listFactors();
          const totp = factors?.totp?.[0];
          if (totp) {
            const { data: challenge } = await supabase.auth.mfa.challenge({ factorId: totp.id });
            setMfaFactorId(totp.id);
            setMfaChallengeId(challenge?.id || '');
            setMode('mfa');
            return;
          }
        }
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMfa = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: mfaChallengeId,
        code: mfaCode,
      });
      if (verifyError) { setError(verifyError.message); return; }
      router.push('/');
      router.refresh();
    } catch {
      setError('MFA verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (resetError) { setError(resetError.message); return; }
      setMode('forgot-sent');
    } catch {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0d1b30 60%, #0a1520 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4" style={{ backgroundColor: '#00BCD4' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
              <path d="M16 9L23 13V21L16 25L9 21V13L16 9Z" fill="white" fillOpacity="0.3"/>
              <circle cx="16" cy="17" r="3" fill="white"/>
            </svg>
          </div>
          <p className="text-white font-bold text-xl tracking-wide">4CISOs Platform</p>
          <p className="text-white mt-1" style={{ opacity: 0.5, fontSize: '13px' }}>Trainer Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1" style={{ backgroundColor: '#00BCD4' }} />
          <div className="p-8">
            {mode === 'login' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#1B2A4A' }}>Welcome back</h2>
                  <p className="text-gray-500 mt-1 text-sm">Sign in to your trainer account</p>
                </div>
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: '#1B2A4A' }}>Email Address</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required disabled={loading} className="w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 transition-colors disabled:bg-gray-50 outline-none" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#1B2A4A' }}>Password</label>
                      <button type="button" onClick={() => setMode('forgot')} className="text-xs font-medium hover:underline" style={{ color: '#00BCD4' }}>Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required disabled={loading} className="w-full px-4 py-3 pr-12 border-2 rounded-lg text-gray-900 placeholder-gray-400 transition-colors disabled:bg-gray-50 outline-none" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                        {showPassword ? (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>) : (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60 mt-2" style={{ backgroundColor: '#00BCD4' }}>
                    {loading ? (<span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in...</span>) : 'Sign In'}
                  </button>
                </form>
              </>
            )}
            {mode === 'mfa' && (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: '#e0f7fa' }}>
                    <svg className="w-6 h-6" style={{ color: '#00BCD4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: '#1B2A4A' }}>Two-Factor Auth</h2>
                  <p className="text-gray-500 mt-1 text-sm">Enter the 6-digit code from your authenticator app</p>
                </div>
                {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200"><p className="text-red-700 text-sm">{error}</p></div>}
                <form onSubmit={handleMfa} className="space-y-4">
                  <input type="text" value={mfaCode} onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" required maxLength={6} disabled={loading} className="w-full px-4 py-3 border-2 rounded-lg text-gray-900 text-center text-2xl tracking-widest font-mono placeholder-gray-300 outline-none" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                  <button type="submit" disabled={loading || mfaCode.length !== 6} className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60" style={{ backgroundColor: '#00BCD4' }}>{loading ? 'Verifying...' : 'Verify Code'}</button>
                  <button type="button" onClick={() => { setMode('login'); setError(''); setMfaCode(''); }} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">← Back to sign in</button>
                </form>
              </>
            )}
            {mode === 'forgot' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#1B2A4A' }}>Reset password</h2>
                  <p className="text-gray-500 mt-1 text-sm">We will send you a reset link</p>
                </div>
                {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200"><p className="text-red-700 text-sm">{error}</p></div>}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium mb-1.5" style={{ color: '#1B2A4A' }}>Email Address</label>
                    <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required disabled={loading} className="w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 outline-none" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.target.style.borderColor = '#00BCD4')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60" style={{ backgroundColor: '#00BCD4' }}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
                  <button type="button" onClick={() => { setMode('login'); setError(''); }} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">← Back to sign in</button>
                </form>
              </>
            )}
            {mode === 'forgot-sent' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#e0f7fa' }}>
                  <svg className="w-8 h-8" style={{ color: '#00BCD4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Check your email</h2>
                <p className="text-gray-500 text-sm mb-6">Reset link sent to <strong>{email}</strong></p>
                <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-sm font-medium hover:underline" style={{ color: '#00BCD4' }}>← Back to sign in</button>
              </div>
            )}
          </div>
        </div>
        <p className="text-center mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 Forcisos. All rights reserved.</p>
      </div>
    </div>
  );
}
