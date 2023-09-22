# Rick and Morty API - Demo (https://stupendous-biscuit-edf5a3.netlify.app/) 
O projeto se trata de uma pagina onde é possivel buscar e exibir informações dos personagens da famosa série Rick and Morty, utilizando a API pública "Rick and Morty API" (https://rickandmortyapi.com/)

## As funcionalidades desse feed são:
- :white_check_mark: Uso da Composition API do Vue3.
- :white_check_mark: Exibir os personagens em cards, como mostrado na página inicial da documentação da API (https://rickandmortyapi.com/)
- :white_check_mark: Busca por nome e filtrar por status. (alive, dead or unknown)
- :white_check_mark: Paginação para interagir entre o resultado da pesquisa dos personagens.
- :white_check_mark: Uso do framework de testes Cypress para testes automatizados de componentes e integração da aplicação.
- :white_check_mark: Boas práticas recomendadas de desenvolvimento Vue, como separação de componentes, reutilização de código e código limpo.
> .env utilizada para realizar o request de GraphQL: VITE_RICKANDMORTY_API_ENDPOINT = https://rickandmortyapi.com/graphql

## Instalar
Para utilizar o projeto localmente basta:
```sh
npm install
npm run dev
```
![Desktop](https://github.com/franz-weberp/rick-and-morty-api/blob/main/public/desktop.png)

## Realizar testes:
Para realizar o teste na janela do cypress
```sh
npm test:e2e:dev
```

## Tech
Foi utilizado no desenvolvimento do projecto 

- VueJS
- Sass
- Graphql
- Cypress
- Vite
