import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import {
  media,
  colorPrimary3,
  colorPrimary4,
} from '../../commons/styles.commons';

const CategoryElement = styled.div`
  display: flex;
  flex: 0 1 25%;
  ${media.tablet`flex: 0 1 33%;`}
  ${media.phone`flex: 0 1 50%;`}
  padding-bottom: .5rem;
`;

const CategoryName = styled.div`
  cursor: pointer;
  font-style: italic;
  font-weight: ${props => props.isRefined ? 600 : 100};
  border-radius: 1rem;
  text-decoration: underline;
  :hover {
    color: ${colorPrimary4};
  }
`;

const CategoryCount= styled.span`
  background: ${colorPrimary3};
  padding-left: .5rem;
  padding-bottom: .2rem;
  padding-right: .5rem;
  border-radius: 1rem;
  margin-left: .4rem;
`;

const CategoryItem = ({
  name,
  count,
  isRefined,
  onSelected,
  bidule
}) => (
  <CategoryElement>
    <CategoryName
      isRefined={ isRefined }
      onClick={ () => onSelected(name) }
    >
      { name }
    </CategoryName>
    <CategoryCount>
      { count }
    </CategoryCount>
  </CategoryElement>
)

CategoryItem.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  isRefined: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
}

export default CategoryItem;
