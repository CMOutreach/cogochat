import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        variant === "brand" && "bg-brand-500/15 text-brand-400 border border-brand-500/20",
        variant === "neutral" && "bg-white/10 text-white/60 border border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}
