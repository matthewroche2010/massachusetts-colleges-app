import React from 'react';
import {FlexRow} from '../flexContainers';
import closeIcon from '../../assets/close-icon.svg';
import {Button} from '../button';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const DataFilterControls = ({
  value = '',
  label = 'Search',
  onChange,
}) => {
  return (
    <FlexRow
      horizontal="center"
      vertical="center"
      css={{width: '100%'}}
    >
      <label>{label}</label>
      <StyledTextInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        onClick={() => onChange('')}
        title="clear filter"
        color="primary"
      >
        <img src={closeIcon}/>
      </Button>
    </FlexRow>
  );
};

const StyledTextInput = styled.input`
  border:none;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  background-color: #fff;
  font-size:16px;
  width:160px;
  outline:none;
  line-height:22px;
  border-radius:4px;
  padding:2px 8px;
  margin:0 4px;
  `;

DataFilterControls.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
