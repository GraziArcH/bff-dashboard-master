import GlobalError from "@/errors";

describe('GlobalError Class', () => {
  it('should create an instance of GlobalError with the correct properties when error is an instance of Error', () => {
    const error = new Error('Original error');
    const globalError = new GlobalError('Test error', 400, error);

    expect(globalError).toBeInstanceOf(GlobalError);
    expect(globalError.message).toBe('Test error');
    expect(globalError.statusCode).toBe(400);
    expect(globalError.error).toBe(error);
    expect(globalError.name).toBe('GlobalError');
    expect(globalError.stack).toBeDefined();
  });

  it('should create an instance of GlobalError with a string error', () => {
    const errorMessage = 'String error';
    const globalError = new GlobalError('Test error', 400, errorMessage);

    expect(globalError).toBeInstanceOf(GlobalError);
    expect(globalError.message).toBe('Test error');
    expect(globalError.statusCode).toBe(400);
    expect(globalError.error).toBeInstanceOf(Error);
    expect(globalError.error?.message).toBe(errorMessage);
    expect(globalError.name).toBe('GlobalError');
    expect(globalError.stack).toBeDefined();
  });

  it('should create an instance of GlobalError without an error', () => {
    const globalError = new GlobalError('Test error', 400);

    expect(globalError).toBeInstanceOf(GlobalError);
    expect(globalError.message).toBe('Test error');
    expect(globalError.statusCode).toBe(400);
    expect(globalError.error).toBeUndefined();
    expect(globalError.name).toBe('GlobalError');
    expect(globalError.stack).toBeDefined();
  });

  it('should handle non-error objects correctly', () => {
    const errorObject = { code: 123, message: 'Non-error object' };
    const globalError = new GlobalError('Test error', 400, errorObject);

    expect(globalError).toBeInstanceOf(GlobalError);
    expect(globalError.message).toBe('Test error');
    expect(globalError.statusCode).toBe(400);
    expect(globalError.error).toBeInstanceOf(Error);
    expect(globalError.error?.message).toBe(String(errorObject));
    expect(globalError.name).toBe('GlobalError');
    expect(globalError.stack).toBeDefined();
  });
});
