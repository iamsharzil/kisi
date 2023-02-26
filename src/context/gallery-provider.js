import { useContext, useReducer } from 'react';

import { GalleryContext, GalleryDispatchContext } from './gallery-context';

import galleryTypes from './types';

const initialState = {
  loading: false,
  currentPage: 1,
  activeImageIndex: -1,
  data: [],
  total: 0,
  pages: 0,
  hasMore: true
};

const galleryReducer = (state, action) => {
  switch (action.type) {
    case galleryTypes.UPDATE_LOADING_STATE: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }

    case galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX: {
      return {
        ...state,
        activeImageIndex: action.payload.activeImageIndex
      };
    }

    case galleryTypes.UPDATE_DATA: {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        total: action.payload.total,
        pages: action.payload.pages,
        hasMore: action.payload.hasMore,
        currentPage: state.currentPage + 1
      };
    }

    default: {
      throw Error(`Unknown action: ${action.type}`);
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
