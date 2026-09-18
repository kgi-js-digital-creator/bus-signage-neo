import { useRef, useEffect, useState } from "react";
import type { Body } from "../types/ResponseJson";


const textSpeed = 120; //px per sec
const textGap = 128; // gap-32

export default function BarText({ data }: { data: Body }) {
  const text = data.metadata?.name ?? "時刻表";
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const textEl = textRef.current;
      if (!container || !textEl) return;

      const cWidth = container.clientWidth;
      const tWidth = textEl.scrollWidth;
      const overflow = tWidth > cWidth;

      setIsOverflowing(overflow);

      if (overflow) {
        const totalDistance = tWidth + textGap;
        const calculatedDuration = totalDistance / textSpeed;
        setDuration(calculatedDuration);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    if (document.fonts) {
      document.fonts.ready.then(checkOverflow);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  const marqueeStyle =
    isOverflowing && duration > 0
      ? ({
        animationDuration: `${duration}s`,
        "--marquee-gap": `${textGap}px`,
      } as React.CSSProperties)
      : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden font-normal text-neutral-100 whitespace-nowrap ${isOverflowing ? "mask-marquee" : ""
        }`}
    >
      <div className="flex gap-32 w-max">
        <div
          ref={textRef}
          className={`shrink-0 ${isOverflowing ? "animate-marquee" : ""}`}
          style={marqueeStyle}
        >
          {text}
        </div>
        {isOverflowing && (
          <div
            className="shrink-0 animate-marquee"
            aria-hidden="true"
            style={marqueeStyle}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}