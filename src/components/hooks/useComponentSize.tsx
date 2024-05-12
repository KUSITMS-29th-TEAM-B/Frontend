import { useState, useEffect, useRef } from "react";

interface ComponentSize {
  width: number;
  height: number;
}

function useComponentSize(): [React.RefObject<HTMLDivElement>, ComponentSize] {
  const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = componentRef.current;
    if (element) {
      const handleResize = (entries: ResizeObserverEntry[]) => {
        if (!entries || entries.length === 0) {
          return;
        }
        const entry = entries[0];
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(element);

      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [componentRef.current]);

  return [componentRef, size];
}

export default useComponentSize;
