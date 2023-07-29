import config from './config';

const {env} = process;
let envConfig = {};

if (env.NODE_ENV === 'development') {
  envConfig = require('./dev').default;
} else {
  envConfig = require('./prod').default;
}

let appConfig = {};
if (config.isPro) {
  appConfig = require('./vip').default;
} else {
  appConfig = require('./free').default;
}
export default {
  ...config,
  ...envConfig,
  ...appConfig,
};
