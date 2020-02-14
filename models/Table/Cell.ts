export default class Cell {
  rowIndex!: number;
  colIndex!: number;
  value!: string;
  editMode!: number;

  public constructor(init?: Partial<Cell>) {
    Object.assign(this, init);
  }
}

export enum CellEditModeEnum { EDIT_MODE_ON, EDIT_MODE_OFF, EDIT_MODE_ON_REMOTE };