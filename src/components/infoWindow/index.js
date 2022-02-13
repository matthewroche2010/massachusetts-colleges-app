import React from 'react';
import {HeadlessTable} from '../headlessTable';
import {Button} from '../button';
import styled from 'styled-components';
import closeIcon from '../../assets/close-icon.svg';
import {readableFieldMapping as fields}
from '../../utilities/dataMapping/readableFieldMapping';
import PropTypes from 'prop-types';
import {ModalContainer} from '../modalContainer';
import {colors} from '../../assets/colors';

import {useSelector, useDispatch} from 'react-redux';
import {setVisible} from './infoWindowSlice';

export const InfoWindow = ({data, onClose}) => {
  const isVisible = useSelector((state) => state.infoWindow.value);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch( setVisible(false));
    window.setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <ModalContainer
      visible={isVisible}
    >
      <WindowContainer>
        <InfoWindowHeader>
          {data &&
          <InfoWindowTitle>{data[fields.INSTNM]}</InfoWindowTitle>
          }
          <Button
            color="error"
            onClick={closeModal}
          >
            <img src={closeIcon}/>
          </Button>
        </InfoWindowHeader>
        {data &&
        <HeadlessTable data={data}/>
        }

      </WindowContainer>
    </ModalContainer>
  );
};

const WindowContainer = styled.div`
  min-height: 300px;
  max-height: 80vh;
  min-width: 300px;
  max-width: 80vw;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 12px;
  overflow-y: auto;
  @media (max-width: 440px) {
    max-width: 94vw;
    min-width: 94vw;
  }
`;

const InfoWindowHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-radius: 5px;
  background-color: rgb(${colors['default']});
  padding: 0 6px;
  margin-bottom: 12px;
`;

const InfoWindowTitle = styled.h4`
  font-family: Arial, sans-serif;
  color: #fff;
  font-weight: normal;
`;

InfoWindow.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};
