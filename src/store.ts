export type MappedURL = {
  originalURL: string;
  shortenedURL: string;
};

interface StoreFunc<T> {
  // eslint-disable-next-line no-unused-vars
  (id: number, value: T): T;
}

interface LookupFunc<T> {
  // eslint-disable-next-line no-unused-vars
  (id: number): T | null;
}

interface IDGetter {
  (): number;
}

export interface Store<T> {
  valueMap: Map<number, T>;

  getGeneratedId: IDGetter;
  storeValue: StoreFunc<T>;
  lookupValueById: LookupFunc<T>;
}

class InMemoryStore implements Store<MappedURL> {
  private lastGeneratedID = 0;

  valueMap = new Map<number, MappedURL>();

  getGeneratedId(): number {
    this.lastGeneratedID += 1;
    return this.lastGeneratedID;
  }

  storeValue(id: number, value: MappedURL): MappedURL {
    this.valueMap.set(id, value);
    return value;
  }

  lookupValueById(id: number): MappedURL | null {
    const lookupResult = this.valueMap.get(id);
    return lookupResult || null;
  }

  reset() {
    this.lastGeneratedID = 0;
    this.valueMap.clear();
  }
}

export const inMemoryStore = new InMemoryStore();
