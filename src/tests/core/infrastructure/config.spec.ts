import { type ConfigType, config, validateEnvVars } from '@/core/infrastructure/config'

describe('validateEnvVars function', () => {
  beforeEach(() => {
    Object.keys(config).forEach((key: keyof ConfigType) => {
      config[key] = null
    })
  })

  test('throws an error if any config variable is missing', () => {
    expect(() => { validateEnvVars() }).toThrow('As variáveis BFF_DASHBOARD_PORT, MS_REPORT_REGISTRATION_URL, FRONTEND_URL, VAULT_URL, VAULT_ROLE_NAME, VAULT_TOKEN, VAULT_ENV estão nulas ou indefinidas')
  })
})

describe('config object', () => {
  test('returns the expected environment variables', () => {
    const mockConfig: ConfigType = {
      VAULT_URL: 'VAULT_URL',
      VAULT_ROLE_NAME: 'VAULT_ROLE_NAME',
      VAULT_TOKEN: 'VAULT_TOKEN',
      VAULT_ENV: 'VAULT_ENV',
      BFF_DASHBOARD_PORT:"BFF_DASHBOARD_PORT",
      MS_REPORT_REGISTRATION_URL:"MS_REPORT_REGISTRATION_URL",
      FRONTEND_URL:"FRONTEND_URL",
    }

    Object.assign(config, mockConfig)

    Object.keys(mockConfig).forEach((key: keyof ConfigType) => {
      expect(config[key]).toBe(mockConfig[key])
    })
  })
})
