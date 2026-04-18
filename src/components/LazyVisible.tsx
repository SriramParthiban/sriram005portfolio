import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  /** Min height reserved before mount to prevent layout shift */
  minHeight?: number | string;
  /** Root margin for IntersectionObserver — start loading just before visible */
  rootMargin?: string;
  fallback?: ReactNode;
}

/**
 * Defers mounting (and therefore code-splitting download) of its children
 * until the placeholder scrolls near the viewport. Pair with React.lazy()
 * children so each section's JS only downloads when needed.
 */
const LazyVisible = ({
  children,
  minHeight = 400,
  rootMargin = "400px 0px",
  fallback = null,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const node = ref.current;
    if (!node) return;

    // Fallback for older browsers
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} style={!show ? { minHeight } : undefined}>
      {show ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </div>
  );
};

export default LazyVisible;
