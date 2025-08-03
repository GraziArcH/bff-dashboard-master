import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Interface que define o tipo de configuração.
 */
export interface ConfigType {
  BFF_DASHBOARD_PORT: string;
  MS_REPORT_REGISTRATION_URL: string;
  FRONTEND_URL: string;
  VAULT_URL: string;
  VAULT_ROLE_NAME: string;
  VAULT_TOKEN: string;
  VAULT_ENV: string;
}

/**
 * Objeto de configuração que contém variáveis de ambiente.
 */
export const config: ConfigType = {
  BFF_DASHBOARD_PORT: process.env.BFF_DASHBOARD_PORT,
  MS_REPORT_REGISTRATION_URL: process.env.MS_REPORT_REGISTRATION_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  VAULT_URL: process.env.VAULT_URL,
  VAULT_ROLE_NAME: process.env.VAULT_ROLE_NAME,
  VAULT_TOKEN: process.env.VAULT_TOKEN,
  VAULT_ENV: process.env.VAULT_ENV
};

/**
 * Valida as variáveis de ambiente configuradas no objeto `config`.
 *
 * @throws {Error} Se alguma variável de ambiente estiver nula.
 */
export const validateEnvVars = (): void => {
  const nullVariablesList = [];

  // Itera sobre as variáveis de configuração e verifica se alguma está nula
  for (const variable in config) {
    const value = config[variable];

    if (!value) {
      nullVariablesList.push(variable);
    }
  }

  // Se houver variáveis nulas, lança um erro com a lista das variáveis nulas
  if (nullVariablesList.length > 0) {
    const messageError = `As variáveis ${nullVariablesList.join(', ')} estão nulas ou indefinidas`;
    console.error(messageError);
    throw new Error(messageError);
  }
};
