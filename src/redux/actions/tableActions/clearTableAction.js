import { CLEAR_ALL_CELLS } from '../../constants';

const clearTableAction = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_CELLS
  });
}

export default clearTableAction;