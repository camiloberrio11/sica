export interface Supplier {
  id: string;
  nit: string;
  name: string;
  type: string[];
}

export interface BodyCreateSupplier {
  nit: string;
  name: string;
  type: string[];
}
