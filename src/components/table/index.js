import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {TableColumnGroup} from '../tableColumnGroup';
import {TableHeader} from '../tableHeader';
import {TableBody} from '../tableBody';
import {TableFooter} from '../tableFooter/index';
import PropTypes from 'prop-types';

const recordsPerPage = 30;

export const Table = ({
  tableData,
  columnWidths,
  scrollTop,
  currentPage = 1,
  onSetPage,
  onSort,
  sortField = '0',
  ...rest
}) => {
  const [rowData, setRowData] = useState(tableData.rows);
  const [page, setPage] = useState(currentPage || 1);
  const [sortFieldIndex, setSortFieldIndex] = useState(sortField);

  const headers = tableData.headers;
  const pages = Math.ceil(tableData.rows.length / recordsPerPage);
  const visibleRows = useRef(tableData.rows.filter((item, index) =>
    index >= (page - 1) * recordsPerPage && index < page * recordsPerPage,
  ));

  useEffect( () => {
    setSortFieldIndex(sortField);
    if (scrollTop) {
      scrollTop();
    }
  }, [sortField]);

  useEffect( () => {
    const newRowData = [...rowData];
    visibleRows.current = newRowData.filter((item, index) =>
      index >= (page - 1) * recordsPerPage && index < page * recordsPerPage,
    );
    setRowData(newRowData);
    scrollTop();
  }, [page]);

  useEffect(() => {
    if (sortFieldIndex == null) {
      return;
    }
    const newRowData = [...rowData];
    newRowData.sort(
        sortTableRowsByField(sortFieldIndex),
    );
    visibleRows.current = newRowData.filter((item, index) =>
      index >= (page - 1) * recordsPerPage && index < page * recordsPerPage,
    );
    setRowData(newRowData);
    setPage(1);
  }, [sortFieldIndex]);

  const onSortDataClicked = (index) => {
    if (onSort) {
      onSort(index);
      return;
    }
    setSortFieldIndex(index);
  };

  return (
    <StyledTable>
      {columnWidths &&
      <TableColumnGroup columnWidths={columnWidths}/>
      }
      <TableHeader
        headers={headers}
        onSortFieldChange={onSortDataClicked}
        sortFieldIndex={sortFieldIndex}
        {...rest}
      />
      <TableBody
        tableData={visibleRows.current}
      />
      <TableFooter
        colSpan={headers.length}
        pageCount={pages}
        currentPage={page}
        onPageChange={setPage}
        recordsPerPage={recordsPerPage}
      />
    </StyledTable>
  );
};

const sortTableRowsByField = (index) => {
  let sortOrder = 1;
  if (index[0] === '-') {
    sortOrder = -1;
    index = index.substr(1);
  }

  return function(a, b) {
    const aObj = a.values[index];
    const bObj = b.values[index];

    const aValue = aObj.sortValue ? aObj.sortValue : aObj.value;
    const bValue = bObj.sortValue ? bObj.sortValue : bObj.value;
    const result = (aValue < bValue) ?
      -1 :
      (aValue > bValue) ?
        1 :
        0;

    return result * sortOrder;
  };
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
    tableData: PropTypes.object,
    scrollTop: PropTypes.func,
    columnWidths: PropTypes.array,
    currentPage: PropTypes.number,
    onSetPage: PropTypes.func,
    sortField: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSort: PropTypes.func,
    rest: PropTypes.any,
  }
;
