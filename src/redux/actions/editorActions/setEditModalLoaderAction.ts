import { LoadingKeysEnum, UiEnum } from '../../enums';
import { SetEditModalLoaderActionType } from '../../types';

const setEditModalLoaderAction: SetEditModalLoaderActionType = (turnOn) => (dispatch, getState) => {
  if (turnOn) {
    dispatch({
      type: UiEnum.SET_LOADING_UI,
      payload: LoadingKeysEnum.CELL_EDIT_MODAL_LOADING
    })
  } else if(!turnOn && getState().ui.loading.includes(LoadingKeysEnum.CELL_EDIT_MODAL_LOADING)) {
    dispatch({
    type: UiEnum.CLEAR_LOADING_UI,
    payload: LoadingKeysEnum.CELL_EDIT_MODAL_LOADING
  });
  }
}

export default setEditModalLoaderAction;