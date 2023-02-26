import { DEVICE_BREAKPOINTS, GALLERY_CARD_BLOCKS } from 'constants/image';

const screenWidth = window.innerWidth;

const getEmptyCardBlocks = (numImages) => {
  let emptyBlocks;

  if (screenWidth >= DEVICE_BREAKPOINTS.TABLET) {
    emptyBlocks = GALLERY_CARD_BLOCKS.DESKTOP - (numImages % GALLERY_CARD_BLOCKS.DESKTOP);
  } else if (screenWidth >= DEVICE_BREAKPOINTS.MOBILE) {
    emptyBlocks = GALLERY_CARD_BLOCKS.TABLET - (numImages % GALLERY_CARD_BLOCKS.TABLET);
  } else {
    emptyBlocks = GALLERY_CARD_BLOCKS.MOBILE - (numImages % GALLERY_CARD_BLOCKS.MOBILE);
  }

  return emptyBlocks;
};

export default getEmptyCardBlocks;
