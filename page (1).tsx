'use client';
import Link from 'next/link';
import { useAuth, useCart } from '@/context/providers';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openLogin = () => { setAuthMode('login'); setShowAuth(true); };
  const openRegister = () => { setAuthMode('register'); setShowAuth(true); };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>
            Food<span style={{ color: 'var(--text)' }}>Dash</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
            <button style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '8px 16px', color: 'var(--text)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Syne'
            }}>
              🛒 Cart
              {cart.item_count > 0 && (
                <span style={{
                  background: 'var(--accent)', color: 'white', borderRadius: '50%',
                  width: 20, height: 20, fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cart.item_count}</span>
              )}
            </button>
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link href="/orders" style={{ textDecoration: 'none' }}>
                <span style={{ color: 'var(--muted)', fontSize: 14, fontFamily: 'Syne', cursor: 'pointer' }}>
                  Orders
                </span>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne', fontWeight: 700, fontSize: 14,
                }}>{user.name[0].toUpperCase()}</div>
                <span style={{ fontSize: 14, fontFamily: 'Syne' }}>{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={logout} style={{
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 8, padding: '6px 14px', color: 'var(--muted)',
                cursor: 'pointer', fontSize: 13, fontFamily: 'Syne',
              }}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={openLogin} style={{
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 18px', color: 'var(--text)',
                cursor: 'pointer', fontFamily: 'Syne', fontWeight: 600,
              }}>Log in</button>
              <button onClick={openRegister} className="btn-primary" style={{ borderRadius: 8, padding: '8px 18px' }}>
                Sign up
              </button>
            </div>
          )}
        </div>
      </nav>

      {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSwitch={(m) => setAuthMode(m)} />}
    </>
  );
}
