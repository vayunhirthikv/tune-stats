import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: sharp corners, uppercase monospace, accessible touch targets
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold text-xs uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F7] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        // Primary: black fill → inverts to white on hover (core newsprint)
        default:
          "bg-[#111111] text-[#F9F9F7] border border-[#111111] hover:bg-[#F9F9F7] hover:text-[#111111]",
        // Secondary / outline: transparent → fills on hover
        secondary:
          "border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7]",
        outline:
          "border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7]",
        // Ghost: no border, subtle fill
        ghost:
          "text-[#111111] hover:bg-[#F5F5F5]",
        // Accent: editorial red
        accent:
          "bg-[#CC0000] text-white border border-[#CC0000] hover:bg-[#F9F9F7] hover:text-[#CC0000]",
        // Spotify: keep brand green
        spotify:
          "bg-[#1DB954] text-black border border-[#1DB954] hover:bg-[#111111] hover:text-[#1DB954] hover:border-[#1DB954]",
      },
      size: {
        default: "h-11 px-6 min-h-[44px]",
        sm:      "h-9  px-4 text-[10px] min-h-[44px]",
        lg:      "h-12 px-8 text-sm    min-h-[44px]",
        icon:    "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
