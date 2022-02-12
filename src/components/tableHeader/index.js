import React from 'react';
import {TableCell} from '../tableCell';
import {FlexRow, FlexCol} from '../flexContainers';
import {colors} from '../../assets/colors';
import styled from 'styled-components';
import upArrow from '../../assets/up-icon.svg';
import downArrow from '../../assets/down-icon.svg';
import PropTypes from 'prop-types';

export const TableHeader = ({headers, onSortFieldChange, ...rest}) => {
  const sortField = rest.sortField;

  return (
    <StyledTHead>
      <tr>
        {headers.map( (field) => {
          return (
            <TableCell
              key={field.key}
              isHeadCell={true}
            >
              <FlexRow
                vertical="center"
                horizontal="space-between"
              >
                {field.key}
                {field.isSortable &&
                <FlexCol
                  vertical='center'
                  horizontal='flex-end'
                  css={{width: `22px`}}
                >
                  <div
                    style={ sortField === field.key ?
                      {backgroundColor: `rgb(${colors.success})`} :
                      {}
                    }
                    onClick={()=>onSortFieldChange(field.key)}
                  >
                    <img style={{cursor: 'pointer'}} src={upArrow}/>
                  </div>
                  <div
                    style={ sortField === `-${field.key}` ?
                      {backgroundColor: `rgb(${colors.success})`} :
                      {}
                    }
                    onClick={()=>onSortFieldChange('-'+field.key)}
                  >
                    <img style={{cursor: 'pointer'}} src={downArrow}/>
                  </div>
                </FlexCol>
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
  onSortFieldChange: PropTypes.func,
  rest: PropTypes.any,
};
