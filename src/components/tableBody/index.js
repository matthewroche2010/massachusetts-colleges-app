import React from 'react';
import {TableRow} from '../tableRow';
import PropTypes from 'prop-types';

export const TableBody = ({tableData}) =>{
  return (
    <tbody>
      {tableData.map( (row) => {
        return (
          <TableRow
            key={row.recordId}
            rowData={row.values}
          />
        );
      })}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
};
