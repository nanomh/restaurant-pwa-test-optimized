import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const WarungKesukaanIdb = {
  async dapatkanIdWarung(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async semuaWarung() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async ambilWarung(data) {
    if (!data.hasOwnProperty('id')) {
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, data);
  },
  async hapusWarung(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};
export default WarungKesukaanIdb;
