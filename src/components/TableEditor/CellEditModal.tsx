import React from 'react';
import clsx from 'clsx';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Tooltip from '@material-ui/core/Tooltip';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CompactPicker } from 'react-color';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FormatTextColorIcon from '@material-ui/icons/FormatColorText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatVerticalTop from '@material-ui/icons/VerticalAlignTop';
import FormatVerticalCenter from '@material-ui/icons/VerticalAlignCenter';
import FormatVerticalBottom from '@material-ui/icons/VerticalAlignBottom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import CellModel, { CellEditModeEnum, VerticalAlignEnum, HorizontalAlignEnum, ValueFormatEnum } from '../../../models/Table/Cell';
import setEditModeAction from '../../redux/actions/editorActions/setEditModeAction';
import setEditModalLoaderAcion from '../../redux/actions/editorActions/setEditModalLoaderAction';
import useMounted from '../../customHooks/useMounted';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    textAlign: 'center',
    cursor: 'move'
  },
  openModalBtn: {
    position: 'absolute',
    margin: 0,
    zIndex: 10,
    right: 25,
    padding: 0,
    bottom: 2,
  },
  inputColorIndicator: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: '50%',
    border: '1px solid #bfbfbf'
  },
  menu: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  dropdownBtn: {
    margin: 4,
    color: 'rgba(0, 0, 0, 0.38)',
    padding: '0 8px',
    '&:hover': {
      borderRadius: 4
    }
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  // ToggleButton is in labs(not ready), so we have to add active css manually
  toggleBtnActive: {
    color: 'rgba(0, 0, 0, 0.54)',
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  }
}));

const DraggableComponent: React.FunctionComponent = props => {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

interface OtherPropsInterface {
 cellData: CellModel;
 displayToolsState: boolean;
}

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const CellEditModal: React.FunctionComponent<ReduxProps & OtherPropsInterface> = (props) => {

  const { 
    cellData, setEditModeAction, 
    setEditModalLoaderAcion, displayToolsState
  } = props;

  const { editMode, rowIndex, colIndex } = cellData;

  const classes = useStyles();
  const isMounted = useMounted();

  const [localCellDataState, setLocalCellData] = React.useState<CellModel | null>(null);
  const [verticalAlignMenuState, setVerticalAlignMenu] = React.useState<HTMLElement | null>(null);
  const [horizontalAlignMenuState, setHorizontalAlignMenu] = React.useState<HTMLElement | null>(null);
  const [valueColorMenuState, setValueColorMenu] = React.useState<HTMLElement | null>(null);
  const [cellColorMenuState, setCellColorMenu] = React.useState<HTMLElement | null>(null);

  // SET local state data, when edit mode is turned on in redux store
  React.useEffect(() => {
    if (cellData.editMode === CellEditModeEnum.EDIT_MODE_ON) {
      setLocalCellData(cellData);
      setEditModalLoaderAcion(false);
    }
  }, [cellData]);

  const setEditModeOnHandler = (): void => {
    if(editMode === CellEditModeEnum.EDIT_MODE_OFF) {
      setEditModeAction(cellData);
    }
  }

  // If user don't want to update table, old data should be passed
  const setEditModeOffHandler = (saveData?: boolean): void => {
    if(localCellDataState !== null && editMode === CellEditModeEnum.EDIT_MODE_ON && saveData) {
      setEditModeAction({
        ...localCellDataState,
        value: localCellDataState.value.trim(),
      });
    } else if (editMode === CellEditModeEnum.EDIT_MODE_ON && !saveData) {
      setEditModeAction(cellData);
    }
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (localCellDataState === null) return;
    setLocalCellData({
      ...localCellDataState,
      value: event.target.value
    });
  }

  const valueColorChangeHandler = (color: any): void => {
    if (localCellDataState === null) return;
    setLocalCellData({
      ...localCellDataState,
      valueColor: color.hex
    });
    setValueColorMenu(null);
  }

  const cellColorChangeHandler = (color: any): void => {
    if (localCellDataState === null) return;
    setLocalCellData({
      ...localCellDataState,
      cellColor: color.hex
    });
    setCellColorMenu(null);
  }

  const horizontalAlignmentHandler = (event: React.MouseEvent<HTMLElement>, newAlignment: HorizontalAlignEnum): void => {
    if (localCellDataState === null) return;
    setHorizontalAlignMenu(null);
    setLocalCellData({
      ...localCellDataState,
      horizontalAlign: newAlignment
    });
  }

  const verticalAlignmentHandler = (event: React.MouseEvent<HTMLElement>, newAlignment: VerticalAlignEnum): void => {
    if (localCellDataState === null) return;
    setVerticalAlignMenu(null);
    setLocalCellData({
      ...localCellDataState,
      verticalAlign: newAlignment
    });
  }

  const valueFormatHandler = (event: React.MouseEvent<HTMLElement>, newFormats: ValueFormatEnum[]): void => {
    if (localCellDataState === null) return;
    setLocalCellData({
      ...localCellDataState,
      valueFormat: newFormats
    });
  };

  return (
    <React.Fragment>
      {displayToolsState ? 
        <Tooltip title='Edit Cell' arrow>
          <IconButton
            className={classes.openModalBtn}
            onClick={setEditModeOnHandler}
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip> : null
      }
      {editMode === CellEditModeEnum.EDIT_MODE_ON ?
        <Dialog
          fullScreen={isMounted ? window.screen.width < 600 : false}
          open={true}
          onClose={() => setEditModeOffHandler()}
          PaperComponent={isMounted && window.screen.width < 600 ? Paper : DraggableComponent}
          aria-labelledby='draggable-dialog-title'
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle className={classes.title} id='draggable-dialog-title'>
            Edit Cell
          </DialogTitle>
          <DialogContent>
            <Paper elevation={0} className={classes.paper}>
              {/* HORIZONTAL ALIGN TOOL */}
              <Tooltip title='Horizontal align' arrow>
                <Button
                  variant='text'
                  aria-controls={`change-horizontal-align-color-menu-${rowIndex}-${colIndex}`}
                  aria-haspopup='true'
                  className={classes.dropdownBtn}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => setHorizontalAlignMenu(event.currentTarget)}
                >
                  {
                    localCellDataState === null || localCellDataState.horizontalAlign === HorizontalAlignEnum.LEFT ?
                      <FormatAlignLeftIcon />
                    : localCellDataState.horizontalAlign === HorizontalAlignEnum.CENTER ?
                      <FormatAlignCenterIcon /> : <FormatAlignRightIcon />
                  }
                  <ArrowDropDownIcon />
                </Button>
              </Tooltip>
              <Menu
                id={`change-horizontal-align-color-menu-${rowIndex}-${colIndex}`}
                anchorEl={horizontalAlignMenuState}
                keepMounted
                open={Boolean(horizontalAlignMenuState)}
                onClose={() => setHorizontalAlignMenu(null)}
              >
                <StyledToggleButtonGroup
                  size='small'
                  exclusive
                  value={localCellDataState === null ? HorizontalAlignEnum.LEFT : localCellDataState.horizontalAlign}
                  onChange={horizontalAlignmentHandler}
                  aria-label='text-horizontal-alignment'
                >
                  <Tooltip title='Left' arrow>
                    <ToggleButton 
                      value={HorizontalAlignEnum.LEFT} 
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.horizontalAlign === HorizontalAlignEnum.LEFT) 
                            &&
                          classes.toggleBtnActive
                        )
                      } 
                      aria-label='left-aligned'
                    >
                      <FormatAlignLeftIcon />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title='Center' arrow>
                    <ToggleButton 
                      value={HorizontalAlignEnum.CENTER}
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.horizontalAlign === HorizontalAlignEnum.CENTER) 
                            &&
                          classes.toggleBtnActive
                        )
                      } 
                      aria-label='centered'
                    >
                      <FormatAlignCenterIcon />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title='Right' arrow>
                    <ToggleButton 
                      value={HorizontalAlignEnum.RIGHT}
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.horizontalAlign === HorizontalAlignEnum.RIGHT) 
                            &&
                          classes.toggleBtnActive
                        )
                      } 
                      aria-label='right-aligned'
                    >
                      <FormatAlignRightIcon />
                    </ToggleButton>
                  </Tooltip>
                </StyledToggleButtonGroup>
              </Menu>
              <Divider orientation='vertical' className={classes.divider} />
              {/* VERTICAL ALIGN TOOL */}
              <Tooltip title='Vertical align' arrow>
                <Button
                  variant='text'
                  aria-controls={`change-vertical-align-color-menu-${rowIndex}-${colIndex}`}
                  aria-haspopup='true'
                  className={classes.dropdownBtn}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => setVerticalAlignMenu(event.currentTarget)}
                >
                  {
                    localCellDataState === null || localCellDataState.verticalAlign === VerticalAlignEnum.TOP ?
                      <FormatVerticalTop />
                    : localCellDataState.verticalAlign === VerticalAlignEnum.MIDDLE ?
                      <FormatVerticalCenter /> : <FormatVerticalBottom />
                  }
                  <ArrowDropDownIcon />
                </Button>
              </Tooltip>
              <Menu
                id={`change-vertical-align-color-menu-${rowIndex}-${colIndex}`}
                anchorEl={verticalAlignMenuState}
                keepMounted
                open={Boolean(verticalAlignMenuState)}
                onClose={() => setVerticalAlignMenu(null)}
              >
                <StyledToggleButtonGroup
                  size='small'
                  exclusive
                  aria-label='text-vertical-alignment'
                  value={localCellDataState === null ? VerticalAlignEnum.MIDDLE : localCellDataState.verticalAlign }
                  onChange={verticalAlignmentHandler}
                >
                  <Tooltip title='Top' arrow>
                    <ToggleButton 
                      value={VerticalAlignEnum.TOP}
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.verticalAlign === VerticalAlignEnum.TOP) 
                            &&
                          classes.toggleBtnActive
                        )
                      } 
                      aria-label='top-aligned'
                    >
                      <FormatVerticalTop />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title='Middle' arrow>
                    <ToggleButton 
                      value={VerticalAlignEnum.MIDDLE}
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.verticalAlign === VerticalAlignEnum.MIDDLE) 
                            &&
                          classes.toggleBtnActive
                        )
                      }
                      aria-label='middle-aligned'
                    >
                      <FormatVerticalCenter />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title='Bottom' arrow>
                    <ToggleButton 
                      value={VerticalAlignEnum.BOTTOM}
                      className={
                        clsx(
                          (localCellDataState !== null && localCellDataState.verticalAlign === VerticalAlignEnum.BOTTOM) 
                            &&
                          classes.toggleBtnActive
                        )
                      }
                      aria-label='bottom-aligned'
                    >
                      <FormatVerticalBottom />
                    </ToggleButton>
                  </Tooltip>
                </StyledToggleButtonGroup>
              </Menu>
              <Divider orientation='vertical' className={classes.divider} />
              {/* TEXT FORMAT TOOL */}
              <StyledToggleButtonGroup
                size='small'
                aria-label='text-formatting'
                value={localCellDataState === null ? [] : localCellDataState.valueFormat}
                onChange={valueFormatHandler}
              >
                <Tooltip title='Bold text' arrow>
                  <ToggleButton 
                    value={ValueFormatEnum.BOLD}
                    className={
                      clsx(
                        (localCellDataState !== null && localCellDataState.valueFormat.includes(ValueFormatEnum.BOLD)) 
                          &&
                        classes.toggleBtnActive
                      )
                    }
                    aria-label='bold'
                  >
                    <FormatBoldIcon />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title='Italic text' arrow>
                  <ToggleButton 
                    value={ValueFormatEnum.ITALIC}
                    className={
                      clsx(
                        (localCellDataState !== null && localCellDataState.valueFormat.includes(ValueFormatEnum.ITALIC)) 
                          &&
                        classes.toggleBtnActive
                      )
                    }
                    aria-label='italic'
                  >
                    <FormatItalicIcon />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title='Underlined text' arrow>
                  <ToggleButton 
                    value={ValueFormatEnum.UNDERLINE}
                    className={
                      clsx(
                        (localCellDataState !== null && localCellDataState.valueFormat.includes(ValueFormatEnum.UNDERLINE)) 
                          &&
                        classes.toggleBtnActive
                      )
                    }
                    aria-label='underlined'
                  >
                    <FormatUnderlinedIcon />
                  </ToggleButton>
                </Tooltip>
              </StyledToggleButtonGroup>
              <Divider orientation='vertical' className={classes.divider} />
              {/* COLOR TOOLS */}
              <Tooltip title='Cell color' arrow>
                <Button
                  variant='text'
                  aria-controls={`change-cell-color-menu-${rowIndex}-${colIndex}`}
                  aria-haspopup='true'
                  className={classes.dropdownBtn}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => setCellColorMenu(event.currentTarget)}
                  style={{
                    color: localCellDataState === null ? '#000000' : localCellDataState.cellColor
                  }}
                >
                  <FormatColorFillIcon />
                  <ArrowDropDownIcon />
                </Button>
              </Tooltip>
              <Menu
                id={`change-cell-color-menu-${rowIndex}-${colIndex}`}
                anchorEl={cellColorMenuState}
                keepMounted
                className={classes.menu}
                open={Boolean(cellColorMenuState)}
                classes={{
                  paper: classes.menu
                }}
                onClose={() => setCellColorMenu(null)}
              >
                <CompactPicker onChangeComplete={cellColorChangeHandler} />
              </Menu>
              <Tooltip title='Text color' arrow>
                <Button
                  variant='text'
                  aria-controls={`change-value-color-menu-${rowIndex}-${colIndex}`}
                  aria-haspopup='true'
                  className={classes.dropdownBtn}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => setValueColorMenu(event.currentTarget)}
                  style={{
                    color: localCellDataState === null ? '#000000' : localCellDataState.valueColor
                  }}
                >
                  <FormatTextColorIcon />
                  <ArrowDropDownIcon />
                </Button>
              </Tooltip>
              <Menu
                id={`change-value-color-menu-${rowIndex}-${colIndex}`}
                anchorEl={valueColorMenuState}
                keepMounted
                classes={{
                  paper: classes.menu
                }}
                open={Boolean(valueColorMenuState)}
                onClose={() => setValueColorMenu(null)}
              >
                <CompactPicker onChangeComplete={valueColorChangeHandler} />
              </Menu>
            </Paper>
            <TextField 
              label='Cell Value'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth 
              multiline
              rows='6'
              rowsMax='8'
              onChange={inputChangeHandler}
              value={localCellDataState === null ? 'error' : localCellDataState.value} 
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setEditModeOffHandler()}
              variant='contained'
              color='secondary'
              disableElevation
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setEditModeOffHandler(true)} 
              color='primary'
              variant='contained'
              disableElevation
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
          :
        null
      }
    </React.Fragment>
  );
}

const mapActionsToProps = {
  setEditModeAction,
  setEditModalLoaderAcion
};

const connectToRedux = connect(null, mapActionsToProps);  

export default connectToRedux(CellEditModal);
