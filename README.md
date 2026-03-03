# Cobaia - Aplicando pipelines CI/CD

A ideia é estudar e gerar cenários de aplicação de conceitos CI/CD a partir de um projeto Cobaia (React e Fastify).


## Contexto
A ideia é simular um cenário onde um monorepositório (repositório com vários projetos), nesse caso backend e frontend, passem por um pipeline gradual de CI/CD.

## Como Funciona:

### Front
Toda vez que é feito o push na branch `develop`, mais precisamente no diretório `frontend`, o workflow `front-ci` é executado gerando:
* Verificação do código
* Instalação do Node e dependências do projeto
* Build

### Backend:
Toda vez que é feito o push na branch `develop`, mais precisamente no diretório `backend`, o workflow `back-ci` é executado gerando:
* Verificação do código
* Instalação do Node e dependências do projeto
* Build
 

### Testes E2E:
Toda vez que é feito o push na branch `develop`, desta vez tanto no diretório `frontend` quanto `backend`, o workflow `e2e-ci` é executado gerando:
* Verificação do código
* Instalação do Node e dependências do projeto do backend
* Subida do servidor em modo espera (para não dar erro no teste)
* Instalação das dependências do frontend
* Execução dos testes

## Fluxo
![Fluxo](assets/Screenshot_2026-03-03_18-31-24.png)