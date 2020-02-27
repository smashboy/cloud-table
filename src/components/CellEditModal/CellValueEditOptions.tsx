import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FormatTextColorIcon from '@material-ui/icons/FormatColorText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatVerticalTop from '@material-ui/icons/VerticalAlignTop';
import FormatVerticalCenter from '@material-ui/icons/VerticalAlignCenter';
import FormatVerticalBottom from '@material-ui/icons/VerticalAlignBottom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  btnGroup: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'center'
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
}));

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

const CellValueEditOptions = () => {

  const classes = useStyles();

  const [horizontalAlignmentState, setHorizontalAlignment] = React.useState('left');
  const [verticalAlignmentState, setVerticalAlignment] = React.useState('top');
  const [formats, setFormats] = React.useState(() => ['italic']);
  const [valueColorMenuState, setValueColorMenu] = React.useState<HTMLElement | null>(null);
  const [cellColorMenuState, setCellColorMenu] = React.useState<HTMLElement | null>(null);

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleHorizontalAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setHorizontalAlignment(newAlignment);
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <IconButton>
        <ToggleButton value='left' aria-label='left-aligned'>
          <FormatAlignLeftIcon />
        </ToggleButton>
      </IconButton>
      <Menu
        id={`change-text-color-menu-${rowIndex}-${colIndex}`}
        anchorEl={valueColorMenuState}
        keepMounted
        className={classes.colorSelectorMenu}
        open={Boolean(valueColorMenuState)}
        classes={{
          paper: classes.colorSelectorMenu
              }}
              onClose={() => setValueColorMenu(null)}
      ></Menu>
      <StyledToggleButtonGroup
        size='small'
        value={horizontalAlignmentState}
        exclusive
        onChange={handleHorizontalAlignment}
        className={classes.btnGroup}
        aria-label='text-horizontal-alignment'
      >
        <ToggleButton value='left' aria-label='left-aligned'>
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value='center' aria-label='centered'>
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value='right' aria-label='right-aligned'>
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton value='justify' aria-label='justified'>
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider orientation='vertical' className={classes.divider} />
      <StyledToggleButtonGroup
        size='small'
        className={classes.btnGroup}
        aria-label='text-vertical-formatting'
      >
        <ToggleButton value='top' aria-label='top-aligned'>
          <FormatVerticalTop />
        </ToggleButton>
        <ToggleButton value='center' aria-label='center-aligned'>
          <FormatVerticalCenter />
        </ToggleButton>
        <ToggleButton value='bottom' aria-label='bottom-aligned'>
          <FormatVerticalBottom />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider orientation='vertical' className={classes.divider} />
      <StyledToggleButtonGroup
        size='small'
        value={formats}
        onChange={handleFormat}
        className={classes.btnGroup}
        aria-label='text-formatting'
      >
        <ToggleButton value='bold' aria-label='bold'>
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value='italic' aria-label='italic'>
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value='underlined' aria-label='underlined'>
          <FormatUnderlinedIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider orientation='vertical' className={classes.divider} />
      <StyledToggleButtonGroup
        size='small'
        aria-label='color'
        className={classes.btnGroup}
      >
        <ToggleButton value='cell-color' aria-label='cell-color'>
          <FormatColorFillIcon />
          <ArrowDropDownIcon />
        </ToggleButton>
        <ToggleButton value='text-color' aria-label='text-color'>
          <FormatTextColorIcon />
          <ArrowDropDownIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}

export default CellValueEditOptions;