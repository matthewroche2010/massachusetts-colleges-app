import React from 'react';
import styled from 'styled-components';
import {colors} from '../../assets/colors';
import PropTypes from 'prop-types';
import {Button} from '../button';
import {Select} from '../select';

export const TableFooter =({
  colSpan,
  pageCount,
  currentPage,
  onPageChange,
  recordsPerPage,
}) => {
  const options = [];
  for (let i=0; i<pageCount; i++) {
    options.push(<option key={i} value={i+1}>{i+1}</option>);
  }

  return (
    <tfoot>
      <tr>
        <StyledFooterCell colSpan={colSpan}>
          <CellContentWrapper>
            <ControlsWrapper>
              Viewing Page
              <Select
                value={currentPage}
                onChange={onPageChange}
              >
                {options}
              </Select>
              of {pageCount}
              <ButtonContainer>
                {currentPage > 1 &&
                  <Button
                    color="error"
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                }
                {currentPage < pageCount &&
                <Button
                  color="error"
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  Next
                </Button>
                }
              </ButtonContainer>
            </ControlsWrapper>
            <RecordCountContainer>
              ({recordsPerPage} records per page)
            </RecordCountContainer>
          </CellContentWrapper>
        </StyledFooterCell>
      </tr>
    </tfoot>
  );
};

const StyledFooterCell = styled.td`
  background-color:rgb(${colors.default});
  overflow: visible;
  text-align: right;
  height: 80px;
  *:not(option):not(select){
    color: #fff;
  }
`;

const CellContentWrapper = styled.div`
  user-select: none;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;
`;

const ControlsWrapper = styled.div`
  user-select: none;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:flex-end;
`;

const ButtonContainer = styled.div`
  user-select: none;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left:14px;
  & * {
    margin: 0 6px;
  }
`;

const RecordCountContainer = styled.div`
  user-select: none;
  font-size:0.7em;
  margin: 3px 0;
`;

TableFooter.propTypes = {
  colSpan: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  recordsPerPage: PropTypes.number,
};
