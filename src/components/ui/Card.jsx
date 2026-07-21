export default function Card({ title, children, className = '' }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
