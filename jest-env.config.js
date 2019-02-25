
const DotEnv = require('dotenv');
const Path = require('path');

DotEnv.config({ path: Path.resolve(__dirname, 'secrets.env' )});
