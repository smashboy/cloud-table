import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Row from './Components/Row';
import './TableView.css';
import { generateTableLoading } from '../../redux/keys';

const TableView = props => {

  const { data, loadingState } = props;

  return (
    <Fragment>
      {loadingState.includes(generateTableLoading) ?
        <h3>Generating table...</h3>
          :
        <table>
          <tbody>
            {data.map((row, i) => 
              <Row 
                key={i} 
                cells={row}
              />
            )}
          </tbody>
        </table>
      }
    </Fragment>
  );
}

const mapStateToProps = state => ({
  loadingState: state.ui.loading
});

export default connect(mapStateToProps)(TableView);
