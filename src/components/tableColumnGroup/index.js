import React from 'react';
import PropTypes from 'prop-types';

export const TableColumnGroup = ({columnWidths}) => {
  return (
    <colgroup>
      {columnWidths.map( (width, index) => (
        <col key={index} style={{width: width}}/>
      ),
      )}
    </colgroup>
  );
};

TableColumnGroup.propTypes = {
  columnWidths: PropTypes.array,
};
