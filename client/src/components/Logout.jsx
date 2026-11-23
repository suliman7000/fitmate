import React from 'react';
import { LogOut } from 'lucide-react';

export default function Logout({ onLogout }) {
  return <button className="nav" onClick={onLogout}><LogOut size={18}/>تسجيل الخروج</button>;
}
