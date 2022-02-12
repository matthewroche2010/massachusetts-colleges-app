import React, {useState} from 'react';
import {TableCell} from '../components/tableCell';
import {TableHeader} from '../components/tableHeader';
import {TableRow} from '../components/tableRow';
import {TableBody} from '../components/tableBody';
import {Table} from '../components/table';
import {MinMaxButtons} from '../components/minMaxButtons';
import {DataFilterControls} from '../components/dataFilterControls';
import {tableData} from './sampledata';

export default {
  title: 'Mass Colleges React Components',
};

export const dataFilterControls = () => {
  const [filterValue, setFilterValue] = useState('');
  return (
    <DataFilterControls
      value={filterValue}
      label={'Filter Data'}
      onChange={setFilterValue}
    />
  );
};

export const minMaxButtons = () => {
  const [minMaxState, setMinMaxState] = useState('min');
  return (
    <MinMaxButtons
      minMaxState={minMaxState}
      onClick={(value) => setMinMaxState(value)}
    />
  );
};

export const tableHeadCell = () => {
  return (
    <TableCell isHeadCell={true}>
            Table Head Cell
    </TableCell>
  );
};

export const tableDataCell = () => {
  return (
    <TableCell>
            Table Data Cell
    </TableCell>
  );
};

export const tableHeader = () => {
  const headers = tableData[0].values.map( (item) => item.key );

  return (
    <TableHeader headers={headers}/>
  );
};

export const tableRow = () => {
  return (
    <TableRow rowData={tableData[0].values}/>
  );
};

export const tableBody = () => {
  return (
    <TableBody tableData={tableData}/>
  );
};

export const table = () => {
  const containerStyle = {
    height: 300,
    width: 500,
    overflow: 'auto',
  };

  return (
    <div style={containerStyle}>
      <Table tableData={tableData}/>
    </div>
  );
};


