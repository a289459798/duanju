import {request} from '@/utils';

export default {
  sync: (data: any[]) => {
    if (data.length === 0) {
      return;
    }
    let req = [];
    for (let i = 0; i < data.length; i++) {
      req.push({
        id: data[i].id,
        title: data[i].title,
        coverImage: data[i].coverImage,
        total: data[i].total,
        status: data[i].status === 1,
      });
    }
    return request.post('drama/sync', {
      data: {list: req},
    });
  },

  config: (data: {id: number}) => {
    return request.get(`drama/${data.id}/config`);
  },
};
