import { cn } from "@/lib/utils";

export function ErrorMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p className={cn("text-xs font-medium text-red-400 mt-1.5 animate-in slide-in-from-top-1 fade-in duration-300", className)} {...props}>
      {children}
    </p>
  );
}