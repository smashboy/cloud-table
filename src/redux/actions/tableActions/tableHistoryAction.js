import {
 UNDO_TABLE,
 REDO_TABLE
} from '../../constants';

const tableHistoryAction = undo => dispatch => {
  undo ? dispatch({ type: UNDO_TABLE }) : dispatch({ type: REDO_TABLE });
}

export default tableHistoryAction;