const { MAX_PLACEHOLDERS, DEVICE_BREAKPOINTS } = require('constants/image');

const screenWidth = window.innerWidth;

const getGalleryListPlaceHolderCount = () => {
  let placeHolderLength = MAX_PLACEHOLDERS.DESKTOP;

  if (screenWidth <= DEVICE_BREAKPOINTS.MOBILE) {
    placeHolderLength = MAX_PLACEHOLDERS.MOBILE;
  }
  return placeHolderLength;
};

export default getGalleryListPlaceHolderCount;
