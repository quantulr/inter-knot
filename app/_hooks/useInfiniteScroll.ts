import { RefObject, useEffect, useRef } from "react";

const useInfiniteScroll = ({
  target,
  handleObserver,
}: {
  target: RefObject<HTMLDivElement | null>;
  handleObserver: () => void;
}) => {
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleObserver();
      }
    });
    if (target.current) {
      observerRef.current.observe(target.current);
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [target, handleObserver]);
};

export default useInfiniteScroll;
