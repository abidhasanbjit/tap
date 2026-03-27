import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Button as ShadcnButton,
  buttonVariants,
} from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (Radix Slot pattern) */
  asChild?: boolean;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Icon placed before the label */
  leftIcon?: React.ReactNode;
  /** Icon placed after the label */
  rightIcon?: React.ReactNode;
  /** Stretch to fill parent width */
  fullWidth?: boolean;
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="animate-spin shrink-0"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        asChild={asChild}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(fullWidth && "w-full", className)}
        {...props}
      >
        {/* Left: spinner when loading, otherwise leftIcon */}
        {loading ? <Spinner /> : leftIcon}

        {/* Label */}
        {children}

        {/* Right icon — hidden while loading */}
        {!loading && rightIcon}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
