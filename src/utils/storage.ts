import { openDB, deleteDB, IDBPDatabase } from 'idb';
import { StorageData } from '@src/storage-data';

type StoredData<D> = {
  d: D;
  t?: number;
};

type DB = {
  CACHE_STORE_NAME: {
    [K in keyof StorageData]: StoredData<StorageData[K]>;
  };
};

const DB_VERSION = 1;
const DB_NAME = 'extension-storage';
const CACHE_STORE_NAME = 'cache';
let dbPromise = openDb();

export async function resetDb(): Promise<void> {
  try {
    dbPromise = openDb(true);
  } catch {}
}

/**
 * Set data in LOCAL storage
 */
export async function storeLocal<D>(
  key: string,
  data: D,
  ttl?: number
): Promise<void> {
  const dataToStore: StoredData<D> = { d: data };
  if (ttl) {
    dataToStore.t = Date.now() + ttl;
  }

  const db = await dbPromise;
  await db.put(CACHE_STORE_NAME, dataToStore, key);
}

/**
 * Load data from LOCAL storage
 */
export async function loadLocal<D>(
  key: string,
  defaultData?: D
): Promise<D | undefined> {
  const db = await dbPromise;
  const storedData = await db.get(CACHE_STORE_NAME, key);

  if (!storedData || (storedData.t && Date.now() > storedData.t)) {
    return defaultData;
  }
  return storedData.d;
}

async function openDb(reset?: boolean): Promise<IDBPDatabase<DB>> {
  if (reset) {
    await dbPromise;
    await deleteDB(DB_NAME);
  }

  return await openDB<DB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(CACHE_STORE_NAME);
    },
  });
}
