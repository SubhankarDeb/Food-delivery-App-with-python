'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth, useCart } from '@/context/providers';

interface MenuItem {
  id: string; name: string; price: number; description: string;
  category: string; veg: boolean; popular: boolean;
}

interface Restaurant {
  id: string; name: string; cuisine: string; rating: number;
  delivery_time: string; min_order: number; image: string; tags: string[];
}

export default function RestaurantPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { cart, addItem } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [adding, setAdding] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!id) return;
    Promise.all([api.getRestaurant(id as string), api.getMenu(id as string)])
      .then(([r, m]) => { setRestaurant(r); setMenu(m); });
  }, [id]);

  const categories = ['All', ...Array.from(new Set(menu.map(m => m.category)))];

  const filtered = activeCategory === 'All' ? menu : menu.filter(m => m.category === activeCategory);

  const getQty = (itemId: string) => {
    const found = cart.items.find((i: any) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAdd = async (item: MenuItem) => {
    if (!user) { setToast('Please log in to add items'); setTimeout(() => setToast(''), 2500); return; }
    setAdding(item.id);
    try { await addItem(id as string, item.id, 1); } finally { setAdding(null); }
  };

  const handleRemove = async (item: MenuItem) => {
    await addItem(id as string, item.id, -1);
  };

  if (!restaurant) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <p style={{ color: 'var(--muted)', fontFamily: 'Syne', fontSize: 18 }}>Loading…</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--surface2)', border: '1px solid var(--accent)', borderRadius: 12,
          padding: '12px 24px', color: 'var(--text)', fontFamily: 'Syne', zIndex: 300,
        }}>{toast}</div>
      )}

      {/* Restaurant Header */}
      <div className="card fade-in" style={{ marginBottom: 32, display: 'flex', gap: 24, padding: 28, borderRadius: 20 }}>
        <div style={{ fontSize: 72 }}>{restaurant.image}</div>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 30, fontWeight: 800, marginBottom: 6 }}>{restaurant.name}</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 12 }}>{restaurant.cuisine}</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 14 }}>
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>★ {restaurant.rating}</span>
            <span style={{ color: 'var(--muted)' }}>🕐 {restaurant.delivery_time}</span>
            <span style={{ color: 'var(--muted)' }}>Min ₹{restaurant.min_order}</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '7px 18px', borderRadius: 20, border: '1px solid',
            borderColor: activeCategory === c ? 'var(--accent)' : 'var(--border)',
            background: activeCategory === c ? 'rgba(255,107,53,0.15)' : 'var(--surface)',
            color: activeCategory === c ? 'var(--accent)' : 'var(--muted)',
            cursor: 'pointer', fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
            whiteSpace: 'nowrap', transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      {/* Menu Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((item, i) => {
          const qty = getQty(item.id);
          return (
            <div key={item.id} className="card fade-in" style={{
              animationDelay: `${i * 0.05}s`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 22px', borderRadius: 14, gap: 16,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: item.veg ? 'var(--green)' : 'var(--red)' }}>
                    {item.veg ? '🟢' : '🔴'}
                  </span>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700 }}>{item.name}</h3>
                  {item.popular && <span className="tag" style={{ fontSize: 10 }}>Popular</span>}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>{item.description}</p>
                <p style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, color: 'var(--accent)' }}>₹{item.price}</p>
              </div>

              <div>
                {qty === 0 ? (
                  <button onClick={() => handleAdd(item)} className="btn-primary" style={{
                    borderRadius: 10, padding: '9px 22px', fontSize: 14,
                    opacity: adding === item.id ? 0.7 : 1,
                  }}>
                    {adding === item.id ? '…' : '+ ADD'}
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface2)', borderRadius: 10, padding: '6px 12px' }}>
                    <button onClick={() => handleRemove(item)} style={{
                      width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)',
                      border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 16,
                    }}>−</button>
                    <span style={{ fontFamily: 'Syne', fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => handleAdd(item)} style={{
                      width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)',
                      border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 16,
                    }}>+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
