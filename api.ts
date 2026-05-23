'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/providers';
import { api } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  confirmed: '#06d6a0',
  preparing: '#ffd166',
  out_for_delivery: '#ff6b35',
  delivered: '#888',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const newOrderId = searchParams.get('new');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    api.getOrders().then(o => { setOrders(o.reverse()); setLoading(false); });
  }, [user]);

  if (!user) return (
    <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
      <p style={{ fontSize: 48, marginBottom: 12 }}>🔒</p>
      <h2 style={{ fontFamily: 'Syne', fontSize: 24, marginBottom: 20 }}>Sign in to view your orders</h2>
      <Link href="/"><button className="btn-primary" style={{ borderRadius: 12, padding: '12px 32px', fontSize: 16 }}>Go Home</button></Link>
    </div>
  );

  if (loading) return (
    <div style={{ maxWidth: 700, margin: '60px auto', padding: '0 24px' }}>
      {[1,2,3].map(i => <div key={i} style={{ height: 140, background: 'var(--surface)', borderRadius: 16, marginBottom: 16 }} />)}
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontFamily: 'Syne', fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Your Orders</h1>

      {newOrderId && (
        <div className="fade-in" style={{
          background: 'rgba(6,214,160,0.1)', border: '1px solid var(--green)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 28, display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <span style={{ fontSize: 32 }}>✅</span>
          <div>
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: 'var(--green)' }}>Order Placed Successfully!</p>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Order #{newOrderId} · Estimated delivery: 30-45 min</p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: 56, marginBottom: 16 }}>📦</p>
          <p style={{ fontFamily: 'Syne', fontSize: 22, marginBottom: 12 }}>No orders yet</p>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Time to order some food!</p>
          <Link href="/"><button className="btn-primary" style={{ borderRadius: 12, padding: '12px 28px', fontSize: 15 }}>Browse Restaurants</button></Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map((order, i) => (
            <div key={order.id} className="card fade-in" style={{ animationDelay: `${i * 0.06}s`, padding: '22px 24px', borderRadius: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17 }}>{order.restaurant_name}</p>
                  <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>
                    Order #{order.id} · {new Date(order.placed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: 'Syne',
                  background: `${STATUS_COLORS[order.status]}22`,
                  color: STATUS_COLORS[order.status] || 'var(--muted)',
                }}>
                  {order.status.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14 }}>
                {order.items.map((i: any) => `${i.name} ×${i.quantity}`).join(' · ')}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                  <span style={{ marginRight: 16 }}>💳 {order.payment_method}</span>
                  <span>🏠 {order.address.slice(0, 40)}{order.address.length > 40 ? '…' : ''}</span>
                </div>
                <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 17, color: 'var(--accent)' }}>₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
