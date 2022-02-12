import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'flex',
};

export const FlexRow = ({vertical, horizontal, css, children, ...rest}) => {
  const rowStyle = {...style, ...{
    flexDirection: 'row',
    alignItems: vertical,
    justifyContent: `${horizontal}`,
  }, ...css};

  return <div {...rest} style={rowStyle}>{children}</div>;
};

export const FlexCol = ({vertical, horizontal, css, children, ...rest}) => {
  const colStyle = {...style, ...{
    flexDirection: 'column',
    alignItems: vertical,
    justifyContent: horizontal,
  }, ...css};

  return <div {...rest} style={colStyle}>{children}</div>;
};

const properties = {
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
  css: PropTypes.object,
  children: PropTypes.node,
};

FlexRow.propTypes = {...properties};
FlexCol.propTypes = {...properties};
