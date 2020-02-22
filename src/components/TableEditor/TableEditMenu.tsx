import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import TableIcon from '@material-ui/icons/BorderAll';
import ArrowTopIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip';

import CellModel from '../../../models/Table/Cell';
import setTableRowsAction from '../../redux/actions/editorActions/setTableRowsAction';
import setTableColsAction from '../../redux/actions/editorActions/setTableColsAction';

const useStyles = makeStyles((theme: Theme) => createStyles({
  openMenuBtn: {
    position: 'absolute',
    margin: 0,
    zIndex: 10,
    right: 0,
    padding: 0,
    bottom: 0
  },
  menuItemHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  menuPaper: {
    minWidth: 275
  },
  addBtnIcon: {
    color: 'rgb(76, 175, 80)'
  },
  deleteBtnIcon : {
    color: '#ff0000'
  }
}));

interface OtherPropsInterface {
  cellData: CellModel
}

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const TableEditMenu: React.FunctionComponent<ReduxProps &  OtherPropsInterface> = props => {

  const classes = useStyles();

  const { setTableColsAction, setTableRowsAction, cellData } = props;
  const { rowIndex, colIndex } = cellData;

  const [menuState, setMenu] = React.useState<null | HTMLElement>(null);

  const menuOpenHandler  = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };

  const menuCloseHandler = () => {
    setMenu(null);
  };

  return (
    <React.Fragment>
      <Tooltip title='Edit Table' arrow>
        <IconButton 
          className={classes.openMenuBtn}
          aria-controls={`table-edit-menu-${rowIndex}-${colIndex}`}
          aria-haspopup='true'
          onClick={menuOpenHandler}
        >
          <TableIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id={`table-edit-menu-${rowIndex}-${colIndex}`}
        anchorEl={menuState}
        keepMounted
        open={Boolean(menuState)}
        onClose={menuCloseHandler}
        classes={{
          paper: classes.menuPaper
        }}
      >
        <MenuItem onClick={() => {
          menuCloseHandler();
          setTableRowsAction({ rowIndex: rowIndex });
        }}>
          <ListItemIcon>
            <React.Fragment>
              <AddIcon className={classes.addBtnIcon} />
              <ArrowTopIcon />
            </React.Fragment>
          </ListItemIcon>
          <ListItemText primary='Add row above' />
        </MenuItem>
        <MenuItem onClick={() => {
          menuCloseHandler();
          setTableColsAction({ colIndex: colIndex + 1 })
        }}>
          <ListItemIcon>
            <React.Fragment>
              <AddIcon className={classes.addBtnIcon} />
              <ArrowRightIcon />
            </React.Fragment>
          </ListItemIcon>
          <ListItemText primary='Add column to right' />
        </MenuItem>
        <MenuItem onClick={() => {
          menuCloseHandler();
          setTableRowsAction({ rowIndex: rowIndex + 1 });
        }}>
          <ListItemIcon>
            <React.Fragment>
              <AddIcon className={classes.addBtnIcon} />
              <ArrowBottomIcon />
            </React.Fragment>
          </ListItemIcon>
          <ListItemText primary='Add row below' />
        </MenuItem>
        <MenuItem onClick={() => {
           menuCloseHandler();
           setTableColsAction({ colIndex })
        }}>
          <ListItemIcon>
            <React.Fragment>
              <AddIcon className={classes.addBtnIcon} />
              <ArrowLeftIcon />
            </React.Fragment>
          </ListItemIcon>
          <ListItemText primary='Add column to left' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon className={classes.deleteBtnIcon} />
          </ListItemIcon>
          <ListItemText primary='Delete row' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon className={classes.deleteBtnIcon} />
          </ListItemIcon>
          <ListItemText primary='Delete column' />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const mapActionsToProps = {
  setTableColsAction,
  setTableRowsAction
};

const connectToRedux = connect(null, mapActionsToProps);

export default connectToRedux(TableEditMenu);