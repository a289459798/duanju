export default {
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
};
