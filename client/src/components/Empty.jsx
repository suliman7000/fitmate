import { Activity } from 'lucide-react';

// رسالة تظهر لما ما في بيانات
export default function Empty({ text }) {
  return (
    <div className="empty">
      <Activity size={26} />
      <p>{text}</p>
    </div>
  );
}
