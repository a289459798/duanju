import {request} from '@/utils';

export default {
  getHashRate: () => {
    return request.get('hashrate/price');
  },

  getVip: () => {
    return request.get('vip/price');
  },
};
