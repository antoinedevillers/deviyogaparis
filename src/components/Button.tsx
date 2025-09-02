import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm md:text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-emerald-300 text-gray-900 hover:bg-emerald-200 focus:ring-emerald-400 cursor-pointer'
      : 'border border-emerald-200 text-emerald-900 bg-white hover:bg-emerald-50 focus:ring-emerald-300 cursor-pointer';
  
  // Si onClick est fourni, utiliser un bouton
  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
        type="button"
      > 
        {children}
      </button>
    );
  }
  
  // Pour liens externes, utiliser <a>
  if (external || (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')))) {
    return (
      <a 
        href={href || '#'} 
        className={`${base} ${styles} ${className}`}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      > 
        {children}
      </a>
    );
  }
  
  // Pour liens internes, utiliser Link de Next.js
  return (
    <Link href={href || '/'} className={`${base} ${styles} ${className}`}> 
      {children}
    </Link>
  );
}