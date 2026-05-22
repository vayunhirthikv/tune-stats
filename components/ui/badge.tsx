import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Base: zero-radius, uppercase monospace — all variants
  "inline-flex items-center border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default:   "border-[#111111] bg-[#111111] text-[#F9F9F7]",
        secondary: "border-[#111111] bg-transparent text-[#111111]",
        accent:    "border-[#CC0000] bg-[#CC0000] text-white",
        outline:   "border-[#111111] bg-transparent text-[#111111]",
        plus:      "border-[#CC0000] bg-transparent text-[#CC0000]",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
