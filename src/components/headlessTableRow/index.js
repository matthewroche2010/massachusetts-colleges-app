import React from 'react';
import {TableCell} from '../tableCell';
import {colors} from '../../assets/colors';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const cellBorderRadius = '4px';

export const HeadlessTableRow = ({title, value}) => (
  <StyledRow>
    <KeyCell>
      {title}
    </KeyCell>
    <TableCell>
      {value === 'NULL' ? 'No Data' : value}
    </TableCell>
  </StyledRow>
);

const StyledRow = styled.tr`
  line-height:22px;
`;

const KeyCell = styled.td`
  background-color: rgb(${colors.default});
  font-size:0.7em;
  font-variant: small-caps;
  color: #fff;
  border-radius: ${cellBorderRadius};
  padding:3px 6px;
  font-weight: lighter;
  text-align: center;
  letter-spacing:2px;
  position:relative;
  &::after{
    content: "";
    position:absolute;
    height:100%;
    width:100%;
    border-radius:${cellBorderRadius};
    background-color: rgba(255,255,255,0.2);
    top:0;
    left:0;
  }
`;

HeadlessTableRow.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
