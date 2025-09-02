interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: string;
}

export default function Section({
  id,
  children,
  className = '',
  bg = 'bg-white',
}: SectionProps) {
  return (
    <section id={id} className={`${bg} py-16 md:py-24`}> 
      <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>
    </section>
  );
}