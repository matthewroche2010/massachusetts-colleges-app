import React from 'react';
import styled from 'styled-components';
import {TableColumnGroup} from '../tableColumnGroup';
import {TableHeader} from '../tableHeader';
import {TableBody} from '../tableBody';
import {TableFooter} from '../tableFooter/index';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {setPage} from './tableSlice';

const recordsPerPage = 30;

export const Table = ({tableData, columnWidths, scrollTop, ...rest}) => {
  const headers = [...tableData[0].values];
  const page = useSelector((state) => state.tablePage.value);
  const dispatch = useDispatch();

  const pages = Math.ceil(tableData.length / recordsPerPage);

  const visibleRows = tableData.filter((item, index) =>
    index >= (page - 1) * recordsPerPage && index < page * recordsPerPage,
  );

  return (
    <StyledTable>
      {columnWidths &&
      <TableColumnGroup columnWidths={columnWidths}/>
      }
      <TableHeader headers={headers} {...rest}/>
      <TableBody
        tableData={visibleRows}
      />
      <TableFooter
        colSpan={headers.length}
        pageCount={pages}
        currentPage={page}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
        recordsPerPage={recordsPerPage}
      />
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border-spacing: 0;
  box-sizing: border-box;
  border: none;
  width: 100%;

  & tr:nth-child(even) {
    background: rgb(248, 248, 248);
  }

  & tr:nth-child(odd) {
    background: #fff
  }

  & tr {
    position: relative;
  }

  & tbody {
    & tr:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);
      transition: all 0.5s;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    & tr:hover:after {
      background-color: rgba(0, 0, 0, 0.13);
    }
  }

  & thead {
    position: sticky;
    inset-block-start: 0;
  }

  & tfoot {
    position: sticky;
    inset-block-end: 0;
  }
`;

Table.propTypes =
  {
    tableData: PropTypes.arrayOf(PropTypes.object),
    scrollTop: PropTypes.func,
    columnWidths: PropTypes.array,
    rest: PropTypes.any,
  }
;
