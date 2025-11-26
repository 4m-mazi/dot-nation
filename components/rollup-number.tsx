"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RollupNumberProps = {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function RollupNumber({
  value,
  duration = 2000,
  suffix = "",
  className = "",
}: RollupNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animateValue = useCallback(
    (start: number, end: number, dur: number) => {
      const startTime = performance.now();

      const easeOutQuart = (t: number): number => {
        return 1 - (1 - t) ** 4;
      };

      const updateValue = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(start + (end - start) * easedProgress);

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(0, value, duration);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated, animateValue]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
