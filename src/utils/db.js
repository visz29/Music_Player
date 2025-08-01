// src/utils/db.js
import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('music-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('songs')) {
        db.createObjectStore('songs', { keyPath: 'name' });
      }
    },
  });
};

export const saveSong = async (song) => {
  const db = await initDB();
  await db.put('songs', song);
};

export const getAllSongs = async () => {
  const db = await initDB();
  console.log((await db.getAll('songs')).length);
  
  return await db.getAll('songs');
};

export const deleteAllSongs = async () => {
  const db = await initDB();
  const tx = db.transaction('songs', 'readwrite');
  await tx.store.clear();
  await tx.done;
};

export const deleteSongsByFolder = async (targetFolder) => {
  const db = await initDB();
  
  const tx = db.transaction('songs', 'readwrite');
  const store = tx.store;
  
  // Open a cursor to iterate
  for await (const cursor of store) {
    
    // console.log(cursor.value.folderName, " = ",targetFolder);
    if (cursor.value.folderName === targetFolder) {
      cursor.delete(); // Delete if folder matches
    }
  }

  await tx.done;
  return true
};

export const deleteSongByName = async (targetName) => {
  const db = await initDB();
  const tx = db.transaction('songs', 'readwrite');
  const store = tx.store;

  for await (const cursor of store) {
    
    if (cursor.value.name === targetName) {
      // console.log(cursor.value);
      await cursor.delete(); // Delete the matching song
      break; // Stop after finding the first match
    }
  }

  await tx.done;
  return true;
};