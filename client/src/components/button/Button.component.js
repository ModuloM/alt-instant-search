import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  colorPrimary2,
  colorSecondary2,
  colorPrimary5,
} from '../../commons/styles.commons';

const ButtonContainer = styled.button`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};;
  font-size: 1rem;
  background: ${props => props.disabled ? colorPrimary5 : colorPrimary2};
  border-radius: .3rem;
  color: ${colorSecondary2};
  border: 0;
  padding: .5rem;
  min-width: 100px;
`;

const Button = ({
  children,
  disabled,
  onButtonClick,
}) => (
  <ButtonContainer
    onClick={ () => {
      if (!disabled) {
        onButtonClick();
      }
    }}
    disabled={ disabled }
  >
    { disabled }
    { children }
  </ButtonContainer>
)

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onButtonClick: PropTypes.func.isRequired,
}

export default Button;
