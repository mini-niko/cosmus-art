<h1 align="center">
  <a href="https://www.cosmusart.com.br/">Cosmus Art</a>
  <br/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-00CF00.svg">
</h1>

O [Cosmus Art](https://www.cosmusart.com.br/) é um site que foca em compartilhar e divulgar as diversas artes de diversos artistas no Brasil. Independentemente das suas habilidades, você está convidado a visitar e a compartilhar suas mais belas obras de artes!

**Índice**

- [Instalar e rodar o projeto](#como-instalar-e-rodar-o-projeto)
  - [Dependências globais](#dependencia-global)
  - [Dependências locais](#dependencia-locais)
  - [Rodar o projeto](#rodar-o-projeto)
- [Rodar testes](#rodar-testes)

## Como instalar e rodar o projeto

Antes que você possa utilizar esse projeto, seja para estudar, testar ou só mexer em algo, você precisa instalar algumas dependências.

### Dependências globais

Este projeto utiliza algumas dependências globais para funcionar: o Node.js para o servidor rodar e o Docker para poder dockerizar um banco de dados. Portanto, você precisa instalar as seguintes dependências:

- Node LTS v18 ou superior
- Docker Engine v17.12.0 com Docker Compose v1.29.2 ou superior

### Dependências locais

Uma vez com as dependências globais instaladas e projeto clonado, você pode instalar as dependências locais, abrindo um terminal no diretório do projeto e utilizando o comando do npm:

```
npm install
```

### Rodar o projeto

Após as dependências instaladas, você pode utilizar o script:

```
npm run dev
```

Este script executa `next dev`, que irá rodar o servidor Next como servidor de teste e o script `docker compose up`, subindo um container Docker do Postgres.

No momento, a única coisa que ele irá disponibilizar os endereços:

- localhost:3000 (Uma página escrita Olá Mundo!)
- localhost:3000/api/v1/status (Um retorno em JSON com as informações do banco de dados)
- localhost:5432 (Conexão com o banco de dados)

Caso queira derrubar o servidor, utilize `Ctrl + C` no terminal, que ele parará a execução. Caso queria outros comandos para o projeto, confira o arquivo `package.json`.

## Rodar testes

Também você pode rodar projetos para verificar se o código atual (ou suas modificações) está conciso. Para fazer isto, utilize o terminal na pasta raíz do projeto e utilize:

```
npm run test
```

Neste caso, ele irá utilizar o comando `jest` da biblioteca `Jest`. Porém, caso não queira utilizar o comando para cada modificação que você fazer, divida ou crie um novo terminal, e utilize o seguinte comando:

```
npm run test:watch
```

Neste caso, ele irá rodar os testes automaticamente quando uma modificação for encontrada ao salvar um arquivo do projeto.
