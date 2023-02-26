import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './index.module.scss';

export const GalleryCardPlaceHolder = () => (
  <div className={clsx(styles.galleryColumn)}>
    <button type="button" className={clsx(styles.resetButton, styles.imgButton)}>
      <div className={clsx(styles.shine, styles.box)} />
    </button>
  </div>
);

const GalleryCard = forwardRef(
  ({ id, regularSrc, smallSrc, mediumSrc, src, alt, onClick }, ref) => (
    <div id={id} ref={ref} className={clsx(styles.galleryColumn)}>
      <button
        type="button"
        className={clsx(styles.resetButton, styles.imgButton)}
        onClick={onClick}
      >
        <img
          className="img-fluid"
          src={src}
          srcSet={`${smallSrc} 200w, ${mediumSrc} 800w, ${regularSrc} 1080w`}
          alt={alt}
        />
      </button>
    </div>
  )
);

export default GalleryCard;
