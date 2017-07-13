import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  media,
  colorPrimary3,
} from '../../commons/styles.commons';
import Button from '../button/Button.component';

const PaginationContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;
  align-items: center;
  width: auto;rey;
  min-height: 40px;
  padding: 1rem;
`;

const PaginationInfos = styled.div`
  display: flex;
  flex: 0 1 300px;
  flex-flow: row wrap;
  ${media.phone`flex-flow: column wrap;`};
  justify-content: center;
  align-items: center;
`;

const PaginationHitsInfos = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-end;
  ${media.phone`
    justify-content: center;
  `};
`;

const PaginationPagesInfos = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  ${media.phone`
    justify-content: center;
  `};
  padding-left: .2rem;
`;

const HitsNumber= styled.span`
  background: ${colorPrimary3};
  padding-left: .5rem;
  padding-bottom: .2rem;
  padding-right: .5rem;
  border-radius: 1rem;
  margin-right: .4rem;
`;

const Pagination = ({
  helper,
  result,
}) => (
  <PaginationContainer>
    <Button
      onButtonClick={ () => helper.previousPage().search()}
      disabled={ helper.getPage() <= 0 }
    >
      Prev
    </Button>
    <PaginationInfos>
      { result &&
        <PaginationHitsInfos>
            <HitsNumber>
              { result.nbHits }
            </HitsNumber>
            { 'results ' }
        </PaginationHitsInfos>
      }
      { result &&
        <PaginationPagesInfos>
          { ` | page > ${helper.getPage() + 1} / ${result.nbPages}` }
        </PaginationPagesInfos>
      }
    </PaginationInfos>
    <Button
      onButtonClick={ () => helper.nextPage().search()}
      disabled={ helper.getPage() + 1 >= result.nbPages }
    >
      Next
    </Button>
  </PaginationContainer>
)

Pagination.propTypes = {
  helper: PropTypes.object.isRequired,
  result: PropTypes.array,
}

export default Pagination;
