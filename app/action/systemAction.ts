import {Platform} from 'react-native';

import {request} from '@/utils';

export default {
  update: () => {
    if (Platform.OS === 'android') {
      return request.get(
        'https://img.smuai.com/app/update.json?' + new Date().getTime(),
      );
    } else {
      return null;
    }
  },
};
