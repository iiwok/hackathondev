import Link from "next/link";

interface NavProps {
  variant?: 'light' | 'dark';
}

export default function Nav({ variant = 'light' }: NavProps) {
  const textColor = variant === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const hoverEffect = variant === 'dark' 
    ? 'hover:text-white hover:underline hover:opacity-100' 
    : 'hover:underline';
  
  return (
    <nav className={`flex justify-center gap-6 md:gap-12 text-base md:text-lg ${textColor} opacity-80 my-2`}>
      <Link href="/events" className={hoverEffect}>
        Event
      </Link>
      <Link href="/" className={hoverEffect}>
        Projects
      </Link>
      <Link href="/about" className={hoverEffect}>
        About
      </Link>
    </nav>
  );
} 