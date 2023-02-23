import { useContext, useReducer } from 'react';
import { GalleryContext, GalleryDispatchContext } from './GalleryContext';

import { IMAGES_START_INDEX } from '../constants/image';

const initialState = {
  imageIndex: IMAGES_START_INDEX,
  activeImageIndex: null
};

export const galleryTypes = {
  UPDATE_ACTIVE_IMAGE_INDEX: 'active',
  UPDATE_NEXT_IMAGE_FETCH_INDEX: 'updateNextFetchImageIndex'
};

const galleryReducer = (gallery, action) => {
  console.log(action);
  switch (action.type) {
    case galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX: {
      return {
        ...gallery,
        activeImageIndex: action.activeImageIndex
      };
    }

    case galleryTypes.UPDATE_NEXT_IMAGE_FETCH_INDEX: {
      return {
        ...gallery,
        imageIndex: action.imageIndex
      };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  return (
    <GalleryContext.Provider value={state}>
      <GalleryDispatchContext.Provider value={dispatch}>{children}</GalleryDispatchContext.Provider>
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);

export const useGalleryDispatch = () => useContext(GalleryDispatchContext);
