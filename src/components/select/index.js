import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Select = ({value, onChange, children}) => {
  return (
    <StyledSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  margin:4px;
  border:1px solid silver;
  outline: none;
  padding:4px;
  margin: 4px 8px;
  border-radius:3px;
`;

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
};
