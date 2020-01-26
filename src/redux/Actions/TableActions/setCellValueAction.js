import { SET_CELL_VALUE } from '../../types/tableTypes';

const setCellValueAction = ({ ...cellData }) => dispatch => {
  dispatch({
    type: SET_CELL_VALUE,
    payload: cellData
  });
}

export default setCellValueAction;