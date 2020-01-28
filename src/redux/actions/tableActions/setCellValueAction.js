import { SET_CELL_VALUE } from '../../constants';

const setCellValueAction = ({ ...cellData }) => dispatch => {
  dispatch({
    type: SET_CELL_VALUE,
    payload: cellData
  });
}

export default setCellValueAction;