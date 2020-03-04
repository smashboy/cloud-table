import { ClearTableActionType } from '../../types';
import { TableEnum } from '../../enums';

const clearTableAction: ClearTableActionType = () => (dispatch) => {
    dispatch({
        type: TableEnum.CLEAR_ALL_CELLS
    });
}

export default clearTableAction;