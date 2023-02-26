import { useRef } from 'react';
import clsx from 'clsx';

import { useGallery, useGalleryDispatch } from 'context/gallery-provider';
import { updateActiveIndex } from 'context/actions';

import GalleryModal from 'components/gallery-modal';

import { IMAGE_SIZES } from 'constants/image';

import getEmptyCardBlocks from 'utils/get-empty-card-blocks';

import getGalleryListPlaceHolderCount from 'utils/get-gallery-list-placeholder';
import GalleryCard, { GalleryCardPlaceHolder } from '../gallery-card';

import styles from './index.module.scss';

export const GalleryListPlaceHolder = () => {
  const placeHolderLength = getGalleryListPlaceHolderCount();

  return (
    <div className={styles.galleryRow}>
      {Array.from({ length: placeHolderLength }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <GalleryCardPlaceHolder key={i} />
      ))}
    </div>
  );
};

const GalleryList = () => {
  const { data: images, hasMore, activeImageIndex, loading } = useGallery();
  const dispatch = useGalleryDispatch();
  const cardRef = useRef();

  const isImageSelected = activeImageIndex >= 0;

  const getMap = () => {
    if (!cardRef.current) {
      cardRef.current = new Map();
    }
    return cardRef.current;
  };

  const numImages = images.length;
  const emptyBlocks = getEmptyCardBlocks(numImages);

  // add remaining items as placeholders if there are more items
  const placeholders = hasMore || loading ? Array(emptyBlocks).fill(null) : [];

  const updatedImages = [...images, ...placeholders];

  return (
    <div className={clsx(styles.galleryRow)}>
      {updatedImages.map((image, index) => {
        if (image) {
          const alt = `Taken by ${image.user.name}`;
          const regularSrc = image.urls[IMAGE_SIZES.REGULAR];
          const mediumSrc = image.urls[IMAGE_SIZES.MEDIUM];
          const smallSrc = image.urls[IMAGE_SIZES.SMALL];
          const src = image.urls[IMAGE_SIZES.THUMB];

          const onClick = () => {
            const map = getMap();
            const node = map.get(index);

            // SCROLL TO THE CLICKED ELEMENT
            node.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });

            // A SLIGHT DELAY TO LET USER SCROLL TO THE CLICKED POSITION THEN SHOW MODAL
            setTimeout(() => {
              updateActiveIndex(dispatch, index);
            }, 100);
          };

          const onRefUpdate = (node) => {
            // USE REF FROM THE CURERNT COMPONENT TO SHOW THE CLICKED ELEMENT INSIDE THE VIEWPORT
            const map = getMap();
            if (node) {
              map.set(index, node);
            } else {
              map.delete(index);
            }
          };

          return (
            <GalleryCard
              ref={onRefUpdate}
              id={image.id}
              key={image.id}
              regularSrc={regularSrc}
              smallSrc={smallSrc}
              mediumSrc={mediumSrc}
              src={src}
              alt={alt}
              onClick={onClick}
            />
          );
        }

        // eslint-disable-next-line react/no-array-index-key
        return <GalleryCardPlaceHolder key={`p-${index}`} />;
      })}

      {isImageSelected && <GalleryModal images={images} />}
    </div>
  );
};

export default GalleryList;
