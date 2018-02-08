import chai from 'chai';
import httpMocks from 'node-mocks-http';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import errorHandling from '../../src/middlewares/error_handling';
import {DataFormatError, PermissionError} from '../../src/errors/errors';

chai.use(sinonChai);
const {expect} = chai;

describe('Error handling middleware', () => {
  let request;
  let response;
  let next;

  beforeEach(async () => {
    request = httpMocks.createRequest({});
    response = httpMocks.createResponse();
    next = spy();
  });

  it('should return 400 if WrongDataFormat', async () => {
    errorHandling(new DataFormatError(), request, response, next);
    expect(response._getStatusCode()).to.eq(400);
    expect(next).to.be.calledOnce;
  });

  it('should return 401 if PermissionError', async () => {
    errorHandling(new PermissionError(), request, response, next);
    expect(response._getStatusCode()).to.eq(401);
    expect(next).to.be.calledOnce;
  });

  it('should return 500 if other error', async () => {
    errorHandling(new Error(), request, response, next);
    expect(response._getStatusCode()).to.eq(500);
    expect(next).to.be.calledOnce;
  });
});