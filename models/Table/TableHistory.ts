import Table from './Table';

export default class TableHistory {
  limit!: number;
  currentTableIndex!: number;
  history!: Table[];

  public constructor(init?: Partial<TableHistory>) {
    Object.assign(this, init);
  }
}