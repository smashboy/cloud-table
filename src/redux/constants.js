/**
 * ACTION TYPES
*/

// Table general types
export const SET_GENERATED_TABLE = 'SET_GENERATED_TABLE';

// Table -> Cell types
export const SET_CELL_VALUE = 'SET_CELL_VALUE';

// Error types
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Loading types
export const SET_LOADING_UI = 'SET_LOADING_UI';
export const CLEAR_LOADING_UI = 'CLEAR_LOADING_UI';

/**
 * KEYS
 * Keys have almost the same purpose as actions types,
 * but in this case keys used to retrieve specific data from state
*/

// UI -> errors keys
export const generateTableColsMaxError = 'generateTableColsMaxError';
export const generateTableRowsMaxError = 'generateTableRowsMaxError';

// UI -> loading key
export const generateTableLoading = 'generateTableLoading';