import CellModel, { CellEditModeEnum, VerticalAlignEnum, HorizontalAlignEnum } from '../../models/Table/Cell'

type GenerateDefaultCellType = ({}: { rowIndex: number, colIndex: number, value?: string }) => CellModel;

const generateDefaultCell: GenerateDefaultCellType = ({ rowIndex, colIndex, value = '' }) => ({
  rowIndex,
  colIndex,
  value,
  cellColor: '#ffffff',
  valueColor: '#000000',
  valueFormat: [],
  editMode: CellEditModeEnum.EDIT_MODE_OFF,
  verticalAlign: VerticalAlignEnum.MIDDLE,
  horizontalAlign: HorizontalAlignEnum.LEFT
});

export default generateDefaultCell;