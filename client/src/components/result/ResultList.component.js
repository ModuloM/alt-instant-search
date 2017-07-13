import React from 'react';
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components';

import {
  media,
  colorQuaternary1,
} from '../../commons/styles.commons';
import ResultItem from './ResultItem.component';
import Pagination from '../pagination/Pagination.component';
import { getValidIndex } from '../../services/search.service';

const ResultPanel = styled.div`
  flex: 1 1 100%;
  flex-flow: column nowrap;
  width: 100%;
`;

const ResultContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
`;

const nope = keyframes`
  from, to {
      transform: translate3d(0, 0, 0);
    }
  
    10%, 30%, 50%, 70%, 90% {
      transform: translate3d(-10px, 0, 0);
    }
  
    20%, 40%, 60%, 80% {
      transform: translate3d(10px, 0, 0);
    }
  }
`;

const ResultNone = styled.div`
  display: flex;
  flex: 1 1 60%;
  border-radius: 2rem;
  margin: 2rem;
  padding: 1rem; 
  background: ${colorQuaternary1};
  animation: ${nope} 1s linear;
  transition: font-size 200ms;
  font-size: 1.3rem;
  ${media.phone`font-size: 1rem;`};
`;

class ResultList extends  React.Component {

  static propTypes = {
    helper: PropTypes.object.isRequired,
    ranking: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    const { helper } = this.props;

    helper.on('result', this.handleResult);
  }

  componentWillUnmount() {
    const { helper } = this.props;

    helper.removeListener('result', this.handleResult);
  }

  componentWillUpdate(nextProps, nextState) {
    const { helper, ranking } = this.props;
    
    if (nextProps.ranking !== ranking) {
      helper.setIndex(getValidIndex(nextProps.ranking));
      helper.search();
    }
  }

  handleResult = (result) => {
    this.setState({
      result: result
    })
  }

  render() {
    const isResult = !this.props.helper.hasPendingRequests();

    return (
      <ResultPanel>
        <Pagination
          helper={ this.props.helper }
          result={ this.state.result }
        />
        <ResultContainer>
          { this.state.result.hits && this.state.result.hits.length > 0 &&
            this.state.result.hits.map(item => (
              <ResultItem
                key={ item.objectID }
                image={ item.image }
                link={ item.link }
                name={ item.name }
                nameHighlighted={ item._highlightResult.name.value }
                price={ item.price }
                rating={ item.rating }
                ratingCount={ item.ratingCount }
              />
            )
          )}
          { this.state.result.length === 0 && isResult &&
            <ResultNone>
              No result, sorry...
            </ResultNone>
            // TODO display spinner if search is running
          }
        </ResultContainer>
      </ResultPanel>
    )
  }

}

export default ResultList;