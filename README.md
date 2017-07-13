# AppStore Algolia powered :mag:
> AppStore, with my _**Algolia**_ instant-search tiny version

## Prerequisites

- NodeJs, Npm, Yarn (see [package.json](./package.json#L12) file for versions)

### Install back & front

    $ yarn
    $ cd client/
    $ yarn

### Start server in development mode

Make sur you are in the project root and run:

    $ yarn start:dev

### Start client in development mode

Open a new terminal session and run:

    $ cd client/
    $ yarn start:dev

### Build client

    $ cd client/
    $ yarn build

### Start application

At the project root:

    $ yarn start

### Test backend

In project root folder, run:

    $ yarn test

### Test frontend (almost nothing for now...)

    $ cd client/
    $ yarn test


### Technologies from :heart: OSS projects

- Algoliasearch
- Algoliasearch-Helper
- React
- Express
- Express-Generator
- Styled-Components
- Webpack
- Babel
- Create-React-App
...


### Features

- Search
- Results
- Highlight
- Rate with half-star
- Category filtering
- Ranking switching
- Pagination

### Evolutions & improvements

- Add tests to the frontend
- Warn if user is offline
- Use HOC to provide helper to components (ResultList and CategoryList, for ex.)
- Enable ServiceWorker to use cache (for images mostly)
- Change offset by page
...
