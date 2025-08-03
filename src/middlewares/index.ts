import { isAxiosError } from 'axios';
import GlobalError from '../errors';
import { NextFunction, Request, Response } from 'express';
import ArchFramework from 'versatus-arch-framework/src';

/**
 * Middleware de tratamento de erros para a aplicação.
 *
 * @param {Error} err - O erro que ocorreu.
 * @param {Request} req - O objeto de solicitação HTTP.
 * @param {Response} res - O objeto de resposta HTTP.
 * @param {NextFunction} _ - A próxima função de middleware.
 * @returns {Response} A resposta HTTP com o status e a mensagem de erro apropriados.
 */
const errorHandler = (
  err: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  const logInstance = ArchFramework.getLogInstance();

  // Verifica se o erro é uma instância de GlobalError
  if (err instanceof GlobalError) {
    let error: Error;
    if (err.error) {
      error = err.error;
      // Loga o erro se a propriedade error estiver presente
      console.error(err.error);
      logInstance.setError(err.error, err.message);
    } else {
      error = err;
      // Loga o erro diretamente se a propriedade error não estiver presente
      console.error(err);
      logInstance.setError(err, err.message);
    }
    if (isAxiosError(error)) {
      if (error.response.status && error.response.data) {
        return res.status(error.response.status).json(error.response.data);
      }
    }
    // Retorna a resposta com o status code e a mensagem de erro
    return res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    });
  }

  // Tratamento genérico de erro
  if (err.message) {
    // Loga o erro com a mensagem se disponível
    logInstance.setError(err, err.message);
    console.error(err.message);
  } else {
    // Loga o erro com uma mensagem genérica
    logInstance.setError(err, 'Internal server error');
    console.error(err);
  }

  // Retorna uma resposta com status 500 para erros internos do servidor
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
