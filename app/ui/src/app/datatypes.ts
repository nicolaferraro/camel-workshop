
export class Catalog {
  items: Map<string, Item>
}

export class Item {
  id: string;
  name: string;
  image: string;
  price: number;
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

export class Order {
  reference: string;
  user: string;
  items: OrderItem[];
  price: number;
}

export class OrderItem {
  id: string;
  amount: number;
}

export class Payment {
  reference: string;
  user: string;
  amount: number;
  active: boolean;
}

export class Message {
  title: string;
  content: string;
  error: boolean;
  refresh: boolean;
}
