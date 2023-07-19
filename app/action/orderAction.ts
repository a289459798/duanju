import {request} from '@/utils';

export default {
  create: (data: {itemId: number; type: string}) => {
    return request.post('order', {
      data: {itemId: data.itemId, type: data.type},
    });
  },

  pay: (data: {orderId: number; platform: string; scene: string}) => {
    return request.post('order/pay', {
      data: {orderId: data.orderId, platform: data.platform, scene: data.scene},
    });
  },
};
