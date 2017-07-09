const request = require('supertest');

const app = require('./app');
const apps = require('./services/search.service');
const errorService = require('./services/error.service');

describe('/apps route', () => {

  let sendErrorMock

  beforeEach(() => {
    sendErrorMock = jest.spyOn(errorService, 'sendError')
  });

  afterEach(() => {
    sendErrorMock.mockReset();
    sendErrorMock.mockRestore();
  })

  describe('POST /apps/ body.app', () => {

    let addAppMock;
    const appNew = {
      category: 'SaaS',
      rating: 5,
      name: 'Powerful search SaaS engine',
      image: 'https://community.algolia.com/img/logos/algolia-logo-mark-7f34b65071.svg',
      link: 'https://www.algolia.com/',
      ratingCount: 777777,
      price: '0 USD'
    };

    afterEach(() => {
      addAppMock.mockReset();
      addAppMock.mockRestore();
    })

    it('should post new app', async () => {
      // Given
      addAppMock = apps['addApp'] = jest.fn(() => Promise.resolve('ok'));

      // When
      const response = await request(app)
        .post('/api/1/apps/')
        .send({
          app: appNew
        });

      // Then
      expect(sendErrorMock).not.toBeCalled();
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.text)).toEqual('ok');
      expect(addAppMock).toBeCalledWith(appNew);
    });

    it('should not post new app if request has no app', async () => {
      // Given
      addAppMock = apps['addApp'] = jest.fn(() => Promise.resolve('ok'));

      // When
      const response = await request(app)
        .post('/api/1/apps/')
        .send({});

      // Then
      expect(sendErrorMock).toBeCalled();
      expect(response.statusCode).toBe(400);
      expect(addAppMock).not.toBeCalled();
    });

    it('should not post new app if request is malformed', async () => {
      // Given
      addAppMock = apps['addApp'] = jest.fn(() => Promise.resolve('ok'));

      // When
      const response = await request(app)
        .post('/api/1/apps/')
        .send({
          app: {}
        });

      // Then
      expect(sendErrorMock).toBeCalled();
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.text)).toEqual({
        message: 'An app object must be provided'
      });
      expect(addAppMock).not.toBeCalled();
    });

    it('should return an error if Algolia service failed to add app', async () => {
      // Given
      addAppMock = apps['addApp'] = jest.fn(() => Promise.reject({
        message: 'Custom error message'
      }));

      // When
      const response = await request(app)
        .post('/api/1/apps/')
        .send({
          app: appNew
        });

      // Then
      expect(sendErrorMock).toBeCalled();
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.text)).toEqual({
        message: 'Custom error message'
      });
      expect(addAppMock).toBeCalledWith(appNew);
    });
  });

  describe('DELETE /apps/:id', () => {

    let deleteAppMock;

    afterEach(() => {
      deleteAppMock.mockReset();
      deleteAppMock.mockRestore();
    })

    it('should delete app with given id', async () => {
      // Given
      deleteAppMock = apps['deleteApp'] = jest.fn(() => Promise.resolve('ok'));
      const appId = 10;

      // When
      const response = await request(app)
        .delete(`/api/1/apps/${appId}`);

      // Then
      expect(response.statusCode).toBe(200);
      expect(deleteAppMock).toBeCalledWith(appId.toString());
    });

    it('should not delete app if request has no id', async () => {
      // Given
      deleteAppMock = apps['deleteApp'] = jest.fn(() => Promise.resolve('ok'));

      // When
      const response = await request(app)
        .delete('/api/1/apps/');

      // Then
      expect(sendErrorMock).not.toBeCalled();
      expect(response.statusCode).toBe(500);
      expect(deleteAppMock).not.toBeCalled();
    });

    it('should return an error if Algolia service failed to delete app', async () => {
      // Given
      deleteAppMock = apps['deleteApp'] = jest.fn(() => Promise.reject({
        message: 'Custom error message'
      }));
      const appId = '10';

      // When
      const response = await request(app)
        .delete(`/api/1/apps/${appId}`);

      // Then
      expect(sendErrorMock).toBeCalled();
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.text)).toEqual({
        message: 'Custom error message'
      });
      expect(deleteAppMock).toBeCalledWith(appId);
    });
  });
});
