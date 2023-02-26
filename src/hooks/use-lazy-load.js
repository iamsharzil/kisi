import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

const LOAD_DELAY_MS = 500;

const useLazyLoad = ({ triggerRef, fetchData, options }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  // CAN HAVE A SEPARATE USE STATE IN REAL API
  const { hasMore = true } = data;

  // eslint-disable-next-line no-underscore-dangle
  const _handleIntersect = async (entry) => {
    const { intersectionRatio, isIntersecting } = entry;

    if (!loading && isIntersecting && intersectionRatio > 0 && hasMore) {
      setLoading(true);
      try {
        const receivedData = await fetchData();
        setLoading(false);
        setData(receivedData);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // DELAY THE CALLBACK BY 5 SECONDS
  const handleIntersect = debounce(_handleIntersect, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries) => {
      handleIntersect(entries[0]);
    },
    [handleIntersect]
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);
      if (container) {
        observer.observe(container);
      }

      return () => {
        if (container) {
          observer.unobserve(container);
        }
      };
    }
  }, [onIntersect, options, triggerRef]);

  // NOT REQUIRED IN OUR CURRENT APPLICATION AS WE HAVE CONTEXT SET FOR THE REQUIRED DATA
  return {
    data,
    loading
  };
};

export default useLazyLoad;
