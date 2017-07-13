import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  media,
  colorSecondary1,
  colorSecondary2,
  colorTernary1,
  colorTernary2,
  colorQuaternary1,
  spacingDefault,
} from '../../commons/styles.commons';

const ResultItemWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  text-align: center;
  border: calc(${spacingDefault} / 2) solid #fff;
  border-radius: 1rem;
  width: calc((25% - (${spacingDefault} * 3)));
  ${media.desktop`width: calc((33% - (${spacingDefault} * 2.9)));`}
  ${media.tablet`width: calc((50% - (${spacingDefault} * 3)));`}
  ${media.phone`width: 100%;`};
  min-width: 290px;
  transition: box-shadow 1s;
`;

const ResultItemInnerWrapper = styled.div`
  flex: 1 1 auto;
  padding: ${spacingDefault};
  border-radius: ${spacingDefault};
  background: ${colorSecondary2};
  box-shadow: 0px 0px 10px 0px ${colorSecondary1};
  &:hover {
    box-shadow: 0px 0px 10px 0px ${colorSecondary1} inset;
  }

`;

const ResultItemHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`;

const ResultItemTitle = styled.div`
  flex: 1 1 90%;
  font-size: 1rem;
  text-align: left;
`;

const ResultItemName= styled.div`
  font-weight: bold;
  margin-bottom: .5rem;
  em {
    font-style: italic;
    background: ${colorQuaternary1};
  }
`;

const ResultItemRating = styled.span`
  position: relative;
  color: ${colorTernary1};
`;

const FilledStar = ResultItemRating.extend`
`;

const EmptyStar = ResultItemRating.extend`
`;

// hacky but working half-star
const HalfStar = styled.svg`
  position: absolute;
  height: 1.2rem;
  width: 1.24rem;
  top: .001rem;
  margin-left: -.125rem;
  fill: ${colorTernary1};
`;


const ResultItemRatingCount = styled.span`
  border-radius: 1rem;
  color: #fff;
  background: ${colorTernary1};
  padding: .2rem;
`;

const ResultItemImageWrapper = styled.div`
  flex: 1 1 10%;
  margin-right: ${spacingDefault}
`;

const ResultItemImage = styled.img`
  display: inline-block;
  width: 57px;
  height: 57px;
  min-width: 57px;
  border: #4a5052 solid 2px;
  border-radius: 1rem;
  background: ${colorSecondary2};
`;

const ResultItemFooter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: .3rem;
`;


const ResultItemLink = styled.a`
  font-size: 1rem;
  color: ${colorTernary2};
  text-decoration: underline;
  margin-left: 1rem;
`;

const ResultItem = ({
  image,
  link,
  name,
  nameHighlighted,
  price,
  rating,
  ratingCount
}) => (
  <ResultItemWrapper>
    <ResultItemInnerWrapper>
      <ResultItemHeader>
        <ResultItemImageWrapper>
          <ResultItemImage
            src={ image }
            alt={ name }
          />
        </ResultItemImageWrapper>
        <ResultItemTitle>
          <ResultItemName
            dangerouslySetInnerHTML={{
              __html: nameHighlighted
            }}
          />
          <ResultItemRating>
            { rating > 0 &&
              <FilledStar>
                { '\u2605'.repeat(Math.floor(rating)) }
              </FilledStar>
            }
            { rating % 1 !== 0 &&
              <HalfStar
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
              </HalfStar>
            }
            { 5 - rating > 0 &&
              <EmptyStar style={{ marginLeft: rating % 1 !== 0 ? '1rem' : '0' }}>
                {/* TODO this is very unreadable, must be refactored in an util service */}
                {/* Add empty star minus one if rating has float value */}
                { '\u2606'.repeat(5 - Math.floor(rating) - (rating % 1 !== 0 ? 1 : 0)) }
              </EmptyStar>
            }
          </ResultItemRating>
          { ' - on ' }
          <ResultItemRatingCount>
            { ratingCount }
          </ResultItemRatingCount>
          { ' ratings ' }
        </ResultItemTitle>
      </ResultItemHeader>
      <ResultItemFooter>
        { price }
        <ResultItemLink
          href={ link }
        >
          >> Find it on the web
        </ResultItemLink>
      </ResultItemFooter>
    </ResultItemInnerWrapper>
  </ResultItemWrapper>
)

ResultItem.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  nameHighlighted: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
}

export default ResultItem;
