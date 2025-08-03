<!-- ABOUT THE PROJECT -->

## Sobre o projeto

Bff de dashboard da Versatus

### Tecnologias utilizadas

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Começando

Esse documento explica como importar, instalar e executar esse projeto

### Prerequisitos

Antes de executar esse projeto, verifique se as dependências abaixo foram instaladas

- NodeJS versão 18 ou superior [NodeJS](https://nodejs.org/en)
- Docker [Docker Desktop](https://docs.docker.com/desktop/)

### Variáveis de ambiente

Essas variáveis de ambiente devem ser configuradas antes de executar a aplicação

```ts
VAULT_URL= #URL do servidor Vault utilizado para armazenar e acessar segredos de forma segura
VAULT_ROLE_NAME= #Nome do papel (role) utilizado para acessar o Vault
VAULT_TOKEN= #Token de autenticação utilizado para acessar o Vault
VAULT_ENV= #Nome do ambiente do Vault, utilizado para diferenciar configurações entre diferentes ambientes (como staging, produção, etc)

BFF_DASHBOARD_PORT= #Porta de conexão do serviço BFF responsável pelo dashboard

FRONTEND_URL= #URL do frontend da aplicação

MS_REPORT_REGISTRATION_URL= #URL base do microserviço de registro de relatórios
```

### Instalação

_Siga os passos abaixo para configurar a aplicação_

1. Clone oe repositório

```sh
git clone git@bitbucket.org:versatushpc/bff-dashboard.git
```

2. Instale as dependências do projeto

```sh
npm i
```

3. Build o projeto

```sh
npm run build
```

4. Inicie a aplicação

```sh
npm run start
```

5. Verifique no console a mensagem que informa que a aplicação iniciou

```sh
Servidor está executando na porta: XXXX
```
