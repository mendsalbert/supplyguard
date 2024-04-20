import { type SchemaTypeDefinition } from "sanity";

import category from "./schemaTypes/category";
import order from "./schemaTypes/order";
import product from "./schemaTypes/product";
import roles from "./schemaTypes/roles";
import supplier from "./schemaTypes/supplier";
import user from "./schemaTypes/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [order, product, category, roles, supplier, user],
};
