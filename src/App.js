import { Suspense, useRef } from 'react';
import clsx from 'clsx';

import useLazyLoad from 'hooks/use-lazy-load';

import { updateImageData } from 'context/actions';
import { useGallery, useGalleryDispatch } from 'context/gallery-provider';

import ErrorBoundary from 'components/error-boundary';
import GalleryList, { GalleryListPlaceHolder } from 'components/gallery-list';

import './styles.scss';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

const App = () => {
  const triggerRef = useRef(null);
  const { currentPage, loading, hasMore } = useGallery();
  const dispatch = useGalleryDispatch();
  useLazyLoad({ triggerRef, fetchData: () => updateImageData(dispatch, currentPage), options });

  return (
    <div>
      <h1 className="text-center title">Responsive Gallery</h1>
      <div className="container">
        <ErrorBoundary>
          <Suspense fallback={GalleryListPlaceHolder}>
            <GalleryList />
          </Suspense>
        </ErrorBoundary>

        <div
          ref={triggerRef}
          className={clsx({
            toggleListPlaceHolder: !loading && !hasMore
          })}
        >
          <GalleryListPlaceHolder />
        </div>
      </div>
    </div>
  );
};

export default App;
