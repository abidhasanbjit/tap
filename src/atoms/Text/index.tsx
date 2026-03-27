import * as React from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-sm"
  | "label"
  | "caption"
  | "overline"
  | "code";

type TextAlign = "left" | "center" | "right";
type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";
type TextColor =
  | "default"
  | "muted"
  | "primary"
  | "destructive"
  | "success"
  | "warning";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual & semantic variant — determines tag and base styles */
  variant?: TextVariant;
  /** Text alignment */
  align?: TextAlign;
  /** Font weight override */
  weight?: TextWeight;
  /** Colour preset */
  color?: TextColor;
  /** Truncate to a single line with ellipsis */
  truncate?: boolean;
  /** Clamp to N lines with ellipsis */
  clamp?: 1 | 2 | 3 | 4 | 5;
  /** Override the rendered HTML element */
  as?: React.ElementType;
}

// ── Style maps ────────────────────────────────────────────────────────────────
const variantStyles: Record<TextVariant, string> = {
  h1: "text-4xl font-bold tracking-tight leading-tight",
  h2: "text-3xl font-semibold tracking-tight leading-tight",
  h3: "text-2xl font-semibold leading-snug",
  h4: "text-xl font-semibold leading-snug",
  h5: "text-lg font-medium leading-snug",
  h6: "text-base font-medium leading-snug",
  body: "text-sm leading-relaxed",
  "body-sm": "text-xs leading-relaxed",
  label: "text-sm font-medium leading-none",
  caption: "text-xs leading-normal",
  overline: "text-xs font-semibold uppercase tracking-widest",
  code: "font-mono text-sm rounded bg-muted px-1.5 py-0.5",
};

const variantTag: Record<TextVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
  overline: "span",
  code: "code",
};

const weightStyles: Record<TextWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignStyles: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  destructive: "text-destructive",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
};

const clampStyles: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
};

// ── Component ─────────────────────────────────────────────────────────────────
const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "body",
      align,
      weight,
      color = "default",
      truncate,
      clamp,
      as,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = as ?? variantTag[variant];

    return (
      <Tag
        ref={ref}
        className={cn(
          variantStyles[variant],
          colorStyles[color],
          align && alignStyles[align],
          weight && weightStyles[weight],
          truncate && "truncate",
          clamp && clampStyles[clamp],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";

export { Text };
