import React from 'react';
import {TableCell} from '../tableCell';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const TableRow = ({rowData, onClick}) => (
  <StyledRow
    onClick={onClick}
  >
    {rowData.map( (item) => (
      <TableCell
        key={item.key}
        style={item.css ? item.css : {}}
      >
        {item.value}
      </TableCell>
    ),
    )}
  </StyledRow>
);

const StyledRow = styled.tr`
  line-height:15px;
`;

TableRow.propTypes = {
  rowData: PropTypes.array,
  onClick: PropTypes.func,
};
