# Parser Log - 1.0

## backend
Andes de rodar o projeto é preciso verificar se o [node](https://nodejs.org/en/) está instalado. Para descobrir rode o comando abaixo.

`node -v`

Bom, a partir daqui já podemos rodar o projeto:

```sh
$ cd backend
$ yarn install # or npm install
$ yarn dev
```

Pronto, a api está rodando na porta `4000` :)

## frontend
No frontend, utilizei o `create-react-app` do facebook para montar a interface.

Só executar os comandos abaixo:

```sh
$ cd frontend
$ yarn install # or npm install
$ yarn start
```

## Docker

Se preferir pode lavantar a aplicação utilizando o `docker-compose`.

Só executar os comandos abaixo:

```sh
$ cd frontend
$ docker-compose up --build
```

Pronto, agora é só acessar `http://localhost:3000`.
