import { SetEditModeActionType } from '../../types';
import { TableEnum } from '../../enums';
import { CellEditModeEnum } from '../../../../models/Table/Cell';
import setEdiModalLoaderAction from './setEditModalLoaderAction';

const setEditModeAction: SetEditModeActionType = (cellData) => (dispatch) => {

  if (cellData.editMode === CellEditModeEnum.EDIT_MODE_OFF) {
    dispatch(setEdiModalLoaderAction(true)); 
  }

  setTimeout(() => {
    dispatch({
      type: cellData.editMode === CellEditModeEnum.EDIT_MODE_OFF ? TableEnum.SET_EDIT_MODE_ON : TableEnum.SET_EDIT_MODE_OFF,
      payload: { 
        ...cellData, 
        editMode: cellData.editMode === CellEditModeEnum.EDIT_MODE_OFF ? CellEditModeEnum.EDIT_MODE_ON  : CellEditModeEnum.EDIT_MODE_OFF  
      }
    });
  });
}

export default setEditModeAction;