import { NextFunction, Request, Response } from 'express';
import ArchFramework from 'versatus-arch-framework/src';
import GlobalError from '@/errors';
import errorHandler from '@/middlewares';

jest.mock('versatus-arch-framework/src', () => ({
  getLogInstance: jest.fn().mockReturnValue({
    setError: jest.fn(),
  }),
}));

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let logInstance: any;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    logInstance = ArchFramework.getLogInstance();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle GlobalError with error property and axios error', () => {
    const axiosError = new Error('Axios error') as any;
    axiosError.isAxiosError = true;
    axiosError.response = {
      status: 400,
      data: { message: 'Bad Request' },
    };
    const globalError = new GlobalError('Test error', 400, axiosError);

    errorHandler(globalError, req as Request, res as Response, next);

    expect(console.error).toHaveBeenCalledWith(axiosError);
    expect(logInstance.setError).toHaveBeenCalledWith(axiosError, 'Test error');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' });
  });

  it('should handle GlobalError without error property', () => {
    const globalError = new GlobalError('Test error', 400);

    errorHandler(globalError, req as Request, res as Response, next);

    expect(console.error).toHaveBeenCalledWith(globalError);
    expect(logInstance.setError).toHaveBeenCalledWith(globalError, 'Test error');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: 'Test error',
      },
    });
  });

  it('should handle axios error directly', () => {
    const axiosError = new Error('Axios error') as any;
    axiosError.isAxiosError = true;
    axiosError.response = {
      status: 500,
      data: { message: 'Unauthorized' },
    };

    errorHandler(axiosError, req as Request, res as Response, next);

    expect(console.error).toHaveBeenCalledWith("Axios error");
    expect(logInstance.setError).toHaveBeenCalledWith(axiosError, 'Axios error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('should handle general errors', () => {
    const error = new Error('General error');

    errorHandler(error, req as Request, res as Response, next);

    expect(logInstance.setError).toHaveBeenCalledWith(error, 'General error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('should handle general errors without message', () => {
    const error = new Error();

    errorHandler(error, req as Request, res as Response, next);

    expect(logInstance.setError).toHaveBeenCalledWith(error, 'Internal server error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('should log error to console', () => {
    const error = new Error('Test error');

    errorHandler(error, req as Request, res as Response, next);

    expect(console.error).toHaveBeenCalledWith('Test error');
  });
});
