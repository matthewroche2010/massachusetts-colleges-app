import React from 'react';
import {FlexRow} from '../flexContainers';
import {colors} from '../../assets/colors';
import plusIcon from '../../assets/plus-icon.svg';
import minusIcon from '../../assets/minus-icon.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const MinMaxButtons = ({minMaxState, onClick}) => {
  return (
    <FlexRow
      vertical='center'
      horizontal='center'
    >
      {minMaxState === 'max' &&
        <MinMaxButton
          css={{marginRight: 8, height: 7}}
          onClick={()=>onClick('min')}
        >
          <img src={minusIcon}/>
        </MinMaxButton>
      }
      {minMaxState === 'min' &&
      <MinMaxButton
        css={{marginRight: 8, height: 7}}
        onClick={()=>onClick('max')}
      >
        <img src={plusIcon}/>
      </MinMaxButton>
      }
    </FlexRow>
  );
};

const MinMaxButton = styled.button`
  position:relative;
  z-index:1;
  border:none;
  outline:none;
  height:20px;
  width:20px;
  background-color: rgb(${colors.default});
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  margin:3px;
  border-radius:50%;
  > img {
    width:10px;
  }
`;

MinMaxButtons.propTypes = {
  minMaxState: PropTypes.string,
  onClick: PropTypes.func,
};
