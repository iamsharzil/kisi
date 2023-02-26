import fetchData from 'services/get-images';
import galleryTypes from './types';

const updateLoadingState = (dispatch, loading) => {
  dispatch({ type: galleryTypes.UPDATE_LOADING_STATE, payload: { loading } });
};

const updateActiveIndex = (dispatch, activeImageIndex) => {
  dispatch({
    type: galleryTypes.UPDATE_ACTIVE_IMAGE_INDEX,
    payload: {
      activeImageIndex
    }
  });
};

const updateImageData = async (dispatch, currentPage) => {
  updateLoadingState(dispatch, true);
  const data = await fetchData(currentPage);
  dispatch({ type: galleryTypes.UPDATE_DATA, payload: data });
  return data;
};

export { updateActiveIndex, updateLoadingState, updateImageData };
