import { useEffect } from 'react';
import BackIcon from '../../svg/back.svg';
import CloseIcon from '../../svg/close.svg';
import { IMAGE_SIZES } from '../../constants/image';
import { galleryTypes, useGallery, useGalleryDispatch } from '../../context/GalleryProvider';
import Modal from '../Modal';
import styles from './index.module.css';

function GalleryModal({ images }) {
  const { activeImageIndex } = useGallery();
  const dispatch = useGalleryDispatch();

  const src = images[activeImageIndex].urls[IMAGE_SIZES.FULL];

  const showPrevButton = activeImageIndex > 0;
  const showNextButton = activeImageIndex < images.length - 1;

  // NOTE: A LOT OF DISPATCH FUNCTIONS LOOKS SIMILAR HERE WHICH CAN HAVE A COMMON FUNCTION TO DISPATCH
  // BUT THAT FUNCTION WOULD BE WRAPPED INSIDE USECALLBACK SINCE IT'S BEEN CALLED ON MOUNT AS WELL

  useEffect(() => {
    const onKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (showPrevButton) {
            dispatch({
              type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
              activeImageIndex: activeImageIndex - 1
            });
          }

          break;

        case 'ArrowRight':
          if (showNextButton) {
            dispatch({
              type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
              activeImageIndex: activeImageIndex + 1
            });
          }
          break;

        case 'Escape':
          dispatch({
            type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
            activeImageIndex: null
          });
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [activeImageIndex, dispatch, showNextButton, showPrevButton]);

  return (
    <Modal
      onClose={() =>
        dispatch({
          type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
          activeImageIndex: null
        })
      }
    >
      <div className={styles.modalContentWrapper}>
        <button
          type="button"
          className={`resetButton ${styles.backButtonWrapper}`}
          onClick={() =>
            dispatch({
              type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
              activeImageIndex: null
            })
          }
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
            className={`resetButton ${styles.galleryControl} ${
              !showPrevButton ? styles.hidden : ''
            }`}
            onClick={() =>
              dispatch({
                type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
                activeImageIndex: activeImageIndex - 1
              })
            }
          >
            <img src={BackIcon} alt="" />
          </button>
          )
          <button
            type="button"
            className={`resetButton ${styles.galleryControl} ${styles.galleryControlNext} ${
              !showNextButton ? styles.hidden : ''
            }`}
            onClick={() =>
              dispatch({
                type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
                activeImageIndex: activeImageIndex - 1
              })
            }
          >
            <img src={BackIcon} alt="" />
          </button>
          )
        </div>
      </div>
    </Modal>
  );
}

export default GalleryModal;
