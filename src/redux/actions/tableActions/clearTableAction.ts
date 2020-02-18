import { Dispatch } from 'redux';
import { TableEnum } from '../../enums';
import { MyThunkResultType } from '../../types';


const clearTableAction = (): MyThunkResultType<void> => (dispatch: Dispatch) => {
    dispatch({
        type: TableEnum.CLEAR_ALL_CELLS
    });
}

export default clearTableAction;