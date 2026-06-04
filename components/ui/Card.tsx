import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6",
        hover && "transition-all duration-300 hover:border-brand-500/40 hover:bg-white/8 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
