import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import {
  colorPrimary2,
  colorPrimary4,
} from '../../commons/styles.commons';

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  display: flex;
  flex: 1 1 100%;
  border-radius: 1.2rem;
  border: 0;
  height: 2rem;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: background 200ms linear;
  width: 100%;
  background: ${props => props.isFocused ? colorPrimary4 : colorPrimary2};
`;

const SearchOrder = styled.div`
  width: 100px;
  margin-left: 1rem;
`;

const OrderLink = styled.a`
  cursor: pointer;
  font-weight: 200;
  :hover {
    font-weight: 600;
  }
  background: none;
  border: 0;
  margin: 0;
`;

const Search = ({
  isFocused = false,
  onFocus,
  onBlur,
  onChange,
  onSwitchIndex,
  ranking,
}) => (
  <SearchContainer>
    <SearchInput
      type="search"
      onFocus={ onFocus }
      onBlur={ onBlur }
      onChange={ e => onChange(e) }
      isFocused={ isFocused }
    />
    <SearchOrder>
      { ranking === 'indexRatingDesc' &&
        <OrderLink
          onClick={ () => onSwitchIndex('indexRatingAsc') }
        >
          { 'By rating \u25BC' }
        </OrderLink>
      }
      { ranking === 'indexRatingAsc' &&
        <OrderLink
          onClick={ () => onSwitchIndex('indexRatingDesc') }
        >
          { 'By rating \u25B2' }
        </OrderLink>
      }
    </SearchOrder>
  </SearchContainer>
)

Search.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSwitchIndex: PropTypes.func,
  index: PropTypes.string,
}

export default Search;