import React from 'react';
import styled from 'styled-components';
import {colors} from '../../assets/colors';
import PropTypes from 'prop-types';

export const TableCell = ({isHeadCell, style, children}) => {
  if (isHeadCell) {
    return (
      <StyledHeadCell style={style}>
        {children}
      </StyledHeadCell>
    );
  }

  return (
    <StyledCell style={style}>
      {children}
    </StyledCell>
  );
};

const StyledCell = styled.td`
  padding: 2px 7px;
  border: 1px solid rgb(230, 230, 230);
  line-height:1.2em;
`;

const StyledHeadCell = styled.th`
  background-color: rgb(${colors.default});
  color: #fff;
  padding:4px 8px;
  height:46px;
  font-variant: small-caps;
  box-sizing: border-box;
  font-size: 0.76em;
  font-weight: lighter;
  line-height: 1.4em;
  letter-spacing: 2px;
  border: none;
  position: relative;
  &:after{
    content: "";
    position:absolute;
    height:100%;
    width:100%;
    background-color: rgba(0,0,0,0);
    transition: all 0.4s;
    top:0;
    left:0;
    pointer-events: none;
  }
  &:hover:after {
    background-color: rgba(255,255,255,0.13);
  }
  * {
    color: #fff;
  },
`;

TableCell.propTypes = {
  isHeadCell: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
