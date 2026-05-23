'use client';
import { useState } from 'react';
import { useAuth } from '@/context/providers';

interface Props {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitch: (m: 'login' | 'register') => void;
}

export default function AuthModal({ mode, onClose, onSwitch }: Props) {
  const { login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(email, password);
      else await register(name, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
    }}>
      <div onClick={e => e.stopPropagation()} className="fade-in" style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
        padding: 40, width: '100%', maxWidth: 420,
      }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 26, marginBottom: 8 }}>
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>
          {mode === 'login' ? 'Sign in to your FoodDash account' : 'Join FoodDash for free'}
        </p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

          {error && <p style={{ color: 'var(--red)', fontSize: 13 }}>{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading} style={{
            borderRadius: 10, padding: '14px', fontSize: 16, marginTop: 4,
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => onSwitch(mode === 'login' ? 'register' : 'login')}
            style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
}
