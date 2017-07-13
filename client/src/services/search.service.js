import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

// constants
const APPLICATION_ID = 'LVAKAN716P';
const SEARCH_API_KEY = 'ed76022e546ab3e3d0ef1b47b972d7a3';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);

const indexes = {
  indexSmart: 'apps',
  indexRatingDesc: 'apps_by_rating_desc',
  indexRatingAsc: 'apps_by_rating_asc'
};

// Instanciate helper
export const getHelper = (indexName) => {
  const index = getValidIndex(indexName);

  const helper = algoliasearchHelper(client, index, {
    disjunctiveFacets: ['category']
  });

  helper
    .search();
  
  return helper;
}

// Get valid index
export const getValidIndex = (indexName) => {
  return indexes[indexName] || indexes['indexRatingDesc'];
}

// I used to throttle search before...
// But with Algolia and the maximum results number for this test
// 0 is the perfect throttle threshold ;-)
let timer;
let delay = 0;
export const throttle = (cb) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    cb();
  }, delay);
}
