# Configuração do projeto

## Versão do node ```22.0.0```

Eu deixei um arquivo ```.nvmrc ``` no root então basta rodar 
```nvm use```. Você pode instalar ela usando o nvm install.

### OBS: As instruções estão na ordem em que devem ser seguidas.

## Arquivo .ENV

Também deixei já definido o arquivo .env.example então basta você rodar ```cp .env.example .env```que ele irá gerar o arquivo ```.env``` e você poderá realizar as substituições das informações.

```
DB_HOST=db             
DB_PORT=5432                    # porta padrão
DB_NAME=teddyTesteBackend       # nome de exemplo do banco de dados
DB_USER=seu_nome                # seu usuário
REDIS_HOST=redis                # host do redis, nao é necessario alterar
REDIS_PORT=6379                 # porta padrão
DB_PASSWORD=sua_senha           # senha para acessar o banco junto ao usuário
DATABASE_URL="postgresql://{seu_nome}:{sua_senha}@localhost:5432/mydb?schema=public" # substituir pelos valores corretos
PB_OPENSSL_KEY=chave_secret_jwt # segredo para manter a segurança da autenticação com JWT
```

## Instalação de dependencias

Com o node e o npm instalado você pode rodar o comando ```npm install``` pra intalar as dependencias e ```npm run prisma``` que já deixei configurado pra iniciar o ```Prisma```.


## Rodar os containers da aplicação

Nesse projeto eu usei duas imagens uma do ```redis```e outra do ```postgress```. Para que tudo rode sem problemas é necessario subir essas imagens antes de rodar o projeto. 

O comando abaixo inicia o arquivo no qua irá subir as imagens do projeto.
```
docker-compose -f docker-compose.dev.yml up -d
```

Você pode confirmar se está rodando com ```docker ps```. Deve ser algo nesse sentido:
```
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                       NAMES
18d29a46296d   postgres:15    "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres_db
e43ff23338bc   redis:latest   "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp   redis_server
```

## Rodar o projeto

Agora basta rodar o projeto com o comando ```npm run dev``` que ele já irá definir a ```NODE_ENV=development``` e iniciar o servidor com os logs.

Da mesma forma, ao rodar ```npm run build``` e ```npm run start``` define ```NODE_ENV=production``` e inicia o ambiente em produção transpilado. 

Você pode acessar o servidor com http://localhost:3131/v1/docs.


## Melhorias

Eu configurei o Jest com o Supertes e o Fastify e está funcionando perfeitamente e você pode testar usando ```npm run test``` porém eu não repliquei para as demais rotas do aplicação. São muitas as opções de expect então daria pra deixar algo bacana.

Eu adicionei o Redis como uma tecnologia a mais porque achei que fazia sentido num cenario onde a pessoa encurtasse uma rota sem estar autenticada, o que não seria salvo no banco então precisava de uma forma de manter essas informações.

Eu configurei o ambiente rodando em produção numa instancia EC2 porém encontrei alguns desafios quanto a subir a configuração do container postgress e funcionar juntamente com o container da aplicação. O arquivo ```docker-compose.yml```no caso é o sobe a aplicação para produção, instalando o ```pm2```dentro do container com a ajuda dos arquivos ```start.sh``` e ```ecosystem.config.yml``` rodando de modo que sempre fique no ar o projeto rodando. 





