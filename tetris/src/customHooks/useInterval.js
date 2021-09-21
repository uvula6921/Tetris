import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tic() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tic, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
