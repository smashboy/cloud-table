import { TableEnum } from '../../enums';
import { SetCellDataActionType } from '../../types';

const setCellDataAction: SetCellDataActionType = (cellValue) => (dispatch) => {
  dispatch({
    type: TableEnum.SET_CELL_DATA,
    payload: cellValue
  });
}

export default setCellDataAction;