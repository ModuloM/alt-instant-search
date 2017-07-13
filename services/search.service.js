const algoliasearch = require('algoliasearch');

const APPLICATION_ID = 'LVAKAN716P';
const SEARCH_API_KEY = 'ed76022e546ab3e3d0ef1b47b972d7a3';
const ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_KEY || '';

const algoliaSearchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const searchIndex = algoliaSearchClient.initIndex('apps');

const algoliaIndexClient = algoliasearch(APPLICATION_ID, ADMIN_API_KEY);
const adminIndex = algoliaIndexClient.initIndex('apps');

module.exports = {
  search: (qry) => {
    return searchIndex.search(qry)
      .then(res => res)
      .catch(err => {
        console.error(err);
        return new Error(err);
      });
  },
  addApp: (app) => {
    return adminIndex.addObject(app)
      .then(res => res)
      .catch(err => {
        console.error(err);
        throw new Error(err);
      });
  },
  deleteApp: (appId) => {
    return adminIndex.deleteObject(appId)
      .then(res => res)
      .catch(err => {
        console.error(err);
        throw new Error(err);
      });
  }
};
