import * as React from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

// ── Inlined field helpers ─────────────────────────────────────────────────────
function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];
    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message;
    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "id"> {
  /** Field id — links label → textarea via htmlFor */
  id: string;
  /** Label text displayed above the textarea */
  label?: string;
  /** Helper text shown below the textarea */
  description?: string;
  /** Shows a tooltip icon (ℹ) next to the label */
  tooltip?: string;
  /** Validation error message(s) */
  error?: string | string[];
  /** Appends a pink * to the label */
  required?: boolean;
  /** Extra class on the outer wrapper div */
  wrapperClassName?: string;
  /** Number of visible text rows — defaults to 4 */
  rows?: number;
  /** Show a character counter — pass maxLength to enable */
  maxLength?: number;
  /** Allow manual resize: "none" | "vertical" | "horizontal" | "both" — defaults to "vertical" */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

// ── Component ─────────────────────────────────────────────────────────────────
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      description,
      tooltip,
      error,
      required,
      wrapperClassName,
      rows = 4,
      maxLength,
      resize = "vertical",
      className,
      disabled,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState<number>(() => {
      const initial = value ?? defaultValue ?? "";
      return String(initial).length;
    });

    const errors = error
      ? (Array.isArray(error) ? error : [error]).map((msg) => ({
          message: msg,
        }))
      : undefined;

    const hasError = !!errors?.length;
    const isNearLimit = maxLength ? charCount >= maxLength * 0.9 : false;
    const isAtLimit = maxLength ? charCount >= maxLength : false;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const resizeClass = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    }[resize];

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

            {/* Character counter — right-aligned */}
            {maxLength && (
              <span
                className={cn(
                  "ml-auto text-xs tabular-nums text-muted-foreground",
                  isNearLimit && "text-yellow-500",
                  isAtLimit && "text-destructive font-medium"
                )}
                aria-live="polite"
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* ── Textarea ───────────────────────────────────────────────────── */}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors",
            "placeholder:text-muted-foreground",
            resizeClass,
            "hover:border-primary/60",
            "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20",
            hasError &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
            className
          )}
          {...props}
        />

        {/* ── Description (hidden when error is shown) ────────────────────── */}
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}

        {/* ── Error ───────────────────────────────────────────────────────── */}
        {hasError && <FieldError errors={errors} />}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
