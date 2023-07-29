import {request} from '@/utils';

export default {
  sync: (data: any) => {
    return request.post('drama/sync', {
      data: data,
    });
  },

  config: (data: {id: number}) => {
    return request.get(`drama/${data.id}/config`);
  },
};
