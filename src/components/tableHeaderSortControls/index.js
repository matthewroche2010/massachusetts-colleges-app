import React from 'react';
import {FlexCol} from '../flexContainers';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const TableHeaderSortControls = ({index, sortFieldIndex, onChange}) => {
  return (
    <FlexCol
      vertical='center'
      horizontal='center'
      css={{width: `22px`}}
    >
      <StyledSvg
        onClick={() => onChange(index)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15.71382 6.18992"
      >
        <polygon
          className={sortFieldIndex.toString() === index.toString() ?
            'active' :
            ''
          }
          points="7.857 0 0 6.19 15.714 6.19 7.857 0"
        />
      </StyledSvg>
      <StyledSvg
        onClick={() => onChange('-' + index)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15.71382 6.18992"
      >
        <polygon
          className={sortFieldIndex.toString() === `-${index}` ? 'active' : ''}
          points="7.857 6.19 15.714 0 0 0 7.857 6.19"
        />
      </StyledSvg>
    </FlexCol>
  );
};

const StyledSvg = styled.svg`
    cursor: pointer;
    margin: 2px 0;
    width: 18px;

    > polygon {
      fill: rgba(255, 255, 255, 0.35);
      transition: all 0.3s;

      &.active {
        animation-name: active;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
      }
    }

    :hover polygon{
      fill: rgba(255, 255, 255, 0.85);
    }

    :active polygon{
      fill: rgba(0, 0, 0, 0.65);
    }

    @keyframes active {
      0% {
        fill:rgba(150, 215, 150, 0.95);
      }
      50% {
        fill:rgba(100, 155, 100, 0.95);
      }
      100% {
        fill:rgba(150, 215, 150, 0.95);
      }
    }
  `;

TableHeaderSortControls.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sortFieldIndex: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number],
  ),
  onChange: PropTypes.func,
};
