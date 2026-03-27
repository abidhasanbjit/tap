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
  /** Tailwind / CSS class applied to the wrapper span */
  className?: string;
  /** Accessible label; sets aria-label. Omit for decorative icons. */
  label?: string;
  /** Color applied via CSS currentColor — overrides hardcoded SVG fill/stroke */
  color?: string;
  /** Color applied on hover — overrides hardcoded SVG fill/stroke on :hover */
  hoverColor?: string;
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
      hoverColor,
      ...props
    },
    ref
  ) => {
    // Stable unique id per instance for scoped hover CSS
    const uid = React.useId().replace(/:/g, "");
    const spanId = `icon-${uid}`;

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
          id={spanId}
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

    const resolvedWidth = width ?? size;
    const resolvedHeight = height ?? size;

    // Replace hardcoded fill/stroke (except "none"/"transparent") with currentColor
    // so the CSS `color` property controls the icon color.
    const forceCurrentColor = (svg: string) =>
      svg
        .replace(/\sfill="(?!none|transparent)[^"]*"/gi, ' fill="currentColor"')
        .replace(/\sstroke="(?!none|transparent)[^"]*"/gi, ' stroke="currentColor"');

    // Rewrite the opening <svg> tag — strip width/height/class, inject aria attrs
    let injected = rawSvg.replace(
      /^<svg([^>]*)>/i,
      (_, attrs: string) => {
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

    // When color or hoverColor is provided, replace hardcoded fills/strokes
    // with currentColor so the CSS color cascades correctly
    if (color || hoverColor) {
      injected = forceCurrentColor(injected);
    }

    return (
      <>
        {/* Scoped hover style — only injected when hoverColor is provided */}
        {hoverColor && (
          <style>{`#${spanId}:hover { color: ${hoverColor} !important; }`}</style>
        )}
        <span
          ref={ref}
          id={spanId}
          style={{
            display: "inline-flex",
            color,
            flexShrink: 0,
            transition: hoverColor ? "color 0.15s ease" : undefined,
            cursor: hoverColor ? "pointer" : undefined,
          }}
          className={cn("inline-flex shrink-0 items-center justify-center", className)}
          dangerouslySetInnerHTML={{ __html: injected }}
          {...props}
        />
      </>
    );
  }
);

Icon.displayName = "Icon";

export { Icon };
