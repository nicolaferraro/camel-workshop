
export class Catalog {
  items: Map<string, Item>
}

export class Item {
  id: string;
  name: string;
  image: string;
  stockUnits: number;
  recommended: boolean;
}

export class Purchase {
  id: string;
  items: Map<string, number>;
  active: boolean;
}

export class Entry {
  key: string;
  value: object;
}
