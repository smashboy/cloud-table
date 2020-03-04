import React from 'react';
import Button from '@material-ui/core/Button';
import { connect, ConnectedProps } from 'react-redux';

import clearTableAction from '../../redux/actions/editorActions/clearTableAction';
import Tooltip from '@material-ui/core/Tooltip';

type Props = ConnectedProps<typeof connectToRedux>;

const ClearTableBtn: React.FunctionComponent<Props> = props => {

  const { clearTableAction } = props;

  return (
    <Tooltip title='Clear Table Values' arrow>
      <Button onClick={clearTableAction}>
        Clear Table
      </Button>
    </Tooltip>
);
}

const mapActionsToProps = {
  clearTableAction
};

const connectToRedux = connect(null, mapActionsToProps);

export default connectToRedux(ClearTableBtn);