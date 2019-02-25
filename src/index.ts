import * as DotEnv from 'dotenv';
import * as Hapi from 'hapi';
import * as Path from 'path';

DotEnv.config({
  path: Path.resolve(__dirname, '../secrets.env'),
});

const server: Hapi.Server = new Hapi.Server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

const init = async () => {

  await server.register({
    plugin: require('./modules/core'),
  });

  await server.register({
    plugin: require('./modules/users'),
  });

  await server.register({
    plugin: require('./modules/auth'),
  });

  await server.start();

  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);

  process.exit(1);
});

init();
