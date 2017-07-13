import React from 'react';
import styled, { keyframes }  from 'styled-components';

import logo from '../../assets/images/logo.svg';
import algoliaPowered from '../../assets/images/algolia-mark-white.svg';
import {
  media,
  colorPrimary1,
  colorPrimary2,
  colorPrimary3,
} from '../../commons/styles.commons';

import Search from '../search/Search.component';
import ResultList from '../result/ResultList.component';
import CategoryList from '../category/CategoryList.component';

import { getHelper, throttle } from '../../services/search.service';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1 1 auto;
  width: 100%;
`;

const AppAlgoliaPowered = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  ${media.phone`width: 30px;; height: 30px;`}
  opacity: .7;
`;

const animatedLogo = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const AppLogo = styled.img`
  animation: ${animatedLogo} 1s linear;
  height: 80px;
  ${media.phone`display: none;`}
`;

const AppLogoSmall = AppLogo.extend`
  height: 30px;
  display: none;
  ${media.phone`display: inherit;`}
  float: left;
`;

const AppHeader = styled.div`
  flex: 1 1 auto;
  text-align: center;
  background: linear-gradient( 5deg, ${colorPrimary3}, ${colorPrimary1} );
  min-height: 150px;
  padding: 20px;
  ${media.phone`min-height: 70px; padding: 15px;`}
  color: ${colorPrimary2};
`

const LogoContainer = styled.div`
  flex: 1 1 auto;
`;

const AppFilter = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  align-items: center;
  width: auto;
  min-height: 70px;
`;

const AppContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false,
      ranking: 'indexRatingDesc',
      helper: getHelper()
    }
  }

  handleOnSearchFocus = () => {
    this.setState({
      searchFocused: true
    });
  }

  handleOnSearchBlur = () => {
    this.setState({
      searchFocused: false
    });
  }

  handleOnSearchChange = (event) => {
    const value = event.target.value;
    throttle(() => this.state.helper.setQuery(value).search());
  }

  handleSwitchIndex = (ranking) => {
    this.setState({
      ranking
    });
  }

  render() {
    const { children } = this.props;
    return (
      <AppWrapper>
        <AppAlgoliaPowered
          src={algoliaPowered}
          alt="Powered by Algolia"
          title="Powered by Algolia"
        />
        <AppHeader>
          <LogoContainer>
            <AppLogo src={logo} alt="logo"/>
            <AppLogoSmall src={logo} alt="logo"/>
            <h2>Apps store search</h2>
          </LogoContainer>
          <Search
            isFocused={ this.state.searchFocused }
            onFocus={ this.handleOnSearchFocus }
            onBlur={ this.handleOnSearchBlur }
            onChange={ this.handleOnSearchChange }
            onSwitchIndex={ this.handleSwitchIndex }
            ranking={ this.state.ranking }
          />
        </AppHeader>
        <AppFilter>
          <CategoryList
            helper={ this.state.helper}
          />
        </AppFilter>
        <AppContent>
          <ResultList
            helper={ this.state.helper }
            ranking={ this.state.ranking }
          />
          { children }
        </AppContent>
      </AppWrapper>
    );
  }
}

export default App;
