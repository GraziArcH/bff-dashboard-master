/**
 * Classe GlobalError estende a classe nativa Error.
 * Representa erros globais com um código de status HTTP e um erro original opcional.
 */
export default class GlobalError extends Error {
  statusCode: number;
  error?: Error;

  /**
   * Construtor para criar uma instância de GlobalError.
   *
   * @param {string} message - A mensagem de erro.
   * @param {number} statusCode - O código de status HTTP.
   * @param {Error | unknown} error - O erro original ou uma descrição do erro.
   */
  constructor(message: string, statusCode: number, error?: Error | unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (error instanceof Error) {
      this.error = error;
    } else if (error) {
      const errorMessage = String(error);
      const errorObject = new Error(errorMessage);
      this.error = errorObject;
    }

    // Captura o rastreamento de pilha excluindo este construtor do rastreamento
    Error.captureStackTrace(this, this.constructor);
  }
}
