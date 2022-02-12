import React from 'react';
import {colors} from '../../assets/colors';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const borderRadius = '6px';

export const Button = ({color, onClick, css, children}) => {
  const buttonColor = {
    backgroundColor: `rgb(${colors[color] || colors.default})`,
  };

  const styles = {...buttonColor, ...css};

  return (
    <StyledButton
      style={styles}
      onClick={onClick}
    >{children}
    </StyledButton>
  );
};


const StyledButton = styled.button`
  padding: 6px 10px;
  border: none;
  outline: none;
  display: flex;
  font-size:14px;
  letter-spacing:1.2px;
  font-weight: lighter;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  min-width: 28px;
  cursor: pointer;
  border-radius: ${borderRadius};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    border-radius: ${borderRadius};
    top: 0;
    left: 0;
    pointer-events: none;
  }
  &:hover:after {
    background-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }
  &:active:after {
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.03);
    transition: all 0s;
  }
  >img{
    height: 12px;
    width: 12px;
  },
`;

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  css: PropTypes.object,
  children: PropTypes.node,
};
