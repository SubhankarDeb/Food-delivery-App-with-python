@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0a0a0a;
  --surface: #141414;
  --surface2: #1e1e1e;
  --border: #2a2a2a;
  --text: #f0f0f0;
  --muted: #888;
  --accent: #ff6b35;
  --accent2: #ffd166;
  --green: #06d6a0;
  --red: #ef4444;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }

.btn-primary {
  background: var(--accent);
  color: white;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary:hover { background: #e85a24; transform: translateY(-1px); }

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s;
}
.card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(255,107,53,0.15); }

input, select, textarea {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
}
input:focus, select:focus, textarea:focus { border-color: var(--accent); }

.tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(255,107,53,0.15);
  color: var(--accent);
  font-family: 'Syne', sans-serif;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.fade-in { animation: fadeIn 0.4s ease forwards; }

@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.pulse { animation: pulse 0.3s ease; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
