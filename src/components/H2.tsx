interface H2Props {
  children: React.ReactNode;
  kicker?: string;
  className?: string;
}

export default function H2({ children, kicker, className = '' }: H2Props) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {kicker && (
        <span className="inline-block text-xs tracking-widest uppercase text-emerald-700/80 bg-emerald-50 rounded-full px-3 py-1 mb-4">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">{children}</h2>
    </div>
  );
}