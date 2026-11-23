import React, { useState } from 'react';
import { Dumbbell, User, Mail, Lock } from 'lucide-react';

export default function Register({ onRegister, onSwitch, onBack, error, busy }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = e => { e.preventDefault(); onRegister({ name, email, password }); };
  return <div className="auth-shell"><form className="auth-card" onSubmit={submit}>
    <div className="auth-brand"><span className="brand-icon"><Dumbbell /></span><b>FITMATE</b><small>PERSONAL TRAINING</small></div>
    <span className="eyebrow">START YOUR JOURNEY</span><h1>إنشاء حساب</h1><p className="auth-subtitle">أنشئ حسابك وابدأ بتنظيم تدريباتك</p>
    {error && <div className="alert">{error}</div>}
    <label>الاسم<div className="auth-input"><User size={17}/><input autoComplete="name" required maxLength={60} value={name} onChange={e=>setName(e.target.value)} placeholder="اسمك"/></div></label>
    <label>البريد الإلكتروني<div className="auth-input"><Mail size={17}/><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com"/></div></label>
    <label>كلمة المرور <small>(8 أحرف على الأقل)</small><div className="auth-input"><Lock size={17}/><input type="password" autoComplete="new-password" minLength={8} maxLength={72} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="أنشئ كلمة مرور قوية"/></div></label>
    <button className="primary full auth-submit" disabled={busy}>{busy?'جاري إنشاء الحساب…':'إنشاء حساب'}</button>
    <p className="auth-switch">عندك حساب بالفعل؟ <button type="button" onClick={onSwitch}>تسجيل الدخول</button></p>
  <p className="auth-switch"><button type="button" onClick={onBack}>العودة للصفحة الرئيسية</button></p>
  </form></div>;
}
