import React from 'react';
import './index.scss';

import PropTypes from 'prop-types';

export const ModalContainer = ({visible, children}) => {
  return (
    <div id="modalContainer"
      className={ visible ? 'visible' : ''}
    >
      {children}
    </div>
  );
};

ModalContainer.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
};
