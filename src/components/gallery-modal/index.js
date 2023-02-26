import { useEffect } from 'react';
import clsx from 'clsx';

import { updateActiveIndex } from 'context/actions';
import { useGallery, useGalleryDispatch } from 'context/gallery-provider';

import { IMAGE_SIZES } from 'constants/image';

import BackIcon from 'svg/back.svg';
import CloseIcon from 'svg/close.svg';

import KEY_PRESS_KEYS from 'constants/key-events';
import styles from './index.module.scss';

import Modal from '../modal';

const GalleryModal = () => {
  const { data: images, activeImageIndex } = useGallery();
  const dispatch = useGalleryDispatch();

  // WE CAN ADD A SAFE CHECK OVER HERE
  const src = images[activeImageIndex].urls[IMAGE_SIZES.FULL];
  const showPrevButton = activeImageIndex > 0;
  const showNextButton = activeImageIndex < images.length - 1;

  useEffect(() => {
    if (!images.length) return null;

    const onKeyPress = (e) => {
      switch (e.key) {
        case KEY_PRESS_KEYS.ARROW_LEFT:
          if (showPrevButton) updateActiveIndex(dispatch, activeImageIndex - 1);
          break;

        case KEY_PRESS_KEYS.ARROW_RIGHT:
          if (showNextButton) updateActiveIndex(dispatch, activeImageIndex + 1);
          break;

        case KEY_PRESS_KEYS.ESCAPE:
          updateActiveIndex(dispatch, -1);
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [activeImageIndex, dispatch, images.length, showNextButton, showPrevButton]);

  if (!images.length) return null;

  return (
    <Modal onClose={() => updateActiveIndex(dispatch, -1)}>
      <div className={styles.modalContentWrapper}>
        <button
          type="button"
          className={`${styles.resetButton} ${styles.backButtonWrapper}`}
          onClick={() => updateActiveIndex(dispatch, -1)}
        >
          <img src={CloseIcon} alt="Back Icon" />
        </button>

        <div className={`d-flex justify-content-center ${styles.imgWrapper}`}>
          <img
            className="img-fluid"
            src={src}
            alt={`Taken by ${images[activeImageIndex].user.name}`}
          />
        </div>

        <div className="d-flex align-items-center justify-content-center">
          <button
            type="button"
            className={`${styles.resetButton} ${styles.galleryControl} ${
              !showPrevButton ? styles.hidden : ''
            }`}
            onClick={() => updateActiveIndex(dispatch, activeImageIndex - 1)}
          >
            <img src={BackIcon} alt="" />
          </button>
          )
          <button
            type="button"
            className={clsx(
              `${styles.resetButton} ${styles.galleryControl} ${styles.galleryControlNext}`,
              {
                [styles.hidden]: !showNextButton
              }
            )}
            onClick={() => updateActiveIndex(dispatch, activeImageIndex + 1)}
          >
            <img src={BackIcon} alt="" />
          </button>
          )
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;
