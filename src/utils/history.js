import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('music-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('history')) {
        db.createObjectStore('history', { keyPath: 'name' });
      }
    },
  });
};

export const you_tube_history = async () => {
    const db = await initDB();
    console.log(await db.getAll('history'));

    
      

    // const history = await db.getAll('history');
    // console.log(history);
};