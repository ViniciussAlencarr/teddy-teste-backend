# comandos do pm2 que serão executados dentro do container
pm2 start ecosystem.config.yml
pm2 save
pm2 logs