export default class Cell {
  rowIndex!: number;
  colIndex!: number;
  value!: string;
  valueColor!: string;
  valueFormat!: ValueFormatEnum[];
  cellColor!: string;
  horizontalAlign!: HorizontalAlignEnum;
  verticalAlign!: VerticalAlignEnum;
  editMode!: CellEditModeEnum;

  public constructor(init?: Partial<Cell>) {
    Object.assign(this, init);
  }
}

export enum ValueFormatEnum { BOLD, ITALIC, UNDERLINE }

export enum HorizontalAlignEnum { LEFT = 'flex-start', CENTER = 'center', RIGHT = 'flex-end' }

export enum VerticalAlignEnum { TOP = 'flex-start', MIDDLE = 'center', BOTTOM = 'flex-end' }

export enum CellEditModeEnum { EDIT_MODE_OFF, EDIT_MODE_ON, EDIT_MODE_REMOTE }