import * as React from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface IconProps {
  /**
   * SVG file name (without .svg extension) from src/assets/icons/.
   * e.g. name="react" loads src/assets/icons/react.svg
   */
  name: string;
  /** Width and height in pixels — defaults to 24 */
  size?: number;
  /** Explicit width override */
  width?: number;
  /** Explicit height override */
  height?: number;
  /** Tailwind / CSS class applied to the <svg> element */
  className?: string;
  /** Accessible label; sets aria-label. Omit for decorative icons. */
  label?: string;
  /** color applied via CSS color (affects currentColor strokes/fills) */
  color?: string;
}

// Vite glob import — eagerly loads all SVG files from assets/icons as raw strings
const svgModules = import.meta.glob<{ default: string }>(
  "/src/assets/icons/*.svg",
  { query: "?raw", eager: true }
);

// ── Component ─────────────────────────────────────────────────────────────────
const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      name,
      size = 24,
      width,
      height,
      className,
      label,
      color,
      ...props
    },
    ref
  ) => {
    const key = `/src/assets/icons/${name}.svg`;
    const mod = svgModules[key];

    if (!mod) {
      // Warn in development if icon is not found
      if (import.meta.env.DEV) {
        console.warn(
          `[Icon] "${name}.svg" not found in src/assets/icons/. ` +
            `Available icons: ${Object.keys(svgModules)
              .map((k) => k.replace("/src/assets/icons/", "").replace(".svg", ""))
              .join(", ")}`
        );
      }
      // Render an empty placeholder with the correct dimensions
      return (
        <span
          ref={ref}
          role="img"
          aria-label={label ?? name}
          style={{
            display: "inline-block",
            width: width ?? size,
            height: height ?? size,
            color,
          }}
          className={cn("inline-flex shrink-0 items-center justify-center", className)}
          {...props}
        />
      );
    }

    const rawSvg: string = mod.default;

    // Inject width/height/aria attributes directly into the SVG string
    const resolvedWidth = width ?? size;
    const resolvedHeight = height ?? size;

    // Strip the outermost <svg ...> opening tag and rewrite its attributes
    const injected = rawSvg.replace(
      /^<svg([^>]*)>/i,
      (_, attrs: string) => {
        // Remove existing width, height, class attributes so we control them
        const cleaned = attrs
          .replace(/\s*width="[^"]*"/gi, "")
          .replace(/\s*height="[^"]*"/gi, "")
          .replace(/\s*class="[^"]*"/gi, "");

        const ariaAttrs = label
          ? `aria-label="${label}" role="img"`
          : `aria-hidden="true" role="presentation"`;

        return `<svg${cleaned} width="${resolvedWidth}" height="${resolvedHeight}" ${ariaAttrs}>`;
      }
    );

    return (
      <span
        ref={ref}
        style={{ display: "inline-flex", color, flexShrink: 0 }}
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        dangerouslySetInnerHTML={{ __html: injected }}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon };
