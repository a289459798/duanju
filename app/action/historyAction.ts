import {DPSdk} from 'briage/module';
import types from 'reducer/types';

export default {
  fetchHistory: () => {
    return (dispatch: Function) => {
      const history = DPSdk.history(1, 50);
      history.then((res: any) => {
        dispatch({
          type: types.history.list,
          data: res,
        });
      });
    };
  },
  getHistory: async () => {
    const results = await global.db?.executeSql(
      'select * from History order by time desc',
    );
    if (results?.[0].rows?.length > 0) {
      let res = [];
      for (let i = 0; i < results?.[0].rows?.length; i++) {
        res.push(results?.[0].rows.item(i));
      }
      return res;
    }
  },
  addHistory: async (data: {id: number; index: number; duration: number}) => {
    const results = await global.db?.executeSql(
      'select * from History where id=?',
      [data.id],
    );
    if (results?.[0].rows?.length > 0) {
      global.db?.executeSql(
        `update History set duration=${data.duration},current = ${
          data.index
        },time='${new Date().toLocaleString()}'  where id=${data.id} `,
      );
      return;
    }
    global.db?.executeSql(
      `insert into History(id, current, duration, time) values(${data.id}, ${
        data.index
      }, ${data.duration}, '${new Date().toLocaleString()}')`,
    );
  },

  getFollow: async (limit: number) => {
    const results = await global.db?.executeSql(
      `select * from Follow order by time desc limit 0,${limit}`,
    );
    if (results?.[0].rows?.length > 0) {
      let res = [];
      for (let i = 0; i < results?.[0].rows?.length; i++) {
        res.push(results?.[0].rows.item(i));
      }
      return res;
    }
  },
  addFollow: async (data: {id: number; index: number; duration: number}) => {
    const results = await global.db?.executeSql(
      'select * from Follow where id=?',
      [data.id],
    );
    if (results?.[0].rows?.length > 0) {
      global.db?.executeSql(`delete from Follow where id=${data.id}`);
      return false;
    }
    global.db?.executeSql(
      `insert into Follow(id, current, duration, time) values(${data.id}, ${
        data.index
      }, ${data.duration}, '${new Date().toLocaleString()}')`,
    );
    return true;
  },

  updateFollow: async (data: {id: number; index: number; duration: number}) => {
    const results = await global.db?.executeSql(
      'select * from Follow where id=?',
      [data.id],
    );
    if (results?.[0].rows?.length > 0) {
      global.db?.executeSql(
        `update Follow set duration=${data.duration},current = ${
          data.index
        },time='${new Date().toLocaleString()}'  where id=${data.id} `,
      );
      return;
    }
  },

  followExists: async (data: {id: number}) => {
    const results = await global.db?.executeSql(
      'select * from Follow where id=?',
      [data.id],
    );
    if (results?.[0].rows?.length > 0) {
      return true;
    }
    return false;
  },

  adList: async (data: {id: number}) => {
    const results = await global.db?.executeSql('select * from Ad where id=?', [
      data.id,
    ]);
    if (results?.[0].rows?.length === 0) {
      return {};
    } else {
      let res: any = {};
      for (let i = 0; i < results?.[0].rows?.length; i++) {
        res[results?.[0].rows.item(i).current] = true;
      }
      return res;
    }
  },

  addAd: async (data: {id: number; index: number}) => {
    const results = await global.db?.executeSql(
      'select * from Ad where id=? and current=?',
      [data.id, data.index],
    );
    if (results?.[0].rows?.length === 0) {
      global.db?.executeSql(
        `insert into Ad(id, current) values(${data.id}, ${data.index})`,
      );
    }
  },

  adExists: async (data: {id: number; index: number}) => {
    const results = await global.db?.executeSql(
      'select * from Ad where id=? and current=?',
      [data.id, data.index],
    );
    if (results?.[0].rows?.length > 0) {
      return true;
    }
    return false;
  },
};
