// بطاقة إحصائية صغيرة (الوزن، عدد السجلات...)
export default function Stat({ icon: Icon, label, value, sub }) {
  return (
    <div className="stat">
      <div className="stat-top">
        <span>{label}</span>
        <Icon size={19} />
      </div>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  );
}
