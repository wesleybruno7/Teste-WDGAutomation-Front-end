primeiramente, é necessario ter o node.js instalado no computador:
https://nodejs.org/en/

Se ja tiver o node, basta instalar o pacote http-server no cumputado caso ja não tenha instalado.
npm install http-server -g

depois acesse a pasta do projeto pelo prompt e execute o comando:
http-server ./ -c-1

Obs.: o -c-1 são atributos para desabilitar o cache da pagina.

depois basta acessar o ip conforme mostrado no prompt:

Starting up http-server, serving ./
Available on:
  http://192.168.0.22:8080   
  http://127.0.0.1:8080      
Hit CTRL-C to stop the server.
