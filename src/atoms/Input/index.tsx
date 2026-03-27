import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldDescription, FieldError } from "@/components/ui/field";

// ── Types ─────────────────────────────────────────────────────────────────────
type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "file";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "type" | "id"> {
  /** Field id — links label → input via htmlFor */
  id: string;
  /** Input type — defaults to "text". Use "file" for file picker. */
  type?: InputType;
  /** Label text displayed above the input */
  label?: string;
  /** Helper text shown below the input */
  description?: string;
  /** Shows a tooltip icon (ℹ) next to the label */
  tooltip?: string;
  /** Validation error message(s) */
  error?: string | string[];
  /** Appends a pink * to the label */
  required?: boolean;
  /** Extra class on the outer wrapper div */
  wrapperClassName?: string;
  /** For type="file" — accepted MIME types / extensions */
  accept?: string;
  /** For type="file" — allow multiple files */
  multiple?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      label,
      description,
      tooltip,
      error,
      required,
      wrapperClassName,
      accept,
      multiple,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isFile = type === "file";

    const errors = error
      ? (Array.isArray(error) ? error : [error]).map((msg) => ({
          message: msg,
        }))
      : undefined;

    const hasError = !!errors?.length;

    return (
      <div className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}>

        {/* ── Label row ──────────────────────────────────────────────────── */}
        {label && (
          <div className="flex items-center gap-1.5">
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium leading-none text-foreground select-none",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
              {required && (
                <span className="ml-0.5 text-primary" aria-hidden="true">
                  *
                </span>
              )}
            </label>

            {/* Tooltip icon */}
            {tooltip && (
              <div className="group relative flex items-center">
                <button
                  type="button"
                  aria-label={tooltip}
                  tabIndex={-1}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="8" />
                    <line x1="12" x2="12" y1="11" y2="17" />
                  </svg>
                </button>
                {/* Tooltip bubble */}
                <div
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-max max-w-xs -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md ring-1 ring-border group-hover:block"
                >
                  {tooltip}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Input ──────────────────────────────────────────────────────── */}
        {isFile ? (
          <label
            htmlFor={id}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-muted-foreground shadow-xs transition-colors",
              "hover:border-primary/60",
              "focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20",
              hasError && "border-destructive focus-within:ring-destructive/20",
              disabled && "pointer-events-none cursor-not-allowed opacity-50",
              className
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span>Click to upload</span>
            <input
              ref={ref}
              id={id}
              type="file"
              accept={accept}
              multiple={multiple}
              required={required}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              className="sr-only"
              {...props}
            />
          </label>
        ) : (
          <input
            ref={ref}
            id={id}
            type={type}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={cn(
              "h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors",
              "placeholder:text-muted-foreground",
              "hover:border-primary/60",
              "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20",
              hasError &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
              className
            )}
            {...props}
          />
        )}

        {/* ── Description (hidden when error present) ─────────────────────── */}
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}

        {/* ── Error ───────────────────────────────────────────────────────── */}
        {hasError && <FieldError errors={errors} />}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
