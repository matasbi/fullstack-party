FROM node:9.2.1

ENV NPM_CONFIG_LOGLEVEL warn

RUN  npm install -g yarn \
    && yarn global add create-react-app \
    && yarn global add npm-run-all

WORKDIR /var/www/html

EXPOSE 3000

CMD yarn start
