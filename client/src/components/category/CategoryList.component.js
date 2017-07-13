import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import CategoryItem from './CategoryItem.component';

const CategoryListContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem 1rem .5rem 1rem;
`;

const Category = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
`;

const CategoryName = styled.div`
  flex: 1 1 100%;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

class CategoryList extends  React.Component {

  static propTypes = {
    helper: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      facets: [],
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

  handleResult = (result) => {
    this.setState({
      facets: result ? result.disjunctiveFacets.map(facet => (
        {
          ...facet,
          items: result.getFacetValues(facet.name, {sortBy: ['name:asc']})
        }
      )) : []
    });
  }

  handleFilterCategory = (categoryName) => {
    const { helper } = this.props;

    helper.toggleRefine('category', categoryName).search();
  }

  render() {
    return (
      <CategoryListContainer>
        { this.state.facets.length > 0 &&
          this.state.facets.map((facet, index) => (
            <Category
              key={ index }
            >
              <CategoryName>
                { facet.name }
              </CategoryName>
              { facet.items.length > 0 &&
                facet.items.map(item => (
                  <CategoryItem
                    key={ item.name }
                    name={ item.name }
                    count={ item.count }
                    isRefined={ !!item.isRefined }
                    onSelected={ this.handleFilterCategory }
                  />
                ))
              }
            </Category>
          )
        )}
      </CategoryListContainer>
    )
  }

}

export default CategoryList;