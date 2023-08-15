import config from './config';

const {env} = process;
let envConfig = {};

if (env.NODE_ENV === 'development') {
  envConfig = require('./dev').default;
} else {
  envConfig = require('./prod').default;
}

export default {
  ...config,
  ...envConfig,
};
