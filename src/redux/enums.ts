export enum TableEnum {

  SET_GENERATED_TABLE = 'SET_GENERATED_TABLE',

  SET_CELL_VALUE = 'SET_CELL_VALUE',
  CLEAR_ALL_CELLS = 'CLEAR_ALL_CELLS',

  ADD_ROW = 'ADD_ROW',
  ADD_COL = 'ADD_COL',

  DELETE_ROW = 'DELETE_ROW',
  DELETE_COL = 'DELETE_COL',

  UNDO_TABLE = 'UNDO_TABLE',
  REDO_TABLE = 'REDO_TABLE'

}

export enum UiEnum {

  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',

  SET_LOADING_UI = 'SET_LOADING_UI',
  CLEAR_LOADING_UI = 'CLEAR_LOADING_UI'

}

// Keys have almost the same purpose as actions types,
// but in this case keys used to retrieve specific data from state

export enum ErrorKeysEnum {

  GENERATE_TABLE_COLS_MAX_ERROR = 'GENERATE_TABLE_COLS_MAX_ERROR',
  GENERATE_TABLE_ROWS_MAX_ERROR = 'GENERATE_TABLE_ROWS_MAX_ERROR',

  IMPORT_CSV_ERROR = 'IMPORT_CSV_ERROR'

}

export enum LoadingKeysEnum {

  IMPORT_CSV_LOADING = 'IMPORT_CSV_LOADING'

}