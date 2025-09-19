import { RefObject, useEffect, useRef, useState } from "react";

const useInfiniteScroll = ({
  target,
  handleObserver,
  size,
}: {
  target: RefObject<HTMLDivElement | null>;
  handleObserver: () => Promise<void>;
  size: number;
}): {
  loading: boolean;
} => {
  const observerRef = useRef<IntersectionObserver>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading || !target.current) {
      return;
    }

    observerRef.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        await handleObserver();
        setLoading(false);
      }
    });
    observerRef.current.observe(target.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [target, size]);

  return {
    loading,
  };
};

export default useInfiniteScroll;
