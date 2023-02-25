import { useEffect, useState } from 'react';
import photos from '../config/images/photos';
import {
  FETCH_COUNT,
  FETCH_COUNT_MOBILE,
  IMAGES_START_INDEX,
  INITIAL_FETCH_COUNT,
  INITIAL_FETCH_COUNT_MOBILE
} from '../constants/image';
import useDevice from './useDevice';

export default function usePagination({ imageIndex, index }) {
  const [images, setImages] = useState([]);
  const [more, setMore] = useState(true);
  // CAN ADD DIFFERENT SUPPORT IN useDevice HOOK
  const { isMobile } = useDevice();
  const [maxFetchCount, setMaxFetchCount] = useState();

  // NOTE: NOT AN IDEAL WAY OF WRITING THE BELOW LOGIC IN THE PRODUCTION APPLICATION
  // AS WE WILL HAVE AN API WITH PAGE COUNT / LIMIT FILTER
  useEffect(() => {
    // CHECK IF DEVICE IS BEING SET OR NOT
    if (typeof isMobile !== 'undefined') {
      // IF YES, CHECK INITIAL IMAGE FETCH COUNT BASED ON DEVICE
      if (imageIndex === IMAGES_START_INDEX) {
        if (isMobile) setMaxFetchCount(INITIAL_FETCH_COUNT_MOBILE);
        else setMaxFetchCount(INITIAL_FETCH_COUNT);
      } else if (isMobile) {
        // IF IMAGE INDEX IS GREATER THAN 0, FETCH FEW IMAGES
        setMaxFetchCount(FETCH_COUNT_MOBILE);
      } else {
        // IF IMAGE INDEX IS GREATER THAN 0, FETCH FEW IMAGES
        setMaxFetchCount(FETCH_COUNT);
      }
    }
  }, [imageIndex, isMobile]);

  useEffect(() => {
    setImages((prev) => [...new Set([...prev, ...photos.slice(index, index + maxFetchCount)])]);
    setMore(Boolean(maxFetchCount + index < photos.length));
  }, [index, isMobile, maxFetchCount]);

  return { images, more };
}
