import { useCallback, useRef } from "react";
import "./styles.css";
import usePagination from "./hooks/usePagination";

import {
  galleryTypes,
  useGallery,
  useGalleryDispatch,
} from "./context/GalleryProvider";
import GalleryModal from "./components/GalleryModal";
import {
  FETCH_COUNT,
  IMAGE_SIZES,
  INITIAL_FETCH_COUNT,
} from "./constants/image";

function App() {
  const { imageIndex, activeImageIndex } = useGallery();
  const dispatch = useGalleryDispatch();

  const { images, more } = usePagination({ index: imageIndex });

  const observer = useRef();

  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();

      if (!more) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) {
          dispatch({
            type: galleryTypes.UPDATE_NEXT_IMAGE_FETCH_INDEX,
            imageIndex:
              // FETCH FEW IMAGES ON SCROLL
              imageIndex === 0
                ? imageIndex + INITIAL_FETCH_COUNT
                : imageIndex + FETCH_COUNT,
          });
        }
      });

      if (element) observer.current.observe(element);
    },
    [dispatch, imageIndex, more]
  );

  const activeImage = images[activeImageIndex];
  const isImageSelected =
    images.length > 0 && activeImageIndex >= 0 && activeImage;

  return (
    <div>
      <h1 className='text-center'>
        Photos courtesy of Unsplash and it&apos;s users
      </h1>

      <div className='container'>
        <div className='galleryRow'>
          {images.map((p, index) => (
            <div
              ref={index === images.length - 1 ? lastElementRef : undefined}
              className='galleryColumn'
              key={p.id}
            >
              <button
                type='button'
                className='resetButton imgButton'
                onClick={() =>
                  dispatch({
                    type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
                    activeImageIndex: index,
                  })
                }
              >
                <img
                  className='img-fluid'
                  src={p.urls[IMAGE_SIZES.THUMB]}
                  alt={`Taken by ${p.user.name}`}
                />
              </button>
            </div>
          ))}
        </div>

        {isImageSelected && <GalleryModal images={images} />}
      </div>
    </div>
  );
}

export default App;
