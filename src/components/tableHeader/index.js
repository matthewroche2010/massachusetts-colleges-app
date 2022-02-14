import React from 'react';
import {TableCell} from '../tableCell';
import {FlexRow} from '../flexContainers';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TableHeaderSortControls} from '../tableHeaderSortControls';

export const TableHeader = ({headers, sortFieldIndex, onSortFieldChange}) => {
  return (
    <StyledTHead>
      <tr>
        {headers.map( (field, index) => {
          return (
            <TableCell
              key={field.id}
              isHeadCell={true}
            >
              <FlexRow
                vertical="center"
                horizontal="space-between"
              >
                {field.id}
                {field.isSortable &&
                  <TableHeaderSortControls
                    index={index}
                    onChange={onSortFieldChange}
                    sortFieldIndex={sortFieldIndex}
                  />
                }
              </FlexRow>
            </TableCell>
          );
        })}
      </tr>
    </StyledTHead>
  );
};

const StyledTHead = styled.thead`
  z-index:1;
`;

TableHeader.propTypes = {
  headers: PropTypes.array,
  sortFieldIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSortFieldChange: PropTypes.func,
};
