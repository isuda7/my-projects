import { useEffect, useRef } from "react";

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef<() => void>();

  // callback을 저장
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // interval 설정
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
