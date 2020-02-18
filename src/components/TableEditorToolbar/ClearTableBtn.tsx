import React from 'react';
import Button from '@material-ui/core/Button';
import { connect, ConnectedProps } from 'react-redux';

import clearTableAction from '../../redux/actions/tableActions/clearTableAction';

type Props = ConnectedProps<typeof connectToRedux>;

const ClearTableBtn: React.FunctionComponent<Props> = props => {

    const { clearTableAction } = props;

    return (
        <Button onClick={clearTableAction}>
            Clear Table
        </Button>
    );
}

const mapActionsToProps = {
    clearTableAction
};

const connectToRedux = connect(null, mapActionsToProps);

export default connectToRedux(ClearTableBtn);