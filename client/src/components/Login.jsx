import React, { useState } from 'react';
import { Dumbbell, Mail, Lock } from 'lucide-react';

export default function Login({ onLogin, onSwitch, onBack, error, busy }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = e => { e.preventDefault(); onLogin({ email, password }); };
  return <div className="auth-shell"><form className="auth-card" onSubmit={submit}>
    <div className="auth-brand"><span className="brand-icon"><Dumbbell /></span><b>FITMATE</b><small>PERSONAL TRAINING</small></div>
    <span className="eyebrow">WELCOME BACK</span><h1>تسجيل الدخول</h1><p className="auth-subtitle">سجّل دخولك وتابع رحلتك الرياضية</p>
    {error && <div className="alert">{error}</div>}
    <label>البريد الإلكتروني<div className="auth-input"><Mail size={17}/><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com"/></div></label>
    <label>كلمة المرور<div className="auth-input"><Lock size={17}/><input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="كلمة المرور"/></div></label>
    <button className="primary full auth-submit" disabled={busy}>{busy?'جاري الدخول…':'دخول إلى حسابي'}</button>
    <p className="auth-switch">ما عندك حساب؟ <button type="button" onClick={onSwitch}>إنشاء حساب جديد</button></p>
  <p className="auth-switch"><button type="button" onClick={onBack}>العودة للصفحة الرئيسية</button></p>
  </form></div>;
}
