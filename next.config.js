'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

const CUISINES = ['All', 'North Indian', 'Chinese', 'Italian', 'American', 'South Indian'];

interface Restaurant {
  id: string; name: string; cuisine: string; rating: number;
  delivery_time: string; min_order: number; image: string; tags: string[];
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (search) params.search = search;
    if (cuisine !== 'All') params.cuisine = cuisine;
    api.getRestaurants(params).then(r => { setRestaurants(r); setLoading(false); });
  }, [search, cuisine]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Hero */}
      <div className="fade-in" style={{ marginBottom: 48, textAlign: 'center' }}>
        <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          Hungry? <span style={{ color: 'var(--accent)' }}>We deliver.</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 18, marginBottom: 32 }}>
          From your favourite restaurants, straight to your door.
        </p>
        <div style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
          <input
            placeholder="Search restaurants or cuisines…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 48, height: 54, fontSize: 16, borderRadius: 14 }}
          />
        </div>
      </div>

      {/* Cuisine Filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        {CUISINES.map(c => (
          <button key={c} onClick={() => setCuisine(c)} style={{
            padding: '8px 20px', borderRadius: 24, border: '1px solid',
            borderColor: cuisine === c ? 'var(--accent)' : 'var(--border)',
            background: cuisine === c ? 'rgba(255,107,53,0.15)' : 'var(--surface)',
            color: cuisine === c ? 'var(--accent)' : 'var(--muted)',
            cursor: 'pointer', fontFamily: 'Syne', fontWeight: 600, fontSize: 14,
            transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      {/* Restaurant Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ height: 280, background: 'var(--surface)', borderRadius: 16,
              animation: 'pulse 1.5s infinite', border: '1px solid var(--border)' }} />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: 48, marginBottom: 12 }}>🍽️</p>
          <p style={{ fontFamily: 'Syne', fontSize: 20 }}>No restaurants found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {restaurants.map((r, i) => (
            <Link key={r.id} href={`/restaurant/${r.id}`} style={{ textDecoration: 'none' }}>
              <div className="card fade-in" style={{ animationDelay: `${i * 0.07}s`, cursor: 'pointer' }}>
                {/* Image area */}
                <div style={{
                  height: 150, background: 'linear-gradient(135deg, var(--surface2), var(--border))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64,
                }}>
                  {r.image}
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700 }}>{r.name}</h3>
                    <span style={{
                      background: 'rgba(6,214,160,0.15)', color: 'var(--green)',
                      borderRadius: 8, padding: '3px 9px', fontSize: 13, fontWeight: 700, fontFamily: 'Syne',
                    }}>★ {r.rating}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 12 }}>{r.cuisine}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                    {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 13 }}>
                    <span>🕐 {r.delivery_time}</span>
                    <span>Min ₹{r.min_order}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
