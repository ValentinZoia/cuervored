import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-hidden capitalize inline-flex items-center   whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        redToBlue:
          "group relative bg-redSanlorenzo overflow-hidden",
        blueToRed:
          "group relative bg-blueSanlorenzo overflow-hidden",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "redToBlue",
      size: "default",
    },
  }
);

export interface CaslaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CaslaButton = React.forwardRef<HTMLButtonElement, CaslaButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            "ease absolute top-1/2 h-0 w-64 origin-center -translate-x-70 rotate-45 transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32",
            variant === "redToBlue" ? "bg-blueSanlorenzo" : "bg-redSanlorenzo"
          )}
        ></span>
        <span className="ease relative text-white  transition duration-300 group-hover:text-white">
          <div className="flex justify-center items-center">
            {props.children}
          </div>
          
        </span>
      </Comp>
    );
  }
);
CaslaButton.displayName = "CaslaButton";

export { CaslaButton, buttonVariants };
