// import { Timestamp } from '@firebase/firestore-types';

import Cell from './Cell';

export default class Table {
  rows!: Cell[][];
  rowsAmount!: number;
  colsAmount!: number;
  // editPrivacy!: number;
  // createdAt!: Timestamp | Date;
  // lastTimeUpdated!: Timestamp | Date;

  public constructor(init?: Partial<Table>) {
    Object.assign(this, init);
  }
}

export enum TableEditPrivacyEnum { PUBLIC, PRIVATE, CLOSED }