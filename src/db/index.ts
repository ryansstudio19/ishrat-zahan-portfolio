import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.ts";

declare global {
  var _postgresPool: Pool | undefined;
}

// Function to create or retrieve the connection pool.
export const createPool = () => {
  if (!global._postgresPool) {
    global._postgresPool = new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 15000,
    });

    // Prevent unhandled pool-level errors from crashing the application
    global._postgresPool.on("error", (err) => {
      console.error("Unexpected error on idle SQL pool client:", err);
    });
  }
  return global._postgresPool;
};

let db: any;
try {
  if (!process.env.SQL_HOST) throw new Error("Database not configured");
  const pool = createPool();
  db = drizzle(pool, { schema });
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const chainOp: any = {
    values: () => chainOp,
    set: () => chainOp,
    returning: async () => [{}],
    onConflictDoUpdate: () => chainOp,
    from: async () => [],
    where: () => chainOp,
  };
  const noOp = { findMany: async () => [], findFirst: async () => null,
    findUnique: async () => null, create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {}, delete: async () => ({}) };
  db = new Proxy({
    insert: () => chainOp,
    select: () => chainOp,
    update: () => chainOp,
    delete: () => chainOp,
  }, {
    get: (target, prop) => {
      if (prop in target) return (target as any)[prop];
      if (prop === 'query') return new Proxy({}, { get: () => noOp });
      return async () => [];
    }
  });
}

export { db };
