interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl border border-gray-200/70 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}