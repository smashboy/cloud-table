import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { storeStateType } from './store';

type MyExtraArg = undefined;
export type MyThunkResultType<R> = ThunkAction<R, storeStateType, MyExtraArg, Action>;

// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatchType = ThunkDispatch<storeStateType, MyExtraArg, Action>;